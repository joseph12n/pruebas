#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extrae los datos de los reportes .md y del PDF de Lighthouse y genera assets/js/data.js"""
import json
import re
import subprocess
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()

# ---------------------------------------------------------------------------
# 1. LIGHTHOUSE (PDF -> tablas estructuradas con PyMuPDF)
# ---------------------------------------------------------------------------
import pymupdf

pdf = os.path.join(BASE, "Informe_Pruebas_Kn-store_Lighthouse.pdf")
doc = pymupdf.open(pdf)
modules = []
prev = None
buf = []

def is_score(row):
    try:
        return row[3] is not None and str(row[3]).strip().isdigit()
    except (IndexError, TypeError):
        return False

def num(v):
    try:
        return int(str(v).strip())
    except (TypeError, ValueError):
        return None

for pno in (3, 4, 5):
    t = doc[pno].find_tables().tables[0]
    rows = t.extract()
    for row in rows[2:]:
        if not is_score(row):
            chunk = row[2] if len(row) > 2 else None
            if chunk and str(chunk).strip():
                buf.append(str(chunk).strip())
            continue
        chunk = str(row[2]).strip() if row[2] else ""
        # resolver buffer: lo anterior al primer token "Panel/operación" es
        # sufijo del módulo anterior; lo restante es prefijo del actual
        if prev is not None and buf:
            idx = next((i for i, c in enumerate(buf) if c.lower().startswith(("panel", "operación"))), len(buf))
            if idx:
                prev["modulo"] += " " + " ".join(buf[:idx])
            buf = buf[idx:]
        prefix = " ".join(buf).strip()
        buf = []
        rec = {
            "panel": str(row[0]).strip() if row[0] else "",
            "vista": str(row[1]).strip() if row[1] else "",
            "modulo": (prefix + " " + chunk).strip() if prefix else chunk,
            "performance": num(row[3]),
            "accesibilidad": num(row[4]),
            "best_practices": num(row[7]),
            "seo": num(row[10]),
            "agentic": None,
        }
        ag = row[11]
        if ag and re.match(r"^\d\s*/\s*2$", str(ag).strip()):
            rec["agentic"] = int(str(ag).strip()[0]) / 2 * 100
        modules.append(rec)
        prev = rec

# aplicar sufijos pendientes al final
if prev is not None and buf:
    prev["modulo"] += " " + " ".join(buf)

# limpieza final de nombres
for m in modules:
    m["modulo"] = re.sub(r"\s+", " ", m["modulo"]).strip()
    m["modulo"] = re.sub(r"\s*-\s*", " - ", m["modulo"])
    m["modulo"] = re.sub(r"\s+", " ", m["modulo"]).strip()
    m.pop("_hyphen", None)

# ---------------------------------------------------------------------------
# 2. JMETER: matriz de casos + resultados
# ---------------------------------------------------------------------------
jm = read(os.path.join(BASE, "plan_jmeter.md"))
cases = {}
res_lines = []

in_res = False
for line in jm.splitlines():
    if line.startswith("## Resultados de ejecución"):
        in_res = True
        continue
    if in_res:
        if line.startswith("| CP-"):
            parts = [p.strip() for p in line.strip("|").split("|")]
            if len(parts) >= 7:
                res_lines.append(parts)

# matriz
for line in jm.splitlines():
    if not line.startswith("| CP-"):
        continue
    parts = [p.strip() for p in line.strip("|").split("|")]
    if len(parts) < 8:
        continue
    cid = parts[0]
    nombre = parts[2]
    tipo = parts[3]
    func = parts[6]
    req = func.split()[0] if func.split() else ""
    cases[cid] = {"id": cid, "nombre": nombre, "tipo": tipo, "req": req,
                  "samples": None, "avg": None, "p95": None, "max": None, "estado": None}

