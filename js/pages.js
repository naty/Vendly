/* =============================================
   VENDLY — Pages: Products, Sales, Clients, POS, etc.
   ============================================= */

'use strict';

// =============================================
// SAMPLE DATA
// =============================================
const PRODUCTS = [
  { id: 1, img: '', code: 'PRD-001', name: 'Laptop Pro 15"', category: 'Electrónica', cost: 850000, price: 1200000, qty: 12, unit: 'Unid.', type: 'simple' },
  { id: 2, img: '', code: 'PRD-002', name: 'Mouse Inalámbrico', category: 'Electrónica', cost: 15000, price: 28000, qty: 45, unit: 'Unid.', type: 'simple' },
  { id: 3, img: '', code: 'PRD-003', name: 'Teclado Mecánico RGB', category: 'Electrónica', cost: 32000, price: 55000, qty: 28, unit: 'Unid.', type: 'simple' },
  { id: 4, img: '', code: 'PRD-004', name: 'Monitor 24" Full HD', category: 'Electrónica', cost: 180000, price: 290000, qty: 8, unit: 'Unid.', type: 'simple' },
  { id: 5, img: '', code: 'PRD-005', name: 'Remera Básica Blanca', category: 'Ropa', cost: 4500, price: 9500, qty: 80, unit: 'Unid.', type: 'simple' },
  { id: 6, img: '', code: 'PRD-006', name: 'Pantalón Jean Slim', category: 'Ropa', cost: 12000, price: 24000, qty: 35, unit: 'Unid.', type: 'simple' },
  { id: 7, img: '', code: 'PRD-007', name: 'Mochila Urbana 25L', category: 'Accesorios', cost: 18000, price: 35000, qty: 22, unit: 'Unid.', type: 'compuesto' },
  { id: 8, img: '', code: 'PRD-008', name: 'Servicio Técnico PC', category: 'Servicios', cost: 0, price: 15000, qty: 999, unit: 'Serv.', type: 'servicio' },
  { id: 9, img: '', code: 'PRD-009', name: 'Cable HDMI 2m', category: 'Electrónica', cost: 2800, price: 5500, qty: 60, unit: 'Unid.', type: 'simple' },
  { id: 10, img: '', code: 'PRD-010', name: 'Auriculares Bluetooth', category: 'Electrónica', cost: 22000, price: 42000, qty: 18, unit: 'Unid.', type: 'simple' },
  { id: 11, img: '', code: 'PRD-011', name: 'Zapatillas Running', category: 'Calzado', cost: 38000, price: 75000, qty: 14, unit: 'Par', type: 'simple' },
  { id: 12, img: '', code: 'PRD-012', name: 'Camisa Oxford', category: 'Ropa', cost: 9500, price: 19000, qty: 42, unit: 'Unid.', type: 'simple' },
];

const CLIENTS = [
  { id: 1, code: 'CLI-001', name: 'García, Juan Carlos', phone: '011-4523-1234', email: 'jgarcia@mail.com', group: 'Mayorista', balance: 45000, status: 'activo' },
  { id: 2, code: 'CLI-002', name: 'López, María Fernanda', phone: '011-3456-7890', email: 'mlopez@mail.com', group: 'Minorista', balance: 0, status: 'activo' },
  { id: 3, code: 'CLI-003', name: 'Martínez, Pedro A.', phone: '011-2345-6789', email: 'pmartinez@mail.com', group: 'Mayorista', balance: -12000, status: 'activo' },
  { id: 4, code: 'CLI-004', name: 'Fernández, Ana Laura', phone: '011-7890-1234', email: 'afernandez@mail.com', group: 'Minorista', balance: 0, status: 'inactivo' },
  { id: 5, code: 'CLI-005', name: 'González, Luis M.', phone: '011-5678-9012', email: 'lgonzalez@mail.com', group: 'VIP', balance: 150000, status: 'activo' },
  { id: 6, code: 'CLI-006', name: 'Rodríguez, Claudia', phone: '011-6789-0123', email: 'crodriguez@mail.com', group: 'Minorista', balance: 0, status: 'activo' },
];

