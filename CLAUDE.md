# llm-wiki — 费曼式 LLM 知识库

> **Schema 层（本文件）**：定义整个知识库的结构与工作流。任何 LLM 会话在操作本库前必须先读完本文件。
> 模式来源：Karpathy 的 llm-wiki 思想（持久化、互链、由 LLM 维护的 markdown wiki），叠加**费曼学习法**改造 ingest 流程。

## 核心理念

1. **Wiki 是复利资产**：综合一次、持续更新，而不是每次从原始材料重新检索推导（区别于 RAG）。
2. **费曼门槛**：没讲懂的知识不许入库。wiki 里只存「用户 已经理解」的知识——不是收藏夹，不是论文摘要堆。
3. **分工**：用户 提供材料、参与费曼问答、做最终判断；LLM 负责讲解、提问、以及全部簿记（建页、互链、索引、日志）——维护知识库最烦人的从来不是阅读和思考，而是簿记，这部分完全交给 LLM。

## 目录结构

```
llm-wiki/
├── CLAUDE.md        # 本文件：schema，仅经 用户 同意可改
├── index.md         # 全库地图：所有页面的分类目录（任何改动后必须同步）
├── log.md           # 只增日志：ingest/query/review/lint 流水
├── questions.md     # 开放问题：费曼检验中没补齐的理解漏洞
├── review.md        # 费曼复测队列（复测状态的唯一真源）
├── taxonomy.md      # 站点标签受控词表：专题/机制/目标标签的稳定 ID、显示名与别名
├── templates/       # 笔记模板：paper.md / concept.md / code.md
├── sources/         # 非论文类原始材料（自写笔记、代码片段等）：只进不改，LLM 只读；论文原文由 Zotero 统一管理（不再往 sources/ 存 PDF 副本）
├── site/            # 伴生 HTML 阅读库（LLM 维护，markdown 是唯一真源，详见「site/ 阅读库规范」节）
│   ├── index.html   # 首页：专题 + 标签筛选 + 全文条目搜索
│   ├── _template.html     # 速览页模板（连续阅读章节约定）
│   ├── _note-template.html # 完整笔记阅读页模板（markdown 忠实投影约定）
│   ├── assets/      # wiki-slides.css（全库唯一样式源）+ wiki-slides.js（阅读/搜索/回忆交互）+ wiki-index.js（可再生的静态索引投影）
│   ├── papers/      # 速览页，文件名与 wiki/ 下 markdown 页同名（2026-xxx.html）
│   └── notes/papers/ # 完整笔记阅读页，与速览页同名（markdown 的静态可读投影）
└── wiki/            # LLM 全权维护的知识页面
    ├── concepts/    # 概念页（attention、KV cache、RLHF ...）
    ├── papers/      # 论文页（命名：年份-简称，如 2017-transformer.md）
    ├── code/        # 代码/项目走读页
    └── syntheses/   # 跨页综合：对比、演进脉络、专题总结
```

## 语言与命名规范

- 正文**中文为主**；专业术语保留英文原文（attention、logits、KV cache...），首次出现可括注中文。
- 文件名英文小写 kebab-case：`flash-attention.md`、`2024-deepseek-v3.md`。
- 页面互链用相对路径 markdown 链接，如 `[attention](../concepts/attention.md)`。

## 工作流

### 1. Ingest —— 费曼式入库（收到 paper / 代码 / 新概念时）

**绝不跳过费曼阶段直接总结入库。** 四个阶段：

**Phase 0 · 定位**：通读材料，用 3~5 句话说清：这是什么、解决什么问题、和 wiki 已有页面什么关系。论文原文由 Zotero 统一管理（深链接可跳转），不往 `sources/` 存 PDF 副本；非论文类原始材料（自写笔记、代码片段等）才存 `sources/`。

