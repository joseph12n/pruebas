# KN Store — Reportes de Aseguramiento de Calidad

Sistema de reportes web del ciclo de pruebas del proyecto **KN Store Web** (ISO 29119 / IEEE 829), publicado en GitHub Pages: <https://joseph12n.github.io/pruebas/>

Diseño **KN·QA Observatory**: un centro de control de calidad con rail de instrumentos, paleta ácida, pantalla de arranque, command palette, gauges animados y revelados por scroll (GSAP + Lenis). Temas claro/oscuro y diseño responsivo.

El sitio es **Jekyll** (lo compila GitHub Pages): el shell vive una sola vez en `_layouts/default.html` + `_includes/` y cada página contiene solo su contenido con front matter. Vista local: `docker run --rm -v "$PWD":/srv/jekyll jekyll/jekyll:4 jekyll build` y servir `_site/`.

## Estructura

```
pruebas/
├── _config.yml                 # Config Jekyll (url, baseurl, exclude)
├── _layouts/default.html       # Shell único: fondo, boot, rail, drawer, topbar,
│                               # main, footer (desde front matter), command palette, scripts
├── _includes/                  # Fragmentos compartidos (se editan UNA vez)
│   ├── head.html               # <head>: meta/og (desde front matter), fonts, CSS
│   ├── nav-rail.html           # Nav del rail con iconos (estado activo por nav_key)
│   ├── nav-drawer.html         # Nav del drawer móvil (01–07)
│   └── scripts.html            # datos (page.data_files) + vendor + core
├── index.html                  # Dashboard ejecutivo (solo contenido + front matter)
├── pages/                      # Informes por batería (solo contenido + front matter)
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

1. Crea `pages/<informe>.html` con su front matter (mirar cualquier página como plantilla): `layout: default`, `title`, `description`, `page_id`, `nav_key`, `root`, `crumb`, `live`, `foot_chip` (+ `foot_chip_class` si no es `ok`), `data_files` (módulos de datos que usa) y `footer_spans`. Debajo va solo el contenido: `<section class="section" id="…" data-nav="…">` por sección.
2. Registra el informe en la navegación (una sola vez): añade el ítem con su icono en `_includes/nav-rail.html` y su fila numerada en `_includes/nav-drawer.html` (reutiliza el patrón `{% if page.nav_key == '…' %} active{% endif %}`).
3. Usa las clases del design system: `.section-head` + `.sec-num`, `.card`, `.kpi`, `.table-wrap`, `.meter-row`, `.gauge-card`, `.terminal`…
4. Si el informe necesita datos propios, agrega la clave en `tools/build_data.py` → `DATA_MODULES`, ejecuta `python3 tools/build_data.py` y lista el módulo en `data_files` del front matter.
5. Verifica en local: `docker run --rm -v "$PWD":/srv/jekyll jekyll/jekyll:4 jekyll build` y revisa `_site/` (o sirve la raíz con un symlink `pruebas → _site` para respetar el `baseurl`).

## Verificación local

```bash
docker run --rm -v "$PWD":/srv/jekyll jekyll/jekyll:4 jekyll build   # genera _site/
mkdir -p /tmp/serve && ln -sfn "$PWD/_site" /tmp/serve/pruebas
python3 -m http.server 8765 --directory /tmp/serve                   # abre /pruebas/
```

Se valida con Playwright contra `http://127.0.0.1:8765/pruebas/`: estado 200, consola sin errores, sin overflow horizontal, charts renderizados, navegación activa correcta y command palette/drawer/tema operativos (desktop y móvil). Tras cambios de maquetación, comparar capturas a página completa contra `.impeccable/review/` (`magick compare -metric RMSE`) para confirmar identidad visual.

## Publicación

GitHub Pages está configurado desde la rama `main` (carpeta raíz). Cualquier `git push` a `main` publica automáticamente.
