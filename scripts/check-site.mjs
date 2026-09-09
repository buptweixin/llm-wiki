#!/usr/bin/env node

/*
 * 站点静态回归检查（零依赖，浏览器外可跑的部分）。
 * 覆盖历次验收沉淀的不变量；滚动、焦点、遮挡等渲染行为仍需浏览器验证。
 * 页面分 paper（速览 + 完整笔记）与 synthesis（专题导读 + 完整专题笔记 + 静态图稿），
 * 路径一律取索引里的 href / noteHref / sourceHref。
 * 使用：node scripts/check-site.mjs。任何一项失败即非零退出。
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const section = (name) => console.log(`\n== ${name} ==`);
const check = (ok, message) => {
  if (!ok) failures.push(message);
  console.log(`${ok ? "PASS" : "FAIL"}  ${message}`);
};
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const exists = (rel) => fs.existsSync(path.join(root, rel));

/* ---------- 载入投影与真源 ---------- */

const indexPath = path.join(root, "site/assets/wiki-index.js");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(indexPath, "utf8"), ctx, { filename: indexPath });
const topics = ctx.window.WIKI_TOPICS;
const taxonomy = ctx.window.WIKI_TAXONOMY;
const pages = ctx.window.WIKI_INDEX;
const ids = new Set(pages.map(page => page.id));
const byId = new Map(pages.map(page => [page.id, page]));
const papers = pages.filter(page => page.type === "paper");
const hubs = pages.filter(page => page.type === "synthesis");
const speedPath = page => `site/${page.href}`;
const notePath = page => `site/${page.noteHref}`;
const sourcePath = page => page.sourceHref;

const RELATION_TYPES = ["compare", "complement", "prerequisite", "possible-combination", "tension", "extends"];
const EVIDENCE_STATUS = ["reported", "synthesis", "hypothesis"];

function frontMatter(markdown) {
  const block = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  const fields = {};
  if (!block) return fields;
  for (const line of block[1].split("\n")) {
    const kv = line.match(/^([a-z-]+):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].trim();
  }
  return fields;
}
const fmList = raw => ((raw || "").match(/^\[([^\]]*)\]$/) || [, ""])[1].split(",").map(s => s.trim()).filter(Boolean);

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
    .trim();
}

function paperSectionId(heading, state) {
  if (heading === "解决什么问题") return "problem";
  if (heading === "大白话讲解") return "intuition";
  if (heading === "关键机制") {
    state.mechanism = (state.mechanism || 0) + 1;
    return state.mechanism === 1 ? "mechanism" : `mechanism-${state.mechanism}`;
  }
  if (heading === "结果与代价") return "evidence";
  if (heading === "AI 预读备注") return "ai-notes";
  if (heading === "我的复述") return "restatement";
  if (heading === "卡壳点与解答") return "pitfalls";
  if (heading === "还没搞懂") return "open";
  if (heading === "关联") return "relations";
  return undefined;
}

function synthesisSectionId(heading) {
  return {
    "专题本质": "essence", "问题与方法地图": "map", "关系记录": "relations", "分叉与演进": "evolution",
    "关键维度比较": "compare", "带着问题读论文": "path", "跨篇卡壳点": "pitfalls", "证据边界与来源": "boundaries"
  }[heading];
}