const SALES = [
  { id: 1001, date: '2026-05-01', client: 'García, Juan Carlos', total: 280000, payment: 'Contado', status: 'cobrada', items: 3 },
  { id: 1002, date: '2026-05-01', client: 'López, María Fernanda', total: 55000, payment: 'Efectivo', status: 'cobrada', items: 2 },
  { id: 1003, date: '2026-04-30', client: 'Martínez, Pedro A.', total: 920000, payment: 'Crédito', status: 'pendiente', items: 5 },
  { id: 1004, date: '2026-04-30', client: 'González, Luis M.', total: 145000, payment: 'Tarjeta', status: 'cobrada', items: 1 },
  { id: 1005, date: '2026-04-29', client: 'Fernández, Ana Laura', total: 380000, payment: 'Crédito', status: 'pendiente', items: 4 },
  { id: 1006, date: '2026-04-28', client: 'Rodríguez, Claudia', total: 75000, payment: 'Efectivo', status: 'cobrada', items: 2 },
  { id: 1007, date: '2026-04-27', client: 'García, Juan Carlos', total: 445000, payment: 'Contado', status: 'cobrada', items: 6 },
];

const PURCHASES = [
  { id: 'OC-001', date: '2026-05-02', supplier: 'TechDistribuidor SA', total: 640000, payment: 'Crédito 30d', status: 'pendiente', items: 4 },
  { id: 'OC-002', date: '2026-04-28', supplier: 'Moda Import SRL', total: 185000, payment: 'Contado', status: 'recibida', items: 8 },
  { id: 'OC-003', date: '2026-04-25', supplier: 'Electro Global', total: 920000, payment: 'Crédito 60d', status: 'recibida', items: 3 },
  { id: 'OC-004', date: '2026-04-20', supplier: 'Proveedor Nacional', total: 230000, payment: 'Contado', status: 'recibida', items: 12 },
];

const EXPENSES = [
  { id: 'GAS-001', date: '2026-05-01', category: 'Alquiler', description: 'Alquiler local comercial', amount: 180000, payment: 'Transferencia' },
  { id: 'GAS-002', date: '2026-05-01', category: 'Servicios', description: 'Factura de luz', amount: 24500, payment: 'Débito' },
  { id: 'GAS-003', date: '2026-04-30', category: 'Sueldos', description: 'Sueldos empleados', amount: 350000, payment: 'Transferencia' },
  { id: 'GAS-004', date: '2026-04-28', category: 'Marketing', description: 'Publicidad redes sociales', amount: 45000, payment: 'Tarjeta' },
  { id: 'GAS-005', date: '2026-04-25', category: 'Limpieza', description: 'Productos de limpieza', amount: 12000, payment: 'Efectivo' },
];

const SUPPLIERS = [
  { id: 1, code: 'PRV-001', name: 'TechDistribuidor SA', phone: '011-3333-4444', email: 'ventas@techd.com', cuit: '30-12345678-9', balance: -640000, status: 'activo' },
  { id: 2, code: 'PRV-002', name: 'Moda Import SRL', phone: '011-5555-6666', email: 'info@modaimport.com', cuit: '30-98765432-1', balance: 0, status: 'activo' },
  { id: 3, code: 'PRV-003', name: 'Electro Global', phone: '011-7777-8888', email: 'pedidos@electroglobal.com', cuit: '30-11223344-5', balance: 0, status: 'activo' },
  { id: 4, code: 'PRV-004', name: 'Proveedor Nacional', phone: '011-9999-0000', email: 'compras@provnac.com', cuit: '30-44332211-6', balance: 0, status: 'inactivo' },
];

// =============================================
// HELPER: Format currency
// =============================================
function fmtCurrency(n) {
  return '$' + Number(n).toLocaleString('es-AR');
}

function fmtDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('es-AR');
}

// =============================================
// PRODUCTS PAGE
// =============================================
let productsDT = null;

function initProductsPage() {
  renderProductsTable();
}

