/* 静态索引。真源：wiki/papers/*.md 与 wiki/syntheses/*.md（front-matter 与正文）、taxonomy.md、review.md。
 * 速览条目与全文投影条目均保留完整导航路径；搜索片段来自真实可见的速览、导读或完整笔记正文。
 * title/relations/既有速览条目是编辑判断字段，重建时从本文件保留；essence、机制讲解与其余字段由真源生成。
 * 消费者读取 href / noteHref / sourceHref，不按 id 拼接目录；type 为 paper 或 synthesis。
 * 使用：node scripts/build-wiki-index.mjs（校验失败会拒绝生成；CHECK_DRY_RUN=1 输出到 stdout）。
 */
window.WIKI_TOPICS = {
  "video-understanding": "视频理解与响应",
  "visual-encoders": "视觉编码器",
  "distillation": "蒸馏与训练预算",
  "structured-output": "结构化输出与定位",
  "reinforcement-learning": "强化学习与对齐",
  "spatial-reasoning": "3D 空间推理"
};

window.WIKI_TAXONOMY = [
  {
    "id": "video-mlm",
    "dim": "mechanism",
    "label": "视频 MLLM",
    "aliases": [
      "VideoLLM"
    ]
  },
  {
    "id": "token-compression",
    "dim": "mechanism",
    "label": "token 压缩",
    "aliases": [
      "visual token compression"
    ]
  },
  {
    "id": "streaming-inference",
    "dim": "mechanism",
    "label": "流式推理",
    "aliases": [
      "流式视频",
      "streaming video"
    ]
  },
  {
    "id": "memory",
    "dim": "mechanism",
    "label": "文本记忆",
    "aliases": [
      "FIFO memory",
      "双记忆系统"
    ]
  },
  {
    "id": "cot-reasoning",
    "dim": "mechanism",
    "label": "CoT 推理",
    "aliases": [
      "链式推理",
      "chain-of-thought"
    ]
  },
  {
    "id": "group-rl",
    "dim": "mechanism",
    "label": "GRPO",
    "aliases": [
      "组相对强化学习"
    ]
  },
  {
    "id": "generative-pretraining",
    "dim": "mechanism",
    "label": "生成式预训练",
    "aliases": [
      "Prefix-LM"
    ]
  },
  {
    "id": "attention-sink",
    "dim": "mechanism",
    "label": "attention sink",
    "aliases": [
      "注意力汇"
    ]
  },
  {
    "id": "lazy-aggregation",
    "dim": "mechanism",
    "label": "懒惰聚合",
    "aliases": [
      "lazy aggregation"
    ]
  },
  {
    "id": "frequency-analysis",
    "dim": "mechanism",
    "label": "频域分析",
    "aliases": [
      "frequency stability"
    ]
  },
  {
    "id": "on-policy-distillation",
    "dim": "mechanism",
    "label": "on-policy 蒸馏",
    "aliases": [
      "OPD",
      "on-policy 蒸馏"
    ]
  },
  {
    "id": "self-distillation",
    "dim": "mechanism",
    "label": "自蒸馏",
    "aliases": [
      "self-distillation"
    ]
  },
  {
    "id": "multi-teacher",
    "dim": "mechanism",
    "label": "多教师蒸馏",
    "aliases": [
      "multi-teacher distillation"
    ]
  },
  {
    "id": "budget-allocation",
    "dim": "mechanism",
    "label": "训练预算",
    "aliases": [
      "token budget",
      "预算分配"
    ]
  },
  {
    "id": "data-augmentation",
    "dim": "mechanism",
    "label": "数据增强",
    "aliases": [
      "augmentation"
    ]
  },
  {
    "id": "parallel-decoding",
    "dim": "mechanism",
    "label": "并行解码",
    "aliases": [
      "block decoding",
      "并行框解码"
    ]
  },
  {
    "id": "grounding",
    "dim": "mechanism",
    "label": "视觉定位",
    "aliases": [
      "VLM grounding"
    ]
  },
  {
    "id": "latent-reasoning",
    "dim": "mechanism",
    "label": "潜变量推理",
    "aliases": [
      "latent reasoning",
      "text-latent interleaved",
      "潜变量交错推理"
    ]
  },
  {
    "id": "tool-use",
    "dim": "mechanism",
    "label": "工具调用",
    "aliases": [
      "native interleaving"
    ]
  },
  {
    "id": "temporal-sampling",
    "dim": "mechanism",
    "label": "时序采样",
    "aliases": [
      "temporal sampling",
      "keyframe selection"
    ]
  },
  {
    "id": "policy-gradient",
    "dim": "mechanism",
    "label": "策略梯度",
    "aliases": [
      "Policy Gradient",
      "策略优化"
    ]
  },
  {
    "id": "clipped-surrogate",
    "dim": "mechanism",
    "label": "裁剪代理目标",
    "aliases": [
      "PPO-Clip",
      "clipping objective",
      "近端策略优化"
    ]
  },
  {
    "id": "continuous-control",
    "dim": "mechanism",
    "label": "连续控制",
    "aliases": [
      "连续动作空间",
      "高斯策略",
      "机器人控制"
    ]
  },
  {
    "id": "gae",
    "dim": "mechanism",
    "label": "GAE",
    "aliases": [
      "广义优势估计",
      "优势估计",
      "Generalized Advantage Estimation"
    ]
  },
  {
    "id": "lower-latency",
    "dim": "goal",
    "label": "降低响应延迟",
    "aliases": []
  },
  {
    "id": "reduce-supervision",
    "dim": "goal",
    "label": "减少外部监督",
    "aliases": []
  },
  {
    "id": "improve-efficiency",
    "dim": "goal",
    "label": "提高推理效率",
    "aliases": []
  },
  {
    "id": "improve-representation",
    "dim": "goal",
    "label": "改善视觉表示",
    "aliases": []
  },
  {
    "id": "improve-grounding",
    "dim": "goal",
    "label": "提高定位精度",
    "aliases": []
  },
  {
    "id": "improve-reasoning",
    "dim": "goal",
    "label": "提高推理深度",
    "aliases": []
  },
  {
    "id": "improve-perception",
    "dim": "goal",
    "label": "提高细粒度感知",
    "aliases": []
  },
  {
    "id": "improve-training-efficiency",
    "dim": "goal",
    "label": "提高训练预算利用率",
    "aliases": []
  },
  {
    "id": "improve-stability",
    "dim": "goal",
    "label": "提高训练稳定性",
    "aliases": []
  }
];

/* relations 的 status：reported = 原文报告；synthesis = 库内对照；hypothesis = 待验证假说。 */
/* 综合页另有 members（主线论文）、refs（跨专题引用）与 records（关系记录：id/from/type/to/claim/status/evidence）。 */
/* review：next = 下次复测日期（review.md），last = 上次复测，count = 复测次数；count 0 表示待首测。 */
window.WIKI_INDEX = [
  {
    "id": "2026-videochat3",
    "type": "paper",
    "title": "VideoChat3",
    "href": "papers/2026-videochat3.html",
    "noteHref": "notes/papers/2026-videochat3.html",
    "sourceHref": "wiki/papers/2026-videochat3.md",
    "date": "2026-07-27",
    "topic": "video-understanding",
    "aliases": [
      "VideoChat3",
      "VideoChat-Flash",
      "I3D-ViT"
    ],
    "tags": [
      "video-mlm",
      "token-compression",
      "streaming-inference",
      "improve-efficiency"
    ],
    "essence": "VideoChat3 先在视觉编码器里压缩时空 token，再用状态决定回复时机与下一窗口的分辨率。",
    "review": {
      "next": "2026-09-24",
      "last": "2026-08-24",
      "count": 2,
      "result": "pass"
    },
    "relations": [
      {
        "type": "complement",
        "to": "2026-vst",
        "reason": "编码器压缩与状态机控制感知成本；VST 前置思考并写文本记忆。VST 原文提出与视觉记忆互补的方向。",
        "status": "reported"
      },
      {
        "type": "possible-combination",
        "to": "2026-genlip",
        "reason": "研究把 GenLIP 预训练的 ViT 接入 I3D-ViT；需要验证结构、输入与训练适配，本库无替换实验。",
        "status": "hypothesis"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2026-videochat3.html#rebuild",
        "t": "把每帧独立编码后直接交给 LLM，会留下大量时空重复 token。VideoChat3 在视觉编码器里先处理局部时空信息，再控制进入 LLM 的 token 与分辨率。 一组帧共同编码 I3D-ViT 把图像 ViT 扩展到时空注意力，让同一 chunk 的帧先交互。 先压缩再进 LLM 默认 4 帧做时间聚合，空间做 2×2 pixel shuffle，总 token 数约为逐帧表示的 1/16。 状态控制下一窗口 Silence、Standby、Response 决定是否回应，并控制下一窗口的像素预算。训练保留切换点并采样保持点。 具体例子（教学假设） ：4 帧，每帧 16 个 patch，共 64 个。时间聚合成 16 个位置，再把 2×2 空间位置组合成 4 个 token。64→4 解释的是 token 计数，不是整条模型计算量必定缩小 16 倍。 边界 ：压缩会丢信息，低分辨率也可能漏掉小目标。当前状态决定下一窗口预算，不能让已经以低分辨率看过的当前证据自动变清楚。 换个条件看机制 若只训练状态切换点、不训练保持点，模型是否学会了完整的“何时继续保持状态”决策？ 没有。论文同时采样保持点，让模型比较当前视觉证据与先前状态。只看切换点会缺少维持状态的监督。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2026-videochat3.html#rebuild",
        "t": "五分钟重建 把每帧独立编码后直接交给 LLM，会留下大量时空重复 token。VideoChat3 在视觉编码器里先处理局部时空信息，再控制进入 LLM 的 token 与分辨率。 一组帧共同编码 I3D-ViT 把图像 ViT 扩展到时空注意力，让同一 chunk 的帧先交互。 先压缩再进 LLM 默认 4 帧做时间聚合，空间做 2×2 pixel shuffle，总 token 数约为逐帧表示的 1/16。 状态控制下一窗口 Silence、Standby、Response 决定是否回应，并控制下一窗口的像素预算。训练保留切换点并采样保持点。 具体例子（教学假设） ：4 帧，每帧 16 个 patch，共 64 个。时间聚合成 16 个位置，再把 2×2 空间位置组合成 4 个 token。64→4 解释的是 token 计数，不是整条模型计算量必定缩小 16 倍。 边界 ：压缩会丢信息，低分辨率也可能漏掉小目标。当前状态决定下一窗口预算，不能让已经以低分辨率看过的当前证据自动变清楚。 换个条件看机制 若只训练状态切换点、不训练保持点，模型是否学会了完整的“何时继续保持状态”决策？ 没有。论文同时采样保持点，让模型比较当前视觉证据与先前状态。只看切换点会缺少维持状态的监督。 可选自测 关掉提示后解释：减少视觉 token、提高分辨率、决定回复时机，分别在解决什么问题？ 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 论文图解",
        "a": "notes/papers/2026-videochat3.html#figures",
        "t": "论文图解 I3D-ViT 在进入 LLM 前压缩视频 *图 2 费曼图解（论文 Figure 2）：从下往上读：多帧在时空编码器内交互，默认四帧时间聚合，再做 2×2 空间组合，经 projector 进入 LLM。16 倍是视觉 token 数量比，不是整个系统的固定加速倍率。* 状态控制下一窗口的分辨率 *图 3 费曼图解（论文 Figure 3）：下方是视频流，上方是 Silence、Standby、Response 状态。当前状态决定下一窗口的像素预算；Standby 提高后续观察分辨率，Response 触发回答。先前低分辨率下漏掉的细节不会因此自动补回。* 状态切换与保持点的监督 *图 9 费曼图解（论文 Figure 9）：所有 Transform 切换点都训练，Keep 保持点随机抽取同样数量。既教模型何时改变状态，也教它何时维持状态，避免只按上一状态走捷径。*"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-videochat3.html#problem",
        "t": "解决什么问题 当时开源 Video MLLM 三个通病： 泛化差：一个模型往往只擅长一种视频场景（短视频 / 长视频 / 流式交互），换个场景就掉链子。 算力吃不消：视频帧率一高、分辨率一上去，视觉 token 数爆炸。LLM 注意力是 O(序列长度²)，token 翻倍算力翻四倍，长视频/实时流式几乎跑不动。 半开源：强模型要么闭源，要么只放权重不放数据/配方/代码，没法复现，社区也没法在它上面继续做。 VideoChat3 的目标是同时把这三件事解决掉，并提供一个完全可复现的开源基座。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-videochat3.html#intuition",
        "t": "大白话讲解 先建一个常识底座 图像 MLLM（如 LLaVA）= ViT（视觉编码器）→ MLP projector → LLM。 最早的视频 MLLM 就是「把视频抽成 N 帧，每帧当独立图片喂进去」。 这套老做法的痛：为了把 token 控制住，只能稀疏抽帧（一小时视频只抽 32 帧），等于进模型前就把信息扔了：细微动作、短时运动全没了；而且相邻帧其实大量重叠冗余（背景几乎不变），但一帧一帧独立编码，根本没利用这种重复。 核心主张：越早压缩越划算 把冗余的、重复的、能合并的视频信息，在视觉编码器里就压掉，别等它进了 LLM 的二次方注意力才处理。 🔧 最容易卡住的点：「为什么不直接靠 LLM 的长上下文兜底？」 因为视觉编码器开销近似线性涨，LLM 注意力二次方涨。把压缩活儿从「贵的二次方阶段」挪到「便宜的线性阶段」是一笔视频越长越划算的买卖（这也解释了为什么短视频 VideoChat3 没优势，到 2048 帧才大幅反超）。 类比①：I3D-ViT（时间维度压缩） 想象「人跑步」的 4 帧连拍。每帧独立描述要说 4 遍「这是个人、在跑道、背景是草地」。聪明的做法是：把 4 帧看作一个「小段」，先在段内让它们互相看一眼（发现「背景没变，变的是腿的位置」），再压成 1 个带运动信息的表示。这就是 I3D-ViT 干的事。 四步： Chunked Frame Grouping：视频切成每 T 帧一个 chunk（默认 T=4），每个 chunk 是局部时空单元。 Temporal Positional Encoding：保留图像编码器原有的空间位置编码 + 新学一份时间位置编码（区分 chunk 内第 0~3 帧）。 Native-Resolution Spatiotemporal Modeling：chunk 内所有帧的 token 拍成一个序列，做联合时空 self-attention，让相邻帧的冗余在编码器内部被「消化」。 Chunk-Wise Temporal Pooling：时间维池化，T 帧压成 1 → token 数除以 T。 加上 pixel shuffle 带来的 2×2 空间下采样，总压缩比 = 4 × 4 = 16×。 ⚡ 关键技巧叫 inflate（膨胀）：不从零训 3D 编码器（数据不够、太难），而是拿预训练图像 ViT（MoonViT），把它原本的 2D 空间 self-attention「撑」成 3D 时空 self-attention，权重可复用。「I3D」致敬经典的 I3D 卷积网络（2D Conv → 3D Conv 的老套路）。 类比②：Adaptive Frame Resolution（空间维度 + 流式，全篇最妙） 人看足球直播：中场倒脚时半眯着眼，前锋突破冲向球门立刻瞪大眼盯细节。VideoChat3 让模型也这么干。 流式推理被建模成状态机闭环：每个时间窗口处理完，模型先吐一个状态 token，三选一： 状态 含义 行为 下一个窗口像素预算 ------ ------ ------ ------ </Silence> 没有相关证据 闭嘴继续看 低（224²） </Standby> 可能有料但不够 闭嘴，准备细看 高（448²） </Response> 证据够了 生成答案，回到低预算 低（224²） 🧠 全篇最妙：状态 token 一身兼两职：既是「要不要回答、什么时候回答」的决策，又是「下一个窗口用多少像素」的控制信号。一个 token 同时驱动了响应时机策略和主动视觉预算策略。因为 I3D-ViT 本来就支持变分辨率输入，不需要单独的高分辨率编码器，只是改下一个 chunk 的像素配额。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-videochat3.html#mechanism",
        "t": "关键机制 I3D-ViT 的 inflate + 16× 压缩 见上「大白话讲解 · 类比①」。默认 T=4，配合 2×2 pixel shuffle = 16× 时空压缩。同时提供可变长视频接口：短视频高保真，长视频/长流低帧率低分辨率，让视觉瓶颈「自适应」而非固定。 Adaptive Frame Resolution 的状态机 见上「大白话讲解 · 类比②」。状态 token 既驱动响应时机，又驱动下一窗口像素预算（确定性控制器：Silence/Response→224²，Standby→448²）。 state-transition mask（训练流式行为的小技巧） 流式训练有个两难： 朴素做法（所有状态 token 都算 loss）：满眼都是 </Silence>（绝大多数窗口没料），模型学出「永远闭嘴」的保守策略，几乎不进 Standby/Response。 极端做法（只在状态变化处算 loss）：模型发现「上一个 Silence，下一个大概率还是 Silence」，直接从前一状态猜下一个，根本不看视频：走捷径。 解法：保留所有「状态切换点」T = {t s_t ≠ s_{t-1}}（决策边界必须学），再从「状态保持点」里均匀采样同样多个，逼模型比较「上一状态 vs 当前视觉证据」才能决定保不保持。最终有效监督比例 </Silence> : </Standby> : </Response> = 2 : 2 : 1。 三份数据集（为什么是三份） 数据集 规模 解决什么 -------------- ------ ------------------------------------------------------------------------------------------------------------------------------------- Academic2M 2.27M 学术数据集（LLaVA-Video、Spoken-MIT、Vript 等）标签可靠但太稀疏（只给选项/短语）。用 Qwen3-VL-235B 把短答案改写成带时间证据的丰富回答（3.5× 字数），再用判别模型过滤幻觉。原则：原答案锁语义边界，改写只丰富表达。 LV116K 116.2K 学术数据都是短视频（均值 3~59 秒）。长视频难点是证据稀疏分布、跨段聚合。pipeline：过滤 → PySceneDetect 切段 → 逐段标注+质检 → 拼成 timeline / 多区间 grounding / 跨段 QA。均值 156s~1.3Ks。 OL617K 617K 把离线 QA 转成流式：定位关键证据区间 → 裁出来验证（VLM 能从裁出的片段答对才留）→ 转成交错的 </Silence>/</Standby>/</Response> 序列。 四阶段训练 Stage 0（视觉编码器预训练，临时挂 Qwen3-4B 当解码器，训完扔掉只留 ViT 权重）→ Stage 1（接正式 LLM，caption 对齐）→ Stage 2（通用视频指令微调，~50B tokens）→ Stage 3（长视频 + 流式，扩展上下文窗口，~10B tokens）。每阶段都是「projector warm-up → 联合训练」两步走。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2026-videochat3.html#evidence",
        "t": "结果与代价 效果：4B 参数，18/19 项指标超 Qwen3-VL-4B；时间定位（TimeLens +9.7/+6.4/+8.3、VUE-TR +15.0/+20.6）大幅领先；流式 OVO-Timing F1 35.5 vs Qwen3-VL 8.1（+27.4）。 效率（H200 + FlashAttention-2）：同等 ViT patch 下视觉 token 只有 Qwen3-VL 一半；1024 帧延迟 8.1s vs 12.3s；2048 帧 20.4s vs 44.4s，FLOPs 砍 60%+，显存省 26GB。 代价：视觉编码器本身延迟更高（加了时空建模），短视频（256 帧）反而比 Qwen3-VL 慢一点：优势要视频够长才显现。 局限：ProactiveVQA 仍输给专门的 MMDuet-2；Adaptive Frame Resolution 在低分辨率（224²）监控下小尺度证据可能被漏掉（见卡壳点 Q3）；论文未消融「状态 token 合并 vs 拆分」。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2026-videochat3.html#restatement",
        "t": "我的复述 费曼检验时的原话，保留原味不润色。 Q1（为什么压缩要放在视觉编码器里、而不是让 LLM 长上下文兜底）： LLM 计算复杂度和上下文长度呈二次方复杂度关系，放到 LLM 代价太高了。 Q2（相邻帧零冗余时，I3D-ViT 还能拿到 16× 压缩的好处吗）： 能拿到，但是很多重要信息会被压缩丢掉，表达能力会下降。 Q3（状态 token 合二为一 vs 拆开成独立预算模块）： 训练时要设计两份数据一份关注状态 token 一份关注像素预算，并且推理的时候需要先过独立小模块确定像素预算，然后再过主模型推理成本上升；合二为一能把推理预算和状态统一考虑，在找证据的时候需要快速扫过无关信息，找到证据部分之后需要用高分辨率仔细阅读，这比较符合逻辑，隐患是由于采用了低分辨率找证据，如果证据尺度比较小容易被忽视。"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2026-videochat3.html#pitfalls",
        "t": "卡壳点与解答 Q：为什么是「在视觉编码器里压缩」而不是「让 LLM 长上下文兜底」？ A：两种开销不对称：视觉编码器近似线性增长，LLM 注意力二次方增长。把压缩从贵的二次方阶段挪到便宜的线性阶段，视频越长越赚（256 帧时 VideoChat3 反而略慢，2048 帧才反超）。 Q：相邻帧零冗余（如纯噪声）时，I3D-ViT 的 16× 压缩还成立吗？ A：分两层看： 算力层：16× 压缩是机械性的（T→1 池化 + 2×2 pixel shuffle，跟内容无关），永远成立，token 数和算力照样省。 质量层：I3D-ViT 在池化前做时空 attention 的全部意义，就是「让相邻帧先交换信息以在压缩中保真」，这依赖冗余存在。零冗余时池化 = 把 T 个无关场景硬塞进 1 token，损失最大化，主打细粒度运动（MotionBench/TempCompass）的卖点会塌掉。净结果：速度保住，精度塌掉，设计赌注被违反。 Q：状态 token 合二为一（既管响应时机又管像素预算）vs 拆开，各有什么利弊？ A： 拆开：训练要单独定义「何时开高分辨率」的新监督目标（当前是状态标签白送的）；推理要多过一个小模块，成本上升。 合二为一（当前做法）的好处：符合「快速扫无关 → 找到证据后高分辨率细读」的人看直播直觉；监督信号白送；一个 token 同时把响应策略和预算策略一起端到端学。 合二为一的隐患（论文未讨论）： 低分辨率（224²）监控下，小尺度证据（小物体/细微动作/小字幕）可能看不见 → 模型永远不进 Standby → 永远不放大 → 错过响应。这是 Adaptive Frame Resolution 的内生失败模式。 一个 token 背两个目标，梯度把「响应时机」和「预算控制」两路信号混在一起。 论文 Table 6 只消融了「动态 vs 固定预算」，没消融「合并 vs 拆分」，所以我们其实不知道拆开会不会更好。"
      },
      {
        "h": "全文问答 · Q：为什么是「在视觉编码器里压缩」而不是「让 LLM 长上下文兜底」？",
        "a": "notes/papers/2026-videochat3.html#qa-where-compress",
        "t": "Q：为什么是「在视觉编码器里压缩」而不是「让 LLM 长上下文兜底」？ 两种开销不对称：视觉编码器近似线性增长，LLM 注意力二次方增长。把压缩从贵的二次方阶段挪到便宜的线性阶段，视频越长越赚（256 帧时 VideoChat3 反而略慢，2048 帧才反超）。"
      },
      {
        "h": "全文问答 · Q：相邻帧零冗余（如纯噪声）时，I3D-ViT 的 16× 压缩还成立吗？",
        "a": "notes/papers/2026-videochat3.html#qa-zero-redundancy",
        "t": "Q：相邻帧零冗余（如纯噪声）时，I3D-ViT 的 16× 压缩还成立吗？ 分两层看： 算力层 ：16× 压缩是机械性的（T→1 池化 + 2×2 pixel shuffle，跟内容无关），永远成立，token 数和算力照样省。 质量层 ：I3D-ViT 在池化 前 做时空 attention 的全部意义，就是「让相邻帧先交换信息以在压缩中保真」，这依赖冗余存在。零冗余时池化 = 把 T 个无关场景硬塞进 1 token，损失最大化，主打细粒度运动（MotionBench/TempCompass）的卖点会塌掉。净结果： 速度保住，精度塌掉，设计赌注被违反 。"
      },
      {
        "h": "全文问答 · Q：状态 token 合二为一（既管响应时机又管像素预算）vs 拆开，各有什么利弊？",
        "a": "notes/papers/2026-videochat3.html#qa-state-token",
        "t": "Q：状态 token 合二为一（既管响应时机又管像素预算）vs 拆开，各有什么利弊？ 拆开 ：训练要单独定义「何时开高分辨率」的新监督目标（当前是状态标签白送的）；推理要多过一个小模块，成本上升。 合二为一（当前做法）的好处 ：符合「快速扫无关 → 找到证据后高分辨率细读」的人看直播直觉；监督信号白送；一个 token 同时把响应策略和预算策略一起端到端学。 合二为一的隐患（论文未讨论） ： 低分辨率（224²）监控下， 小尺度证据（小物体/细微动作/小字幕）可能看不见 → 模型永远不进 Standby → 永远不放大 → 错过响应 。这是 Adaptive Frame Resolution 的内生失败模式。 一个 token 背两个目标，梯度把「响应时机」和「预算控制」两路信号混在一起。 论文 Table 6 只消融了「动态 vs 固定预算」， 没消融「合并 vs 拆分」 ，所以我们其实不知道拆开会不会更好。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-videochat3.html#open",
        "t": "还没搞懂 （三道检验题都已补齐，无残留漏洞。若日后复测发现新问题，再回填此处并同步 questions.md。）"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-videochat3.html#relations",
        "t": "关联 VST ： 思路正交、可互补。VideoChat3 管「视觉编码器里压 token + 状态机自适应分辨率/响应时机」=感知效率；VST 管「推理时机前移 + 文本长期记忆」=认知时机。VST 的文本记忆「与视觉记忆机制正交」（VST 论文 limitation 自述），组合是未来方向。 GenLIP ： 正交。VideoChat3 的 I3D-ViT 是把图像 ViT「撑成 3D」处理视频，但没讨论 ViT 本身怎么预训练；GenLIP 回答的正是「这个 ViT 怎么训」：让 ViT 直接做生成式预训练（Prefix-LM + Gated Attention）。将 GenLIP 的 ViT 接入 I3D-ViT 是组合设想（待验证），本库没有该替换实验。 待建概念页：visual tokenizer / ViT / self-attention（二次方开销） / Video MLLM / streaming video understanding / inflate（2D→3D，致敬 I3D CNN） 同领域可对比的 Video MLLM：Qwen3-VL-4B、Molmo2-4B、VideoChat-Flash-7B、InternVideo2.5-8B（均为此文主要 baseline） 同系列前作：VideoChat-Flash（层级压缩）、VideoChat-R1（RL 微调）"
      }
    ]
  },
  {
    "id": "2026-vst",
    "type": "paper",
    "title": "VST",
    "href": "papers/2026-vst.html",
    "noteHref": "notes/papers/2026-vst.html",
    "sourceHref": "wiki/papers/2026-vst.md",
    "date": "2026-08-17",
    "topic": "video-understanding",
    "aliases": [
      "VST",
      "Video Streaming Thinking"
    ],
    "tags": [
      "streaming-inference",
      "memory",
      "cot-reasoning",
      "group-rl",
      "lower-latency",
      "improve-reasoning"
    ],
    "essence": "VST 在视频片段之间先思考、写入有限文本记忆，查询到达后用已完成的记忆回答，以降低查询延迟。",
    "review": {
      "next": "2026-09-28",
      "last": "2026-08-28",
      "count": 2,
      "result": "pass"
    },
    "relations": [
      {
        "type": "complement",
        "to": "2026-videochat3",
        "reason": "感知成本与思考时机是不同环节；两路记忆及回复时机的联合调度尚待验证。",
        "status": "synthesis"
      },
      {
        "type": "compare",
        "to": "2026-video-o3",
        "reason": "VST 在查询前写记忆；Video-o3 在查询后多轮裁剪找证据。文中计时来自各自实验，不能直接当作同任务速度排名。",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2026-vst.html#rebuild",
        "t": "等用户提问后再做长推理，会增加查询延迟。VST 利用视频片段之间的空档先想、先记，查询到达后使用已完成的记忆作答。 片段到达 短期视觉缓冲只保留最近 L 个视觉 token，未来片段尚不可见。 空档内写想法 把当前画面与已有笔记联系起来，写入固定容量 FIFO 文本记忆。最旧条目会被淘汰。 查询到达后回答 用当前画面与已完成记忆回答。后台思考未完成时，可回退到最近一次完整记忆。 具体例子（教学假设） ：一个片段间隔为 16 秒，思考用 7 秒，可以在下一段到达前完成。若改成 20 秒思考，就可能落后，只能利用最近已完成的记忆。这里说明调度，不预测新硬件上的延迟。 边界 ：低查询延迟不等于没有后台计算。固定记忆也不保证保留全部历史证据。训练可见范围必须与部署对齐，过去已到达与未来尚未到达是两类条件。 换个条件看机制 把视觉部署改为保留所有已到达 token，训练仍只看最近 L 个，会造成哪种不一致？ 训练与部署的历史视觉范围不同。训练应同步改为已到达前缀；未来依然不可见。下面的静态图与规则表列出窗口和前缀两种情况。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2026-vst.html#rebuild",
        "t": "五分钟重建 等用户提问后再做长推理，会增加查询延迟。VST 利用视频片段之间的空档先想、先记，查询到达后使用已完成的记忆作答。 片段到达 短期视觉缓冲只保留最近 L 个视觉 token，未来片段尚不可见。 空档内写想法 把当前画面与已有笔记联系起来，写入固定容量 FIFO 文本记忆。最旧条目会被淘汰。 查询到达后回答 用当前画面与已完成记忆回答。后台思考未完成时，可回退到最近一次完整记忆。 具体例子（教学假设） ：一个片段间隔为 16 秒，思考用 7 秒，可以在下一段到达前完成。若改成 20 秒思考，就可能落后，只能利用最近已完成的记忆。这里说明调度，不预测新硬件上的延迟。 边界 ：低查询延迟不等于没有后台计算。固定记忆也不保证保留全部历史证据。训练可见范围必须与部署对齐，过去已到达与未来尚未到达是两类条件。 换个条件看机制 把视觉部署改为保留所有已到达 token，训练仍只看最近 L 个，会造成哪种不一致？ 训练与部署的历史视觉范围不同。训练应同步改为已到达前缀；未来依然不可见。下面的静态图与规则表列出窗口和前缀两种情况。 可选自测 关掉提示后解释：视觉窗口、FIFO 文本记忆和因果掩码分别保留或限制哪一种信息？ 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 论文图解",
        "a": "notes/papers/2026-vst.html#figures",
        "t": "论文图解 在线离线表现与推理时机比较 *图 1 费曼图解（论文 Figure 1）：下方三条时间线比较只感知、查询后推理和查询前思考。VST 把部分思考放进播放期，上方给出对应测试结果。查询延迟变低，不表示总计算成本消失。* 视觉短期缓冲与文本长期记忆 *图 2 费曼图解（论文 Figure 2）：当前视频片段先进入有限视觉缓冲，再与已有文本笔记一起形成新想法。FIFO 淘汰旧文本条目，所以长期记忆也有容量限制，不是保存全部历史画面。* 因果 SFT 与答案奖励 RL *图 3 费曼图解（论文 Figure 3）：左侧的流式注意力图限制视觉可见范围；右侧用最终答案奖励更新整条生成轨迹。训练既要防未来泄露，也要模拟部署的窗口规则；答案奖励不逐句证明每条 thought 都正确。*"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-vst.html#problem",
        "t": "解决什么问题 在线视频理解里，「显式深度推理」和「实时低延迟响应」天然冲突。两条旧路各有死穴： 路线 代表 做什么 痛在哪 ------ ------ -------- -------- 流式感知 StreamForest、Flash-VStream、VideoLLM-online 压视觉 token / KV cache 检索，管好「记忆」 只做感知级记忆，没有显式推理，多跳时序推理（如 VideoHolmes）就拉胯 离线 CoT 直接搬来 Video-R1、LongVILA-R1 查询到达后才一步步推理 QA 延迟爆炸（Video-R1 8.8s vs 不推理的 0.54s），实时场景直接不可用 还有个隐藏的坑：拿现成离线 CoT 数据训流式模型也不行：离线 CoT 是全局 hindsight 视角写的，thoughts 里偷藏后文信息（信息泄露），模型学成「作弊」，流式部署时没未来可看就崩。这是 VST 要造一套严格因果的数据合成管线的根本原因。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-vst.html#intuition",
        "t": "大白话讲解 类比：边看直播边做笔记 想象你看一部长篇悬疑剧直播。两种看法： Video-R1 式：全程干看不动笔，等朋友突然问「凶手什么时候第一次出现？」，你才从头回忆、一步步推理：答得慢（8.8s），还可能因为信息太散想错。 VST 式：你每看一段就随手在笔记本上写一句「这段发生了啥、跟前面有什么联系」，笔记按先进先出留着最近的几条。朋友一问，你翻翻笔记直接答（0.56s），而且因为笔记是边看边理的逻辑链，答得还更准。 「笔记本」= 长期文本记忆（FIFO 固定容量，会淘汰最旧条目）；「当前画面」= 短期视觉缓冲（滑动窗口，只留最近 L 个视觉 token）。两者合称双记忆系统。信息流：视觉 → 思考 → 文本记忆 → 后续思考/答案。 🔧 最容易卡住的点①：「边看边想」凭什么不增加延迟？ 关键在异步 + 分摊。视频流按 clip 断续到达（每 16：32s 来一段），中间有天然空档（clip inter-arrival interval）。模型趁下一段没到的空档把这段的「想法」写完（实测平均 7.0s，P99 11.2s，都 < 最小触发间隔 16s）。这段算力被播放时间吸收了，不挂在查询后的响应时间上。所以 QA 延迟（查询提交→响应完成）只有 0.56s，和不推理几乎一样。它增加的是后台算力，不是用户感知的响应延迟。 万一思考慢于间隔（卡住），VST 回退到最近一次已完成的记忆状态作答：保证「不阻塞响应」，不保证「记忆一定最新」。 🔧 最容易卡住的点②：离线 CoT 数据为什么不能直接拿来训？ 因为它是「看完全片后」写的，思考链里会自然引用后文信息（比如第 3 段的 thought 提到第 7 段才出现的物件）。模型学成「偷看未来」，流式部署时没未来可看就崩。 图解：训练与部署能看哪些视觉 token 未来画面尚未到达，所以训练和部署都不能看它们。窗口部署只保留最近 L 个视觉 token，训练也要采用同样的可见范围。若部署改成保留所有已到达的视觉 token，训练规则也应同步改变；遮住未来的规则仍然保留。 VST 可见性示意：t=6、L=3 时，训练和窗口部署都能看视觉 token 4、5、6，1、2、3 已出窗口，7、8 尚未到达 *机制图解：示例有 8 个视觉 token，当前已到达 token 6，窗口容量 L=3。训练与窗口部署都只看 token 4、5、6；早期画面已出窗口，未来画面尚未到达。每格是一个视觉 token，不是一帧或一秒；文本记忆另有规则，本图不画文本记忆。* 窗口与前缀：四种规则对照 图中示例有 8 个视觉 token，t=6 表示最新已到达的索引，L=3 表示视觉窗口容量。窗口规则可见 max(1, t-L+1) 到 t；前缀规则可见 1 到 t。所有场景都遮住 t 之后的未来。每格一个视觉 token。本图表只说明视觉可见性，文本记忆另有规则；它不预测性能。 场景 训练规则 部署规则 解释与边界 窗口部署，训练也用窗口 最近 L 个已到达 token 最近 L 个已到达 token VST 的视觉窗口规则。训练照部署的可见范围来，两边都遮住未来。 窗口部署，训练只遮未来 所有已到达 token 最近 L 个已到达 token 教学反例：训练允许回看已出窗口的画面，部署却做不到。当 t 不大于 L 时，当前范围碰巧相同，但规则仍不同。 保留已到达画面，训练同步调整 所有已到达 token 所有已到达 token 假设变更：两边都改为已到达前缀，仍不看未来。此处仅比较可见性，未验证这种变更的性能与成本。 保留已到达画面，训练仍用窗口 最近 L 个已到达 token 所有已到达 token 教学反例：部署保留了更早的画面，训练却仍遮住它们。当 t 不大于 L 时，当前范围碰巧相同，但规则仍不同。 关闭图解后再解释：如果部署保留全部已到达画面，训练应该改哪条规则？为什么未来仍不可见？本演示只作练习，不记录掌握状态或复测通过。 2026-10-04：新增静态图和条件变换练习，待试用；本次没有进行理解检验。2026-08-28 换框架后的反例复验记录保留。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-vst.html#mechanism",
        "t": "关键机制 ① 范式：推理时机从「查询后」挪到「查询前」 VST 把「思考 + 作答」的联合概率拆成两段： $$p(y, \\{z^k\\} \\mid q, V) = \\underbrace{p(y \\mid q, c^K, m^{K-1})}_{\\text{查询后直接答}} \\prod_{k=1}^{K-1} \\underbrace{p(z^k \\mid c^k, m^{k-1})}_{\\text{查询前边看边想}}$$ 每来一个 clip $c^k$，模型拿「当前片段 + 之前累积的笔记 $m^{k-1}$」生成想法 $z^k$，写入记忆（FIFO 淘汰最旧）。到第 K 段用户提问 $q$，直接拿「全部笔记 + 当前画面」生成答案，不再做 post-query 长推理。 两个好处：(1) 推理算力分摊到播放期，查询不涨价；(2) 逐段生成的想法天然对齐视频的时间因果性，方便离线模型迁移到流式。 ② 训练：VST-SFT → VST-RL 两阶段 VST-SFT（学会协议）：用合成的因果 CoT 数据做监督微调。两个关键工程技巧： 流式注意力掩码（式3）：训练时强制模拟推理时的滑动视觉窗口：每个 token 只能看到最近 L 个视觉 token（短期缓冲），但所有历史文本（笔记、记忆）全部可见。既防信息泄露（堵未来），又对齐训练-推理架构（堵分布漂移）：不加掩码的话训练看全片、推理只能看一段，分布不一致导致推理掉点。 时序分段（式4）：超长视频切成多段训练，段间靠记忆递归传递，绕过上下文长度限制（每样本上限 128s）。Loss 只算在 thoughts 和最终答案上，视觉 token 和历史记忆当条件。 VST-RL（自我改进）：SFT 只是模仿（off-policy），RL 让模型自己探索什么样的思考有用。用 GRPO：每问采 8 条轨迹（每条 = 一串 thoughts + 一个答案），奖励只看最终答案对不对（verifiable reward），但组相对优势赋给轨迹内全部生成 token（含中间 thoughts）：答案对了，中间那些思考就算有功。这就把「答案正确性」的信用间接传回中间推理步骤，逼模型写出真正有用的思考而非废话。clip 用 DAPO 式非对称超参，KL 系数 β=0.001。 ③ 数据合成：知识图谱驱动的因果 CoT 生成 没现成数据，VST 自己造了 100K 条。流程：PySceneDetect 切场景 → 滑动窗口让 Gemini 抽 (头实体, 关系, 尾实体) 三元组建知识图谱（窗口滑过丢最旧帧，保证因果）→ NetworkX 建图 → 随机起点 DFS 采证据链（多跳，链间实体重叠 <10% 保多样性）→ Gemini 基于证据链生成「流式 CoT + QA 对」→ 五重过滤（世界知识/格式/逻辑/重复/thought 校验）。每段 thought 严格只引用当前及过往内容，强制多证据关联。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2026-vst.html#evidence",
        "t": "结果与代价 在线 SOTA：StreamingBench 79.5%（超开源 SOTA StreamForest +2.2%，超 GPT-4o +6.2%）；OVO-Bench 59.3%，Backward tracing 56.7%（直接验证长期记忆有效）。 离线也有竞争力：VideoHolmes 41.9%（超 Video-R1 +5.4%），且 QA 延迟 0.56s vs Video-R1 8.8s = 15.7× 加速。 规模泛化：3B/7B/32B 全线一致提升（StreamingBench 分别 +7.7/+7.8/+9.2）。 消融：VST-SFT 主要补 Backward（+9.2%），VST-RL 主要补 Forward（+12.7%），合起来最优；思考次数 4 步饱和；合成 VST 数据贡献最大（+4.8%）；FIFO 更新策略本身「相对不重要」，关键在于「有文本记忆」。 代价/局限： 思考本身烧额外 token（作者承认非可忽略，提 latent reasoning 为未来方向）。 文本记忆有损：failure case：存「视觉显著但查询无关」细节、早期证据被过度压缩（FIFO 淘汰旧的）、细粒度时间跨度丢失、远距离弱线索关联失败。 若思考慢于 clip 间隔会阻塞流式（靠回退最近完整记忆兜底）。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2026-vst.html#ai-notes",
        "t": "AI 预读备注 来自 Zotero AI Butler 子笔记（glm-5.3 生成），作为费曼 Phase 1 的预读底稿，校验后与最终讲解无重大差异。AI 笔记在以下点比本文更细，可回查原文： 摘要笔记（itemKey KFSX84T9，task=summary）：含完整方法动机表（四类旧方法缺陷）、逐公式拆解、伪代码、复现超参数全表、failure case 细节。 表格笔记（itemKey SW5CUJ2Z，task=table）：结构化字段速查（研究问题/方法/发现/创新点/局限性）。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2026-vst.html#restatement",
        "t": "我的复述 费曼检验时的原话，保留原味不润色。 Q1（边看边想凭什么不增加延迟）： VST 利用了视频片段传输的时间进行思考，被网络传输掩盖了所以用户感知不到，前提是传输时间大大于等于思考时间。 Q2（离线 CoT 数据为何不能直接训）： 离线 CoT 数据是看完整段视频后得到的，直接拿来训会导致未来信息泄漏。忘记了顺带解决了什么问题。 Q3（和 VideoChat3 的区别与组合）： VST 用文本记录流式输入的前序所有片段+前序少数视频帧信息汇总合成回答，而 VideoChat 通过压缩视频帧的token数记更多上下文。两者可以同时进行。 Q3b（FIFO 固定容量的失败场景与取舍）： 对于超长视频，如果用户的问题和已经出队列的内容有关，则可能回答失败。这样选择是为了降低 token 需求提升实时性。"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2026-vst.html#pitfalls",
        "t": "卡壳点与解答 Q：流式注意力掩码除了防信息泄露，还顺带解决了什么？（Q2 漏掉的半问；08-17/08-19/08-28 三次没答出） A：训练-推理架构一致性。训练时不加掩码，模型能 attend 到全片所有视觉 token；推理时滑动窗口只能看最近 L 个。两者分布不一样 → 推理掉点（分布漂移）。掩码让训练时就模拟推理时的滑动窗口（视觉只看最近 L 个，文本全可见），漂移消失。一句话：掩码既堵未来（防泄露），又堵漂移（对齐架构）。 🔧 08-28 三漏后的重讲版（前两次「堵未来+堵漂移」口径记不住，换框架才焊住）：掩码不是安全措施，是彩排规则：训练是彩排，推理是正式演出，彩排的可见性必须照演出来。彩排若看全片，模型养成「记不清就回头看远处画面」的习惯，正式演出（滑动窗口）做不到就懵：分布漂移就是彩排和演出的剧本不一致。锚点：掩码是推理可见性的一面镜子，推理长什么样，训练就照什么样。 由此拆两条规则： 规则①「不看未来」：永远需要，与架构无关：未来片段还没到，流式性本身决定的； 规则②「视觉只看最近 L 个」：需不需要完全跟着推理架构走：推理若改成全片视觉不丢（无窗口），这条必须删，留着反而自己制造新漂移；推理若改成文本只检索 top-3 相关笔记（RAG 式），文本可见性也得跟着改成 top-3。 两个反例变换复验（08-28）均通过，原则可迁移。 Q：VST 的长期记忆是「前序所有片段」吗？（Q3 表述误差） A：不是「所有」：是 FIFO 固定容量，会淘汰最早的 thought 条目，只留最近的若干条。所以是「最近的思想笔记」而非「全部历史」。旧记忆被挤出正是 failure case 里「早期证据过度压缩/丢失」的根源。 Q：FIFO 明知有损为何不换更大/可检索的记忆？（Q3b 深挖） A：(1) 固定容量 = token 预算可控 = 实时性（可检索记忆每步要检索整个库，增延迟，破坏「分摊」前提）；(2) 消融显示 FIFO 更新策略本身「相对不重要」，关键在「有文本记忆」而非「记忆管理多精巧」，换复杂管理收益不大。"
      },
      {
        "h": "全文问答 · Q：流式注意力掩码除了防信息泄露，还顺带解决了什么？（Q2 漏掉的半问；08-17/08-19/08-28 三次没答出）",
        "a": "notes/papers/2026-vst.html#qa-mask",
        "t": "Q：流式注意力掩码除了防信息泄露，还顺带解决了什么？（Q2 漏掉的半问；08-17/08-19/08-28 三次没答出） 训练-推理架构一致性 。训练时不加掩码，模型能 attend 到全片所有视觉 token；推理时滑动窗口只能看最近 L 个。两者分布不一样 → 推理掉点（分布漂移）。掩码让训练时就模拟推理时的滑动窗口（视觉只看最近 L 个，文本全可见），漂移消失。一句话：掩码既 堵未来 （防泄露），又 堵漂移 （对齐架构）。 🔧 08-28 三漏后的重讲版 （前两次「堵未来+堵漂移」口径记不住，换框架才焊住）：掩码不是安全措施，是 彩排规则 ：训练是彩排，推理是正式演出，彩排的可见性必须照演出来。彩排若看全片，模型养成「记不清就回头看远处画面」的习惯，正式演出（滑动窗口）做不到就懵：分布漂移就是彩排和演出的剧本不一致。 锚点：掩码是推理可见性的一面镜子，推理长什么样，训练就照什么样。 由此拆两条规则： 规则①「不看未来」 ：永远需要，与架构无关：未来片段还没到，流式性本身决定的； 规则②「视觉只看最近 L 个」 ：需不需要完全跟着推理架构走：推理若改成全片视觉不丢（无窗口），这条必须删，留着反而自己制造新漂移；推理若改成文本只检索 top-3 相关笔记（RAG 式），文本可见性也得跟着改成 top-3。 两个反例变换复验（08-28）均通过，原则可迁移。"
      },
      {
        "h": "全文问答 · Q：VST 的长期记忆是「前序所有片段」吗？（Q3 表述误差）",
        "a": "notes/papers/2026-vst.html#qa-fifo",
        "t": "Q：VST 的长期记忆是「前序所有片段」吗？（Q3 表述误差） 不是「所有」：是 FIFO 固定容量 ，会淘汰最早的 thought 条目，只留最近的若干条。所以是「最近的思想笔记」而非「全部历史」。旧记忆被挤出正是 failure case 里「早期证据过度压缩/丢失」的根源。"
      },
      {
        "h": "全文问答 · Q：FIFO 明知有损为何不换更大/可检索的记忆？（Q3b 深挖）",
        "a": "notes/papers/2026-vst.html#qa-fifo-why",
        "t": "Q：FIFO 明知有损为何不换更大/可检索的记忆？（Q3b 深挖） (1) 固定容量 = token 预算可控 = 实时性（可检索记忆每步要检索整个库，增延迟，破坏「分摊」前提）；(2) 消融显示 FIFO 更新策略本身「相对不重要」，关键在「有文本记忆」而非「记忆管理多精巧」，换复杂管理收益不大。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-vst.html#open",
        "t": "还没搞懂 （四道检验题都已补齐，无残留漏洞。若日后复测发现新问题，再回填此处并同步 questions.md。）"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-vst.html#relations",
        "t": "关联 VideoChat3 ： 思路正交、可互补。VideoChat3 管「视觉编码器里压 token + 状态机自适应分辨率/响应时机」=感知效率；VST 管「推理时机前移 + 文本长期记忆」=认知时机。组合设想（待验证）：视觉记忆保细节 + 文本记忆保逻辑链；但 VideoChat3 的状态 token（管响应时机）和 VST 的「查询即答」在时机上逻辑冲突，需设计统一调度，且双轨记忆要决定「回答时谁优先、冲突信谁的」。 Video-o3 ： 同属长视频推理但路线不同。VST 是\"推理前置\"（播放期边看边想，FIFO 文本记忆，查询即答 0.56s），Video-o3 是\"推理时主动检索\"（拿到问题后多轮裁剪视频找线索，10.2s）。VST 解决实时性，Video-o3 解决多跳精度。组合设想（待验证）：VST 文本记忆 + Video-o3 工具裁剪；但\"查询即答\"vs\"多轮探索\"在响应时机上逻辑冲突，需统一调度。 同领域可对比：Video-R1（query 后长 CoT，重推理高延迟）、LongVILA-R1、StreamForest、TimeChatOnline、Streamo、Dispider。 待建概念页：streaming video understanding / CoT (Chain-of-Thought) / test-time scaling / GRPO / KV cache / dual-memory system"
      }
    ]
  },
  {
    "id": "2026-genlip",
    "type": "paper",
    "title": "GenLIP",
    "href": "papers/2026-genlip.html",
    "noteHref": "notes/papers/2026-genlip.html",
    "sourceHref": "wiki/papers/2026-genlip.md",
    "date": "2026-08-17",
    "topic": "visual-encoders",
    "aliases": [
      "GenLIP",
      "Generative Language-Image Pre-training"
    ],
    "tags": [
      "generative-pretraining",
      "attention-sink",
      "improve-representation"
    ],
    "essence": "GenLIP 让同一个 Transformer 看图并生成描述，用下一词预测训练视觉表示，之后取出它作为视觉编码器。",
    "review": {
      "next": "2026-10-07",
      "last": "2026-09-07",
      "count": 2,
      "result": "pass"
    },
    "relations": [
      {
        "type": "possible-combination",
        "to": "2026-last-vit",
        "reason": "两者分别调节 attention 信息流与 CLS 聚合；联合使用属于组合设想，本库没有实验。",
        "status": "hypothesis"
      },
      {
        "type": "possible-combination",
        "to": "2026-videochat3",
        "reason": "预训练视觉编码器与视频时空编码涉及不同环节；把 GenLIP 接入 I3D-ViT 的收益待验证。",
        "status": "hypothesis"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2026-genlip.html#rebuild",
        "t": "图像检索预训练与下游语言生成的目标不同。GenLIP 让同一个 Transformer 在预训练时看图、生成描述，用语言损失训练视觉表示。 拼接图像与文本 图像 token 在前，文本 token 在后。图像之间双向可见；文本看全部图像和已有文本，不能看未来文本。 预测下一个词 损失只算在文本位置。可学习门控乘在 attention 输出上，论文观察到它减轻了首 token 的 attention sink。 取出视觉编码器 下游只输入图像，丢弃语言头与分词器。视觉输出经 connector 接到下游 LLM。 具体例子（教学假设） ：输入两块图像 token 和描述“猫 在 睡觉”。预测“睡觉”时可看全部图像与“猫 在”；图像 token 看不到训练描述。否则下游只输入图像时，视觉特征会缺少训练时偷看的信息。 边界 ：独立解码器路线同样能把梯度传回 ViT。GenLIP 的区别是共享单个 Transformer。池化不保证各 token 梯度均匀，门控也不是自动识别坏 token 的硬开关。 换个条件看机制 训练结束后删掉 LM head，图像 token 还能互相看吗？为什么不需要生成描述才能得到视觉特征？ 还能。只剩图像前缀时，图像之间本来就是双向注意力。语言损失已在训练时更新了共享权重，推理时可直接读视觉表示。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2026-genlip.html#rebuild",
        "t": "五分钟重建 图像检索预训练与下游语言生成的目标不同。GenLIP 让同一个 Transformer 在预训练时看图、生成描述，用语言损失训练视觉表示。 拼接图像与文本 图像 token 在前，文本 token 在后。图像之间双向可见；文本看全部图像和已有文本，不能看未来文本。 预测下一个词 损失只算在文本位置。可学习门控乘在 attention 输出上，论文观察到它减轻了首 token 的 attention sink。 取出视觉编码器 下游只输入图像，丢弃语言头与分词器。视觉输出经 connector 接到下游 LLM。 具体例子（教学假设） ：输入两块图像 token 和描述“猫 在 睡觉”。预测“睡觉”时可看全部图像与“猫 在”；图像 token 看不到训练描述。否则下游只输入图像时，视觉特征会缺少训练时偷看的信息。 边界 ：独立解码器路线同样能把梯度传回 ViT。GenLIP 的区别是共享单个 Transformer。池化不保证各 token 梯度均匀，门控也不是自动识别坏 token 的硬开关。 换个条件看机制 训练结束后删掉 LM head，图像 token 还能互相看吗？为什么不需要生成描述才能得到视觉特征？ 还能。只剩图像前缀时，图像之间本来就是双向注意力。语言损失已在训练时更新了共享权重，推理时可直接读视觉表示。 可选自测 关掉提示后画四格可见性表：图像到图像、图像到文本、文本到图像、文本到文本。 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 论文图解",
        "a": "notes/papers/2026-genlip.html#figures",
        "t": "论文图解 GenLIP 与双塔和编码器解码器预训练比较 *图 1 费曼图解（论文 Figure 1）：先看左侧：双塔比较图文表示，编码器解码器把生成分给独立模块，GenLIP 用一个 Transformer 处理图像和文本。右侧比较接到 LLM 后的语言目标适配情况；曲线结论限于该测试设置。* GenLIP 单塔门控与前缀注意力 *图 2 费曼图解（论文 Figure 2）：左侧是图像前缀与文本后缀；中间的门控逐元素调节 attention 输出；右侧是可见性表。图像互看，文本看图像和已有文本，图像不看文本。生成描述是训练方式，下游可以只取视觉表示。* 有无门控时的注意力分配 *图 3 费曼图解（论文 Figure 3）：前两幅看视觉和文本分给首 token 的注意力，第三幅看文本分给视觉 token 的注意力。加入门控后，首 token 集中现象减轻；这是模型消融证据，不是池化保证均匀梯度的证明。*"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-genlip.html#problem",
        "t": "解决什么问题 给 MLLM 训视觉编码器，三条旧路各有死穴： 路线 代表 做什么 痛在哪 ------ ------ -------- -------- 双塔对比学习 CLIP、SigLIP 图像和文本分开编码，映射到同一空间做对比 目标错位：学的是判别式特征（擅长检索/分类），但 MLLM 是生成式（next token prediction），接入 LLM 后困惑度更高 编码器-解码器生成式 AIMv2、CapPa ViT 编码器 + 独立文本解码器，解码器上算语言建模损失 架构冗余 + 间接优化：ViT 的梯度通过独立解码器传回；GenLIP 改为共享一个 Transformer，减少额外文本模块 多目标混合 SigLIP2、CoCa 对比 + 生成 + 密集特征多个损失一起上 多目标权衡：超参难调、训练不稳，需要 40B 样本才出好效果 GenLIP 的洞察：既然下游是生成式，预训练也该直接是生成式，而且别绕弯子：让 ViT 本体直接承担生成任务，不挂额外解码器。 ⚠️ 防混淆（2026-08-24 复测暴露）：表中第二条路线的\"独立文本解码器\"是预训练时的组件（AIMv2 式），别和下游 MLLM 的\"ViT + MLP connector + LLM\"推理接法搞混：后者是 GenLIP 自己推理时也在用的接法（2 层 MLP 投影给 LLM），不是预训练对比路线。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-genlip.html#intuition",
        "t": "大白话讲解 类比：看图写话考试 CLIP 式：给学生看一堆图和标题，让他判断\"哪个标题配哪张图\"（选择题）：学会了配对，但不会自己写描述。 AIMv2 式：让学生看图，把图描述交给另一个\"代笔\"去写，学生只负责\"看\"，代笔负责\"写\"：学生收到的反馈是间接的。 GenLIP 式：直接让学生看图写话：自己看、自己写、自己被打分。一个学生端到端学会\"看懂图并用语言表达\"。 训完之后，考试时（当 MLLM 的视觉编码器用），把\"写作文\"的部分（语言头）扔掉，只留\"看图\"的能力：但这个能力是被生成式目标直接优化过的，和下游 LLM 的 next token prediction 天然对齐。 🔧 最容易卡住的点①：单个 Transformer 怎么同时当编码器和解码器？ 靠 Prefix-LM Attention：图像 token 排前面当\"前缀\"，文本 token 排后面，一个 Transformer 同时干了编码器（图像部分，双向）和解码器（文本部分，因果）的活，ViT 本体直接收到语言建模的梯度。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-genlip.html#mechanism",
        "t": "关键机制 ① Prefix-LM Attention：一塔两用 序列 = [图像 token × M] + [文本 token × L]，注意力掩码四条规则： 方向 模式 ------ ------ 图像↔图像 双向全注意力（编码器模式，充分交互形成好的视觉表示） 文本→文本+图像 因果（看全部图像 token + 已生成的文本 token，标准自回归） 图像→文本 不可见（图像在前，因果约束下看不到后面的文本） 文本→图像 可见 损失只在文本部分算（next token prediction），图像 token 不计损。位置编码用 MRoPE（多模态旋转位置编码）处理拼接序列的相对位置。 ② Gated Attention：防注意力陷阱（attention sink） 🔧 最容易卡住的点②：attention sink 是什么，本文怎样解释它？ 论文 §3.2 与附录 D 观察到：首个视觉 token 吸收了过多注意力。图像前缀可以双向聚合全局信息，后面的文本又可读取这个前缀。模型因此可能把生成所需的信息集中到少数视觉 token，损害其他位置的视觉表示。 这不是「对比学习保证没有 sink」。池化不保证所有 token 贡献相同，也不保证梯度均匀。不同结构和注意力模式会改变 sink 的表现。 门控注意力：计算可学习门 G = σ(XW_g + b_g)，再逐元素乘 attention 输出 Ã = G ⊙ A。门控由训练学习信息流量，不显式检测某个 token 是不是 sink。Figure 3 与消融表显示，该设置中的注意力集中和表征退化得到缓解。 ③ 两阶段训练 阶段一：低分辨率（224²）固定分辨率预训练，1B 图文对（Dataset-S1），大规模学基础视觉表征，算力高效。 阶段二：原生宽高比适配，37M 高质量长描述数据（Dataset-S2），不强制裁剪成正方形，视觉 token 数约束在 [16, 1024]，只训 1 epoch，快速注入 OCR/图表等细节能力。 ④ 推理：退化回标准 ViT 当视觉编码器用时：丢掉文本分词器和语言头 → 只输入图像 → Prefix-LM Attention 退化为标准全注意力（没有文本，所有视觉 token 自由双向交互）→ 取最后 LN 层输出 → 2 层 MLP 投影到 LLM 空间。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2026-genlip.html#evidence",
        "t": "结果与代价 数据效率极高：仅用 8B 预训练样本（SigLIP2 的 1/5），所有规模全面超越 SigLIP2。g/16 + 7B LLM：ALL AVG 73.6 vs SigLIP2 68.9（+4.7）。 OCR 统治力：第二阶段原生宽高比适配后，ChartQA +9.9、OCRBench +10.3、DocVQA +12.7（vs SigLIP2，7B LLM）。 可扩展性：L→So→g 规模稳步提升，SigLIP2 的 So→g 几乎无收益。 消融：同等数据量（2B）下对比 SigLIP（对比式）、OpenVision2（编-解码生成式）、GenLIP，GenLIP 全类别领先，支持该数据量与模型设置中单塔生成式方案的优势，不能据此断言所有生成式架构都更优。 代价/局限： 依赖高质量描述数据（生成式方法的固有依赖）。 无零样本检索的天然优势（没显式对比目标）。 验证限于学术规模 MLLM，更大规模前沿模型泛化性待验。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2026-genlip.html#ai-notes",
        "t": "AI 预读备注 来自 Zotero AI Butler 子笔记（deepseek-v4-pro 生成），作为费曼 Phase 1 预读底稿，校验后与最终讲解无重大差异。AI 笔记更细处可回查原文： 摘要笔记（itemKey 7MFX8GUA，task=summary）：含完整方法动机表（三类旧方法缺陷）、Prefix-LM Attention 四规则表、Gated Attention 公式与直觉、伪代码、训练超参全表、对比表。 表格笔记（itemKey LW7H5ZBM，task=table）：结构化字段速查（研究问题/方法/发现/创新点/局限性）。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2026-genlip.html#restatement",
        "t": "我的复述 费曼检验时的原话，保留原味不润色。 Q1（为什么对比学习训的特征和 MLLM 不兼容，GenLIP 怎么消除错位）： clip/siglip 训练的是嵌入检索等任务而在下游 MLLM 需要处理生成任务，这导致任务的不兼容。genlip 通过给 vit 一个简单的 lmhead 让 vit 同时负责图像的编码和文本的解码生成，从而使任务统一，消除错位。 Q2（Prefix-LM Attention 四规则）： 图像token之间可以互相看到，文本之间是因果注意力、它可以看到图像以及前序文本、图像看不到文本、文本可以看到图像。 Q3（attention sink + Gated Attention + 拿掉后的退化）： attention sink 指的是 vit 倾向于将视觉信息编码进少数几个 token，使其他 token 变得无用；生成式容易触发它的原因我确实没有get到，请告诉我。gated attention 的方式是在注意力输出上加一个门控机制，然后把门控输出乘上去，如果倾向于只用少数token这个门控信号会把它的激活压低。如果把它拿掉，我觉得会在OCR等细粒度感知任务上看到退化，因为少数几个token容纳的信息量有限，主要存全局信息，细粒度信息可能被压缩掉。"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2026-genlip.html#pitfalls",
        "t": "卡壳点与解答 Q：为什么生成式预训练更容易触发 attention sink（对比学习反而不容易）？（Q3 漏掉的半问） A：本文的关键是共享图像前缀的注意力结构。图像 token 可以聚合全局信息，后续文本可以反复读取前缀，模型便可能走「少数 token 承载全局信息」的捷径。原文 §3.2、附录 D 和 Figure 3 支持这个解释。对比学习并不保证各 token 梯度均匀，也不是 sink 的免疫机制。门控是学习到的信息流调节；消融显示它缓解了本模型的 sink，不能把它说成识别坏 token 后逐个压制的硬规则。 2026-10-04：按原文修正此前「池化逼所有 token 均匀贡献」与「门自动识别 sink」的过强解释，历史复述原话保留。"
      },
      {
        "h": "全文问答 · Q：为什么生成式预训练更容易触发 attention sink（对比学习反而不容易）？（Q3 漏掉的半问）",
        "a": "notes/papers/2026-genlip.html#qa-sink",
        "t": "Q：为什么生成式预训练更容易触发 attention sink（对比学习反而不容易）？（Q3 漏掉的半问） 本文的关键是 共享图像前缀的注意力结构 。图像 token 可以聚合全局信息，后续文本可以反复读取前缀，模型便可能走「少数 token 承载全局信息」的捷径。原文 §3.2、附录 D 和 Figure 3 支持这个解释。对比学习并不保证各 token 梯度均匀，也不是 sink 的免疫机制。门控是学习到的信息流调节；消融显示它缓解了本模型的 sink，不能把它说成识别坏 token 后逐个压制的硬规则。 2026-10-04：按原文修正此前「池化逼所有 token 均匀贡献」与「门自动识别 sink」的过强解释，历史复述原话保留。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-genlip.html#open",
        "t": "还没搞懂 （三道检验题都已补齐，无残留漏洞。若日后复测发现新问题，再回填此处并同步 questions.md。）"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-genlip.html#relations",
        "t": "关联 VideoChat3 ： 正交。VideoChat3 回答「视频 ViT 怎么处理时空冗余」，GenLIP 回答「这个 ViT 怎么预训练」。把 GenLIP 的 ViT 接入 VideoChat3 是可能的组合方向（待验证），本库没有该替换实验。 LaSt-ViT ： 直接对接。同为 ViT attention artifact，机制和阶段不同：GenLIP 在生成式预训练发现 attention sink（少数 token 吸走信息）用 Gated Attention 压制；LaSt-ViT 在判别式预训练发现 lazy aggregation（背景抢 CLS）用频域选择性聚合纠正。组合设想（待验证）：Gated Attention 管信息分布，LaSt-ViT 管 CLS 聚合；本库没有联合实验。 同领域可对比：CLIP、SigLIP、SigLIP2（对比式 baseline）、AIMv2、OpenVision2、CapPa（编-解码生成式 baseline）、CoCa（多目标混合）。 待建概念页：ViT / contrastive learning / next token prediction / Prefix-LM / attention sink / gated attention / MRoPE"
      }
    ]
  },
  {
    "id": "2026-last-vit",
    "type": "paper",
    "title": "LaSt-ViT",
    "href": "papers/2026-last-vit.html",
    "noteHref": "notes/papers/2026-last-vit.html",
    "sourceHref": "wiki/papers/2026-last-vit.md",
    "date": "2026-08-17",
    "topic": "visual-encoders",
    "aliases": [
      "LaSt-ViT",
      "Lazy Stable ViT"
    ],
    "tags": [
      "lazy-aggregation",
      "frequency-analysis",
      "improve-representation"
    ],
    "essence": "LaSt-ViT 按特征通道的频域稳定性选择 patch 来构成 CLS，减轻背景聚合造成的定位偏差。",
    "review": {
      "next": "2026-10-07",
      "last": "2026-09-07",
      "count": 2,
      "result": "pass"
    },
    "relations": [
      {
        "type": "possible-combination",
        "to": "2026-genlip",
        "reason": "频域聚合与 Gated Attention 处理不同的 ViT 现象；联合使用的适配与效果待验证。",
        "status": "hypothesis"
      },
      {
        "type": "possible-combination",
        "to": "2026-videochat3",
        "reason": "可研究将频域聚合接入 I3D-ViT，具体接法及视频任务收益尚无实验。",
        "status": "hypothesis"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2026-last-vit.html#rebuild",
        "t": "图像级分类做对，不保证 patch 特征能定位前景。论文提出 lazy aggregation 假说：全局注意力会把语义传播到背景，CLS 因而可能靠背景聚合完成分类。 沿通道做滤波 对每个 patch 的特征向量做 FFT、低通滤波和 IFFT。这里的频率沿特征通道，不沿图片的横纵坐标。 计算稳定性 比较滤波前后的特征，用论文的稳定性评分选择候选 patch。它是前景的经验线索，不是前景真值。 逐通道选 Top-K 每个通道独立选分数最高的 K 个 patch，取原特征均值，组成 CLS。不同通道可以选不同区域。 具体例子（教学假设） ：四个 patch 有两个通道。通道一选 patch 1、3，通道二选 patch 2、3。最终 CLS 的两个分量分别来自两组均值，而不是选一个完整 patch 充当 CLS。 边界 ：Top-K 的离散索引本身不可微；选中的特征值可收到梯度。频域稳定不保证就是前景，K 过小也会丢信息。Register 在该实验中未修好定位问题，不等于所有场景都无用。 换个条件看机制 若 K 等于全部 patch 数，选择性聚合还保留筛选作用吗？ 不保留。每个通道都平均全部 patch，退化为全局平均池化。FFT 和评分虽可计算，但已不能改变参与聚合的 patch 集合。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2026-last-vit.html#rebuild",
        "t": "五分钟重建 图像级分类做对，不保证 patch 特征能定位前景。论文提出 lazy aggregation 假说：全局注意力会把语义传播到背景，CLS 因而可能靠背景聚合完成分类。 沿通道做滤波 对每个 patch 的特征向量做 FFT、低通滤波和 IFFT。这里的频率沿特征通道，不沿图片的横纵坐标。 计算稳定性 比较滤波前后的特征，用论文的稳定性评分选择候选 patch。它是前景的经验线索，不是前景真值。 逐通道选 Top-K 每个通道独立选分数最高的 K 个 patch，取原特征均值，组成 CLS。不同通道可以选不同区域。 具体例子（教学假设） ：四个 patch 有两个通道。通道一选 patch 1、3，通道二选 patch 2、3。最终 CLS 的两个分量分别来自两组均值，而不是选一个完整 patch 充当 CLS。 边界 ：Top-K 的离散索引本身不可微；选中的特征值可收到梯度。频域稳定不保证就是前景，K 过小也会丢信息。Register 在该实验中未修好定位问题，不等于所有场景都无用。 换个条件看机制 若 K 等于全部 patch 数，选择性聚合还保留筛选作用吗？ 不保留。每个通道都平均全部 patch，退化为全局平均池化。FFT 和评分虽可计算，但已不能改变参与聚合的 patch 集合。 可选自测 关掉提示后解释：为什么“图像看起来平滑”不能直接代替这里的“通道频域稳定”？ 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 论文图解",
        "a": "notes/papers/2026-last-vit.html#figures",
        "t": "论文图解 普通 ViT 与 LazyStrike 的位置和特征对照 *图 1 费曼图解（论文 Figure 1）：同一图像下比较 patch score 与特征可视化。普通 ViT 的高分区域可能落在背景，加入 LazyStrike 后更贴近物体。颜色反映表示或分数，不等于像素级真值。* 高分位置与分类必需信息的遮挡对照 *图 2 费曼图解（论文 Figure 2）：左图比较前景与背景的 score 分布；右图依次遮掉不同分数的 patch。遮掉高分 patch 对分类影响较小，提醒我们 CLS 相似度高不等于该输入位置是分类证据。* 逐通道 Top-K 聚合所选位置 *图 5 费曼图解（论文 Figure 5）：红框来自各 patch 在不同通道被选中的次数，三列使用不同票数阈值。它让我们看到选择性聚合更常选物体区域；方法本身的 FFT 与评分步骤见上方机制路径。*"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-last-vit.html#problem",
        "t": "解决什么问题 ViT 当通用特征提取器时，密集预测任务（分割、检测、对象发现）不如 ConvNet：CLS token 关注背景而非前景，patch 特征与语义错位。三种旧解法各有死穴： 路线 代表 做什么 痛在哪 ------ ------ -------- -------- Register tokens Darcet et al. 加额外 token 吸走高范数特征 治标不治本：高范数是症状非根因，PiB 没升反降（42.7→41.5） 事后修正 MaskCLIP、CLIPSelf、SCLIP 改最后层注意力或后训练对齐 不从根源阻止，且一种方法只适用一种监督范式 削弱全局依赖 窗口注意力 限制注意力范围 拆东补西：PiB 升了但分类精度掉 ~8% 更关键的是没人搞清楚 artifact 到底为什么产生。LaSt-ViT 先诊断再开药。 🔧 最容易卡住的点①：为什么 Register tokens 没用？ Register 把高范数 token 挪走了，看起来\"artifact 消失了\"。但 Tab.1 实测：加 Register 后 PiB 从 42.7 掉到 41.5（更差）。高范数只是 lazy aggregation 的晚期症状，不是病因：病因是 CLS 往背景跑，你把高范数 token 挪走，CLS 照样往背景跑。\"ViT needs more than registers\"：标题就是在说这个。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-last-vit.html#intuition",
        "t": "大白话讲解 核心发现：懒惰聚合假说 两个诊断工具： Patch Score = CLS token 与各 patch 的余弦相似度：看 CLS 到底\"看\"哪。 Point-in-Box (PiB) = 最高 patch score 落在前景框内的比例：量化 artifact 严重程度。 发现：ViT 的 CLS token 大量关注背景 patch（PiB 只有 42.7%，ConvNet 68.4%），而且： 从一开始就有：训练初期 PiB 就低，全程不改善（不是后期才崩的）。 去掉高分 patch 不影响分类：遮掉 score 最高的 50% patch，ImageNet 精度几乎不掉甚至略升：该遮挡实验说明高分位置不等于分类所必需的输入证据；不能据此证明每个背景 patch 的因果贡献都为零。 类比：偷懒的考官 想象考试只看总分不看过过程： ConvNet：每个学生（感受野）只能看局部，必须认真看前景才能答对：笨但靠谱。 ViT：所有学生能看全图，发现\"背景占大部分、背景跟类别有统计相关\"，于是集体抄背景答案：总分很高但你问具体哪是猫，全指向背景。 LaSt-ViT：强制 CLS 只从\"靠谱\"的 patch 取信息：用频域稳定性判断哪些是前景。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-last-vit.html#mechanism",
        "t": "关键机制 ① 懒惰聚合根因 = 粗粒度监督 + 全局注意力 粗粒度监督（驱动1）：只有图像级标签 → 没有空间指导告诉模型\"前景在哪\"。自然图背景 patch 远多于前景 → 模型发现\"靠背景投票\"就能最小化分类 loss。 全局注意力（驱动2）：给前景语义扩散到背景的通道。验证：把全局注意力换成窗口注意力，PiB 升（50.1→59.8）但分类掉（-8%），证明全局注意力是帮凶，但简单砍掉得不偿失。 这是论文提出的根因假说。相关消融支持粗粒度监督与全局依赖共同影响该现象，未证明它们是所有 artifact 的必要且充分条件。 ② 频域稳定性评分 直觉：前景在深层通道维上语义一致（低频主导），背景混杂多结构（频谱丰富、高频多）。 对每个 patch 的 D 维特征做 1D FFT（沿通道维）→ 高斯低通滤波 → IFFT，得滤波后特征 $\\hat{x}$。 稳定性分数：$S_{i,j} = \\frac{\\hat{x}[i,j]}{ \\hat{x}[i,j] - x[i,j] + \\varepsilon}$。 分数高 = 滤波后变化小 = 低频主导 = 大概率前景。 🔧 最容易卡住的点②：为什么\"频域稳定\"能区分前景背景？ 不是空间连续性，而是通道维频域特性。前景物体在深层特征的通道维度上语义一致（同一类内的颜色/纹理/形状在通道维是低频的）；背景包含多种混杂结构，频谱丰富，低通滤波后能量损失大 → 分数低。 ③ 通道级 Top-K 选择性聚合 对每个通道 $j$ 独立选稳定性最高的 K 个 patch，取均值作为该通道的 CLS 值： $$\\mathcal{Q}_{CLS}[j] = \\frac{1}{K}\\sum_{i \\in \\mathcal{I}_K(j)} x_{patch}[i,j]$$ 不同通道可选不同 patch 组合：不同语义维度（颜色/纹理/形状）的前景区域可能不同。 ④ 无额外参数、无额外损失 聚合模块零可学习参数（FFT 和 Top-K 都是确定性操作）。 不改损失函数：原有分类/对比/DINO 损失不变，只是 CLS 的构成方式变了。 Top-K 的离散选择索引不可微；聚合使用的已选特征值可传梯度。未选值在这条聚合路径上没有直接梯度，不代表网络其他路径也没有梯度。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2026-last-vit.html#evidence",
        "t": "结果与代价 PiB 大幅提升：全监督 42.7→55.1（+12.4）；DINO 44.5→69.7（+25.2）；CLIP 39.8→50.1（+10.3）。 零样本分割暴涨：CLIP ViT-L VOC 17.1→72.4（+55.3）；EVA-CLIP ViT-B COCO-Obj 15.0→26.2。 12 个基准一致提升，且分类精度不掉（甚至略升）。 涌现分割：全监督 ViT 粗分割 mIoU 22.3→32.8，接近 DINO 自监督的 47.7：涌现属性不再自监督专属。 代价/局限： K 值敏感（过大退化成平均池化、lazy aggregation 回来；过小信息不足；推荐约 50% patch 数）。 无明确前景的图（风景、群体）稳定性准则可能选均匀背景。 前景纹理极复杂时频域稳定性可能失效。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2026-last-vit.html#ai-notes",
        "t": "AI 预读备注 来自 Zotero AI Butler 子笔记（deepseek-v4-pro 生成），作为费曼 Phase 1 预读底稿，校验后与最终讲解无重大差异。AI 笔记更细处可回查原文： 摘要笔记（itemKey VRCS23SC，task=summary）：含完整方法动机表（四类旧方法缺陷）、逐公式拆解（式4-8）、LazyStrikeAggregator 伪代码、K 值消融全表、训练超参、复现步骤。 表格笔记（itemKey PX2ZD5PZ，task=table）：结构化字段速查（研究问题/方法/发现/创新点）。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2026-last-vit.html#restatement",
        "t": "我的复述 费曼检验时的原话，保留原味不润色。 Q1（懒惰聚合 + 两驱动 + Register 为何没用）： 懒惰聚合指的是传统ViT训完之后模型倾向于通过背景 token 信息来猜测前景信息；原因1是图片中背景 patch 占比明显多于前景，导致 vit 倾向于通过背景统计信息去猜测答案而不是真正看前景；原因2我想不起来了；register tokens 方法只是把高范数特征吸收到额外 token，但是高范数不是根因，根因是前述的 ViT 懒惰问题。 Q2（频域稳定性 + K=全）： D 维特征做傅立叶变换，然后过低通滤波器后反傅立叶变换回来，计算这个值与变换前后差值的绝对值作为频域稳定性评分。同类别的对象在特征图中是连续、接近的，所以低通滤波后变化小。把 K 设成全部 patch 数，相当于全局池化了，信息会丢失。 Q3（GenLIP vs LaSt-ViT 对比）： genlip 是说在生成式学习中，视觉信息会倾向于汇集到少数几个 token，大量 token的表达能力会被浪费，它的做法是增加一个门控机制，当出现汇集现象是通过门控来抑制；last-vit 是在对比学习范式中发现 ViT 存在视觉懒惰现象，会倾向于通过背景 patch 对应的 token 信息来解题，前景没有得到应有的关注，这会导致模型在细粒度感知任务上比较差，last-vit 的解法是计算特征图的变化，认为变化快的背景变化慢的是前景，强制让模型关注前景。"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2026-last-vit.html#pitfalls",
        "t": "卡壳点与解答 Q：懒惰聚合的两个驱动因素是什么？（Q1 漏掉的半问） A：驱动1 = 粗粒度监督（只有图像级标签，没有 patch 级空间指导）；驱动2 = 全局注意力（给前景语义扩散到背景的通道）。它们是论文假说中的两个驱动，不能当作所有模型的必要且充分条件。验证：窗口注意力限制全局依赖后 PiB 升但分类掉 8%，证明全局注意力是帮凶。 Q：Register tokens 为什么没用？靠什么实验证据推翻？（Q1 漏掉的半问） A：Tab.1 实测：加 Register 后 PiB 从 42.7 掉到 41.5（更差，不是\"没提升\"而是\"反降\"）。高范数只是 lazy aggregation 的晚期症状，Register 把症状挪走但病因（CLS 往背景跑）还在。 Q：频域稳定性区分前景背景的真正机制是什么？（Q2 精化） A：不是\"空间连续性\"，而是通道维频域特性：前景物体在深层特征的通道维度上语义一致（低频主导），低通滤波后变化小；背景混杂多种结构（频谱丰富、高频多），低通后能量损失大。是深层特征的统计规律。 （2026-08-24 复测补充，复述时自生成的类比，比原文表述更直观）反向论证：空间维的低频=墙壁等平滑区域，恰恰是背景，不能当前景判据；通道维低频的直观图像 ≈ 语义分割的输出图：同一类别同一颜色，同类语义在通道维上变化小。 Q：LaSt-ViT 适用于什么预训练范式？（Q3 纠偏） A：用户答\"对比学习\"范围窄了。LaSt-ViT 跨三种判别式预训练范式通用：标签监督（分类）、文本监督（CLIP 对比）、自监督（DINO 自蒸馏）。对比学习只是其中一种。准确叫法是\"判别式预训练\"（对应 GenLIP 的\"生成式\"）。 Q：两者的解法能否组合？（Q3 漏掉的半问） A：组合设想（待验证），本库没有联合实验。Gated Attention 管\"信息分布\"（防少数 token 吸走），LaSt-ViT 管\"CLS 聚合\"（逼 CLS 从前景取），作用在 ViT 不同环节，正交可叠加。"
      },
      {
        "h": "全文问答 · Q：懒惰聚合的两个驱动因素是什么？（Q1 漏掉的半问）",
        "a": "notes/papers/2026-last-vit.html#qa-drivers",
        "t": "Q：懒惰聚合的两个驱动因素是什么？（Q1 漏掉的半问） 驱动1 = 粗粒度监督 （只有图像级标签，没有 patch 级空间指导）；驱动2 = 全局注意力 （给前景语义扩散到背景的通道）。它们是论文假说中的两个驱动，不能当作所有模型的必要且充分条件。验证：窗口注意力限制全局依赖后 PiB 升但分类掉 8%，证明全局注意力是帮凶。"
      },
      {
        "h": "全文问答 · Q：Register tokens 为什么没用？靠什么实验证据推翻？（Q1 漏掉的半问）",
        "a": "notes/papers/2026-last-vit.html#qa-register",
        "t": "Q：Register tokens 为什么没用？靠什么实验证据推翻？（Q1 漏掉的半问） Tab.1 实测：加 Register 后 PiB 从 42.7 掉到 41.5（更差，不是\"没提升\"而是\"反降\"）。高范数只是 lazy aggregation 的 晚期症状 ，Register 把症状挪走但病因（CLS 往背景跑）还在。"
      },
      {
        "h": "全文问答 · Q：频域稳定性区分前景背景的真正机制是什么？（Q2 精化）",
        "a": "notes/papers/2026-last-vit.html#qa-frequency",
        "t": "Q：频域稳定性区分前景背景的真正机制是什么？（Q2 精化） 不是\"空间连续性\"，而是 通道维频域特性 ：前景物体在深层特征的通道维度上语义一致（低频主导），低通滤波后变化小；背景混杂多种结构（频谱丰富、高频多），低通后能量损失大。是深层特征的统计规律。 （2026-08-24 复测补充，复述时自生成的类比，比原文表述更直观）反向论证：空间维的低频=墙壁等平滑区域，恰恰是背景，不能当前景判据；通道维低频的直观图像 ≈ 语义分割的输出图 ：同一类别同一颜色，同类语义在通道维上变化小。"
      },
      {
        "h": "全文问答 · Q：LaSt-ViT 适用于什么预训练范式？（Q3 纠偏）",
        "a": "notes/papers/2026-last-vit.html#qa-scope",
        "t": "Q：LaSt-ViT 适用于什么预训练范式？（Q3 纠偏） 用户答\"对比学习\"范围窄了。LaSt-ViT 跨三种 判别式预训练范式通用：标签监督（分类）、文本监督（CLIP 对比）、自监督（DINO 自蒸馏）。对比学习只是其中一种。准确叫法是\"判别式预训练\"（对应 GenLIP 的\"生成式\"）。"
      },
      {
        "h": "全文问答 · Q：两者的解法能否组合？（Q3 漏掉的半问）",
        "a": "notes/papers/2026-last-vit.html#qa-combine",
        "t": "Q：两者的解法能否组合？（Q3 漏掉的半问） 组合设想（待验证），本库没有联合实验。Gated Attention 管\"信息 分布 \"（防少数 token 吸走），LaSt-ViT 管\"CLS 聚合 \"（逼 CLS 从前景取），作用在 ViT 不同环节，正交可叠加。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-last-vit.html#open",
        "t": "还没搞懂 （四道检验题都已补齐，无残留漏洞。若日后复测发现新问题，再回填此处并同步 questions.md。）"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-last-vit.html#relations",
        "t": "关联 GenLIP ： 直接对接。同为 ViT attention artifact，机制和阶段不同：GenLIP 在生成式预训练发现 attention sink（少数 token 吸走信息）用 Gated Attention 压制；LaSt-ViT 在判别式预训练发现 lazy aggregation（背景抢 CLS）用频域选择性聚合纠正。可能的组合（待验证）：Gated Attention 管信息分布，LaSt-ViT 管 CLS 聚合。 VideoChat3 ： 间接相关。可研究把该聚合用于 VideoChat3 的 I3D-ViT；效果与接法尚待验证。 同领域可对比：Register tokens（Darcet et al.，治标不治本）、MaskCLIP/CLIPSelf/SCLIP（事后修正）、窗口注意力（拆东补西）、LOST（对象发现 baseline）。 待建概念页：ViT / CLS token / attention sink / lazy aggregation / Patch Score / Point-in-Box / frequency domain analysis / FFT"
      }
    ]
  },
  {
    "id": "2026-video-o3",
    "type": "paper",
    "title": "Video-o3",
    "href": "papers/2026-video-o3.html",
    "noteHref": "notes/papers/2026-video-o3.html",
    "sourceHref": "wiki/papers/2026-video-o3.md",
    "date": "2026-08-17",
    "topic": "video-understanding",
    "aliases": [
      "Video-o3",
      "Video-Holmes"
    ],
    "tags": [
      "tool-use",
      "cot-reasoning",
      "group-rl",
      "improve-reasoning"
    ],
    "essence": "Video-o3 拿到问题后，在同一上下文里交替推理与裁剪视频，让新找到的证据继续参与回答。",
    "review": {
      "next": "2026-10-07",
      "last": "2026-09-07",
      "count": 2,
      "result": "pass"
    },
    "relations": [
      {
        "type": "compare",
        "to": "2026-vst",
        "reason": "查询后工具检索与查询前文本记忆的时机不同；实时响应和补取证据的代价需要分别评估。",
        "status": "synthesis"
      },
      {
        "type": "complement",
        "to": "2026-videochat3",
        "reason": "编码器控制感知成本；工具调用选择证据位置。环节不同，不能据此断言组合增益。",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2026-video-o3.html#rebuild",
        "t": "长视频中的关键证据可能只出现几秒。均匀抽帧会漏掉它，把找线索与回答拆成两套流程又会丢上下文。Video-o3 把工具调用、证据与推理写在同一个上下文里。 先看全局概览 拿到问题后读低分辨率全局视频，判断缺少什么证据。 按需调用 VideoCrop 生成时间范围与视觉预算，裁剪结果加入当前上下文。模型再决定继续找还是回答。 训练分工与效率 SFT 对 10% 工具数据施加 TDAM；RL 用答案奖励、线索得分与轮数衰减约束轨迹。 具体例子（教学假设） ：问“谁先拿起钥匙”。概览只看到两人走动，模型可请求查看桌边那几秒，再结合新证据回答。若裁剪仍没显示关键动作，可以继续调用，但受轮数与上下文预算限制。 边界 ：TDAM 是训练期分工：工具规划阶段遮局部裁剪，回答阶段遮全局。它只用于部分数据，不是要求推理时永远禁看全局。找到线索也不保证推理正确。 换个条件看机制 删除轮数衰减，是否只会得到更好的答案？ 论文消融中工具调用更多，准确率反而下降。更多探索会增加成本，也可能使上下文碎片化。这个观察不表示每个问题都应只调用一次。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2026-video-o3.html#rebuild",
        "t": "五分钟重建 长视频中的关键证据可能只出现几秒。均匀抽帧会漏掉它，把找线索与回答拆成两套流程又会丢上下文。Video-o3 把工具调用、证据与推理写在同一个上下文里。 先看全局概览 拿到问题后读低分辨率全局视频，判断缺少什么证据。 按需调用 VideoCrop 生成时间范围与视觉预算，裁剪结果加入当前上下文。模型再决定继续找还是回答。 训练分工与效率 SFT 对 10% 工具数据施加 TDAM；RL 用答案奖励、线索得分与轮数衰减约束轨迹。 具体例子（教学假设） ：问“谁先拿起钥匙”。概览只看到两人走动，模型可请求查看桌边那几秒，再结合新证据回答。若裁剪仍没显示关键动作，可以继续调用，但受轮数与上下文预算限制。 边界 ：TDAM 是训练期分工：工具规划阶段遮局部裁剪，回答阶段遮全局。它只用于部分数据，不是要求推理时永远禁看全局。找到线索也不保证推理正确。 换个条件看机制 删除轮数衰减，是否只会得到更好的答案？ 论文消融中工具调用更多，准确率反而下降。更多探索会增加成本，也可能使上下文碎片化。这个观察不表示每个问题都应只调用一次。 可选自测 关掉提示后解释：共享上下文为什么既能帮助联合证据，也会产生注意力分散和 Fake Thinking？ 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 论文图解",
        "a": "notes/papers/2026-video-o3.html#figures",
        "t": "论文图解 直接回答分离搜索与交错搜索的比较 *图 2 费曼图解（论文 Figure 2）：左侧直接从初始视频答；中间把找线索与回答拆开；右侧把思考、调工具和回答放在同一条上下文中。本文采用右侧，让后续搜索能利用已有推理与证据。* Video-o3 多轮裁剪与共享上下文 *图 3 费曼图解（论文 Figure 3）：下方的全局与局部视频被编码，上方的推理决定下一次时间范围和视觉预算。裁剪结果加入历史，再选择继续调用或作答。多轮搜索受工具轮数与上下文上限约束。* TDAM 训练期的阶段可见性 *图 4 费曼图解（论文 Figure 4）：每行是当前 token，每列是可读取的历史信息。工具规划与回答阶段被分工：前者遮局部裁剪，后者遮全局概览。该掩码只用于部分 SFT 数据，不是所有推理步骤永久使用的规则。*"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-video-o3.html#problem",
        "t": "解决什么问题 长视频理解两个老毛病： 均匀采样把稀疏关键证据淹没在冗余里：关键 2 秒在 10 分钟视频里只占极少数帧。 已有\"找线索+答题\"方案把两阶段割裂：各自单独训练、上下文不共享、靠手工规则控制时机，没法做多线索联合推理。 三种旧范式各有死穴： 范式 代表 痛在哪 ------ ------ -------- 常规推理 Qwen2.5-VL 关键证据被冗余稀释，稀疏线索找不到 解耦迭代推理 VideoChat-R1.5、Video-RTS 上下文不共享→多线索没法联合推理；手工规则僵硬 文本 CoT Video-R1 不会主动\"放大看某段\"，视觉输入一开始就固定了"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-video-o3.html#intuition",
        "t": "大白话讲解 类比：侦探破案 vs 一次性看监控 常规推理：把整栋楼监控一次性快进看完直接下结论：关键 2 秒可能完全错过。 解耦迭代：派不同侦探分别看不同时段，各看各的不交流：没法把\"3 楼的人后来去了 5 楼\"串起来。 Video-o3：一个侦探先快进扫全片标疑点 → 放大 3 楼某段确认人 → 再放大 5 楼确认行为 → 把多线索串起来下结论：全程同一个侦探、同一个记忆。 🔧 最容易卡住的点①：\"原生\"（native）是什么意思？ 工具调用不是外部脚本触发的，而是模型自己生成的文本：模型在推理过程中自己写出 <grounding>{\"temporal_segment\": [97, 102], \"sampling_strategy\": \"coarse\"}</grounding>，系统执行后把裁剪结果拼回对话。模型必须学会\"何时调、调哪里、用多少分辨率、何时停\"。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-video-o3.html#mechanism",
        "t": "关键机制 ① 整体架构：回合制循环 输入 = 工具说明 + 用户问题 + 全局低分辨率视频。模型进入循环： 思考（<think>）：分解问题、评估当前证据够不够。 不够 → 调工具（<grounding>）：指定时间区间 + 分辨率配额（coarse/medium/fine）。 系统 VideoCrop 执行裁剪 → 局部高分辨率片段拼回上下文。 回到步骤 1，或直接 <answer> 终止。 评估上限 8 轮，视觉上下文上限 32k token。 ② Task-Decoupled Attention Masking（TDAM）：防注意力分散 + 防 Fake Thinking 共享上下文的问题：全局视频、局部裁剪、推理文本混在一起，注意力互相干扰。更严重的是 Fake Thinking：模型通过工具找到了正确证据，最终答案却和中间推理矛盾（\"推理对了却答错了\"），因为答题时被全局模糊印象带跑了。 TDAM 在 SFT 阶段加硬性掩码： 生成工具调用时：禁止看局部裁剪片段 → 逼模型只靠全局视野做定位规划。 生成最终答案时：禁止看全局视频 → 逼模型只靠工具获取的局部证据作答。 关键细节：只对 10% 的工具使用数据加掩码（90% 保持全可见），避免丧失全局+局部综合能力。消融显示掩码比例从 10% 提到 20%/30% 性能反降。 🔧 最容易卡住的点②：为什么只对 10% 加掩码？ 全加掩码会让模型丧失\"同时参考全局+局部\"的能力：有些问题确实需要两者结合。10% 是\"缓解注意力分散\"和\"保留综合推理\"的平衡点。 ③ Verifiable Trajectory-Guided Reward（VTGR）：RL 阶段控效率 $$R = r_a \\cdot (1 + \\beta) + r_f$$ $r_a$：答案对错（0/1）。 $r_f$：格式分。 $\\beta = (b_0 + w_g \\cdot S_{clue}) \\cdot \\gamma$：轨迹引导乘子。 $S_{clue}$（Hybrid Clue Score）：裁剪区间和真实证据区间的 IoU/IoP/IoG 对齐度 → 奖励\"找得准\"。 $\\gamma$（Turn Decay Factor）：轮数衰减 → 鼓励\"找得快\"，证据够了就停。 逻辑：答对只拿基础分；裁得准+轮数少则 $\\beta$ 大放大奖励；答错 $\\beta$ 不生效。用 GRPO 优化，加 over-turn masking（超轮数轨迹不产梯度）。 ④ Seeker-173K 数据集 四阶段合成：线索定位 → 有效性验证 → 轨迹生成 → 逻辑一致性检查。分 free（自由探索，无轨迹标注）和 tg（轨迹引导，有参考轮数 $k_{ref}$）两类。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2026-video-o3.html#evidence",
        "t": "结果与代价 SOTA：MLVU 72.1%（超 VideoZoomer 65.2），Video-Holmes 46.5%（7B 显著领先），LVBench 47.6%。 效率：MLVU 推理 10.2s，比解耦方法 VideoChat-R1.5（18.9s）快 46%：共享上下文支持 KV Cache 增量计算，不用每轮重新编码。 消融：Hybrid Clue Score 删了→工具调用率和准确率同时暴跌；Turn Decay 删了→调用率升但准确率降（过度探索碎片化上下文）；SFT 冷启动省了→RL 出现\"dip-and-recover\"。 代价/局限： 8 轮上限对极长电影/深度多跳可能不够。 工具单一（只有 VideoCrop），扩展 OCR/音频需大量工程。 Fake Thinking 未根治（TDAM 只在 10% 数据上用）。 盲目探索风险：微妙线索可能在错误区间反复调工具浪费预算。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2026-video-o3.html#ai-notes",
        "t": "AI 预读备注 来自 Zotero AI Butler 子笔记，作为费曼 Phase 1 预读底稿，校验后与最终讲解无重大差异。AI 笔记更细处可回查原文： DeepRead 笔记（itemKey 7R3CXS5H，task=deepread）：逐章导读（引言/相关工作/方法论/数据集/实验/结论），含 TDAM 公式逐条解释、VTGR 奖励公式拆解、消融逻辑链、失败案例定性分析。 摘要笔记（itemKey MT7328F2，task=summary）：方法动机+pipeline+公式+对比表+实验数据+培训建议。 表格笔记（itemKey 3BIVY2LN，task=table）：结构化字段速查。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2026-video-o3.html#restatement",
        "t": "我的复述 费曼检验时的原话，保留原味不润色。 Q1（原生 vs 解耦 + 两核心问题）： 原生和解耦迭代推理的本质区别是原生的工具调用是由模型自己产生、触发的；共享上下文会带来信息过多、全局局部混杂等问题，video-o3 的办法是给部分（10%）的视频加上了片段mask，生成工具调用时禁止看到局部裁剪片段，让模型只靠全局视野做定位规划，生成最终答案时，禁止看全局视频，让模型只能通过工具获取的局部证据作答。 Q2（TDAM + Fake Thinking）： TDAM 在生成工具调用时对局部片段加了掩码，强制模型通过全局视频生成调用，生成答案阶段对全局视频加编码，强制模型通过片段证据生成答案；对 10% 的数据而不是全部加掩码是因为有些任务确实需要同时关注全局和局部信息才能解答；fake thinking 指的是模型的思考过程中实际上已经找到证据链了，但是回答的时候给出相反的结论，原因是共享上下文把全局推理、局部片段等各种信息都混杂在一起，把模型带偏了。 Q3（VST vs Video-o3 对比）： VST 用的方式是在处理片段的同时把关键信息通过文本记录下来，然后下一个片段来时把这些信息也作为上下文的一部分。推理时机分别放在哪里这一点我可能没有明白。两者结合可以获取额外局部文本证据和局部片段证据的收益，引入新问题是文本证据和局部片段证据相互排斥时后不知道采信哪个。"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2026-video-o3.html#pitfalls",
        "t": "卡壳点与解答 Q：共享上下文带来的两个核心问题分别是什么？各对应什么解法？（Q1 漏掉的半问） A：(1) 注意力分散（全局/局部混杂 + Fake Thinking）→ TDAM（10% 掩码）。(2) 上下文效率（每调一次工具 token 膨胀 + 不知何时停）→ VTGR（$S_{clue}$ 奖励裁得准 + $\\gamma$ 惩罚轮数多）。两个问题两个解法是配对的。 Q：VST 和 Video-o3 的推理时机分别放在哪里？（Q3 漏掉的半问） A：VST = 查询前（播放期边看边想写笔记，查询到直接读笔记秒答）；Video-o3 = 查询后（拿到问题后在单一上下文里多轮调工具找线索，每轮裁剪+推理交替）。一句话：VST 是\"先把笔记做好，问就秒答\"；Video-o3 是\"拿到问题才去翻监控放大看\"。 Q：两者组合后除了证据冲突还会引入什么结构性问题？（Q3 漏掉的半问） A：VST 的\"查询即答\"和 Video-o3 的\"多轮探索后才答\"在响应时机上逻辑冲突：需要设计新的统一调度（何时秒答、何时探索），和 VideoChat3+VST 组合时的问题一样。"
      },
      {
        "h": "全文问答 · Q：共享上下文带来的两个核心问题分别是什么？各对应什么解法？（Q1 漏掉的半问）",
        "a": "notes/papers/2026-video-o3.html#qa-two-problems",
        "t": "Q：共享上下文带来的两个核心问题分别是什么？各对应什么解法？（Q1 漏掉的半问） (1) 注意力分散 （全局/局部混杂 + Fake Thinking）→ TDAM（10% 掩码）。(2) 上下文效率 （每调一次工具 token 膨胀 + 不知何时停）→ VTGR（ $S_{clue}$ 奖励裁得准 + $\\gamma$ 惩罚轮数多）。两个问题两个解法是配对的。"
      },
      {
        "h": "全文问答 · Q：VST 和 Video-o3 的推理时机分别放在哪里？（Q3 漏掉的半问）",
        "a": "notes/papers/2026-video-o3.html#qa-timing",
        "t": "Q：VST 和 Video-o3 的推理时机分别放在哪里？（Q3 漏掉的半问） VST = 查询前 （播放期边看边想写笔记，查询到直接读笔记秒答）；Video-o3 = 查询后 （拿到问题后在单一上下文里多轮调工具找线索，每轮裁剪+推理交替）。一句话： VST 是\"先把笔记做好，问就秒答\"；Video-o3 是\"拿到问题才去翻监控放大看\"。"
      },
      {
        "h": "全文问答 · Q：两者组合后除了证据冲突还会引入什么结构性问题？（Q3 漏掉的半问）",
        "a": "notes/papers/2026-video-o3.html#qa-combine",
        "t": "Q：两者组合后除了证据冲突还会引入什么结构性问题？（Q3 漏掉的半问） VST 的\"查询即答\"和 Video-o3 的\"多轮探索后才答\"在 响应时机 上逻辑冲突：需要设计新的统一调度（何时秒答、何时探索），和 VideoChat3+VST 组合时的问题一样。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-video-o3.html#open",
        "t": "还没搞懂 （三道检验题都已补齐，无残留漏洞。若日后复测发现新问题，再回填此处并同步 questions.md。）"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-video-o3.html#relations",
        "t": "关联 VST ： 同属长视频推理但路线不同。VST 是\"推理前置\"（播放期边看边想，FIFO 文本记忆），Video-o3 是\"推理时主动检索\"（动态裁剪视频，工具调用）。VST 解决实时性（0.56s），Video-o3 解决多跳精度（46.5% VideoHolmes）。组合设想（待验证）：VST 的文本记忆 + Video-o3 的工具裁剪；但\"查询即答\"vs\"多轮探索\"在响应时机上逻辑冲突，需统一调度。 GeoAnchor ： 同打破\"纯文本 CoT\"的两条对立路线：Video-o3 把中间推理外化成工具调用（可见可审计、工具可插拔），GeoAnchor 内化成连续潜变量（保几何保真度、教师烧进权重）。本文 Related Works 2.2 自己把\"think with images\"工具流与 latent reasoning 对立。路线对照（库内综合）：前者中间步骤可审计，后者直接表达连续量；未验证两者在同任务下的通用优劣。 VideoChat3 ： 视觉策略互补。VideoChat3 靠编码器压缩+状态机决定看多少像素，Video-o3 靠推理时工具调用决定看哪里。一个管感知效率，一个管检索精度。 同领域可对比：Video-R1（文本 CoT，视觉固定）、VideoChat-R1.5/Video-RTS（解耦迭代推理）、VideoZoomer、LOVE-R1。 待建概念页：multi-hop reasoning / tool invocation / attention masking / GRPO / KV cache / test-time scaling"
      }
    ]
  },
  {
    "id": "2026-u-opsd",
    "type": "paper",
    "title": "U-OPSD",
    "href": "papers/2026-u-opsd.html",
    "noteHref": "notes/papers/2026-u-opsd.html",
    "sourceHref": "wiki/papers/2026-u-opsd.md",
    "date": "2026-08-19",
    "topic": "distillation",
    "aliases": [
      "U-OPSD",
      "On-Policy Self-Distillation without Any Supervision",
      "OPD"
    ],
    "tags": [
      "on-policy-distillation",
      "self-distillation",
      "reduce-supervision"
    ],
    "essence": "U-OPSD 用模型自己投票形成的完整解题轨迹给教师增加上下文，再沿学生的反对轨迹做分布蒸馏。",
    "review": {
      "next": "2026-10-07",
      "last": "2026-09-07",
      "count": 2,
      "result": "pass"
    },
    "relations": [
      {
        "type": "compare",
        "to": "2026-s2vopd",
        "reason": "两篇实验的散度排序不同；用教师信息的可恢复性解释这份差异是待验证假说。",
        "status": "hypothesis"
      },
      {
        "type": "possible-combination",
        "to": "2026-open-mopd",
        "reason": "研究将自投票教师接入多教师预算框架；本库无联合实验，门控还可能改变各域 token 份额。",
        "status": "hypothesis"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2026-u-opsd.html#rebuild",
        "t": "普通自蒸馏仍可能给教师提供真实解题轨迹。U-OPSD 用模型自己的多次作答形成共识，选一条完整共识轨迹作为教师的额外上下文。 采样与投票 同题生成 8 条轨迹，规范化最终答案后投票。共识置信度用获胜票数除以全部 8 条，包含无效轨迹。 门控并选参考 置信度达到阈值、且存在不同答案的轨迹时才训练。y+ 是通向共识答案的一整条轨迹，不只是答案值。 在学生前缀上蒸馏 教师看题目、完整 y+ 和 y⁻ 前缀；学生只看题目与同一个 y⁻ 前缀。逐 token 用 forward KL 对齐完整分布。 具体例子（教学假设） ：8 条中，5 条答案为 42、1 条为 17、2 条无效。共识置信度是 5/8，不是 5/6。教师多看的，是一条答案为 42 的完整推理；训练目标不是把一个“42”复制给学生。 边界 ：高共识可能一致答错。论文所测伪标签错误率为 13.3%，这是监督噪声风险，不是最终准确率的数学硬上界。散度消融只说明该设置里 forward KL 更稳。 换个条件看机制 如果 8 条有效回答全是同一个答案，这道题是否还提供反对轨迹供本方法训练？ 不提供。没有与共识不同的 y⁻，会跳过。共识只描述模型之间的一致性，不证明答案是真值。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2026-u-opsd.html#rebuild",
        "t": "五分钟重建 普通自蒸馏仍可能给教师提供真实解题轨迹。U-OPSD 用模型自己的多次作答形成共识，选一条完整共识轨迹作为教师的额外上下文。 采样与投票 同题生成 8 条轨迹，规范化最终答案后投票。共识置信度用获胜票数除以全部 8 条，包含无效轨迹。 门控并选参考 置信度达到阈值、且存在不同答案的轨迹时才训练。y+ 是通向共识答案的一整条轨迹，不只是答案值。 在学生前缀上蒸馏 教师看题目、完整 y+ 和 y⁻ 前缀；学生只看题目与同一个 y⁻ 前缀。逐 token 用 forward KL 对齐完整分布。 具体例子（教学假设） ：8 条中，5 条答案为 42、1 条为 17、2 条无效。共识置信度是 5/8，不是 5/6。教师多看的，是一条答案为 42 的完整推理；训练目标不是把一个“42”复制给学生。 边界 ：高共识可能一致答错。论文所测伪标签错误率为 13.3%，这是监督噪声风险，不是最终准确率的数学硬上界。散度消融只说明该设置里 forward KL 更稳。 换个条件看机制 如果 8 条有效回答全是同一个答案，这道题是否还提供反对轨迹供本方法训练？ 不提供。没有与共识不同的 y⁻，会跳过。共识只描述模型之间的一致性，不证明答案是真值。 可选自测 关掉提示后写出师生输入各包含什么，并解释为什么给学生也加入 y+ 会改变学习信号。 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 论文图解",
        "a": "notes/papers/2026-u-opsd.html#figures",
        "t": "论文图解 依赖外部监督与无监督自蒸馏的差别 *图 1 费曼图解（论文 Figure 1）：左侧给教师真实解或示例，中间给环境反馈，右侧用模型自己的投票结果。比较的是额外信息从哪里来；无外部答案监督不等于没有预训练知识或没有输入题目。* U-OPSD 投票参考与逐 token 蒸馏 *图 2 费曼图解（论文 Figure 2）：学生先生成多条轨迹，投票选共识，并取一条完整获胜轨迹给教师。教师与学生在反对轨迹的相同前缀上预测下一 token，再对齐分布。答案值只用于分组，不代替完整参考轨迹。*"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-u-opsd.html#problem",
        "t": "解决什么问题 LLM 后训练方法谱系，每往右一步去掉一类外部依赖： SFT ──► OPD ──► OPSD ──► U-OPSD 要GT解+教师强制 要强教师 要GT解 啥都不要(GT解也不要) SFT：要标好的答案，且 teacher-forcing 导致训练-推理失配（train-inference mismatch）+ 灾难性遗忘（catastrophic forgetting）。 GRPO：要 GT 答案做可验证奖励；奖励稀疏：一整条 rollout 一个 0/1 序列级 advantage，组内全对/全错梯度归零。 OPD：要一个外部更强教师的逐 token 分布；依赖外部模型。 OPSD：参数自共享（同模型当教师和学生），但教师比学生多看 GT 解 y\\*：让教师更强的信息仍来自模型之外。论文原话：这是\"只在参数共享意义上的 self，信息仍外部\"。 U-OPSD 把最后这层 GT 解也去掉，用模型自己投票出来的\"伪解 y+\"替代 y\\*，是首个完全无外部监督的 on-policy 自蒸馏。痛点：GT 标注的成本与稀缺是 RLVR/OPSD 规模化的瓶颈；许多领域监督昂贵/不可靠/不可得。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-u-opsd.html#intuition",
        "t": "大白话讲解 想象一个学生考前自学，但有\"看过答案的自己\"在旁边。OPSD 是：你偷偷看了标准答案，让\"已看答案的你\"在每个步骤上指导\"没看答案的你\"。U-OPSD 是：没有标准答案，你把同一题独立做 8 遍，8 次里 5 次都算出 42，那大概率 42 是对的；于是把\"算出 42 的完整过程\"当\"看过答案的你\"的参考，专门去纠正\"算成别的数的那 3 次过程\"里每一步的偏差。 关键：只纠正答错的 rollout，不直接模仿答对的那条（否则就成了 SFT teacher-forcing）。蒸馏沿答错 rollout 的前缀做，让\"不知道答案的学生\"在每个 token 上向\"知道答案的教师\"的下一 token 分布靠拢，纠正信号正好戳在\"自信但错\"的地方。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-u-opsd.html#mechanism",
        "t": "关键机制 对每道无答案题 x： ① Sample（采样）：冻结梯度策略 π̄（stop-gradient）独立采样 G=8 条 rollout，训练温度 1.1 + top-p 0.95 + top-k 20。 ② Vote（投票）：从每条 rollout 抽 \\boxed{} 答案并规范化，多数票赢的当伪答案 ã(x)。自一致性分数 c(x) = 同意票数 / G：分母是 G 不是有效答案数，截断的废 rollout 直接拉低 c(x)，天然惩罚\"模型说不清\"的题。 ③ Gate（门控，关键）：两道筛子都不过的训练步直接跳过、不产生梯度： c(x) < τ（τ=0.5，绝对多数）→ 投票不可靠 → 不学。 Y⁻ = ∅（所有有效 rollout 一致）→ 没有分歧可纠正 → 也不学。 这一步自动挑训练样本：只学\"模型能形成稳定共识、但仍时不时跑偏\"的题（能力边界 / competence frontier / 自发课程 self-curriculum）。太难的（投不出票）和太简单的（全对）自动跳过，不需人工排课程。 ④ Distill（蒸馏）： 输入上下文 看 y+（伪解） 看 y⁻<t（错答前缀） --- --- --- --- 教师 π̄ x + y+ + y⁻<t ✅ ✅ 学生 πθ x + y⁻<t ❌ ✅ 两者共享 x + y⁻<t（错答前缀）；教师比学生多出来的是伪解 y+。如果学生也看了 y+，教师=学生，KL 散度恒 0，无学习信号：学习信号正是从\"教师知道答案、学生不知道\"这个差里长出来的。 逐 token 算前向 KL（forward KL，KL(教师‖学生)，β=0），全词表，逐 token 点裁剪（point-wise clipping）。教师/学生选哪条：消融最优 = 最长同意 rollout 当 y+，最长反对 rollout 当 y⁻。 主目标（Eq 1/5）： L_U-OPSD(θ) = E_x E_{y(g)~π̄} [ 1{Y⁻≠∅} · (1/ B⁻ ) Σ_{y⁻∈B⁻} (1/ y⁻ ) Σ_{n=1}^{ y⁻ } Dβ( π̄(· x, y+, y⁻<n) ‖ πθ(· x, y⁻<n) ) ] 蒸馏的正是\"知道答案\"这个信息增量对每步决策的影响：且只在模型实际会走偏的前缀上施加。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2026-u-opsd.html#evidence",
        "t": "结果与代价 Non-thinking 模式：Qwen3-4B/8B 比基座 +8.5%/+10.7%，无 GT 反而超过有 GT 的 OPSD（+3.2%/+2.3%），也超过 SFT/GRPO。对比无标签 RL（TTRL/RENT/Intuitor）领先 7.0：11.3%：\"共识当条件上下文做稠密蒸馏\"远胜\"共识当标量奖励做 RL\"。 Thinking 模式：+2.2%/+1.9%，与 OPSD 打平/略胜。增益小因基座已强（74.9/76.1）headroom 小 + rollout 太长同 token 预算下完成投票少。 Instruct 模型：30B-A3B-Instruct 75.77→77.46，配方免调优迁移到 MoE 大模型。 代价/局限： 伪标签 13.3% 是错的：监督噪声风险，可能强化多数错误；不是最终准确率的数学硬上界；未测故意污染投票的训练动态。 只在可抽取、可规范化最终答案的任务（竞赛数学）上验证；开放式生成需把精确匹配换软共识（如 embedding 相似度投票）。 增益依赖基座能力：太弱投票乱、太强没 headroom，中等偏强最典型。 缺 seed 重复误差棒。 τ 默认 0.5 非最优：扫描里 τ=0.3 最好（58.59 vs 57.10，跨度 14.2%）。 三个关键设计取舍（消融）： 教师必须看完整推理轨迹，不能只看 boxed 答案：label-only 掉 10.3：15.8%，甚至低于基座（光知道\"答案是 42\"无法引导中间步骤）。 必须 forward KL，不能 reverse KL / JSD：reverse KL 训练崩了（生成长度 2.7k→99k 字符爆炸，boxed 率 99%→33%，丧失终止能力，无限重复短语直到预算耗尽）；JSD 掉 13.8% 回到基座。forward KL 有 mode-covering 倾向，reverse KL 有 mode-seeking 倾向；塌缩是本文实验结果，不是该散度必然的结局。 必须全词表分布蒸馏，不能 sampled-token：student-token-only 掉 13.7%；且该差距在伪标签下比 GT 下更大（AIME25 领先 17.8% vs 2.0%）。好消息：top-100 截断反而最好（59.01），实用降本。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2026-u-opsd.html#ai-notes",
        "t": "AI 预读备注 Zotero AI Butler 两份子笔记（task=summary/table，zhipu/glm-5.3 生成，2026-08-19）做预读底稿。 AI-Butler 摘要笔记 itemKey：2ZRTZGPX（task=summary），provider/model：zhipu/glm-5.3 glm-5.3 的复现级摘要笔记质量很高，已覆盖方法 pipeline 全八步、消融全表、failure case、伪代码与常见坑，与原文交叉核对一致。本文讲解在其基础上做了三点提炼：(a) 把\"为什么只蒸馏 disagreeing rollout 而非模仿 agreeing\"讲清（SFT teacher-forcing vs on-policy 条件蒸馏的本质区别）；(b) 梳理含 13.3% 错标签时仍有净收益的设计；这些设计不构成抗噪保证；(c) 明确\"全词表蒸馏在伪标签下比 GT 下更重要\"（noise 放大效应）。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2026-u-opsd.html#restatement",
        "t": "我的复述 （费曼检验时原话保留） 训练 step：1. 学生模型 rollout G 条轨迹；2. 统计 G 条轨迹共识最大的那条占总轨迹数比例是否大于 τ，如果小于则扔掉，如果大于则留下，全对全错的情形则这条样本直接丢掉；3. 然后取共识轨迹作为 y+，与共识轨迹相反结论的一条轨迹为 y⁻，给教师 x y+ y⁻<t，给学生 x y⁻<t，然后逐 token 算前向 KL，共享的上下文为问题和 y⁻，教师多看了共识轨迹 y+，为什么变强的原因是对于已经训练充分的模型，很多问题是他大部分时间能答对偶尔打不对，通过 U-OPSD 让他强化这类的信息从而提升模型的能力。"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2026-u-opsd.html#pitfalls",
        "t": "卡壳点与解答 Q：Q1 上下文谁看 y+/y⁻，最初答反了\"学生看到 y+\"。 A：纠正后：教师 x + y+ + y⁻<t（看 y+），学生 x + y⁻<t（不看 y+）。两者共享 x + y⁻<t，教师多出的只有 y+。学生若也看 y+，则教师=学生 KL 恒 0 无信号；学习信号正是从\"教师知答案、学生不知\"的差里长出来。后确认是手误打反（原意为学生见 y⁻）。 Q：13.3% 的错标签为什么没把模型带偏？ A：错共识仍会提供误导监督。论文抽查中，过门后的伪标签有 13.3% 错误；实验总体仍提升，说明这份噪声没有抵消该设置的全部收益。门控、自发课程和稠密分布信号是方法设计，但原文没有证明「正确梯度必然盖过错误梯度」或「噪声 token 必然被平均掉」。13.3% 也不是最终准确率的硬上界。稳定地多数答错仍是失败情形。 Q：Q3\"共识被用作上下文\"不确定对不对。 A：对，就是这一句话。TTRL/RENT/Intuitor 把多数投票/置信度当标量奖励（整条 rollout 一个数，稀疏，信息被压成 scalar）；U-OPSD 把共识当教师的特权上下文（y+ 拼进教师输入，每个 token 都有教师完整下一 token 分布，稠密）。同样 rollout 预算领先 7：11 个点的本质原因。 Q：thinking 模式为什么增益小？ A：三层原因（原文均给出）：① 基座已强（74.9/76.1）headroom 小；② thinking rollout 太长，同 token 预算下完成投票少；③ 长 rollout 截断多，截断是无效 rollout 拉低 c(x)（分母是 G 不是有效数）。 Q：为什么必须前向 KL，反向 KL 会崩？（散度方向的直觉） A：先区分公式方向。forward KL 是 KL(教师‖学生)，按教师概率加权，学生漏掉教师有概率的项会付出代价；reverse KL 是 KL(学生‖教师)，按学生概率加权，学生把概率放在教师不支持的项上会付出代价。常说的 mode-covering 与 mode-seeking 是拟合受限时的倾向，不是每次必然覆盖全部峰或只留一座峰。若能精确匹配教师，两种 KL 都在分布相同时取零。 本文消融的事实：reverse KL 出现复读塌缩（长度 2.7k→99k 字符、boxed 率 99%→33%），JSD 掉 13.8 个点，forward KL 更稳。这个结果支持本设置采用 forward KL，不构成所有逐 token 蒸馏的普适定律。 2026-08-24 的历史复测提醒保留：反向 KL 按学生分布加权；本文实测失败是复读和丧失终止能力。2026-10-04 收紧了「必然单峰塌缩」的解释，未进行新的复测。 Q：y+ 是单个 token 还是多个 token？<t 为什么只在 y⁻ 上不在 y+ 上？ A：y+ 是多个 token：一整条完整的解题轨迹，不是单个 token，也不是单个答案值。 把符号对齐： 符号 是什么 几个 token 有无 <t --- --- --- --- y+ 一条完整的同意 rollout（整个解题过程，结尾 \\boxed{共识答案}） 多个（几百~上千） 无：整条喂教师，不截断 y⁻ 一条完整的反对 rollout（整个解题过程） 多个（几百~上千） 无：也是整条 y⁻<t y⁻ 的前 t 个 token（前缀） t 个，逐步增长 有：随 t 推进前缀变长 <t 是\"截到第 t 个位置为止\"的意思，只在 y⁻ 上出现、不在 y+ 上出现，因为蒸馏是沿 y⁻（答错那条）逐 token 往前走的：t 从 1 走到 y⁻ 全长，前缀一格格变长；而 y+ 这条\"参考答案\"是整条一起拼进教师输入当背景知识，不需截断。 一个 token 位置 t 的画面： 教师输入: [题目 x] + [完整参考解 y+ ........boxed] + [y⁻ 的前 t 个 token ...] 学生输入: [题目 x] + [y⁻ 的前 t 个 token ...] ↑ ↑ 教师多看这一整条 两者共享的前缀 (完整,不截断) (随 t 一格格变长) y+ 是\"心里有数的完整答案\"，y⁻<t 是\"学生正在解题、走到第 t 步\"的状态模拟。t 每加 1，在新位置算一次教师/学生下一 token 分布的 KL，产生一个梯度，沿 y⁻ 走完全长累计成总损失。 [这里最容易卡住] 别把 y+ 误当成共识答案值 ã(x) 本身（即 \\boxed{42} 这个单值）。ã(x) 是单值，用来投票和分组；y+ 是通向 ã(x) 的整条推理轨迹，用来喂教师当上下文。 这正是消融\"label-only（只给教师看 boxed 答案）掉 10.3：15.8%\"的来由：只给一个答案值没用，教师不知道\"怎么走到这个答案\"，没法在每个 token 上给出\"已知这条路的我现在该怎么走\"的指引。y+ 必须是完整轨迹。"
      },
      {
        "h": "全文问答 · Q：Q1 上下文谁看 y+/y⁻，最初答反了\"学生看到 y+\"。",
        "a": "notes/papers/2026-u-opsd.html#qa-context",
        "t": "Q：Q1 上下文谁看 y+/y⁻，最初答反了\"学生看到 y+\"。 纠正后：教师 x + y+ + y⁻<t （看 y+），学生 x + y⁻<t （ 不看 y+ ）。两者共享 x + y⁻<t ，教师多出的只有 y+。学生若也看 y+，则教师=学生 KL 恒 0 无信号；学习信号正是从\"教师知答案、学生不知\"的差里长出来。后确认是手误打反（原意为学生见 y⁻）。"
      },
      {
        "h": "全文问答 · Q：13.3% 的错标签为什么没把模型带偏？",
        "a": "notes/papers/2026-u-opsd.html#qa-13-3",
        "t": "Q：13.3% 的错标签为什么没把模型带偏？ 错共识仍会提供误导监督。论文抽查中，过门后的伪标签有 13.3% 错误；实验总体仍提升，说明这份噪声没有抵消该设置的全部收益。门控、自发课程和稠密分布信号是方法设计，但原文没有证明「正确梯度必然盖过错误梯度」或「噪声 token 必然被平均掉」。13.3% 也不是最终准确率的硬上界。稳定地多数答错仍是失败情形。"
      },
      {
        "h": "全文问答 · Q：Q3\"共识被用作上下文\"不确定对不对。",
        "a": "notes/papers/2026-u-opsd.html#qa-ttrl",
        "t": "Q：Q3\"共识被用作上下文\"不确定对不对。 对，就是这一句话。TTRL/RENT/Intuitor 把多数投票/置信度当 标量奖励 （整条 rollout 一个数，稀疏，信息被压成 scalar）；U-OPSD 把共识当 教师的特权上下文 （y+ 拼进教师输入，每个 token 都有教师完整下一 token 分布，稠密）。同样 rollout 预算领先 7：11 个点的本质原因。"
      },
      {
        "h": "全文问答 · Q：thinking 模式为什么增益小？",
        "a": "notes/papers/2026-u-opsd.html#qa-thinking",
        "t": "Q：thinking 模式为什么增益小？ 三层原因（原文均给出）：① 基座已强（74.9/76.1）headroom 小；② thinking rollout 太长，同 token 预算下完成投票少；③ 长 rollout 截断多，截断是无效 rollout 拉低 c(x)（分母是 G 不是有效数）。"
      },
      {
        "h": "全文问答 · Q：为什么必须前向 KL，反向 KL 会崩？（散度方向的直觉）",
        "a": "notes/papers/2026-u-opsd.html#qa-fwd-kl",
        "t": "Q：为什么必须前向 KL，反向 KL 会崩？（散度方向的直觉） 先区分公式方向。forward KL 是 KL(教师‖学生) ，按教师概率加权，学生漏掉教师有概率的项会付出代价；reverse KL 是 KL(学生‖教师) ，按学生概率加权，学生把概率放在教师不支持的项上会付出代价。常说的 mode-covering 与 mode-seeking 是拟合受限时的倾向，不是每次必然覆盖全部峰或只留一座峰。若能精确匹配教师，两种 KL 都在分布相同时取零。 本文消融的事实：reverse KL 出现复读塌缩（长度 2.7k→99k 字符、boxed 率 99%→33%），JSD 掉 13.8 个点，forward KL 更稳。这个结果支持本设置采用 forward KL，不构成所有逐 token 蒸馏的普适定律。 2026-08-24 的历史复测提醒保留：反向 KL 按学生分布加权；本文实测失败是复读和丧失终止能力。2026-10-04 收紧了「必然单峰塌缩」的解释，未进行新的复测。"
      },
      {
        "h": "全文问答 · Q：y+ 是单个 token 还是多个 token？ <t 为什么只在 y⁻ 上不在 y+ 上？",
        "a": "notes/papers/2026-u-opsd.html#qa-y-plus",
        "t": "Q：y+ 是单个 token 还是多个 token？ <t 为什么只在 y⁻ 上不在 y+ 上？ y+ 是多个 token：一整条完整的解题轨迹，不是单个 token，也不是单个答案值。 把符号对齐： 符号 是什么 几个 token 有无 <t y+ 一条完整的 同意 rollout（整个解题过程，结尾 \\boxed{共识答案} ） 多个（几百~上千） 无：整条喂教师，不截断 y⁻ 一条完整的 反对 rollout（整个解题过程） 多个（几百~上千） 无：也是整条 y⁻<t y⁻ 的 前 t 个 token （前缀） t 个，逐步增长 有：随 t 推进前缀变长 <t 是\"截到第 t 个位置为止\"的意思，只在 y⁻ 上出现、不在 y+ 上出现，因为 蒸馏是沿 y⁻（答错那条）逐 token 往前走的 ：t 从 1 走到 y⁻ 全长，前缀一格格变长；而 y+ 这条\"参考答案\"是整条一起拼进教师输入当背景知识，不需截断。 一个 token 位置 t 的画面： 教师输入: [题目 x] + [完整参考解 y+ ........boxed] + [y⁻ 的前 t 个 token ...] 学生输入: [题目 x] + [y⁻ 的前 t 个 token ...] ↑ ↑ 教师多看这一整条 两者共享的前缀 (完整,不截断) (随 t 一格格变长) y+ 是\"心里有数的完整答案\"，y⁻<t 是\"学生正在解题、走到第 t 步\"的状态模拟。t 每加 1，在新位置算一次教师/学生下一 token 分布的 KL，产生一个梯度，沿 y⁻ 走完全长累计成总损失。 [这里最容易卡住] 别把 y+ 误当成共识答案值 ã(x) 本身（即 \\boxed{42} 这个单值）。 ã(x) 是单值，用来投票和分组；y+ 是通向 ã(x) 的整条推理轨迹，用来喂教师当上下文。 这正是消融\"label-only（只给教师看 boxed 答案）掉 10.3：15.8%\"的来由：只给一个答案值没用，教师不知道\"怎么走到这个答案\"，没法在每个 token 上给出\"已知这条路的我现在该怎么走\"的指引。y+ 必须是完整轨迹。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-u-opsd.html#open",
        "t": "还没搞懂 _无_：检验题全部补齐，无残留漏洞。"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-u-opsd.html#relations",
        "t": "关联 S²VOPD ： 兑现本文预留的 on-policy distillation 钩子（视觉域）。同作者线（Yijiang Li 一作 + Vasconcelos 组）的域互补：本文教师多看\"伪解 y+\"（文本特权上下文），S²VOPD 教师多看\"清晰像素\"（把学生的输入图退化来构造不对称，方向倒转：不减教师加的信息，而减学生的信息）。散度冲突注记（重要）：本文实验中 forward KL 更稳（reverse 复读塌缩、JSD 掉 13.8），S²VOPD 却是 JSD 最好 > reverse KL > forward KL 最差，排序完全颠倒：一种统一解释（待验证）是\"教师多出的信息可否恢复\"：本文的解题思路学生原则上能自己推出来（可恢复→全面模仿对），S²VOPD 的清晰像素永远拿不回来（不可恢复→模仿不可及细节有害）。两组结果不能推出普适散度规则；是否由信息类型解释仍待验证。 Open-MOPD ： 兑现本文预留的 on-policy distillation 钩子。OPD 家族两个正交切片：本文管\"单教师的信号从哪来\"（无 GT 自蒸馏），Open-MOPD 管\"多教师信号之间怎么分账\"（token 数量/reward 幅度/新鲜度三层预算失衡，35.6%→83.4% 回收率）。组合设想（待验证）：多个自蒸馏伪教师 + Open-MOPD 三机制；本库没有联合实验。散度注记：本文前向 KL 直接当 loss（本文 reverse KL 实验出现复读塌缩）；Open-MOPD 的 reverse-KL 式 dense reward 是 PPO 的 reward 信号（sg 停梯度 + PPO 裁剪目标）而非直接损失：同方向不同框架，不矛盾。 未来入库钩子：若 ingest on-policy distillation（DistiLLM 系列）、self-consistency（Wang et al. 2023）、推理路由/预算控制（Thinkless、BudgetThinker）相关论文，应回链本页：U-OPSD 把无监督蒸馏三条线交汇成一个方法。"
      }
    ]
  },
  {
    "id": "2026-open-mopd",
    "type": "paper",
    "title": "Open-MOPD",
    "href": "papers/2026-open-mopd.html",
    "noteHref": "notes/papers/2026-open-mopd.html",
    "sourceHref": "wiki/papers/2026-open-mopd.md",
    "date": "2026-08-27",
    "topic": "distillation",
    "aliases": [
      "Open-MOPD",
      "Multi-Teacher On-Policy Distillation",
      "M-OPD"
    ],
    "tags": [
      "on-policy-distillation",
      "multi-teacher",
      "budget-allocation",
      "improve-training-efficiency"
    ],
    "essence": "Open-MOPD 按 token 份额、奖励幅度和奖励新鲜度分配多教师蒸馏的训练预算，缓解各域优化失衡。",
    "review": {
      "next": "2026-10-19",
      "last": "2026-09-19",
      "count": 2,
      "result": "pass"
    },
    "relations": [
      {
        "type": "possible-combination",
        "to": "2026-u-opsd",
        "reason": "多个自蒸馏教师与 token、幅度、新鲜度分配的组合是设想，本库无联合实验。",
        "status": "hypothesis"
      },
      {
        "type": "compare",
        "to": "2026-s2vopd",
        "reason": "本文管多教师预算；S²VOPD 用清晰图与退化图构造单教师信息差。",
        "status": "synthesis"
      },
      {
        "type": "prerequisite",
        "to": "2017-ppo",
        "reason": "refresh 复用当前学生 logprob 更新奖励；论文的 clip fraction 不能等同于全部梯度或算力冻结。",
        "status": "reported"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2026-open-mopd.html#rebuild",
        "t": "把多个域专家一起蒸馏给学生，不能只按 prompt 数量算预算。长回答会贡献更多 token，各域奖励幅度会变化，同一批轨迹复用时奖励还会变旧。 平衡 token 份额 按每个域实际贡献的 token 份额加权损失，补偿回答长度差，不改 prompt 采样频率。 跟随剩余差距 把当前奖励幅度作为师生分布差的读数，让仍有差距的域获得更多预算。它不是完整能力差的测量。 刷新学生奖励项 教师 logprob 缓存复用；用 PPO 已算出的当前学生 logprob 更新 dense reward。轨迹本身仍是旧学生采样的。 具体例子（教学假设） ：两个域各一条回答，长度为 2 与 8。未经加权，token 份额是 20% 与 80%；若目标各半，份额权重为 0.5/0.2=2.5 和 0.5/0.8=0.625。这里只隔离第一层预算。 边界 ：教师冲突在该论文的同源教师、3B 学生、oracle 路由设置里不是主要瓶颈。结论不覆盖任意教师组合。clip fraction 也不等于全部网络梯度被冻结的比例。 换个条件看机制 同一批 rollout 只更新一次，即 K=1，reward refresh 还在修复多轮更新后的奖励陈旧吗？ 没有这种多轮陈旧需要修复。K>1 时刷新奖励项才有作用；即使刷新，也没有把旧轨迹变成当前策略的新采样。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2026-open-mopd.html#rebuild",
        "t": "五分钟重建 把多个域专家一起蒸馏给学生，不能只按 prompt 数量算预算。长回答会贡献更多 token，各域奖励幅度会变化，同一批轨迹复用时奖励还会变旧。 平衡 token 份额 按每个域实际贡献的 token 份额加权损失，补偿回答长度差，不改 prompt 采样频率。 跟随剩余差距 把当前奖励幅度作为师生分布差的读数，让仍有差距的域获得更多预算。它不是完整能力差的测量。 刷新学生奖励项 教师 logprob 缓存复用；用 PPO 已算出的当前学生 logprob 更新 dense reward。轨迹本身仍是旧学生采样的。 具体例子（教学假设） ：两个域各一条回答，长度为 2 与 8。未经加权，token 份额是 20% 与 80%；若目标各半，份额权重为 0.5/0.2=2.5 和 0.5/0.8=0.625。这里只隔离第一层预算。 边界 ：教师冲突在该论文的同源教师、3B 学生、oracle 路由设置里不是主要瓶颈。结论不覆盖任意教师组合。clip fraction 也不等于全部网络梯度被冻结的比例。 换个条件看机制 同一批 rollout 只更新一次，即 K=1，reward refresh 还在修复多轮更新后的奖励陈旧吗？ 没有这种多轮陈旧需要修复。K>1 时刷新奖励项才有作用；即使刷新，也没有把旧轨迹变成当前策略的新采样。 可选自测 关掉提示后解释：三种修复分别发生在 batch 内、训练全程、rollout 复用周期的哪一个尺度？ 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-open-mopd.html#problem",
        "t": "解决什么问题 工业界已经在大规模使用 multi-teacher on-policy distillation（M-OPD）：DeepSeek-V4 蒸馏 10+ 个 teacher、Kimi K3 用 9 个、Agents-A1 用 6 个：把多个域专家（math/code/IF…）的能力蒸进单个通才学生，部署成本从 N 个模型降回 1 个。但没人公开回答过：为什么 naive 合并会掉分？掉了的部分去哪了？ 论文的实验设计第一步就很聪明：oracle routing：训练和评测都用 ground-truth 域标签硬路由（math 题只找 math teacher），把「整合难度」和「路由误差」两个混淆变量切开，剩下的差距全怪「多个能力写不进同一套参数」本身。 在这个受控设定下量化出 integration gap（用 SmolLM3-3B，三阶段 recipe：混合域 SFT → 三个域专家各跑 GRPO → 多教师 OPD）： 每域单独蒸馏再组合（RouteOPD，三个学生模型，仅作上界参考）：总分 31.55； naive M-OPD 一个学生：28.05，差 3.50 分； 用回收率衡量（SFT 25.67 → RouteRL 32.35 为 100% headroom），naive M-OPD 只拿回 35.6%； 掉分极不均匀：IF 域掉 6.16 分（是 math 1.89 的 3.3 倍），训练中期 IF 分数还倒降 11%、最早停滞。 Naive M-OPD 的整合差距（Integration Gap）与不对称掉分 *图 1 费曼图解（论文 Figure 1）：(a) 柱状图直观展现差距，IF 领域掉分 6.16 远大于 math 的 1.89；(b) 训练轨迹显示 IF 在中期甚至发生性能倒退；(c) 理论回收率对比中，IF 恢复最少（绿线仅约 28%）。*"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-open-mopd.html#intuition",
        "t": "大白话讲解 先枪毙一个流行嫌疑人：teacher conflict（教师冲突）。 三个 teacher 同源（都从同一个混合域 SFT checkpoint 分叉），共享格式词、连接词、推理模板：看起来很容易打架。三重检验支持它不是该设置的主要瓶颈： token 级教师分歧 c_t（各教师对该 token logprob 的最大差）全程均值仅 0.126 nat，从没超过 0.27 nat：冲突判据是 1 nat（最支持与最反对的教师概率比 e≈2.7），差一个数量级； c_t > 1 nat 的高冲突 token 全程只占 0.62%（分歧最大的 IF 域也才 3.9%）； 该设置中的干预检验：把 top 1%/5%/20% 高冲突 token 从 loss 里 mask 掉、或换成三教师平均的 consensus target：结果全部降分（−0.52~−0.83）。高分歧 token 不是噪声，反而可能携带领域信息。 真凶：预算错配，有三层。 关键认知：OPD 的 loss 按 token 平均聚合，所以每个域真正得到的优化量不取决于你喂了多少 prompt，而取决于： 域的有效预算 B_d ∝（该域贡献的 token 数）×（平均每 token 的 reward 幅度 m̄_d）×（reward 还新鲜吗） 类比：三个部门共用一笔培训预算，会发生三件糟心事： 名额分配 bug（batch 内，结构性）：预算按「每人发言时长」自动折算。math 部门一开口就是 3 小时长篇推理（响应约 10,500 token），IF 部门说话 5 分钟完事（约 409 token）：长度差 25 倍。结果 IF 占 20.3% 的名额（prompt），实际只分到 0.99% 的预算（gradient token）。 汇率还在偷偷变（训练全程，动态）：就算把名额强制锁成各 1/3，每块钱的「购买力」还不同：m̄_d（平均每 token 的 reward 幅度）就是汇率。各域收敛速度不同（IF 缩 2.4×、math 2.1×、code 1.9×），25 步内 IF 的实际预算份额从 48.7% 滑到 9%（终值 11.4%），code 升到 63.8%。 用昨天的财报做今天的决策（rollout 周期内，快动态）：为省生成开销，一个 rollout batch 被复用 K 次做内更新（K=4）。第一次更新后学生就变了，但 reward 里依赖学生的部分还用 rollout 时刻的旧概率：K=4 时 rollout-to-current KL 已达 0.059、75.8% 的 token 被 PPO clip；K=32 时 0.216 / 86%。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-open-mopd.html#mechanism",
        "t": "关键机制 Open-MOPD 系统架构与三个修复机制 *图 2 费曼图解（论文 Figure 6）：Open-MOPD 总体工作流。Prompt 经由真实标签硬路由（Hard router）分流；Teacher 冻结并预先缓存 logprob；Student 在 rollout 后经过 Dense reward 刷新与 PPO 更新；三个正交机制（token 份额平衡、gap 跟随分配、reward 刷新）分别作用于不同环节。* 三个失衡分别在三个时间尺度上，所以三个修复机制正交、可独立验证、可叠加：「正交分解」的设计美感。 机制一：token-share balancing（修名额，batch 内）。 不碰采样频率，只在 loss 上按域加权：w_d = 目标份额 g\\*（取 1/3 等分，无需调参）÷ 本 batch 实际 token 份额 s_d^tok。效果是 IF 的每个 token 被放大约 48 倍，精确补偿 25 倍的长度劣势，加权后三域恰好各 33.33%。 为什么不直接过采样 IF prompt？要拿到 1/3 token 预算，IF 采样得放大 33.6 倍，一个 batch 里 math/code 的长链 prompt 被挤到只剩 0.7 倍：长链推理的监督密度没法维持。加权法保住了 math/code 的 prompt 多样性。 为什么不顺便把 reward 幅度归一化掉？幅度不是噪声，它携带「还差多少没学」的信息，抹掉等于自毁仪表盘（见机制二）。 退化条件：若各域响应长度接近，s_d^tok ≈ prompt share，balancing 退化为无害无益的恒等变换。 机制二：gap-following allocation（修汇率，训练全程）。 m̄_d = E[ r_t ]，而 reward 核心项就是 log π_ϕ − log π_θ ：它是所采样 token 上的师生 logprob 差的读数，不等于完整任务能力差；学生在这些条件下越接近教师，该差通常越小。让预算跟着 gap 走：在机制一的权重上乘 (m_d/m_ref)^α（m_ref 为当 batch 各域均值，α=1），clamp 到 [0.05, 20] 防单域 reward 突变导致权重爆表，再归一化保持总 loss 不变。哪个域离 teacher 还远，就多给预算；收敛的域自动让出。 全文最反直觉的点：方向反了会爆炸：「reward 小 = 学得慢 = 该多帮」很诱人，但 m̄_d 小的真实含义往往是「已经快学完了」。反向归一化 m^(−α) 形成正反馈环：已收敛 → m̄ 缩小（IF 前 75 步缩 32.5×）→ 权重变大（24.4→80.9）→ 更多预算 → 更快收敛 → m̄ 更小……无刹车直到训练在第 74 步崩溃。α 的符号不是超参，是被 gap 的语义钉死的。 机制三：reward refresh（修财报时效，rollout 周期内）。 dense reward 对每个被采样 token v：r(v) = (log π_ϕ(v) − log π_θ(v)) × π̃_θ(v)，只有两个模型出场。问：K 次内更新中谁的 logprob 会变？ 教师项可缓存：教师冻结，log π_ϕ 永不变：rollout 时一次 prefill 算好存起来，K 次直接读缓存； 学生项重算恰好免费：PPO 每次内更新本来就要对 minibatch 做 forward 算当前学生 logprob（importance ratio 必需），refresh 只是把这本就算出的数顺手用来重建 reward：不加教师 forward、不加学生 forward、不重新生成任何东西； 修不掉的陈旧：轨迹（y 和前缀）仍是旧学生采样的：「学生在哪些状态下学习」这个分布要重新 rollout 才能换（生成占一步 46.5%，最贵），refresh 不碰，剩下的交给 PPO 的 ratio + clip 兜底。论文原话：清掉的是「不需要另一次 prefill 就能清掉的那部分陈旧」。 零开销实证：dense reward 计算只占一步的 2.2%，刷新前 27.8s / 刷新后 27.3s，差异在步间波动内：开销不是新增，是搬了位置。 退化条件：K=1（不复用 batch）时无陈旧，refresh 退化为标准目标，无事可做。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2026-open-mopd.html#evidence",
        "t": "结果与代价 消融阶梯（每行只改一件事，三机制可拆可叠加）： 配置 总分 增量 --- --- --- Naive M-OPD（K=1） 28.05 ： + token-share balancing 29.22 +1.17（几乎全来自 IF：43.64→47.53） + gap-following allocation 29.94 +0.72 切到 K=4 吞吐设置（control 29.28）+ reward refresh（= Open-MOPD） 31.24 +0.81 总回收率 35.6% → 83.4%，距三模型上界 RouteOPD（31.55，88%）只剩一步。 baseline 对比：RFT（离线蒸馏，exposure bias）最差 12.6%；单模型混合域 RL π_mixrl 49.3%；参数合并 ParamMerge-Avg 32.9% / ParamMerge-TA 71.7%（同源 teachers 才能合并，仍低于 Open-MOPD）。 代价/局限：仅 3B 规模、三个域、oracle 真实标签路由：路由有误/域标签不可知的场景未验证（hard routing 和 gap 分配都建立在正确 teacher 信号上，错了可能放大错误）；论文自设无 limitation 章节。 可复现性主张（「Open」的含义）：全流程在单节点 8×A100-80GB 上可反复跑完整 pipeline + 消融，端到端 recipe/训练轨迹/评测套件全开源。基座选型本身是个取舍示范：Qwen3-1.7B 太小（SFT 后截断率 69~80%，轨迹闭不了合，失败无法归因）、Qwen2.5-7B 太贵（消融跑不起），SmolLM3-3B 在「能力够」与「可反复跑」之间取平衡。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2026-open-mopd.html#ai-notes",
        "t": "AI 预读备注 Zotero AI Butler 两份子笔记（task=summary/table，zhipu/glm-5.3 生成，2026-08-27）做预读底稿，复现级质量：动机表、反事实分析、三阶段超参全表与原文交叉核对一致。 AI-Butler 摘要笔记 itemKey：V4QD2H72（task=summary）；表格笔记 itemKey：5TGI85P9（task=table）；provider/model：zhipu/glm-5.3 summary 笔记在 §4 机制节处截断，三个修复机制细节与 §5 消融阶梯由原文（PDF 第 9~15 页）补齐核对。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2026-open-mopd.html#restatement",
        "t": "我的复述 （费曼检验时原话保留） Q2 为什么不直接过采样：「过采样会导致其他类型数据比例降低影响训练效果，比如文中的例子，过采样 IF 样本导致长样本比例变少，模型对长程任务效果变差，当不同类型的 token 比例本来就一样时过采样会和 token 加权等价」 Q4 与 U-OPSD 组合：「U-OPSD 解决的是没有 gt 的问题，而本文解决的是多专家 OPD 时信号均衡的问题，从 U-OPSD 搬多数投票做 y+，少数投票的结果对应样本为 y- 给 teacher y+ 为额外先验的部分，从 M-OPD 搬前两个机制」（补齐 Q3 后确认第三个机制也该搬） Q1b 正反馈环（重讲后复述）：「IF 收敛速度最快，m_d 下降最快 → 反向规则对于小的幅度加更大的权重 → IF 任务得到更高的预算 → 收敛更快 m_d 更小 → 不断重复第二步到第四步的循环，直到崩掉。实际上 m_d 小表示的是任务收敛差不多了，不要再增加预算了；gap-following allocation 给预算跟着 gap 走：(m_d/m_ref)^α m_d 越小预算越少，并裁剪到 [0.05, 20] 范围，防止爆炸，也可以说是刹车。」 Q3b refresh 的存在条件：「因为轨迹本身是旧学生采样的，如果有无限算力（每步重新 rollout，等效 K=1），没有存在的价值了」"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2026-open-mopd.html#pitfalls",
        "t": "卡壳点与解答 Q：反向归一化的正反馈环：初答只说「把已经学好的带崩掉」，链条断了。 A：崩溃机制比「带崩」更机械：是预算分配本身发散。环的每一环：① IF 最先接近 teacher → m̄_d 缩小；② 反向规则把「gap 已经小」误读成「需要更多帮助」，给它更大权重（24.4→80.9）；③ 更多预算 → 收敛更快 → m̄_d 更小；④ 回到 ②，每圈更极端、无反向力量刹车，直到 step 74 训练整体崩溃。gap-following 用正方向自带两层刹车：系统级：顺着 gap 语义，收敛域权重自动回落让出预算；兜底级：clamp [0.05, 20] 防单域 reward 突变（复述时把两层合成了一层，此处钉开）。还有一层初答没提：m̄_d = E[ log π_ϕ − log π_θ ]，它不是 gap 的间接代理，是师生差距的直接读数。 Q：reward refresh：第一轮完全没理解，全文最大卡壳点。（09-07 费曼复测二次深化） A：大白话直觉版（老师、学生与发霉的分数）： 场景：大模型生成太慢（占 46.5% 耗时），所以学生写完一份作业草稿，要连续复用 4 轮内更新（$K=4$）来学，而不是每步重新写。 病根：同一批 rollout 更新多轮后，学生已经变了，奖励里却仍用 rollout 时的学生 logprob。这个旧差值不能反映当前师生差。论文在 K=4 时报告约 75.8% 的 clip fraction，显示复用中的策略偏移较大。 Clip 的边界：clip fraction 通常统计比率落到阈值外的比例，不能直接说 75.8% 的全部网络梯度被冻结。裁剪目标是否变平还取决于优势符号；其他样本与损失仍可改变共享参数。 为什么几乎没有额外开销？：教师冻结，其 logprob 已缓存；PPO 每次更新为了算 ratio，本来就计算当前学生 logprob。refresh 用这些已有值重建奖励，不加教师或学生 forward，也不重新生成。论文计时差异在步间波动内。 仍然旧的是什么？：生成轨迹和前缀仍来自 rollout 时的学生。刷新奖励不等于重新采样；K=1 时也没有多轮奖励陈旧可修。"
      },
      {
        "h": "全文问答 · Q：反向归一化的正反馈环：初答只说「把已经学好的带崩掉」，链条断了。",
        "a": "notes/papers/2026-open-mopd.html#qa-feedback-loop",
        "t": "Q：反向归一化的正反馈环：初答只说「把已经学好的带崩掉」，链条断了。 崩溃机制比「带崩」更机械：是 预算分配本身发散 。环的每一环：① IF 最先接近 teacher → m̄_d 缩小；② 反向规则把「gap 已经小」 误读 成「需要更多帮助」，给它更大权重（24.4→80.9）；③ 更多预算 → 收敛更快 → m̄_d 更小；④ 回到 ②，每圈更极端、无反向力量刹车，直到 step 74 训练整体崩溃。gap-following 用正方向自带两层刹车：系统级：顺着 gap 语义，收敛域权重自动回落让出预算；兜底级：clamp [0.05, 20] 防单域 reward 突变（复述时把两层合成了一层，此处钉开）。还有一层初答没提：m̄_d = E[|log π_ϕ − log π_θ|]，它不是 gap 的间接代理，是师生差距的直接读数。"
      },
      {
        "h": "全文问答 · Q：reward refresh：第一轮完全没理解，全文最大卡壳点。（09-07 费曼复测二次深化）",
        "a": "notes/papers/2026-open-mopd.html#qa-reward-refresh",
        "t": "Q：reward refresh：第一轮完全没理解，全文最大卡壳点。（09-07 费曼复测二次深化） 大白话直觉版（老师、学生与发霉的分数） ： 场景 ：大模型生成太慢（占 46.5% 耗时），所以学生写完一份作业草稿，要连续复用 4 轮内更新（ $K=4$ ）来学，而不是每步重新写。 病根 ：同一批 rollout 更新多轮后，学生已经变了，奖励里却仍用 rollout 时的学生 logprob。这个旧差值不能反映当前师生差。论文在 K=4 时报告约 75.8% 的 clip fraction，显示复用中的策略偏移较大。 Clip 的边界 ：clip fraction 通常统计比率落到阈值外的比例，不能直接说 75.8% 的全部网络梯度被冻结。裁剪目标是否变平还取决于优势符号；其他样本与损失仍可改变共享参数。 为什么几乎没有额外开销？ ：教师冻结，其 logprob 已缓存；PPO 每次更新为了算 ratio，本来就计算当前学生 logprob。refresh 用这些已有值重建奖励，不加教师或学生 forward，也不重新生成。论文计时差异在步间波动内。 仍然旧的是什么？ ：生成轨迹和前缀仍来自 rollout 时的学生。刷新奖励不等于重新采样；K=1 时也没有多轮奖励陈旧可修。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-open-mopd.html#open",
        "t": "还没搞懂 _无_：检验题与两道补漏小检验全部收敛，无残留漏洞。"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-open-mopd.html#relations",
        "t": "关联 S²VOPD ： OPD 家族第三页：「单教师信号从哪来」的视觉域答案（把学生输入图退化构造不对称，减学生而非加教师）。散度注记第三数据点：视觉不对称蒸馏里 JSD > reverse KL > forward KL，排序与 U-OPSD 完全颠倒（信息可恢复性的解释待验证），三框架对照（U-OPSD 直接 loss / 本文 PPO reward 槽位 / S²VOPD 生成式 JSD）待 DistiLLM 系列统一沉淀。 U-OPSD ： 兑现其预留的 on-policy distillation 钩子。OPD 家族的两个正交切片：U-OPSD 管「单教师的信号从哪来」（自身多数投票伪解当特权上下文，去掉 GT 依赖），本文管「多教师信号之间怎么分账」（token/幅度/新鲜度三层预算分配）。组合设想（待验证）：多个自蒸馏伪教师 + 本文三机制；本库没有联合实验，门控也可能改变各域实际 token 份额。散度形式对比注记（不构成矛盾，记录备考）：U-OPSD 实验中前向 KL 直接当 loss 更稳（reverse KL 实验出现复读塌缩）；本文 dense reward 是 reverse-KL 式 per-token 形式，但角色是 PPO 的 reward 信号（sg 停梯度、走 policy gradient + clip），不是直接蒸馏损失：同一「方向」在不同框架里优化行为不同，值得未来与 DistiLLM 系列一起沉淀。 PPO ： 本文机制三（reward refresh）与消融分析的底层优化载体：学生能力提升后若沿用旧 reward，会导致概率比率 $r_t$ 剧烈过冲进而触发 PPO 截断（Clip），论文报告约 75.8% 的 clip fraction；它不能直接等同于全部梯度或算力被冻结的比例；本文在 PPO 的 ratio 计算中顺手白嫖学生当前 logprob 刷新 reward，缓解奖励陈旧；收益来自该实验的消融，不是安全性或算力利用的普遍保证。 未来入库钩子：AsyncOPD（reward refresh 的灵感来源，异步 stale RL）、DistiLLM 系列（on-policy 蒸馏散度设计）、GKD（dense reward 进 PPO 槽位的先例）、多教师/路由相关论文应回链本页。"
      }
    ]
  },
  {
    "id": "2026-s2vopd",
    "type": "paper",
    "title": "S²VOPD",
    "href": "papers/2026-s2vopd.html",
    "noteHref": "notes/papers/2026-s2vopd.html",
    "sourceHref": "wiki/papers/2026-s2vopd.md",
    "date": "2026-09-02",
    "topic": "distillation",
    "aliases": [
      "S²VOPD",
      "Self-Supervised Visual On-Policy Distillation"
    ],
    "tags": [
      "on-policy-distillation",
      "self-distillation",
      "data-augmentation",
      "reduce-supervision",
      "improve-perception"
    ],
    "essence": "S²VOPD 让教师看清晰图、学生看退化图，在学生自己生成的前缀上对齐分布，以视觉信息差提供自蒸馏信号。",
    "review": {
      "next": "2026-10-19",
      "last": "2026-09-19",
      "count": 2,
      "result": "pass"
    },
    "relations": [
      {
        "type": "compare",
        "to": "2026-u-opsd",
        "reason": "清晰像素与完整解题上下文是不对称信息的两种来源；可恢复性对散度排序的解释待验证。",
        "status": "hypothesis"
      },
      {
        "type": "possible-combination",
        "to": "2026-open-mopd",
        "reason": "研究把视觉信息差接入多教师框架；本库没有联合实验。",
        "status": "hypothesis"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2026-s2vopd.html#rebuild",
        "t": "教师与学生共享模型时，需要构造有用的分布差。S²VOPD 让教师看清晰图、学生看退化图，以输入信息差提供视觉自蒸馏信号。 学生在退化图上作答 保持问题不变，降低图像信息量。学生自己生成轨迹，蒸馏沿这条轨迹进行。 教师看同一前缀 EMA 教师看原图与同样的生成前缀，计算下一 token 分布。EMA 是随学生缓慢更新的教师。 对齐分布 截取教师 top-k 支持并重新归一化，用广义 JSD 训练学生。实验中它优于所比较的两种 KL 方向。 具体例子（教学假设） ：问题是“猫在左边还是右边”。轻度降采样仍保留位置关系，可以构造信息差；裁剪若直接删掉猫，就可能让问题失去所需证据。差距更大不代表监督更好。 边界 ：降采样也可能抹掉关键小字。增强是否保留答题信息，取决于任务。用“信息可恢复性”解释它与 U-OPSD 的散度差异，仍是待验证假说。 换个条件看机制 若教师与学生使用完全相同的权重、图像、问题和前缀，分布对齐还提供什么信息差？ 在相同计算条件下，两者分布相同，散度为零。实际 EMA 权重可有差异，但此教学反例固定了权重，用来隔离输入不对称的作用。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2026-s2vopd.html#rebuild",
        "t": "五分钟重建 教师与学生共享模型时，需要构造有用的分布差。S²VOPD 让教师看清晰图、学生看退化图，以输入信息差提供视觉自蒸馏信号。 学生在退化图上作答 保持问题不变，降低图像信息量。学生自己生成轨迹，蒸馏沿这条轨迹进行。 教师看同一前缀 EMA 教师看原图与同样的生成前缀，计算下一 token 分布。EMA 是随学生缓慢更新的教师。 对齐分布 截取教师 top-k 支持并重新归一化，用广义 JSD 训练学生。实验中它优于所比较的两种 KL 方向。 具体例子（教学假设） ：问题是“猫在左边还是右边”。轻度降采样仍保留位置关系，可以构造信息差；裁剪若直接删掉猫，就可能让问题失去所需证据。差距更大不代表监督更好。 边界 ：降采样也可能抹掉关键小字。增强是否保留答题信息，取决于任务。用“信息可恢复性”解释它与 U-OPSD 的散度差异，仍是待验证假说。 换个条件看机制 若教师与学生使用完全相同的权重、图像、问题和前缀，分布对齐还提供什么信息差？ 在相同计算条件下，两者分布相同，散度为零。实际 EMA 权重可有差异，但此教学反例固定了权重，用来隔离输入不对称的作用。 可选自测 关掉提示后解释：为什么教师不必是外部更大的模型？为什么清晰图也不等于真实答案标签？ 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 论文图解",
        "a": "notes/papers/2026-s2vopd.html#figures",
        "t": "论文图解 清晰教师与退化学生的视觉信息差 *图 1 费曼图解（论文 Figure 1）：上半部的教师看原图，学生看增强后的图，两者共享问题和生成前缀。下半部列出可选增强。不是所有增强都好：若删掉关键证据或改变几何关系，教师分布可能变得不可模仿。* 增强类型与师生差距的消融 *图 2 费曼图解（论文 Figure 2）：左图比较增强族，右图比较差距与准确率。更大差距未必更高准确率；应同时看是否保留任务信息。该消融支持清晰输入的主要作用，不能推出一条跨任务通用散度定律。*"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-s2vopd.html#problem",
        "t": "解决什么问题 OPD 家族的命门：教师必须比学生多知道点什么，否则指导没有信息量。三种传统来源全要外部资源：更大的模型（贵）、GT 答案（要标注）、GT 感兴趣区域（更贵的标注），且随模型能力超过人类能可靠提供的监督，特权信号越来越难获得。特权方法还偏科：ZwZ 在 MathVerse 掉 27.1，OPSD 在 MathVision 掉 9.3（感知涨、推理崩）。 本文的釜底抽薪之问：不对称性在乎自己是\"教师多看\"还是\"学生少看\"实现的吗？ 不在乎：只要存在\"教师知道、学生不知道\"的差，蒸馏信号就成立。于是把方向倒过来：给教师加特权 → 从学生身上减信息（把学生的输入图退化）。零标注、零奖励、零更强教师。 和 U-OPSD 的分工：同一作者线（Yijiang Li 一作 + Vasconcelos 组）的域互补：U-OPSD 管文本推理域（教师多看\"伪解\"这个文本特权上下文），本文管视觉感知域（教师多看\"清晰像素\"这个输入模态信息差）。U-OPSD 是首个完全无监督的 LLM 自蒸馏，本文是视觉版答案。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-s2vopd.html#intuition",
        "t": "大白话讲解 想象你要刷一套没有标准答案的卷子。你把试卷复印得又小又糊（0.3~0.6 倍分辨率 + 噪点），自己看着糊版作答；同时\"拿到清晰原版的你\"盯着清晰卷，在你写下的每一步旁边标注\"看清的我这里会怎么写\"，你照着改。训练完上考场，发你的卷子是清晰的。 这里最容易卡住：训练看糊图、考试看好图，这不是 train-inference mismatch 吗？凭什么变强？ 关键：学生学的不是\"在糊图上答题\"这个行为，而是每个决策点上\"信息残缺的我\"如何逼近\"信息完整的我\"的判断。\"从退化证据恢复完整判断\"的能力内化后，推理时给它好图，能力只会更有用。实证：六个感知基准全用原图测，照样 +6.76。 为什么不用\"练难的考简单的\"来解释：如果难度本身是关键，更强的 crop（更难）应该涨更多，实际单调下跌（71.53→68.76→67.44）。难度不是本质，信息差里\"教师分布在干净视图上\"才是信号来源：学生单独在糊图上自练（无教师信号）不但不涨还退化（对称自蒸馏 65.21 < 基座）。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-s2vopd.html#mechanism",
        "t": "关键机制 同一模型两个身份：student θ 和 EMA teacher φ（φ ← 0.95·φ + 0.05·θ，教师是学生的\"慢半拍影子\"）。每个训练步五件事： 弄坏图：x̃ = T(x)。最佳配方（式 6）：降采样到 s~U(0.3, 0.6)（不 resize 回去，visual token 直接变少，顺带省 rollout 和前向开销）+ 以 ρ=0.5 独立叠加 DDPM 前向步 t=200 的高斯噪声（σ≈0.11，信号几乎不衰减）。全局概率 p=1（每个学生视图都增强）。 学生在坏图上 rollout：πθ 以 (x̃, q) 为条件采 n=8 条轨迹。on-policy：蒸馏的前缀是学生自己真正会走到的状态。 教师在同一前缀 + 好图上打分：πφ(· x, q, y<t) 算 next-token 分布。 top-k 截断：师生分布都截到教师 top-k token 再重归一化（抗词表长尾；论文未给 k 值）。 逐 token 广义 JSD（α=0.5），沿轨迹平均，只更新学生，EMA 回写教师。 图像 问题 q 轨迹前缀 y<t --- --- --- --- 教师 πφ（EMA） 原图 x ✅ ✅ 学生 πθ 坏图 x̃ = T(x) ✅ ✅ 两者共享 q + y<t，教师多出来的只有\"清晰的图\"。对照 U-OPSD 的表：那边教师多出来的是\"伪解 y+\"（文本特权上下文），这边换成了像素级信息差：不对称的载体从上下文搬到了输入模态本身。 训练设置：Qwen3.5-4B/9B，vLLM rollout，batch 96 prompts × 8 rollouts，lr 2e-6，65/130 步（6K/12K 各一个 epoch）。推理直接用 student + 原图。 三条增强设计律（本文最扎实的经验贡献，首个针对 OPD 的系统化增强空间受控搜索） 不对称才有信号：四个增强族单用全涨（信息减少 75.65 > 光度 74.40 > 几何 74.30 > 遮挡 72.44，基座 70.58）；对称自蒸馏反而掉到 65.21。 强度要中等：所有族都呈倒 U 型，师生 token 级 JSD gap ≈ 0.014 处到顶。太弱没信号，太强学不动。 gap 必须任务一致（task-consistent）：crop 单调下跌（71.53→68.76→67.44），最强 crop 造出全场最大的 gap 却成绩最差。大 gap ≠ 好 gap：crop 选择性地删掉某块区域、可能正中答题证据，题变得不可答，差距零信息量；降采样是均匀降低信息密度，全局结构都在、题原则上可答，差距可学。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2026-s2vopd.html#evidence",
        "t": "结果与代价 主表（FineVision-12K 训练）：4B 从 70.68 → 77.44（+6.76），超 Qwen3-VL-Instruct-235B（75.75）、超 GPT-5.4（72.77），追平 Qwen3.5-397B（77.44），与 Gemini-3-Flash（77.67）打平；超过全部特权方法（Vision-OPD 77.07、OPSD 72.85）。 同数据公平对比（Vision-OPD-6K，65 步）：4B 总分（6 感知 + 3 数学）75.33 全场第一；9B 76.35，只比拿 GT 区域标注的 Vision-OPD（76.56）低 0.21。感知 +5.7 / 数学 +3.7（4B）。自奖励 RL（TTRL/Intuitor/RENT）训练不稳定甚至崩到近随机，报告 13 个 checkpoint 最优仍输本文 2 个点。 \"恢复 96%\"注：摘要声称\"恢复特权方法 96% 的改进\"，正文无推导。自行计算：9B 感知分上 S²VOPD 增益 3.57 / Vision-OPD 增益 3.70 ≈ 96.5% 吻合（4B 上其实反超，>100%）。 最反直觉的消融（w/o EMA）：把教师永远冻结在基座（不做 EMA），只掉 0.40（75.95 vs 76.35），仍拿 93% 增益：该消融主要支持清晰输入的信息差；不能推出 EMA 或教师更新在所有设置中都没有价值。EMA decay 0.95/0.99/0.999 波动 <0.8%，不敏感，只是稳定性选择。 散度消融（Table 6，与 U-OPSD 结论完全相反，见关联节）：JSD(α=0.5) 76.05 > reverse KL 75.49 > forward KL 74.74。 代价/局限： 增益依赖增强调参（gap 大小 + task-consistency 双准则）。 OCR/文字密集图未测：blur/noise/降采样会直接毁掉图中文字这类细粒度证据，违反 task-consistency，预期失效（本人推演，论文未验证）。 纯文本任务没有可退化的视觉模态，方法不迁移（要另找可退化模态，如截断上下文）。 无 seed 重复误差棒；分析协议（2048 greedy）与主表（4096）数字不可混比，且原文 §4.3 正文引用的基座 70.58 与图 2 标注的 66.5 存在协议口径不一致（图 2 的 2048-token 协议读数更低），引用时注意。 top-k 的 k 值未给出，需查代码。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2026-s2vopd.html#ai-notes",
        "t": "AI 预读备注 Zotero AI Butler 两份子笔记（task=summary/table，zhipu/glm-5.3 生成，2026-08-19）做预读底稿。 AI-Butler 摘要笔记 itemKey：WAIZQ4EN（task=summary），表格笔记 itemKey：J9RDZC8L（task=table），provider/model：zhipu/glm-5.3 glm-5.3 的复现级摘要质量很高：方法 pipeline 全六步、四增强族全表、倒 U 型与 0.014 峰值、JSD/fKL/rKL 排序及理由、EMA 消融、超参敏感性、常见坑（不 resize 回去/只增强学生侧/top-k 重归一化）全覆盖，与原文逐项核对一致。本文讲解在其基础上做了四点提炼：(a) 用 crop 消融证伪\"难度论\"，把\"学到的是向信息完整版自己对齐的蒸馏目标\"这一真机制立起来；(b) 把散度排序与 U-OPSD 的差异整理成\"信息可恢复性\"解释假说（待验证）（见关联节）；(c) 核出摘要\"96%\"无正文推导并补算出处；(d) 发现 §4.3 基座读数与图 2 的协议口径不一致。表格笔记（AI-Table）信息量低，仅文献表维度，未采用。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2026-s2vopd.html#restatement",
        "t": "我的复述 （费曼检验时原话保留） 强迫学生从模糊图/干扰图中找细节，增强了模型的探索能力，实际使用时使用清晰图难度更小了，效果肯定更好；（被 crop 消融证伪后修正为：难度的关键是向\"看得清的自己\"的分布对齐） U-OPSD 是多次 rollout 取共识作为teacher的额外为标签制造不对称，而 S2VOPD 是通过给教师清晰图学生干扰图带来不对称（\"伪标签\"为口误，y+ 是完整轨迹上下文） 最强 crop 可能把关键证据区域切没了，student 只能靠猜了输出全是幻觉，这套方法在 OCR等需要细粒度感知的任务上会失效 会强化模型的弱点（对称自蒸馏时：放大教师的自信错误） 再检验轮： U-OPSD teacher 多的信息是模型本身采样的共识轨迹，这些轨迹本身就来自模型本身，采用 forward KL student 可以拟合 teacher 的分布， 而 S2VOPD 多的信息来自于看到了学生没有看到的清晰的图， 采用 forward KL student 要尽量拟合 teacher 的分布，其中就包括了 student 看不到的这些，而 reverse KL 主要是学高置信度的尖峰区域而 JSD 居中；而Crop大的话尖峰区域都没了，无从学起。（\"尖峰没了\"用词已纠：crop 删的是图像证据，教师分布照样有尖峰，是学生输入里没有通往答案的依据） 坏，这会导致学生去猜问题（q 被挖词的方案：猜题能力在推理时零迁移，因推理时 q 完整）"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2026-s2vopd.html#pitfalls",
        "t": "卡壳点与解答 Q：训练看糊图、考试看好图，为什么反而变强？ A：训练目标把学生在退化图上的下一 token 分布，拉向教师在清晰图上的分布。rollout 前缀相同，输入信息不同。该实验的 crop 越强成绩越低，所以不能简单解释为“训练越难越好”。冻结教师后仍保留约 93% 增益，主要支持清晰输入信息差的作用；它不证明 EMA 在所有任务中无效。方法学的是跨视图分布对齐，收益取决于增强是否保留答题所需的证据。 Q：S²VOPD 和 U-OPSD 的散度消融结论为什么完全相反？ A：先分清观察和解释。U-OPSD 的实验里 forward KL 更稳，reverse KL 出现复读崩溃；S²VOPD 的 Table 6 则是 JSD 76.05 > reverse KL 75.49 > forward KL 74.74。两套模型、数据与信息差设置不同，不能由此推出普适的散度选择规则。解释假说（待验证）：教师多出的解题上下文与清晰像素，其可恢复性不同，可能影响散度偏好。forward KL 的覆盖倾向与 reverse KL 的寻峰倾向可作直觉，但不能单凭它们证明分数差或崩溃原因。 Q：同样是\"减少视觉信息\"，为什么降采样涨最多、最强 crop 是大坑？ A：crop 会直接删去某块区域，可能删掉答题证据；降采样主要降低分辨率，在适当强度下仍可能保留全局结构。论文的增强搜索支持“gap 大还不够，增强须与任务一致”。这不保证降采样始终可答：文字与小物体也可能消失。教师在完整图上仍可有高置信分布，学生缺的是输入证据，不是教师的分布尖峰。信息可恢复性是库内解释假说，待验证。 Q：把增强换成\"挖掉学生的文本问题 q 的 30% 字、图保持清晰\"会怎样？ A：这是迁移推演，论文未测试，待验证。删除问题中的否定词或目标名，可能改变任务定义，师生便在回答不同问题。单有信息差不保证有用，应先检查剩余问题是否仍表达同一任务。不能把“推理时问题完整”直接等同于训练收益必然为零。 Q：对称自蒸馏（不增强）为什么掉到基座以下（65.21 < 70.58）？ A：论文在该设置观察到不增强时掉分，并解释为教师的自信错误可能被放大。EMA 教师是学生参数的历史平均，师生虽看同一张图，参数与分布仍可不同。这里缺少清晰视图相对退化视图的额外信息，不能直接推出所有对称自蒸馏都无信号或都失败。增强版的收益也要以相应任务上的消融为准。 Q（复发，2026-09-02 首验）：y+ 又说成\"伪标签\"了。 A：U-OPSD 入库时的老卡壳点本次口误复发。y+ 不是标签，是拼进教师输入的完整解题轨迹（上下文）；共识答案 ã(x) 只用来投票和分组。消融 label-only（只给 boxed 答案值）掉 10.3~15.8。（历史状态：09-02 两连犯；2026-09-07 复测已收敛，首答即明确「y+ 是完整轨迹先验上下文，不是伪标签」，当前不再是弱项。）"
      },
      {
        "h": "全文问答 · Q：训练看糊图、考试看好图，为什么反而变强？",
        "a": "notes/papers/2026-s2vopd.html#qa-blur-strong",
        "t": "Q：训练看糊图、考试看好图，为什么反而变强？ 训练目标把学生在退化图上的下一 token 分布，拉向教师在清晰图上的分布。rollout 前缀相同，输入信息不同。该实验的 crop 越强成绩越低，所以不能简单解释为“训练越难越好”。冻结教师后仍保留约 93% 增益，主要支持清晰输入信息差的作用；它不证明 EMA 在所有任务中无效。方法学的是跨视图分布对齐，收益取决于增强是否保留答题所需的证据。"
      },
      {
        "h": "全文问答 · Q：S²VOPD 和 U-OPSD 的散度消融结论为什么完全相反？",
        "a": "notes/papers/2026-s2vopd.html#qa-divergence",
        "t": "Q：S²VOPD 和 U-OPSD 的散度消融结论为什么完全相反？ 先分清观察和解释。U-OPSD 的实验里 forward KL 更稳，reverse KL 出现复读崩溃；S²VOPD 的 Table 6 则是 JSD 76.05 > reverse KL 75.49 > forward KL 74.74。两套模型、数据与信息差设置不同，不能由此推出普适的散度选择规则。 解释假说（待验证） ：教师多出的解题上下文与清晰像素，其可恢复性不同，可能影响散度偏好。forward KL 的覆盖倾向与 reverse KL 的寻峰倾向可作直觉，但不能单凭它们证明分数差或崩溃原因。"
      },
      {
        "h": "全文问答 · Q：同样是\"减少视觉信息\"，为什么降采样涨最多、最强 crop 是大坑？",
        "a": "notes/papers/2026-s2vopd.html#qa-crop",
        "t": "Q：同样是\"减少视觉信息\"，为什么降采样涨最多、最强 crop 是大坑？ crop 会直接删去某块区域，可能删掉答题证据；降采样主要降低分辨率，在适当强度下仍可能保留全局结构。论文的增强搜索支持“gap 大还不够，增强须与任务一致”。这不保证降采样始终可答：文字与小物体也可能消失。教师在完整图上仍可有高置信分布，学生缺的是输入证据，不是教师的分布尖峰。信息可恢复性是库内解释假说，待验证。"
      },
      {
        "h": "全文问答 · Q：把增强换成\"挖掉学生的文本问题 q 的 30% 字、图保持清晰\"会怎样？",
        "a": "notes/papers/2026-s2vopd.html#qa-q-removal",
        "t": "Q：把增强换成\"挖掉学生的文本问题 q 的 30% 字、图保持清晰\"会怎样？ 这是迁移推演，论文未测试，待验证。删除问题中的否定词或目标名，可能改变任务定义，师生便在回答不同问题。单有信息差不保证有用，应先检查剩余问题是否仍表达同一任务。不能把“推理时问题完整”直接等同于训练收益必然为零。"
      },
      {
        "h": "全文问答 · Q：对称自蒸馏（不增强）为什么掉到基座以下（65.21 < 70.58）？",
        "a": "notes/papers/2026-s2vopd.html#qa-symmetric",
        "t": "Q：对称自蒸馏（不增强）为什么掉到基座以下（65.21 < 70.58）？ 论文在该设置观察到不增强时掉分，并解释为教师的自信错误可能被放大。EMA 教师是学生参数的历史平均，师生虽看同一张图，参数与分布仍可不同。这里缺少清晰视图相对退化视图的额外信息，不能直接推出所有对称自蒸馏都无信号或都失败。增强版的收益也要以相应任务上的消融为准。"
      },
      {
        "h": "全文问答 · Q（复发，2026-09-02 首验）：y+ 又说成\"伪标签\"了。",
        "a": "notes/papers/2026-s2vopd.html#qa-y-plus",
        "t": "Q（复发，2026-09-02 首验）：y+ 又说成\"伪标签\"了。 U-OPSD 入库时的老卡壳点本次口误复发。y+ 不是标签，是拼进教师输入的 完整解题轨迹（上下文） ；共识答案 ã(x) 只用来投票和分组。消融 label-only（只给 boxed 答案值）掉 10.3~15.8。（历史状态：09-02 两连犯；2026-09-07 复测已收敛，首答即明确「y+ 是完整轨迹先验上下文，不是伪标签」，当前不再是弱项。）"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-s2vopd.html#open",
        "t": "还没搞懂 _无_：检验题全部补齐，无残留漏洞。「信息可恢复性决定散度选择」是本人综合两篇论文的假说，非任一原文结论，待 DistiLLM 系列入库时验证（已挂 U-OPSD 页钩子）。"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-s2vopd.html#relations",
        "t": "关联 U-OPSD ： 兑现其预留钩子。同作者线（Yijiang Li 一作 + Vasconcelos 组）的域互补：U-OPSD 管文本推理域（教师多看伪解 y+，文本特权上下文），本文管视觉感知域（教师多看清晰像素，输入模态信息差）。两页合起来是\"不对称性来源谱系\"：SFT（GT+教师强制）→ OPD（强教师）→ OPSD（GT 特权）→ U-OPSD（自投票伪特权）/ S²VOPD（自减信息）。散度冲突注记（全库最值钱交叉点）：U-OPSD 必须 forward KL（reverse 复读塌缩、JSD 掉 13.8），本文 JSD 最好 > rKL > fKL，排序完全颠倒：可用“教师多出的信息可否恢复”提出解释假说（待验证），但两套实验不能推出普适散度规律。 Open-MOPD ： OPD 家族三页成谱系：U-OPSD 管\"单教师信号从哪来\"（文本域），本文管\"单教师信号从哪来\"（视觉域的另一种答案：不对称可以来自减学生而非加教师），Open-MOPD 管\"多教师信号怎么分账\"。组合设想（待验证）：研究把视觉信息差接入多教师框架；本库没有联合实验。散度注记第三数据点：本文 JSD > rKL > fKL（视觉不对称蒸馏，温和差异），与 U-OPSD 的 fKL 必选、Open-MOPD 的 reverse-KL 式 dense reward（PPO reward 槽位）构成三框架对照，待 DistiLLM 系列统一沉淀。 未来入库钩子：OCR/文档理解域增强蒸馏、NoisyRollout/VPPO/PRPO（增强调 RL 的先例，本文区分点：增强差异本身是训练信号而非调制外部奖励）、BYOL/DINO/FixMatch（弱视图教强视图的自监督表征学习源头）入库时回链本页。"
      }
    ]
  },
  {
    "id": "2026-locateanything",
    "type": "paper",
    "title": "LocateAnything",
    "href": "papers/2026-locateanything.html",
    "noteHref": "notes/papers/2026-locateanything.html",
    "sourceHref": "wiki/papers/2026-locateanything.md",
    "date": "2026-09-04",
    "topic": "structured-output",
    "aliases": [
      "LocateAnything",
      "Parallel Box Decoding",
      "PBD"
    ],
    "tags": [
      "parallel-decoding",
      "grounding",
      "improve-grounding",
      "improve-efficiency"
    ],
    "essence": "LocateAnything 把一个框对齐成固定长 token 块，在框内并行生成坐标，必要时只对不可靠的块退回逐词解码。",
    "review": {
      "next": "2026-09-14",
      "last": "2026-09-07",
      "count": 1,
      "result": "pass"
    },
    "relations": [
      {
        "type": "possible-combination",
        "to": "2026-vst",
        "reason": "减少坐标解码步数与前置视频思考涉及不同环节；联合系统的效果尚待验证。",
        "status": "hypothesis"
      },
      {
        "type": "compare",
        "to": "2026-video-o3",
        "reason": "本文生成定位坐标；Video-o3 调用视频裁剪工具找证据。任务与输出接口不同。",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2026-locateanything.html#rebuild",
        "t": "逐 token 生成框坐标需要多次 forward。随意把 token 分块，又可能拆散同一个框。LocateAnything 把框作为固定长块，让同块位置并行预测。 把框对齐成块 一个框块有 6 格，包括结构 token 和四个坐标。框与框按顺序生成，同一个框内部并行。 同时练接龙与填空 NTP 流练逐词生成，MTP 流保留块首 token、遮住其余位置。两流隔离，防止从完整答案流偷看坐标。 可疑块局部回退 Hybrid 先并行生成。格式异常，或低置信且候选跨度大时，丢弃当前问题块，用 NTP 重写，再继续并行。 具体例子（教学假设） ：一个坐标 top-1 概率为 0.6，top-5 跨度为 40。它不满足空间歧义的双条件；若跨度改为 100，才同时满足低于 0.7 与大于 80。格式错误另有独立触发条件。 边界 ：同块互见的是当前输入与 mask 位置，不是尚未生成的真实坐标。联合 token 交叉熵能学习几何规律，但不等于硬性保证每个框合法。 换个条件看机制 置信度为 0.9、跨度为 100，且格式合法时，是否因空间歧义回退？ 不回退。空间歧义要求两个条件同时满足，只有跨度大还不够。这个结论只描述触发规则，不保证该框一定正确。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2026-locateanything.html#rebuild",
        "t": "五分钟重建 逐 token 生成框坐标需要多次 forward。随意把 token 分块，又可能拆散同一个框。LocateAnything 把框作为固定长块，让同块位置并行预测。 把框对齐成块 一个框块有 6 格，包括结构 token 和四个坐标。框与框按顺序生成，同一个框内部并行。 同时练接龙与填空 NTP 流练逐词生成，MTP 流保留块首 token、遮住其余位置。两流隔离，防止从完整答案流偷看坐标。 可疑块局部回退 Hybrid 先并行生成。格式异常，或低置信且候选跨度大时，丢弃当前问题块，用 NTP 重写，再继续并行。 具体例子（教学假设） ：一个坐标 top-1 概率为 0.6，top-5 跨度为 40。它不满足空间歧义的双条件；若跨度改为 100，才同时满足低于 0.7 与大于 80。格式错误另有独立触发条件。 边界 ：同块互见的是当前输入与 mask 位置，不是尚未生成的真实坐标。联合 token 交叉熵能学习几何规律，但不等于硬性保证每个框合法。 换个条件看机制 置信度为 0.9、跨度为 100，且格式合法时，是否因空间歧义回退？ 不回退。空间歧义要求两个条件同时满足，只有跨度大还不够。这个结论只描述触发规则，不保证该框一定正确。 可选自测 关掉提示后解释：为什么 Hybrid 只重写坏块，而不需要把整段输出从头重做？ 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 论文图解",
        "a": "notes/papers/2026-locateanything.html#figures",
        "t": "论文图解 逐词随意分块与框对齐并行比较 *图 2 费曼图解（论文 Figure 2）：第一行逐坐标生成，第二行按固定长度随意切块，第三行把边界对齐到完整框。并行加速的关键是块内同时预测，框与框仍按顺序生成。* 模型架构与四种输出块 *图 3 费曼图解（论文 Figure 3）：图像与查询进入 VLM，输出组织成语义、框、负样本和结束四类块。框块有固定位置，训练共享权重学习其结构；它不是额外的硬几何合法性判卷器。* 坏块的局部 NTP 重解码 *图 5 费曼图解（论文 Figure 5）：图里给出格式混乱与空间歧义两种错误。Hybrid 作废当前问题块，回到已提交前缀，用逐词生成重写该块，然后切回并行，不用重做整段输出。*"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-locateanything.html#problem",
        "t": "解决什么问题 VLM 做检测/grounding 普遍把 2D 框序列化成 1D token 流，两类旧表示：文本数字（1024 拆成 1,0,2,4）和量化坐标 token（每个坐标一个词，按 x1→y1→x2→y2 顺序出）。逐 token 自回归解码带来两处痛： 推理瓶颈：一个框 = 6+ 个 token 串行蹦，N 个框线性放大。H100 上 Qwen3-VL-4B 只有 ~1.1 框/秒（BPS）。机器人/UI 交互这类实时场景扛不住。 结构浪费 + 错误累积：x1,y1,x2,y2 是几何整体（x2>x1、四数构成合法矩形、天然互相验证），逐 token 独立解码既没用上这种强耦合，又让后一个坐标在\"前一个已写错\"的基础上孤独地猜，误差滚雪球。 通用 MTP（一次并行猜多个 token）能减步数，但结构无关：按固定大小（4/6/8）随便切序列，块边界大概率落在无意义处（一个块里装着\"上一个框的尾巴 + 下一类别的开头\"），模型被迫拟合横跨框边界、横跨类别的虚假模式（spurious correlations），消耗容量还传播错误。消融实测：SDLM/Block Diffusion 这类结构无关 MTP 在 COCO 上只有 44~46 F1（旧 NTP 还有 50），加速也弱（~5 BPS）。 本文之问：能不能让 MTP 的\"块\"恰好等于\"一个框\"？ 用结构化并行同时拿下速度和精度。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-locateanything.html#intuition",
        "t": "大白话讲解 前提：框在 VLM 眼里是什么 图像 → ViT 切成视觉 token；查询文本 → 语义 token；拼成序列喂 Transformer。模型继续\"写字\"，词表里预置结构词（<ref>、<box>、<eos>…）和坐标词（[0,1000] 每个整数一个词）。\"热狗在框 (342,345)-(890,567)\" 就是一句话：<ref> hot dog </ref> <box> 342 345 890 567 </box> <eos>。旧做法把这 11 个词一个接一个蹦出来（一次 forward 一个词）。 Transformer 有个被浪费的隐藏能力：训练时它学的是\"每个位置都预测下一个词\"，自回归解码却只取最后一个位置的预测。PBD 的全部心思：把浪费掉的预测位置用起来，一次吐多个词。 类比：同一道题，出两张卷子 正确答案（一串 token）排版成两种格式，训练时都喂： 接龙卷（NTP）：把整串词当\"已写内容\"，模型练\"看到前缀预测下一个字\"：保底的自回归能力。 填空卷（MTP）：按块切开（每块固定 6 格，一个框一块），每块只留第 1 格，后 5 格涂黑成 [MASK]。模型练\"只看每块第一格，把空格一次全填对\"。 推理（Fast/Hybrid）时只用填空技能：喂 [图+查询 <box> MASK MASK MASK MASK MASK]，一次 forward 填出 342 567 890 345 </box>：整个框一次出来，从 6 步变 1 步。框与框仍逐个来（半自回归），每轮填完把结果定稿提交进 KV cache。 这里最容易卡住：并行坐标如何共同学习结构？ 同块位置共享图像、问题和历史块，并在当前 mask 位置之间做双向注意力。训练把各位置的 token 交叉熵一起优化，使共享权重学习框结构。原文 §3.2 的目标是 L_ntp + L_mtp，不是「整框合法才得分」的硬几何判卷器，也不保证每次输出都合法。并行位置不能读取尚未生成的真实坐标；它们也不是统计上独立的四个猜测。 为什么要留着接龙技能不用？ 填空有时整块填歪（类别边界犹豫时格式错乱、密集网格里坐标滑到两物体中间）。Hybrid 每块填完验两道：格式合法吗？空间置信够吗？（歧义判据 = top-1 坐标概率 < 0.7 且 top-5 候选极差 > 80，两条件同满足 = 候选在坐标轴上撕裂，真歧义）。可疑就作废这块，退回上一块定稿处，改用接龙技能逐词重写这一块，写完再切回填空。Slow 模式更是纯接龙。所以接龙技能不能砍：它既是最高精度兜底，也是回退的引擎。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-locateanything.html#mechanism",
        "t": "关键机制 输出表征：固定长\"块\"，四种功能类型 坐标归一化到 [0,1000] 离散成 token。输出组织成等长块 B = (b₁…b_N)，每块 L=6（一个框 + 两个结构 token，如 <box> </box>），空位填 <null>。半自回归建模：P(B Z,E) = ∏ᵢ P(bᵢ b<i,Z,E)（块级自回归、块内并行）。四种块：语义块（对象描述 <ref>…</ref>，超长跨多块）、框块（四坐标）、负样本块（对象不存在，防幻觉）、结束块（终止信号）。框输出顺序用 X-Y Corner（按左上角 x 再 y 排序，消融最优）。 训练：双格式联合（L = L_ntp + L_blk） x_all = x_vis ⊕ x_q ⊕ x_ntp ⊕ x_blk。x_ntp 是完整标准序列；x_blk 由 x_ntp 按块切分、每块只留首 token、其余换 [mask]。两条流 + 共享上下文靠混合注意力掩码精确隔离： NTP 流 + 共享上下文：严格因果，且禁止看 x_blk（防泄漏），与推理 KV cache 完全对齐。 x_blk 块间因果：当前块能看共享上下文 + 已提交的历史块，看不到未来块 → 学框间依赖，防重复/漏框。 x_blk 块内双向：同块 token 两两全连接 → 几何耦合在此生效（详见大白话）。 训练用 MagiAttention（异构掩码）+ stream packing。两阶段 SFT：先 world-knowledge 对齐（排除检测数据）→ Stage-1 138M 查询全量混合 → Stage-2 稠密数据提到 80%（MOT20Det/SKU110K 等）专攻密集。 推理：三种按需模式 Slow（NTP）：逐词自回归，最高精度/稳定性，适合高精度标注、最终清洗。 Fast（MTP）：整块并行，最大吞吐，适合端侧/机器人。块填出后去 <null>，提交 token 进 KV cache。 Hybrid：默认 Fast，检测到不可靠就局部回退：作废问题块 → 回滚到最后可靠前缀 → 用 NTP 逐词重生成仅这一块 → 无缝切回 Fast。 推理时掩码镜像训练：KV cache 已提交 token 因果；当前块 N 个未来 token 块内双向；每步后截断 cache 只留已提交 token（驱逐 mask token 与重复锚点）。 两类失败：Format Irregularity（复杂多类别场景在类边界犹豫，块内混进结构与坐标 token，如 <box><211></ref><911>…）；Spatial Ambiguity（密集规则排列如网格行列，坐标滑进两物体中间 → 低 IoU）。歧义触发器 = top-1 坐标 token 概率 < 0.7 且 top-5 候选 max-min > 80（[0,1000] 内），双条件同时满足才回退（详见卡壳点 ②）。 LocateAnything-Data 数据引擎 12M 图 / 138M 查询 / 785M 标注框。六任务域（按查询占比）：通用检测 66.9%（框监督占 83.1%）、UI grounding 16.5%、指代 7.3%、文字定位/OCR 3.6%、版面 3.5%、点定位 2.2%。含多模型协作从无标签图自动产高质量定位数据（Multi-Targets Grounding Data Engine，细节在附录）。 底座 原生分辨率 VLM：Moon-ViT（Kimi Team 2025）视觉编码器 + Qwen2.5 语言解码器 + MLP 投影。模型总规模 ~3B。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2026-locateanything.html#evidence",
        "t": "结果与代价 主表（默认 Hybrid，H100 batch 1 测 BPS），对比主要对手 Rex-Omni-3B（同为 3B、量化坐标、统一检测/grounding VLM）： 基准 LocateAnything Rex-Omni-3B 备注 --- --- --- --- 吞吐 12.7 BPS 5.0 BPS Qwen3-VL-4B 1.1（>10×） LVIS mean F1 50.7 46.9（+3.8） F1@0.95 31.1 vs 20.7（Qwen3-VL-8B 20.2） COCO mean F1 54.7 52.9（+1.8） F1@0.95 19.3 vs 15.9 VisDrone mean F1 39.9 35.8 高 IoU 3.2 vs 别家 ~1.5 Dense200 mean F1 58.7 58.3 F1@0.95 18.5 vs 10.3 ScreenSpot-Pro 60.3（SOTA） 36.8 超 GUI-Owl-32B 58.0；Office 图标 69.8 vs 别家 47~50 DocLayNet / M6Doc 76.8 / 70.1 70.7 / 55.6 版面 grounding TotalText 43.3 40.6 OCR HumanRef / RefCOCOg(val,test) 78.7 / 76.7 / 77.6 79.9 / 73.6 / 74.3 高 IoU 段反超：HumanRef@0.95 68.8 vs 65.4 消融（COCO-only，剥离 138M 数据影响）： 坐标表示（Table 6a）：Textual-NTP 49.1 / Quantized-NTP 50.1 / PBD-Slow 52.1 / PBD-Fast 49.6 / PBD-Hybrid 51.6 @13.2 BPS。PBD-Slow 与 Quantized 都是 NTP 解码，差异只在训练配方 → 见卡壳点 ③。 MTP 配方（Table 6b）：结构无关 MTP 全输（SDLM-B6 46.1 @5.5 BPS、BlockDiff-B6 44.8 @4.7），且块越大 F1 越跌（SDLM-B4/B6/B8：46.5→46.1→45.8，严格 speed-accuracy 负相关）；PBD-Fast 49.6 @16.9 BPS。 损失消融（Table 6c，决定性对照）：只训 Lntp → Slow 50.1（=旧 Quantized，零增益）；只训 Lblk → Fast 47.2（全局乱）；Lntp+Lblk → Slow 52.1 / Hybrid 51.6。 吞吐 scaling：目标数 20→300，NTP 延迟线性暴涨；PBD 生成时间几乎不涨（12→~25 BPS，2~6× 加速）。 成本/局限： 纯 Fast 在复杂场景掉精度（49.6 < Slow 52.1），Hybrid 回退仍留极小残余损失（51.6 < 52.1）。最高精度场景（离线评估/清洗）应选 Slow，Hybrid 不是免费午餐。 两腿走路：方法本体在 COCO-only 增益只有 +1.5~2.0，加 138M 数据后 COCO 54.7（自行对比 +~3）：没有数据引擎撑不起这个结论。方法贡献有限，别神化解码范式。 以 SFT 为主训练（AI 预读笔记提及 RL 是论文指明的下一步，正文 Conclusion 未通读核验）。 触发器双阈值（0.7 / 80）是经验值，跨场景迁移可能需重调。 消融只在 COCO 单基准；BPS 口径 H100 batch 1；与下游具体领域（GUI/版面）的纯度消融未见。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2026-locateanything.html#ai-notes",
        "t": "AI 预读备注 Zotero AI Butler 两份子笔记（task=summary/table，deepseek/deepseek-v4-pro 生成，2026-06-10）做预读底稿。 AI-Butler 摘要笔记 itemKey：Y4IH7DBI（task=summary），表格笔记 itemKey：BTHUC235（task=table），provider/model：deepseek/deepseek-v4-pro summary 笔记质量高（pipeline 全流程、块结构、混合掩码三规则、三种模式、数据引擎、实验表格全覆盖），本次讲解在四点上做了修正/提炼：(a) 数据量口径精确化：笔记的\"1.38 亿样本\"实为 138M 查询 / 12M 图 / 785M 框三个口径，摘要极易混；(b) 视觉编码器补全来源：笔记只说 Moon-ViT，实为 Kimi Team 2025 的组件（原文 Moon-ViT (Kimi Team, 2025)）；(c) 消融归因补决定性对照：笔记把方法增益笼统说成 +1.5 F1，没抓住 Table 6c「只训 Lntp 零增益、加了 Lblk 才 +2」这个定位 Lblk 独立贡献的关键行（见卡壳点 ③）；(d) 触发器双条件的\"撕裂分布\"含义是本次讲解补的（笔记只列了两条件没讲为何同满足）。表格笔记（AI-Table）信息量低，仅文献表维度，未采用。第三个 note 子项（GJXSHNW7）是用户备注「fix github link」，非 AI 预读。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2026-locateanything.html#restatement",
        "t": "我的复述 （费曼检验时原话保留） 填空模式下，一次 forward 出来的，loss 是一块算的，输出的四个值必须构成合法框才能拿分。 不留接龙技能不行：Slow 模式就是回退到 NTP 预测；Hybrid 是如果填空预测框的置信度低则扔掉、退回到框开始前的位置用接龙模式重新回答，不留接龙技能这些就实现不了了。 通用 MTP 是硬边界不考虑语言的结构性，比如会被切成 <ref>hot dog</ref><box>342 567 890 345</box>，模型会被迫学各种切分点的组合，其中大部分是没有意义的。 旧方法是坐标顺序一个个出的，假如 x1 y1 已经错了或偏差了，那么 x2 y2 得在这个偏差的先验基础上预测，会带来更大的偏差；而 PBD 是同时输出四个坐标，数值相互独立不会干扰。 触发器补讲后：top-1 低 + 极差大 = 在很大范围上摇摆、范围内的数值都没有自信 → 回退；top-1 低但极差小 = 犹豫贴哪个位置但范围很小、对结果精度影响不大 → 不回退；top-1 高但极差大 = 对第一个候选很笃定 → 不回退。 PBD-Slow 相对旧 NTP 高 +2 的归因（补讲后）：来自同时学填空和 NTP…（初答太泛，\"互相促进\"，被\"只训 Lntp 那一行零增益\"的数据点纠正） 再检验轮（C）： 机制上来自 Lblk 损失：它用\"一次猜对整块才得分\"的目标把几何联合约束直接压进共享权重，x1 的预测分布不再孤立地被评，而是和 y1/x2/y2 绑在一起被评。这份\"框必须整体合法\"的结构化监督沉淀下来后，换回 NTP 逐词推理时依然生效（权重共享）。"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2026-locateanything.html#pitfalls",
        "t": "卡壳点与解答 Q：第一版讲解看完说\"还是没看懂具体怎么做的\"，卡在哪？ A：卡在机制没落到 token 级操作。重讲的三步走通：① 原材料：框 = 一串词（结构词 + 坐标词），旧法一个 forward 蹦一个；② Transformer 天生\"每个位置都预测下一词\"，只是自回归只取最后一个：PBD 把浪费的位置用起来，训练时专出\"填空题\"（块留首格、后 5 格 [MASK]、一次填）；③ 推理 = 只做填空，一段段填。教训：这篇的机制必须讲到 token 级演算才能建立直觉，纯架构图讲不通。 Q：坐标并行出、没有先后，凭什么\"互相约束\"？ A：不是先生成 x1 再传给 x2。四个 mask 位置共享上下文，在块内双向交互，并同时接受各位置的 token 交叉熵监督。共享权重由此学习框结构。实际目标没有额外的“整框合法才得分”判卷器，位置也读不到尚未生成的真实坐标。并行预测减少串行错误传递，但不保证四个预测统计独立或每个框都合法。 Q：歧义触发器为什么要求两个条件同时满足？（初答把极差理解成框大小，偏了） A：先澄清：条件 2 的\"top-5 极差 > 80\"指 5 个候选坐标词在 [0,1000] 坐标轴上互相差多远，是模型内心动摇的范围，不是框尺寸。双条件合成一种检测：候选分布是否\"撕裂\"。单边情形都是正常尾巴：top-1 低但候选挤一团（极差小）= 边界像素级犹豫、落在同一物体内，NTP 也不会更好；top-1 高但候选散布开 = 有明确首选、尾巴长无关紧要。只有\"不自信 + 候选在几何上严重分裂\"（比如同时往 200 和 800 两个位置探头）才说明模型真不知道框边贴哪、可能滑进两物体中间（Spatial Ambiguity），NTP 慢工才有救。 Q：PBD-Slow 也是 NTP 解码，凭啥比旧 Quantized-NTP 高 +2？（消融归因） A：初答\"两种形式互相促进\"太泛、抓不到点。决定性数据点是 Table 6c 第一行：只训 Lntp（表征已经块对齐）→ Slow 50.1，跟旧 Quantized-NTP 分毫不差：只把坐标包成块、不加填空监督，零增益。所以 +2 只有一个来源：Lblk 这条块级填空损失。它的作用不是\"教并行\"（Slow 不并行），而是用\"同块各位置共同接受 token 交叉熵监督\"把几何联合约束压进共享权重，x1 的分布不再孤立被评、和 y1/x2/y2 绑一起评；这份结构化监督在权重里沉淀后，换回 NTP 推理依然生效。这就是论文 \"box-aligned formulation provides stronger supervision than 1D serialization, without sacrificing throughput\" 的意思：精度收益从\"必须靠并行\"里解放出来了。 Q：通用 MTP（SDLM/BlockDiff）为什么又慢又差？ A：结构无关切块让块边界大概率落在无意义处，一个块同时装\"上一框尾巴坐标 + 下一类别的开头词\"，模型被迫拟合横跨框边界、横跨类别的虚假相关（共现统计，非真实规律），纯消耗容量还错误传播。加速弱是因为块内容不连贯，实际可用性差（SDLM 只到 ~5.5 BPS）。PBD 用\"块 = 框\"把这个伪模式源头拆掉。 2026-10-04 核对原文 §3.2：历史问答中「整块全对才拿分」「合法框约束直接入 loss」是过强类比。实际为两种序列的 token 交叉熵联合训练。Table 6 的增益支持结构化训练有效，不证明增加了硬几何损失。"
      },
      {
        "h": "全文问答 · Q：第一版讲解看完说\"还是没看懂具体怎么做的\"，卡在哪？",
        "a": "notes/papers/2026-locateanything.html#qa-token-walkthrough",
        "t": "Q：第一版讲解看完说\"还是没看懂具体怎么做的\"，卡在哪？ 卡在机制没落到 token 级操作。重讲的三步走通：① 原材料：框 = 一串词（结构词 + 坐标词），旧法一个 forward 蹦一个；② Transformer 天生\"每个位置都预测下一词\"，只是自回归只取最后一个：PBD 把浪费的位置用起来，训练时专出\"填空题\"（块留首格、后 5 格 [MASK]、一次填）；③ 推理 = 只做填空，一段段填。 教训：这篇的机制必须讲到 token 级演算才能建立直觉，纯架构图讲不通。"
      },
      {
        "h": "全文问答 · Q：坐标并行出、没有先后，凭什么\"互相约束\"？",
        "a": "notes/papers/2026-locateanything.html#qa-constraint",
        "t": "Q：坐标并行出、没有先后，凭什么\"互相约束\"？ 不是先生成 x1 再传给 x2。四个 mask 位置共享上下文，在块内双向交互，并同时接受各位置的 token 交叉熵监督。共享权重由此学习框结构。实际目标没有额外的“整框合法才得分”判卷器，位置也读不到尚未生成的真实坐标。并行预测减少串行错误传递，但不保证四个预测统计独立或每个框都合法。"
      },
      {
        "h": "全文问答 · Q：歧义触发器为什么要求两个条件同时满足？（初答把极差理解成框大小，偏了）",
        "a": "notes/papers/2026-locateanything.html#qa-trigger",
        "t": "Q：歧义触发器为什么要求两个条件同时满足？（初答把极差理解成框大小，偏了） 先澄清：条件 2 的\"top-5 极差 > 80\"指 5 个候选坐标词在 [0,1000] 坐标轴上 互相差多远 ，是模型内心动摇的范围，不是框尺寸。双条件合成一种检测： 候选分布是否\"撕裂\" 。单边情形都是正常尾巴：top-1 低但候选挤一团（极差小）= 边界像素级犹豫、落在同一物体内，NTP 也不会更好；top-1 高但候选散布开 = 有明确首选、尾巴长无关紧要。只有\"不自信 + 候选在几何上严重分裂\"（比如同时往 200 和 800 两个位置探头）才说明模型真不知道框边贴哪、可能滑进两物体中间（Spatial Ambiguity），NTP 慢工才有救。"
      },
      {
        "h": "全文问答 · Q：PBD-Slow 也是 NTP 解码，凭啥比旧 Quantized-NTP 高 +2？（消融归因）",
        "a": "notes/papers/2026-locateanything.html#qa-slow-plus2",
        "t": "Q：PBD-Slow 也是 NTP 解码，凭啥比旧 Quantized-NTP 高 +2？（消融归因） 初答\"两种形式互相促进\"太泛、抓不到点。决定性数据点是 Table 6c 第一行： 只训 Lntp（表征已经块对齐）→ Slow 50.1，跟旧 Quantized-NTP 分毫不差 ：只把坐标包成块、不加填空监督，零增益。所以 +2 只有一个来源： Lblk 这条块级填空损失 。它的作用不是\"教并行\"（Slow 不并行），而是用\"同块各位置共同接受 token 交叉熵监督\"把几何联合约束压进共享权重，x1 的分布不再孤立被评、和 y1/x2/y2 绑一起评；这份结构化监督在权重里沉淀后，换回 NTP 推理依然生效。这就是论文 \"box-aligned formulation provides stronger supervision than 1D serialization, without sacrificing throughput \" 的意思：精度收益从\"必须靠并行\"里解放出来了。"
      },
      {
        "h": "全文问答 · Q：通用 MTP（SDLM/BlockDiff）为什么又慢又差？",
        "a": "notes/papers/2026-locateanything.html#qa-generic-mtp",
        "t": "Q：通用 MTP（SDLM/BlockDiff）为什么又慢又差？ 结构无关切块让块边界大概率落在无意义处，一个块同时装\"上一框尾巴坐标 + 下一类别的开头词\"，模型被迫拟合横跨框边界、横跨类别的虚假相关（共现统计，非真实规律），纯消耗容量还错误传播。加速弱是因为块内容不连贯，实际可用性差（SDLM 只到 ~5.5 BPS）。PBD 用\"块 = 框\"把这个伪模式源头拆掉。 2026-10-04 核对原文 §3.2：历史问答中「整块全对才拿分」「合法框约束直接入 loss」是过强类比。实际为两种序列的 token 交叉熵联合训练。Table 6 的增益支持结构化训练有效，不证明增加了硬几何损失。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-locateanything.html#open",
        "t": "还没搞懂 _无_：检验题全部补齐，无残留漏洞。「块内双向注意力在单步并行预测中的确切信息论作用」存疑（mask 占位在一步预测中互见的信息量有限，论文与通用 MTP 文献均未展开），留待 DiffusionVL/Block Diffusion 入库时对照，暂不立为问题。"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-locateanything.html#relations",
        "t": "关联 VST ： 同主题\"系统延迟\"的两个正交解法：VST 把推理切碎塞进视频播放空档（把延迟藏起来，查询即答），LocateAnything 把几何输出块化、一步出一个框（把解码步数本身减掉）。组合设想（待验证）：视频交互系统用 VST 的推理时机 + 本文的快速低层感知。 Video-o3 / VST ： 本文是感知侧（GUI/指代定位给得又快又准，ScreenSpot-Pro 60.3 SOTA 是 GUI/具身 agent 的感知底座），Video-o3/VST 是拿到框之后的推理/行动侧。下游不变量：UI grounding 的产出是 agent 下一个动作的坐标参数。 GeoAnchor ： 同一问题「坐标该不该言语化」在空间推理侧的对照答案：本文仍把框坐标写成离散 token 块（整块并行解码换效率），GeoAnchor 干脆让几何量不经过词表进连续潜空间（换保真度）。两条路线都认为逐 token 蹦坐标不行，分歧在留在词表里还是离开词表。 未来入库钩子：① 本文是库内第一篇 VLM 检测/grounding 论文，开「解码表征与推理效率」新线；② 同线 Related Work 提及的结构无关 MTP 家族（SDLM / Block Diffusion / LLaDA / Dream，扩散语言模型是另一条并行解码路线）与 DiffusionVL（VL 域）入库时回链本页对照\"结构对齐 vs 结构无关\"；③ 结构输出并行可迁移族（分割多边形 / 动作基元 / 表格单元格，AI 笔记延伸非正文）；④ grounding 后训练 RL（Vision-R1 / UniVG-R1 / GW-VLM，论文 Related Work 提及）入库时回链，对照\"解码范式 vs 强化对齐\"两路线。"
      }
    ]
  },
  {
    "id": "2017-ppo",
    "type": "paper",
    "title": "PPO",
    "href": "papers/2017-ppo.html",
    "noteHref": "notes/papers/2017-ppo.html",
    "sourceHref": "wiki/papers/2017-ppo.md",
    "date": "2026-09-09",
    "topic": "reinforcement-learning",
    "aliases": [
      "PPO",
      "Proximal Policy Optimization",
      "PPO-Clip"
    ],
    "tags": [
      "policy-gradient",
      "clipped-surrogate",
      "continuous-control",
      "gae",
      "improve-stability",
      "improve-training-efficiency"
    ],
    "essence": "PPO-Clip 修改策略更新的评分规则，减弱把采样动作概率继续推远的激励，让一批近期轨迹可以做有限轮更新。",
    "review": {
      "next": "2026-09-17",
      "last": "2026-09-10",
      "count": 1,
      "result": ""
    },
    "relations": [
      {
        "type": "applied-in",
        "to": "2026-open-mopd",
        "reason": "Open-MOPD 在 PPO 多轮复用轨迹时刷新奖励，以缓解奖励陈旧；刷新不重新采样轨迹。",
        "status": "reported"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2017-ppo.html#rebuild",
        "t": "普通策略梯度每次更新后就改变了采样策略。反复用旧样本训练，会让样本与当前策略越来越不匹配。PPO 用概率比和裁剪目标，让一批新样本可以做有限轮更新。 采一批新轨迹 保存旧策略的动作概率，估计每个动作的优势 A。A 的正负表示这个动作比基线好还是差。 比较新旧概率 比率 r = 新概率 / 旧概率。优化 min(rA, clip(r)A)，裁剪阈值由 epsilon 决定。 有限复用后重采 裁剪取消沿有利方向继续推大的激励。完成几轮更新后，重新用当前策略采样。 具体例子（教学假设） ：旧策略对一个好动作的概率为 0.20，新策略为 0.30，r=1.5。设 A=1、epsilon=0.2，该样本目标取 min(1.5,1.2)=1.2。目标变平，概率本身仍可以超过 0.24。 边界 ：这是单个样本的 surrogate 目标。共享参数、价值损失和熵项仍会影响策略。clip 不能保证整个网络每次都在安全范围内。 换个条件看机制 保持 r=1.5，把 A 改为 -1。目标还会变平吗？先给出 min 两项的数值。 两项为 -1.5 和 -1.2，min 取 -1.5。坏动作概率被错误提高时，未裁剪项保留纠偏信号。超出区间并不总意味着该样本梯度为零。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2017-ppo.html#rebuild",
        "t": "五分钟重建 普通策略梯度每次更新后就改变了采样策略。反复用旧样本训练，会让样本与当前策略越来越不匹配。PPO 用概率比和裁剪目标，让一批新样本可以做有限轮更新。 采一批新轨迹 保存旧策略的动作概率，估计每个动作的优势 A。A 的正负表示这个动作比基线好还是差。 比较新旧概率 比率 r = 新概率 / 旧概率。优化 min(rA, clip(r)A)，裁剪阈值由 epsilon 决定。 有限复用后重采 裁剪取消沿有利方向继续推大的激励。完成几轮更新后，重新用当前策略采样。 具体例子（教学假设） ：旧策略对一个好动作的概率为 0.20，新策略为 0.30，r=1.5。设 A=1、epsilon=0.2，该样本目标取 min(1.5,1.2)=1.2。目标变平，概率本身仍可以超过 0.24。 边界 ：这是单个样本的 surrogate 目标。共享参数、价值损失和熵项仍会影响策略。clip 不能保证整个网络每次都在安全范围内。 换个条件看机制 保持 r=1.5，把 A 改为 -1。目标还会变平吗？先给出 min 两项的数值。 两项为 -1.5 和 -1.2，min 取 -1.5。坏动作概率被错误提高时，未裁剪项保留纠偏信号。超出区间并不总意味着该样本梯度为零。 可选自测 关掉提示后解释：为什么 PPO 可以短期复用一批样本，却不能把任意旧轨迹长期当作当前策略的数据？ 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 论文图解",
        "a": "notes/papers/2017-ppo.html#figures",
        "t": "论文图解 优势正负决定裁剪平台的位置 *图 1 费曼图解（论文 Figure 1）：左图的好动作概率提高过多后，目标变平；右图的坏动作概率降低到阈值以下后，目标变平。反方向仍可保留未裁剪项。横轴是概率比，不是被强制限制的概率。* 不同代理目标沿一次更新方向的变化 *图 2 费曼图解（论文 Figure 2）：横轴是在旧参数与一次 PPO 更新结果之间插值。红线是带 min 的裁剪目标，其他线给出对照。它解释局部目标如何改变更新激励，不是对任意后续更新的安全保证。*"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2017-ppo.html#problem",
        "t": "解决什么问题 强化学习中利用神经网络作为函数拟合器时，长期面临两大互相撕裂的阵营痛点： 经典在线策略梯度（Vanilla PG / A2C）极其脆弱且昂贵： 单次使用即废：标准策略梯度定理要求动作采样自当前参数 $\\theta$。没有纠偏时，参数一变，旧数据就不再来自当前策略；继续反复更新会引入策略失配，样本利用率极低； 悬崖效应（Cliff-falling）与恶性循环：如果学习率稍大或单批次优势函数估计方差过高，一次过大的更新就会把策略推入性能断崖。在监督学习中，更新坏了一步后续样本还能纠偏；但在强化学习中，下一批交互数据完全由当前策略产生。策略一旦崩溃，采出的全是无效探索垃圾，智能体可能进入难以恢复的低质量采样循环；并非理论上绝不可能恢复。 信任域策略优化（TRPO）理论扎实但工程实现极其笨重： TRPO 严格约束了策略更新的 KL 散度 $\\mathbb{E}[D_{KL}(\\pi_{old} \\parallel \\pi_\\theta)] \\le \\delta$，受信任域理论启发；实际采样与近似优化并不保证每一步真实回报都单调增加； 但求解该约束优化需要构建 Fisher 信息矩阵（涉及 Hessian 矩阵向量积）、依赖共轭梯度算法（Conjugate Gradient）与回溯线搜索（Line Search）； 工程代价惨痛：代码实现极其繁重复杂，计算开销大，且无法天然兼容带噪声的网络结构（如 Dropout）、循环神经网络（RNN）或 Actor 与 Critic 共享底座参数的现代端到端网络。 PPO 的目标是：只用最普通的一阶随机梯度优化器（如 Adam/SGD），就能获得 TRPO 的更新稳定性与样本效率，同时极易实现并通用于任意神经网络架构。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2017-ppo.html#intuition",
        "t": "大白话讲解 核心直觉：教练调整评分，鼓励小步练习 Vanilla PG 的学法：你刚摸索到一点平衡感，突然猛打了一把方向盘，直接摔断了腿。因为腿断了，你以后跨上车都只能直接倒地，彻底断送学习生涯。 TRPO 的学法：请了一位严苛的物理学教练，你每次想调整重心，他都拿出仪器计算全身体重分布和角动量方程，确认绝对安全才准你微调一毫米：稳如泰山，但每迈一步都累死人。 PPO 的学法：教练改变评分规则。对一个好动作，你把它的概率提高到一定程度后，继续提高也不再增加这条样本的分数；对一个坏动作，如果反而提高它的概率，评分仍会变差，保留纠偏信号。评分平台减弱继续把策略推远的激励，让同一批经验能用于多轮小步练习。 类比的边界：Clip 改的是代理目标中的激励。它不把车把或实际概率比硬锁在 $[1-\\epsilon, 1+\\epsilon]$ 内，也不保证不会摔倒。多个样本共享网络参数，整体策略仍可能继续变化，需要结合更新轮数、学习率与 KL 监控判断步幅。2026-10-04 按原论文 §3、式 7 与 Figure 1 核对，替换了此前「机械限位器锁死安全区」的过强类比；用户原话保留。 结合 BipedalWalker-v3（连续控制实战场景） 在连续动作任务中，PPO 的稳定优势展现得淋漓尽致： 连续扭矩控制：BipedalWalker 拥有 24 维状态（躯干角、角速度、关节角度、激光雷达测距等），输出 4 维连续动作（双腿髋关节、膝关节扭矩 $\\in [-1, 1]$）。策略网络输出高斯分布的均值 $\\mu(s)$ 和标准差 $\\sigma(s)$，从中采样连续动作，无需任何生硬的离散化； 三阶段学习规律： 站立阶段（0 ~ 500k 步）：策略先学“不摔倒”，原地扭动维持平衡以跑满 1600 步避免 -100 摔倒重罚，回报从 -110 回升到 -35 左右； 挪步阶段（500k ~ 1M 步）：策略进入高风险过渡期，出现双模态震荡（回报标准差高达 73 分），有时走顺拿 100+ 分，有时绊倒跌入 -100 分。此时策略极其脆弱； 稳定行走阶段（1M ~ 2M 步）：步态成型，多关节协调流动，1118 步迅速通关，回报稳定突破 280+ 分（环境 solved 线为 300）。 如果没有 PPO 的截断保护，在脆弱的挪步期，一次过激的扭矩参数调整就会把刚刚积累的站立与重心平衡先验彻底抹杀，直接让机器人瘫痪。 四大监控指标的因果关联体系 下面是既有 BipedalWalker 工程案例的仪表盘。阶段步数与阈值来自该讲解案例，未作为 PPO 论文结论；它们不能当作所有任务的通用健康标准： 回合奖励（Episode Reward）：观察滑动平均趋势，切忌被单回合地形扰动造成的上下震荡带偏； 策略熵（Policy Entropy）：衡量高斯策略的标准差大小（探索活力）。初期高、随训练缓慢下降为健康；若过早塌缩至零，意味着陷入“呆站不动”的局部次优； 裁剪比例（Clip Fraction）：有多少动作比率 $r_t(\\theta)$ 撞上了 $[1-\\epsilon, 1+\\epsilon]$ 边界。该案例关注 0.05 ~ 0.15 的范围；解释高低还需看 epsilon、更新轮数、优势符号与奖励趋势，不能只按一个阈值判定崩盘或收敛； 近似 KL 散度（Approximate KL）：新旧策略的分布距离。本案例把 0.03 与 0.05 用作诊断参考，未核实为普适阈值；应按任务和实现设定目标 KL，再结合回报变化判断。 现象 回合奖励 策略熵 裁剪比例 近似 KL 散度 诊断结论与处置 --- --- --- --- --- --- 健康训练 稳步上升 缓慢平稳下降 0.05 ~ 0.15 0.01 ~ 0.03 策略在安全区内稳步推进 激进崩盘 突然跳水 剧烈震荡 飙升 $> 0.20$ 飙升 $> 0.05$ 步子迈太大，需调小 lr 或增大 n_steps 过早早停 停滞不前 快速暴跌至 0 接近 0 接近 0 探索坍缩，需调高 ent_coef 强制探索 训练后期 稳定高位 维持健康低位 稳定偏低 维持极低 步态收敛，进入微调阶段"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2017-ppo.html#mechanism",
        "t": "关键机制 1. 重要性采样概率比率（Probability Ratio） 定义参数更新时新旧策略的动作概率比： $$r_t(\\theta) = \\frac{\\pi_\\theta(a_t \\mid s_t)}{\\pi_{\\theta_{old}}(a_t \\mid s_t)}$$ 在刚完成交互采样时，$\\theta = \\theta_{old}$，此时 $r_t(\\theta_{old}) = 1$； 当我们在同一个数据 Batch 上进行多轮 SGD 更新时，$\\theta$ 不断改变，$r_t(\\theta)$ 反映了新策略偏离采样策略的程度。 未经约束的 Conservative Policy Iteration (CPI) 目标为：$L^{CPI}(\\theta) = \\hat{\\mathbb{E}}_t [ r_t(\\theta) \\hat{A}_t ]$。若直接对其做多步优化，极易因 $r_t(\\theta)$ 极端膨胀或缩小而毁掉策略。 2. 截断代理目标与悲观下界（Clipped Surrogate Objective） PPO-Clip 的核心损失函数定义为： $$L^{CLIP}(\\theta) = \\hat{\\mathbb{E}}_t \\left[ \\min\\Big( r_t(\\theta) \\hat{A}_t,\\; \\text{clip}(r_t(\\theta), 1-\\epsilon, 1+\\epsilon)\\hat{A}_t \\Big) \\right]$$ 其中超参数 $\\epsilon$ 通常取 0.2。 外层取 $\\min$ 构成了对未截断目标的一个悲观下界（Pessimistic Lower Bound），它在正负优势下起到了精妙的不对称约束： 正优势 $\\hat{A}_t > 0$（好动作，应当鼓励）： 我们希望增大该动作概率，即增大 $r_t(\\theta)$； 一旦 $r_t(\\theta) > 1+\\epsilon$（例如 1.2），裁剪项锁死在 $(1+\\epsilon)\\hat{A}_t$； 此时 $\\min(r_t \\hat{A}_t, (1+\\epsilon)\\hat{A}_t) = (1+\\epsilon)\\hat{A}_t$； 数学结果：超出上限后目标函数值不再上升，关于 $\\theta$ 的导数直接归零！算法不再因一次采样的好运而贪婪地把动作概率拉满，保护了探索空间。 负优势 $\\hat{A}_t < 0$（坏动作，应当惩罚）： 我们希望减小该动作概率，即减小 $r_t(\\theta)$； 当 $r_t(\\theta) < 1-\\epsilon$（例如 0.8）时，裁剪项被锁死在 $(1-\\epsilon)\\hat{A}_t$。因为 $\\hat{A}_t < 0$，裁剪后的值为 $-0.8 \\hat{A}_t $，未裁剪值为 $-0.6 \\hat{A}_t $，取 $\\min$ 选取了更悲观的值； 至关重要的反向情况：若在优化过程中，网络犯错反而大幅增加了坏动作的概率（例如 $r_t = 2.0$），未裁剪项是 $2.0 \\hat{A}_t = -2.0 \\hat{A}_t $；如果只有裁剪项，会被锁在 $1.2 \\hat{A}_t = -1.2 \\hat{A}_t $（惩罚被大幅减轻，且导数归零无法纠偏）。 外层 $\\min$ 保证此时选取未裁剪项 $2.0 \\hat{A}_t$：巨大的负值带来巨大的纠偏负梯度，把跑偏的策略强行拉回正轨。 3. 自适应 KL 惩罚变体（Adaptive KL Penalty） 作为 PPO 的另一分支（常作为基线或在机器人控制中使用），直接在目标中加入动态权重的 KL 惩罚： $$L^{KLPEN}(\\theta) = \\hat{\\mathbb{E}}_t \\left[ \\frac{\\pi_\\theta(a_t \\mid s_t)}{\\pi_{\\theta_{old}}(a_t \\mid s_t)}\\hat{A}_t - \\beta D_{KL}(\\pi_{\\theta_{old}}(\\cdot \\mid s_t) \\parallel \\pi_\\theta(\\cdot \\mid s_t)) \\right]$$ 每轮迭代后计算平均 KL 散度 $d = \\hat{\\mathbb{E}}_t[D_{KL}]$； 若 $d < d_{targ} / 1.5$，说明更新太保守，$\\beta \\leftarrow \\beta / 2$； 若 $d > d_{targ} \\times 1.5$，说明更新太激进，$\\beta \\leftarrow \\beta \\times 2$； 论文实验证实：Clip 截断目标在各项任务中全面优于自适应 KL 惩罚。 4. GAE（广义优势估计）与联合优化目标 为了降低优势函数 $\\hat{A}_t$ 的方差，PPO 结合 GAE（Generalized Advantage Estimation）： $$\\hat{A}_t = \\sum_{l=0}^{T-t-1} (\\gamma \\lambda)^l \\delta_{t+l}^V, \\quad \\text{其中 } \\delta_t^V = r_t + \\gamma V(s_{t+1}) - V(s_t)$$ $\\lambda$ 在 1-步 TD（低方差、高偏差）与全蒙特卡洛回报（零偏差、高方差）之间做平滑插值，通常取 $\\lambda = 0.95$。 在 Actor 与 Critic 共享底座参数的现代网络架构中，PPO 的综合优化目标为： $$L^{CLIP+VF+S}_t(\\theta) = \\hat{\\mathbb{E}}_t \\left L^{CLIP}_t(\\theta) - c_1 \\big(V_\\theta(s_t) - V_t^{targ}\\big)^2 + c_2 S[\\pi_\\theta \\right]$$ 其中 $c_1$ 是价值损失系数（通常 0.5），$c_2$ 是熵奖励系数（通常 0.01 或 0.005），$S$ 为策略熵 $H(\\pi_\\theta(\\cdot \\mid s_t))$。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2017-ppo.html#evidence",
        "t": "结果与代价 实验结果 MuJoCo 7 项连续控制基准（HalfCheetah, Hopper, Walker2d 等）： 目标函数消融对比（归一化得分，随机策略为 0，最佳为 1）： 无裁剪无惩罚：$-0.39$（在 HalfCheetah 上直接彻底跑崩，得分远低于初始随机策略）； PPO-Clip ($\\epsilon=0.2$)：$0.82$（全面领先所有变体）； PPO-Clip ($\\epsilon=0.1$ / $\\epsilon=0.3$)：$0.76$ / $0.70$； 自适应 KL 惩罚：$0.68 \\sim 0.74$； 固定 KL 惩罚：$0.62 \\sim 0.72$； 算法横向对比：在全部 7 个连续控制任务上，PPO (Clip) 综合表现一致击败 TRPO、CEM、Cross-Entropy、Vanilla PG (Adaptive Step) 以及 A2C。 高维拟人机器人控制（3D RoboschoolHumanoid）： 在极高自由度的人形机器人奔跑、变向巡航（Flagrun）、以及被重物方块砸倒后重新爬起的严酷控制任务中，PPO 展现出强大的高维连续策略学习能力。 Atari 49 款游戏基准： 样本复杂度大幅击败 A2C； 在全训练周期平均回报指标上，PPO 在 30 款游戏中战胜 A2C 与复杂的 ACER，以极简的代码架构匹敌最先进的专用算法。 代价与局限 本质依然是 on-policy：虽然支持多轮 minibatch 更新，但数据依然是局部近端有效；一旦新旧策略偏离，重要性采样比率失效，数据必须丢弃。其绝对样本效率远低于具备经验回放池的纯 off-policy 算法（如 SAC、TD3）； 对实现细节极度敏感：后续研究（如 Engstrom et al., \"Implementation Matters\"）指出，PPO 论文标称的优异表现中，相当一部分得益于代码级技巧（如优势值归一化、梯度截断、正交初始化、学习率线性退火等），纯裸 PPO 核心若缺少这些工程包裹容易退化； 奖励黑客与奖励函数依赖：在复杂环境（如行走姿态、LLM 对齐）中，策略极易通过扭曲动作去钻简单标量奖励的空子（Reward Hacking）。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2017-ppo.html#ai-notes",
        "t": "AI 预读备注 底稿来源：Zotero 库内笔记（itemKey：382LXMI9，关于 PPO 论文核心贡献的摘要笔记）。 核对与差异补充： 预读笔记准确定位了 PPO 在连续控制与 Atari 上的基准优势，以及替代 TRPO 的一阶极简特性； 预读底稿未展开剖析核心数学公式中为什么必须同时存在 clip 与外层 min 的不对称纠偏机制；本页面重点结合 BipedalWalker-v3 连续控制与四大监控指标矩阵，补齐了实操层面的因果闭环。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2017-ppo.html#restatement",
        "t": "我的复述 检验题 1（为什么有外层 min 与悲观下界）： “没有外层的 min 的话，如果是负优势的话说明把坏动作弄的更差了，不加min那么优化方向会被限制住，加了的话可以让巨大的负梯度把它拉回来” 检验题 2（BipedalWalker 训练指标异常排查）： “模型训飞了，训得和初始模型太远了，导致 KL 过大，探索空间剧增也就是策略熵变大，同时大部分的 loss 都超过 1+\\epsilon范围被截断了” 检验题 3（PPO 多轮复用的底气来源）： “它限制了模型和优势的更新幅度，让模型在范围内探索的同时避免把自身搞坏。”"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2017-ppo.html#pitfalls",
        "t": "卡壳点与解答 Q：为什么公式里既要有 clip 又必须有外层的 min？只保留 clip(r, 1-eps, 1+eps) * A 会发生什么？ 如果只有裁剪项，当一个动作的优势为负（$\\hat{A}_t < 0$，糟糕动作），且网络在某次更新中错误地大幅增加了该动作的概率（例如 $r_t = 2.0$）时，裁剪项会把比率截断在 $1+\\epsilon = 1.2$。这会导致两个致命错误： 惩罚被严重缩小 ：损失值从真实的 $2.0 \\hat{A}_t$ 变成了 $-1.2 \\hat{A}_t $，对恶性错误的惩罚被人为减轻； 梯度直接归零 ：因为比率被锁定在常数边界 1.2 上，导数变为 0，优化器根本收不到惩罚信号来降低这个危险动作的概率！ 外层的 $\\min$ 取未裁剪项 $r_t \\hat{A}_t$ 与截断项的最小值，在负优势且动作概率激增时强行保留了真实的未截断值，保留沿降低坏动作概率方向的纠偏信号；梯度大小和最终更新效果仍取决于参数化、优势与其他样本。 Q：既然可以在同一批数据上跑多个 Epoch，为什么说 PPO 依然是严格的 on-policy 算法？为什么不能丢进 Replay Buffer 长期复用？ PPO 每轮通常重新采样，然后对同一批近期开出的轨迹做有限次更新。它因此通常归为 on-policy 方法；在内更新期间，当前策略与采样策略已经有偏移，不能把每个内更新都说成严格同分布。 ratio 对动作概率的偏移进行纠偏，但没有把旧状态分布和旧优势估计自动变成当前值。数据长期陈旧时，比率可能有较大方差，状态分布与优势也会失配。clip 不会消除这些误差。 对正优势且 r 高于上界，或负优势且 r 低于下界，该样本裁剪目标会变平；相反方向仍可能有梯度。因此不能说长期复用必然让全部梯度归零。常规 PPO 更新几轮后重采样，更多离策略复用需要另外设计和验证。 Q：在连续控制（如 BipedalWalker）训练中，Clip Fraction 飙升到 0.27、KL 散度飙升到 0.065 伴随奖励跳水，该如何调参排查？ 这是典型的 单步更新幅度过激、策略被推下悬崖 的症状。超过 27% 的样本超出截断范围，新旧策略分布严重脱节（KL 高于该案例此前的水平，不是突破一个通用危险线），原有步态先验被摧毁。 工程调参优先顺序： 调小学习率 <code>learning_rate</code> （最直接的刹车手段，如从 3e-4 降到 1e-4）； 增大单次采样步数 <code>n_steps</code> （例如增加并行环境数或步数，用更大量的轨迹平滑梯度估计方差）； 调小更新轮数 <code>n_epochs</code> 或 <code>clip_range</code> （如将 clip 从 0.2 收窄至 0.1，减弱目标中继续推大的激励；仍不硬性保证最大偏离）。"
      },
      {
        "h": "全文问答 · Q：为什么公式里既要有 clip 又必须有外层的 min？只保留 clip(r, 1-eps, 1+eps) * A 会发生什么？",
        "a": "notes/papers/2017-ppo.html#qa-min-bound",
        "t": "Q：为什么公式里既要有 clip 又必须有外层的 min？只保留 clip(r, 1-eps, 1+eps) * A 会发生什么？ 如果只有裁剪项，当一个动作的优势为负（$\\hat{A}_t 惩罚被严重缩小 ：损失值从真实的 $2.0 \\hat{A}_t$ 变成了 $-1.2|\\hat{A}_t|$，对恶性错误的惩罚被人为减轻； 梯度直接归零 ：因为比率被锁定在常数边界 1.2 上，导数变为 0，优化器根本收不到惩罚信号来降低这个危险动作的概率！ 外层的 $\\min$ 取未裁剪项 $r_t \\hat{A}_t$ 与截断项的最小值，在负优势且动作概率激增时强行保留了真实的未截断值，保留沿降低坏动作概率方向的纠偏信号；梯度大小和最终更新效果仍取决于参数化、优势与其他样本。"
      },
      {
        "h": "全文问答 · Q：既然可以在同一批数据上跑多个 Epoch，为什么说 PPO 依然是严格的 on-policy 算法？为什么不能丢进 Replay Buffer 长期复用？",
        "a": "notes/papers/2017-ppo.html#qa-on-policy-reuse",
        "t": "Q：既然可以在同一批数据上跑多个 Epoch，为什么说 PPO 依然是严格的 on-policy 算法？为什么不能丢进 Replay Buffer 长期复用？ PPO 每轮通常重新采样，然后对同一批近期开出的轨迹做有限次更新。它因此通常归为 on-policy 方法；在内更新期间，当前策略与采样策略已经有偏移，不能把每个内更新都说成严格同分布。 ratio 对动作概率的偏移进行纠偏，但没有把旧状态分布和旧优势估计自动变成当前值。数据长期陈旧时，比率可能有较大方差，状态分布与优势也会失配。clip 不会消除这些误差。 对正优势且 r 高于上界，或负优势且 r 低于下界，该样本裁剪目标会变平；相反方向仍可能有梯度。因此不能说长期复用必然让全部梯度归零。常规 PPO 更新几轮后重采样，更多离策略复用需要另外设计和验证。"
      },
      {
        "h": "全文问答 · Q：在连续控制（如 BipedalWalker）训练中，Clip Fraction 飙升到 0.27、KL 散度飙升到 0.065 伴随奖励跳水，该如何调参排查？",
        "a": "notes/papers/2017-ppo.html#qa-bipedal-metrics",
        "t": "Q：在连续控制（如 BipedalWalker）训练中，Clip Fraction 飙升到 0.27、KL 散度飙升到 0.065 伴随奖励跳水，该如何调参排查？ 这是典型的 单步更新幅度过激、策略被推下悬崖 的症状。超过 27% 的样本超出截断范围，新旧策略分布严重脱节（KL 高于该案例此前的水平，不是突破一个通用危险线），原有步态先验被摧毁。 工程调参优先顺序： 调小学习率 learning_rate （最直接的刹车手段，如从 3e-4 降到 1e-4）； 增大单次采样步数 n_steps （例如增加并行环境数或步数，用更大量的轨迹平滑梯度估计方差）； 调小更新轮数 n_epochs 或 clip_range （如将 clip 从 0.2 收窄至 0.1，减弱目标中继续推大的激励；仍不硬性保证最大偏离）。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2017-ppo.html#open",
        "t": "还没搞懂 （暂无。费曼三题检验完全收敛，核心概念闭环。）"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2017-ppo.html#relations",
        "t": "关联 DeepSeekMath ： GRPO（Group Relative Policy Optimization）的提出者：直接继承了 PPO-Clip 截断代理目标（clipping objective）以减弱过激更新的激励，但彻底丢弃了 Critic 价值模型与 GAE，改用组内采样输出的相对归一化打分估计优势，并将 token 级 KL 散度解耦至外层损失，大幅削减显存开销。 DAPO ： 非对称裁剪与长思考链 RL：DAPO 针对 Long-CoT 中对称 Clip 导致的严重熵坍缩，打破了 PPO 的对称区间，提出非对称放宽裁剪上界（Clip-Higher, $\\varepsilon_{low}=0.2, \\varepsilon_{high}=0.28$），减弱正优势方向的裁剪限制，释放低概率关键探索 token 的增长空间。 Open-MOPD ： Open-MOPD 揭示的 M-OPD 多教师蒸馏中第三层时序失衡（K 次更新内 Reward 陈旧发霉），其根本物理载体正是 PPO 的 Clip 机制：当学生策略能力在 K 次内大幅提升后仍用旧 Reward 评分，导致概率比 $r_t$ 过冲增大 clip fraction；论文 K=4 报告约 75.8%，不能直接等同于全部网络梯度或算力被冻结。 U-OPSD / S²VOPD ： 强化学习稀疏标量 Reward 信号与 On-Policy 蒸馏逐 Token 稠密教师分布信号（KL 散度）的演进对比。 GeoAnchor ： GRPO（PPO 的组相对变体：组内均值当 baseline、去 value 网络）的下游应用锚点：Stage 4 用 GRPO + pattern reward 学「local-only vs local+global」推理模式的自适应选择，bandit 式奖励「用对模式」而非「答对」。"
      }
    ]
  },
  {
    "id": "2026-tspo",
    "type": "paper",
    "title": "TSPO",
    "href": "papers/2026-tspo.html",
    "noteHref": "notes/papers/2026-tspo.html",
    "sourceHref": "wiki/papers/2026-tspo.md",
    "date": "2026-09-14",
    "topic": "video-understanding",
    "aliases": [
      "TSPO",
      "Temporal Sampling Policy Optimization"
    ],
    "tags": [
      "video-mlm",
      "temporal-sampling",
      "group-rl",
      "policy-gradient",
      "improve-efficiency",
      "reduce-supervision",
      "improve-grounding"
    ],
    "essence": "TSPO 根据问题从候选帧中选择一组关键帧，用冻结 MLLM 的回答奖励训练选帧策略。",
    "review": {
      "next": "2026-09-17",
      "last": "2026-09-14",
      "count": 0,
      "result": ""
    },
    "relations": [
      {
        "type": "compare",
        "to": "2026-video-o3",
        "reason": "TSPO 在回答前训练 temporal agent 一次性选帧，Video-o3 在查询后多轮调用工具搜索；前者路径短，后者 test-time 搜索更灵活",
        "status": "synthesis"
      },
      {
        "type": "compare",
        "to": "2026-videochat3",
        "reason": "TSPO 决定哪些时间点交给 MLLM，VideoChat3 在编码器内压缩时空 token；二者维度不同，组合尚无实验",
        "status": "synthesis"
      },
      {
        "type": "compare",
        "to": "2026-vst",
        "reason": "VST 在查询前写文本记忆，TSPO 需要 query 才能选择关键帧；前者主要解决实时响应，后者主要解决 query 相关证据获取",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2026-tspo.html#rebuild",
        "t": "均匀选帧与问题无关，可能漏掉短暂证据。TSPO 训练一个小型 temporal agent，根据问题从候选帧中选出一组帧，再交给冻结的 MLLM 回答。 给候选帧打分 1 FPS 得到候选，冻结 CLIP 提特征。可训练 agent 结合帧级与事件级信息。 探索不同选帧组 Gumbel Top-K 形成不同选择，冻结 MLLM 对每组帧作答。主要更新选帧 agent。 用奖励训练选择 答案奖励 R_A 评价整组选帧；目标片段奖励 R_T 评价选中帧有多少位于标注片段。 具体例子（教学假设） ：选 4 帧，其中 3 帧在目标片段，R_T=3/4。它没有把未选中的目标帧算进分母，所以更接近 precision，而不是完整的时间 IoU。 边界 ：一组帧让 MLLM 答对，不证明每帧都有用。若短事件没有进入 1 FPS 候选，selector 无法重新创造那帧。奖励还依赖冻结 MLLM 能否读懂证据。 换个条件看机制 两组帧都答对，一组 4/4 在目标片段，另一组 2/4 在片段。只有 R_A 时能区分这项冗余差吗？ 不能直接区分，两组答案奖励相同。R_T 提供额外的集中程度信号，分别为 1 和 0.5，但它也不是逐帧因果贡献的证明。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2026-tspo.html#rebuild",
        "t": "五分钟重建 均匀选帧与问题无关，可能漏掉短暂证据。TSPO 训练一个小型 temporal agent，根据问题从候选帧中选出一组帧，再交给冻结的 MLLM 回答。 给候选帧打分 1 FPS 得到候选，冻结 CLIP 提特征。可训练 agent 结合帧级与事件级信息。 探索不同选帧组 Gumbel Top-K 形成不同选择，冻结 MLLM 对每组帧作答。主要更新选帧 agent。 用奖励训练选择 答案奖励 R_A 评价整组选帧；目标片段奖励 R_T 评价选中帧有多少位于标注片段。 具体例子（教学假设） ：选 4 帧，其中 3 帧在目标片段，R_T=3/4。它没有把未选中的目标帧算进分母，所以更接近 precision，而不是完整的时间 IoU。 边界 ：一组帧让 MLLM 答对，不证明每帧都有用。若短事件没有进入 1 FPS 候选，selector 无法重新创造那帧。奖励还依赖冻结 MLLM 能否读懂证据。 换个条件看机制 两组帧都答对，一组 4/4 在目标片段，另一组 2/4 在片段。只有 R_A 时能区分这项冗余差吗？ 不能直接区分，两组答案奖励相同。R_T 提供额外的集中程度信号，分别为 1 和 0.5，但它也不是逐帧因果贡献的证明。 可选自测 关掉提示后解释：为什么论文说端到端优化，却仍可冻结 CLIP 和负责回答的 MLLM？ 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-tspo.html#problem",
        "t": "解决什么问题 长视频不能把所有帧都交给 Video-MLLM：上下文长度和计算成本都会爆炸，所以现有方法通常先稀疏采样，例如均匀抽取 64 帧。问题是，真正能回答 query 的证据可能只出现在很短的时间段里，均匀采样会直接漏掉它。 要学习一个更聪明的采样器又有两个根本障碍： 普通视频 QA 数据通常只有问题和答案，没有「正确帧位于哪一秒」的帧级监督。 选帧是离散的 Top-K 子集选择，不能直接把普通 SFT 的梯度穿过帧索引反向传播。 TSPO 的目标是：在不训练帧级标注、也不必重新训练整个 Video-MLLM 的情况下，让采样器学会根据 query 选择少量、真正有用的关键帧。 它与 Video-o3 都处理「稀疏证据被均匀采样淹没」，但控制方式不同：TSPO 训练一个 query-aware temporal agent，一次性选帧后再回答；Video-o3 则在拿到问题后，边推理边多轮调用工具回看和裁剪视频。 不同帧采样方法对比 *图 1 费曼图解（论文 Figure 1）：三类采样方法对比。均匀采样按固定间隔抽帧、与问题无关（关键瞬间可能恰好漏掉）；training-free 检索用现成相似度找帧但不会因答错而改进；TSPO 把「选哪些帧」当策略，用最终答案对错反向训练采样器。*"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-tspo.html#intuition",
        "t": "大白话讲解 先想象一次错误的监控回放 你要回答「短发女生进博物馆后最先看了什么」。如果 10 分钟视频只均匀抽 64 帧，可能刚好没有抽到她第一次进入展厅的片段。后面的 MLLM 再强，也不能从没有看到的画面里恢复答案。 TSPO 先用 1 FPS 的方式得到候选帧，再根据问题给候选帧打分。它不只看「这一帧里有没有短发女生」，还用局部窗口注意力看「这几帧合起来是不是一个进入博物馆的事件」。选出的帧交给一个冻结的 Video-MLLM 回答。 训练时，同一个问题会随机产生多组候选帧。哪一组让 MLLM 答对，哪一组的采样策略就得到更高的组内相对奖励。这样，答案本身就成了采样器的弱监督，不需要人工逐帧标注。 但「答对」只说明一组帧足够，不说明其中每一帧都不可替代。一组帧可能很精简，另一组可能包含大量无关帧，却都能让 MLLM 答对。为此，论文另外构造了长视频 needle-in-a-haystack 数据，知道目标视频片段在哪里，并用选中帧落入目标片段的比例提供更细的定位信号。 类比：给侦探配一个会学习的取证助手 均匀采样：助手每隔固定时间拍一张照片，不管问题问什么。 training-free 搜索：助手用现成相似度规则找照片，但不会因为最后答错而改变策略。 TSPO：助手每次提出几套取证方案，侦探根据照片回答问题；答对且照片集中在目标事件上的方案得到更高评价，助手逐步学会「什么问题该去视频哪里取证」。 最容易卡住的点是：论文说「端到端」，并不表示整个 MLLM 都被训练。端到端指的是最终语言任务奖励能够优化选帧策略；实际训练中 CLIP 和 Video-MLLM 都冻结，只更新约 3.5M 个 temporal agent 参数。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-tspo.html#mechanism",
        "t": "关键机制 TSPO 框架总览 *图 2 费曼图解（论文 Figure 2）：TSPO 框架。长视频按 1 FPS 出候选帧，temporal agent 结合帧级与事件级相似度打分，Gumbel Top-K 采样多组关键帧分别交给冻结 MLLM 回答；组内按答案对错与目标片段命中比例算相对奖励，只更新约 3.5M 参数的采样策略。* 1. Event-aware Temporal Agent 对长视频先按 1 FPS 得到候选帧 $V_c$。冻结的 CLIP-Large 分别提取帧特征 $F_f$ 和 query 特征 $F_t$。Temporal Agent 对帧特征施加长度为 12 的局部窗口注意力、正弦位置编码和 MLP，得到带局部事件上下文的 $F_e$。 它把两种相似度相加： $$S = \\operatorname{Sim}_{event}(F_e,F_t) + \\operatorname{Sim}_{frame}(F_f,F_t)$$ 帧级相似度更像是在问「画面里有没有 query 提到的人或物」，事件级相似度则尝试回答「这段局部时间上下文是否对应 query 描述的事件关系」。 2. Gumbel-Softmax Top-K 选帧 训练时在分数上加入 Gumbel 噪声： $$P,I = \\operatorname{TopK}\\left(\\operatorname{Softmax}(S/\\tau + \\gamma)\\right), \\quad \\gamma \\sim \\operatorname{Gumbel}(0,1)$$ 其中 $I$ 是被选中的帧索引，$P$ 是相应概率。噪声让训练可以探索不同的帧组合；温度 $ au$ 从 0.025 退火到 0.01，代表从「多探索」逐渐转向「更确定地选高分帧」。推理时去掉 Gumbel 噪声，得到确定性的选帧结果。 3. 把选帧和回答建模成联合决策 对一个问题 $q$，训练时采样 $G$ 组关键帧，分别送入冻结的 LLaVA-Video-7B，得到 $G$ 个回答。联合策略可以写成： $$\\pi(o,V_s\\mid q,V_c)=\\pi_l(o\\mid q,V_s,V_c)\\,\\pi_{ts}(V_s\\mid q,V_c)$$ 这比普通 GRPO 多了一层「选哪些视觉输入」的动作。由于语言模型冻结，论文令语言策略的新旧概率比为 1，最终只用组内相对优势更新 temporal sampling policy： $$J^*_{tspo} \\propto \\sum_i \\frac{\\pi_{ts}(V_{s_i}\\mid q,V_c)}{\\pi_{ts,old}(V_{s_i}\\mid q,V_c)}A_i$$ 因此，TSPO 不是先固定帧再优化语言模型，而是让语言任务的奖励反过来筛选和塑造帧选择策略。 4. 双风格数据与双奖励 TSPO 双数据构建流程 *图 3 费曼图解（论文 Figure 4）：双风格训练数据。Comprehensive Temporal Data 过滤过易/过难样本、保留需要多帧联合理解的问答；Video Needle-in-a-Haystack 把目标片段与无关视频拼接打乱，保留目标片段伪标签，为 R_T（选中帧落入目标片段的比例）提供粗粒度定位信号。* 论文构造 TSPO-10K： Comprehensive Temporal Data：从已有 1 到 3 分钟视频 QA 中过滤掉 4 帧就能答对的过易样本，以及 64 帧仍答不出的过难样本，保留需要多帧联合理解的样本。 Video Needle-in-a-Haystack Data：把目标视频与无关视频按片段拼接、打乱，形成 10 到 60 分钟的长视频，并保留目标片段的伪标签，用来训练长程定位。 答案奖励为： $$R_A=\\mathbb{1}(\\hat y=y)$$ needle 数据额外使用时间定位奖励： $$R_T=\\frac{T_t}{T_a}$$ $T_t$ 是选中且落在目标视频片段内的帧数，$T_a$ 是总选帧数。它更接近「选中帧的目标片段 precision」，不是完整的 IoU，也不是精确事件边界标注。 Comprehensive 数据的总奖励是 $R_A+1$，needle 数据的总奖励是 $R_A+R_T$。前者让采样器学会服务于最终回答，后者进一步区分「同样答对但冗余更多」和「答对且集中命中目标片段」的采样方案。 5. 为什么冻结 MLLM 论文依赖一个前提：LLaVA-Video 已经用均匀 32 帧做过 SFT，模型本身有足够强的语言和视频问答能力；只要选到正确关键帧，它就有机会答对。 冻结 MLLM 有三个直接好处：保留语言模型的强先验，避免 RL 同时改变回答器和采样器导致奖励难以归因，并把训练显存与可学习参数压到很小。代价是，如果 MLLM 即使看到了正确帧也答不对，$R_A$ 就不再是可靠的选帧监督。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2026-tspo.html#evidence",
        "t": "结果与代价 在 LLaVA-Video-7B 的 64 帧复现设置下，TSPO 相比均匀采样基线的结果为： 基准 均匀采样 TSPO 绝对提升 --- ---: ---: ---: LongVideoBench 58.9 63.9 +5.0 MLVU 70.3 76.3 +6.0 Video-MME 53.6 54.7 +1.1 LVBench 40.2 45.3 +5.1 Video-MME 提升较小，因为它更强调整体视频理解，而 TSPO 最擅长的是围绕 query 定位局部关键事件。这个结果是方法边界，不是所有长视频问题都适合压缩成 query 相关的少数帧。 同一个训练好的 temporal agent 不需要额外训练，就能迁移到 Qwen2VL、Qwen2.5-VL 和 LLaVA-Video-72B。推理时 128 个候选帧选 32 帧，可以把视觉 token 从 13,440 降到 6,720，LLM 时间从 2.7s 降到 1.3s；关键帧提取时间约 1.1s，明显低于 CoS 的 28.4s。 主要代价和限制： 需要一个已经足够强的冻结 Video-MLLM，弱回答器会产生噪声奖励。 时间定位奖励依赖 needle 数据的目标片段伪标签，监督是粗粒度的。 选择题式训练数据更容易定义规则奖励，开放式回答的奖励设计没有被充分解决。 agent 只能从 1 FPS 候选中选择；候选阶段已经漏掉的瞬间，后续策略无法挽回。 训练阶段每个样本要让冻结 MLLM 处理多组帧，推理便宜，训练成本仍不低。 论文展示了跨模型迁移，但没有验证它与 Video-o3、VideoChat3 等系统组合后的控制流和计算预算。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2026-tspo.html#ai-notes",
        "t": "AI 预读备注 Zotero 中有 AI Butler 预读底稿：摘要笔记 itemKey 5VABB854（task=summary，provider/model：zhipu / glm-5.3）和表格笔记 itemKey N822M3VZ（task=table，provider/model：zhipu / glm-5.3）。预读正确抓住了「事件感知 agent、联合决策、TSPO-10K、双奖励」四条主线；与全文核对后补充了两个限定：$R_T$ 是目标片段内选帧比例而非 IoU，且 Video-MME 的小幅提升说明方法更偏 query-localization 而非整体理解。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2026-tspo.html#restatement",
        "t": "我的复述 费曼检验时保留原话，不润色。 Q1（为什么答案奖励可以监督选帧）： Video-MLLM 最终答对了说明它看到了回答问题需要的帧片段，选择了某些帧回答对了但是不选回答错误说明这些帧是有用的也就有了选择正确性的信号。但是这个逻辑对于 Video-MME 这种偏向于视频整体理解的就会失效。 Q2（两种数据和奖励）： Comprehensive Temporal 数据解决的是回答正确的问题，Needle in a haystack 解决的是回答的时间区间和 gt 时间区间重合度评估的问题，只使用答案正确奖励，采样器只直到答对了，但是不知道应该定位到哪段，而是只使用时间奖励可能能找到目标片段，但是会选入很多无关帧。 Q3（相比普通 GRPO 与冻结 MLLM）： 相比于普通 GRPO 是引入了一个采样的 agent 整个训练过程 MLLM 和 CLIP 都是冻结的只训练这个 agent ，冻结 VIdeo-MLLM 的好处是训练稳定、显存成本低，限制是它假设冻结的 MLLM 已经足够强，只要看到正确帧就能答对，在 MLLM 不满足条件的情况下效果可能不会好。 Q4（答案奖励为什么只是组级偏好信号）： 进一步根据 R_T 排序，更加偏好 IoU 大的选帧；说明多个采样如果都囊括了需要关注的帧，他们都能到正确性得分，但是里面有的采样是包括了大量无关的帧有的很精简刚好只要需要的帧，只用正确性得分无法区分采样间的好坏。"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2026-tspo.html#pitfalls",
        "t": "卡壳点与解答 Q：答对的那组帧是否就意味着每一帧都真正有用？（2026-09-14 首测） A：不意味着。$R_A$ 只说明这组帧整体足以让冻结 MLLM 答对，而且不同帧组合可能都包含了足够证据。组内相对奖励只能偏好「更容易得到正确答案」的采样方案，不能把功劳精确分配到某一帧。needle 数据的 $R_T$ 用目标片段内选帧比例进一步偏好更集中的方案，但它是粗粒度的 precision-like 信号，不是 IoU。 Q：Video-MME 上 TSPO 是否失效？ A：不是完全失效，而是收益较小。Video-MME 更偏整体视频理解，问题不一定对应一个很窄的关键片段；TSPO 的 query-aware 局部采样优势因此不容易发挥。"
      },
      {
        "h": "全文问答 · Q：答对的那组帧是否就意味着每一帧都真正有用？（2026-09-14 首测）",
        "a": "notes/papers/2026-tspo.html#qa-signal",
        "t": "Q：答对的那组帧是否就意味着每一帧都真正有用？（2026-09-14 首测） 不意味着。 $R_A$ 只说明这组帧整体足以让冻结 MLLM 答对，而且不同帧组合可能都包含了足够证据。组内相对奖励只能偏好「更容易得到正确答案」的采样方案，不能把功劳精确分配到某一帧。needle 数据的 $R_T$ 用目标片段内选帧比例进一步偏好更集中的方案，但它是粗粒度的 precision-like 信号，不是 IoU。"
      },
      {
        "h": "全文问答 · Q：Video-MME 上 TSPO 是否失效？",
        "a": "notes/papers/2026-tspo.html#qa-rt",
        "t": "Q：Video-MME 上 TSPO 是否失效？ 不是完全失效，而是收益较小。Video-MME 更偏整体视频理解，问题不一定对应一个很窄的关键片段；TSPO 的 query-aware 局部采样优势因此不容易发挥。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-tspo.html#open",
        "t": "还没搞懂 （费曼检验已通过，暂无待补理解漏洞。组合 TSPO 与 Video-o3、VideoChat3 的调度和计算预算仍是库内待验证问题，不冒充论文结论。）"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-tspo.html#relations",
        "t": "关联 Video-o3 ： 同一证据获取问题的两种时机。TSPO 在回答前用训练好的 temporal agent 一次性选帧，推理路径短但依赖训练好的 selector；Video-o3 拿到问题后在共享上下文里多轮裁剪、推理和收网，test-time 搜索更灵活但延迟更高。两者的组合可行性和调度方式尚无实验，属于待验证问题。 VideoChat3 ： 选择时间点与压缩视觉 token 的不同维度。VideoChat3 在视觉编码器内压缩时空冗余并控制像素预算，TSPO 决定哪些时间点值得交给 Video-MLLM；二者看起来互补，但论文没有验证组合。 VST ： 查询前文本记忆与查询后关键帧选择的对照。VST 把推理前置到视频播放期，TSPO 需要 query 才能选择帧；前者主要解决实时响应，后者主要解决 query 相关证据获取。 来源：arXiv:2508.04369；Zotero itemKey QXMPGWGR，citekey tangTSPOTemporalSampling2025；入库日期 2026-09-14。"
      }
    ]
  },
  {
    "id": "2026-geoanchor",
    "type": "paper",
    "title": "GeoAnchor",
    "href": "papers/2026-geoanchor.html",
    "noteHref": "notes/papers/2026-geoanchor.html",
    "sourceHref": "wiki/papers/2026-geoanchor.md",
    "date": "2026-09-14",
    "topic": "spatial-reasoning",
    "aliases": [
      "GeoAnchor"
    ],
    "tags": [
      "latent-reasoning",
      "grounding",
      "group-rl",
      "improve-reasoning",
      "improve-grounding"
    ],
    "essence": "GeoAnchor 在文本推理之间插入位置、方向和场景结构三类连续潜变量，用它们辅助回答 3D 空间问题。",
    "review": {
      "next": "2026-09-17",
      "last": "2026-09-14",
      "count": 0,
      "result": ""
    },
    "relations": [
      {
        "type": "compare",
        "to": "2026-video-o3",
        "reason": "连续潜变量与可见工具调用是两种中间表示；可审计性、教师依赖和工具依赖不同。",
        "status": "synthesis"
      },
      {
        "type": "compare",
        "to": "2026-locateanything",
        "reason": "GeoAnchor 将几何量写入连续潜空间；LocateAnything 保留离散坐标 token，用块内并行减少解码步数。",
        "status": "synthesis"
      },
      {
        "type": "prerequisite",
        "to": "2017-ppo",
        "reason": "Stage 4 使用 GRPO 选择推理模式；它沿用 PPO 家族裁剪目标，改用组相对优势而去掉 value 网络。",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2026-geoanchor.html#rebuild",
        "t": "把几何中间量反复写成离散文本，可能损失细节，也可能让推理依赖语言线索。GeoAnchor 让文本规划与连续潜变量交替，分别表示位置、方向和场景结构。 局部与全局分工 position latent 表示物体位置，direction latent 表示方向，geometry latent 表示整体结构。 用几何教师热身 局部潜变量接受坐标与方向监督。少量全局 token 用 soft coverage 对齐较多 VGGT 特征，再经 projector 回到输入空间。 松弛后选择模式 S3 撤掉显式几何损失、保留文本损失；S4 用 GRPO 和 pattern reward 学 local-only 或 local+global 的选择。 具体例子（教学假设） ：问“相框相对雕塑朝哪边”，需要两个位置锚和一条方向箭头。问更依赖房间布局的问题时，整体 geometry 提供另一类条件。这个例子说明分工，不保证模型每次都选对模式。 边界 ：latent 仍是有限精度向量，不是无损的真实 3D 场景。撤掉几何监督后的性能提升是消融观察；t-SNE 和注意力图不能单独证明所有几何信息都被完整保留。 换个条件看机制 让 8 个 geometry token 对齐大量 VGGT 网格特征，为什么不必一格配一个 token？ soft coverage 要求网格特征得到覆盖，而不要求固定一一对应。平衡项抑制所有网格挤向少数 token，避免浪费其余容量。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2026-geoanchor.html#rebuild",
        "t": "五分钟重建 把几何中间量反复写成离散文本，可能损失细节，也可能让推理依赖语言线索。GeoAnchor 让文本规划与连续潜变量交替，分别表示位置、方向和场景结构。 局部与全局分工 position latent 表示物体位置，direction latent 表示方向，geometry latent 表示整体结构。 用几何教师热身 局部潜变量接受坐标与方向监督。少量全局 token 用 soft coverage 对齐较多 VGGT 特征，再经 projector 回到输入空间。 松弛后选择模式 S3 撤掉显式几何损失、保留文本损失；S4 用 GRPO 和 pattern reward 学 local-only 或 local+global 的选择。 具体例子（教学假设） ：问“相框相对雕塑朝哪边”，需要两个位置锚和一条方向箭头。问更依赖房间布局的问题时，整体 geometry 提供另一类条件。这个例子说明分工，不保证模型每次都选对模式。 边界 ：latent 仍是有限精度向量，不是无损的真实 3D 场景。撤掉几何监督后的性能提升是消融观察；t-SNE 和注意力图不能单独证明所有几何信息都被完整保留。 换个条件看机制 让 8 个 geometry token 对齐大量 VGGT 网格特征，为什么不必一格配一个 token？ soft coverage 要求网格特征得到覆盖，而不要求固定一一对应。平衡项抑制所有网格挤向少数 token，避免浪费其余容量。 可选自测 关掉提示后解释：projector 在连接哪两个向量空间？它为什么与三类潜变量的分工是不同问题？ 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-geoanchor.html#problem",
        "t": "解决什么问题 MLLM 看单张 2D 图回答「冰箱在 3D 空间哪里」「相框到鹿雕塑哪个方向」这类问题时，两条旧路都痛： verbalization（言语化）损失：生成文本 token 每步都从词表挑一个离散符号，连续几何量（坐标、方向、距离）写成文字必经「连续 → 离散」的量化压缩，精度没了。更糟的是推理全程在文本里走，模型用语言先验代替几何证据答题。证据有两件：Fig. 5 里 text CoT 生成最终答案时注意力 top token 是 . > 0 answer 这类标点和弱语义符号（各 ~6%），真正的空间信息排后面：离散化不只丢精度，还稀释了空间语义在注意力里的权重；Table 2 里 text CoT SFT 并不稳定优于 vanilla SFT（SPBench 52.9 持平、三基准平均 51.7 vs 51.8 反而略降）。 单 latent 包打天下：latent reasoning 先驱（Aurora、SSR，深度导向的单潜变量）一种潜变量覆盖不了多样空间任务：深度只回答「谁近谁远」，答不了「两点绝对距离」这种需要局部物体证据的问题；且单一全局 latent 把几何搅在一起，不可解释。Table 2 的硬数字：text CoT 60.1 → 单 latent 62.4（+2.3），单 latent → 分解 67.5（再 +5.1，SPAR 列）：分解本身的贡献大于「用不用 latent」。 本文之答：GeoAnchor，text：latent interleaved（文本-潜变量交错）框架，把 3D 信息分解为三类互补 latent + 四阶段协同训练，底座 Qwen3-VL-2B。 三种推理范式对比 *图 1 费曼图解（论文 Figure 1）：(a) text-only 推理把连续几何说成文字，模型在「植物…沙发…」间摇摆；(b) 单 latent 只有一个黑盒向量，缺可解释线索；(c) GeoAnchor 分解为局部 position/direction（钉锚与箭头）加全局 geometry（轮廓图），每个因子可单独追溯。*"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-geoanchor.html#intuition",
        "t": "大白话讲解 类比一：不许念出声的心算 让人心算 3.7×4.9，不许纸笔、不许念叨：中间只能保留「大概 18 上下」的连续感觉，最后才报数。text CoT 是强迫你每一步都把中间数说出口（一说出口就被四舍五入、丢精度，还容易被「18 是个吉利数」这类语言直觉带偏）；latent 推理允许中间步骤留在「感觉层面」，在需要输出文本的阶段 verbalize。 类比二：陌生房间里的两个锚 有人问你「相框在鹿雕塑的哪个方向」： 纯文本 CoT：强迫每步小声说「相框大概……在东边？」每说一次，模糊方位就被压成一个不精确的词。 GeoAnchor：先在心里给两个东西各钉一个锚（position latent，名字里的 Anchor 由此而来），两个锚之间拉一根箭头（direction latent），脑中同时保留房间的整体轮廓图（geometry latent）；中间全在感觉层面处理，最后才说结论。 钉锚（局部证据）+ 轮廓图（全局上下文），这就是 latent decomposition 的全部直觉。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-geoanchor.html#mechanism",
        "t": "关键机制 GeoAnchor 方法总览 *图 2 费曼图解（论文 Figure 2）：GeoAnchor 总览。文本段做语义规划；局部 token 编码物体位置与相互方向；全局 geometry token 经 soft coverage 对齐 VGGT 场景结构（每个全局 token 只认领与自己最相似的特征，8 个 token 合起来覆盖整张特征网格）。* ① latent token 与 projector：模型自己生成的连续思考 latent token 不从词表查表，而是模型自己生成的连续 hidden state：在推理轨迹的规定位置划出「潜变量区」，模型在区内每个内部步产出一个 hidden state，position/direction 各 2 步、geometry 8 步。整条轨迹形如 O = t₁ ⊕ z₁ ⊕ … ⊕ z_{k-1} ⊕ t_k（文本段与潜变量段交错）：文本负责语义规划，潜变量承载连续几何。 🔧 最容易卡住的点①：生成的 hidden state 属于模型输出空间，下一步要吃的 embedding 属于输入空间，两个空间的向量分布（流形）不同。直接把输出塞回输入会发生 latent drift（潜变量漂移），自回归一步错步步错。解法是 projector：LayerNorm(h + MLP(LayerNorm(h)))，带残差的轻量变换，把输出向量「翻译」回输入空间再喂回去。这是稳定性的命门，不是装饰。 ② 三类分解与三种监督 position latent（局部）：内部 hidden states 取平均 → 线性头 → 解码 3D 坐标 p̂ ∈ R³，用 Smooth L1 监督（小误差平方、大误差线性，比纯 L2 抗离群：GT 本身来自深度估计，有噪声）。 direction latent（局部）：同结构解码方向向量 d̂ ∈ R³，用 cosine similarity loss（只管箭头朝向不管长度）。 geometry latent（全局）：与 VGGT（前馈式 3D foundation model，单图出 3D 点云，最后一层特征天然编码场景全局结构）的末层特征对齐。 🔧 最容易卡住的点②：为什么是 soft coverage 而不是 dense 对齐？ VGGT 特征是高分辨率网格（一大堆向量），geometry token 只有 8 个。严格一一配对等于强迫 8 个值班员每人包干固定一片工单，紧凑表示被撕碎。soft coverage 只要求「每个 VGGT 特征至少被某个 geometry token 认领」（覆盖项）+「8 个 token 工作量均衡」（平衡项，防表示坍缩：所有特征挤认同一个 token，容量退化成 1 个）。Table 5：soft coverage 三基准平均 61.7，dense 的 mean pooling 57.4 / adaptive pooling 59.3，设计不是过度工程。 ③ 四阶段协同训练 阶段 数据 Loss 在干嘛 ------ ------ ------ -------- S1 局部感知热身 550k 3D grounding NTP + L_pos + L_dir 只练两类局部 token，给 latent 打「接地」底子（Fig. 5：无 S1 答案对 latent 注意力 ~6%，有 S1 涨到 ~15%） S2 空间潜推理 105k 多样空间推理 NTP + L_pos + L_dir + L_geo 联合局部+全局，学按问题动态选用 token S3 latent 松弛 同上 只留 NTP（λ_l=λ_g=0） 见卡点③ S4 自适应模式 RL 同上 GRPO + pattern reward 学「够用的局部就别拉全局」 四阶段协同训练 *图 3 费曼图解（论文 Figure 3）：四阶段协同训练。S1 局部 grounding 热身 → S2 联合局部+全局推理 → S3 撤掉全部显式监督只留文本 loss（latent 弹回语言流形）→ S4 GRPO + pattern reward，按两种模式各自的历史准确率学会「够用的局部就别拉全局」。* 🔧 最容易卡住的点③：Stage 3 撤掉全部几何监督，为什么性能反而大涨、又不会把几何忘光？ S2 的强监督把 latent 拉向「几何流形」，离「语言流形」太远，后续文本推理受阻；S3 撤监督只留文本 loss，让 latent 弹回两个世界的兼容位置。一种机制解释是：已有几何表示继续服务于文本目标，优化会保留有助答题的部分。消融显示撤监督有效，但没有证明几何信息完全不遗忘。双证据：Fig. 4 显示 S3 的收益远超「把 S2 多训一轮」的对照（ViewSpatial 46.3 vs 36.8/40.2），增益来自撤监督这个动作本身；Fig. 7 的 t-SNE 显示训后 global token 恰落在 VGGT 特征与 text token 之间：两头都沾。 ④ Stage 4：GRPO + pattern reward 前三阶段每个问题都固定调用 local+global 全套，但「谁近谁远」根本不需要全局信息。S4 用 GRPO（Group Relative Policy Optimization：PPO 家族变体，每题采样一组回答、组内相对优势当 baseline，省掉 value 网络）做 RL。奖励 = 格式 + 准确率 + pattern reward：维护 local-only 与 local+global 两种模式各自的 EMA 历史准确率（κ 平滑），谁历史更准，选谁就额外 +0.5。本质是 bandit 式模式选择：奖励「用对模式」而不是「答对」。Table 4：无 pattern reward 的裸 GRPO 在分布外 ViewSpatial 上掉点（46.2 vs 46.3），加了才全面涨：固定模式强行拉全局信息反而引入冗余干扰。 ⑤ 数据构建（监督信号的来源） S1 数据：ScanNet 采 10k 场景 → Qwen3-VL-32B 认物体（≤5 个 + 描述 + 2D bbox）→ Depth Anything v3 估深度和位姿 → 反投影得 3D 坐标，坐标差得方向 → 550k 样本。S2 数据：SPAR 采 100k + SpatialLadder-26k 掺 5k = 105k，每图另提 VGGT 特征做全局监督。注意：局部监督是伪标签（单目深度估计，非真值），且论文没解释 ScanNet 自带传感器深度为何不用（猜测是为对 SPAR 的 ScanNet++/Structured3D 统一 pipeline，或与推理时不依赖深度输入保持一致，但这是推测不是论文说法）。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2026-geoanchor.html#evidence",
        "t": "结果与代价 主结果（Table 1，2B 参数）：SPAR-Bench 32.4→68.4（+36.0）、SPBench 52.9→69.7（+16.8）、ViewSpatial 36.3→47.0（+10.7，两项子任务全场第一）；超 GPT-4o、Gemini-2.5-Flash 与 8B~38B 开源模型，也超全部 specialized 模型。 要打折的地方： In-domain 同源：训练采 SPAR 100k、评测 SPAR-Bench；训练掺 SpatialLadder-26k、评测 SPBench。作者自己承认前两个是 in-domain。+36.0 的头条数字有数据同源加成，跨域 ViewSpatial +10.7 才是更干净的泛化证据。 绝对距离是短板：SPBench Abs. 58.7，远低于 SpatialLadder 的 81.6：连续量进了 latent ≠ 绝对数值估计解决了。 局部监督是伪标签（见机制⑤）。 原文数字瑕疵：Table 5 的 Linear Interpolation 行三列 53.7/60.2/37.3 均值应为 50.4，表中 avg 写 37.8，疑为笔误，引用以三列原始数为准；Intro「超 GPT-4o 18.0%」按 Table 1 三基准均差算只有 16.0，口径对不上，引用直接用表格数。 复现信息缺口：VGGT 是否冻结、backbone 是否全参微调、优化器、硬件、代码开源与否均未报告。近似复现可行，精确复现困难。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2026-geoanchor.html#ai-notes",
        "t": "AI 预读备注 来自 Zotero AI Butler 子笔记，作为费曼 Phase 1 预读底稿，校验后与最终讲解无重大差异： 摘要笔记（itemKey QLX4CM58，task=summary，deepseek-v4.1-flash）：方法/公式/超参/实验/消融全量分析，含复现性评估（中）与陷阱清单（latent drift、λ_g 过大、数据污染等）。 表格笔记（itemKey U6UXJRXK，task=table，gemini-3.8-flash）：结构化字段速查。 在预读之上人工补校的四点（AI 笔记漏检）：Table 5 avg 数字笔误；Intro「超 GPT-4o 18.0%」口径对不上；ScanNet 有原生传感器深度却用估计值的未解释疑问；GRPO pattern reward 的「奖励用对模式而非答对」本质。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2026-geoanchor.html#restatement",
        "t": "我的复述 费曼检验时的原话，保留原味不润色。 Q1（坐标写文字损失了什么）： 坐标转文字相当于是连续信息变离散信息，损失了连续空间信息以及会稀释空间语义在注意力中的权重；论文统计了 text cot 模式下生成最终答案时，注意力 top token 是标点和弱语义符号，真正的空间信息 token 反而排后面。 Q2（soft coverage vs dense、去平衡项会怎样）： dense alignment 等于强迫 8 个人每人认领固定的一片任务，紧凑表示会被撕碎。去掉平衡项的话可能某些 geometry 会分配过多其他的会分配过少的 token，导致不均衡浪费了有效表示空间。 Q3（Stage 3 为什么不会忘光）： 因为已经把几何知识学到模型权重里了。这一步主要是修复经过 stage 2 后模型靠近几何流型而远离文本流型，把它拉回去。 Q4（vs Video-o3 路线取舍）： video-o3 把中间推理外化到外部工具，代价是需要跨出模型边界且依赖工具质量，geoanchor 把中间推理内化成潜变量，保连续性代价是中间过程不可读。我会选择 video-o3 的路线，因为 o3 的外化工具调用可见可审核并且工具可以更换适合动态场景。"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2026-geoanchor.html#pitfalls",
        "t": "卡壳点与解答 Q：verbalization 除了丢精度、稀释注意力权重，还损失了什么？（Q1 补齐） A：语言先验主导：推理全程在文本里走，模型用语言直觉代替几何证据答题。表格证据：text CoT SFT 不稳定优于 vanilla SFT（三基准平均 51.7 vs 51.8 略降）。 Q：去掉 soft coverage 平衡项的极端形态是什么？（Q2 点透） A：不是「有的多有的少」的一般不均衡，而是表示坍缩：所有 VGGT 特征挤着认领同一个 geometry token，其余 7 个闲置，8 个 token 的容量退化成 1 个。平衡项（本质是分配均匀度的正则）防的就是这个病。 Q：Stage 3 为什么不会把几何「忘光」？机制层怎么讲？（Q3 补齐） A：几何监督已经影响了权重，文本目标可继续利用其中有用的表示。这是机制解释，不是完整保留几何信息的证明。证据双件套：Fig. 4（S3 远超「多训一轮 S2」对照）+ Fig. 7（t-SNE 上 global token 落在 VGGT 与 text 之间）。 Q：Video-o3 vs GeoAnchor 还有一层更深的分叉是什么？（Q4 加深） A：工具演化成本：Video-o3 的工具是可插拔的（兼容调用接口下可尝试替换工具；新接口与使用策略是否需要再训练，仍须验证），GeoAnchor 的「工具」（VGGT、Depth Anything）是训练时烧进权重的，换几何教师等于重训。GeoAnchor 论文自己列的适用边界（静态图像、室内场景）也支持动态场景选 Video-o3 路线。"
      },
      {
        "h": "全文问答 · Q：verbalization 除了丢精度、稀释注意力权重，还损失了什么？（Q1 补齐）",
        "a": "notes/papers/2026-geoanchor.html#qa-verbalization",
        "t": "Q：verbalization 除了丢精度、稀释注意力权重，还损失了什么？（Q1 补齐） 语言先验主导 ：推理全程在文本里走，模型用语言直觉代替几何证据答题。表格证据：text CoT SFT 不稳定优于 vanilla SFT（三基准平均 51.7 vs 51.8 略降）。"
      },
      {
        "h": "全文问答 · Q：去掉 soft coverage 平衡项的极端形态是什么？（Q2 点透）",
        "a": "notes/papers/2026-geoanchor.html#qa-collapse",
        "t": "Q：去掉 soft coverage 平衡项的极端形态是什么？（Q2 点透） 不是「有的多有的少」的一般不均衡，而是 表示坍缩 ：所有 VGGT 特征挤着认领同一个 geometry token，其余 7 个闲置，8 个 token 的容量退化成 1 个。平衡项（本质是分配均匀度的正则）防的就是这个病。"
      },
      {
        "h": "全文问答 · Q：Stage 3 为什么不会把几何「忘光」？机制层怎么讲？（Q3 补齐）",
        "a": "notes/papers/2026-geoanchor.html#qa-stage3",
        "t": "Q：Stage 3 为什么不会把几何「忘光」？机制层怎么讲？（Q3 补齐） 几何监督已经影响了权重，文本目标可继续利用其中有用的表示。这是机制解释，不是完整保留几何信息的证明。证据双件套：Fig. 4（S3 远超「多训一轮 S2」对照）+ Fig. 7（t-SNE 上 global token 落在 VGGT 与 text 之间）。"
      },
      {
        "h": "全文问答 · Q：Video-o3 vs GeoAnchor 还有一层更深的分叉是什么？（Q4 加深）",
        "a": "notes/papers/2026-geoanchor.html#qa-tools-vs-latent",
        "t": "Q：Video-o3 vs GeoAnchor 还有一层更深的分叉是什么？（Q4 加深） 工具演化成本 ：Video-o3 的工具是可插拔的（兼容调用接口下可尝试替换工具；新接口与使用策略是否需要再训练，仍须验证），GeoAnchor 的「工具」（VGGT、Depth Anything）是训练时烧进权重的，换几何教师等于重训。GeoAnchor 论文自己列的适用边界（静态图像、室内场景）也支持动态场景选 Video-o3 路线。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-geoanchor.html#open",
        "t": "还没搞懂 _无_：四道检验题全部通过（两处点透、两处补半句即收敛），无残留漏洞。论文自身的未解释疑问（ScanNet 有原生传感器深度为何用 Depth Anything v3 估计值做监督）记录在「结果与代价」第 3 条，属论文边界而非理解漏洞，不进 questions.md。"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-geoanchor.html#relations",
        "t": "关联 Video-o3 ： 同打破「纯文本 CoT」但方向相反：Video-o3 把中间推理外化成工具调用（裁剪放大，可见可读可人工审计，代价是跨模型边界 + 依赖工具质量 + 工具可插拔），GeoAnchor 把中间推理内化成潜变量（保连续性、零外部依赖，代价是中间过程不可读、几何教师烧进权重换教师等于重训）。本文 Related Works 2.2 自己把这两条路线对立。一条换可解释性、一条换保真度；路线对照（库内综合）：前者中间步骤可审计，后者直接表达连续量；本库没有同任务通用优劣的比较实验。 DeepSeekMath / PPO ： Stage 4 的 GRPO 是 DeepSeekMath 提出的 PPO 家族组相对变体（组内均值当 baseline、彻底丢弃 value 价值网络），本文是 GRPO 与 PPO 在空间潜变量模式选择上的下游应用锚点（Stage 4 用 GRPO + pattern reward 学自适应推理模式选择）。 LocateAnything ： 同一问题「坐标该不该言语化」在输出侧的另一面：LocateAnything 仍把框坐标写成离散 token 块（整块并行解码换效率），GeoAnchor 干脆让几何量不经过词表进连续潜空间（换保真度）。两条路线都认为逐 token 蹦坐标不行，分歧在留在词表里还是离开词表。 未来入库钩子：① 本文是库内第一篇 3D 空间推理论文，开新专题线；② 单 latent 先驱 Aurora（CVPR'25）/ SSR 入库时回链本页对照「分解 vs 单潜变量」；③ Spatial-MLLM（NeurIPS'25，frozen VGGT 当输入侧编码器）入库时对照「VGGT 当输入 vs 当监督教师」；④ SpatialLadder（ICLR'26，课程式 SFT，Abs. 距离 81.6 远超本文）入库时补「绝对距离为何 text 路线反强」这问。"
      }
    ]
  },
  {
    "id": "2024-deepseekmath",
    "type": "paper",
    "title": "DeepSeekMath",
    "href": "papers/2024-deepseekmath.html",
    "noteHref": "notes/papers/2024-deepseekmath.html",
    "sourceHref": "wiki/papers/2024-deepseekmath.md",
    "date": "2026-09-18",
    "topic": "reinforcement-learning",
    "aliases": [
      "DeepSeekMath",
      "GRPO",
      "Group Relative Policy Optimization"
    ],
    "tags": [
      "group-rl",
      "policy-gradient",
      "clipped-surrogate",
      "cot-reasoning",
      "improve-reasoning",
      "improve-training-efficiency"
    ],
    "essence": "DeepSeekMath 用数学数据预训练、监督微调和 GRPO 提升数学推理；GRPO 用同题多次作答的相对奖励代替独立 Critic。",
    "review": {
      "next": "2026-09-21",
      "last": "2026-09-18",
      "count": 0,
      "result": ""
    },
    "relations": [
      {
        "type": "prerequisite",
        "to": "2017-ppo",
        "reason": "GRPO 沿用 PPO-Clip 代理目标，去掉独立 Critic，以同题组内奖励估计优势，并外置 KL 惩罚。",
        "status": "reported"
      },
      {
        "type": "extends",
        "to": "2026-geoanchor",
        "reason": "GeoAnchor Stage 4 使用 GRPO 与 pattern reward 学习空间潜变量模式选择。",
        "status": "reported"
      },
      {
        "type": "compare",
        "to": "2026-u-opsd",
        "reason": "自投票上下文提供逐 token 蒸馏分布；GRPO 用同题采样组内的相对奖励优化策略。",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2024-deepseekmath.html#rebuild",
        "t": "PPO 通常用 Critic 估计价值基线。大语言模型再配一套价值网络，会增加显存和训练成本。GRPO 改用同一道题的一组回答作为比较基线。 同题多次作答 从旧策略采样一组回答，给每条回答打奖励分。 组内比较 用奖励减去组均值，再按组标准差归一化，得到相对优势。GRPO 因此省去独立 Critic。 更新生成概率 优势进入裁剪策略目标。参考模型的 KL 正则单独保留。 具体例子（教学假设） ：同题四个回答的奖励是 [1,1,0,0]。均值为 0.5，标准差为 0.5。忽略稳定除数后，优势是 [+1,+1,-1,-1]。这里比较的是奖励差，不只是名次。 边界 ：省掉 Critic 不等于总显存必定减半。论文中 Pass@K 的观察也只支持其特定实验下的概率重分配解释，不能证明所有 RL 都无法扩展解题能力。 换个条件看机制 四条回答全得 1 分时，组相对优势是什么？是不是整个训练目标都没有梯度？ 组相对优势全为零，策略 surrogate 部分没有这组回答的区分信号。KL 正则仍可能产生梯度，所以不能把两者混为一谈。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2024-deepseekmath.html#rebuild",
        "t": "五分钟重建 PPO 通常用 Critic 估计价值基线。大语言模型再配一套价值网络，会增加显存和训练成本。GRPO 改用同一道题的一组回答作为比较基线。 同题多次作答 从旧策略采样一组回答，给每条回答打奖励分。 组内比较 用奖励减去组均值，再按组标准差归一化，得到相对优势。GRPO 因此省去独立 Critic。 更新生成概率 优势进入裁剪策略目标。参考模型的 KL 正则单独保留。 具体例子（教学假设） ：同题四个回答的奖励是 [1,1,0,0]。均值为 0.5，标准差为 0.5。忽略稳定除数后，优势是 [+1,+1,-1,-1]。这里比较的是奖励差，不只是名次。 边界 ：省掉 Critic 不等于总显存必定减半。论文中 Pass@K 的观察也只支持其特定实验下的概率重分配解释，不能证明所有 RL 都无法扩展解题能力。 换个条件看机制 四条回答全得 1 分时，组相对优势是什么？是不是整个训练目标都没有梯度？ 组相对优势全为零，策略 surrogate 部分没有这组回答的区分信号。KL 正则仍可能产生梯度，所以不能把两者混为一谈。 可选自测 关掉提示后解释：GRPO 去掉了哪个模型？如果奖励模型还在，为什么这不矛盾？ 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 论文图解",
        "a": "notes/papers/2024-deepseekmath.html#figures",
        "t": "论文图解 开源模型在竞赛级 MATH 基准上的 Top-1 准确率 *图 1 费曼图解（论文 Figure 1）：无需外部工具与复杂投票，DeepSeekMath 7B 仅凭模型自身推理在竞赛级 MATH 上达到 51.7%，一举逼近闭源的 Gemini-Ultra 和 GPT-4，大幅拉开与以往开源模型的差距。*"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2024-deepseekmath.html#problem",
        "t": "解决什么问题 大语言模型在数学与长链逻辑推理上长期面临两大结构性瓶颈： 预训练数据来源的误区与偏见： 传统观念普遍认为数学推理能力主要来自形式化论文（如 arXiv LaTeX 源码）或高成本合成数据，而通用互联网网页（如 Common Crawl）充满噪声、缺乏深度； 但事实上单纯堆砌 arXiv 论文在 GSM8K、MATH、MMLU-STEM 等测试上提升极小甚至出现能力退化（arXiv 格式高度浓缩、符号繁复且缺少由浅入深的解题推导与讨论）；且现有高质量数学预训练集规模严重受限（如 Minerva 网页数据仅约 17B tokens）。 强化学习（PPO）在大模型推理对齐时的资源与估计瓶颈： 显存开销巨大：传统 PPO 是典型的 Actor-Critic 结构，除了策略模型（Actor）和参考模型（Ref），还必须在显存中维护一个同等参数量级的价值模型（Critic），导致训练显存占用翻倍，限制了模型尺寸与上下文长度； 稀疏奖励与逐 token 价值估计的矛盾：数学题通常只有在完整推导结束时才能检验最终答案的对错（Outcome Supervision）。让 Critic 模型去预测长链推理中每一个中间 token 的绝对期望收益 $V(s_t)$，不仅拟合极其困难，而且估计方差巨大、噪声极高； 离线微调（RFT / DPO）缺乏动态探索与惩罚机制：拒绝采样微调（RFT）只挑选旧模型碰巧做对的样本做 SFT，不仅无法惩罚做错的路径，而且脱离了模型参数更新后的在线探索；DPO 则难以处理多步复杂推理中的动态长轨迹探索。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2024-deepseekmath.html#intuition",
        "t": "大白话讲解 类比：开除特聘名师，改成班级自评 传统 PPO 的做法：请了一位极其昂贵的特聘名师（Critic 价值模型）。学生（Actor）每写下一个公式、每推导一步，名师都必须在旁边打一个绝对预估分（估算当前状态的长期期望回报 $V(s_t)$）。 痛点：雇名师的开销（显存）跟学生自己一样大；而且题目还没做完前，名师往往也只能瞎猜，打出来的中间分噪声极大，反而带偏了学生。 GRPO 的做法：把特聘名师直接开除。面对同一道数学难题，让学生自己连续做 64 遍（生成 $G=64$ 份不同的解题草稿）。 做完后，判卷人（规则或奖励模型）给每份草稿评一个最终分数。 计算这 64 份草稿的平均分与标准差； 高于平均分的草稿算「优秀变体」，赋予正优势值（向此轨迹学习）；低于平均分的草稿算「劣质变体」，赋予负优势值（抑制该推导路径）； 用组内相对排名代替绝对打分，省去独立 Critic 的成本，并以组内相对奖励减少对绝对价值基线的依赖；总体显存收益取决于实现，奖励噪声仍会保留。 PPO 与 GRPO 架构对比 *图 2 费曼图解（论文 Figure 4）：PPO（左）需要同时加载策略、参考、奖励以及庞大的价值模型（Value Model），通过 GAE 逐 token 计算优势；GRPO（右）彻底丢弃价值模型，同一个问题采样 $G$ 个候选回答，利用组内平均与标准差归一化直接得到相对优势，省去独立价值网络的成本；总体显存收益取决于实现。*"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2024-deepseekmath.html#mechanism",
        "t": "关键机制 1. 从 PPO 到 GRPO 的目标函数重构 传统 PPO 将 token 级的 KL 散度直接塞入奖励函数中（$r_t - \\beta \\log \\frac{\\pi_\\theta}{\\pi_{ref}}$），导致价值模型还需要额外拟合策略漂移惩罚。GRPO 彻底理清这一结构，将 KL 散度独立移入损失函数外层，形式如下： $$\\mathcal{J}_{GRPO}(\\theta) = \\mathbb{E}\\left[ q \\sim \\mathcal{P}(Q), \\{o_i\\}_{i=1}^G \\sim \\pi_{\\theta_{old}}(O q) \\right] \\frac{1}{G}\\sum_{i=1}^G \\frac{1}{ o_i }\\sum_{t=1}^{ o_i } \\left[ \\min\\left( \\frac{\\pi_\\theta(o_{i,t})}{\\pi_{\\theta_{old}}(o_{i,t})}\\hat{A}_{i,t}, \\text{clip}\\left(\\frac{\\pi_\\theta(o_{i,t})}{\\pi_{\\theta_{old}}(o_{i,t})}, 1-\\varepsilon, 1+\\varepsilon\\right)\\hat{A}_{i,t} \\right) - \\beta D_{KL}(\\pi_\\theta \\parallel \\pi_{ref}) \\right]$$ 其中采用 Schulman (2020) 提出的非负无偏 KL 散度估计器： $$D_{KL}(\\pi_\\theta \\parallel \\pi_{ref}) = \\frac{\\pi_{ref}(o_{i,t})}{\\pi_\\theta(o_{i,t})} - \\log \\frac{\\pi_{ref}(o_{i,t})}{\\pi_\\theta(o_{i,t})} - 1$$ 2. 优势函数估计（Advantage Estimation） 对于输入问题 $q$，采样一组输出 $\\{o_1, \\dots, o_G\\}$，得到各输出的得分 $\\{r_1, \\dots, r_G\\}$： 结果监督（Outcome Supervision, OS）： 若仅在回答末尾打分（如规则判定最终数值答案对错，对=1，错=0），将整个组内的得分做标准化： $$\\tilde{r}_i = \\frac{r_i - \\text{mean}(\\mathbf{r})}{\\text{std}(\\mathbf{r})}$$ 该输出轨迹上的所有 token 共享相同的优势值：$\\hat{A}_{i,t} = \\tilde{r}_i$。 过程监督（Process Supervision, PS）： 若配备过程奖励模型（PRM）对推导步骤打分，第 $i$ 个输出的第 $j$ 步得分归一化为 $\\tilde{r}_{i}^{(j)}$，则 token $t$ 的优势值为其后续各步骤归一化得分的前向累加： $$\\hat{A}_{i,t} = \\sum_{\\text{step } j \\ge t} \\tilde{r}_{i}^{(j)}$$ 3. 统一梯度范式：统一理解 SFT、RFT、DPO、PPO 与 GRPO 论文在参数梯度更新的宏观框架下给出了统一表达式： $$\\nabla_\\theta \\mathcal{J}(\\theta) = \\mathbb{E}_{(q, o) \\sim \\mathcal{D}} \\left[ \\frac{1}{ o }\\sum_{t=1}^{ o } GC(q, o, t, \\pi_{rf}) \\cdot \\nabla_\\theta \\log \\pi_\\theta(o_t q, o_{<t}) \\right]$$ 任何对齐算法均由三个要素决定：数据源 $\\mathcal{D}$（离线 vs 在线）、奖励函数 $\\pi_{rf}$（规则 vs 模型）、梯度系数 $GC$（如何把信号映射为更新步长）。 算法 数据源 $\\mathcal{D}$ 奖励形式 梯度系数 $GC$ 特点 本质缺陷 / 优势 --- --- --- --- --- SFT 离线人类标注 无 恒等于 $1$ 只能盲目拟合演示数据，无探索 RFT 离线 $\\pi_{sft}$ 采样 规则（答对/错） 答对为 $1$，答错为 $0$ 只有正向更新，不惩罚错误，无在线探索 DPO 离线 $\\pi_{sft}$ 采样对 成对偏好/规则 基于隐式奖励的 Sigmoid 权重 离线数据，随模型变强后无法产生新分布难例 Online RFT 在线 $\\pi_\\theta$ 采样 规则（答对/错） 答对为 $1$，答错为 $0$ 有在线探索，但依然无负向梯度惩罚 PPO 在线 $\\pi_\\theta$ 采样 奖励模型 + Critic 逐 token GAE 优势值 $A_t$ 在线探索 + 动态正负梯度，但 Critic 显存沉重 GRPO 在线 $\\pi_\\theta$ 组采样 奖励模型 / 规则 组内标准化相对优势 $\\hat{A}_{i,t}$ 在线探索 + 动态正负梯度 + 零 Critic 显存开销 Common Crawl 数学网页挖掘流水线 *图 3 费曼图解（论文 Figure 2）：DeepSeekMath 数据挖掘引擎：以 OpenWebMath 为种子训练 FastText 分类器，从 40B 去重网页中召回数学候选页，再通过域名与 URL 路径分析迭代扩充高质量域名，最终沉淀出 120B token 的 DeepSeekMath Corpus。* 4. 预训练基座与数据发现 代码基座的数学迁移力：以代码模型 DeepSeek-Coder-Base-v1.5 7B 作为初始化，在数学评测上全方位压倒直接以通用语言模型初始化的版本，验证了“代码训练能显著强化结构化逻辑推理”的假说； arXiv 数据迷思破除：在 1.3B 和 7B 模型上，仅用 arXiv 论文训练均未见数学推理能力提升，甚至轻微下降；而 Common Crawl 中清洗出的论坛讨论（如 MathOverflow）、教学博客、问答等含有更丰富直白的人类思维过程。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2024-deepseekmath.html#evidence",
        "t": "结果与代价 1. 评测表现 MATH 基准：DeepSeekMath 7B 在无外挂代码解释器、无多数投票的单次生成（Top-1）下达到 51.7%，超过闭源的 Gemini Pro（32.6%）与 540B 的 Minerva（33.6%），逼近 GPT-4（52.9%）； 自一致性投票（Maj@64）：在 64 次采样投票下，MATH 准确率进一步跃升至 60.9%； 中文数学泛化：CMATH 达到 88.8%，大幅领先同期开源模型。 Maj@K 与 Pass@K 对比 *图 4 费曼图解（论文 Figure 7）：核心洞察：经过 GRPO 强化学习后，Maj@K（多数投票准确率）随着 K 显著上移；但 Pass@K（覆盖上限）曲线几乎与 SFT 模型完全重叠。该实验支持 GRPO 在这里主要重塑采样分布、提高已有正确解的采样概率；不是所有 RL 的普遍边界。* 2. 强化学习的真相：Pass@K vs Maj@K 的深层启示 论文在第 5.2.2 节给出了极为深刻的实验发现： Pass@K 几乎没变：这是论文特定模型、数据与有限 K 下的观察。有限次未采到正确解，不等于其概率严格为零，也不能推出所有题在 RL 后仍必然答不对； Maj@K 和 Top-1 大幅提升：RL 将原本隐藏在采样分布长尾里的 1% 正确解法，通过正负相对优势的梯度引导，集中搬运到了 Top 区域，显著收窄了输出方差，消除了逻辑幻觉。 3. 代价与局限性 零方差失效边界：若采样组对难题全错（均为 0）或对送分题全对（均为 1），组内标准差 $\\text{std}(\\mathbf{r}) \\to 0$，相对优势归零，无法提供梯度更新信号。训练必须依赖难度匹配且具备区分度的题目集； 几何与形式化证明短板：因纯文本预训练与网页数据偏差，模型在涉及三角形、椭圆等连续空间几何图形的感知与推导上显著弱于通用超大模型； Few-shot 上限受限于 7B 参数量：相比 GPT-4 随提示词示例数增加准确率明显上升，7B 尺度的 DeepSeekMath 在 Few-shot 与 Zero-shot 之间提升不明显。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2024-deepseekmath.html#ai-notes",
        "t": "AI 预读备注 Zotero AI Butler 预读笔记 8CYDI7ER（AI 总结）与 RK4Y6U8L（文献表格）提供了完整的架构提炼与背景梳理。经费曼核验，对 AI 预读补充两处关键盲点： AI 预读漏检 Pass@K 的本质结论：AI 总结仅列举了 GSM8K 和 MATH 的绝对涨分，遗漏了论文第 5.2.2 节 Figure 7 揭示的「Pass@K 恒定、Maj@K 飙升」的核心理论发现（RL 究竟改变了能力还是改变了分布）； 统一梯度系数框架的深化：AI 预读将 GRPO 视作孤立算法，缺少了原论文 Appendix A.1 将 SFT/RFT/DPO/PPO/GRPO 统一为 $GC$ 梯度系数对比的宏观视角。本笔记已予全量补齐。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2024-deepseekmath.html#restatement",
        "t": "我的复述 *费曼检验时 XinLi 自己的原话：* 对同一个问题，rollout G 遍，然后计算他们 reward 的均值和标准差，接着用均值和标准差标准化 reward 得到优势， 高于均值的轨迹得到正优势低于均值的负优势。 LLM 通常只有到最后才能确认对错，仅有末尾奖励的时候对中间 token 绝对期望方差大噪声高。 相对优势差为 0，该样本不产生梯度，这意味着 GRPO 极度依赖有区分度的题目；完全不会的题和闭眼都会的题在 RL 阶段不提供有效优化信号。而 PPO 由于有 critic 模型的存在，即使最后结果全对或全错但还是有中间 token 的区分度还是有梯度的。 当前的强化学习并没有教模型学会原本在知识盲区里的新定理，而是重塑了输出分布：把分布中那 1% 零星被采到的正确答案推成高概率候选，抑制错误的幻觉路径。"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2024-deepseekmath.html#pitfalls",
        "t": "卡壳点与解答 Q1：为什么丢弃 Critic 改用组相对打分，不仅省显存，而且天然契合奖励模型的本质？ 解答： 显存层面：LLM 的强化学习中，Critic 网络通常需要拥有与策略模型（Actor）相同的参数量与嵌入维度才能准确表征上下文价值，丢弃独立 Critic 可省去其参数、优化器与反向图成本；总显存节省比例取决于训练栈，不必定为一半； 建模稳定性：在数学等长链推理中，奖励通常是延迟到结尾的稀疏二值信号（对/错）。Critic 强行去预测每个 token 的绝对长期价值 $V(s_t)$，噪声极高且极易过拟合； 契合 RM 训练范式：主流奖励模型（Reward Model）是通过成对比较数据（Pairwise Preference，如 Bradley-Terry 目标）训练出来的。它天生擅长的是在同一个 Prompt 下给不同候选回答排序（相对大小），而不是输出具有绝对物理意义的校准标量。GRPO 的组内均值中心化与方差标准化，恰好顺应了奖励模型的比较本质。 Q2：在 Outcome 模式下全对或全错时，GRPO 与传统 PPO 的梯度行为有何不同？ 解答： GRPO 的行为：当 64 个回答全为 0 分或全为 1 分时，分子 $(r_i - \\text{mean}(\\mathbf{r})) = 0$，且标准差 $\\text{std}(\\mathbf{r}) \\to 0$（加微小常数 $\\epsilon_{div}$ 防止除零），归一化后的优势值 $\\hat{A}_{i,t} \\equiv 0$。策略梯度的 surrogate 部分完全消失，只剩下策略与参考模型间的 KL 正则惩罚项。因此，完全做不对的超级难题或闭眼都能做对的白给题，在 GRPO 阶段几乎不贡献策略探索的有效梯度； 传统 PPO 的对比：PPO 维护了独立的价值网络 $V(s_t)$。即使最终的回报全部为 0，只要每一步的状态估计 $V(s_t)$ 不为 0，就会计算出非零的 TD 误差（$r_t + \\gamma V(s_{t+1}) - V(s_t)$），从而强行产生梯度。但由于这种梯度建立在稀疏末端奖励的噪声估计之上，反而容易带来虚假的策略漂移破坏已有能力。 Q3：如何看待「Pass@K 几乎没变，Maj@K 大幅跃升」这一现象？ 解答： 先按论文 Figure 7 的范围读：其模型、数据与有限采样 K 下，Maj@K 提高而 Pass@K 变化较小。它支持该实验主要提高已有正确解的采样概率。有限 K 次没采到，不等于正确解的概率严格为零，也不能证明任意 RL 都无法形成新能力。 教学类比：若正确路径原本占较小概率，GRPO 可以让它更容易被采到；“搬运概率质量”说明这一种改进方式，不是一条覆盖所有 RL 的定律。"
      },
      {
        "h": "全文问答 · Q1：为什么丢弃 Critic 改用组相对打分，不仅省显存，而且天然契合奖励模型的本质？",
        "a": "notes/papers/2024-deepseekmath.html#qa-grpo-advantage",
        "t": "Q1：为什么丢弃 Critic 改用组相对打分，不仅省显存，而且天然契合奖励模型的本质？ 解答 ： 显存层面 ：LLM 的强化学习中，Critic 网络通常需要拥有与策略模型（Actor）相同的参数量与嵌入维度才能准确表征上下文价值，丢弃独立 Critic 可省去其参数、优化器与反向图成本；总显存节省比例取决于训练栈，不必定为一半； 建模稳定性 ：在数学等长链推理中，奖励通常是延迟到结尾的稀疏二值信号（对/错）。Critic 强行去预测每个 token 的绝对长期价值 $V(s_t)$ ，噪声极高且极易过拟合； 契合 RM 训练范式 ：主流奖励模型（Reward Model）是通过成对比较数据（Pairwise Preference，如 Bradley-Terry 目标）训练出来的。它天生擅长的是 在同一个 Prompt 下给不同候选回答排序 （相对大小），而不是输出具有绝对物理意义的校准标量。GRPO 的组内均值中心化与方差标准化，恰好顺应了奖励模型的比较本质。"
      },
      {
        "h": "全文问答 · Q2：在 Outcome 模式下全对或全错时，GRPO 与传统 PPO 的梯度行为有何不同？",
        "a": "notes/papers/2024-deepseekmath.html#qa-zero-variance",
        "t": "Q2：在 Outcome 模式下全对或全错时，GRPO 与传统 PPO 的梯度行为有何不同？ 解答 ： GRPO 的行为 ：当 64 个回答全为 0 分或全为 1 分时，分子 $(r_i - \\text{mean}(\\mathbf{r})) = 0$ ，且标准差 $\\text{std}(\\mathbf{r}) \\to 0$ （加微小常数 $\\epsilon_{div}$ 防止除零），归一化后的优势值 $\\hat{A}_{i,t} \\equiv 0$ 。策略梯度的 surrogate 部分完全消失，只剩下策略与参考模型间的 KL 正则惩罚项。因此， 完全做不对的超级难题或闭眼都能做对的白给题，在 GRPO 阶段几乎不贡献策略探索的有效梯度 ； 传统 PPO 的对比 ：PPO 维护了独立的价值网络 $V(s_t)$ 。即使最终的回报全部为 0，只要每一步的状态估计 $V(s_t)$ 不为 0，就会计算出非零的 TD 误差（ $r_t + \\gamma V(s_{t+1}) - V(s_t)$ ），从而强行产生梯度。但由于这种梯度建立在稀疏末端奖励的噪声估计之上，反而容易带来虚假的策略漂移破坏已有能力。"
      },
      {
        "h": "全文问答 · Q3：如何看待「Pass@K 几乎没变，Maj@K 大幅跃升」这一现象？",
        "a": "notes/papers/2024-deepseekmath.html#qa-passk-essence",
        "t": "Q3：如何看待「Pass@K 几乎没变，Maj@K 大幅跃升」这一现象？ 解答 ： 先按论文 Figure 7 的范围读：其模型、数据与有限采样 K 下，Maj@K 提高而 Pass@K 变化较小。它支持该实验主要提高已有正确解的采样概率。有限 K 次没采到，不等于正确解的概率严格为零，也不能证明任意 RL 都无法形成新能力。 教学类比：若正确路径原本占较小概率，GRPO 可以让它更容易被采到；“搬运概率质量”说明这一种改进方式，不是一条覆盖所有 RL 的定律。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2024-deepseekmath.html#open",
        "t": "还没搞懂 *费曼检验三题已全部闭环，无残留疑问。*"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2024-deepseekmath.html#relations",
        "t": "关联 DAPO ： GRPO 在长思维链（Long-CoT）下的直接工业级演进：针对朴素 GRPO 在长逻辑场景下暴露的四大病根（对称裁剪导致的熵坍缩、全对/全错样本造成的有效批次萎缩、样本级平均导致的长度被稀释、超长硬截断噪声），提出非对称 Clip-Higher、动态重采样、Token-level 损失与软惩罚，将 Qwen2.5-32B 在 AIME 2024 上拉升至 50 分。 PPO ： GRPO 的直接理论前身：继承了重要性采样裁剪目标（Clipped Surrogate Objective）以防止策略过激更新，但 GRPO 彻底剪除了 Critic 模型与 GAE，改用组内相对优势估计，并将 KL 惩罚从奖励解耦到外层损失。 GeoAnchor ： 空间推理下游应用：GeoAnchor 在第四阶段强化学习中，直接采用了 GRPO + pattern reward 算法来端到端优化模型对不同空间潜变量模式的选择策略。 U-OPSD ： 自生成监督的另一演进路线：U-OPSD 是在自蒸馏训练阶段通过采样 8 遍做多数投票构建伪解教师进行前向 KL 蒸馏，而 GRPO 是直接在在线采样组内用相对奖励计算优势进行策略梯度强化。 S²VOPD ： 零特权自对齐：探讨在无外部高阶标注的前提下，如何通过模型自身的多视角/多采样构建不对称信息差进行能力对齐。"
      }
    ]
  },
  {
    "id": "2025-dapo",
    "type": "paper",
    "title": "DAPO",
    "href": "papers/2025-dapo.html",
    "noteHref": "notes/papers/2025-dapo.html",
    "sourceHref": "wiki/papers/2025-dapo.md",
    "date": "2026-09-19",
    "topic": "reinforcement-learning",
    "aliases": [
      "DAPO",
      "Decoupled Clip",
      "Dynamic Sampling Policy Optimization"
    ],
    "tags": [
      "group-rl",
      "policy-gradient",
      "clipped-surrogate",
      "cot-reasoning",
      "improve-reasoning",
      "improve-stability",
      "improve-training-efficiency"
    ],
    "essence": "DAPO 用四项改动改善长推理 RL：保住探索、补充有区分的题、按 token 分配损失权重，并缓和接近长度上限时的惩罚。",
    "review": {
      "next": "2026-09-22",
      "last": "2026-09-19",
      "count": 0,
      "result": ""
    },
    "relations": [
      {
        "type": "extends",
        "to": "2024-deepseekmath",
        "reason": "沿 GRPO 长推理训练路线，改造裁剪、题目采样、token 聚合与超长惩罚；收益来自论文的实验设置。",
        "status": "reported"
      },
      {
        "type": "prerequisite",
        "to": "2017-ppo",
        "reason": "Clip-Higher 放宽正优势方向的裁剪阈值；它调整目标平台，不是硬概率限制。",
        "status": "reported"
      },
      {
        "type": "compare",
        "to": "2026-open-mopd",
        "reason": "两篇都调整按 token 聚合时的预算倾斜；DAPO 关注回答长度，Open-MOPD 关注不同教师域。",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "papers/2025-dapo.html#rebuild",
        "t": "长推理 RL 容易很快失去探索，也容易把更新浪费在全对或全错的题上。回答长度不同，还会改变每个 token 在损失里的权重。DAPO 分别处理这些问题。 保住探索空间 Clip-Higher 放宽正优势方向的上侧裁剪阈值。它修改目标激励，不是硬性扩大概率允许区间。 补充有区分的题 Dynamic Sampling 过滤组内奖励无差异的题，继续采样，直到有效训练批次补满。 按 token 聚合 Token-Level Loss 用全批有效 token 总数归一化。Soft Overlong Punishment 在接近长度上限时逐渐扣分。 具体例子（教学假设） ：短回答 2 个 token，长回答 6 个 token。逐回答平均会让每个短 token 的聚合权重为 1/4、每个长 token 为 1/12；全批 token 平均时，每个 token 都是 1/8。此处只比较归一化权重。 边界 ：序列奖励不证明长回答的每个 token 都正确。动态采样需要额外 rollout；减少更新步数，也不自动保证所有机器上的墙钟时间减半。 换个条件看机制 把上侧 epsilon 从 0.2 改为 0.28，是把所有 r 强制锁在 [0.8,1.28] 吗？ 不是。对正优势样本，目标沿提高概率的方向更晚变平。负优势样本概率错误增大时，min 仍可选择未裁剪项。实际概率也会受其他样本和损失影响。"
      },
      {
        "h": "全文 · 五分钟重建",
        "a": "notes/papers/2025-dapo.html#rebuild",
        "t": "五分钟重建 长推理 RL 容易很快失去探索，也容易把更新浪费在全对或全错的题上。回答长度不同，还会改变每个 token 在损失里的权重。DAPO 分别处理这些问题。 保住探索空间 Clip-Higher 放宽正优势方向的上侧裁剪阈值。它修改目标激励，不是硬性扩大概率允许区间。 补充有区分的题 Dynamic Sampling 过滤组内奖励无差异的题，继续采样，直到有效训练批次补满。 按 token 聚合 Token-Level Loss 用全批有效 token 总数归一化。Soft Overlong Punishment 在接近长度上限时逐渐扣分。 具体例子（教学假设） ：短回答 2 个 token，长回答 6 个 token。逐回答平均会让每个短 token 的聚合权重为 1/4、每个长 token 为 1/12；全批 token 平均时，每个 token 都是 1/8。此处只比较归一化权重。 边界 ：序列奖励不证明长回答的每个 token 都正确。动态采样需要额外 rollout；减少更新步数，也不自动保证所有机器上的墙钟时间减半。 换个条件看机制 把上侧 epsilon 从 0.2 改为 0.28，是把所有 r 强制锁在 [0.8,1.28] 吗？ 不是。对正优势样本，目标沿提高概率的方向更晚变平。负优势样本概率错误增大时，min 仍可选择未裁剪项。实际概率也会受其他样本和损失影响。 可选自测 关掉提示后解释：动态采样与 token 平均分别解决哪种浪费？为什么不能用其中一个代替另一个？ 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。"
      },
      {
        "h": "全文 · 论文图解",
        "a": "notes/papers/2025-dapo.html#figures",
        "t": "论文图解 DAPO 在 AIME 2024 上相比 DeepSeek-R1-Zero 的性能与收敛曲线 *图 1 费曼图解（论文 Figure 1）：在 Qwen2.5-32B 基座上，DAPO 仅用 50% 的梯度更新步数就从 0 分跃升至 50 分（avg@32），不仅大幅超越朴素 GRPO 基线的 30 分，亦超越了闭源报告的 DeepSeek-R1-Zero-Qwen-32B（47 分）。*"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2025-dapo.html#problem",
        "t": "解决什么问题 在 OpenAI o1 与 DeepSeek-R1 引爆推理时间缩放（Test-time Scaling）革命后，开源社区在复现长思考链强化学习（Long-CoT RL）时普遍遭遇断崖式挫败：直接在 Qwen2.5-32B 基座上跑朴素 GRPO 仅能取得 30 分，远落后于官方报告的 47 分。深层原因在于开源报告隐藏了关键工程细节，导致大规模长推理 RL 训练深陷四大暗礁： 探索动力快速衰竭：熵坍缩（Entropy Collapse）： 传统 PPO/GRPO 使用对称的裁剪区间（$\\epsilon = 0.2$，即 $r_t \\in [0.8, 1.2]$）； 在长思维链探索中，关键的推导转折与创新解法在训练初期概率极低，理应成倍放大其发生概率；但上限锁死在 1.2 严重压制了低概率正确 token 的增长，而下界 0.8 却在不断抑制错误 token，导致策略熵呈断崖式下跌。模型迅速丧失探索新解法的勇气，陷入保守僵化。 有效梯度大幅稀释：全对/全错零优势题目吞噬有效 Batch Size： GRPO 依赖同题组内均值计算优势，若一组 16 个采样回答全部做对或全部做错，组内优势 $\\hat{A}_{i,t} \\equiv 0$，该题产生的梯度为零； 随着模型变聪明，全对题目的比例从 10% 飙升到 60% 以上。固定 Batch 内绝大多数题目沦为放空炮的“僵尸样本”，有效批次大小急剧缩水，梯度方差与噪声激增。 样本级归一化的长度扭曲：长逻辑被稀释，复读废话却不受罚： 朴素 GRPO 采用样本级归一化（先在单样本内除以长度 $ o_i $，再求样本间均值）； 导致一篇长达 16,000 token 的精妙长证明，每个 token 分摊到的梯度权重仅为 500 token 短解法的 $1/32$，优质逻辑无法被充分强化； 反过来，若模型出现病态复读与胡言乱语导致长度激增，负优势同样被庞大的长度分母稀释，模型得不到应有的惩罚，导致输出长度与无意义熵失控膨胀。 超长截断样本的粗暴硬惩罚引入严重假负例噪声： 为防止显存爆炸通常设有最大生成长度（如 16K）。若对所有未完成截断的样本直接按做错打 $-1$ 惩罚，会误伤那些正在进行正确严密论证、仅差最后一步收尾的高质量思考，混淆策略模型的学习信号。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2025-dapo.html#intuition",
        "t": "大白话讲解 类比：给重装长跑选手打上四块「护手霜」 在只有几百字的短问答里，GRPO 就像穿轻便跑鞋在操场慢跑，小修小补就能跑通；但当任务变成 20,000 字竞赛级高强度长跑（Long-CoT 极长推导）时，旧机制的关节就会全部卡死。DAPO 为选手装上了四块关键护具： 护具一：向上放开剪刀口（Clip-Higher）： 对正优势样本，目标在 r 超过 1.2 后原本就不再增加分数；提高上侧阈值到 1.28，让该方向更晚变平。下侧阈值仍为 0.8。实际概率比没有被硬锁在这些边界内。这样模型才敢尝试原本想都不敢想的新思路，策略熵不会快速枯竭。 护具二：扔掉没区分度的试卷并动态补齐（Dynamic Sampling）： 班级自评必须有差异才能学到东西。如果一整组草稿要么全部做对、要么全部瞎蒙做错，这道题大家水平一样，算不出任何排名分（优势恒为零）。以前就把这些白卷硬混在作业本里滥竽充数；现在要求：只要全对或全错，当场把这题扔进废纸篓，重新换新题做，直到凑齐一个全部都有正负区分度的黄金题库才开工。 护具三：按字算账，取消字数大锅饭（Token-level Loss）： 以前一篇文章算一份工钱，长文章除以字数后每个字变得极度廉价；短文章每个字极度值钱。现在改成字数统筹：不管写在长篇大作还是简短回答里，每一个好字给相同的正分，每一个废话字给相同的扣分。写得长且严谨就拿大奖，胡言乱语注水就按字重罚。 护具四：终点线前设缓冲带（Soft Overlong Punishment）： 以前到 16,000 字没写完立马当场枪毙（打 -1 判负）。现在在 16K 到 20K 之间铺设一条软垫子，超时越多扣分线性递增，只有冲过 20K 极限才彻底判负，给正规论证的收尾留足喘息时间。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2025-dapo.html#mechanism",
        "t": "关键机制 1. 非对称解耦裁剪（Clip-Higher）：抑制熵坍缩 DAPO 打破了强化学习数年来的对称裁剪传统，将上界与下界解耦： $$\\text{clip}(r_t(\\theta), 1 - \\varepsilon_{low}, 1 + \\varepsilon_{high})$$ 其中将下界保持为 $\\varepsilon_{low} = 0.2$（保留下侧裁剪阈值，不代表概率被硬性锁在边界内），而将上界放宽至 $\\varepsilon_{high} = 0.28$。 Clip-Higher 对 AIME 准确率与策略熵的改善 *图 2 费曼图解（论文 Figure 2）：(a) AIME 准确率随训练显著提升；(b) 策略模型生成熵对比：无 Clip-Higher 时熵在 1000 步内急剧暴跌（熵坍缩），而引入 Clip-Higher 后策略熵平稳保持在健康区间，模型探索活力得以持续维系。* 2. 动态采样（Dynamic Sampling）：剔除零梯度样本 在训练流程中设立动态缓冲池（Dynamic Sampling Buffer）。对于每个采样题目 $q$ 生成的 $G$ 个候选回答 $\\{o_i\\}_{i=1}^G$，只有满足以下非平凡条件的题目才被允许进入反向传播批次： $$0 < \\sum_{i=1}^G \\mathbb{I}(\\text{is\\_equivalent}(a, o_i)) < G$$ 机制逻辑：若准确率为 0（全错）或 1（全对），在相对优势公式 $\\hat{A}_{i,t} = \\frac{R_i - \\text{mean}(\\mathbf{R})}{\\text{std}(\\mathbf{R})}$ 中分子或标准差归零，整道题产生零有效梯度。 动态补满：系统持续异步采样，直到批次完全由具备正负对比信号的有效题目填满后才执行参数更新。虽然采样量增加，但由于并行 rollout 耗时通常被最长长尾样本阻塞，且每个更新步均为 $100\\%$ 高质量信息更新，总收敛步数减少一半，论文报告整体训练更高效；额外采样仍有成本，更新步数的减少不能单独保证所有机器的墙钟时间更短。 3. 逐 Token 策略梯度损失（Token-Level Policy Gradient Loss） 重构多样本与多步骤的累加归约顺序： 朴素 GRPO（样本级归约）：$\\mathbb{E}\\left[ \\frac{1}{G}\\sum_{i=1}^G \\frac{1}{ o_i }\\sum_{t=1}^{ o_i } L_{clip} \\right]$（各样本权重平等，长样本 token 被除以更大分母 $ o_i $）； DAPO（Token 级归约）： $$\\mathcal{J}_{DAPO}(\\theta) = \\mathbb{E}\\left[ \\frac{1}{\\sum_{i=1}^G o_i } \\sum_{i=1}^G \\sum_{t=1}^{ o_i } \\min\\left( r_{i,t}(\\theta)\\hat{A}_{i,t}, \\text{clip}(r_{i,t}(\\theta), 1-\\varepsilon_{low}, 1+\\varepsilon_{high})\\hat{A}_{i,t} \\right) \\right]$$ Token-level 损失对生成熵与平均响应长度的控制 *图 3 费曼图解（论文 Figure 4）：无 Token-level 损失时，样本级归一化对长篇复读废话惩罚不足，导致生成熵畸高（异常混乱）且输出长度恶性膨胀；Token-level 损失通过字字均等计责，使策略熵维持在正常收敛轨迹，响应长度以健康节奏平稳增长。* 4. 软超长奖励塑形（Soft Overlong Punishment） 在预设的目标最大长度 $L_{max} - L_{cache} = 16,384$ 与显存硬截断上限 $L_{max} = 20,480$ 之间引入线性衰减惩罚函数： $$R_{length}(y) = \\begin{cases} 0, & y \\le L_{max} - L_{cache} \\\\ \\frac{(L_{max} - L_{cache}) - y }{L_{cache}}, & L_{max} - L_{cache} < y \\le L_{max} \\\\ -1, & L_{max} < y \\end{cases}$$ 最终奖励由正确性奖励与长度软惩罚相加：$R = R_{rule} + R_{length}$。平滑过渡带消除了截断假负例噪声对高质量长思考的无端打击。 超长样本过滤对 AIME 性能与熵的稳定作用 *图 4 费曼图解（论文 Figure 5）：对比超长直接打 -1 带来的训练剧烈震荡，过滤/软化截断样本使 AIME 2024 得分稳步拉升至 35%+，彻底消除了假负例噪声引发的认知混乱。* 5. 整数标准化数据集：DAPO-Math-17K 数学答案的形式多样（如分数、根号、代数式 $a+\\frac{\\sqrt{b}}{c}$）极易导致规则判卷器出现解析误判（Reward Hacking 或假错判）。DAPO 启发自 AIME 竞赛规范，通过 CoT 提示词指导 LLM 将题目重新改写为要求输出整数（例如将求 $a+\\frac{\\sqrt{b}}{c}$ 改写为求 $a+b+c$），构建了包含 17K 题目且完全由纯整数答案验证的 DAPO-Math-17K，减少答案解析歧义；规则验证仍依赖题目改写与答案标注正确。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2025-dapo.html#evidence",
        "t": "结果与代价 1. 递进消融实验数据（Qwen2.5-32B 基座） 在竞赛级 AIME 2024 测试基准（avg@32）上的技术叠加贡献： 算法与技术配置 AIME 2024 得分 (avg@32) 相比上一步增益 解决的核心痛点 --- --- --- --- 朴素 GRPO 基线 30.0 - 存在严重熵坍缩与样本衰减 + Overlong Filtering（超长截断过滤） 36.0 +6.0 消除未写完高质量样本的假惩罚噪声 + Clip-Higher（解耦裁剪上界 0.28） 38.0 +2.0 遏制策略熵暴跌，维持长期探索活力 + Soft Overlong Punishment（软过渡惩罚） 41.0 +3.0 线性惩罚代替硬切断，兼顾长度控制与完整性 + Token-level Loss（逐 token 损失归约） 42.0 +1.0 提高长逻辑学习权重，压制复读膨胀 + Dynamic Sampling（DAPO 全套系统） 50.0 +8.0 剔除全对/全错零梯度题，每步均为高信噪比有效更新 *参考对比：DeepSeek-R1-Zero-Qwen-32B* 47.0 - 官方闭源报告成绩（DAPO 步数仅需其 50%） 2. 涌现能力与反思行为 在经过充足步数的强化学习后，模型在不依赖任何 SFT 人类反思演示的前提下，自发涌现出了自主反思（Self-reflection）与多角度重算行为（如在四面体几何求体积中途出现：“*Wait a moment, let's rethink about the dihedral angle involving planes in a more thoughtful geometric way...*”），验证了纯规则 RL 在大模型长思维链上的自主演进力量。 3. 代价与局限性 Rollout 采样算力开销略增：动态采样需要过滤掉全对/全错样本，在训练后期（模型变聪明后）需要比静态批次采样更多的环境生成交互，对推理引擎（如 vLLM / SGLang）的高并发与批处理吞吐提出了更高要求； 任务形式依赖纯净的规则判定：DAPO-Math-17K 的成功高度依赖“将复杂数学改写为整数答案”的数据工程，在难以自动化精准判对错的开放式任务（如创意写作、代码架构设计）中较难直接套用。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2025-dapo.html#ai-notes",
        "t": "AI 预读备注 Zotero AI Butler 预读笔记 NXVAD9J7 提取了长篇目录和分段概述。经费曼校验，对 AI 预读提炼并补齐三处核心技术深度： 明确 Dynamic Sampling 的收敛效率反直觉因果：AI 笔记仅描述了动态采样的流程，遗漏了“为什么额外采样了样本，整体训练反而因梯度方差减小而收敛更快（墙钟时间更短）”的系统级深层因果； 公式维度的损失归约重构：将 Sample-level 与 Token-level Loss 的分母位置改变（将除以 $ o_i $ 移至外层除以总 token 数 $\\sum o_i $）彻底公式化呈现； Clip-Higher 解决熵坍缩的非对称机制：清晰梳理为何只抬高上界（$\\epsilon_{high}=0.28$）而不放松下界（保持 $\\epsilon_{low}=0.2$）的保护逻辑。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2025-dapo.html#restatement",
        "t": "我的复述 *费曼检验时 XinLi 自己的原话：* 训练后期原本概率极低的长尾 token（通常和创新推导有关）需要成倍增加概率，但是上限被锁死在了 1.2，同时下限 0.8 不断在压低负动作，导致模型变得极度保守，不敢探索新解法。 DAPO 的 Clip-Higher 解耦了上下界，下界不变提高了上界，下界不变防止动作概率过度压低，同时放宽上界给冷门但是至关重要的 低概率正确 token 留出更大的概率增长空间； 在长推理场景下，按 token 长度平均的话精妙的长输出被更大的分母平均后可能获取的正向激励还不如一个更短的普通的输出，另外如果模型陷入低质量复读，由于长度很长，受到的惩罚被平均后也会很小。DAPO 的做法是把平均的分母移动到组累加和样本累加外面，组内所有 token 整体取均值，这样就和单样本的长度无关了。 因为移除的是不带来优势的样本加入训练也没有梯度对模型来说是没有意义的，移除之后每次的样本都是有效的，代价只是增加一点 rollout 时间甚至不增加，因为并行 rollout 本身就会被最长的那条阻塞。"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2025-dapo.html#pitfalls",
        "t": "卡壳点与解答 Q1：为什么朴素对称 Clip 会引发熵坍缩？Clip-Higher 如何对症下药？ 解答： 对正优势 token，r 超过上侧阈值后，该样本目标不再奖励进一步提高概率。低概率但有用的 token 需要较大的相对增幅，因此放宽上侧阈值可延后目标平台。负优势与 min 的作用不同，不能把上下界解释成所有概率的硬限位。论文消融观察到 Clip-Higher 保住更多策略熵；这支持本设置的设计，不保证任意任务都会发生相同熵变化。 Q2：样本级平均（Sample-level）与 Token 级平均（Token-level）在长思考链下的根本分歧是什么？ 解答： 样本级平均的病态：将每个样本内部除以 $ o_i $，本质上是假设“每个完整回答的整体价值权重是等同的”。但在 16K 的长推理中，一个包含丰富中间反思的长解法被除以了 16,000，其关键证明 token 的梯度权重被极其严重地稀释；反之，当模型陷入死循环复读时，单 token 的负惩罚被除以了巨额长度，惩罚软弱无力，反而纵容了复读； Token 级平均的拨乱反正：将归一化分母提取到最外层（除以当前批次的所有有效 token 总数 $\\sum o_i $）。从单个 token 视角看，不论它身处短回答还是长回答中，只要产生了正优势，它获得的奖励提升权重完全相同；只要产生了负优势，复读或废话越多，累积的反向惩罚梯度总量就越大，减轻了逐回答平均造成的长度权重偏差；不保证所有冗长内容都被单独识别和惩罚。 Q3：动态采样额外生成了数据，为什么整体训练时间反而减少？ 解答： 无效梯度的隐形杀手：在朴素批次中，随着模型变聪明，全对题目的比例高达 60% 以上。这些题目在 GRPO 中优势恒为零，占用显存和反向传播算力却贡献零梯度，导致实际“有效 Batch Size”萎缩了 60% 以上，参数更新在极小样本集上剧烈震荡、收敛极慢； 高信噪比更新驱动快速收敛：动态采样确保送入反向传播的每一个题目都具备绝对的对比度，每个题目都有组内奖励对比，不保证每个 token 都是高质量监督，梯度更新步数直接削减了 50%； 并行推理的木桶效应：在大规模分布式 RL 系统中，单批次 Rollout 的等待时间本身就是由极少数生成最慢的长尾样本决定的。在等待长尾样本生成的空档中，该实现可把部分额外采样与等待重叠；额外生成仍有成本，收益取决于并行度与长尾分布。"
      },
      {
        "h": "全文问答 · Q1：为什么朴素对称 Clip 会引发熵坍缩？Clip-Higher 如何对症下药？",
        "a": "notes/papers/2025-dapo.html#qa-clip-higher",
        "t": "Q1：为什么朴素对称 Clip 会引发熵坍缩？Clip-Higher 如何对症下药？ 解答 ： 对正优势 token，r 超过上侧阈值后，该样本目标不再奖励进一步提高概率。低概率但有用的 token 需要较大的相对增幅，因此放宽上侧阈值可延后目标平台。负优势与 min 的作用不同，不能把上下界解释成所有概率的硬限位。论文消融观察到 Clip-Higher 保住更多策略熵；这支持本设置的设计，不保证任意任务都会发生相同熵变化。"
      },
      {
        "h": "全文问答 · Q2：样本级平均（Sample-level）与 Token 级平均（Token-level）在长思考链下的根本分歧是什么？",
        "a": "notes/papers/2025-dapo.html#qa-token-loss",
        "t": "Q2：样本级平均（Sample-level）与 Token 级平均（Token-level）在长思考链下的根本分歧是什么？ 解答 ： 样本级平均的病态 ：将每个样本内部除以 $|o_i|$ ，本质上是假设“每个完整回答的整体价值权重是等同的”。但在 16K 的长推理中，一个包含丰富中间反思的长解法被除以了 16,000，其关键证明 token 的梯度权重被极其严重地稀释；反之，当模型陷入死循环复读时，单 token 的负惩罚被除以了巨额长度，惩罚软弱无力，反而纵容了复读； Token 级平均的拨乱反正 ：将归一化分母提取到最外层（除以当前批次的所有有效 token 总数 $\\sum |o_i|$ ）。从单个 token 视角看，不论它身处短回答还是长回答中，只要产生了正优势，它获得的奖励提升权重完全相同；只要产生了负优势，复读或废话越多，累积的反向惩罚梯度总量就越大，减轻了逐回答平均造成的长度权重偏差；不保证所有冗长内容都被单独识别和惩罚。"
      },
      {
        "h": "全文问答 · Q3：动态采样额外生成了数据，为什么整体训练时间反而减少？",
        "a": "notes/papers/2025-dapo.html#qa-dynamic-sampling-speed",
        "t": "Q3：动态采样额外生成了数据，为什么整体训练时间反而减少？ 解答 ： 无效梯度的隐形杀手 ：在朴素批次中，随着模型变聪明，全对题目的比例高达 60% 以上。这些题目在 GRPO 中优势恒为零，占用显存和反向传播算力却贡献零梯度，导致实际“有效 Batch Size”萎缩了 60% 以上，参数更新在极小样本集上剧烈震荡、收敛极慢； 高信噪比更新驱动快速收敛 ：动态采样确保送入反向传播的每一个题目都具备绝对的对比度，每个题目都有组内奖励对比，不保证每个 token 都是高质量监督，梯度更新步数直接削减了 50%； 并行推理的木桶效应 ：在大规模分布式 RL 系统中，单批次 Rollout 的等待时间本身就是由极少数生成最慢的长尾样本决定的。在等待长尾样本生成的空档中，该实现可把部分额外采样与等待重叠；额外生成仍有成本，收益取决于并行度与长尾分布。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2025-dapo.html#open",
        "t": "还没搞懂 *费曼检验三题已全部闭环，无残留疑问。*"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2025-dapo.html#relations",
        "t": "关联 DeepSeekMath ： 理论演进与痛点定向修复：DeepSeekMath 首创了丢弃 Critic 的 GRPO 算法，但在长思维链（Long-CoT，上万 token）场景下暴露了四大暗礁（熵坍缩、策略代理目标无区分的题占比升高、长度被稀释、超长假负例）；DAPO 则是针对 GRPO 在大规模长推理落地时的直接升级演进版。 PPO ： 裁剪边界的非对称改造：PPO 确立了重要的对称截断代理目标（$1\\pm\\varepsilon$），DAPO 在其长推理实验中检验了非对称解耦裁剪（Clip-Higher, $\\varepsilon_{low}=0.2, \\varepsilon_{high}=0.28$）在防范策略熵崩溃上的关键价值。 Open-MOPD ： 训练预算与长度失衡的同源对照：Open-MOPD 揭示了在多教师蒸馏中，25× 的长短回答长度差会导致短域 token 梯度被严重剥夺；DAPO 的 Token-level Loss 同样也是在处理长短序列之间 token 梯度的公正分配与防稀释问题。 GeoAnchor ： GRPO 落地演进对照：GeoAnchor 在 3D 潜变量模式选择中直接套用 GRPO + pattern reward，而 DAPO 则代表了纯语言符号长思维链在极高推理难度（AIME 竞赛级）下的工业级对齐前沿。"
      }
    ]
  },
  {
    "id": "distillation",
    "type": "synthesis",
    "title": "蒸馏与训练预算",
    "href": "topics/distillation.html",
    "noteHref": "notes/syntheses/distillation.html",
    "sourceHref": "wiki/syntheses/distillation.md",
    "date": "2026-09-09",
    "topic": "distillation",
    "aliases": [
      "蒸馏与训练预算",
      "蒸馏专题",
      "on-policy 蒸馏专题",
      "OPD 家族"
    ],
    "tags": [
      "on-policy-distillation",
      "self-distillation",
      "multi-teacher",
      "budget-allocation",
      "reduce-supervision",
      "improve-training-efficiency"
    ],
    "essence": "本专题把三篇论文分成两个问题：U-OPSD 与 S²VOPD 构造自蒸馏信息差，Open-MOPD 分配多教师训练预算。",
    "review": {
      "next": "2026-09-17",
      "last": "2026-09-10",
      "count": 1,
      "result": ""
    },
    "relations": [],
    "members": [
      "2026-u-opsd",
      "2026-s2vopd",
      "2026-open-mopd"
    ],
    "refs": [
      "2017-ppo"
    ],
    "records": [
      {
        "id": "rel-distill-asymmetry-source",
        "from": "2026-u-opsd",
        "type": "compare",
        "to": "2026-s2vopd",
        "claim": "同一作者线在两个域给出单教师信息差的两种构造：U-OPSD 给教师加信息（伪解轨迹拼进教师上下文），S²VOPD 从学生减信息（输入图退化）；两者共享「师生只差一份信息」的前提",
        "status": "synthesis",
        "evidence": [
          "notes/papers/2026-u-opsd.html#relations",
          "notes/papers/2026-s2vopd.html#relations"
        ]
      },
      {
        "id": "rel-distill-divergence-fact",
        "from": "2026-u-opsd",
        "type": "tension",
        "to": "2026-s2vopd",
        "claim": "散度消融排序颠倒是两篇各自报告的实验事实：U-OPSD 在其实验中 forward KL 更稳（reverse KL 复读塌缩、JSD 掉 13.8），S²VOPD 则 JSD 最好、reverse KL 居中、forward KL 最差；两组实验条件不同，不能说一篇推翻另一篇",
        "status": "reported",
        "evidence": [
          "notes/papers/2026-u-opsd.html#qa-fwd-kl",
          "notes/papers/2026-s2vopd.html#qa-divergence"
        ]
      },
      {
        "id": "rel-distill-recoverability",
        "from": "2026-u-opsd",
        "type": "compare",
        "to": "2026-s2vopd",
        "claim": "「教师多出的信息学生能否恢复」统一解释两篇散度分歧（可恢复则全面模仿方向正确，不可恢复则模仿不可及细节有害）；这是库内假说，不是任一原文结论",
        "status": "hypothesis",
        "evidence": [
          "notes/papers/2026-s2vopd.html#open"
        ]
      },
      {
        "id": "rel-distill-orthogonal-slices",
        "from": "2026-u-opsd",
        "type": "complement",
        "to": "2026-open-mopd",
        "claim": "单教师信号从哪来与多教师预算怎么分账是正交切片：两页各自处理一个，机制上互不依赖",
        "status": "synthesis",
        "evidence": [
          "notes/papers/2026-u-opsd.html#relations",
          "notes/papers/2026-open-mopd.html#relations"
        ]
      },
      {
        "id": "rel-distill-combine-self-teachers",
        "from": "2026-u-opsd",
        "type": "possible-combination",
        "to": "2026-open-mopd",
        "claim": "组合设想（库内无实验）：多个自蒸馏伪教师 + Open-MOPD 三机制；两页关联节提出了组合设想，但只论证机制正交，未验证自投票门控按题跳过训练步会不会改变各域 token 份额",
        "status": "hypothesis",
        "evidence": [
          "notes/papers/2026-u-opsd.html#relations",
          "notes/papers/2026-open-mopd.html#relations"
        ]
      },
      {
        "id": "rel-distill-divergence-slot",
        "from": "2026-u-opsd",
        "type": "compare",
        "to": "2026-open-mopd",
        "claim": "散度的角色不同：U-OPSD 的 forward KL 直接当损失（其 reverse KL 实验出现复读塌缩），Open-MOPD 的 reverse-KL 式 dense reward 只是 PPO 的奖励信号（停梯度、走 PPO 裁剪目标）；同方向不同框架，不矛盾",
        "status": "reported",
        "evidence": [
          "notes/papers/2026-u-opsd.html#relations",
          "notes/papers/2026-open-mopd.html#relations"
        ]
      },
      {
        "id": "rel-distill-self-asymmetry-in-multi",
        "from": "2026-s2vopd",
        "type": "possible-combination",
        "to": "2026-open-mopd",
        "claim": "组合设想（库内无实验）：多教师框架里每个教师都可以用 S²VOPD 式自构造不对称（零特权）",
        "status": "hypothesis",
        "evidence": [
          "notes/papers/2026-s2vopd.html#relations"
        ]
      },
      {
        "id": "rel-distill-ppo-prerequisite",
        "from": "2017-ppo",
        "type": "prerequisite",
        "to": "2026-open-mopd",
        "claim": "Open-MOPD 机制三（reward refresh）的底层载体是 PPO 的重要性比率与 clip：K 次复用同一批 rollout 时若沿用旧 reward，比率过冲触发 clip，clip fraction 约为 75.8%，不等于全部梯度冻结；刷新只是顺手用 PPO 本来就要算的当前学生 logprob",
        "status": "reported",
        "evidence": [
          "notes/papers/2026-open-mopd.html#qa-reward-refresh",
          "notes/papers/2017-ppo.html#qa-on-policy-reuse"
        ]
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "topics/distillation.html#map",
        "t": "先分清两个问题：单教师的学习信号从哪里来，多教师的训练预算如何分配。三个成员分别处理这两个切片。 U-OPSD：给教师加信息 教师多看自投票产生的完整轨迹，学生不看。 S²VOPD：从学生减信息 教师看清晰图，学生看退化图。 Open-MOPD：分配预算 已有多个域专家时，处理 token 份额、奖励幅度和奖励新鲜度。 具体例子 ：阅读对照：先把前两篇的师生输入写出来，再比较各自散度消融。读第三篇时，把问题换成“每个域得到多少优化量”。这是一条阅读路径，不是论文继承链。 边界 ：散度排序是各自实验事实；信息可恢复性的统一解释仍待验证。多种自蒸馏教师与 Open-MOPD 的组合也没有库内实验。 换个条件看机制 U-OPSD 的 forward KL 最好，是否意味着 S²VOPD 应改用 forward KL？ 不能这样推出。两篇输入条件、任务和训练设置不同。先保留各自消融结果，再把跨篇解释标为假说。"
      },
      {
        "h": "全文 · 专题本质",
        "a": "notes/syntheses/distillation.html#essence",
        "t": "专题本质 用问题重建专题 先分清两个问题：单教师的学习信号从哪里来，多教师的训练预算如何分配。三个成员分别处理这两个切片。 U-OPSD：给教师加信息 教师多看自投票产生的完整轨迹，学生不看。 S²VOPD：从学生减信息 教师看清晰图，学生看退化图。 Open-MOPD：分配预算 已有多个域专家时，处理 token 份额、奖励幅度和奖励新鲜度。 具体例子 ：阅读对照：先把前两篇的师生输入写出来，再比较各自散度消融。读第三篇时，把问题换成“每个域得到多少优化量”。这是一条阅读路径，不是论文继承链。 边界 ：散度排序是各自实验事实；信息可恢复性的统一解释仍待验证。多种自蒸馏教师与 Open-MOPD 的组合也没有库内实验。 换个条件看机制 U-OPSD 的 forward KL 最好，是否意味着 S²VOPD 应改用 forward KL？ 不能这样推出。两篇输入条件、任务和训练设置不同。先保留各自消融结果，再把跨篇解释标为假说。 可选自测 关掉提示后把三篇放回“信息差来源”与“预算分配”两个分支，并指出哪条跨篇解释仍待验证。 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。 三篇论文围绕 on-policy 蒸馏（OPD，在学生自己采样的轨迹上逐 token 对齐教师分布）分成两个子问题：前两篇在自蒸馏里构造师生信息差（U-OPSD 给教师拼进一条多数投票出的完整解题轨迹，S²VOPD 反过来把学生的输入图退化），第三篇回答多个教师同时教时训练预算怎么分。Open-MOPD 的教师是三个不同的域专家，教师与学生本就是不同模型，不需要靠额外输入制造差异；因此本页不把它当作「信息差来源」谱系的一员。 自蒸馏里的信息差为什么必要：U-OPSD 与 S²VOPD 的教师与学生共享参数，若两者上下文也完全相同，分布就一致、逐 token KL 为零、无学习信号（U-OPSD 关键机制：学生也看了 y+ 则教师=学生 KL 恒 0；S²VOPD 解决什么问题：教师比学生多知道点什么才有信息量）。这条命题只在这类「同模型、同条件」的自蒸馏设置里成立，本页不把它外推为整个 OPD 家族的普适必要条件：教师与学生是不同模型时，分布差异天然存在，但不自动等于蒸馏信号有用。 教师的信息差从哪里来？（自蒸馏设置）传统答案都要外部资源（更大的模型、GT 答案、GT 区域标注）。U-OPSD 用模型自己多数投票出来的完整解题轨迹给教师加信息；S²VOPD 反过来，把学生的输入图退化，从学生身上减信息。两篇是同一作者线在文本推理域与视觉感知域的两个答案。 多个教师同时教，训练预算怎么分？ Open-MOPD 在同源教师与 oracle 路由的设置中，发现教师冲突不是主要瓶颈，把掉分归因到 token 级优化预算在三个时间尺度上的系统性错配，并用三个正交机制修复。 范围说明：本专题不覆盖尚未入库的 OPD 基础工作（DistiLLM 系列、GKD）与 SFT / OPD / OPSD 三个谱系背景节点，它们只作为有来源说明的背景出现，不制造未入库论文的阅读卡。Open-MOPD 的教师是与学生不同的域专家，不属于「自蒸馏信息差来源」这一子问题，本专题只把它作为正交的「多教师预算」切片引用。"
      },
      {
        "h": "全文 · 问题与方法地图",
        "a": "notes/syntheses/distillation.html#map",
        "t": "问题与方法地图 图稿依据三篇论文页的「解决什么问题」与「关联」节组织。连线「问题分解」是库内组织方式；「对应方法」连线来自各论文自述。PPO 到 Open-MOPD 的虚线只表示理解前置，不表示论文继承。 flowchart TB root[\"蒸馏：教师信号与训练预算\"] signal[\"教师凭什么提供更有用的分布？\"] budget[\"多个教师的训练预算如何分配？\"] u[\"U-OPSD：教师多看自投票产生的完整轨迹\"] s[\"S²VOPD：教师看清晰图，学生看退化图\"] m[\"Open-MOPD：修复多教师 token 预算错配\"] p[\"PPO：理解策略更新的前置知识\"] root --> 问题分解 signal root --> 问题分解 budget signal --> 文本信息差：给教师加信息 u signal --> 视觉信息差：从学生减信息 s budget --> 对应方法 m p -.-> 理解前置，不表示论文继承 m 边 说明 证据状态 --- --- --- 蒸馏 → 教师凭什么提供更有用的分布 自蒸馏子问题：师生共享参数时必须靠额外信息差制造学习信号，否则分布相同、KL 为零 库内对照（两篇自蒸馏论文各自陈述，本页归为一个子问题） 蒸馏 → 多个教师的训练预算如何分配 多教师 OPD 的独立问题：即便每个教师都合格，合并训练仍会掉分 库内对照 信号来源 → U-OPSD 教师上下文里多拼进一条多数投票出的完整解题轨迹 y+，学生只看题目与答错前缀 原文报告 信号来源 → S²VOPD 教师看原图、学生看降采样加噪的退化图，不对称来自减少学生的信息 原文报告 预算分配 → Open-MOPD 掉分主因是 token 份额、reward 幅度、reward 新鲜度三层预算错配，三个机制逐一修复 原文报告 PPO ⇢ Open-MOPD 机制三 reward refresh 建立在 PPO 的重要性比率与 clip 之上；不理解 clip 就看不出 约 75.8% 的 clip fraction的含义 原文报告（Open-MOPD 关联节明确指出）"
      },
      {
        "h": "全文 · 关系记录",
        "a": "notes/syntheses/distillation.html#relations",
        "t": "关系记录 规范记录。导读页的关系表、静态图与搜索条目都是它的投影；论文页既有的关系卡在迁移时逐条核对到这里的关系 ID。 关系 ID 起点 类型 终点 一句主张 证据状态 依据锚点 指纹 --- --- --- --- --- --- --- --- rel-distill-asymmetry-source 2026-u-opsd compare 2026-s2vopd 同一作者线在两个域给出单教师信息差的两种构造：U-OPSD 给教师加信息（伪解轨迹拼进教师上下文），S²VOPD 从学生减信息（输入图退化）；两者共享「师生只差一份信息」的前提 synthesis notes/papers/2026-u-opsd.html#relations notes/papers/2026-s2vopd.html#relations a52b09ab rel-distill-divergence-fact 2026-u-opsd tension 2026-s2vopd 散度消融排序颠倒是两篇各自报告的实验事实：U-OPSD 在其实验中 forward KL 更稳（reverse KL 复读塌缩、JSD 掉 13.8），S²VOPD 则 JSD 最好、reverse KL 居中、forward KL 最差；两组实验条件不同，不能说一篇推翻另一篇 reported notes/papers/2026-u-opsd.html#qa-fwd-kl notes/papers/2026-s2vopd.html#qa-divergence 027ac948 rel-distill-recoverability 2026-u-opsd compare 2026-s2vopd 「教师多出的信息学生能否恢复」统一解释两篇散度分歧（可恢复则全面模仿方向正确，不可恢复则模仿不可及细节有害）；这是库内假说，不是任一原文结论 hypothesis notes/papers/2026-s2vopd.html#open deb3b3b8 rel-distill-orthogonal-slices 2026-u-opsd complement 2026-open-mopd 单教师信号从哪来与多教师预算怎么分账是正交切片：两页各自处理一个，机制上互不依赖 synthesis notes/papers/2026-u-opsd.html#relations notes/papers/2026-open-mopd.html#relations 93f4992d rel-distill-combine-self-teachers 2026-u-opsd possible-combination 2026-open-mopd 组合设想（库内无实验）：多个自蒸馏伪教师 + Open-MOPD 三机制；两页关联节提出了组合设想，但只论证机制正交，未验证自投票门控按题跳过训练步会不会改变各域 token 份额 hypothesis notes/papers/2026-u-opsd.html#relations notes/papers/2026-open-mopd.html#relations 93f4992d rel-distill-divergence-slot 2026-u-opsd compare 2026-open-mopd 散度的角色不同：U-OPSD 的 forward KL 直接当损失（其 reverse KL 实验出现复读塌缩），Open-MOPD 的 reverse-KL 式 dense reward 只是 PPO 的奖励信号（停梯度、走 PPO 裁剪目标）；同方向不同框架，不矛盾 reported notes/papers/2026-u-opsd.html#relations notes/papers/2026-open-mopd.html#relations 93f4992d rel-distill-self-asymmetry-in-multi 2026-s2vopd possible-combination 2026-open-mopd 组合设想（库内无实验）：多教师框架里每个教师都可以用 S²VOPD 式自构造不对称（零特权） hypothesis notes/papers/2026-s2vopd.html#relations 1e64510c rel-distill-ppo-prerequisite 2017-ppo prerequisite 2026-open-mopd Open-MOPD 机制三（reward refresh）的底层载体是 PPO 的重要性比率与 clip：K 次复用同一批 rollout 时若沿用旧 reward，比率过冲触发 clip，clip fraction 约为 75.8%，不等于全部梯度冻结；刷新只是顺手用 PPO 本来就要算的当前学生 logprob reported notes/papers/2026-open-mopd.html#qa-reward-refresh notes/papers/2017-ppo.html#qa-on-policy-reuse 08620a65"
      },
      {
        "h": "全文 · 分叉与演进",
        "a": "notes/syntheses/distillation.html#evolution",
        "t": "分叉与演进 谱系背景（来自 U-OPSD 页「解决什么问题」，尚无独立页）：SFT（要 GT 解且教师强制，训练-推理失配）→ OPD（要外部更强教师）→ OPSD（参数自共享，但教师仍多看 GT 解）→ U-OPSD（连 GT 解也不要）。S²VOPD 站在同一位置给出另一种去外部依赖的方式（减学生信息）。这是 U-OPSD 论文自述的谱系，不是本库核实的方法继承链。 每篇的「原先假设或瓶颈 → 本文改变 → 仍留下什么」： U-OPSD：瓶颈是 OPSD 的教师仍要多看 GT 解，信息仍来自模型之外 → 用模型自己多数投票出的完整解题轨迹当教师特权上下文，只在答错 rollout 上逐 token 前向 KL → 留下：伪标签 13.3% 出错是监督噪声风险，不能当作准确率硬上界；只在可抽取最终答案的竞赛数学上验证（结果与代价）。 S²VOPD：瓶颈是特权信号（更强模型、GT 答案、GT 区域）越来越难获得，特权方法还偏科 → 不对称不必给教师加信息，可以从学生减信息：学生看退化图、EMA 教师看原图 → 留下：增益依赖增强调参（gap 大小与 task-consistency 双准则）；OCR 等细粒度任务预期失效是本人推演、论文未验证（结果与代价）。 Open-MOPD：瓶颈是 naive 多教师合并只拿回 35.6% 的提升，掉分被归咎于教师冲突 → 三重检验在该设置中排除教师冲突为主因，定位到 token 份额、reward 幅度、reward 新鲜度三层预算错配并逐一修复，回收率到 83.4% → 留下：仅 3B 规模、三个域、oracle 真实标签路由，路由有误的场景未验证（结果与代价）。 方法继承：未核实三篇之间存在明确的借鉴、替换或扩展关系（U-OPSD 与 S²VOPD 是同作者线的域互补，不是一篇改进另一篇），因此图中不画继承箭头。 首次公开时间（出处：arXiv 编号即首次提交年月）：PPO 2017-07（1707.06347）；U-OPSD 2026-08（2608.06296）；S²VOPD 2026-08（2608.14144）；Open-MOPD 2026-08（2608.19098）。三篇主线同月公开，入库先后（08-19 / 09-02 / 08-27）只是本库的阅读顺序，不是学术时间线。"
      },
      {
        "h": "全文 · 关键维度比较",
        "a": "notes/syntheses/distillation.html#compare",
        "t": "关键维度比较 每格的依据在括号里，落到对应论文页的完整笔记段落。 比较维度 U-OPSD S²VOPD Open-MOPD --- --- --- --- 教师额外知道什么 多数投票得到的完整解题轨迹 y+；label-only 只给答案值掉 10.3~15.8（卡壳点 qa-y-plus） 学生输入图的清晰版本；教师冻结在基座只掉 0.40，该消融主要支持清晰输入的作用（结果与代价） 三个域专家各自的能力；本文焦点不在单个教师强在哪，而在预算怎么分（解决什么问题） 学生看到什么 题目 x 与错答前缀 y⁻<t，不见 y+（关键机制） 退化图与问题，自己在坏图上 rollout 8 条（关键机制） 学生在多域 prompt 上 rollout，各域响应长度差 25 倍（大白话讲解） 监督形式 全词表逐 token forward KL，直接当损失（关键机制） 逐 token 广义 JSD（α=0.5），top-k 截断后只更新学生（关键机制） reverse-KL 式 dense reward 进 PPO 的奖励槽位，停梯度加 clip 兜底（关键机制） 预算问题在哪 单教师，无分账问题；门控自动跳过太难与太简单的题（关键机制） 单教师，无分账问题；增强强度呈倒 U 型（关键机制） token 份额（batch 内）、reward 幅度（训练全程）、reward 新鲜度（rollout 周期内）三层（大白话讲解） 最应记住的边界 伪标签 13.3% 出错是监督噪声风险；仅竞赛数学（结果与代价） 增强必须 task-consistent，大 gap 不等于好 gap；OCR 预期失效待验证（卡壳点 qa-crop） 仅 3B、oracle 路由；反向预算规则会形成正反馈环直到崩溃（卡壳点 qa-feedback-loop） 散度选择单独说明：三篇对散度的实验结论分别是 forward KL 在其实验中更稳（U-OPSD）、JSD 最好（S²VOPD）、reverse-KL 式 reward（Open-MOPD，角色是奖励不是损失）。这三个数据点来自不同设置，不能读出一条普适的散度选择定律；「信息可恢复性」的统一解释是待验证假说（见关系记录 rel-distill-recoverability）。"
      },
      {
        "h": "全文 · 带着问题读论文",
        "a": "notes/syntheses/distillation.html#path",
        "t": "带着问题读论文 建议顺序：U-OPSD → S²VOPD → Open-MOPD，需要时先补 PPO。理由：前两篇构成「信息差从哪来」的一对对照，先读文本域最完整的无监督自蒸馏，再读视觉域的减信息变体，散度排序颠倒这个交叉点只有两篇连着读才看得清；第三篇切到「预算怎么分」，是另一个切片。这是学习路径，不是历史路线（三篇同月公开）。 U-OPSD：为什么把共识当教师的上下文，比把共识当标量奖励（TTRL 一类）好 7~11 个点？为什么必须前向 KL？（U-OPSD） S²VOPD：为什么「从学生减信息」也算不对称？训练看糊图、考试看好图为什么反而变强？散度排序为何与 U-OPSD 颠倒？（S²VOPD） Open-MOPD：掉分为什么不是教师打架？预算错配的三个时间尺度分别是什么？reward refresh 为什么零开销？（Open-MOPD） PPO（跨专题前置）：重要性比率与 clip 在同一批样本多轮复用时各扮演什么角色？读懂它才能理解 Open-MOPD 的「约 75.8% 的 clip fraction」（PPO）。"
      },
      {
        "h": "全文 · 跨篇卡壳点",
        "a": "notes/syntheses/distillation.html#pitfalls",
        "t": "跨篇卡壳点 前三条复用论文页的历史问答（保留当时日期），第四条是本专题新提出的问题，标「待讨论」。 Q：U-OPSD 与 S²VOPD 的散度消融为什么完全相反？（S²VOPD 页 2026-09-02 首验、09-07 复测收敛） A：先确认「相反」指什么：U-OPSD 在其实验中 forward KL 更稳（reverse KL 复读崩溃、JSD 掉 13.8）；S²VOPD 是 JSD 最好 > reverse KL > forward KL 最差。实验事实到此为止，两组条件不同，不是一篇推翻另一篇。库内解释（待验证）：教师多出的信息学生能否恢复。U-OPSD 教师多的是解题思路，学生原则上自己能推出来，全面模仿（mode-covering 的 forward KL）方向正确；S²VOPD 教师多的是清晰像素，糊图里丢掉的细节拿不回来，forward KL 逼学生模仿接触不到的细粒度分布反而有害。量级佐证：U-OPSD 选错散度是灾难（13 点以上或崩溃），S²VOPD 选错只是小亏（1.3 点）。 Q：y+ 是伪标签吗？（U-OPSD 页 2026-08-19 首验；S²VOPD 页 09-02 两连犯口误，09-07 复测收敛） A：不是。y+ 是拼进教师输入的一条完整解题轨迹（几百到上千 token），整条喂教师、不截断；共识答案 ã(x) 才是单值，只用来投票和分组。消融 label-only（只给教师 boxed 答案值）掉 10.3~15.8，因为只知道答案值无法在每个 token 上指引「怎么走到这个答案」。跨篇高频复发点：读 S²VOPD 对照表时最容易把「教师多看的东西」又说成标签。当前状态：09-07 复测首答即明确，不再是弱项。 Q：reward refresh 为什么零开销，又为什么修不掉全部陈旧？（Open-MOPD 页 2026-09-07 复测二次深化） A：每个 token 的 dense reward 是教师 logprob 减学生 logprob。教师冻结，rollout 时一次算好缓存；学生当前 logprob 是 PPO 每次内更新算重要性比率本来就要 forward 出来的数，refresh 只是把这个已在显存里的数顺手填回奖励公式，不加教师 forward、不加学生 forward、不重新生成。修不掉的部分是轨迹本身仍由旧学生采样，换它要重新 rollout（生成占一步 46.5%，最贵），交给 PPO 的 ratio 与 clip 兜底。不刷新的代价：K=4 时 约 75.8% 的 clip fraction。PPO 前置知识见 PPO。 Q（待讨论，2026-09-09 本专题新提）：如果把多个 U-OPSD 式的自蒸馏伪教师放进 Open-MOPD 的多教师框架，预算错配会以什么形态出现？ A：库内没有答案。两页关联节提出组合设想（待验证），但只论证了机制正交（教师从哪来 vs 预算怎么分），没有实验。可以确定的前提：Open-MOPD 的三层错配都以「各域响应长度、收敛速度、K 次复用」为条件，与教师是否自蒸馏无关；不确定的是自投票门控会按题跳过训练步，可能改变各域实际贡献的 token 份额。此问题已记入 questions.md，等有实验或新论文再讨论。"
      },
      {
        "h": "全文问答 · Q：U-OPSD 与 S²VOPD 的散度消融为什么完全相反？（S²VOPD 页 2026-09-02 首验、09-07 复测收敛）",
        "a": "notes/syntheses/distillation.html#qa-distill-divergence",
        "t": "Q：U-OPSD 与 S²VOPD 的散度消融为什么完全相反？（S²VOPD 页 2026-09-02 首验、09-07 复测收敛） 先确认「相反」指什么：U-OPSD 在其实验中 forward KL 更稳（reverse KL 复读崩溃、JSD 掉 13.8）；S²VOPD 是 JSD 最好 > reverse KL > forward KL 最差。实验事实到此为止，两组条件不同，不是一篇推翻另一篇。库内解释（待验证）：教师多出的信息学生能否恢复。U-OPSD 教师多的是解题思路，学生原则上自己能推出来，全面模仿（mode-covering 的 forward KL）方向正确；S²VOPD 教师多的是清晰像素，糊图里丢掉的细节拿不回来，forward KL 逼学生模仿接触不到的细粒度分布反而有害。量级佐证：U-OPSD 选错散度是灾难（13 点以上或崩溃），S²VOPD 选错只是小亏（1.3 点）。"
      },
      {
        "h": "全文问答 · Q：y+ 是伪标签吗？（U-OPSD 页 2026-08-19 首验；S²VOPD 页 09-02 两连犯口误，09-07 复测收敛）",
        "a": "notes/syntheses/distillation.html#qa-distill-y-plus",
        "t": "Q：y+ 是伪标签吗？（U-OPSD 页 2026-08-19 首验；S²VOPD 页 09-02 两连犯口误，09-07 复测收敛） 不是。y+ 是拼进教师输入的一条完整解题轨迹（几百到上千 token），整条喂教师、不截断；共识答案 ã(x) 才是单值，只用来投票和分组。消融 label-only（只给教师 boxed 答案值）掉 10.3~15.8，因为只知道答案值无法在每个 token 上指引「怎么走到这个答案」。跨篇高频复发点：读 S²VOPD 对照表时最容易把「教师多看的东西」又说成标签。当前状态：09-07 复测首答即明确，不再是弱项。"
      },
      {
        "h": "全文问答 · Q：reward refresh 为什么零开销，又为什么修不掉全部陈旧？（Open-MOPD 页 2026-09-07 复测二次深化）",
        "a": "notes/syntheses/distillation.html#qa-distill-refresh",
        "t": "Q：reward refresh 为什么零开销，又为什么修不掉全部陈旧？（Open-MOPD 页 2026-09-07 复测二次深化） 每个 token 的 dense reward 是教师 logprob 减学生 logprob。教师冻结，rollout 时一次算好缓存；学生当前 logprob 是 PPO 每次内更新算重要性比率本来就要 forward 出来的数，refresh 只是把这个已在显存里的数顺手填回奖励公式，不加教师 forward、不加学生 forward、不重新生成。修不掉的部分是轨迹本身仍由旧学生采样，换它要重新 rollout（生成占一步 46.5%，最贵），交给 PPO 的 ratio 与 clip 兜底。不刷新的代价：K=4 时 约 75.8% 的 clip fraction。PPO 前置知识见 PPO 。"
      },
      {
        "h": "全文问答 · Q（待讨论，2026-09-09 本专题新提）：如果把多个 U-OPSD 式的自蒸馏伪教师放进 Open-MOPD 的多教师框架，预算错配会以什么形态出现？",
        "a": "notes/syntheses/distillation.html#qa-distill-multi-self-teachers",
        "t": "Q（待讨论，2026-09-09 本专题新提）：如果把多个 U-OPSD 式的自蒸馏伪教师放进 Open-MOPD 的多教师框架，预算错配会以什么形态出现？ 库内没有答案。两页关联节提出组合设想（待验证），但只论证了机制正交（教师从哪来 vs 预算怎么分），没有实验。可以确定的前提：Open-MOPD 的三层错配都以「各域响应长度、收敛速度、K 次复用」为条件，与教师是否自蒸馏无关；不确定的是自投票门控会按题跳过训练步，可能改变各域实际贡献的 token 份额。此问题已记入 questions.md，等有实验或新论文再讨论。"
      },
      {
        "h": "全文 · 证据边界与来源",
        "a": "notes/syntheses/distillation.html#boundaries",
        "t": "证据边界与来源 原文报告：各篇的机制描述与数字（伪标签 13.3%、冻结教师只掉 0.40、回收率 35.6% → 83.4%、约 75.8% 的 clip fraction）均来自论文页「结果与代价」，可按上表括号回查。 库内对照：把三篇分成「信息差来源」与「预算分配」两个子问题、正交切片可组合、建议阅读顺序，都是本库的组织方式，论文没有这样自述。 待验证假说：「信息可恢复性决定散度选择」（S²VOPD 页「还没搞懂」已声明，待 DistiLLM 系列入库验证）；「OCR 等细粒度任务上 S²VOPD 预期失效」（本人推演）；「多个自蒸馏伪教师组合后的预算形态」（本页新提，待讨论）。理解检验通过的假说仍是假说。 成员与来源：U-OPSD（Zotero itemKey JD4RZABE，入库 2026-08-19）、S²VOPD（AWVKHW9W，2026-09-02）、Open-MOPD（S2DP7DZX，2026-08-27）；跨专题引用 PPO（Z6L573AE，2026-09-09）。本页整理日期 2026-09-09。"
      }
    ]
  },
  {
    "id": "video-understanding",
    "type": "synthesis",
    "title": "视频理解与响应",
    "href": "topics/video-understanding.html",
    "noteHref": "notes/syntheses/video-understanding.html",
    "sourceHref": "wiki/syntheses/video-understanding.md",
    "date": "2026-09-09",
    "topic": "video-understanding",
    "aliases": [
      "视频理解与响应",
      "视频专题",
      "长视频推理专题",
      "流式视频专题"
    ],
    "tags": [
      "video-mlm",
      "token-compression",
      "streaming-inference",
      "memory",
      "cot-reasoning",
      "tool-use",
      "temporal-sampling",
      "group-rl",
      "policy-gradient",
      "improve-efficiency",
      "lower-latency",
      "improve-reasoning",
      "improve-grounding",
      "reduce-supervision"
    ],
    "essence": "本专题按感知成本、思考时机和证据获取组织四篇视频论文，帮助比较它们各自解决的瓶颈。",
    "review": {
      "next": "2026-09-17",
      "last": "2026-09-10",
      "count": 1,
      "result": ""
    },
    "relations": [],
    "members": [
      "2026-videochat3",
      "2026-vst",
      "2026-video-o3",
      "2026-tspo"
    ],
    "refs": [
      "2026-genlip"
    ],
    "records": [
      {
        "id": "rel-video-perception-vs-timing",
        "from": "2026-videochat3",
        "type": "complement",
        "to": "2026-vst",
        "claim": "VideoChat3 管感知效率（编码器压 token、状态机自适应分辨率），VST 管认知时机（推理前置、文本记忆），思路正交可互补；VST 论文自述其文本记忆与视觉记忆机制正交",
        "status": "reported",
        "evidence": [
          "notes/papers/2026-videochat3.html#relations",
          "notes/papers/2026-vst.html#relations"
        ]
      },
      {
        "id": "rel-video-timing-before-vs-after",
        "from": "2026-vst",
        "type": "compare",
        "to": "2026-video-o3",
        "claim": "推理时机不同：VST 查询前边看边想、查询即答 0.56s；Video-o3 查询后多轮裁剪找线索、MLVU 推理 10.2s；一个解决实时性，一个解决多跳精度",
        "status": "synthesis",
        "evidence": [
          "notes/papers/2026-video-o3.html#qa-timing",
          "notes/papers/2026-vst.html#relations"
        ]
      },
      {
        "id": "rel-video-how-much-vs-where",
        "from": "2026-videochat3",
        "type": "complement",
        "to": "2026-video-o3",
        "claim": "VideoChat3 靠编码器压缩与状态机决定看多少像素（感知效率），Video-o3 靠推理时工具调用决定看哪里（检索精度）",
        "status": "synthesis",
        "evidence": [
          "notes/papers/2026-video-o3.html#relations"
        ]
      },
      {
        "id": "rel-video-tspo-vs-video-o3",
        "from": "2026-tspo",
        "type": "compare",
        "to": "2026-video-o3",
        "claim": "两者都针对稀疏证据，但 TSPO 在回答前训练 temporal agent 一次性选帧，Video-o3 在查询后多轮调用工具搜索；前者路径短，后者 test-time 搜索更灵活，延迟与适应性取舍不同",
        "status": "synthesis",
        "evidence": [
          "notes/papers/2026-tspo.html#relations"
        ]
      },
      {
        "id": "rel-video-combine-feasible",
        "from": "2026-vst",
        "type": "possible-combination",
        "to": "2026-video-o3",
        "claim": "组合设想（库内无实验）：VST 文本记忆 + Video-o3 工具裁剪可互补实时性与多跳精度",
        "status": "hypothesis",
        "evidence": [
          "notes/papers/2026-video-o3.html#qa-combine",
          "notes/papers/2026-vst.html#relations"
        ]
      },
      {
        "id": "rel-video-combine-timing-conflict",
        "from": "2026-vst",
        "type": "tension",
        "to": "2026-video-o3",
        "claim": "组合的结构性障碍（库内对照，依据两页关联节自述）：「查询即答」与「多轮探索后才答」在响应时机上逻辑冲突，需新的统一调度；VideoChat3 的状态 token 与 VST 组合时是同一个问题",
        "status": "synthesis",
        "evidence": [
          "notes/papers/2026-video-o3.html#qa-combine",
          "notes/papers/2026-vst.html#relations"
        ]
      },
      {
        "id": "rel-video-encoder-pretraining",
        "from": "2026-genlip",
        "type": "possible-combination",
        "to": "2026-videochat3",
        "claim": "GenLIP 讨论视觉编码器的预训练，VideoChat3 讨论时空编码；将 GenLIP 接入 I3D-ViT 是组合设想，本库没有该替换实验",
        "status": "hypothesis",
        "evidence": [
          "notes/papers/2026-videochat3.html#relations"
        ]
      }
    ],
    "entries": [
      {
        "h": "速览 · 五分钟重建",
        "a": "topics/video-understanding.html#map",
        "t": "读这组论文先问三件事：进入 LLM 的画面信息有多少，思考发生在什么时候，回答所需证据从哪里来。 感知成本 VideoChat3 在编码器里压 token，并控制下一窗口的分辨率。 思考时机 VST 在查询前积累文本记忆；Video-o3 在查询后找证据、推理。 证据获取 TSPO 先一次性选候选帧；Video-o3 可多轮裁剪回看。 具体例子 ：阅读对照：一个短事件若没进入 TSPO 候选，选帧器无从选择；VST 还要遵守未来不可见与固定记忆限制；Video-o3 的裁剪访问条件另有前提。比较前先写清可见范围。 边界 ：压缩倍率不是整条系统的加速倍率。VST 的查询延迟不包含全部播放期思考成本。这组方法的组合尚无库内验证。 换个条件看机制 能否用 VST 的 0.56 秒与 Video-o3 的 10.2 秒，直接判断哪一个系统对同一任务更高效？ 不能。前者把思考分摊到查询前，后者查询后搜索；任务、访问范围与统计口径也不同。需要同一条件下计入总成本再比较。"
      },
      {
        "h": "全文 · 专题本质",
        "a": "notes/syntheses/video-understanding.html#essence",
        "t": "专题本质 用问题重建专题 读这组论文先问三件事：进入 LLM 的画面信息有多少，思考发生在什么时候，回答所需证据从哪里来。 感知成本 VideoChat3 在编码器里压 token，并控制下一窗口的分辨率。 思考时机 VST 在查询前积累文本记忆；Video-o3 在查询后找证据、推理。 证据获取 TSPO 先一次性选候选帧；Video-o3 可多轮裁剪回看。 具体例子 ：阅读对照：一个短事件若没进入 TSPO 候选，选帧器无从选择；VST 还要遵守未来不可见与固定记忆限制；Video-o3 的裁剪访问条件另有前提。比较前先写清可见范围。 边界 ：压缩倍率不是整条系统的加速倍率。VST 的查询延迟不包含全部播放期思考成本。这组方法的组合尚无库内验证。 换个条件看机制 能否用 VST 的 0.56 秒与 Video-o3 的 10.2 秒，直接判断哪一个系统对同一任务更高效？ 不能。前者把思考分摊到查询前，后者查询后搜索；任务、访问范围与统计口径也不同。需要同一条件下计入总成本再比较。 可选自测 关掉提示后给四篇各写一个主要瓶颈，再指出组合时要重新设计的响应时机或证据预算。 2026-10-04：讲解与练习待试用，本次未进行理解检验；此处不记录复测通过。 视频进入多模态大模型后有三笔账要算。第一笔是感知成本：帧率和分辨率一上去视觉 token 爆炸，LLM 注意力随序列长度二次方增长，长视频和实时流几乎跑不动（VideoChat3 解决什么问题）。第二笔是思考时机：显式链式推理能提高多跳精度，但离线式「查询到达后再想」让延迟从 0.54s 涨到 8.8s，实时场景不可用（VST 解决什么问题）。第三笔是证据获取：关键 2 秒藏在 10 分钟里，均匀采样把它淹没在冗余中。TSPO 训练 query-aware temporal agent，一次性选出关键帧；Video-o3 则拿到问题后多轮裁剪找证据（TSPO 解决什么问题、Video-o3 解决什么问题）。 四篇分别处理三笔账：VideoChat3 在视觉编码器里把 token 压掉 16 倍并用状态机自适应分辨率；VST 把推理挪到查询前的播放空档，写进 FIFO 文本记忆；TSPO 在回答前学习选择 query 相关帧；Video-o3 拿到问题后在共享上下文里多轮裁剪放大找证据。它们对「何时响应」和「看多少」有不同机制，组合时首先要调和响应时机、候选预算与证据控制流。 范围说明：本专题不覆盖视觉编码器本身怎么预训练（GenLIP、LaSt-ViT 属视觉编码器专题，只以跨专题引用出现），也不覆盖检测定位侧的 LocateAnything。"
      },
      {
        "h": "全文 · 问题与方法地图",
        "a": "notes/syntheses/video-understanding.html#map",
        "t": "问题与方法地图 图稿依据四篇论文页组织，连线「对应方法」表示「这篇处理此问题」。三条分支并列，不表示先后；证据获取下的 TSPO 与 Video-o3 是两条不同路线。 flowchart TB root[\"视频理解：感知、思考与证据获取\"] cost[\"感知成本：减少进入 LLM 的视觉 token\"] timing[\"思考时机：查询前积累文本记忆\"] evidence[\"证据获取：围绕问题主动裁剪细看\"] vc[\"VideoChat3：编码器内压缩与自适应分辨率\"] vst[\"VST：边看边想与 FIFO 文本记忆\"] tspo[\"TSPO：训练 temporal agent 选择关键帧\"] vo[\"Video-o3：共享上下文内找线索并作答\"] root --> 问题分解 cost root --> 问题分解 timing root --> 问题分解 evidence cost --> 对应方法 vc timing --> 对应方法 vst evidence --> 对应方法 tspo evidence --> 对应方法 vo 边 说明 证据状态 --- --- --- 视频理解 → 感知成本 视觉编码器开销近似线性、LLM 注意力二次方，压缩越早越划算 原文报告（VideoChat3 大白话讲解） 视频理解 → 思考时机 显式推理与实时响应冲突：查询后推理延迟 8.8s，不推理 0.54s 原文报告（VST 解决什么问题） 视频理解 → 证据获取 稀疏证据被均匀采样淹没；找线索与答题割裂则多线索无法联合 原文报告（Video-o3 解决什么问题） 感知成本 → VideoChat3 I3D-ViT 在编码器里做 16× 时空压缩，状态 token 兼管响应时机与下一窗口像素预算 原文报告 思考时机 → VST 推理挪到 clip 之间的空档，写入 FIFO 文本记忆，查询时直接读笔记（0.56s） 原文报告 证据获取 → Video-o3 模型自己生成工具调用，多轮裁剪放大后在同一上下文里作答（上限 8 轮） 原文报告 证据获取 → TSPO temporal agent 根据 query 概率化选关键帧，答案奖励与目标片段比例共同训练选帧策略 原文报告"
      },
      {
        "h": "全文 · 关系记录",
        "a": "notes/syntheses/video-understanding.html#relations",
        "t": "关系记录 规范记录。导读页的关系表、静态图与搜索条目都是它的投影；论文页既有的关系卡在迁移时逐条核对到这里的关系 ID。 关系 ID 起点 类型 终点 一句主张 证据状态 依据锚点 指纹 --- --- --- --- --- --- --- --- rel-video-perception-vs-timing 2026-videochat3 complement 2026-vst VideoChat3 管感知效率（编码器压 token、状态机自适应分辨率），VST 管认知时机（推理前置、文本记忆），思路正交可互补；VST 论文自述其文本记忆与视觉记忆机制正交 reported notes/papers/2026-videochat3.html#relations notes/papers/2026-vst.html#relations 1146b31b rel-video-timing-before-vs-after 2026-vst compare 2026-video-o3 推理时机不同：VST 查询前边看边想、查询即答 0.56s；Video-o3 查询后多轮裁剪找线索、MLVU 推理 10.2s；一个解决实时性，一个解决多跳精度 synthesis notes/papers/2026-video-o3.html#qa-timing notes/papers/2026-vst.html#relations b3219999 rel-video-how-much-vs-where 2026-videochat3 complement 2026-video-o3 VideoChat3 靠编码器压缩与状态机决定看多少像素（感知效率），Video-o3 靠推理时工具调用决定看哪里（检索精度） synthesis notes/papers/2026-video-o3.html#relations 5b28a654 rel-video-tspo-vs-video-o3 2026-tspo compare 2026-video-o3 两者都针对稀疏证据，但 TSPO 在回答前训练 temporal agent 一次性选帧，Video-o3 在查询后多轮调用工具搜索；前者路径短，后者 test-time 搜索更灵活，延迟与适应性取舍不同 synthesis notes/papers/2026-tspo.html#relations 3bd90554 rel-video-combine-feasible 2026-vst possible-combination 2026-video-o3 组合设想（库内无实验）：VST 文本记忆 + Video-o3 工具裁剪可互补实时性与多跳精度 hypothesis notes/papers/2026-video-o3.html#qa-combine notes/papers/2026-vst.html#relations 5f9d0a5a rel-video-combine-timing-conflict 2026-vst tension 2026-video-o3 组合的结构性障碍（库内对照，依据两页关联节自述）：「查询即答」与「多轮探索后才答」在响应时机上逻辑冲突，需新的统一调度；VideoChat3 的状态 token 与 VST 组合时是同一个问题 synthesis notes/papers/2026-video-o3.html#qa-combine notes/papers/2026-vst.html#relations 5f9d0a5a rel-video-encoder-pretraining 2026-genlip possible-combination 2026-videochat3 GenLIP 讨论视觉编码器的预训练，VideoChat3 讨论时空编码；将 GenLIP 接入 I3D-ViT 是组合设想，本库没有该替换实验 hypothesis notes/papers/2026-videochat3.html#relations 8abdd1b0"
      },
      {
        "h": "全文 · 分叉与演进",
        "a": "notes/syntheses/video-understanding.html#evolution",
        "t": "分叉与演进 每篇的「原先假设或瓶颈 → 本文改变 → 仍留下什么」： VideoChat3：瓶颈是视觉 token 爆炸与稀疏抽帧丢信息，旧做法把每帧当独立图片喂进 LLM → 把时空冗余在视觉编码器里消化（I3D-ViT 16× 压缩），流式场景用状态机按需切换分辨率，状态 token 一身兼响应时机与像素预算两职 → 留下：短视频（256 帧）反而略慢，优势要视频够长才显现；224² 下小尺度证据可能看不见；论文未消融状态 token 合并与拆分（结果与代价）。 VST：瓶颈是显式推理与实时响应冲突，且离线 CoT 数据带全局 hindsight 信息、直接训会学成作弊 → 推理时机从查询后挪到查询前，自造 100K 严格因果 CoT，流式注意力掩码让训练可见性照推理来 → 留下：FIFO 文本记忆有损（早期证据被淘汰）；思考烧额外后台 token；思考若慢于 clip 间隔只能回退到上一份记忆（结果与代价）。 Video-o3：瓶颈是均匀采样淹没稀疏证据，找线索与答题两阶段割裂 → 工具调用由模型自己生成、与推理交替写在同一共享上下文里，TDAM 防注意力分散与 Fake Thinking，VTGR 控效率 → 留下：8 轮与 32k 视觉上下文上限；只有 VideoCrop 一个工具；Fake Thinking 未根治（结果与代价）。 TSPO：瓶颈是均匀采样和不可微的离散选帧 → 用冻结 CLIP 的事件感知 temporal agent 生成概率化关键帧，把选帧与冻结 MLLM 的回答放进联合策略，用答案正确率和目标片段内选帧比例做 GRPO 式优化 → 留下：依赖足够强的冻结 MLLM，1 FPS 候选之外的遗漏无法挽回，整体理解型问题收益较小（结果与代价）。 方法继承：未核实三篇之间存在借鉴、替换或扩展关系，图中不画继承箭头；三条分支不是一个已验证的组合系统。 首次公开时间（出处：arXiv 编号即首次提交年月）：TSPO 2025-08（2508.04369）；Video-o3 2026-01（2601.23224）；VST 2026-03（2603.12262）；GenLIP 2026-05（2605.00809）；VideoChat3 2026-07（2607.14935）。注意本页建议的学习顺序按「先重建成本直觉，再比较思考时机，最后比较证据获取」排，不是时间线。"
      },
      {
        "h": "全文 · 关键维度比较",
        "a": "notes/syntheses/video-understanding.html#compare",
        "t": "关键维度比较 每格的依据在括号里，落到对应论文页的完整笔记段落。 比较维度 VideoChat3 VST TSPO Video-o3 --- --- --- --- --- 本页重点 感知压缩与流式响应控制（大白话讲解） 把思考分摊到播放期（大白话讲解） query-aware 关键帧选择（大白话讲解） 问题驱动的多轮证据获取（大白话讲解） 关键保留或使用的信息 压缩后的视频 token 与每窗口一个状态 token（关键机制） 最近 L 个视觉 token 的短期缓冲，加固定容量的 FIFO 文本记忆（关键机制） 1 FPS 候选帧中按 query 选出的关键帧与冻结 MLLM 回答（关键机制） 全局低分辨率视野、局部高分辨率裁剪与推理历史共享一个上下文（关键机制） 推理发生在何时 每个时间窗口处理完即决定 Silence / Standby / Response（关键机制） 查询前：每来一个 clip 就在空档里写想法，查询时直接读笔记（关键机制） 查询到达后先一次性选帧，再交给 MLLM 回答（关键机制） 查询后：思考、调工具、拼回结果循环，证据够了再收网（关键机制） 训练期的掩码或策略在管什么 state-transition mask：切换点全保留、保持点均匀采样，防学成永远闭嘴或走捷径（关键机制） 流式注意力掩码：视觉只看最近 L 个、文本全可见，既防泄露又防训练-推理漂移（卡壳点 qa-mask） Gumbel 探索 + 组相对奖励：让答案监督选帧策略，R_T 偏好目标片段内更集中的帧（关键机制） TDAM：调工具时禁看局部、答题时禁看全局，只对 10% 数据加，防注意力分散与 Fake Thinking（关键机制） 最应记住的边界 感知压缩不等同于文本推理记忆；256 帧反而略慢（结果与代价） 文本记忆有损；思考速度须适配流式节奏（卡壳点 qa-fifo） 依赖足够强的冻结 MLLM；Video-MME 只提升 1.1%（结果与代价） 依赖视频裁剪工具；轮数与上下文有限（结果与代价） 带着什么问题读 为什么压缩要尽早发生？（卡壳点 qa-where-compress） 为何低查询延迟不等于没有思考成本？（大白话讲解） 为什么答对不等于每帧都有用？R_T 到底补了什么？（卡壳点） 为何找到正确线索仍可能答错？（关键机制 Fake Thinking）"
      },
      {
        "h": "全文 · 带着问题读论文",
        "a": "notes/syntheses/video-understanding.html#path",
        "t": "带着问题读论文 建议顺序：VideoChat3 → VST → TSPO → Video-o3。理由：先重建「视觉 token 进 LLM 有多贵」的成本直觉，再比较「思考放在查询前还是查询后」，然后理解「训练一个 selector 让回答奖励教会选帧」，最后看「为什么还要在 test time 主动多轮找证据」。这是学习路径；VST 的在线因果约束、TSPO 的 1 FPS 候选限制与 Video-o3 的视频裁剪访问条件必须对照着读，否则容易把三者的「延迟」数字直接比大小。 VideoChat3：为什么压缩要放在视觉编码器里而不是让 LLM 长上下文兜底？状态 token 合二为一有什么隐患？（VideoChat3） VST：边看边想凭什么不增加延迟？离线 CoT 为什么不能直接训？流式掩码除了防泄露还解决什么？（VST） Video-o3：共享上下文带来的两个核心问题分别是什么？为什么只对 10% 数据加 TDAM？（Video-o3） TSPO：为什么答案正确率只能提供组级弱监督？R_T 如何区分同样答对但冗余不同的采样？（TSPO） GenLIP（跨专题引用）：VideoChat3 把图像 ViT 撑成 3D，那个 ViT 本身怎么训出来的？（GenLIP）"
      },
      {
        "h": "全文 · 跨篇卡壳点",
        "a": "notes/syntheses/video-understanding.html#pitfalls",
        "t": "跨篇卡壳点 前三条复用论文页的历史问答（保留当时日期），TSPO 条目来自本次入库检验，最后一条是本专题仍待讨论的问题。 Q：VST 和 Video-o3 的推理时机分别放在哪里？（Video-o3 页 2026-08-17 首验漏答半问，09-07 复测首答焊死） A：VST 在查询前：播放期边看边想写笔记，查询到直接读笔记秒答（0.56s）。Video-o3 在查询后：拿到问题后在单一上下文里多轮调工具找线索，每轮裁剪与推理交替（MLVU 10.2s）。一句话：VST 是先把笔记做好、问就秒答；Video-o3 是拿到问题才去翻监控放大看。两个延迟数字的前提不同（VST 的思考成本被分摊到播放期），不能直接比大小。 Q：VideoChat3 的 token 压缩和 VST 的文本记忆是同一件事吗？（VST 页 2026-08-17 首验 Q3） A：不是。VideoChat3 在视觉编码器里压 token、用状态机决定看多少像素，管的是感知效率；VST 用文本记录前序片段、把推理挪到查询前，管的是认知时机。用户当时的原话（VST 我的复述）：「VST 用文本记录流式输入的前序所有片段+前序少数视频帧信息汇总合成回答，而 VideoChat 通过压缩视频帧的token数记更多上下文。两者可以同时进行。」组合后的真实问题是 VideoChat3 的状态 token 与 VST 的「查询即答」在响应时机上要统一调度，双轨记忆冲突时要决定信谁。 Q：VST 与 Video-o3 组合后除了证据冲突还会引入什么结构性问题？（Video-o3 页 2026-08-17 首验漏答半问，09-07 复测通过） A：「查询即答」和「多轮探索后才答」在响应时机上逻辑冲突，需要新的统一调度决定何时秒答、何时探索；这和 VideoChat3 加 VST 组合时的问题是同一个。证据冲突（文本笔记与局部裁剪片段互相排斥时采信谁）是第二层问题。 Q：TSPO 中答对的一组帧是否意味着每一帧都真正有用？R_T 是 IoU 吗？（TSPO 页 2026-09-14 首测） A：不意味着。R_A 只说明整组帧足以让冻结 MLLM 答对，不能把功劳精确分给某一帧；R_T 用目标片段内选帧数除以总选帧数，偏好更集中的采样，更接近 precision，而不是完整 IoU。Video-MME 提升较小也不是完全失效，而是整体理解问题较多，局部 query 定位优势较弱。 Q（待讨论，2026-09-09 本专题新提）：VST 的流式注意力掩码与 Video-o3 的 TDAM 都是训练期掩码，它们解决的是同一类问题吗？ A：库内只能对照，不能下结论。两页各自的事实：VST 的掩码让训练可见性照推理来（视觉只看最近 L 个、文本全可见），同时堵住未来信息泄露与训练-推理分布漂移；TDAM 是分工掩码，调工具时禁看局部裁剪、答题时禁看全局视频，只对 10% 数据施加，防注意力分散与 Fake Thinking。可对照的差别是：前者把「能看到什么」钉在推理架构上，后者把「该看什么」钉在任务阶段上。是否能归纳成一条共同原理，等复测时讨论。"
      },
      {
        "h": "全文问答 · Q：VST 和 Video-o3 的推理时机分别放在哪里？（Video-o3 页 2026-08-17 首验漏答半问，09-07 复测首答焊死）",
        "a": "notes/syntheses/video-understanding.html#qa-video-timing",
        "t": "Q：VST 和 Video-o3 的推理时机分别放在哪里？（Video-o3 页 2026-08-17 首验漏答半问，09-07 复测首答焊死） VST 在查询前：播放期边看边想写笔记，查询到直接读笔记秒答（0.56s）。Video-o3 在查询后：拿到问题后在单一上下文里多轮调工具找线索，每轮裁剪与推理交替（MLVU 10.2s）。一句话：VST 是先把笔记做好、问就秒答；Video-o3 是拿到问题才去翻监控放大看。两个延迟数字的前提不同（VST 的思考成本被分摊到播放期），不能直接比大小。"
      },
      {
        "h": "全文问答 · Q：VideoChat3 的 token 压缩和 VST 的文本记忆是同一件事吗？（VST 页 2026-08-17 首验 Q3）",
        "a": "notes/syntheses/video-understanding.html#qa-video-compress-vs-memory",
        "t": "Q：VideoChat3 的 token 压缩和 VST 的文本记忆是同一件事吗？（VST 页 2026-08-17 首验 Q3） 不是。VideoChat3 在视觉编码器里压 token、用状态机决定看多少像素，管的是感知效率；VST 用文本记录前序片段、把推理挪到查询前，管的是认知时机。用户当时的原话（ VST 我的复述 ）：「VST 用文本记录流式输入的前序所有片段+前序少数视频帧信息汇总合成回答，而 VideoChat 通过压缩视频帧的token数记更多上下文。两者可以同时进行。」组合后的真实问题是 VideoChat3 的状态 token 与 VST 的「查询即答」在响应时机上要统一调度，双轨记忆冲突时要决定信谁。"
      },
      {
        "h": "全文问答 · Q：VST 与 Video-o3 组合后除了证据冲突还会引入什么结构性问题？（Video-o3 页 2026-08-17 首验漏答半问，09-07 复测通过）",
        "a": "notes/syntheses/video-understanding.html#qa-video-combine-conflict",
        "t": "Q：VST 与 Video-o3 组合后除了证据冲突还会引入什么结构性问题？（Video-o3 页 2026-08-17 首验漏答半问，09-07 复测通过） 「查询即答」和「多轮探索后才答」在响应时机上逻辑冲突，需要新的统一调度决定何时秒答、何时探索；这和 VideoChat3 加 VST 组合时的问题是同一个。证据冲突（文本笔记与局部裁剪片段互相排斥时采信谁）是第二层问题。"
      },
      {
        "h": "全文问答 · Q：TSPO 中答对的一组帧是否意味着每一帧都真正有用？ R_T 是 IoU 吗？（TSPO 页 2026-09-14 首测）",
        "a": "notes/syntheses/video-understanding.html#qa-video-tspo-signal",
        "t": "Q：TSPO 中答对的一组帧是否意味着每一帧都真正有用？ R_T 是 IoU 吗？（TSPO 页 2026-09-14 首测） 不意味着。 R_A 只说明整组帧足以让冻结 MLLM 答对，不能把功劳精确分给某一帧； R_T 用目标片段内选帧数除以总选帧数，偏好更集中的采样，更接近 precision，而不是完整 IoU。Video-MME 提升较小也不是完全失效，而是整体理解问题较多，局部 query 定位优势较弱。"
      },
      {
        "h": "全文问答 · Q（待讨论，2026-09-09 本专题新提）：VST 的流式注意力掩码与 Video-o3 的 TDAM 都是训练期掩码，它们解决的是同一类问题吗？",
        "a": "notes/syntheses/video-understanding.html#qa-video-two-masks",
        "t": "Q（待讨论，2026-09-09 本专题新提）：VST 的流式注意力掩码与 Video-o3 的 TDAM 都是训练期掩码，它们解决的是同一类问题吗？ 库内只能对照，不能下结论。两页各自的事实：VST 的掩码让训练可见性照推理来（视觉只看最近 L 个、文本全可见），同时堵住未来信息泄露与训练-推理分布漂移；TDAM 是分工掩码，调工具时禁看局部裁剪、答题时禁看全局视频，只对 10% 数据施加，防注意力分散与 Fake Thinking。可对照的差别是：前者把「能看到什么」钉在推理架构上，后者把「该看什么」钉在任务阶段上。是否能归纳成一条共同原理，等复测时讨论。"
      },
      {
        "h": "全文 · 证据边界与来源",
        "a": "notes/syntheses/video-understanding.html#boundaries",
        "t": "证据边界与来源 原文报告：四篇的机制描述与数字（16× 压缩、2048 帧 20.4s vs 44.4s；StreamingBench 79.5%、QA 延迟 0.56s vs 8.8s；TSPO 在 MLVU +6.0%、Video-MME +1.1%；Video-o3 MLVU 72.1%、推理 10.2s、8 轮上限）均来自论文页「结果与代价」，可按上表括号回查。 库内对照：把四篇分成感知成本、思考时机、证据获取三个子问题，以及建议阅读顺序，都是本库的组织方式；TSPO 与 Video-o3 的「一次性选帧 vs 查询后多轮搜索」是库内对照，不是论文声称的继承关系。 待验证 / 待讨论：TSPO 与 Video-o3、VideoChat3 组合后的调度与预算是否可行；两种训练期掩码是否同一类问题（本页新提，待讨论）；VideoChat3 状态 token 合并与拆分的利弊（论文未消融，论文页卡壳点已标「论文未讨论」）。 成员与来源：VideoChat3（Zotero itemKey E5RZINH5，入库 2026-07-27）、VST（6XPHGT5T，2026-08-17）、Video-o3（FG746LWN，2026-08-17）、TSPO（QXMPGWGR，2026-09-14）；跨专题引用 GenLIP（EAKWJXT8，2026-08-17）。本页整理日期 2026-09-14。"
      }
    ]
  }
];
