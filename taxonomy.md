# 站点标签词表

站点首页与文章页使用这份受控词表。标签只服务于查找，不代表学习状态；新增标签前先确认它能帮助用户找到至少一类内容。

页面归属写在各 markdown 页头的 front-matter（`topic` / `mechanisms` / `goals`），`site/assets/wiki-index.js` 是它的静态投影：页面标签、首页筛选、文章页可点击标签都从同一份 ID 解析，显示名与别名只作展示和归一用途。

## 专题 `topic`

| ID | 名称 | 适用范围 |
|---|---|---|
| `video-understanding` | 视频理解与响应 | 视频感知、流式处理、推理时机与长视频检索 |
| `visual-encoders` | 视觉编码器 | ViT、视觉预训练目标、注意力与表示学习 |
| `distillation` | 蒸馏与训练预算 | on-policy 蒸馏、自蒸馏、教师信号与优化预算 |
| `structured-output` | 结构化输出与定位 | 坐标、框、结构化解码与视觉 grounding |

## 机制 `mechanism`

| ID | 名称 | 别名 |
|---|---|---|
| `video-mlm` | 视频 MLLM | VideoLLM |
| `token-compression` | token 压缩 | visual token compression |
| `streaming-inference` | 流式推理 | 流式视频、streaming video |
| `memory` | 文本记忆 | FIFO memory、双记忆系统 |
| `cot-reasoning` | CoT 推理 | 链式推理、chain-of-thought |
| `group-rl` | GRPO | 组相对强化学习 |
| `generative-pretraining` | 生成式预训练 | Prefix-LM |
| `attention-sink` | attention sink | 注意力汇 |
| `lazy-aggregation` | 懒惰聚合 | lazy aggregation |
| `frequency-analysis` | 频域分析 | frequency stability |
| `on-policy-distillation` | on-policy 蒸馏 | OPD、on-policy 蒸馏 |
| `self-distillation` | 自蒸馏 | self-distillation |
| `multi-teacher` | 多教师蒸馏 | multi-teacher distillation |
| `budget-allocation` | 训练预算 | token budget、预算分配 |
| `data-augmentation` | 数据增强 | augmentation |
| `parallel-decoding` | 并行解码 | block decoding、并行框解码 |
| `grounding` | 视觉定位 | VLM grounding |
| `tool-use` | 工具调用 | native interleaving |

## 目标 `goal`

| ID | 名称 |
|---|---|
| `lower-latency` | 降低响应延迟 |
| `reduce-supervision` | 减少外部监督 |
| `improve-efficiency` | 提高推理效率 |
| `improve-representation` | 改善视觉表示 |
| `improve-grounding` | 提高定位精度 |
| `improve-reasoning` | 提高推理深度 |
| `improve-perception` | 提高细粒度感知 |
| `improve-training-efficiency` | 提高训练预算利用率 |

「待复测」「已通过」「待验证」不进入标签词表，它们分别来自 `review.md`、复测记录和页面中的证据状态。