function renderProductsTable() {
  const tbody = document.getElementById('productsTbody');
  if (!tbody) return;

  tbody.innerHTML = PRODUCTS.map(p => `
    <tr>
      <td><input type="checkbox" class="form-check-input row-check" value="${p.id}"></td>
      <td>
        <div style="width:38px;height:38px;border-radius:8px;background:#e9ecef;display:flex;align-items:center;justify-content:center;font-size:1.2rem;">
          📦
        </div>
      </td>
      <td><span style="font-size:0.78rem;color:#6c757d;">${p.code}</span></td>
      <td><strong style="font-size:0.85rem;">${p.name}</strong></td>
      <td><span style="font-size:0.82rem;">${p.category}</span></td>
      <td><span style="font-size:0.82rem;">${fmtCurrency(p.cost)}</span></td>
      <td><strong style="font-size:0.82rem;color:#00BCD4;">${fmtCurrency(p.price)}</strong></td>
      <td>
        <span class="${p.qty <= 5 ? 'text-danger fw-bold' : ''}" style="font-size:0.82rem;">${p.qty}</span>
      </td>
      <td><span style="font-size:0.78rem;color:#6c757d;">${p.unit}</span></td>
      <td><span class="badge-type ${p.type}">${p.type}</span></td>
      <td>
        <div class="dropdown">
          <button class="action-btn dropdown-toggle" data-bs-toggle="dropdown">
            <i class="bi bi-gear"></i> Acciones
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0" style="font-size:0.82rem;min-width:160px;">
            <li><a class="dropdown-item" href="#" onclick="viewProduct(${p.id})"><i class="bi bi-eye text-primary me-2"></i>Ver</a></li>
            <li><a class="dropdown-item" href="#" onclick="editProduct(${p.id})"><i class="bi bi-pencil text-warning me-2"></i>Editar</a></li>
            <li><a class="dropdown-item" href="#" onclick="duplicateProduct(${p.id})"><i class="bi bi-copy text-info me-2"></i>Duplicar</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" onclick="deleteProduct(${p.id})"><i class="bi bi-trash me-2"></i>Eliminar</a></li>
          </ul>
        </div>
      </td>
    </tr>
  `).join('');

  // Init or reload DataTable
  if (productsDT) { productsDT.destroy(); }
  productsDT = new DataTable('#productsTable', {
    language: dtLang(),
    pageLength: 10,
    lengthMenu: [10, 25, 50, 100],
    columnDefs: [
      { orderable: false, targets: [0, 1, 10] },
      { searchable: false, targets: [0, 1] },
    ],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });

  // Select all checkbox
  const selectAll = document.getElementById('selectAllProducts');
  if (selectAll) {
    selectAll.addEventListener('change', function () {
      document.querySelectorAll('.row-check').forEach(cb => cb.checked = this.checked);
    });
  }
}

function viewProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  Swal.fire({
    title: p.name,
    html: `
      <div class="text-start">
        <p><strong>Código:</strong> ${p.code}</p>
        <p><strong>Categoría:</strong> ${p.category}</p>
        <p><strong>Precio costo:</strong> ${fmtCurrency(p.cost)}</p>
        <p><strong>Precio venta:</strong> ${fmtCurrency(p.price)}</p>
        <p><strong>Stock:</strong> ${p.qty} ${p.unit}</p>
        <p><strong>Tipo:</strong> ${p.type}</p>
      </div>
    `,
    icon: 'info',
    confirmButtonColor: '#00BCD4',
    confirmButtonText: 'Cerrar',
  });
}

function editProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  Swal.fire({
    title: 'Editar Producto',
    html: `
      <input id="swal-name" class="swal2-input" placeholder="Nombre" value="${p.name}">
      <input id="swal-price" class="swal2-input" placeholder="Precio venta" value="${p.price}" type="number">
      <input id="swal-stock" class="swal2-input" placeholder="Stock" value="${p.qty}" type="number">
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      p.name = document.getElementById('swal-name').value;
      p.price = parseFloat(document.getElementById('swal-price').value);
      p.qty = parseInt(document.getElementById('swal-stock').value);
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      Swal.fire({ icon: 'success', title: 'Guardado', text: 'Producto actualizado.', confirmButtonColor: '#00BCD4', timer: 1800, showConfirmButton: false });
      renderProductsTable();
    }
  });
}

function duplicateProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const newP = { ...p, id: PRODUCTS.length + 1, code: 'PRD-' + String(PRODUCTS.length + 1).padStart(3, '0'), name: p.name + ' (Copia)' };
  PRODUCTS.push(newP);
  renderProductsTable();
  Swal.fire({ icon: 'success', title: 'Duplicado', timer: 1400, showConfirmButton: false });
}

function deleteProduct(id) {
  Swal.fire({
    title: '¿Eliminar producto?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then(r => {
    if (r.isConfirmed) {
      const idx = PRODUCTS.findIndex(x => x.id === id);
      if (idx > -1) PRODUCTS.splice(idx, 1);
      renderProductsTable();
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1400, showConfirmButton: false });
    }
  });
}

function openCreateProductModal() {
  Swal.fire({
    title: 'Crear Producto',
    width: 560,
    html: `
      <div class="text-start">
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Nombre *</label>
          <input id="cp-name" class="form-control" placeholder="Nombre del producto">
        </div>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Precio Costo</label>
            <input id="cp-cost" class="form-control" placeholder="0" type="number">
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Precio Venta *</label>
            <input id="cp-price" class="form-control" placeholder="0" type="number">
          </div>
        </div>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Stock Inicial</label>
            <input id="cp-stock" class="form-control" placeholder="0" type="number">
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Categoría</label>
            <input id="cp-cat" class="form-control" placeholder="Categoría">
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Tipo</label>
          <select id="cp-type" class="form-select">
            <option value="simple">Simple</option>
            <option value="compuesto">Compuesto</option>
            <option value="servicio">Servicio</option>
          </select>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745',
    cancelButtonColor: '#6c757d',
    confirmButtonText: '<i class="bi bi-plus-lg me-1"></i> Crear',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const name = document.getElementById('cp-name').value.trim();
      if (!name) { Swal.showValidationMessage('El nombre es obligatorio'); return false; }
      const cost = parseFloat(document.getElementById('cp-cost').value) || 0;
      const price = parseFloat(document.getElementById('cp-price').value) || 0;
      const stock = parseInt(document.getElementById('cp-stock').value) || 0;
      const cat = document.getElementById('cp-cat').value.trim() || 'Sin categoría';
      const type = document.getElementById('cp-type').value;
      const newId = PRODUCTS.length + 1;
      PRODUCTS.push({ id: newId, img: '', code: 'PRD-' + String(newId).padStart(3, '0'), name, category: cat, cost, price, qty: stock, unit: 'Unid.', type });
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      Swal.fire({ icon: 'success', title: 'Producto creado', timer: 1600, showConfirmButton: false });
      renderProductsTable();
    }
  });
}

// =============================================
// SALES PAGE
// =============================================
let salesDT = null;

function initSalesPage() {
  renderSalesTable();
}

