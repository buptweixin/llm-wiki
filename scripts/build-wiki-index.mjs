#!/usr/bin/env node

/*
 * Rebuild the static reading index from the existing index metadata and the
 * complete-note projections. Markdown supplies the indexed text; the
 * complete-note HTML supplies the already-rendered, visible landing anchors.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "site/assets/wiki-index.js");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(indexPath, "utf8"), context, { filename: indexPath });

const topics = context.window.WIKI_TOPICS;
const taxonomy = context.window.WIKI_TAXONOMY;
const pages = context.window.WIKI_INDEX;

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

function visibleText(value) {
  return decodeHtml(value
    .replace(/<br\s*\/?>(\s*)/gi, " $1")
    .replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim()
    .replace(/——|—|–/g, "：");
}

function markdownText(value) {
  return value
    .replace(/^```[^\n]*\n/gm, "")
    .replace(/^```\s*$/gm, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*(?:[-*+] |\d+\. )/gm, "")
    .replace(/^\s*\|/gm, "")
    .replace(/\|\s*$/gm, "")
    .replace(/\|/g, " ")
    .replace(/^\s*[-: ]+(?:\|[-: ]+)+\s*$/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/——|—|–/g, "：");
}

function frontMatterList(markdown, key) {
  const match = markdown.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, "m"));
  return match ? Array.from(match[1].matchAll(/[a-z0-9-]+/g), item => item[0]) : [];
}

function sourceSections(markdown) {
  const headings = Array.from(markdown.matchAll(/^## (.+)$/gm));
  let mechanismIndex = 0;
  return headings.map((match, index) => {
    const heading = match[1].trim();
    const bodyStart = match.index + match[0].length;
    const bodyEnd = index + 1 < headings.length ? headings[index + 1].index : markdown.length;
    let id;
    if (heading === "解决什么问题") id = "problem";
    else if (heading === "大白话讲解") id = "intuition";
    else if (heading === "关键机制") {
      mechanismIndex += 1;
      id = mechanismIndex === 1 ? "mechanism" : `mechanism-${mechanismIndex}`;
    } else if (heading === "结果与代价") id = "evidence";
    else if (heading === "AI 预读备注") id = "ai-notes";
    else if (heading === "我的复述") id = "restatement";
    else if (heading === "卡壳点与解答") id = "pitfalls";
    else if (heading === "还没搞懂") id = "open";
    else if (heading === "关联") id = "relations";
    return { id, heading, text: markdownText(`${heading}\n${markdown.slice(bodyStart, bodyEnd)}`) };
  }).filter(section => section.id);
}

function projectedEntries(page, markdown) {
  const notePath = path.join(root, "site", page.noteHref);
  const html = fs.readFileSync(notePath, "utf8");
  const entries = [];
  const renderedSections = {};
  const sections = /<section class="note-sec" id="([^"]+)">([\s\S]*?)<\/section>/g;
  let rendered;
  while ((rendered = sections.exec(html))) renderedSections[rendered[1]] = rendered[2];

  for (const section of sourceSections(markdown)) {
    if (renderedSections[section.id] && section.text) {
      entries.push({ h: `全文 · ${section.heading}`, a: `${page.noteHref}#${section.id}`, t: section.text });
    }

    const qas = /<div class="qa" id="([^"]+)">([\s\S]*?)<\/div><\/div>/g;
    let qa;
    while ((qa = qas.exec(renderedSections[section.id] || ""))) {
      const questionMatch = qa[2].match(/<p class="qa-q">([\s\S]*?)<\/p>/);
      const question = questionMatch ? visibleText(questionMatch[1]) : qa[1];
      const text = visibleText(qa[2]);
      if (text) entries.push({ h: `全文问答 · ${question}`, a: `${page.noteHref}#${qa[1]}`, t: text });
    }
  }
  return entries;
}

for (const page of pages) {
  const markdownPath = path.join(root, "wiki/papers", `${page.id}.md`);
  const markdown = fs.readFileSync(markdownPath, "utf8");
  const mechanisms = frontMatterList(markdown, "mechanisms");
  const goals = frontMatterList(markdown, "goals");
  page.tags = Array.from(new Set([...mechanisms, ...goals]));
  page.entries = page.entries.filter(entry => !/^全文(?:问答)? · /.test(entry.h));
  page.entries.push(...projectedEntries(page, markdown));
}

const output = [
  "/* 静态索引。真源：wiki/papers/*.md（front-matter 与正文）、taxonomy.md、review.md。",
  " * 速览条目与全文投影条目均保留完整导航路径；搜索片段来自真实可见的速览或完整笔记正文。",
  " * 使用：node scripts/build-wiki-index.mjs。",
  " */",
  `window.WIKI_TOPICS = ${JSON.stringify(topics, null, 2)};`,
  "",
  `window.WIKI_TAXONOMY = ${JSON.stringify(taxonomy, null, 2)};`,
  "",
  "/* relations 的 status：reported = 笔记中有论文来源；synthesis = 库内综合对照；hypothesis = 待验证假说。 */",
  "/* review：next = 下次复测日期（review.md），last = 上次复测，count = 复测次数；count 0 表示待首测。 */",
  `window.WIKI_INDEX = ${JSON.stringify(pages, null, 2)};`,
  ""
].join("\n");

fs.writeFileSync(indexPath, output);
