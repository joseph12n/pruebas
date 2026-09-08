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

## Pendiente (todo list)

1. Verificar con Playwright: rutas nuevas, consola sin errores, responsive
   - Usar OCR para inspeccionar capturas, no adjuntar imágenes al chat
2. Commit (todo lo anterior) y push
3. Activar/verificar sitio en GitHub Pages en vivo

## Notas

- Servidor local: `python3 -m http.server` en la raíz del repo
- Verificar `tools/build_data.py` regenera `assets/js/data/*.js` correctamente
