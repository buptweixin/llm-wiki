#!/usr/bin/env node

/*
 * 站点静态生成器的持久失败样本（临时副本里做破坏，验证生成器拒绝且不改索引）。
 *   S4-a：完整笔记单个章节锚点改名 → 拒绝，索引不变；恢复后重建两次逐字一致、条目数回到基线。
 *   S4-b：专题关系记录的依据锚点在来源笔记中被改名 → 拒绝，报出专题、关系 ID 与依据路径。
 *   S4-c：来源笔记依据段落文字改动 → 依据指纹失配，拒绝并给出新指纹。
 *   S4-d：导读页删掉一个主线成员的 #paper-* 锚点 → 拒绝。
 *   S4-e：专题 front-matter 列入一篇不属于该专题的论文为主线成员 → 拒绝。
 *   S4-f：只改 Markdown 真源段落、派生 HTML 不变 → 依据指纹失配，拒绝。
 *   S4-g：改关系记录证据状态但派生 HTML 没跟随 → 投影不一致，拒绝。
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "llm-wiki-s4-"));
const indexRel = "site/assets/wiki-index.js";

function copy(rel) {
  const source = path.join(root, rel);
  if (!fs.existsSync(source)) return;
  const target = path.join(tempRoot, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true });
}

function runBuild() {
  return spawnSync(process.execPath, ["scripts/build-wiki-index.mjs"], { cwd: tempRoot, encoding: "utf8" });
}

function indexText() {
  return fs.readFileSync(path.join(tempRoot, indexRel), "utf8");
}

function summary() {
  const context = { window: {} };
  vm.runInNewContext(indexText(), context);
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

// 在临时副本里做一次破坏 → 期望拒绝且索引不变 → 复原 → 期望重建成功且回到基线
function breakAndRestore(label, rel, mutate, expectStderr) {
  const full = path.join(tempRoot, rel);
  const original = fs.readFileSync(full, "utf8");
  const broken = mutate(original);
  assert(broken !== original, `${label}: 回归夹具没有产生改动（${rel}）`);
  fs.writeFileSync(full, broken);
  const before = indexText();
  const result = runBuild();
  assert(result.status !== 0, `${label}: 破坏后生成错误地成功`);
  for (const needle of expectStderr) {
    assert(result.stderr.includes(needle), `${label}: 错误信息未包含「${needle}」：${result.stderr}`);
  }
  assert(before === indexText(), `${label}: 失败重建改写了索引`);
  fs.writeFileSync(full, original);
  const restored = runBuild();
  assert(restored.status === 0, `${label}: 复原后重建失败：${restored.stderr}`);
  return result.stderr;
}

try {
  for (const rel of [
    "scripts/build-wiki-index.mjs",
    "taxonomy.md",
    "review.md",
    "wiki/papers",
    "wiki/syntheses",
    indexRel,
    "site/papers",
    "site/notes/papers",
    "site/topics",
    "site/notes/syntheses",
    "site/assets/diagrams"
  ]) copy(rel);

  const baseline = indexText();
  const initial = summary();
  let result = runBuild();
  assert(result.status === 0, `基线重建失败：${result.stderr}`);
  const first = indexText();
  assert(summary().pages === initial.pages && summary().entries === initial.entries, `基线重建未得到 ${initial.pages} 页 / ${initial.entries} 条`);
  result = runBuild();
  assert(result.status === 0, `基线第二次重建失败：${result.stderr}`);
  assert(first === indexText(), "基线重建不幂等");
  assert(baseline === first, "基线重建改变了现有索引字节");

  // S4-a 完整笔记章节锚点改名
  breakAndRestore("S4-a", "site/notes/papers/2026-genlip.html",
    html => html.replace('id="mechanism"', 'id="r7-missing"'),
    ["2026-genlip", "关键机制", "#mechanism"]);

  // S4-b 专题依据锚点在来源笔记中消失
  breakAndRestore("S4-b", "site/notes/papers/2026-s2vopd.html",
    html => html.replace('<div class="qa" id="qa-divergence">', '<div class="qa" id="qa-divergence-renamed">'),
    ["distillation", "rel-distill-divergence-fact", "notes/papers/2026-s2vopd.html#qa-divergence"]);

  // S4-c 依据段落文字改动 → 指纹失配
  const fingerprintStderr = breakAndRestore("S4-c", "site/notes/papers/2026-s2vopd.html",
    html => html.replace("待 DistiLLM 系列入库时验证", "待 DistiLLM 系列入库时再验证"),
    ["distillation", "rel-distill-recoverability", "依据指纹失配"]);
  assert(/当前 [0-9a-f]{8}/.test(fingerprintStderr), "S4-c: 指纹失配未给出当前指纹供复核回填");

  // S4-d 导读页删掉主线成员锚点
  breakAndRestore("S4-d", "site/topics/distillation.html",
    html => html.replace('id="paper-2026-s2vopd"', 'id="paper-missing"'),
    ["distillation", 'id="paper-2026-s2vopd"']);

  // S4-e 主线成员主归属不符
  breakAndRestore("S4-e", "wiki/syntheses/distillation.md",
    md => md.replace("members: [2026-u-opsd, 2026-s2vopd, 2026-open-mopd]", "members: [2026-u-opsd, 2026-s2vopd, 2026-open-mopd, 2017-ppo]"),
    ["distillation", "2017-ppo", "reinforcement-learning"]);

  // S4-f 只改 Markdown 真源段落、HTML 不变 → 指纹失配
  breakAndRestore("S4-f", "wiki/papers/2026-s2vopd.md",
    md => md.replace("待 DistiLLM 系列入库时验证", "待 DistiLLM 系列入库时再验证"),
    ["distillation", "rel-distill-recoverability", "依据指纹失配"]);

  // S4-g 改关系记录状态但导向页投影不跟随 → 投影不一致
  breakAndRestore("S4-g", "wiki/syntheses/distillation.md",
    md => md.replace("rel-distill-self-asymmetry-in-multi | 2026-s2vopd | possible-combination | 2026-open-mopd | 组合设想（库内无实验）：多教师框架里每个教师都可以用 S²VOPD 式自构造不对称（零特权） | hypothesis |",
                     "rel-distill-self-asymmetry-in-multi | 2026-s2vopd | possible-combination | 2026-open-mopd | 组合设想（库内无实验）：多教师框架里每个教师都可以用 S²VOPD 式自构造不对称（零特权） | synthesis |"),
    ["distillation", "rel-distill-self-asymmetry-in-multi", "证据状态投影与真源不一致"]);

  const restoredSummary = summary();
  assert(restoredSummary.pages === initial.pages && restoredSummary.entries === initial.entries && restoredSummary.datasetS2 === 1,
    `复原后索引不完整：${JSON.stringify(restoredSummary)}`);
  const restoredFirst = indexText();
  result = runBuild();
  assert(result.status === 0, `复原后的再次重建失败：${result.stderr}`);
  assert(restoredFirst === indexText(), "复原后的连续两次重建不一致");
  assert(restoredFirst === baseline, "复原后索引与基线不一致");

  console.log(`PASS S4-a~g: 七种破坏均拒绝且索引不变；复原后 ${initial.pages} 页 / ${initial.entries} 条、Dataset-S2 恢复、连续两次一致`);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
