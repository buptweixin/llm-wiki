/*
 * llm-wiki 阅读层
 * 纯静态、无依赖。文章页增强连续阅读与定位，首页增强专题筛选与全文片段搜索。
 */
(function () {
  "use strict";

  var pages = window.WIKI_INDEX || [];

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

  function pageIdFromPath() {
    var file = window.location.pathname.split("/").pop() || "";
    return file.replace(/\.html$/, "");
  }

  function getPage(id) {
    return pages.filter(function (item) { return item.id === id; })[0];
  }

  function setTopbar(page) {
    var home = qs(".topbar-home");
    var title = qs(".topbar-title");
    var count = qs(".topbar-count");
    var nav = qs(".topbar-nav");
    if (home) {
      home.textContent = "← 知识库";
      home.href = "../index.html";
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

  function buildOutline(deck) {
    var sectionIds = ["essence", "overview", "mechanism", "mechanism-2", "evidence", "pitfalls", "relations"];
    var sections = qsa(".slide", deck).filter(function (section) { return section.parentNode === deck; });
    var outline = node("aside", "reader-outline");
    outline.id = "reader-outline";
    outline.appendChild(node("p", "reader-kicker", "本页目录"));
    var nav = node("nav");
    sections.forEach(function (section, index) {
      var oldId = section.id || "slide-" + (index + 1);
      var stableId = sectionIds[index] || "section-" + (index + 1);
      var legacy = node("span", "legacy-anchor");
      legacy.id = oldId;
      section.insertBefore(legacy, section.firstChild);
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
    return { outline: outline, sections: sections };
  }

  function buildContext(deck, page) {
    var context = node("aside", "reader-context");
    context.appendChild(node("p", "context-kicker", "CONTINUE READING"));
    context.appendChild(node("h2", "", "为什么值得一起读"));

    var groups = qs(".link-groups", deck);
    if (groups) context.appendChild(groups.cloneNode(true));

    if (page && page.review) {
      var review = node("div", "context-review");
      review.appendChild(node("strong", "", "复测状态"));
      review.appendChild(node("span", "", page.review));
      context.appendChild(review);
    }

    var source = node("a", "context-action", "打开完整笔记");
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

  function prepareRecall(deck, pageRoot) {
    var pitfalls = qs("#pitfalls", deck);
    if (!pitfalls) return;
    var list = qs(".qa-list", pitfalls);
    if (!list) return;
    var qas = qsa(".qa", list);
    if (!qas.length) return;

    pageRoot.dataset.enhanced = "true";
    var bar = node("div", "reader-recall-bar");
    bar.appendChild(node("span", "", "先凭记忆回答，再逐题打开解答。页面不会记录掌握状态。"));
    var allButton = node("button", "", "进入回忆模式");
    allButton.type = "button";
    allButton.dataset.action = "recall-mode";
    bar.appendChild(allButton);
    list.parentNode.insertBefore(bar, list);

    qas.forEach(function (qa, index) {
      var answer = qs(".qa-a", qa);
      if (!answer) return;
      qa.classList.toggle("is-open", index === 0);
      var toggle = node("button", "qa-toggle", index === 0 ? "收起解答" : "查看解答");
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", index === 0 ? "true" : "false");
      qa.insertBefore(toggle, answer);
      toggle.addEventListener("click", function () {
        var open = qa.classList.toggle("is-open");
        toggle.textContent = open ? "收起解答" : "查看解答";
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });

    allButton.addEventListener("click", function () {
      var active = pageRoot.classList.toggle("reader-recall");
      allButton.textContent = active ? "结束回忆模式" : "进入回忆模式";
      var recallLink = qs('[data-action="recall"]');
      if (recallLink) recallLink.textContent = active ? "结束回忆" : "先回忆";
    });
  }

  var compareRows = [
    ["教师额外知道什么", "多数投票得到的完整解题轨迹 y+。", "学生输入图的清晰版本。"],
    ["学生看到什么", "正常问题与上下文，rollout 后按错误门控进入蒸馏。", "降采样或加噪后的图，教师看原图。"],
    ["训练信号", "教师上下文让可恢复的推理分布更完整。", "教师提供学生接触不到的视觉细节，重点是恢复可迁移判断。"],
    ["散度实验", "forward KL 必须保留，reverse KL 会出现复读与塌缩。", "JSD > reverse KL > forward KL，forward KL 最差。"],
    ["边界", "文本推理中的额外信息原则上可由学生重新推导。", "被退化图删掉的细节不可逆，不能要求学生盲猜。"],
    ["证据状态", "论文实验结论。", "散度排序是论文实验；“可恢复性”是库内综合，待后续验证。"]
  ];

  function makeCompareModal() {
    var modal = node("div", "reader-modal");
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    var panel = node("div", "reader-modal-panel");
    var head = node("div", "reader-modal-head");
    var heading = node("div");
    heading.appendChild(node("h2", "", "同一个问题，两种不对称来源"));
    heading.appendChild(node("p", "modal-note", "只比较已有笔记中的共同维度，不把不同实验条件排成单一优劣榜。"));
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
    compareRows.forEach(function (row) {
      var rowEl = node("tr");
      row.forEach(function (cell) { rowEl.appendChild(node("td", "", cell)); });
      tbody.appendChild(rowEl);
    });
    table.appendChild(tbody);
    panel.appendChild(table);
    modal.appendChild(panel);
    document.body.appendChild(modal);

    function closeModal() {
      modal.hidden = true;
      document.documentElement.classList.remove("modal-open");
    }
    function openModal() {
      modal.hidden = false;
      document.documentElement.classList.add("modal-open");
      close.focus();
    }
    close.addEventListener("click", closeModal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.hidden) closeModal();
    });
    return { modal: modal, open: openModal };
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
      var link = node("a", "tag", tag.textContent.trim());
      link.href = "../index.html?tag=" + encodeURIComponent(tag.textContent.trim());
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
    prepareRecall(deck, pageRoot);

    var comparison = null;
    var compareButton = qs('[data-action="compare"]', context);
    if (compareButton) {
      comparison = makeCompareModal();
      compareButton.addEventListener("click", comparison.open);
    }

    var links = qsa("a", deck);
    links.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      if (!comparison) return;
      if ((page && page.id === "2026-u-opsd" && href.indexOf("2026-s2vopd.html") >= 0) ||
          (page && page.id === "2026-s2vopd" && href.indexOf("2026-u-opsd.html") >= 0)) {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          comparison.open();
        });
      }
    });

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
        var button = qs(".qa-toggle", qa);
        qa.classList.add("is-open");
        if (button) {
          button.textContent = "收起解答";
          button.setAttribute("aria-expanded", "true");
        }
      }
    }
    window.addEventListener("hashchange", openHashTarget);
    window.setTimeout(openHashTarget, 0);
  }

  function tokensFor(query) {
    return query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  }

  function scorePage(page, tokens) {
    var titleText = (page.title + " " + page.aliases.join(" ")).toLocaleLowerCase();
    var tagText = page.tags.join(" ").toLocaleLowerCase();
    var score = 0;
    tokens.forEach(function (token) {
      if (titleText.indexOf(token) >= 0) score += 100;
      else if (tagText.indexOf(token) >= 0) score += 40;
      else if (page.searchable.toLocaleLowerCase().indexOf(token) >= 0) score += 10;
    });
    return score;
  }

  function chooseSnippet(page, tokens) {
    if (!tokens.length) return null;
    var lowerTokens = tokens.map(function (token) { return token.toLocaleLowerCase(); });
    var found = page.snippets.filter(function (item) {
      var text = (item[0] + " " + item[1]).toLocaleLowerCase();
      return lowerTokens.some(function (token) { return text.indexOf(token) >= 0; });
    })[0];
    return found || page.snippets[0];
  }

  function initIndex() {
    var results = qs(".idx-results");
    var filter = qs(".idx-filter");
    if (!results || !filter || !pages.length) return;
    var topicButtons = qsa("[data-topic]");
    var count = qs("#idx-count");
    var stateLabel = qs("#idx-state-label");
    var clear = qs("#idx-clear");

    function readState() {
      var params = new URLSearchParams(window.location.search);
      return {
        q: params.get("q") || "",
        topic: params.get("topic") || "all",
        tag: params.get("tag") || "",
        review: params.get("review") || ""
      };
    }

    function writeState(next, mode) {
      var params = new URLSearchParams();
      if (next.q) params.set("q", next.q);
      if (next.topic && next.topic !== "all") params.set("topic", next.topic);
      if (next.tag) params.set("tag", next.tag);
      if (next.review) params.set("review", next.review);
      var query = params.toString();
      var url = window.location.pathname + (query ? "?" + query : "");
      window.history[mode === "push" ? "pushState" : "replaceState"]({}, "", url);
      render();
    }

    function render() {
      var state = readState();
      filter.value = state.q;
      topicButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", button.dataset.topic === state.topic ? "true" : "false");
      });
      var tokens = tokensFor(state.q);
      var filtered = pages.filter(function (page) {
        if (state.topic !== "all" && page.topic !== state.topic) return false;
        if (state.tag && page.tags.indexOf(state.tag) < 0) return false;
        if (state.review === "due" && page.review.indexOf("今天") < 0) return false;
        var corpus = (page.title + " " + page.aliases.join(" ") + " " + page.tags.join(" ") + " " + page.essence + " " + page.searchable).toLocaleLowerCase();
        return tokens.every(function (token) { return corpus.indexOf(token) >= 0; });
      });
      if (tokens.length) filtered.sort(function (a, b) { return scorePage(b, tokens) - scorePage(a, tokens); });

      results.innerHTML = "";
      var heading = node("div", "idx-result-heading");
      heading.appendChild(node("h2", "", state.tag ? "标签筛选" : "按研究问题阅读"));
      heading.appendChild(node("span", "", filtered.length + " / " + pages.length + " 篇"));
      results.appendChild(heading);

      filtered.forEach(function (page) {
        var card = node("article", "idx-card");
        var link = node("a", "idx-card-title", page.title);
        var snippet = chooseSnippet(page, tokens);
        link.href = page.href + (snippet ? "#" + snippet[2] : "#essence");
        card.appendChild(link);
        card.appendChild(node("p", "idx-card-meta", page.topicLabel + "  ·  " + page.date + "  ·  " + page.review));
        var essence = node("p", "idx-card-essence");
        essence.innerHTML = tokens.length ? highlight(page.essence, tokens) : escapeHtml(page.essence);
        card.appendChild(essence);
        var tags = node("div", "idx-card-tags");
        page.tags.slice(0, 3).forEach(function (tag) {
          var button = node("button", "idx-tag", tag);
          button.type = "button";
          button.dataset.tag = tag;
          tags.appendChild(button);
        });
        card.appendChild(tags);
        if (snippet) {
          var hit = node("a", "idx-hit");
          hit.href = page.href + "#" + snippet[2];
          hit.innerHTML = "<strong>命中 " + escapeHtml(snippet[0]) + "</strong>" + highlight(snippet[1], tokens);
          card.appendChild(hit);
        }
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
        if (state.tag) labels.push("标签: " + state.tag);
        if (state.review === "due") labels.push("今天复测");
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
    window.addEventListener("popstate", render);
    render();
  }

  if (qs(".deck")) enhanceReader();
  if (qs(".idx-results")) initIndex();
})();
