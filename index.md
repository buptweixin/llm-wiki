# 索引 — 全库地图

> 由 LLM 维护：任何页面新增/改名/删除后必须同步本文件。
> 条目格式：`- [标题](路径) — 一句话摘要`
> 快速查阅：本库有伴生 HTML 速览层 [site/index.html](site/index.html)（双击打开，纵向滑页 + 关键词过滤）；markdown 页仍是唯一完整真源。

## 概念 Concepts

_暂无_

## 论文 Papers

- [VideoChat3](wiki/papers/2026-videochat3.md) — 4B 全开源 Video MLLM；核心是用 I3D-ViT（把图像 ViT 撑成 3D）在视觉编码器里把视频 token 压掉 16×，再用「像人看直播」的状态机自适应分辨率处理流式视频。
- [VST](wiki/papers/2026-vst.md) — 让 VideoLLM「边看边想」：把 CoT 推理切碎塞进视频流片段间的等待空档异步执行，写进 FIFO 文本长期记忆，用户提问时直接读笔记秒答（0.56s），推理算力分摊到播放期，零额外查询延迟。
- [GenLIP](wiki/papers/2026-genlip.md) — 让 ViT 直接「说话」：单个 Transformer + 自回归语言建模直接训视觉编码器从图像 token 预测文本 token（Prefix-LM Attention），不用对比学习也不用独立解码器；8B 样本超 SigLIP2（40B），Gated Attention 防 attention sink。
- [LaSt-ViT](wiki/papers/2026-last-vit.md) — 揭示 ViT「偷懒」根因（懒惰聚合：全局注意力+粗粒度监督下靠背景 patch 当 CLS 载体），用频域稳定性评分逼 CLS 只从前景 patch 聚合；跨标签/文本/自监督三种范式，12 基准一致提升，Register 只治标。
- [Video-o3](wiki/papers/2026-video-o3.md) — 像侦探破案一样看视频：模型在单一共享上下文里多轮「找线索→裁剪放大→连逻辑→出答案」，工具调用由模型自己生成（原生交错）；TDAM 防 Fake Thinking，VTGR 控上下文效率；MLVU 72.1%、Video-Holmes 46.5%。
- [U-OPSD](wiki/papers/2026-u-opsd.md) — 首个完全无外部监督的 on-policy 自蒸馏：模型自己做 8 遍题，多数投票伪解当教师特权上下文，只在答错 rollout 上逐 token 前向 KL 蒸馏"看过答案的自己"——去掉 OPSD 最后一层 GT 解依赖，非思考模式反而超过有 GT 的 OPSD（+3.2%/+2.3%）。
- [Open-MOPD](wiki/papers/2026-open-mopd.md) — 多专家蒸不进一个学生的病根不是教师打架（证伪实验：conflict mask 全降分），而是 token 级优化预算三层错配：长度差 25× 吃掉短响应域的 token 份额（IF 占 20% prompt 只拿 0.99% 梯度）+ 收敛速度差导致预算漂移 + K 次内更新让 reward 陈旧；三个机制分别在三个时间尺度修复，回收率 35.6%→83.4%，refresh 零开销（学生项重算恰好免费，PPO 本来就算）。

## 代码 Code

_暂无_

## 综合 Syntheses

_暂无_
