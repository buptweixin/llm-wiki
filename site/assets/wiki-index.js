/* 静态搜索索引。内容来自 wiki/papers/*.md 的已入库文本，供 file:// 离线打开。 */
window.WIKI_INDEX = [
  {
    id: "2026-videochat3",
    title: "VideoChat3",
    href: "papers/2026-videochat3.html",
    date: "2026-07-27",
    topic: "video-understanding",
    topicLabel: "视频理解与响应",
    aliases: ["VideoChat-Flash", "I3D-ViT", "Video MLLM"],
    tags: ["视频 MLLM", "token 压缩", "流式视频", "状态机", "全开源"],
    essence: "4B 全开源 Video MLLM：在视觉编码器里把视频 token 压掉 16 倍，再用状态机自适应分辨率处理流式视频。",
    searchable: "视觉编码器 I3D-ViT 时间维压缩 token 压缩 16x 流式视频 Adaptive Frame Resolution 状态机 inflate 二次方 attention 全开源 4B 视觉编码器里压缩 LLM 长上下文 零冗余 池化 pixel shuffle 小尺度证据",
    snippets: [
      ["核心机制", "I3D-ViT 先用时空 attention 交换信息，再做时间池化与 pixel shuffle；压缩发生在视觉编码器，避免把长视频 token 推给 LLM。", "mechanism"],
      ["曾经卡壳", "相邻帧零冗余时，算力上的 16 倍压缩仍成立，但池化无法凭空恢复丢失的信息，速度保住而精度会塌。", "pitfalls"]
    ],
    review: "下次复测 2026-09-24"
  },
  {
    id: "2026-vst",
    title: "VST",
    href: "papers/2026-vst.html",
    date: "2026-08-17",
    topic: "video-understanding",
    topicLabel: "视频理解与响应",
    aliases: ["Video Streaming Thinking", "VideoLLM"],
    tags: ["流式视频", "CoT 推理", "双记忆系统", "GRPO", "低延迟"],
    essence: "让 VideoLLM 边看边想：把 CoT 推理塞进视频流片段之间的等待空档，写进 FIFO 文本记忆，查询时直接读笔记。",
    searchable: "流式视频 StreamingBench Video Streaming Thinking CoT 推理 双记忆系统 文本记忆 FIFO 长期记忆 低延迟 查询前 推理时机 流式注意力掩码 信息泄露 训练 推理 架构一致性 分布漂移 历史文本 最近 L 视觉 token 离线 CoT 未来信息",
    snippets: [
      ["核心机制", "推理时机从查询后挪到查询前：模型趁片段传输的空档写 thought，用户提问时直接读取最近的文本记忆。", "mechanism"],
      ["曾经卡壳", "流式注意力掩码不仅防信息泄露，也让训练时的可见性和彩排规则与推理保持一致，避免分布漂移。", "pitfalls"]
    ],
    review: "下次复测 2026-09-28"
  },
  {
    id: "2026-genlip",
    title: "GenLIP",
    href: "papers/2026-genlip.html",
    date: "2026-08-17",
    topic: "visual-encoders",
    topicLabel: "视觉编码器",
    aliases: ["Generative Language-Image Pretraining", "Prefix-LM"],
    tags: ["视觉编码器预训练", "生成式预训练", "Prefix-LM", "attention sink", "数据效率"],
    essence: "让 ViT 直接说话：用单个 Transformer 的自回归语言建模训视觉编码器预测文本 token，Gated Attention 防 attention sink。",
    searchable: "视觉编码器预训练 生成式预训练 Prefix-LM Attention attention sink Gated Attention 对比学习 独立文本解码器 图像 token 文本 token 数据效率 SigLIP2",
    snippets: [
      ["核心机制", "图像 token 作为前缀，文本 token 用因果注意力自回归预测；同一个 Transformer 同时承担视觉编码和语言建模。", "mechanism"],
      ["曾经卡壳", "生成式预训练更容易触发 attention sink，因为自回归预测会寻找稳定的全局信息汇聚位置。", "pitfalls"]
    ],
    review: "下次复测 2026-10-07"
  },
  {
    id: "2026-last-vit",
    title: "LaSt-ViT",
    href: "papers/2026-last-vit.html",
    date: "2026-08-17",
    topic: "visual-encoders",
    topicLabel: "视觉编码器",
    aliases: ["Lazy Stable ViT", "CLS token"],
    tags: ["ViT", "lazy aggregation", "密集预测", "频域分析", "CLS token"],
    essence: "揭示 ViT 的懒惰聚合根因：全局注意力和粗粒度监督让背景 patch 代替前景成为 CLS 载体，再用频域稳定性逼它回到前景。",
    searchable: "ViT lazy aggregation 懒惰聚合 密集预测 频域分析 频域稳定性 CLS token Register tokens 前景 背景 全局注意力 语义扩散 CNN",
    snippets: [
      ["核心机制", "模型会把背景 patch 当成稳定的 CLS 载体；频域稳定性评分筛出前景，再用 Top-K 聚合限制 CLS 的信息来源。", "mechanism"],
      ["曾经卡壳", "Register tokens 只缓解高范数症状，不能消除背景动机与全局注意力共同造成的懒惰聚合。", "pitfalls"]
    ],
    review: "下次复测 2026-10-07"
  },
  {
    id: "2026-video-o3",
    title: "Video-o3",
    href: "papers/2026-video-o3.html",
    date: "2026-08-17",
    topic: "video-understanding",
    topicLabel: "视频理解与响应",
    aliases: ["Video o3", "Video-Holmes"],
    tags: ["长视频推理", "多跳推理", "工具调用", "原生交错", "GRPO"],
    essence: "像侦探破案一样看视频：模型在共享上下文里循环找线索、裁剪放大、连逻辑并回答，工具调用由模型自己生成。",
    searchable: "长视频推理 多跳推理 工具调用 原生交错 GRPO 共享上下文 TDAM Fake Thinking VTGR 线索裁剪 放大 查询后 查询前 VST 证据冲突",
    snippets: [
      ["核心机制", "模型把视觉工具调用和回答放进同一个交错上下文，先主动定位证据，再基于证据继续推理。", "mechanism"],
      ["曾经卡壳", "TDAM 在调用工具时禁止局部视觉干扰，准备下结论时锁住全局上下文，两个阶段解决两个问题。", "pitfalls"]
    ],
    review: "下次复测 2026-10-07"
  },
  {
    id: "2026-u-opsd",
    title: "U-OPSD",
    href: "papers/2026-u-opsd.html",
    date: "2026-08-19",
    topic: "distillation",
    topicLabel: "蒸馏与训练预算",
    aliases: ["Unsupervised On-Policy Self-Distillation", "OPD", "on-policy distillation"],
    tags: ["后训练", "自蒸馏", "无监督", "多数投票", "on-policy"],
    essence: "模型自己做 8 遍题，多数投票伪解作为教师特权上下文，只在答错轨迹上逐 token 前向 KL 蒸馏，去掉 GT 依赖。",
    searchable: "U-OPSD OPD on-policy distillation 后训练 自蒸馏 无监督 多数投票 伪解 y+ 完整解题轨迹 label-only 前向 KL reverse KL 反向 KL mode collapse 复读机 共识答案 伪标签 token 错误 rollout TTRL 外部监督",
    snippets: [
      ["核心机制", "y+ 不是单个标签，而是看过共识答案的完整解题轨迹；学生只在答错 rollout 上逐 token 向这个教师上下文学习。", "mechanism"],
      ["曾经卡壳", "前向 KL 与视觉蒸馏的选择可能相反：文本推理中的教师额外信息原则上可恢复，适合覆盖教师分布。", "pitfalls"]
    ],
    review: "已通过 · 下次复测 2026-10-07"
  },
  {
    id: "2026-open-mopd",
    title: "Open-MOPD",
    href: "papers/2026-open-mopd.html",
    date: "2026-08-27",
    topic: "distillation",
    topicLabel: "蒸馏与训练预算",
    aliases: ["Multi-Objective Policy Distillation", "multi-teacher distillation"],
    tags: ["多教师蒸馏", "预算分配", "诊断实验", "PPO", "可复现"],
    essence: "多专家蒸不进一个学生的病根不是教师打架，而是 token 级优化预算在长度、收敛速度和 reward 新鲜度上错配。",
    searchable: "Open-MOPD 多教师蒸馏 multi-teacher 预算分配 token 长度差 25 倍 训练预算 诊断实验 PPO reward refresh 反向归一化 正反馈 过采样 IF conflict mask reward 陈旧 可复现",
    snippets: [
      ["核心机制", "先用诊断实验证伪 teacher conflict，再分别修复长度失衡、收敛速度差和 K 次内 reward 陈旧。", "mechanism"],
      ["曾经卡壳", "reward refresh 能救命且零开销，因为 PPO 本来就需要重算学生项，更新教师分数只是复用这次计算。", "pitfalls"]
    ],
    review: "已通过 · 下次复测 2026-09-14"
  },
  {
    id: "2026-s2vopd",
    title: "S²VOPD",
    href: "papers/2026-s2vopd.html",
    date: "2026-09-02",
    topic: "distillation",
    topicLabel: "蒸馏与训练预算",
    aliases: ["Self-Supervised Visual On-Policy Distillation", "visual OPD", "OPD"],
    tags: ["on-policy 蒸馏", "自监督", "数据增强", "VLM 细粒度感知"],
    essence: "把学生输入图故意降采样加噪弄坏，EMA 教师看原图，学生向看得清的自己对齐；不对称可以从学生减信息。",
    searchable: "S²VOPD visual OPD on-policy 蒸馏 自监督 数据增强 VLM 细粒度感知 学生 教师 EMA 原图 糊图 清晰图 降采样 噪声 crop JSD reverse KL forward KL 散度 信息可恢复性 待验证 y+ 伪标签",
    snippets: [
      ["核心机制", "学生在退化图上 rollout，EMA 教师在原图上对同一前缀逐 token 打分；差异来自输入模态，不需要外部特权。", "mechanism"],
      ["曾经卡壳", "y+ 不是伪标签，而是 U-OPSD 教师上下文里的完整解题轨迹；信息可恢复性解释散度选择仍是库内综合的待验证假说。", "pitfalls"]
    ],
    review: "已通过 · 下次复测 2026-09-14"
  },
  {
    id: "2026-locateanything",
    title: "LocateAnything",
    href: "papers/2026-locateanything.html",
    date: "2026-09-04",
    topic: "structured-output",
    topicLabel: "结构化输出与定位",
    aliases: ["Locate Anything", "VLM grounding"],
    tags: ["并行框解码", "VLM grounding", "MTP", "GUI 定位"],
    essence: "不再把框拆成坐标 token 逐个蹦：把整个框当固定长块并行解码，再用块内联合监督约束坐标。",
    searchable: "LocateAnything 并行框解码 VLM grounding MTP GUI 定位 坐标 token 框 block decoding Hybrid PBD-Slow Quantized-NTP 填空卷 接龙卷 贴边精度 LVIS F1",
    snippets: [
      ["核心机制", "坐标块内部并行预测，块与块之间仍按序生成；不牺牲框之间的条件依赖，把最慢的坐标链压成一个解码块。", "mechanism"],
      ["曾经卡壳", "坐标并行不等于完全互不约束：块内联合监督与块间自回归仍保留了坐标之间和目标之间的约束。", "pitfalls"]
    ],
    review: "今天复测 · 下次复测 2026-09-07"
  }
];
