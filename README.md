# KN Store — Reportes de Aseguramiento de Calidad

Sistema de reportes web del ciclo de pruebas del proyecto **KN Store Web** (ISO 29119 / IEEE 829), publicado en GitHub Pages: <https://joseph12n.github.io/pruebas/>

## Estructura

```
pruebas/
├── index.html                  # Dashboard ejecutivo (raíz del sitio)
├── pages/                      # Informes por batería de pruebas
│   ├── maestro.html            # Plan Maestro + certificación (firmas)
│   ├── unitarias.html          # JUnit 5 + Mockito
│   ├── e2e.html                # Cypress
│   ├── jmeter.html             # Matriz 91 casos + estrés
│   └── lighthouse.html         # 88 módulos + heatmap
├── assets/
│   ├── css/                    # Design system modular
│   │   ├── tokens.css          # Variables / temas claro-oscuro
│   │   ├── base.css            # Reset + tipografía
│   │   ├── layout.css          # Header, nav, secciones, footer
│   │   ├── components.css      # Tarjetas, tablas, KPIs, diagramas…
│   │   └── print.css           # Estilos de impresión
│   ├── js/
│   │   ├── core/               # theme.js · utils.js · views.js
│   │   ├── charts.js           # Gráficos Chart.js (por página)
│   │   └── data/               # Datos por dominio (se cargan solo los
│   │       ├── core.js         #   necesarios en cada página)
│   │       ├── maestro.js
│   │       ├── e2e.js
│   │       ├── jmeter.js
│   │       └── lighthouse.js
│   └── favicon.svg
├── docs/                       # Fuentes y evidencias del ciclo (.md, PDF)
├── tools/
│   ├── build_data.py           # Genera assets/js/data/*.js desde docs/
│   └── _lighthouse_layout.txt  # Layout de referencia del PDF
└── README.md
```

## Cómo agregar un informe nuevo

1. Crea `pages/<informe>.html` siguiendo el patrón de las páginas existentes (nav, hero, secciones).
2. Si el informe necesita datos propios, agrega la clave en `tools/build_data.py` → `DATA_MODULES` y ejecuta `python3 tools/build_data.py` para regenerar `assets/js/data/<modulo>.js`.
3. Carga en la página solo los módulos de datos que usa, en el orden:

```html
<script src="../assets/js/data/core.js"></script>
<script src="../assets/js/data/<modulo>.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="../assets/js/core/theme.js"></script>
<script src="../assets/js/charts.js"></script>
```

## Verificación local

```bash
python3 -m http.server 8765            # desde la raíz del proyecto
# luego abre http://127.0.0.1:8765/ (index.html y pages/*.html)
```

Se valida con Playwright: estado 200, consola sin errores, sin overflow horizontal (desktop y móvil).

## Publicación

GitHub Pages está configurado desde la rama `main` (carpeta raíz). Cualquier `git push` a `main` publica automáticamente.
