#!/usr/bin/env node

/*
 * 把 site/assets/diagrams/<专题>-map.svg 的图稿同步进 site/topics/<专题>.html 的内嵌位置。
 * 独立 SVG 文件是可单独打开的放大版（靠 xml-stylesheet 引用共享样式表）；导读页内嵌同一份标记，
 * 只做两处机械变换：去掉 XML 处理指令、把「../../topics/<专题>.html#paper-*」改成页内「#paper-*」。
 * 导读页里用 <!-- hub-diagram:<文件名去 .svg> --> 与 <!-- /hub-diagram --> 标出内嵌区间。
 * scripts/check-site.mjs 会反向核对两份标记一致；本脚本幂等，可重复运行。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const topicsDir = path.join(root, "site/topics");
const diagramsDir = path.join(root, "site/assets/diagrams");

function inlineDiagram(svgSource, topicId) {
  return svgSource
    .replace(/<\?xml[^>]*\?>\s*/g, "")
    .replace(/<\?xml-stylesheet[^>]*\?>\s*/g, "")
    .replace(new RegExp(`href="\\.\\./\\.\\./topics/${topicId}\\.html#`, "g"), 'href="#')
    .trim();
}

let changed = 0;
for (const file of fs.readdirSync(topicsDir).filter(item => item.endsWith(".html") && !item.startsWith("_"))) {
  const topicId = file.replace(/\.html$/, "");
  const pagePath = path.join(topicsDir, file);
  let html = fs.readFileSync(pagePath, "utf8");
  const pattern = /<!-- hub-diagram:([a-z0-9-]+) -->[\s\S]*?<!-- \/hub-diagram -->/g;
  html = html.replace(pattern, (whole, name) => {
    const svgPath = path.join(diagramsDir, `${name}.svg`);
    if (!fs.existsSync(svgPath)) {
      console.error(`错误: ${file} 引用的图稿 ${name}.svg 不存在`);
      process.exitCode = 1;
      return whole;
    }
    const inline = inlineDiagram(fs.readFileSync(svgPath, "utf8"), topicId);
    const next = `<!-- hub-diagram:${name} -->\n${inline}\n<!-- /hub-diagram -->`;
    if (next !== whole) changed += 1;
    return next;
  });
  fs.writeFileSync(pagePath, html);
}
console.log(changed ? `已同步 ${changed} 处内嵌图稿` : "内嵌图稿已是最新");
