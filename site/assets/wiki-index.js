/* 静态索引。真源：wiki/papers/*.md 与 wiki/syntheses/*.md（front-matter 与正文）、taxonomy.md、review.md。
 * 速览条目与全文投影条目均保留完整导航路径；搜索片段来自真实可见的速览、导读或完整笔记正文。
 * title/essence/relations/速览条目是编辑判断字段，重建时从本文件保留；其余字段全部由真源生成。
 * 消费者读取 href / noteHref / sourceHref，不按 id 拼接目录；type 为 paper 或 synthesis。
 * 使用：node scripts/build-wiki-index.mjs（校验失败会拒绝生成；CHECK_DRY_RUN=1 输出到 stdout）。
 */
window.WIKI_TOPICS = {
  "video-understanding": "视频理解与响应",
  "visual-encoders": "视觉编码器",
  "distillation": "蒸馏与训练预算",
  "structured-output": "结构化输出与定位",
  "reinforcement-learning": "强化学习与对齐"
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
    "id": "tool-use",
    "dim": "mechanism",
    "label": "工具调用",
    "aliases": [
      "native interleaving"
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
    "essence": "4B 全开源 Video MLLM：在视觉编码器里把视频 token 压掉 16 倍，再用状态机自适应分辨率处理流式视频。",
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
        "reason": "本文管感知效率（编码器压 token + 状态机），VST 管认知时机（推理前置 + 文本记忆）；组合需统一调度响应时机",
        "status": "reported"
      },
      {
        "type": "complement",
        "to": "2026-genlip",
        "reason": "I3D-ViT 没讨论 ViT 本身怎么预训练，GenLIP 回答这一层，训出的 ViT 可被 inflate 成 3D 用",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "核心直觉",
        "a": "papers/2026-videochat3.html#essence",
        "t": "4B 全开源 Video MLLM。主张视频的时空冗余应该在视觉编码器里就压掉，而不是把一堆帧的 token 全塞给 LLM：用被撑成 3D 的视觉编码器 I3D-ViT 把视觉 token 砍掉 16 倍，再用像人看直播的状态机自适应分辨率处理流式视频。"
      },
      {
        "h": "一页看懂",
        "a": "papers/2026-videochat3.html#overview",
        "t": "开源 Video MLLM 三通病：泛化差、算力吃不消（LLM 注意力随序列长度二次方涨）、半开源。方法：越早压缩越划算，I3D-ViT 把相邻帧冗余在视觉编码器内部消化（token 除以 16），流式场景用状态机按需切换分辨率（没料 224²，可能有料 448²）。4B 参数 18/19 项指标超 Qwen3-VL-4B；2048 帧延迟 20.4s vs 44.4s。代价：短视频反而略慢，优势要视频够长才显现。"
      },
      {
        "h": "机制 · I3D-ViT 时间维压缩",
        "a": "papers/2026-videochat3.html#mechanism",
        "t": "四步：切成每 T=4 帧一个 chunk；chunk 内联合时空 self-attention；时间池化 T 帧压成 1；pixel shuffle 2×2 空间下采样。总压缩 4×4=16×。技巧叫 inflate（膨胀）：不从零训 3D 编码器，拿预训练图像 ViT（MoonViT）把 2D 空间 attention 撑成 3D 时空 attention，权重直接复用。压缩比是机械性的（池化加下采样，与内容无关），算力永远省；池化前先做时空 attention 的全部意义是靠冗余保真。"
      },
      {
        "h": "机制 · Adaptive Frame Resolution 状态机",
        "a": "papers/2026-videochat3.html#mechanism-2",
        "t": "像人看足球直播：中场倒脚半眯眼，前锋突破瞪大眼。每个时间窗口处理完，模型吐一个状态 token，一身兼两职：既是响应时机决策，又是下一窗口像素预算控制。Silence/Response 回 224²，Standby 升 448²。训练技巧 state-transition mask：全部状态 token 都算 loss 模型学成永远闭嘴；只算切换点模型学会从前一状态猜下一个、根本不看视频。解法：切换点全保留，保持点均匀采样同样多，有效监督 Silence : Standby : Response = 2 : 2 : 1。"
      },
      {
        "h": "卡壳 · 为什么在编码器里压缩",
        "a": "papers/2026-videochat3.html#qa-where-compress",
        "t": "两种开销不对称：视觉编码器近似线性涨，LLM 注意力二次方涨。把压缩从贵的二次方阶段挪到便宜的线性阶段，视频越长越赚（256 帧时反而略慢，2048 帧才大幅反超）。"
      },
      {
        "h": "卡壳 · 相邻帧零冗余时 16× 压缩还成立吗",
        "a": "papers/2026-videochat3.html#qa-zero-redundancy",
        "t": "分两层：算力层永远成立（池化是机械的，与内容无关）；质量层塌掉，池化前做时空 attention 的意义就是靠冗余在压缩中保真，零冗余时等于把 T 个无关场景硬塞进 1 个 token。净结果：速度保住，精度塌掉，设计赌注被违反。"
      },
      {
        "h": "卡壳 · 状态 token 合二为一 vs 拆开",
        "a": "papers/2026-videochat3.html#qa-state-token",
        "t": "合一的好处：监督信号白送（状态标签自带预算语义）、符合快速扫无关、见证据高分辨率细读的直觉。隐患：224² 下小尺度证据（小物体、细微动作、小字幕）可能看不见，模型永不进 Standby、永不放大、错过响应；一个 token 背两个目标，梯度混在一起；论文只消融了动态 vs 固定预算，没消融合并 vs 拆分。"
      },
      {
        "h": "数字与代价",
        "a": "papers/2026-videochat3.html#evidence",
        "t": "16× 视觉 token 压缩；18/19 项指标超 Qwen3-VL-4B；2048 帧延迟 20.4s vs 44.4s，FLOPs 砍 60%+，显存省 26GB；流式 OVO-Timing F1 35.5 vs 8.1；时间定位 TimeLens +9.7、VUE-TR +15.0。局限：ProactiveVQA 输 MMDuet-2；低分辨率监控下小尺度证据可能漏。"
      },
      {
        "h": "关联",
        "a": "papers/2026-videochat3.html#relations",
        "t": "VST：感知效率与认知时机正交可互补；GenLIP：回答这个 ViT 怎么预训练，训出的 ViT 可被 inflate 成 3D 用。baseline：Qwen3-VL-4B、Molmo2-4B、VideoChat-Flash-7B、InternVideo2.5-8B；前作 VideoChat-Flash（层级压缩）、VideoChat-R1（RL 微调）。"
      },
      {
        "h": "完整笔记 · 问题背景",
        "a": "notes/papers/2026-videochat3.html#problem",
        "t": "当时开源 Video MLLM 三个通病：一个模型只擅长一种视频场景（泛化差）；帧率高分辨率上去后视觉 token 爆炸，LLM 注意力 O(序列长度²)（算力吃不消）；强模型只放权重不放数据配方（半开源）。老做法稀疏抽帧等于进模型前就把信息扔了，且相邻帧大量重叠冗余没被利用。"
      },
      {
        "h": "完整笔记 · 三份数据集与四阶段训练",
        "a": "notes/papers/2026-videochat3.html#mechanism",
        "t": "Academic2M（2.27M，用 Qwen3-VL-235B 把短答案改写成带时间证据的丰富回答，判别模型过滤幻觉）；LV116K（长视频 PySceneDetect 切段、逐段标注拼 timeline）；OL617K（离线 QA 转成交错的 Silence/Standby/Response 序列）。四阶段：Stage 0 视觉编码器预训练（临时挂 Qwen3-4B 训完扔掉）到 Stage 3 长视频加流式。"
      },
      {
        "h": "完整笔记 · 我的复述",
        "a": "notes/papers/2026-videochat3.html#restatement",
        "t": "Q1 为什么在编码器压缩：LLM 计算复杂度和上下文长度呈二次方关系，放到 LLM 代价太高。Q2 零冗余：能压缩但很多重要信息会被丢掉。Q3 合二为一：省一份监督数据、推理不用过独立小模块；隐患是低分辨率找证据时小尺度证据容易被忽视。"
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
        "t": "Q：状态 token 合二为一（既管响应时机又管像素预算）vs 拆开，各有什么利弊？ 拆开 ：训练要单独定义「何时开高分辨率」的新监督目标（当前是状态标签白送的）；推理要多过一个小模块，成本上升。 合二为一（当前做法）的好处 ：符合「快速扫无关 → 找到证据后高分辨率细读」的人看直播直觉；监督信号白送；一个 token 同时把响应策略和预算策略一起端到端学。 合二为一的隐患（论文未讨论） ： 1. 低分辨率（224²）监控下， 小尺度证据（小物体/细微动作/小字幕）可能看不见 → 模型永远不进 Standby → 永远不放大 → 错过响应 。这是 Adaptive Frame Resolution 的内生失败模式。 2. 一个 token 背两个目标，梯度把「响应时机」和「预算控制」两路信号混在一起。 3. 论文 Table 6 只消融了「动态 vs 固定预算」， 没消融「合并 vs 拆分」 ，所以我们其实不知道拆开会不会更好。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-videochat3.html#open",
        "t": "还没搞懂 （三道检验题都已补齐，无残留漏洞。若日后复测发现新问题，再回填此处并同步 questions.md。）"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-videochat3.html#relations",
        "t": "关联 VST ： 思路正交、可互补。VideoChat3 管「视觉编码器里压 token + 状态机自适应分辨率/响应时机」=感知效率；VST 管「推理时机前移 + 文本长期记忆」=认知时机。VST 的文本记忆「与视觉记忆机制正交」（VST 论文 limitation 自述），组合是未来方向。 GenLIP ： 正交。VideoChat3 的 I3D-ViT 是把图像 ViT「撑成 3D」处理视频，但没讨论 ViT 本身怎么预训练；GenLIP 回答的正是「这个 ViT 怎么训」：让 ViT 直接做生成式预训练（Prefix-LM + Gated Attention）。GenLIP 训出来的 ViT 可被 VideoChat3 inflate 成 3D 用。 待建概念页：visual tokenizer / ViT / self-attention（二次方开销） / Video MLLM / streaming video understanding / inflate（2D→3D，致敬 I3D CNN） 同领域可对比的 Video MLLM：Qwen3-VL-4B、Molmo2-4B、VideoChat-Flash-7B、InternVideo2.5-8B（均为此文主要 baseline） 同系列前作：VideoChat-Flash（层级压缩）、VideoChat-R1（RL 微调）"
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
    "essence": "让 VideoLLM 边看边想：把 CoT 推理塞进视频流片段之间的等待空档，写进 FIFO 文本记忆，查询时直接读笔记。",
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
        "reason": "VideoChat3 管感知效率，VST 管认知时机；双轨记忆与状态 token 的响应时机需要统一调度",
        "status": "synthesis"
      },
      {
        "type": "compare",
        "to": "2026-video-o3",
        "reason": "推理前置（查询即答 0.56s）vs 查询后多轮检索（10.2s）：实时性与多跳精度的取舍",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "核心直觉",
        "a": "papers/2026-vst.html#essence",
        "t": "让 VideoLLM 边看边想：把链式推理（CoT）切碎塞进视频流每两个片段之间的等待空档里异步执行，写成文本笔记存进固定容量的长期记忆；用户提问时模型已经想完了，直接读笔记秒答，零额外查询延迟。"
      },
      {
        "h": "一页看懂",
        "a": "papers/2026-vst.html#overview",
        "t": "在线视频里深度推理和实时响应天然冲突：流式感知路线只管记忆不做显式推理；离线 CoT 搬过来查询后才开始想，延迟 8.8s 直接不可用。方法：像边看直播边做笔记，推理时机从查询后挪到查询前，每来一个 clip 就在片段间隙把想法写进 FIFO 文本记忆。结果：StreamingBench 79.5%（超 GPT-4o +6.2%）；QA 延迟 0.56s vs Video-R1 的 8.8s。"
      },
      {
        "h": "机制 · 双记忆系统与推理前置",
        "a": "papers/2026-vst.html#mechanism",
        "t": "短期视觉缓冲：滑动窗口只留最近 L 个视觉 token；长期文本记忆：FIFO 固定容量淘汰最旧条目。空档期思考实测均值 7.0s 小于最小触发间隔 16s；万一思考慢于 clip 间隔，回退到最近一次已完成的记忆状态作答：保证不阻塞响应，不保证记忆一定最新。数据是自造的 100K 严格因果 CoT（知识图谱抽三元组、DFS 采多跳证据链、五重过滤），因为现成离线 CoT 是看完全片的全局 hindsight 视角写的，thoughts 里偷藏后文信息，直接训会学成作弊。"
      },
      {
        "h": "机制 · 流式注意力掩码与两阶段训练",
        "a": "papers/2026-vst.html#mechanism-2",
        "t": "流式注意力掩码：训练时强制模拟推理时的可见性，每个 token 只能看到最近 L 个视觉 token，但所有历史文本（笔记、记忆）全部可见。既防信息泄露，又让训练可见性与推理一致，避免分布漂移。VST-SFT 学协议；VST-RL 用 GRPO 每问采 8 条轨迹，奖励只看最终答案，但组相对优势赋给轨迹内全部生成 token（含中间 thoughts），把答案正确性的信用间接传回推理步骤。"
      },
      {
        "h": "卡壳 · 流式掩码除了防泄露还解决什么",
        "a": "papers/2026-vst.html#qa-mask",
        "t": "训练与推理的架构一致性。不加掩码时训练能看全片、推理只能看滑动窗口，分布漂移导致掉点。焊住的框架：掩码是推理可见性的一面镜子，训练是彩排、推理是正式演出。两条规则：「不看未来」永远需要（流式性决定）；「视觉只看最近 L 个」完全跟着推理架构走，推理架构变它就得跟着变。"
      },
      {
        "h": "卡壳 · 长期记忆存的是前序所有片段吗",
        "a": "papers/2026-vst.html#qa-fifo",
        "t": "不是。FIFO 固定容量，只留最近若干条 thought，是最近的思想笔记而非全部历史。旧记忆被挤出正是失败案例里早期证据丢失的根源。"
      },
      {
        "h": "卡壳 · FIFO 明知有损为何不换可检索记忆",
        "a": "papers/2026-vst.html#qa-fifo-why",
        "t": "固定容量 = token 预算可控 = 实时性（可检索记忆每步要检索全库，破坏分摊前提）；且消融显示 FIFO 更新策略本身相对不重要，关键在于有文本记忆，不是记忆管理多精巧。"
      },
      {
        "h": "数字与代价",
        "a": "papers/2026-vst.html#evidence",
        "t": "StreamingBench 79.5%（超开源 SOTA +2.2、超 GPT-4o +6.2）；QA 延迟 0.56s vs 8.8s（15.7× 加速）；VideoHolmes 41.9%；OVO Backward tracing 56.7% 验证长期记忆有效。消融：SFT 补 Backward +9.2、RL 补 Forward +12.7；思考 4 步饱和；3B/7B/32B 全线提升。代价：思考烧额外后台 token；文本记忆有损（早期证据被 FIFO 淘汰、细粒度时间跨度丢失）。"
      },
      {
        "h": "关联",
        "a": "papers/2026-vst.html#relations",
        "t": "VideoChat3：感知效率与认知时机正交可互补。Video-o3：推理前置 0.56s 秒答 vs 推理时主动检索 10.2s 多轮找线索，可互补但响应时机冲突。baseline：Video-R1、LongVILA-R1、StreamForest、TimeChatOnline、Streamo、Dispider。"
      },
      {
        "h": "完整笔记 · 问题背景",
        "a": "notes/papers/2026-vst.html#problem",
        "t": "流式感知（StreamForest、Flash-VStream、VideoLLM-online）只做感知级记忆没有显式推理，多跳时序推理拉胯；离线 CoT（Video-R1 8.8s vs 不推理 0.54s）实时场景不可用。隐藏的坑：离线 CoT 是全局 hindsight 视角写的，thoughts 里偷藏后文信息（信息泄露），模型学成作弊。"
      },
      {
        "h": "完整笔记 · 直觉与两个卡点",
        "a": "notes/papers/2026-vst.html#intuition",
        "t": "看悬疑剧直播边看边记笔记的类比。最容易卡住①：边看边想凭什么不增加延迟？关键在异步加分摊：思考算力被播放时间吸收，增加的是后台算力不是用户感知的响应延迟。卡住②：离线 CoT 数据为什么不能直接训？它是看完全片后写的，思考链里会引用后文信息。"
      },
      {
        "h": "完整笔记 · 我的复述",
        "a": "notes/papers/2026-vst.html#restatement",
        "t": "Q1：VST 利用视频片段传输的时间进行思考，被网络传输掩盖了所以用户感知不到，前提是传输时间远大于等于思考时间。Q2：离线 CoT 是看完整段视频后得到的，直接训会导致未来信息泄漏。Q3：VST 用文本记录流式输入的前序片段信息汇总回答，VideoChat 通过压缩视频帧 token 记更多上下文，两者可同时进行。"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-vst.html#problem",
        "t": "解决什么问题 在线视频理解里，「显式深度推理」和「实时低延迟响应」天然冲突。两条旧路各有死穴： 路线 代表 做什么 痛在哪 ------ ------ -------- -------- 流式感知 StreamForest、Flash-VStream、VideoLLM-online 压视觉 token / KV cache 检索，管好「记忆」 只做感知级记忆，没有显式推理，多跳时序推理（如 VideoHolmes）就拉胯 离线 CoT 直接搬来 Video-R1、LongVILA-R1 查询到达后才一步步推理 QA 延迟爆炸（Video-R1 8.8s vs 不推理的 0.54s），实时场景直接不可用 还有个隐藏的坑：拿现成离线 CoT 数据训流式模型也不行：离线 CoT 是全局 hindsight 视角写的，thoughts 里偷藏后文信息（信息泄露），模型学成「作弊」，流式部署时没未来可看就崩。这是 VST 要造一套严格因果的数据合成管线的根本原因。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-vst.html#intuition",
        "t": "大白话讲解 类比：边看直播边做笔记 想象你看一部长篇悬疑剧直播。两种看法： Video-R1 式：全程干看不动笔，等朋友突然问「凶手什么时候第一次出现？」，你才从头回忆、一步步推理：答得慢（8.8s），还可能因为信息太散想错。 VST 式：你每看一段就随手在笔记本上写一句「这段发生了啥、跟前面有什么联系」，笔记按先进先出留着最近的几条。朋友一问，你翻翻笔记直接答（0.56s），而且因为笔记是边看边理的逻辑链，答得还更准。 「笔记本」= 长期文本记忆（FIFO 固定容量，会淘汰最旧条目）；「当前画面」= 短期视觉缓冲（滑动窗口，只留最近 L 个视觉 token）。两者合称双记忆系统。信息流：视觉 → 思考 → 文本记忆 → 后续思考/答案。 🔧 最容易卡住的点①：「边看边想」凭什么不增加延迟？ 关键在异步 + 分摊。视频流按 clip 断续到达（每 16：32s 来一段），中间有天然空档（clip inter-arrival interval）。模型趁下一段没到的空档把这段的「想法」写完（实测平均 7.0s，P99 11.2s，都 < 最小触发间隔 16s）。这段算力被播放时间吸收了，不挂在查询后的响应时间上。所以 QA 延迟（查询提交→响应完成）只有 0.56s，和不推理几乎一样。它增加的是后台算力，不是用户感知的响应延迟。 万一思考慢于间隔（卡住），VST 回退到最近一次已完成的记忆状态作答：保证「不阻塞响应」，不保证「记忆一定最新」。 🔧 最容易卡住的点②：离线 CoT 数据为什么不能直接拿来训？ 因为它是「看完全片后」写的，思考链里会自然引用后文信息（比如第 3 段的 thought 提到第 7 段才出现的物件）。模型学成「偷看未来」，流式部署时没未来可看就崩。"
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
        "t": "Q：流式注意力掩码除了防信息泄露，还顺带解决了什么？（Q2 漏掉的半问；08-17/08-19/08-28 三次没答出） 训练-推理架构一致性 。训练时不加掩码，模型能 attend 到全片所有视觉 token；推理时滑动窗口只能看最近 L 个。两者分布不一样 → 推理掉点（分布漂移）。掩码让训练时就模拟推理时的滑动窗口（视觉只看最近 L 个，文本全可见），漂移消失。一句话：掩码既 堵未来 （防泄露），又 堵漂移 （对齐架构）。 🔧 08-28 三漏后的重讲版 （前两次「堵未来+堵漂移」口径记不住，换框架才焊住）：掩码不是安全措施，是 彩排规则 ：训练是彩排，推理是正式演出，彩排的可见性必须照演出来。彩排若看全片，模型养成「记不清就回头看远处画面」的习惯，正式演出（滑动窗口）做不到就懵：分布漂移就是彩排和演出的剧本不一致。 锚点：掩码是推理可见性的一面镜子，推理长什么样，训练就照什么样。 由此拆两条规则： - 规则①「不看未来」 ：永远需要，与架构无关：未来片段还没到，流式性本身决定的； - 规则②「视觉只看最近 L 个」 ：需不需要完全跟着推理架构走：推理若改成全片视觉不丢（无窗口），这条必须删，留着反而自己制造新漂移；推理若改成文本只检索 top-3 相关笔记（RAG 式），文本可见性也得跟着改成 top-3。 两个反例变换复验（08-28）均通过，原则可迁移。"
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
        "t": "关联 VideoChat3 ： 思路正交、可互补。VideoChat3 管「视觉编码器里压 token + 状态机自适应分辨率/响应时机」=感知效率；VST 管「推理时机前移 + 文本长期记忆」=认知时机。组合后：视觉记忆保细节 + 文本记忆保逻辑链互补；但 VideoChat3 的状态 token（管响应时机）和 VST 的「查询即答」在时机上逻辑冲突，需设计统一调度，且双轨记忆要决定「回答时谁优先、冲突信谁的」。 Video-o3 ： 同属长视频推理但路线不同。VST 是\"推理前置\"（播放期边看边想，FIFO 文本记忆，查询即答 0.56s），Video-o3 是\"推理时主动检索\"（拿到问题后多轮裁剪视频找线索，10.2s）。VST 解决实时性，Video-o3 解决多跳精度。两者可互补：VST 文本记忆 + Video-o3 工具裁剪组合；但\"查询即答\"vs\"多轮探索\"在响应时机上逻辑冲突，需统一调度。 同领域可对比：Video-R1（query 后长 CoT，重推理高延迟）、LongVILA-R1、StreamForest、TimeChatOnline、Streamo、Dispider。 待建概念页：streaming video understanding / CoT (Chain-of-Thought) / test-time scaling / GRPO / KV cache / dual-memory system"
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
    "essence": "让 ViT 直接说话：用单个 Transformer 的自回归语言建模训视觉编码器预测文本 token，Gated Attention 防 attention sink。",
    "review": {
      "next": "2026-10-07",
      "last": "2026-09-07",
      "count": 2,
      "result": "pass"
    },
    "relations": [
      {
        "type": "compare",
        "to": "2026-last-vit",
        "reason": "同为 ViT attention artifact：生成式预训练的 attention sink（Gated Attention 管）vs 判别式的 lazy aggregation（频域聚合管），正交可组合",
        "status": "synthesis"
      },
      {
        "type": "complement",
        "to": "2026-videochat3",
        "reason": "VideoChat3 回答视频 ViT 怎么处理时空冗余，GenLIP 回答这个 ViT 怎么预训练",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "核心直觉",
        "a": "papers/2026-genlip.html#essence",
        "t": "让 ViT 直接说话：图像 token 和文本 token 拼成一个序列丢进单个 Transformer，用标准的预测下一个词训练。ViT 前半段看图（双向注意力），后半段逐字生成描述（因果注意力），训完扔掉语言头，剩下的就是被生成式目标直接训出来的视觉编码器。"
      },
      {
        "h": "一页看懂",
        "a": "papers/2026-genlip.html#overview",
        "t": "三条旧路各有死穴：对比学习（CLIP/SigLIP）学判别式特征，与生成式下游目标错位；编码器-解码器生成式（AIMv2）ViT 收不到直接梯度；多目标混合（SigLIP2）要 40B 样本。GenLIP：看图写话考试，单塔 Prefix-LM 直接用 next token prediction 训 ViT 本体。结果：仅用 8B 样本（SigLIP2 的 1/5）全规模超越，ALL AVG 73.6 vs 68.9。"
      },
      {
        "h": "机制 · Prefix-LM Attention 一塔两用",
        "a": "papers/2026-genlip.html#mechanism",
        "t": "序列 = 图像 token 拼在前面当前缀，文本 token 排后面。注意力四规则：图像对图像双向全注意力；文本文本因果；图像看不到文本；文本可以看到图像。损失只在文本部分算（next token prediction），图像 token 不计损。位置编码用 MRoPE。两阶段训练：224² 固定分辨率 1B 图文对打底，再 37M 高质量长描述做原生宽高比适配（视觉 token 约束 16 到 1024）。推理退化回标准 ViT：丢掉语言头，Prefix-LM 退化为全注意力，取最后 LN 层过 2 层 MLP 投影给 LLM。"
      },
      {
        "h": "机制 · Gated Attention 防 attention sink",
        "a": "papers/2026-genlip.html#mechanism-2",
        "t": "attention sink：生成式预训练中模型发现捷径，把所有信息往少数几个视觉 token 上汇聚，靠这几个枢纽就能预测文本，其余视觉 token 表征退化。为什么生成式更容易触发（对比学习反而不容易）：关键在梯度路由方式。对比学习的损失作用在全局 pooled 表示上，显式要求所有 token 共同贡献，梯度均匀回传；生成式的损失作用在逐 token 的 next word prediction 上，模型自由选择了少数枢纽捷径并被梯度强化。解法：给注意力输出加可学习门 G = σ(XW_g + b_g)，逐元素乘 Ã = G ⊙ A，压低捷径音量，比加 register token 更简洁。"
      },
      {
        "h": "卡壳 · 为什么生成式更容易触发 attention sink",
        "a": "papers/2026-genlip.html#qa-sink",
        "t": "梯度路由方式不同。对比学习有全局池化逼所有 token 贡献（梯度均匀回传）；生成式的逐 token 预测没有这个约束，文本 token 主动检索视觉信息时，模型自由选择了少数枢纽捷径并被梯度强化。一句话：对比学习有全局池化逼贡献，生成式没这个约束。"
      },
      {
        "h": "卡壳 · 独立文本解码器指什么",
        "a": "papers/2026-genlip.html#qa-decoder",
        "t": "2026-08-24 复测暴露的混淆点：指的是预训练时的组件（AIMv2 式编码器-解码器路线），不是下游 MLLM 的 ViT + MLP connector + LLM 推理接法。后者是 GenLIP 自己推理时也在用的标准接法，两者别搞混。"
      },
      {
        "h": "数字与代价",
        "a": "papers/2026-genlip.html#evidence",
        "t": "数据效率：8B 预训练样本（SigLIP2 的 1/5）所有规模全面超越；g/16 + 7B LLM ALL AVG 73.6 vs 68.9（+4.7）。OCR 统治力：ChartQA +9.9、OCRBench +10.3、DocVQA +12.7（vs SigLIP2）。代价：依赖高质量描述数据；无零样本检索的天然优势（没显式对比目标）；验证限于学术规模 MLLM。"
      },
      {
        "h": "关联",
        "a": "papers/2026-genlip.html#relations",
        "t": "LaSt-ViT 直接对接：同为 ViT attention artifact，GenLIP 在生成式预训练发现 attention sink（少数 token 吸信息）用 Gated Attention 压制；LaSt-ViT 在判别式预训练发现 lazy aggregation（背景抢 CLS）用频域选择性聚合纠正，正交可组合。VideoChat3：GenLIP 训出的 ViT 可被 inflate 成 3D 用。baseline：CLIP、SigLIP、SigLIP2、AIMv2、OpenVision2、CapPa、CoCa。"
      },
      {
        "h": "完整笔记 · 三条旧路死穴",
        "a": "notes/papers/2026-genlip.html#problem",
        "t": "双塔对比学习：目标错位，学的是判别式特征（擅长检索分类），MLLM 是生成式（next token prediction），接入 LLM 后困惑度更高。编码器-解码器生成式（AIMv2、CapPa）：架构冗余加间接优化，ViT 收不到直接梯度信号。多目标混合（SigLIP2、CoCa）：超参难调、训练不稳，需要 40B 样本。"
      },
      {
        "h": "完整笔记 · 我的复述",
        "a": "notes/papers/2026-genlip.html#restatement",
        "t": "Q1：clip/siglip 训练的是嵌入检索等任务而下游 MLLM 需要处理生成任务，任务不兼容；genlip 给 vit 一个简单的 lmhead 让 vit 同时负责图像编码和文本解码生成，任务统一消除错位。Q2 四规则：图像 token 互相可见，文本之间因果、可看到图像及前序文本，图像看不到文本。"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-genlip.html#problem",
        "t": "解决什么问题 给 MLLM 训视觉编码器，三条旧路各有死穴： 路线 代表 做什么 痛在哪 ------ ------ -------- -------- 双塔对比学习 CLIP、SigLIP 图像和文本分开编码，映射到同一空间做对比 目标错位：学的是判别式特征（擅长检索/分类），但 MLLM 是生成式（next token prediction），接入 LLM 后困惑度更高 编码器-解码器生成式 AIMv2、CapPa ViT 编码器 + 独立文本解码器，解码器上算语言建模损失 架构冗余 + 间接优化：ViT 收不到直接梯度信号，得通过解码器传回，效率低、结构复杂 多目标混合 SigLIP2、CoCa 对比 + 生成 + 密集特征多个损失一起上 多目标权衡：超参难调、训练不稳，需要 40B 样本才出好效果 GenLIP 的洞察：既然下游是生成式，预训练也该直接是生成式，而且别绕弯子：让 ViT 本体直接承担生成任务，不挂额外解码器。 ⚠️ 防混淆（2026-08-24 复测暴露）：表中第二条路线的\"独立文本解码器\"是预训练时的组件（AIMv2 式），别和下游 MLLM 的\"ViT + MLP connector + LLM\"推理接法搞混：后者是 GenLIP 自己推理时也在用的接法（2 层 MLP 投影给 LLM），不是预训练对比路线。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-genlip.html#intuition",
        "t": "大白话讲解 类比：看图写话考试 CLIP 式：给学生看一堆图和标题，让他判断\"哪个标题配哪张图\"（选择题）：学会了配对，但不会自己写描述。 AIMv2 式：让学生看图，把图描述交给另一个\"代笔\"去写，学生只负责\"看\"，代笔负责\"写\"：学生收到的反馈是间接的。 GenLIP 式：直接让学生看图写话：自己看、自己写、自己被打分。一个学生端到端学会\"看懂图并用语言表达\"。 训完之后，考试时（当 MLLM 的视觉编码器用），把\"写作文\"的部分（语言头）扔掉，只留\"看图\"的能力：但这个能力是被生成式目标直接优化过的，和下游 LLM 的 next token prediction 天然对齐。 🔧 最容易卡住的点①：单个 Transformer 怎么同时当编码器和解码器？ 靠 Prefix-LM Attention：图像 token 排前面当\"前缀\"，文本 token 排后面，一个 Transformer 同时干了编码器（图像部分，双向）和解码器（文本部分，因果）的活，ViT 本体直接收到语言建模的梯度。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-genlip.html#mechanism",
        "t": "关键机制 ① Prefix-LM Attention：一塔两用 序列 = [图像 token × M] + [文本 token × L]，注意力掩码四条规则： 方向 模式 ------ ------ 图像↔图像 双向全注意力（编码器模式，充分交互形成好的视觉表示） 文本→文本+图像 因果（看全部图像 token + 已生成的文本 token，标准自回归） 图像→文本 不可见（图像在前，因果约束下看不到后面的文本） 文本→图像 可见 损失只在文本部分算（next token prediction），图像 token 不计损。位置编码用 MRoPE（多模态旋转位置编码）处理拼接序列的相对位置。 ② Gated Attention：防注意力陷阱（attention sink） 🔧 最容易卡住的点②：什么是 attention sink？为什么生成式更容易触发？ 定义：生成式预训练中，模型发现捷径：把所有信息往少数几个视觉 token 上汇聚，靠这几个 token 就能预测文本，其余视觉 token 表征退化。 为什么生成式更容易触发（对比学习反而不容易）：关键在梯度路由方式。 对比学习损失作用在全局 pooled 表示上，显式要求所有 token 共同贡献整体表示，梯度均匀回传：没有\"往少数 token 塞\"的激励。 生成式损失作用在逐 token 的 next word prediction 上，文本 token 通过注意力主动检索视觉信息，模型发现\"只往少数枢纽 token 汇聚\"就能预测 → 梯度强化这条捷径 → 其余 token 废掉。没有显式\"均匀贡献\"约束来阻止。 一句话：对比学习有全局池化逼所有 token 贡献；生成式没这个约束，模型自由选择了少数枢纽捷径。 GenLIP 的解法：门控注意力：给注意力输出加可学习门 G = σ(XW_g + b_g)，逐元素乘 Ã = G ⊙ A。门控动态调节每个位置的信息流量：当模型试图往某几个 token 过度汇聚时，门压低这条捷径的\"音量\"，逼模型用更分布式的视觉信息。比加 register token 或 [CLS] token 更简洁。 ③ 两阶段训练 阶段一：低分辨率（224²）固定分辨率预训练，1B 图文对（Dataset-S1），大规模学基础视觉表征，算力高效。 阶段二：原生宽高比适配，37M 高质量长描述数据（Dataset-S2），不强制裁剪成正方形，视觉 token 数约束在 [16, 1024]，只训 1 epoch，快速注入 OCR/图表等细节能力。 ④ 推理：退化回标准 ViT 当视觉编码器用时：丢掉文本分词器和语言头 → 只输入图像 → Prefix-LM Attention 退化为标准全注意力（没有文本，所有视觉 token 自由双向交互）→ 取最后 LN 层输出 → 2 层 MLP 投影到 LLM 空间。"
      },
      {
        "h": "全文 · 结果与代价",
        "a": "notes/papers/2026-genlip.html#evidence",
        "t": "结果与代价 数据效率极高：仅用 8B 预训练样本（SigLIP2 的 1/5），所有规模全面超越 SigLIP2。g/16 + 7B LLM：ALL AVG 73.6 vs SigLIP2 68.9（+4.7）。 OCR 统治力：第二阶段原生宽高比适配后，ChartQA +9.9、OCRBench +10.3、DocVQA +12.7（vs SigLIP2，7B LLM）。 可扩展性：L→So→g 规模稳步提升，SigLIP2 的 So→g 几乎无收益。 消融：同等数据量（2B）下对比 SigLIP（对比式）、OpenVision2（编-解码生成式）、GenLIP，GenLIP 全类别领先，证明\"单塔直接生成式\"范式本身优越。 代价/局限： 依赖高质量描述数据（生成式方法的固有依赖）。 无零样本检索的天然优势（没显式对比目标）。 验证限于学术规模 MLLM，更大规模前沿模型泛化性待验。"
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
        "t": "卡壳点与解答 Q：为什么生成式预训练更容易触发 attention sink（对比学习反而不容易）？（Q3 漏掉的半问） A：关键在梯度信号的路由方式。对比学习损失作用在全局 pooled 表示上，显式要求所有 token 共同贡献整体表示，梯度均匀回传，没有\"往少数 token 塞\"的激励；生成式损失作用在逐 token 的 next word prediction 上，文本 token 通过注意力主动检索视觉信息，模型发现\"只往少数枢纽 token 汇聚\"就能预测 → 梯度强化这条捷径 → 其余 token 废掉。对比学习有全局池化逼所有 token 贡献；生成式没这个约束，模型自由选择了少数枢纽捷径。"
      },
      {
        "h": "全文问答 · Q：为什么生成式预训练更容易触发 attention sink（对比学习反而不容易）？（Q3 漏掉的半问）",
        "a": "notes/papers/2026-genlip.html#qa-sink",
        "t": "Q：为什么生成式预训练更容易触发 attention sink（对比学习反而不容易）？（Q3 漏掉的半问） 关键在 梯度信号的路由方式 。对比学习损失作用在全局 pooled 表示上，显式要求所有 token 共同贡献整体表示，梯度均匀回传，没有\"往少数 token 塞\"的激励；生成式损失作用在逐 token 的 next word prediction 上，文本 token 通过注意力主动检索视觉信息，模型发现\"只往少数枢纽 token 汇聚\"就能预测 → 梯度强化这条捷径 → 其余 token 废掉。 对比学习有全局池化逼所有 token 贡献；生成式没这个约束，模型自由选择了少数枢纽捷径。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-genlip.html#open",
        "t": "还没搞懂 （三道检验题都已补齐，无残留漏洞。若日后复测发现新问题，再回填此处并同步 questions.md。）"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-genlip.html#relations",
        "t": "关联 VideoChat3 ： 正交。VideoChat3 回答「视频 ViT 怎么处理时空冗余」，GenLIP 回答「这个 ViT 怎么预训练」。GenLIP 训出来的 ViT 可被 VideoChat3 inflate 成 3D 用。 LaSt-ViT ： 直接对接。同为 ViT attention artifact，机制和阶段不同：GenLIP 在生成式预训练发现 attention sink（少数 token 吸走信息）用 Gated Attention 压制；LaSt-ViT 在判别式预训练发现 lazy aggregation（背景抢 CLS）用频域选择性聚合纠正。两者正交可组合：Gated Attention 管信息分布、LaSt-ViT 管 CLS 聚合。 同领域可对比：CLIP、SigLIP、SigLIP2（对比式 baseline）、AIMv2、OpenVision2、CapPa（编-解码生成式 baseline）、CoCa（多目标混合）。 待建概念页：ViT / contrastive learning / next token prediction / Prefix-LM / attention sink / gated attention / MRoPE"
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
    "essence": "揭示 ViT 的懒惰聚合根因：全局注意力和粗粒度监督让背景 patch 代替前景成为 CLS 载体，再用频域稳定性逼它回到前景。",
    "review": {
      "next": "2026-10-07",
      "last": "2026-09-07",
      "count": 2,
      "result": "pass"
    },
    "relations": [
      {
        "type": "compare",
        "to": "2026-genlip",
        "reason": "生成式的 attention sink vs 判别式的 lazy aggregation；Gated Attention 管信息分布，LaSt-ViT 管 CLS 聚合，正交可叠加",
        "status": "synthesis"
      },
      {
        "type": "complement",
        "to": "2026-videochat3",
        "reason": "I3D-ViT 基座也可用 LaSt-ViT 的聚合方式改进密集特征",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "核心直觉",
        "a": "papers/2026-last-vit.html#essence",
        "t": "ViT 偷懒：有全局注意力又只有图像级标签时，它发现用大量背景 patch 当全局语义载体就能把分类做对，根本不关心前景在哪，结果分类准但密集预测废。解法是用频域稳定性评分逼 CLS token 只从前景 patch 聚合信息。"
      },
      {
        "h": "一页看懂",
        "a": "papers/2026-last-vit.html#overview",
        "t": "ViT 当通用特征提取器时密集预测（分割、检测）不如 ConvNet：CLS 关注背景而非前景。旧解法治标（Register tokens，PiB 反降）或拆东补西（窗口注意力，分类掉 8%），且没人搞清 artifact 为何产生。LaSt-ViT 先诊断再开药：根因是懒惰聚合 = 粗粒度监督 + 全局注意力，缺一不可。PiB 42.7 升到 55.1；CLIP 零样本分割 VOC 17.1 升到 72.4；12 个基准一致提升且分类不掉，零额外参数、零额外损失。"
      },
      {
        "h": "机制 · 懒惰聚合的两个驱动",
        "a": "papers/2026-last-vit.html#mechanism",
        "t": "诊断工具：Patch Score（CLS 与各 patch 的余弦相似度）、PiB（最高分 patch 落在前景框内的比例）。驱动 1 = 粗粒度监督（只有图像级标签，没有空间指导，背景 patch 远多于前景，靠背景投票就能降 loss）；驱动 2 = 全局注意力（给前景语义扩散到背景的通道）。三者证据：训练初期 PiB 就低（PiB 仅 42.7%，ConvNet 68.4%）；遮掉最高分 50% patch 分类几乎不掉（高分 patch 是捷径）；换窗口注意力 PiB 升到 59.8 但分类掉 8%。"
      },
      {
        "h": "机制 · 频域稳定性评分与 Top-K 聚合",
        "a": "papers/2026-last-vit.html#mechanism-2",
        "t": "每个 patch 的 D 维特征沿通道维做 1D FFT，高斯低通滤波后 IFFT 回来；稳定性分数 = 滤波后特征比上滤波前后差值，分数高 = 低频主导 = 大概率前景。每个通道独立选稳定性最高的 K 个 patch 取均值作为该通道的 CLS 值（不同语义维度可选不同前景区域）。FFT 和 Top-K 都是确定性操作：零可学习参数、不改损失、Top-K 天然可微。为什么频域稳定能分前景背景：是通道维频域特性不是空间连续性，前景物体在深层特征的通道维上语义一致（低频主导），背景混杂多结构（频谱丰富，低通后能量损失大）。"
      },
      {
        "h": "卡壳 · 懒惰聚合的两个驱动因素",
        "a": "papers/2026-last-vit.html#qa-drivers",
        "t": "驱动 1 = 粗粒度监督（只有图像级标签，没有 patch 级空间指导）；驱动 2 = 全局注意力（前景语义扩散到背景的通道）。缺一不可：窗口注意力实验（PiB 升但分类掉 8%）证明全局注意力是帮凶但砍掉得不偿失。"
      },
      {
        "h": "卡壳 · Register tokens 为什么没用",
        "a": "papers/2026-last-vit.html#qa-register",
        "t": "实测加 Register 后 PiB 从 42.7 反降到 41.5（不是没提升，是反降）。高范数只是懒惰聚合的晚期症状，Register 把症状挪走，病因（CLS 往背景跑）还在。ViT needs more than registers，标题说的就是这个。"
      },
      {
        "h": "卡壳 · 频域稳定性的真正机制",
        "a": "papers/2026-last-vit.html#qa-frequency",
        "t": "是通道维频域特性，不是空间连续性。反向论证：空间维的低频是墙壁等平滑区域，恰恰是背景，不能当前景判据。通道维低频的直观图像约等于语义分割的输出图：同一类别同一颜色，同类语义在通道维上变化小。"
      },
      {
        "h": "卡壳 · 适用范式与能否和 GenLIP 组合",
        "a": "papers/2026-last-vit.html#qa-scope",
        "t": "不止对比学习：跨三种判别式预训练通用（标签监督、CLIP 文本监督、DINO 自监督），准确叫法是判别式预训练（对应 GenLIP 的生成式）。能组合：Gated Attention 管信息分布（防少数 token 吸走），LaSt-ViT 管 CLS 聚合（逼从前景取），作用在不同环节，正交可叠加。"
      },
      {
        "h": "数字与代价",
        "a": "papers/2026-last-vit.html#evidence",
        "t": "PiB 三范式：全监督 42.7 升到 55.1、DINO 44.5 升到 69.7、CLIP 39.8 升到 50.1；CLIP ViT-L VOC 零样本分割 17.1 升到 72.4（+55.3）；涌现分割 mIoU 22.3 升到 32.8。局限：K 值敏感（推荐约 50% patch 数）；无明确前景的图（风景、群体）与前景纹理极复杂时可能失效。"
      },
      {
        "h": "关联",
        "a": "papers/2026-last-vit.html#relations",
        "t": "GenLIP 直接对接：生成式 attention sink vs 判别式 lazy aggregation，正交可组合。VideoChat3：I3D-ViT 基座也可用本聚合方式改进密集特征。baseline：Register tokens（Darcet et al.）、MaskCLIP、CLIPSelf、SCLIP、窗口注意力、LOST。"
      },
      {
        "h": "完整笔记 · 偷懒考官类比",
        "a": "notes/papers/2026-last-vit.html#intuition",
        "t": "考试只看总分不看过过程：ConvNet 每个学生（感受野）只能看局部，必须认真看前景才能答对，笨但靠谱；ViT 所有学生能看全图，发现背景跟类别有统计相关，集体抄背景答案，总分很高但你问具体哪是猫，全指向背景。"
      },
      {
        "h": "完整笔记 · 我的复述",
        "a": "notes/papers/2026-last-vit.html#restatement",
        "t": "Q1：懒惰聚合指传统 ViT 训完后倾向于通过背景 token 信息猜测前景信息；原因 1 是背景 patch 占比明显多于前景。Q2：D 维特征做傅立叶变换，过低通滤波器后反变换，计算与变换前后差值的绝对值作为频域稳定性评分；把 K 设成全部 patch 数相当于全局池化，信息会丢失。"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-last-vit.html#problem",
        "t": "解决什么问题 ViT 当通用特征提取器时，密集预测任务（分割、检测、对象发现）不如 ConvNet：CLS token 关注背景而非前景，patch 特征与语义错位。三种旧解法各有死穴： 路线 代表 做什么 痛在哪 ------ ------ -------- -------- Register tokens Darcet et al. 加额外 token 吸走高范数特征 治标不治本：高范数是症状非根因，PiB 没升反降（42.7→41.5） 事后修正 MaskCLIP、CLIPSelf、SCLIP 改最后层注意力或后训练对齐 不从根源阻止，且一种方法只适用一种监督范式 削弱全局依赖 窗口注意力 限制注意力范围 拆东补西：PiB 升了但分类精度掉 ~8% 更关键的是没人搞清楚 artifact 到底为什么产生。LaSt-ViT 先诊断再开药。 🔧 最容易卡住的点①：为什么 Register tokens 没用？ Register 把高范数 token 挪走了，看起来\"artifact 消失了\"。但 Tab.1 实测：加 Register 后 PiB 从 42.7 掉到 41.5（更差）。高范数只是 lazy aggregation 的晚期症状，不是病因：病因是 CLS 往背景跑，你把高范数 token 挪走，CLS 照样往背景跑。\"ViT needs more than registers\"：标题就是在说这个。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-last-vit.html#intuition",
        "t": "大白话讲解 核心发现：懒惰聚合假说 两个诊断工具： Patch Score = CLS token 与各 patch 的余弦相似度：看 CLS 到底\"看\"哪。 Point-in-Box (PiB) = 最高 patch score 落在前景框内的比例：量化 artifact 严重程度。 发现：ViT 的 CLS token 大量关注背景 patch（PiB 只有 42.7%，ConvNet 68.4%），而且： 从一开始就有：训练初期 PiB 就低，全程不改善（不是后期才崩的）。 去掉高分 patch 不影响分类：遮掉 score 最高的 50% patch，ImageNet 精度几乎不掉甚至略升：这些高分 patch（背景）对分类没贡献，是\"捷径\"。 类比：偷懒的考官 想象考试只看总分不看过过程： ConvNet：每个学生（感受野）只能看局部，必须认真看前景才能答对：笨但靠谱。 ViT：所有学生能看全图，发现\"背景占大部分、背景跟类别有统计相关\"，于是集体抄背景答案：总分很高但你问具体哪是猫，全指向背景。 LaSt-ViT：强制 CLS 只从\"靠谱\"的 patch 取信息：用频域稳定性判断哪些是前景。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-last-vit.html#mechanism",
        "t": "关键机制 ① 懒惰聚合根因 = 粗粒度监督 + 全局注意力 粗粒度监督（驱动1）：只有图像级标签 → 没有空间指导告诉模型\"前景在哪\"。自然图背景 patch 远多于前景 → 模型发现\"靠背景投票\"就能最小化分类 loss。 全局注意力（驱动2）：给前景语义扩散到背景的通道。验证：把全局注意力换成窗口注意力，PiB 升（50.1→59.8）但分类掉（-8%），证明全局注意力是帮凶，但简单砍掉得不偿失。 两者缺一不可：光有背景多没全局注意力扩散不了；光有全局注意力没背景多也走不了捷径。 ② 频域稳定性评分 直觉：前景在深层通道维上语义一致（低频主导），背景混杂多结构（频谱丰富、高频多）。 对每个 patch 的 D 维特征做 1D FFT（沿通道维）→ 高斯低通滤波 → IFFT，得滤波后特征 $\\hat{x}$。 稳定性分数：$S_{i,j} = \\frac{\\hat{x}[i,j]}{ \\hat{x}[i,j] - x[i,j] + \\varepsilon}$。 分数高 = 滤波后变化小 = 低频主导 = 大概率前景。 🔧 最容易卡住的点②：为什么\"频域稳定\"能区分前景背景？ 不是空间连续性，而是通道维频域特性。前景物体在深层特征的通道维度上语义一致（同一类内的颜色/纹理/形状在通道维是低频的）；背景包含多种混杂结构，频谱丰富，低通滤波后能量损失大 → 分数低。 ③ 通道级 Top-K 选择性聚合 对每个通道 $j$ 独立选稳定性最高的 K 个 patch，取均值作为该通道的 CLS 值： $$\\mathcal{Q}_{CLS}[j] = \\frac{1}{K}\\sum_{i \\in \\mathcal{I}_K(j)} x_{patch}[i,j]$$ 不同通道可选不同 patch 组合：不同语义维度（颜色/纹理/形状）的前景区域可能不同。 ④ 无额外参数、无额外损失 聚合模块零可学习参数（FFT 和 Top-K 都是确定性操作）。 不改损失函数：原有分类/对比/DINO 损失不变，只是 CLS 的构成方式变了。 Top-K 天然可微（被选中 token 传梯度，未选的为 0）。"
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
        "t": "卡壳点与解答 Q：懒惰聚合的两个驱动因素是什么？（Q1 漏掉的半问） A：驱动1 = 粗粒度监督（只有图像级标签，没有 patch 级空间指导）；驱动2 = 全局注意力（给前景语义扩散到背景的通道）。两者缺一不可：光有背景多没全局注意力扩散不了，光有全局注意力没背景多也走不了捷径。验证：窗口注意力限制全局依赖后 PiB 升但分类掉 8%，证明全局注意力是帮凶。 Q：Register tokens 为什么没用？靠什么实验证据推翻？（Q1 漏掉的半问） A：Tab.1 实测：加 Register 后 PiB 从 42.7 掉到 41.5（更差，不是\"没提升\"而是\"反降\"）。高范数只是 lazy aggregation 的晚期症状，Register 把症状挪走但病因（CLS 往背景跑）还在。 Q：频域稳定性区分前景背景的真正机制是什么？（Q2 精化） A：不是\"空间连续性\"，而是通道维频域特性：前景物体在深层特征的通道维度上语义一致（低频主导），低通滤波后变化小；背景混杂多种结构（频谱丰富、高频多），低通后能量损失大。是深层特征的统计规律。 （2026-08-24 复测补充，复述时自生成的类比，比原文表述更直观）反向论证：空间维的低频=墙壁等平滑区域，恰恰是背景，不能当前景判据；通道维低频的直观图像 ≈ 语义分割的输出图：同一类别同一颜色，同类语义在通道维上变化小。 Q：LaSt-ViT 适用于什么预训练范式？（Q3 纠偏） A：用户答\"对比学习\"范围窄了。LaSt-ViT 跨三种判别式预训练范式通用：标签监督（分类）、文本监督（CLIP 对比）、自监督（DINO 自蒸馏）。对比学习只是其中一种。准确叫法是\"判别式预训练\"（对应 GenLIP 的\"生成式\"）。 Q：两者的解法能否组合？（Q3 漏掉的半问） A：能。Gated Attention 管\"信息分布\"（防少数 token 吸走），LaSt-ViT 管\"CLS 聚合\"（逼 CLS 从前景取），作用在 ViT 不同环节，正交可叠加。"
      },
      {
        "h": "全文问答 · Q：懒惰聚合的两个驱动因素是什么？（Q1 漏掉的半问）",
        "a": "notes/papers/2026-last-vit.html#qa-drivers",
        "t": "Q：懒惰聚合的两个驱动因素是什么？（Q1 漏掉的半问） 驱动1 = 粗粒度监督 （只有图像级标签，没有 patch 级空间指导）；驱动2 = 全局注意力 （给前景语义扩散到背景的通道）。两者缺一不可：光有背景多没全局注意力扩散不了，光有全局注意力没背景多也走不了捷径。验证：窗口注意力限制全局依赖后 PiB 升但分类掉 8%，证明全局注意力是帮凶。"
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
        "t": "Q：两者的解法能否组合？（Q3 漏掉的半问） 能。Gated Attention 管\"信息 分布 \"（防少数 token 吸走），LaSt-ViT 管\"CLS 聚合 \"（逼 CLS 从前景取），作用在 ViT 不同环节，正交可叠加。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-last-vit.html#open",
        "t": "还没搞懂 （四道检验题都已补齐，无残留漏洞。若日后复测发现新问题，再回填此处并同步 questions.md。）"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-last-vit.html#relations",
        "t": "关联 GenLIP ： 直接对接。同为 ViT attention artifact，机制和阶段不同：GenLIP 在生成式预训练发现 attention sink（少数 token 吸走信息）用 Gated Attention 压制；LaSt-ViT 在判别式预训练发现 lazy aggregation（背景抢 CLS）用频域选择性聚合纠正。两者正交可组合：Gated Attention 管信息分布、LaSt-ViT 管 CLS 聚合。 VideoChat3 ： 间接相关。VideoChat3 的 I3D-ViT 基座也可用 LaSt-ViT 的聚合方式改进密集特征。 同领域可对比：Register tokens（Darcet et al.，治标不治本）、MaskCLIP/CLIPSelf/SCLIP（事后修正）、窗口注意力（拆东补西）、LOST（对象发现 baseline）。 待建概念页：ViT / CLS token / attention sink / lazy aggregation / Patch Score / Point-in-Box / frequency domain analysis / FFT"
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
    "essence": "像侦探破案一样看视频：模型在共享上下文里循环找线索、裁剪放大、连逻辑并回答，工具调用由模型自己生成。",
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
        "reason": "推理时机：VST 查询前写笔记秒答，Video-o3 查询后多轮裁剪找线索；实时性与多跳精度的取舍",
        "status": "synthesis"
      },
      {
        "type": "complement",
        "to": "2026-videochat3",
        "reason": "VideoChat3 决定看多少像素（感知效率），Video-o3 决定看哪里（检索精度）",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "核心直觉",
        "a": "papers/2026-video-o3.html#essence",
        "t": "像侦探破案一样看视频：先粗扫全片，发现疑点主动放大某段细看，看完再决定继续找还是收网作答。找线索和答题在同一个共享上下文里交替进行，模型自己决定何时调工具、调哪里、用多少分辨率、何时停。"
      },
      {
        "h": "一页看懂",
        "a": "papers/2026-video-o3.html#overview",
        "t": "长视频两个老毛病：均匀采样把稀疏关键证据淹没在冗余里；已有找线索加答题方案两阶段割裂，上下文不共享、手工规则控时机。方法：单一共享上下文里循环思考、调 VideoCrop 裁剪放大、再思考，工具调用由模型自己生成的文本触发（原生交错）。MLVU 72.1%、Video-Holmes 46.5% 均领先；推理 10.2s 比解耦方法快 46%。"
      },
      {
        "h": "机制 · 回合制找线索循环",
        "a": "papers/2026-video-o3.html#mechanism",
        "t": "输入 = 工具说明 + 问题 + 全局低分辨率视频。循环：think 分解问题评估证据；不够则 grounding 指定时间区间加分辨率配额（coarse/medium/fine）；VideoCrop 执行裁剪，局部高分辨率片段拼回上下文；回到思考或直接 answer 终止。评估上限 8 轮，视觉上下文上限 32k token。训练数据 Seeker-173K 自造：线索定位、有效性验证、轨迹生成、逻辑一致性检查。"
      },
      {
        "h": "机制 · TDAM 与 VTGR 两个问题两个解法",
        "a": "papers/2026-video-o3.html#mechanism-2",
        "t": "共享上下文问题 1 注意力分散（全局、局部、推理文本混杂，更严重的是 Fake Thinking：模型通过工具找到正确证据，最终答案却和中间推理矛盾）配 TDAM：生成工具调用时禁止看局部裁剪（只靠全局做定位规划），生成最终答案时禁止看全局（只靠工具局部证据作答），只对 10% 数据加掩码（全加会丧失全局加局部综合能力，20%/30% 反降）。问题 2 上下文效率（token 膨胀、不知何时停）配 VTGR：R = r_a·(1+β)+r_f，β 由 Hybrid Clue Score（裁剪区间与真实证据的 IoU/IoP/IoG 对齐度，奖找得准）乘 Turn Decay（轮数衰减，奖找得快）构成；答错 β 不生效，超轮数轨迹不产梯度。"
      },
      {
        "h": "卡壳 · 共享上下文的两个核心问题",
        "a": "papers/2026-video-o3.html#qa-two-problems",
        "t": "(1) 注意力分散（全局/局部混杂 + Fake Thinking）对应 TDAM 的 10% 硬掩码。(2) 上下文效率（token 膨胀 + 不知何时停）对应 VTGR（Clue Score 奖裁得准、Turn Decay 惩轮数多）。两个问题两个解法是配对的。"
      },
      {
        "h": "卡壳 · VST 和 Video-o3 的推理时机",
        "a": "papers/2026-video-o3.html#qa-timing",
        "t": "VST 在查询前（播放期边看边写笔记，查询到了读笔记秒答）；Video-o3 在查询后（拿到问题才在单一上下文里多轮调工具找线索）。一句话：VST 是先把笔记做好问就秒答，Video-o3 是拿到问题才去翻监控放大看。"
      },
      {
        "h": "卡壳 · 两者组合的结构性问题",
        "a": "papers/2026-video-o3.html#qa-combine",
        "t": "查询即答和多轮探索后才答在响应时机上逻辑冲突，需要设计统一调度（何时秒答、何时探索），和 VideoChat3 + VST 组合时遇到的是同一类问题。"
      },
      {
        "h": "数字与代价",
        "a": "papers/2026-video-o3.html#evidence",
        "t": "MLVU 72.1%（超 VideoZoomer 65.2）、Video-Holmes 46.5%、LVBench 47.6%；MLVU 推理 10.2s vs VideoChat-R1.5 的 18.9s（共享上下文吃 KV Cache 增量计算红利）。消融：删 Hybrid Clue Score 工具调用率和准确率同时暴跌；删 Turn Decay 调用率升准确率降（过度探索）；省 SFT 冷启动 RL 出现 dip-and-recover。局限：8 轮上限、工具单一（只有 VideoCrop）、Fake Thinking 未根治。"
      },
      {
        "h": "关联",
        "a": "papers/2026-video-o3.html#relations",
        "t": "VST：推理前置 0.56s 秒答（实时性）vs 推理时主动检索 10.2s（多跳精度），文本记忆加工具裁剪可组合但响应时机冲突。VideoChat3：感知效率 vs 检索精度互补。baseline：Qwen2.5-VL、Video-R1、VideoChat-R1.5、Video-RTS、VideoZoomer、LOVE-R1。"
      },
      {
        "h": "完整笔记 · 原生是什么意思",
        "a": "notes/papers/2026-video-o3.html#intuition",
        "t": "原生（native）：工具调用不是外部脚本触发的，而是模型自己生成的文本，模型在推理过程中自己写出 grounding JSON（时间区间加采样策略），系统执行后把裁剪结果拼回对话。模型必须学会何时调、调哪里、用多少分辨率、何时停。"
      },
      {
        "h": "完整笔记 · 我的复述",
        "a": "notes/papers/2026-video-o3.html#restatement",
        "t": "Q1：原生的工具调用是由模型自己产生、触发的；video-o3 给 10% 的数据加片段 mask，生成工具调用时禁止看局部裁剪片段，生成答案时禁止看全局视频。Q2：fake thinking 指思考过程中实际已找到证据链，但回答时给出相反结论，原因是共享上下文把全局推理、局部片段混杂在一起把模型带偏。"
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
        "t": "Q：共享上下文带来的两个核心问题分别是什么？各对应什么解法？（Q1 漏掉的半问） (1) 注意力分散 （全局/局部混杂 + Fake Thinking）→ TDAM（10% 掩码）。(2) 上下文效率 （每调一次工具 token 膨胀 + 不知何时停）→ VTGR（ S_{clue} 奖励裁得准 + \\gamma 惩罚轮数多）。两个问题两个解法是配对的。"
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
        "t": "关联 VST ： 同属长视频推理但路线不同。VST 是\"推理前置\"（播放期边看边想，FIFO 文本记忆），Video-o3 是\"推理时主动检索\"（动态裁剪视频，工具调用）。VST 解决实时性（0.56s），Video-o3 解决多跳精度（46.5% VideoHolmes）。两者可互补：VST 的文本记忆 + Video-o3 的工具裁剪组合；但\"查询即答\"vs\"多轮探索\"在响应时机上逻辑冲突，需统一调度。 VideoChat3 ： 视觉策略互补。VideoChat3 靠编码器压缩+状态机决定看多少像素，Video-o3 靠推理时工具调用决定看哪里。一个管感知效率，一个管检索精度。 同领域可对比：Video-R1（文本 CoT，视觉固定）、VideoChat-R1.5/Video-RTS（解耦迭代推理）、VideoZoomer、LOVE-R1。 待建概念页：multi-hop reasoning / tool invocation / attention masking / GRPO / KV cache / test-time scaling"
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
    "essence": "模型自己做 8 遍题，多数投票伪解作为教师特权上下文，只在答错轨迹上逐 token 前向 KL 蒸馏，去掉 GT 依赖。",
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
        "reason": "散度排序完全颠倒（本文必须 forward KL，S²VOPD 是 JSD 最好）；用信息可恢复性统一解释是库内假说",
        "status": "hypothesis"
      },
      {
        "type": "complement",
        "to": "2026-open-mopd",
        "reason": "正交切片：本文管单教师信号从哪来（无 GT 自蒸馏），Open-MOPD 管多教师怎么分账；组合方案成立",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "核心直觉",
        "a": "papers/2026-u-opsd.html#essence",
        "t": "让模型给自己的答错题开小灶：它自己把一道无答案的题做 8 遍，多数票当标准答案，专门拿答错的那几版去对照看过答案的自己逐 token 纠正，全程不需要任何外部答案。首个完全无外部监督的 on-policy 自蒸馏。"
      },
      {
        "h": "一页看懂",
        "a": "papers/2026-u-opsd.html#overview",
        "t": "后训练谱系每往右一步去掉一类外部依赖：SFT 要 GT 解且教师强制导致训练推理失配；GRPO 要 GT 答案做奖励且信号稀疏；OPD 要外部强教师；OPSD 参数自共享但教师仍多看 GT 解。U-OPSD 用自己投票出来的伪解 y+ 替代 GT。Non-thinking 模式 4B/8B 比基座 +8.5/+10.7，无 GT 反而超过有 GT 的 OPSD（+3.2/+2.3）。代价：伪标签 13.3% 是错的，构成性能硬上界。"
      },
      {
        "h": "机制 · 采样到投票到门控到蒸馏",
        "a": "papers/2026-u-opsd.html#mechanism",
        "t": "Sample：冻结策略独立采样 G=8 条 rollout。Vote：多数票赢的当伪答案；一致性 c(x) = 同意票数/G，分母是 G，截断废票直接拉低分数。Gate：c(x) 小于 τ=0.5 或全对则跳过不学，自发课程只学能形成共识但时不时跑偏的能力边界题。Distill：教师输入 x + y+ + y⁻<t，学生输入 x + y⁻<t，两者共享错答前缀，教师比学生多出来的只有 y+（一条完整的同意 rollout，整条喂入不截断）；沿答错 rollout 逐 token 前向 KL。学生若也看了 y+，教师等于学生，KL 恒 0。"
      },
      {
        "h": "机制 · 三个消融出的硬取舍",
        "a": "papers/2026-u-opsd.html#mechanism-2",
        "t": "教师必须看完整推理轨迹：label-only 掉 10.3 到 15.8%，光知道答案是 42 无法引导中间步骤。必须 forward KL：reverse KL 训练崩塌（长度 2.7k 到 99k、boxed 率 99% 到 33%、丧失终止，塌成复读机）；JSD 掉 13.8%。必须全词表分布蒸馏：sampled-token 掉 13.7%，且伪标签下差距比 GT 下更大；top-100 截断反而最好。"
      },
      {
        "h": "卡壳 · 为什么必须前向 KL",
        "a": "papers/2026-u-opsd.html#qa-fwd-kl",
        "t": "厨师比喻：前向 KL（老师会的学生都得会，漏掉任何一道就罚）是 mode-covering，学生变全面厨师；反向 KL（学生敢做老师菜单外的菜就罚）是 mode-seeking，学生死抱老师概率最高的招牌菜塌成复读机。易记偏两处：反向 KL 罚的是学生越菜单；实测失败模式是复读塌缩（长度爆炸、无限重复、丧失终止），不是幻觉。"
      },
      {
        "h": "卡壳 · 13.3% 错标签为什么没带偏模型",
        "a": "papers/2026-u-opsd.html#qa-13-3",
        "t": "13.3% 的伪标签错误率。四重设计抬高净收益：门控先拦截瞎猜题（13.3% 是过门后的错误率）；自发课程聚焦能力边界（大多数时候对的题上 y+ 大概率对）；前向 KL 加全词表是稠密信号，一条 rollout 数百个纠正点，正梯度盖过少数错 y+ 的负梯度；教师不需要 y+ 完美，只需多数方向对，噪声 token 被平均。"
      },
      {
        "h": "卡壳 · y+ 是答案值还是整条轨迹",
        "a": "papers/2026-u-opsd.html#qa-y-plus",
        "t": "ã(x) 是单值（如 boxed 42），用来投票和分组；y+ 是通向 ã(x) 的整条推理轨迹（几百上千 token），整条喂教师当背景知识，不截断。<t 只在 y⁻ 上，因为蒸馏沿答错那条逐 token 往前走，t 每加 1 在新位置算一次师生下一 token 分布的 KL。label-only 消融掉 10.3 到 15.8% 的来由正是只给答案值，教师不知道怎么走到这个答案。"
      },
      {
        "h": "卡壳 · 共识当上下文 vs TTRL 标量奖励",
        "a": "papers/2026-u-opsd.html#qa-ttrl",
        "t": "TTRL/RENT/Intuitor 把多数投票当标量奖励（整条 rollout 一个数，稀疏）；U-OPSD 把共识当教师的特权上下文（y+ 拼进教师输入，每个 token 都有完整下一 token 分布，稠密）。同样 rollout 预算领先 7 到 11 个点的本质原因。"
      },
      {
        "h": "数字与代价",
        "a": "papers/2026-u-opsd.html#evidence",
        "t": "Non-thinking +8.5/+10.7（4B/8B），超有 GT 的 OPSD +3.2/+2.3；对比无标签 RL（TTRL/RENT/Intuitor）领先 7.0 到 11.3；thinking +2.2/+1.9 与 OPSD 打平（基座已强 headroom 小加长 rollout 完成投票少）；MoE 迁移 75.77 升到 77.46；τ=0.3 优于默认 0.5。局限：伪标签 13.3% 错误率是硬上界；只在竞赛数学验证，开放式生成需换软共识；增益依赖基座中等偏强；缺 seed 误差棒。"
      },
      {
        "h": "关联",
        "a": "papers/2026-u-opsd.html#relations",
        "t": "Open-MOPD：正交切片，本文管单教师信号从哪来，它管多教师怎么分账，组合方案成立（多个自蒸馏伪教师加三机制）。S²VOPD：视觉域对应，两篇散度排序完全颠倒。未来钩子：on-policy distillation（DistiLLM 系列）、self-consistency（Wang et al. 2023）、推理预算控制（Thinkless、BudgetThinker）入库时回链本页。"
      },
      {
        "h": "完整笔记 · 后训练谱系",
        "a": "notes/papers/2026-u-opsd.html#problem",
        "t": "SFT：要标好的答案，teacher-forcing 导致训练推理失配加灾难性遗忘。GRPO：要 GT 答案做可验证奖励，奖励稀疏（一整条 rollout 一个 0/1 序列级 advantage）。OPD：要外部更强教师的逐 token 分布。OPSD：参数自共享但教师比学生多看 GT 解 y*，让教师更强的信息仍来自模型之外。U-OPSD 把最后这层 GT 解也去掉，痛点是 GT 标注的成本与稀缺。"
      },
      {
        "h": "完整笔记 · 我的复述",
        "a": "notes/papers/2026-u-opsd.html#restatement",
        "t": "用户原话：学生模型 rollout G 条轨迹；统计共识最大的那条占总轨迹数比例是否大于 τ，小于则扔掉，全对全错则这条样本直接丢掉；然后取共识轨迹作为 y+，与共识轨迹相反结论的一条轨迹为 y⁻，给教师 x y+ y⁻<t，给学生 x y⁻<t，逐 token 算前向 KL，教师多看了共识轨迹 y+。"
      },
      {
        "h": "完整笔记 · 符号对齐表",
        "a": "notes/papers/2026-u-opsd.html#pitfalls",
        "t": "y+：一条完整的同意 rollout（结尾 boxed 共识答案），多个 token，无 <t，整条喂教师不截断。y⁻：一条完整的反对 rollout。y⁻<t：y⁻ 的前 t 个 token，随 t 推进变长。教师输入 = 题目 + 完整参考解 y+ + y⁻ 的前 t 个 token；学生输入 = 题目 + y⁻ 的前 t 个 token；教师多看这一整条，两者共享随 t 一格格变长的前缀。"
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
        "t": "结果与代价 Non-thinking 模式：Qwen3-4B/8B 比基座 +8.5%/+10.7%，无 GT 反而超过有 GT 的 OPSD（+3.2%/+2.3%），也超过 SFT/GRPO。对比无标签 RL（TTRL/RENT/Intuitor）领先 7.0：11.3%：\"共识当条件上下文做稠密蒸馏\"远胜\"共识当标量奖励做 RL\"。 Thinking 模式：+2.2%/+1.9%，与 OPSD 打平/略胜。增益小因基座已强（74.9/76.1）headroom 小 + rollout 太长同 token 预算下完成投票少。 Instruct 模型：30B-A3B-Instruct 75.77→77.46，配方免调优迁移到 MoE 大模型。 代价/局限： 伪标签 13.3% 是错的：性能硬上界，会强化多数错误；未测故意污染投票的训练动态。 只在可抽取、可规范化最终答案的任务（竞赛数学）上验证；开放式生成需把精确匹配换软共识（如 embedding 相似度投票）。 增益依赖基座能力：太弱投票乱、太强没 headroom，中等偏强最典型。 缺 seed 重复误差棒。 τ 默认 0.5 非最优：扫描里 τ=0.3 最好（58.59 vs 57.10，跨度 14.2%）。 三个关键设计取舍（消融）： 教师必须看完整推理轨迹，不能只看 boxed 答案：label-only 掉 10.3：15.8%，甚至低于基座（光知道\"答案是 42\"无法引导中间步骤）。 必须 forward KL，不能 reverse KL / JSD：reverse KL 训练崩了（生成长度 2.7k→99k 字符爆炸，boxed 率 99%→33%，丧失终止能力，无限重复短语直到预算耗尽）；JSD 掉 13.8% 回到基座。forward KL 有 mode-covering 倾向，reverse KL 是 mode-seeking 会塌缩。 必须全词表分布蒸馏，不能 sampled-token：student-token-only 掉 13.7%；且该差距在伪标签下比 GT 下更大（AIME25 领先 17.8% vs 2.0%）。好消息：top-100 截断反而最好（59.01），实用降本。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2026-u-opsd.html#ai-notes",
        "t": "AI 预读备注 Zotero AI Butler 两份子笔记（task=summary/table，zhipu/glm-5.3 生成，2026-08-19）做预读底稿。 AI-Butler 摘要笔记 itemKey：2ZRTZGPX（task=summary），provider/model：zhipu/glm-5.3 glm-5.3 的复现级摘要笔记质量很高，已覆盖方法 pipeline 全八步、消融全表、failure case、伪代码与常见坑，与原文交叉核对一致。本文讲解在其基础上做了三点提炼：(a) 把\"为什么只蒸馏 disagreeing rollout 而非模仿 agreeing\"讲清（SFT teacher-forcing vs on-policy 条件蒸馏的本质区别）；(b) 把 13.3% 错标签的净正收益机制补全（门控+课程+稠密信号三重设计抬高天花板）；(c) 明确\"全词表蒸馏在伪标签下比 GT 下更重要\"（noise 放大效应）。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2026-u-opsd.html#restatement",
        "t": "我的复述 （费曼检验时原话保留） 训练 step：1. 学生模型 rollout G 条轨迹；2. 统计 G 条轨迹共识最大的那条占总轨迹数比例是否大于 τ，如果小于则扔掉，如果大于则留下，全对全错的情形则这条样本直接丢掉；3. 然后取共识轨迹作为 y+，与共识轨迹相反结论的一条轨迹为 y⁻，给教师 x y+ y⁻<t，给学生 x y⁻<t，然后逐 token 算前向 KL，共享的上下文为问题和 y⁻，教师多看了共识轨迹 y+，为什么变强的原因是对于已经训练充分的模型，很多问题是他大部分时间能答对偶尔打不对，通过 U-OPSD 让他强化这类的信息从而提升模型的能力。"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2026-u-opsd.html#pitfalls",
        "t": "卡壳点与解答 Q：Q1 上下文谁看 y+/y⁻，最初答反了\"学生看到 y+\"。 A：纠正后：教师 x + y+ + y⁻<t（看 y+），学生 x + y⁻<t（不看 y+）。两者共享 x + y⁻<t，教师多出的只有 y+。学生若也看 y+，则教师=学生 KL 恒 0 无信号；学习信号正是从\"教师知答案、学生不知\"的差里长出来。后确认是手误打反（原意为学生见 y⁻）。 Q：13.3% 的错标签为什么没把模型带偏？ A：会被强化（真实风险），但有四重设计抬高净收益：① 门控 c(x)<τ 先拦截大部分瞎猜题：13.3% 是过门后的错误率；② 自发课程聚焦\"能力边界\"（大多数时候对的题上 y+ 大概率对）；③ 前向 KL+全词表是稠密信号（一条 rollout 数百个纠正点），少数错 y+ 的负梯度被对 y+ 正梯度盖过；④ 教师不需要 y+ 完美，只需多数方向对，少数噪声 token 被平均。结论：13.3% 是真实天花板，但门控+课程+稠密信号把它抬到比有 GT 的 OPSD 还高。 Q：Q3\"共识被用作上下文\"不确定对不对。 A：对，就是这一句话。TTRL/RENT/Intuitor 把多数投票/置信度当标量奖励（整条 rollout 一个数，稀疏，信息被压成 scalar）；U-OPSD 把共识当教师的特权上下文（y+ 拼进教师输入，每个 token 都有教师完整下一 token 分布，稠密）。同样 rollout 预算领先 7：11 个点的本质原因。 Q：thinking 模式为什么增益小？ A：三层原因（原文均给出）：① 基座已强（74.9/76.1）headroom 小；② thinking rollout 太长，同 token 预算下完成投票少；③ 长 rollout 截断多，截断是无效 rollout 拉低 c(x)（分母是 G 不是有效数）。 Q：为什么必须前向 KL，反向 KL 会崩？（散度方向的直觉） A：一句话：前向 KL 是\"学生全面模仿老师\"（老师会的都得会），反向 KL 是\"学生只学老师最拿手的几招、别的宁可不碰\"。用厨师比喻：老师会做 100 道菜（5 道招牌+95 道偶尔做）。前向 KL KL(老师‖学生)：凡是老师做的学生都得会，学生漏掉任何一道（哪怕老师低概率的菜）就被罚无穷大 → 学生覆盖（mode-covering）老师所有可能，变成全面厨师。反向 KL KL(学生‖老师)：凡是学生做的老师必须也会，学生敢做老师菜单外的菜就被罚无穷大 → 学生追逐（mode-seeking）老师概率最高的那座峰，死死抱住招牌菜、其余全放弃（因为窝在招牌菜里才安全）。 数学判据（不用记公式）：老师分布有多个峰时，前向 KL 的学生试图同时覆盖所有峰（谷底也填一点），反向 KL 的学生只选一座峰抱死、其他峰看不见。 （2026-08-24 复测暴露）易记偏两处：① 反向 KL 罚的是学生做老师菜单外的菜（不是\"要求老师会徒弟的菜\"）；② 反向 KL 的实测失败模式是复读塌缩（长度 2.7k→99k 爆炸、无限重复、丧失终止能力），不是幻觉。 在 U-OPSD 里：教师（看过伪解 y+）沿答错 rollout 每个 token 给出下一 token 分布，概率集中在少数\"正确方向\"token 上但也给别的留小概率。前向 KL → 学生覆盖教师所有给过概率的 token，稳收敛，变成\"每个 token 上都更接近知答案的自己\"。反向 KL → 学生只敢追逐教师概率最高的一个 token、别的全放弃 → 塌缩成只会反复输出那几个 token 的复读机。论文实测正是这套塌缩：生成长度 2.7k→99k 字符爆炸、boxed 答案率 99%→33%、丧失终止能力（无限重复某短语/LaTeX 命令/括号直到预算耗尽，不是在推理）。JSD（对称，β=0.5）掉 13.8% 回基座水平：对称散度不偏向覆盖也不偏向追逐，长序列生成里两头不讨好。结论：逐 token 分布蒸馏必须前向 KL，反向 KL 从机制上就鼓励学生走极端。 Q：y+ 是单个 token 还是多个 token？<t 为什么只在 y⁻ 上不在 y+ 上？ A：y+ 是多个 token：一整条完整的解题轨迹，不是单个 token，也不是单个答案值。 把符号对齐： 符号 是什么 几个 token 有无 <t --- --- --- --- y+ 一条完整的同意 rollout（整个解题过程，结尾 \\boxed{共识答案}） 多个（几百~上千） 无：整条喂教师，不截断 y⁻ 一条完整的反对 rollout（整个解题过程） 多个（几百~上千） 无：也是整条 y⁻<t y⁻ 的前 t 个 token（前缀） t 个，逐步增长 有：随 t 推进前缀变长 <t 是\"截到第 t 个位置为止\"的意思，只在 y⁻ 上出现、不在 y+ 上出现，因为蒸馏是沿 y⁻（答错那条）逐 token 往前走的：t 从 1 走到 y⁻ 全长，前缀一格格变长；而 y+ 这条\"参考答案\"是整条一起拼进教师输入当背景知识，不需截断。 一个 token 位置 t 的画面： 教师输入: [题目 x] + [完整参考解 y+ ........boxed] + [y⁻ 的前 t 个 token ...] 学生输入: [题目 x] + [y⁻ 的前 t 个 token ...] ↑ ↑ 教师多看这一整条 两者共享的前缀 (完整,不截断) (随 t 一格格变长) y+ 是\"心里有数的完整答案\"，y⁻<t 是\"学生正在解题、走到第 t 步\"的状态模拟。t 每加 1，在新位置算一次教师/学生下一 token 分布的 KL，产生一个梯度，沿 y⁻ 走完全长累计成总损失。 [这里最容易卡住] 别把 y+ 误当成共识答案值 ã(x) 本身（即 \\boxed{42} 这个单值）。ã(x) 是单值，用来投票和分组；y+ 是通向 ã(x) 的整条推理轨迹，用来喂教师当上下文。 这正是消融\"label-only（只给教师看 boxed 答案）掉 10.3：15.8%\"的来由：只给一个答案值没用，教师不知道\"怎么走到这个答案\"，没法在每个 token 上给出\"已知这条路的我现在该怎么走\"的指引。y+ 必须是完整轨迹。"
      },
      {
        "h": "全文问答 · Q：Q1 上下文谁看 y+/y⁻，最初答反了\"学生看到 y+\"。",
        "a": "notes/papers/2026-u-opsd.html#qa-context",
        "t": "Q：Q1 上下文谁看 y+/y⁻，最初答反了\"学生看到 y+\"。 纠正后：教师 x + y+ + y⁻<t （看 y+），学生 x + y⁻<t （ 不看 y+ ）。两者共享 x + y⁻<t ，教师多出的只有 y+。学生若也看 y+，则教师=学生 KL 恒 0 无信号；学习信号正是从\"教师知答案、学生不知\"的差里长出来。后确认是手误打反（原意为学生见 y⁻）。"
      },
      {
        "h": "全文问答 · Q：13.3% 的错标签为什么没把模型带偏？",
        "a": "notes/papers/2026-u-opsd.html#qa-13-3",
        "t": "Q：13.3% 的错标签为什么没把模型带偏？ 会被强化（真实风险），但有四重设计抬高净收益：① 门控 c(x)<τ 先拦截大部分瞎猜题：13.3% 是 过门后 的错误率；② 自发课程聚焦\"能力边界\"（大多数时候对的题上 y+ 大概率对）；③ 前向 KL+全词表是稠密信号（一条 rollout 数百个纠正点），少数错 y+ 的负梯度被对 y+ 正梯度盖过；④ 教师不需要 y+ 完美，只需多数方向对，少数噪声 token 被平均。结论：13.3% 是真实天花板，但门控+课程+稠密信号把它抬到比有 GT 的 OPSD 还高。"
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
        "t": "Q：为什么必须前向 KL，反向 KL 会崩？（散度方向的直觉） 一句话： 前向 KL 是\"学生全面模仿老师\"（老师会的都得会），反向 KL 是\"学生只学老师最拿手的几招、别的宁可不碰\" 。用厨师比喻：老师会做 100 道菜（5 道招牌+95 道偶尔做）。前向 KL KL(老师‖学生) ：凡是老师做的学生都得会，学生漏掉任何一道（哪怕老师低概率的菜）就被罚无穷大 → 学生 覆盖 （mode-covering）老师所有可能，变成全面厨师。反向 KL KL(学生‖老师) ：凡是学生做的老师必须也会，学生敢做老师菜单外的菜就被罚无穷大 → 学生 追逐 （mode-seeking）老师概率最高的那座峰，死死抱住招牌菜、其余全放弃（因为窝在招牌菜里才安全）。 数学判据（不用记公式）：老师分布有多个峰时，前向 KL 的学生试图同时覆盖所有峰（谷底也填一点），反向 KL 的学生只选一座峰抱死、其他峰看不见。 （2026-08-24 复测暴露）易记偏两处：① 反向 KL 罚的是 学生 做老师菜单外的菜（不是\"要求老师会徒弟的菜\"）；② 反向 KL 的实测失败模式是 复读塌缩 （长度 2.7k→99k 爆炸、无限重复、丧失终止能力），不是幻觉。 在 U-OPSD 里：教师（看过伪解 y+）沿答错 rollout 每个 token 给出下一 token 分布，概率集中在少数\"正确方向\"token 上但也给别的留小概率。前向 KL → 学生覆盖教师所有给过概率的 token，稳收敛，变成\"每个 token 上都更接近知答案的自己\"。反向 KL → 学生只敢追逐教师概率最高的一个 token、别的全放弃 → 塌缩成只会反复输出那几个 token 的复读机。论文实测正是这套塌缩：生成长度 2.7k→99k 字符爆炸、boxed 答案率 99%→33%、丧失终止能力（无限重复某短语/LaTeX 命令/括号直到预算耗尽，不是在推理）。JSD（对称，β=0.5）掉 13.8% 回基座水平：对称散度不偏向覆盖也不偏向追逐，长序列生成里两头不讨好。结论：逐 token 分布蒸馏必须前向 KL，反向 KL 从机制上就鼓励学生走极端。"
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
        "t": "关联 S²VOPD ： 兑现本文预留的 on-policy distillation 钩子（视觉域）。同作者线（Yijiang Li 一作 + Vasconcelos 组）的域互补：本文教师多看\"伪解 y+\"（文本特权上下文），S²VOPD 教师多看\"清晰像素\"（把学生的输入图退化来构造不对称，方向倒转：不减教师加的信息，而减学生的信息）。散度冲突注记（重要）：本文必须 forward KL（reverse 复读塌缩、JSD 掉 13.8），S²VOPD 却是 JSD 最好 > reverse KL > forward KL 最差，排序完全颠倒：用\"教师多出的信息可否恢复\"统一解释：本文的解题思路学生原则上能自己推出来（可恢复→全面模仿对），S²VOPD 的清晰像素永远拿不回来（不可恢复→模仿不可及细节有害）。两篇合看才看清散度选择不是普适规则，是信息类型的函数。 Open-MOPD ： 兑现本文预留的 on-policy distillation 钩子。OPD 家族两个正交切片：本文管\"单教师的信号从哪来\"（无 GT 自蒸馏），Open-MOPD 管\"多教师信号之间怎么分账\"（token 数量/reward 幅度/新鲜度三层预算失衡，35.6%→83.4% 回收率）。组合方案成立：多个自蒸馏伪教师 + Open-MOPD 三机制。散度注记：本文前向 KL 直接当 loss（reverse 会复读塌缩）；Open-MOPD 的 reverse-KL 式 dense reward 是 PPO 的 reward 信号（sg 停梯度 + clip 兜底）而非直接损失：同方向不同框架，不矛盾。 未来入库钩子：若 ingest on-policy distillation（DistiLLM 系列）、self-consistency（Wang et al. 2023）、推理路由/预算控制（Thinkless、BudgetThinker）相关论文，应回链本页：U-OPSD 把无监督蒸馏三条线交汇成一个方法。"
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
    "essence": "多专家蒸不进一个学生的病根不是教师打架，而是 token 级优化预算在长度、收敛速度和 reward 新鲜度上错配。",
    "review": {
      "next": "2026-09-14",
      "last": "2026-09-07",
      "count": 1,
      "result": "pass"
    },
    "relations": [
      {
        "type": "complement",
        "to": "2026-u-opsd",
        "reason": "正交切片：单教师信号从哪来 vs 多教师怎么分账；多个自蒸馏伪教师 + 本文三机制可组合",
        "status": "synthesis"
      },
      {
        "type": "compare",
        "to": "2026-s2vopd",
        "reason": "OPD 家族第三页：多教师预算分账 vs 单教师视觉不对称，散度注记第三数据点",
        "status": "synthesis"
      },
      {
        "type": "foundation",
        "to": "2017-ppo",
        "reason": "底层载体：机制三（reward refresh）通过刷新避免旧 reward 触发 PPO Clip 冻结 75.8% 预算",
        "status": "reported"
      }
    ],
    "entries": [
      {
        "h": "核心直觉",
        "a": "papers/2026-open-mopd.html#essence",
        "t": "多个领域专家蒸馏进一个学生模型时，掉分的主因不是教师们意见打架，而是训练预算被系统性分错：每个域实际拿到的优化量 = token 数量 × reward 幅度 × reward 新鲜度，三样在三个时间尺度上全部失衡。三个机制逐一修复，提升回收率从 35.6% 修到 83.4%。"
      },
      {
        "h": "一页看懂",
        "a": "papers/2026-open-mopd.html#overview",
        "t": "工业界大规模用 multi-teacher OPD（DeepSeek-V4 蒸 10+ 教师、Kimi K3 用 9 个），但没人回答过 naive 合并为什么掉分。oracle routing 受控实验：integration gap 3.50 分，naive 只拿回 35.6%，IF 域掉分是 math 的 3.3 倍。方法：先枪毙流行嫌疑人 teacher conflict（三重证伪），锁定三层预算错配（名额、汇率、财报时效），三个正交修复机制可独立验证可叠加。回收率修到 83.4%。代价：仅 3B、三域、oracle 路由验证。"
      },
      {
        "h": "机制 · 证伪 teacher conflict 与三层失衡",
        "a": "papers/2026-open-mopd.html#mechanism",
        "t": "token 级教师分歧 c_t 全程均值仅 0.126 nat（冲突判据是 1 nat，概率比 e 约 2.7），高冲突 token 全程只占 0.62%；决定性反事实：把 top 1% 到 20% 高冲突 token mask 掉或换 consensus target，结果全部降分（负 0.52 到 0.83）。真凶预算错配三层：长度差 25 倍（math 约 10500 token，IF 约 409；IF 占 20.3% 名额只分到 0.99% 预算）；汇率漂移（各域收敛速度不同，25 步内 IF 实际份额从 48.7% 滑到 9%）；rollout batch 复用 K=4 次，K=4 时 75.8% 的 token 已被 PPO clip。"
      },
      {
        "h": "机制 · 三个失衡对应三个正交修复",
        "a": "papers/2026-open-mopd.html#mechanism-2",
        "t": "token-share balancing（batch 内修名额）：loss 按域加权，IF 每 token 放大约 48 倍精确补偿 25 倍长度劣势。gap-following allocation（训练全程修汇率）：权重乘 (m_d/m_ref)^α 再 clamp 到 [0.05, 20]；m_d = E|log π_ϕ − log π_θ| 是师生差距的直接读数不是间接代理；方向反了会爆炸：反向归一化成正反馈环，step 74 训练崩溃。reward refresh（rollout 周期内修时效）：教师项可缓存（教师冻结，log π_ϕ 永不变，rollout 时一次 prefill 算好）；学生项重算恰好免费（PPO 每次内更新本来就要对 minibatch 做 forward 算当前学生 logprob 做 importance ratio，刷新只是把这本就算出的数顺手用来重建 reward）；轨迹本身的陈旧只有重新 rollout 才能换，refresh 不碰，交给 PPO 的 ratio 加 clip 兜底。零开销实证：dense reward 计算只占一步 2.2%，刷新前 27.8s 刷新后 27.3s。"
      },
      {
        "h": "卡壳 · 反向归一化的正反馈环怎么崩",
        "a": "papers/2026-open-mopd.html#qa-feedback-loop",
        "t": "崩的是预算分配本身发散：IF 最先接近 teacher，m̄ 缩小；反向规则把 gap 已经小误读成需要更多帮助，权重从 24.4 涨到 80.9；更多预算收敛更快，m̄ 更小；每圈更极端无刹车，step 74 整体崩溃。gap-following 的正方向自带两层刹车：语义级（收敛域权重自动回落让出预算）加兜底级（clamp [0.05, 20] 防单域突变）。"
      },
      {
        "h": "卡壳 · reward refresh 为什么救命、为什么零开销",
        "a": "papers/2026-open-mopd.html#qa-reward-refresh",
        "t": "病根：学生写完草稿后复用 4 轮内更新（K=4），第 1 轮学完后学生水平已涨，若不刷新，第 2 轮仍用写草稿时发霉的旧差距继续抽打，新旧概率比剧烈过冲，触发 PPO 紧急刹车：75.8% 的 token 被 clip 冻结，算力浪费且方向带偏。零开销：教师是冻结的，分数一开始就算好存着；学生当前的分，PPO 在算 ratio 时本来就必须 forward 算出来，这个数字已经在显存里，顺手填进奖励减法公式，零额外计算、零重新生成。"
      },
      {
        "h": "卡壳 · 为什么不过采样、不抹幅度",
        "a": "papers/2026-open-mopd.html#qa-oversample",
        "t": "过采样：要拿 1/3 token 预算 IF 得放大 33.6 倍，math/code 长链 prompt 被挤到 0.7 倍，长链推理的监督密度没法维持；加权法保住 prompt 多样性（各域长度本就接近时过采样与加权等价，退化无害）。不抹幅度：m̄ 不是噪声，它是还差多少没学的仪表盘，抹掉等于自毁 gap-following 的信号源。"
      },
      {
        "h": "数字与代价",
        "a": "papers/2026-open-mopd.html#evidence",
        "t": "消融阶梯：Naive M-OPD 28.05，+ token-share balancing 29.22（几乎全来自 IF：43.64 升到 47.53），+ gap-following 29.94，K=4 + reward refresh 31.24。总回收率 35.6% 到 83.4%。baseline：RFT 12.6%、单模型混合域 RL 49.3%、ParamMerge-TA 71.7%。局限：仅 3B、三域、oracle 标签路由，路由有误场景未验证；全流程单节点 8 张 A100 可复现。"
      },
      {
        "h": "关联",
        "a": "papers/2026-open-mopd.html#relations",
        "t": "U-OPSD：正交切片，组合成立（多个自蒸馏伪教师 + 本文三机制，只要 K 大于 1，refresh 白送 +0.81）。S²VOPD：家族谱系第三页，散度注记第三数据点。未来钩子：AsyncOPD（refresh 灵感来源）、DistiLLM 系列、GKD（dense reward 进 PPO 槽位先例）入库时回链。"
      },
      {
        "h": "完整笔记 · oracle routing 设计",
        "a": "notes/papers/2026-open-mopd.html#problem",
        "t": "实验设计第一步：oracle routing，训练和评测都用 ground-truth 域标签硬路由（math 题只找 math teacher），把整合难度和路由误差两个混淆变量切开。受控设定下量化 integration gap：RouteOPD 三学生 31.55 vs naive M-OPD 28.05，差 3.50 分；掉分极不均匀，IF 域掉 6.16 分是 math 1.89 的 3.3 倍，训练中期 IF 分数还倒降 11%。"
      },
      {
        "h": "完整笔记 · 三部门培训预算类比",
        "a": "notes/papers/2026-open-mopd.html#intuition",
        "t": "三个部门共用一笔培训预算的三件糟心事：名额分配 bug（预算按发言时长折算，math 一开口 3 小时长篇，IF 五分钟完事，IF 占 20.3% 名额只分 0.99% 预算）；汇率偷偷变（每块钱购买力不同，各域收敛速度 IF 2.4 倍、math 2.1 倍、code 1.9 倍）；用昨天的财报做今天的决策（rollout batch 复用 K 次，第一次更新后学生变了，reward 里依赖学生的部分还用旧概率）。"
      },
      {
        "h": "完整笔记 · 我的复述",
        "a": "notes/papers/2026-open-mopd.html#restatement",
        "t": "用户原话：IF 收敛最快，m_d 下降最快，反向规则对小幅度加更大权重，IF 得到更高预算，收敛更快 m_d 更小，循环直到崩掉；m_d 小表示任务收敛差不多了，gap-following 给预算跟着 gap 走并裁剪到 [0.05, 20] 防爆炸。refresh 的存在条件：轨迹本身是旧学生采样的，如果有无限算力每步重新 rollout（等效 K=1），没有存在价值。"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-open-mopd.html#problem",
        "t": "解决什么问题 工业界已经在大规模使用 multi-teacher on-policy distillation（M-OPD）：DeepSeek-V4 蒸馏 10+ 个 teacher、Kimi K3 用 9 个、Agents-A1 用 6 个：把多个域专家（math/code/IF…）的能力蒸进单个通才学生，部署成本从 N 个模型降回 1 个。但没人公开回答过：为什么 naive 合并会掉分？掉了的部分去哪了？ 论文的实验设计第一步就很聪明：oracle routing：训练和评测都用 ground-truth 域标签硬路由（math 题只找 math teacher），把「整合难度」和「路由误差」两个混淆变量切开，剩下的差距全怪「多个能力写不进同一套参数」本身。 在这个受控设定下量化出 integration gap（用 SmolLM3-3B，三阶段 recipe：混合域 SFT → 三个域专家各跑 GRPO → 多教师 OPD）： 每域单独蒸馏再组合（RouteOPD，三个学生模型，仅作上界参考）：总分 31.55； naive M-OPD 一个学生：28.05，差 3.50 分； 用回收率衡量（SFT 25.67 → RouteRL 32.35 为 100% headroom），naive M-OPD 只拿回 35.6%； 掉分极不均匀：IF 域掉 6.16 分（是 math 1.89 的 3.3 倍），训练中期 IF 分数还倒降 11%、最早停滞。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-open-mopd.html#intuition",
        "t": "大白话讲解 先枪毙一个流行嫌疑人：teacher conflict（教师冲突）。 三个 teacher 同源（都从同一个混合域 SFT checkpoint 分叉），共享格式词、连接词、推理模板：看起来很容易打架。三重检验全部否定： token 级教师分歧 c_t（各教师对该 token logprob 的最大差）全程均值仅 0.126 nat，从没超过 0.27 nat：冲突判据是 1 nat（最支持与最反对的教师概率比 e≈2.7），差一个数量级； c_t > 1 nat 的高冲突 token 全程只占 0.62%（分歧最大的 IF 域也才 3.9%）； 决定性证伪实验：把 top 1%/5%/20% 高冲突 token 从 loss 里 mask 掉、或换成三教师平均的 consensus target：结果全部降分（−0.52~−0.83）。高分歧 token 不是噪声，反而可能携带领域信息。 真凶：预算错配，有三层。 关键认知：OPD 的 loss 按 token 平均聚合，所以每个域真正得到的优化量不取决于你喂了多少 prompt，而取决于： 域的有效预算 B_d ∝（该域贡献的 token 数）×（平均每 token 的 reward 幅度 m̄_d）×（reward 还新鲜吗） 类比：三个部门共用一笔培训预算，会发生三件糟心事： 名额分配 bug（batch 内，结构性）：预算按「每人发言时长」自动折算。math 部门一开口就是 3 小时长篇推理（响应约 10,500 token），IF 部门说话 5 分钟完事（约 409 token）：长度差 25 倍。结果 IF 占 20.3% 的名额（prompt），实际只分到 0.99% 的预算（gradient token）。 汇率还在偷偷变（训练全程，动态）：就算把名额强制锁成各 1/3，每块钱的「购买力」还不同：m̄_d（平均每 token 的 reward 幅度）就是汇率。各域收敛速度不同（IF 缩 2.4×、math 2.1×、code 1.9×），25 步内 IF 的实际预算份额从 48.7% 滑到 9%（终值 11.4%），code 升到 63.8%。 用昨天的财报做今天的决策（rollout 周期内，快动态）：为省生成开销，一个 rollout batch 被复用 K 次做内更新（K=4）。第一次更新后学生就变了，但 reward 里依赖学生的部分还用 rollout 时刻的旧概率：K=4 时 rollout-to-current KL 已达 0.059、75.8% 的 token 被 PPO clip；K=32 时 0.216 / 86%。"
      },
      {
        "h": "全文 · 关键机制",
        "a": "notes/papers/2026-open-mopd.html#mechanism",
        "t": "关键机制 三个失衡分别在三个时间尺度上，所以三个修复机制正交、可独立验证、可叠加：「正交分解」的设计美感。 机制一：token-share balancing（修名额，batch 内）。 不碰采样频率，只在 loss 上按域加权：w_d = 目标份额 g\\*（取 1/3 等分，无需调参）÷ 本 batch 实际 token 份额 s_d^tok。效果是 IF 的每个 token 被放大约 48 倍，精确补偿 25 倍的长度劣势，加权后三域恰好各 33.33%。 为什么不直接过采样 IF prompt？要拿到 1/3 token 预算，IF 采样得放大 33.6 倍，一个 batch 里 math/code 的长链 prompt 被挤到只剩 0.7 倍：长链推理的监督密度没法维持。加权法保住了 math/code 的 prompt 多样性。 为什么不顺便把 reward 幅度归一化掉？幅度不是噪声，它携带「还差多少没学」的信息，抹掉等于自毁仪表盘（见机制二）。 退化条件：若各域响应长度接近，s_d^tok ≈ prompt share，balancing 退化为无害无益的恒等变换。 机制二：gap-following allocation（修汇率，训练全程）。 m̄_d = E[ r_t ]，而 reward 核心项就是 log π_ϕ − log π_θ ：它不是 gap 的间接代理，它就是师生差距本身的直接读数（学生越像教师差越小）。让预算跟着 gap 走：在机制一的权重上乘 (m_d/m_ref)^α（m_ref 为当 batch 各域均值，α=1），clamp 到 [0.05, 20] 防单域 reward 突变导致权重爆表，再归一化保持总 loss 不变。哪个域离 teacher 还远，就多给预算；收敛的域自动让出。 全文最反直觉的点：方向反了会爆炸：「reward 小 = 学得慢 = 该多帮」很诱人，但 m̄_d 小的真实含义往往是「已经快学完了」。反向归一化 m^(−α) 形成正反馈环：已收敛 → m̄ 缩小（IF 前 75 步缩 32.5×）→ 权重变大（24.4→80.9）→ 更多预算 → 更快收敛 → m̄ 更小……无刹车直到训练在第 74 步崩溃。α 的符号不是超参，是被 gap 的语义钉死的。 机制三：reward refresh（修财报时效，rollout 周期内）。 dense reward 对每个被采样 token v：r(v) = (log π_ϕ(v) − log π_θ(v)) × π̃_θ(v)，只有两个模型出场。问：K 次内更新中谁的 logprob 会变？ 教师项可缓存：教师冻结，log π_ϕ 永不变：rollout 时一次 prefill 算好存起来，K 次直接读缓存； 学生项重算恰好免费：PPO 每次内更新本来就要对 minibatch 做 forward 算当前学生 logprob（importance ratio 必需），refresh 只是把这本就算出的数顺手用来重建 reward：不加教师 forward、不加学生 forward、不重新生成任何东西； 修不掉的陈旧：轨迹（y 和前缀）仍是旧学生采样的：「学生在哪些状态下学习」这个分布要重新 rollout 才能换（生成占一步 46.5%，最贵），refresh 不碰，剩下的交给 PPO 的 ratio + clip 兜底。论文原话：清掉的是「不需要另一次 prefill 就能清掉的那部分陈旧」。 零开销实证：dense reward 计算只占一步的 2.2%，刷新前 27.8s / 刷新后 27.3s，差异在步间波动内：开销不是新增，是搬了位置。 退化条件：K=1（不复用 batch）时无陈旧，refresh 退化为标准目标，无事可做。"
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
        "t": "卡壳点与解答 Q：反向归一化的正反馈环：初答只说「把已经学好的带崩掉」，链条断了。 A：崩溃机制比「带崩」更机械：是预算分配本身发散。环的每一环：① IF 最先接近 teacher → m̄_d 缩小；② 反向规则把「gap 已经小」误读成「需要更多帮助」，给它更大权重（24.4→80.9）；③ 更多预算 → 收敛更快 → m̄_d 更小；④ 回到 ②，每圈更极端、无反向力量刹车，直到 step 74 训练整体崩溃。gap-following 用正方向自带两层刹车：系统级：顺着 gap 语义，收敛域权重自动回落让出预算；兜底级：clamp [0.05, 20] 防单域 reward 突变（复述时把两层合成了一层，此处钉开）。还有一层初答没提：m̄_d = E[ log π_ϕ − log π_θ ]，它不是 gap 的间接代理，是师生差距的直接读数。 Q：reward refresh：第一轮完全没理解，全文最大卡壳点。（09-07 费曼复测二次深化） A：大白话直觉版（老师、学生与发霉的分数）： 场景：大模型生成太慢（占 46.5% 耗时），所以学生写完一份作业草稿，要连续复用 4 轮内更新（$K=4$）来学，而不是每步重新写。 病根：每个字的奖励是 $r = \\text{老师水平} - \\text{学生水平}$。写草稿时老师 80 分、学生 30 分，差距是 50 分大奖。学完第 1 轮后，学生在这个字上已经涨到了 75 分！如果不刷新，第 2 轮依然用那张发霉的「50 分」去抽学生，算法以为学生还差得远、死命猛推，导致新旧概率比剧烈过冲。结果触发 PPO 紧急刹车（Clip）：75.8% 的 token 梯度被冻结废弃，白白浪费算力；强行推进还可能把原本已经学好的方向带崩。 为什么白嫖（零开销）？：刷新的奖励是 $r_{\\text{new}} = 80 - 75 = 5$ 分。老师是冻结的，80 分一开始就存好了；而学生当前的 75 分，PPO 在算 ratio 时本来就必须 forward 算出来！这个数字已经在显存里，作者只是顺手把它填进奖励减法公式，一分钱没花、零额外计算、不重新生成。 一句话总结：旧草稿还在复用，但给学生批改的分数随着他变聪明而实时刷新：不仅救回了被刹车踩死的 75.8% 算力，还完全零成本。"
      },
      {
        "h": "全文问答 · Q：反向归一化的正反馈环：初答只说「把已经学好的带崩掉」，链条断了。",
        "a": "notes/papers/2026-open-mopd.html#qa-feedback-loop",
        "t": "Q：反向归一化的正反馈环：初答只说「把已经学好的带崩掉」，链条断了。 崩溃机制比「带崩」更机械：是 预算分配本身发散 。环的每一环：① IF 最先接近 teacher → m̄_d 缩小；② 反向规则把「gap 已经小」 误读 成「需要更多帮助」，给它更大权重（24.4→80.9）；③ 更多预算 → 收敛更快 → m̄_d 更小；④ 回到 ②，每圈更极端、无反向力量刹车，直到 step 74 训练整体崩溃。gap-following 用正方向自带两层刹车：系统级：顺着 gap 语义，收敛域权重自动回落让出预算；兜底级：clamp [0.05, 20] 防单域 reward 突变（复述时把两层合成了一层，此处钉开）。还有一层初答没提：m̄_d = E[|log π_ϕ − log π_θ|]，它不是 gap 的间接代理，是师生差距的直接读数。"
      },
      {
        "h": "全文问答 · Q：reward refresh：第一轮完全没理解，全文最大卡壳点。（09-07 费曼复测二次深化）",
        "a": "notes/papers/2026-open-mopd.html#qa-reward-refresh",
        "t": "Q：reward refresh：第一轮完全没理解，全文最大卡壳点。（09-07 费曼复测二次深化） 大白话直觉版（老师、学生与发霉的分数） ： 场景 ：大模型生成太慢（占 46.5% 耗时），所以学生写完一份作业草稿，要连续复用 4 轮内更新（ K=4 ）来学，而不是每步重新写。 病根 ：每个字的奖励是 r = \\text{老师水平} - \\text{学生水平} 。写草稿时老师 80 分、学生 30 分，差距是 50 分大奖 。学完第 1 轮后，学生在这个字上已经涨到了 75 分 ！如果不刷新，第 2 轮依然用那张发霉的「50 分」去抽学生，算法以为学生还差得远、死命猛推，导致新旧概率比剧烈过冲。结果触发 PPO 紧急刹车（Clip）： 75.8% 的 token 梯度被冻结废弃，白白浪费算力 ；强行推进还可能把原本已经学好的方向带崩。 为什么白嫖（零开销）？ ：刷新的奖励是 r_{\\text{new}} = 80 - 75 = 5 分。老师是冻结的，80 分一开始就存好了；而 学生当前的 75 分，PPO 在算 ratio 时本来就必须 forward 算出来 ！这个数字已经在显存里，作者只是顺手把它填进奖励减法公式，一分钱没花、零额外计算、不重新生成。 一句话总结 ： 旧草稿还在复用，但给学生批改的分数随着他变聪明而实时刷新：不仅救回了被刹车踩死的 75.8% 算力，还完全零成本。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-open-mopd.html#open",
        "t": "还没搞懂 _无_：检验题与两道补漏小检验全部收敛，无残留漏洞。"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-open-mopd.html#relations",
        "t": "关联 S²VOPD ： OPD 家族第三页：「单教师信号从哪来」的视觉域答案（把学生输入图退化构造不对称，减学生而非加教师）。散度注记第三数据点：视觉不对称蒸馏里 JSD > reverse KL > forward KL，排序与 U-OPSD 完全颠倒（教师多出的像素信息不可恢复），三框架对照（U-OPSD 直接 loss / 本文 PPO reward 槽位 / S²VOPD 生成式 JSD）待 DistiLLM 系列统一沉淀。 U-OPSD ： 兑现其预留的 on-policy distillation 钩子。OPD 家族的两个正交切片：U-OPSD 管「单教师的信号从哪来」（自身多数投票伪解当特权上下文，去掉 GT 依赖），本文管「多教师信号之间怎么分账」（token/幅度/新鲜度三层预算分配）。组合方案成立：多个自蒸馏伪教师 + 本文三机制（三机制与「教师从哪来」完全正交，只要 K>1 复用 batch，refresh 白送 +0.81）。散度形式对比注记（不构成矛盾，记录备考）：U-OPSD 必须前向 KL 直接当 loss（reverse KL 直接优化会复读塌缩）；本文 dense reward 是 reverse-KL 式 per-token 形式，但角色是 PPO 的 reward 信号（sg 停梯度、走 policy gradient + clip），不是直接蒸馏损失：同一「方向」在不同框架里安全性不同，值得未来与 DistiLLM 系列一起沉淀。 PPO ： 本文机制三（reward refresh）与消融分析的底层优化载体：学生能力提升后若沿用旧 reward，会导致概率比率 $r_t$ 剧烈过冲进而触发 PPO 截断（Clip），使 75.8% 的 token 优化预算被当场冻结丢弃；本文在 PPO 的 ratio 计算中顺手白嫖学生当前 logprob 刷新 reward，既维系了 PPO 的近端更新安全性，又彻底盘活了算力预算。 未来入库钩子：AsyncOPD（reward refresh 的灵感来源，异步 stale RL）、DistiLLM 系列（on-policy 蒸馏散度设计）、GKD（dense reward 进 PPO 槽位的先例）、多教师/路由相关论文应回链本页。"
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
    "essence": "把学生输入图故意降采样加噪弄坏，EMA 教师看原图，学生向看得清的自己对齐；不对称可以从学生减信息。",
    "review": {
      "next": "2026-09-14",
      "last": "2026-09-07",
      "count": 1,
      "result": "pass"
    },
    "relations": [
      {
        "type": "compare",
        "to": "2026-u-opsd",
        "reason": "同作者线域互补：教师多看伪解 y+（文本上下文）vs 教师多看清晰像素（输入模态）；散度排序完全颠倒，可恢复性统一解释是库内假说",
        "status": "hypothesis"
      },
      {
        "type": "complement",
        "to": "2026-open-mopd",
        "reason": "OPD 家族谱系：单教师视觉不对称 vs 多教师预算分账；多教师框架里每个教师都可自构造不对称",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "核心直觉",
        "a": "papers/2026-s2vopd.html#essence",
        "t": "不给老师任何特权，而是把学生的输入图故意弄糊弄小：同一个模型里看得清的自己（EMA teacher 看原图）在学生每一步回答上教看不清的自己（student 看增强退化图），全部学习信号免费来自这张被弄坏的图。"
      },
      {
        "h": "一页看懂",
        "a": "papers/2026-s2vopd.html#overview",
        "t": "OPD 要求教师比学生多知道点什么：更强模型（贵）、GT 答案、GT 区域（要标注），特权方法还偏科。本文把方向倒过来：不给教师加信息，从学生减信息。学生的输入图降采样到 0.3 到 0.6 倍再叠噪声，EMA 教师看原图，学生在坏图上自己 rollout，逐步向看得清的自己的分布对齐。4B 从 70.68 涨到 77.44：超 235B 开源模型与 GPT-5.4。代价：增益依赖增强调参，OCR 类任务预期失效（本人推演）。"
      },
      {
        "h": "机制 · 非对称视图蒸馏",
        "a": "papers/2026-s2vopd.html#mechanism",
        "t": "同一模型两个身份：student θ 和 EMA teacher φ（φ ← 0.95·φ + 0.05·θ，教师是学生的慢半拍影子）。每步五件事：弄坏图（降采样 0.3 到 0.6 倍，不 resize 回去，visual token 直接变少；以 ρ=0.5 概率叠 DDPM t=200 高斯噪声）；学生在坏图上 rollout 8 条；教师在同一前缀加原图上逐 token 打分；top-k 截断重归一化；逐 token 广义 JSD（α=0.5）。师生共享问题和轨迹前缀，教师多出来的只有那张清晰的图（对照 U-OPSD：教师多出来的是伪解 y+，不对称载体从上下文换成输入模态）。w/o EMA 只掉 0.40：教师的强完全来自那张图，不来自自我改进。"
      },
      {
        "h": "机制 · 增强设计三律",
        "a": "papers/2026-s2vopd.html#mechanism-2",
        "t": "首个针对 OPD 的系统化增强空间受控搜索（信息减少、光度、几何、遮挡四族）。三律：不对称才有信号（四族单用全涨 75.65/74.40/74.30/72.44，基座 70.58；对称自蒸馏反而掉到 65.21）；强度要中等（各族倒 U 型，师生 JSD gap 约 0.014 处到顶）；gap 必须任务一致（crop 单调下跌 71.53 到 68.76 到 67.44，最强 crop 造最大 gap 却最差：crop 选择性删证据题变不可答，降采样均匀降密度题可答）。大 gap 不等于好 gap：决定好坏的是 gap 的语义内容。"
      },
      {
        "h": "卡壳 · 训练看糊图考试看好图为什么变强",
        "a": "papers/2026-s2vopd.html#qa-blur-strong",
        "t": "难度论被消融证伪：若难度是关键，更强的 crop 应涨更多，实际单调下跌；w/o EMA（教师冻结在基座）仍拿 93% 增益，教师一点不比学生聪明。真机制：学生的每一步被拉向信息完整版的自己在同样位置的判断，学的是从退化证据恢复完整判断，这是蒸馏目标不是探索训练。"
      },
      {
        "h": "卡壳 · 散度结论为什么和 U-OPSD 完全反过来",
        "a": "papers/2026-s2vopd.html#qa-divergence",
        "t": "实验事实：U-OPSD 必须 forward KL（reverse 复读崩溃、JSD 掉 13.8）；S²VOPD 是 JSD 76.05 最好，reverse KL 75.49 居中，forward KL 74.74 最差，排序完全颠倒。解释（库内综合假说，待验证）：教师多出来的信息学生能不能恢复。U-OPSD 教师多的是解题思路，学生原则上能自己推出来（可恢复），全面模仿方向正确；S²VOPD 教师多的是清晰像素，丢掉的细节永远拿不回来（不可恢复），逼学生模仿不可及的细节有害。量级佐证：U-OPSD 选错是灾难（13+ 点），S²VOPD 选错只是小亏（1.3 点）。"
      },
      {
        "h": "卡壳 · y+ 为什么口误成伪标签",
        "a": "papers/2026-s2vopd.html#qa-y-plus",
        "t": "y+ 不是标签，是拼进 U-OPSD 教师输入的完整解题轨迹（上下文）；共识答案 ã(x) 只用来投票和分组。消融 label-only（只给 boxed 答案值）掉 10.3 到 15.8：光知道答案没法引导中间步骤。历史状态：09-02 首验两连犯；2026-09-07 复测已收敛，首答即明确 y+ 是完整轨迹先验上下文。"
      },
      {
        "h": "数字与代价",
        "a": "papers/2026-s2vopd.html#evidence",
        "t": "主表 4B 70.68 升到 77.44，超 Qwen3-VL-Instruct-235B（75.75）与 GPT-5.4（72.77），追平 397B；同数据对比 75.33 全场第一（9B 76.35 只比拿 GT 区域的 Vision-OPD 低 0.21）。摘要声称恢复特权方法 96% 增益，正文无推导，自行补算 9B 感知 3.57/3.70 约 96.5%。散度消融 JSD 76.05 > rKL 75.49 > fKL 74.74。局限：增强需调参；OCR/文字密集图未测（噪声毁文字证据，本人推演失效）；纯文本任务无可退化模态；无 seed 误差棒；top-k 值未给。"
      },
      {
        "h": "关联",
        "a": "papers/2026-s2vopd.html#relations",
        "t": "U-OPSD：同作者线域互补，两页散度冲突是全库最值钱交叉点。Open-MOPD：家族三页谱系（单教师信号从哪来文本/视觉，多教师怎么分账）。未来钩子：NoisyRollout/VPPO/PRPO（增强调 RL 先例）、BYOL/DINO/FixMatch（弱视图教强视图源头）、DistiLLM 系列（散度统一沉淀）入库时回链。"
      },
      {
        "h": "完整笔记 · 不对称方向之问",
        "a": "notes/papers/2026-s2vopd.html#problem",
        "t": "OPD 家族的命门：教师必须比学生多知道点什么，否则指导没有信息量。三种传统来源全要外部资源（更大的模型、GT 答案、GT 感兴趣区域）。本文釜底抽薪：不对称性在乎自己是教师多看还是学生少看实现的吗？不在乎，只要存在教师知道、学生不知道的差，蒸馏信号就成立，于是把方向倒过来：从学生身上减信息。"
      },
      {
        "h": "完整笔记 · 糊卷类比与 mismatch 之问",
        "a": "notes/papers/2026-s2vopd.html#intuition",
        "t": "想象刷一套没有标准答案的卷子：把试卷复印得又小又糊，自己看着糊版作答；拿到清晰原版的你盯着清晰卷，在你写下的每一步旁边标注看清的我这里会怎么写。最容易卡住：训练看糊图、考试看好图，这不是 train-inference mismatch 吗？学生学的不是在糊图上答题这个行为，而是每个决策点上信息残缺的我如何逼近信息完整的我的判断。"
      },
      {
        "h": "完整笔记 · 我的复述",
        "a": "notes/papers/2026-s2vopd.html#restatement",
        "t": "用户原话：强迫学生从模糊图/干扰图中找细节，增强了模型的探索能力（后被 crop 消融证伪修正）。U-OPSD 是多次 rollout 取共识作为 teacher 的额外标签制造不对称，S²VOPD 是给教师清晰图学生干扰图带来不对称（伪标签为口误，y+ 是完整轨迹上下文）。最强 crop 可能把关键证据区域切没了，这套方法在 OCR 等需要细粒度感知的任务上会失效。"
      },
      {
        "h": "完整笔记 · 待验证假说声明",
        "a": "notes/papers/2026-s2vopd.html#open",
        "t": "信息可恢复性决定散度选择：是本人综合 U-OPSD 与 S²VOPD 两篇论文的假说，非任一原文结论，待 DistiLLM 系列入库时验证（已挂 U-OPSD 页钩子）。注意方向未推翻 U-OPSD 的结论，是同一原理在不同信息类型下的两个投影。"
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
        "t": "结果与代价 主表（FineVision-12K 训练）：4B 从 70.68 → 77.44（+6.76），超 Qwen3-VL-Instruct-235B（75.75）、超 GPT-5.4（72.77），追平 Qwen3.5-397B（77.44），与 Gemini-3-Flash（77.67）打平；超过全部特权方法（Vision-OPD 77.07、OPSD 72.85）。 同数据公平对比（Vision-OPD-6K，65 步）：4B 总分（6 感知 + 3 数学）75.33 全场第一；9B 76.35，只比拿 GT 区域标注的 Vision-OPD（76.56）低 0.21。感知 +5.7 / 数学 +3.7（4B）。自奖励 RL（TTRL/Intuitor/RENT）训练不稳定甚至崩到近随机，报告 13 个 checkpoint 最优仍输本文 2 个点。 \"恢复 96%\"注：摘要声称\"恢复特权方法 96% 的改进\"，正文无推导。自行计算：9B 感知分上 S²VOPD 增益 3.57 / Vision-OPD 增益 3.70 ≈ 96.5% 吻合（4B 上其实反超，>100%）。 最反直觉的消融（w/o EMA）：把教师永远冻结在基座（不做 EMA），只掉 0.40（75.95 vs 76.35），仍拿 93% 增益：教师的\"强\"完全来自那张清晰的图，不是自我改进。EMA decay 0.95/0.99/0.999 波动 <0.8%，不敏感，只是稳定性选择。 散度消融（Table 6，与 U-OPSD 结论完全相反，见关联节）：JSD(α=0.5) 76.05 > reverse KL 75.49 > forward KL 74.74。 代价/局限： 增益依赖增强调参（gap 大小 + task-consistency 双准则）。 OCR/文字密集图未测：blur/noise/降采样会直接毁掉图中文字这类细粒度证据，违反 task-consistency，预期失效（本人推演，论文未验证）。 纯文本任务没有可退化的视觉模态，方法不迁移（要另找可退化模态，如截断上下文）。 无 seed 重复误差棒；分析协议（2048 greedy）与主表（4096）数字不可混比，且原文 §4.3 正文引用的基座 70.58 与图 2 标注的 66.5 存在协议口径不一致（图 2 的 2048-token 协议读数更低），引用时注意。 top-k 的 k 值未给出，需查代码。"
      },
      {
        "h": "全文 · AI 预读备注",
        "a": "notes/papers/2026-s2vopd.html#ai-notes",
        "t": "AI 预读备注 Zotero AI Butler 两份子笔记（task=summary/table，zhipu/glm-5.3 生成，2026-08-19）做预读底稿。 AI-Butler 摘要笔记 itemKey：WAIZQ4EN（task=summary），表格笔记 itemKey：J9RDZC8L（task=table），provider/model：zhipu/glm-5.3 glm-5.3 的复现级摘要质量很高：方法 pipeline 全六步、四增强族全表、倒 U 型与 0.014 峰值、JSD/fKL/rKL 排序及理由、EMA 消融、超参敏感性、常见坑（不 resize 回去/只增强学生侧/top-k 重归一化）全覆盖，与原文逐项核对一致。本文讲解在其基础上做了四点提炼：(a) 用 crop 消融证伪\"难度论\"，把\"学到的是向信息完整版自己对齐的蒸馏目标\"这一真机制立起来；(b) 把散度排序与 U-OPSD 的正面冲突提炼成\"信息可恢复性\"原理（见关联节）；(c) 核出摘要\"96%\"无正文推导并补算出处；(d) 发现 §4.3 基座读数与图 2 的协议口径不一致。表格笔记（AI-Table）信息量低，仅文献表维度，未采用。"
      },
      {
        "h": "全文 · 我的复述",
        "a": "notes/papers/2026-s2vopd.html#restatement",
        "t": "我的复述 （费曼检验时原话保留） 强迫学生从模糊图/干扰图中找细节，增强了模型的探索能力，实际使用时使用清晰图难度更小了，效果肯定更好；（被 crop 消融证伪后修正为：难度的关键是向\"看得清的自己\"的分布对齐） U-OPSD 是多次 rollout 取共识作为teacher的额外为标签制造不对称，而 S2VOPD 是通过给教师清晰图学生干扰图带来不对称（\"伪标签\"为口误，y+ 是完整轨迹上下文） 最强 crop 可能把关键证据区域切没了，student 只能靠猜了输出全是幻觉，这套方法在 OCR等需要细粒度感知的任务上会失效 会强化模型的弱点（对称自蒸馏时：放大教师的自信错误） 再检验轮： U-OPSD teacher 多的信息是模型本身采样的共识轨迹，这些轨迹本身就来自模型本身，采用 forward KL student 可以拟合 teacher 的分布， 而 S2VOPD 多的信息来自于看到了学生没有看到的清晰的图， 采用 forward KL student 要尽量拟合 teacher 的分布，其中就包括了 student 看不到的这些，而 reverse KL 主要是学高置信度的尖峰区域而 JSD 居中；而Crop大的话尖峰区域都没了，无从学起。（\"尖峰没了\"用词已纠：crop 删的是图像证据，教师分布照样有尖峰，是学生输入里没有通往答案的依据） 坏，这会导致学生去猜问题（q 被挖词的方案：猜题能力在推理时零迁移，因推理时 q 完整）"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2026-s2vopd.html#pitfalls",
        "t": "卡壳点与解答 Q：训练看糊图、考试看好图，为什么反而变强？ A：初答走偏到\"难度论\"（练难考易 + 探索能力）。两步证伪：① 若难度是关键，更强的 crop 应涨更多，实际单调下跌；② w/o EMA（教师冻结在基座）只掉 0.40、仍拿 93% 增益：教师一点不比学生聪明，唯一优势是看得清。真机制：学生的每一步被拉向\"信息完整版的自己\"在同样位置的判断，学的是\"从退化证据恢复完整判断\"的能力，这是蒸馏目标，不是探索训练。\"探索能力\"在此无角色，rollout 采样只是标准操作。 Q：S²VOPD 和 U-OPSD 的散度消融结论为什么完全相反？ A：先问清\"相反指的是啥\"（初轮没意识到两篇排序颠倒）：U-OPSD 必须 forward KL（reverse 复读崩溃、JSD 掉 13.8）；S²VOPD 是 JSD 最好 > reverse KL > forward KL 最差。原理：教师多出来的信息学生能不能恢复。U-OPSD 教师多的是解题思路，学生原则上自己能推出来（可恢复）→ 全面模仿（mode-covering 的 forward KL）方向正确；S²VOPD 教师多的是清晰像素，糊图里丢掉的细节永远拿不回来（不可恢复）→ forward KL 逼学生模仿它接触不到的细粒度分布反而有害，mode-seeking 的 reverse KL 至少只学可迁移的高置信模式，JSD 居中平衡。量级佐证：U-OPSD 选错散度是灾难（13+ 点/崩溃，\"知道答案的教师\"分布锐利），S²VOPD 选错只是小亏（1.3 点，\"看得清的教师\"分布温和）。 Q：同样是\"减少视觉信息\"，为什么降采样涨最多、最强 crop 是大坑？ A：crop 选择性地删掉某块区域，可能正中答题证据，题变不可答，gap 零信息量；降采样均匀降低信息密度，全局结构都在，题原则上可答，差距可学。补精确化（纠\"尖峰没了\"的用词）：crop 删的是图像证据不是分布尖峰：教师看清晰图照样自信有尖峰，只是学生输入里没有任何通往那个答案的依据，学不到推理只能学\"猜教师看到了什么\"，学到无根据的自信，伤 grounding。mild crop 的 gap 与最佳降采样的 gap 相同却差 3+ 分：决定好坏的不是 gap 大小，是 gap 的语义内容（可恢复性）。这条与上一条是同一条原理的两个应用。 Q：把增强换成\"挖掉学生的文本问题 q 的 30% 字、图保持清晰\"会怎样？ A：坏。q 是任务定义本身，挖词是离散破坏（\"not\"被删直接翻转含义），不属于优雅降级，与 crop 同属 task-inconsistency 失效族；学到的\"猜题\"能力在推理时零迁移（q 完整）。此题验证：不对称性存在 ≠ 有用，gap 还必须 informative 且可恢复。 Q：对称自蒸馏（不增强）为什么掉到基座以下（65.21 < 70.58）？ A：初答\"会强化模型的弱点\"方向对，补齐机制链：不增强时师生看同一张图，教师又只是 EMA（学生的过去版本），蒸馏目标里没有任何新信息：学生被拉向\"过去的自己\"。自信的错误 token（过去分布的高概率峰）被正反馈越推越高，纯自我确认循环，所以掉分。论文原话：\"the objective amplifies the teacher's confident errors instead of correcting the student's\"。对照增强版：教师分布带着\"清晰图\"的信息增量，才构成纠错而不是复读。 Q（复发，2026-09-02 首验）：y+ 又说成\"伪标签\"了。 A：U-OPSD 入库时的老卡壳点本次口误复发。y+ 不是标签，是拼进教师输入的完整解题轨迹（上下文）；共识答案 ã(x) 只用来投票和分组。消融 label-only（只给 boxed 答案值）掉 10.3~15.8。（历史状态：09-02 两连犯；2026-09-07 复测已收敛，首答即明确「y+ 是完整轨迹先验上下文，不是伪标签」，当前不再是弱项。）"
      },
      {
        "h": "全文问答 · Q：训练看糊图、考试看好图，为什么反而变强？",
        "a": "notes/papers/2026-s2vopd.html#qa-blur-strong",
        "t": "Q：训练看糊图、考试看好图，为什么反而变强？ 初答走偏到\"难度论\"（练难考易 + 探索能力）。两步证伪：① 若难度是关键，更强的 crop 应涨更多，实际单调下跌；② w/o EMA（教师冻结在基座）只掉 0.40、仍拿 93% 增益：教师一点不比学生聪明，唯一优势是看得清。真机制： 学生的每一步被拉向\"信息完整版的自己\"在同样位置的判断 ，学的是\"从退化证据恢复完整判断\"的能力，这是蒸馏目标，不是探索训练。\"探索能力\"在此无角色，rollout 采样只是标准操作。"
      },
      {
        "h": "全文问答 · Q：S²VOPD 和 U-OPSD 的散度消融结论为什么完全相反？",
        "a": "notes/papers/2026-s2vopd.html#qa-divergence",
        "t": "Q：S²VOPD 和 U-OPSD 的散度消融结论为什么完全相反？ 先问清\"相反指的是啥\"（初轮没意识到两篇排序颠倒）：U-OPSD 必须 forward KL（reverse 复读崩溃、JSD 掉 13.8）；S²VOPD 是 JSD 最好 > reverse KL > forward KL 最差 。原理： 教师多出来的信息学生能不能恢复 。U-OPSD 教师多的是解题思路，学生原则上自己能推出来（可恢复）→ 全面模仿（mode-covering 的 forward KL）方向正确；S²VOPD 教师多的是清晰像素，糊图里丢掉的细节永远拿不回来（不可恢复）→ forward KL 逼学生模仿它接触不到的细粒度分布反而有害，mode-seeking 的 reverse KL 至少只学可迁移的高置信模式，JSD 居中平衡。量级佐证：U-OPSD 选错散度是灾难（13+ 点/崩溃，\"知道答案的教师\"分布锐利），S²VOPD 选错只是小亏（1.3 点，\"看得清的教师\"分布温和）。"
      },
      {
        "h": "全文问答 · Q：同样是\"减少视觉信息\"，为什么降采样涨最多、最强 crop 是大坑？",
        "a": "notes/papers/2026-s2vopd.html#qa-crop",
        "t": "Q：同样是\"减少视觉信息\"，为什么降采样涨最多、最强 crop 是大坑？ crop 选择性地删掉某块区域 ，可能正中答题证据，题变不可答，gap 零信息量；降采样 均匀降低信息密度 ，全局结构都在，题原则上可答，差距可学。补精确化（纠\"尖峰没了\"的用词）：crop 删的是图像证据不是分布尖峰：教师看清晰图照样自信有尖峰，只是学生输入里没有任何通往那个答案的依据，学不到推理只能学\"猜教师看到了什么\"，学到无根据的自信，伤 grounding。mild crop 的 gap 与最佳降采样的 gap 相同却差 3+ 分： 决定好坏的不是 gap 大小，是 gap 的语义内容（可恢复性） 。这条与上一条是同一条原理的两个应用。"
      },
      {
        "h": "全文问答 · Q：把增强换成\"挖掉学生的文本问题 q 的 30% 字、图保持清晰\"会怎样？",
        "a": "notes/papers/2026-s2vopd.html#qa-q-removal",
        "t": "Q：把增强换成\"挖掉学生的文本问题 q 的 30% 字、图保持清晰\"会怎样？ 坏。q 是任务定义本身，挖词是离散破坏（\"not\"被删直接翻转含义），不属于优雅降级，与 crop 同属 task-inconsistency 失效族；学到的\"猜题\"能力在推理时零迁移（q 完整）。此题验证：不对称性存在 ≠ 有用，gap 还必须 informative 且可恢复。"
      },
      {
        "h": "全文问答 · Q：对称自蒸馏（不增强）为什么掉到基座以下（65.21 < 70.58）？",
        "a": "notes/papers/2026-s2vopd.html#qa-symmetric",
        "t": "Q：对称自蒸馏（不增强）为什么掉到基座以下（65.21 < 70.58）？ 初答\"会强化模型的弱点\"方向对，补齐机制链：不增强时师生看同一张图，教师又只是 EMA（学生的过去版本），蒸馏目标里 没有任何新信息 ：学生被拉向\"过去的自己\"。自信的错误 token（过去分布的高概率峰）被正反馈越推越高，纯自我确认循环，所以掉分。论文原话：\"the objective amplifies the teacher's confident errors instead of correcting the student's\"。对照增强版：教师分布带着\"清晰图\"的信息增量，才构成纠错而不是复读。"
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
        "t": "关联 U-OPSD ： 兑现其预留钩子。同作者线（Yijiang Li 一作 + Vasconcelos 组）的域互补：U-OPSD 管文本推理域（教师多看伪解 y+，文本特权上下文），本文管视觉感知域（教师多看清晰像素，输入模态信息差）。两页合起来是\"不对称性来源谱系\"：SFT（GT+教师强制）→ OPD（强教师）→ OPSD（GT 特权）→ U-OPSD（自投票伪特权）/ S²VOPD（自减信息）。散度冲突注记（全库最值钱交叉点）：U-OPSD 必须 forward KL（reverse 复读塌缩、JSD 掉 13.8），本文 JSD 最好 > rKL > fKL，排序完全颠倒：用\"教师多出的信息可否恢复\"统一解释（可恢复→全面模仿对；不可恢复→模仿不可及细节有害）。注意方向未推翻 U-OPSD 的结论，是同一原理在不同信息类型下的两个投影。 Open-MOPD ： OPD 家族三页成谱系：U-OPSD 管\"单教师信号从哪来\"（文本域），本文管\"单教师信号从哪来\"（视觉域的另一种答案：不对称可以来自减学生而非加教师），Open-MOPD 管\"多教师信号怎么分账\"。组合方案：多教师框架里的每个教师都可以用 S²VOPD 式自构造不对称（零特权）。散度注记第三数据点：本文 JSD > rKL > fKL（视觉不对称蒸馏，温和差异），与 U-OPSD 的 fKL 必选、Open-MOPD 的 reverse-KL 式 dense reward（PPO reward 槽位）构成三框架对照，待 DistiLLM 系列统一沉淀。 未来入库钩子：OCR/文档理解域增强蒸馏、NoisyRollout/VPPO/PRPO（增强调 RL 的先例，本文区分点：增强差异本身是训练信号而非调制外部奖励）、BYOL/DINO/FixMatch（弱视图教强视图的自监督表征学习源头）入库时回链本页。"
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
    "essence": "不再把框拆成坐标 token 逐个蹦：把整个框当固定长块并行解码，再用块内联合监督约束坐标。",
    "review": {
      "next": "2026-09-14",
      "last": "2026-09-07",
      "count": 1,
      "result": "pass"
    },
    "relations": [
      {
        "type": "complement",
        "to": "2026-vst",
        "reason": "同一敌人（延迟）的两种解法：VST 把推理藏进播放空档，本文把解码步数本身减掉，可组合",
        "status": "synthesis"
      },
      {
        "type": "complement",
        "to": "2026-video-o3",
        "reason": "本文是感知侧（GUI/指代定位给得又快又准），Video-o3/VST 是拿到框之后的推理与行动侧",
        "status": "synthesis"
      }
    ],
    "entries": [
      {
        "h": "核心直觉",
        "a": "papers/2026-locateanything.html#essence",
        "t": "VLM 做视觉定位时，输出的原子单元不该是 token 而该是整个框：把 2D 框当一个固定长块，训练用接龙卷加填空卷双格式，推理时一次 forward 并行填出整框（框与框仍逐个来），又快又准，尤其贴边的高 IoU 精度。"
      },
      {
        "h": "一页看懂",
        "a": "papers/2026-locateanything.html#overview",
        "t": "VLM 检测把框序列化成 token 流，一个词一个词蹦：一个框 6+ 步，N 个框线性放大（H100 上 Qwen3-VL 仅约 1.1 框/秒）；坐标是几何整体却被迫独立串行猜，误差滚雪球。通用 MTP 随便切块并行，又会学跨框跨类的假关联。方法：解码粒度从 token 提升到整个框，推理默认走填空一个框一步 forward，可疑就用接龙逐词重写这一块。Hybrid 12.7 框/秒（Qwen3-VL 的 10 倍以上），贴边精度 LVIS F1@0.95 31.1 vs 别家约 20。"
      },
      {
        "h": "机制 · 框等于一块填空",
        "a": "papers/2026-locateanything.html#mechanism",
        "t": "词表里坐标是 [0,1000] 各一个词，一个检测输出就是一句话：ref 热狗 /ref，box 342 567 890 345 /box。旧法把它当接龙，一次 forward 只能蹦一个词（Transformer 只取最后一个位置的预测）。PBD 把未来 5 个槽位摆成 MASK 一次把整框填出来，一个框从 6 步变 1 步。训练双格式 L = L_ntp + L_blk：接龙卷喂完整序列练逐词；填空卷每块只留首 token 练整块。四种块：语义块、框块、负样本块（防幻觉）、结束块；框顺序用 X-Y Corner 排序。混合注意力掩码：NTP 流严格因果，块间因果（学框间依赖防重复漏框），块内双向（几何耦合在此生效）。"
      },
      {
        "h": "机制 · Hybrid 回退与歧义触发器",
        "a": "papers/2026-locateanything.html#mechanism-2",
        "t": "并行偶尔整块填歪：类别边界犹豫时块内混进结构 token 和坐标 token（Format Irregularity）；密集网格里坐标滑进两物体中间（Spatial Ambiguity）。Hybrid 每块填完就验置信，可疑就作废这块、退回上一块定稿处、改用接龙逐词重写这一块，写完再切回填空。触发器双条件：top-1 坐标概率小于 0.7 且 top-5 候选极差大于 80，同时满足才回退。极差量的是 5 个候选坐标在 [0,1000] 轴上互相差多远，是模型内心动摇的范围，不是框尺寸。"
      },
      {
        "h": "卡壳 · 机制必须落到 token 级",
        "a": "papers/2026-locateanything.html#qa-token-walkthrough",
        "t": "第一版讲解看完还是没看懂具体怎么做的，卡在机制没落到 token 级操作。教训：这篇的机制必须讲到 token 级演算才能建立直觉，纯架构图讲不通。三步走通：原材料（框是一串词）；Transformer 天生每个位置都预测下一词，只是自回归只取最后一个；推理等于只做填空，一段段填。"
      },
      {
        "h": "卡壳 · 坐标并行凭什么互相约束",
        "a": "papers/2026-locateanything.html#qa-constraint",
        "t": "不是先填 x1 再把 x1 传给 x2（并行无回头路），是两条：训练时 4 坐标一起挨罚（同块 mask 的 loss 同时算），模型想拿满分必须让四数构成合法框，约束焊进权重；块内双向注意力让这些位置在 Transformer 内部互见。类比：舞步动作四肢同时摆好，配合靠肌肉记忆一次成型。"
      },
      {
        "h": "卡壳 · 触发器双条件为什么同时满足",
        "a": "papers/2026-locateanything.html#qa-trigger",
        "t": "先澄清：top-5 极差大于 80 指 5 个候选坐标词在 [0,1000] 坐标轴上互相差多远，是模型内心动摇的范围，不是框尺寸。双条件合成一种检测：候选分布是否撕裂。单边都是正常尾巴：低概率但候选挤一团是像素级犹豫（落同一物体内）；高概率但尾巴长是有明确首选。只有不自信加候选几何上严重分裂才说明真不知道框边贴哪，NTP 慢工才有救。"
      },
      {
        "h": "卡壳 · PBD-Slow 凭什么比旧 NTP 高 2 分",
        "a": "papers/2026-locateanything.html#qa-slow-plus2",
        "t": "决定性对照在损失消融第一行：只训 L_ntp（表征已块对齐）得到 50.1，跟旧 Quantized-NTP 分毫不差，说明块本身零增益。全部增益来自 L_blk：它用一次猜对整块才得分把几何联合约束压进共享权重，x1 的分布不再孤立被评、和 y1/x2/y2 绑一起评；沉淀后换回 NTP 推理仍生效。精度收益从必须靠并行里解放。"
      },
      {
        "h": "卡壳 · 通用 MTP 为什么又慢又差",
        "a": "papers/2026-locateanything.html#qa-generic-mtp",
        "t": "结构无关切块让块边界大概率落在无意义处，一个块同时装上一框尾巴坐标加下一类别的开头词，模型被迫拟合横跨框边界、横跨类别的虚假相关（共现统计非真实规律），纯消耗容量还错误传播。加速弱是因为块内容不连贯（SDLM 只到约 5.5 BPS）。PBD 用块等于框把这个伪模式源头拆掉。"
      },
      {
        "h": "数字与代价",
        "a": "papers/2026-locateanything.html#evidence",
        "t": "Hybrid 12.7 BPS（Rex-Omni-3B 5.0 的 2.5 倍、Qwen3-VL-4B 1.1 的 10 倍以上）；LVIS F1@0.95 31.1 vs Rex-Omni 20.7；ScreenSpot-Pro 60.3 SOTA（超 32B 的 GUI-Owl 58.0）；数据引擎 12M 图/138M 查询/785M 框。COCO-only 消融：Textual-NTP 49.1、Quantized-NTP 50.1、PBD-Slow 52.1、PBD-Fast 49.6、PBD-Hybrid 51.6；结构无关 MTP（SDLM-B6）46.1。两腿走路：方法本体无大数据只加 1.5 到 2.0，加 138M 数据后 COCO 54.7；纯 Fast 复杂场景掉精度，最高精度场景用 Slow。"
      },
      {
        "h": "关联",
        "a": "papers/2026-locateanything.html#relations",
        "t": "VST：同一敌人延迟的两种解法，可组合。Video-o3/VST：本文是感知侧底座，它们是推理与行动侧。未来钩子：结构无关 MTP 与扩散语言模型家族（SDLM、Block Diffusion、LLaDA、Dream、DiffusionVL）、grounding 后训练 RL（Vision-R1/UniVG-R1/GW-VLM）入库时回链对照。"
      },
      {
        "h": "完整笔记 · 两类旧表示的痛",
        "a": "notes/papers/2026-locateanything.html#problem",
        "t": "两类旧表示：文本数字（1024 拆成 1,0,2,4）和量化坐标 token（每个坐标一个词按 x1 y1 x2 y2 顺序出）。痛处一：推理瓶颈，一个框 6+ 个 token 串行蹦，N 个框线性放大。痛处二：结构浪费加错误累积，x1 y1 x2 y2 是几何整体（x2 大于 x1、四数构成合法矩形、天然互相验证），逐 token 独立解码让后一个坐标在前一个已写错的基础上孤独地猜，误差滚雪球。"
      },
      {
        "h": "完整笔记 · 接龙卷与填空卷",
        "a": "notes/papers/2026-locateanything.html#intuition",
        "t": "类比：同一道题出两张卷子。接龙卷（NTP）：整串词当已写内容，练看到前缀预测下一个字，保底自回归能力。填空卷（MTP）：按块切开（一个框一块），每块只留第 1 格，后 5 格涂黑成 MASK，练只看每块第一格把空格一次全填对。为什么要留着接龙技能：填空有时整块填歪，Hybrid 每块填完验两道（格式合法、空间置信），可疑就退回上一块定稿处用接龙逐词重写这一块。"
      },
      {
        "h": "完整笔记 · 我的复述",
        "a": "notes/papers/2026-locateanything.html#restatement",
        "t": "用户原话：填空模式下一次 forward 出来，loss 是一块算的，输出的四个值必须构成合法框才能拿分。不留接龙技能不行：Slow 模式就是回退到 NTP 预测；Hybrid 是填空置信度低则扔掉、退回到框开始前的位置用接龙重新回答。旧方法 x1 y1 已经错了，x2 y2 得在这个偏差的先验基础上预测带来更大偏差；PBD 同时输出四个坐标，数值相互独立不会干扰。"
      },
      {
        "h": "完整笔记 · 存疑问题",
        "a": "notes/papers/2026-locateanything.html#open",
        "t": "块内双向注意力在单步并行预测中的确切信息论作用存疑（mask 占位在一步预测中互见的信息量有限，论文与通用 MTP 文献均未展开），留待 DiffusionVL/Block Diffusion 入库时对照，暂不立为问题。"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2026-locateanything.html#problem",
        "t": "解决什么问题 VLM 做检测/grounding 普遍把 2D 框序列化成 1D token 流，两类旧表示：文本数字（1024 拆成 1,0,2,4）和量化坐标 token（每个坐标一个词，按 x1→y1→x2→y2 顺序出）。逐 token 自回归解码带来两处痛： 推理瓶颈：一个框 = 6+ 个 token 串行蹦，N 个框线性放大。H100 上 Qwen3-VL-4B 只有 ~1.1 框/秒（BPS）。机器人/UI 交互这类实时场景扛不住。 结构浪费 + 错误累积：x1,y1,x2,y2 是几何整体（x2>x1、四数构成合法矩形、天然互相验证），逐 token 独立解码既没用上这种强耦合，又让后一个坐标在\"前一个已写错\"的基础上孤独地猜，误差滚雪球。 通用 MTP（一次并行猜多个 token）能减步数，但结构无关：按固定大小（4/6/8）随便切序列，块边界大概率落在无意义处（一个块里装着\"上一个框的尾巴 + 下一类别的开头\"），模型被迫拟合横跨框边界、横跨类别的虚假模式（spurious correlations），消耗容量还传播错误。消融实测：SDLM/Block Diffusion 这类结构无关 MTP 在 COCO 上只有 44~46 F1（旧 NTP 还有 50），加速也弱（~5 BPS）。 本文之问：能不能让 MTP 的\"块\"恰好等于\"一个框\"？ 用结构化并行同时拿下速度和精度。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2026-locateanything.html#intuition",
        "t": "大白话讲解 前提：框在 VLM 眼里是什么 图像 → ViT 切成视觉 token；查询文本 → 语义 token；拼成序列喂 Transformer。模型继续\"写字\"，词表里预置结构词（<ref>、<box>、<eos>…）和坐标词（[0,1000] 每个整数一个词）。\"热狗在框 (342,567)-(890,345)\" 就是一句话：<ref> hot dog </ref> <box> 342 567 890 345 </box> <eos>。旧做法把这 11 个词一个接一个蹦出来（一次 forward 一个词）。 Transformer 有个被浪费的隐藏能力：训练时它学的是\"每个位置都预测下一个词\"，自回归解码却只取最后一个位置的预测。PBD 的全部心思：把浪费掉的预测位置用起来，一次吐多个词。 类比：同一道题，出两张卷子 正确答案（一串 token）排版成两种格式，训练时都喂： 接龙卷（NTP）：把整串词当\"已写内容\"，模型练\"看到前缀预测下一个字\"：保底的自回归能力。 填空卷（MTP）：按块切开（每块固定 6 格，一个框一块），每块只留第 1 格，后 5 格涂黑成 [MASK]。模型练\"只看每块第一格，把空格一次全填对\"。 推理（Fast/Hybrid）时只用填空技能：喂 [图+查询 <box> MASK MASK MASK MASK MASK]，一次 forward 填出 342 567 890 345 </box>：整个框一次出来，从 6 步变 1 步。框与框仍逐个来（半自回归），每轮填完把结果定稿提交进 KV cache。 这里最容易卡住（本次费曼讲解最大卡点）：坐标之间没有先后，怎么\"互相约束\"？ 不是先填 x1 再把 x1 传给 x2（并行没有回头路），而是：① 4 个坐标在训练时一起挨罚（同一块的 mask 位置 loss 同时算），模型想拿满分就得学会\"输出的四数构成合法框\"，这个约束被焊进权重；② 块内双向注意力让这些位置在 Transformer 内部互见。类比：不是\"先迈左脚站稳再迈右脚\"，而是一个舞步动作四肢同时摆好：肌肉记忆里配合是一次成型的。 为什么要留着接龙技能不用？ 填空有时整块填歪（类别边界犹豫时格式错乱、密集网格里坐标滑到两物体中间）。Hybrid 每块填完验两道：格式合法吗？空间置信够吗？（歧义判据 = top-1 坐标概率 < 0.7 且 top-5 候选极差 > 80，两条件同满足 = 候选在坐标轴上撕裂，真歧义）。可疑就作废这块，退回上一块定稿处，改用接龙技能逐词重写这一块，写完再切回填空。Slow 模式更是纯接龙。所以接龙技能不能砍：它既是最高精度兜底，也是回退的引擎。"
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
        "t": "卡壳点与解答 Q：第一版讲解看完说\"还是没看懂具体怎么做的\"，卡在哪？ A：卡在机制没落到 token 级操作。重讲的三步走通：① 原材料：框 = 一串词（结构词 + 坐标词），旧法一个 forward 蹦一个；② Transformer 天生\"每个位置都预测下一词\"，只是自回归只取最后一个：PBD 把浪费的位置用起来，训练时专出\"填空题\"（块留首格、后 5 格 [MASK]、一次填）；③ 推理 = 只做填空，一段段填。教训：这篇的机制必须讲到 token 级演算才能建立直觉，纯架构图讲不通。 Q：坐标并行出、没有先后，凭什么\"互相约束\"？ A：不是\"先填 x1 再传给 x2\"（并行无回头路），是两条：① 训练时 4 坐标一起挨罚（同块 mask 的 loss 同时算），模型想拿满分必须让四数构成合法框，约束焊进权重；② 块内双向注意力让这些位置在 Transformer 内部互见。类比：舞步动作四肢同时摆好，配合靠肌肉记忆一次成型，不是一步步迈。 Q：歧义触发器为什么要求两个条件同时满足？（初答把极差理解成框大小，偏了） A：先澄清：条件 2 的\"top-5 极差 > 80\"指 5 个候选坐标词在 [0,1000] 坐标轴上互相差多远，是模型内心动摇的范围，不是框尺寸。双条件合成一种检测：候选分布是否\"撕裂\"。单边情形都是正常尾巴：top-1 低但候选挤一团（极差小）= 边界像素级犹豫、落在同一物体内，NTP 也不会更好；top-1 高但候选散布开 = 有明确首选、尾巴长无关紧要。只有\"不自信 + 候选在几何上严重分裂\"（比如同时往 200 和 800 两个位置探头）才说明模型真不知道框边贴哪、可能滑进两物体中间（Spatial Ambiguity），NTP 慢工才有救。 Q：PBD-Slow 也是 NTP 解码，凭啥比旧 Quantized-NTP 高 +2？（消融归因） A：初答\"两种形式互相促进\"太泛、抓不到点。决定性数据点是 Table 6c 第一行：只训 Lntp（表征已经块对齐）→ Slow 50.1，跟旧 Quantized-NTP 分毫不差：只把坐标包成块、不加填空监督，零增益。所以 +2 只有一个来源：Lblk 这条块级填空损失。它的作用不是\"教并行\"（Slow 不并行），而是用\"一次猜对整块才得分\"把几何联合约束压进共享权重，x1 的分布不再孤立被评、和 y1/x2/y2 绑一起评；这份结构化监督在权重里沉淀后，换回 NTP 推理依然生效。这就是论文 \"box-aligned formulation provides stronger supervision than 1D serialization, without sacrificing throughput\" 的意思：精度收益从\"必须靠并行\"里解放出来了。 Q：通用 MTP（SDLM/BlockDiff）为什么又慢又差？ A：结构无关切块让块边界大概率落在无意义处，一个块同时装\"上一框尾巴坐标 + 下一类别的开头词\"，模型被迫拟合横跨框边界、横跨类别的虚假相关（共现统计，非真实规律），纯消耗容量还错误传播。加速弱是因为块内容不连贯，实际可用性差（SDLM 只到 ~5.5 BPS）。PBD 用\"块 = 框\"把这个伪模式源头拆掉。"
      },
      {
        "h": "全文问答 · Q：第一版讲解看完说\"还是没看懂具体怎么做的\"，卡在哪？",
        "a": "notes/papers/2026-locateanything.html#qa-token-walkthrough",
        "t": "Q：第一版讲解看完说\"还是没看懂具体怎么做的\"，卡在哪？ 卡在机制没落到 token 级操作。重讲的三步走通：① 原材料：框 = 一串词（结构词 + 坐标词），旧法一个 forward 蹦一个；② Transformer 天生\"每个位置都预测下一词\"，只是自回归只取最后一个：PBD 把浪费的位置用起来，训练时专出\"填空题\"（块留首格、后 5 格 [MASK]、一次填）；③ 推理 = 只做填空，一段段填。 教训：这篇的机制必须讲到 token 级演算才能建立直觉，纯架构图讲不通。"
      },
      {
        "h": "全文问答 · Q：坐标并行出、没有先后，凭什么\"互相约束\"？",
        "a": "notes/papers/2026-locateanything.html#qa-constraint",
        "t": "Q：坐标并行出、没有先后，凭什么\"互相约束\"？ 不是\"先填 x1 再传给 x2\"（并行无回头路），是两条：① 训练时 4 坐标一起挨罚（同块 mask 的 loss 同时算），模型想拿满分必须让四数构成合法框，约束焊进权重；② 块内双向注意力让这些位置在 Transformer 内部互见。类比：舞步动作四肢同时摆好，配合靠肌肉记忆一次成型，不是一步步迈。"
      },
      {
        "h": "全文问答 · Q：歧义触发器为什么要求两个条件同时满足？（初答把极差理解成框大小，偏了）",
        "a": "notes/papers/2026-locateanything.html#qa-trigger",
        "t": "Q：歧义触发器为什么要求两个条件同时满足？（初答把极差理解成框大小，偏了） 先澄清：条件 2 的\"top-5 极差 > 80\"指 5 个候选坐标词在 [0,1000] 坐标轴上 互相差多远 ，是模型内心动摇的范围，不是框尺寸。双条件合成一种检测： 候选分布是否\"撕裂\" 。单边情形都是正常尾巴：top-1 低但候选挤一团（极差小）= 边界像素级犹豫、落在同一物体内，NTP 也不会更好；top-1 高但候选散布开 = 有明确首选、尾巴长无关紧要。只有\"不自信 + 候选在几何上严重分裂\"（比如同时往 200 和 800 两个位置探头）才说明模型真不知道框边贴哪、可能滑进两物体中间（Spatial Ambiguity），NTP 慢工才有救。"
      },
      {
        "h": "全文问答 · Q：PBD-Slow 也是 NTP 解码，凭啥比旧 Quantized-NTP 高 +2？（消融归因）",
        "a": "notes/papers/2026-locateanything.html#qa-slow-plus2",
        "t": "Q：PBD-Slow 也是 NTP 解码，凭啥比旧 Quantized-NTP 高 +2？（消融归因） 初答\"两种形式互相促进\"太泛、抓不到点。决定性数据点是 Table 6c 第一行： 只训 Lntp（表征已经块对齐）→ Slow 50.1，跟旧 Quantized-NTP 分毫不差 ：只把坐标包成块、不加填空监督，零增益。所以 +2 只有一个来源： Lblk 这条块级填空损失 。它的作用不是\"教并行\"（Slow 不并行），而是用\"一次猜对整块才得分\"把几何联合约束压进共享权重，x1 的分布不再孤立被评、和 y1/x2/y2 绑一起评；这份结构化监督在权重里沉淀后，换回 NTP 推理依然生效。这就是论文 \"box-aligned formulation provides stronger supervision than 1D serialization, without sacrificing throughput \" 的意思：精度收益从\"必须靠并行\"里解放出来了。"
      },
      {
        "h": "全文问答 · Q：通用 MTP（SDLM/BlockDiff）为什么又慢又差？",
        "a": "notes/papers/2026-locateanything.html#qa-generic-mtp",
        "t": "Q：通用 MTP（SDLM/BlockDiff）为什么又慢又差？ 结构无关切块让块边界大概率落在无意义处，一个块同时装\"上一框尾巴坐标 + 下一类别的开头词\"，模型被迫拟合横跨框边界、横跨类别的虚假相关（共现统计，非真实规律），纯消耗容量还错误传播。加速弱是因为块内容不连贯，实际可用性差（SDLM 只到 ~5.5 BPS）。PBD 用\"块 = 框\"把这个伪模式源头拆掉。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2026-locateanything.html#open",
        "t": "还没搞懂 _无_：检验题全部补齐，无残留漏洞。「块内双向注意力在单步并行预测中的确切信息论作用」存疑（mask 占位在一步预测中互见的信息量有限，论文与通用 MTP 文献均未展开），留待 DiffusionVL/Block Diffusion 入库时对照，暂不立为问题。"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2026-locateanything.html#relations",
        "t": "关联 VST ： 同主题\"系统延迟\"的两个正交解法：VST 把推理切碎塞进视频播放空档（把延迟藏起来，查询即答），LocateAnything 把几何输出块化、一步出一个框（把解码步数本身减掉）。可组合：视频交互系统用 VST 的推理时机 + 本文的快速低层感知。 Video-o3 / VST ： 本文是感知侧（GUI/指代定位给得又快又准，ScreenSpot-Pro 60.3 SOTA 是 GUI/具身 agent 的感知底座），Video-o3/VST 是拿到框之后的推理/行动侧。下游不变量：UI grounding 的产出是 agent 下一个动作的坐标参数。 未来入库钩子：① 本文是库内第一篇 VLM 检测/grounding 论文，开「解码表征与推理效率」新线；② 同线 Related Work 提及的结构无关 MTP 家族（SDLM / Block Diffusion / LLaDA / Dream，扩散语言模型是另一条并行解码路线）与 DiffusionVL（VL 域）入库时回链本页对照\"结构对齐 vs 结构无关\"；③ 结构输出并行可迁移族（分割多边形 / 动作基元 / 表格单元格，AI 笔记延伸非正文）；④ grounding 后训练 RL（Vision-R1 / UniVG-R1 / GW-VLM，论文 Related Work 提及）入库时回链，对照\"解码范式 vs 强化对齐\"两路线。"
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
    "essence": "用「剪刀（Clip 悲观下界裁剪）」代替「紧箍咒（TRPO 二阶约束优化）」的 Actor-Critic 算法：通过在重要性采样概率比 $r_t(\\theta)$ 上施加悲观裁剪限制策略偏离幅度，安全地在同一批交互样本上跑多轮 Minibatch 随机梯度更新，以极简的一阶优化兼顾样本效率与防策略崩溃的鲁棒性。",
    "review": {
      "next": "2026-09-12",
      "last": "2026-09-09",
      "count": 0,
      "result": ""
    },
    "relations": [
      {
        "type": "applied-in",
        "to": "2026-open-mopd",
        "reason": "Open-MOPD 机制三（reward refresh）的底层优化载体，避免概率比过冲触发 Clip 踩死刹车",
        "status": "reported"
      }
    ],
    "entries": [
      {
        "h": "核心直觉",
        "a": "papers/2017-ppo.html#essence",
        "t": "用「剪刀」代替「紧箍咒」的 Actor-Critic 算法：通过重要性采样概率比的悲观裁剪限制策略偏离幅度，一阶优化兼顾样本效率与稳定性。"
      },
      {
        "h": "一页看懂",
        "a": "papers/2017-ppo.html#overview",
        "t": "经典策略梯度单步即废且易崩盘，TRPO 二阶计算笨重；PPO 用截断代理目标 L_CLIP 安全开启多轮 Epoch 复用。"
      },
      {
        "h": "机制 · 悲观下界与外层 min",
        "a": "papers/2017-ppo.html#mechanism",
        "t": "正优势超出 1+ε 梯度归零防贪婪；负优势坏动作概率激增时，外层 min 保留未截断值，输出巨大纠偏负梯度拉回策略。"
      },
      {
        "h": "机制 · 连续控制与四大监控因果",
        "a": "papers/2017-ppo.html#mechanism-2",
        "t": "BipedalWalker 24维状态4维连续扭矩高斯策略，站立、挪步、行走三阶段；裁剪比例、KL散度、策略熵、回合奖励四大监控指标矩阵。"
      },
      {
        "h": "卡壳 · 为什么既有 clip 又必须带外层 min",
        "a": "papers/2017-ppo.html#qa-min-bound",
        "t": "若只有 clip，坏动作概率激增时被截断导致惩罚缩水且导数清零；外层 min 锁死未截断大值输出纠偏负梯度。"
      },
      {
        "h": "卡壳 · 既然跑多轮为什么还是 on-policy",
        "a": "papers/2017-ppo.html#qa-on-policy-reuse",
        "t": "多轮复用依赖近端重要性采样比率与 clip，策略稍有漂移方差爆炸且绝大部分样本被清零，数据必须丢弃重新交互。"
      },
      {
        "h": "卡壳 · 连续控制训练指标异常如何排查",
        "a": "papers/2017-ppo.html#qa-bipedal-metrics",
        "t": "Clip Fraction > 0.20 且 KL > 0.05 伴随奖励跳水：优先调小 learning_rate、增大 n_steps、收窄 clip_range。"
      },
      {
        "h": "数字与代价",
        "a": "papers/2017-ppo.html#evidence",
        "t": "MuJoCo 7项均分0.82领跑（无裁剪-0.39跑崩）；Atari 49款游戏中30款胜出；绝对效率逊于纯 off-policy。"
      },
      {
        "h": "关联",
        "a": "papers/2017-ppo.html#relations",
        "t": "与 Open-MOPD 机制三（reward refresh）底层载体关联；与 U-OPSD / S²VOPD 标量与稠密信号对比。"
      },
      {
        "h": "完整笔记 · 核心直觉与 BipedalWalker 三阶段",
        "a": "notes/papers/2017-ppo.html#intuition",
        "t": "学骑车机械限位器类比，BipedalWalker 站立、挪步双模态、稳定行走三阶段。"
      },
      {
        "h": "完整笔记 · 我的复述",
        "a": "notes/papers/2017-ppo.html#restatement",
        "t": "我的复述：负优势弄得更差时加 min 巨大负梯度拉回；模型训飞 KL 与熵激增；限制更新幅度避免搞坏。"
      },
      {
        "h": "全文 · 解决什么问题",
        "a": "notes/papers/2017-ppo.html#problem",
        "t": "解决什么问题 强化学习中利用神经网络作为函数拟合器时，长期面临两大互相撕裂的阵营痛点： 经典在线策略梯度（Vanilla PG / A2C）极其脆弱且昂贵： 单次使用即废：标准策略梯度定理要求动作采样自当前参数 $\\theta$。为了维持无偏估计，每批数据只能做一次随机梯度上升，随后必须立刻丢弃，样本利用率极低； 悬崖效应（Cliff-falling）与恶性循环：如果学习率稍大或单批次优势函数估计方差过高，一次过大的更新就会把策略推入性能断崖。在监督学习中，更新坏了一步后续样本还能纠偏；但在强化学习中，下一批交互数据完全由当前策略产生。策略一旦崩溃，采出的全是无效探索垃圾，智能体陷入死循环，再也无法自愈。 信任域策略优化（TRPO）理论扎实但工程实现极其笨重： TRPO 严格约束了策略更新的 KL 散度 $\\mathbb{E}[D_{KL}(\\pi_{old} \\parallel \\pi_\\theta)] \\le \\delta$，提供了单调改进的理论保障； 但求解该约束优化需要构建 Fisher 信息矩阵（涉及 Hessian 矩阵向量积）、依赖共轭梯度算法（Conjugate Gradient）与回溯线搜索（Line Search）； 工程代价惨痛：代码实现极其繁重复杂，计算开销大，且无法天然兼容带噪声的网络结构（如 Dropout）、循环神经网络（RNN）或 Actor 与 Critic 共享底座参数的现代端到端网络。 PPO 的目标是：只用最普通的一阶随机梯度优化器（如 Adam/SGD），就能获得 TRPO 的更新稳定性与样本效率，同时极易实现并通用于任意神经网络架构。"
      },
      {
        "h": "全文 · 大白话讲解",
        "a": "notes/papers/2017-ppo.html#intuition",
        "t": "大白话讲解 核心直觉：从学骑自行车到机械限位器 Vanilla PG 的学法：你刚摸索到一点平衡感，突然猛打了一把方向盘，直接摔断了腿。因为腿断了，你以后跨上车都只能直接倒地，彻底断送学习生涯。 TRPO 的学法：请了一位严苛的物理学教练，你每次想调整重心，他都拿出仪器计算全身体重分布和角动量方程，确认绝对安全才准你微调一毫米：稳如泰山，但每迈一步都累死人。 PPO 的学法：在车把上加装一个机械限位器（Clip）。你想怎么加速怎么练都行，但无论你怎么猛打方向，车把转角被锁死在 $\\pm 20\\%$ 的安全区间（$[1-\\epsilon, 1+\\epsilon]$）。只要跨不出安全区，同一批路况经验你就可以放手多练 10 个来回（多轮 Epoch 复用），摔不坏还学得快。 结合 BipedalWalker-v3（连续控制实战场景） 在连续动作任务中，PPO 的稳定优势展现得淋漓尽致： 连续扭矩控制：BipedalWalker 拥有 24 维状态（躯干角、角速度、关节角度、激光雷达测距等），输出 4 维连续动作（双腿髋关节、膝关节扭矩 $\\in [-1, 1]$）。策略网络输出高斯分布的均值 $\\mu(s)$ 和标准差 $\\sigma(s)$，从中采样连续动作，无需任何生硬的离散化； 三阶段学习规律： 站立阶段（0 ~ 500k 步）：策略先学“不摔倒”，原地扭动维持平衡以跑满 1600 步避免 -100 摔倒重罚，回报从 -110 回升到 -35 左右； 挪步阶段（500k ~ 1M 步）：策略进入高风险过渡期，出现双模态震荡（回报标准差高达 73 分），有时走顺拿 100+ 分，有时绊倒跌入 -100 分。此时策略极其脆弱； 稳定行走阶段（1M ~ 2M 步）：步态成型，多关节协调流动，1118 步迅速通关，回报稳定突破 280+ 分（环境 solved 线为 300）。 如果没有 PPO 的截断保护，在脆弱的挪步期，一次过激的扭矩参数调整就会把刚刚积累的站立与重心平衡先验彻底抹杀，直接让机器人瘫痪。 四大监控指标的因果关联体系 结合工程实操，诊断 PPO 训练健康的四个关键仪表盘： 回合奖励（Episode Reward）：观察滑动平均趋势，切忌被单回合地形扰动造成的上下震荡带偏； 策略熵（Policy Entropy）：衡量高斯策略的标准差大小（探索活力）。初期高、随训练缓慢下降为健康；若过早塌缩至零，意味着陷入“呆站不动”的局部次优； 裁剪比例（Clip Fraction）：有多少动作比率 $r_t(\\theta)$ 撞上了 $[1-\\epsilon, 1+\\epsilon]$ 边界。健康基准为 0.05 ~ 0.15。若 $> 0.2$ 则更新过于激进，随时有跳水风险；若接近 0 则说明学步太慢或已经完全收敛； 近似 KL 散度（Approximate KL）：新旧策略的分布距离。健康应低于 0.03，若突然飙升到 0.05 以上则是策略崩盘的红色告警。 现象 回合奖励 策略熵 裁剪比例 近似 KL 散度 诊断结论与处置 --- --- --- --- --- --- 健康训练 稳步上升 缓慢平稳下降 0.05 ~ 0.15 0.01 ~ 0.03 策略在安全区内稳步推进 激进崩盘 突然跳水 剧烈震荡 飙升 $> 0.20$ 飙升 $> 0.05$ 步子迈太大，需调小 lr 或增大 n_steps 过早早停 停滞不前 快速暴跌至 0 接近 0 接近 0 探索坍缩，需调高 ent_coef 强制探索 训练后期 稳定高位 维持健康低位 稳定偏低 维持极低 步态收敛，进入微调阶段"
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
        "t": "我的复述 <!-- 费曼检验时 用户 自己的回答，保留原话，不润色 --> 检验题 1（为什么有外层 min 与悲观下界）： “没有外层的 min 的话，如果是负优势的话说明把坏动作弄的更差了，不加min那么优化方向会被限制住，加了的话可以让巨大的负梯度把它拉回来” 检验题 2（BipedalWalker 训练指标异常排查）： “模型训飞了，训得和初始模型太远了，导致 KL 过大，探索空间剧增也就是策略熵变大，同时大部分的 loss 都超过 1+\\epsilon范围被截断了” 检验题 3（PPO 多轮复用的底气来源）： “它限制了模型和优势的更新幅度，让模型在范围内探索的同时避免把自身搞坏。”"
      },
      {
        "h": "全文 · 卡壳点与解答",
        "a": "notes/papers/2017-ppo.html#pitfalls",
        "t": "卡壳点与解答 <div class=\"qa\" id=\"qa-min-bound\"> <p class=\"qa-q\">Q：为什么公式里既要有 clip 又必须有外层的 min？只保留 clip(r, 1-eps, 1+eps) * A 会发生什么？</p> <div class=\"qa-a\"> <p>如果只有裁剪项，当一个动作的优势为负（$\\hat{A}_t < 0$，糟糕动作），且网络在某次更新中错误地大幅增加了该动作的概率（例如 $r_t = 2.0$）时，裁剪项会把比率截断在 $1+\\epsilon = 1.2$。这会导致两个致命错误：</p> <ol> <li><strong>惩罚被严重缩小</strong>：损失值从真实的 $2.0 \\hat{A}_t$ 变成了 $-1.2 \\hat{A}_t $，对恶性错误的惩罚被人为减轻；</li> <li><strong>梯度直接归零</strong>：因为比率被锁定在常数边界 1.2 上，导数变为 0，优化器根本收不到惩罚信号来降低这个危险动作的概率！</li> </ol> <p>外层的 $\\min$ 取未裁剪项 $r_t \\hat{A}_t$ 与截断项的最小值，在负优势且动作概率激增时强行保留了真实的未截断值，输出巨大的纠偏负梯度把策略拉回安全区。</p> </div> </div> <div class=\"qa\" id=\"qa-on-policy-reuse\"> <p class=\"qa-q\">Q：既然可以在同一批数据上跑多个 Epoch，为什么说 PPO 依然是严格的 on-policy 算法？</p> <div class=\"qa-a\"> <p>PPO 能够多轮复用同一批数据，靠的是<strong>重要性采样比率 $r_t(\\theta)$ 对小幅度策略偏移的纠偏</strong>，以及 <strong>Clip 对过冲梯度的硬性截断</strong>。但这套机制只在当前策略的近端邻域内有效。</p> <p>一旦策略更新了几个 Epoch，新策略与采集该数据的策略分布差距过大，重要性采样的方差就会呈指数级爆炸，且绝大多数样本的比率都会超出 $[1-\\epsilon, 1+\\epsilon]$，导致有效梯度清零。因此，这批数据在跑完设定的几个 Epoch 后必须彻底丢弃并重新与环境交互采矿，它绝不能像 DQN/SAC 那样放入 Replay Buffer 循环复用数百个时刻前的陈旧数据。</p> </div> </div> <div class=\"qa\" id=\"qa-bipedal-metrics\"> <p class=\"qa-q\">Q：在连续控制（如 BipedalWalker）训练中，Clip Fraction 飙升到 0.27、KL 散度飙升到 0.065 伴随奖励跳水，该如何调参排查？</p> <div class=\"qa-a\"> <p>这是典型的<strong>单步更新幅度过激、策略被推下悬崖</strong>的症状。超过 27% 的样本超出截断范围，新旧策略分布严重脱节（KL 突破 0.05 危险线），原有步态先验被摧毁。</p> <p>工程调参优先顺序：</p> <ol> <li><strong>调小学习率 <code>learning_rate</code></strong>（最直接的刹车手段，如从 3e-4 降到 1e-4）；</li> <li><strong>增大单次采样步数 <code>n_steps</code></strong>（例如增加并行环境数或步数，用更大量的轨迹平滑梯度估计方差）；</li> <li><strong>调小更新轮数 <code>n_epochs</code> 或 <code>clip_range</code></strong>（如将 clip 从 0.2 收窄至 0.1，限制单次更新的最大偏离）。</li> </ol> </div> </div>"
      },
      {
        "h": "全文问答 · Q：为什么公式里既要有 clip 又必须有外层的 min？只保留 clip(r, 1-eps, 1+eps) * A 会发生什么？",
        "a": "notes/papers/2017-ppo.html#qa-min-bound",
        "t": "Q：为什么公式里既要有 clip 又必须有外层的 min？只保留 clip(r, 1-eps, 1+eps) * A 会发生什么？ 如果只有裁剪项，当一个动作的优势为负（$\\hat{A}_t 惩罚被严重缩小 ：损失值从真实的 $2.0 \\hat{A}_t$ 变成了 $-1.2|\\hat{A}_t|$，对恶性错误的惩罚被人为减轻； 梯度直接归零 ：因为比率被锁定在常数边界 1.2 上，导数变为 0，优化器根本收不到惩罚信号来降低这个危险动作的概率！ 外层的 $\\min$ 取未裁剪项 $r_t \\hat{A}_t$ 与截断项的最小值，在负优势且动作概率激增时强行保留了真实的未截断值，输出巨大的纠偏负梯度把策略拉回安全区。"
      },
      {
        "h": "全文问答 · Q：既然可以在同一批数据上跑多个 Epoch，为什么说 PPO 依然是严格的 on-policy 算法？",
        "a": "notes/papers/2017-ppo.html#qa-on-policy-reuse",
        "t": "Q：既然可以在同一批数据上跑多个 Epoch，为什么说 PPO 依然是严格的 on-policy 算法？ PPO 能够多轮复用同一批数据，靠的是 重要性采样比率 $r_t(\\theta)$ 对小幅度策略偏移的纠偏 ，以及 Clip 对过冲梯度的硬性截断 。但这套机制只在当前策略的近端邻域内有效。 一旦策略更新了几个 Epoch，新策略与采集该数据的策略分布差距过大，重要性采样的方差就会呈指数级爆炸，且绝大多数样本的比率都会超出 $[1-\\epsilon, 1+\\epsilon]$，导致有效梯度清零。因此，这批数据在跑完设定的几个 Epoch 后必须彻底丢弃并重新与环境交互采矿，它绝不能像 DQN/SAC 那样放入 Replay Buffer 循环复用数百个时刻前的陈旧数据。"
      },
      {
        "h": "全文问答 · Q：在连续控制（如 BipedalWalker）训练中，Clip Fraction 飙升到 0.27、KL 散度飙升到 0.065 伴随奖励跳水，该如何调参排查？",
        "a": "notes/papers/2017-ppo.html#qa-bipedal-metrics",
        "t": "Q：在连续控制（如 BipedalWalker）训练中，Clip Fraction 飙升到 0.27、KL 散度飙升到 0.065 伴随奖励跳水，该如何调参排查？ 这是典型的 单步更新幅度过激、策略被推下悬崖 的症状。超过 27% 的样本超出截断范围，新旧策略分布严重脱节（KL 突破 0.05 危险线），原有步态先验被摧毁。 工程调参优先顺序： 调小学习率 learning_rate （最直接的刹车手段，如从 3e-4 降到 1e-4）； 增大单次采样步数 n_steps （例如增加并行环境数或步数，用更大量的轨迹平滑梯度估计方差）； 调小更新轮数 n_epochs 或 clip_range （如将 clip 从 0.2 收窄至 0.1，限制单次更新的最大偏离）。"
      },
      {
        "h": "全文 · 还没搞懂",
        "a": "notes/papers/2017-ppo.html#open",
        "t": "还没搞懂 （暂无。费曼三题检验完全收敛，核心概念闭环。）"
      },
      {
        "h": "全文 · 关联",
        "a": "notes/papers/2017-ppo.html#relations",
        "t": "关联 Open-MOPD ： Open-MOPD 揭示的 M-OPD 多教师蒸馏中第三层时序失衡（K 次更新内 Reward 陈旧发霉），其根本物理载体正是 PPO 的 Clip 机制：当学生策略能力在 K 次内大幅提升后仍用旧 Reward 评分，导致概率比 $r_t$ 过冲触发 Clip 锁死刹车，造成 75.8% 的 Token 预算被白白浪费。 U-OPSD / S²VOPD ： 强化学习稀疏标量 Reward 信号与 On-Policy 蒸馏逐 Token 稠密教师分布信号（KL 散度）的演进对比。"
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
    "essence": "on-policy 蒸馏的学习信号只能从「教师知道、学生不知道」的信息差里长出来；这组论文分别回答两件事：单个教师的信息差从哪里来（加教师信息，还是减学生信息），以及多个教师同时教时训练预算怎样才不会分错。",
    "review": {
      "next": "2026-09-12",
      "last": "2026-09-09",
      "count": 0,
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
        "claim": "散度消融排序颠倒是两篇各自报告的实验事实：U-OPSD 必须 forward KL（reverse KL 复读塌缩、JSD 掉 13.8），S²VOPD 则 JSD 最好、reverse KL 居中、forward KL 最差；两组实验条件不同，不能说一篇推翻另一篇",
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
        "claim": "组合设想（库内无实验）：多个自蒸馏伪教师 + Open-MOPD 三机制；两页关联节都说成立，但只论证机制正交，未验证自投票门控按题跳过训练步会不会改变各域 token 份额",
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
        "claim": "散度的角色不同：U-OPSD 的 forward KL 直接当损失（reverse 方向直接优化会塌缩），Open-MOPD 的 reverse-KL 式 dense reward 只是 PPO 的奖励信号（停梯度、走 clip 兜底）；同方向不同框架，不矛盾",
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
        "claim": "Open-MOPD 机制三（reward refresh）的底层载体是 PPO 的重要性比率与 clip：K 次复用同一批 rollout 时若沿用旧 reward，比率过冲触发 clip，75.8% 的 token 预算被冻结；刷新只是顺手用 PPO 本来就要算的当前学生 logprob",
        "status": "reported",
        "evidence": [
          "notes/papers/2026-open-mopd.html#qa-reward-refresh",
          "notes/papers/2017-ppo.html#qa-on-policy-reuse"
        ]
      }
    ],
    "entries": [
      {
        "h": "专题导读 · 蒸馏与训练预算",
        "a": "topics/distillation.html#essence",
        "t": "教师凭什么能教，多个教师又该怎样分配训练预算？on-policy 蒸馏的学习信号只能从「教师知道、学生不知道」的信息差里长出来。这组论文分别回答两件事：单个教师的信息差从哪里来（给教师加信息，还是从学生减信息），以及多个教师同时教时训练预算怎样才不会分错。主线 3 篇：U-OPSD、S²VOPD、Open-MOPD；跨专题 1 篇：PPO。信号只从信息差里长出来：U-OPSD 给教师加一条自投票出的完整轨迹，S²VOPD 从学生减掉清晰像素，Open-MOPD 则证明多教师掉分先怪预算错配、不怪教师冲突。"
      },
      {
        "h": "专题地图 · 信息差来源与预算分配",
        "a": "topics/distillation.html#map",
        "t": "专题分成两个子问题。左侧「信息差从哪来」由同一作者线的两篇在文本域与视觉域各给一个答案，右侧「预算怎么分」由 Open-MOPD 单独回答。PPO 以虚线连到 Open-MOPD，只表示理解前置，不表示论文继承。信息差来源 → U-OPSD：教师上下文里多拼进一条多数投票出的完整解题轨迹 y+，学生只看题目与答错前缀。信息差来源 → S²VOPD：教师看原图、学生看降采样加噪的退化图，不对称来自减少学生的信息。预算分配 → Open-MOPD：掉分主因是 token 份额、reward 幅度、reward 新鲜度三层预算错配，三个机制逐一修复。PPO ⇢ Open-MOPD：机制三 reward refresh 建立在 PPO 的重要性比率与 clip 之上。"
      },
      {
        "h": "专题演进 · 谱系背景与仍留下什么",
        "a": "topics/distillation.html#evolution",
        "t": "谱系背景来自 U-OPSD 页的自述：SFT 要 GT 解且教师强制 → OPD 要外部更强教师 → OPSD 参数自共享但教师仍多看 GT 解 → U-OPSD 连 GT 解也不要；S²VOPD 是同一位置的另一种去依赖：从学生减信息。方法继承：未核实三篇之间存在明确的借鉴、替换或扩展关系，图中不画继承箭头。首次公开时间出处为 arXiv 编号：PPO 2017-07（1707.06347），U-OPSD 2026-08（2608.06296），S²VOPD 2026-08（2608.14144），Open-MOPD 2026-08（2608.19098）；三篇主线同月公开，入库先后只是阅读顺序，不是学术时间线。"
      },
      {
        "h": "专题比较 · 教师额外知道什么 / 监督形式 / 边界",
        "a": "topics/distillation.html#compare",
        "t": "教师额外知道什么：U-OPSD 多数投票得到的完整解题轨迹 y+，label-only 只给答案值掉 10.3~15.8；S²VOPD 学生输入图的清晰版本，教师冻结在基座只掉 0.40；Open-MOPD 三个域专家各自的能力，焦点在预算怎么分。监督形式：全词表逐 token forward KL 直接当损失；逐 token 广义 JSD（α=0.5）top-k 截断后只更新学生；reverse-KL 式 dense reward 进 PPO 的奖励槽位。预算问题在哪：单教师无分账问题；token 份额（batch 内）、reward 幅度（训练全程）、reward 新鲜度（rollout 周期内）三层。最应记住的边界：伪标签 13.3% 出错是硬上界仅竞赛数学；增强必须 task-consistent 大 gap 不等于好 gap；仅 3B、oracle 路由，反向预算规则会形成正反馈环直到崩溃。三篇对散度的实验结论来自不同设置，不能读出一条普适的散度选择定律；「教师多出的信息能否恢复」是待验证假说。"
      },
      {
        "h": "专题路径 · 先读哪篇、带着什么问题",
        "a": "topics/distillation.html#path",
        "t": "建议顺序 U-OPSD → S²VOPD → Open-MOPD，需要时先补 PPO。前两篇构成「信息差从哪来」的一对对照，散度排序颠倒这个交叉点只有连着读才看得清；第三篇切到「预算怎么分」。这是学习路径，不是历史路线。U-OPSD：为什么把共识当教师的上下文，比把共识当标量奖励好 7~11 个点？S²VOPD：为什么「从学生减信息」也算不对称？训练看糊图、考试看好图为什么反而变强？Open-MOPD：预算错配的三个时间尺度分别是什么？reward refresh 为什么零开销？PPO（跨专题前置）：重要性比率与 clip 在同一批样本多轮复用时各扮演什么角色？"
      },
      {
        "h": "跨篇卡壳 · U-OPSD 与 S²VOPD 的散度消融为什么完全相反",
        "a": "topics/distillation.html#qa-distill-divergence",
        "t": "U-OPSD 必须 forward KL（reverse KL 复读崩溃、JSD 掉 13.8）；S²VOPD 是 JSD 最好 > reverse KL > forward KL 最差。实验事实到此为止，两组条件不同，不是一篇推翻另一篇。待验证假说：教师多出的信息学生能否恢复。U-OPSD 教师多的是解题思路，学生原则上自己能推出来，全面模仿方向正确；S²VOPD 教师多的是清晰像素，糊图里丢掉的细节拿不回来，forward KL 逼学生模仿接触不到的细粒度分布反而有害。"
      },
      {
        "h": "跨篇卡壳 · y+ 是伪标签吗",
        "a": "topics/distillation.html#qa-distill-y-plus",
        "t": "不是。y+ 是拼进教师输入的一条完整解题轨迹，整条喂教师、不截断；共识答案 ã(x) 才是单值，只用来投票和分组。消融 label-only 掉 10.3~15.8。跨篇高频复发点：读 S²VOPD 对照表时最容易把「教师多看的东西」又说成标签。09-07 复测首答即明确，不再是弱项。"
      },
      {
        "h": "跨篇卡壳 · reward refresh 为什么零开销",
        "a": "topics/distillation.html#qa-distill-refresh",
        "t": "每个 token 的 dense reward 是教师 logprob 减学生 logprob。教师冻结，rollout 时一次算好缓存；学生当前 logprob 是 PPO 每次内更新算重要性比率本来就要 forward 出来的数，refresh 只是把这个已在显存里的数顺手填回奖励公式。修不掉的部分是轨迹本身仍由旧学生采样，交给 PPO 的 ratio 与 clip 兜底。不刷新的代价：K=4 时 75.8% 的 token 被 clip 冻结。"
      },
      {
        "h": "跨篇卡壳 · 多个自蒸馏伪教师组合后预算错配的形态（待讨论）",
        "a": "topics/distillation.html#qa-distill-multi-self-teachers",
        "t": "库内没有答案。两页关联节都说组合方案成立，但只论证了机制正交（教师从哪来 vs 预算怎么分），没有实验。可以确定的前提：Open-MOPD 的三层错配都以各域响应长度、收敛速度、K 次复用为条件，与教师是否自蒸馏无关；不确定的是自投票门控会按题跳过训练步，可能改变各域实际贡献的 token 份额。"
      },
      {
        "h": "专题关系记录 · 证据边界",
        "a": "topics/distillation.html#relations",
        "t": "原文报告：各篇的机制描述与数字均来自论文页结果与代价。库内对照：把三篇分成信息差来源与预算分配两个子问题、正交切片可组合、建议阅读顺序，都是本库的组织方式。待验证假说：信息可恢复性决定散度选择；OCR 等细粒度任务上 S²VOPD 预期失效；多个自蒸馏伪教师组合后的预算形态。关系记录：rel-distill-asymmetry-source 同一作者线在两个域给出单教师信息差的两种构造；rel-distill-divergence-fact 散度消融排序颠倒是实验事实；rel-distill-recoverability 信息可恢复性统一解释为库内假说；rel-distill-orthogonal-slices 单教师信号来源与多教师预算分账正交；rel-distill-divergence-slot 散度直接当损失 vs 作为 PPO 奖励信号；rel-distill-self-asymmetry-in-multi 多教师框架里每个教师可自构造不对称；rel-distill-ppo-prerequisite reward refresh 的底层载体是 PPO 的重要性比率与 clip。"
      },
      {
        "h": "全文 · 专题本质",
        "a": "notes/syntheses/distillation.html#essence",
        "t": "专题本质 三篇论文围绕 on-policy 蒸馏（OPD，在学生自己采样的轨迹上逐 token 对齐教师分布）分成两个子问题：前两篇在自蒸馏里构造师生信息差（U-OPSD 给教师拼进一条多数投票出的完整解题轨迹，S²VOPD 反过来把学生的输入图退化），第三篇回答多个教师同时教时训练预算怎么分。Open-MOPD 的教师是三个不同的域专家，教师与学生本就是不同模型，不需要靠额外输入制造差异；因此本页不把它当作「信息差来源」谱系的一员。 自蒸馏里的信息差为什么必要：U-OPSD 与 S²VOPD 的教师与学生共享参数，若两者上下文也完全相同，分布就一致、逐 token KL 为零、无学习信号（U-OPSD 关键机制：学生也看了 y+ 则教师=学生 KL 恒 0；S²VOPD 解决什么问题：教师比学生多知道点什么才有信息量）。这条命题只在这类「同模型、同条件」的自蒸馏设置里成立，本页不把它外推为整个 OPD 家族的普适必要条件：教师与学生是不同模型时，分布差异天然存在，但不自动等于蒸馏信号有用。 教师的信息差从哪里来？（自蒸馏设置）传统答案都要外部资源（更大的模型、GT 答案、GT 区域标注）。U-OPSD 用模型自己多数投票出来的完整解题轨迹给教师加信息；S²VOPD 反过来，把学生的输入图退化，从学生身上减信息。两篇是同一作者线在文本推理域与视觉感知域的两个答案。 多个教师同时教，训练预算怎么分？ Open-MOPD 证伪了「教师冲突」这个流行嫌疑人，把掉分归因到 token 级优化预算在三个时间尺度上的系统性错配，并用三个正交机制修复。 范围说明：本专题不覆盖尚未入库的 OPD 基础工作（DistiLLM 系列、GKD）与 SFT / OPD / OPSD 三个谱系背景节点，它们只作为有来源说明的背景出现，不制造未入库论文的阅读卡。Open-MOPD 的教师是与学生不同的域专家，不属于「自蒸馏信息差来源」这一子问题，本专题只把它作为正交的「多教师预算」切片引用。"
      },
      {
        "h": "全文 · 问题与方法地图",
        "a": "notes/syntheses/distillation.html#map",
        "t": "问题与方法地图 图稿依据三篇论文页的「解决什么问题」与「关联」节组织。连线「问题分解」是库内组织方式；「对应方法」连线来自各论文自述。PPO 到 Open-MOPD 的虚线只表示理解前置，不表示论文继承。 flowchart TB root[\"蒸馏：教师信号与训练预算\"] signal[\"教师凭什么提供更有用的分布？\"] budget[\"多个教师的训练预算如何分配？\"] u[\"U-OPSD：教师多看自投票产生的完整轨迹\"] s[\"S²VOPD：教师看清晰图，学生看退化图\"] m[\"Open-MOPD：修复多教师 token 预算错配\"] p[\"PPO：理解策略更新的前置知识\"] root --> 问题分解 signal root --> 问题分解 budget signal --> 文本信息差：给教师加信息 u signal --> 视觉信息差：从学生减信息 s budget --> 对应方法 m p -.-> 理解前置，不表示论文继承 m 边 说明 证据状态 --- --- --- 蒸馏 → 教师凭什么提供更有用的分布 自蒸馏子问题：师生共享参数时必须靠额外信息差制造学习信号，否则分布相同、KL 为零 库内对照（两篇自蒸馏论文各自陈述，本页归为一个子问题） 蒸馏 → 多个教师的训练预算如何分配 多教师 OPD 的独立问题：即便每个教师都合格，合并训练仍会掉分 库内对照 信号来源 → U-OPSD 教师上下文里多拼进一条多数投票出的完整解题轨迹 y+，学生只看题目与答错前缀 原文报告 信号来源 → S²VOPD 教师看原图、学生看降采样加噪的退化图，不对称来自减少学生的信息 原文报告 预算分配 → Open-MOPD 掉分主因是 token 份额、reward 幅度、reward 新鲜度三层预算错配，三个机制逐一修复 原文报告 PPO ⇢ Open-MOPD 机制三 reward refresh 建立在 PPO 的重要性比率与 clip 之上；不理解 clip 就看不出 75.8% 预算被冻结的含义 原文报告（Open-MOPD 关联节明确指出）"
      },
      {
        "h": "全文 · 关系记录",
        "a": "notes/syntheses/distillation.html#relations",
        "t": "关系记录 规范记录。导读页的关系表、静态图与搜索条目都是它的投影；论文页既有的关系卡在迁移时逐条核对到这里的关系 ID。 关系 ID 起点 类型 终点 一句主张 证据状态 依据锚点 指纹 --- --- --- --- --- --- --- --- rel-distill-asymmetry-source 2026-u-opsd compare 2026-s2vopd 同一作者线在两个域给出单教师信息差的两种构造：U-OPSD 给教师加信息（伪解轨迹拼进教师上下文），S²VOPD 从学生减信息（输入图退化）；两者共享「师生只差一份信息」的前提 synthesis notes/papers/2026-u-opsd.html#relations notes/papers/2026-s2vopd.html#relations 331065dd rel-distill-divergence-fact 2026-u-opsd tension 2026-s2vopd 散度消融排序颠倒是两篇各自报告的实验事实：U-OPSD 必须 forward KL（reverse KL 复读塌缩、JSD 掉 13.8），S²VOPD 则 JSD 最好、reverse KL 居中、forward KL 最差；两组实验条件不同，不能说一篇推翻另一篇 reported notes/papers/2026-u-opsd.html#qa-fwd-kl notes/papers/2026-s2vopd.html#qa-divergence 7b1dc6e1 rel-distill-recoverability 2026-u-opsd compare 2026-s2vopd 「教师多出的信息学生能否恢复」统一解释两篇散度分歧（可恢复则全面模仿方向正确，不可恢复则模仿不可及细节有害）；这是库内假说，不是任一原文结论 hypothesis notes/papers/2026-s2vopd.html#open 741401a2 rel-distill-orthogonal-slices 2026-u-opsd complement 2026-open-mopd 单教师信号从哪来与多教师预算怎么分账是正交切片：两页各自处理一个，机制上互不依赖 synthesis notes/papers/2026-u-opsd.html#relations notes/papers/2026-open-mopd.html#relations 2d777e3b rel-distill-combine-self-teachers 2026-u-opsd possible-combination 2026-open-mopd 组合设想（库内无实验）：多个自蒸馏伪教师 + Open-MOPD 三机制；两页关联节都说成立，但只论证机制正交，未验证自投票门控按题跳过训练步会不会改变各域 token 份额 hypothesis notes/papers/2026-u-opsd.html#relations notes/papers/2026-open-mopd.html#relations 2d777e3b rel-distill-divergence-slot 2026-u-opsd compare 2026-open-mopd 散度的角色不同：U-OPSD 的 forward KL 直接当损失（reverse 方向直接优化会塌缩），Open-MOPD 的 reverse-KL 式 dense reward 只是 PPO 的奖励信号（停梯度、走 clip 兜底）；同方向不同框架，不矛盾 reported notes/papers/2026-u-opsd.html#relations notes/papers/2026-open-mopd.html#relations 2d777e3b rel-distill-self-asymmetry-in-multi 2026-s2vopd possible-combination 2026-open-mopd 组合设想（库内无实验）：多教师框架里每个教师都可以用 S²VOPD 式自构造不对称（零特权） hypothesis notes/papers/2026-s2vopd.html#relations 631ca39c rel-distill-ppo-prerequisite 2017-ppo prerequisite 2026-open-mopd Open-MOPD 机制三（reward refresh）的底层载体是 PPO 的重要性比率与 clip：K 次复用同一批 rollout 时若沿用旧 reward，比率过冲触发 clip，75.8% 的 token 预算被冻结；刷新只是顺手用 PPO 本来就要算的当前学生 logprob reported notes/papers/2026-open-mopd.html#qa-reward-refresh notes/papers/2017-ppo.html#qa-on-policy-reuse 98dace7f"
      },
      {
        "h": "全文 · 分叉与演进",
        "a": "notes/syntheses/distillation.html#evolution",
        "t": "分叉与演进 谱系背景（来自 U-OPSD 页「解决什么问题」，尚无独立页）：SFT（要 GT 解且教师强制，训练-推理失配）→ OPD（要外部更强教师）→ OPSD（参数自共享，但教师仍多看 GT 解）→ U-OPSD（连 GT 解也不要）。S²VOPD 站在同一位置给出另一种去外部依赖的方式（减学生信息）。这是 U-OPSD 论文自述的谱系，不是本库核实的方法继承链。 每篇的「原先假设或瓶颈 → 本文改变 → 仍留下什么」： U-OPSD：瓶颈是 OPSD 的教师仍要多看 GT 解，信息仍来自模型之外 → 用模型自己多数投票出的完整解题轨迹当教师特权上下文，只在答错 rollout 上逐 token 前向 KL → 留下：伪标签 13.3% 出错构成性能硬上界；只在可抽取最终答案的竞赛数学上验证（结果与代价）。 S²VOPD：瓶颈是特权信号（更强模型、GT 答案、GT 区域）越来越难获得，特权方法还偏科 → 不对称不必给教师加信息，可以从学生减信息：学生看退化图、EMA 教师看原图 → 留下：增益依赖增强调参（gap 大小与 task-consistency 双准则）；OCR 等细粒度任务预期失效是本人推演、论文未验证（结果与代价）。 Open-MOPD：瓶颈是 naive 多教师合并只拿回 35.6% 的提升，掉分被归咎于教师冲突 → 三重检验证伪教师冲突，定位到 token 份额、reward 幅度、reward 新鲜度三层预算错配并逐一修复，回收率到 83.4% → 留下：仅 3B 规模、三个域、oracle 真实标签路由，路由有误的场景未验证（结果与代价）。 方法继承：未核实三篇之间存在明确的借鉴、替换或扩展关系（U-OPSD 与 S²VOPD 是同作者线的域互补，不是一篇改进另一篇），因此图中不画继承箭头。 首次公开时间（出处：arXiv 编号即首次提交年月）：PPO 2017-07（1707.06347）；U-OPSD 2026-08（2608.06296）；S²VOPD 2026-08（2608.14144）；Open-MOPD 2026-08（2608.19098）。三篇主线同月公开，入库先后（08-19 / 09-02 / 08-27）只是本库的阅读顺序，不是学术时间线。"
      },
      {
        "h": "全文 · 关键维度比较",
        "a": "notes/syntheses/distillation.html#compare",
        "t": "关键维度比较 每格的依据在括号里，落到对应论文页的完整笔记段落。 比较维度 U-OPSD S²VOPD Open-MOPD --- --- --- --- 教师额外知道什么 多数投票得到的完整解题轨迹 y+；label-only 只给答案值掉 10.3~15.8（卡壳点 qa-y-plus） 学生输入图的清晰版本；教师冻结在基座只掉 0.40，强完全来自那张图（结果与代价） 三个域专家各自的能力；本文焦点不在单个教师强在哪，而在预算怎么分（解决什么问题） 学生看到什么 题目 x 与错答前缀 y⁻<t，不见 y+（关键机制） 退化图与问题，自己在坏图上 rollout 8 条（关键机制） 学生在多域 prompt 上 rollout，各域响应长度差 25 倍（大白话讲解） 监督形式 全词表逐 token forward KL，直接当损失（关键机制） 逐 token 广义 JSD（α=0.5），top-k 截断后只更新学生（关键机制） reverse-KL 式 dense reward 进 PPO 的奖励槽位，停梯度加 clip 兜底（关键机制） 预算问题在哪 单教师，无分账问题；门控自动跳过太难与太简单的题（关键机制） 单教师，无分账问题；增强强度呈倒 U 型（关键机制） token 份额（batch 内）、reward 幅度（训练全程）、reward 新鲜度（rollout 周期内）三层（大白话讲解） 最应记住的边界 伪标签 13.3% 出错是硬上界；仅竞赛数学（结果与代价） 增强必须 task-consistent，大 gap 不等于好 gap；OCR 预期失效待验证（卡壳点 qa-crop） 仅 3B、oracle 路由；反向预算规则会形成正反馈环直到崩溃（卡壳点 qa-feedback-loop） 散度选择单独说明：三篇对散度的实验结论分别是 forward KL 必选（U-OPSD）、JSD 最好（S²VOPD）、reverse-KL 式 reward（Open-MOPD，角色是奖励不是损失）。这三个数据点来自不同设置，不能读出一条普适的散度选择定律；「信息可恢复性」的统一解释是待验证假说（见关系记录 rel-distill-recoverability）。"
      },
      {
        "h": "全文 · 带着问题读论文",
        "a": "notes/syntheses/distillation.html#path",
        "t": "带着问题读论文 建议顺序：U-OPSD → S²VOPD → Open-MOPD，需要时先补 PPO。理由：前两篇构成「信息差从哪来」的一对对照，先读文本域最完整的无监督自蒸馏，再读视觉域的减信息变体，散度排序颠倒这个交叉点只有两篇连着读才看得清；第三篇切到「预算怎么分」，是另一个切片。这是学习路径，不是历史路线（三篇同月公开）。 U-OPSD：为什么把共识当教师的上下文，比把共识当标量奖励（TTRL 一类）好 7~11 个点？为什么必须前向 KL？（U-OPSD） S²VOPD：为什么「从学生减信息」也算不对称？训练看糊图、考试看好图为什么反而变强？散度排序为何与 U-OPSD 颠倒？（S²VOPD） Open-MOPD：掉分为什么不是教师打架？预算错配的三个时间尺度分别是什么？reward refresh 为什么零开销？（Open-MOPD） PPO（跨专题前置）：重要性比率与 clip 在同一批样本多轮复用时各扮演什么角色？读懂它才能理解 Open-MOPD 的「75.8% 被 clip 冻结」（PPO）。"
      },
      {
        "h": "全文 · 跨篇卡壳点",
        "a": "notes/syntheses/distillation.html#pitfalls",
        "t": "跨篇卡壳点 前三条复用论文页的历史问答（保留当时日期），第四条是本专题新提出的问题，标「待讨论」。 Q：U-OPSD 与 S²VOPD 的散度消融为什么完全相反？（S²VOPD 页 2026-09-02 首验、09-07 复测收敛） A：先确认「相反」指什么：U-OPSD 必须 forward KL（reverse KL 复读崩溃、JSD 掉 13.8）；S²VOPD 是 JSD 最好 > reverse KL > forward KL 最差。实验事实到此为止，两组条件不同，不是一篇推翻另一篇。库内解释（待验证）：教师多出的信息学生能否恢复。U-OPSD 教师多的是解题思路，学生原则上自己能推出来，全面模仿（mode-covering 的 forward KL）方向正确；S²VOPD 教师多的是清晰像素，糊图里丢掉的细节拿不回来，forward KL 逼学生模仿接触不到的细粒度分布反而有害。量级佐证：U-OPSD 选错散度是灾难（13 点以上或崩溃），S²VOPD 选错只是小亏（1.3 点）。 Q：y+ 是伪标签吗？（U-OPSD 页 2026-08-19 首验；S²VOPD 页 09-02 两连犯口误，09-07 复测收敛） A：不是。y+ 是拼进教师输入的一条完整解题轨迹（几百到上千 token），整条喂教师、不截断；共识答案 ã(x) 才是单值，只用来投票和分组。消融 label-only（只给教师 boxed 答案值）掉 10.3~15.8，因为只知道答案值无法在每个 token 上指引「怎么走到这个答案」。跨篇高频复发点：读 S²VOPD 对照表时最容易把「教师多看的东西」又说成标签。当前状态：09-07 复测首答即明确，不再是弱项。 Q：reward refresh 为什么零开销，又为什么修不掉全部陈旧？（Open-MOPD 页 2026-09-07 复测二次深化） A：每个 token 的 dense reward 是教师 logprob 减学生 logprob。教师冻结，rollout 时一次算好缓存；学生当前 logprob 是 PPO 每次内更新算重要性比率本来就要 forward 出来的数，refresh 只是把这个已在显存里的数顺手填回奖励公式，不加教师 forward、不加学生 forward、不重新生成。修不掉的部分是轨迹本身仍由旧学生采样，换它要重新 rollout（生成占一步 46.5%，最贵），交给 PPO 的 ratio 与 clip 兜底。不刷新的代价：K=4 时 75.8% 的 token 被 clip 冻结。PPO 前置知识见 PPO。 Q（待讨论，2026-09-09 本专题新提）：如果把多个 U-OPSD 式的自蒸馏伪教师放进 Open-MOPD 的多教师框架，预算错配会以什么形态出现？ A：库内没有答案。两页关联节都说组合方案「成立」，但只论证了机制正交（教师从哪来 vs 预算怎么分），没有实验。可以确定的前提：Open-MOPD 的三层错配都以「各域响应长度、收敛速度、K 次复用」为条件，与教师是否自蒸馏无关；不确定的是自投票门控会按题跳过训练步，可能改变各域实际贡献的 token 份额。此问题已记入 questions.md，等有实验或新论文再讨论。"
      },
      {
        "h": "全文问答 · Q：U-OPSD 与 S²VOPD 的散度消融为什么完全相反？（S²VOPD 页 2026-09-02 首验、09-07 复测收敛）",
        "a": "notes/syntheses/distillation.html#qa-distill-divergence",
        "t": "Q：U-OPSD 与 S²VOPD 的散度消融为什么完全相反？（S²VOPD 页 2026-09-02 首验、09-07 复测收敛） 先确认「相反」指什么：U-OPSD 必须 forward KL（reverse KL 复读崩溃、JSD 掉 13.8）；S²VOPD 是 JSD 最好 > reverse KL > forward KL 最差。实验事实到此为止，两组条件不同，不是一篇推翻另一篇。库内解释（待验证）：教师多出的信息学生能否恢复。U-OPSD 教师多的是解题思路，学生原则上自己能推出来，全面模仿（mode-covering 的 forward KL）方向正确；S²VOPD 教师多的是清晰像素，糊图里丢掉的细节拿不回来，forward KL 逼学生模仿接触不到的细粒度分布反而有害。量级佐证：U-OPSD 选错散度是灾难（13 点以上或崩溃），S²VOPD 选错只是小亏（1.3 点）。"
      },
      {
        "h": "全文问答 · Q：y+ 是伪标签吗？（U-OPSD 页 2026-08-19 首验；S²VOPD 页 09-02 两连犯口误，09-07 复测收敛）",
        "a": "notes/syntheses/distillation.html#qa-distill-y-plus",
        "t": "Q：y+ 是伪标签吗？（U-OPSD 页 2026-08-19 首验；S²VOPD 页 09-02 两连犯口误，09-07 复测收敛） 不是。y+ 是拼进教师输入的一条完整解题轨迹（几百到上千 token），整条喂教师、不截断；共识答案 ã(x) 才是单值，只用来投票和分组。消融 label-only（只给教师 boxed 答案值）掉 10.3~15.8，因为只知道答案值无法在每个 token 上指引「怎么走到这个答案」。跨篇高频复发点：读 S²VOPD 对照表时最容易把「教师多看的东西」又说成标签。当前状态：09-07 复测首答即明确，不再是弱项。"
      },
      {
        "h": "全文问答 · Q：reward refresh 为什么零开销，又为什么修不掉全部陈旧？（Open-MOPD 页 2026-09-07 复测二次深化）",
        "a": "notes/syntheses/distillation.html#qa-distill-refresh",
        "t": "Q：reward refresh 为什么零开销，又为什么修不掉全部陈旧？（Open-MOPD 页 2026-09-07 复测二次深化） 每个 token 的 dense reward 是教师 logprob 减学生 logprob。教师冻结，rollout 时一次算好缓存；学生当前 logprob 是 PPO 每次内更新算重要性比率本来就要 forward 出来的数，refresh 只是把这个已在显存里的数顺手填回奖励公式，不加教师 forward、不加学生 forward、不重新生成。修不掉的部分是轨迹本身仍由旧学生采样，换它要重新 rollout（生成占一步 46.5%，最贵），交给 PPO 的 ratio 与 clip 兜底。不刷新的代价：K=4 时 75.8% 的 token 被 clip 冻结。PPO 前置知识见 PPO 。"
      },
      {
        "h": "全文问答 · Q（待讨论，2026-09-09 本专题新提）：如果把多个 U-OPSD 式的自蒸馏伪教师放进 Open-MOPD 的多教师框架，预算错配会以什么形态出现？",
        "a": "notes/syntheses/distillation.html#qa-distill-multi-self-teachers",
        "t": "Q（待讨论，2026-09-09 本专题新提）：如果把多个 U-OPSD 式的自蒸馏伪教师放进 Open-MOPD 的多教师框架，预算错配会以什么形态出现？ 库内没有答案。两页关联节都说组合方案「成立」，但只论证了机制正交（教师从哪来 vs 预算怎么分），没有实验。可以确定的前提：Open-MOPD 的三层错配都以「各域响应长度、收敛速度、K 次复用」为条件，与教师是否自蒸馏无关；不确定的是自投票门控会按题跳过训练步，可能改变各域实际贡献的 token 份额。此问题已记入 questions.md，等有实验或新论文再讨论。"
      },
      {
        "h": "全文 · 证据边界与来源",
        "a": "notes/syntheses/distillation.html#boundaries",
        "t": "证据边界与来源 原文报告：各篇的机制描述与数字（伪标签 13.3%、冻结教师只掉 0.40、回收率 35.6% → 83.4%、75.8% token 被 clip 冻结）均来自论文页「结果与代价」，可按上表括号回查。 库内对照：把三篇分成「信息差来源」与「预算分配」两个子问题、正交切片可组合、建议阅读顺序，都是本库的组织方式，论文没有这样自述。 待验证假说：「信息可恢复性决定散度选择」（S²VOPD 页「还没搞懂」已声明，待 DistiLLM 系列入库验证）；「OCR 等细粒度任务上 S²VOPD 预期失效」（本人推演）；「多个自蒸馏伪教师组合后的预算形态」（本页新提，待讨论）。理解检验通过的假说仍是假说。 成员与来源：U-OPSD（Zotero itemKey JD4RZABE，入库 2026-08-19）、S²VOPD（AWVKHW9W，2026-09-02）、Open-MOPD（S2DP7DZX，2026-08-27）；跨专题引用 PPO（Z6L573AE，2026-09-09）。本页整理日期 2026-09-09。"
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
      "improve-efficiency",
      "lower-latency",
      "improve-reasoning"
    ],
    "essence": "长视频与流式视频的三个瓶颈被三篇论文分头处理：进入 LLM 的视觉 token 太多（感知成本）、深度推理与实时响应冲突（思考时机）、稀疏关键证据被均匀采样淹没（证据获取）；三条分支不是一个已验证的组合系统，也不代表三篇按顺序升级。",
    "review": {
      "next": "2026-09-12",
      "last": "2026-09-09",
      "count": 0,
      "result": ""
    },
    "relations": [],
    "members": [
      "2026-videochat3",
      "2026-vst",
      "2026-video-o3"
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
        "type": "complement",
        "to": "2026-videochat3",
        "claim": "VideoChat3 的 I3D-ViT 把图像 ViT 撑成 3D 处理视频，但没讨论这个 ViT 怎么预训练；GenLIP 回答这一层，训出的 ViT 可被 inflate 成 3D 使用",
        "status": "synthesis",
        "evidence": [
          "notes/papers/2026-videochat3.html#relations"
        ]
      }
    ],
    "entries": [
      {
        "h": "专题导读 · 视频理解与响应",
        "a": "topics/video-understanding.html#essence",
        "t": "看多少、何时想、怎样找证据？长视频与流式视频的三个瓶颈被三篇论文分头处理：进入 LLM 的视觉 token 太多（感知成本）、深度推理与实时响应冲突（思考时机）、稀疏关键证据被均匀采样淹没（证据获取）。三条分支不是一个已验证的组合系统，也不代表三篇按顺序升级。主线 3 篇：VideoChat3、VST、Video-o3；跨专题 1 篇：GenLIP。三篇各管一笔账：VideoChat3 决定看多少像素，VST 决定何时想，Video-o3 决定去哪里找证据；组合时首先要调和的就是响应时机。"
      },
      {
        "h": "专题地图 · 感知成本、思考时机与证据获取",
        "a": "topics/video-understanding.html#map",
        "t": "专题分成三个并列子问题，每篇处理一个。视频理解 → 感知成本：视觉编码器开销近似线性、LLM 注意力二次方，压缩越早越划算。视频理解 → 思考时机：显式推理与实时响应冲突，查询后推理延迟 8.8s，不推理 0.54s。视频理解 → 证据获取：稀疏证据被均匀采样淹没；找线索与答题割裂则多线索无法联合。感知成本 → VideoChat3：I3D-ViT 在编码器里做 16× 时空压缩，状态 token 兼管响应时机与下一窗口像素预算。思考时机 → VST：推理挪到 clip 之间的空档，写入 FIFO 文本记忆，查询时直接读笔记（0.56s）。证据获取 → Video-o3：模型自己生成工具调用，多轮裁剪放大后在同一上下文里作答（上限 8 轮）。"
      },
      {
        "h": "专题演进 · 三条分支与公开时间",
        "a": "topics/video-understanding.html#evolution",
        "t": "VideoChat3：视觉 token 爆炸与稀疏抽帧丢信息 → 把时空冗余在视觉编码器里消化，状态 token 一身兼响应时机与像素预算两职 → 短视频反而略慢，224² 下小尺度证据可能看不见。VST：显式推理与实时响应冲突，离线 CoT 数据带全局 hindsight 信息 → 推理时机从查询后挪到查询前，自造 100K 严格因果 CoT → FIFO 文本记忆有损，思考烧额外后台 token。Video-o3：均匀采样淹没稀疏证据，找线索与答题割裂 → 工具调用由模型自己生成、与推理交替写在同一共享上下文里 → 8 轮与 32k 上限，只有 VideoCrop 一个工具，Fake Thinking 未根治。方法继承未核实，图中不画继承箭头。首次公开出处为 arXiv 编号：Video-o3 2026-01（2601.23224），VST 2026-03（2603.12262），GenLIP 2026-05（2605.00809），VideoChat3 2026-07（2607.14935）；学习顺序与公开顺序正好相反。"
      },
      {
        "h": "专题比较 · 推理发生在何时 / 训练期的掩码 / 边界",
        "a": "topics/video-understanding.html#compare",
        "t": "本页重点：感知压缩与流式响应控制；把思考分摊到播放期；问题驱动的多轮证据获取。关键保留或使用的信息：压缩后的视频 token 与每窗口一个状态 token；最近 L 个视觉 token 的短期缓冲加固定容量的 FIFO 文本记忆；全局低分辨率视野、局部高分辨率裁剪与推理历史共享一个上下文。推理发生在何时：每个时间窗口处理完即决定 Silence / Standby / Response；查询前每来一个 clip 就在空档里写想法；查询后思考、调工具、拼回结果循环。训练期的掩码在管什么：state-transition mask 切换点全保留、保持点均匀采样；流式注意力掩码视觉只看最近 L 个、文本全可见，既防泄露又防训练-推理漂移；TDAM 调工具时禁看局部、答题时禁看全局，只对 10% 数据加。最应记住的边界：感知压缩不等同于文本推理记忆；文本记忆有损，思考速度须适配流式节奏；依赖视频裁剪工具，轮数与上下文有限。带着什么问题读：为什么压缩要尽早发生？为何低查询延迟不等于没有思考成本？为何找到正确线索仍可能答错？"
      },
      {
        "h": "专题路径 · 先读哪篇、带着什么问题",
        "a": "topics/video-understanding.html#path",
        "t": "建议顺序 VideoChat3 → VST → Video-o3：先重建「视觉 token 进 LLM 有多贵」的成本直觉，再比较「思考放在查询前还是查询后」，最后理解「为什么要主动去找证据」。这是学习路径，与公开顺序相反。VideoChat3：为什么压缩要放在视觉编码器里而不是让 LLM 长上下文兜底？状态 token 合二为一有什么隐患？VST：边看边想凭什么不增加延迟？离线 CoT 为什么不能直接训？流式掩码除了防泄露还解决什么？Video-o3：共享上下文带来的两个核心问题分别是什么？为什么只对 10% 数据加 TDAM？GenLIP（跨专题引用）：生成式预训练训出的 ViT 为什么能被 inflate 成 3D 直接用？"
      },
      {
        "h": "跨篇卡壳 · VST 和 Video-o3 的推理时机分别放在哪里",
        "a": "topics/video-understanding.html#qa-video-timing",
        "t": "VST 在查询前：播放期边看边想写笔记，查询到直接读笔记秒答（0.56s）。Video-o3 在查询后：拿到问题后在单一上下文里多轮调工具找线索（MLVU 10.2s）。VST 是先把笔记做好、问就秒答；Video-o3 是拿到问题才去翻监控放大看。两个延迟数字的前提不同，不能直接比大小。"
      },
      {
        "h": "跨篇卡壳 · VideoChat3 的 token 压缩和 VST 的文本记忆是同一件事吗",
        "a": "topics/video-understanding.html#qa-video-compress-vs-memory",
        "t": "不是。VideoChat3 在视觉编码器里压 token、用状态机决定看多少像素，管的是感知效率；VST 用文本记录前序片段、把推理挪到查询前，管的是认知时机。用户当时的原话：VST 用文本记录流式输入的前序片段信息汇总回答，VideoChat 通过压缩视频帧 token 记更多上下文，两者可以同时进行。组合后 VideoChat3 的状态 token 与 VST 的「查询即答」在响应时机上要统一调度。"
      },
      {
        "h": "跨篇卡壳 · VST 与 Video-o3 组合后的结构性问题",
        "a": "topics/video-understanding.html#qa-video-combine-conflict",
        "t": "「查询即答」和「多轮探索后才答」在响应时机上逻辑冲突，需要新的统一调度决定何时秒答、何时探索；这和 VideoChat3 加 VST 组合时的问题是同一个。证据冲突（文本笔记与局部裁剪片段互相排斥时采信谁）是第二层问题。"
      },
      {
        "h": "跨篇卡壳 · 流式注意力掩码与 TDAM 是同一类问题吗（待讨论）",
        "a": "topics/video-understanding.html#qa-video-two-masks",
        "t": "库内只能对照，不能下结论。VST 的掩码让训练可见性照推理来（视觉只看最近 L 个、文本全可见），同时堵住未来信息泄露与训练-推理分布漂移；TDAM 是分工掩码，调工具时禁看局部裁剪、答题时禁看全局视频，只对 10% 数据施加，防注意力分散与 Fake Thinking。前者把「能看到什么」钉在推理架构上，后者把「该看什么」钉在任务阶段上。"
      },
      {
        "h": "专题关系记录 · 证据边界",
        "a": "topics/video-understanding.html#relations",
        "t": "原文报告：三篇的机制描述与数字均来自论文页结果与代价。库内对照：把三篇分成感知成本、思考时机、证据获取三个子问题，以及建议阅读顺序。待验证 / 待讨论：两种训练期掩码是否同一类问题；VideoChat3 状态 token 合并与拆分的利弊。关系记录：rel-video-perception-vs-timing 感知效率与认知时机正交可互补；rel-video-timing-before-vs-after 查询前边看边想 vs 查询后多轮裁剪找线索；rel-video-how-much-vs-where 决定看多少像素 vs 决定看哪里；rel-video-combination-timing-conflict 文本记忆与工具裁剪可组合但响应时机冲突；rel-video-encoder-pretraining GenLIP 回答 I3D-ViT 的 ViT 怎么预训练。"
      },
      {
        "h": "全文 · 专题本质",
        "a": "notes/syntheses/video-understanding.html#essence",
        "t": "专题本质 视频进入多模态大模型后有三笔账要算。第一笔是感知成本：帧率和分辨率一上去视觉 token 爆炸，LLM 注意力随序列长度二次方增长，长视频和实时流几乎跑不动（VideoChat3 解决什么问题）。第二笔是思考时机：显式链式推理能提高多跳精度，但离线式「查询到达后再想」让延迟从 0.54s 涨到 8.8s，实时场景不可用（VST 解决什么问题）。第三笔是证据获取：关键 2 秒藏在 10 分钟里，均匀采样把它淹没在冗余中，而「找线索」和「答题」割裂训练又做不了多线索联合推理（Video-o3 解决什么问题）。 三篇分别只处理一笔账：VideoChat3 在视觉编码器里把 token 压掉 16 倍并用状态机自适应分辨率；VST 把推理挪到查询前的播放空档，写进 FIFO 文本记忆；Video-o3 拿到问题后在共享上下文里多轮裁剪放大找证据。它们对「何时响应」有各自的机制（状态 token、查询即答、多轮探索后收网），这也是组合时首先要调和的地方。 范围说明：本专题不覆盖视觉编码器本身怎么预训练（GenLIP、LaSt-ViT 属视觉编码器专题，只以跨专题引用出现），也不覆盖检测定位侧的 LocateAnything。"
      },
      {
        "h": "全文 · 问题与方法地图",
        "a": "notes/syntheses/video-understanding.html#map",
        "t": "问题与方法地图 图稿依据三篇论文页组织，连线「对应方法」表示「这篇处理此问题」。三条分支并列，不表示先后。 flowchart TB root[\"视频理解：感知、思考与证据获取\"] cost[\"感知成本：减少进入 LLM 的视觉 token\"] timing[\"思考时机：查询前积累文本记忆\"] evidence[\"证据获取：围绕问题主动裁剪细看\"] vc[\"VideoChat3：编码器内压缩与自适应分辨率\"] vst[\"VST：边看边想与 FIFO 文本记忆\"] vo[\"Video-o3：共享上下文内找线索并作答\"] root --> 问题分解 cost root --> 问题分解 timing root --> 问题分解 evidence cost --> 对应方法 vc timing --> 对应方法 vst evidence --> 对应方法 vo 边 说明 证据状态 --- --- --- 视频理解 → 感知成本 视觉编码器开销近似线性、LLM 注意力二次方，压缩越早越划算 原文报告（VideoChat3 大白话讲解） 视频理解 → 思考时机 显式推理与实时响应冲突：查询后推理延迟 8.8s，不推理 0.54s 原文报告（VST 解决什么问题） 视频理解 → 证据获取 稀疏证据被均匀采样淹没；找线索与答题割裂则多线索无法联合 原文报告（Video-o3 解决什么问题） 感知成本 → VideoChat3 I3D-ViT 在编码器里做 16× 时空压缩，状态 token 兼管响应时机与下一窗口像素预算 原文报告 思考时机 → VST 推理挪到 clip 之间的空档，写入 FIFO 文本记忆，查询时直接读笔记（0.56s） 原文报告 证据获取 → Video-o3 模型自己生成工具调用，多轮裁剪放大后在同一上下文里作答（上限 8 轮） 原文报告"
      },
      {
        "h": "全文 · 关系记录",
        "a": "notes/syntheses/video-understanding.html#relations",
        "t": "关系记录 规范记录。导读页的关系表、静态图与搜索条目都是它的投影；论文页既有的关系卡在迁移时逐条核对到这里的关系 ID。 关系 ID 起点 类型 终点 一句主张 证据状态 依据锚点 指纹 --- --- --- --- --- --- --- --- rel-video-perception-vs-timing 2026-videochat3 complement 2026-vst VideoChat3 管感知效率（编码器压 token、状态机自适应分辨率），VST 管认知时机（推理前置、文本记忆），思路正交可互补；VST 论文自述其文本记忆与视觉记忆机制正交 reported notes/papers/2026-videochat3.html#relations notes/papers/2026-vst.html#relations 4e0e4225 rel-video-timing-before-vs-after 2026-vst compare 2026-video-o3 推理时机不同：VST 查询前边看边想、查询即答 0.56s；Video-o3 查询后多轮裁剪找线索、MLVU 推理 10.2s；一个解决实时性，一个解决多跳精度 synthesis notes/papers/2026-video-o3.html#qa-timing notes/papers/2026-vst.html#relations 85af28c3 rel-video-how-much-vs-where 2026-videochat3 complement 2026-video-o3 VideoChat3 靠编码器压缩与状态机决定看多少像素（感知效率），Video-o3 靠推理时工具调用决定看哪里（检索精度） synthesis notes/papers/2026-video-o3.html#relations d0574842 rel-video-combine-feasible 2026-vst possible-combination 2026-video-o3 组合设想（库内无实验）：VST 文本记忆 + Video-o3 工具裁剪可互补实时性与多跳精度 hypothesis notes/papers/2026-video-o3.html#qa-combine notes/papers/2026-vst.html#relations aaa025f0 rel-video-combine-timing-conflict 2026-vst tension 2026-video-o3 组合的结构性障碍（库内对照，依据两页关联节自述）：「查询即答」与「多轮探索后才答」在响应时机上逻辑冲突，需新的统一调度；VideoChat3 的状态 token 与 VST 组合时是同一个问题 synthesis notes/papers/2026-video-o3.html#qa-combine notes/papers/2026-vst.html#relations aaa025f0 rel-video-encoder-pretraining 2026-genlip complement 2026-videochat3 VideoChat3 的 I3D-ViT 把图像 ViT 撑成 3D 处理视频，但没讨论这个 ViT 怎么预训练；GenLIP 回答这一层，训出的 ViT 可被 inflate 成 3D 使用 synthesis notes/papers/2026-videochat3.html#relations b8df1d10"
      },
      {
        "h": "全文 · 分叉与演进",
        "a": "notes/syntheses/video-understanding.html#evolution",
        "t": "分叉与演进 每篇的「原先假设或瓶颈 → 本文改变 → 仍留下什么」： VideoChat3：瓶颈是视觉 token 爆炸与稀疏抽帧丢信息，旧做法把每帧当独立图片喂进 LLM → 把时空冗余在视觉编码器里消化（I3D-ViT 16× 压缩），流式场景用状态机按需切换分辨率，状态 token 一身兼响应时机与像素预算两职 → 留下：短视频（256 帧）反而略慢，优势要视频够长才显现；224² 下小尺度证据可能看不见；论文未消融状态 token 合并与拆分（结果与代价）。 VST：瓶颈是显式推理与实时响应冲突，且离线 CoT 数据带全局 hindsight 信息、直接训会学成作弊 → 推理时机从查询后挪到查询前，自造 100K 严格因果 CoT，流式注意力掩码让训练可见性照推理来 → 留下：FIFO 文本记忆有损（早期证据被淘汰）；思考烧额外后台 token；思考若慢于 clip 间隔只能回退到上一份记忆（结果与代价）。 Video-o3：瓶颈是均匀采样淹没稀疏证据，找线索与答题两阶段割裂 → 工具调用由模型自己生成、与推理交替写在同一共享上下文里，TDAM 防注意力分散与 Fake Thinking，VTGR 控效率 → 留下：8 轮与 32k 视觉上下文上限；只有 VideoCrop 一个工具；Fake Thinking 未根治（结果与代价）。 方法继承：未核实三篇之间存在借鉴、替换或扩展关系，图中不画继承箭头；三条分支不是一个已验证的组合系统。 首次公开时间（出处：arXiv 编号即首次提交年月）：Video-o3 2026-01（2601.23224）；VST 2026-03（2603.12262）；GenLIP 2026-05（2605.00809）；VideoChat3 2026-07（2607.14935）。注意本页建议的学习顺序（VideoChat3 → VST → Video-o3）与公开顺序正好相反，学习顺序按「先重建成本直觉」排，不是时间线。"
      },
      {
        "h": "全文 · 关键维度比较",
        "a": "notes/syntheses/video-understanding.html#compare",
        "t": "关键维度比较 每格的依据在括号里，落到对应论文页的完整笔记段落。 比较维度 VideoChat3 VST Video-o3 --- --- --- --- 本页重点 感知压缩与流式响应控制（大白话讲解） 把思考分摊到播放期（大白话讲解） 问题驱动的多轮证据获取（大白话讲解） 关键保留或使用的信息 压缩后的视频 token 与每窗口一个状态 token（关键机制） 最近 L 个视觉 token 的短期缓冲，加固定容量的 FIFO 文本记忆（关键机制） 全局低分辨率视野、局部高分辨率裁剪与推理历史共享一个上下文（关键机制） 推理发生在何时 每个时间窗口处理完即决定 Silence / Standby / Response（关键机制） 查询前：每来一个 clip 就在空档里写想法，查询时直接读笔记（关键机制） 查询后：思考、调工具、拼回结果循环，证据够了再收网（关键机制） 训练期的掩码在管什么 state-transition mask：切换点全保留、保持点均匀采样，防学成永远闭嘴或走捷径（关键机制） 流式注意力掩码：视觉只看最近 L 个、文本全可见，既防泄露又防训练-推理漂移（卡壳点 qa-mask） TDAM：调工具时禁看局部、答题时禁看全局，只对 10% 数据加，防注意力分散与 Fake Thinking（关键机制） 最应记住的边界 感知压缩不等同于文本推理记忆；256 帧反而略慢（结果与代价） 文本记忆有损；思考速度须适配流式节奏（卡壳点 qa-fifo） 依赖视频裁剪工具；轮数与上下文有限（结果与代价） 带着什么问题读 为什么压缩要尽早发生？（卡壳点 qa-where-compress） 为何低查询延迟不等于没有思考成本？（大白话讲解） 为何找到正确线索仍可能答错？（关键机制 Fake Thinking）"
      },
      {
        "h": "全文 · 带着问题读论文",
        "a": "notes/syntheses/video-understanding.html#path",
        "t": "带着问题读论文 建议顺序：VideoChat3 → VST → Video-o3。理由：先重建「视觉 token 进 LLM 有多贵」的成本直觉，再比较「思考放在查询前还是查询后」，最后理解「为什么要主动去找证据」。这是学习路径；VST 的在线因果约束（只能看到当前与过去）与 Video-o3 的视频裁剪访问条件（拿到问题后可以回看任意区间）必须对照着读，否则容易把两者的「延迟」数字直接比大小。 VideoChat3：为什么压缩要放在视觉编码器里而不是让 LLM 长上下文兜底？状态 token 合二为一有什么隐患？（VideoChat3） VST：边看边想凭什么不增加延迟？离线 CoT 为什么不能直接训？流式掩码除了防泄露还解决什么？（VST） Video-o3：共享上下文带来的两个核心问题分别是什么？为什么只对 10% 数据加 TDAM？（Video-o3） GenLIP（跨专题引用）：VideoChat3 把图像 ViT 撑成 3D，那个 ViT 本身怎么训出来的？（GenLIP）"
      },
      {
        "h": "全文 · 跨篇卡壳点",
        "a": "notes/syntheses/video-understanding.html#pitfalls",
        "t": "跨篇卡壳点 前三条复用论文页的历史问答（保留当时日期），第四条是本专题新提出的问题，标「待讨论」。 Q：VST 和 Video-o3 的推理时机分别放在哪里？（Video-o3 页 2026-08-17 首验漏答半问，09-07 复测首答焊死） A：VST 在查询前：播放期边看边想写笔记，查询到直接读笔记秒答（0.56s）。Video-o3 在查询后：拿到问题后在单一上下文里多轮调工具找线索，每轮裁剪与推理交替（MLVU 10.2s）。一句话：VST 是先把笔记做好、问就秒答；Video-o3 是拿到问题才去翻监控放大看。两个延迟数字的前提不同（VST 的思考成本被分摊到播放期），不能直接比大小。 Q：VideoChat3 的 token 压缩和 VST 的文本记忆是同一件事吗？（VST 页 2026-08-17 首验 Q3） A：不是。VideoChat3 在视觉编码器里压 token、用状态机决定看多少像素，管的是感知效率；VST 用文本记录前序片段、把推理挪到查询前，管的是认知时机。用户当时的原话（VST 我的复述）：「VST 用文本记录流式输入的前序所有片段+前序少数视频帧信息汇总合成回答，而 VideoChat 通过压缩视频帧的token数记更多上下文。两者可以同时进行。」组合后的真实问题是 VideoChat3 的状态 token 与 VST 的「查询即答」在响应时机上要统一调度，双轨记忆冲突时要决定信谁。 Q：VST 与 Video-o3 组合后除了证据冲突还会引入什么结构性问题？（Video-o3 页 2026-08-17 首验漏答半问，09-07 复测通过） A：「查询即答」和「多轮探索后才答」在响应时机上逻辑冲突，需要新的统一调度决定何时秒答、何时探索；这和 VideoChat3 加 VST 组合时的问题是同一个。证据冲突（文本笔记与局部裁剪片段互相排斥时采信谁）是第二层问题。 Q（待讨论，2026-09-09 本专题新提）：VST 的流式注意力掩码与 Video-o3 的 TDAM 都是训练期掩码，它们解决的是同一类问题吗？ A：库内只能对照，不能下结论。两页各自的事实：VST 的掩码让训练可见性照推理来（视觉只看最近 L 个、文本全可见），同时堵住未来信息泄露与训练-推理分布漂移；TDAM 是分工掩码，调工具时禁看局部裁剪、答题时禁看全局视频，只对 10% 数据施加，防注意力分散与 Fake Thinking。可对照的差别是：前者把「能看到什么」钉在推理架构上，后者把「该看什么」钉在任务阶段上。是否能归纳成一条共同原理，等复测时讨论。"
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
        "h": "全文问答 · Q（待讨论，2026-09-09 本专题新提）：VST 的流式注意力掩码与 Video-o3 的 TDAM 都是训练期掩码，它们解决的是同一类问题吗？",
        "a": "notes/syntheses/video-understanding.html#qa-video-two-masks",
        "t": "Q（待讨论，2026-09-09 本专题新提）：VST 的流式注意力掩码与 Video-o3 的 TDAM 都是训练期掩码，它们解决的是同一类问题吗？ 库内只能对照，不能下结论。两页各自的事实：VST 的掩码让训练可见性照推理来（视觉只看最近 L 个、文本全可见），同时堵住未来信息泄露与训练-推理分布漂移；TDAM 是分工掩码，调工具时禁看局部裁剪、答题时禁看全局视频，只对 10% 数据施加，防注意力分散与 Fake Thinking。可对照的差别是：前者把「能看到什么」钉在推理架构上，后者把「该看什么」钉在任务阶段上。是否能归纳成一条共同原理，等复测时讨论。"
      },
      {
        "h": "全文 · 证据边界与来源",
        "a": "notes/syntheses/video-understanding.html#boundaries",
        "t": "证据边界与来源 原文报告：三篇的机制描述与数字（16× 压缩、2048 帧 20.4s vs 44.4s；StreamingBench 79.5%、QA 延迟 0.56s vs 8.8s；MLVU 72.1%、推理 10.2s、8 轮上限）均来自论文页「结果与代价」，可按上表括号回查。 库内对照：把三篇分成感知成本、思考时机、证据获取三个子问题，以及建议阅读顺序，都是本库的组织方式；三篇论文之间的「互补」「取舍」判断来自各自关联节，Video-o3 与 VST 组合的时机冲突是两页共同指出的。 待验证 / 待讨论：两种训练期掩码是否同一类问题（本页新提，待讨论）；VideoChat3 状态 token 合并与拆分的利弊（论文未消融，论文页卡壳点已标「论文未讨论」）。 成员与来源：VideoChat3（Zotero itemKey E5RZINH5，入库 2026-07-27）、VST（6XPHGT5T，2026-08-17）、Video-o3（FG746LWN，2026-08-17）；跨专题引用 GenLIP（EAKWJXT8，2026-08-17）。本页整理日期 2026-09-09。"
      }
    ]
  }
];
