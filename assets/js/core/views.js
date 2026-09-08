/* KN Store QA — vistas interactivas (tablas y heatmap) */
(function () {
  "use strict";

  /* ---------- Tabla filtrable de casos JMeter ---------- */
  window.buildJmeterTable = function () {
    var body = document.getElementById("jmeter-tbody");
    var search = document.getElementById("jmeter-search");
    var fTipo = document.getElementById("jmeter-tipo");
    var fReq = document.getElementById("jmeter-req");
    var count = document.getElementById("jmeter-count");
    if (!body) return;

    var cases = window.KN_DATA.jmeter_cases;
    var tipos = {};
    cases.forEach(function (c) { tipos[c.tipo] = true; });
    Object.keys(tipos).sort().forEach(function (t) {
      var o = document.createElement("option");
      o.value = t; o.textContent = t;
      fTipo.appendChild(o);
    });
    var reqs = {};
    cases.forEach(function (c) { if (c.req) reqs[c.req] = true; });
    Object.keys(reqs).sort(function (a, b) {
      var na = parseInt(a.replace(/\D/g, ""), 10), nb = parseInt(b.replace(/\D/g, ""), 10);
      return (na || 0) - (nb || 0);
    }).forEach(function (r) {
      var o = document.createElement("option");
      o.value = r; o.textContent = r;
      fReq.appendChild(o);
    });

    function render() {
      var q = (search.value || "").toLowerCase().trim();
      var ft = fTipo.value, fr = fReq.value;
      var rows = cases.filter(function (c) {
        if (ft && c.tipo !== ft) return false;
        if (fr && c.req !== fr) return false;
        if (q && !(c.id + " " + c.nombre + " " + (c.req || "")).toLowerCase().includes(q)) return false;
        return true;
      });
      count.textContent = rows.length + " / " + cases.length + " casos";
      body.innerHTML = rows.map(function (c) {
        var ok = c.estado === "PASA";
        return "<tr>" +
          "<td><b>" + esc(c.id) + "</b></td>" +
          "<td>" + esc(c.nombre) + "</td>" +
          "<td><span class='chip info'>" + esc(c.tipo) + "</span></td>" +
          "<td><span class='chip'>" + esc(c.req || "—") + "</span></td>" +
          "<td class='num'>" + (c.samples != null ? c.samples : "—") + "</td>" +
          "<td class='num'>" + (c.avg != null ? c.avg : "—") + "</td>" +
          "<td class='num'>" + (c.p95 != null ? c.p95 : "—") + "</td>" +
          "<td class='num'>" + (c.max != null ? c.max : "—") + "</td>" +
          "<td>" + (ok ? "<span class='chip ok'>" + esc(c.estado) + "</span>" : "<span class='chip'>" + esc(c.estado || "—") + "</span>") + "</td>" +
          "</tr>";
      }).join("");
    }
    [search, fTipo, fReq].forEach(function (el) { el.addEventListener("input", render); });
    render();
  };

  /* ---------- Tabla Lighthouse ---------- */
  window.buildLighthouseTable = function () {
    var body = document.getElementById("lh-tbody");
    var fPanel = document.getElementById("lh-panel");
    var fVista = document.getElementById("lh-vista");
    var count = document.getElementById("lh-count");
    if (!body) return;

    var mods = window.KN_DATA.lighthouse;
    fPanel.innerHTML = '<option value="">Todos los paneles</option>';
    fVista.innerHTML = '<option value="">Todas las vistas</option>';
    ["ADMIN", "CLIENTE"].forEach(function (p) {
      var o = document.createElement("option"); o.value = p; o.textContent = p === "ADMIN" ? "Admin" : "Cliente";
      fPanel.appendChild(o);
    });
    ["DESKTOP", "MOBILE"].forEach(function (v) {
      var o = document.createElement("option"); o.value = v; o.textContent = v === "DESKTOP" ? "Desktop" : "Mobile";
      fVista.appendChild(o);
    });

    function score(m) {
      var vals = [m.performance, m.accesibilidad, m.best_practices, m.seo];
      if (m.agentic != null) vals.push(m.agentic);
      return vals.reduce(function (a, b) { return a + b; }, 0) / vals.length;
    }
    function grade(s) {
      if (s >= 90) return "<span class='chip ok'>Excelente</span>";
      if (s >= 75) return "<span class='chip warn'>Bueno</span>";
      if (s >= 50) return "<span class='chip danger'>Atención</span>";
      return "<span class='chip danger'>Crítico</span>";
    }

    function render() {
      var fp = fPanel.value, fv = fVista.value;
      var rows = mods.filter(function (m) {
        return (!fp || m.panel === fp) && (!fv || m.vista === fv);
      });
      count.textContent = rows.length + " registros";
      body.innerHTML = rows.map(function (m) {
        return "<tr>" +
          "<td><b>" + esc(m.modulo) + "</b></td>" +
          "<td><span class='chip'>" + (m.panel === "ADMIN" ? "Admin" : "Cliente") + "</span></td>" +
          "<td><span class='chip'>" + (m.vista === "DESKTOP" ? "Desktop" : "Mobile") + "</span></td>" +
          "<td class='num'>" + m.performance + "</td>" +
          "<td class='num'>" + m.accesibilidad + "</td>" +
          "<td class='num'>" + m.best_practices + "</td>" +
          "<td class='num'>" + m.seo + "</td>" +
          "<td class='num'>" + (m.agentic != null ? m.agentic : "N/A") + "</td>" +
          "<td class='num'><b>" + score(m).toFixed(1) + "</b></td>" +
          "<td>" + grade(score(m)) + "</td>" +
          "</tr>";
      }).join("");
    }
    [fPanel, fVista].forEach(function (el) { el.addEventListener("change", render); });
    render();
  };

  /* ---------- Heatmap Lighthouse ---------- */
  window.buildLighthouseHeatmap = function () {
    var wrap = document.getElementById("lh-heat");
    if (!wrap) return;
    var mods = window.KN_DATA.lighthouse;
    function score(m) {
      var vals = [m.performance, m.accesibilidad, m.best_practices, m.seo];
      if (m.agentic != null) vals.push(m.agentic);
      return vals.reduce(function (a, b) { return a + b; }, 0) / vals.length;
    }
    function color(s) {
      if (s >= 90) return "#10b981";
      if (s >= 75) return "#f59e0b";
      if (s >= 50) return "#f97316";
      return "#f43f5e";
    }
    wrap.innerHTML = mods.map(function (m) {
      var s = score(m);
      return "<div class='heat-tile' style='background:" + color(s) + "' title='" + esc(m.modulo) +
        " · " + m.panel + " " + m.vista + " · " + s.toFixed(1) + "'>" +
        "<div class='hm-score'>" + s.toFixed(1) + "</div>" +
        "<div class='hm-name'>" + esc(m.modulo) + "</div></div>";
    }).join("");
  };
})();
