#!/usr/bin/env node

/*
 * 从真源重建 site/assets/wiki-index.js。
 *
 * 真源分工:
 *   wiki/papers/*.md 的 front-matter     → 论文页清单 / id / type / aliases / topic / tags(mechanisms+goals)
 *   wiki/syntheses/*.md 的 front-matter  → 专题综合页清单，另含 members（主线论文）与「关系记录」表
 *   taxonomy.md                          → WIKI_TOPICS / WIKI_TAXONOMY（受控词表）
 *   review.md                            → date(入库) / review.next / review.last / review.count
 *   markdown 正文 + site/notes/** 投影页   → 全文 · / 全文问答 · 条目
 *   既有 wiki-index.js                   → 仅编辑判断字段: title / essence / relations（论文关系卡）/
 *                                          速览条目 / review.result。新页面按 front-matter 推导并告警。
 *
 * 路径由页面类型决定（paper → papers/ + notes/papers/；synthesis → topics/ + notes/syntheses/），
 * 消费者一律读取 href / noteHref，不按 id 拼接目录。
 *
 * 校验失败（缺真源、未知标签、缺派生文件、无效落点、成员归属不符、关系记录无效或依据指纹失配、
 * review.md 残行）汇总列出并以非零码退出，不改写现有索引。
 * CHECK_DRY_RUN=1 时不写文件、输出到 stdout，供 scripts/check-site.mjs 对账。
 * PRINT_FINGERPRINTS=1 时额外打印每条关系记录当前依据段落的指纹，供复核后回填。
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
const oldPages = context.window.WIKI_INDEX;
const oldById = new Map(oldPages.map(page => [page.id, page]));

/* ---------- 页面类型 ---------- */

const KINDS = {
  paper: {
    dir: "wiki/papers",
    href: id => `papers/${id}.html`,
    noteHref: id => `notes/papers/${id}.html`,
    sourceHref: id => `wiki/papers/${id}.md`,
    sectionId: paperSectionId
  },
  synthesis: {
    dir: "wiki/syntheses",
    href: id => `topics/${id}.html`,
    noteHref: id => `notes/syntheses/${id}.html`,
    sourceHref: id => `wiki/syntheses/${id}.md`,
    sectionId: synthesisSectionId
  }
};

const RELATION_TYPES = ["compare", "complement", "prerequisite", "possible-combination", "tension", "extends"];
const EVIDENCE_STATUS = ["reported", "synthesis", "hypothesis"];

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
  if (heading === "专题本质") return "essence";
  if (heading === "问题与方法地图") return "map";
  if (heading === "关系记录") return "relations";
  if (heading === "分叉与演进") return "evolution";
  if (heading === "关键维度比较") return "compare";
  if (heading === "带着问题读论文") return "path";
  if (heading === "跨篇卡壳点") return "pitfalls";
  if (heading === "证据边界与来源") return "boundaries";
  return undefined;
}

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
    rows.set(id, { ingest: cells[1], count: cells[2], last: cells[3], next: cells[5], path: link[1] });
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

