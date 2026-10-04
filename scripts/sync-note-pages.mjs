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
const markedPath = args.length ? require.resolve('marked', { paths: [args[1]] }) : require.resolve('marked');
const { marked } = await import(markedPath);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Preserve source formulas as readable TeX without a browser math runtime.
// Otherwise Markdown interprets subscripts as emphasis and S[policy](state) as a link.
marked.use({ extensions: [{
  name: 'sourceMathBlock', level: 'block', start: src => src.indexOf('$$'),
  tokenizer(src) {
    const match = /^\$\$[\s\S]+?\$\$(?:\n|$)/.exec(src);
    if (match) return { type: 'sourceMathBlock', raw: match[0], text: match[0].trim() };
  },
  renderer: token => `<pre class="note-pre">${escape(token.text.replace(/[ \t]+$/gm, ''))}</pre>\n`
}, {
  name: 'sourceMathInline', level: 'inline', start: src => src.indexOf('$'),
  tokenizer(src) {
    const match = /^(?:\$\$[\s\S]+?\$\$|\$(?!\$)[^\n$]+?\$)/.exec(src);
    if (match) return { type: 'sourceMathInline', raw: match[0], text: match[0] };
  },
  renderer: token => `<span class="note-math">${escape(token.text)}</span>`
}] });
const paperIds = { '五分钟重建': 'rebuild', '论文图解': 'figures', '解决什么问题': 'problem', '大白话讲解': 'intuition', '关键机制': 'mechanism', '结果与代价': 'evidence', 'AI 预读备注': 'ai-notes', '我的复述': 'restatement', '卡壳点与解答': 'pitfalls', '还没搞懂': 'open', '关联': 'relations' };
const hubIds = { '专题本质': 'essence', '问题与方法地图': 'map', '关系记录': 'relations', '分叉与演进': 'evolution', '关键维度比较': 'compare', '带着问题读论文': 'path', '跨篇卡壳点': 'pitfalls', '证据边界与来源': 'boundaries' };

function render(body, sourceFile, noteFile) {
  return marked.parse(body, { gfm: true, breaks: false })
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
      if (/^(papers|syntheses)\/.+\.md$/.test(wiki)) {
        target = path.join(root, 'site/notes', wiki.replace(/\.md$/, '.html'));
        if (anchor) anchor = (wiki.startsWith('papers/') ? paperIds : hubIds)[decodeURIComponent(anchor)] || anchor;
      }
      const relative = path.relative(path.dirname(noteFile), target);
      return `${attr}="${relative}${anchor ? '#' + anchor : ''}"`;
    });
}

let count = 0;
for (const kind of ['papers', 'syntheses']) {
  for (const file of fs.readdirSync(path.join(root, 'wiki', kind)).filter(f => f.endsWith('.md'))) {
    const sourceFile = path.join(root, 'wiki', kind, file);
    const noteFile = path.join(root, 'site/notes', kind, file.replace(/\.md$/, '.html'));
    const markdown = fs.readFileSync(sourceFile, 'utf8');
    const existing = fs.readFileSync(noteFile, 'utf8');
    const qaIds = Array.from(existing.matchAll(/<div class="qa" id="([^"]+)"/g), m => m[1]);
    const headings = Array.from(markdown.matchAll(/^## (.+)$/gm));
    const idMap = kind === 'papers' ? paperIds : hubIds;
    const sections = headings.map((m, i) => {
      const heading = m[1];
      const id = idMap[heading];
      if (!id) throw new Error(`${file}: unmapped section ${heading}`);
      const body = markdown.slice(m.index + m[0].length, headings[i + 1]?.index ?? markdown.length).trim();
      let content;
      if (id === 'pitfalls' && !body.includes('<div class="qa"')) {
        const questions = Array.from(body.matchAll(/^(?:\*\*Q[^\n]+\*\*[^\n]*|### Q[^\n]+)$/gm));
        if (questions.length !== qaIds.length) throw new Error(`${file}: question count changed (${questions.length}/${qaIds.length}); preserve IDs explicitly`);
        content = render(body.slice(0, questions[0]?.index ?? body.length), sourceFile, noteFile);
        for (let q = 0; q < questions.length; q++) {
          const question = questions[q][0].replace(/\*\*/g, '').replace(/^### /, '');
          const answer = body.slice(questions[q].index + questions[q][0].length, questions[q + 1]?.index ?? body.length).trim().replace(/^A：/, '');
          content += `<div class="qa" id="${qaIds[q]}"><p class="qa-q">${marked.parseInline(question)}</p><div class="qa-a">${render(answer, sourceFile, noteFile)}</div></div>`;
        }
      } else content = render(body, sourceFile, noteFile);
      return { id, heading, html: `<section class="note-sec" id="${id}"><h2>${escape(heading)}</h2>${content}</section>` };
    });
    const essence = markdown.match(/^> \*\*一句话本质\*\*：(.+)$/m)?.[1];
    let header = existing.slice(0, existing.indexOf('<nav class="note-toc"'));
    if (!header || !existing.includes('</main>')) throw new Error(`${file}: unsupported note shell`);
    header = header.replace(/<p class="note-essence">[\s\S]*?<\/p>/, `<p class="note-essence"><strong>一句话本质</strong>：${marked.parseInline(essence)}</p>`);
    // Historical shells sometimes placed figures before the section navigation.
    // Figures now live in source sections and must not survive as stale duplicates.
    header = header.replace(/<figure class="paper-fig">[\s\S]*?<\/figure>\s*/g, '');
    const toc = `<nav class="note-toc" aria-label="本页章节"><span class="note-toc-kicker">SECTIONS</span>${sections.map(s => `<a href="#${s.id}">${escape(s.heading)}</a>`).join('')}</nav>`;
    const footer = existing.includes('<footer class="note-foot">')
      ? existing.slice(existing.indexOf('<footer class="note-foot">'))
      : `<footer class="note-foot"><a href="../../${kind === 'papers' ? 'papers' : 'topics'}/${file.replace(/\.md$/, '.html')}">← 返回阅读页</a><a href="../../../wiki/${kind}/${file}">markdown 源文件（唯一真源）</a><span>本页是完整笔记的静态投影，保留原话、限定与假说标记。</span></footer>\n${existing.slice(existing.lastIndexOf('</main>'))}`;
    fs.writeFileSync(noteFile, header + toc + '\n' + sections.map(s => s.html).join('\n') + '\n' + footer);
    count++;
  }
}
console.log(`Projected ${count} complete notes; retained historical question IDs.`);
