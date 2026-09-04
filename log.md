# 日志（append-only，只增不改）

<!-- 条目格式：## [YYYY-MM-DD] ingest|query|review|lint | 标题 -->

## [2026-07-26] init | 知识库初始化

- 按 Karpathy llm-wiki 模式 + 费曼学习法建库；schema 见 CLAUDE.md。
- 约定：中文为主/术语英文；费曼互动 = 讲解后提问检验；启用费曼复测（review.md）。

## [2026-07-27] ingest | VideoChat3

- 首篇论文入库：4B 全开源 Video MLLM。核心创新 I3D-ViT（图像 ViT → 3D，16× token 压缩）+ Adaptive Frame Resolution（状态 token 同时驱动响应时机与下一窗口像素预算）+ 三份数据集（Academic2M/LV116K/OL617K）+ 四阶段训练。
- 走完费曼 Phase 0→1→2→3：3 道检验题（压缩为何放在编码器里 / 零冗余时压缩是否成立 / 状态 token 合二为一利弊）全部补齐，无残留漏洞，未动 `questions.md`。
- 原文存 `sources/2026-videochat3.pdf`；建页 `wiki/papers/2026-videochat3.md`；`index.md` 同步；`review.md` 排入复测（默认 +3 天）。

## [2026-08-14] schema | Zotero AI Butler ↔ llm-wiki 第一梯队联动

- 诊断断点：AI Butler 生成的结构化笔记（带 `AI-Generated` 标签，HTML 含 `AI_BUTLER_LLM_BLOCK_BEGIN` 标记）一直未被 ingest 流程消费，两边各总结一遍；且缺统一 ID。
- 落地三改：① CLAUDE.md/ingest.md Phase 0 命中 Zotero 后新增「拉 AI Butler 子笔记做预读」步——`zotero_get_item_children` 找 note 子项 → `zotero_get_notes` 取 markdown，作为费曼 Phase 1 底稿；② templates/paper.md 表头加 Zotero 锚点三件套（citekey/itemKey/DOI），CLAUDE.md 页面质量标准新增第 7 条强制；③ AI Butler 单轮 prompt 对齐费曼模板五节（一句话本质/解决什么问题/关键机制/结果与代价/易误解点）。
- BetterBibTeX 已生效（实测 citekey 自动生成）；建议勾选「pin citekey to Extra」让 citekey 成统一 ID，详见 `sources/zotero-ai-butler-integration.md`。
- 回填 `wiki/papers/2026-videochat3.md` 锚点：`liVideoChat3FullyOpen2026a` ｜ `E5RZINH5` ｜ `10.48550/arXiv.2607.14935`。

## [2026-07-27] schema | Ingest 工作流 + 斜杠命令

- 将 Ingest/Query/Review/Lint 四个工作流做成工作区斜杠命令：`.zcode/commands/{ingest,query,review,lint}.md`。
- 经用户同意改 `CLAUDE.md` §1 Phase 0：ingest paper 只给标题时，默认**先 Zote MCP 查 Zotero**（命中即取元数据+全文），找不到再走 arXiv / DOI / URL；ingest.md 同步去掉"必须输入'从 Zotero 拉'"的要求。

## [2026-08-17] ingest | VST

- 第二篇论文入库：华科+小米 ECCV 2026，提出 Video Streaming Thinking（VST）范式——边看边想，把 CoT 推理切碎塞进视频流片段间的等待空档异步执行，写进 FIFO 文本长期记忆，查询时直接读笔记秒答（0.56s vs Video-R1 8.8s，15.7× 加速），推理算力分摊到播放期。
- Zotero 命中（itemKey `6XPHGT5T`）：取元数据（citekey `Guan2026`）+ 全文 + AI Butler 两份子笔记（summary/table，glm-5.3 生成）做预读底稿；PDF 复制 `sources/2026-vst.pdf`。
- 走完费曼 Phase 0→1→2→3：4 道检验题（不增延迟的前提/离线CoT信息泄露+掩码双效/与 VideoChat3 正交互补/FIFO 失败场景与取舍）全部补齐，无残留漏洞，未动 `questions.md`。
- 与库内 [VideoChat3](wiki/papers/2026-videochat3.md) 建互链：正交关系（感知效率 vs 认知时机），论文 limitation 自述文本记忆与视觉记忆机制正交、可组合。
- 建页 `wiki/papers/2026-vst.md`；`index.md` 同步；`review.md` 排入复测 2026-08-20。

