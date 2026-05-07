# VENDLY — Sistema de Gestión Comercial (ERP/POS)

## Descripción
Aplicación web de gestión comercial tipo ERP/POS, construida con HTML, CSS y JavaScript puro (sin frameworks JS). SPA (Single Page Application) con routing manual por JS.

## Estructura de archivos

```
Vendly/
├── index.html          — Shell principal + HTML de todas las páginas
├── css/
│   └── vendly.css      — Todos los estilos custom
└── js/
    ├── app.js          — Core: navegación SPA, sidebar toggle, acordeón del menú
    ├── dashboard.js    — Inicialización de los 4 gráficos Chart.js del dashboard
    └── pages.js        — Datos de ejemplo, init de DataTables, funciones CRUD
```

## Stack tecnológico (todos via CDN)

| Librería | Versión | Uso |
|---|---|---|
| Bootstrap | 5.3.3 | Layout, grid, componentes, collapse del sidebar |
| Bootstrap Icons | 1.11 | Íconos del sidebar y UI general |
| jQuery | 3.7.1 | Requerido por DataTables |
| DataTables | 1.13.8 | Tablas con paginación/búsqueda (build bootstrap5) |
| Chart.js | 4.4.4 | Gráficos del dashboard e informes |
| Select2 | 4.1.0-rc.0 | Selectores mejorados |
| SweetAlert2 | 11 | Modales de confirmación y formularios CRUD |
| Google Fonts | — | Fuente Roboto |

## Identidad visual (variables CSS en `:root`)

```css
--primary:      #00BCD4   /* cian — botones principales, íconos activos */
--secondary:    #FF6B00   /* naranja — logo, acentos */
--sidebar-bg:   #1E2A38   /* sidebar fondo */
--content-bg:   #F5F7FA   /* fondo del área de contenido */
--success:      #28A745   /* botones Crear/Guardar */
--sidebar-width: 240px
--sidebar-collapsed: 60px
```

## Patrón de navegación (SPA)

- Todas las páginas son `<div id="page-{id}" class="page">` — ocultas por defecto.
- `navigateTo(pageId, label)` en `app.js` muestra la página activa y llama su función init.
- Los links del sidebar usan `data-page="pageId"` y `data-label="Título"`.
- Al activar una página se llama su `init*Page()` correspondiente (definida en `pages.js`).

### Páginas implementadas

| `pageId` | Función init | Descripción |
|---|---|---|
| `dashboard` | `initDashboard()` | Dashboard con 8 secciones y 4 charts |
| `products` | `initProductsPage()` | CRUD productos con DataTable |
| `sales` | `initSalesPage()` | Lista de ventas con DataTable |
| `pos` | `initPOS()` | Punto de venta con carrito interactivo |
| `clients` | `initClientsPage()` | CRUD clientes con DataTable |
| `purchases` | `initPurchasesPage()` | Lista de compras con DataTable |
| `expenses` | `initExpensesPage()` | Lista de gastos con DataTable |
| `suppliers` | `initSuppliersPage()` | Lista de proveedores con DataTable |
| `reports-sales` | `initReportSales()` | Informe ventas con gráfico de barras |

## Datos de ejemplo (arrays en `pages.js`)

```
PRODUCTS[]    — 12 productos con id, code, name, category, cost, price, qty, unit, type
CLIENTS[]     — 6 clientes con id, code, name, phone, email, group, balance, status
SALES[]       — 7 ventas con id, date, client, total, payment, status, items
PURCHASES[]   — 4 compras con id, date, supplier, total, payment, status, items
EXPENSES[]    — 5 gastos con id, date, category, description, amount, payment
SUPPLIERS[]   — 4 proveedores con id, code, name, phone, email, cuit, balance, status
```

Todos los datos viven en memoria (no hay backend). Los CRUD modifican los arrays y reinician el DataTable.

## DataTables — patrón estándar

```js
let myDT = null;

function initMyPage() { renderMyTable(); }

function renderMyTable() {
  // 1. Poblar tbody con innerHTML
  // 2. Destruir instancia previa si existe
  if (myDT) myDT.destroy();
  // 3. Crear nueva instancia
  myDT = new DataTable('#myTable', {
    language: dtLang(),   // función helper en pages.js — strings en español
    pageLength: 10,
    columnDefs: [{ orderable: false, targets: [lastCol] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>>...",
  });
}
```

## Chart.js — patrón estándar

```js
let chartInstances = {};   // objeto global en dashboard.js

function destroyChart(id) {
  if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; }
}

function initMiGrafico() {
  const ctx = document.getElementById('miChart');
  if (!ctx) return;
  destroyChart('miChart');
  chartInstances['miChart'] = new Chart(ctx, { type, data, options });
}
```

Siempre llamar `destroyChart()` antes de crear un chart para evitar el error "Canvas already in use".

## Sidebar

- El sidebar usa Bootstrap `collapse` nativo para los submenús (`.collapse`, `data-bs-toggle="collapse"`).
- `initAccordion()` en `app.js` implementa el comportamiento uno-a-la-vez (cierra los demás al abrir uno).
- En escritorio: toggle colapsa a 60px (`#sidebar.collapsed` + `#main-content.expanded`).
- En móvil (<992px): el sidebar sale desde la izquierda con overlay (`mobile-open` class).

## Funciones utilitarias (pages.js)

```js
fmtCurrency(n)   // → "$1.234.567" (locale es-AR)
fmtDate(d)       // → "01/05/2026" desde "2026-05-01"
dtLang()         // → objeto de traducción español para DataTables
```

## Cómo agregar una nueva página

1. Agregar `<div id="page-nueva" class="page">...</div>` en `index.html`.
2. Agregar ítem en el sidebar con `data-page="nueva"`.
3. Agregar `if (pageId === 'nueva') { initNueva(); }` en `navigateTo()` de `app.js`.
4. Definir `function initNueva() { ... }` en `pages.js`.

## Convenciones de clases CSS (vendly.css)

- `.vcard` — tarjeta blanca con sombra suave (contenedor general)
- `.stat-card` — tarjeta horizontal con ícono de color + valor + label
- `.notif-card` — tarjeta centrada con número grande (notificaciones dashboard)
- `.count-card` — tarjeta con número grande (totales generales dashboard)
- `.stat-icon` — cuadrado de color con ícono (default cian, `.orange`, `.green`, `.purple`, `.red`)
- `.btn-primary-custom` / `.btn-success-custom` / `.btn-danger-custom` — botones de acción
- `.action-btn` — botón de acciones por fila en tablas (cian, activa dropdown)
- `.badge-type.simple/.compuesto/.servicio` — badges de tipo de producto
