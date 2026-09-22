/* KN·QA Observatory — movimiento: boot, Lenis + GSAP, reveals, gauges */
(function () {
  "use strict";

  if (!window.gsap || window.KN_REDUCED) return;
  var gsap = window.gsap;
  var docEl = document.documentElement;
  docEl.classList.add("gsap");
  gsap.registerPlugin(window.ScrollTrigger);

  function onReady(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  /* ---------- Scroll suave (Lenis) ---------- */
  var lenis = null;
  if (typeof window.Lenis === "function") {
    lenis = new window.Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", window.ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  function scrollTo(target) {
    if (lenis) {
      if (target === 0) lenis.scrollTo(0, { duration: 1.1 });
      else lenis.scrollTo(target, { offset: -86, duration: 1.1 });
      return;
    }
    if (target === 0) window.scrollTo({ top: 0, behavior: "smooth" });
    else {
      var el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ---------- Boot ---------- */
  function hideBoot(done) {
    var boot = document.getElementById("boot");
    if (!boot) { done(); return; }
    var track = boot.querySelector(".boot-track span");
    var status = boot.querySelector(".boot-status");
    var msgs = [
      "Inicializando observatorio…",
      "Cargando telemetría…",
      "Verificando integridad…",
      "Sesión lista"
    ];
    var i = 0;
    var spin = setInterval(function () {
      i = (i + 1) % msgs.length;
      if (status) status.textContent = msgs[i];
    }, 250);
    gsap.timeline({
      onComplete: function () {
        clearInterval(spin);
        boot.classList.add("done");
        setTimeout(function () { boot.remove(); }, 620);
        done();
      }
    })
      .to(track, { scaleX: 1, duration: 0.55, ease: "power2.inOut" })
      .to(boot.querySelector(".boot-box"), { yPercent: -16, opacity: 0, duration: 0.28, ease: "power1.in" }, "+=0.06");
  }

  /* ---------- Hero: palabras + entrada ---------- */
  function splitHero() {
    var h1 = document.querySelector(".hero h1");
    if (!h1 || h1.getAttribute("data-split") === "done") return;
    h1.innerHTML = h1.innerHTML.split(/<br\s*\/?>/i).map(function (line) {
      return line.trim().split(/\s+/).map(function (w) {
        return '<span class="w"><span class="wi">' + w + "</span></span>";
      }).join(" ");
    }).join("<br>");
    h1.setAttribute("data-split", "done");
  }

  function heroIntro() {
    if (!document.querySelector(".hero")) return;
    splitHero();
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(".hero h1 .wi", { yPercent: 0, duration: 0.9, stagger: 0.035 })
      .from(".hero .eyebrow", { y: 14, opacity: 0, duration: 0.5 }, 0.1)
      .from(".hero p.lead", { y: 18, opacity: 0, duration: 0.6 }, 0.24)
      .from(".hero-badges .badge", { y: 14, opacity: 0, duration: 0.5, stagger: 0.07 }, 0.34)
      .from(".hero-meta > span", { y: 12, opacity: 0, duration: 0.45, stagger: 0.05 }, 0.46);
  }

  /* ---------- Revelados por scroll ---------- */
  function reveals() {
    var els = gsap.utils.toArray(".reveal");
    els.forEach(function (el) {
      var kind = el.getAttribute("data-reveal") || "up";
      var from = { opacity: 0 };
      if (kind === "left") from.x = -34;
      if (kind === "right") from.x = 34;
      if (kind === "scale") from.scale = 0.94;
      if (kind === "up") from.y = 30;
      gsap.set(el, from);
    });
    window.ScrollTrigger.batch(".reveal", {
      start: "top 90%",
      once: true,
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1, x: 0, y: 0, scale: 1,
          duration: 0.85, ease: "power3.out", stagger: 0.06, overwrite: true,
          clearProps: "transform"
        });
      }
    });
  }

  /* ---------- Contadores ---------- */
  function counters() {
    gsap.utils.toArray("[data-count]").forEach(function (el) {
      var end = parseFloat(el.getAttribute("data-count"));
      var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var prefix = el.getAttribute("data-prefix") || "";
      var suffix = el.getAttribute("data-suffix") || "";
      var obj = { v: 0 };
      window.ScrollTrigger.create({
        trigger: el,
        start: "top 94%",
        once: true,
        onEnter: function () {
          gsap.to(obj, {
            v: end, duration: 1.7, ease: "power2.out",
            onUpdate: function () {
              el.textContent = prefix + obj.v.toLocaleString("es-CO", {
                minimumFractionDigits: dec, maximumFractionDigits: dec
              }) + suffix;
            }
          });
        }
      });
    });
  }

  /* ---------- Gauges (anillos) ---------- */
  function gauges() {
    gsap.utils.toArray("[data-gauge]").forEach(function (el) {
      var end = parseFloat(el.getAttribute("data-gauge"));
      var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var ring = el.querySelector(".g-val");
      var num = el.querySelector(".g-center b");
      window.ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: function () {
          if (ring) {
            gsap.fromTo(ring, { strokeDashoffset: 100 },
              { strokeDashoffset: 100 - end, duration: 1.7, ease: "power3.out" });
          }
          if (num) {
            var obj = { v: 0 };
            gsap.to(obj, {
              v: end, duration: 1.7, ease: "power3.out",
              onUpdate: function () {
                num.textContent = obj.v.toLocaleString("es-CO", {
                  minimumFractionDigits: dec, maximumFractionDigits: dec
                });
              }
            });
          }
        }
      });
    });
  }

  /* ---------- Medidores ---------- */
  function meters() {
    gsap.utils.toArray(".meter-fill[data-value]").forEach(function (el) {
      var v = parseFloat(el.getAttribute("data-value"));
      window.ScrollTrigger.create({
        trigger: el,
        start: "top 96%",
        once: true,
        onEnter: function () {
          gsap.fromTo(el, { width: 0 }, { width: v + "%", duration: 1.3, ease: "power3.out" });
        }
      });
    });
  }

  /* ---------- Filas de tabla ---------- */
  function tables() {
    document.querySelectorAll("table").forEach(function (t) {
      var rows = t.querySelectorAll("tbody tr");
      if (rows.length < 3 || rows.length > 60) return;
      gsap.from(rows, {
        opacity: 0, y: 12, duration: 0.5, ease: "power2.out", stagger: 0.025,
        scrollTrigger: { trigger: t, start: "top 88%", once: true }
      });
    });
  }

  /* ---------- Parallax de orbes ---------- */
  function parallax() {
    gsap.to(".bg-orb--a", {
      yPercent: 20, ease: "none",
      scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true }
    });
    gsap.to(".bg-orb--b", {
      yPercent: -16, ease: "none",
      scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true }
    });
  }

  /* ---------- Glow que sigue al puntero ---------- */
  function pointerGlow() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.addEventListener("pointermove", function (e) {
      var el = e.target.closest(".card, .kpi, .gauge-card");
      if (!el) return;
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    }, { passive: true });
  }

  /* ---------- Cursor luminoso ---------- */
  function cursor() {
    var c = document.getElementById("cursor");
    if (!c || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var xTo = gsap.quickTo(c, "x", { duration: 0.55, ease: "power3" });
    var yTo = gsap.quickTo(c, "y", { duration: 0.55, ease: "power3" });
    window.addEventListener("pointermove", function (e) {
      c.style.opacity = "1";
      xTo(e.clientX);
      yTo(e.clientY);
    }, { passive: true });
    document.documentElement.addEventListener("mouseleave", function () { c.style.opacity = "0"; });
  }

  /* ---------- Anclas con scroll suave ---------- */
  function anchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (window.KN_SHELL) window.KN_SHELL.scrollTo(id);
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", id);
    });
  }

  window.KN_SHELL_SCROLLTO = scrollTo;

  onReady(function () {
    if (window.KN_SHELL) window.KN_SHELL.scrollTo = scrollTo;
    hideBoot(heroIntro);
    reveals();
    counters();
    gauges();
    meters();
    tables();
    parallax();
    pointerGlow();
    cursor();
    anchors();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { window.ScrollTrigger.refresh(); });
    }
    window.addEventListener("load", function () { window.ScrollTrigger.refresh(); });
  });
})();
