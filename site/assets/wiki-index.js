/* 静态索引。真源：wiki/papers/*.md（front-matter 与正文）、taxonomy.md、review.md。
 * 条目文本取自真源原文（必要时仅把破折号改写为冒号），锚点指向速览页或完整笔记页，
 * 保证命中片段的锚点目标确实包含该文本。由 LLM 在 ingest/review 时同步，可整体再生成。 */
window.WIKI_TOPICS = {
  "video-understanding": "视频理解与响应",
  "visual-encoders": "视觉编码器",
  "distillation": "蒸馏与训练预算",
  "structured-output": "结构化输出与定位"
};

window.WIKI_TAXONOMY = [
  { id: "video-mlm", dim: "mechanism", label: "视频 MLLM", aliases: ["VideoLLM"] },
  { id: "token-compression", dim: "mechanism", label: "token 压缩", aliases: ["visual token compression"] },
  { id: "streaming-inference", dim: "mechanism", label: "流式推理", aliases: ["流式视频", "streaming video"] },
  { id: "memory", dim: "mechanism", label: "文本记忆", aliases: ["FIFO memory", "双记忆系统"] },
  { id: "cot-reasoning", dim: "mechanism", label: "CoT 推理", aliases: ["链式推理", "chain-of-thought"] },
  { id: "group-rl", dim: "mechanism", label: "GRPO", aliases: ["组相对强化学习"] },
  { id: "generative-pretraining", dim: "mechanism", label: "生成式预训练", aliases: ["Prefix-LM"] },
  { id: "attention-sink", dim: "mechanism", label: "attention sink", aliases: ["注意力汇"] },
  { id: "lazy-aggregation", dim: "mechanism", label: "懒惰聚合", aliases: ["lazy aggregation"] },
  { id: "frequency-analysis", dim: "mechanism", label: "频域分析", aliases: ["frequency stability"] },
  { id: "on-policy-distillation", dim: "mechanism", label: "on-policy 蒸馏", aliases: ["OPD", "on-policy 蒸馏"] },
  { id: "self-distillation", dim: "mechanism", label: "自蒸馏", aliases: ["self-distillation"] },
  { id: "multi-teacher", dim: "mechanism", label: "多教师蒸馏", aliases: ["multi-teacher distillation"] },
  { id: "budget-allocation", dim: "mechanism", label: "训练预算", aliases: ["token budget", "预算分配"] },
  { id: "data-augmentation", dim: "mechanism", label: "数据增强", aliases: ["augmentation"] },
  { id: "parallel-decoding", dim: "mechanism", label: "并行解码", aliases: ["block decoding", "并行框解码"] },
  { id: "grounding", dim: "mechanism", label: "视觉定位", aliases: ["VLM grounding"] },
  { id: "tool-use", dim: "mechanism", label: "工具调用", aliases: ["native interleaving"] },
  { id: "lower-latency", dim: "goal", label: "降低响应延迟", aliases: [] },
  { id: "reduce-supervision", dim: "goal", label: "减少外部监督", aliases: [] },
  { id: "improve-efficiency", dim: "goal", label: "提高推理效率", aliases: [] },
  { id: "improve-representation", dim: "goal", label: "改善视觉表示", aliases: [] },
  { id: "improve-grounding", dim: "goal", label: "提高定位精度", aliases: [] },
  { id: "improve-reasoning", dim: "goal", label: "提高推理深度", aliases: [] },
  { id: "improve-perception", dim: "goal", label: "提高细粒度感知", aliases: [] },
  { id: "improve-training-efficiency", dim: "goal", label: "提高训练预算利用率", aliases: [] }
];

/* relations 的 status：reported = 笔记中有论文来源；synthesis = 库内综合对照；hypothesis = 待验证假说。 */
/* review：next = 下次复测日期（review.md），last = 上次复测，count = 复测次数；count 0 表示待首测。 */

