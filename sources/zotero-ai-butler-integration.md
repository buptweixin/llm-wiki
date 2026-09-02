# Zotero AI Butler ↔ llm-wiki 联动配置说明

> 本文件记录 2026-08-14 落地的第一梯队联动改动（① 吃 AI 笔记预读 ② 论文页锚点 ③ 对齐 prompt）
> + BetterBibTeX 配置要点。vault 侧已改 CLAUDE.md / ingest.md / templates/paper.md，并回填了
> 2026-videochat3.md；本文件只放 AI Butler 端和 Zotero 端需要你手动操作的部分。

---

## A. BetterBibTeX 配置（Zotero 端）

BBT 已装且已自动生成 citekey（实测 `liVideoChat3FullyOpen2026a` 等已存在）。确认/调整三点：

### 1. citekey 格式（建议保持默认或收紧）
默认格式 `auth+titleShort+year` 已可用。若想更短更稳定，可在 BBT 设置 → Citation keys 里改成：
```
auth.lower + title.short.lower.slashesToCamelcase + year
```
目标：citekey 稳定、人眼可读、不含特殊字符。**改格式会让存量 citekey 重算**——存量少时可放心改，多了就保持默认。

### 2. 把 citekey 持久化到 Extra 字段（推荐）
BBT 设置 → General → 勾选 **"Pin citation key to Extra"**（或叫 `Export citation key to Extra`）。
这样即使 BBT 卸载，citekey 仍留在 `Extra: Citation Key: xxx`，MCP 的 `zotero_search_by_citation_key` 和
未来任何脚本都能查到。**这是让 citekey 成为统一 ID 的关键一步**。

### 3. 自动导出一份 .bib（可选，便于 grep）
BBT 设置 → Auto-Export → 选一个 collection 或 whole library → 格式 Better BibTeX → 存到
`llm-wiki/sources/library.bib`（只读归档）。ingest 时可拿 citekey 去 .bib 里反查完整书目信息，lint 时
可拿它对账"vault 里引用的 citekey 是否都还存在于 Zotero"。

---

## B. AI Butler Prompt 对齐费曼模板

在 Zotero → AI Butler 设置 → Prompt 管理，新建一个自定义单轮预设（或改"计算机默认"），内容如下。
这个 prompt 的输出节标题**故意对齐 `templates/paper.md` 的骨架**，这样 ingest Phase 1 几乎是填空。

### B.1 单轮摘要 Prompt（推荐主力）

```
你是论文导读助手。请基于这篇论文（标题：${title}｜作者：${authors}｜年份：${year}）的全文，
用「讲给三个月后忘光了的人」的语气，输出以下结构。严格要求：

## 一句话本质
一句话讲清这篇是什么、最核心的一个主张是什么。

## 解决什么问题
旧方法哪里痛、这篇为什么会出现。3~5 句，不堆背景。

## 关键机制
方法细节。可以技术化，但每个术语首次出现必须用一句话解释。主动标出「这里最容易卡住」的点（用 > ⚠️ 引用块）。

## 结果与代价
效果多好、付出了什么代价、结论在什么条件下成立、局限在哪。给具体数字。

## 易误解点 / 边界
读者最容易想错的点、方法什么时候会失效。2~3 条。

---
注意：
- 禁止未解释的行话；禁止只列名词不解释。
- 公式只给直觉解释，不堆推导。
- 这是「结构化预读」底稿，不是最终笔记——宁可简洁清晰，不要灌水。
```

> 关键点：① 输出节 = paper.md 骨架子集（少了「我的复述」「卡壳点」「关联」，这三节本就该由费曼互动产出，AI 不该代写）；
> ② 用 `> ⚠️` 标卡壳点，ingest Phase 2 的检验题可直接围绕这些点出。

### B.2 多轮 Prompt（可选，给硬核论文）
若用多轮（`multi_summarize` 模式），把四轮依次设为：
1. 「研究背景与动机」→ 产出对应 paper.md「解决什么问题」骨架
2. 「核心方法」→ 对应「关键机制」
3. 「实验设计与结果」→ 对应「结果与代价」
4. 「局限与可扩展性」→ 对应「易误解点」

`multiRoundFinalPrompt`（最终汇总）设为：把前三轮结果压成上面的「一句话本质 + 解决什么问题 + 关键机制 + 结果与代价 + 易误解点」五节结构。

### B.3 noteStrategy
建议设成 `skip`（Zotero 端已有就不重跑，省 token）；想更新某篇时单独对它跑 overwrite。

---

## C. vault 侧已完成的改动（备查）

| 文件 | 改动 |
|------|------|
| `CLAUDE.md` §1 Phase 0 | Zotero 命中后新增「拉 AI Butler 子笔记做预读」+「登记锚点三件套」两步 |
| `CLAUDE.md` 页面质量标准 | 加第 7 条：论文页表头必须含 citekey/itemKey/DOI |
| `.zcode/commands/ingest.md` | Phase 0 同步上面两步，写成命令可执行的指令 |
| `templates/paper.md` | 表头加 `Zotero：citekey ｜ itemKey ｜ DOI`；正文加「## AI 预读备注」节 |
| `wiki/papers/2026-videochat3.md` | 回填锚点：`liVideoChat3FullyOpen2026a` ｜ `E5RZINH5` ｜ `10.48550/arXiv.2607.14935` |

---

## D. 验证清单（配置完自测）

1. Zotero 里任意论文，右键 BetterBibTeX → Copy citation key，能复制到 citekey。
2. `zotero_search_by_citation_key(citekey=...)` 能命中该 item（之前 `videochat3` 查不到是因为只是标题片段，用完整 citekey 才行）。
3. 跑一次 `/ingest VideoChat3` 走「复习」分支，确认 ingest 流程能拉到 AI Butler 子笔记（HTML 含 `AI_BUTLER_LLM_BLOCK_BEGIN`）。
4. 新建一篇论文笔记，确认表头有三件套、正文有「AI 预读备注」节。
