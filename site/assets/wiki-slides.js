/*
 * llm-wiki 阅读层
 * 纯静态、无依赖。文章页：连续阅读、语义目录、回忆模式、并排比较；
 * 首页：专题与标签筛选、全文条目搜索（片段来自真实命中文本）。
 * 数据来自 site/assets/wiki-index.js（真源为 wiki markdown 与 review.md 的投影）。
 */
(function () {
  "use strict";

  var pages = window.WIKI_INDEX || [];
  var taxonomy = window.WIKI_TAXONOMY || [];
  var topics = window.WIKI_TOPICS || {};
  var TAGS_BY_ID = {};
  taxonomy.forEach(function (tag) { TAGS_BY_ID[tag.id] = tag; });

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

  function highlight(value, tokens) {
    var html = escapeHtml(value);
    tokens.forEach(function (token) {
      if (!token) return;
      var pattern = new RegExp("(" + escapeRegExp(token) + ")", "gi");
      html = html.replace(pattern, "<mark>$1</mark>");
    });
    return html;
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
    var head;
    if (!review.count) head = "待首测";
    else if (review.result === "pass") head = "已通过";
    else head = "上次复测见 review.md";
    return (due ? "今天到期 · " : "") + head + " · 下次 " + review.next;
  }

  function reviewDue(page) {
    return !!(page.review && page.review.next && page.review.next <= todayCN());
  }

  var STATUS_LABEL = { reported: "论文记录", synthesis: "库内综合", hypothesis: "待验证假说" };

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

  function snippetAround(text, tokens) {
    var lower = text.toLocaleLowerCase();
    var at = -1;
    for (var i = 0; i < tokens.length; i += 1) {
      at = lower.indexOf(tokens[i]);
      if (at >= 0) break;
    }
    if (at < 0) return { text: text.slice(0, 110), exact: false };
    var start = Math.max(0, at - 36);
    var end = Math.min(text.length, at + 110);
    var clip = (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
    return { text: clip, exact: true };
  }

  /* ---------- 文章页 ---------- */

  function pageIdFromPath() {
    var file = window.location.pathname.split("/").pop() || "";
    return file.replace(/\.html$/, "");
  }

  function getPage(id) {
    return pages.filter(function (item) { return item.id === id; })[0];
  }

  function fromQuery() {
    var params = new URLSearchParams(window.location.search);
    var from = params.get("from") || "";
    if (!from || !/^[a-zA-Z0-9=%&_.\-]+$/.test(from)) return "";
    return from;
  }

  function setTopbar(page) {
    var home = qs(".topbar-home");
    var title = qs(".topbar-title");
    var count = qs(".topbar-count");
    var nav = qs(".topbar-nav");
    if (home) {
      home.textContent = "← 知识库";
      home.href = "../index.html" + (fromQuery() ? "?" + fromQuery() : "");
    }
    if (title && page) title.textContent = page.title;
    if (count) count.textContent = "连续阅读";
    if (!nav) return;
    while (nav.firstChild) nav.removeChild(nav.firstChild);
    var outlineLink = node("a", "topbar-link", "目录");
    outlineLink.href = "#reader-outline";
    nav.appendChild(outlineLink);
    var recallLink = node("a", "topbar-link", "先回忆");
    recallLink.href = "#pitfalls";
    recallLink.dataset.action = "recall";
    nav.appendChild(recallLink);
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

  function buildContext(deck, page) {
    var context = node("aside", "reader-context");
    context.appendChild(node("p", "context-kicker", "CONTINUE READING"));
    context.appendChild(node("h2", "", "为什么值得一起读"));

    if (page && page.relations && page.relations.length) {
      var list = node("div", "context-rel-list");
      page.relations.forEach(function (rel) {
        var target = getPage(rel.to);
        var item = node("div", "context-rel");
        var head = node("p", "context-rel-head");
        var typeLabel = node("span", "context-rel-type", rel.type);
        head.appendChild(typeLabel);
        if (target) {
          var link = node("a", "", target.title);
          link.href = target.href.split("/").pop();
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

    if (page) {
      var review = node("div", "context-review");
      review.appendChild(node("strong", "", "复测状态"));
      review.appendChild(node("span", "", reviewLabel(page)));
      context.appendChild(review);
    }

    if (page && page.noteHref) {
      var note = node("a", "context-action", "阅读完整笔记");
      note.href = "../" + page.noteHref;
      context.appendChild(note);
    }
    var source = node("a", "context-action context-action-sub", "markdown 源文件");
    source.href = "../../wiki/papers/" + (page ? page.id : pageIdFromPath()) + ".md";
    context.appendChild(source);

    if (page && (page.id === "2026-u-opsd" || page.id === "2026-s2vopd")) {
      var compare = node("button", "compare-trigger", "并排比较 U-OPSD / S²VOPD");
      compare.type = "button";
      compare.dataset.action = "compare";
      context.appendChild(compare);
    }
    return context;
  }

  /* ---------- 回忆模式: 只见标题 -> 显示问题 -> 逐题展开解答 ---------- */

  function prepareRecall(deck, pageRoot) {
    var pitfalls = qs("#pitfalls", deck);
    if (!pitfalls) return null;
    var list = qs(".qa-list", pitfalls);
    if (!list) return null;
    var qas = qsa(".qa", list);
    if (!qas.length) return null;

    pageRoot.dataset.enhanced = "true";
    var bar = node("div", "reader-recall-bar");
    var hint = node("span", "reader-recall-hint", "先凭记忆回答，再逐题打开解答。页面不会记录掌握状态。");
    bar.appendChild(hint);
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
      toggle.setAttribute("aria-expanded", "false");
      qa.insertBefore(toggle, answer);
      toggle.addEventListener("click", function () {
        setQaOpen(qa, !qa.classList.contains("is-open"));
      });
    });
    setQaOpen(qas[0], true);

    function renderBar(state) {
      while (bar.firstChild) bar.removeChild(bar.firstChild);
      if (state === "off") {
        bar.appendChild(node("span", "reader-recall-hint", "先凭记忆回答，再逐题打开解答。页面不会记录掌握状态。"));
        var enter = node("button", "", "进入回忆模式");
        enter.type = "button";
        enter.addEventListener("click", function () { enterRecall(); });
        bar.appendChild(enter);
        return;
      }
      if (state === "titles") {
        bar.appendChild(node("span", "reader-recall-hint", "回忆模式：先凭记忆复述本篇的核心机制、边界和易错点，只看标题作答。"));
        var show = node("button", "", "显示检验问题");
        show.type = "button";
        show.addEventListener("click", function () {
          pageRoot.classList.add("show-questions");
          renderBar("questions");
          var top = qs("#pitfalls", deck);
          if (top) top.scrollIntoView({ behavior: "smooth", block: "start" });
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

    function enterRecall() {
      pageRoot.classList.add("reader-recall");
      pageRoot.classList.remove("show-questions");
      qas.forEach(function (qa) { setQaOpen(qa, false); });
      renderBar("titles");
      syncRecallLinks(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function exitRecall() {
      pageRoot.classList.remove("reader-recall", "show-questions");
      qas.forEach(function (qa, index) { setQaOpen(qa, index === 0); });
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

  /* ---------- 并排比较: 原生 dialog, 每个值可回依据 ---------- */

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

  function makeCompareDialog() {
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
    close.addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", function () {
      if (opener && opener.focus) opener.focus();
    });
    return {
      open: function (trigger) {
        opener = trigger || document.activeElement;
        if (!dialog.open) dialog.showModal();
        close.focus();
      }
    };
  }

  function updateReaderProgress() {
    var progress = qs(".topbar-progress");
    if (!progress) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0) + "%";
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

    var built = buildOutline(deck);
    var context = buildContext(deck, page);
    var layout = node("div", "reader-layout");
    deck.parentNode.insertBefore(layout, deck);
    layout.appendChild(built.outline);
    layout.appendChild(deck);
    layout.appendChild(context);

    var recall = prepareRecall(deck, pageRoot);
    var recallLink = qs('[data-action="recall"]');
    if (recall && recallLink) {
      recallLink.addEventListener("click", function (event) {
        event.preventDefault();
        if (recall.isActive()) recall.exit();
        else recall.enter();
      });
    }

    var compareButton = qs('[data-action="compare"]', context);
    if (compareButton) {
      var comparison = makeCompareDialog();
      compareButton.addEventListener("click", function () { comparison.open(compareButton); });
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

    window.addEventListener("scroll", updateReaderProgress, { passive: true });
    updateReaderProgress();

    function openHashTarget() {
      if (!window.location.hash) return;
      var target = document.getElementById(window.location.hash.slice(1));
      if (!target) return;
      target.scrollIntoView({ block: "start", behavior: "auto" });
      var qa = target.closest ? target.closest(".qa") : null;
      if (qa) {
        qa.classList.add("is-open");
        var button = qs(".qa-toggle", qa);
        if (button) {
          button.textContent = "收起解答";
          button.setAttribute("aria-expanded", "true");
        }
      }
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
    var recallToggle = qs("#idx-recall-toggle");

    function readState() {
      var params = new URLSearchParams(window.location.search);
      return {
        q: params.get("q") || "",
        topic: params.get("topic") || "all",
        tag: resolveTag(params.get("tag") || "") || "",
        review: params.get("review") || ""
      };
    }

    function stateQuery(state) {
      var params = new URLSearchParams();
      if (state.q) params.set("q", state.q);
      if (state.topic && state.topic !== "all") params.set("topic", state.topic);
      if (state.tag) params.set("tag", state.tag);
      if (state.review) params.set("review", state.review);
      return params.toString();
    }

    function writeState(next, mode) {
      var query = stateQuery(next);
      var url = window.location.pathname + (query ? "?" + query : "");
      window.history[mode === "push" ? "pushState" : "replaceState"]({}, "", url);
      render();
    }

    function fromParam(state) {
      var query = stateQuery(state);
      return query ? encodeURIComponent(query) : "";
    }

    function cardHref(page, anchor, state, recallOn) {
      var params = [];
      if (recallOn) params.push("recall=1");
      var from = fromParam(state);
      if (from) params.push("from=" + from);
      return page.href + (params.length ? "?" + params.join("&") : "") + (anchor ? "#" + anchor : "");
    }

    function render() {
      var state = readState();
      filter.value = state.q;
      topicButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", button.dataset.topic === state.topic ? "true" : "false");
      });
      var tokens = tokensFor(state.q);
      var recallOn = document.documentElement.classList.contains("idx-recall");
      var filtered = pages.filter(function (page) {
        if (state.topic !== "all" && page.topic !== state.topic) return false;
        if (state.tag && page.tags.indexOf(state.tag) < 0) return false;
        if (state.review === "due" && !reviewDue(page)) return false;
        return tokens.every(function (token) { return pageCorpus(page).indexOf(token) >= 0; });
      });
      if (tokens.length) filtered.sort(function (a, b) { return scorePage(b, tokens) - scorePage(a, tokens); });

      results.innerHTML = "";
      var heading = node("div", "idx-result-heading");
      heading.appendChild(node("h2", "", state.tag ? "标签筛选：" + tagLabel(state.tag) : "按研究问题阅读"));
      heading.appendChild(node("span", "", filtered.length + " / " + pages.length + " 篇"));
      results.appendChild(heading);

      filtered.forEach(function (page) {
        var hits = matchingEntries(page, tokens).slice(0, 2);
        var card = node("article", "idx-card");
        var link = node("a", "idx-card-title", page.title);
        link.href = cardHref(page, hits.length ? hits[0].a.split("#")[1] : "essence", state, recallOn);
        card.appendChild(link);
        card.appendChild(node("p", "idx-card-meta", (topics[page.topic] || "") + "  ·  " + page.date + "  ·  " + reviewLabel(page)));
        var essence = node("p", "idx-card-essence");
        essence.innerHTML = tokens.length ? highlight(page.essence, tokens) : escapeHtml(page.essence);
        card.appendChild(essence);
        var tags = node("div", "idx-card-tags");
        page.tags.slice(0, 3).forEach(function (id) {
          var button = node("button", "idx-tag", tagLabel(id));
          button.type = "button";
          button.dataset.tag = id;
          tags.appendChild(button);
        });
        card.appendChild(tags);
        hits.forEach(function (entry) {
          var snippet = snippetAround(entry.t, tokens);
          var hit = node("a", "idx-hit");
          hit.href = cardHref(page, entry.a.split("#")[1], state, false);
          hit.innerHTML = "<strong>命中 " + escapeHtml(entry.h) + "</strong>" +
            (snippet.exact ? highlight(snippet.text, tokens) : escapeHtml(snippet.text));
          card.appendChild(hit);
        });
        results.appendChild(card);
      });

      if (!filtered.length) {
        var empty = node("div", "idx-empty");
        empty.textContent = "没有找到符合当前条件的页面。试试删掉一个关键词，或清除筛选。";
        results.appendChild(empty);
      }
      if (count) count.textContent = filtered.length + " 篇可读";
      if (stateLabel) {
        var labels = [];
        if (state.q) labels.push("搜索: " + state.q);
        if (state.topic !== "all") {
          var activeTopic = topicButtons.filter(function (button) { return button.dataset.topic === state.topic; })[0];
          if (activeTopic) labels.push(activeTopic.textContent);
        }
        if (state.tag) labels.push("标签: " + tagLabel(state.tag));
        if (state.review === "due") labels.push("今天待复测");
        stateLabel.textContent = labels.join("  /  ");
      }
      if (clear) clear.hidden = !(state.q || state.topic !== "all" || state.tag || state.review);
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
      state.tag = tag.dataset.tag;
      writeState(state, "push");
    });
    if (clear) clear.addEventListener("click", function () { writeState({ q: "", topic: "all", tag: "", review: "" }, "push"); });
    if (recallToggle) {
      recallToggle.addEventListener("click", function () {
        var on = document.documentElement.classList.toggle("idx-recall");
        recallToggle.textContent = on ? "结束回忆模式" : "先回忆";
        recallToggle.setAttribute("aria-pressed", on ? "true" : "false");
        render();
      });
    }
    var dueEntry = qs("#idx-due-entry");
    if (dueEntry) {
      var dueCount = pages.filter(reviewDue).length;
      dueEntry.hidden = !dueCount;
      var dueLink = qs("a", dueEntry);
      if (dueLink) {
        dueLink.textContent = "查看今天待复测（" + dueCount + " 篇）";
        dueLink.addEventListener("click", function (event) {
          event.preventDefault();
          writeState({ q: "", topic: "all", tag: "", review: "due" }, "push");
        });
      }
    }
    window.addEventListener("popstate", render);
    render();
  }

  if (qs(".deck")) enhanceReader();
  if (qs(".idx-results")) initIndex();
})();