## [2026-08-17] review | VideoChat3

- 首次复测：③ 状态机全对；①② 部分遗忘（漏全开源+流式主张、漏池化前联合时空 self-attention 与 inflate 技巧）；三个卡壳点全忘，重新补一轮。
- 两道小检验（池化前 attention 必要性+正常/噪声帧对比、合二为一失败链+消融盲区）回收敛，无残留。
- 判定：部分遗忘 → 重补后通过；间隔递推进 +1 周，下次复测 2026-08-24。

## [2026-08-17] schema | Zotero 锚点改为可点击深链接

- 用户反馈：论文页表头 `citekey/itemKey/DOI` 是纯文本编号，点不动，希望点击能直接在 Zotero 里打开。
- 实测 `zotero://select/items/@citekey`（BetterBibTeX citekey）和 `zotero://select/items/ITEM_KEY`（8 位 key）深链接在本地均可用（`open` 返回 exit 0）。
- 改 `templates/paper.md` 第 6 行：三件套编号均包成 markdown 链接——citekey/itemKey 走 `zotero://select/...`，DOI 走 `https://doi.org/...`，编号文本保留在链接 label 便于 lint 对账。
- 回填 `wiki/papers/2026-videochat3.md` 与 `wiki/papers/2026-vst.md` 表头。
- log.md / review.md 等叙述性文字里的 itemKey 不加链接（非锚点用途）。

## [2026-08-17] schema | sources/ 去冗余：论文原文统一归 Zotero

- 诊断：`sources/` 存了 6 份论文 PDF 副本，Zotero 里全部已有 PDF 附件（VideoChat3/VST/lingbot-vision/genlip/kimi-k3/last-vit），纯冗余浪费存储。
- 改 `CLAUDE.md` 6 处：目录结构注释、Phase 0 定位、获取原文优先级第 1/2 步、页面质量标准第 6 条、给未来 LLM 守则——论文原文统一由 Zotero 管理（深链接可跳转），不往 `sources/` 存 PDF 副本；`sources/` 仅留非论文类原始材料（自写笔记、代码片段等）。
- 改 `templates/paper.md` 第 5 行「原文」字段：从 `URL 或 sources/ 路径` → `Zotero 锚点（见下行）或 URL`。
- 删 `sources/` 下 6 份冗余 PDF；回填 `wiki/papers/2026-videochat3.md` 与 `wiki/papers/2026-vst.md` 表头「原文」字段（去掉 `sources/*.pdf` 引用，改指 Zotero 锚点）。
- `sources/` 现仅剩 2 份自写笔记：`how-to-estimate-gpu-memory.md`、`zotero-ai-butler-integration.md`。
- 注：4 份孤儿 PDF（lingbot-vision/genlip/kimi-k3/last-vit）的 ingest 待用户后续决定，Zotero 已有条目与 AI Butler 笔记可直接拉取。

## [2026-08-17] ingest | GenLIP

- 第三篇论文入库：北交大+ByteDance+NTU，提出 GenLIP——让 ViT 直接「说话」：单个 Transformer + 自回归语言建模直接训视觉编码器从图像 token 预测文本 token（Prefix-LM Attention），不用对比学习也不用独立解码器；8B 样本超 SigLIP2（40B 的 1/5），Gated Attention 防 attention sink。
- Zotero 命中（itemKey `EAKWJXT8`）：取元数据（citekey `fangLetViTSpeak2026`）+ AI Butler 两份子笔记（summary/table，deepseek-v4-pro 生成）做预读底稿。
- 走完费曼 Phase 0→1→2→3：3 道检验题（目标错位+生成式对齐/Prefix-LM 四规则/attention sink+Gated Attention+退化推断）全部补齐，无残留漏洞，未动 `questions.md`。
- 与库内 [VideoChat3](wiki/papers/2026-videochat3.md) 建互链：正交关系（VideoChat3 管「ViT 怎么处理时空冗余」，GenLIP 管「ViT 怎么预训练」）；待入库 last-vit 预留钩子（同为 attention artifact 问题）。
- 建页 `wiki/papers/2026-genlip.md`；`index.md` 同步；`review.md` 排入复测 2026-08-20。

## [2026-08-17] ingest | LaSt-ViT

