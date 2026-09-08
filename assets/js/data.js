window.KN_DATA = {
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
    "autores": [
      "Joseph Nicolás Varón Vargas",
      "Santiago Flórez Moreno",
      "Laura González Ortiz",
      "Nicolás Gil Rodríguez"
    ]
  },
  "kpi": {
    "unit_suites": 93,
    "unit_tests": 361,
    "unit_new": 150,
    "unit_fail": 0,
    "e2e_cases": 4,
    "e2e_steps": 756,
    "e2e_checkpoints": 43,
    "e2e_correct": 42,
    "jmeter_cases": 91,
    "jmeter_samples": 6800,
    "jmeter_success": 99.92,
    "lighthouse_screens": 89,
    "lighthouse_seo": 100,
    "lighthouse_bp": 96,
    "critical_defects": 0
  },
  "costs": {
    "capex": 19680000,
    "opex": 5490000,
    "year1": 25170000,
    "year3": 36150000,
    "year5": 47130000,
    "hours": 328
  },
  "modules12": [
    {
      "id": "M01",
      "nombre": "Autenticación y Sesión",
      "rfs": "RF001–RF005",
      "n": 5
    },
    {
      "id": "M02",
      "nombre": "Gestión de Usuarios",
      "rfs": "RF006–RF010",
      "n": 5
    },
    {
      "id": "M03",
      "nombre": "Catálogo – Categorías",
      "rfs": "RF011–RF019",
      "n": 9
    },
    {
      "id": "M04",
      "nombre": "Catálogo – Productos",
      "rfs": "RF020–RF030",
      "n": 11
    },
    {
      "id": "M05",
      "nombre": "Perfil de Usuario",
      "rfs": "RF031–RF033",
      "n": 3
    },
    {
      "id": "M06",
      "nombre": "Panel Administrativo",
      "rfs": "RF034–RF036",
      "n": 3
    },
    {
      "id": "M07",
      "nombre": "Direcciones de Envío",
      "rfs": "RF037–RF041",
      "n": 5
    },
    {
      "id": "M08",
      "nombre": "Carrito de Compras",
      "rfs": "RF042–RF046",
      "n": 5
    },
    {
      "id": "M09",
      "nombre": "Checkout y Pedidos",
      "rfs": "RF047–RF053",
      "n": 7
    },
    {
      "id": "M10",
      "nombre": "Pagos",
      "rfs": "RF054–RF059",
      "n": 6
    },
    {
      "id": "M11",
      "nombre": "Envíos",
      "rfs": "RF060–RF065",
      "n": 6
    },
    {
      "id": "M12",
      "nombre": "Facturación",
      "rfs": "RF066–RF069",
      "n": 4
    }
  ],
  "timeline": [
    {
      "dia": "Día 1",
      "act": "Análisis de requisitos RF001–RF069 y revisión de documentación"
    },
    {
      "dia": "Día 2",
      "act": "Definición de estrategia de pruebas y clasificación de módulos"
    },
    {
      "dia": "Día 3–4",
      "act": "Diseño de casos de prueba para flujos críticos"
    },
    {
      "dia": "Día 5",
      "act": "Elaboración de la matriz de trazabilidad"
    },
    {
      "dia": "Día 6",
      "act": "Revisión y validación interna del Plan Maestro"
    },
    {
      "dia": "Día 7",
      "act": "Ajustes y correcciones según observaciones"
    },
    {
      "dia": "Día 8",
      "act": "Consolidación de entregables QA"
    },
    {
      "dia": "Día 9",
      "act": "Revisión final de consistencia y cobertura"
    },
    {
      "dia": "Día 10",
      "act": "Entrega formal y cierre de planificación"
    }
  ],
  "milestones": [
    {
      "id": "H1",
      "nombre": "Finalización del análisis de requisitos"
    },
    {
      "id": "H2",
      "nombre": "Diseño completo de los casos de prueba"
    },
    {
      "id": "H3",
      "nombre": "Matriz de trazabilidad finalizada"
    },
    {
      "id": "H4",
      "nombre": "Plan Maestro de Pruebas aprobado"
    },
    {
      "id": "H5",
      "nombre": "Entrega de los documentos finales de QA"
    }
  ],
  "stack": [
    {
      "cat": "Automatización E2E",
      "tool": "Chrome y Edge",
      "resp": "Todo el equipo"
    },
    {
      "cat": "Pruebas de APIs",
      "tool": "Postman",
      "resp": "Todo el equipo"
    },
    {
      "cat": "Pruebas unitarias",
      "tool": "JUnit + Mockito",
      "resp": "Todo el equipo"
    },
    {
      "cat": "Pruebas de integración",
      "tool": "Selenium",
      "resp": "Todo el equipo"
    },
    {
      "cat": "Pruebas de rendimiento",
      "tool": "JMeter",
      "resp": "Todo el equipo"
    },
    {
      "cat": "Pruebas 2N2",
      "tool": "Cypress",
      "resp": "Todo el equipo"
    }
  ],
  "risks": [
    {
      "t": "Indisponibilidad temporal del ambiente de pruebas",
      "d": "El ambiente de staging puede presentar caídas temporales o problemas de conectividad.",
      "c": "Coordinar restauración con desarrollo y reprogramar pruebas afectadas."
    },
    {
      "t": "Datos de prueba insuficientes o desactualizados",
      "d": "Usuarios, productos o pedidos necesarios pueden no estar disponibles o ser inconsistentes.",
      "c": "Mantener datos validados y actualizar la BD de pruebas antes de cada ciclo."
    },
    {
      "t": "Errores en integraciones externas",
      "d": "Servicios de pagos, envíos o autenticación pueden comportarse de forma inesperada.",
      "c": "Usar entornos de prueba o datos simulados y registrar incidencias."
    },
    {
      "t": "Incompatibilidad entre navegadores",
      "d": "Algunas funcionalidades pueden variar entre Chrome y Edge.",
      "c": "Ejecutar pruebas de compatibilidad en ambos navegadores y reportar diferencias."
    }
  ],
  "e2e_cases": [
    {
      "id": "CP-1",
      "modulo": "Cliente",
      "nombre": "Flujo-registro-knstore",
      "evidencia": "Registro de usuario anónimo",
      "archivo": "cliente/Flujo-registro-knsotre.json",
      "pasos": 25,
      "checkouts": 5,
      "estado": "Correcto",
      "puntos": [
        "Carga de la página de inicio",
        "Acceso al formulario de registro",
        "Registro del nuevo cliente",
        "Confirmación y redirección a login",
        "Inicio de sesión post-registro"
      ]
    },
    {
      "id": "CP-2",
      "modulo": "Cliente",
      "nombre": "PANEL_CLIENTE",
      "evidencia": "Automatización / testing del panel del cliente",
      "archivo": "cliente/PANEL_CLIENTE.json",
      "pasos": 201,
      "checkouts": 8,
      "estado": "Con observación",
      "puntos": [
        "Inicio de sesión",
        "Edición de perfil (1.ª)",
        "Edición de perfil (2.ª)",
        "Búsqueda de producto",
        "Reintentos de inicio de sesión",
        "Registro de dirección",
        "Edición de dirección",
        "Cambio de contraseña"
      ]
    },
    {
      "id": "CP-3",
      "modulo": "Admin",
      "nombre": "KNSTORE — MOD-ENTIDADES (CRUD)",
      "evidencia": "Evidencia 1 — Gestión de entidades (catálogo)",
      "archivo": "admin/KNSTORE-MOD-ENTIDADES.json",
      "pasos": 376,
      "checkouts": 18,
      "estado": "Correcto",
      "puntos": [
        "Tipo Documento",
        "Cuenta (cliente)",
        "Categoría",
        "Subcategoría",
        "Marca",
        "Categoría IVA",
        "Producto",
        "Producto Precio",
        "Producto Inventario",
        "Producto Imagen",
        "Etiqueta Producto",
        "Dirección",
        "Pedido",
        "Item Pedido",
        "Item Carrito",
        "Pago",
        "Envío",
        "Factura"
      ]
    },
    {
      "id": "CP-4",
      "modulo": "Admin",
      "nombre": "KNSTORE — MOD-ADMIN / MOD-CUENTA",
      "evidencia": "Evidencia 2 — Módulo de administración y cuenta",
      "archivo": "admin/KNSTORE-MOD-ADMIN-MOD-CUENTA.json",
      "pasos": 154,
      "checkouts": 12,
      "estado": "Correcto",
      "puntos": [
        "Gestión de usuarios",
        "Métricas",
        "Salud (health check)",
        "Configuración",
        "Logs",
        "Operación · Pedidos",
        "Operación · Envíos",
        "Operación · Reembolsos",
        "API (documentación)",
        "Mi cuenta · Editar información",
        "Segunda edición de información",
        "Dirección de la cuenta"
      ]
    }
  ],
  "stress_scenarios": [
    {
      "id": "ES-01a…d",
      "modulo": "Catálogo (RNF-007/022)",
      "esc": "Lectura pública: listado paginado, búsqueda full-text, categorías y detalle por slug",
      "carga": "50 → 100 hilos",
      "esp": "P95 < 500 ms; 0 errores"
    },
    {
      "id": "ES-02",
      "modulo": "Autenticación",
      "esc": "Login (coste bcrypt) bajo concurrencia",
      "carga": "40 → 60 hilos",
      "esp": "0 errores; P95 ≈ 0,4–1,4 s"
    },
    {
      "id": "ES-03",
      "modulo": "Checkout",
      "esc": "Escritura atómica de pedidos + pago + envío + factura",
      "carga": "40 → 60 hilos",
      "esp": "0 errores; stock sin negativos"
    },
    {
      "id": "ES-04",
      "modulo": "Concurrencia (RNF-024)",
      "esc": "30–60 hilos simultáneos sobre stock 15",
      "carga": "50 → 60 hilos",
      "esp": "15 ventas / resto rechazos; sin sobreventa"
    },
    {
      "id": "ES-04v",
      "modulo": "Verificación RNF-024",
      "esc": "Comprobación de stock final tras concurrencia",
      "carga": "1 consulta",
      "esp": "stock == 0"
    },
    {
      "id": "ES-05",
      "modulo": "Resistencia (soak)",
      "esc": "Lectura sostenida durante S5_DUR",
      "carga": "12 hilos · 60–240 s",
      "esp": "Sin degradación ni errores"
    },
    {
      "id": "ES-06",
      "modulo": "Spike",
      "esc": "Ráfaga brusca (ramp 2 s) sobre catálogo",
      "carga": "100 hilos",
      "esp": "Punto de saturación documentado (P95 ≈ 3,8 s)"
    },
    {
      "id": "ES-07",
      "modulo": "Escalado",
      "esc": "Rampa gradual (ramp 120 s) a 150 hilos",
      "carga": "150 hilos",
      "esp": "Estabilidad: listado P95 ≈ 453 ms"
    }
  ],
  "stress_rounds": [
    {
      "ronda": "1 · Base",
      "carga": "25/25/20/30 hilos · soak 60 s",
      "muestras": 1112,
      "errores": 0,
      "obs": "Todo verde"
    },
    {
      "ronda": "2 · Carga alta",
      "carga": "60/40/40/50 hilos · soak 300 s",
      "muestras": 7320,
      "errores": 0,
      "obs": "Estable, 21,5 req/s"
    },
    {
      "ronda": "3 · Límite",
      "carga": "100/60/60/60 · spike 100 (2 s) · escalado 150 · soak 240 s",
      "muestras": 8920,
      "errores": 7,
      "obs": "99,92 % de éxito; spike P95 3,8 s; recuperación inmediata"
    }
  ],
  "jmeter_cases": [
    {
      "id": "CP-001",
      "nombre": "Registro exitoso de usuario",
      "tipo": "Funcional",
      "req": "RF-001",
      "samples": 1,
      "avg": 693,
      "p95": 693,
      "max": 693,
      "estado": "PASA"
    },
    {
      "id": "CP-002",
      "nombre": "Registro con correo duplicado",
      "tipo": "Funcional",
      "req": "RF-001",
      "samples": 1,
      "avg": 101,
      "p95": 101,
      "max": 101,
      "estado": "PASA"
    },
    {
      "id": "CP-003",
      "nombre": "Inicio de sesión exitoso",
      "tipo": "Funcional",
      "req": "RF-002",
      "samples": 1,
      "avg": 391,
      "p95": 391,
      "max": 391,
      "estado": "PASA"
    },
    {
      "id": "CP-004",
      "nombre": "Inicio sesión inválido",
      "tipo": "Funcional",
      "req": "RF-002",
      "samples": 1,
      "avg": 183,
      "p95": 183,
      "max": 183,
      "estado": "PASA"
    },
    {
      "id": "CP-005",
      "nombre": "Cierre de sesión",
      "tipo": "Funcional",
      "req": "RF-003",
      "samples": 1,
      "avg": 93,
      "p95": 93,
      "max": 93,
      "estado": "PASA"
    },
    {
      "id": "CP-006",
      "nombre": "Verificación automática de sesión",
      "tipo": "Funcional",
      "req": "RF-004",
      "samples": 1,
      "avg": 96,
      "p95": 96,
      "max": 96,
      "estado": "PASA"
    },
    {
      "id": "CP-007",
      "nombre": "Protección de rutas privadas",
      "tipo": "Funcional",
      "req": "RF-005",
      "samples": 1,
      "avg": 121,
      "p95": 121,
      "max": 121,
      "estado": "PASA"
    },
    {
      "id": "CP-008",
      "nombre": "Acceso sin token",
      "tipo": "Seguridad",
      "req": "RF-005",
      "samples": 1,
      "avg": 91,
      "p95": 91,
      "max": 91,
      "estado": "PASA"
    },
    {
      "id": "CP-009",
      "nombre": "Listar usuarios",
      "tipo": "Funcional",
      "req": "RF-006",
      "samples": 1,
      "avg": 95,
      "p95": 95,
      "max": 95,
      "estado": "PASA"
    },
    {
      "id": "CP-010",
      "nombre": "Consultar usuario por ID",
      "tipo": "Funcional",
      "req": "RF-007",
      "samples": 1,
      "avg": 95,
      "p95": 95,
      "max": 95,
      "estado": "PASA"
    },
    {
      "id": "CP-011",
      "nombre": "Crear usuario por Admin",
      "tipo": "Funcional",
      "req": "RF-008",
      "samples": 1,
      "avg": 190,
      "p95": 190,
      "max": 190,
      "estado": "PASA"
    },
    {
      "id": "CP-012",
      "nombre": "Actualizar usuario",
      "tipo": "Funcional",
      "req": "RF-009",
      "samples": 1,
      "avg": 104,
      "p95": 104,
      "max": 104,
      "estado": "PASA"
    },
    {
      "id": "CP-013",
      "nombre": "Eliminación lógica usuario",
      "tipo": "Funcional",
      "req": "RF-010",
      "samples": 1,
      "avg": 98,
      "p95": 98,
      "max": 98,
      "estado": "PASA"
    },
    {
      "id": "CP-014",
      "nombre": "Eliminación física usuario",
      "tipo": "Funcional",
      "req": "RF-010",
      "samples": 1,
      "avg": 94,
      "p95": 94,
      "max": 94,
      "estado": "PASA"
    },
    {
      "id": "CP-015",
      "nombre": "Consultar perfil propio",
      "tipo": "Funcional",
      "req": "RF-031",
      "samples": 1,
      "avg": 98,
      "p95": 98,
      "max": 98,
      "estado": "PASA"
    },
    {
      "id": "CP-016",
      "nombre": "Eliminar perfil propio",
      "tipo": "Funcional",
      "req": "RF-032",
      "samples": 1,
      "avg": 100,
      "p95": 100,
      "max": 100,
      "estado": "PASA"
    },
    {
      "id": "CP-017",
      "nombre": "Editar perfil propio",
      "tipo": "Funcional",
      "req": "RF-033",
      "samples": 1,
      "avg": 102,
      "p95": 102,
      "max": 102,
      "estado": "PASA"
    },
    {
      "id": "CP-018",
      "nombre": "Crear dirección",
      "tipo": "Funcional",
      "req": "RF-037",
      "samples": 1,
      "avg": 103,
      "p95": 103,
      "max": 103,
      "estado": "PASA"
    },
    {
      "id": "CP-019",
      "nombre": "Listar direcciones",
      "tipo": "Funcional",
      "req": "RF-038",
      "samples": 1,
      "avg": 112,
      "p95": 112,
      "max": 112,
      "estado": "PASA"
    },
    {
      "id": "CP-020",
      "nombre": "Editar dirección",
      "tipo": "Funcional",
      "req": "RF-039",
      "samples": 1,
      "avg": 107,
      "p95": 107,
      "max": 107,
      "estado": "PASA"
    },
    {
      "id": "CP-021",
      "nombre": "Eliminar dirección",
      "tipo": "Funcional",
      "req": "RF-040",
      "samples": 1,
      "avg": 104,
      "p95": 104,
      "max": 104,
      "estado": "PASA"
    },
    {
      "id": "CP-022",
      "nombre": "Dirección predeterminada",
      "tipo": "Funcional",
      "req": "RF-041",
      "samples": 1,
      "avg": 152,
      "p95": 152,
      "max": 152,
      "estado": "PASA"
    },
    {
      "id": "CP-023",
      "nombre": "Hashing bcrypt",
      "tipo": "Seguridad",
      "req": "RNF-001",
      "samples": 1,
      "avg": 180,
      "p95": 180,
      "max": 180,
      "estado": "PASA"
    },
    {
      "id": "CP-024",
      "nombre": "Vigencia JWT",
      "tipo": "Seguridad",
      "req": "RNF-002",
      "samples": 1,
      "avg": 93,
      "p95": 93,
      "max": 93,
      "estado": "PASA"
    },
    {
      "id": "CP-025",
      "nombre": "Validación entradas",
      "tipo": "Seguridad",
      "req": "RNF-003",
      "samples": 1,
      "avg": 94,
      "p95": 94,
      "max": 94,
      "estado": "PASA"
    },
    {
      "id": "CP-026",
      "nombre": "Restricción CORS",
      "tipo": "Seguridad",
      "req": "RNF-006",
      "samples": 1,
      "avg": 90,
      "p95": 90,
      "max": 90,
      "estado": "PASA"
    },
    {
      "id": "CP-027",
      "nombre": "Diseño responsivo login",
      "tipo": "Usabilidad",
      "req": "RNF-010",
      "samples": 1,
      "avg": 94,
      "p95": 94,
      "max": 94,
      "estado": "PASA"
    },
    {
      "id": "CP-028",
      "nombre": "Animaciones UI",
      "tipo": "Usabilidad",
      "req": "RNF-011",
      "samples": 1,
      "avg": 91,
      "p95": 91,
      "max": 91,
      "estado": "PASA"
    },
    {
      "id": "CP-029",
      "nombre": "Mensajes de error claros",
      "tipo": "Usabilidad",
      "req": "RNF-013",
      "samples": 1,
      "avg": 92,
      "p95": 92,
      "max": 92,
      "estado": "PASA"
    },
    {
      "id": "CP-030",
      "nombre": "Listar categorías",
      "tipo": "Funcional",
      "req": "RF-011",
      "samples": 1,
      "avg": 93,
      "p95": 93,
      "max": 93,
      "estado": "PASA"
    },
    {
      "id": "CP-031",
      "nombre": "Consultar categoría",
      "tipo": "Funcional",
      "req": "RF-012",
      "samples": 1,
      "avg": 92,
      "p95": 92,
      "max": 92,
      "estado": "PASA"
    },
    {
      "id": "CP-032",
      "nombre": "Crear categoría",
      "tipo": "Funcional",
      "req": "RF-013",
      "samples": 1,
      "avg": 95,
      "p95": 95,
      "max": 95,
      "estado": "PASA"
    },
    {
      "id": "CP-033",
      "nombre": "Actualizar categoría",
      "tipo": "Funcional",
      "req": "RF-014",
      "samples": 1,
      "avg": 97,
      "p95": 97,
      "max": 97,
      "estado": "PASA"
    },
    {
      "id": "CP-034",
      "nombre": "Eliminar categoría",
      "tipo": "Funcional",
      "req": "RF-015",
      "samples": 1,
      "avg": 94,
      "p95": 94,
      "max": 94,
      "estado": "PASA"
    },
    {
      "id": "CP-035",
      "nombre": "Listar subcategorías",
      "tipo": "Funcional",
      "req": "RF-016",
      "samples": 1,
      "avg": 98,
      "p95": 98,
      "max": 98,
      "estado": "PASA"
    },
    {
      "id": "CP-036",
      "nombre": "Crear subcategoría",
      "tipo": "Funcional",
      "req": "RF-017",
      "samples": 1,
      "avg": 99,
      "p95": 99,
      "max": 99,
      "estado": "PASA"
    },
    {
      "id": "CP-037",
      "nombre": "Actualizar subcategoría",
      "tipo": "Funcional",
      "req": "RF-018",
      "samples": 1,
      "avg": 96,
      "p95": 96,
      "max": 96,
      "estado": "PASA"
    },
    {
      "id": "CP-038",
      "nombre": "Eliminar subcategoría",
      "tipo": "Funcional",
      "req": "RF-019",
      "samples": 1,
      "avg": 96,
      "p95": 96,
      "max": 96,
      "estado": "PASA"
    },
    {
      "id": "CP-039",
      "nombre": "Crear producto",
      "tipo": "Funcional",
      "req": "RF-020",
      "samples": 1,
      "avg": 96,
      "p95": 96,
      "max": 96,
      "estado": "PASA"
    },
    {
      "id": "CP-040",
      "nombre": "Actualizar producto",
      "tipo": "Funcional",
      "req": "RF-021",
      "samples": 1,
      "avg": 101,
      "p95": 101,
      "max": 101,
      "estado": "PASA"
    },
    {
      "id": "CP-041",
      "nombre": "Calcular precio automático",
      "tipo": "Funcional",
      "req": "RF-022",
      "samples": 1,
      "avg": 98,
      "p95": 98,
      "max": 98,
      "estado": "PASA"
    },
    {
      "id": "CP-042",
      "nombre": "Eliminar producto",
      "tipo": "Funcional",
      "req": "RF-023",
      "samples": 1,
      "avg": 94,
      "p95": 94,
      "max": 94,
      "estado": "PASA"
    },
    {
      "id": "CP-043",
      "nombre": "Búsqueda full-text",
      "tipo": "Funcional",
      "req": "RF-024",
      "samples": 1,
      "avg": 91,
      "p95": 91,
      "max": 91,
      "estado": "PASA"
    },
    {
      "id": "CP-044",
      "nombre": "Listar productos paginados",
      "tipo": "Funcional",
      "req": "RF-025",
      "samples": 1,
      "avg": 126,
      "p95": 126,
      "max": 126,
      "estado": "PASA"
    },
    {
      "id": "CP-045",
      "nombre": "Consultar producto por slug",
      "tipo": "Funcional",
      "req": "RF-026",
      "samples": 1,
      "avg": 92,
      "p95": 92,
      "max": 92,
      "estado": "PASA"
    },
    {
      "id": "CP-046",
      "nombre": "Filtrar por categoría",
      "tipo": "Funcional",
      "req": "RF-027",
      "samples": 1,
      "avg": 90,
      "p95": 90,
      "max": 90,
      "estado": "PASA"
    },
    {
      "id": "CP-047",
      "nombre": "Filtrar por subcategoría",
      "tipo": "Funcional",
      "req": "RF-028",
      "samples": 1,
      "avg": 90,
      "p95": 90,
      "max": 90,
      "estado": "PASA"
    },
    {
      "id": "CP-048",
      "nombre": "Filtrar por marca",
      "tipo": "Funcional",
      "req": "RF-029",
      "samples": 1,
      "avg": 90,
      "p95": 90,
      "max": 90,
      "estado": "PASA"
    },
    {
      "id": "CP-049",
      "nombre": "Filtrar por etiqueta",
      "tipo": "Funcional",
      "req": "RF-030",
      "samples": 1,
      "avg": 155,
      "p95": 155,
      "max": 155,
      "estado": "PASA"
    },
    {
      "id": "CP-050",
      "nombre": "Acceso panel admin",
      "tipo": "Funcional",
      "req": "RF-034",
      "samples": 1,
      "avg": 95,
      "p95": 95,
      "max": 95,
      "estado": "PASA"
    },
    {
      "id": "CP-051",
      "nombre": "CRUD desde interfaz",
      "tipo": "Regresión",
      "req": "RF-035",
      "samples": 1,
      "avg": 109,
      "p95": 109,
      "max": 109,
      "estado": "PASA"
    },
    {
      "id": "CP-052",
      "nombre": "Visualizar estado activo",
      "tipo": "Funcional",
      "req": "RF-036",
      "samples": 1,
      "avg": 92,
      "p95": 92,
      "max": 92,
      "estado": "PASA"
    },
    {
      "id": "CP-053",
      "nombre": "Tiempo respuesta catálogo",
      "tipo": "Rendimiento",
      "req": "RNF-007",
      "samples": 1,
      "avg": 151,
      "p95": 151,
      "max": 151,
      "estado": "PASA"
    },
    {
      "id": "CP-054",
      "nombre": "Paginación obligatoria",
      "tipo": "Rendimiento",
      "req": "RNF-008",
      "samples": 1,
      "avg": 156,
      "p95": 156,
      "max": 156,
      "estado": "PASA"
    },
    {
      "id": "CP-055",
      "nombre": "Índices MongoDB",
      "tipo": "Rendimiento",
      "req": "RNF-009",
      "samples": 1,
      "avg": 92,
      "p95": 92,
      "max": 92,
      "estado": "PASA"
    },
    {
      "id": "CP-056",
      "nombre": "Escalabilidad catálogo",
      "tipo": "No funcional",
      "req": "RNF-022",
      "samples": 10,
      "avg": 424,
      "p95": 445,
      "max": 500,
      "estado": "PASA"
    },
    {
      "id": "CP-057",
      "nombre": "Agregar producto al carrito",
      "tipo": "Funcional",
      "req": "RF-042",
      "samples": 1,
      "avg": 118,
      "p95": 118,
      "max": 118,
      "estado": "PASA"
    },
    {
      "id": "CP-058",
      "nombre": "Consultar carrito",
      "tipo": "Funcional",
      "req": "RF-043",
      "samples": 1,
      "avg": 105,
      "p95": 105,
      "max": 105,
      "estado": "PASA"
    },
    {
      "id": "CP-059",
      "nombre": "Modificar cantidad",
      "tipo": "Funcional",
      "req": "RF-044",
      "samples": 1,
      "avg": 128,
      "p95": 128,
      "max": 128,
      "estado": "PASA"
    },
    {
      "id": "CP-060",
      "nombre": "Eliminar ítem",
      "tipo": "Funcional",
      "req": "RF-045",
      "samples": 1,
      "avg": 120,
      "p95": 120,
      "max": 120,
      "estado": "PASA"
    },
    {
      "id": "CP-061",
      "nombre": "Vaciar carrito",
      "tipo": "Funcional",
      "req": "RF-046",
      "samples": 1,
      "avg": 106,
      "p95": 106,
      "max": 106,
      "estado": "PASA"
    },
    {
      "id": "CP-062",
      "nombre": "Confirmar checkout",
      "tipo": "Funcional",
      "req": "RF-047",
      "samples": 1,
      "avg": 195,
      "p95": 195,
      "max": 195,
      "estado": "PASA"
    },
    {
      "id": "CP-063",
      "nombre": "Calcular total pedido",
      "tipo": "Funcional",
      "req": "RF-048",
      "samples": 1,
      "avg": 102,
      "p95": 102,
      "max": 102,
      "estado": "PASA"
    },
    {
      "id": "CP-064",
      "nombre": "Cancelar pedido válido",
      "tipo": "Funcional",
      "req": "RF-049",
      "samples": 1,
      "avg": 152,
      "p95": 152,
      "max": 152,
      "estado": "PASA"
    },
    {
      "id": "CP-065",
      "nombre": "Listar pedidos propios",
      "tipo": "Funcional",
      "req": "RF-050",
      "samples": 1,
      "avg": 137,
      "p95": 137,
      "max": 137,
      "estado": "PASA"
    },
    {
      "id": "CP-066",
      "nombre": "Listar todos pedidos",
      "tipo": "Funcional",
      "req": "RF-051",
      "samples": 1,
      "avg": 273,
      "p95": 273,
      "max": 273,
      "estado": "PASA"
    },
    {
      "id": "CP-067",
      "nombre": "Actualizar estado pedido",
      "tipo": "Funcional",
      "req": "RF-052",
      "samples": 1,
      "avg": 109,
      "p95": 109,
      "max": 109,
      "estado": "PASA"
    },
    {
      "id": "CP-068",
      "nombre": "Consultar detalle pedido",
      "tipo": "Funcional",
      "req": "RF-053",
      "samples": 1,
      "avg": 110,
      "p95": 110,
      "max": 110,
      "estado": "PASA"
    },
    {
      "id": "CP-069",
      "nombre": "Atomicidad checkout",
      "tipo": "No Funcional",
      "req": "RNF-023",
      "samples": 1,
      "avg": 102,
      "p95": 102,
      "max": 102,
      "estado": "PASA"
    },
    {
      "id": "CP-070",
      "nombre": "Concurrencia stock",
      "tipo": "No Funcional",
      "req": "RNF-024",
      "samples": 5,
      "avg": 140,
      "p95": 199,
      "max": 200,
      "estado": "PASA"
    },
    {
      "id": "CP-071",
      "nombre": "Iniciar pago",
      "tipo": "Funcional",
      "req": "RF-054",
      "samples": 1,
      "avg": 107,
      "p95": 107,
      "max": 107,
      "estado": "PASA"
    },
    {
      "id": "CP-072",
      "nombre": "Procesar pago exitoso",
      "tipo": "Funcional",
      "req": "RF-055",
      "samples": 1,
      "avg": 121,
      "p95": 121,
      "max": 121,
      "estado": "PASA"
    },
    {
      "id": "CP-073",
      "nombre": "Validar coherencia monto",
      "tipo": "Funcional",
      "req": "RF-056",
      "samples": 1,
      "avg": 120,
      "p95": 120,
      "max": 120,
      "estado": "PASA"
    },
    {
      "id": "CP-074",
      "nombre": "Solicitar reembolso",
      "tipo": "Funcional",
      "req": "RF-057",
      "samples": 1,
      "avg": 109,
      "p95": 109,
      "max": 109,
      "estado": "PASA"
    },
    {
      "id": "CP-075",
      "nombre": "Historial pagos",
      "tipo": "Funcional",
      "req": "RF-058",
      "samples": 1,
      "avg": 181,
      "p95": 181,
      "max": 181,
      "estado": "PASA"
    },
    {
      "id": "CP-076",
      "nombre": "Consultar pago propio",
      "tipo": "Funcional",
      "req": "RF-059",
      "samples": 1,
      "avg": 2085,
      "p95": 2085,
      "max": 2085,
      "estado": "PASA"
    },
    {
      "id": "CP-077",
      "nombre": "Generar factura automática",
      "tipo": "Funcional",
      "req": "RF-066",
      "samples": 1,
      "avg": 739,
      "p95": 739,
      "max": 739,
      "estado": "PASA"
    },
    {
      "id": "CP-078",
      "nombre": "Referencia única factura",
      "tipo": "Funcional",
      "req": "RF-067",
      "samples": 1,
      "avg": 102,
      "p95": 102,
      "max": 102,
      "estado": "PASA"
    },
    {
      "id": "CP-079",
      "nombre": "Consultar factura propia",
      "tipo": "Funcional",
      "req": "RF-068",
      "samples": 1,
      "avg": 109,
      "p95": 109,
      "max": 109,
      "estado": "PASA"
    },
    {
      "id": "CP-080",
      "nombre": "Listar facturas",
      "tipo": "Funcional",
      "req": "RF-069",
      "samples": 1,
      "avg": 193,
      "p95": 193,
      "max": 193,
      "estado": "PASA"
    },
    {
      "id": "CP-081",
      "nombre": "Auditoría pagos",
      "tipo": "No Funcional",
      "req": "RNF-025",
      "samples": 1,
      "avg": 112,
      "p95": 112,
      "max": 112,
      "estado": "PASA"
    },
    {
      "id": "CP-082",
      "nombre": "Precisión monetaria",
      "tipo": "No Funcional",
      "req": "RNF-026",
      "samples": 1,
      "avg": 102,
      "p95": 102,
      "max": 102,
      "estado": "PASA"
    },
    {
      "id": "CP-083",
      "nombre": "Crear envío",
      "tipo": "Funcional",
      "req": "RF-060",
      "samples": 1,
      "avg": 99,
      "p95": 99,
      "max": 99,
      "estado": "PASA"
    },
    {
      "id": "CP-084",
      "nombre": "Asignar tracking",
      "tipo": "Funcional",
      "req": "RF-061",
      "samples": 1,
      "avg": 112,
      "p95": 112,
      "max": 112,
      "estado": "PASA"
    },
    {
      "id": "CP-085",
      "nombre": "Actualizar estado envío",
      "tipo": "Funcional",
      "req": "RF-062",
      "samples": 1,
      "avg": 107,
      "p95": 107,
      "max": 107,
      "estado": "PASA"
    },
    {
      "id": "CP-086",
      "nombre": "Registrar devolución",
      "tipo": "Funcional",
      "req": "RF-063",
      "samples": 1,
      "avg": 117,
      "p95": 117,
      "max": 117,
      "estado": "PASA"
    },
    {
      "id": "CP-087",
      "nombre": "Consultar tracking propio",
      "tipo": "Funcional",
      "req": "RF-064",
      "samples": 1,
      "avg": 1990,
      "p95": 1990,
      "max": 1990,
      "estado": "PASA"
    },
    {
      "id": "CP-088",
      "nombre": "Listar envíos pendientes",
      "tipo": "Funcional",
      "req": "RF-065",
      "samples": 1,
      "avg": 134,
      "p95": 134,
      "max": 134,
      "estado": "PASA"
    },
    {
      "id": "CP-089",
      "nombre": "Consultar historial de pedido",
      "tipo": "Funcional",
      "req": "RNF-025",
      "samples": 1,
      "avg": 106,
      "p95": 106,
      "max": 106,
      "estado": "PASA"
    },
    {
      "id": "CP-090",
      "nombre": "Ownership cruzado: dirección ajena",
      "tipo": "Seguridad",
      "req": "RNF-004",
      "samples": 1,
      "avg": 98,
      "p95": 98,
      "max": 98,
      "estado": "PASA"
    },
    {
      "id": "CP-091",
      "nombre": "Ownership cruzado: pedido ajeno",
      "tipo": "Seguridad",
      "req": "RNF-004",
      "samples": 1,
      "avg": 100,
      "p95": 100,
      "max": 100,
      "estado": "PASA"
    }
  ],
  "lighthouse": [
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel de usuarios",
      "performance": 38,
      "accesibilidad": 91,
      "best_practices": 96,
      "seo": 100,
      "agentic": 0.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel crear documento",
      "performance": 61,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel crear cuenta",
      "performance": 60,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel crear categoría",
      "performance": 57,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel crear subcategoría",
      "performance": 52,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": 0.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel crear marca",
      "performance": 58,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel crear categoría IVA",
      "performance": 59,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel crear producto",
      "performance": 53,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": 0.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel crear producto - precios",
      "performance": 44,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": 0.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel crear producto - inventarios",
      "performance": 45,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": 0.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel crear producto - imagen",
      "performance": 39,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": 0.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel crear etiqueta producto",
      "performance": 59,
      "accesibilidad": 93,
      "best_practices": 96,
      "seo": 100,
      "agentic": 100.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel crear dirección",
      "performance": 60,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel carrito de compras",
      "performance": 59,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": 0.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel pedidos",
      "performance": 58,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel ítem pedido",
      "performance": 53,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel ítem carrito",
      "performance": 60,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel pagos",
      "performance": 59,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel envíos",
      "performance": 57,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel facturas",
      "performance": 57,
      "accesibilidad": 86,
      "best_practices": 100,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel gestión de usuarios",
      "performance": 41,
      "accesibilidad": 91,
      "best_practices": 96,
      "seo": 100,
      "agentic": 0.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel métricas de aplicación",
      "performance": 16,
      "accesibilidad": 90,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel control de salud",
      "performance": 42,
      "accesibilidad": 93,
      "best_practices": 96,
      "seo": 92,
      "agentic": 100.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel configuración",
      "performance": 32,
      "accesibilidad": 85,
      "best_practices": 96,
      "seo": 100,
      "agentic": 0.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel logs",
      "performance": 28,
      "accesibilidad": 87,
      "best_practices": 96,
      "seo": 100,
      "agentic": 0.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel operación - pedidos",
      "performance": 46,
      "accesibilidad": 87,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel operación - envíos",
      "performance": 43,
      "accesibilidad": 87,
      "best_practices": 96,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel operación - reembolsos",
      "performance": 45,
      "accesibilidad": 93,
      "best_practices": 96,
      "seo": 100,
      "agentic": 100.0
    },
    {
      "panel": "ADMIN",
      "vista": "DESKTOP",
      "modulo": "Panel API",
      "performance": 26,
      "accesibilidad": 93,
      "best_practices": 92,
      "seo": 100,
      "agentic": 50.0
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel de usuarios",
      "performance": 18,
      "accesibilidad": 91,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel crear documento",
      "performance": 42,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel crear cuenta",
      "performance": 41,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel crear categoría",
      "performance": 38,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel crear subcategoría",
      "performance": 40,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel crear marca",
      "performance": 43,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel crear categoría IVA",
      "performance": 43,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel crear producto",
      "performance": 39,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel crear producto - precios",
      "performance": 34,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel crear producto - inventarios",
      "performance": 34,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel crear producto - imagen",
      "performance": 34,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel crear etiqueta producto",
      "performance": 42,
      "accesibilidad": 93,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel crear dirección",
      "performance": 42,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel carrito de compras",
      "performance": 40,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel pedidos",
      "performance": 40,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel ítem pedido",
      "performance": 35,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel ítem carrito",
      "performance": 40,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel pagos",
      "performance": 40,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel envíos",
      "performance": 41,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel facturas",
      "performance": 41,
      "accesibilidad": 86,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel gestión de usuarios",
      "performance": 38,
      "accesibilidad": 91,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel métricas de aplicación",
      "performance": 5,
      "accesibilidad": 90,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel control de salud",
      "performance": 25,
      "accesibilidad": 93,
      "best_practices": 96,
      "seo": 92,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel configuración",
      "performance": 2,
      "accesibilidad": 85,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel logs",
      "performance": 22,
      "accesibilidad": 87,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel operación - pedidos",
      "performance": 26,
      "accesibilidad": 87,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel operación - envíos",
      "performance": 25,
      "accesibilidad": 87,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel operación - reembolsos",
      "performance": 25,
      "accesibilidad": 93,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "ADMIN",
      "vista": "MOBILE",
      "modulo": "Panel API",
      "performance": 23,
      "accesibilidad": 93,
      "best_practices": 92,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel página principal",
      "performance": 51,
      "accesibilidad": 95,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel login",
      "performance": 56,
      "accesibilidad": 87,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel categorías",
      "performance": 46,
      "accesibilidad": 95,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel cuenta",
      "performance": 51,
      "accesibilidad": 94,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel perfil 1",
      "performance": 58,
      "accesibilidad": 94,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel perfil 2",
      "performance": 56,
      "accesibilidad": 87,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel página direcciones",
      "performance": 54,
      "accesibilidad": 94,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel carrito",
      "performance": 57,
      "accesibilidad": 95,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel compras",
      "performance": 54,
      "accesibilidad": 94,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel seguridad",
      "performance": 60,
      "accesibilidad": 84,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel facturas",
      "performance": 58,
      "accesibilidad": 94,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel envíos 1",
      "performance": 59,
      "accesibilidad": 94,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel envíos 2",
      "performance": 54,
      "accesibilidad": 94,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel pagos",
      "performance": 58,
      "accesibilidad": 94,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel pedidos 1",
      "performance": 54,
      "accesibilidad": 94,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "DESKTOP",
      "modulo": "Panel pedidos 2",
      "performance": 57,
      "accesibilidad": 94,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel página principal",
      "performance": 37,
      "accesibilidad": 89,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel login",
      "performance": 39,
      "accesibilidad": 87,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel categorías",
      "performance": 40,
      "accesibilidad": 90,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel cuenta",
      "performance": 18,
      "accesibilidad": 90,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel perfil 1",
      "performance": 20,
      "accesibilidad": 90,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel perfil 2",
      "performance": 14,
      "accesibilidad": 83,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel página direcciones",
      "performance": 17,
      "accesibilidad": 90,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel carrito",
      "performance": 30,
      "accesibilidad": 85,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel compras",
      "performance": 24,
      "accesibilidad": 90,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel seguridad",
      "performance": 21,
      "accesibilidad": 80,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel facturas",
      "performance": 14,
      "accesibilidad": 90,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel envíos",
      "performance": 14,
      "accesibilidad": 90,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel pagos",
      "performance": 19,
      "accesibilidad": 90,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel pedidos 1",
      "performance": 19,
      "accesibilidad": 90,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    },
    {
      "panel": "CLIENTE",
      "vista": "MOBILE",
      "modulo": "Panel pedidos 2",
      "performance": 20,
      "accesibilidad": 90,
      "best_practices": 96,
      "seo": 100,
      "agentic": null
    }
  ]
};
