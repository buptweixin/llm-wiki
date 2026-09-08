#!/usr/bin/env node

/*
 * 从真源重建 site/assets/wiki-index.js。
 *
 * 真源分工:
 *   wiki/papers/*.md 的 front-matter → 页面清单 / id / type / aliases / topic / tags(mechanisms+goals)
 *   taxonomy.md                      → WIKI_TOPICS / WIKI_TAXONOMY（受控词表）
 *   review.md                        → date(入库) / review.next / review.last / review.count
 *   wiki/papers/*.md 正文 + site/notes/papers/*.html → 全文 · / 全文问答 · 条目
 *   既有 wiki-index.js               → 仅编辑判断字段: title / essence / relations /
 *                                      速览条目 / review.result。新页面按 front-matter 推导并告警。
 *
 * 校验失败（缺真源、未知标签、缺派生文件、无效落点、review.md 残行）汇总列出并以非零码退出。
 * CHECK_DRY_RUN=1 时不写文件、输出到 stdout，供 scripts/check-site.mjs 对账。
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "site/assets/wiki-index.js");

const errors = [];
const warnings = [];
const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

if (!fs.existsSync(indexPath)) {
  console.error(`缺少既有索引 ${indexPath}；首次建立请手工提供 title/essence/relations/速览条目后再运行本脚本。`);
  process.exit(1);
}
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(indexPath, "utf8"), context, { filename: indexPath });
const oldTopics = context.window.WIKI_TOPICS;
const oldTaxonomy = context.window.WIKI_TAXONOMY;
const oldPages = context.window.WIKI_INDEX;
const oldById = new Map(oldPages.map(page => [page.id, page]));

/* ---------- 真源解析 ---------- */

function parseTaxonomy(source) {
  const topics = {};
  const taxonomy = [];
  let section = "";
  for (const raw of source.split("\n")) {
    const head = raw.match(/^## (.+)$/);
    if (head) {
      section = head[1].trim();
      continue;
    }
    if (!raw.startsWith("|")) continue;
    const cells = raw.split("|").slice(1, -1).map(cell => cell.trim());
    if (cells.length < 2) continue;
    const id = cells[0].replace(/`/g, "");
    // 必须以字母数字开头结尾，排除表头与 --- 分隔行
    if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(id)) continue;
    const label = cells[1];
    const aliases = cells[2] ? cells[2].split("、").map(item => item.trim()).filter(Boolean) : [];
    if (section.startsWith("专题")) topics[id] = label;
    else if (section.startsWith("机制")) taxonomy.push({ id, dim: "mechanism", label, aliases });
    else if (section.startsWith("目标")) taxonomy.push({ id, dim: "goal", label, aliases: [] });
  }
  return { topics, taxonomy };
}

function parseReview(source) {
  const rows = new Map();
  for (const raw of source.split("\n")) {
    if (!raw.startsWith("| [")) continue;
    const cells = raw.split("|").slice(1, -1).map(cell => cell.trim());
    // 列: 页面链接 | 入库 | 复测次数 | 上次复测 | 上次结果 | 下次复测
    if (cells.length < 6) continue;
    const link = cells[0].match(/\(([^)]+)\)/);
    const id = link ? (link[1].match(/([a-z0-9-]+)\.md$/) || [])[1] : "";
    if (!id) continue;
    rows.set(id, { ingest: cells[1], count: cells[2], last: cells[3], next: cells[5] });
  }
  return rows;
}

function frontMatter(markdown) {
  const block = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!block) return null;
  const fields = {};
  for (const line of block[1].split("\n")) {
    const kv = line.match(/^([a-z-]+):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].trim();
  }
  return fields;
}

function fmList(raw) {
  const match = (raw || "").match(/^\[([^\]]*)\]$/);
  if (!match) return [];
  return match[1].split(",").map(item => item.trim()).filter(Boolean);
}

function deriveEssence(markdown) {
  const match = markdown.match(/^> \*\*一句话本质\*\*：(.+)$/m);
  if (!match) return "";
  return match[1].replace(/\*\*/g, "").replace(/——|—|–/g, "：").trim();
}

/* ---------- 全文条目投影（markdown 供文，完整笔记 HTML 供锚点） ---------- */

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

function projectedEntries(noteHref, markdown, noteHtml) {
  const entries = [];
  const renderedSections = {};
  const sections = /<section class="note-sec" id="([^"]+)">([\s\S]*?)<\/section>/g;
  let rendered;
  while ((rendered = sections.exec(noteHtml))) renderedSections[rendered[1]] = rendered[2];

  for (const section of sourceSections(markdown)) {
    if (renderedSections[section.id] && section.text) {
      entries.push({ h: `全文 · ${section.heading}`, a: `${noteHref}#${section.id}`, t: section.text });
    }

    const qas = /<div class="qa" id="([^"]+)">([\s\S]*?)<\/div><\/div>/g;
    let qa;
    while ((qa = qas.exec(renderedSections[section.id] || ""))) {
      const questionMatch = qa[2].match(/<p class="qa-q">([\s\S]*?)<\/p>/);
      const question = questionMatch ? visibleText(questionMatch[1]) : qa[1];
      const text = visibleText(qa[2]);
      if (text) entries.push({ h: `全文问答 · ${question}`, a: `${noteHref}#${qa[1]}`, t: text });
    }
  }
  return entries;
}