- 第四篇论文入库：港大+中山大学 CVPR 2026，提出 LaSt-ViT（LazyStrike ViT）——揭示 ViT「偷懒」根因（懒惰聚合：全局注意力+粗粒度监督下靠背景 patch 当 CLS 载体），用频域稳定性评分逼 CLS 只从前景 patch 聚合；跨标签/文本/自监督三种范式，12 基准一致提升，Register 只治标。
- Zotero 命中（itemKey `XNL46XIR`）：取元数据（citekey `shiVisionTransformersNeed2026`）+ 全文 + AI Butler 两份子笔记（summary/table，deepseek-v4-pro 生成）做预读底稿。
- 走完费曼 Phase 0→1→2→3：3 道检验题（懒惰聚合+两驱动+Register/频域稳定性+K=全/GenLIP vs LaSt-ViT 对比+组合）全部补齐，无残留漏洞，未动 `questions.md`。
- 与库内 [GenLIP](wiki/papers/2026-genlip.md) 兑现预留钩子，建正式互链：同为 ViT attention artifact 但机制阶段不同（GenLIP 生成式/Gated Attention vs LaSt-ViT 判别式/频域聚合），正交可组合。
- 建页 `wiki/papers/2026-last-vit.md`；`index.md` 同步；`review.md` 排入复测 2026-08-20。

## [2026-08-17] ingest | Video-o3

- 第五篇论文入库：南京大学+上海 AI Lab ICML 2026，提出 Video-o3——模型在单一共享上下文里多轮「找线索→裁剪放大→连逻辑→出答案」（native interleaved tool invocation）；TDAM 防 Fake Thinking（10% 数据加双向掩码），VTGR 控上下文效率（线索评分+轮数衰减）；MLVU 72.1%、Video-Holmes 46.5%。
- Zotero 命中（itemKey `FG746LWN`）：取元数据（citekey `zengVideoo3NativeInterleaved2026`）+ 全文 + AI Butler 三份子笔记（DeepRead/summary/table）做预读底稿。
- 走完费曼 Phase 0→1→2→3：3 道检验题（原生 vs 解耦+两核心问题/TDAM+Fake Thinking/VST vs Video-o3 推理时机对比+组合冲突）全部补齐，无残留漏洞，未动 `questions.md`。
- 与库内 [VST](wiki/papers/2026-vst.md) 建互链：同属长视频推理但路线不同（VST 推理前置/查询即答 vs Video-o3 推理时检索/多轮探索），可互补但响应时机逻辑冲突需统一调度。
- 建页 `wiki/papers/2026-video-o3.md`；`index.md` 同步；`review.md` 排入复测 2026-08-20。

## [2026-08-19] ingest | U-OPSD

- 第六篇论文入库：UCSD+Georgia Tech+UMD+ByteDance arXiv 2026，提出 U-OPSD——首个完全无外部监督的 on-policy 自蒸馏。后训练方法谱系 SFT→OPD→OPSD→U-OPSD 每步去掉一层外部依赖：U-OPSD 用模型自身 rollout 多数投票的伪解 y+ 替代 OPSD 的 GT 解 y*，作教师特权上下文，只在答错 rollout（disagreeing）的前缀上逐 token 前向 KL 蒸馏；门控（c(x)≥τ 且 Y⁻≠∅）自动挑"能力边界"题，形成自发课程。
- Zotero 命中（itemKey `JD4RZABE`）：取元数据（citekey `Li2026`）+ 全文 + AI Butler 两份子笔记（summary/table，zhipu/glm-5.3 生成）做预读底稿。glm-5.3 复现级笔记质量很高，与其交叉核对一致。
- 走完费曼 Phase 0→1→2→3：3 道检验题（教师/学生上下文反转+13.3%错标签净正收益机制+thinking 增益小三层原因+共识当上下文 vs 当标量奖励）全部补齐，无残留漏洞，未动 `questions.md`。首个卡壳点（学生上下文是否含 y+）确认手误打反后纠正。
- 库内第一篇 LLM 后训练/推理方向论文（前 5 篇均视觉/视频 MLLM）；暂无库内互链，预留钩子：RLVR/GRPO、on-policy distillation、self-consistency 方向。
- 建页 `wiki/papers/2026-u-opsd.md`；`index.md` 同步；`review.md` 排入复测 2026-08-22。

## [2026-08-19] review | VST

