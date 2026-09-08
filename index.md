# 索引 — 全库地图

> 由 LLM 维护：任何页面新增/改名/删除后必须同步本文件。
> 条目格式：`- [标题](路径) — 一句话摘要`
> 快速查阅：本库有伴生 HTML 阅读层 [site/index.html](site/index.html)（连续阅读、专题筛选、标签与全文片段搜索）；markdown 页仍是唯一完整真源。

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
- [S²VOPD](wiki/papers/2026-s2vopd.md) — 零特权视觉 on-policy 自蒸馏：把学生的输入图故意降采样加噪弄坏，EMA 教师看原图，学生每步向"看得清的自己"对齐——不对称不必给教师加信息，可以从学生减信息；4B 涨到 77.44 超 235B 开源模型与 GPT-5.4，冻结教师只掉 0.4（增益来自那张图不是自我改进）。
- [LocateAnything](wiki/papers/2026-locateanything.md) — VLM 检测别再把框拆成 token 流逐个蹦：把整个框当一个固定长块（`<box> x1 y1 x2 y2 </box>`）并行解码，训练用"接龙卷+填空卷"双格式、块内坐标联合监督；Hybrid 12.7 框/秒（Qwen3-VL 的 10×+）且贴边精度大涨（LVIS F1@0.95 31.1 vs 别家 ~20），另一半功劳靠 12M 图/138M 查询/785M 框数据引擎。

## 代码 Code

_暂无_

## 综合 Syntheses

_暂无_

## 维护文档

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
