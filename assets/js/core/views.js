/* KN·QA Observatory — vistas interactivas (tablas y heatmap) */
(function () {
  "use strict";

  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

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

  /* ---------- Cobertura: paquetes backend + detalle por clase + archivos frontend ---------- */
  function covChip(pct) {
    if (pct >= 80) return "<span class='chip ok'>" + pct.toFixed(1) + " %</span>";
    if (pct >= 50) return "<span class='chip info'>" + pct.toFixed(1) + " %</span>";
    if (pct >= 25) return "<span class='chip warn'>" + pct.toFixed(1) + " %</span>";
    return "<span class='chip danger'>" + pct.toFixed(1) + " %</span>";
  }

  function renderVacia(body, search, limpiar, volver) {
    var q = (search.value || "").trim();
    body.innerHTML = "<tr><td colspan='6' class='u-muted' style='text-align:center;padding:24px'>Sin resultados" +
      (q ? " para «" + esc(q) + "»" : "") +
      " · <button type='button' class='copy-btn' data-clear>Limpiar filtros</button></td></tr>";
    var btn = body.querySelector("[data-clear]");
    if (btn) btn.addEventListener("click", function () { search.value = ""; limpiar(); volver(); });
  }

  window.buildCoberturaPaquetes = function () {
    var body = document.getElementById("cov-pk-tbody");
    if (!body) return;
    var pks = window.KN_DATA.cobertura.backend.paquetes.slice().reverse();
    body.innerHTML = pks.map(function (p) {
      var lp = p.lt ? (p.lc / p.lt * 100) : 0;
      var bp = p.bt ? (p.bc / p.bt * 100) : 0;
      return "<tr>" +
        "<td><b>" + (p.n === "(raíz)" ? "com.mycompany.knstore <span class='u-muted'>(raíz)</span>" : "com.mycompany.knstore." + esc(p.n)) + "</b></td>" +
        "<td class='num'>" + p.clases + "</td>" +
        "<td class='num'>" + fmtInt(p.lc) + " / " + fmtInt(p.lt) + "</td>" +
        "<td>" + covChip(lp) + "</td>" +
        "<td class='num'>" + (p.bt ? fmtInt(p.bc) + " / " + fmtInt(p.bt) : "—") + "</td>" +
        "<td class='num'>" + (p.bt ? bp.toFixed(1) + " %" : "—") + "</td>" +
        "<td class='num'>" + (p.mt ? (p.mc / p.mt * 100).toFixed(1) + " %" : "—") + "</td>" +
        "</tr>";
    }).join("");
  };

  window.buildCoberturaClases = function () {
    var body = document.getElementById("cov-cl-tbody");
    var search = document.getElementById("cov-cl-search");
    var fPk = document.getElementById("cov-cl-pk");
    var count = document.getElementById("cov-cl-count");
    if (!body) return;

    var rows0 = window.KN_DATA.cobertura.backend.por_clase;
    var pks = {};
    rows0.forEach(function (c) { pks[c.p] = true; });
    Object.keys(pks).sort().forEach(function (t) {
      var o = document.createElement("option");
      o.value = t; o.textContent = t;
      fPk.appendChild(o);
    });

    function render() {
      var q = (search.value || "").toLowerCase().trim();
      var fp = fPk.value;
      var rows = rows0.filter(function (c) {
        if (fp && c.p !== fp) return false;
        if (q && !(c.n + " " + c.p).toLowerCase().includes(q)) return false;
        return true;
      });
      count.textContent = rows.length + " / " + rows0.length + " clases";
      if (!rows.length) { renderVacia(body, search, function () { fPk.value = ""; }, render); return; }
      body.innerHTML = rows.map(function (c) {
        var lp = c.lt ? (c.lc / c.lt * 100) : 0;
        var bp = c.bt ? (c.bc / c.bt * 100) : 0;
        return "<tr>" +
          "<td><b>" + esc(c.n) + "</b></td>" +
          "<td class='u-muted'>" + esc(c.p) + "</td>" +
          "<td class='num'>" + fmtInt(c.lc) + " / " + fmtInt(c.lt) + "</td>" +
          "<td>" + covChip(lp) + "</td>" +
          "<td class='num'>" + (c.bt ? bp.toFixed(1) + " %" : "—") + "</td>" +
          "<td class='num'>" + (c.mt ? (c.mc / c.mt * 100).toFixed(1) + " %" : "—") + "</td>" +
          "</tr>";
      }).join("");
    }
    [search, fPk].forEach(function (el) { el.addEventListener("input", render); });
    render();
  };

  window.buildCoberturaFront = function () {
    var body = document.getElementById("cov-fe-tbody");
    var search = document.getElementById("cov-fe-search");
    var fArea = document.getElementById("cov-fe-area");
    var count = document.getElementById("cov-fe-count");
    if (!body) return;

    var rows0 = window.KN_DATA.cobertura.frontend.archivos;
    window.KN_DATA.cobertura.frontend.areas.forEach(function (a) {
      var o = document.createElement("option");
      o.value = a.n; o.textContent = a.n + " (" + a.arch + ")";
      fArea.appendChild(o);
    });

    function render() {
      var q = (search.value || "").toLowerCase().trim();
      var fa = fArea.value;
      var rows = rows0.filter(function (f) {
        if (fa && f.a !== fa) return false;
        if (q && !(f.ruta + " " + f.a).toLowerCase().includes(q)) return false;
        return true;
      });
      count.textContent = rows.length + " / " + rows0.length + " archivos";
      if (!rows.length) { renderVacia(body, search, function () { fArea.value = ""; }, render); return; }
      body.innerHTML = rows.map(function (f) {
        var lp = f.ln ? (f.lnc / f.ln * 100) : 0;
        var sp = f.st ? (f.stc / f.st * 100) : 0;
        var bp = f.bt ? (f.b / f.bt * 100) : 0;
        return "<tr>" +
          "<td><b>" + esc(f.n) + "</b></td>" +
          "<td class='u-muted'>" + esc(f.a) + "</td>" +
          "<td>" + covChip(lp) + "</td>" +
          "<td class='num'>" + sp.toFixed(1) + " %</td>" +
          "<td class='num'>" + (f.bt ? bp.toFixed(1) + " %" : "—") + "</td>" +
          "<td class='num'>" + (f.fn ? (f.fnc / f.fn * 100).toFixed(1) + " %" : "—") + "</td>" +
          "</tr>";
      }).join("");
    }
    [search, fArea].forEach(function (el) { el.addEventListener("input", render); });
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
    var tones = {
      ok: cssVar("--ok", "#10b981"),
      warn: cssVar("--warn", "#f59e0b"),
      danger: cssVar("--danger", "#f43f5e")
    };
    function color(s) {
      if (s >= 90) return tones.ok;
      if (s >= 75) return tones.warn;
      if (s >= 50) return "#f97316";
      return tones.danger;
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
