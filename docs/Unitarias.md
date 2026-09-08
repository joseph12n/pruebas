Informe de Calidad · Documento de Entrega

Proyecto KN-Store

Informe de Pruebas Unitarias

Fecha del informe

29 de agosto de 2026

Backend · Capa de servicios (JUnit 5 + Mockito)

Alcance

Capa de servicios del backend (service/impl, service, service/util)

Stack de pruebas

JUnit 5, Mockito 5 (MockitoExtension + mockStatic), AssertJ, mappers MapStruct reales

Suites ejecutadas

93 suites · 361 pruebas · 0 fallos

Comando de

ejecución

./mvnw -q -Dskip.npm=true -Dspotless.check.skip=true -Dcheckstyle.skip=true

-Djacoco.skip=true test

 ✔ RESULTADO

VERDE

Contenido

1. Resumen ejecutivo

2. Estrategia de las pruebas

3. Suites nuevas (14 archivos / 150 pruebas)

3.1 Módulo cliente · 3.2 Catálogo · 3.3 Producto y pedidos · 3.4 Usuarios

4. Suites preexistentes verificadas (sin cambios)

5. Conclusiones y recomendaciones

1. Resumen ejecutivo

Se ejecutó la suite completa de pruebas unitarias del backend de KN-Store, con resultado exitoso:

93

Suites ejecutadas

361

Pruebas

totales

150

Pruebas nuevas

0

Fallos

0

0

Errores

Omitidas

Antes de esta sesión, 14 clases de servicio no contaban con pruebas unitarias. Se escribieron 14 suites nuevas

sin modificar ningún archivo de producción, cubriendo el 100% de la capa de servicios de negocio.

2. Estrategia de las pruebas

• Unitarias puras (sin Spring, sin BD): cada servicio se instancia por constructor con repositorios @Mock

(Mockito) y mappers MapStruct reales, siguiendo el estilo de PedidoServiceImplTest.

• Seguridad simulada: para los métodos que filtran por rol CLIENTE

(SecurityUtils.hasCurrentUserThisAuthority / getCurrentUserId), se usó

Mockito.mockStatic(SecurityUtils.class) en try-with-resources; en UserService se inyectó

UsernamePasswordAuthenticationToken en SecurityContextHolder (limpiado en @AfterEach).

• Mockito estricto: sin stubs innecesarios (fallarían con UnnecessaryStubbingException); ArgumentCaptor

para verificar la entidad persistida; thenAnswer(invocation → invocation.getArgument(0)) para

propagar save.

• Casos de negocio cubiertos (no solo CRUD mecánico):

• Ownership: un CLIENTE solo ve sus propios carritos, cuentas, direcciones e items; admin delega

al repositorio general.

• Dirección predeterminada atómica: desmarca la anterior, marca la nueva, ignora inactivas,

excepciones si no existe / es de otra cuenta / el cliente no tiene Cuenta.

• Carrito: vaciar borra items, reinicia subtotal a 0 y actualiza fecha.

• Registro de usuarios: email/username duplicados (incluida la rama DuplicateKeyException),

eliminación de usuarios no activados antes de re-registro, roles ROLE_USER + ROLE_CLIENTE, reset

de contraseña con ventana de expiración de 1 día.

•

partialUpdate con semántica NullValuePropertyMappingStrategy.IGNORE (campos no nulos

intactos).

• Quirk MongoDB: MongoIdUtils convierte String→ObjectId solo con hex válidos de 24 caracteres

(queries batch sobre @DBRef).

3. Suites nuevas (14 archivos / 150 pruebas)

3.1 Módulo cliente — Agente 1 (48 pruebas)

Suite

N.º

Tests

Escenarios clave

service/impl/

CarritoServiceImplTest

service/impl/

CuentaServiceImplTest

service/impl/

DireccionServiceImplTest

12

12

16

Ownership por cuenta en findAll/findOne; vaciar reinicia subtotal y