- 首次复测：核心直觉保留（推理塞进 clip 间隙掩盖计算时间），但三处遗忘——① 漏 FIFO 文本长期记忆 + 查询即答两块拼图（只记得"推理前置"第一块）；② 超时兜底记反成"阻塞等待上一个片段思考完"（实为回退到最近一次已完成笔记状态作答，宁可记忆旧也不增时延）；③ 流式注意力掩码"顺带治什么"同入库时再次漏（分布漂移/训练-推理架构一致性）——"一箭双雕"锚点（堵未来+堵漂移）两次复测都没记住，已强调。
- 重补两检验题回收敛，无残留漏洞。
- 判定：部分遗忘 → 重补后通过；间隔递推进 +1 周，下次复测 2026-08-26。

## [2026-08-24] ingest | PatternEval/PatternRL

- 第七篇论文入库：中科院自动化所+腾讯 arXiv 2026，"Beyond Correctness"——答案对只是及格线，把"交付响应像不像成品"（response pattern）变成可测量（PatternEval，2,415 题失败富集压力测试，四类失败：CoT leakage/Repetition/Contradiction/Performative reasoning）+ 可训练（PatternRM text-only 奖励模型 → PatternRL 在 GRPO 加封顶 0.1 的模式惩罚）的第二维度。25/25 模型配置非思考模式系统性更脏（最大 Δpat 48.64pp，Kimi-K2.6）；纯正确性 RL 反而恶化行为（+7.33/+7.56pp）；PatternRL 对 BaseRL 修回 −13.08/−14.35pp，PatternEval Acc 变化 <1pp（外部 10 基准 8B −0.7pp，4B −1.87pp 容量依赖）。
- Zotero 命中（itemKey `X5SK3ERP`，citekey `Wang2026`）：取元数据 + 全文 + AI Butler 两份子笔记（summary/table，glm-5.3 生成）做预读底稿；glm-5.3 笔记两处不准确已修正（75.94% 是 Trigger 率不是 CoT 单项；"<1pp" 仅指 PatternEval Acc）。
- 走完费曼 Phase 0→1→2→3：4 道检验题 + 3 道补漏小检验全部收敛。卡壳点三个：三重设计初答遗忘（重补后数值边界复述正确，含一处 −0.1/0.1 符号笔误）；Trigger 自然分布方向两次含混（钉死：Trigger↓ Acc↑）；scalar vs 上下文的核心对比漏答后补齐（信号承担的任务决定密度：教能力要分布，评体面只需排序）。未动 `questions.md`。
- 与 [U-OPSD](wiki/papers/2026-u-opsd.md) 兑现预留 RLVR/GRPO 钩子建互链（GRPO 奖励太穷，两篇分别加知识信号/行为信号）；与 [VST](wiki/papers/2026-vst.md)/[Video-o3](wiki/papers/2026-video-o3.md) 正交（推理时机 vs 交付行为），Fake Thinking 与 performative reasoning 概念近亲。
- 建页 `wiki/papers/2026-pattern-eval.md`；`index.md` 同步；`review.md` 排入复测 2026-08-27。
- 待办：Zotero 重复条目 `WKMNK3TR`（to-ingest 标签，无附件）与 `X5SK3ERP`（正主）建议 merge（keeper `X5SK3ERP`），待用户确认。

## [2026-08-24] ingest | PatternEval/PatternRL · Zotero 重复条目收尾

- 用户确认处理后执行 merge 前核验：`WKMNK3TR` 在本地 Zotero 与 web API 均已 404（大概率用户已自行删除，该条目无附件无笔记零损失），无需 merge。
- 正主 `X5SK3ERP` 完好（PDF + AI Butler 两份笔记 + citekey `Wang2026`），上一条目的待办闭环。

## [2026-08-24] review | GenLIP

- 首次复测：动机层保留（目标错位、轻量 LM head、数据效率 1/5），但四处遗忘——① 结果弱化成"竞品"（实为 1/5 数据全面超越 +4.7，OCR 三项 +9.9~+12.7）；② 编-解码生成式路线痛点记混成"MLP connector + LLM 难优化"（实为 ViT + 独立文本解码器的间接优化 + 架构冗余）；③ Prefix-LM 四规则与 Gated Attention/attention sink 两大核心机制整体遗忘；④ 卡壳点全忘（attention sink 梯度路由）。
- 重讲 + 三道重补检验（四规则+图像表征来源 / attention sink 梯度路由+门控 / 两阶段 OCR 增益来源）全部复述正确，回收敛，无残留。
- 顺手改进页面：`解决什么问题` 表后补防混淆注（独立解码器 ≠ 下游 MLP+LLM 接法）。
- 判定：部分遗忘 → 重补后通过；间隔递推进 +1 周，下次复测 2026-08-31。