**获取原文的优先级（ingest paper 时）**：用户只给标题（或标题 + 作者/年份等线索）时，按以下顺序找原文，前一步命中就停：
1. **Zote MCP 优先**：先 `zotero_search_items` 搜本地 Zotero 库。命中后做**三件事**，缺一不可：
   - **元数据 + 全文**：`zotero_get_item_metadata`（记下 `citationKey`、`key`、`DOI`，论文页表头要用）+ `zotero_get_item_fulltext`（或 `zotero_get_item_children` 找 PDF attachment）。Zotero 即原文锚点（深链接可跳转），不往 `sources/` 存 PDF 副本。
   - **AI Butler 预读**：`zotero_get_item_children` 列子项，找 note 子项——AI Butler 生成的笔记 HTML 里带 `<!-- AI_BUTLER_LLM_BLOCK_BEGIN` 标记块，元数据以 `task` 字段区分（`summary`/`table`）。用 `zotero_get_notes` 取下 markdown。**这份预读是费曼 Phase 1 的底稿**：它在 AI 摘要基础上校验/挑刺/补盲点，而不是从原始 PDF 重新推导结构——这正是费曼法（先有别人的理解，再验自己的理解）。无 AI 笔记则跳过此步、如实告诉用户。
   - **Zotero 锚点登记**：论文页表头必须填 `Zotero：citekey \`\` ｜ itemKey \`\` ｜ DOI \`\`` 三件套。`citationKey` 来自 BetterBibTeX（`metadata.citationKey`）；itemKey 是 8 位 `key`；DOI 来自 `metadata.DOI`。
   **找不到再走下一步**，不要跳过。
2. **arXiv / DOI / URL**：从标题里能解出 arXiv ID / DOI / URL 的，或经 web 搜索拿到后，用 `zotero_add_by_url` / `zotero_add_by_doi` 落进 Zotero（顺便归档）再取全文。Zotero 即原文锚点，不往 `sources/` 存 PDF 副本。
3. **兜底**：只能拿到摘要/网页快照时，如实告诉用户原文不全，问是否继续（费曼讲解能讲到什么程度取决于材料完整度）。

> 已入库去重：取原文前先查 `index.md` / `log.md`，若该材料已入库，先问用户是"复习 / 二轮深挖 / 重跑覆盖 / 仅查看"，不要默认覆盖。

**Phase 1 · 费曼讲解**：分层讲解，从直觉到细节：
一句话本质 → 为什么需要它（旧方法哪里痛）→ 类比/具体例子 → 关键机制 → 与已有知识的连接。
禁止未解释的行话；主动标出「这里最容易卡住」的点。

**Phase 2 · 检验提问**：出 2~4 道检验题让 用户 回答。题型：重解释类（「用你的话讲讲为什么…」）、边界类（「什么情况下会失效…」）、对比类（「和 X 的本质区别是…」）；**不出背诵题**。从回答中找理解漏洞 → 回到原文逐个补齐 → 再检验。确实补不齐的，记入 `questions.md`。

**Phase 3 · 入库**：理解收敛后才动笔：

1. 用 `templates/` 对应模板建页，必须保留：费曼讲解精华、用户 自己的复述（原话）、卡壳点与解答。
2. 更新所有受影响的相关页面（新增互链、修正被推翻的旧结论），一次 ingest 波及多页是正常的。
3. 同步 `index.md`；追加 `log.md`；在 `review.md` 排入复测（默认入库 +3 天）。
4. **同步站点派生层**（详见「site/ 阅读库规范」）：
   - **front-matter**：markdown 页头加结构化元数据（`id` / `type` / `aliases` / `topic` / `mechanisms` / `goals` / `updated`），标签 ID 取自 `taxonomy.md` 受控词表。
   - **速览页**：复制 `site/_template.html` 为 `site/papers/<同名>.html`，按真源提炼连续阅读章节（核心直觉 / 一页看懂 / 关键机制 / 证据与边界 / 卡壳点 / 关联与来源；章节数由内容决定，不凑张数），section 用 `data-section` 声明语义 ID，卡壳问答每条加稳定 `id="qa-*"`。
   - **完整笔记页**：按 `site/_note-template.html` 生成 `site/notes/papers/<同名>.html`（markdown 的忠实投影，保留用户原话、来源限定与假说标记）。
   - **静态索引**：在 `site/assets/wiki-index.js` 登记页面元数据（front-matter + `review.md` 结构化日期的投影）与全文搜索条目（条目文本取自真源原文，锚点指向速览页或完整笔记页里真实存在的段落；不许新增真源没有的因果结论）。
   - 删除页面时同步删速览页、完整笔记页与索引条目。
