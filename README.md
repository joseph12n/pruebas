# KN Store — Reportes de Aseguramiento de Calidad

Sistema de reportes web del ciclo de pruebas del proyecto **KN Store Web** (ISO 29119 / IEEE 829), publicado en GitHub Pages: <https://joseph12n.github.io/pruebas/>

Diseño **KN·QA Observatory**: un centro de control de calidad con rail de instrumentos, paleta ácida, pantalla de arranque, command palette, gauges animados y revelados por scroll (GSAP + Lenis). Temas claro/oscuro y diseño responsivo.

## Estructura

```
pruebas/
├── index.html                  # Dashboard ejecutivo (raíz del sitio)
├── pages/                      # Informes por batería de pruebas
│   ├── maestro.html            # Plan Maestro + certificación (firmas)
│   ├── unitarias.html          # JUnit 5 + Mockito
│   ├── cobertura.html          # Cobertura de código — JaCoCo + Vitest
│   ├── e2e.html                # Cypress
│   ├── jmeter.html             # Matriz 91 casos + estrés
│   └── lighthouse.html         # 89 módulos + heatmap
├── assets/
│   ├── css/                    # Design system modular
│   │   ├── tokens.css          # Variables / temas claro-oscuro
│   │   ├── base.css            # Reset + tipografía
│   │   ├── layout.css          # Shell: fondo, rail, topbar, drawer, footer
│   │   ├── components.css      # Hero, KPI, gauges, tablas, heatmap, terminal…
│   │   ├── motion.css          # Estados de revelado + glow de puntero
│   │   └── print.css           # Estilos de impresión
│   ├── js/
│   │   ├── core/
│   │   │   ├── theme.js        # Tema claro/oscuro persistente
│   │   │   ├── utils.js        # Helpers (formato, escape, reduced-motion)
│   │   │   ├── shell.js        # Rail, scrollspy, drawer, command palette, copiar
│   │   │   ├── views.js        # Tablas filtrables (JMeter/Lighthouse/Cobertura) + heatmap
│   │   │   └── motion.js       # Boot, Lenis + GSAP, reveals, contadores, gauges
│   │   ├── charts.js           # Gráficos Chart.js (por página)
│   │   └── data/               # Datos por dominio (se cargan solo los
│   │       ├── core.js         #   necesarios en cada página)
│   │       ├── maestro.js
│   │       ├── e2e.js
│   │       ├── jmeter.js
│   │       ├── lighthouse.js
│   │       └── cobertura.js    # JaCoCo (unit+IT) + Vitest por clase/archivo
│   ├── vendor/                 # Librerías locales (sin CDN en runtime)
│   │   ├── chart.umd.min.js    # Chart.js 4.4.1
│   │   ├── gsap.min.js         # GSAP 3.12.5
│   │   ├── ScrollTrigger.min.js
│   │   └── lenis.min.js        # Scroll suave 1.1.14
│   └── favicon.svg
├── docs/                       # Fuentes y evidencias del ciclo (.md, PDF)
│   └── cobertura/              # Datos crudos: jacoco.csv (unit+IT) y vitest-resumen.json
├── tools/
│   ├── build_data.py           # Genera assets/js/data/*.js desde docs/
│   └── _lighthouse_layout.txt  # Layout de referencia del PDF
└── README.md
```

## Interacciones destacadas

| Función | Cómo se usa |
| --- | --- |
| Command palette | `Ctrl`/`⌘` + `K` o la tecla `/` — busca páginas y secciones |
| Rail lateral | Navegación + índice de la página con scrollspy |
| Drawer móvil | Botón de menú en la barra superior |
| Tema claro/oscuro | Botón sol/luna; se guarda en `localStorage` (`kn-theme`) |
| Reveals y contadores | GSAP + ScrollTrigger, activados por scroll |
| Prefers-reduced-motion | Desactiva animaciones y muestra todo el contenido |
| Sin JavaScript | El contenido y la navegación estática siguen disponibles |
| Imprimir | `print.css` limpia el shell y conserva tablas/certificación |

## Cómo agregar un informe nuevo

1. Crea `pages/<informe>.html` copiando el shell de una página existente (bloque `.bg`, `.boot`, `.rail`, `.drawer`, `.topbar`, `footer`, command palette y scripts). Ajusta `data-page`, `data-root=".."` y las rutas `../`.
2. Marca cada sección con `id` y `data-nav="Etiqueta"` para que aparezca en el rail y en el command palette:
   ```html
   <section class="section" id="mi-seccion" data-nav="Mi sección">
   ```
3. Usa las clases del design system: `.section-head` + `.sec-num`, `.card`, `.kpi`, `.table-wrap`, `.meter-row`, `.gauge-card`, `.terminal`…
4. Si el informe necesita datos propios, agrega la clave en `tools/build_data.py` → `DATA_MODULES` y ejecuta `python3 tools/build_data.py` para regenerar `assets/js/data/<modulo>.js`.
5. Carga en la página solo los módulos de datos que usa, en el orden:

```html
<script src="../assets/js/data/core.js"></script>
<script src="../assets/js/data/<modulo>.js"></script>
<script src="../assets/vendor/chart.umd.min.js"></script>
<script src="../assets/vendor/gsap.min.js"></script>
<script src="../assets/vendor/ScrollTrigger.min.js"></script>
<script src="../assets/vendor/lenis.min.js"></script>
<script src="../assets/js/core/theme.js"></script>
<script src="../assets/js/core/utils.js"></script>
<script src="../assets/js/core/shell.js"></script>
<script src="../assets/js/core/views.js"></script>
<script src="../assets/js/charts.js"></script>
<script src="../assets/js/core/motion.js"></script>
```

## Verificación local

```bash
python3 -m http.server 8765            # desde la raíz del proyecto
# luego abre http://127.0.0.1:8765/ (index.html y pages/*.html)
```

Se valida con Playwright: estado 200, consola sin errores, sin overflow horizontal, charts renderizados, command palette/drawer/tema operativos (desktop y móvil).

## Publicación

GitHub Pages está configurado desde la rama `main` (carpeta raíz). Cualquier `git push` a `main` publica automáticamente.