/* ---------- 落点校验 ---------- */

const anchorCache = new Map();
function anchorExists(sitePath, anchor) {
  const key = `${sitePath}#${anchor}`;
  if (anchorCache.has(key)) return anchorCache.get(key);
  const full = path.join(root, "site", sitePath);
  let ok = false;
  if (fs.existsSync(full)) {
    const html = fs.readFileSync(full, "utf8");
    ok = html.includes(`id="${anchor}"`) || html.includes(`data-section="${anchor}"`);
  }
  anchorCache.set(key, ok);
  return ok;
}

function validateEntryAnchor(pageId, entry) {
  const at = entry.a.lastIndexOf("#");
  const sitePath = at >= 0 ? entry.a.slice(0, at) : entry.a;
  const anchor = at >= 0 ? entry.a.slice(at + 1) : "";
  const full = path.join(root, "site", sitePath);
  if (!fs.existsSync(full)) {
    fail(`${pageId} 条目「${entry.h}」指向不存在的文件 site/${sitePath}`);
    return;
  }
  if (anchor && !anchorExists(sitePath, anchor)) {
    fail(`${pageId} 条目「${entry.h}」的锚点 #${anchor} 在 site/${sitePath} 中不存在（速览页需静态声明 id 或 data-section）`);
  }
}

/* ---------- 重建 ---------- */

const taxonomySource = fs.readFileSync(path.join(root, "taxonomy.md"), "utf8");
const { topics, taxonomy } = parseTaxonomy(taxonomySource);
const taxonomyById = new Map(taxonomy.map(tag => [tag.id, tag]));
if (!Object.keys(topics).length || !taxonomy.length) fail("taxonomy.md 解析结果为空，请检查表格格式");

const reviewSource = fs.readFileSync(path.join(root, "review.md"), "utf8");
const reviewRows = parseReview(reviewSource);

const papersDir = path.join(root, "wiki/papers");
const mdFiles = fs.readdirSync(papersDir).filter(file => file.endsWith(".md")).sort();

const pages = [];
const ids = new Set();

for (const id of oldPages.map(page => page.id)) {
  if (mdFiles.includes(`${id}.md`)) ids.add(id);
  else warn(`索引中的 ${id} 在 wiki/papers/ 已无对应 markdown，从页面清单移除`);
}
for (const file of mdFiles) {
  const id = file.replace(/\.md$/, "");
  if (!ids.has(id)) ids.add(id);
}

for (const id of reviewRows.keys()) {
  if (!ids.has(id)) fail(`review.md 存在 ${id} 的复测行，但 wiki/papers/${id}.md 不存在（残行请清理）`);
}