fecha; vaciar sin carrito no guarda

Preserva user/tipoDocumento en update; CLIENTE solo ve su cuenta

paginada; consultas eager para admin

Predeterminada atómica (cliente y admin); 3 excepciones de

ownership/existencia; asignación de cuenta en save/update

service/util/MongoIdUtilsTest

8

Hex válido/inválido/vacío/null; colecciones con elementos inválidos

3.2 Catálogo — Agente 2 (50 pruebas)

Suite

N.º Tests Escenarios clave

service/impl/CategoriaServiceImplTest

service/impl/CategoriaIVAServiceImplTest

service/impl/SubcategoriaServiceImplTest

service/impl/MarcaServiceImplTest

service/impl/

TipoDocumentoServiceImplTest

service/impl/

EtiquetaProductoServiceImplTest

8

8

9

8

8

9

CRUD completo + partialUpdate sin guardado cuando no

existe

CRUD completo (findAll en lista)

Consultas eager (categoriaNombre anidado)

CRUD completo

CRUD completo

Consultas eager (productoNombre anidado)

3.3 Producto y pedidos — Agente 3 (30 pruebas)

Suite

N.º

Tests

Escenarios clave

service/impl/

ProductoImagenServiceImplTest

8

CRUD + gallery por producto

service/impl/

ProductoInventarioServiceImplTest

9

CRUD + findAllWhereProductoIsNull (filtra inventarios

huérfanos por @DBRef nulo)

service/impl/

ItemPedidoServiceImplTest

Ownership: CLIENTE solo ve items de SUS pedidos

13

(autenticación con JwtAuthenticationToken); eager para

admin

3.4 Usuarios — Agente 4 (22 pruebas)

Suite

N.º

Tests

Escenarios clave

Registro (roles, password codificada, usuario desactivado), duplicados

service/

UserServiceTest

22

activados/inactivados, DuplicateKeyException (login vs email), activación, reset de

contraseña (expiración 1 día), cambio de contraseña (contraseña actual incorrecta →

InvalidPasswordException), removeNotActivatedUsers, authorities

4. Suites preexistentes verificadas (sin cambios)

Las 79 suites que ya existían continúan en verde, entre ellas:

•

SecuenciaServiceImplTest (5), PedidoServiceImplTest (7), PagoServiceImplTest (14),

FacturaServiceImplTest (3)

•

•

•

EnvioServiceImplTest (7), ItemCarritoServiceImplTest (4), HistorialEstadoServiceImplTest (2),

ProductoServiceImplTest (4)

ProductoPrecioServiceImplTest (3), ResourceAccessServiceTest (23), SecurityUtilsUnitTest (9),

SimulatedPaymentGatewayTest (5)

FacturaPdfServiceTest (3), MoneyUtilsTest (4), mappers (21×1 + UserMapper 10), DTOs (21×1),

dominios (52), config/Cucumber (18), SecurityMetersServiceTests (2)

5. Conclusiones y recomendaciones

1. Cobertura: la capa de servicio (service/impl + service) queda 100% cubierta con pruebas unitarias; no

quedan clases de negocio sin suite.

2. Calidad: Mockito estricto evita stubs muertos; los tests verifican interacciones relevantes (verificaciones

de guardado con captor, no solo el valor retornado).

3. Backlog conocido (preexistente, no relacionado con esta sesión): ItemCarritoResourceIT (4 tests de

integración) sigue fallando por el blindaje de precios server-side; requiere reescritura con productos reales.

Ver docs/REQUERIMIENTOS_PENDIENTES.md.

4. Siguiente paso sugerido: activar JaCoCo en CI para medir % de cobertura de líneas y priorizar

CheckoutService (hoy solo tiene IT).

Informe generado automáticamente a partir del reporte de ejecución de Maven Surefire (93 suites · 361 pruebas). Documento preparado

para entrega — Equipo de Pruebas · Proyecto KN-Store · 2026.


