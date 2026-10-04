#!/usr/bin/env node
// Export a class-only mechanism SVG to a portable PNG. CSS remains the style source.
// node scripts/render-mechanism-diagram.mjs <svg> [--modules <node_modules directory>]
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const [input, ...options] = process.argv.slice(2);
if (!input || (options.length && (options.length !== 2 || options[0] !== "--modules"))) {
  throw new Error("Usage: render-mechanism-diagram.mjs <svg> [--modules <node_modules directory>]");
}
const require = createRequire(import.meta.url);
const sharp = require(options.length ? require.resolve("sharp", { paths: [options[1]] }) : "sharp");
const svgPath = path.resolve(input);
const svg = fs.readFileSync(svgPath, "utf8");
const css = fs.readFileSync(new URL("../site/assets/wiki-slides.css", import.meta.url), "utf8");
const tokens = Object.fromEntries(Array.from(css.match(/:root\s*\{([\s\S]*?)\}/)[1]
  .matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g), match => [match[1], match[2].trim()]));
const rules = Array.from(css.matchAll(/\.demo-svg-[^{]+\{[^}]+\}/g), match => match[0]);
if (!rules.length || !/class="demo-svg-/.test(svg)) throw new Error("No mechanism styles or SVG classes found");
const styles = rules.join("\n").replace(/var\((--[a-z0-9-]+)\)/g, (_, token) => {
  if (!(token in tokens)) throw new Error(`Unknown style token ${token}`);
  return tokens[token];
});
// This style block exists only in the renderer input, never in published HTML/SVG.
const renderInput = svg.replace(/<\?xml-stylesheet[^>]*\?>\s*/g, "")
  .replace(/(<svg\b[^>]*>)/, `$1<style><![CDATA[${styles}]]></style>`);
const output = svgPath.replace(/\.svg$/i, ".png");
if (output === svgPath) throw new Error("Input must be an SVG file");
const result = await sharp(Buffer.from(renderInput)).resize({ width: 1400 }).png().toFile(output);
console.log(`${path.relative(process.cwd(), output)}: ${result.width} × ${result.height}`);
