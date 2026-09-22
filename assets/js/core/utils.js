/* KN·QA Observatory — utilidades compartidas */
(function () {
  "use strict";

  window.fmtCOP = function (n) {
    return "$" + n.toLocaleString("es-CO", { maximumFractionDigits: 0 });
  };

  window.fmtInt = function (n) {
    return Number(n).toLocaleString("es-CO", { maximumFractionDigits: 0 });
  };

  window.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };

  window.KN_REDUCED = false;
  try {
    window.KN_REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  window.KN_ROOT = document.body ? (document.body.getAttribute("data-root") || ".") : ".";
})();
