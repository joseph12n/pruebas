/* KN Store QA — utilidades compartidas */
(function () {
  "use strict";

  window.fmtCOP = function (n) {
    return "$" + n.toLocaleString("es-CO", { maximumFractionDigits: 0 });
  };

  window.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
})();