## [2026-08-24] review | LaSt-ViT

- 首次复测：核心解法（频域稳定性评分 + 通道级 Top-K 聚合）与 GenLIP 对比保留（后者明显受益于同日先复测 GenLIP 的迁移效应）；遗忘——① 诊断证据链整块（Patch Score/PiB/遮挡高分 patch 分类不掉三证据）；② 懒惰聚合第二驱动"全局注意力"再次忘（原卡壳点二次遗忘）；③ Register 反降证据（42.7→41.5）；④ "低频"漏"通道维"精化；⑤ 卡壳点全忘。
- 重讲 + 三道重补检验（两驱动+窗口注意力实验 / Register 症状 vs 病因+反降方向 / 通道维低频反向论证+K 全量退化成平均池化）全部正确，回收敛，无残留。
- 顺手改进页面：卡壳点"频域真正机制"补复测时自生成的类比（空间低频=墙壁平滑区恰是背景不可作判据；通道维低频≈语义分割输出图同类别同色）。
- 判定：部分遗忘 → 重补后通过；间隔递推进 +1 周，下次复测 2026-08-31。

## [2026-08-24] review | Video-o3

- 首次复测：骨架保留（两老毛病、回合制循环全流程、VST 描述——后者受益于 08-19 复测红利）；遗忘——① 三种旧范式；② TDAM 与 VTGR 两大机制整体遗忘；③ "原生"含义（原卡壳点①）；④ 推理时机 VST 查询前 vs Video-o3 查询后二次遗忘（原卡壳点②）；⑤ 卡壳点全忘。
- 重讲 + 三道重补检验（原生+两问题两解法配对 / TDAM 双向掩码+10% 比例 / 推理时机+冲突）基本全对（一处"全局裁剪"笔误、γ 轮数衰减漏半项）；Fake Thinking 残留漏 → 补讲后迷你检验完整复述（现象/原因/对应掩码），回收敛，无残留。
- 判定：部分遗忘 → 重补后通过；间隔递推进 +1 周，下次复测 2026-08-31。
- 复习方法观察：连续四篇首次复测（GenLIP/LaSt-ViT/Video-o3）均现"卡壳点全忘"——入库时的卡壳点是遗忘重灾区，后续复测应优先扫卡壳点。

## [2026-08-24] schema | 复测提问方法修正：具体问题替代元问题

- 用户反馈："上次卡壳点是什么"这类元问题必然答不出来——元记忆（记住"曾卡壳"这件事）远难于内容记忆，测不出真实遗忘。证据：GenLIP 复测中问"attention sink 为什么生成式更容易触发"（具体问题）用户立刻答对，而"卡壳点记得吗"答"忘了"。
- 落地两改：① `.zcode/commands/review.md` 第 2 步：重讲后直接从页面「卡壳点与解答」节抽原始问题改写成具体问题问，禁止元问题；② 经用户同意改 `CLAUDE.md` §3.2 同步此规则。
- 更正今日三条 review 的"⑤ 卡壳点全忘"：部分为提问方法 artifact，不代表内容遗忘。真实遗忘以具体问题漏答为准——LaSt-ViT 两驱动（具体问过，二次遗忘成立）、Video-o3 推理时机（对比题漏答，二次遗忘成立）仍成立；"卡壳点全忘"本身撤销作为遗忘证据。

## [2026-08-24] schema | 复测不考具体数字

- 用户反馈：复测验收是费曼标准（机制/直觉/定性结论），不是背数字——核对时把"效果数字全无"列为遗漏项与 Phase 2"不出背诵题"自相矛盾。
- 改 `CLAUDE.md` §3.3 与 `.zcode/commands/review.md` 第 3 步：具体数字不算复测核对项（页面可查）；定性量级感（如"1/5 数据全面超越"）可测。

## [2026-08-24] review | U-OPSD

- 首次复测（新提问方法首战）：核心保留——教师/学生上下文关系原卡壳点**首答即对**（入库时曾手误答反，具体问题直接问的方法生效）；"偶尔出错的题是收益最大的能力边界盲区"洞察讲出；共识当上下文 vs 标量成立（受益于同日 PatternEval 对比）。
- 遗忘/偏差：① 门控（c(x)≥τ 且 Y⁻≠∅）整体漏——"能力边界"直觉讲了但机制载体丢了；② 反向 KL 罚错对象（应罚学生）+ 失败模式记偏（复读塌缩，非幻觉）；③ label-only 掉分机制答偏（过程信息断供，非错标签带偏）；④ thinking 增益小漏第三原因（c(x) 分母含截断废 rollout）；⑤ 13.3% 四重设计要求提示后由 LLM 讲解补齐；⑥ "更自信"为理解偏差（U-OPSD 是纠错非提升自信）已纠正。
- 顺手改页：卡壳点"前向 KL"条补复测暴露的两处易记偏（罚错对象/复读塌缩非幻觉）。
- 判定：部分遗忘 → 重讲后通过；间隔递推进 +1 周，下次复测 2026-08-31。

