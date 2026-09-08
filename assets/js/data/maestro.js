/* Datos: maestro — generado por tools/build_data.py (no editar a mano) */
window.KN_DATA = window.KN_DATA || {};
window.KN_DATA["modules12"] = [
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
];
window.KN_DATA["timeline"] = [
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
];
window.KN_DATA["milestones"] = [
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
];
window.KN_DATA["stack"] = [
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
];
window.KN_DATA["risks"] = [
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
];
