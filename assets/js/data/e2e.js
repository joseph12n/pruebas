/* Datos: e2e — generado por tools/build_data.py (no editar a mano) */
window.KN_DATA = window.KN_DATA || {};
window.KN_DATA["e2e_cases"] = [
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
];
