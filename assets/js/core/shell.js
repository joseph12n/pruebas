/* KN·QA Observatory — shell: rail, scrollspy, drawer, command palette */
(function () {
  "use strict";

  var body = document.body;
  var root = body.getAttribute("data-root") || ".";

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  /* ============================================================
     Rail: secciones de la página + scrollspy
     ============================================================ */
  function buildRailSections() {
    var wrap = document.getElementById("rail-sections");
    var sections = Array.prototype.slice.call(document.querySelectorAll("main [data-nav]"));
    if (!wrap || !sections.length) return;

    wrap.innerHTML =
      '<div class="rail-label">En esta página</div>' +
      sections.map(function (sec, i) {
        if (!sec.id) sec.id = "sec-" + i;
        return '<a class="rail-sec" href="#' + sec.id + '" data-spy="' + sec.id + '">' +
          '<span class="rs-dot"></span>' + window.esc(sec.getAttribute("data-nav")) + "</a>";
      }).join("");

    var links = Array.prototype.slice.call(wrap.querySelectorAll(".rail-sec"));
    var map = {};
    links.forEach(function (l) { map[l.getAttribute("data-spy")] = l; });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove("active"); });
        var link = map[en.target.id];
        if (link) {
          link.classList.add("active");
          var box = wrap.getBoundingClientRect();
          var lb = link.getBoundingClientRect();
          if (lb.top < box.top || lb.bottom > box.bottom) {
            link.scrollIntoView({ block: "nearest" });
          }
        }
      });
    }, { rootMargin: "-42% 0px -52% 0px", threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ============================================================
     Drawer móvil
     ============================================================ */
  function initDrawer() {
    var btn = document.getElementById("menu-btn");
    var scrim = document.getElementById("scrim");
    var drawer = document.getElementById("drawer");
    if (!btn || !drawer) return;

    function setOpen(open) {
      body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        var first = drawer.querySelector("a");
        if (first) setTimeout(function () { first.focus(); }, 260);
      }
    }
    btn.addEventListener("click", function () {
      setOpen(!body.classList.contains("menu-open"));
    });
    if (scrim) scrim.addEventListener("click", function () { setOpen(false); });
    document.querySelectorAll("[data-drawer-close]").forEach(function (el) {
      el.addEventListener("click", function () { setOpen(false); });
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && body.classList.contains("menu-open")) setOpen(false);
    });
    window.KN_DRAWER_CLOSE = function () { setOpen(false); };
  }

  /* ============================================================
     Command palette
     ============================================================ */
  var cmd = null, cmdInput = null, cmdList = null, cmdTrigger = null;
  var items = [], view = [], sel = 0;

  function collectItems() {
    var out = [];
    var seen = {};
    function push(label, kind, href) {
      var key = kind + "|" + href;
      if (seen[key]) return;
      seen[key] = 1;
      out.push({ label: label, kind: kind, href: href });
    }
    document.querySelectorAll(".rail-nav a").forEach(function (a) {
      var name = a.querySelector(".rail-name");
      push(name ? name.textContent.trim() : a.textContent.trim(), "página", a.getAttribute("href"));
    });
    document.querySelectorAll("main [data-nav]").forEach(function (sec) {
      if (!sec.id) return;
      push(sec.getAttribute("data-nav"), "sección", "#" + sec.id);
    });
    return out;
  }

  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  function renderCmd() {
    var q = cmdInput.value.trim().toLowerCase();
    view = items.filter(function (it) {
      return !q || it.label.toLowerCase().indexOf(q) !== -1 ||
        it.kind.toLowerCase().indexOf(q) !== -1;
    });
    sel = 0;
    if (!view.length) {
      cmdList.innerHTML = '<li class="cmd-empty">Sin coincidencias…</li>';
      return;
    }
    cmdList.innerHTML = view.map(function (it, i) {
      var label = window.esc(it.label);
      if (q) {
        label = label.replace(new RegExp("(" + escRe(window.esc(q)) + ")", "ig"), "<mark>$1</mark>");
      }
      return '<li class="cmd-item' + (i === 0 ? " sel" : "") + '" data-i="' + i + '" role="option" aria-selected="' + (i === 0) + '">' +
        '<span class="ci-kind">' + window.esc(it.kind) + "</span>" +
        '<span class="ci-label">' + label + "</span></li>";
    }).join("");
  }

  function moveCmd(delta) {
    if (!view.length) return;
    sel = (sel + delta + view.length) % view.length;
    cmdList.querySelectorAll(".cmd-item").forEach(function (el, i) {
      var on = i === sel;
      el.classList.toggle("sel", on);
      el.setAttribute("aria-selected", on ? "true" : "false");
      if (on) el.scrollIntoView({ block: "nearest" });
    });
  }

  function goCmd() {
    var it = view[sel];
    if (!it) return;
    var href = it.href;
    closeCmd();
    if (href.charAt(0) === "#") {
      if (window.KN_SHELL && window.KN_SHELL.scrollTo) window.KN_SHELL.scrollTo(href);
      else {
        var el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.location.href = href;
    }
  }

  function openCmd() {
    if (!cmd) return;
    cmd.removeAttribute("hidden");
    requestAnimationFrame(function () { cmd.classList.add("open"); });
    cmdTrigger.setAttribute("aria-expanded", "true");
    cmdInput.value = "";
    renderCmd();
    setTimeout(function () { cmdInput.focus(); }, 60);
  }

  function closeCmd() {
    if (!cmd || cmd.hasAttribute("hidden")) return;
    cmd.classList.remove("open");
    cmdTrigger.setAttribute("aria-expanded", "false");
    setTimeout(function () { cmd.setAttribute("hidden", ""); }, 220);
  }

  function initCmd() {
    cmd = document.getElementById("cmd");
    cmdInput = document.getElementById("cmd-input");
    cmdList = document.getElementById("cmd-list");
    cmdTrigger = document.getElementById("cmd-trigger");
    if (!cmd || !cmdInput || !cmdList || !cmdTrigger) return;

    items = collectItems();
    cmdTrigger.addEventListener("click", openCmd);
    cmdInput.addEventListener("input", renderCmd);
    cmdInput.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); moveCmd(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); moveCmd(-1); }
      else if (e.key === "Enter") { e.preventDefault(); goCmd(); }
      else if (e.key === "Escape") { closeCmd(); }
    });
    cmdList.addEventListener("click", function (e) {
      var li = e.target.closest(".cmd-item");
      if (!li) return;
      sel = parseInt(li.getAttribute("data-i"), 10) || 0;
      goCmd();
    });
    cmd.addEventListener("click", function (e) {
      if (e.target === cmd) closeCmd();
    });
    document.addEventListener("keydown", function (e) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || "").toUpperCase());
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        cmd.hasAttribute("hidden") ? openCmd() : closeCmd();
      } else if (e.key === "/" && !typing && cmd.hasAttribute("hidden")) {
        e.preventDefault();
        openCmd();
      }
    });
  }

  /* ============================================================
     Progreso de scroll / botón subir
     ============================================================ */
  function initScrollUI() {
    var bar = document.querySelector("#scroll-progress span");
    var top = document.getElementById("to-top");
    var ticking = false;

    function update() {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar) bar.style.transform = "scaleX(" + p + ")";
      if (top) top.classList.toggle("show", window.scrollY > 620);
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();

    if (top) {
      top.addEventListener("click", function () {
        if (window.KN_SHELL && window.KN_SHELL.scrollTo) window.KN_SHELL.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /* ============================================================
     Botones de copiado
     ============================================================ */
  function initCopy() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".copy-btn");
      if (!btn) return;
      var scope = btn.closest(".terminal");
      var text = btn.getAttribute("data-copy") ||
        (scope && scope.querySelector(".terminal-body") ? scope.querySelector(".terminal-body").innerText : "");
      if (!text) return;
      var done = function () {
        var old = btn.textContent;
        btn.textContent = "Copiado";
        btn.classList.add("done");
        setTimeout(function () { btn.textContent = old; btn.classList.remove("done"); }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (err) {}
        ta.remove();
        done();
      }
    });
  }

  /* ============================================================
     Fallback del boot
     ============================================================ */
  function initBootFallback() {
    window.addEventListener("load", function () {
      var boot = document.getElementById("boot");
      if (!boot || boot.classList.contains("done")) return;
      if (document.documentElement.classList.contains("gsap")) return;
      boot.classList.add("done");
      setTimeout(function () { boot.remove(); }, 560);
    });
  }

  onReady(function () {
    buildRailSections();
    initDrawer();
    initCmd();
    initScrollUI();
    initCopy();
    initBootFallback();
  });

  window.KN_SHELL = {
    openCmd: function () { if (cmd) openCmd(); },
    closeCmd: function () { if (cmd) closeCmd(); },
    scrollTo: null
  };
})();
