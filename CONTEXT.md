# Contexto de sesión

> Documento de contexto para continuar el proyecto en una nueva sesión.
> Regla: NO adjuntar capturas PNG al modelo; usar OCR o texto.

## Proyecto

Reportes HTML de pruebas QA del proyecto **KN Store** en `~/Descargas/pruebas`, publicados en GitHub Pages.
Repo: `git@github.com:joseph12n/pruebas.git` (origin `https://github.com/joseph12n/pruebas.git`)

## 2026-09-22 — Informe de Cobertura + pulido y actualización de datos

Solicitud: añadir el informe de cobertura (JaCoCo + Vitest de la corrida del 2026-09-22) al sitio y actualizar el conjunto para que se vea profesional. Publicación autorizada por el usuario (commit + push a `main`).

- **Página nueva `pages/cobertura.html`** (informe 04 del rail): hero + ticker → 01 Resumen (KPIs 70,1 % back / 41,3 % ramas / 50,97 % front / 1.384 pruebas, gauges, doughnut de pruebas, umbrales 45/35/40/45 con medidores) → 02 Metodología (JaCoCo 0.8.14 merge unit+IT sobre 194 clases, Vitest v8/istanbul sobre 78 archivos propios, doble comprobación IntelliJ 853/853) → 03 Backend por paquete (chart + tabla 19) → 04 Detalle por clase (tabla filtrable 194) → 05 Frontend por archivo (chart + tabla filtrable 78) → 06 Focos de mejora (H-05 ramas, panel /cuenta sin specs, material sin acción, lo sólido).
- **Pipeline de datos:** `docs/cobertura/jacoco.csv` + `docs/cobertura/vitest-resumen.json` (crudos) → `tools/build_data.py` (sección COBERTURA) → `assets/js/data/cobertura.js`. Nuevas vistas en `views.js` (3 tablas filtrables con chips por zona) y 3 charts en `charts.js`.
- **Navegación:** rail + drawer de las 7 páginas con "Cobertura" (drawer 04, renumerado E2E/JMeter/Lighthouse a 05/06/07) e icono pie-chart coherente con el set.
- **Datos actualizados a la corrida del 22-sep:** unitarias 361→363 (+2 regresión RF-072), 1.384 pruebas totales (363 unit + 487 IT + 534 front), backlog `ItemCarritoResourceIT` cerrado (17/17), JaCoCo ya midiendo (70,1 % líneas) enlazado desde unitarias, ticker/KPIs/lead/index con cobertura y el Comité de Calidad movido al footer (grilla de informes queda 6/6).
- **Pulido:** `.grid.cols-2` pasó de auto-fit (grillas 4×3+1 huérfanas) a 2 columnas reales + `@media ≤700px` → arregla 7 bloques en cobertura, unitarias, e2e y maestro; `print.css` fija `--accent-ink: #f7fee7` (los badges se imprimían con contraste 2,6:1); etiqueta del paquete raíz "com.mycompany.knstore (raíz)".
- **Verificación:** capturas post-fix en `.impeccable/review/` (desktop 1440 / mobile 390 × claro/oscuro + index + unitarias), 0 errores de consola, 0 overflow horizontal, tablas 194/19/78 y 3 charts renderizando. Detector de diseño `impeccable detect --json` (79 hallazgos: 2 arreglados —contraste de impresión y grillas—; el resto es identidad del mundo KN·QA Observatory fijada: rail mono 10px, eyebrow, ticker marquee, orbes, live-dot).
- Contrato de dirección en `.impeccable/surfaces/pages-cobertura-html.md` (build code-led, extensión de superficie sin comp).

## Rediseño 2026-09-10 — "KN·QA Observatory" (COMPLETADO; publicado el 2026-09-22)

Resumen histórico del rediseño (libertad total): centro de control de calidad con rail de instrumentos, paleta ácida lima (#c6f542) sobre fondo casi negro, tipografías Unbounded + JetBrains Mono + Inter. Shell con fondo orbes/grid/grano, boot screen, topbar sticky, rail con scrollspy, drawer móvil, command palette (Ctrl/⌘+K o `/`), botón subir, progreso de scroll y cursor glow. Componentes: hero con radar/scanline, ticker marquee, KPIs con contadores, gauges SVG animados, medidores, tablas filtrables, heatmap, terminal con copiar, firmas, timeline y riesgos. Movimiento con GSAP 3.12.5 + ScrollTrigger + Lenis 1.1.14 (vendorizados), reveals, contadores, gauges y parallax; respeta `prefers-reduced-motion` y hay fallback sin JS. Verificado el 2026-09-10 con Playwright (6 rutas × 2 viewports, claro/oscuro: 0 errores, 0 overflow, charts/palette/drawer OK).

## Pendiente

- Nada bloqueante. Notas: el `git status` del repo incluía el rediseño del 2026-09-10 sin commitear; esta publicación lo incluye (confirmado con el usuario).

## Notas

- Servidor local usado: `python3 -m http.server 8765` (matar con `pkill -f "http.server 8765"`).
- OCR: usar herramientas `ocr_*` sobre `/tmp/opencode/shots/`; para tema oscuro invertir antes con PIL (`ImageOps.invert`).
- El botón de tema guarda en `localStorage["kn-theme"]`; los colores de Chart.js se leen de variables CSS y se reconstruyen al cambiar de tema.
