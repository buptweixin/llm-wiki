#!/usr/bin/env node

/*
 * 站点静态回归检查（零依赖，浏览器外可跑的部分）。
 * 覆盖历次验收沉淀的不变量；滚动、焦点、遮挡等渲染行为仍需浏览器验证。
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

/* ---------- 载入投影与真源 ---------- */

const indexPath = path.join(root, "site/assets/wiki-index.js");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(indexPath, "utf8"), ctx, { filename: indexPath });
const topics = ctx.window.WIKI_TOPICS;
const taxonomy = ctx.window.WIKI_TAXONOMY;
const pages = ctx.window.WIKI_INDEX;
const ids = new Set(pages.map(page => page.id));

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

function reviewRows() {
  const rows = new Map();
  for (const raw of fs.readFileSync(path.join(root, "review.md"), "utf8").split("\n")) {
    if (!raw.startsWith("| [")) continue;
    const cells = raw.split("|").slice(1, -1).map(cell => cell.trim());
    // 页面列形如 [标题](wiki/papers/<id>.md)，先取括号内路径再提 id
    const link = cells[0].match(/\(([^)]+)\)/);
    const id = link ? (link[1].match(/([a-z0-9-]+)\.md$/) || [])[1] : "";
    if (id && cells.length >= 6) rows.set(id, { ingest: cells[1], count: cells[2], last: cells[3], next: cells[5] });
  }
  return rows;
}

/* ---------- C1 派生文件存在性与孤儿页 ---------- */

section("C1 派生文件与孤儿页");
for (const page of pages) {
  for (const rel of [`site/papers/${page.id}.html`, `site/${page.noteHref}`]) {
    check(fs.existsSync(path.join(root, rel)), `${rel} 存在（${page.id}）`);
  }
}
for (const dir of ["site/papers", "site/notes/papers"]) {
  for (const file of fs.readdirSync(path.join(root, dir)).filter(item => item.endsWith(".html"))) {
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
    const html = fs.readFileSync(path.join(root, "site", sitePath), "utf8");
    anchorCache.set(key, html.includes(`id="${anchor}"`) || html.includes(`data-section="${anchor}"`));
  }
  return anchorCache.get(key);
}
let entryTotal = 0;
for (const page of pages) {
  for (const entry of page.entries) {
    entryTotal += 1;
    const at = entry.a.lastIndexOf("#");
    const sitePath = at >= 0 ? entry.a.slice(0, at) : entry.a;
    const anchor = at >= 0 ? entry.a.slice(at + 1) : "";
    if (!fs.existsSync(path.join(root, "site", sitePath))) {
      check(false, `${page.id} 条目「${entry.h}」文件存在 site/${sitePath}`);
      continue;
    }
    if (anchor) check(anchorOk(sitePath, anchor), `${page.id} 条目「${entry.h}」锚点 #${anchor} 存在`);
  }
}
console.log(`（共 ${entryTotal} 条搜索条目）`);

/* ---------- C3 关系指向 ---------- */

section("C3 关系卡");
for (const page of pages) {
  for (const rel of page.relations || []) {
    check(ids.has(rel.to), `${page.id} 关系「${rel.type}」指向 ${rel.to} 存在`);
  }
}

/* ---------- C4/C5/C6 真源与投影一致 ---------- */

section("C4-C6 front-matter / review / 词表");
const rows = reviewRows();
const tagIds = new Set(taxonomy.map(tag => tag.id));
for (const page of pages) {
  const md = fs.readFileSync(path.join(root, "wiki/papers", `${page.id}.md`), "utf8");
  const fm = frontMatter(md);
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
const qaIds = html => Array.from(html.matchAll(/<div class="qa" id="(qa-[^"]+)"/g), match => match[1]);
for (const page of pages) {
  for (const [label, rel] of [["速览", `site/papers/${page.id}.html`], ["笔记", `site/${page.noteHref}`]]) {
    const qas = qaIds(fs.readFileSync(path.join(root, rel), "utf8"));
    const dup = qas.filter((id, index) => qas.indexOf(id) !== index);
    check(!dup.length, `${page.id} ${label}页 qa id 不重复${dup.length ? `（重复: ${Array.from(new Set(dup)).join(", ")}）` : ""}`);
  }
}

/* ---------- C8 资源版本串统一 ---------- */

section("C8 资源版本串");
const htmlFiles = ["site/index.html", ...pages.flatMap(page => [`site/papers/${page.id}.html`, `site/${page.noteHref}`])];
const versions = new Set();
for (const rel of htmlFiles) {
  for (const match of fs.readFileSync(path.join(root, rel), "utf8").matchAll(/\?v=([0-9-]+)/g)) versions.add(match[1]);
}
check(versions.size <= 1, `全站 ?v= 统一（当前: ${Array.from(versions).join(", ") || "无"}）`);

/* ---------- C9 速览层零 em-dash ---------- */

section("C9 速览层零 em-dash（完整笔记投影页豁免）");
for (const rel of ["site/index.html", ...pages.map(page => `site/papers/${page.id}.html`)]) {
  const text = fs.readFileSync(path.join(root, rel), "utf8").replace(/<[^>]+>/g, "");
  const hit = text.match(/——|—|–/);
  check(!hit, `${rel} 无 em-dash${hit ? `（发现「${hit[0]}」）` : ""}`);
}

/* ---------- C10 索引可由真源逐字重建（无投影漂移） ---------- */

section("C10 索引干跑对账");
const dry = execFileSync(process.execPath, ["scripts/build-wiki-index.mjs"], {
  cwd: root,
  env: { ...process.env, CHECK_DRY_RUN: "1" }
}).toString();
check(dry === fs.readFileSync(indexPath, "utf8"), "build-wiki-index.mjs 干跑结果与现有 wiki-index.js 逐字一致");

/* ---------- 汇总 ---------- */

console.log("");
if (failures.length) {
  console.log(`共 ${failures.length} 项失败：`);
  for (const message of failures) console.log(`  FAIL ${message}`);
  process.exit(1);
}
console.log("全部通过。");
