/* KN·QA Observatory — gráficos Chart.js (tema claro/oscuro) */
window.KN_CHARTS = (function () {
  "use strict";

  var registry = [];
  var currentPage = null;
  var FONT = "'JetBrains Mono', monospace";
  var HEAD = "'Unbounded', sans-serif";

  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback || "";
  }

  function palette() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    return {
      text: dark ? "#9aa4b2" : "#525c6b",
      grid: cssVar("--chart-grid", dark ? "rgba(255,255,255,0.09)" : "rgba(12,16,22,0.08)"),
      accent: cssVar("--accent", "#c6f542"),
      green: cssVar("--ok", "#7ee787"),
      blue: cssVar("--info", "#54c8ff"),
      amber: cssVar("--warn", "#ffb020"),
      rose: cssVar("--danger", "#ff5470"),
      violet: cssVar("--violet", "#b18cff"),
      teal: cssVar("--accent-2", "#3fe0d0"),
    };
  }

  function baseOpts() {
    var p = palette();
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1100, easing: "easeOutQuart" },
      plugins: {
        legend: {
          labels: {
            color: p.text,
            font: { family: FONT, size: 11 },
            usePointStyle: true,
            boxWidth: 8,
          },
        },
        tooltip: {
          backgroundColor: cssVar("--panel-solid", "#0d1119"),
          titleColor: cssVar("--text", "#eef3ea"),
          bodyColor: cssVar("--text", "#eef3ea"),
          borderColor: cssVar("--line-2", "rgba(255,255,255,0.2)"),
          borderWidth: 1,
          padding: 12,
          cornerRadius: 10,
          titleFont: { family: HEAD, size: 12, weight: "600" },
          bodyFont: { family: FONT, size: 12 },
        },
      },
      scales: {
        x: {
          grid: { color: p.grid, drawBorder: false },
          ticks: { color: p.text, font: { family: FONT, size: 10.5 } },
        },
        y: {
          grid: { color: p.grid, drawBorder: false },
          ticks: { color: p.text, font: { family: FONT, size: 10.5 } },
          beginAtZero: true,
        },
      },
    };
  }

  function make(id, cfg) {
    var el = document.getElementById(id);
    if (!el) return;
    registry.push(id);
    return new Chart(el.getContext("2d"), cfg);
  }

  function score(m) {
    var vals = [m.performance, m.accesibilidad, m.best_practices, m.seo];
    if (m.agentic != null) vals.push(m.agentic);
    return vals.reduce(function (a, b) { return a + b; }, 0) / vals.length;
  }

  var byPage = {
    /* ================= INDEX ================= */
    index: function () {
      var p = palette();
      var D = window.KN_DATA;
      var bat = [
        { name: "JUnit 5 + Mockito", val: 100, color: p.green },
        { name: "Cypress E2E", val: 97.7, color: p.blue },
        { name: "Apache JMeter", val: 99.92, color: p.violet },
        { name: "Lighthouse", val: 96, color: p.teal },
      ];
      var o = baseOpts();
      o.indexAxis = "y";
      o.plugins.legend.display = false;
      o.scales.x.max = 100;
      o.scales.x.ticks.callback = function (v) { return v + "%"; };
      make("chart-baterias", {
        type: "bar",
        data: {
          labels: bat.map(function (b) { return b.name; }),
          datasets: [{
            data: bat.map(function (b) { return b.val; }),
            backgroundColor: bat.map(function (b) { return b.color + "cc"; }),
            borderRadius: 9,
            barThickness: 24,
          }],
        },
        options: o,
      });

      var o2 = baseOpts();
      o2.plugins.legend.display = false;
      make("chart-costos", {
        type: "bar",
        data: {
          labels: ["Año 1", "Año 3", "Año 5"],
          datasets: [{
            data: [D.costs.year1, D.costs.year3, D.costs.year5],
            backgroundColor: [p.green + "cc", p.blue + "cc", p.violet + "cc"],
            borderRadius: 9,
            barThickness: 40,
          }],
        },
        options: o2,
      });

      var o3 = baseOpts();
      o3.plugins.legend.position = "bottom";
      o3.scales = {};
      make("chart-capex", {
        type: "doughnut",
        data: {
          labels: ["CAPEX (Desarrollo inicial)", "OPEX (Operación anual)"],
          datasets: [{
            data: [D.costs.capex, D.costs.opex],
            backgroundColor: [p.green, p.amber],
            borderWidth: 0,
            hoverOffset: 8,
          }],
        },
        options: o3,
      });
    },

    /* ================= MAESTRO ================= */
    maestro: function () {
      var p = palette();
      var D = window.KN_DATA;
      var o = baseOpts();
      o.plugins.legend.display = false;
      o.scales.x.ticks.maxRotation = 38;
      make("chart-modulos", {
        type: "bar",
        data: {
          labels: D.modules12.map(function (m) { return m.id + " · " + m.nombre.split("–")[0].trim(); }),
          datasets: [{
            data: D.modules12.map(function (m) { return m.n; }),
            backgroundColor: p.blue + "cc",
            borderRadius: 7,
            barThickness: 15,
          }],
        },
        options: o,
      });

      var o2 = baseOpts();
      o2.plugins.legend.position = "bottom";
      o2.scales = {};
      make("chart-rf", {
        type: "doughnut",
        data: {
          labels: ["M01–M05 · 27 RF", "M06–M08 · 13 RF", "M09–M12 · 29 RF"],
          datasets: [{
            data: [27, 13, 29],
            backgroundColor: [p.green, p.blue, p.violet],
            borderWidth: 0,
            hoverOffset: 8,
          }],
        },
        options: o2,
      });
    },

    /* ================= UNITARIAS ================= */
    unitarias: function () {
      var p = palette();
      var D = window.KN_DATA;
      var o = baseOpts();
      o.plugins.legend.position = "bottom";
      o.scales = {};
      make("chart-unit-nuevas", {
        type: "doughnut",
        data: {
          labels: ["211 preexistentes", "150 nuevas (agosto)", "2 de regresión (septiembre)"],
          datasets: [{
            data: [211, D.kpi.unit_new, 2],
            backgroundColor: [p.blue, p.green, p.amber],
            borderWidth: 0,
            hoverOffset: 8,
          }],
        },
        options: o,
      });

      var o2 = baseOpts();
      o2.plugins.legend.display = false;
      o2.scales.y.max = 100;
      make("chart-unit-agentes", {
        type: "bar",
        data: {
          labels: ["Agente 1 · Cliente", "Agente 2 · Catálogo", "Agente 3 · Producto/Pedidos", "Agente 4 · Usuarios"],
          datasets: [{
            data: [48, 50, 30, 22],
            backgroundColor: [p.green, p.blue, p.violet, p.amber],
            borderRadius: 7,
            barThickness: 30,
          }],
        },
        options: o2,
      });
    },

    /* ================= E2E ================= */
    e2e: function () {
      var p = palette();
      var D = window.KN_DATA;
      var o = baseOpts();
      o.plugins.legend.display = false;
      make("chart-e2e-pasos", {
        type: "bar",
        data: {
          labels: D.e2e_cases.map(function (c) { return c.id + " · " + c.modulo; }),
          datasets: [{
            data: D.e2e_cases.map(function (c) { return c.pasos; }),
            backgroundColor: [p.green, p.blue, p.violet, p.amber],
            borderRadius: 7,
            barThickness: 34,
          }],
        },
        options: o,
      });

      var o2 = baseOpts();
      o2.plugins.legend.position = "bottom";
      o2.scales = {};
      make("chart-e2e-check", {
        type: "doughnut",
        data: {
          labels: ["Correctos (42)", "Con observación (1)"],
          datasets: [{
            data: [42, 1],
            backgroundColor: [p.green, p.amber],
            borderWidth: 0,
            hoverOffset: 8,
          }],
        },
        options: o2,
      });
    },

    /* ================= JMETER ================= */
    jmeter: function () {
      var p = palette();
      var D = window.KN_DATA;
      var o = baseOpts();
      o.plugins.legend.position = "bottom";
      make("chart-jmeter-rondas", {
        type: "bar",
        data: {
          labels: D.stress_rounds.map(function (r) { return r.ronda; }),
          datasets: [
            { label: "Muestras", data: D.stress_rounds.map(function (r) { return r.muestras; }), backgroundColor: p.blue + "cc", borderRadius: 7, barThickness: 30 },
            { label: "Errores", data: D.stress_rounds.map(function (r) { return r.errores; }), backgroundColor: p.rose + "cc", borderRadius: 7, barThickness: 30 },
          ],
        },
        options: o,
      });

      var o2 = baseOpts();
      o2.plugins.legend.display = false;
      make("chart-jmeter-p95", {
        type: "bar",
        data: {
          labels: ["Catálogo (r3)", "Login", "Checkout", "Escalado 150", "Spike 100 (r3)"],
          datasets: [{
            data: [453, 1400, 220, 453, 3800],
            backgroundColor: [p.green, p.blue, p.violet, p.teal, p.rose],
            borderRadius: 7,
            barThickness: 26,
          }],
        },
        options: o2,
      });

      var o3 = baseOpts();
      o3.plugins.legend.display = false;
      o3.scales.y.max = 100;
      make("chart-jmeter-exito", {
        type: "bar",
        data: {
          labels: ["Ronda 1", "Ronda 2", "Ronda 3"],
          datasets: [{
            data: [100, 100, 99.92],
            backgroundColor: [p.green, p.green, p.amber],
            borderRadius: 7,
            barThickness: 34,
          }],
        },
        options: o3,
      });
    },

    /* ================= LIGHTHOUSE ================= */
    lighthouse: function () {
      var p = palette();
      var D = window.KN_DATA;
      var views = [["ADMIN", "DESKTOP"], ["ADMIN", "MOBILE"], ["CLIENTE", "DESKTOP"], ["CLIENTE", "MOBILE"]];
      var labels = ["Admin · Desktop", "Admin · Mobile", "Cliente · Desktop", "Cliente · Mobile"];

      function avg(field) {
        return views.map(function (v) {
          var ms = D.lighthouse.filter(function (m) { return m.panel === v[0] && m.vista === v[1]; });
          var sum = 0;
          ms.forEach(function (m) { sum += m[field]; });
          return Math.round((sum / ms.length) * 10) / 10;
        });
      }

      var o = baseOpts();
      o.plugins.legend.position = "bottom";
      make("chart-lh-param", {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            { label: "Performance", data: avg("performance"), backgroundColor: p.blue, borderRadius: 4 },
            { label: "Accessibility", data: avg("accesibilidad"), backgroundColor: p.green, borderRadius: 4 },
            { label: "Best Practices", data: avg("best_practices"), backgroundColor: p.violet, borderRadius: 4 },
            { label: "SEO", data: avg("seo"), backgroundColor: p.amber, borderRadius: 4 },
          ],
        },
        options: o,
      });

      var o2 = baseOpts();
      o2.plugins.legend.display = false;
      o2.scales.y.max = 100;
      make("chart-lh-final", {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            data: views.map(function (v) {
              var ms = D.lighthouse.filter(function (m) { return m.panel === v[0] && m.vista === v[1]; });
              var s = 0;
              ms.forEach(function (m) { s += score(m); });
              return Math.round((s / ms.length) * 10) / 10;
            }),
            backgroundColor: [p.green, p.blue, p.teal, p.amber],
            borderRadius: 7,
            barThickness: 38,
          }],
        },
        options: o2,
      });
    },

    /* ================= COBERTURA ================= */
    cobertura: function () {
      var p = palette();
      var D = window.KN_DATA.cobertura;
      var pks = D.backend.paquetes;

      var o = baseOpts();
      o.indexAxis = "y";
      o.plugins.legend.position = "bottom";
      o.scales.x.max = 100;
      o.scales.x.ticks.callback = function (v) { return v + "%"; };
      o.scales.y.ticks.font = { family: FONT, size: 10 };
      make("chart-cob-paquetes", {
        type: "bar",
        data: {
          labels: pks.map(function (x) { return x.n; }),
          datasets: [
            { label: "Líneas", data: pks.map(function (x) { return x.lt ? +(x.lc / x.lt * 100).toFixed(1) : 0; }), backgroundColor: p.accent + "cc", borderRadius: 6, barThickness: 9 },
            { label: "Ramas", data: pks.map(function (x) { return x.bt ? +(x.bc / x.bt * 100).toFixed(1) : 0; }), backgroundColor: p.violet + "cc", borderRadius: 6, barThickness: 9 },
          ],
        },
        options: o,
      });

      var areas = D.frontend.areas.slice().sort(function (a, b) { return (b.lnc / b.ln) - (a.lnc / a.ln); });
      var o2 = baseOpts();
      o2.indexAxis = "y";
      o2.plugins.legend.display = false;
      o2.scales.x.max = 100;
      o2.scales.x.ticks.callback = function (v) { return v + "%"; };
      o2.scales.y.ticks.font = { family: FONT, size: 10 };
      make("chart-cob-front", {
        type: "bar",
        data: {
          labels: areas.map(function (a) { return a.n.replace("app/landing/", "").replace("app/", "") || "(raíz)"; }),
          datasets: [{
            label: "Líneas cubiertas",
            data: areas.map(function (a) { return +(a.lnc / a.ln * 100).toFixed(1); }),
            backgroundColor: p.teal + "cc",
            borderRadius: 6,
            barThickness: 12,
          }],
        },
        options: o2,
      });

      var o3 = baseOpts();
      o3.plugins.legend.position = "bottom";
      o3.scales = {};
      make("chart-cob-pruebas", {
        type: "doughnut",
        data: {
          labels: ["Unitarias JUnit (363)", "Integración Testcontainers (487)", "Frontend Vitest (534)"],
          datasets: [{
            data: [D.pruebas.unit, D.pruebas.it, D.pruebas.front],
            backgroundColor: [p.green, p.blue, p.violet],
            borderWidth: 0,
            hoverOffset: 8,
          }],
        },
        options: o3,
      });
    },
  };

  function drawCharts() {
    registry.forEach(function (id) {
      var old = Chart.getChart(id);
      if (old) old.destroy();
    });
    registry = [];
    if (byPage[currentPage]) byPage[currentPage]();
  }

  function drawViews() {
    if (window.buildJmeterTable) window.buildJmeterTable();
    if (window.buildLighthouseTable) window.buildLighthouseTable();
    if (window.buildLighthouseHeatmap) window.buildLighthouseHeatmap();
    if (window.buildCoberturaPaquetes) window.buildCoberturaPaquetes();
    if (window.buildCoberturaClases) window.buildCoberturaClases();
    if (window.buildCoberturaFront) window.buildCoberturaFront();
  }

  function init(page) {
    currentPage = page;
    Chart.defaults.font.family = FONT;
    Chart.defaults.color = palette().text;
    drawCharts();
    drawViews();
  }

  return {
    init: init,
    refreshTheme: drawCharts,
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  var page = document.body.getAttribute("data-page") || "index";
  if (window.KN_DATA && window.Chart) KN_CHARTS.init(page);
});