for (const id of ids) {
  const markdownPath = path.join(papersDir, `${id}.md`);
  const markdown = fs.readFileSync(markdownPath, "utf8");
  const fm = frontMatter(markdown);
  if (!fm) {
    fail(`${id}: markdown 缺少 front-matter，无法归属专题与标签`);
    continue;
  }
  if (fm.id && fm.id !== id) fail(`${id}: front-matter id「${fm.id}」与文件名不一致`);
  if (fm.type !== "paper") fail(`${id}: front-matter type 应为 paper，实际「${fm.type}」`);

  const aliases = fmList(fm.aliases);
  const mechanisms = fmList(fm.mechanisms);
  const goals = fmList(fm.goals);
  const topic = fm.topic || "";
  if (!topic) fail(`${id}: front-matter 缺少 topic`);
  else if (!topics[topic]) fail(`${id}: topic「${topic}」不在 taxonomy.md 专题表内`);
  for (const tag of [...mechanisms, ...goals]) {
    if (!taxonomyById.has(tag)) fail(`${id}: 标签「${tag}」不在 taxonomy.md 词表内`);
  }

  const reviewRow = reviewRows.get(id);
  if (!reviewRow) {
    fail(`${id}: review.md 缺少复测行（入库时必须排入复测队列）`);
    continue;
  }
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  for (const field of ["ingest", "last", "next"]) {
    if (!datePattern.test(reviewRow[field])) fail(`${id}: review.md 的 ${field} 日期格式无效「${reviewRow[field]}」`);
  }
  const count = Number(reviewRow.count);
  if (!Number.isInteger(count) || count < 0) fail(`${id}: review.md 复测次数无效「${reviewRow.count}」`);

  const paperHtml = path.join(root, "site/papers", `${id}.html`);
  const noteHtmlPath = path.join(root, "site/notes/papers", `${id}.html`);
  if (!fs.existsSync(paperHtml)) fail(`${id}: 缺少速览页 site/papers/${id}.html`);
  if (!fs.existsSync(noteHtmlPath)) fail(`${id}: 缺少完整笔记页 site/notes/papers/${id}.html`);

  const old = oldById.get(id);
  if (!old) warn(`${id}: 新页面，title/essence 由 front-matter 推导、relations 置空，请人工复核编辑字段`);

  const relations = old ? old.relations : [];
  for (const rel of relations) {
    if (!ids.has(rel.to)) fail(`${id} 关系指向不存在的页面「${rel.to}」`);
    if (!["reported", "synthesis", "hypothesis"].includes(rel.status)) {
      fail(`${id} 关系「${rel.type} → ${rel.to}」status 无效「${rel.status}」`);
    }
  }

  const entries = [];
  for (const entry of (old ? old.entries : [])) {
    if (/^全文(?:问答)? · /.test(entry.h)) continue;
    entries.push(entry);
  }
  if (fs.existsSync(noteHtmlPath)) {
    entries.push(...projectedEntries(`notes/papers/${id}.html`, markdown, fs.readFileSync(noteHtmlPath, "utf8")));
  }
  for (const entry of entries) validateEntryAnchor(id, entry);

  pages.push({
    id,
    title: old ? old.title : aliases[0],
    href: `papers/${id}.html`,
    noteHref: `notes/papers/${id}.html`,
    date: reviewRow.ingest,
    topic,
    aliases,
    tags: Array.from(new Set([...mechanisms, ...goals])),
    essence: old ? old.essence : deriveEssence(markdown),
    review: {
      next: reviewRow.next,
      last: reviewRow.last,
      count,
      result: old && old.review ? old.review.result : ""
    },
    relations,
    entries
  });
}

// 页面顺序沿用既有索引（入库序），新页面按文件名序追加
pages.sort((a, b) => {
  const ai = oldById.has(a.id) ? oldPages.findIndex(page => page.id === a.id) : oldPages.length;
  const bi = oldById.has(b.id) ? oldPages.findIndex(page => page.id === b.id) : oldPages.length;
  return ai - bi || (a.id < b.id ? -1 : 1);
});

for (const dir of ["papers", "notes/papers"]) {
  const full = path.join(root, "site", dir);
  if (!fs.existsSync(full)) continue;
  for (const file of fs.readdirSync(full).filter(item => item.endsWith(".html"))) {
    const id = file.replace(/\.html$/, "");
    if (!ids.has(id)) warn(`site/${dir}/${file} 没有对应的 wiki markdown（残留派生页，请删除或补真源）`);
  }
}

/* ---------- 输出 ---------- */

const output = [
  "/* 静态索引。真源：wiki/papers/*.md（front-matter 与正文）、taxonomy.md、review.md。",
  " * 速览条目与全文投影条目均保留完整导航路径；搜索片段来自真实可见的速览或完整笔记正文。",
  " * title/essence/relations/速览条目是编辑判断字段，重建时从本文件保留；其余字段全部由真源生成。",
  " * 使用：node scripts/build-wiki-index.mjs（校验失败会拒绝生成；CHECK_DRY_RUN=1 输出到 stdout）。",
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

for (const message of warnings) console.warn(`警告: ${message}`);
if (errors.length) {
  for (const message of errors) console.error(`错误: ${message}`);
  console.error(`\n共 ${errors.length} 个错误，未生成索引。修复真源后重跑。`);
  process.exit(1);
}

if (process.env.CHECK_DRY_RUN) {
  process.stdout.write(output);
} else {
  fs.writeFileSync(indexPath, output);
  console.log(`索引已重建: ${indexPath}（${pages.length} 页，${pages.reduce((sum, page) => sum + page.entries.length, 0)} 条目）`);
}