function renderSalesTable() {
  const tbody = document.getElementById('salesTbody');
  if (!tbody) return;

  tbody.innerHTML = SALES.map(s => `
    <tr>
      <td><span class="fw-bold" style="color:#00BCD4;">#${s.id}</span></td>
      <td>${fmtDate(s.date)}</td>
      <td>${s.client}</td>
      <td>${s.items}</td>
      <td><strong>${fmtCurrency(s.total)}</strong></td>
      <td><span style="font-size:0.8rem;">${s.payment}</span></td>
      <td>
        <span class="badge rounded-pill ${s.status === 'cobrada' ? 'bg-success' : 'bg-warning text-dark'}" style="font-size:0.72rem;">
          ${s.status === 'cobrada' ? 'Cobrada' : 'Pendiente'}
        </span>
      </td>
      <td>
        <div class="dropdown">
          <button class="action-btn dropdown-toggle" data-bs-toggle="dropdown">
            <i class="bi bi-gear"></i> Acciones
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0" style="font-size:0.82rem;">
            <li><a class="dropdown-item" href="#" onclick="viewSale(${s.id})"><i class="bi bi-eye text-primary me-2"></i>Ver</a></li>
            <li><a class="dropdown-item" href="#" onclick="viewSale(${s.id})"><i class="bi bi-printer text-secondary me-2"></i>Imprimir</a></li>
            <li><a class="dropdown-item" href="#" onclick="showToast('Función de email no disponible aún.','info')"><i class="bi bi-envelope text-info me-2"></i>Enviar por email</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" onclick="deleteSale(${s.id})"><i class="bi bi-trash me-2"></i>Anular</a></li>
          </ul>
        </div>
      </td>
    </tr>
  `).join('');

  if (salesDT) salesDT.destroy();
  salesDT = new DataTable('#salesTable', {
    language: dtLang(),
    pageLength: 10,
    order: [[0, 'desc']],
    columnDefs: [{ orderable: false, targets: [7] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

function deleteSale(id) {
  Swal.fire({
    title: '¿Anular venta #' + id + '?',
    text: 'La venta quedará marcada como anulada.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Anular',
    cancelButtonText: 'Cancelar',
  }).then(r => {
    if (r.isConfirmed) Swal.fire({ icon: 'success', title: 'Venta anulada', timer: 1400, showConfirmButton: false });
  });
}

// =============================================
// CLIENTS PAGE
// =============================================
let clientsDT = null;

function initClientsPage() {
  renderClientsTable();
}

function renderClientsTable() {
  const tbody = document.getElementById('clientsTbody');
  if (!tbody) return;

  tbody.innerHTML = CLIENTS.map(c => `
    <tr>
      <td><input type="checkbox" class="form-check-input" value="${c.id}"></td>
      <td><span style="font-size:0.78rem;color:#6c757d;">${c.code}</span></td>
      <td>
        <div class="d-flex align-items-center gap-2">
          <div style="width:32px;height:32px;border-radius:50%;background:#e3f8fb;display:flex;align-items:center;justify-content:center;font-size:0.9rem;color:#00BCD4;flex-shrink:0;">
            ${c.name.charAt(0)}
          </div>
          <strong style="font-size:0.84rem;">${c.name}</strong>
        </div>
      </td>
      <td style="font-size:0.82rem;">${c.phone}</td>
      <td style="font-size:0.82rem;">${c.email}</td>
      <td><span class="badge rounded-pill bg-light text-dark border" style="font-size:0.72rem;">${c.group}</span></td>
      <td>
        <span class="${c.balance < 0 ? 'text-danger' : c.balance > 0 ? 'text-success' : ''} fw-semibold" style="font-size:0.82rem;">
          ${fmtCurrency(c.balance)}
        </span>
      </td>
      <td>
        <span class="badge rounded-pill ${c.status === 'activo' ? 'bg-success' : 'bg-secondary'}" style="font-size:0.72rem;">
          ${c.status}
        </span>
      </td>
      <td>
        <div class="dropdown">
          <button class="action-btn dropdown-toggle" data-bs-toggle="dropdown">
            <i class="bi bi-gear"></i> Acciones
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0" style="font-size:0.82rem;">
            <li><a class="dropdown-item" href="#" onclick="viewClient(${c.id})"><i class="bi bi-eye text-primary me-2"></i>Ver</a></li>
            <li><a class="dropdown-item" href="#" onclick="editClient(${c.id})"><i class="bi bi-pencil text-warning me-2"></i>Editar</a></li>
            <li><a class="dropdown-item" href="#" onclick="navigateTo('account-status','Estado de Cuentas')"><i class="bi bi-receipt text-info me-2"></i>Estado de cuenta</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" onclick="deleteClient(${c.id})"><i class="bi bi-trash me-2"></i>Eliminar</a></li>
          </ul>
        </div>
      </td>
    </tr>
  `).join('');

  if (clientsDT) clientsDT.destroy();
  clientsDT = new DataTable('#clientsTable', {
    language: dtLang(),
    pageLength: 10,
    columnDefs: [{ orderable: false, targets: [0, 8] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

function openCreateClientModal() {
  Swal.fire({
    title: 'Crear Cliente',
    width: 560,
    html: `
      <div class="text-start">
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Nombre completo *</label>
          <input id="cc-name" class="form-control" placeholder="Apellido, Nombre">
        </div>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Teléfono</label>
            <input id="cc-phone" class="form-control" placeholder="011-0000-0000">
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Email</label>
            <input id="cc-email" class="form-control" placeholder="correo@ejemplo.com" type="email">
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Grupo</label>
          <select id="cc-group" class="form-select">
            <option>Minorista</option>
            <option>Mayorista</option>
            <option>VIP</option>
          </select>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745',
    cancelButtonColor: '#6c757d',
    confirmButtonText: '<i class="bi bi-plus-lg me-1"></i> Crear',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const name = document.getElementById('cc-name').value.trim();
      if (!name) { Swal.showValidationMessage('El nombre es obligatorio'); return false; }
      const phone = document.getElementById('cc-phone').value.trim();
      const email = document.getElementById('cc-email').value.trim();
      const group = document.getElementById('cc-group').value;
      const newId = CLIENTS.length + 1;
      CLIENTS.push({ id: newId, code: 'CLI-' + String(newId).padStart(3, '0'), name, phone, email, group, balance: 0, status: 'activo' });
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      Swal.fire({ icon: 'success', title: 'Cliente creado', timer: 1600, showConfirmButton: false });
      renderClientsTable();
    }
  });
}

// =============================================
// PURCHASES PAGE
// =============================================
let purchasesDT = null;

function initPurchasesPage() {
  renderPurchasesTable();
}

function renderPurchasesTable() {
  const tbody = document.getElementById('purchasesTbody');
  if (!tbody) return;

  tbody.innerHTML = PURCHASES.map(p => `
    <tr>
      <td><span class="fw-bold" style="color:#FF6B00;">${p.id}</span></td>
      <td>${fmtDate(p.date)}</td>
      <td>${p.supplier}</td>
      <td>${p.items}</td>
      <td><strong>${fmtCurrency(p.total)}</strong></td>
      <td style="font-size:0.8rem;">${p.payment}</td>
      <td>
        <span class="badge rounded-pill ${p.status === 'recibida' ? 'bg-success' : 'bg-warning text-dark'}" style="font-size:0.72rem;">
          ${p.status}
        </span>
      </td>
      <td>
        <div class="dropdown">
          <button class="action-btn dropdown-toggle" data-bs-toggle="dropdown">
            <i class="bi bi-gear"></i> Acciones
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0" style="font-size:0.82rem;">
            <li><a class="dropdown-item" href="#" onclick="viewPurchase('${p.id}')"><i class="bi bi-eye text-primary me-2"></i>Ver</a></li>
            <li><a class="dropdown-item" href="#" onclick="viewPurchase('${p.id}')"><i class="bi bi-printer text-secondary me-2"></i>Imprimir</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" onclick="deletePurchase('${p.id}')"><i class="bi bi-trash me-2"></i>Eliminar</a></li>
          </ul>
        </div>
      </td>
    </tr>
  `).join('');

  if (purchasesDT) purchasesDT.destroy();
  purchasesDT = new DataTable('#purchasesTable', {
    language: dtLang(),
    pageLength: 10,
    order: [[0, 'desc']],
    columnDefs: [{ orderable: false, targets: [7] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

// =============================================
// EXPENSES PAGE
// =============================================
let expensesDT = null;

function initExpensesPage() {
  renderExpensesTable();
}

function renderExpensesTable() {
  const tbody = document.getElementById('expensesTbody');
  if (!tbody) return;

  tbody.innerHTML = EXPENSES.map(e => `
    <tr>
      <td><span style="font-size:0.78rem;color:#6c757d;">${e.id}</span></td>
      <td>${fmtDate(e.date)}</td>
      <td><span class="badge rounded-pill bg-light text-dark border" style="font-size:0.72rem;">${e.category}</span></td>
      <td style="font-size:0.83rem;">${e.description}</td>
      <td><strong style="color:#DC3545;">${fmtCurrency(e.amount)}</strong></td>
      <td style="font-size:0.82rem;">${e.payment}</td>
      <td>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-primary" style="font-size:0.75rem;" onclick="editExpense('${e.id}')"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger" style="font-size:0.75rem;" onclick="deleteExpense('${e.id}')"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  if (expensesDT) expensesDT.destroy();
  expensesDT = new DataTable('#expensesTable', {
    language: dtLang(),
    pageLength: 10,
    order: [[1, 'desc']],
    columnDefs: [{ orderable: false, targets: [6] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

// =============================================
// SUPPLIERS PAGE
// =============================================
let suppliersDT = null;

function initSuppliersPage() {
  renderSuppliersTable();
}

function renderSuppliersTable() {
  const tbody = document.getElementById('suppliersTbody');
  if (!tbody) return;

  tbody.innerHTML = SUPPLIERS.map(s => `
    <tr>
      <td><span style="font-size:0.78rem;color:#6c757d;">${s.code}</span></td>
      <td>
        <div class="d-flex align-items-center gap-2">
          <div style="width:32px;height:32px;border-radius:8px;background:#fff3e0;display:flex;align-items:center;justify-content:center;font-size:0.9rem;">
            🏢
          </div>
          <strong style="font-size:0.84rem;">${s.name}</strong>
        </div>
      </td>
      <td style="font-size:0.82rem;">${s.phone}</td>
      <td style="font-size:0.82rem;">${s.email}</td>
      <td style="font-size:0.8rem;">${s.cuit}</td>
      <td>
        <span class="${s.balance < 0 ? 'text-danger' : 'text-muted'} fw-semibold" style="font-size:0.82rem;">
          ${fmtCurrency(s.balance)}
        </span>
      </td>
      <td>
        <span class="badge rounded-pill ${s.status === 'activo' ? 'bg-success' : 'bg-secondary'}" style="font-size:0.72rem;">
          ${s.status}
        </span>
      </td>
      <td>
        <div class="dropdown">
          <button class="action-btn dropdown-toggle" data-bs-toggle="dropdown">
            <i class="bi bi-gear"></i> Acciones
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0" style="font-size:0.82rem;">
            <li><a class="dropdown-item" href="#" onclick="viewSupplier(${s.id})"><i class="bi bi-eye text-primary me-2"></i>Ver</a></li>
            <li><a class="dropdown-item" href="#" onclick="editSupplier(${s.id})"><i class="bi bi-pencil text-warning me-2"></i>Editar</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" onclick="deleteSupplier(${s.id})"><i class="bi bi-trash me-2"></i>Eliminar</a></li>
          </ul>
        </div>
      </td>
    </tr>
  `).join('');

  if (suppliersDT) suppliersDT.destroy();
  suppliersDT = new DataTable('#suppliersTable', {
    language: dtLang(),
    pageLength: 10,
    columnDefs: [{ orderable: false, targets: [7] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

// =============================================
// REPORTS — SALES
// =============================================
let reportSalesChart = null;

function initReportSales() {
  setTimeout(() => {
    const ctx = document.getElementById('reportSalesChart');
    if (!ctx) return;
    if (reportSalesChart) reportSalesChart.destroy();
    reportSalesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
          label: 'Ventas 2026',
          data: [1200000, 1800000, 2300000, 2100000, 1900000, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: 'rgba(0,188,212,0.7)',
          borderRadius: 6,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: c => ' $' + c.parsed.y.toLocaleString('es-AR') } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: v => '$' + (v / 1000) + 'K' } },
          x: { grid: { display: false } },
        },
      },
    });
  }, 80);
}

// =============================================
// POS — CREATE SALE
// =============================================
let posCart = [];

function initPOS() {
  renderPOSProducts();
  renderPOSCart();
  setupPOSSearch();
}

function renderPOSProducts() {
  const grid = document.getElementById('posProductGrid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.slice(0, 12).map(p => `
    <div class="pos-product-card" onclick="addToCart(${p.id})" title="${p.name}">
      <div style="font-size:1.8rem;margin-bottom:6px;">📦</div>
      <div style="font-size:0.76rem;font-weight:600;color:#1E2A38;line-height:1.3;text-align:center;margin-bottom:4px;">${p.name}</div>
      <div style="font-size:0.8rem;font-weight:800;color:#00BCD4;">${fmtCurrency(p.price)}</div>
      <div style="font-size:0.68rem;color:#6c757d;">Stock: ${p.qty}</div>
    </div>
  `).join('');
}

function setupPOSSearch() {
  const inp = document.getElementById('posSearchInput');
  if (!inp) return;
  inp.addEventListener('input', function () {
    const q = this.value.toLowerCase();
    const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q));
    const grid = document.getElementById('posProductGrid');
    if (!grid) return;
    grid.innerHTML = filtered.map(p => `
      <div class="pos-product-card" onclick="addToCart(${p.id})" title="${p.name}">
        <div style="font-size:1.8rem;margin-bottom:6px;">📦</div>
        <div style="font-size:0.76rem;font-weight:600;color:#1E2A38;line-height:1.3;text-align:center;margin-bottom:4px;">${p.name}</div>
        <div style="font-size:0.8rem;font-weight:800;color:#00BCD4;">${fmtCurrency(p.price)}</div>
        <div style="font-size:0.68rem;color:#6c757d;">Stock: ${p.qty}</div>
      </div>
    `).join('');
  });
}

function addToCart(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const existing = posCart.find(x => x.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    posCart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
  }
  renderPOSCart();
}

function removeFromCart(productId) {
  posCart = posCart.filter(x => x.id !== productId);
  renderPOSCart();
}

function updateCartQty(productId, qty) {
  const item = posCart.find(x => x.id === productId);
  if (item) {
    item.qty = Math.max(1, parseInt(qty) || 1);
    renderPOSCart();
  }
}

function renderPOSCart() {
  const container = document.getElementById('posCartItems');
  const totalEl = document.getElementById('posTotal');
  const subtotalEl = document.getElementById('posSubtotal');
  const countEl = document.getElementById('posItemCount');
  if (!container) return;

  if (posCart.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted py-4">
        <i class="bi bi-cart3" style="font-size:2.5rem;opacity:0.3;"></i>
        <p class="mt-2" style="font-size:0.83rem;">El carrito está vacío.<br>Haga clic en un producto para agregar.</p>
      </div>
    `;
  } else {
    container.innerHTML = posCart.map(item => `
      <div class="pos-cart-item">
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.82rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</div>
          <div style="font-size:0.78rem;color:#00BCD4;font-weight:700;">${fmtCurrency(item.price)}</div>
        </div>
        <div class="d-flex align-items-center gap-1">
          <button class="btn btn-sm btn-outline-secondary" style="width:26px;height:26px;padding:0;font-size:0.9rem;" onclick="updateCartQty(${item.id}, ${item.qty - 1})">−</button>
          <input type="number" value="${item.qty}" min="1" style="width:44px;text-align:center;border:1px solid #dee2e6;border-radius:4px;font-size:0.82rem;padding:2px;" onchange="updateCartQty(${item.id}, this.value)">
          <button class="btn btn-sm btn-outline-secondary" style="width:26px;height:26px;padding:0;font-size:0.9rem;" onclick="updateCartQty(${item.id}, ${item.qty + 1})">+</button>
          <button class="btn btn-sm btn-outline-danger" style="width:26px;height:26px;padding:0;font-size:0.8rem;" onclick="removeFromCart(${item.id})"><i class="bi bi-x"></i></button>
        </div>
        <div style="font-size:0.82rem;font-weight:700;color:#1E2A38;min-width:80px;text-align:right;">${fmtCurrency(item.price * item.qty)}</div>
      </div>
    `).join('');
  }

  const subtotal = posCart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = posCart.reduce((s, i) => s + i.qty, 0);
  if (subtotalEl) subtotalEl.textContent = fmtCurrency(subtotal);
  if (totalEl) totalEl.textContent = fmtCurrency(subtotal);
  if (countEl) countEl.textContent = count + ' ítem' + (count !== 1 ? 's' : '');
}

function completeSale() {
  if (posCart.length === 0) {
    Swal.fire({ icon: 'warning', title: 'Carrito vacío', text: 'Agregue productos antes de cobrar.', confirmButtonColor: '#00BCD4' });
    return;
  }
  const total = posCart.reduce((s, i) => s + i.price * i.qty, 0);
  Swal.fire({
    title: 'Confirmar venta',
    html: `
      <p>Total: <strong style="color:#00BCD4;font-size:1.3rem;">${fmtCurrency(total)}</strong></p>
      <select class="form-select mt-3" id="swal-payment">
        <option>Efectivo</option>
        <option>Tarjeta de débito</option>
        <option>Tarjeta de crédito</option>
        <option>Transferencia</option>
        <option>Cuenta corriente</option>
      </select>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745',
    cancelButtonColor: '#6c757d',
    confirmButtonText: '<i class="bi bi-check-lg me-1"></i> Cobrar',
    cancelButtonText: 'Cancelar',
  }).then(r => {
    if (r.isConfirmed) {
      const newSale = {
        id: 1000 + SALES.length + 1,
        date: new Date().toISOString().split('T')[0],
        client: 'Consumidor Final',
        total,
        payment: document.getElementById('swal-payment')?.value || 'Efectivo',
        status: 'cobrada',
        items: posCart.reduce((s, i) => s + i.qty, 0),
      };
      SALES.unshift(newSale);
      posCart = [];
      renderPOSCart();
      Swal.fire({
        icon: 'success',
        title: '¡Venta registrada!',
        html: `Venta <strong>#${newSale.id}</strong> por <strong>${fmtCurrency(total)}</strong> registrada correctamente.`,
        confirmButtonColor: '#00BCD4',
        confirmButtonText: 'Imprimir ticket',
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
      });
    }
  });
}

// =============================================
// DataTables language
// =============================================
function dtLang() {
  return {
    sEmptyTable: 'No hay datos disponibles',
    sInfo: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
    sInfoEmpty: 'Mostrando 0 a 0 de 0 registros',
    sInfoFiltered: '(filtrado de _MAX_ registros totales)',
    sLengthMenu: 'Mostrar _MENU_ registros',
    sLoadingRecords: 'Cargando...',
    sProcessing: 'Procesando...',
    sSearch: 'Buscar:',
    sZeroRecords: 'No se encontraron resultados',
    oPaginate: { sFirst: 'Primero', sLast: 'Último', sNext: 'Siguiente', sPrevious: 'Anterior' },
  };
}
