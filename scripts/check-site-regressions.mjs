#!/usr/bin/env node

/*
 * 站点静态生成器的持久失败样本。
 * 当前只覆盖 S4-a：完整笔记单个章节锚点改名时，生成必须拒绝且不改索引；
 * 恢复后重建两次必须回到 224 条并逐字一致。
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "llm-wiki-s4-"));

function copy(rel) {
  const source = path.join(root, rel);
  const target = path.join(tempRoot, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true });
}

function runBuild() {
  return spawnSync(process.execPath, ["scripts/build-wiki-index.mjs"], {
    cwd: tempRoot,
    encoding: "utf8"
  });
}

function summary() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(tempRoot, "site/assets/wiki-index.js"), "utf8"), context);
  const entries = context.window.WIKI_INDEX.flatMap(page => page.entries);
  return {
    pages: context.window.WIKI_INDEX.length,
    entries: entries.length,
    datasetS2: entries.filter(entry => entry.t.includes("Dataset-S2")).length
  };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  for (const rel of [
    "scripts/build-wiki-index.mjs",
    "taxonomy.md",
    "review.md",
    "wiki/papers",
    "site/assets/wiki-index.js",
    "site/papers",
    "site/notes/papers"
  ]) copy(rel);

  const baseline = fs.readFileSync(path.join(tempRoot, "site/assets/wiki-index.js"), "utf8");
  const initial = summary();
  let result = runBuild();
  assert(result.status === 0, `基线重建失败：${result.stderr}`);
  const first = fs.readFileSync(path.join(tempRoot, "site/assets/wiki-index.js"), "utf8");
  assert(summary().pages === initial.pages && summary().entries === initial.entries, `基线重建未得到 ${initial.pages} 页 / ${initial.entries} 条`);
  result = runBuild();
  assert(result.status === 0, `基线第二次重建失败：${result.stderr}`);
  const second = fs.readFileSync(path.join(tempRoot, "site/assets/wiki-index.js"), "utf8");
  assert(first === second && first === fs.readFileSync(path.join(tempRoot, "site/assets/wiki-index.js"), "utf8"), "基线重建不幂等");
  assert(baseline === first, "基线重建改变了现有索引字节");

  const notePath = path.join(tempRoot, "site/notes/papers/2026-genlip.html");
  const originalNote = fs.readFileSync(notePath, "utf8");
  assert(originalNote.includes('id="mechanism"'), "回归夹具缺少 GenLIP #mechanism");
  fs.writeFileSync(notePath, originalNote.replace('id="mechanism"', 'id="r7-missing"'));
  const beforeBroken = fs.readFileSync(path.join(tempRoot, "site/assets/wiki-index.js"), "utf8");
  result = runBuild();
  assert(result.status !== 0, "缺失完整笔记锚点时生成错误地成功");
  assert(result.stderr.includes("2026-genlip") && result.stderr.includes("关键机制") && result.stderr.includes("#mechanism"),
    `缺失锚点错误未报告页面、真源章节与预期锚点：${result.stderr}`);
  assert(beforeBroken === fs.readFileSync(path.join(tempRoot, "site/assets/wiki-index.js"), "utf8"), "失败重建改写了索引");

  fs.writeFileSync(notePath, originalNote);
  result = runBuild();
  assert(result.status === 0, `恢复锚点后的第一次重建失败：${result.stderr}`);
  const restoredFirst = fs.readFileSync(path.join(tempRoot, "site/assets/wiki-index.js"), "utf8");
  const restoredSummary = summary();
  assert(restoredSummary.pages === initial.pages && restoredSummary.entries === initial.entries && restoredSummary.datasetS2 === 1,
    `恢复锚点后索引不完整：${JSON.stringify(restoredSummary)}`);
  result = runBuild();
  assert(result.status === 0, `恢复锚点后的第二次重建失败：${result.stderr}`);
  const restoredSecond = fs.readFileSync(path.join(tempRoot, "site/assets/wiki-index.js"), "utf8");
  assert(restoredFirst === restoredSecond, "恢复锚点后的连续两次重建不一致");

  console.log(`PASS S4-a: 改名拒绝且索引不变；恢复后 ${initial.pages} 页 / ${initial.entries} 条、Dataset-S2 恢复、连续两次一致`);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