5. **部署上线**：执行 `site/deploy.sh`（GitHub 推送，VPS cron 每 2 分钟 git pull 同步）。VPS 不可达时不阻塞入库流程，如实报告，提醒用户稍后重跑。

### 2. Query —— 查询

用户 提问时优先基于 wiki 页面回答并注明引用页。需要跨页综合且有沉淀价值的回答，回填为 `wiki/syntheses/` 新页（同样走 index/log 簿记）——好答案也是资产。

### 3. Review —— 费曼复测（用户 说「复习」时）

1. 从 `review.md` 挑「下次复测」最早的页面（或 用户 指定的页面）。
2. 只报页面标题，让 用户 凭记忆重讲核心内容。重讲后**直接把页面「卡壳点与解答」节的原始问题改写成具体问题来问**（如「为什么 X 比 Y 更容易触发 Z？」）；**绝不问元问题**（「上次卡在哪还记得吗」）——元记忆远难于内容记忆，答不出"卡在哪"≠ 内容忘了，测不出真实遗忘。
3. 对照 wiki 页逐点核对：讲对的确认；遗忘/讲错的重新费曼一轮（小规模 Phase 1→2）。核对只测**机制与定性结论**，不考具体数字（数值页面可查，Phase 2 明言不出背诵题）；定性量级感（如「1/5 数据全面超越」）可测。
4. 更新 `review.md`（复测时间、结果），间隔递推：+3 天 → +1 周 → +1 月 → +3 月（宽松执行，以 用户 节奏为准）。
5. 复测中若发现页面本身写得不够好（重建直觉太慢），顺手改进页面，**并同步对应的 `site/` 派生层**：速览页、完整笔记页，以及 `site/assets/wiki-index.js` 里的复测投影（`review.next/last/count` 结构化日期，站点按 Asia/Shanghai 判断到期，不靠「今天」字样）。页面里的历史卡壳提示要带当时日期，已被复测推翻的「下次优先扫」要补上当前状态，不冒充当前弱项。速览页有改动时执行 `site/deploy.sh` 部署上线。

### 4. Lint —— 体检（用户 说「lint」时）

检查并输出报告，经 用户 确认后修复：

- 页面间互相矛盾的结论；被新页面推翻但没更新的旧说法
- 孤儿页（没有任何入链）；高频出现却没有独立页面的概念
- `index.md` 与实际文件不一致；`questions.md` 里其实已经能回答的旧问题
- `site/` 与 `wiki/` 一致性：每个 markdown 页有对应速览页 + 完整笔记页 + `wiki-index.js` 条目（漏更或残留死链）；索引条目的锚点在目标页面真实存在；front-matter 标签 ID 都在 `taxonomy.md` 词表内；`wiki-index.js` 复测投影与 `review.md` 一致；速览/完整笔记内容是否与真源冲突（含假说标注是否保留）

## site/ 阅读库规范（伴生 HTML 阅读层）

`site/` 是 wiki 的**阅读层**，不是镜像：速览页（`papers/`）只提炼「快速查阅」需要的内容；完整笔记页（`notes/papers/`）是 markdown 的忠实静态投影，速览未收录的细节都在那里，搜索结果可直接落到它的锚点。设计基调和组件约定由 taste-skill（`design-taste-frontend`，装于 `.zcode/skills/`）推断，固化在 `site/assets/wiki-slides.css`。硬规则：

