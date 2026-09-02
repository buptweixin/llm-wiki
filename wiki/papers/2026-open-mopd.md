# Open-MOPD（全称：Diagnosing and Fixing Capability Imbalance in Multi-Teacher On-Policy Distillation）

> **一句话本质**：多个领域专家蒸馏进一个学生模型时，掉分的主因不是「教师们意见打架」，而是**训练预算被系统性分错**——每个域实际拿到的优化量 = token 数量 × reward 幅度 × reward 新鲜度，这三样在三个时间尺度上全部失衡；论文用三个机制逐一修复，把提升回收率从 35.6% 修到 83.4%。

> 作者/机构：Huan-ang Gao, Haohan Chi（共同一作）, Hao Zhou（通讯）等 ｜ 清华 AIR × ByteDance Seed（SIA-Lab）｜ 年份：2026 ｜ 原文：Zotero 锚点（见下行）或 [arXiv:2608.19098](https://arxiv.org/abs/2608.19098) ｜ [项目页](https://bytedtsinghua-sia.github.io/Open-MOPD/) ｜ 入库：2026-08-27
> Zotero：[Gao2026](zotero://select/items/@Gao2026) `Gao2026` ｜ [S2DP7DZX](zotero://select/items/S2DP7DZX) `S2DP7DZX` ｜ [DOI](https://doi.org/10.48550/arXiv.2608.19098) `10.48550/arXiv.2608.19098`

## 解决什么问题

工业界已经在大规模使用 multi-teacher on-policy distillation（M-OPD）：DeepSeek-V4 蒸馏 10+ 个 teacher、Kimi K3 用 9 个、Agents-A1 用 6 个——把多个域专家（math/code/IF…）的能力蒸进单个通才学生，部署成本从 N 个模型降回 1 个。但**没人公开回答过：为什么 naive 合并会掉分？掉了的部分去哪了？**

论文的实验设计第一步就很聪明：**oracle routing**——训练和评测都用 ground-truth 域标签硬路由（math 题只找 math teacher），把「整合难度」和「路由误差」两个混淆变量切开，剩下的差距全怪「多个能力写不进同一套参数」本身。

在这个受控设定下量化出 **integration gap**（用 SmolLM3-3B，三阶段 recipe：混合域 SFT → 三个域专家各跑 GRPO → 多教师 OPD）：

- 每域单独蒸馏再组合（RouteOPD，三个学生模型，仅作上界参考）：总分 31.55；
- naive M-OPD 一个学生：28.05，差 3.50 分；
- 用回收率衡量（SFT 25.67 → RouteRL 32.35 为 100% headroom），naive M-OPD 只拿回 **35.6%**；
- 掉分极不均匀：IF 域掉 6.16 分（是 math 1.89 的 3.3 倍），训练中期 IF 分数还倒降 11%、最早停滞。

## 大白话讲解

**先枪毙一个流行嫌疑人：teacher conflict（教师冲突）。** 三个 teacher 同源（都从同一个混合域 SFT checkpoint 分叉），共享格式词、连接词、推理模板——看起来很容易打架。三重检验全部否定：

1. token 级教师分歧 c_t（各教师对该 token logprob 的最大差）全程均值仅 **0.126 nat**，从没超过 0.27 nat——冲突判据是 1 nat（最支持与最反对的教师概率比 e≈2.7），差一个数量级；
2. c_t > 1 nat 的高冲突 token 全程只占 **0.62%**（分歧最大的 IF 域也才 3.9%）；
3. **决定性证伪实验**：把 top 1%/5%/20% 高冲突 token 从 loss 里 mask 掉、或换成三教师平均的 consensus target——结果全部**降分**（−0.52~−0.83）。高分歧 token 不是噪声，反而可能携带领域信息。

**真凶：预算错配，有三层。** 关键认知：OPD 的 loss 按 **token 平均**聚合，所以每个域真正得到的优化量不取决于你喂了多少 prompt，而取决于：

> 域的有效预算 B_d ∝（该域贡献的 token 数）×（平均每 token 的 reward 幅度 m̄_d）×（reward 还新鲜吗）

**类比：三个部门共用一笔培训预算，会发生三件糟心事**：

1. **名额分配 bug（batch 内，结构性）**：预算按「每人发言时长」自动折算。math 部门一开口就是 3 小时长篇推理（响应约 10,500 token），IF 部门说话 5 分钟完事（约 409 token）——长度差 **25 倍**。结果 IF 占 20.3% 的名额（prompt），实际只分到 **0.99%** 的预算（gradient token）。
2. **汇率还在偷偷变（训练全程，动态）**：就算把名额强制锁成各 1/3，每块钱的「购买力」还不同——m̄_d（平均每 token 的 reward 幅度）就是汇率。各域收敛速度不同（IF 缩 2.4×、math 2.1×、code 1.9×），25 步内 IF 的实际预算份额从 48.7% 滑到 9%（终值 11.4%），code 升到 63.8%。
3. **用昨天的财报做今天的决策（rollout 周期内，快动态）**：为省生成开销，一个 rollout batch 被复用 K 次做内更新（K=4）。第一次更新后学生就变了，但 reward 里依赖学生的部分还用 rollout 时刻的旧概率——K=4 时 rollout-to-current KL 已达 0.059、75.8% 的 token 被 PPO clip；K=32 时 0.216 / 86%。

## 关键机制

三个失衡分别在三个时间尺度上，所以三个修复机制正交、可独立验证、可叠加——「正交分解」的设计美感。

**机制一：token-share balancing（修名额，batch 内）。** 不碰采样频率，只在 loss 上按域加权：w_d = 目标份额 g\*（取 1/3 等分，无需调参）÷ 本 batch 实际 token 份额 s_d^tok。效果是 IF 的每个 token 被放大约 48 倍，精确补偿 25 倍的长度劣势，加权后三域恰好各 33.33%。

- 为什么不直接过采样 IF prompt？要拿到 1/3 token 预算，IF 采样得放大 **33.6 倍**，一个 batch 里 math/code 的长链 prompt 被挤到只剩 0.7 倍——长链推理的监督密度没法维持。加权法保住了 math/code 的 prompt 多样性。
- 为什么不顺便把 reward 幅度归一化掉？幅度不是噪声，它携带「还差多少没学」的信息，抹掉等于自毁仪表盘（见机制二）。
- 退化条件：若各域响应长度接近，s_d^tok ≈ prompt share，balancing 退化为无害无益的恒等变换。

**机制二：gap-following allocation（修汇率，训练全程）。** m̄_d = E[|r_t|]，而 reward 核心项就是 |log π_ϕ − log π_θ|——**它不是 gap 的间接代理，它就是师生差距本身的直接读数**（学生越像教师差越小）。让预算跟着 gap 走：在机制一的权重上乘 (m_d/m_ref)^α（m_ref 为当 batch 各域均值，α=1），clamp 到 [0.05, 20] 防单域 reward 突变导致权重爆表，再归一化保持总 loss 不变。哪个域离 teacher 还远，就多给预算；收敛的域自动让出。

- **全文最反直觉的点——方向反了会爆炸**：「reward 小 = 学得慢 = 该多帮」很诱人，但 m̄_d 小的真实含义往往是「已经快学完了」。反向归一化 m^(−α) 形成正反馈环：已收敛 → m̄ 缩小（IF 前 75 步缩 32.5×）→ 权重变大（24.4→80.9）→ 更多预算 → 更快收敛 → m̄ 更小……无刹车直到训练在第 74 步**崩溃**。α 的符号不是超参，是被 gap 的语义钉死的。

**机制三：reward refresh（修财报时效，rollout 周期内）。** dense reward 对每个被采样 token v：r(v) = (log π_ϕ(v) − log π_θ(v)) × π̃_θ(v)，只有两个模型出场。问：K 次内更新中谁的 logprob 会变？

- **教师项可缓存**：教师冻结，log π_ϕ 永不变——rollout 时一次 prefill 算好存起来，K 次直接读缓存；
- **学生项重算恰好免费**：PPO 每次内更新本来就要对 minibatch 做 forward 算**当前**学生 logprob（importance ratio 必需），refresh 只是把这本就算出的数顺手用来重建 reward——不加教师 forward、不加学生 forward、不重新生成任何东西；
- **修不掉的陈旧**：轨迹（y 和前缀）仍是旧学生采样的——「学生在哪些状态下学习」这个分布要重新 rollout 才能换（生成占一步 46.5%，最贵），refresh 不碰，剩下的交给 PPO 的 ratio + clip 兜底。论文原话：清掉的是「不需要另一次 prefill 就能清掉的那部分陈旧」。
- **零开销实证**：dense reward 计算只占一步的 2.2%，刷新前 27.8s / 刷新后 27.3s，差异在步间波动内——开销不是新增，是搬了位置。
- 退化条件：K=1（不复用 batch）时无陈旧，refresh 退化为标准目标，无事可做。

## 结果与代价

**消融阶梯**（每行只改一件事，三机制可拆可叠加）：

| 配置 | 总分 | 增量 |
|---|---|---|
| Naive M-OPD（K=1） | 28.05 | — |
| + token-share balancing | 29.22 | +1.17（几乎全来自 IF：43.64→47.53） |
| + gap-following allocation | 29.94 | +0.72 |
| 切到 K=4 吞吐设置（control 29.28）+ reward refresh（= Open-MOPD） | **31.24** | +0.81 |

总回收率 **35.6% → 83.4%**，距三模型上界 RouteOPD（31.55，88%）只剩一步。

**baseline 对比**：RFT（离线蒸馏，exposure bias）最差 12.6%；单模型混合域 RL π_mixrl 49.3%；参数合并 ParamMerge-Avg 32.9% / ParamMerge-TA 71.7%（同源 teachers 才能合并，仍低于 Open-MOPD）。

**代价/局限**：仅 3B 规模、三个域、oracle 真实标签路由——**路由有误/域标签不可知的场景未验证**（hard routing 和 gap 分配都建立在正确 teacher 信号上，错了可能放大错误）；论文自设无 limitation 章节。

**可复现性主张**（「Open」的含义）：全流程在单节点 8×A100-80GB 上可反复跑完整 pipeline + 消融，端到端 recipe/训练轨迹/评测套件全开源。基座选型本身是个取舍示范：Qwen3-1.7B 太小（SFT 后截断率 69~80%，轨迹闭不了合，失败无法归因）、Qwen2.5-7B 太贵（消融跑不起），SmolLM3-3B 在「能力够」与「可反复跑」之间取平衡。

## AI 预读备注

Zotero AI Butler 两份子笔记（task=summary/table，zhipu/glm-5.3 生成，2026-08-27）做预读底稿，复现级质量：动机表、反事实分析、三阶段超参全表与原文交叉核对一致。

AI-Butler 摘要笔记 itemKey：`V4QD2H72`（task=summary）；表格笔记 itemKey：`5TGI85P9`（task=table）；provider/model：zhipu/glm-5.3

summary 笔记在 §4 机制节处截断，三个修复机制细节与 §5 消融阶梯由原文（PDF 第 9~15 页）补齐核对。

## 我的复述

（费曼检验时原话保留）

> Q2 为什么不直接过采样：「过采样会导致其他类型数据比例降低影响训练效果，比如文中的例子，过采样 IF 样本导致长样本比例变少，模型对长程任务效果变差，当不同类型的 token 比例本来就一样时过采样会和 token 加权等价」

> Q4 与 U-OPSD 组合：「U-OPSD 解决的是没有 gt 的问题，而本文解决的是多专家 OPD 时信号均衡的问题，从 U-OPSD 搬多数投票做 y+，少数投票的结果对应样本为 y- 给 teacher y+ 为额外先验的部分，从 M-OPD 搬前两个机制」（补齐 Q3 后确认第三个机制也该搬）

> Q1b 正反馈环（重讲后复述）：「IF 收敛速度最快，m_d 下降最快 → 反向规则对于小的幅度加更大的权重 → IF 任务得到更高的预算 → 收敛更快 m_d 更小 → 不断重复第二步到第四步的循环，直到崩掉。实际上 m_d 小表示的是任务收敛差不多了，不要再增加预算了；gap-following allocation 给预算跟着 gap 走：(m_d/m_ref)^α m_d 越小预算越少，并裁剪到 [0.05, 20] 范围，防止爆炸，也可以说是刹车。」

> Q3b refresh 的存在条件：「因为轨迹本身是旧学生采样的，如果有无限算力（每步重新 rollout，等效 K=1），没有存在的价值了」

## 卡壳点与解答

**Q：反向归一化的正反馈环——初答只说「把已经学好的带崩掉」，链条断了。**
A：崩溃机制比「带崩」更机械：是**预算分配本身发散**。环的每一环：① IF 最先接近 teacher → m̄_d 缩小；② 反向规则把「gap 已经小」**误读**成「需要更多帮助」，给它更大权重（24.4→80.9）；③ 更多预算 → 收敛更快 → m̄_d 更小；④ 回到 ②，每圈更极端、无反向力量刹车，直到 step 74 训练整体崩溃。gap-following 用正方向自带两层刹车：系统级——顺着 gap 语义，收敛域权重自动回落让出预算；兜底级——clamp [0.05, 20] 防单域 reward 突变（复述时把两层合成了一层，此处钉开）。还有一层初答没提：m̄_d = E[|log π_ϕ − log π_θ|]，它不是 gap 的间接代理，是师生差距的直接读数。

**Q：reward refresh——第一轮完全没理解，全文最大卡壳点。**
A：拆到不能再拆的三句话——① reward 只有两个模型出场，教师冻结所以教师项一次 prefill 永久缓存；② 学生会变，但「当前学生 logprob」这个数 **PPO 每次内更新本来就算出来了**（importance ratio 必需），refresh 只是捡这个免费产出重建学生项——零额外 forward；③ 轨迹本身还是旧学生采样的，这层陈旧只有重新 rollout 才能换，refresh 不碰（生成占一步 46.5% 最贵），剩余 off-policy 程度交给 PPO clip 兜底。一句话：**reward 两个组成项里陈旧的只有学生项，而学生项的重算成本恰好为零。** refresh = 捡钱。

## 还没搞懂

_无_——检验题与两道补漏小检验全部收敛，无残留漏洞。

## 关联

- [S²VOPD](2026-s2vopd.md) — OPD 家族第三页：「单教师信号从哪来」的视觉域答案（把学生输入图退化构造不对称，减学生而非加教师）。散度注记第三数据点：视觉不对称蒸馏里 JSD > reverse KL > forward KL，排序与 U-OPSD 完全颠倒（教师多出的像素信息不可恢复），三框架对照（U-OPSD 直接 loss / 本文 PPO reward 槽位 / S²VOPD 生成式 JSD）待 DistiLLM 系列统一沉淀。
- [U-OPSD](2026-u-opsd.md) — 兑现其预留的 on-policy distillation 钩子。OPD 家族的两个**正交切片**：U-OPSD 管「单教师的信号从哪来」（自身多数投票伪解当特权上下文，去掉 GT 依赖），本文管「多教师信号之间怎么分账」（token/幅度/新鲜度三层预算分配）。组合方案成立：多个自蒸馏伪教师 + 本文三机制（三机制与「教师从哪来」完全正交，只要 K>1 复用 batch，refresh 白送 +0.81）。**散度形式对比注记**（不构成矛盾，记录备考）：U-OPSD 必须前向 KL 直接当 loss（reverse KL 直接优化会复读塌缩）；本文 dense reward 是 reverse-KL 式 per-token 形式，但角色是 PPO 的 **reward 信号**（sg 停梯度、走 policy gradient + clip），不是直接蒸馏损失——同一「方向」在不同框架里安全性不同，值得未来与 DistiLLM 系列一起沉淀。

未来入库钩子：AsyncOPD（reward refresh 的灵感来源，异步 stale RL）、DistiLLM 系列（on-policy 蒸馏散度设计）、GKD（dense reward 进 PPO 槽位的先例）、多教师/路由相关论文应回链本页。
