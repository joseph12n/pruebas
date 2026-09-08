/* KN Store QA — gráficos Chart.js (tema claro/oscuro) */
window.KN_CHARTS = (function () {
  "use strict";

  var registry = [];
  var FONT = "'Inter', sans-serif";
  var HEAD = "'Space Grotesk', sans-serif";

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function palette() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    return {
      text: dark ? "#94a3bd" : "#5b6b85",
      grid: dark ? "rgba(148,163,199,0.14)" : "rgba(15,23,42,0.10)",
      green: "#10b981", blue: "#38bdf8", amber: "#f59e0b", rose: "#f43f5e",
      violet: "#8b5cf6", teal: "#2dd4bf",
      card: dark ? "rgba(17,27,49,0)" : "rgba(255,255,255,0)",
    };
  }

  function baseOpts() {
    var p = palette();
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: p.text, font: { family: FONT, size: 12 }, usePointStyle: true, boxWidth: 8 } },
        tooltip: {
          backgroundColor: cssVar("--card-2"),
          titleColor: cssVar("--text"),
          bodyColor: cssVar("--text"),
          borderColor: cssVar("--border-strong"),
          borderWidth: 1,
          padding: 12,
          titleFont: { family: HEAD, weight: "600" },
          bodyFont: { family: FONT },
        },
      },
      scales: {
        x: { grid: { color: p.grid, drawBorder: false }, ticks: { color: p.text, font: { family: FONT, size: 11 } } },
        y: { grid: { color: p.grid, drawBorder: false }, ticks: { color: p.text, font: { family: FONT, size: 11 } }, beginAtZero: true },
      },
    };
  }

  function make(id, cfg) {
    var el = document.getElementById(id);
    if (!el) return;
    var chart = new Chart(el.getContext("2d"), cfg);
    registry.push({ id: id, make: function () { return cfg; } });
    return chart;
  }

  function refresh() {
    var p = palette();
    registry.forEach(function (r) {
      var chart = Chart.getChart(r.id);
      if (!chart) return;
      chart.options.plugins.legend.labels.color = p.text;
      chart.options.plugins.tooltip.backgroundColor = cssVar("--card-2");
      chart.options.plugins.tooltip.titleColor = cssVar("--text");
      chart.options.plugins.tooltip.bodyColor = cssVar("--text");
      if (chart.options.scales) {
        Object.keys(chart.options.scales).forEach(function (k) {
          var sc = chart.options.scales[k];
          if (sc.ticks) sc.ticks.color = p.text;
          if (sc.grid) sc.grid.color = p.grid;
        });
      }
      chart.update();
    });
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
        { name: "JUnit 5 + Mockito", val: 100, label: "361 verificaciones", color: p.green },
        { name: "Cypress E2E", val: 97.7, label: "756 pasos · 42/43 puntos", color: p.blue },
        { name: "Apache JMeter", val: 99.92, label: "547 compradores · sin sobreventa", color: p.violet },
        { name: "Lighthouse", val: 96, label: "SEO 100 · BP 96 · 89 pantallas", color: p.teal },
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
            borderRadius: 10,
            barThickness: 26,
          }],
        },
        options: o,
      });

      var o2 = baseOpts();
      o2.plugins.legend.display = false;
      o2.scales.y.beginAtZero = true;
      make("chart-costos", {
        type: "bar",
        data: {
          labels: ["Año 1", "Año 3", "Año 5"],
          datasets: [{
            data: [D.costs.year1, D.costs.year3, D.costs.year5],
            backgroundColor: [p.green + "cc", p.blue + "cc", p.violet + "cc"],
            borderRadius: 10, barThickness: 34,
          }],
        },
        options: o2,
      });

      var o3 = baseOpts();
      o3.plugins.legend.position = "bottom";
      make("chart-capex", {
        type: "doughnut",
        data: {
          labels: ["CAPEX (Desarrollo inicial)", "OPEX (Operación anual)"],
          datasets: [{ data: [D.costs.capex, D.costs.opex], backgroundColor: [p.green, p.amber], borderWidth: 0 }],
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
      o.scales.x.ticks.maxRotation = 40;
      make("chart-modulos", {
        type: "bar",
        data: {
          labels: D.modules12.map(function (m) { return m.id + " · " + m.nombre.split("–")[0].trim(); }),
          datasets: [{
            data: D.modules12.map(function (m) { return m.n; }),
            backgroundColor: p.blue + "cc", borderRadius: 8, barThickness: 16,
          }],
        },
        options: o,
      });

      var o2 = baseOpts();
      o2.plugins.legend.display = false;
      make("chart-rf", {
        type: "doughnut",
        data: {
          labels: ["M01–M05 · 27 RF", "M06–M08 · 13 RF", "M09–M12 · 29 RF"],
          datasets: [{ data: [27, 13, 29], backgroundColor: [p.green, p.blue, p.violet], borderWidth: 0 }],
        },
        options: o2,
      });
    },

    /* ================= UNITARIAS ================= */
    unitarias: function () {
      var p = palette();
      var D = window.KN_DATA;
      var o = baseOpts();
      o.plugins.legend.display = false;
      make("chart-unit-nuevas", {
        type: "doughnut",
        data: {
          labels: ["211 preexistentes", "150 nuevas"],
          datasets: [{ data: [211, D.kpi.unit_new], backgroundColor: [p.blue, p.green], borderWidth: 0 }],
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
          datasets: [{ data: [48, 50, 30, 22], backgroundColor: [p.green, p.blue, p.violet, p.amber], borderRadius: 8, barThickness: 30 }],
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
            backgroundColor: [p.green, p.blue, p.violet, p.amber], borderRadius: 8, barThickness: 34,
          }],
        },
        options: o,
      });

      var o2 = baseOpts();
      o2.plugins.legend.display = false;
      make("chart-e2e-check", {
        type: "doughnut",
        data: {
          labels: ["Correctos (42)", "Con observación (1)"],
          datasets: [{ data: [42, 1], backgroundColor: [p.green, p.amber], borderWidth: 0 }],
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
            { label: "Muestras", data: D.stress_rounds.map(function (r) { return r.muestras; }), backgroundColor: p.blue + "cc", borderRadius: 8, barThickness: 30 },
            { label: "Errores", data: D.stress_rounds.map(function (r) { return r.errores; }), backgroundColor: p.rose + "cc", borderRadius: 8, barThickness: 30 },
          ],
        },
        options: o,
      });

      var o2 = baseOpts();
      o2.plugins.legend.display = false;
      o2.scales.y.max = 100;
      o2.scales.x.ticks.callback = function (v) { return v + " ms"; };
      make("chart-jmeter-p95", {
        type: "bar",
        data: {
          labels: ["Catálogo (r3)", "Login", "Checkout", "Escalado 150", "Spike 100 (r3)"],
          datasets: [{
            data: [453, 1400, 220, 453, 3800],
            backgroundColor: [p.green, p.blue, p.violet, p.teal, p.rose], borderRadius: 8, barThickness: 26,
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
          datasets: [{ data: [100, 100, 99.92], backgroundColor: [p.green, p.green, p.amber], borderRadius: 8, barThickness: 34 }],
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
            backgroundColor: [p.green, p.blue, p.teal, p.amber], borderRadius: 8, barThickness: 38,
          }],
        },
        options: o2,
      });
    },
  };

  function init(page) {
    if (byPage[page]) byPage[page]();
    if (window.buildJmeterTable) window.buildJmeterTable();
    if (window.buildLighthouseTable) window.buildLighthouseTable();
    if (window.buildLighthouseHeatmap) window.buildLighthouseHeatmap();
  }

  return {
    init: init,
    refreshTheme: refresh,
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  var page = document.body.getAttribute("data-page") || "index";
  if (window.KN_DATA && window.Chart) KN_CHARTS.init(page);
});
