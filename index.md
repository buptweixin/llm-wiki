# 索引 — 全库地图

> 由 LLM 维护：任何页面新增/改名/删除后必须同步本文件。
> 条目格式：`- [标题](路径) — 一句话摘要`
> 快速查阅：本库有伴生 HTML 阅读层 [site/index.html](site/index.html)（连续阅读、专题筛选与专题导读、标签与全文片段搜索）；markdown 页仍是唯一完整真源。

## 概念 Concepts

_暂无_

## 论文 Papers

- [VideoChat3](wiki/papers/2026-videochat3.md) — VideoChat3 先在视觉编码器里压缩时空 token，再用状态决定回复时机与下一窗口的分辨率。
- [VST](wiki/papers/2026-vst.md) — VST 在视频片段之间先思考、写入有限文本记忆，查询到达后用已完成的记忆回答，以降低查询延迟。
- [GenLIP](wiki/papers/2026-genlip.md) — GenLIP 让同一个 Transformer 看图并生成描述，用下一词预测训练视觉表示，之后取出它作为视觉编码器。
- [LaSt-ViT](wiki/papers/2026-last-vit.md) — LaSt-ViT 按特征通道的频域稳定性选择 patch 来构成 CLS，减轻背景聚合造成的定位偏差。
- [Video-o3](wiki/papers/2026-video-o3.md) — Video-o3 拿到问题后，在同一上下文里交替推理与裁剪视频，让新找到的证据继续参与回答。
- [TSPO](wiki/papers/2026-tspo.md) — TSPO 根据问题从候选帧中选择一组关键帧，用冻结 MLLM 的回答奖励训练选帧策略。
- [GeoAnchor](wiki/papers/2026-geoanchor.md) — GeoAnchor 在文本推理之间插入位置、方向和场景结构三类连续潜变量，用它们辅助回答 3D 空间问题。
- [U-OPSD](wiki/papers/2026-u-opsd.md) — U-OPSD 用模型自己投票形成的完整解题轨迹给教师增加上下文，再沿学生的反对轨迹做分布蒸馏。
- [Open-MOPD](wiki/papers/2026-open-mopd.md) — Open-MOPD 按 token 份额、奖励幅度和奖励新鲜度分配多教师蒸馏的训练预算，缓解各域优化失衡。
- [S²VOPD](wiki/papers/2026-s2vopd.md) — S²VOPD 让教师看清晰图、学生看退化图，在学生自己生成的前缀上对齐分布，以视觉信息差提供自蒸馏信号。
- [LocateAnything](wiki/papers/2026-locateanything.md) — LocateAnything 把一个框对齐成固定长 token 块，在框内并行生成坐标，必要时只对不可靠的块退回逐词解码。
- [PPO](wiki/papers/2017-ppo.md) — PPO-Clip 修改策略更新的评分规则，减弱把采样动作概率继续推远的激励，让一批近期轨迹可以做有限轮更新。
- [DeepSeekMath](wiki/papers/2024-deepseekmath.md) — DeepSeekMath 用数学数据预训练、监督微调和 GRPO 提升数学推理；GRPO 用同题多次作答的相对奖励代替独立 Critic。
- [DAPO](wiki/papers/2025-dapo.md) — DAPO 用四项改动改善长推理 RL：保住探索、补充有区分的题、按 token 分配损失权重，并缓和接近长度上限时的惩罚。

## 代码 Code

_暂无_

## 综合 Syntheses

- [专题：蒸馏与训练预算](wiki/syntheses/distillation.md) — 本专题把三篇论文分成两个问题：U-OPSD 与 S²VOPD 构造自蒸馏信息差，Open-MOPD 分配多教师训练预算。
- [专题：视频理解与响应](wiki/syntheses/video-understanding.md) — 本专题按感知成本、思考时机和证据获取组织四篇视频论文，帮助比较它们各自解决的瓶颈。

## 维护文档

- [快速复习静态阅读验收](docs/reviews/quick-review-static-2026-10-04.md) — 14 篇论文与 2 个专题直接呈现条件解释和历史卡壳解答；VST 用静态图与规则表，主动自测保留「先回忆」。