for p in res_lines:
    cid = p[0]
    if cid not in cases:
        cases[cid] = {"id": cid, "nombre": p[1], "tipo": "", "req": "",
                      "samples": None, "avg": None, "p95": None, "max": None, "estado": p[2]}
    cases[cid]["estado"] = p[2]
    try:
        cases[cid]["samples"] = int(p[3])
        cases[cid]["avg"] = int(p[4])
        cases[cid]["p95"] = int(p[5])
        cases[cid]["max"] = int(p[6])
    except (ValueError, IndexError):
        pass

jmeter_cases = [cases[k] for k in sorted(cases, key=lambda x: int(x.split("-")[1]))]

# ---------------------------------------------------------------------------
# 3. SALIDA data.js
# ---------------------------------------------------------------------------
authors = [
    "Joseph Nicolás Varón Vargas",
    "Santiago Flórez Moreno",
    "Laura González Ortiz",
    "Nicolás Gil Rodríguez",
]

costs = {
    "capex": 19680000, "opex": 5490000, "year1": 25170000,
    "year3": 36150000, "year5": 47130000, "hours": 328,
}

modules12 = [
    {"id": "M01", "nombre": "Autenticación y Sesión", "rfs": "RF001–RF005", "n": 5},
    {"id": "M02", "nombre": "Gestión de Usuarios", "rfs": "RF006–RF010", "n": 5},
    {"id": "M03", "nombre": "Catálogo – Categorías", "rfs": "RF011–RF019", "n": 9},
    {"id": "M04", "nombre": "Catálogo – Productos", "rfs": "RF020–RF030", "n": 11},
    {"id": "M05", "nombre": "Perfil de Usuario", "rfs": "RF031–RF033", "n": 3},
    {"id": "M06", "nombre": "Panel Administrativo", "rfs": "RF034–RF036", "n": 3},
    {"id": "M07", "nombre": "Direcciones de Envío", "rfs": "RF037–RF041", "n": 5},
    {"id": "M08", "nombre": "Carrito de Compras", "rfs": "RF042–RF046", "n": 5},
    {"id": "M09", "nombre": "Checkout y Pedidos", "rfs": "RF047–RF053", "n": 7},
    {"id": "M10", "nombre": "Pagos", "rfs": "RF054–RF059", "n": 6},
    {"id": "M11", "nombre": "Envíos", "rfs": "RF060–RF065", "n": 6},
    {"id": "M12", "nombre": "Facturación", "rfs": "RF066–RF069", "n": 4},
]

timeline = [
    {"dia": "Día 1", "act": "Análisis de requisitos RF001–RF069 y revisión de documentación"},
    {"dia": "Día 2", "act": "Definición de estrategia de pruebas y clasificación de módulos"},
    {"dia": "Día 3–4", "act": "Diseño de casos de prueba para flujos críticos"},
    {"dia": "Día 5", "act": "Elaboración de la matriz de trazabilidad"},
    {"dia": "Día 6", "act": "Revisión y validación interna del Plan Maestro"},
    {"dia": "Día 7", "act": "Ajustes y correcciones según observaciones"},
    {"dia": "Día 8", "act": "Consolidación de entregables QA"},
    {"dia": "Día 9", "act": "Revisión final de consistencia y cobertura"},
    {"dia": "Día 10", "act": "Entrega formal y cierre de planificación"},
]
milestones = [
    {"id": "H1", "nombre": "Finalización del análisis de requisitos"},
    {"id": "H2", "nombre": "Diseño completo de los casos de prueba"},
    {"id": "H3", "nombre": "Matriz de trazabilidad finalizada"},
    {"id": "H4", "nombre": "Plan Maestro de Pruebas aprobado"},
    {"id": "H5", "nombre": "Entrega de los documentos finales de QA"},
]

stack = [
    {"cat": "Automatización E2E", "tool": "Chrome y Edge", "resp": "Todo el equipo"},
    {"cat": "Pruebas de APIs", "tool": "Postman", "resp": "Todo el equipo"},
    {"cat": "Pruebas unitarias", "tool": "JUnit + Mockito", "resp": "Todo el equipo"},
    {"cat": "Pruebas de integración", "tool": "Selenium", "resp": "Todo el equipo"},
    {"cat": "Pruebas de rendimiento", "tool": "JMeter", "resp": "Todo el equipo"},
    {"cat": "Pruebas 2N2", "tool": "Cypress", "resp": "Todo el equipo"},
]

