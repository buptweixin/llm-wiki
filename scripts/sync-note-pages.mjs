#!/usr/bin/env node
// Faithful static note projection. Markdown is the only content source.
// Uses the authoring runtime's marked package; published pages need no dependency.
// node scripts/sync-note-pages.mjs [--modules <node_modules directory>]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--modules')) {
  throw new Error('Usage: sync-note-pages.mjs [--modules <node_modules directory>]');
}
const require = createRequire(import.meta.url);
const resolvePaths = args.length ? { paths: [args[1]] } : undefined;
const markedPath = require.resolve('marked', resolvePaths);
const { marked } = await import(markedPath);
let temml = null;
try {
  const temmlPath = require.resolve('temml/dist/temml.mjs', resolvePaths);
  const temmlMod = await import(temmlPath);
  temml = temmlMod.default || temmlMod;
} catch {
  try {
    const temmlPath = require.resolve('temml', resolvePaths);
    const temmlMod = await import(temmlPath);
    temml = temmlMod.default || temmlMod;
  } catch {
    temml = null;
  }
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const STYLE_CLASS_MAP = {
  'display:block math;': '',
  'math-depth:0;': 'tml-depth-0',
  'math-depth:1;': 'tml-depth-1',
  'math-depth:2;': 'tml-depth-2',
  'padding-left:0em;padding-right:0em;': 'tml-pad-0',
  'padding-left:1em;padding-right:0em;': 'tml-pad-l1'
};

function sanitizeMathml(html) {
  return html.replace(/<([a-zA-Z0-9:-]+)\b([^>]*)>/g, (full, tag, attrs) => {
    const styleMatch = attrs.match(/\s*style="([^"]*)"/);
    if (!styleMatch) return full;
    const mapped = STYLE_CLASS_MAP[styleMatch[1].trim()] ?? '';
    let nextAttrs = attrs.replace(/\s*style="[^"]*"/g, '');
    if (mapped) {
      if (/\bclass="([^"]*)"/.test(nextAttrs)) {
        nextAttrs = nextAttrs.replace(/\bclass="([^"]*)"/, (_, cls) => `class="${(cls + ' ' + mapped).trim()}"`);
      } else {
        nextAttrs += ` class="${mapped}"`;
      }
    }
    return `<${tag}${nextAttrs}>`;
  });
}

function renderMathBlock(rawBlock) {
  const inner = rawBlock.replace(/^\$\$\s*|\s*\$\$$/g, '').trim();
  if (temml) {
    try {
      const mathml = sanitizeMathml(temml.renderToString(inner, { displayMode: true, throwOnError: false }));
      return `<div class="note-math-block" data-tex="${escape(inner)}">${mathml}</div>\n`;
    } catch { /* fall through to static pre */ }
  }
  return `<pre class="note-pre">${escape(rawBlock.replace(/[ \t]+$/gm, ''))}</pre>\n`;
}

function renderMathInline(rawInline) {
  const isDisplay = rawInline.startsWith('$$') && rawInline.endsWith('$$') && rawInline.length > 4;
  const inner = isDisplay ? rawInline.slice(2, -2).trim() : rawInline.slice(1, -1).trim();
  if (temml && inner) {
    try {
      const mathml = sanitizeMathml(temml.renderToString(inner, { displayMode: isDisplay, throwOnError: false }));
      const cls = isDisplay ? 'note-math note-math-display' : 'note-math';
      return `<span class="${cls}" data-tex="${escape(inner)}">${mathml}</span>`;
    } catch { /* fall through to static span */ }
  }
  return `<span class="note-math">${escape(rawInline)}</span>`;
}