- [历史文章学习入口优化验收](docs/reviews/history-learning-upgrade-2026-10-04.md) — 14 篇论文与 2 个专题统一短句机制讲解、预测与迁移练习；9 篇补取 24 张原图，三层投影与证据边界同步，保留历史复述和复测记录。
- [理解输出形式的流程评估与试点方案](docs/specs/learning-output-formats.md) — 对照 Karpathy 的 STE、图解、网页与视频建议，评估现有费曼流程与阅读层；建议先试中文写作约束和围绕卡壳点的图/交互，含 VST、PPO、Open-MOPD 示例及延迟复测验收。首轮已落实规则、模板、命令与 VST 交互试点；静态图预览改用同源 PNG，学习效果待验证。
- [专题导读首轮验收](docs/reviews/site-topic-hubs-review-2026-09-09.md) — 对 1e4eb79 验收：设计与基本阅读路径符合方案；发现内容条件、组合证据标签、原话保真及两类真源同步漏检，附临时副本反例与修复标准。
- [站点专题导读与论文关系方案](docs/specs/site-topic-hubs.md) — 在主题筛选之上增加专题阅读页，以问题地图、方法分叉、Mermaid、比较表和阅读路径串联论文；包含首批专题示例、证据规则与实施验收标准。2026-09-09 已按阶段 A~C 实施首批两个专题（蒸馏、视频理解），阶段 D 待内容成熟。
- [站点阅读体验改造 Spec](docs/specs/site-reading-redesign.md) — 自然滚动阅读、问题专题、标签与关联、全文搜索、复测状态及分阶段迁移计划；工程维护文档，不计入费曼知识页。
- [站点标签词表](taxonomy.md) — 专题、机制与目标标签的受控 ID、显示名和适用范围；工程维护文档，不计入费曼知识页。
- [站点阅读改造验收报告](docs/reviews/site-reading-redesign-review-2026-09-07.md) — 对提交 b35b7b2 的功能与 spec 验收，记录复现步骤、优先级和返工顺序。
- [站点阅读改造第二轮验收报告](docs/reviews/site-reading-redesign-review-2026-09-08.md) — 对提交 3c7f95a 复验：五项原问题已修复，全文搜索、返回路径和手机关键入口仍需收尾。
- [站点阅读改造第三轮验收报告](docs/reviews/site-reading-redesign-review-2026-09-08-round-3.md) — 复核未提交修复：27 项新全文抽样全部命中，仍需修复组合筛选丢失、段落定位、回忆提示泄漏与比较遮挡。
- [站点阅读改造第四轮验收报告](docs/reviews/site-reading-redesign-review-2026-09-08-round-4.md) — file:// 与 HTTP 复验：来源状态、九篇回忆与比较交互通过，全文短语定位仍有跨行内标签和只匹配首词两类失败。
- [站点阅读改造第五轮验收报告](docs/reviews/site-reading-redesign-review-2026-09-08-round-5.md) — 原 8 个定位查询与回归抽查通过；新样本在较矮手机视口暴露块间匹配优先级问题，仍有 1 项 P2 需修复。
- [站点阅读改造第六轮验收报告](docs/reviews/site-reading-redesign-review-2026-09-08-round-6.md) — 双尺寸、双通道确认 T2-c 与 P3 关闭，8 个旧查询、10 个新样本及 T1/T3/T4 抽查通过。
- [站点阅读改造分析与修复交接](docs/reviews/site-reading-redesign-analysis-2026-09-08.md) — 对 087cb87 整轮改造的设计判断，记录四项 P2、搜索与手机布局优化方向，以及复现步骤和验收标准。
- [站点阅读 S1~S4 修复与 O1~O3 优化报告](docs/reviews/site-reading-redesign-fixes-2026-09-08.md) — 按交接文档完成四项 P2 与三项优化：回忆入口统一、来源继承、目录定位分离、索引生成器真源全量重建，附静态回归脚本 check-site.mjs 与浏览器验证证据。
- [站点阅读改造第七轮验收报告](docs/reviews/site-reading-redesign-review-2026-09-09-round-7.md) — 复核 8d661fe：S1/S3/O1/O2 通过，SOURCE 完整笔记出口与索引缺失章节检查仍有两项 P2，O3 部分完成。