1. **markdown 是唯一真源**：速览页 / 完整笔记页 / 静态索引内容冲突时以 markdown 为准；只改派生层不改 markdown 没有意义。派生层不许出现真源没有的因果结论；个人假说必须带「待验证」标注，实验结论与解释假说分开呈现。
2. **样式只用 `wiki-slides.css` 的 class 与 token**，禁止页内私设颜色/字体/圆角（禁止 `<style>` 块）；改设计就改唯一样式源，**并把全部页面的 `?v=` 版本串同步 +1**（assets 变更的缓存破除约定）。
3. **全站零 em-dash（速览层与首页）**：正文禁用「——」「—」「–」，改写为冒号、句号或括号；数字一律 mono（metric-value / dtable td.num 自带）。完整笔记投影页为保真例外：原文标点按 markdown 原样保留。
4. **连续阅读，不强制凑 slide 张数**：每页由 `data-section` 显式声明语义章节 ID（essence / overview / mechanism / mechanism-2 / evidence / pitfalls / relations），卡壳点章节必须保留（全库最值钱的部分），每条卡壳问答带稳定 `id="qa-*"` 且与完整笔记页同名问答一致；旧 `slide-N` 锚点作为兼容锚点保留。全页只有一个最高级强调（一条 takeaway）。
5. **导航**：顶部「← 知识库」保留来源筛选状态；不设上一篇/下一篇接环，跨页阅读靠关系卡（提炼两三条：类型 + 一句原因 + 证据状态）与首页专题/标签。标签一律用 `taxonomy.md` 的受控 ID（front-matter 是归属真源，`wiki-index.js` 是投影，显示名与别名只作归一）；「已通过/待复测」不是标签，来自 `review.md` 投影。
6. **完整笔记双出口**：速览页 SOURCE 区同时给「完整笔记」（`../notes/papers/<同名>.html`）与「源文件」（`../../wiki/<分类>/<同名>.md`）；Zotero 深链接保留 `zotero://select/items/<itemKey>`。
7. 双击 `site/index.html`（file://）即可离线使用；纯静态零依赖，不引入任何构建工具与运行时服务；完整笔记页零脚本可读。
8. **线上部署**：`site/deploy.sh` 把 site/ 经 GitHub 推送，VPS cron 每 2 分钟 git pull 同步（纯 GitHub，不用 rsync）；认证由 oauth2-proxy（GitHub 登录，仅限 `buptweixin` 账号），无需本地口令。ingest/review 改完派生层后执行该脚本，VPS 不可达不阻塞入库流程。

## 页面质量标准（费曼标准）

每个 wiki 页面必须做到：

1. 开头有「**一句话本质**」——只看这一句也知道它是什么。
2. 有大白话讲解——**三个月后忘光了的 用户，读 5 分钟能重建直觉**。这是唯一的验收标准。
3. 至少一个类比或具体例子。
4. 保留当时的卡壳点与解答——这是全库最私人、最值钱的部分。
5. 与相关页面互链，融入知识网络（不留孤岛页）。
6. 结尾注明来源（Zotero 锚点或 URL）与入库日期。
7. 论文页表头必须含 Zotero 锚点三件套（citekey / itemKey / DOI），供任意页面回链与 lint 对账。

## log.md 条目格式

`## [YYYY-MM-DD] ingest|query|review|lint | 标题`，正文 1~3 行，只增不改。

## 给未来 LLM 会话的守则

- 先读本文件再动手；`index.md` 是全库地图，任何页面改动后必须同步它。
- `sources/` 只读（仅存非论文类原始材料；论文原文归 Zotero）；`wiki/` 与各支持文件（index/log/questions/review）及 `site/` 你全权维护；本文件仅经 用户 同意可改。
- 收到新材料的默认动作是启动 Ingest 的 Phase 0，**而不是直接写笔记**。
- 铁律：**没通过费曼检验的内容不入库**（也就不会有速览页）。
