/*
 * llm-wiki 阅读层 (wiki-slides.js)
 * 纯静态、零外部依赖、支持 file:// 离线打开。
 * 覆盖三类视图：
 *   1. 首页 (index.html)：全文与问答搜索、专题计数、分类标签抽屉、排序切换、键盘选卡、回忆模式；
 *   2. 阅读页 (papers/*.html, topics/*.html)：三栏连续阅读、语义目录跟随、回忆模式、图片/关系图灯箱、
 *      机制可见性实时探索、专题图谱联动与多列对比弹窗；
 *   3. 完整笔记页 (notes/**)：桌面三栏目录与上下文旁栏、公式 TeX/代码一键复制、Mermaid 源码折叠、搜索精确定位。
 * 数据来自 site/assets/wiki-index.js（真源为 wiki markdown 与 review.md 的投影）。
 */
(function () {
  "use strict";

  var pages = window.WIKI_INDEX || [];
  var taxonomy = window.WIKI_TAXONOMY || [];
  var topics = window.WIKI_TOPICS || {};
  var TAGS_BY_ID = {};
  taxonomy.forEach(function (tag) { TAGS_BY_ID[tag.id] = tag; });

  function isHub(page) {
    return !!page && page.type === "synthesis";
  }
  var hubPages = pages.filter(isHub);
  var paperPages = pages.filter(function (page) { return !isHub(page); });
  var HUB_BY_PAPER = {};
  hubPages.forEach(function (hub) {
    (hub.members || []).forEach(function (id) {
      if (!HUB_BY_PAPER[id]) HUB_BY_PAPER[id] = { hub: hub, role: "member" };
    });
    (hub.refs || []).forEach(function (id) {
      if (!HUB_BY_PAPER[id]) HUB_BY_PAPER[id] = { hub: hub, role: "ref" };
    });
  });

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function node(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /* ---------- 主题切换 (Auto / Light / Dark，持久化且兼容离线 file://) ---------- */

  var THEME_KEY = "llm-wiki-theme";
  var darkMedia = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var reduceMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

  function scrollBehavior() {
    return reduceMotion && reduceMotion.matches ? "auto" : "smooth";
  }

  function readSavedTheme() {
    try {
      var val = window.localStorage.getItem(THEME_KEY);
      if (val === "light" || val === "dark" || val === "auto") return val;
    } catch (e) { /* file:// WebView 禁用 storage 时降级内存状态 */ }
    return "auto";
  }

  var currentTheme = readSavedTheme();

  function isEffectiveDark() {
    if (currentTheme === "dark") return true;
    if (currentTheme === "light") return false;
    return !!(darkMedia && darkMedia.matches);
  }

  function themeButtonText() {
    if (currentTheme === "light") return "浅色";
    if (currentTheme === "dark") return "深色";
    return "自动";
  }

  function applyTheme(mode, persist) {
    currentTheme = mode;
    var root = document.documentElement;
    if (mode === "light" || mode === "dark") {
      root.setAttribute("data-theme", mode);
    } else {
      root.removeAttribute("data-theme");
    }
    if (persist) {
      try { window.localStorage.setItem(THEME_KEY, mode); } catch (e) { /* ignore */ }
    }
    qsa(".theme-toggle").forEach(function (btn) {
      btn.textContent = "外观: " + themeButtonText();
      btn.title = "切换浅色 / 深色 / 跟随系统 (快捷键 t)";
    });
  }

  function cycleTheme() {
    var sysDark = !!(darkMedia && darkMedia.matches);
    var next;
    if (currentTheme === "auto") {
      next = sysDark ? "light" : "dark";
    } else if (currentTheme === (sysDark ? "light" : "dark")) {
      next = sysDark ? "dark" : "light";
    } else {
      next = "auto";
    }
    applyTheme(next, true);
  }

  function makeThemeButton() {
    var btn = node("button", "theme-toggle", "外观: " + themeButtonText());
    btn.type = "button";
    btn.title = "切换浅色 / 深色 / 跟随系统 (快捷键 t)";
    btn.addEventListener("click", cycleTheme);
    return btn;
  }

  applyTheme(currentTheme, false);
  if (darkMedia && darkMedia.addEventListener) {
    darkMedia.addEventListener("change", function () {
      if (currentTheme === "auto") applyTheme("auto", false);
    });
  }

  /* ---------- 高亮工具 ---------- */

  function highlight(value, tokens) {
    var raw = String(value);
    var marks = [];
    tokens.forEach(function (token) {
      if (!token) return;
      var pattern = new RegExp(escapeRegExp(token), "gi");
      var match;
      while ((match = pattern.exec(raw)) !== null) {
        marks.push([match.index, match.index + match[0].length]);
        if (match.index === pattern.lastIndex) pattern.lastIndex += 1;
      }
    });
    if (!marks.length) return escapeHtml(raw);
    marks.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    var merged = [marks[0].slice()];
    for (var i = 1; i < marks.length; i += 1) {
      var last = merged[merged.length - 1];
      if (marks[i][0] <= last[1]) {
        if (marks[i][1] > last[1]) last[1] = marks[i][1];
      } else {
        merged.push(marks[i].slice());
      }
    }
    var out = "";
    var pos = 0;
    merged.forEach(function (span) {
      out += escapeHtml(raw.slice(pos, span[0])) + "<mark>" + escapeHtml(raw.slice(span[0], span[1])) + "</mark>";
      pos = span[1];
    });
    out += escapeHtml(raw.slice(pos));
    return out;
  }

  /* ---------- 标签与复测状态 ---------- */

  function tagLabel(id) {
    var tag = TAGS_BY_ID[id];
    return tag ? tag.label : id;
  }

  function resolveTag(value) {
    var key = String(value || "").trim().toLocaleLowerCase();
    if (!key) return null;
    if (TAGS_BY_ID[key]) return key;
    for (var i = 0; i < taxonomy.length; i += 1) {
      var tag = taxonomy[i];
      if (tag.label.toLocaleLowerCase() === key) return tag.id;
      if (tag.aliases.some(function (alias) { return alias.toLocaleLowerCase() === key; })) return tag.id;
    }
    return null;
  }

  function pageTagsText(page) {
    return page.tags.map(function (id) {
      var tag = TAGS_BY_ID[id];
      return tag ? [tag.id, tag.label].concat(tag.aliases).join(" ") : id;
    }).join(" ");
  }

  function todayCN() {
    try {
      return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Shanghai" });
    } catch (error) {
      return new Date().toISOString().slice(0, 10);
    }
  }

  function reviewLabel(page) {
    var review = page.review;
    if (!review || !review.next) return "复测：暂无记录";
    var due = review.next <= todayCN();
    var head = !review.count ? "待首测" : "已通过（" + review.count + " 次）";
    return (due ? "今天到期 · " : "") + head + " · 下次 " + review.next;
  }

  function reviewBadge(page) {
    var review = page.review;
    if (!review || !review.next) return node("span", "meta-badge", "暂无复测");
    var due = review.next <= todayCN();
    if (due) return node("span", "meta-badge is-due", "待复测 · " + (!review.count ? "待首测" : "已过 " + review.count + " 次"));
    if (!review.count) return node("span", "meta-badge is-pending", "待首测 · " + review.next);
    return node("span", "meta-badge is-passed", "已通过 " + review.count + " 次 · 下次 " + review.next);
  }

  function compareReviewPriority(a, b) {
    var da = reviewDue(a) ? 0 : 1;
    var db = reviewDue(b) ? 0 : 1;
    if (da !== db) return da - db;
    var ca = a.review ? a.review.count : 0;
    var cb = b.review ? b.review.count : 0;
    if ((ca === 0) !== (cb === 0)) return ca === 0 ? -1 : 1;
    if (ca !== cb) return ca - cb;
    var na = (a.review && a.review.next) || "9999-99-99";
    var nb = (b.review && b.review.next) || "9999-99-99";
    return na < nb ? -1 : (na > nb ? 1 : 0);
  }

  function reviewDue(page) {
    return !!(page.review && page.review.next && page.review.next <= todayCN());
  }

  var STATUS_LABEL = { reported: "原文报告", synthesis: "库内对照", hypothesis: "待验证假说" };

  /* ---------- 搜索 ---------- */

  function tokensFor(query) {
    return query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  }

  function pageCorpus(page) {
    return (page.title + " " + page.aliases.join(" ") + " " + pageTagsText(page) + " " +
      (topics[page.topic] || "") + " " + page.essence + " " +
      page.entries.map(function (entry) { return entry.h + " " + entry.t; }).join(" ")).toLocaleLowerCase();
  }

  function matchingEntries(page, tokens) {
    if (!tokens.length) return [];
    return page.entries.filter(function (entry) {
      var text = (entry.h + " " + entry.t).toLocaleLowerCase();
      return tokens.every(function (token) { return text.indexOf(token) >= 0; });
    });
  }

  function entryScore(entry, tokens) {
    var h = entry.h.toLocaleLowerCase();
    var t = entry.t.toLocaleLowerCase();
    var phrase = tokens.join(" ");
    var score = 0;
    if (h.indexOf(phrase) >= 0) score += 60;
    else if (t.indexOf(phrase) >= 0) score += 24;
    tokens.forEach(function (token) {
      if (h.indexOf(token) >= 0) score += 10;
      else if (t.indexOf(token) >= 0) score += 3;
    });
    if (h.indexOf("问答") >= 0 || h.indexOf("卡壳") >= 0) score += 9;
    return score;
  }

  function rankEntries(entries, tokens) {
    if (entries.length < 2) return entries;
    return entries.slice().sort(function (a, b) { return entryScore(b, tokens) - entryScore(a, tokens); });
  }

  function scorePage(page, tokens) {
    var titleText = (page.title + " " + page.aliases.join(" ")).toLocaleLowerCase();
    var tagText = pageTagsText(page).toLocaleLowerCase();
    var score = 0;
    tokens.forEach(function (token) {
      if (titleText.indexOf(token) >= 0) score += 100;
      else if (tagText.indexOf(token) >= 0) score += 40;
      else if (page.essence.toLocaleLowerCase().indexOf(token) >= 0) score += 20;
      else if (matchingEntries(page, [token]).length) score += 10;
    });
    return score;
  }

  function matchSelection(lower, tokens) {
    if (!tokens.length) return null;
    var phrase = tokens.join(" ");
    var at = lower.indexOf(phrase);
    if (at >= 0) return { start: at, end: at + phrase.length };
    if (tokens.length > 1) {
      var win = coveringWindow(lower, tokens);
      if (win && win.span <= 600) return win;
    }
    return null;
  }

  function tokenHits(lower, token) {
    var hits = [];
    var at = lower.indexOf(token);
    while (at >= 0) {
      hits.push(at);
      at = lower.indexOf(token, at + token.length);
    }
    return hits;
  }

  function coveringWindow(lower, tokens) {
    var lists = [];
    for (var k = 0; k < tokens.length; k += 1) {
      var hits = tokenHits(lower, tokens[k]);
      if (!hits.length) return null;
      lists.push(hits);
    }
    var cursor = lists.map(function () { return 0; });
    var best = null;
    for (;;) {
      var minK = 0;
      var maxK = 0;
      for (var j = 1; j < lists.length; j += 1) {
        if (lists[j][cursor[j]] < lists[minK][cursor[minK]]) minK = j;
        if (lists[j][cursor[j]] > lists[maxK][cursor[maxK]]) maxK = j;
      }
      var end = lists[maxK][cursor[maxK]] + tokens[maxK].length;
      var span = end - lists[minK][cursor[minK]];
      if (!best || span < best.span) {
        best = { start: lists[minK][cursor[minK]], end: end, span: span };
      }
      cursor[minK] += 1;
      if (cursor[minK] >= lists[minK].length) break;
    }
    return best;
  }

  function snippetAround(text, tokens) {
    var lower = text.toLocaleLowerCase();
    var sel = matchSelection(lower, tokens);
    var at = sel ? sel.start : -1;
    if (at < 0) {
      for (var i = 0; i < tokens.length; i += 1) {
        at = lower.indexOf(tokens[i]);
        if (at >= 0) break;
      }
    }
    if (at < 0) return { text: text.slice(0, 110), exact: false };
    var start = Math.max(0, at - 36);
    var end = Math.min(text.length, Math.max(at + 110, (sel ? sel.end : at) + 10));
    var clip = (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
    return { text: clip, exact: true };
  }

  /* ---------- 路由与来源保留 ---------- */

  function pageIdFromPath() {
    var file = window.location.pathname.split("/").pop() || "";
    return file.replace(/\.html$/, "");
  }

  function getPage(id) {
    return pages.filter(function (item) { return item.id === id; })[0];
  }

  function fromQuery() {
    var params = new URLSearchParams(window.location.search);
    var raw = params.get("from") || "";
    if (!raw) return "";
    var source = new URLSearchParams(raw);
    var hasTopics = Object.keys(topics).length > 0;
    var hasTaxonomy = taxonomy.length > 0;
    var state = {
      q: source.get("q") || "",
      topic: source.get("topic") || "all",
      tag: source.get("tag") || "",
      review: source.get("review") === "due" ? "due" : "",
      sort: source.get("sort") || ""
    };
    if (state.tag) state.tag = hasTaxonomy ? (resolveTag(state.tag) || "") : state.tag.trim();
    if (state.topic !== "all" && hasTopics && !topics[state.topic]) state.topic = "all";
    var normalized = new URLSearchParams();
    if (state.q) normalized.set("q", state.q);
    if (state.topic !== "all") normalized.set("topic", state.topic);
    if (state.tag) normalized.set("tag", state.tag);
    if (state.review) normalized.set("review", state.review);
    if (state.sort && state.sort !== "default") normalized.set("sort", state.sort);
    return normalized.toString();
  }

  function addQuery(href, query) {
    if (!query) return href;
    var hashAt = href.indexOf("#");
    var base = hashAt >= 0 ? href.slice(0, hashAt) : href;
    var hash = hashAt >= 0 ? href.slice(hashAt) : "";
    return base + (base.indexOf("?") >= 0 ? "&" : "?") + query + hash;
  }

  function isLocalReaderHtml(href) {
    return /^(?:\.\.\/(?:papers|topics|concepts|code)\/|\.\.\/notes\/(?:papers|syntheses|concepts|code)\/)?[a-z0-9-]+\.html(?:#[\w-]+)?$/i.test(href);
  }

  function withFrom(href) {
    var from = fromQuery();
    if (!from) return href;
    var hashAt = href.indexOf("#");
    var base = hashAt >= 0 ? href.slice(0, hashAt) : href;
    var hash = hashAt >= 0 ? href.slice(hashAt) : "";
    var queryAt = base.indexOf("?");
    var pathname = queryAt >= 0 ? base.slice(0, queryAt) : base;
    var params = new URLSearchParams(queryAt >= 0 ? base.slice(queryAt + 1) : "");
    params.delete("from");
    params.set("from", from);
    return pathname + "?" + params.toString() + hash;
  }

  /* ---------- 共享 UI 增强：进度条、回顶部、快捷键弹窗、复制、灯箱、可见性探索器 ---------- */

  function bindScrollProgress() {
    var progress = qs(".topbar-progress");
    if (!progress) return;
    var ticking = false;
    function update() {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress.style.setProperty("--progress", ratio.toFixed(4));
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  function initBackToTop(sentinel) {
    if (!sentinel || !("IntersectionObserver" in window)) return;
    var btn = node("button", "back-top", "↑ 顶部");
    btn.type = "button";
    btn.setAttribute("aria-label", "回到页面顶部");
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    });
    document.body.appendChild(btn);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        btn.classList.toggle("is-visible", !entry.isIntersecting && entry.boundingClientRect.bottom < 0);
      });
    }, { threshold: 0 });
    io.observe(sentinel);
  }

  var shortcutDialogInstance = null;
  function openShortcutsModal(mode, trigger) {
    if (!shortcutDialogInstance) {
      var dialog = document.createElement("dialog");
      dialog.className = "reader-modal";
      var panel = node("div", "reader-modal-panel");
      var head = node("div", "reader-modal-head");
      var heading = node("div");
      heading.appendChild(node("h2", "", "键盘快捷键"));
      heading.appendChild(node("p", "modal-note", "在非输入框状态下直接按键即可触发；按 Esc 关闭任意浮层。"));
      var close = node("button", "", "×");
      close.type = "button";
      close.setAttribute("aria-label", "关闭快捷键说明");
      head.appendChild(heading);
      head.appendChild(close);
      panel.appendChild(head);
      var grid = node("div", "shortcut-grid");
      panel.appendChild(grid);
      dialog.appendChild(panel);
      document.body.appendChild(dialog);
      var lastTrigger = null;
      close.addEventListener("click", function () { dialog.close(); });
      dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
      dialog.addEventListener("close", function () {
        if (lastTrigger && lastTrigger.focus) lastTrigger.focus();
      });
      shortcutDialogInstance = {
        open: function (rows, opener) {
          lastTrigger = opener || document.activeElement;
          grid.innerHTML = "";
          rows.forEach(function (pair) {
            var row = node("div", "shortcut-row");
            row.appendChild(node("span", "", pair[0]));
            var keys = node("span", "shortcut-keys");
            pair[1].forEach(function (k) { keys.appendChild(node("kbd", "", k)); });
            row.appendChild(keys);
            grid.appendChild(row);
          });
          if (!dialog.open) dialog.showModal();
          close.focus();
        }
      };
    }
    var items = mode === "index"
      ? [
          ["聚焦搜索框", ["/", "⌘K"]],
          ["在结果卡片间上下移动", ["↑", "↓"]],
          ["打开当前选中的卡片", ["Enter"]],
          ["清空搜索词或取消焦点", ["Esc"]],
          ["切换「先回忆」自测模式", ["r"]],
          ["切换浅色 / 深色 / 自动外观", ["t"]],
          ["打开本快捷键面板", ["?"]]
        ]
      : [
          ["跳至下一节 / 上一节", ["j / ]", "k / ["]],
          ["放大当前视口内的论文图或关系图", ["f"]],
          ["切换「先回忆」闭卷模式（速览与导读页）", ["r"]],
          ["切换浅色 / 深色 / 自动外观", ["t"]],
          ["回到页面顶部", ["g g"]],
          ["打开本快捷键面板", ["?"]],
          ["关闭图片灯箱或弹窗", ["Esc"]]
        ];
    shortcutDialogInstance.open(items, trigger);
  }

  function makeHelpButton(mode) {
    var btn = node("button", "topbar-help", "?");
    btn.type = "button";
    btn.title = "查看键盘快捷键 (?)";
    btn.setAttribute("aria-label", "键盘快捷键");
    btn.addEventListener("click", function () { openShortcutsModal(mode, btn); });
    return btn;
  }

  function copyTextToClipboard(text, button, defaultLabel) {
    function done() {
      button.textContent = "已复制";
      button.classList.add("is-copied");
      window.clearTimeout(button._copyTimer);
      button._copyTimer = window.setTimeout(function () {
        button.textContent = defaultLabel;
        button.classList.remove("is-copied");
      }, 1400);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "readonly");
      ta.className = "skip-link";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
    }
  }

  function initCopyAndMermaid(container) {
    qsa(".note-math-block[data-tex]", container).forEach(function (block) {
      if (qs(".copy-btn", block)) return;
      var tex = block.getAttribute("data-tex") || "";
      if (!tex) return;
      var btn = node("button", "copy-btn", "复制 TeX");
      btn.type = "button";
      btn.addEventListener("click", function () { copyTextToClipboard(tex, btn, "复制 TeX"); });
      block.appendChild(btn);
    });

    qsa("pre.note-mermaid-code", container).forEach(function (pre) {
      if (pre.dataset.enhancedMermaid) return;
      pre.dataset.enhancedMermaid = "1";
      var toggle = node("button", "mermaid-toggle", "查看 Mermaid 图稿源码");
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", "false");
      toggle.addEventListener("click", function () {
        var open = pre.classList.toggle("is-open");
        toggle.textContent = open ? "收起 Mermaid 图稿源码" : "查看 Mermaid 图稿源码";
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      pre.parentNode.insertBefore(toggle, pre);
    });

    qsa("pre", container).forEach(function (pre) {
      if (pre.closest(".code-wrap")) return;
      var text = pre.textContent || "";
      if (!text.trim()) return;
      var wrap = node("div", "code-wrap");
      if (pre.classList.contains("note-mermaid-code")) {
        // Keep mermaid hide/show working when wrapped
        pre.parentNode.insertBefore(wrap, pre);
        wrap.appendChild(pre);
        wrap.className = "code-wrap note-mermaid-code";
        pre.classList.remove("note-mermaid-code");
        var prevBtn = wrap.previousElementSibling;
        if (prevBtn && prevBtn.classList.contains("mermaid-toggle")) {
          prevBtn.onclick = null;
          var freshToggle = prevBtn.cloneNode(true);
          prevBtn.replaceWith(freshToggle);
          freshToggle.addEventListener("click", function () {
            var open = wrap.classList.toggle("is-open");
            freshToggle.textContent = open ? "收起 Mermaid 图稿源码" : "查看 Mermaid 图稿源码";
            freshToggle.setAttribute("aria-expanded", open ? "true" : "false");
          });
        }
      } else {
        pre.parentNode.insertBefore(wrap, pre);
        wrap.appendChild(pre);
      }
      var btn = node("button", "copy-btn", "复制");
      btn.type = "button";
      btn.addEventListener("click", function () { copyTextToClipboard(pre.textContent || "", btn, "复制"); });
      wrap.appendChild(btn);
    });
  }

  /* ---------- 原生 <dialog> 图片与 SVG 关系图灯箱 ---------- */

  function initLightbox(container) {
    var items = [];
    qsa(".paper-fig", container).forEach(function (fig) {
      var img = qs("img", fig);
      if (!img) return;
      var cap = qs("figcaption", fig);
      var capText = cap ? cap.textContent.trim() : (img.alt || "");
      var idx = items.length;
      items.push({ kind: "img", src: img.getAttribute("src"), alt: img.alt || "", caption: capText, el: fig });
      img.setAttribute("data-zoomable", "1");
      var parentLink = img.closest("a");
      var openThis = function (event) {
        event.preventDefault();
        openAt(idx, event.currentTarget);
      };
      if (parentLink) parentLink.addEventListener("click", openThis);
      else img.addEventListener("click", openThis);
      if (cap && !qs(".fig-zoom-btn", cap)) {
        var wrapper = node("span", "fig-caption-text");
        while (cap.firstChild) wrapper.appendChild(cap.firstChild);
        cap.appendChild(wrapper);
        var zbtn = node("button", "fig-zoom-btn", "放大查看");
        zbtn.type = "button";
        zbtn.addEventListener("click", function () { openAt(idx, zbtn); });
        cap.appendChild(zbtn);
      }
    });

    qsa(".hub-fig", container).forEach(function (hubFig) {
      var svg = qs("svg.hub-svg", hubFig);
      if (!svg) return;
      var noteEl = qs(".fig-note", hubFig);
      var titleEl = qs("title", svg);
      var capText = noteEl ? noteEl.textContent.trim() : (titleEl ? titleEl.textContent.trim() : "专题问题与方法地图");
      var idx = items.length;
      items.push({ kind: "svg", svg: svg, caption: capText, el: hubFig });
      if (!qs(".hub-fig-head", hubFig)) {
        var head = node("div", "hub-fig-head");
        head.appendChild(node("span", "", "关系图稿 · 点击节点可定位对应论文"));
        var zbtn = node("button", "fig-zoom-btn", "全屏放大");
        zbtn.type = "button";
        zbtn.addEventListener("click", function () { openAt(idx, zbtn); });
        head.appendChild(zbtn);
        hubFig.insertBefore(head, hubFig.firstChild);
      }
    });

    if (!items.length) return null;

    var dialog = null;
    var stage = null;
    var titleSpan = null;
    var captionBox = null;
    var prevBtn = null;
    var nextBtn = null;
    var bgBtn = null;
    var activeIdx = 0;
    var stageBg = "auto";
    var opener = null;

    function ensureDialog() {
      if (dialog) return;
      dialog = document.createElement("dialog");
      dialog.className = "fig-modal";
      var panel = node("div", "fig-modal-panel");
      var bar = node("div", "fig-modal-bar");
      titleSpan = node("span", "fig-modal-title", "");
      var actions = node("div", "fig-modal-actions");
      bgBtn = node("button", "", "底色: 纸白");
      bgBtn.type = "button";
      bgBtn.addEventListener("click", function () {
        var cur = stage.getAttribute("data-bg") || "light";
        var next = cur === "light" ? "dark" : "light";
        stageBg = next;
        stage.setAttribute("data-bg", next);
        bgBtn.textContent = next === "dark" ? "底色: 夜读" : "底色: 纸白";
      });
      prevBtn = node("button", "", "← 上一图");
      prevBtn.type = "button";
      prevBtn.addEventListener("click", function () { if (activeIdx > 0) renderItem(activeIdx - 1); });
      nextBtn = node("button", "", "下一图 →");
      nextBtn.type = "button";
      nextBtn.addEventListener("click", function () { if (activeIdx < items.length - 1) renderItem(activeIdx + 1); });
      var closeBtn = node("button", "", "关闭 ×");
      closeBtn.type = "button";
      closeBtn.addEventListener("click", function () { dialog.close(); });
      actions.appendChild(bgBtn);
      if (items.length > 1) {
        actions.appendChild(prevBtn);
        actions.appendChild(nextBtn);
      }
      actions.appendChild(closeBtn);
      bar.appendChild(titleSpan);
      bar.appendChild(actions);
      stage = node("div", "fig-modal-stage");
      captionBox = node("div", "fig-modal-caption");
      panel.appendChild(bar);
      panel.appendChild(stage);
      panel.appendChild(captionBox);
      dialog.appendChild(panel);
      document.body.appendChild(dialog);

      dialog.addEventListener("click", function (e) {
        if (e.target === dialog || e.target === stage) dialog.close();
      });
      dialog.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft" && activeIdx > 0) {
          e.preventDefault();
          renderItem(activeIdx - 1);
        } else if (e.key === "ArrowRight" && activeIdx < items.length - 1) {
          e.preventDefault();
          renderItem(activeIdx + 1);
        } else if (e.key.toLowerCase() === "b") {
          e.preventDefault();
          bgBtn.click();
        }
      });
      dialog.addEventListener("close", function () {
        if (opener && opener.focus) opener.focus();
      });
    }

    function renderItem(idx) {
      activeIdx = idx;
      var item = items[idx];
      titleSpan.textContent = "图解预览 " + (idx + 1) + " / " + items.length;
      if (prevBtn) prevBtn.disabled = idx === 0;
      if (nextBtn) nextBtn.disabled = idx === items.length - 1;
      var effectiveBg = stageBg === "auto"
        ? (item.kind === "svg" && isEffectiveDark() ? "dark" : "light")
        : stageBg;
      stage.setAttribute("data-bg", effectiveBg);
      bgBtn.textContent = effectiveBg === "dark" ? "底色: 夜读" : "底色: 纸白";
      stage.innerHTML = "";
      if (item.kind === "img") {
        var img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt;
        stage.appendChild(img);
      } else {
        var clone = item.svg.cloneNode(true);
        qsa("a.hs-link", clone).forEach(function (a) {
          a.addEventListener("click", function () { dialog.close(); });
        });
        stage.appendChild(clone);
      }
      captionBox.textContent = item.caption || "";
      captionBox.hidden = !item.caption;
    }

    function openAt(idx, trigger) {
      ensureDialog();
      opener = trigger || document.activeElement;
      stageBg = "auto";
      renderItem(idx);
      if (!dialog.open) dialog.showModal();
    }

    return {
      openNearest: function () {
        var best = 0;
        var bestDist = Infinity;
        items.forEach(function (item, idx) {
          var rect = item.el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) return;
          var dist = Math.abs(rect.top - 120);
          if (dist < bestDist) {
            bestDist = dist;
            best = idx;
          }
        });
        openAt(best, document.activeElement);
      }
    };
  }

  /* ---------- 可见性机制实时探索器 (渐进增强 .mechanism-reference[data-demo="visibility"]) ---------- */

  function initVisibilityDemos(container) {
    var controllers = [];
    qsa('.mechanism-reference[data-demo="visibility"]', container).forEach(function (box) {
      if (qs(".vis-explorer", box)) return;
      var total = parseInt(box.getAttribute("data-total") || "8", 10);
      var defTime = parseInt(box.getAttribute("data-time") || "6", 10);
      var defWin = parseInt(box.getAttribute("data-window") || "3", 10);
      var rows = qsa(".demo-scenarios tbody tr[data-train]", box);
      if (!rows.length || isNaN(total) || total < 1) return;

      var state = { rowIdx: 0, time: defTime, win: defWin };
      var explorer = node("div", "vis-explorer");
      var controls = node("div", "vis-controls");
      controls.appendChild(node("span", "", "点击上方任意场景行切换规则，或调节参数观察可见范围："));

      function makeStepper(label, getVal, setVal) {
        var group = node("span", "vis-step-group");
        group.appendChild(node("span", "", label));
        var minus = node("button", "vis-step-btn", "-");
        minus.type = "button";
        var valEl = node("span", "vis-value", String(getVal()));
        var plus = node("button", "vis-step-btn", "+");
        plus.type = "button";
        minus.addEventListener("click", function () { setVal(getVal() - 1); update(); });
        plus.addEventListener("click", function () { setVal(getVal() + 1); update(); });
        group.appendChild(minus);
        group.appendChild(valEl);
        group.appendChild(plus);
        return { el: group, minus: minus, plus: plus, valEl: valEl };
      }

      var tStep = makeStepper("当前到达 t =", function () { return state.time; }, function (v) {
        state.time = Math.min(total, Math.max(1, v));
      });
      var lStep = makeStepper("窗口容量 L =", function () { return state.win; }, function (v) {
        state.win = Math.min(total, Math.max(1, v));
      });
      var resetBtn = node("button", "vis-reset", "重置默认");
      resetBtn.type = "button";
      resetBtn.addEventListener("click", function () { reset(); });

      controls.appendChild(tStep.el);
      controls.appendChild(lStep.el);
      controls.appendChild(resetBtn);
      explorer.appendChild(controls);

      var strips = node("div", "vis-strips");
      var trainRow = node("div", "vis-strip-row");
      var trainLabel = node("span", "vis-strip-label", "训练可见");
      var trainTokens = node("div", "vis-tokens");
      trainRow.appendChild(trainLabel);
      trainRow.appendChild(trainTokens);

      var inferRow = node("div", "vis-strip-row");
      var inferLabel = node("span", "vis-strip-label", "部署可见");
      var inferTokens = node("div", "vis-tokens");
      inferRow.appendChild(inferLabel);
      inferRow.appendChild(inferTokens);

      strips.appendChild(trainRow);
      strips.appendChild(inferRow);
      explorer.appendChild(strips);

      var summary = node("p", "vis-summary", "");
      explorer.appendChild(summary);
      box.appendChild(explorer);

      rows.forEach(function (row, idx) {
        row.setAttribute("tabindex", "0");
        row.addEventListener("click", function () { state.rowIdx = idx; update(); });
        row.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            state.rowIdx = idx;
            update();
          }
        });
      });

      function isVisibleUnder(rule, i, t, win) {
        if (i > t) return false;
        if (rule === "prefix") return i >= 1;
        return i >= Math.max(1, t - win + 1);
      }

      function renderStrip(target, rule, otherRule) {
        target.innerHTML = "";
        for (var i = 1; i <= total; i += 1) {
          var vis = isVisibleUnder(rule, i, state.time, state.win);
          var otherVis = isVisibleUnder(otherRule, i, state.time, state.win);
          var cell = node("span", "vis-token", String(i));
          if (i > state.time) cell.classList.add("is-future");
          else if (vis && vis !== otherVis) cell.classList.add("is-mismatch");
          else if (vis) cell.classList.add("is-visible");
          if (i === state.time) cell.classList.add("is-current");
          cell.title = i > state.time ? "Token " + i + ": 未来尚未到达" : (vis ? "Token " + i + ": 可见" : "Token " + i + ": 已滑出窗口");
          target.appendChild(cell);
        }
      }

      function update() {
        rows.forEach(function (r, idx) { r.classList.toggle("is-selected", idx === state.rowIdx); });
        tStep.valEl.textContent = String(state.time);
        lStep.valEl.textContent = String(state.win);
        tStep.minus.disabled = state.time <= 1;
        tStep.plus.disabled = state.time >= total;
        lStep.minus.disabled = state.win <= 1;
        lStep.plus.disabled = state.win >= total;

        var activeRow = rows[state.rowIdx];
        var trainRule = activeRow.getAttribute("data-train") || "window";
        var inferRule = activeRow.getAttribute("data-infer") || "window";
        renderStrip(trainTokens, trainRule, inferRule);
        renderStrip(inferTokens, inferRule, trainRule);

        var futureNote = state.time < total ? "；token " + (state.time + 1) + "~" + total + " 尚未到达，双端均不可见。" : "；全部 8 个 token 均已到达。";
        if (trainRule === inferRule) {
          var startIdx = trainRule === "window" ? Math.max(1, state.time - state.win + 1) : 1;
          summary.textContent = "训练与部署规则对齐：均可见 token " + startIdx + "~" + state.time + futureNote;
        } else if (state.time <= state.win) {
          summary.textContent = "规则存在隐患（训练 " + trainRule + " vs 部署 " + inferRule + "），当前因 t ≤ L 碰巧都看到 token 1~" + state.time + "；把 t 调大到 " + (state.win + 1) + " 以上即可暴露分裂" + futureNote;
        } else {
          var mismatchEnd = state.time - state.win;
          summary.textContent = "训练与部署可见范围不一致：token 1~" + mismatchEnd + " 在一端可见而另一端被遮挡（高亮格），造成训练-推理分布漂移" + futureNote;
        }
      }

      function reset() {
        state.rowIdx = 0;
        state.time = defTime;
        state.win = defWin;
        update();
      }

      update();
      controllers.push({ reset: reset });
    });
    return controllers;
  }

  /* ---------- 专题导读页图谱联动与多列对比弹窗 ---------- */

  function initHubInteractions(deck) {
    var svg = qs(".hub-svg", deck);
    var compareTable = qs(".hub-compare", deck);
    if (svg) {
      qsa('a.hs-link[href*="#paper-"]', svg).forEach(function (link) {
        var href = link.getAttribute("href") || "";
        var m = href.match(/#paper-([a-z0-9-]+)/i);
        if (!m) return;
        var paperId = m[1];
        var step = document.getElementById("paper-" + paperId);
        var evoCards = qsa(".hub-evo-item", deck).filter(function (card) {
          var a = qs("h3 a", card);
          return a && (a.getAttribute("href") || "").indexOf(paperId + ".html") >= 0;
        });
        function setHi(on) {
          if (step) step.classList.toggle("is-linked-hi", on);
          evoCards.forEach(function (c) { c.classList.toggle("is-linked-hi", on); });
        }
        link.addEventListener("mouseenter", function () { setHi(true); });
        link.addEventListener("mouseleave", function () { setHi(false); });
        link.addEventListener("focus", function () { setHi(true); });
        link.addEventListener("blur", function () { setHi(false); });
      });
    }

    if (compareTable && !qs(".hub-compare-bar", compareTable.parentNode)) {
      var headers = qsa("thead th", compareTable);
      if (headers.length >= 3) {
        var bar = node("div", "hub-compare-bar");
        bar.appendChild(node("span", "", "可按列筛选任意两篇并排对照"));
        var openBtn = node("button", "fig-zoom-btn", "弹窗筛选对比");
        openBtn.type = "button";
        bar.appendChild(openBtn);
        compareTable.parentNode.insertBefore(bar, compareTable);

        var modal = null;
        openBtn.addEventListener("click", function () {
          if (!modal) modal = makeHubCompareDialog(compareTable);
          modal.open(openBtn);
        });
      }
    }
  }

  function makeHubCompareDialog(sourceTable) {
    var dialog = document.createElement("dialog");
    dialog.className = "reader-modal";
    var panel = node("div", "reader-modal-panel");
    var head = node("div", "reader-modal-head");
    var heading = node("div");
    heading.appendChild(node("h2", "", "关键维度筛选对比"));
    heading.appendChild(node("p", "modal-note", "点击下方论文名称切换显示列（至少保留两列），方便两两并排阅读。"));
    var close = node("button", "", "×");
    close.type = "button";
    close.setAttribute("aria-label", "关闭对比");
    head.appendChild(heading);
    head.appendChild(close);
    panel.appendChild(head);

    var filters = node("div", "modal-col-filters");
    var clonedTable = sourceTable.cloneNode(true);
    clonedTable.classList.remove("hub-compare");
    var ths = qsa("thead th", clonedTable);
    var activeCols = ths.map(function () { return true; });

    function syncCols() {
      var visibleCount = activeCols.slice(1).filter(Boolean).length;
      qsa("tr", clonedTable).forEach(function (tr) {
        var cells = qsa("th, td", tr);
        cells.forEach(function (cell, colIdx) {
          if (colIdx === 0) return;
          cell.hidden = !activeCols[colIdx];
        });
      });
      qsa(".modal-col-chip", filters).forEach(function (chip) {
        var idx = parseInt(chip.dataset.colIdx, 10);
        chip.setAttribute("aria-pressed", activeCols[idx] ? "true" : "false");
        chip.disabled = activeCols[idx] && visibleCount <= 2;
      });
    }

    ths.slice(1).forEach(function (th, idx) {
      var colIdx = idx + 1;
      var chip = node("button", "modal-col-chip", th.textContent.trim());
      chip.type = "button";
      chip.dataset.colIdx = String(colIdx);
      chip.setAttribute("aria-pressed", "true");
      chip.addEventListener("click", function () {
        activeCols[colIdx] = !activeCols[colIdx];
        syncCols();
      });
      filters.appendChild(chip);
    });

    panel.appendChild(filters);
    panel.appendChild(clonedTable);
    dialog.appendChild(panel);
    document.body.appendChild(dialog);

    var opener = null;
    close.addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("close", function () { if (opener && opener.focus) opener.focus(); });
    syncCols();

    return {
      open: function (trigger) {
        opener = trigger || document.activeElement;
        if (!dialog.open) dialog.showModal();
        close.focus();
      }
    };
  }

  /* ---------- 文章页 (论文速览 & 专题导读) ---------- */

  function setTopbar(page) {
    var home = qs(".topbar-home");
    var title = qs(".topbar-title");
    var count = qs(".topbar-count");
    var nav = qs(".topbar-nav");
    if (home) {
      home.textContent = "← 知识库";
      var from = fromQuery();
      home.href = "../index.html" + (from ? "?" + from : (isHub(page) ? "?topic=" + encodeURIComponent(page.topic) : ""));
    }
    if (title && page) title.textContent = isHub(page) ? page.title + " · 专题导读" : page.title;
    if (count) count.textContent = "连续阅读";
    if (!nav) return;
    while (nav.firstChild) nav.removeChild(nav.firstChild);
    var outlineLink = node("a", "topbar-link", "目录");
    outlineLink.href = "#reader-outline";
    nav.appendChild(outlineLink);
    if (isHub(page)) {
      var listLink = node("a", "topbar-link", "论文列表");
      listLink.href = "#path";
      nav.appendChild(listLink);
    }
    var recallLink = node("a", "topbar-link", "先回忆");
    recallLink.href = "#pitfalls";
    recallLink.dataset.action = "recall";
    nav.appendChild(recallLink);
    nav.appendChild(makeThemeButton());
    nav.appendChild(makeHelpButton("reader"));
  }

  function semanticSectionId(section, index, used) {
    if (section.dataset.section) return section.dataset.section;
    var heading = qs("h1, h2", section);
    var headingText = heading ? heading.textContent : "";
    if (index === 0) return "essence";
    if (qs(".qa-list", section)) return "pitfalls";
    if (qs(".link-groups", section)) return "relations";
    if (headingText.indexOf("一页看懂") >= 0) return "overview";
    if (headingText.indexOf("关键机制") >= 0) return used["mechanism"] ? "mechanism-2" : "mechanism";
    if (headingText.indexOf("数字") >= 0 || headingText.indexOf("结果") >= 0) return "evidence";
    return "section-" + (index + 1);
  }

  function buildOutline(deck) {
    var sections = qsa(".slide", deck).filter(function (section) { return section.parentNode === deck; });
    var outline = document.createElement("details");
    outline.className = "reader-outline";
    outline.id = "reader-outline";
    outline.open = !window.matchMedia("(max-width: 720px)").matches;
    outline.appendChild(node("summary", "", "本页目录"));
    var nav = document.createElement("nav");
    var used = {};
    sections.forEach(function (section, index) {
      var oldId = section.id || "";
      var stableId = semanticSectionId(section, index, used);
      used[stableId] = true;
      if (oldId && oldId !== stableId) {
        var legacy = node("span", "legacy-anchor");
        legacy.id = oldId;
        section.insertBefore(legacy, section.firstChild);
      }
      section.id = stableId;
      section.dataset.section = stableId;
      var heading = qs("h1, h2", section);
      var label = heading ? heading.textContent.trim() : "第 " + (index + 1) + " 节";
      if (index === 0) label = "核心直觉";
      var link = node("a", "", label);
      link.href = "#" + stableId;
      link.dataset.sectionLink = stableId;
      if (index === 0) link.setAttribute("aria-current", "true");
      nav.appendChild(link);
    });
    outline.appendChild(nav);
    if (window.matchMedia) {
      var mq = window.matchMedia("(max-width: 720px)");
      var syncOpen = function () { outline.open = !mq.matches; };
      if (mq.addEventListener) mq.addEventListener("change", syncOpen);
    }
    return { outline: outline, sections: sections };
  }

  function hubPosition(paperId) {
    var entry = HUB_BY_PAPER[paperId];
    if (!entry) return null;
    return { hub: entry.hub, role: entry.role, href: "../" + entry.hub.href + "#paper-" + paperId };
  }

  function appendHubEntry(container, page, basePrefix, className) {
    var position = page ? hubPosition(page.id) : null;
    if (!position) return null;
    var block = node("div", className || "context-hub");
    block.appendChild(node("span", "context-hub-kicker", "TOPIC"));
    var link = node("a", "context-hub-link", "在「" + position.hub.title + "」专题中的位置");
    link.href = withFrom((basePrefix || "../") + entryHref(position));
    block.appendChild(link);
    block.appendChild(node("span", "context-hub-role", position.role === "member" ? "主线论文" : "跨专题引用"));
    container.appendChild(block);
    return block;
  }

  function entryHref(position) {
    return position.hub.href + "#paper-" + position.href.split("#paper-")[1];
  }

  function buildContext(page, opts) {
    var options = opts || {};
    var isNoteView = !!options.isNoteView;
    var sitePrefix = isNoteView ? "../../" : "../";
    var context = node("aside", "reader-context");
    var hub = isHub(page);
    context.appendChild(node("p", "context-kicker", hub ? "TOPIC MEMBERS" : "CONTINUE READING"));
    context.appendChild(node("h2", "", hub ? "本专题收录的论文" : "为什么值得一起读"));

    if (hub) {
      var memberList = node("div", "context-rel-list");
      [["主线", page.members || []], ["跨专题引用", page.refs || []]].forEach(function (group) {
        group[1].forEach(function (id) {
          var target = getPage(id);
          if (!target) return;
          var item = node("div", "context-rel");
          var head = node("p", "context-rel-head");
          head.appendChild(node("span", "context-rel-type", group[0]));
          var link = node("a", "", target.title);
          link.href = withFrom(sitePrefix + (isNoteView ? target.noteHref : target.href));
          head.appendChild(link);
          if (!isNoteView) {
            var position = node("a", "context-rel-status", "本页位置");
            position.href = "#paper-" + id;
            head.appendChild(position);
          }
          item.appendChild(head);
          item.appendChild(node("p", "context-rel-reason", target.essence));
          memberList.appendChild(item);
        });
      });
      context.appendChild(memberList);
    } else {
      appendHubEntry(context, page, sitePrefix);
      if (page && page.relations && page.relations.length) {
        var list = node("div", "context-rel-list");
        page.relations.forEach(function (rel) {
          var target = getPage(rel.to);
          var item = node("div", "context-rel");
          var head = node("p", "context-rel-head");
          head.appendChild(node("span", "context-rel-type", rel.type));
          if (target) {
            var link = node("a", "", target.title);
            var targetPath = isNoteView
              ? sitePrefix + target.noteHref
              : (isHub(target) ? "../" + target.href : target.href.split("/").pop());
            link.href = withFrom(targetPath);
            head.appendChild(link);
          }
          var status = node("span", "context-rel-status", STATUS_LABEL[rel.status] || rel.status);
          if (rel.status === "hypothesis") status.classList.add("is-hypothesis");
          head.appendChild(status);
          item.appendChild(head);
          item.appendChild(node("p", "context-rel-reason", rel.reason));
          list.appendChild(item);
        });
        context.appendChild(list);
      }
    }

    if (page) {
      var review = node("div", "context-review");
      review.appendChild(node("strong", "", hub ? "专题复测状态" : "复测状态"));
      review.appendChild(node("span", "", reviewLabel(page)));
      if (hub) review.appendChild(node("span", "context-review-note", "成员通过不代表专题通过；本页练习不写入复测记录。"));
      context.appendChild(review);
    }

    if (isNoteView && page && page.href) {
      var speed = node("a", "context-action", hub ? "切换到专题导读页" : "切换到速览页");
      speed.href = withFrom("../../" + page.href);
      context.appendChild(speed);
    } else if (!isNoteView && page && page.noteHref) {
      var note = node("a", "context-action", hub ? "阅读完整专题笔记" : "阅读完整笔记");
      note.href = withFrom("../" + page.noteHref);
      context.appendChild(note);
    }
    var sourcePrefix = isNoteView ? "../../../" : "../../";
    var source = node("a", "context-action context-action-sub", "markdown 源文件");
    source.href = sourcePrefix + (page && page.sourceHref ? page.sourceHref : "wiki/papers/" + pageIdFromPath() + ".md");
    context.appendChild(source);

    if (!isNoteView && page && (page.id === "2026-u-opsd" || page.id === "2026-s2vopd")) {
      var compare = node("button", "compare-trigger", "并排比较 U-OPSD / S²VOPD");
      compare.type = "button";
      compare.dataset.action = "compare";
      context.appendChild(compare);
    }
    return context;
  }

  function buildMobileCoverAccess(deck, page) {
    var cover = qs(".cover", deck);
    if (!cover || !page) return;
    var insertionPoint = qs(".cover-meta", cover) || qs(".tagrow", cover);
    var takeaway = qs(".takeaway", deck);
    if (takeaway && !cover.contains(takeaway)) {
      var reminder = node("p", "mobile-cover-takeaway");
      reminder.innerHTML = takeaway.innerHTML;
      if (insertionPoint) cover.insertBefore(reminder, insertionPoint);
      else cover.appendChild(reminder);
    }

    var quick = node("div", "mobile-cover-links");
    quick.appendChild(node("span", "mobile-cover-kicker", "QUICK ACCESS"));
    if (page.noteHref) {
      var note = node("a", "mobile-cover-link", isHub(page) ? "完整专题笔记" : "完整笔记");
      note.href = withFrom("../" + page.noteHref);
      quick.appendChild(note);
    }
    var position = isHub(page) ? null : hubPosition(page.id);
    if (position) {
      var hubLink = node("a", "mobile-cover-link", "专题位置：" + position.hub.title);
      hubLink.href = withFrom(position.href);
      quick.appendChild(hubLink);
    }
    var relation = null;
    if (isHub(page)) relation = getPage((page.members || [])[0]);
    else if (page.relations && page.relations.length) relation = getPage(page.relations[0].to);
    if (page.id === "2026-u-opsd" || page.id === "2026-s2vopd") {
      var compare = node("button", "mobile-cover-link", "比较 U-OPSD / S²VOPD");
      compare.type = "button";
      compare.dataset.action = "compare";
      quick.appendChild(compare);
    } else if (relation) {
      var related = node("a", "mobile-cover-link", (isHub(page) ? "先读：" : "重点关联：") + relation.title);
      related.href = withFrom(isHub(page) ? "../" + relation.href : relation.href.split("/").pop());
      quick.appendChild(related);
    }
    if (insertionPoint) cover.insertBefore(quick, insertionPoint);
    else cover.appendChild(quick);

    var meta = qs(".cover-meta", cover);
    if (meta) {
      meta.classList.add("cover-meta-primary");
      var details = node("details", "mobile-cover-meta");
      details.appendChild(node("summary", "", "作者、日期与原文"));
      details.appendChild(meta.cloneNode(true));
      cover.appendChild(details);
    }
  }

  /* ---------- 回忆模式: 只见标题 -> 显示问题 -> 逐题展开解答 ---------- */

  function prepareRecall(deck, pageRoot, onToggleCallbacks) {
    var pitfalls = qs("#pitfalls", deck);
    if (!pitfalls) return null;
    var list = qs(".qa-list", pitfalls);
    if (!list) return null;
    var qas = qsa(".qa", list);
    if (!qas.length) return null;

    pageRoot.dataset.enhanced = "true";
    var bar = node("div", "reader-recall-bar");
    list.parentNode.insertBefore(bar, list);

    function setQaOpen(qa, open) {
      var button = qs(".qa-toggle", qa);
      qa.classList.toggle("is-open", open);
      if (button) {
        button.textContent = open ? "收起解答" : "查看解答";
        button.setAttribute("aria-expanded", open ? "true" : "false");
      }
    }

    qas.forEach(function (qa) {
      var answer = qs(".qa-a", qa);
      if (!answer) return;
      var toggle = node("button", "qa-toggle", "查看解答");
      toggle.type = "button";
      toggle.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      qa.insertBefore(toggle, answer);
      toggle.addEventListener("click", function () {
        setQaOpen(qa, !qa.classList.contains("is-open"));
      });
    });
    qas.forEach(function (qa) { setQaOpen(qa, true); });

    function renderBar(state) {
      while (bar.firstChild) bar.removeChild(bar.firstChild);
      bar.hidden = state === "off";
      if (state === "off") return;
      if (state === "titles") {
        bar.appendChild(node("span", "reader-recall-hint", "回忆模式：先凭记忆复述本篇的核心机制、边界和易错点，只看标题作答。"));
        var show = node("button", "", "显示检验问题");
        show.type = "button";
        show.addEventListener("click", function () {
          pageRoot.classList.add("show-questions");
          renderBar("questions");
          var top = qs("#pitfalls", deck);
          if (top) top.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
        });
        bar.appendChild(show);
      } else {
        bar.appendChild(node("span", "reader-recall-hint", "逐题先自己回答，再打开解答核对。这只是练习，不写入复测记录。"));
      }
      var exit = node("button", "", "结束回忆模式");
      exit.type = "button";
      exit.addEventListener("click", function () { exitRecall(); });
      bar.appendChild(exit);
    }

    function notifyReset() {
      (onToggleCallbacks || []).forEach(function (fn) { fn(); });
    }

    function enterRecall() {
      pageRoot.classList.add("reader-recall");
      pageRoot.classList.remove("show-questions");
      qas.forEach(function (qa) {
        setQaOpen(qa, false);
        var toggle = qs(".qa-toggle", qa);
        if (toggle) toggle.hidden = false;
      });
      notifyReset();
      renderBar("titles");
      syncRecallLinks(true);
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    }

    function exitRecall() {
      pageRoot.classList.remove("reader-recall", "show-questions");
      qas.forEach(function (qa) {
        setQaOpen(qa, true);
        var toggle = qs(".qa-toggle", qa);
        if (toggle) toggle.hidden = true;
      });
      notifyReset();
      renderBar("off");
      syncRecallLinks(false);
    }

    function syncRecallLinks(active) {
      var recallLink = qs('[data-action="recall"]');
      if (recallLink) recallLink.textContent = active ? "结束回忆" : "先回忆";
    }

    renderBar("off");
    return {
      enter: enterRecall,
      exit: exitRecall,
      isActive: function () { return pageRoot.classList.contains("reader-recall"); }
    };
  }

  /* ---------- 并排比较: U-OPSD / S²VOPD 精选弹窗 ---------- */

  var COMPARE_ROWS = [
    {
      dim: "教师额外知道什么",
      u: { text: "多数投票得到的完整解题轨迹 y+。label-only 消融掉 10.3~15.8：只给答案值无法引导中间步骤。", ref: "2026-u-opsd.html#qa-y-plus" },
      s: { text: "学生输入图的清晰版本。EMA 教师看原图，学生看降采样加噪图；教师冻结在基座也只掉 0.40。", ref: "2026-s2vopd.html#mechanism" }
    },
    {
      dim: "学生看到什么",
      u: { text: "题目 x 与错答前缀 y⁻<t，不见 y+；沿答错 rollout 逐 token 前向 KL。", ref: "2026-u-opsd.html#mechanism" },
      s: { text: "退化图与问题，自己在坏图上 rollout 8 条；教师在原图上对同一前缀打分。", ref: "2026-s2vopd.html#mechanism" }
    },
    {
      dim: "散度选择（论文实验）",
      u: { text: "必须 forward KL：reverse KL 复读塌缩（长度 2.7k 到 99k、丧失终止），JSD 掉 13.8。", ref: "2026-u-opsd.html#qa-fwd-kl" },
      s: { text: "JSD 76.05 最好，reverse KL 75.49 居中，forward KL 74.74 最差。", ref: "2026-s2vopd.html#qa-divergence" }
    },
    {
      dim: "不对称的来源",
      u: { text: "给教师加信息：伪解 y+ 拼进教师上下文（文本特权上下文）。", ref: "2026-u-opsd.html#essence" },
      s: { text: "从学生减信息：输入图退化（输入模态信息差）。", ref: "2026-s2vopd.html#essence" }
    },
    {
      dim: "统一解释（库内假说）",
      status: "hypothesis",
      u: { text: "教师多出的解题思路原则上可由学生自行推导（可恢复），覆盖式模仿方向正确。" },
      s: { text: "清晰像素的细节不可恢复，逼学生模仿不可及的细节有害，折中 JSD 最稳。" },
      note: "两篇排序颠倒是论文实验；「信息可恢复性」统一解释是库内综合假说，非任一原文结论，待 DistiLLM 系列验证。",
      ref: "../notes/papers/2026-s2vopd.html#open"
    }
  ];

  function makeCompareDialog(sameDocRef) {
    var dialog = document.createElement("dialog");
    dialog.className = "reader-modal";
    var panel = node("div", "reader-modal-panel");
    var head = node("div", "reader-modal-head");
    var heading = node("div");
    heading.appendChild(node("h2", "", "同一个问题，两种不对称来源"));
    heading.appendChild(node("p", "modal-note", "实验结论与解释假说分行标注；不把不同实验条件排成单一优劣榜。"));
    var close = node("button", "", "×");
    close.type = "button";
    close.setAttribute("aria-label", "关闭比较");
    head.appendChild(heading);
    head.appendChild(close);
    panel.appendChild(head);

    var table = node("table", "compare-table");
    var thead = node("thead");
    var tr = node("tr");
    ["维度", "U-OPSD", "S²VOPD"].forEach(function (label) { tr.appendChild(node("th", "", label)); });
    thead.appendChild(tr);
    table.appendChild(thead);
    var tbody = node("tbody");
    COMPARE_ROWS.forEach(function (row) {
      var rowEl = node("tr");
      if (row.status === "hypothesis") rowEl.classList.add("is-hypothesis");
      var dimCell = node("td", "compare-dim", row.dim);
      rowEl.appendChild(dimCell);
      [["u", "U-OPSD"], ["s", "S²VOPD"]].forEach(function (pair) {
        var cell = node("td");
        cell.dataset.col = pair[1];
        cell.appendChild(node("p", "", row[pair[0]].text));
        if (row[pair[0]].ref) {
          var ref = node("a", "compare-ref", "回依据");
          ref.href = row[pair[0]].ref;
          cell.appendChild(ref);
        }
        rowEl.appendChild(cell);
      });
      if (row.note) dimCell.appendChild(node("p", "compare-note", row.note));
      if (row.ref) {
        var rowRef = node("a", "compare-ref", "假说声明");
        rowRef.href = row.ref;
        dimCell.appendChild(rowRef);
      }
      tbody.appendChild(rowEl);
    });
    table.appendChild(tbody);
    panel.appendChild(table);
    dialog.appendChild(panel);
    document.body.appendChild(dialog);

    var opener = null;
    var pendingFocus = null;
    qsa("a.compare-ref", dialog).forEach(function (ref) {
      var resolved = new URL(ref.href, window.location.href);
      if (resolved.pathname !== window.location.pathname) {
        ref.href = withFrom(ref.getAttribute("href"));
      }
      ref.addEventListener("click", function (event) {
        if (!sameDocRef) return;
        var focusTarget = sameDocRef(ref);
        if (!focusTarget) return;
        event.preventDefault();
        pendingFocus = focusTarget === true ? null : focusTarget;
        dialog.close();
      });
    });
    close.addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", function () {
      var focusEl = pendingFocus || opener;
      pendingFocus = null;
      if (focusEl && focusEl.focus) focusEl.focus();
    });
    return {
      open: function (trigger) {
        opener = trigger || document.activeElement;
        if (!dialog.open) dialog.showModal();
        close.focus();
      }
    };
  }

  /* ---------- 阅读页键盘导航绑定 ---------- */

  function bindReaderShortcuts(sections, opts) {
    var options = opts || {};
    var lastGTime = 0;
    document.addEventListener("keydown", function (event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (qs("dialog[open]")) return;
      var active = document.activeElement;
      if (active && (/^(input|textarea|select)$/i.test(active.tagName) || active.isContentEditable)) return;
      var key = event.key;
      var lower = key.toLowerCase();

      if (key === "?") {
        event.preventDefault();
        openShortcutsModal("reader", active);
        return;
      }
      if (lower === "t") {
        event.preventDefault();
        cycleTheme();
        return;
      }
      if (lower === "r" && options.recall) {
        event.preventDefault();
        if (options.recall.isActive()) options.recall.exit();
        else options.recall.enter();
        return;
      }
      if (lower === "f" && options.lightbox) {
        event.preventDefault();
        options.lightbox.openNearest();
        return;
      }
      if (lower === "g") {
        var now = Date.now();
        if (now - lastGTime < 450) {
          event.preventDefault();
          lastGTime = 0;
          window.scrollTo({ top: 0, behavior: scrollBehavior() });
          return;
        }
        lastGTime = now;
        return;
      }
      lastGTime = 0;
      if ((lower === "j" || key === "]" || lower === "k" || key === "[") && sections && sections.length) {
        var visibleSections = sections.filter(function (s) { return s.offsetParent !== null; });
        if (!visibleSections.length) return;
        event.preventDefault();
        var forward = lower === "j" || key === "]";
        var threshold = 96;
        var curIdx = 0;
        visibleSections.forEach(function (sec, i) {
          if (sec.getBoundingClientRect().top <= threshold) curIdx = i;
        });
        var nextIdx = forward
          ? Math.min(visibleSections.length - 1, curIdx + 1)
          : Math.max(0, curIdx - 1);
        visibleSections[nextIdx].scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      }
    });
  }

  function enhanceReader() {
    var deck = qs(".deck");
    if (!deck) return;
    var pageRoot = qs(".page") || document.body;
    var page = getPage(pageIdFromPath());
    setTopbar(page);

    qsa(".tagrow .tag", deck).forEach(function (tag) {
      var id = resolveTag(tag.textContent.trim());
      if (!id) return;
      var link = node("a", "tag", tagLabel(id));
      link.href = "../index.html?tag=" + encodeURIComponent(id);
      link.title = "按这个标签查找更多页面";
      tag.replaceWith(link);
    });

    if (fromQuery()) {
      qsa("a[href]", deck).forEach(function (link) {
        var href = link.getAttribute("href") || "";
        if (isLocalReaderHtml(href)) link.href = withFrom(href);
      });
    }

    var built = buildOutline(deck);
    var context = buildContext(page, { isNoteView: false });
    buildMobileCoverAccess(deck, page);
    var layout = node("div", "reader-layout");
    deck.parentNode.insertBefore(layout, deck);
    layout.appendChild(built.outline);
    layout.appendChild(deck);
    layout.appendChild(context);

    var visDemos = initVisibilityDemos(deck);
    var resetCallbacks = visDemos.map(function (d) { return d.reset; });

    var recall = prepareRecall(deck, pageRoot, resetCallbacks);
    var recallLink = qs('[data-action="recall"]');
    if (recall && recallLink) {
      recallLink.addEventListener("click", function (event) {
        event.preventDefault();
        if (recall.isActive()) recall.exit();
        else recall.enter();
      });
    }

    initCopyAndMermaid(deck);
    var lightbox = initLightbox(deck);
    if (isHub(page)) initHubInteractions(deck);

    var compareButtons = qsa('[data-action="compare"]');
    if (compareButtons.length) {
      var comparison = makeCompareDialog(function (ref) {
        var resolved = new URL(ref.href, window.location.href);
        if (resolved.pathname !== window.location.pathname) return null;
        var id = resolved.hash.slice(1);
        var target = id ? document.getElementById(id) : null;
        if (!target) return null;
        var qa = target.closest ? target.closest(".qa") : null;
        if (qa) openQa(qa);
        var focusEl = (qa && recall && recall.isActive() && qs(".qa-toggle", qa)) || target;
        if (focusEl === target) target.setAttribute("tabindex", "-1");
        if (window.location.hash === "#" + id) openHashTarget();
        else window.location.hash = id;
        return focusEl;
      });
      compareButtons.forEach(function (compareButton) {
        compareButton.addEventListener("click", function () { comparison.open(compareButton); });
      });
    }

    var sectionLinks = qsa("[data-section-link]", built.outline);
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          sectionLinks.forEach(function (link) {
            link.setAttribute("aria-current", link.dataset.sectionLink === entry.target.dataset.section ? "true" : "false");
          });
        });
      }, { rootMargin: "-18% 0px -68% 0px", threshold: 0 });
      built.sections.forEach(function (section) { io.observe(section); });
    }

    bindScrollProgress();
    initBackToTop(qs(".cover", deck) || built.sections[0]);
    bindReaderShortcuts(built.sections, { recall: recall, lightbox: lightbox });

    function openQa(qa) {
      qa.classList.add("is-open");
      var button = qs(".qa-toggle", qa);
      if (button) {
        button.textContent = "收起解答";
        button.setAttribute("aria-expanded", "true");
      }
    }

    function openHashTarget() {
      if (!window.location.hash) return;
      var target = document.getElementById(window.location.hash.slice(1));
      if (!target) return;
      var qa = target.closest ? target.closest(".qa") : null;
      if (qa) openQa(qa);
      target.scrollIntoView({ block: "start", behavior: "auto" });
    }
    window.addEventListener("hashchange", openHashTarget);
    window.setTimeout(openHashTarget, 0);

    if (new URLSearchParams(window.location.search).get("recall") === "1" && recall) {
      window.setTimeout(function () { recall.enter(); }, 0);
    }
  }

  /* ---------- 首页 ---------- */

  function initIndex() {
    var results = qs(".idx-results");
    var filter = qs(".idx-filter");
    if (!results || !filter || !pages.length) return;
    var topicButtons = qsa("[data-topic]");
    var count = qs("#idx-count");
    var stateLabel = qs("#idx-state-label");
    var clear = qs("#idx-clear");
    var headerActions = qs("#idx-header-actions");
    var toolbar = qs("#idx-toolbar");
    var tagDrawer = qs("#idx-tag-drawer");
    var kbIndex = -1;

    if (headerActions) {
      headerActions.appendChild(makeThemeButton());
      headerActions.appendChild(makeHelpButton("index"));
    }

    // 专题按钮补充论文计数
    var topicCounts = { all: paperPages.length };
    paperPages.forEach(function (p) {
      topicCounts[p.topic] = (topicCounts[p.topic] || 0) + 1;
    });
    topicButtons.forEach(function (btn) {
      var id = btn.dataset.topic;
      var n = topicCounts[id] || 0;
      var baseText = btn.textContent.trim();
      btn.dataset.topicLabel = baseText;
      btn.textContent = "";
      btn.appendChild(node("span", "", baseText));
      btn.appendChild(node("span", "topic-count", String(n)));
    });

    // 统计标签计数并构建标签抽屉 + 排序切换栏
    var tagCounts = {};
    paperPages.forEach(function (p) {
      (p.tags || []).forEach(function (tid) { tagCounts[tid] = (tagCounts[tid] || 0) + 1; });
    });

    var drawerBtn = null;
    var sortButtons = [];
    if (toolbar && tagDrawer && taxonomy.length) {
      toolbar.hidden = false;
      var activeTags = taxonomy.filter(function (t) { return (tagCounts[t.id] || 0) > 0; });
      drawerBtn = node("button", "idx-tool-btn", "标签库 (" + activeTags.length + ") ▸");
      drawerBtn.type = "button";
      drawerBtn.setAttribute("aria-expanded", "false");
      drawerBtn.addEventListener("click", function () {
        var open = tagDrawer.hidden;
        tagDrawer.hidden = !open;
        drawerBtn.setAttribute("aria-expanded", open ? "true" : "false");
        drawerBtn.textContent = "标签库 (" + activeTags.length + ") " + (open ? "▾" : "▸");
      });
      toolbar.appendChild(drawerBtn);

      var sortGroup = node("div", "idx-sort-group");
      sortGroup.appendChild(node("span", "idx-sort-label", "排序:"));
      [
        ["default", "入库序"],
        ["review", "复测优先"],
        ["newest", "最新入库"]
      ].forEach(function (pair) {
        var sbtn = node("button", "idx-sort-btn", pair[1]);
        sbtn.type = "button";
        sbtn.dataset.sort = pair[0];
        sbtn.setAttribute("aria-pressed", pair[0] === "default" ? "true" : "false");
        sbtn.addEventListener("click", function () {
          var st = readState();
          st.sort = pair[0] === "default" ? "" : pair[0];
          writeState(st, "push");
        });
        sortButtons.push(sbtn);
        sortGroup.appendChild(sbtn);
      });
      toolbar.appendChild(sortGroup);

      [
        ["mechanism", "机制"],
        ["goal", "目标"]
      ].forEach(function (dimPair) {
        var dimTags = activeTags.filter(function (t) { return t.dim === dimPair[0]; });
        if (!dimTags.length) return;
        var group = node("div", "idx-tag-group");
        group.appendChild(node("span", "idx-tag-group-label", dimPair[1]));
        var list = node("div", "idx-tag-list");
        dimTags.forEach(function (t) {
          var b = node("button", "idx-tag");
          b.type = "button";
          b.dataset.tag = t.id;
          b.appendChild(node("span", "", t.label));
          b.appendChild(node("span", "tag-count", String(tagCounts[t.id] || 0)));
          list.appendChild(b);
        });
        group.appendChild(list);
        tagDrawer.appendChild(group);
      });

      tagDrawer.addEventListener("click", function (event) {
        var tagBtn = event.target.closest ? event.target.closest("[data-tag]") : null;
        if (!tagBtn) return;
        var st = readState();
        st.tag = st.tag === tagBtn.dataset.tag ? "" : tagBtn.dataset.tag;
        writeState(st, "push");
      });
    }

    initBackToTop(qs(".idx-header"));

    function readState() {
      var params = new URLSearchParams(window.location.search);
      return {
        q: params.get("q") || "",
        topic: params.get("topic") || "all",
        tag: resolveTag(params.get("tag") || "") || "",
        review: params.get("review") || "",
        sort: params.get("sort") || ""
      };
    }

    function stateQuery(state) {
      var params = new URLSearchParams();
      if (state.q) params.set("q", state.q);
      if (state.topic && state.topic !== "all") params.set("topic", state.topic);
      if (state.tag) params.set("tag", state.tag);
      if (state.review) params.set("review", state.review);
      if (state.sort && state.sort !== "default") params.set("sort", state.sort);
      return params.toString();
    }

    function writeState(next, mode) {
      kbIndex = -1;
      var query = stateQuery(next);
      var url = window.location.pathname + (query ? "?" + query : "");
      window.history[mode === "push" ? "pushState" : "replaceState"]({}, "", url);
      render();
    }

    function fromParam(state) {
      var query = stateQuery(state);
      return query ? encodeURIComponent(query) : "";
    }

    function cardHref(target, state, recallOn) {
      var params = [];
      if (recallOn) params.push("recall=1");
      var from = fromParam(state);
      if (from) params.push("from=" + from);
      return addQuery(target, params.join("&"));
    }

    function appendHits(card, page, tokens, state, limit) {
      rankEntries(matchingEntries(page, tokens), tokens).slice(0, limit).forEach(function (entry) {
        var snippet = snippetAround(entry.t, tokens);
        var hit = node("a", "idx-hit");
        hit.href = cardHref(entry.a, state, false);
        hit.innerHTML = "<strong>命中 " + escapeHtml(entry.h) + "</strong>" +
          (snippet.exact ? highlight(snippet.text, tokens) : escapeHtml(snippet.text));
        card.appendChild(hit);
      });
    }

    function hubCard(hub, state, recallOn, tokens, compact) {
      var card = node("article", "idx-card idx-hub" + (compact ? " idx-hub-compact" : ""));
      card.appendChild(node("p", "idx-hub-kicker", "专题导读"));
      var link = node("a", "idx-card-title", hub.title);
      link.href = cardHref(hub.href, state, recallOn);
      card.appendChild(link);
      var members = (hub.members || []).length;
      var refs = (hub.refs || []).length;
      var meta = node("p", "idx-card-meta");
      meta.appendChild(node("span", "", (topics[hub.topic] || "") + "  ·  主线 " + members + " 篇" +
        (refs ? "  ·  跨专题引用 " + refs + " 篇  ·  " : "  ·  ")));
      meta.appendChild(reviewBadge(hub));
      card.appendChild(meta);
      var essence = node("p", "idx-card-essence");
      essence.innerHTML = tokens.length ? highlight(hub.essence, tokens) : escapeHtml(hub.essence);
      card.appendChild(essence);
      if (!compact) {
        var actions = node("p", "idx-hub-actions");
        var view = node("a", "idx-hub-action", "查看关系与演进");
        view.href = cardHref(hub.href + "#map", state, false);
        actions.appendChild(view);
        var path = node("a", "idx-hub-action", "带着问题读论文");
        path.href = cardHref(hub.href + "#path", state, false);
        actions.appendChild(path);
        var note = node("a", "idx-hub-action idx-hub-action-sub", "完整专题笔记");
        note.href = cardHref(hub.noteHref, state, false);
        actions.appendChild(note);
        card.appendChild(actions);
      }
      appendHits(card, hub, tokens, state, compact ? 1 : 2);
      return card;
    }

    function syncKbSelection() {
      var cards = qsa(".idx-card", results);
      cards.forEach(function (c, i) { c.classList.toggle("is-kb-active", i === kbIndex); });
      if (kbIndex >= 0 && cards[kbIndex]) {
        cards[kbIndex].scrollIntoView({ block: "nearest", behavior: scrollBehavior() });
      }
    }

    function render() {
      var state = readState();
      filter.value = state.q;
      topicButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", button.dataset.topic === state.topic ? "true" : "false");
      });
      var effectiveSort = state.review === "due" ? "review" : (state.sort || "default");
      sortButtons.forEach(function (sbtn) {
        sbtn.setAttribute("aria-pressed", sbtn.dataset.sort === effectiveSort ? "true" : "false");
      });
      if (tagDrawer) {
        qsa("[data-tag]", tagDrawer).forEach(function (b) {
          b.classList.toggle("is-active", b.dataset.tag === state.tag);
        });
      }

      var tokens = tokensFor(state.q);
      var recallOn = document.documentElement.classList.contains("idx-recall");
      function matches(page) {
        if (state.topic !== "all" && page.topic !== state.topic) return false;
        if (state.tag && page.tags.indexOf(state.tag) < 0) return false;
        if (state.review === "due" && !reviewDue(page)) return false;
        return tokens.every(function (token) { return pageCorpus(page).indexOf(token) >= 0; });
      }
      var filtered = paperPages.filter(matches);
      var matchedHubs = hubPages.filter(matches);
      if (tokens.length) {
        filtered.sort(function (a, b) { return scorePage(b, tokens) - scorePage(a, tokens); });
        matchedHubs.sort(function (a, b) { return scorePage(b, tokens) - scorePage(a, tokens); });
      } else if (effectiveSort === "review") {
        filtered.sort(compareReviewPriority);
        matchedHubs.sort(compareReviewPriority);
      } else if (effectiveSort === "newest") {
        filtered.sort(function (a, b) { return a.date < b.date ? 1 : (a.date > b.date ? -1 : 0); });
      }

      results.innerHTML = "";
      var heading = node("div", "idx-result-heading");
      heading.appendChild(node("h2", "", state.tag ? "标签筛选：" + tagLabel(state.tag) : "按研究问题阅读"));
      heading.appendChild(node("span", "", filtered.length + " / " + paperPages.length + " 篇论文" +
        (matchedHubs.length ? "  ·  专题导读 " + matchedHubs.length + " / " + hubPages.length : "")));
      results.appendChild(heading);

      if (!tokens.length && matchedHubs.length) {
        var hubBlock = node("div", "idx-hub-list" + (state.topic !== "all" ? " is-focus" : ""));
        matchedHubs.forEach(function (hub) {
          hubBlock.appendChild(hubCard(hub, state, recallOn, tokens, state.topic === "all"));
        });
        results.appendChild(hubBlock);
      }

      filtered.forEach(function (page) {
        var card = node("article", "idx-card");
        var link = node("a", "idx-card-title", page.title);
        link.href = cardHref(page.href, state, recallOn);
        card.appendChild(link);
        var meta = node("p", "idx-card-meta");
        meta.appendChild(node("span", "", (topics[page.topic] || "") + "  ·  " + page.date + "  ·  "));
        meta.appendChild(reviewBadge(page));
        card.appendChild(meta);
        var essence = node("p", "idx-card-essence");
        essence.innerHTML = tokens.length ? highlight(page.essence, tokens) : escapeHtml(page.essence);
        card.appendChild(essence);
        var tags = node("div", "idx-card-tags");
        page.tags.slice(0, 4).forEach(function (id) {
          var button = node("button", "idx-tag" + (state.tag === id ? " is-active" : ""), tagLabel(id));
          button.type = "button";
          button.dataset.tag = id;
          tags.appendChild(button);
        });
        card.appendChild(tags);
        appendHits(card, page, tokens, state, 2);
        results.appendChild(card);
      });

      if (tokens.length && matchedHubs.length) {
        var hubResults = node("div", "idx-hub-list is-search");
        matchedHubs.forEach(function (hub) {
          hubResults.appendChild(hubCard(hub, state, recallOn, tokens, true));
        });
        results.appendChild(hubResults);
      }

      if (!filtered.length && !matchedHubs.length) {
        var empty = node("div", "idx-empty");
        empty.textContent = "没有找到符合当前条件的页面。试试删掉一个关键词，或清除筛选。";
        results.appendChild(empty);
      }
      if (count) {
        count.textContent = filtered.length + " 篇论文" + (matchedHubs.length ? " · " + matchedHubs.length + " 篇专题导读" : "");
      }
      if (stateLabel) {
        var labels = [];
        if (state.q) labels.push("搜索: " + state.q);
        if (state.topic !== "all") {
          var activeTopic = topicButtons.filter(function (button) { return button.dataset.topic === state.topic; })[0];
          if (activeTopic) labels.push(activeTopic.dataset.topicLabel || activeTopic.textContent);
        }
        if (state.tag) labels.push("标签: " + tagLabel(state.tag));
        if (state.review === "due") labels.push("今天待复测");
        else if (state.sort === "review") labels.push("按复测优先");
        else if (state.sort === "newest") labels.push("按最新入库");
        stateLabel.textContent = labels.join("  /  ");
      }
      if (clear) clear.hidden = !(state.q || state.topic !== "all" || state.tag || state.review || state.sort);
      syncKbSelection();
    }

    filter.addEventListener("input", function () {
      var state = readState();
      state.q = filter.value;
      writeState(state, "replace");
    });
    topicButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var state = readState();
        state.topic = button.dataset.topic;
        state.review = "";
        writeState(state, "push");
      });
    });
    results.addEventListener("click", function (event) {
      var tag = event.target.closest ? event.target.closest("[data-tag]") : null;
      if (!tag) return;
      var state = readState();
      state.tag = state.tag === tag.dataset.tag ? "" : tag.dataset.tag;
      writeState(state, "push");
    });
    if (clear) clear.addEventListener("click", function () { writeState({ q: "", topic: "all", tag: "", review: "", sort: "" }, "push"); });

    var recallToggles = qsa(".idx-recall-toggle");
    function toggleIndexRecall() {
      var on = document.documentElement.classList.toggle("idx-recall");
      recallToggles.forEach(function (item) {
        item.textContent = on ? "结束回忆模式" : "先回忆";
        item.setAttribute("aria-pressed", on ? "true" : "false");
      });
      render();
    }
    recallToggles.forEach(function (toggle) {
      toggle.addEventListener("click", toggleIndexRecall);
    });

    var dueCount = pages.filter(reviewDue).length;
    if (dueCount) {
      var desktopDue = qs("#idx-due-entry");
      if (desktopDue) desktopDue.hidden = false;
      qsa("a.idx-due-link").forEach(function (link) {
        link.hidden = false;
        link.textContent = "今天待复测（" + dueCount + " 篇）";
        link.addEventListener("click", function (event) {
          event.preventDefault();
          writeState({ q: "", topic: "all", tag: "", review: "due", sort: "" }, "push");
        });
      });
    }

    document.addEventListener("keydown", function (event) {
      if (qs("dialog[open]")) return;
      var active = document.activeElement;
      var typing = active && (/^(input|textarea|select)$/i.test(active.tagName) || active.isContentEditable);
      var key = event.key;
      var lower = key.toLowerCase();

      if ((key === "/" && !typing) || ((event.metaKey || event.ctrlKey) && lower === "k")) {
        event.preventDefault();
        filter.focus();
        filter.select();
        return;
      }
      if (key === "Escape") {
        if (active === filter && filter.value) {
          event.preventDefault();
          var state = readState();
          state.q = "";
          filter.value = "";
          writeState(state, "replace");
        } else if (active === filter) {
          event.preventDefault();
          filter.blur();
          kbIndex = -1;
          syncKbSelection();
        } else if (kbIndex >= 0) {
          event.preventDefault();
          kbIndex = -1;
          syncKbSelection();
        }
        return;
      }
      if (key === "ArrowDown" || key === "ArrowUp") {
        var cards = qsa(".idx-card", results);
        if (!cards.length) return;
        event.preventDefault();
        if (key === "ArrowDown") kbIndex = Math.min(cards.length - 1, kbIndex + 1);
        else kbIndex = Math.max(0, kbIndex <= 0 ? 0 : kbIndex - 1);
        syncKbSelection();
        return;
      }
      if (key === "Enter" && kbIndex >= 0) {
        var allCards = qsa(".idx-card", results);
        var activeCard = allCards[kbIndex];
        var titleLink = activeCard ? qs(".idx-card-title", activeCard) : null;
        if (titleLink) {
          event.preventDefault();
          window.location.href = titleLink.href;
          return;
        }
      }
      if (!typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        if (key === "?") {
          event.preventDefault();
          openShortcutsModal("index", active);
        } else if (lower === "t") {
          event.preventDefault();
          cycleTheme();
        } else if (lower === "r") {
          event.preventDefault();
          toggleIndexRecall();
        }
      }
    });
    window.addEventListener("popstate", render);
    render();
  }

  /* ---------- 完整笔记页：桌面三栏对齐、目录跟随、复制与精确命中定位 ---------- */

  function topbarOffset() {
    var raw = getComputedStyle(document.documentElement).getPropertyValue("--topbar-h");
    var height = parseFloat(raw);
    return (isNaN(height) ? 0 : height) + 24;
  }

  function contentBlocks(section) {
    var selector = "p, li, blockquote, pre, h1, h2, h3, h4, dt, dd, td, th, caption, figcaption, .qa-q";
    var blocks = qsa(selector, section).filter(function (el) { return !el.querySelector(selector); });
    return blocks.length ? blocks : [section];
  }

  function textNodesOf(container) {
    var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    var total = 0;
    while (walker.nextNode()) {
      nodes.push({ node: walker.currentNode, start: total });
      total += walker.currentNode.nodeValue.length;
    }
    return nodes;
  }

  function normIndex(raw) {
    var text = "";
    var map = [];
    var pendingSpace = false;
    for (var i = 0; i < raw.length; i += 1) {
      var ch = raw.charAt(i);
      if (/\s/.test(ch)) {
        pendingSpace = true;
        continue;
      }
      if (pendingSpace && text.length) {
        text += " ";
        map.push(-1);
      }
      text += ch.toLocaleLowerCase();
      map.push(i);
      pendingSpace = false;
    }
    return { text: text, map: map };
  }

  function pointAt(nodes, rawIdx) {
    for (var i = 0; i < nodes.length; i += 1) {
      var len = nodes[i].node.nodeValue.length;
      if (rawIdx < nodes[i].start + len) return { node: nodes[i].node, offset: rawIdx - nodes[i].start };
    }
    var last = nodes[nodes.length - 1];
    return { node: last.node, offset: last.node.nodeValue.length };
  }

  function locateHitRange(section, tokens) {
    var datas = [];
    contentBlocks(section).forEach(function (block) {
      var nodes = textNodesOf(block);
      if (nodes.length) datas.push({ nodes: nodes, idx: normIndex(block.textContent) });
    });

    function rangeOf(data, sel) {
      var from = data.idx.map[sel.start];
      var to = data.idx.map[sel.end - 1] + 1;
      if (from < 0 || to <= from) return null;
      var head = pointAt(data.nodes, from);
      var tail = pointAt(data.nodes, to);
      var range = document.createRange();
      try {
        range.setStart(head.node, head.offset);
        range.setEnd(tail.node, tail.offset);
      } catch (error) {
        return null;
      }
      return range;
    }

    var phrase = tokens.join(" ");
    var i, data, at, range;

    for (i = 0; i < datas.length; i += 1) {
      data = datas[i];
      at = data.idx.text.indexOf(phrase);
      if (at >= 0) {
        range = rangeOf(data, { start: at, end: at + phrase.length });
        if (range) return range;
      }
    }

    if (tokens.length > 1) {
      var best = null;
      for (i = 0; i < datas.length; i += 1) {
        data = datas[i];
        var win = coveringWindow(data.idx.text, tokens);
        if (win && win.span <= 600 && (!best || win.span < best.span)) best = { data: data, win: win };
      }
      if (best) {
        range = rangeOf(best.data, best.win);
        if (range) return range;
      }
    }

    for (i = 0; i < datas.length; i += 1) {
      data = datas[i];
      for (var t = 0; t < tokens.length; t += 1) {
        at = data.idx.text.indexOf(tokens[t]);
        if (at >= 0) {
          range = rangeOf(data, { start: at, end: at + tokens[t].length });
          if (range) return range;
        }
      }
    }
    return null;
  }

  function locateHitText() {
    if (!window.location.hash) return;
    var from = new URLSearchParams(window.location.search).get("from") || "";
    var q = from ? (new URLSearchParams(from).get("q") || "") : "";
    var tokens = tokensFor(q);
    if (!tokens.length) return;
    var section = document.getElementById(window.location.hash.slice(1));
    if (!section) return;
    var hit = locateHitRange(section, tokens);
    if (!hit) return;
    var offset = topbarOffset();
    var viewport = window.innerHeight;
    var rect = hit.getBoundingClientRect();
    var matchTop = rect.top + window.scrollY;
    var heading = null;
    var headingTop = -Infinity;
    qsa("h2, h3, .qa-q", section).forEach(function (candidate) {
      var top = candidate.getBoundingClientRect().top + window.scrollY;
      if (top <= matchTop + 1 && top > headingTop) {
        heading = candidate;
        headingTop = top;
      }
    });
    var targetTop = matchTop;
    if (heading && matchTop - headingTop <= viewport * 0.7) targetTop = headingTop;
    window.scrollTo({ top: Math.max(0, targetTop - offset), behavior: "auto" });
  }

  function buildNoteOutline(noteWrap) {
    var sections = qsa(".note-sec", noteWrap);
    var outline = document.createElement("details");
    outline.className = "reader-outline";
    outline.id = "reader-outline";
    outline.open = !window.matchMedia("(max-width: 720px)").matches;
    outline.appendChild(node("summary", "", "本页目录"));
    var nav = document.createElement("nav");
    sections.forEach(function (sec, idx) {
      var id = sec.id;
      if (!id) return;
      var h2 = qs("h2", sec);
      var link = node("a", "", h2 ? h2.textContent.trim() : id);
      link.href = "#" + id;
      link.dataset.sectionLink = id;
      if (idx === 0) link.setAttribute("aria-current", "true");
      nav.appendChild(link);
    });
    outline.appendChild(nav);
    if (window.matchMedia) {
      var mq = window.matchMedia("(max-width: 720px)");
      var syncOpen = function () { outline.open = !mq.matches; };
      if (mq.addEventListener) mq.addEventListener("change", syncOpen);
    }
    return { outline: outline, sections: sections };
  }

  function initNote() {
    var noteWrap = qs(".note-wrap");
    if (!noteWrap) return;
    noteWrap.dataset.enhanced = "true";
    var page = getPage(pageIdFromPath());
    var from = fromQuery();

    var topbarNav = qs(".topbar-nav");
    if (topbarNav) {
      var outlineJump = node("a", "topbar-link", "目录");
      outlineJump.href = "#reader-outline";
      topbarNav.insertBefore(outlineJump, topbarNav.firstChild);
      topbarNav.appendChild(makeThemeButton());
      topbarNav.appendChild(makeHelpButton("reader"));
    }

    if (from) {
      var home = qs(".topbar-home");
      if (home) home.href = addQuery("../../index.html", from);
      qsa(".topbar-nav a, .note-foot a").forEach(function (link) {
        var href = link.getAttribute("href") || "";
        if (href.indexOf("../../papers/") < 0 && href.indexOf("../../topics/") < 0) return;
        link.href = addQuery(href, "from=" + encodeURIComponent(from));
      });
      qsa("a[href]", noteWrap).forEach(function (link) {
        var href = link.getAttribute("href") || "";
        if (isLocalReaderHtml(href)) link.href = withFrom(href);
      });
    }

    // 桌面三栏对齐：左侧常驻章节目录 + 中栏完整正文 + 右侧上下文旁栏
    var built = buildNoteOutline(noteWrap);
    var context = buildContext(page, { isNoteView: true });
    var layout = node("div", "note-layout");
    noteWrap.parentNode.insertBefore(layout, noteWrap);
    layout.appendChild(built.outline);
    layout.appendChild(noteWrap);
    layout.appendChild(context);

    var sectionLinks = qsa("[data-section-link]", built.outline);
    if ("IntersectionObserver" in window && built.sections.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          sectionLinks.forEach(function (link) {
            link.setAttribute("aria-current", link.dataset.sectionLink === entry.target.id ? "true" : "false");
          });
        });
      }, { rootMargin: "-18% 0px -68% 0px", threshold: 0 });
      built.sections.forEach(function (sec) { io.observe(sec); });
    }

    initCopyAndMermaid(noteWrap);
    initVisibilityDemos(noteWrap);
    var lightbox = initLightbox(noteWrap);
    bindScrollProgress();
    initBackToTop(qs(".note-header", noteWrap) || built.sections[0]);
    bindReaderShortcuts(built.sections, { recall: null, lightbox: lightbox });

    if (document.readyState === "complete") window.setTimeout(locateHitText, 0);
    else window.addEventListener("load", function () { window.setTimeout(locateHitText, 0); });
  }

  if (qs(".deck")) enhanceReader();
  if (qs(".idx-results")) initIndex();
  if (qs(".note-wrap")) initNote();
})();