// Compile source formulas into static native MathML at build time (zero browser runtime dependency),
// falling back to escaped TeX when temml is unavailable.
marked.use({ extensions: [{
  name: 'sourceMathBlock', level: 'block', start: src => src.indexOf('$$'),
  tokenizer(src) {
    const match = /^\$\$[\s\S]+?\$\$(?:\n|$)/.exec(src);
    if (match) return { type: 'sourceMathBlock', raw: match[0], text: match[0].trim() };
  },
  renderer: token => renderMathBlock(token.text)
}, {
  name: 'sourceMathInline', level: 'inline', start: src => src.indexOf('$'),
  tokenizer(src) {
    const match = /^(?:\$\$[\s\S]+?\$\$|\$(?!\$)[^\n$]+?\$)/.exec(src);
    if (match) return { type: 'sourceMathInline', raw: match[0], text: match[0] };
  },
  renderer: token => renderMathInline(token.text)
}] });
const paperIds = { '五分钟重建': 'rebuild', '论文图解': 'figures', '解决什么问题': 'problem', '大白话讲解': 'intuition', '关键机制': 'mechanism', '结果与代价': 'evidence', 'AI 预读备注': 'ai-notes', '我的复述': 'restatement', '卡壳点与解答': 'pitfalls', '还没搞懂': 'open', '关联': 'relations' };
const hubIds = { '专题本质': 'essence', '问题与方法地图': 'map', '关系记录': 'relations', '分叉与演进': 'evolution', '关键维度比较': 'compare', '带着问题读论文': 'path', '跨篇卡壳点': 'pitfalls', '证据边界与来源': 'boundaries' };
const conceptIds = { '五分钟重建': 'rebuild', '为什么需要它': 'problem', '大白话讲解': 'intuition', '类比': 'analogy', '关键机制 / 数学直觉': 'mechanism', '关键机制': 'mechanism', '常见误解': 'evidence', '我的复述': 'restatement', '卡壳点与解答': 'pitfalls', '还没搞懂': 'open', '关联': 'relations' };
const codeIds = { '五分钟重建': 'rebuild', '在整个系统中的位置': 'problem', '大白话讲解：数据怎么流': 'intuition', '核心代码走读': 'mechanism', '设计取舍': 'evidence', '我的复述': 'restatement', '卡壳点与解答': 'pitfalls', '还没搞懂': 'open', '关联': 'relations' };
const kindSpecs = {
  papers: { readerDir: 'papers', ids: paperIds },
  syntheses: { readerDir: 'topics', ids: hubIds },
  concepts: { readerDir: 'concepts', ids: conceptIds },
  code: { readerDir: 'code', ids: codeIds }
};