## [2026-08-24] review | VideoChat3

- 第 2 次复测：较 08-17 首测大幅进步——① 原卡壳点"线性 vs 二次方"首答焊牢；② 上次遗忘点"池化前联合时空 self-attention"回归；③ 状态机三态行为+分辨率配对全对；④ 上次重补的两题（零冗余两层：效率机械成立/质量塌掉；合二为一失败链：小证据→不进 Standby→永不放大→一直沉默）均完整复述。
- 遗忘：inflate 二次遗漏（已重讲：拿预训练图像 ViT 把 2D 空间 attention 撑成 3D 时空 attention，权重复用，非从零训）；"全开源"主张二次遗漏（三份数据集+四阶段配方全放，回应半开源通病）；pixel shuffle 口径错（2×2=4×，总 16×=时间 4××空间 4×，非 pixel shuffle 独享）。
- 下次复测优先扫：inflate、全开源（二次遗漏项）。
- 判定：部分遗忘 → 重补后通过；间隔递推进 +1 月，下次复测 2026-09-24。

## [2026-08-27] ingest | Open-MOPD

- 第八篇论文入库：清华 AIR × ByteDance Seed arXiv 2026，诊断 M-OPD（多教师 on-policy 蒸馏）integration gap 根源——证伪 teacher conflict 假说（分歧均值 0.126 nat、高冲突 token 仅 0.62%、conflict mask/consensus 干预全降分），定位为 token 级优化预算三层错配（长度差 25× 的结构性 token 失衡 / 收敛速度差导致的幅度漂移 / K 次内更新 reward 陈旧），三机制（token-share balancing / gap-following allocation / reward refresh）分别在三个时间尺度修复，回收率 35.6%→83.4%，refresh 零额外开销。
- Zotero 命中（itemKey `S2DP7DZX`，citekey `Gao2026`）：取元数据 + 全文 + AI Butler 两份子笔记（summary/table，glm-5.3 生成）做预读底稿；summary 笔记在 §4 机制处截断，机制与消融部分由原文 PDF 补齐核对。
- 走完费曼 Phase 0→1→2→3：4 道检验题 + 2 道补漏小检验全部收敛。卡壳点两个：反向归一化正反馈环初答断链（"把学好的带崩"→重讲后完整复述发散机制，含 clamp 与 gap 方向两层刹车钉开）；reward refresh 第一轮完全没理解（全文最大卡壳点，重讲"教师项缓存/学生项重算恰好免费/轨迹陈旧修不掉"后通过）。
- 与 [U-OPSD](wiki/papers/2026-u-opsd.md) 兑现预留 on-policy distillation 钩子建互链（OPD 家族正交切片：单教师信号来源 vs 多教师预算分配，组合方案成立）；与 [PatternEval](wiki/papers/2026-pattern-eval.md) 扩线成三篇共线"后训练信号设计"主题（知识信号/行为信号/dense token 信号）。
- 建页 `wiki/papers/2026-open-mopd.md`；`index.md` 同步；`review.md` 排入复测 2026-08-30。

## [2026-08-28] review | VST

- 第 2 次复测：较首测大幅进步——FIFO 文本记忆 + 查询即答两块拼图重讲时自己讲回（首测整块漏）；超时兜底方向修正（不阻塞、回退最近完整记忆，首测记反成阻塞等待）；离线 CoT 上帝视角泄漏答对。
- 流式掩码"顺带治什么"第三次漏（答"防上下文干扰"，被"历史文本全可见"证伪）——换「掩码=推理可见性的镜子」框架（训练是彩排、可见性照演出来）+ 两规则拆解（①不看未来永远要、②只看最近L随架构定）重讲；首道复验套原则时混淆两规则（推理取消窗口仍答"全保留"），拆解讲透后转移复验（文本改 RAG top-3 的变换）全对，收敛。
- 顺手改页：卡壳点流式掩码条补 08-28 重讲版（镜子锚点 + 两规则 + 两个反例变换）。
- 判定：部分遗忘 → 重补后通过；间隔递推进 +1 月，下次复测 2026-09-28，优先扫流式掩码（三漏）。

