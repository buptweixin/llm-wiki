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
- [DeepSeekMath](wiki/papers/2024-deepseekmath.md) — DeepSeekMath 用数学数据预训练、监督微调和 GRPO 提升数学推理；GRPO 用同题多次作答的相对奖励代替独立 Critic。2026-10-25 复测补充评分/价值分工、KL 与 PPO 边界及有限采样的证据限定。
- [DAPO](wiki/papers/2025-dapo.md) — DAPO 用四项改动改善长推理 RL：保住探索、补充有区分的题、按 token 分配损失权重，并缓和接近长度上限时的惩罚。2026-10-25 复测补充长短回答权重表、正负优势 min 分支与软长度扣分边界。
- [GSPO](wiki/papers/2025-gspo.md) — GSPO 把策略比率与裁剪从逐 token 提升到整条序列长度归一化似然，消除粒度错位，使 MoE 与长推理 RL 无需 Routing Replay 即可稳定收敛。
- [SAO](wiki/papers/2026-sao.md) — SAO 用单 rollout 采样替代组采样消除异步等待瓶颈，配合冻结注意力的强 Critic、Skip-Observation GAE 与双侧硬门控裁剪（DIS），实现长时程智能体异步 RL 的千步稳定训练。

## 代码 Code

_暂无_

## 综合 Syntheses

- [专题：蒸馏与训练预算](wiki/syntheses/distillation.md) — 本专题把三篇论文分成两个问题：U-OPSD 与 S²VOPD 构造自蒸馏信息差，Open-MOPD 分配多教师训练预算。
- [专题：视频理解与响应](wiki/syntheses/video-understanding.md) — 本专题按感知成本、思考时机和证据获取组织四篇视频论文，帮助比较它们各自解决的瓶颈。

## 维护文档

- [工程设计说明与历史验收归档](docs/README.md) — 阅读层设计 Spec（连续阅读、专题导读、讲解输出形式）与历轮验收报告总目录；工程维护文档，不计入费曼知识页。
- [站点标签词表](taxonomy.md) — 专题、机制与目标标签的受控 ID、显示名和适用范围；工程维护文档，不计入费曼知识页。