window.WIKI_INDEX = [
  {
    id: "2026-videochat3",
    title: "VideoChat3",
    href: "papers/2026-videochat3.html",
    noteHref: "notes/papers/2026-videochat3.html",
    date: "2026-07-27",
    topic: "video-understanding",
    aliases: ["VideoChat3", "VideoChat-Flash", "I3D-ViT"],
    tags: ["video-mlm", "token-compression", "streaming-inference", "improve-efficiency"],
    essence: "4B 全开源 Video MLLM：在视觉编码器里把视频 token 压掉 16 倍，再用状态机自适应分辨率处理流式视频。",
    review: { next: "2026-09-24", last: "2026-08-24", count: 2, result: "pass" },
    relations: [
      { type: "complement", to: "2026-vst", reason: "本文管感知效率（编码器压 token + 状态机），VST 管认知时机（推理前置 + 文本记忆）；组合需统一调度响应时机", status: "reported" },
      { type: "complement", to: "2026-genlip", reason: "I3D-ViT 没讨论 ViT 本身怎么预训练，GenLIP 回答这一层，训出的 ViT 可被 inflate 成 3D 用", status: "synthesis" }
    ],
    entries: [
      { h: "核心直觉", a: "papers/2026-videochat3.html#essence", t: "4B 全开源 Video MLLM。主张视频的时空冗余应该在视觉编码器里就压掉，而不是把一堆帧的 token 全塞给 LLM：用被撑成 3D 的视觉编码器 I3D-ViT 把视觉 token 砍掉 16 倍，再用像人看直播的状态机自适应分辨率处理流式视频。" },
      { h: "一页看懂", a: "papers/2026-videochat3.html#overview", t: "开源 Video MLLM 三通病：泛化差、算力吃不消（LLM 注意力随序列长度二次方涨）、半开源。方法：越早压缩越划算，I3D-ViT 把相邻帧冗余在视觉编码器内部消化（token 除以 16），流式场景用状态机按需切换分辨率（没料 224²，可能有料 448²）。4B 参数 18/19 项指标超 Qwen3-VL-4B；2048 帧延迟 20.4s vs 44.4s。代价：短视频反而略慢，优势要视频够长才显现。" },
      { h: "机制 · I3D-ViT 时间维压缩", a: "papers/2026-videochat3.html#mechanism", t: "四步：切成每 T=4 帧一个 chunk；chunk 内联合时空 self-attention；时间池化 T 帧压成 1；pixel shuffle 2×2 空间下采样。总压缩 4×4=16×。技巧叫 inflate（膨胀）：不从零训 3D 编码器，拿预训练图像 ViT（MoonViT）把 2D 空间 attention 撑成 3D 时空 attention，权重直接复用。压缩比是机械性的（池化加下采样，与内容无关），算力永远省；池化前先做时空 attention 的全部意义是靠冗余保真。" },
      { h: "机制 · Adaptive Frame Resolution 状态机", a: "papers/2026-videochat3.html#mechanism-2", t: "像人看足球直播：中场倒脚半眯眼，前锋突破瞪大眼。每个时间窗口处理完，模型吐一个状态 token，一身兼两职：既是响应时机决策，又是下一窗口像素预算控制。Silence/Response 回 224²，Standby 升 448²。训练技巧 state-transition mask：全部状态 token 都算 loss 模型学成永远闭嘴；只算切换点模型学会从前一状态猜下一个、根本不看视频。解法：切换点全保留，保持点均匀采样同样多，有效监督 Silence : Standby : Response = 2 : 2 : 1。" },
      { h: "卡壳 · 为什么在编码器里压缩", a: "papers/2026-videochat3.html#qa-where-compress", t: "两种开销不对称：视觉编码器近似线性涨，LLM 注意力二次方涨。把压缩从贵的二次方阶段挪到便宜的线性阶段，视频越长越赚（256 帧时反而略慢，2048 帧才大幅反超）。" },
      { h: "卡壳 · 相邻帧零冗余时 16× 压缩还成立吗", a: "papers/2026-videochat3.html#qa-zero-redundancy", t: "分两层：算力层永远成立（池化是机械的，与内容无关）；质量层塌掉，池化前做时空 attention 的意义就是靠冗余在压缩中保真，零冗余时等于把 T 个无关场景硬塞进 1 个 token。净结果：速度保住，精度塌掉，设计赌注被违反。" },
      { h: "卡壳 · 状态 token 合二为一 vs 拆开", a: "papers/2026-videochat3.html#qa-state-token", t: "合一的好处：监督信号白送（状态标签自带预算语义）、符合快速扫无关、见证据高分辨率细读的直觉。隐患：224² 下小尺度证据（小物体、细微动作、小字幕）可能看不见，模型永不进 Standby、永不放大、错过响应；一个 token 背两个目标，梯度混在一起；论文只消融了动态 vs 固定预算，没消融合并 vs 拆分。" },
      { h: "数字与代价", a: "papers/2026-videochat3.html#evidence", t: "16× 视觉 token 压缩；18/19 项指标超 Qwen3-VL-4B；2048 帧延迟 20.4s vs 44.4s，FLOPs 砍 60%+，显存省 26GB；流式 OVO-Timing F1 35.5 vs 8.1；时间定位 TimeLens +9.7、VUE-TR +15.0。局限：ProactiveVQA 输 MMDuet-2；低分辨率监控下小尺度证据可能漏。" },
      { h: "关联", a: "papers/2026-videochat3.html#relations", t: "VST：感知效率与认知时机正交可互补；GenLIP：回答这个 ViT 怎么预训练，训出的 ViT 可被 inflate 成 3D 用。baseline：Qwen3-VL-4B、Molmo2-4B、VideoChat-Flash-7B、InternVideo2.5-8B；前作 VideoChat-Flash（层级压缩）、VideoChat-R1（RL 微调）。" },
      { h: "完整笔记 · 问题背景", a: "notes/papers/2026-videochat3.html#problem", t: "当时开源 Video MLLM 三个通病：一个模型只擅长一种视频场景（泛化差）；帧率高分辨率上去后视觉 token 爆炸，LLM 注意力 O(序列长度²)（算力吃不消）；强模型只放权重不放数据配方（半开源）。老做法稀疏抽帧等于进模型前就把信息扔了，且相邻帧大量重叠冗余没被利用。" },
      { h: "完整笔记 · 三份数据集与四阶段训练", a: "notes/papers/2026-videochat3.html#mechanism", t: "Academic2M（2.27M，用 Qwen3-VL-235B 把短答案改写成带时间证据的丰富回答，判别模型过滤幻觉）；LV116K（长视频 PySceneDetect 切段、逐段标注拼 timeline）；OL617K（离线 QA 转成交错的 Silence/Standby/Response 序列）。四阶段：Stage 0 视觉编码器预训练（临时挂 Qwen3-4B 训完扔掉）到 Stage 3 长视频加流式。" },
      { h: "完整笔记 · 我的复述", a: "notes/papers/2026-videochat3.html#restatement", t: "Q1 为什么在编码器压缩：LLM 计算复杂度和上下文长度呈二次方关系，放到 LLM 代价太高。Q2 零冗余：能压缩但很多重要信息会被丢掉。Q3 合二为一：省一份监督数据、推理不用过独立小模块；隐患是低分辨率找证据时小尺度证据容易被忽视。" }
    ]
  },
  {
    id: "2026-vst",
    title: "VST",
    href: "papers/2026-vst.html",
    noteHref: "notes/papers/2026-vst.html",
    date: "2026-08-17",
    topic: "video-understanding",
    aliases: ["VST", "Video Streaming Thinking"],
    tags: ["streaming-inference", "memory", "cot-reasoning", "group-rl", "lower-latency"],
    essence: "让 VideoLLM 边看边想：把 CoT 推理塞进视频流片段之间的等待空档，写进 FIFO 文本记忆，查询时直接读笔记。",
    review: { next: "2026-09-28", last: "2026-08-28", count: 2, result: "pass" },
    relations: [
      { type: "complement", to: "2026-videochat3", reason: "VideoChat3 管感知效率，VST 管认知时机；双轨记忆与状态 token 的响应时机需要统一调度", status: "synthesis" },
      { type: "compare", to: "2026-video-o3", reason: "推理前置（查询即答 0.56s）vs 查询后多轮检索（10.2s）：实时性与多跳精度的取舍", status: "synthesis" }
    ],
    entries: [
      { h: "核心直觉", a: "papers/2026-vst.html#essence", t: "让 VideoLLM 边看边想：把链式推理（CoT）切碎塞进视频流每两个片段之间的等待空档里异步执行，写成文本笔记存进固定容量的长期记忆；用户提问时模型已经想完了，直接读笔记秒答，零额外查询延迟。" },
      { h: "一页看懂", a: "papers/2026-vst.html#overview", t: "在线视频里深度推理和实时响应天然冲突：流式感知路线只管记忆不做显式推理；离线 CoT 搬过来查询后才开始想，延迟 8.8s 直接不可用。方法：像边看直播边做笔记，推理时机从查询后挪到查询前，每来一个 clip 就在片段间隙把想法写进 FIFO 文本记忆。结果：StreamingBench 79.5%（超 GPT-4o +6.2%）；QA 延迟 0.56s vs Video-R1 的 8.8s。" },
      { h: "机制 · 双记忆系统与推理前置", a: "papers/2026-vst.html#mechanism", t: "短期视觉缓冲：滑动窗口只留最近 L 个视觉 token；长期文本记忆：FIFO 固定容量淘汰最旧条目。空档期思考实测均值 7.0s 小于最小触发间隔 16s；万一思考慢于 clip 间隔，回退到最近一次已完成的记忆状态作答：保证不阻塞响应，不保证记忆一定最新。数据是自造的 100K 严格因果 CoT（知识图谱抽三元组、DFS 采多跳证据链、五重过滤），因为现成离线 CoT 是看完全片的全局 hindsight 视角写的，thoughts 里偷藏后文信息，直接训会学成作弊。" },
      { h: "机制 · 流式注意力掩码与两阶段训练", a: "papers/2026-vst.html#mechanism-2", t: "流式注意力掩码：训练时强制模拟推理时的可见性，每个 token 只能看到最近 L 个视觉 token，但所有历史文本（笔记、记忆）全部可见。既防信息泄露，又让训练可见性与推理一致，避免分布漂移。VST-SFT 学协议；VST-RL 用 GRPO 每问采 8 条轨迹，奖励只看最终答案，但组相对优势赋给轨迹内全部生成 token（含中间 thoughts），把答案正确性的信用间接传回推理步骤。" },
      { h: "卡壳 · 流式掩码除了防泄露还解决什么", a: "papers/2026-vst.html#qa-mask", t: "训练与推理的架构一致性。不加掩码时训练能看全片、推理只能看滑动窗口，分布漂移导致掉点。焊住的框架：掩码是推理可见性的一面镜子，训练是彩排、推理是正式演出。两条规则：「不看未来」永远需要（流式性决定）；「视觉只看最近 L 个」完全跟着推理架构走，推理架构变它就得跟着变。" },
      { h: "卡壳 · 长期记忆存的是前序所有片段吗", a: "papers/2026-vst.html#qa-fifo", t: "不是。FIFO 固定容量，只留最近若干条 thought，是最近的思想笔记而非全部历史。旧记忆被挤出正是失败案例里早期证据丢失的根源。" },
      { h: "卡壳 · FIFO 明知有损为何不换可检索记忆", a: "papers/2026-vst.html#qa-fifo-why", t: "固定容量 = token 预算可控 = 实时性（可检索记忆每步要检索全库，破坏分摊前提）；且消融显示 FIFO 更新策略本身相对不重要，关键在于有文本记忆，不是记忆管理多精巧。" },
      { h: "数字与代价", a: "papers/2026-vst.html#evidence", t: "StreamingBench 79.5%（超开源 SOTA +2.2、超 GPT-4o +6.2）；QA 延迟 0.56s vs 8.8s（15.7× 加速）；VideoHolmes 41.9%；OVO Backward tracing 56.7% 验证长期记忆有效。消融：SFT 补 Backward +9.2、RL 补 Forward +12.7；思考 4 步饱和；3B/7B/32B 全线提升。代价：思考烧额外后台 token；文本记忆有损（早期证据被 FIFO 淘汰、细粒度时间跨度丢失）。" },
      { h: "关联", a: "papers/2026-vst.html#relations", t: "VideoChat3：感知效率与认知时机正交可互补。Video-o3：推理前置 0.56s 秒答 vs 推理时主动检索 10.2s 多轮找线索，可互补但响应时机冲突。baseline：Video-R1、LongVILA-R1、StreamForest、TimeChatOnline、Streamo、Dispider。" },
      { h: "完整笔记 · 问题背景", a: "notes/papers/2026-vst.html#problem", t: "流式感知（StreamForest、Flash-VStream、VideoLLM-online）只做感知级记忆没有显式推理，多跳时序推理拉胯；离线 CoT（Video-R1 8.8s vs 不推理 0.54s）实时场景不可用。隐藏的坑：离线 CoT 是全局 hindsight 视角写的，thoughts 里偷藏后文信息（信息泄露），模型学成作弊。" },
      { h: "完整笔记 · 直觉与两个卡点", a: "notes/papers/2026-vst.html#intuition", t: "看悬疑剧直播边看边记笔记的类比。最容易卡住①：边看边想凭什么不增加延迟？关键在异步加分摊：思考算力被播放时间吸收，增加的是后台算力不是用户感知的响应延迟。卡住②：离线 CoT 数据为什么不能直接训？它是看完全片后写的，思考链里会引用后文信息。" },
      { h: "完整笔记 · 我的复述", a: "notes/papers/2026-vst.html#restatement", t: "Q1：VST 利用视频片段传输的时间进行思考，被网络传输掩盖了所以用户感知不到，前提是传输时间远大于等于思考时间。Q2：离线 CoT 是看完整段视频后得到的，直接训会导致未来信息泄漏。Q3：VST 用文本记录流式输入的前序片段信息汇总回答，VideoChat 通过压缩视频帧 token 记更多上下文，两者可同时进行。" }
    ]
  },
  {
    id: "2026-genlip",
    title: "GenLIP",
    href: "papers/2026-genlip.html",
    noteHref: "notes/papers/2026-genlip.html",
    date: "2026-08-17",
    topic: "visual-encoders",
    aliases: ["GenLIP", "Generative Language-Image Pre-training"],
    tags: ["generative-pretraining", "attention-sink", "improve-representation"],
    essence: "让 ViT 直接说话：用单个 Transformer 的自回归语言建模训视觉编码器预测文本 token，Gated Attention 防 attention sink。",
    review: { next: "2026-10-07", last: "2026-09-07", count: 2, result: "pass" },
    relations: [
      { type: "compare", to: "2026-last-vit", reason: "同为 ViT attention artifact：生成式预训练的 attention sink（Gated Attention 管）vs 判别式的 lazy aggregation（频域聚合管），正交可组合", status: "synthesis" },
      { type: "complement", to: "2026-videochat3", reason: "VideoChat3 回答视频 ViT 怎么处理时空冗余，GenLIP 回答这个 ViT 怎么预训练", status: "synthesis" }
    ],
    entries: [
      { h: "核心直觉", a: "papers/2026-genlip.html#essence", t: "让 ViT 直接说话：图像 token 和文本 token 拼成一个序列丢进单个 Transformer，用标准的预测下一个词训练。ViT 前半段看图（双向注意力），后半段逐字生成描述（因果注意力），训完扔掉语言头，剩下的就是被生成式目标直接训出来的视觉编码器。" },
      { h: "一页看懂", a: "papers/2026-genlip.html#overview", t: "三条旧路各有死穴：对比学习（CLIP/SigLIP）学判别式特征，与生成式下游目标错位；编码器-解码器生成式（AIMv2）ViT 收不到直接梯度；多目标混合（SigLIP2）要 40B 样本。GenLIP：看图写话考试，单塔 Prefix-LM 直接用 next token prediction 训 ViT 本体。结果：仅用 8B 样本（SigLIP2 的 1/5）全规模超越，ALL AVG 73.6 vs 68.9。" },
      { h: "机制 · Prefix-LM Attention 一塔两用", a: "papers/2026-genlip.html#mechanism", t: "序列 = 图像 token 拼在前面当前缀，文本 token 排后面。注意力四规则：图像对图像双向全注意力；文本文本因果；图像看不到文本；文本可以看到图像。损失只在文本部分算（next token prediction），图像 token 不计损。位置编码用 MRoPE。两阶段训练：224² 固定分辨率 1B 图文对打底，再 37M 高质量长描述做原生宽高比适配（视觉 token 约束 16 到 1024）。推理退化回标准 ViT：丢掉语言头，Prefix-LM 退化为全注意力，取最后 LN 层过 2 层 MLP 投影给 LLM。" },
      { h: "机制 · Gated Attention 防 attention sink", a: "papers/2026-genlip.html#mechanism-2", t: "attention sink：生成式预训练中模型发现捷径，把所有信息往少数几个视觉 token 上汇聚，靠这几个枢纽就能预测文本，其余视觉 token 表征退化。为什么生成式更容易触发（对比学习反而不容易）：关键在梯度路由方式。对比学习的损失作用在全局 pooled 表示上，显式要求所有 token 共同贡献，梯度均匀回传；生成式的损失作用在逐 token 的 next word prediction 上，模型自由选择了少数枢纽捷径并被梯度强化。解法：给注意力输出加可学习门 G = σ(XW_g + b_g)，逐元素乘 Ã = G ⊙ A，压低捷径音量，比加 register token 更简洁。" },
      { h: "卡壳 · 为什么生成式更容易触发 attention sink", a: "papers/2026-genlip.html#qa-sink", t: "梯度路由方式不同。对比学习有全局池化逼所有 token 贡献（梯度均匀回传）；生成式的逐 token 预测没有这个约束，文本 token 主动检索视觉信息时，模型自由选择了少数枢纽捷径并被梯度强化。一句话：对比学习有全局池化逼贡献，生成式没这个约束。" },
      { h: "卡壳 · 独立文本解码器指什么", a: "papers/2026-genlip.html#qa-decoder", t: "2026-08-24 复测暴露的混淆点：指的是预训练时的组件（AIMv2 式编码器-解码器路线），不是下游 MLLM 的 ViT + MLP connector + LLM 推理接法。后者是 GenLIP 自己推理时也在用的标准接法，两者别搞混。" },
      { h: "数字与代价", a: "papers/2026-genlip.html#evidence", t: "数据效率：8B 预训练样本（SigLIP2 的 1/5）所有规模全面超越；g/16 + 7B LLM ALL AVG 73.6 vs 68.9（+4.7）。OCR 统治力：ChartQA +9.9、OCRBench +10.3、DocVQA +12.7（vs SigLIP2）。代价：依赖高质量描述数据；无零样本检索的天然优势（没显式对比目标）；验证限于学术规模 MLLM。" },
      { h: "关联", a: "papers/2026-genlip.html#relations", t: "LaSt-ViT 直接对接：同为 ViT attention artifact，GenLIP 在生成式预训练发现 attention sink（少数 token 吸信息）用 Gated Attention 压制；LaSt-ViT 在判别式预训练发现 lazy aggregation（背景抢 CLS）用频域选择性聚合纠正，正交可组合。VideoChat3：GenLIP 训出的 ViT 可被 inflate 成 3D 用。baseline：CLIP、SigLIP、SigLIP2、AIMv2、OpenVision2、CapPa、CoCa。" },
      { h: "完整笔记 · 三条旧路死穴", a: "notes/papers/2026-genlip.html#problem", t: "双塔对比学习：目标错位，学的是判别式特征（擅长检索分类），MLLM 是生成式（next token prediction），接入 LLM 后困惑度更高。编码器-解码器生成式（AIMv2、CapPa）：架构冗余加间接优化，ViT 收不到直接梯度信号。多目标混合（SigLIP2、CoCa）：超参难调、训练不稳，需要 40B 样本。" },
      { h: "完整笔记 · 我的复述", a: "notes/papers/2026-genlip.html#restatement", t: "Q1：clip/siglip 训练的是嵌入检索等任务而下游 MLLM 需要处理生成任务，任务不兼容；genlip 给 vit 一个简单的 lmhead 让 vit 同时负责图像编码和文本解码生成，任务统一消除错位。Q2 四规则：图像 token 互相可见，文本之间因果、可看到图像及前序文本，图像看不到文本。" }
    ]
  },
  {
    id: "2026-last-vit",
    title: "LaSt-ViT",
    href: "papers/2026-last-vit.html",
    noteHref: "notes/papers/2026-last-vit.html",
    date: "2026-08-17",
    topic: "visual-encoders",
    aliases: ["LaSt-ViT", "Lazy Stable ViT"],
    tags: ["lazy-aggregation", "frequency-analysis", "improve-representation"],
    essence: "揭示 ViT 的懒惰聚合根因：全局注意力和粗粒度监督让背景 patch 代替前景成为 CLS 载体，再用频域稳定性逼它回到前景。",
    review: { next: "2026-10-07", last: "2026-09-07", count: 2, result: "pass" },
    relations: [
      { type: "compare", to: "2026-genlip", reason: "生成式的 attention sink vs 判别式的 lazy aggregation；Gated Attention 管信息分布，LaSt-ViT 管 CLS 聚合，正交可叠加", status: "synthesis" },
      { type: "complement", to: "2026-videochat3", reason: "I3D-ViT 基座也可用 LaSt-ViT 的聚合方式改进密集特征", status: "synthesis" }
    ],
    entries: [
      { h: "核心直觉", a: "papers/2026-last-vit.html#essence", t: "ViT 偷懒：有全局注意力又只有图像级标签时，它发现用大量背景 patch 当全局语义载体就能把分类做对，根本不关心前景在哪，结果分类准但密集预测废。解法是用频域稳定性评分逼 CLS token 只从前景 patch 聚合信息。" },
      { h: "一页看懂", a: "papers/2026-last-vit.html#overview", t: "ViT 当通用特征提取器时密集预测（分割、检测）不如 ConvNet：CLS 关注背景而非前景。旧解法治标（Register tokens，PiB 反降）或拆东补西（窗口注意力，分类掉 8%），且没人搞清 artifact 为何产生。LaSt-ViT 先诊断再开药：根因是懒惰聚合 = 粗粒度监督 + 全局注意力，缺一不可。PiB 42.7 升到 55.1；CLIP 零样本分割 VOC 17.1 升到 72.4；12 个基准一致提升且分类不掉，零额外参数、零额外损失。" },
      { h: "机制 · 懒惰聚合的两个驱动", a: "papers/2026-last-vit.html#mechanism", t: "诊断工具：Patch Score（CLS 与各 patch 的余弦相似度）、PiB（最高分 patch 落在前景框内的比例）。驱动 1 = 粗粒度监督（只有图像级标签，没有空间指导，背景 patch 远多于前景，靠背景投票就能降 loss）；驱动 2 = 全局注意力（给前景语义扩散到背景的通道）。三者证据：训练初期 PiB 就低（PiB 仅 42.7%，ConvNet 68.4%）；遮掉最高分 50% patch 分类几乎不掉（高分 patch 是捷径）；换窗口注意力 PiB 升到 59.8 但分类掉 8%。" },
      { h: "机制 · 频域稳定性评分与 Top-K 聚合", a: "papers/2026-last-vit.html#mechanism-2", t: "每个 patch 的 D 维特征沿通道维做 1D FFT，高斯低通滤波后 IFFT 回来；稳定性分数 = 滤波后特征比上滤波前后差值，分数高 = 低频主导 = 大概率前景。每个通道独立选稳定性最高的 K 个 patch 取均值作为该通道的 CLS 值（不同语义维度可选不同前景区域）。FFT 和 Top-K 都是确定性操作：零可学习参数、不改损失、Top-K 天然可微。为什么频域稳定能分前景背景：是通道维频域特性不是空间连续性，前景物体在深层特征的通道维上语义一致（低频主导），背景混杂多结构（频谱丰富，低通后能量损失大）。" },
      { h: "卡壳 · 懒惰聚合的两个驱动因素", a: "papers/2026-last-vit.html#qa-drivers", t: "驱动 1 = 粗粒度监督（只有图像级标签，没有 patch 级空间指导）；驱动 2 = 全局注意力（前景语义扩散到背景的通道）。缺一不可：窗口注意力实验（PiB 升但分类掉 8%）证明全局注意力是帮凶但砍掉得不偿失。" },
      { h: "卡壳 · Register tokens 为什么没用", a: "papers/2026-last-vit.html#qa-register", t: "实测加 Register 后 PiB 从 42.7 反降到 41.5（不是没提升，是反降）。高范数只是懒惰聚合的晚期症状，Register 把症状挪走，病因（CLS 往背景跑）还在。ViT needs more than registers，标题说的就是这个。" },
      { h: "卡壳 · 频域稳定性的真正机制", a: "papers/2026-last-vit.html#qa-frequency", t: "是通道维频域特性，不是空间连续性。反向论证：空间维的低频是墙壁等平滑区域，恰恰是背景，不能当前景判据。通道维低频的直观图像约等于语义分割的输出图：同一类别同一颜色，同类语义在通道维上变化小。" },
      { h: "卡壳 · 适用范式与能否和 GenLIP 组合", a: "papers/2026-last-vit.html#qa-scope", t: "不止对比学习：跨三种判别式预训练通用（标签监督、CLIP 文本监督、DINO 自监督），准确叫法是判别式预训练（对应 GenLIP 的生成式）。能组合：Gated Attention 管信息分布（防少数 token 吸走），LaSt-ViT 管 CLS 聚合（逼从前景取），作用在不同环节，正交可叠加。" },
      { h: "数字与代价", a: "papers/2026-last-vit.html#evidence", t: "PiB 三范式：全监督 42.7 升到 55.1、DINO 44.5 升到 69.7、CLIP 39.8 升到 50.1；CLIP ViT-L VOC 零样本分割 17.1 升到 72.4（+55.3）；涌现分割 mIoU 22.3 升到 32.8。局限：K 值敏感（推荐约 50% patch 数）；无明确前景的图（风景、群体）与前景纹理极复杂时可能失效。" },
      { h: "关联", a: "papers/2026-last-vit.html#relations", t: "GenLIP 直接对接：生成式 attention sink vs 判别式 lazy aggregation，正交可组合。VideoChat3：I3D-ViT 基座也可用本聚合方式改进密集特征。baseline：Register tokens（Darcet et al.）、MaskCLIP、CLIPSelf、SCLIP、窗口注意力、LOST。" },
      { h: "完整笔记 · 偷懒考官类比", a: "notes/papers/2026-last-vit.html#intuition", t: "考试只看总分不看过过程：ConvNet 每个学生（感受野）只能看局部，必须认真看前景才能答对，笨但靠谱；ViT 所有学生能看全图，发现背景跟类别有统计相关，集体抄背景答案，总分很高但你问具体哪是猫，全指向背景。" },
      { h: "完整笔记 · 我的复述", a: "notes/papers/2026-last-vit.html#restatement", t: "Q1：懒惰聚合指传统 ViT 训完后倾向于通过背景 token 信息猜测前景信息；原因 1 是背景 patch 占比明显多于前景。Q2：D 维特征做傅立叶变换，过低通滤波器后反变换，计算与变换前后差值的绝对值作为频域稳定性评分；把 K 设成全部 patch 数相当于全局池化，信息会丢失。" }
    ]
  },
  {
    id: "2026-video-o3",
    title: "Video-o3",
    href: "papers/2026-video-o3.html",
    noteHref: "notes/papers/2026-video-o3.html",
    date: "2026-08-17",
    topic: "video-understanding",
    aliases: ["Video-o3", "Video-Holmes"],
    tags: ["tool-use", "cot-reasoning", "group-rl", "improve-reasoning"],
    essence: "像侦探破案一样看视频：模型在共享上下文里循环找线索、裁剪放大、连逻辑并回答，工具调用由模型自己生成。",
    review: { next: "2026-10-07", last: "2026-09-07", count: 2, result: "pass" },
    relations: [
      { type: "compare", to: "2026-vst", reason: "推理时机：VST 查询前写笔记秒答，Video-o3 查询后多轮裁剪找线索；实时性与多跳精度的取舍", status: "synthesis" },
      { type: "complement", to: "2026-videochat3", reason: "VideoChat3 决定看多少像素（感知效率），Video-o3 决定看哪里（检索精度）", status: "synthesis" }
    ],
    entries: [
      { h: "核心直觉", a: "papers/2026-video-o3.html#essence", t: "像侦探破案一样看视频：先粗扫全片，发现疑点主动放大某段细看，看完再决定继续找还是收网作答。找线索和答题在同一个共享上下文里交替进行，模型自己决定何时调工具、调哪里、用多少分辨率、何时停。" },
      { h: "一页看懂", a: "papers/2026-video-o3.html#overview", t: "长视频两个老毛病：均匀采样把稀疏关键证据淹没在冗余里；已有找线索加答题方案两阶段割裂，上下文不共享、手工规则控时机。方法：单一共享上下文里循环思考、调 VideoCrop 裁剪放大、再思考，工具调用由模型自己生成的文本触发（原生交错）。MLVU 72.1%、Video-Holmes 46.5% 均领先；推理 10.2s 比解耦方法快 46%。" },
      { h: "机制 · 回合制找线索循环", a: "papers/2026-video-o3.html#mechanism", t: "输入 = 工具说明 + 问题 + 全局低分辨率视频。循环：think 分解问题评估证据；不够则 grounding 指定时间区间加分辨率配额（coarse/medium/fine）；VideoCrop 执行裁剪，局部高分辨率片段拼回上下文；回到思考或直接 answer 终止。评估上限 8 轮，视觉上下文上限 32k token。训练数据 Seeker-173K 自造：线索定位、有效性验证、轨迹生成、逻辑一致性检查。" },
      { h: "机制 · TDAM 与 VTGR 两个问题两个解法", a: "papers/2026-video-o3.html#mechanism-2", t: "共享上下文问题 1 注意力分散（全局、局部、推理文本混杂，更严重的是 Fake Thinking：模型通过工具找到正确证据，最终答案却和中间推理矛盾）配 TDAM：生成工具调用时禁止看局部裁剪（只靠全局做定位规划），生成最终答案时禁止看全局（只靠工具局部证据作答），只对 10% 数据加掩码（全加会丧失全局加局部综合能力，20%/30% 反降）。问题 2 上下文效率（token 膨胀、不知何时停）配 VTGR：R = r_a·(1+β)+r_f，β 由 Hybrid Clue Score（裁剪区间与真实证据的 IoU/IoP/IoG 对齐度，奖找得准）乘 Turn Decay（轮数衰减，奖找得快）构成；答错 β 不生效，超轮数轨迹不产梯度。" },
      { h: "卡壳 · 共享上下文的两个核心问题", a: "papers/2026-video-o3.html#qa-two-problems", t: "(1) 注意力分散（全局/局部混杂 + Fake Thinking）对应 TDAM 的 10% 硬掩码。(2) 上下文效率（token 膨胀 + 不知何时停）对应 VTGR（Clue Score 奖裁得准、Turn Decay 惩轮数多）。两个问题两个解法是配对的。" },
      { h: "卡壳 · VST 和 Video-o3 的推理时机", a: "papers/2026-video-o3.html#qa-timing", t: "VST 在查询前（播放期边看边写笔记，查询到了读笔记秒答）；Video-o3 在查询后（拿到问题才在单一上下文里多轮调工具找线索）。一句话：VST 是先把笔记做好问就秒答，Video-o3 是拿到问题才去翻监控放大看。" },
      { h: "卡壳 · 两者组合的结构性问题", a: "papers/2026-video-o3.html#qa-combine", t: "查询即答和多轮探索后才答在响应时机上逻辑冲突，需要设计统一调度（何时秒答、何时探索），和 VideoChat3 + VST 组合时遇到的是同一类问题。" },
      { h: "数字与代价", a: "papers/2026-video-o3.html#evidence", t: "MLVU 72.1%（超 VideoZoomer 65.2）、Video-Holmes 46.5%、LVBench 47.6%；MLVU 推理 10.2s vs VideoChat-R1.5 的 18.9s（共享上下文吃 KV Cache 增量计算红利）。消融：删 Hybrid Clue Score 工具调用率和准确率同时暴跌；删 Turn Decay 调用率升准确率降（过度探索）；省 SFT 冷启动 RL 出现 dip-and-recover。局限：8 轮上限、工具单一（只有 VideoCrop）、Fake Thinking 未根治。" },
      { h: "关联", a: "papers/2026-video-o3.html#relations", t: "VST：推理前置 0.56s 秒答（实时性）vs 推理时主动检索 10.2s（多跳精度），文本记忆加工具裁剪可组合但响应时机冲突。VideoChat3：感知效率 vs 检索精度互补。baseline：Qwen2.5-VL、Video-R1、VideoChat-R1.5、Video-RTS、VideoZoomer、LOVE-R1。" },
      { h: "完整笔记 · 原生是什么意思", a: "notes/papers/2026-video-o3.html#intuition", t: "原生（native）：工具调用不是外部脚本触发的，而是模型自己生成的文本，模型在推理过程中自己写出 grounding JSON（时间区间加采样策略），系统执行后把裁剪结果拼回对话。模型必须学会何时调、调哪里、用多少分辨率、何时停。" },
      { h: "完整笔记 · 我的复述", a: "notes/papers/2026-video-o3.html#restatement", t: "Q1：原生的工具调用是由模型自己产生、触发的；video-o3 给 10% 的数据加片段 mask，生成工具调用时禁止看局部裁剪片段，生成答案时禁止看全局视频。Q2：fake thinking 指思考过程中实际已找到证据链，但回答时给出相反结论，原因是共享上下文把全局推理、局部片段混杂在一起把模型带偏。" }
    ]
  },
  {
    id: "2026-u-opsd",
    title: "U-OPSD",
    href: "papers/2026-u-opsd.html",
    noteHref: "notes/papers/2026-u-opsd.html",
    date: "2026-08-19",
    topic: "distillation",
    aliases: ["U-OPSD", "On-Policy Self-Distillation without Any Supervision", "OPD"],
    tags: ["on-policy-distillation", "self-distillation", "reduce-supervision"],
    essence: "模型自己做 8 遍题，多数投票伪解作为教师特权上下文，只在答错轨迹上逐 token 前向 KL 蒸馏，去掉 GT 依赖。",
    review: { next: "2026-10-07", last: "2026-09-07", count: 2, result: "pass" },
    relations: [
      { type: "compare", to: "2026-s2vopd", reason: "散度排序完全颠倒（本文必须 forward KL，S²VOPD 是 JSD 最好）；用信息可恢复性统一解释是库内假说", status: "hypothesis" },
      { type: "complement", to: "2026-open-mopd", reason: "正交切片：本文管单教师信号从哪来（无 GT 自蒸馏），Open-MOPD 管多教师怎么分账；组合方案成立", status: "synthesis" }
    ],
    entries: [
      { h: "核心直觉", a: "papers/2026-u-opsd.html#essence", t: "让模型给自己的答错题开小灶：它自己把一道无答案的题做 8 遍，多数票当标准答案，专门拿答错的那几版去对照看过答案的自己逐 token 纠正，全程不需要任何外部答案。首个完全无外部监督的 on-policy 自蒸馏。" },
      { h: "一页看懂", a: "papers/2026-u-opsd.html#overview", t: "后训练谱系每往右一步去掉一类外部依赖：SFT 要 GT 解且教师强制导致训练推理失配；GRPO 要 GT 答案做奖励且信号稀疏；OPD 要外部强教师；OPSD 参数自共享但教师仍多看 GT 解。U-OPSD 用自己投票出来的伪解 y+ 替代 GT。Non-thinking 模式 4B/8B 比基座 +8.5/+10.7，无 GT 反而超过有 GT 的 OPSD（+3.2/+2.3）。代价：伪标签 13.3% 是错的，构成性能硬上界。" },
      { h: "机制 · 采样到投票到门控到蒸馏", a: "papers/2026-u-opsd.html#mechanism", t: "Sample：冻结策略独立采样 G=8 条 rollout。Vote：多数票赢的当伪答案；一致性 c(x) = 同意票数/G，分母是 G，截断废票直接拉低分数。Gate：c(x) 小于 τ=0.5 或全对则跳过不学，自发课程只学能形成共识但时不时跑偏的能力边界题。Distill：教师输入 x + y+ + y⁻<t，学生输入 x + y⁻<t，两者共享错答前缀，教师比学生多出来的只有 y+（一条完整的同意 rollout，整条喂入不截断）；沿答错 rollout 逐 token 前向 KL。学生若也看了 y+，教师等于学生，KL 恒 0。" },
      { h: "机制 · 三个消融出的硬取舍", a: "papers/2026-u-opsd.html#mechanism-2", t: "教师必须看完整推理轨迹：label-only 掉 10.3 到 15.8%，光知道答案是 42 无法引导中间步骤。必须 forward KL：reverse KL 训练崩塌（长度 2.7k 到 99k、boxed 率 99% 到 33%、丧失终止，塌成复读机）；JSD 掉 13.8%。必须全词表分布蒸馏：sampled-token 掉 13.7%，且伪标签下差距比 GT 下更大；top-100 截断反而最好。" },
      { h: "卡壳 · 为什么必须前向 KL", a: "papers/2026-u-opsd.html#qa-fwd-kl", t: "厨师比喻：前向 KL（老师会的学生都得会，漏掉任何一道就罚）是 mode-covering，学生变全面厨师；反向 KL（学生敢做老师菜单外的菜就罚）是 mode-seeking，学生死抱老师概率最高的招牌菜塌成复读机。易记偏两处：反向 KL 罚的是学生越菜单；实测失败模式是复读塌缩（长度爆炸、无限重复、丧失终止），不是幻觉。" },
      { h: "卡壳 · 13.3% 错标签为什么没带偏模型", a: "papers/2026-u-opsd.html#qa-13-3", t: "13.3% 的伪标签错误率。四重设计抬高净收益：门控先拦截瞎猜题（13.3% 是过门后的错误率）；自发课程聚焦能力边界（大多数时候对的题上 y+ 大概率对）；前向 KL 加全词表是稠密信号，一条 rollout 数百个纠正点，正梯度盖过少数错 y+ 的负梯度；教师不需要 y+ 完美，只需多数方向对，噪声 token 被平均。" },
      { h: "卡壳 · y+ 是答案值还是整条轨迹", a: "papers/2026-u-opsd.html#qa-y-plus", t: "ã(x) 是单值（如 boxed 42），用来投票和分组；y+ 是通向 ã(x) 的整条推理轨迹（几百上千 token），整条喂教师当背景知识，不截断。<t 只在 y⁻ 上，因为蒸馏沿答错那条逐 token 往前走，t 每加 1 在新位置算一次师生下一 token 分布的 KL。label-only 消融掉 10.3 到 15.8% 的来由正是只给答案值，教师不知道怎么走到这个答案。" },
      { h: "卡壳 · 共识当上下文 vs TTRL 标量奖励", a: "papers/2026-u-opsd.html#qa-ttrl", t: "TTRL/RENT/Intuitor 把多数投票当标量奖励（整条 rollout 一个数，稀疏）；U-OPSD 把共识当教师的特权上下文（y+ 拼进教师输入，每个 token 都有完整下一 token 分布，稠密）。同样 rollout 预算领先 7 到 11 个点的本质原因。" },
      { h: "数字与代价", a: "papers/2026-u-opsd.html#evidence", t: "Non-thinking +8.5/+10.7（4B/8B），超有 GT 的 OPSD +3.2/+2.3；对比无标签 RL（TTRL/RENT/Intuitor）领先 7.0 到 11.3；thinking +2.2/+1.9 与 OPSD 打平（基座已强 headroom 小加长 rollout 完成投票少）；MoE 迁移 75.77 升到 77.46；τ=0.3 优于默认 0.5。局限：伪标签 13.3% 错误率是硬上界；只在竞赛数学验证，开放式生成需换软共识；增益依赖基座中等偏强；缺 seed 误差棒。" },
      { h: "关联", a: "papers/2026-u-opsd.html#relations", t: "Open-MOPD：正交切片，本文管单教师信号从哪来，它管多教师怎么分账，组合方案成立（多个自蒸馏伪教师加三机制）。S²VOPD：视觉域对应，两篇散度排序完全颠倒。未来钩子：on-policy distillation（DistiLLM 系列）、self-consistency（Wang et al. 2023）、推理预算控制（Thinkless、BudgetThinker）入库时回链本页。" },
      { h: "完整笔记 · 后训练谱系", a: "notes/papers/2026-u-opsd.html#problem", t: "SFT：要标好的答案，teacher-forcing 导致训练推理失配加灾难性遗忘。GRPO：要 GT 答案做可验证奖励，奖励稀疏（一整条 rollout 一个 0/1 序列级 advantage）。OPD：要外部更强教师的逐 token 分布。OPSD：参数自共享但教师比学生多看 GT 解 y*，让教师更强的信息仍来自模型之外。U-OPSD 把最后这层 GT 解也去掉，痛点是 GT 标注的成本与稀缺。" },
      { h: "完整笔记 · 我的复述", a: "notes/papers/2026-u-opsd.html#restatement", t: "用户原话：学生模型 rollout G 条轨迹；统计共识最大的那条占总轨迹数比例是否大于 τ，小于则扔掉，全对全错则这条样本直接丢掉；然后取共识轨迹作为 y+，与共识轨迹相反结论的一条轨迹为 y⁻，给教师 x y+ y⁻<t，给学生 x y⁻<t，逐 token 算前向 KL，教师多看了共识轨迹 y+。" },
      { h: "完整笔记 · 符号对齐表", a: "notes/papers/2026-u-opsd.html#pitfalls", t: "y+：一条完整的同意 rollout（结尾 boxed 共识答案），多个 token，无 <t，整条喂教师不截断。y⁻：一条完整的反对 rollout。y⁻<t：y⁻ 的前 t 个 token，随 t 推进变长。教师输入 = 题目 + 完整参考解 y+ + y⁻ 的前 t 个 token；学生输入 = 题目 + y⁻ 的前 t 个 token；教师多看这一整条，两者共享随 t 一格格变长的前缀。" }
    ]
  },
  {
    id: "2026-open-mopd",
    title: "Open-MOPD",
    href: "papers/2026-open-mopd.html",
    noteHref: "notes/papers/2026-open-mopd.html",
    date: "2026-08-27",
    topic: "distillation",
    aliases: ["Open-MOPD", "Multi-Teacher On-Policy Distillation", "M-OPD"],
    tags: ["on-policy-distillation", "multi-teacher", "budget-allocation", "improve-training-efficiency"],
    essence: "多专家蒸不进一个学生的病根不是教师打架，而是 token 级优化预算在长度、收敛速度和 reward 新鲜度上错配。",
    review: { next: "2026-09-14", last: "2026-09-07", count: 1, result: "pass" },
    relations: [
      { type: "complement", to: "2026-u-opsd", reason: "正交切片：单教师信号从哪来 vs 多教师怎么分账；多个自蒸馏伪教师 + 本文三机制可组合", status: "synthesis" },
      { type: "compare", to: "2026-s2vopd", reason: "OPD 家族第三页：多教师预算分账 vs 单教师视觉不对称，散度注记第三数据点", status: "synthesis" }
    ],
    entries: [
      { h: "核心直觉", a: "papers/2026-open-mopd.html#essence", t: "多个领域专家蒸馏进一个学生模型时，掉分的主因不是教师们意见打架，而是训练预算被系统性分错：每个域实际拿到的优化量 = token 数量 × reward 幅度 × reward 新鲜度，三样在三个时间尺度上全部失衡。三个机制逐一修复，提升回收率从 35.6% 修到 83.4%。" },
      { h: "一页看懂", a: "papers/2026-open-mopd.html#overview", t: "工业界大规模用 multi-teacher OPD（DeepSeek-V4 蒸 10+ 教师、Kimi K3 用 9 个），但没人回答过 naive 合并为什么掉分。oracle routing 受控实验：integration gap 3.50 分，naive 只拿回 35.6%，IF 域掉分是 math 的 3.3 倍。方法：先枪毙流行嫌疑人 teacher conflict（三重证伪），锁定三层预算错配（名额、汇率、财报时效），三个正交修复机制可独立验证可叠加。回收率修到 83.4%。代价：仅 3B、三域、oracle 路由验证。" },
      { h: "机制 · 证伪 teacher conflict 与三层失衡", a: "papers/2026-open-mopd.html#mechanism", t: "token 级教师分歧 c_t 全程均值仅 0.126 nat（冲突判据是 1 nat，概率比 e 约 2.7），高冲突 token 全程只占 0.62%；决定性反事实：把 top 1% 到 20% 高冲突 token mask 掉或换 consensus target，结果全部降分（负 0.52 到 0.83）。真凶预算错配三层：长度差 25 倍（math 约 10500 token，IF 约 409；IF 占 20.3% 名额只分到 0.99% 预算）；汇率漂移（各域收敛速度不同，25 步内 IF 实际份额从 48.7% 滑到 9%）；rollout batch 复用 K=4 次，K=4 时 75.8% 的 token 已被 PPO clip。" },
      { h: "机制 · 三个失衡对应三个正交修复", a: "papers/2026-open-mopd.html#mechanism-2", t: "token-share balancing（batch 内修名额）：loss 按域加权，IF 每 token 放大约 48 倍精确补偿 25 倍长度劣势。gap-following allocation（训练全程修汇率）：权重乘 (m_d/m_ref)^α 再 clamp 到 [0.05, 20]；m_d = E|log π_ϕ − log π_θ| 是师生差距的直接读数不是间接代理；方向反了会爆炸：反向归一化成正反馈环，step 74 训练崩溃。reward refresh（rollout 周期内修时效）：教师项可缓存（教师冻结，log π_ϕ 永不变，rollout 时一次 prefill 算好）；学生项重算恰好免费（PPO 每次内更新本来就要对 minibatch 做 forward 算当前学生 logprob 做 importance ratio，刷新只是把这本就算出的数顺手用来重建 reward）；轨迹本身的陈旧只有重新 rollout 才能换，refresh 不碰，交给 PPO 的 ratio 加 clip 兜底。零开销实证：dense reward 计算只占一步 2.2%，刷新前 27.8s 刷新后 27.3s。" },
      { h: "卡壳 · 反向归一化的正反馈环怎么崩", a: "papers/2026-open-mopd.html#qa-feedback-loop", t: "崩的是预算分配本身发散：IF 最先接近 teacher，m̄ 缩小；反向规则把 gap 已经小误读成需要更多帮助，权重从 24.4 涨到 80.9；更多预算收敛更快，m̄ 更小；每圈更极端无刹车，step 74 整体崩溃。gap-following 的正方向自带两层刹车：语义级（收敛域权重自动回落让出预算）加兜底级（clamp [0.05, 20] 防单域突变）。" },
      { h: "卡壳 · reward refresh 为什么救命、为什么零开销", a: "papers/2026-open-mopd.html#qa-reward-refresh", t: "病根：学生写完草稿后复用 4 轮内更新（K=4），第 1 轮学完后学生水平已涨，若不刷新，第 2 轮仍用写草稿时发霉的旧差距继续抽打，新旧概率比剧烈过冲，触发 PPO 紧急刹车：75.8% 的 token 被 clip 冻结，算力浪费且方向带偏。零开销：教师是冻结的，分数一开始就算好存着；学生当前的分，PPO 在算 ratio 时本来就必须 forward 算出来，这个数字已经在显存里，顺手填进奖励减法公式，零额外计算、零重新生成。" },
      { h: "卡壳 · 为什么不过采样、不抹幅度", a: "papers/2026-open-mopd.html#qa-oversample", t: "过采样：要拿 1/3 token 预算 IF 得放大 33.6 倍，math/code 长链 prompt 被挤到 0.7 倍，长链推理的监督密度没法维持；加权法保住 prompt 多样性（各域长度本就接近时过采样与加权等价，退化无害）。不抹幅度：m̄ 不是噪声，它是还差多少没学的仪表盘，抹掉等于自毁 gap-following 的信号源。" },
      { h: "数字与代价", a: "papers/2026-open-mopd.html#evidence", t: "消融阶梯：Naive M-OPD 28.05，+ token-share balancing 29.22（几乎全来自 IF：43.64 升到 47.53），+ gap-following 29.94，K=4 + reward refresh 31.24。总回收率 35.6% 到 83.4%。baseline：RFT 12.6%、单模型混合域 RL 49.3%、ParamMerge-TA 71.7%。局限：仅 3B、三域、oracle 标签路由，路由有误场景未验证；全流程单节点 8 张 A100 可复现。" },
      { h: "关联", a: "papers/2026-open-mopd.html#relations", t: "U-OPSD：正交切片，组合成立（多个自蒸馏伪教师 + 本文三机制，只要 K 大于 1，refresh 白送 +0.81）。S²VOPD：家族谱系第三页，散度注记第三数据点。未来钩子：AsyncOPD（refresh 灵感来源）、DistiLLM 系列、GKD（dense reward 进 PPO 槽位先例）入库时回链。" },
      { h: "完整笔记 · oracle routing 设计", a: "notes/papers/2026-open-mopd.html#problem", t: "实验设计第一步：oracle routing，训练和评测都用 ground-truth 域标签硬路由（math 题只找 math teacher），把整合难度和路由误差两个混淆变量切开。受控设定下量化 integration gap：RouteOPD 三学生 31.55 vs naive M-OPD 28.05，差 3.50 分；掉分极不均匀，IF 域掉 6.16 分是 math 1.89 的 3.3 倍，训练中期 IF 分数还倒降 11%。" },
      { h: "完整笔记 · 三部门培训预算类比", a: "notes/papers/2026-open-mopd.html#intuition", t: "三个部门共用一笔培训预算的三件糟心事：名额分配 bug（预算按发言时长折算，math 一开口 3 小时长篇，IF 五分钟完事，IF 占 20.3% 名额只分 0.99% 预算）；汇率偷偷变（每块钱购买力不同，各域收敛速度 IF 2.4 倍、math 2.1 倍、code 1.9 倍）；用昨天的财报做今天的决策（rollout batch 复用 K 次，第一次更新后学生变了，reward 里依赖学生的部分还用旧概率）。" },
      { h: "完整笔记 · 我的复述", a: "notes/papers/2026-open-mopd.html#restatement", t: "用户原话：IF 收敛最快，m_d 下降最快，反向规则对小幅度加更大权重，IF 得到更高预算，收敛更快 m_d 更小，循环直到崩掉；m_d 小表示任务收敛差不多了，gap-following 给预算跟着 gap 走并裁剪到 [0.05, 20] 防爆炸。refresh 的存在条件：轨迹本身是旧学生采样的，如果有无限算力每步重新 rollout（等效 K=1），没有存在价值。" }
    ]
  },
  {
    id: "2026-s2vopd",
    title: "S²VOPD",
    href: "papers/2026-s2vopd.html",
    noteHref: "notes/papers/2026-s2vopd.html",
    date: "2026-09-02",
    topic: "distillation",
    aliases: ["S²VOPD", "Self-Supervised Visual On-Policy Distillation"],
    tags: ["on-policy-distillation", "self-distillation", "data-augmentation", "reduce-supervision", "improve-perception"],
    essence: "把学生输入图故意降采样加噪弄坏，EMA 教师看原图，学生向看得清的自己对齐；不对称可以从学生减信息。",
    review: { next: "2026-09-14", last: "2026-09-07", count: 1, result: "pass" },
    relations: [
      { type: "compare", to: "2026-u-opsd", reason: "同作者线域互补：教师多看伪解 y+（文本上下文）vs 教师多看清晰像素（输入模态）；散度排序完全颠倒，可恢复性统一解释是库内假说", status: "hypothesis" },
      { type: "complement", to: "2026-open-mopd", reason: "OPD 家族谱系：单教师视觉不对称 vs 多教师预算分账；多教师框架里每个教师都可自构造不对称", status: "synthesis" }
    ],
    entries: [
      { h: "核心直觉", a: "papers/2026-s2vopd.html#essence", t: "不给老师任何特权，而是把学生的输入图故意弄糊弄小：同一个模型里看得清的自己（EMA teacher 看原图）在学生每一步回答上教看不清的自己（student 看增强退化图），全部学习信号免费来自这张被弄坏的图。" },
      { h: "一页看懂", a: "papers/2026-s2vopd.html#overview", t: "OPD 要求教师比学生多知道点什么：更强模型（贵）、GT 答案、GT 区域（要标注），特权方法还偏科。本文把方向倒过来：不给教师加信息，从学生减信息。学生的输入图降采样到 0.3 到 0.6 倍再叠噪声，EMA 教师看原图，学生在坏图上自己 rollout，逐步向看得清的自己的分布对齐。4B 从 70.68 涨到 77.44：超 235B 开源模型与 GPT-5.4。代价：增益依赖增强调参，OCR 类任务预期失效（本人推演）。" },
      { h: "机制 · 非对称视图蒸馏", a: "papers/2026-s2vopd.html#mechanism", t: "同一模型两个身份：student θ 和 EMA teacher φ（φ ← 0.95·φ + 0.05·θ，教师是学生的慢半拍影子）。每步五件事：弄坏图（降采样 0.3 到 0.6 倍，不 resize 回去，visual token 直接变少；以 ρ=0.5 概率叠 DDPM t=200 高斯噪声）；学生在坏图上 rollout 8 条；教师在同一前缀加原图上逐 token 打分；top-k 截断重归一化；逐 token 广义 JSD（α=0.5）。师生共享问题和轨迹前缀，教师多出来的只有那张清晰的图（对照 U-OPSD：教师多出来的是伪解 y+，不对称载体从上下文换成输入模态）。w/o EMA 只掉 0.40：教师的强完全来自那张图，不来自自我改进。" },
      { h: "机制 · 增强设计三律", a: "papers/2026-s2vopd.html#mechanism-2", t: "首个针对 OPD 的系统化增强空间受控搜索（信息减少、光度、几何、遮挡四族）。三律：不对称才有信号（四族单用全涨 75.65/74.40/74.30/72.44，基座 70.58；对称自蒸馏反而掉到 65.21）；强度要中等（各族倒 U 型，师生 JSD gap 约 0.014 处到顶）；gap 必须任务一致（crop 单调下跌 71.53 到 68.76 到 67.44，最强 crop 造最大 gap 却最差：crop 选择性删证据题变不可答，降采样均匀降密度题可答）。大 gap 不等于好 gap：决定好坏的是 gap 的语义内容。" },
      { h: "卡壳 · 训练看糊图考试看好图为什么变强", a: "papers/2026-s2vopd.html#qa-blur-strong", t: "难度论被消融证伪：若难度是关键，更强的 crop 应涨更多，实际单调下跌；w/o EMA（教师冻结在基座）仍拿 93% 增益，教师一点不比学生聪明。真机制：学生的每一步被拉向信息完整版的自己在同样位置的判断，学的是从退化证据恢复完整判断，这是蒸馏目标不是探索训练。" },
      { h: "卡壳 · 散度结论为什么和 U-OPSD 完全反过来", a: "papers/2026-s2vopd.html#qa-divergence", t: "实验事实：U-OPSD 必须 forward KL（reverse 复读崩溃、JSD 掉 13.8）；S²VOPD 是 JSD 76.05 最好，reverse KL 75.49 居中，forward KL 74.74 最差，排序完全颠倒。解释（库内综合假说，待验证）：教师多出来的信息学生能不能恢复。U-OPSD 教师多的是解题思路，学生原则上能自己推出来（可恢复），全面模仿方向正确；S²VOPD 教师多的是清晰像素，丢掉的细节永远拿不回来（不可恢复），逼学生模仿不可及的细节有害。量级佐证：U-OPSD 选错是灾难（13+ 点），S²VOPD 选错只是小亏（1.3 点）。" },
      { h: "卡壳 · y+ 为什么口误成伪标签", a: "papers/2026-s2vopd.html#qa-y-plus", t: "y+ 不是标签，是拼进 U-OPSD 教师输入的完整解题轨迹（上下文）；共识答案 ã(x) 只用来投票和分组。消融 label-only（只给 boxed 答案值）掉 10.3 到 15.8：光知道答案没法引导中间步骤。历史状态：09-02 首验两连犯；2026-09-07 复测已收敛，首答即明确 y+ 是完整轨迹先验上下文。" },
      { h: "数字与代价", a: "papers/2026-s2vopd.html#evidence", t: "主表 4B 70.68 升到 77.44，超 Qwen3-VL-Instruct-235B（75.75）与 GPT-5.4（72.77），追平 397B；同数据对比 75.33 全场第一（9B 76.35 只比拿 GT 区域的 Vision-OPD 低 0.21）。摘要声称恢复特权方法 96% 增益，正文无推导，自行补算 9B 感知 3.57/3.70 约 96.5%。散度消融 JSD 76.05 > rKL 75.49 > fKL 74.74。局限：增强需调参；OCR/文字密集图未测（噪声毁文字证据，本人推演失效）；纯文本任务无可退化模态；无 seed 误差棒；top-k 值未给。" },
      { h: "关联", a: "papers/2026-s2vopd.html#relations", t: "U-OPSD：同作者线域互补，两页散度冲突是全库最值钱交叉点。Open-MOPD：家族三页谱系（单教师信号从哪来文本/视觉，多教师怎么分账）。未来钩子：NoisyRollout/VPPO/PRPO（增强调 RL 先例）、BYOL/DINO/FixMatch（弱视图教强视图源头）、DistiLLM 系列（散度统一沉淀）入库时回链。" },
      { h: "完整笔记 · 不对称方向之问", a: "notes/papers/2026-s2vopd.html#problem", t: "OPD 家族的命门：教师必须比学生多知道点什么，否则指导没有信息量。三种传统来源全要外部资源（更大的模型、GT 答案、GT 感兴趣区域）。本文釜底抽薪：不对称性在乎自己是教师多看还是学生少看实现的吗？不在乎，只要存在教师知道、学生不知道的差，蒸馏信号就成立，于是把方向倒过来：从学生身上减信息。" },
      { h: "完整笔记 · 糊卷类比与 mismatch 之问", a: "notes/papers/2026-s2vopd.html#intuition", t: "想象刷一套没有标准答案的卷子：把试卷复印得又小又糊，自己看着糊版作答；拿到清晰原版的你盯着清晰卷，在你写下的每一步旁边标注看清的我这里会怎么写。最容易卡住：训练看糊图、考试看好图，这不是 train-inference mismatch 吗？学生学的不是在糊图上答题这个行为，而是每个决策点上信息残缺的我如何逼近信息完整的我的判断。" },
      { h: "完整笔记 · 我的复述", a: "notes/papers/2026-s2vopd.html#restatement", t: "用户原话：强迫学生从模糊图/干扰图中找细节，增强了模型的探索能力（后被 crop 消融证伪修正）。U-OPSD 是多次 rollout 取共识作为 teacher 的额外标签制造不对称，S²VOPD 是给教师清晰图学生干扰图带来不对称（伪标签为口误，y+ 是完整轨迹上下文）。最强 crop 可能把关键证据区域切没了，这套方法在 OCR 等需要细粒度感知的任务上会失效。" },
      { h: "完整笔记 · 待验证假说声明", a: "notes/papers/2026-s2vopd.html#open", t: "信息可恢复性决定散度选择：是本人综合 U-OPSD 与 S²VOPD 两篇论文的假说，非任一原文结论，待 DistiLLM 系列入库时验证（已挂 U-OPSD 页钩子）。注意方向未推翻 U-OPSD 的结论，是同一原理在不同信息类型下的两个投影。" }
    ]
  },
  {
    id: "2026-locateanything",
    title: "LocateAnything",
    href: "papers/2026-locateanything.html",
    noteHref: "notes/papers/2026-locateanything.html",
    date: "2026-09-04",
    topic: "structured-output",
    aliases: ["LocateAnything", "Parallel Box Decoding", "PBD"],
    tags: ["parallel-decoding", "grounding", "improve-grounding", "improve-efficiency"],
    essence: "不再把框拆成坐标 token 逐个蹦：把整个框当固定长块并行解码，再用块内联合监督约束坐标。",
    review: { next: "2026-09-14", last: "2026-09-07", count: 1, result: "pass" },
    relations: [
      { type: "complement", to: "2026-vst", reason: "同一敌人（延迟）的两种解法：VST 把推理藏进播放空档，本文把解码步数本身减掉，可组合", status: "synthesis" },
      { type: "complement", to: "2026-video-o3", reason: "本文是感知侧（GUI/指代定位给得又快又准），Video-o3/VST 是拿到框之后的推理与行动侧", status: "synthesis" }
    ],
    entries: [
      { h: "核心直觉", a: "papers/2026-locateanything.html#essence", t: "VLM 做视觉定位时，输出的原子单元不该是 token 而该是整个框：把 2D 框当一个固定长块，训练用接龙卷加填空卷双格式，推理时一次 forward 并行填出整框（框与框仍逐个来），又快又准，尤其贴边的高 IoU 精度。" },
      { h: "一页看懂", a: "papers/2026-locateanything.html#overview", t: "VLM 检测把框序列化成 token 流，一个词一个词蹦：一个框 6+ 步，N 个框线性放大（H100 上 Qwen3-VL 仅约 1.1 框/秒）；坐标是几何整体却被迫独立串行猜，误差滚雪球。通用 MTP 随便切块并行，又会学跨框跨类的假关联。方法：解码粒度从 token 提升到整个框，推理默认走填空一个框一步 forward，可疑就用接龙逐词重写这一块。Hybrid 12.7 框/秒（Qwen3-VL 的 10 倍以上），贴边精度 LVIS F1@0.95 31.1 vs 别家约 20。" },
      { h: "机制 · 框等于一块填空", a: "papers/2026-locateanything.html#mechanism", t: "词表里坐标是 [0,1000] 各一个词，一个检测输出就是一句话：ref 热狗 /ref，box 342 567 890 345 /box。旧法把它当接龙，一次 forward 只能蹦一个词（Transformer 只取最后一个位置的预测）。PBD 把未来 5 个槽位摆成 MASK 一次把整框填出来，一个框从 6 步变 1 步。训练双格式 L = L_ntp + L_blk：接龙卷喂完整序列练逐词；填空卷每块只留首 token 练整块。四种块：语义块、框块、负样本块（防幻觉）、结束块；框顺序用 X-Y Corner 排序。混合注意力掩码：NTP 流严格因果，块间因果（学框间依赖防重复漏框），块内双向（几何耦合在此生效）。" },
      { h: "机制 · Hybrid 回退与歧义触发器", a: "papers/2026-locateanything.html#mechanism-2", t: "并行偶尔整块填歪：类别边界犹豫时块内混进结构 token 和坐标 token（Format Irregularity）；密集网格里坐标滑进两物体中间（Spatial Ambiguity）。Hybrid 每块填完就验置信，可疑就作废这块、退回上一块定稿处、改用接龙逐词重写这一块，写完再切回填空。触发器双条件：top-1 坐标概率小于 0.7 且 top-5 候选极差大于 80，同时满足才回退。极差量的是 5 个候选坐标在 [0,1000] 轴上互相差多远，是模型内心动摇的范围，不是框尺寸。" },
      { h: "卡壳 · 机制必须落到 token 级", a: "papers/2026-locateanything.html#qa-token-walkthrough", t: "第一版讲解看完还是没看懂具体怎么做的，卡在机制没落到 token 级操作。教训：这篇的机制必须讲到 token 级演算才能建立直觉，纯架构图讲不通。三步走通：原材料（框是一串词）；Transformer 天生每个位置都预测下一词，只是自回归只取最后一个；推理等于只做填空，一段段填。" },
      { h: "卡壳 · 坐标并行凭什么互相约束", a: "papers/2026-locateanything.html#qa-constraint", t: "不是先填 x1 再把 x1 传给 x2（并行无回头路），是两条：训练时 4 坐标一起挨罚（同块 mask 的 loss 同时算），模型想拿满分必须让四数构成合法框，约束焊进权重；块内双向注意力让这些位置在 Transformer 内部互见。类比：舞步动作四肢同时摆好，配合靠肌肉记忆一次成型。" },
      { h: "卡壳 · 触发器双条件为什么同时满足", a: "papers/2026-locateanything.html#qa-trigger", t: "先澄清：top-5 极差大于 80 指 5 个候选坐标词在 [0,1000] 坐标轴上互相差多远，是模型内心动摇的范围，不是框尺寸。双条件合成一种检测：候选分布是否撕裂。单边都是正常尾巴：低概率但候选挤一团是像素级犹豫（落同一物体内）；高概率但尾巴长是有明确首选。只有不自信加候选几何上严重分裂才说明真不知道框边贴哪，NTP 慢工才有救。" },
      { h: "卡壳 · PBD-Slow 凭什么比旧 NTP 高 2 分", a: "papers/2026-locateanything.html#qa-slow-plus2", t: "决定性对照在损失消融第一行：只训 L_ntp（表征已块对齐）得到 50.1，跟旧 Quantized-NTP 分毫不差，说明块本身零增益。全部增益来自 L_blk：它用一次猜对整块才得分把几何联合约束压进共享权重，x1 的分布不再孤立被评、和 y1/x2/y2 绑一起评；沉淀后换回 NTP 推理仍生效。精度收益从必须靠并行里解放。" },
      { h: "卡壳 · 通用 MTP 为什么又慢又差", a: "papers/2026-locateanything.html#qa-generic-mtp", t: "结构无关切块让块边界大概率落在无意义处，一个块同时装上一框尾巴坐标加下一类别的开头词，模型被迫拟合横跨框边界、横跨类别的虚假相关（共现统计非真实规律），纯消耗容量还错误传播。加速弱是因为块内容不连贯（SDLM 只到约 5.5 BPS）。PBD 用块等于框把这个伪模式源头拆掉。" },
      { h: "数字与代价", a: "papers/2026-locateanything.html#evidence", t: "Hybrid 12.7 BPS（Rex-Omni-3B 5.0 的 2.5 倍、Qwen3-VL-4B 1.1 的 10 倍以上）；LVIS F1@0.95 31.1 vs Rex-Omni 20.7；ScreenSpot-Pro 60.3 SOTA（超 32B 的 GUI-Owl 58.0）；数据引擎 12M 图/138M 查询/785M 框。COCO-only 消融：Textual-NTP 49.1、Quantized-NTP 50.1、PBD-Slow 52.1、PBD-Fast 49.6、PBD-Hybrid 51.6；结构无关 MTP（SDLM-B6）46.1。两腿走路：方法本体无大数据只加 1.5 到 2.0，加 138M 数据后 COCO 54.7；纯 Fast 复杂场景掉精度，最高精度场景用 Slow。" },
      { h: "关联", a: "papers/2026-locateanything.html#relations", t: "VST：同一敌人延迟的两种解法，可组合。Video-o3/VST：本文是感知侧底座，它们是推理与行动侧。未来钩子：结构无关 MTP 与扩散语言模型家族（SDLM、Block Diffusion、LLaDA、Dream、DiffusionVL）、grounding 后训练 RL（Vision-R1/UniVG-R1/GW-VLM）入库时回链对照。" },
      { h: "完整笔记 · 两类旧表示的痛", a: "notes/papers/2026-locateanything.html#problem", t: "两类旧表示：文本数字（1024 拆成 1,0,2,4）和量化坐标 token（每个坐标一个词按 x1 y1 x2 y2 顺序出）。痛处一：推理瓶颈，一个框 6+ 个 token 串行蹦，N 个框线性放大。痛处二：结构浪费加错误累积，x1 y1 x2 y2 是几何整体（x2 大于 x1、四数构成合法矩形、天然互相验证），逐 token 独立解码让后一个坐标在前一个已写错的基础上孤独地猜，误差滚雪球。" },
      { h: "完整笔记 · 接龙卷与填空卷", a: "notes/papers/2026-locateanything.html#intuition", t: "类比：同一道题出两张卷子。接龙卷（NTP）：整串词当已写内容，练看到前缀预测下一个字，保底自回归能力。填空卷（MTP）：按块切开（一个框一块），每块只留第 1 格，后 5 格涂黑成 MASK，练只看每块第一格把空格一次全填对。为什么要留着接龙技能：填空有时整块填歪，Hybrid 每块填完验两道（格式合法、空间置信），可疑就退回上一块定稿处用接龙逐词重写这一块。" },
      { h: "完整笔记 · 我的复述", a: "notes/papers/2026-locateanything.html#restatement", t: "用户原话：填空模式下一次 forward 出来，loss 是一块算的，输出的四个值必须构成合法框才能拿分。不留接龙技能不行：Slow 模式就是回退到 NTP 预测；Hybrid 是填空置信度低则扔掉、退回到框开始前的位置用接龙重新回答。旧方法 x1 y1 已经错了，x2 y2 得在这个偏差的先验基础上预测带来更大偏差；PBD 同时输出四个坐标，数值相互独立不会干扰。" },
      { h: "完整笔记 · 存疑问题", a: "notes/papers/2026-locateanything.html#open", t: "块内双向注意力在单步并行预测中的确切信息论作用存疑（mask 占位在一步预测中互见的信息量有限，论文与通用 MTP 文献均未展开），留待 DiffusionVL/Block Diffusion 入库时对照，暂不立为问题。" }
    ]
  }
];