/* 关系记录表：| 关系 ID | 起点 | 类型 | 终点 | 一句主张 | 证据状态 | 依据锚点 | 指纹 | */
function parseRelationRecords(markdown) {
  const start = markdown.search(/^## 关系记录\s*$/m);
  if (start < 0) return null;
  const rest = markdown.slice(start).split("\n").slice(1);
  const records = [];
  for (const raw of rest) {
    if (/^## /.test(raw)) break;
    if (!raw.startsWith("| rel-")) continue;
    const cells = raw.split("|").slice(1, -1).map(cell => cell.trim());
    if (cells.length < 8) continue;
    records.push({
      id: cells[0],
      from: cells[1],
      type: cells[2],
      to: cells[3],
      claim: cells[4],
      status: cells[5],
      evidence: cells[6].split(/\s+/).filter(Boolean),
      fingerprint: cells[7]
    });
  }
  return records;
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

function sourceSections(markdown, sectionId) {
  const headings = Array.from(markdown.matchAll(/^## (.+)$/gm));
  const state = {};
  return headings.map((match, index) => {
    const heading = match[1].trim();
    const bodyStart = match.index + match[0].length;
    const bodyEnd = index + 1 < headings.length ? headings[index + 1].index : markdown.length;
    const id = sectionId(heading, state);
    const bodyText = markdownText(markdown.slice(bodyStart, bodyEnd));
    return { id, heading, bodyText, text: markdownText(`${heading}\n${markdown.slice(bodyStart, bodyEnd)}`) };
  }).filter(section => section.id);
}

function renderedNoteSections(noteHtml) {
  const renderedSections = {};
  const sections = /<section class="note-sec" id="([^"]+)">([\s\S]*?)<\/section>/g;
  let rendered;
  while ((rendered = sections.exec(noteHtml))) renderedSections[rendered[1]] = rendered[2];
  return renderedSections;
}

function validateSourceSectionCoverage(pageId, notePath, markdown, noteHtml, sectionId) {
  const renderedSections = renderedNoteSections(noteHtml);
  const actualIds = Object.keys(renderedSections);
  for (const section of sourceSections(markdown, sectionId).filter(item => item.bodyText)) {
    if (!renderedSections[section.id]) {
      const actual = actualIds.length ? `；实际章节锚点：${actualIds.map(id => `#${id}`).join(", ")}` : "；实际章节锚点为空";
      fail(`${pageId}: 真源章节「${section.heading}」应投影为 #${section.id}，但完整笔记 site/${notePath} 缺失该锚点${actual}`);
    }
  }
  return renderedSections;
}

function projectedEntries(pageId, noteHref, markdown, noteHtml, sectionId) {
  const entries = [];
  const renderedSections = validateSourceSectionCoverage(pageId, noteHref, markdown, noteHtml, sectionId);

  for (const section of sourceSections(markdown, sectionId)) {
    if (renderedSections[section.id] && section.bodyText) {
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

/* ---------- 落点校验与依据指纹 ---------- */

const htmlCache = new Map();
function siteHtml(sitePath) {
  if (!htmlCache.has(sitePath)) {
    const full = path.join(root, "site", sitePath);
    htmlCache.set(sitePath, fs.existsSync(full) ? fs.readFileSync(full, "utf8") : null);
  }
  return htmlCache.get(sitePath);
}

function anchorExists(sitePath, anchor) {
  const html = siteHtml(sitePath);
  return !!html && (html.includes(`id="${anchor}"`) || html.includes(`data-section="${anchor}"`));
}

function splitAnchor(href) {
  const at = href.lastIndexOf("#");
  return { sitePath: at >= 0 ? href.slice(0, at) : href, anchor: at >= 0 ? href.slice(at + 1) : "" };
}

function validateEntryAnchor(pageId, entry) {
  const { sitePath, anchor } = splitAnchor(entry.a);
  if (siteHtml(sitePath) === null) {
    fail(`${pageId} 条目「${entry.h}」指向不存在的文件 site/${sitePath}`);
    return;
  }
  if (anchor && !anchorExists(sitePath, anchor)) {
    fail(`${pageId} 条目「${entry.h}」的锚点 #${anchor} 在 site/${sitePath} 中不存在（速览页需静态声明 id 或 data-section）`);
  }
}

// 依据段落的可见文字：问答块 > 完整笔记章节 > 速览章节
function anchorText(sitePath, anchor) {
  const html = siteHtml(sitePath);
  if (!html) return null;
  const escaped = anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const qa = new RegExp(`<div class="qa" id="${escaped}">([\\s\\S]*?)</div></div>`).exec(html);
  if (qa) return visibleText(qa[1]);
  const section = new RegExp(`<section class="note-sec" id="${escaped}">([\\s\\S]*?)</section>`).exec(html);
  if (section) return visibleText(section[1]);
  const slide = new RegExp(`<section class="slide"[^>]*data-section="${escaped}"[^>]*>([\\s\\S]*?)</section>`).exec(html);
  if (slide) return visibleText(slide[1]);
  return null;
}

// FNV-1a 32 位，8 位十六进制；只求「变了没变」，不求防碰撞
function fingerprintOf(text) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

function evidenceFingerprint(anchors) {
  const parts = [];
  for (const href of anchors) {
    const { sitePath, anchor } = splitAnchor(href);
    const text = anchor ? anchorText(sitePath, anchor) : null;
    if (text === null) return null;
    parts.push(text);
  }
  return fingerprintOf(parts.join("\n"));
}

/* ---------- 重建 ---------- */

const taxonomySource = fs.readFileSync(path.join(root, "taxonomy.md"), "utf8");
const { topics, taxonomy } = parseTaxonomy(taxonomySource);
const taxonomyById = new Map(taxonomy.map(tag => [tag.id, tag]));
if (!Object.keys(topics).length || !taxonomy.length) fail("taxonomy.md 解析结果为空，请检查表格格式");

const reviewSource = fs.readFileSync(path.join(root, "review.md"), "utf8");
const reviewRows = parseReview(reviewSource);

// 页面清单：{ id, kind }；既有索引顺序优先，新页面按类型（paper 先）与文件名追加
const manifest = [];
const kindById = new Map();
for (const kind of Object.keys(KINDS)) {
  const dir = path.join(root, KINDS[kind].dir);
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter(item => item.endsWith(".md")).sort()) {
    const id = file.replace(/\.md$/, "");
    if (kindById.has(id)) fail(`${id}: 同名页面同时存在于 ${KINDS[kindById.get(id)].dir} 与 ${KINDS[kind].dir}`);
    kindById.set(id, kind);
    manifest.push({ id, kind });
  }
}
for (const page of oldPages) {
  if (!kindById.has(page.id)) warn(`索引中的 ${page.id} 在 wiki/ 已无对应 markdown，从页面清单移除`);
}
const ids = new Set(manifest.map(item => item.id));

for (const [id, row] of reviewRows) {
  if (!ids.has(id)) fail(`review.md 存在 ${id} 的复测行，但 ${row.path} 不存在（残行请清理）`);
}

const parsed = new Map();
for (const { id, kind } of manifest) {
  const spec = KINDS[kind];
  const markdown = fs.readFileSync(path.join(root, spec.dir, `${id}.md`), "utf8");
  const fm = frontMatter(markdown);
  if (!fm) {
    fail(`${id}: markdown 缺少 front-matter，无法归属专题与标签`);
    continue;
  }
  if (fm.id && fm.id !== id) fail(`${id}: front-matter id「${fm.id}」与文件名不一致`);
  if (fm.type !== kind) fail(`${id}: front-matter type 应为 ${kind}（位于 ${spec.dir}），实际「${fm.type}」`);
  parsed.set(id, { id, kind, spec, markdown, fm });
}

const pages = [];
const relationIds = new Map();

for (const { id, kind } of manifest) {
  const item = parsed.get(id);
  if (!item) continue;
  const { spec, markdown, fm } = item;

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

  const href = spec.href(id);
  const noteHref = spec.noteHref(id);
  if (siteHtml(href) === null) fail(`${id}: 缺少${kind === "paper" ? "速览页" : "专题导读页"} site/${href}`);
  if (siteHtml(noteHref) === null) fail(`${id}: 缺少完整笔记页 site/${noteHref}`);

  const old = oldById.get(id);
  if (!old) warn(`${id}: 新页面，title/essence 由 front-matter 推导、relations 置空，请人工复核编辑字段`);

  const relations = old ? (old.relations || []) : [];
  for (const rel of relations) {
    if (!ids.has(rel.to)) fail(`${id} 关系指向不存在的页面「${rel.to}」`);
    if (!EVIDENCE_STATUS.includes(rel.status)) {
      fail(`${id} 关系「${rel.type} → ${rel.to}」status 无效「${rel.status}」`);
    }
  }

  const page = {
    id,
    type: kind,
    title: old ? old.title : aliases[0],
    href,
    noteHref,
    sourceHref: spec.sourceHref(id),
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
    relations
  };

  if (kind === "synthesis") {
    // 主线成员：必须是论文且主归属与本专题一致；跨专题引用只能来自关系记录
    const members = fmList(fm.members);
    if (!members.length) fail(`${id}: 综合页 front-matter 缺少 members（主线论文）`);
    for (const member of members) {
      const target = parsed.get(member);
      if (!target || target.kind !== "paper") fail(`${id}: members 中的「${member}」不是已入库论文`);
      else if (target.fm.topic !== topic) fail(`${id}: 主线成员「${member}」的 topic 是「${target.fm.topic}」，与专题「${topic}」不一致（跨专题引用请写进关系记录）`);
    }
    for (const [otherId, other] of parsed) {
      if (other.kind === "paper" && other.fm.topic === topic && !members.includes(otherId)) {
        warn(`${id}: 论文「${otherId}」属于专题「${topic}」但未列入 members，导读覆盖将显示为部分`);
      }
    }

    const records = parseRelationRecords(markdown);
    if (records === null) fail(`${id}: 综合页缺少「## 关系记录」章节`);
    const refs = [];
    for (const rec of records || []) {
      const label = `${id} 关系记录「${rec.id}」`;
      if (!/^rel-[a-z0-9-]+$/.test(rec.id)) fail(`${label} ID 不合法（须 rel-kebab-case）`);
      if (relationIds.has(rec.id)) fail(`${label} 与 ${relationIds.get(rec.id)} 重复`);
      relationIds.set(rec.id, id);
      for (const endpoint of [rec.from, rec.to]) {
        const target = parsed.get(endpoint);
        if (!target || target.kind !== "paper") fail(`${label} 端点「${endpoint}」不是已入库论文`);
        else if (target.fm.topic !== topic && !refs.includes(endpoint)) refs.push(endpoint);
      }
      if (!RELATION_TYPES.includes(rec.type)) fail(`${label} 类型「${rec.type}」不在 ${RELATION_TYPES.join("/")} 内`);
      if (!EVIDENCE_STATUS.includes(rec.status)) fail(`${label} 证据状态「${rec.status}」不在 ${EVIDENCE_STATUS.join("/")} 内`);
      if (!rec.claim) fail(`${label} 缺少一句主张`);
      if (!rec.evidence.length) fail(`${label} 缺少依据锚点`);
      for (const href of rec.evidence) {
        const { sitePath, anchor } = splitAnchor(href);
        if (!anchor) fail(`${label} 依据「${href}」缺少段落锚点`);
        else if (anchorText(sitePath, anchor) === null) fail(`${label} 依据「${href}」在 site/ 中找不到对应段落`);
      }
      const current = evidenceFingerprint(rec.evidence);
      if (process.env.PRINT_FINGERPRINTS) console.log(`${rec.id}\t${current}`);
      if (current && rec.fingerprint !== current) {
        fail(`${label} 依据指纹失配（记录 ${rec.fingerprint}，当前 ${current}）：来源段落已变化，请复核主张后回填新指纹`);
      }
    }
    // 导读页必须为每个主线成员与跨专题引用提供稳定锚点 #paper-<id>
    for (const paperId of [...members, ...refs]) {
      if (siteHtml(href) !== null && !anchorExists(href, `paper-${paperId}`)) {
        fail(`${id}: 导读页 site/${href} 缺少论文锚点 id="paper-${paperId}"`);
      }
    }
    page.members = members;
    page.refs = refs;
    page.records = (records || []).map(rec => ({
      id: rec.id, from: rec.from, type: rec.type, to: rec.to, claim: rec.claim, status: rec.status, evidence: rec.evidence
    }));
  }

  const entries = [];
  for (const entry of (old ? old.entries : [])) {
    if (/^全文(?:问答)? · /.test(entry.h)) continue;
    entries.push(entry);
  }
  const noteHtml = siteHtml(noteHref);
  if (noteHtml !== null) {
    entries.push(...projectedEntries(id, noteHref, markdown, noteHtml, spec.sectionId));
  }
  for (const entry of entries) validateEntryAnchor(id, entry);
  page.entries = entries;

  pages.push(page);
}

// 页面顺序：论文在前、综合页在后；组内沿用既有索引（入库序），新页面按文件名序追加
const kindOrder = { paper: 0, synthesis: 1 };
pages.sort((a, b) => {
  if (kindOrder[a.type] !== kindOrder[b.type]) return kindOrder[a.type] - kindOrder[b.type];
  const ai = oldById.has(a.id) ? oldPages.findIndex(page => page.id === a.id) : oldPages.length;
  const bi = oldById.has(b.id) ? oldPages.findIndex(page => page.id === b.id) : oldPages.length;
  return ai - bi || (a.id < b.id ? -1 : 1);
});

for (const dir of ["papers", "notes/papers", "topics", "notes/syntheses"]) {
  const full = path.join(root, "site", dir);
  if (!fs.existsSync(full)) continue;
  for (const file of fs.readdirSync(full).filter(item => item.endsWith(".html"))) {
    const id = file.replace(/\.html$/, "");
    if (!ids.has(id)) warn(`site/${dir}/${file} 没有对应的 wiki markdown（残留派生页，请删除或补真源）`);
  }
}

/* ---------- 输出 ---------- */

const output = [
  "/* 静态索引。真源：wiki/papers/*.md 与 wiki/syntheses/*.md（front-matter 与正文）、taxonomy.md、review.md。",
  " * 速览条目与全文投影条目均保留完整导航路径；搜索片段来自真实可见的速览、导读或完整笔记正文。",
  " * title/essence/relations/速览条目是编辑判断字段，重建时从本文件保留；其余字段全部由真源生成。",
  " * 消费者读取 href / noteHref / sourceHref，不按 id 拼接目录；type 为 paper 或 synthesis。",
  " * 使用：node scripts/build-wiki-index.mjs（校验失败会拒绝生成；CHECK_DRY_RUN=1 输出到 stdout）。",
  " */",
  `window.WIKI_TOPICS = ${JSON.stringify(topics, null, 2)};`,
  "",
  `window.WIKI_TAXONOMY = ${JSON.stringify(taxonomy, null, 2)};`,
  "",
  "/* relations 的 status：reported = 原文报告；synthesis = 库内对照；hypothesis = 待验证假说。 */",
  "/* 综合页另有 members（主线论文）、refs（跨专题引用）与 records（关系记录：id/from/type/to/claim/status/evidence）。 */",
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
