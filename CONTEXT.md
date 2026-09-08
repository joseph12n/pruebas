# Contexto de sesión

> Documento de contexto para continuar el proyecto en una nueva sesión.
> Motivo: la sesión anterior (`ses_f811d54d6ffeOnfawxQw5a9Ner` / `ses_f817c83f7ffeFNSzt9dRgNqzyM`)
> quedó en error loop por límite del proveedor: "At most 4 image(s) may be provided in one prompt".
> Regla: NO adjuntar capturas PNG al modelo; usar OCR o texto.

## Proyecto

Reportes HTML de pruebas QA del proyecto **KN Store** en `~/Descargas/pruebas`, publicados en GitHub Pages.
Repo: `git@github.com:joseph12n/pruebas.git` (origin `https://github.com/joseph12n/pruebas.git`)

## Ya hecho (pendiente de commit)

- Reorganización a estructura modular:
  - `pages/{maestro,unitarias,e2e,jmeter,lighthouse}.html` + `index.html` (dashboard)
  - `assets/css/{tokens,base,layout,components,print}.css` (design system claro/oscuro)
  - `assets/js/core/{theme,utils,views}.js` + `assets/js/data/{core,e2e,jmeter,lighthouse,maestro}.js` + `charts.js`
  - `docs/` con los .md y PDF originales
- `index.html` y `pages/*.html` actualizados: rutas nuevas, meta/OG, scripts por página
- `tools/build_data.py` adaptado a salida modular
- `README.md` actualizado, `.gitignore` creado

## Estado (sesión 2026-09-07 — COMPLETADO)

1. ✅ Verificación Playwright (script `/tmp/opencode/verify.js`): 6 rutas × 2 viewports (1366×768, 390×844) — status 200, sin errores de consola/página, sin requests fallidos, sin overflow horizontal, todos los charts renderizados. Capturas en `/tmp/opencode/shots/` inspeccionadas por OCR.
2. ✅ Commit `6f89bc2` + push a `main`
3. ✅ GitHub Pages en vivo: `https://joseph12n.github.io/pruebas/` — index + 5 páginas + assets modulares responden 200
4. ✅ `tools/build_data.py` regenera `assets/js/data/*.js` correctamente

## Pendiente (todo list)

## Notas
