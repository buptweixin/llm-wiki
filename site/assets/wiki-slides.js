/* ============================================================
   llm-wiki 速览库共享脚本 (wiki-slides.js)
   纵向滑页: 键盘翻页 + 顶栏进度/计数 (IntersectionObserver 实现)
   索引页: 关键词即时过滤
   依赖: 无。file:// 离线可用。
   ============================================================ */
(function () {
  "use strict";

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 笔记页: 滑页导航 ---------- */
  var deck = document.querySelector(".deck");
  if (deck) {
    var slides = Array.prototype.slice.call(deck.querySelectorAll(".slide"));
    var countEl = document.querySelector(".topbar-count");
    var progressEl = document.querySelector(".topbar-progress");

    if (countEl && slides.length) {
      countEl.textContent = "1 / " + slides.length;
    }

    /* 当前 slide 检测: 视口中线检测带（上下各裁 45%），
       内容高于视口的 slide 也能命中；IntersectionObserver, 不监听 scroll */
    if ("IntersectionObserver" in window && slides.length) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var i = slides.indexOf(entry.target);
            if (i < 0) return;
            if (countEl) countEl.textContent = i + 1 + " / " + slides.length;
            if (progressEl) {
              progressEl.style.width =
                ((i + 1) / slides.length) * 100 + "%";
            }
          });
        },
        { root: deck, rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      slides.forEach(function (s) {
        io.observe(s);
      });
    }

    function go(i) {
      if (i < 0 || i >= slides.length) return;
      /* 瞬时跳转: smooth 在 WebKit 下会被 scroll-snap 取消 */
      slides[i].scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }

    function current() {
      var mid = deck.scrollTop + deck.clientHeight * 0.5;
      var best = 0;
      var bestDist = Infinity;
      slides.forEach(function (s, i) {
        var c = s.offsetTop + s.offsetHeight * 0.5;
        var d = Math.abs(c - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      return best;
    }

    /* 键盘翻页挂在 document 上（.deck 不可聚焦，事件到不了它）；
       输入框内按键不拦截 */
    document.addEventListener("keydown", function (e) {
      var t = e.target;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable)
      ) {
        return;
      }
      var k = e.key;
      var i = current();
      if (k === "ArrowDown" || k === "PageDown" || k === " ") {
        e.preventDefault();
        go(i + 1);
      } else if (k === "ArrowUp" || k === "PageUp") {
        e.preventDefault();
        go(i - 1);
      } else if (k === "Home") {
        e.preventDefault();
        go(0);
      } else if (k === "End") {
        e.preventDefault();
        go(slides.length - 1);
      }
    });

    /* 顶栏上一篇/下一篇 */
    var prevLink = document.querySelector('.topbar-link[data-nav="prev"]');
    var nextLink = document.querySelector('.topbar-link[data-nav="next"]');
    if (prevLink) prevLink.addEventListener("click", function () { go(current() - 1); });
    if (nextLink) nextLink.addEventListener("click", function () { go(current() + 1); });
  }

  /* ---------- 索引页: 关键词过滤 ---------- */
  var filter = document.querySelector(".idx-filter");
  if (filter) {
    var entries = Array.prototype.slice.call(document.querySelectorAll(".entry"));
    var groups = Array.prototype.slice.call(document.querySelectorAll(".idx-group"));
    var emptyNote = document.querySelector(".idx-no-match");

    filter.addEventListener("input", function () {
      var q = filter.value.trim().toLowerCase();
      var anyVisible = false;
      entries.forEach(function (el) {
        var hit = !q || el.textContent.toLowerCase().indexOf(q) >= 0;
        el.style.display = hit ? "" : "none";
        if (hit) anyVisible = true;
      });
      groups.forEach(function (g) {
        var visible = g.querySelectorAll('.entry:not([style*="none"])');
        g.style.display = visible.length ? "" : "none";
      });
      if (emptyNote) emptyNote.style.display = anyVisible ? "none" : "";
    });
  }
})();