risks = [
    {"t": "Indisponibilidad temporal del ambiente de pruebas",
     "d": "El ambiente de staging puede presentar caídas temporales o problemas de conectividad.",
     "c": "Coordinar restauración con desarrollo y reprogramar pruebas afectadas."},
    {"t": "Datos de prueba insuficientes o desactualizados",
     "d": "Usuarios, productos o pedidos necesarios pueden no estar disponibles o ser inconsistentes.",
     "c": "Mantener datos validados y actualizar la BD de pruebas antes de cada ciclo."},
    {"t": "Errores en integraciones externas",
     "d": "Servicios de pagos, envíos o autenticación pueden comportarse de forma inesperada.",
     "c": "Usar entornos de prueba o datos simulados y registrar incidencias."},
    {"t": "Incompatibilidad entre navegadores",
     "d": "Algunas funcionalidades pueden variar entre Chrome y Edge.",
     "c": "Ejecutar pruebas de compatibilidad en ambos navegadores y reportar diferencias."},
]

e2e_cases = [
    {"id": "CP-1", "modulo": "Cliente", "nombre": "Flujo-registro-knstore",
     "evidencia": "Registro de usuario anónimo", "archivo": "cliente/Flujo-registro-knsotre.json",
     "pasos": 25, "checkouts": 5, "estado": "Correcto",
     "puntos": ["Carga de la página de inicio", "Acceso al formulario de registro",
                "Registro del nuevo cliente", "Confirmación y redirección a login",
                "Inicio de sesión post-registro"]},
    {"id": "CP-2", "modulo": "Cliente", "nombre": "PANEL_CLIENTE",
     "evidencia": "Automatización / testing del panel del cliente", "archivo": "cliente/PANEL_CLIENTE.json",
     "pasos": 201, "checkouts": 8, "estado": "Con observación",
     "puntos": ["Inicio de sesión", "Edición de perfil (1.ª)", "Edición de perfil (2.ª)",
                "Búsqueda de producto", "Reintentos de inicio de sesión",
                "Registro de dirección", "Edición de dirección", "Cambio de contraseña"]},
    {"id": "CP-3", "modulo": "Admin", "nombre": "KNSTORE — MOD-ENTIDADES (CRUD)",
     "evidencia": "Evidencia 1 — Gestión de entidades (catálogo)", "archivo": "admin/KNSTORE-MOD-ENTIDADES.json",
     "pasos": 376, "checkouts": 18, "estado": "Correcto",
     "puntos": ["Tipo Documento", "Cuenta (cliente)", "Categoría", "Subcategoría", "Marca",
                "Categoría IVA", "Producto", "Producto Precio", "Producto Inventario",
                "Producto Imagen", "Etiqueta Producto", "Dirección", "Pedido", "Item Pedido",
                "Item Carrito", "Pago", "Envío", "Factura"]},
    {"id": "CP-4", "modulo": "Admin", "nombre": "KNSTORE — MOD-ADMIN / MOD-CUENTA",
     "evidencia": "Evidencia 2 — Módulo de administración y cuenta", "archivo": "admin/KNSTORE-MOD-ADMIN-MOD-CUENTA.json",
     "pasos": 154, "checkouts": 12, "estado": "Correcto",
     "puntos": ["Gestión de usuarios", "Métricas", "Salud (health check)", "Configuración",
                "Logs", "Operación · Pedidos", "Operación · Envíos", "Operación · Reembolsos",
                "API (documentación)", "Mi cuenta · Editar información",
                "Segunda edición de información", "Dirección de la cuenta"]},
]