function sourceSections(markdown, sectionId) {
  const headings = Array.from(markdown.matchAll(/^## (.+)$/gm));
  const state = {};
  return headings.map((match, index) => {
    const heading = match[1].trim();
    const bodyStart = match.index + match[0].length;
    const bodyEnd = index + 1 < headings.length ? headings[index + 1].index : markdown.length;
    const id = sectionId(heading, state);
    const bodyText = markdownText(markdown.slice(bodyStart, bodyEnd));
    return { id, heading, bodyText };
  }).filter(section => section.id && section.bodyText);
}

function reviewRows() {
  const rows = new Map();
  for (const raw of read("review.md").split("\n")) {
    if (!raw.startsWith("| [")) continue;
    const cells = raw.split("|").slice(1, -1).map(cell => cell.trim());
    // 页面列形如 [标题](wiki/<分类>/<id>.md)，先取括号内路径再提 id
    const link = cells[0].match(/\(([^)]+)\)/);
    const id = link ? (link[1].match(/([a-z0-9-]+)\.md$/) || [])[1] : "";
    if (id && cells.length >= 6) rows.set(id, { ingest: cells[1], count: cells[2], last: cells[3], next: cells[5], path: link[1] });
  }
  return rows;
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}
function visibleText(value) {
  return decodeHtml(value.replace(/<br\s*\/?>(\s*)/gi, " $1").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim().replace(/——|—|–/g, "：");
}
function anchorText(sitePath, anchor) {
  if (!exists(`site/${sitePath}`)) return null;
  const html = read(`site/${sitePath}`);
  const escaped = anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const qa = new RegExp(`<div class="qa" id="${escaped}">([\\s\\S]*?)</div></div>`).exec(html);
  if (qa) return visibleText(qa[1]);
  const sec = new RegExp(`<section class="note-sec" id="${escaped}">([\\s\\S]*?)</section>`).exec(html);
  if (sec) return visibleText(sec[1]);
  const slide = new RegExp(`<section class="slide"[^>]*data-section="${escaped}"[^>]*>([\\s\\S]*?)</section>`).exec(html);
  if (slide) return visibleText(slide[1]);
  return null;
}
function fingerprintOf(text) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}
function splitAnchor(href) {
  const at = href.lastIndexOf("#");
  return { sitePath: at >= 0 ? href.slice(0, at) : href, anchor: at >= 0 ? href.slice(at + 1) : "" };
}
function parseRelationRecords(markdown) {
  const start = markdown.search(/^## 关系记录\s*$/m);
  if (start < 0) return null;
  const records = [];
  for (const raw of markdown.slice(start).split("\n").slice(1)) {
    if (/^## /.test(raw)) break;
    if (!raw.startsWith("| rel-")) continue;
    const cells = raw.split("|").slice(1, -1).map(cell => cell.trim());
    if (cells.length < 8) continue;
    records.push({ id: cells[0], from: cells[1], type: cells[2], to: cells[3], claim: cells[4], status: cells[5], evidence: cells[6].split(/\s+/).filter(Boolean), fingerprint: cells[7] });
  }
  return records;
}

/* ---------- C1 派生文件存在性与孤儿页 ---------- */

section("C1 派生文件与孤儿页");
check(pages.every(page => page.type === "paper" || page.type === "synthesis"), "索引每页都有 type（paper / synthesis）");
for (const page of pages) {
  for (const rel of [speedPath(page), notePath(page), sourcePath(page)]) {
    check(exists(rel), `${rel} 存在（${page.id}）`);
  }
  if (page.type === "synthesis") {
    check(exists(`site/assets/diagrams/${page.id}-map.svg`), `site/assets/diagrams/${page.id}-map.svg 存在（${page.id}）`);
  }
}
for (const dir of ["site/papers", "site/notes/papers", "site/topics", "site/notes/syntheses"]) {
  if (!exists(dir)) continue;
  for (const file of fs.readdirSync(path.join(root, dir)).filter(item => item.endsWith(".html") && !item.startsWith("_"))) {
    const id = file.replace(/\.html$/, "");
    check(ids.has(id), `${dir}/${file} 有对应索引页（否则为残留死链）`);
  }
}

/* ---------- C2 条目锚点真实存在 ---------- */

section("C2 条目落点");
const anchorCache = new Map();
function anchorOk(sitePath, anchor) {
  const key = `${sitePath}#${anchor}`;
  if (!anchorCache.has(key)) {
    const html = read(`site/${sitePath}`);
    anchorCache.set(key, html.includes(`id="${anchor}"`) || html.includes(`data-section="${anchor}"`));
  }
  return anchorCache.get(key);
}
let entryTotal = 0;
for (const page of pages) {
  for (const entry of page.entries) {
    entryTotal += 1;
    const { sitePath, anchor } = splitAnchor(entry.a);
    if (!exists(`site/${sitePath}`)) {
      check(false, `${page.id} 条目「${entry.h}」文件存在 site/${sitePath}`);
      continue;
    }
    if (anchor) check(anchorOk(sitePath, anchor), `${page.id} 条目「${entry.h}」锚点 #${anchor} 存在`);
  }
}
console.log(`（共 ${entryTotal} 条搜索条目）`);

/* ---------- C2a 真源章节与派生/索引覆盖独立对账 ---------- */

section("C2a 真源章节覆盖");
for (const page of pages) {
  if (!exists(sourcePath(page)) || !exists(notePath(page))) {
    check(false, `${page.id} 真源或完整笔记缺失，无法核对章节覆盖`);
    continue;
  }
  const markdown = read(sourcePath(page));
  const noteHtml = read(notePath(page));
  const actualIds = new Set(Array.from(noteHtml.matchAll(/<section class="note-sec" id="([^"]+)">/g), match => match[1]));
  const sectionId = page.type === "synthesis" ? synthesisSectionId : paperSectionId;
  for (const source of sourceSections(markdown, sectionId)) {
    check(actualIds.has(source.id), `${page.id} 真源章节「${source.heading}」派生锚点 #${source.id} 存在`);
    check(page.entries.some(entry => entry.h === `全文 · ${source.heading}` && entry.a === `${page.noteHref}#${source.id}`),
      `${page.id} 真源章节「${source.heading}」在索引中有完整笔记条目 #${source.id}`);
  }
}

/* ---------- C3 关系指向 ---------- */

section("C3 关系卡与关系记录");
for (const page of pages) {
  for (const rel of page.relations || []) {
    check(ids.has(rel.to), `${page.id} 关系「${rel.type}」指向 ${rel.to} 存在`);
    check(EVIDENCE_STATUS.includes(rel.status), `${page.id} 关系「${rel.type} → ${rel.to}」证据状态有效`);
  }
}
const relationIds = new Map();
for (const hub of hubs) {
  const markdown = read(sourcePath(hub));
  const fm = frontMatter(markdown);
  const members = fmList(fm.members);
  check(JSON.stringify(members) === JSON.stringify(hub.members), `${hub.id} members 与 front-matter 一致`);
  for (const member of members) {
    const paper = byId.get(member);
    check(!!paper && paper.type === "paper", `${hub.id} 主线成员「${member}」是已入库论文`);
    if (paper) check(paper.topic === hub.topic, `${hub.id} 主线成员「${member}」主归属与专题一致（${paper.topic}）`);
    check(anchorOk(hub.href, `paper-${member}`), `${hub.id} 导读页有成员锚点 #paper-${member}`);
  }
  const records = parseRelationRecords(markdown);
  check(Array.isArray(records) && records.length > 0, `${hub.id} 真源有非空「关系记录」表`);
  check(JSON.stringify((records || []).map(r => r.id)) === JSON.stringify((hub.records || []).map(r => r.id)), `${hub.id} 索引 records 与真源关系记录逐条对应`);
  const refs = [];
  for (const rec of records || []) {
    const label = `${hub.id} 关系「${rec.id}」`;
    check(/^rel-[a-z0-9-]+$/.test(rec.id), `${label} ID 合法`);
    check(!relationIds.has(rec.id), `${label} 全库唯一`);
    relationIds.set(rec.id, hub.id);
    for (const endpoint of [rec.from, rec.to]) {
      const paper = byId.get(endpoint);
      check(!!paper && paper.type === "paper", `${label} 端点「${endpoint}」是已入库论文`);
      if (paper && paper.topic !== hub.topic && !refs.includes(endpoint)) refs.push(endpoint);
    }
    check(RELATION_TYPES.includes(rec.type), `${label} 类型「${rec.type}」在受控集合内`);
    check(EVIDENCE_STATUS.includes(rec.status), `${label} 证据状态「${rec.status}」有效`);
    check(rec.evidence.length > 0, `${label} 有依据锚点`);
    const texts = [];
    for (const href of rec.evidence) {
      const { sitePath, anchor } = splitAnchor(href);
      const text = anchor ? anchorText(sitePath, anchor) : null;
      check(text !== null, `${label} 依据「${href}」指向真实段落`);
      if (text !== null) texts.push(text);
    }
    if (texts.length === rec.evidence.length) {
      const current = fingerprintOf(texts.join("\n"));
      check(current === rec.fingerprint, `${label} 依据指纹一致（记录 ${rec.fingerprint} / 当前 ${current}）`);
    }
    // 导读页把每条关系记录投影为同 id 的可见块
    check(anchorOk(hub.href, rec.id), `${label} 在导读页有同 id 的投影块`);
  }
  check(JSON.stringify(refs) === JSON.stringify(hub.refs || []), `${hub.id} 跨专题引用由关系记录推导一致（${refs.join(", ") || "无"}）`);
  for (const ref of refs) check(anchorOk(hub.href, `paper-${ref}`), `${hub.id} 导读页有跨专题引用锚点 #paper-${ref}`);
  // 有导读的专题：该专题下每篇论文都应被收录，否则覆盖不完整需在导读页说明
  const topicPapers = papers.filter(paper => paper.topic === hub.topic).map(paper => paper.id);
  check(topicPapers.every(id => members.includes(id)), `${hub.id} 覆盖专题「${hub.topic}」下全部论文（${topicPapers.join(", ")}）`);
}

/* ---------- C4/C5/C6 真源与投影一致 ---------- */

section("C4-C6 front-matter / review / 词表");
const rows = reviewRows();
const tagIds = new Set(taxonomy.map(tag => tag.id));
for (const page of pages) {
  const fm = frontMatter(read(sourcePath(page)));
  check(fm.type === page.type, `${page.id} type 一致（fm=${fm.type} index=${page.type}）`);
  check(fm.topic === page.topic, `${page.id} topic 一致（fm=${fm.topic} index=${page.topic}）`);
  const fmTags = Array.from(new Set([...fmList(fm.mechanisms), ...fmList(fm.goals)]));
  check(JSON.stringify(fmTags) === JSON.stringify(page.tags), `${page.id} 标签与 front-matter 一致`);
  check(JSON.stringify(fmList(fm.aliases)) === JSON.stringify(page.aliases), `${page.id} aliases 与 front-matter 一致`);
  for (const tag of page.tags) check(tagIds.has(tag), `${page.id} 标签「${tag}」在 taxonomy 词表内`);
  check(!!topics[page.topic], `${page.id} 专题「${page.topic}」在 taxonomy 专题表内`);
  const row = rows.get(page.id);
  if (!row) {
    check(false, `${page.id} 在 review.md 有复测行`);
    continue;
  }
  check(row.path === sourcePath(page), `${page.id} review.md 链接指向真源（${row.path}）`);
  check(row.ingest === page.date, `${page.id} 入库日期一致（review=${row.ingest} index=${page.date}）`);
  check(row.next === page.review.next && row.last === page.review.last && Number(row.count) === page.review.count,
    `${page.id} 复测投影一致（next=${row.next}/${page.review.next} last=${row.last}/${page.review.last} count=${row.count}/${page.review.count}）`);
}
for (const id of rows.keys()) {
  check(ids.has(id), `review.md 行「${id}」有对应页面（否则为残行）`);
}

/* ---------- C7 问答 id 唯一性与同名一致 ---------- */

section("C7 问答 id");
// 速览页可从真源其他小节提炼问答（如复测防混淆注），完整笔记页不必同名收录；
// 硬约束是: 页内 id 不重复，且两边同名 id 只表示同一问答（不同页不重号给不同问题）。
// 专题导读页的跨篇问答则必须在完整专题笔记里有同名问答（导读是笔记的投影）。
const qaIds = html => Array.from(html.matchAll(/<div class="qa" id="(qa-[^"]+)"/g), match => match[1]);
for (const page of pages) {
  const speedQa = qaIds(read(speedPath(page)));
  const noteQa = qaIds(read(notePath(page)));
  for (const [label, qas] of [[page.type === "synthesis" ? "导读" : "速览", speedQa], ["笔记", noteQa]]) {
    const dup = qas.filter((id, index) => qas.indexOf(id) !== index);
    check(!dup.length, `${page.id} ${label}页 qa id 不重复${dup.length ? `（重复: ${Array.from(new Set(dup)).join(", ")}）` : ""}`);
  }
  if (page.type === "synthesis") {
    check(speedQa.every(id => noteQa.includes(id)), `${page.id} 导读页跨篇问答都在完整专题笔记里有同名问答`);
  }
}

/* ---------- C8 资源版本串统一 ---------- */

section("C8 资源版本串");
const htmlFiles = ["site/index.html", ...pages.flatMap(page => [speedPath(page), notePath(page)])];
const versions = new Set();
for (const rel of htmlFiles) {
  for (const match of read(rel).matchAll(/\?v=([0-9-]+)/g)) versions.add(match[1]);
}
check(versions.size <= 1, `全站 ?v= 统一（当前: ${Array.from(versions).join(", ") || "无"}）`);

/* ---------- C9 速览层零 em-dash ---------- */

section("C9 速览层零 em-dash（完整笔记投影页豁免）");
for (const rel of ["site/index.html", ...pages.map(speedPath), ...hubs.map(hub => `site/assets/diagrams/${hub.id}-map.svg`)]) {
  if (!exists(rel)) continue;
  const text = read(rel).replace(/<[^>]+>/g, "");
  const hit = text.match(/——|—|–/);
  check(!hit, `${rel} 无 em-dash${hit ? `（发现「${hit[0]}」）` : ""}`);
}

/* ---------- C10 索引可由真源逐字重建（无投影漂移） ---------- */

section("C10 索引干跑对账");
let dry = "";
try {
  dry = execFileSync(process.execPath, ["scripts/build-wiki-index.mjs"], {
    cwd: root,
    env: { ...process.env, CHECK_DRY_RUN: "1" }
  }).toString();
  check(dry === fs.readFileSync(indexPath, "utf8"), "build-wiki-index.mjs 干跑结果与现有 wiki-index.js 逐字一致");
} catch (error) {
  check(false, `build-wiki-index.mjs 干跑应成功（退出 ${error.status ?? "异常"}）`);
  const stderr = error.stderr?.toString().trim();
  if (stderr) console.log(stderr);
}

/* ---------- C11 缺失章节 / 缺失依据 持久回归 ---------- */

section("C11 缺失章节与缺失依据回归");
try {
  const regression = execFileSync(process.execPath, ["scripts/check-site-regressions.mjs"], {
    cwd: root,
    encoding: "utf8"
  }).trim();
  if (regression) console.log(regression);
  check(true, "完整笔记单锚点改名、专题成员/依据锚点缺失均拒绝生成，恢复后条目数完整且连续两次一致");
} catch (error) {
  check(false, `缺失章节/依据回归失败（退出 ${error.status ?? "异常"}）`);
  const output = `${error.stdout?.toString() || ""}${error.stderr?.toString() || ""}`.trim();
  if (output) console.log(output);
}

/* ---------- C12 首页静态兜底与索引一致 ---------- */

section("C12 首页静态兜底");
const indexHtml = read("site/index.html");
const noscript = (indexHtml.match(/<noscript>([\s\S]*?)<\/noscript>/) || [, ""])[1];
for (const page of pages) {
  check(noscript.includes(`href="${page.href}"`), `首页 noscript 含 ${page.type === "synthesis" ? "专题导读" : "论文"}入口 ${page.href}`);
}
check(noscript.includes(`<span>${papers.length} 篇</span>`), `首页 noscript 论文计数为 ${papers.length}`);
check(noscript.includes(`<span>${hubs.length} 篇</span>`), `首页 noscript 专题导读计数为 ${hubs.length}`);
check(indexHtml.includes(`>${papers.length} 篇论文 · ${hubs.length} 篇专题导读<`), `首页 idx-count 静态文本为「${papers.length} 篇论文 · ${hubs.length} 篇专题导读」`);
check(indexHtml.includes(`${papers.length} 篇论文 · ${hubs.length} 篇专题导读 · 静态离线可用`), "首页页脚计数与索引一致");
for (const topicId of Object.keys(topics)) {
  check(indexHtml.includes(`data-topic="${topicId}"`), `首页有专题按钮 ${topicId}`);
}
const buttonTopics = Array.from(indexHtml.matchAll(/data-topic="([a-z-]+)"/g), match => match[1]).filter(id => id !== "all");
check(buttonTopics.every(id => topics[id]), "首页专题按钮都在 taxonomy 专题表内");

/* ---------- C13 专题导读页结构与内嵌图稿一致 ---------- */

section("C13 专题导读页结构与图稿");
for (const hub of hubs) {
  const html = read(speedPath(hub));
  const sections = Array.from(html.matchAll(/data-section="([a-z-]+)"/g), match => match[1]);
  check(JSON.stringify(sections) === JSON.stringify(["essence", "map", "evolution", "compare", "path", "pitfalls", "relations"]),
    `${hub.id} 导读页章节顺序为 essence/map/evolution/compare/path/pitfalls/relations（实际 ${sections.join("/")}）`);
  check((html.match(/class="takeaway"/g) || []).length === 1, `${hub.id} 导读页只有一条 takeaway`);
  check(/<div class="qa-list">/.test(html), `${hub.id} 导读页保留跨篇卡壳问答列表`);
  check(/class="dtable hub-edges"/.test(html), `${hub.id} 导读页图下配有文字关系表`);
  check(!/<style/.test(html), `${hub.id} 导读页无页内 <style> 块`);
  check(/<span class="evidence is-hypothesis">/.test(html) || !/待验证/.test(html), `${hub.id} 导读页假说用 .evidence.is-hypothesis 就地标注`);
  const svgRel = `site/assets/diagrams/${hub.id}-map.svg`;
  if (exists(svgRel)) {
    const svg = read(svgRel);
    check(!/<style/.test(svg) && !/\b(?:fill|stroke|font-family|style)="/.test(svg), `${svgRel} 只带 class，没有内嵌样式或硬编码视觉属性`);
    check(/<\?xml-stylesheet href="\.\.\/wiki-slides\.css"/.test(svg), `${svgRel} 通过 xml-stylesheet 引用共享样式表`);
    const expected = svg.replace(/<\?xml[^>]*\?>\s*/g, "").replace(new RegExp(`href="\\.\\./\\.\\./topics/${hub.id}\\.html#`, "g"), 'href="#').trim();
    const inline = (html.match(/<!-- hub-diagram:[a-z0-9-]+ -->\n([\s\S]*?)\n<!-- \/hub-diagram -->/) || [, ""])[1].trim();
    check(inline === expected, `${hub.id} 导读页内嵌图稿与 ${svgRel} 一致（node scripts/sync-hub-diagrams.mjs 同步）`);
    // 图首图控制在 5~8 个节点：主线成员必须在图中有可点节点，跨专题引用可只出现在阅读路径里
    for (const member of hub.members || []) {
      check(inline.includes(`href="#paper-${member}"`), `${hub.id} 图中节点链接到 #paper-${member}`);
    }
  }
}

/* ---------- 汇总 ---------- */

console.log("");
if (failures.length) {
  console.log(`共 ${failures.length} 项失败：`);
  for (const message of failures) console.log(`  FAIL ${message}`);
  process.exit(1);
}
console.log("全部通过。");