## [2026-09-02] review | PatternEval/PatternRL 复测跳过 + 用户确认删库

- 首次复测未完成：重讲覆盖三层失明定位与奖励三重护栏（后者为入库首漏点，本次完整），但 PatternEval 基准（失败富集/四类分类学/双裁判）、PatternRM、跨组-组内分工整块未讲；结果段与页面逐字一致（含精确数字与加粗格式）。追问四题后用户选择跳过。
- 用户随后确认将本篇从库中删除（库无 git，不可恢复）。
- 执行：删 `wiki/papers/2026-pattern-eval.md`；清理 U-OPSD（关联节一条 + 钩子行一句）与 Open-MOPD（关联节一条）共三处互链；`index.md` / `review.md` 同步移除。
- 影响：「后训练信号设计」共线主题由三篇缩为两篇（U-OPSD 知识信号 / Open-MOPD dense token 信号）；Zotero 条目（itemKey `X5SK3ERP`，PDF + AI Butler 两份笔记）未动，原文仍可回查、可重新入库。

## [2026-09-02] schema | 新增 site/ 伴生 HTML 速览库

- 应用户需求建快速查阅层：导航页（分组卡片 + 关键词过滤）+ 7 篇论文速览页（每篇 7 张纵向滑页：封面/一页看懂/关键机制/关键数字/卡壳点/关联），scroll-snap + 键盘翻页，纯静态零依赖，双击 site/index.html 离线可用。
- 设计方向由 taste-skill（design-taste-frontend v2，装于 .zcode/skills/）推断：瑞士编辑风 / 中性 zinc 底 + 单一朱砂强调 / 全直角细线 / mono 数字标签 / 暗色自适应；固化于 site/assets/wiki-slides.css（唯一样式源）。
- schema 同步：CLAUDE.md 目录结构 + Ingest Phase 3 第 4 步（同步速览页）+ Review 第 5 步 + Lint 增查 site/ 一致性 + 新增「site/ 速览库规范」节；.zcode/commands 的 ingest/review/lint 同步；index.md 顶部加快查入口。markdown 仍是唯一真源。

## [2026-09-02] schema | site/ 速览库部署上线 + 工作流挂钩

- 部署到 dmit VPS（nginx:alpine 容器，接入 komari_default 网络的 nginx-proxy + acme-companion 自动 HTTPS），子域 wiki.arnowei.cloud，basic_auth 口令保护（user=xinli）。
- 本地 site/deploy.sh（rsync --delete 同步 + 健康检查），凭据 site/.deploy.env（已排除不上传不进 git）。
- 工作流挂钩：CLAUDE.md Ingest Phase 3 第 5 步 + Review 第 5 步均追加「改完速览页执行 deploy.sh」；ingest.md / review.md 命令同步；site/ 速览库规范节补部署条目。
- 待办：用户在 Cloudflare 加 wiki.arnowei.cloud 的 A 记录（69.63.214.137，DNS only）后证书自动签发。

## [2026-09-02] schema | 部署切换为 GitHub 同步模式

- 部署链路改为纯 GitHub：本地 git push → VPS cron 每 2 分钟 git pull 自动同步。不再用 rsync。
- 初始化 git 仓库（main 分支），建 GitHub 私有仓库 buptweixin/llm-wiki，.gitignore 排除 .deploy.env/.zcode/.obsidian。
- VPS 端：仓库克隆到 /root/workspace/llm-wiki/，.deploy/ 目录（不入 git）放 docker-compose.yml + nginx 配置 + htpasswd + sync.sh，cron */2 执行 sync.sh。
- site/deploy.sh 改为 git add+commit+push + 健康检查（等 VPS cron 拉取）。
- 端到端验证通过：本地 push → VPS cron pull → 线上更新（延迟 ≤2 分钟）。

## [2026-09-02] schema | 认证切换为 oauth2-proxy（GitHub 登录）

- 去掉 basic auth 口令，改用 oauth2-proxy 容器做 GitHub OAuth 认证，仅限 buptweixin 账号访问。
- VPS 架构：llm-wiki-web（nginx 静态）+ llm-wiki-auth（oauth2-proxy v7.7.1），auth 容器接入 nginx-proxy + acme-companion 自动 HTTPS。
- 本地 deploy.sh 去掉明文口令（.deploy.env 不再需要）；健康检查只验站点可达（200/302/403 均算正常，403 = 未认证的 oauth2-proxy 登录页）。
- CLAUDE.md site/ 规范节第 7 条同步更新。