function render(body, sourceFile, noteFile, kind, pageId) {
  let html = marked.parse(body, { gfm: true, breaks: false })
    .replace(/>([^<>]*\*\*[^<>]*)</g, (_, text) => '>' + marked.parseInline(text) + '<')
    .replace(/<\/div>\s*<\/div>/g, '</div></div>')
    .replace(/<table>/g, '<table class="dtable">')
    .replace(/<blockquote>/g, '<blockquote class="note-quote">')
    .replace(/<p><img ([^>]+)>\s*(?:<\/p>\s*<p>)?<em>([\s\S]*?)<\/em><\/p>/g,
      (_, attrs, caption) => `<figure class="paper-fig"><img ${attrs} loading="lazy"><figcaption>${caption}</figcaption></figure>`)
    .replace(/(href|src)="([^\"]+)"/g, (match, attr, href) => {
      if (/^(?:[a-z][a-z0-9+.-]*:|#|\/)/i.test(href)) return match;
      let [file, anchor] = href.split('#');
      let target = path.resolve(path.dirname(sourceFile), file);
      const wiki = path.relative(path.join(root, 'wiki'), target);
      const matchedKind = Object.keys(kindSpecs).find(k => new RegExp(`^${k}\\/.+\\.md$`).test(wiki));
      if (matchedKind) {
        target = path.join(root, 'site/notes', wiki.replace(/\.md$/, '.html'));
        if (anchor) anchor = kindSpecs[matchedKind].ids[decodeURIComponent(anchor)] || anchor;
      }
      const relative = path.relative(path.dirname(noteFile), target);
      return `${attr}="${relative}${anchor ? '#' + anchor : ''}"`;
    })
    .replace(/<pre><code/g, '<pre class="note-pre"><code');

  if (kind === 'syntheses') {
    const svgPath = path.join(root, 'site/assets/diagrams', `${pageId}-map.svg`);
    if (fs.existsSync(svgPath)) {
      const inlineSvg = fs.readFileSync(svgPath, 'utf8')
        .replace(/<\?xml[^>]*\?>\s*/g, '')
        .replace(/<\?xml-stylesheet[^>]*\?>\s*/g, '')
        .trim();
      html = html.replace(
        /<pre class="note-pre"><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/,
        (_, code) => `<div class="hub-fig note-hub-fig">${inlineSvg}</div>\n<pre class="note-pre note-mermaid-code"><code class="language-mermaid">${code}</code></pre>`
      );
    }
  }
  return html;
}

let count = 0;
for (const kind of Object.keys(kindSpecs)) {
  const wikiDir = path.join(root, 'wiki', kind);
  if (!fs.existsSync(wikiDir)) continue;
  for (const file of fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'))) {
    const pageId = file.replace(/\.md$/, '');
    const sourceFile = path.join(wikiDir, file);
    const noteFile = path.join(root, 'site/notes', kind, `${pageId}.html`);
    const markdown = fs.readFileSync(sourceFile, 'utf8');
    const existing = fs.readFileSync(noteFile, 'utf8');
    const qaIds = Array.from(existing.matchAll(/<div class="qa" id="([^"]+)"/g), m => m[1]);
    const headings = Array.from(markdown.matchAll(/^## (.+)$/gm));
    const idMap = kindSpecs[kind].ids;
    const sections = headings.map((m, i) => {
      const heading = m[1];
      const id = idMap[heading];
      if (!id) throw new Error(`${file}: unmapped section ${heading}`);
      const body = markdown.slice(m.index + m[0].length, headings[i + 1]?.index ?? markdown.length).trim();
      let content;
      if (id === 'pitfalls' && !body.includes('<div class="qa"')) {
        const questions = Array.from(body.matchAll(/^(?:\*\*Q[^\n]+\*\*[^\n]*|### Q[^\n]+)$/gm));
        if (questions.length !== qaIds.length) throw new Error(`${file}: question count changed (${questions.length}/${qaIds.length}); preserve IDs explicitly`);
        content = render(body.slice(0, questions[0]?.index ?? body.length), sourceFile, noteFile, kind, pageId);
        for (let q = 0; q < questions.length; q++) {
          const question = questions[q][0].replace(/\*\*/g, '').replace(/^### /, '');
          const answer = body.slice(questions[q].index + questions[q][0].length, questions[q + 1]?.index ?? body.length).trim().replace(/^A：/, '');
          content += `<div class="qa" id="${qaIds[q]}"><p class="qa-q">${marked.parseInline(question)}</p><div class="qa-a">${render(answer, sourceFile, noteFile, kind, pageId)}</div></div>`;
        }
      } else content = render(body, sourceFile, noteFile, kind, pageId);
      return { id, heading, html: `<section class="note-sec" id="${id}"><h2>${escape(heading)}</h2>${content}</section>` };
    });
    const essence = markdown.match(/^> \*\*一句话本质\*\*：(.+)$/m)?.[1];
    let header = existing.slice(0, existing.indexOf('<nav class="note-toc"'));
    if (!header || !existing.includes('</main>')) throw new Error(`${file}: unsupported note shell`);
    header = header.replace(/<p class="note-essence">[\s\S]*?<\/p>/, `<p class="note-essence"><strong>一句话本质</strong>：${marked.parseInline(essence)}</p>`);
    // Historical shells sometimes placed figures before the section navigation.
    // Figures now live in source sections and must not survive as stale duplicates.
    header = header.replace(/<figure class="paper-fig">[\s\S]*?<\/figure>\s*/g, '');
    const verMatch = header.match(/\?v=([0-9a-zA-Z-]+)/);
    const verSuffix = verMatch ? `?v=${verMatch[1]}` : '';
    const toc = `<nav class="note-toc" aria-label="本页章节"><span class="note-toc-kicker">SECTIONS</span>${sections.map(s => `<a href="#${s.id}">${escape(s.heading)}</a>`).join('')}</nav>`;
    const footMatch = existing.match(/<footer class="note-foot">[\s\S]*?<\/footer>/);
    const footBlock = footMatch
      ? footMatch[0]
      : `<footer class="note-foot">\n      <a href="../../${kindSpecs[kind].readerDir}/${pageId}.html">← 返回${kind === 'syntheses' ? '导读' : '速览'}页</a>\n      <a href="../../../wiki/${kind}/${file}">markdown 源文件（唯一真源）</a>\n      <span>本页是完整笔记的静态投影，保留原话、限定与假说标记。</span>\n    </footer>`;
    const tail = `${footBlock}\n  </main>\n</div>\n<script src="../../assets/wiki-index.js${verSuffix}"></script>\n<script src="../../assets/wiki-slides.js${verSuffix}"></script>\n</body>\n</html>\n`;
    fs.writeFileSync(noteFile, header + toc + '\n' + sections.map(s => s.html).join('\n') + '\n' + tail);
    count++;
  }
}
console.log(`Projected ${count} complete notes (${temml ? 'static MathML' : 'escaped TeX'}); retained historical question IDs.`);