stress_scenarios = [
    {"id": "ES-01a…d", "modulo": "Catálogo (RNF-007/022)", "esc": "Lectura pública: listado paginado, búsqueda full-text, categorías y detalle por slug", "carga": "50 → 100 hilos", "esp": "P95 < 500 ms; 0 errores"},
    {"id": "ES-02", "modulo": "Autenticación", "esc": "Login (coste bcrypt) bajo concurrencia", "carga": "40 → 60 hilos", "esp": "0 errores; P95 ≈ 0,4–1,4 s"},
    {"id": "ES-03", "modulo": "Checkout", "esc": "Escritura atómica de pedidos + pago + envío + factura", "carga": "40 → 60 hilos", "esp": "0 errores; stock sin negativos"},
    {"id": "ES-04", "modulo": "Concurrencia (RNF-024)", "esc": "30–60 hilos simultáneos sobre stock 15", "carga": "50 → 60 hilos", "esp": "15 ventas / resto rechazos; sin sobreventa"},
    {"id": "ES-04v", "modulo": "Verificación RNF-024", "esc": "Comprobación de stock final tras concurrencia", "carga": "1 consulta", "esp": "stock == 0"},
    {"id": "ES-05", "modulo": "Resistencia (soak)", "esc": "Lectura sostenida durante S5_DUR", "carga": "12 hilos · 60–240 s", "esp": "Sin degradación ni errores"},
    {"id": "ES-06", "modulo": "Spike", "esc": "Ráfaga brusca (ramp 2 s) sobre catálogo", "carga": "100 hilos", "esp": "Punto de saturación documentado (P95 ≈ 3,8 s)"},
    {"id": "ES-07", "modulo": "Escalado", "esc": "Rampa gradual (ramp 120 s) a 150 hilos", "carga": "150 hilos", "esp": "Estabilidad: listado P95 ≈ 453 ms"},
]

stress_rounds = [
    {"ronda": "1 · Base", "carga": "25/25/20/30 hilos · soak 60 s", "muestras": 1112, "errores": 0, "obs": "Todo verde"},
    {"ronda": "2 · Carga alta", "carga": "60/40/40/50 hilos · soak 300 s", "muestras": 7320, "errores": 0, "obs": "Estable, 21,5 req/s"},
    {"ronda": "3 · Límite", "carga": "100/60/60/60 · spike 100 (2 s) · escalado 150 · soak 240 s", "muestras": 8920, "errores": 7, "obs": "99,92 % de éxito; spike P95 3,8 s; recuperación inmediata"},
]

data = {
    "meta": {
        "proyecto": "KN – Store Web",
        "titulo": "Aseguramiento de Calidad — KN Store",
        "ambiente": "https://app.knstore.duckdns.org",
        "fecha_ejecucion": "15 – 29 de agosto de 2026",
        "version_plan": "1.0",
        "fecha_plan": "06/06/2026",
        "codigo": "MTP-2026-Kn-Store-001",
        "clasificacion": "Confidencial / Interno",
        "veredicto": "APROBADO · GO",
        "autores": authors,
    },
    "kpi": {
        "unit_suites": 93, "unit_tests": 361, "unit_new": 150, "unit_fail": 0,
        "e2e_cases": 4, "e2e_steps": 756, "e2e_checkpoints": 43, "e2e_correct": 42,
        "jmeter_cases": 91, "jmeter_samples": 6800, "jmeter_success": 99.92,
        "lighthouse_screens": 89, "lighthouse_seo": 100, "lighthouse_bp": 96,
        "critical_defects": 0,
    },
    "costs": costs,
    "modules12": modules12,
    "timeline": timeline,
    "milestones": milestones,
    "stack": stack,
    "risks": risks,
    "e2e_cases": e2e_cases,
    "stress_scenarios": stress_scenarios,
    "stress_rounds": stress_rounds,
    "jmeter_cases": jmeter_cases,
    "lighthouse": modules,
}

out = "window.KN_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"
with open(os.path.join(BASE, "assets", "js", "data.js"), "w", encoding="utf-8") as f:
    f.write(out)

print("lighthouse modules:", len(modules))
print("jmeter cases:", len(jmeter_cases))
print("con timing:", sum(1 for c in jmeter_cases if c["avg"] is not None))
print("sin timing:", [c["id"] for c in jmeter_cases if c["avg"] is None])
