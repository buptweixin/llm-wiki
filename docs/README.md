# 工程设计说明与历史验收归档

本目录存放 `site/` 静态阅读层、专题导读与讲解输出规范的工程设计文档及历轮浏览器/静态验收记录，**不计入费曼知识页**。

## 设计规范（Specs）

- [站点阅读体验改造 Spec](specs/site-reading-redesign.md) — 连续滚动阅读、语义目录、受控标签、全文片段搜索、回忆模式与复测状态投影方案。
- [站点专题导读与论文关系方案](specs/site-topic-hubs.md) — 问题地图、方法分叉、比较表、学习路径及带证据状态与段落指纹的关系记录规范。
- [理解输出形式的流程评估与试点方案](specs/learning-output-formats.md) — 中文清晰写作约束、围绕卡壳点选择静态图或小交互、关闭提示后的迁移复验规范。

## 历史验收与升级记录（Reviews）

- [快速复习静态阅读验收（2026-10-04）](reviews/quick-review-static-2026-10-04.md) — 条件解释与历史卡壳解答默认静态可见，保留「先回忆」主动自测入口。
- [历史文章学习入口优化验收（2026-10-04）](reviews/history-learning-upgrade-2026-10-04.md) — 14 篇论文与 2 个专题统一五分钟重建、补取重点原图并同步三层投影（附 [原图提取记录](reviews/history-learning-figures-2026-10-04.json)）。
- [专题导读首轮验收（2026-09-09）](reviews/site-topic-hubs-review-2026-09-09.md) — 首批两个专题导读的设计、证据标签、原话保真与双端指纹校验复核。
- [站点阅读改造第七轮验收报告（2026-09-09）](reviews/site-reading-redesign-review-2026-09-09-round-7.md)
- [站点阅读 S1~S4 修复与 O1~O3 优化报告（2026-09-08）](reviews/site-reading-redesign-fixes-2026-09-08.md)
- [站点阅读改造分析与修复交接（2026-09-08）](reviews/site-reading-redesign-analysis-2026-09-08.md)
- [站点阅读改造第六轮验收报告（2026-09-08）](reviews/site-reading-redesign-review-2026-09-08-round-6.md)
- [站点阅读改造第五轮验收报告（2026-09-08）](reviews/site-reading-redesign-review-2026-09-08-round-5.md)
- [站点阅读改造第四轮验收报告（2026-09-08）](reviews/site-reading-redesign-review-2026-09-08-round-4.md)
- [站点阅读改造第三轮验收报告（2026-09-08）](reviews/site-reading-redesign-review-2026-09-08-round-3.md)
- [站点阅读改造第二轮验收报告（2026-09-08）](reviews/site-reading-redesign-review-2026-09-08.md)
- [站点阅读改造首轮验收报告（2026-09-07）](reviews/site-reading-redesign-review-2026-09-07.md)

## 派生层重建与静态体检

仓库根目录保持零 `node_modules` 依赖；维护期构建工具（`marked` 与静态 MathML 编译器 `temml`）可装在临时目录后通过 `--modules` 传入，生成的 `site/` 页面纯静态零运行时依赖：

```bash
node scripts/sync-note-pages.mjs --modules <node_modules目录>
node scripts/sync-hub-diagrams.mjs
node scripts/build-wiki-index.mjs
node scripts/check-site.mjs
```
