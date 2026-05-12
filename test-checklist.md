# VENDLY — Checklist de Testeo Manual

> Testear en: https://vendly-gray.vercel.app
> Admin panel: https://vendly-gray.vercel.app/admin.html
> Login/Registro: https://vendly-gray.vercel.app/login.html

---

## AUTENTICACIÓN

| Funcionalidad | Estado | Notas |
|---|---|---|
| Ir a `/login.html` muestra formulario de login | ⬜ | |
| Login con email/contraseña correctos → redirige a ERP | ⬜ | |
| Login con datos incorrectos → muestra error | ⬜ | |
| Login con email de admin → redirige a `/admin.html` | ⬜ | |
| Si ya hay sesión activa en `/login.html` → redirige automáticamente | ⬜ | |
| Toggle "Registrarse" muestra formulario de registro | ⬜ | |
| Registro con todos los campos → crea cuenta | ⬜ | |
| Registro con código de referido inválido → error claro | ⬜ | |
| Registro con código de referido válido → descuento 10% | ⬜ | |
| Contraseñas no coinciden → error | ⬜ | |
| Contraseña < 6 chars → error | ⬜ | |
| Cerrar sesión desde ERP → redirige a `/login.html` | ⬜ | |
| Acceder a `/index.html` sin sesión → redirige a `/login.html` | ⬜ | |

---

## PRODUCTOS

| Funcionalidad | Estado | Notas |
|---|---|---|
| Navegar a Productos → tabla carga desde Supabase | ⬜ | |
| Cuenta nueva (sin datos) → muestra "No hay productos" | ⬜ | |
| Crear producto → aparece en tabla | ⬜ | |
| Editar producto → cambios se guardan en Supabase | ⬜ | |
| Eliminar producto → desaparece de la tabla | ⬜ | |
| Búsqueda en DataTable filtra correctamente | ⬜ | |
| Stock bajo ≤ 5 → aparece en rojo | ⬜ | |

---

## CLIENTES

| Funcionalidad | Estado | Notas |
|---|---|---|
| Navegar a Clientes → tabla carga desde Supabase | ⬜ | |
| Cuenta nueva → muestra "No hay clientes" | ⬜ | |
| Crear cliente → aparece en tabla | ⬜ | |
| Editar cliente → cambios se guardan | ⬜ | |
| Eliminar cliente → desaparece | ⬜ | |
| Ver detalles del cliente (modal) | ⬜ | |

---

## VENTAS

| Funcionalidad | Estado | Notas |
|---|---|---|
| Navegar a Ventas → tabla carga desde Supabase | ⬜ | |
| Cuenta nueva → muestra "No hay ventas" | ⬜ | |
| Anular venta → cambia estado en Supabase | ⬜ | |

---

## COMPRAS

| Funcionalidad | Estado | Notas |
|---|---|---|
| Navegar a Compras → tabla carga desde Supabase | ⬜ | |
| Cuenta nueva → muestra "No hay compras" | ⬜ | |
| Anular compra → cambia estado | ⬜ | |
| Ver detalle de compra (modal) | ⬜ | |

---

## GASTOS

| Funcionalidad | Estado | Notas |
|---|---|---|
| Navegar a Gastos → tabla carga desde Supabase | ⬜ | |
| Cuenta nueva → muestra "No hay gastos" | ⬜ | |
| Registrar gasto → aparece en tabla | ⬜ | |
| Editar gasto → cambios se guardan | ⬜ | |
| Eliminar gasto → desaparece | ⬜ | |

---

## PROVEEDORES

| Funcionalidad | Estado | Notas |
|---|---|---|
| Navegar a Proveedores → tabla carga desde Supabase | ⬜ | |
| Cuenta nueva → muestra "No hay proveedores" | ⬜ | |
| Crear proveedor → aparece en tabla | ⬜ | |
| Editar proveedor → cambios se guardan | ⬜ | |
| Eliminar proveedor → desaparece | ⬜ | |

---

## PUNTO DE VENTA (POS)

| Funcionalidad | Estado | Notas |
|---|---|---|
| Navegar a POS → muestra productos disponibles | ⬜ | |
| Agregar producto al carrito | ⬜ | |
| Modificar cantidad en carrito | ⬜ | |
| Eliminar ítem del carrito | ⬜ | |
| Cobrar → genera venta | ⬜ | |
| Sin productos → muestra mensaje apropiado | ⬜ | |

---

## REFERIDOS (vista cliente)

| Funcionalidad | Estado | Notas |
|---|---|---|
| Navegar a Referidos → muestra código del cliente | ⬜ | |
| Botón "Copiar código" funciona | ⬜ | |
| Contador de referidos correcto | ⬜ | |
| Descuento actual se muestra | ⬜ | |

---

## PANEL ADMIN (`/admin.html`)

| Funcionalidad | Estado | Notas |
|---|---|---|
| Login con email no-admin → error (no permite acceso) | ⬜ | |
| Login con email admin → accede al panel | ⬜ | |
| Dashboard muestra KPIs correctos | ⬜ | |
| Sección Clientes → lista todos los clientes | ⬜ | |
| Registrar pago → se guarda en `pagos`, actualiza `suscripciones` | ⬜ | |
| Estado cambia a "Activo" después del pago | ⬜ | |
| Suspender cliente → estado cambia | ⬜ | |
| Eliminar cliente → desaparece de la lista | ⬜ | |
| Crear cliente desde admin → cliente puede loguearse | ⬜ | |
| Sección Pagos → muestra historial de pagos | ⬜ | |
| Sección Referidos → muestra códigos y descuentos | ⬜ | |
| Cerrar sesión → vuelve al login del admin | ⬜ | |

---

## AISLAMIENTO MULTI-TENANT

| Funcionalidad | Estado | Notas |
|---|---|---|
| Cliente A crea productos → Cliente B NO los ve | ⬜ | |
| Cliente A crea ventas → Cliente B NO las ve | ⬜ | |
| Cuenta nueva siempre empieza con datos vacíos | ⬜ | |

---

## LEYENDA
- ⬜ Sin testear
- ✅ Funciona correctamente
- ❌ Error / No funciona
- ⚠️ Parcial / Funciona con limitaciones
