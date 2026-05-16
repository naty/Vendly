/* =============================================
   VENDLY — Pages: Products, Sales, Clients, POS, etc.
   ============================================= */

'use strict';

// =============================================
// DATA (cargado desde Supabase)
// =============================================
let PRODUCTS  = [];
let CLIENTS   = [];
let SALES     = [];
let PURCHASES = [];
let EXPENSES  = [];
let SUPPLIERS = [];

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

async function renderProductsTable() {
  const tbody = document.getElementById('productsTbody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="11" class="text-center py-4"><div class="spinner-border spinner-border-sm text-primary me-2"></div>Cargando productos...</td></tr>';

  const { data, error } = await db.from('productos').select('*').order('name');
  if (error) {
    tbody.innerHTML = `<tr><td colspan="11" class="text-center text-danger py-3">Error al cargar productos: ${error.message}</td></tr>`;
    return;
  }
  PRODUCTS = data;

  if (PRODUCTS.length === 0) {
    tbody.innerHTML = '<tr><td colspan="11" class="text-center text-muted py-4">No hay productos cargados. Creá el primero.</td></tr>';
    if (productsDT) { productsDT.destroy(); productsDT = null; }
    return;
  }

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
    preConfirm: async () => {
      const name  = document.getElementById('swal-name').value.trim();
      const price = parseFloat(document.getElementById('swal-price').value) || 0;
      const qty   = parseInt(document.getElementById('swal-stock').value) || 0;
      if (!name) { Swal.showValidationMessage('El nombre es obligatorio'); return false; }
      const { error } = await db.from('productos').update({ name, price, qty }).eq('id', id);
      if (error) { Swal.showValidationMessage('Error: ' + error.message); return false; }
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      Swal.fire({ icon: 'success', title: 'Guardado', timer: 1800, showConfirmButton: false });
      renderProductsTable();
    }
  });
}

function duplicateProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  db.from('productos').insert({ code: '', name: p.name + ' (Copia)', category: p.category, cost: p.cost, price: p.price, qty: p.qty, unit: p.unit, type: p.type, img: p.img })
    .then(({ error }) => {
      if (error) { showToast('Error al duplicar: ' + error.message, 'error'); return; }
      Swal.fire({ icon: 'success', title: 'Duplicado', timer: 1400, showConfirmButton: false });
      renderProductsTable();
    });
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
  }).then(async r => {
    if (r.isConfirmed) {
      const { error } = await db.from('productos').delete().eq('id', id);
      if (error) { showToast('Error al eliminar: ' + error.message, 'error'); return; }
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
    preConfirm: async () => {
      const name  = document.getElementById('cp-name').value.trim();
      if (!name) { Swal.showValidationMessage('El nombre es obligatorio'); return false; }
      const cost  = parseFloat(document.getElementById('cp-cost').value) || 0;
      const price = parseFloat(document.getElementById('cp-price').value) || 0;
      const qty   = parseInt(document.getElementById('cp-stock').value) || 0;
      const category = document.getElementById('cp-cat').value.trim() || 'Sin categoría';
      const type  = document.getElementById('cp-type').value;
      const { error } = await db.from('productos').insert({ name, category, cost, price, qty, unit: 'Unid.', type, img: '', code: '' });
      if (error) { Swal.showValidationMessage('Error al guardar: ' + error.message); return false; }
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

async function renderSalesTable() {
  const tbody = document.getElementById('salesTbody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="8" class="text-center py-4"><div class="spinner-border spinner-border-sm text-primary me-2"></div>Cargando ventas...</td></tr>';
  if (salesDT) { salesDT.destroy(); salesDT = null; }

  const { data, error } = await db.from('ventas').select('*').order('created_at', { ascending: false });
  if (error) { tbody.innerHTML = `<tr><td colspan="8" class="text-center text-danger py-3">Error: ${error.message}</td></tr>`; return; }

  SALES = (data || []).map(s => ({ ...s, client: s.client_name }));

  if (SALES.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted py-4">No hay ventas registradas aún.</td></tr>';
    return;
  }

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

async function renderClientsTable() {
  const tbody = document.getElementById('clientsTbody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="9" class="text-center py-4"><div class="spinner-border spinner-border-sm text-primary me-2"></div>Cargando clientes...</td></tr>';
  if (clientsDT) { clientsDT.destroy(); clientsDT = null; }

  const { data, error } = await db.from('clientes').select('*').order('name');
  if (error) { tbody.innerHTML = `<tr><td colspan="9" class="text-center text-danger py-3">Error: ${error.message}</td></tr>`; return; }

  CLIENTS = (data || []).map(c => ({ ...c, group: c.grp }));

  if (CLIENTS.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" class="text-center text-muted py-4">No hay clientes registrados aún.</td></tr>';
    return;
  }

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
    preConfirm: async () => {
      const name = document.getElementById('cc-name').value.trim();
      if (!name) { Swal.showValidationMessage('El nombre es obligatorio'); return false; }
      const phone = document.getElementById('cc-phone').value.trim();
      const email = document.getElementById('cc-email').value.trim();
      const grp   = document.getElementById('cc-group').value;
      const code  = 'CLI-' + Date.now().toString().slice(-6);
      const { error } = await db.from('clientes').insert({ code, name, phone, email, grp, balance: 0, status: 'activo' });
      if (error) { Swal.showValidationMessage('Error al guardar: ' + error.message); return false; }
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

async function renderPurchasesTable() {
  const tbody = document.getElementById('purchasesTbody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="8" class="text-center py-4"><div class="spinner-border spinner-border-sm text-primary me-2"></div>Cargando compras...</td></tr>';
  if (purchasesDT) { purchasesDT.destroy(); purchasesDT = null; }

  const { data, error } = await db.from('compras').select('*').order('created_at', { ascending: false });
  if (error) { tbody.innerHTML = `<tr><td colspan="8" class="text-center text-danger py-3">Error: ${error.message}</td></tr>`; return; }

  PURCHASES = (data || []).map(p => ({ ...p, supplier: p.supplier_name }));

  if (PURCHASES.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted py-4">No hay compras registradas aún.</td></tr>';
    return;
  }

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

async function renderExpensesTable() {
  const tbody = document.getElementById('expensesTbody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4"><div class="spinner-border spinner-border-sm text-primary me-2"></div>Cargando gastos...</td></tr>';
  if (expensesDT) { expensesDT.destroy(); expensesDT = null; }

  const { data, error } = await db.from('gastos').select('*').order('created_at', { ascending: false });
  if (error) { tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger py-3">Error: ${error.message}</td></tr>`; return; }

  EXPENSES = data || [];

  if (EXPENSES.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">No hay gastos registrados aún.</td></tr>';
    return;
  }

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

async function renderSuppliersTable() {
  const tbody = document.getElementById('suppliersTbody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="8" class="text-center py-4"><div class="spinner-border spinner-border-sm text-primary me-2"></div>Cargando proveedores...</td></tr>';
  if (suppliersDT) { suppliersDT.destroy(); suppliersDT = null; }

  const { data, error } = await db.from('proveedores').select('*').order('name');
  if (error) { tbody.innerHTML = `<tr><td colspan="8" class="text-center text-danger py-3">Error: ${error.message}</td></tr>`; return; }

  SUPPLIERS = data || [];

  if (SUPPLIERS.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted py-4">No hay proveedores registrados aún.</td></tr>';
    return;
  }

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
  }).then(async r => {
    if (r.isConfirmed) {
      const payment = document.getElementById('swal-payment')?.value || 'Efectivo';
      const itemCount = posCart.reduce((s, i) => s + i.qty, 0);
      const today = new Date().toISOString().split('T')[0];

      const { data: inserted, error } = await db.from('ventas').insert({
        date: today,
        client_name: 'Consumidor Final',
        total,
        payment,
        status: 'cobrada',
        items: itemCount,
      }).select().single();

      if (error) {
        Swal.fire({ icon: 'error', title: 'Error al guardar', text: error.message, confirmButtonColor: '#DC3545' });
        return;
      }

      for (const item of posCart) {
        const prod = PRODUCTS.find(p => p.id === item.id);
        if (prod) {
          const newQty = Math.max(0, prod.qty - item.qty);
          await db.from('productos').update({ qty: newQty }).eq('id', item.id);
          prod.qty = newQty;
        }
      }

      posCart = [];
      renderPOSCart();
      renderPOSProducts();
      Swal.fire({
        icon: 'success',
        title: '¡Venta registrada!',
        html: `Venta <strong>#${inserted.id}</strong> por <strong>${fmtCurrency(total)}</strong> guardada en Supabase.`,
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