## [2026-09-02] ingest | S²VOPD（Self-Supervised Visual On-Policy Distillation）

- U-OPSD 同作者线的视觉域续作：零特权监督的 VLM on-policy 自蒸馏，把学生的输入图退化（降采样 0.3~0.6× + DDPM 噪声）构造师生不对称，4B 70.68→77.44 超 235B 开源与 GPT-5.4。Zotero AWVKHW9W（citekey liSelfSupervisedVisualOnPolicy2026），AI Butler 预读（WAIZQ4EN/J9RDZC8L）质量高，与原文逐项核实，核出"96%"无正文推导（自行补算）与 §4.3 基座读数协议口径不一致两处。
- 费曼两轮收敛。卡壳点：①"难度论"被 crop 消融证伪（真机制是向信息完整版自己对齐）；② 与 U-OPSD 散度结论完全颠倒（fKL 必选 vs JSD 最好），用"教师多出的信息可否恢复"统一解释；③ y+ 说成"伪标签"两连犯（老卡壳点复发，下次复测优先）；④ OCR 失效边界为本人推演。
- 互链：U-OPSD（域互补 + 散度冲突注记）、Open-MOPD（散度第三数据点），OPD 家族三页成谱系。速览页 site/papers/2026-s2vopd.html，复测排 2026-09-05。

## [2026-09-04] ingest | LocateAnything（Parallel Box Decoding）

- 第九篇论文入库：NVIDIA 2026-05，3B 统一 VLM 检测/grounding，提出 Parallel Box Decoding——把 2D 框当原子单元整块并行解码。库内第一篇 grounding/检测方向论文，开「解码表征与推理效率」新线。
- Zotero 命中（itemKey `7KYM7ZBM`，citekey `wangLocateAnythingFastHighQuality2026`）：取元数据 + PDF 逐页核验（方法 p.4-7、实验 p.8-11）+ AI Butler 两份子笔记（summary Y4IH7DBI / table BTHUC235，deepseek-v4-pro 生成）做预读底稿。
- 机制骨架：输出组织成 L=6 固定块（semantic/box/negative/end 四类）；同 GT 双格式训练（NTP 接龙卷 + MTP 填空卷）拼一条序列，混合掩码三规则（NTP 因果禁看 x_blk / x_blk 块间因果 / 块内双向）；推理三模式 Slow-NTP / Fast-MTP / Hybrid（触发器 top-1 坐标概率<0.7 且 top-5 极差>80 双条件 → 局部回退 NTP 重写问题块）。底座 Moon-ViT（Kimi）+ Qwen2.5 + MLP。
- 费曼检验收敛（初讲用户卡在"具体怎么做"，重讲升级到 token 级演算后通过）。卡壳点 4 个：① 讲解颗粒度（必须 token 级走查）；② 触发器双条件 = 检测候选分布"撕裂"（初答把极差理解成框大小，三态表纠正）；③ PBD-Slow vs 旧 NTP 同是 NTP 解码却 +2 的归因（初答"互相促进"太泛，Table 6c「只训 Lntp 零增益 50.1、加 Lblk 才 52.1」定位出几何联合监督压进共享权重）；④ 通用 MTP 为何又慢又差（跨边界虚假相关）。"块内双向注意力在单步并行中的信息论作用"存疑但论文未展开，暂不立问题。
- AI 预读核出 4 处修正：数据口径精确化（138M 查询/12M 图/785M 框）；Moon-ViT 补来源（Kimi Team 2025）；消融归因补 Lblk 决定性对照；触发器"撕裂分布"语义补讲。AI-Table 笔记信息量低未采用；GJXSHNW7 note 是用户备注非预读。
- 互链：VST（延迟主题正交：藏起来 vs 减步数）、Video-o3/VST（感知侧 vs 推理行动侧，GUI grounding 是 agent 感知底座）。预留钩子：结构无关 MTP/diffusion LM 家族（SDLM/Block Diffusion/LLaDA/Dream/DiffusionVL）、grounding RL（Vision-R1/UniVG-R1/GW-VLM）、结构化输出并行迁移族。
- 建页 `wiki/papers/2026-locateanything.md`；`index.md` 同步；`review.md` 排入复测 2026-09-07。
