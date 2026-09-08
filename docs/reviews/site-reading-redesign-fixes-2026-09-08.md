# 站点阅读 S1~S4 修复与 O1~O3 优化报告

日期：2026-09-08
工作基线：`087cb87` 工作区（与[分析与修复交接](site-reading-redesign-analysis-2026-09-08.md)的审查基线一致）。
资源版本：`20260908-5` → `20260908-6`（wiki-slides.js / wiki-slides.css / index.html 变更，全站 19 页 + 2 模板同步）。

## 逐项处理结果

### S1 · 搜索结果与回忆模式的目标页面冲突（已修复，浏览器验证）

改动：首页标题入口不再跟随首条命中，统一为本篇速览阅读入口 `cardHref(page.href, state, recallOn)`；精确定位由命中片段链接负责。回忆模式下标题带 `recall=1` 进速览回忆流程，完整笔记页不引入回忆状态机。

验证（本地 HTTP + 浏览器）：

- `index.html?q=Dataset-S2` 开回忆后，GenLIP 标题链接为 `papers/2026-genlip.html?recall=1&from=q%3DDataset-S2`（修复前为完整笔记 `#mechanism` 且不生效）。
- 进入后自动进回忆态：正文五节隐藏、只留标题与操作条、问题与答案均隐藏；「显示检验问题」后问题可见、答案仍收起；「结束回忆」后全部恢复。
- 普通搜索的片段链接仍直落完整笔记命中位置（见 S3 首次落点数据）。

### S2 · 沿关联继续阅读丢失来源筛选（已修复，浏览器验证）

改动：新增 `withFrom()` 统一继承来源，覆盖侧栏关系卡、手机重点关联、速览文末静态关联（JS 扫描同目录 `*.html` 链接）、「阅读完整笔记」出口、完整笔记页同目录互链、比较弹窗跨页依据；同文档依据与标签链接保持原语义（标签是新的筛选操作）。

验证：`papers/2026-u-opsd.html?from=topic%3Ddistillation` 下侧栏两条关系、文末 Open-MOPD、完整笔记出口、比较弹窗全部 `2026-*.html?from=topic%3Ddistillation` 形态；两跳（U-OPSD → S²VOPD）后顶部返回仍为 `../index.html?topic=distillation`；无来源直访时所有链接保持干净。

### S3 · 目录点击触发旧搜索词再次定位（已修复，浏览器验证）

改动：移除 `hashchange` 上的 `locateHitText` 监听，搜索词定位只在首次落地执行一次；`from` 参数保留仅用于返回。

验证（GenLIP 完整笔记，`from=q=Dataset-S2`，词仅出现在「关键机制」节）：

| 操作 | scrollY | 目标位置 | 判定 |
|---|---|---|---|
| 首次进入 `#mechanism` | 2594 | 命中文字 2665 | 落命中文字（旧定位能力保留） |
| 点目录「我的复述」 | 3407 | 章节头 3483 | 落章节头 |
| 再点「关键机制」（含旧词） | 1565 | 章节头 1665 | 落章节头，未被拉回 2594 |
| 点「跳到正文」 | 52 | 正文头 52 | 回页首 |

后退返回 `#mechanism` 位置恢复正常。

### S4 · 索引生成器只重建部分字段（已重写，临时副本实验验证）

`scripts/build-wiki-index.mjs` 改为从真源全量重建并校验：

- 真源：`wiki/papers/*.md` front-matter（清单/id/type/aliases/topic/tags）、`taxonomy.md`（专题与词表）、`review.md`（入库日期与 next/last/count）、md 正文 + 完整笔记 HTML（全文条目）。
- 编辑判断字段从既有索引保留：title / essence / relations / 速览条目 / review.result；新页面按 front-matter 推导并告警。
- 报错项（汇总列出、非零退出、拒绝生成）：缺 front-matter、type 非 paper、未知 topic/标签、缺速览页或完整笔记页、review.md 缺行或残行、条目锚点在目标页静态不存在、关系指向不存在页面或 status 非法。孤儿派生页给警告。
- 支持 `CHECK_DRY_RUN=1` 输出 stdout（供回归脚本对账）。

验证：干跑与现有索引**逐字一致**（基线无漂移）；连续运行两次结果一致；临时副本实验：front-matter 改 topic → 投影同步、review.md 改下次复测日期 → 投影同步、未知标签 / 新增无派生文件 / 删 review 行均报错拒绝生成。临时副本已清理，真实工作区索引仅注释头变化。

### O1 · 搜索优先找回具体困惑（已实现，浏览器验证）

新增 `entryScore`：问题标题命中 > 正文完整短语 > 正文散命中，问答类条目（卡壳/全文问答）加权；同分保持索引原序。

验证（首页实际渲染的命中条目）：

- `y+` → U-OPSD 前两条为「卡壳 · y+ 是答案值还是整条轨迹」「全文问答 · …y+/y⁻…」（此前为「一页看懂」「机制」）。
- `流式 掩码` → VST 前两条为「卡壳 · 流式掩码除了防泄露还解决什么」及对应全文问答。
- `Dataset-S2` → 仍找到 GenLIP 完整笔记「全文 · 关键机制」。

### O2 · 手机首页结果前置（已实现，浏览器数值验证）

- `index.html`：搜索面板下新增手机紧凑条（今天待复测 + 先回忆，双入口与侧栏状态同步）；侧栏「今天先做什么/阅读方式」移到结果之后；「阅读方式」文案去掉 notes/ 维护术语。
- CSS：≤720px 时侧栏不再 `order: -1` 前置；完整笔记目录改单行横滑（`flex-wrap: nowrap` + 子项 `flex: 0 0 auto; white-space: nowrap`，触控 44px）。

验证（CSS 视口 412px）：紧凑条可见、开关 45px 高；首条结果 533px 进入首屏；说明块移至 2620px（结果后）；note-toc 由 163px 多行收敛为 75px 单行横滑，正文上移约 70px；桌面（1280px）侧栏 sticky、目录 wrap、紧凑条隐藏，均无回归。

### O3 · 回归集沉淀（已建立，全部通过）

新增 `scripts/check-site.mjs`（零依赖）：C1 派生文件与孤儿页、C2 全部条目锚点存在、C3 关系指向、C4~C6 front-matter/review/词表与投影一致、C7 qa id 页内不重复、C8 版本串统一、C9 速览层零 em-dash、C10 生成器干跑与现有索引逐字一致。当前全绿。

## 尚未验证 / 限制

- 线上部署效果仅到 deploy 脚本健康检查；未在 VPS 侧实测。
- IAB 后端截图能力不可用（"screenshot activity capture failed for guest"），手机布局以数值指标（位置/高度/display/order）验证，未做像素级截图比对；390×844 与 412px 同断点，未单独复跑。
- Playwright locator 的 click 在该 IAB 存在动作性超时，交互统一改用页面内真实 `.click()` 触发后量测，事件路径等价。
- CSS 收拢（O3 后半）未做：本轮仅新增规则，未合并迁移阶段重复覆盖，留待回归集跑稳后单独处理。
