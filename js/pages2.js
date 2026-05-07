/* =============================================
   VENDLY — Páginas adicionales
   ============================================= */

'use strict';

// =============================================
// DATOS DE EJEMPLO ADICIONALES
// =============================================

const CATEGORIES = [
  { id: 1, name: 'Electrónica',  description: 'Dispositivos y accesorios electrónicos', products: 45, status: 'activa' },
  { id: 2, name: 'Ropa',         description: 'Indumentaria y moda',                    products: 38, status: 'activa' },
  { id: 3, name: 'Calzado',      description: 'Zapatos, zapatillas y sandalias',         products: 22, status: 'activa' },
  { id: 4, name: 'Accesorios',   description: 'Complementos y accesorios varios',        products: 17, status: 'activa' },
  { id: 5, name: 'Servicios',    description: 'Servicios técnicos y profesionales',      products: 8,  status: 'activa' },
  { id: 6, name: 'Hogar',        description: 'Artículos para el hogar',                 products: 31, status: 'activa' },
  { id: 7, name: 'Deportes',     description: 'Equipamiento deportivo',                  products: 14, status: 'inactiva' },
];

const BRANDS = [
  { id: 1, name: 'Samsung',   products: 18, status: 'activa' },
  { id: 2, name: 'Apple',     products: 12, status: 'activa' },
  { id: 3, name: 'Nike',      products: 25, status: 'activa' },
  { id: 4, name: 'Adidas',    products: 20, status: 'activa' },
  { id: 5, name: 'Genérico',  products: 45, status: 'activa' },
  { id: 6, name: 'Logitech',  products: 8,  status: 'activa' },
];

const UNITS = [
  { id: 1, name: 'Unidad',    abbreviation: 'Unid.', products: 320 },
  { id: 2, name: 'Par',       abbreviation: 'Par',   products: 22  },
  { id: 3, name: 'Kilogramo', abbreviation: 'Kg',    products: 14  },
  { id: 4, name: 'Litro',     abbreviation: 'Lt',    products: 9   },
  { id: 5, name: 'Metro',     abbreviation: 'Mt',    products: 6   },
  { id: 6, name: 'Servicio',  abbreviation: 'Serv.', products: 8   },
];

const BUDGETS = [
  { id: 'PRE-001', date: '2026-05-03', client: 'García, Juan Carlos',    total: 580000,  items: 4, status: 'pendiente', expiry: '2026-05-17' },
  { id: 'PRE-002', date: '2026-05-01', client: 'López, María Fernanda',  total: 245000,  items: 2, status: 'aprobado',  expiry: '2026-05-15' },
  { id: 'PRE-003', date: '2026-04-28', client: 'González, Luis M.',      total: 1200000, items: 7, status: 'rechazado', expiry: '2026-05-12' },
  { id: 'PRE-004', date: '2026-04-25', client: 'Martínez, Pedro A.',     total: 75000,   items: 1, status: 'pendiente', expiry: '2026-05-09' },
  { id: 'PRE-005', date: '2026-04-20', client: 'Fernández, Ana Laura',   total: 340000,  items: 3, status: 'aprobado',  expiry: '2026-05-04' },
];

const RETURNS = [
  { id: 'DEV-001', date: '2026-05-02', client: 'García, Juan Carlos',   sale: '#1007', total: 28000, reason: 'Producto defectuoso',     status: 'aprobada'  },
  { id: 'DEV-002', date: '2026-04-29', client: 'López, María Fernanda', sale: '#1002', total: 9500,  reason: 'Talla incorrecta',        status: 'pendiente' },
  { id: 'DEV-003', date: '2026-04-25', client: 'Martínez, Pedro A.',    sale: '#1003', total: 55000, reason: 'No cumple expectativas',  status: 'rechazada' },
];

const CASH_MOVEMENTS = [
  { id: 1, date: '2026-05-04 09:15', type: 'ingreso', description: 'Apertura de caja',       amount: 50000,  box: 'Caja Principal', user: 'Admin' },
  { id: 2, date: '2026-05-04 10:30', type: 'ingreso', description: 'Venta #1001',             amount: 280000, box: 'Caja Principal', user: 'Admin' },
  { id: 3, date: '2026-05-04 11:00', type: 'egreso',  description: 'Pago a proveedor',        amount: 45000,  box: 'Caja Principal', user: 'Admin' },
  { id: 4, date: '2026-05-04 12:15', type: 'ingreso', description: 'Venta #1002',             amount: 55000,  box: 'Caja Principal', user: 'Admin' },
  { id: 5, date: '2026-05-04 14:00', type: 'egreso',  description: 'Gasto limpieza',          amount: 12000,  box: 'Caja Principal', user: 'Admin' },
  { id: 6, date: '2026-05-04 16:30', type: 'ingreso', description: 'Venta #1003 — parcial',   amount: 100000, box: 'Caja Principal', user: 'Admin' },
  { id: 7, date: '2026-05-04 18:00', type: 'egreso',  description: 'Retiro cierre de caja',   amount: 428000, box: 'Caja Principal', user: 'Admin' },
];

const ACCOUNTING_ENTRIES = [
  { id: 1, date: '2026-05-01', account: 'Ventas',      debit: 0,      credit: 280000, description: 'Venta factura #1001',  ref: 'FAC-1001' },
  { id: 2, date: '2026-05-01', account: 'Caja',        debit: 280000, credit: 0,      description: 'Cobro factura #1001',  ref: 'REC-001'  },
  { id: 3, date: '2026-05-01', account: 'Ventas',      debit: 0,      credit: 55000,  description: 'Venta factura #1002',  ref: 'FAC-1002' },
  { id: 4, date: '2026-05-01', account: 'Caja',        debit: 55000,  credit: 0,      description: 'Cobro factura #1002',  ref: 'REC-002'  },
  { id: 5, date: '2026-05-02', account: 'Compras',     debit: 640000, credit: 0,      description: 'Compra OC-001',        ref: 'OC-001'   },
  { id: 6, date: '2026-05-02', account: 'Proveedores', debit: 0,      credit: 640000, description: 'Deuda OC-001',         ref: 'OC-001'   },
  { id: 7, date: '2026-05-03', account: 'Gastos',      debit: 180000, credit: 0,      description: 'Alquiler mayo 2026',   ref: 'GAS-001'  },
  { id: 8, date: '2026-05-03', account: 'Banco',       debit: 0,      credit: 180000, description: 'Pago alquiler',        ref: 'GAS-001'  },
  { id: 9, date: '2026-05-03', account: 'Gastos',      debit: 350000, credit: 0,      description: 'Sueldos personal',     ref: 'GAS-003'  },
  { id:10, date: '2026-05-03', account: 'Banco',       debit: 0,      credit: 350000, description: 'Transferencia sueldos',ref: 'GAS-003'  },
];

const LOW_STOCK = [
  { code: 'PRD-004', name: 'Monitor 24" Full HD',     category: 'Electrónica', qty: 2,  min: 5,  unit: 'Unid.' },
  { code: 'PRD-007', name: 'Mochila Urbana 25L',      category: 'Accesorios',  qty: 3,  min: 10, unit: 'Unid.' },
  { code: 'PRD-011', name: 'Zapatillas Running',       category: 'Calzado',     qty: 1,  min: 8,  unit: 'Par'   },
  { code: 'PRD-010', name: 'Auriculares Bluetooth',    category: 'Electrónica', qty: 4,  min: 10, unit: 'Unid.' },
  { code: 'PRD-001', name: 'Laptop Pro 15"',           category: 'Electrónica', qty: 5,  min: 6,  unit: 'Unid.' },
  { code: 'PRD-006', name: 'Pantalón Jean Slim',       category: 'Ropa',        qty: 2,  min: 15, unit: 'Unid.' },
  { code: 'PRD-012', name: 'Camisa Oxford',            category: 'Ropa',        qty: 4,  min: 20, unit: 'Unid.' },
];

const PAYMENT_TERMS = [
  { id: 1, name: 'Contado',        days: 0,  discount: 5,  type: 'venta' },
  { id: 2, name: 'Crédito 15 días',days: 15, discount: 0,  type: 'venta' },
  { id: 3, name: 'Crédito 30 días',days: 30, discount: 0,  type: 'ambos' },
  { id: 4, name: 'Crédito 60 días',days: 60, discount: 0,  type: 'compra'},
  { id: 5, name: 'Tarjeta débito', days: 1,  discount: 0,  type: 'venta' },
  { id: 6, name: 'Tarjeta crédito 1 cuota', days: 3, discount: 0, type: 'venta' },
];

const CASH_REGISTERS = [
  { id: 1, name: 'Caja Principal', location: 'Local centro', balance: 250000, status: 'abierta',  user: 'Admin' },
  { id: 2, name: 'Caja 2',         location: 'Sucursal Norte', balance: 80000, status: 'cerrada', user: 'Vendedor 1' },
];

const REMISSIONS = [
  { id: 'REM-001', date: '2026-05-03', client: 'García, Juan Carlos',  destination: 'Av. Corrientes 1234', items: 3, status: 'entregado' },
  { id: 'REM-002', date: '2026-05-02', client: 'González, Luis M.',    destination: 'Belgrano 456',        items: 5, status: 'en camino' },
  { id: 'REM-003', date: '2026-04-30', client: 'Martínez, Pedro A.',   destination: 'Florida 789',         items: 2, status: 'pendiente' },
];

const COMMISSIONS = [
  { user: 'Vendedor 1', sales: 12, total: 540000, commission_pct: 3, commission_amt: 16200 },
  { user: 'Vendedor 2', sales: 8,  total: 380000, commission_pct: 3, commission_amt: 11400 },
  { user: 'Admin',      sales: 7,  total: 1380000, commission_pct: 2, commission_amt: 27600 },
];

const DEBIT_NOTES = [
  { id: 'ND-001', date: '2026-05-01', client: 'Martínez, Pedro A.', sale: '#1003', amount: 46000, reason: 'Interés mora',     status: 'emitida' },
  { id: 'ND-002', date: '2026-04-25', client: 'Fernández, Ana Laura', sale: '#1005', amount: 19000, reason: 'Diferencia precio', status: 'cobrada' },
];

// =============================================
// PAGE: CREAR PRODUCTO (formulario completo)
// =============================================

function initCreateProductPage() {
  // Reset tabs to first
  const firstTab = document.querySelector('#createProductTabs .nav-link');
  if (firstTab) firstTab.click();

  // Margin auto-calculator
  const costInp = document.getElementById('cpf-cost');
  const priceInp = document.getElementById('cpf-price');
  const marginSpan = document.getElementById('cpf-margin-display');

  function updateMargin() {
    if (!costInp || !priceInp || !marginSpan) return;
    const cost = parseFloat(costInp.value) || 0;
    const price = parseFloat(priceInp.value) || 0;
    if (cost > 0 && price > cost) {
      const m = Math.round(((price - cost) / cost) * 100);
      marginSpan.textContent = m + '%';
      marginSpan.style.color = m >= 30 ? '#28A745' : m >= 15 ? '#FFC107' : '#DC3545';
    } else {
      marginSpan.textContent = '—';
      marginSpan.style.color = '#6c757d';
    }
  }

  if (costInp)  costInp.addEventListener('input', updateMargin);
  if (priceInp) priceInp.addEventListener('input', updateMargin);
}

function saveNewProduct() {
  const name = (document.getElementById('cpf-name')?.value || '').trim();
  if (!name) {
    Swal.fire({ icon: 'warning', title: 'Campo requerido', text: 'El nombre del producto es obligatorio.', confirmButtonColor: '#00BCD4' });
    return;
  }
  const cost  = parseFloat(document.getElementById('cpf-cost')?.value)  || 0;
  const price = parseFloat(document.getElementById('cpf-price')?.value) || 0;
  const stock = parseInt(document.getElementById('cpf-stock')?.value)   || 0;
  const newId = PRODUCTS.length + 1;

  PRODUCTS.push({
    id: newId,
    img: '',
    code: document.getElementById('cpf-code')?.value.trim() || ('PRD-' + String(newId).padStart(3,'0')),
    name,
    category: document.getElementById('cpf-category')?.value || 'Sin categoría',
    cost,
    price,
    qty: stock,
    unit: document.getElementById('cpf-unit')?.value || 'Unid.',
    type: document.getElementById('cpf-type')?.value || 'simple',
  });

  Swal.fire({
    icon: 'success',
    title: '¡Producto creado!',
    html: `<strong>${name}</strong> fue agregado con código <strong>PRD-${String(newId).padStart(3,'0')}</strong>.`,
    confirmButtonColor: '#00BCD4',
    confirmButtonText: '<i class="bi bi-list-ul me-1"></i> Ver lista',
    showCancelButton: true,
    cancelButtonText: 'Crear otro',
  }).then(r => {
    if (r.isConfirmed) {
      navigateTo('products', 'Lista de Productos');
    } else {
      document.querySelectorAll('#page-create-product input:not([type=radio]):not([type=checkbox]), #page-create-product select, #page-create-product textarea')
        .forEach(el => el.value = '');
      document.getElementById('cpf-margin-display').textContent = '—';
    }
  });
}

// =============================================
// PAGE: AJUSTE DE STOCK
// =============================================

function initStockAdjustmentPage() {
  const tbody = document.getElementById('stockAdjTbody');
  if (!tbody) return;

  tbody.innerHTML = PRODUCTS.map(p => `
    <tr>
      <td style="font-size:0.78rem;color:#6c757d;">${p.code}</td>
      <td style="font-size:0.84rem;font-weight:500;">${p.name}</td>
      <td style="font-size:0.82rem;">${p.category}</td>
      <td class="${p.qty <= 5 ? 'text-danger fw-bold' : 'text-success fw-semibold'}" style="font-size:0.85rem;">${p.qty}</td>
      <td>
        <input type="number" class="form-control form-control-sm stock-adj-input"
          data-original="${p.qty}" data-id="${p.id}" value="${p.qty}" min="0"
          style="width:90px;font-size:0.83rem;border:1.5px solid #dee2e6;border-radius:6px;">
      </td>
      <td>
        <span class="diff-badge" id="diff-${p.id}" style="font-size:0.8rem;font-weight:600;color:#6c757d;">±0</span>
      </td>
      <td style="font-size:0.82rem;color:#6c757d;">${p.unit}</td>
    </tr>
  `).join('');

  document.querySelectorAll('.stock-adj-input').forEach(inp => {
    inp.addEventListener('input', function () {
      const orig = parseInt(this.getAttribute('data-original')) || 0;
      const nw   = parseInt(this.value) || 0;
      const diff = nw - orig;
      const el   = document.getElementById('diff-' + this.getAttribute('data-id'));
      if (el) {
        el.textContent = (diff >= 0 ? '+' : '') + diff;
        el.style.color = diff > 0 ? '#28A745' : diff < 0 ? '#DC3545' : '#6c757d';
      }
    });
  });
}

function saveStockAdjustment() {
  let changes = 0;
  document.querySelectorAll('.stock-adj-input').forEach(inp => {
    const id  = parseInt(inp.getAttribute('data-id'));
    const nw  = parseInt(inp.value) || 0;
    const p   = PRODUCTS.find(x => x.id === id);
    if (p && p.qty !== nw) { p.qty = nw; changes++; }
  });

  if (changes === 0) {
    Swal.fire({ icon: 'info', title: 'Sin cambios', text: 'No se detectaron modificaciones de stock.', confirmButtonColor: '#00BCD4' });
    return;
  }
  Swal.fire({ icon: 'success', title: 'Ajuste guardado', text: `${changes} producto${changes > 1 ? 's' : ''} actualizado${changes > 1 ? 's' : ''}.`, confirmButtonColor: '#00BCD4', timer: 2000, showConfirmButton: false });
}

// =============================================
// PAGE: CATEGORÍAS
// =============================================

let categoriesDT = null;

function initCategoriesPage() {
  const tbody = document.getElementById('categoriesTbody');
  if (!tbody) return;

  tbody.innerHTML = CATEGORIES.map(c => `
    <tr>
      <td>
        <div class="d-flex align-items-center gap-2">
          <div style="width:34px;height:34px;border-radius:8px;background:#e3f8fb;display:flex;align-items:center;justify-content:center;font-size:1rem;">🏷️</div>
          <strong style="font-size:0.84rem;">${c.name}</strong>
        </div>
      </td>
      <td style="font-size:0.82rem;color:#6c757d;">${c.description}</td>
      <td><span class="badge rounded-pill" style="background:#e3f8fb;color:#0097a7;font-size:0.72rem;">${c.products} productos</span></td>
      <td><span class="badge rounded-pill ${c.status === 'activa' ? 'bg-success' : 'bg-secondary'}" style="font-size:0.72rem;">${c.status}</span></td>
      <td>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-warning" onclick="editCategory(${c.id})" title="Editar"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger"  onclick="deleteCategory(${c.id})" title="Eliminar"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  if (categoriesDT) categoriesDT.destroy();
  categoriesDT = new DataTable('#categoriesTable', {
    language: dtLang(), pageLength: 10,
    columnDefs: [{ orderable: false, targets: [4] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

function openCreateCategoryModal() {
  Swal.fire({
    title: 'Nueva Categoría',
    html: `
      <input id="cat-name" class="swal2-input" placeholder="Nombre de la categoría">
      <input id="cat-desc" class="swal2-input" placeholder="Descripción (opcional)">
    `,
    showCancelButton: true, confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Crear', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const name = document.getElementById('cat-name').value.trim();
      if (!name) { Swal.showValidationMessage('El nombre es obligatorio'); return false; }
      CATEGORIES.push({ id: CATEGORIES.length + 1, name, description: document.getElementById('cat-desc').value.trim(), products: 0, status: 'activa' });
      return true;
    },
  }).then(r => { if (r.isConfirmed) { Swal.fire({ icon: 'success', title: 'Categoría creada', timer: 1400, showConfirmButton: false }); initCategoriesPage(); } });
}

function editCategory(id) {
  const c = CATEGORIES.find(x => x.id === id);
  if (!c) return;
  Swal.fire({
    title: 'Editar Categoría',
    html: `
      <input id="cat-name" class="swal2-input" placeholder="Nombre" value="${c.name}">
      <input id="cat-desc" class="swal2-input" placeholder="Descripción" value="${c.description}">
    `,
    showCancelButton: true, confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Guardar', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      c.name = document.getElementById('cat-name').value.trim() || c.name;
      c.description = document.getElementById('cat-desc').value.trim();
      return true;
    },
  }).then(r => { if (r.isConfirmed) { Swal.fire({ icon: 'success', title: 'Guardado', timer: 1400, showConfirmButton: false }); initCategoriesPage(); } });
}

function deleteCategory(id) {
  Swal.fire({
    title: '¿Eliminar categoría?', icon: 'warning',
    showCancelButton: true, confirmButtonColor: '#DC3545', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar',
  }).then(r => {
    if (r.isConfirmed) {
      const idx = CATEGORIES.findIndex(x => x.id === id);
      if (idx > -1) CATEGORIES.splice(idx, 1);
      initCategoriesPage();
      Swal.fire({ icon: 'success', title: 'Eliminada', timer: 1400, showConfirmButton: false });
    }
  });
}

// =============================================
// PAGE: MARCAS
// =============================================

let brandsDT = null;

function initBrandsPage() {
  const tbody = document.getElementById('brandsTbody');
  if (!tbody) return;

  tbody.innerHTML = BRANDS.map(b => `
    <tr>
      <td>
        <div class="d-flex align-items-center gap-2">
          <div style="width:34px;height:34px;border-radius:8px;background:#fff3e0;display:flex;align-items:center;justify-content:center;font-size:1rem;">™️</div>
          <strong style="font-size:0.84rem;">${b.name}</strong>
        </div>
      </td>
      <td><span class="badge rounded-pill" style="background:#e3f8fb;color:#0097a7;font-size:0.72rem;">${b.products} productos</span></td>
      <td><span class="badge rounded-pill ${b.status === 'activa' ? 'bg-success' : 'bg-secondary'}" style="font-size:0.72rem;">${b.status}</span></td>
      <td>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-warning" title="Editar" onclick="editBrand(${b.id})"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger"  title="Eliminar" onclick="deleteBrand(${b.id})"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  if (brandsDT) brandsDT.destroy();
  brandsDT = new DataTable('#brandsTable', {
    language: dtLang(), pageLength: 10,
    columnDefs: [{ orderable: false, targets: [3] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

function editBrand(id) {
  const b = BRANDS.find(x => x.id === id);
  if (!b) return;
  Swal.fire({
    title: 'Editar Marca',
    html: `<input id="brand-name" class="swal2-input" placeholder="Nombre" value="${b.name}">`,
    showCancelButton: true, confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Guardar', cancelButtonText: 'Cancelar',
    preConfirm: () => { b.name = document.getElementById('brand-name').value.trim() || b.name; return true; },
  }).then(r => { if (r.isConfirmed) { Swal.fire({ icon: 'success', title: 'Guardado', timer: 1400, showConfirmButton: false }); initBrandsPage(); } });
}

function deleteBrand(id) {
  Swal.fire({
    title: '¿Eliminar marca?', icon: 'warning',
    showCancelButton: true, confirmButtonColor: '#DC3545', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar',
  }).then(r => {
    if (r.isConfirmed) {
      const idx = BRANDS.findIndex(x => x.id === id);
      if (idx > -1) BRANDS.splice(idx, 1);
      initBrandsPage();
      Swal.fire({ icon: 'success', title: 'Eliminada', timer: 1400, showConfirmButton: false });
    }
  });
}

function openCreateBrandModal() {
  Swal.fire({
    title: 'Nueva Marca',
    html: `<input id="brand-name" class="swal2-input" placeholder="Nombre de la marca">`,
    showCancelButton: true, confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Crear', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const name = document.getElementById('brand-name').value.trim();
      if (!name) { Swal.showValidationMessage('El nombre es obligatorio'); return false; }
      BRANDS.push({ id: BRANDS.length + 1, name, products: 0, status: 'activa' });
      return true;
    },
  }).then(r => { if (r.isConfirmed) { Swal.fire({ icon: 'success', title: 'Marca creada', timer: 1400, showConfirmButton: false }); initBrandsPage(); } });
}

// =============================================
// PAGE: UNIDADES
// =============================================

let unitsDT = null;

function initUnitsPage() {
  const tbody = document.getElementById('unitsTbody');
  if (!tbody) return;

  tbody.innerHTML = UNITS.map(u => `
    <tr>
      <td style="font-size:0.84rem;font-weight:600;">${u.name}</td>
      <td><span class="badge rounded-pill bg-light text-dark border" style="font-size:0.75rem;">${u.abbreviation}</span></td>
      <td><span class="badge rounded-pill" style="background:#e3f8fb;color:#0097a7;font-size:0.72rem;">${u.products} productos</span></td>
      <td>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-warning" title="Editar" onclick="editUnit(${u.id})"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger"  title="Eliminar" onclick="deleteUnit(${u.id})"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  if (unitsDT) unitsDT.destroy();
  unitsDT = new DataTable('#unitsTable', {
    language: dtLang(), pageLength: 10,
    columnDefs: [{ orderable: false, targets: [3] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

function openCreateUnitModal() {
  Swal.fire({
    title: 'Nueva Unidad',
    html: `
      <input id="unit-name" class="swal2-input" placeholder="Nombre (ej: Kilogramo)">
      <input id="unit-abbr" class="swal2-input" placeholder="Abreviación (ej: Kg)">
    `,
    showCancelButton: true, confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Crear', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const name = document.getElementById('unit-name').value.trim();
      if (!name) { Swal.showValidationMessage('El nombre es obligatorio'); return false; }
      UNITS.push({ id: UNITS.length + 1, name, abbreviation: document.getElementById('unit-abbr').value.trim() || name, products: 0 });
      return true;
    },
  }).then(r => { if (r.isConfirmed) { Swal.fire({ icon: 'success', title: 'Unidad creada', timer: 1400, showConfirmButton: false }); initUnitsPage(); } });
}

// =============================================
// PAGE: PRESUPUESTOS
// =============================================

let budgetsDT = null;

function initBudgetsPage() {
  const tbody = document.getElementById('budgetsTbody');
  if (!tbody) return;

  const sMap = { pendiente: 'bg-warning text-dark', aprobado: 'bg-success', rechazado: 'bg-danger' };

  tbody.innerHTML = BUDGETS.map(b => `
    <tr>
      <td><span class="fw-bold" style="color:#00BCD4;">${b.id}</span></td>
      <td>${fmtDate(b.date)}</td>
      <td>${b.client}</td>
      <td>${b.items}</td>
      <td><strong>${fmtCurrency(b.total)}</strong></td>
      <td>${fmtDate(b.expiry)}</td>
      <td><span class="badge rounded-pill ${sMap[b.status] || 'bg-secondary'}" style="font-size:0.72rem;">${b.status}</span></td>
      <td>
        <div class="dropdown">
          <button class="action-btn dropdown-toggle" data-bs-toggle="dropdown"><i class="bi bi-gear"></i> Acciones</button>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0" style="font-size:0.82rem;">
            <li><a class="dropdown-item py-2" href="#" onclick="viewBudget('${b.id}')"><i class="bi bi-eye text-primary me-2"></i>Ver</a></li>
            <li><a class="dropdown-item py-2" href="#" onclick="convertBudgetToSale('${b.id}')"><i class="bi bi-check-circle text-success me-2"></i>Convertir a venta</a></li>
            <li><a class="dropdown-item py-2" href="#" onclick="printRecord('Presupuesto ${b.id}','<p><strong>Cliente:</strong> ${b.client}</p><p><strong>Total:</strong> ${fmtCurrency(b.total)}</p><p><strong>Vence:</strong> ${fmtDate(b.expiry)}</p>')"><i class="bi bi-printer text-secondary me-2"></i>Imprimir</a></li>
            <li><a class="dropdown-item py-2" href="#" onclick="showToast('Función de email no disponible aún.','info')"><i class="bi bi-envelope text-info me-2"></i>Enviar por email</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item py-2 text-danger" href="#" onclick="deleteBudget('${b.id}')"><i class="bi bi-trash me-2"></i>Eliminar</a></li>
          </ul>
        </div>
      </td>
    </tr>
  `).join('');

  if (budgetsDT) budgetsDT.destroy();
  budgetsDT = new DataTable('#budgetsTable', {
    language: dtLang(), pageLength: 10, order: [[0, 'desc']],
    columnDefs: [{ orderable: false, targets: [7] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

function convertBudgetToSale(id) {
  const b = BUDGETS.find(x => x.id === id);
  if (!b) return;
  Swal.fire({
    title: '¿Convertir a venta?',
    html: `Presupuesto <strong>${id}</strong> por <strong>${fmtCurrency(b.total)}</strong> se convertirá en una venta.`,
    icon: 'question',
    showCancelButton: true, confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Convertir', cancelButtonText: 'Cancelar',
  }).then(r => {
    if (r.isConfirmed) {
      b.status = 'aprobado';
      SALES.unshift({ id: 1000 + SALES.length + 1, date: new Date().toISOString().split('T')[0], client: b.client, total: b.total, payment: 'Crédito', status: 'pendiente', items: b.items });
      Swal.fire({ icon: 'success', title: '¡Convertido!', text: 'La venta fue creada exitosamente.', confirmButtonColor: '#00BCD4', timer: 1800, showConfirmButton: false });
      initBudgetsPage();
    }
  });
}

// =============================================
// PAGE: DEVOLUCIONES
// =============================================

let returnsDT = null;

function initReturnsPage() {
  const tbody = document.getElementById('returnsTbody');
  if (!tbody) return;

  const sMap = { aprobada: 'bg-success', pendiente: 'bg-warning text-dark', rechazada: 'bg-danger' };

  tbody.innerHTML = RETURNS.map(r => `
    <tr>
      <td><span class="fw-bold" style="color:#FF6B00;">${r.id}</span></td>
      <td>${fmtDate(r.date)}</td>
      <td>${r.client}</td>
      <td><a href="#" class="text-primary fw-semibold">${r.sale}</a></td>
      <td><strong style="color:#DC3545;">${fmtCurrency(r.total)}</strong></td>
      <td style="font-size:0.82rem;">${r.reason}</td>
      <td><span class="badge rounded-pill ${sMap[r.status] || 'bg-secondary'}" style="font-size:0.72rem;">${r.status}</span></td>
      <td>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-primary" title="Ver" onclick="viewReturn('${r.id}')"><i class="bi bi-eye"></i></button>
          <button class="btn btn-sm btn-outline-success" title="Aprobar" onclick="approveReturn('${r.id}')"><i class="bi bi-check-lg"></i></button>
          <button class="btn btn-sm btn-outline-secondary" title="Imprimir" onclick="printCurrentPage()"><i class="bi bi-printer"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  if (returnsDT) returnsDT.destroy();
  returnsDT = new DataTable('#returnsTable', {
    language: dtLang(), pageLength: 10,
    columnDefs: [{ orderable: false, targets: [7] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

function approveReturn(id) {
  const r = RETURNS.find(x => x.id === id);
  if (!r || r.status === 'aprobada') return;
  Swal.fire({
    title: '¿Aprobar devolución?', icon: 'question',
    showCancelButton: true, confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Aprobar', cancelButtonText: 'Cancelar',
  }).then(res => { if (res.isConfirmed) { r.status = 'aprobada'; initReturnsPage(); Swal.fire({ icon: 'success', title: 'Devolución aprobada', timer: 1400, showConfirmButton: false }); } });
}

// =============================================
// PAGE: ESTADO DE CUENTAS
// =============================================

function initAccountStatusPage() {
  const tbody = document.getElementById('accountStatusTbody');
  if (!tbody) return;

  tbody.innerHTML = CLIENTS.map(c => {
    const clientSales = SALES.filter(s => s.client.includes(c.name.split(',')[0]));
    const totalSales  = clientSales.reduce((s, x) => s + x.total, 0);
    const pending     = clientSales.filter(s => s.status === 'pendiente').reduce((s, x) => s + x.total, 0);
    return `
      <tr>
        <td style="font-size:0.78rem;color:#6c757d;">${c.code}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <div style="width:32px;height:32px;border-radius:50%;background:#e3f8fb;display:flex;align-items:center;justify-content:center;font-size:0.85rem;color:#00BCD4;font-weight:700;">${c.name.charAt(0)}</div>
            <strong style="font-size:0.83rem;">${c.name}</strong>
          </div>
        </td>
        <td><span class="badge rounded-pill bg-light text-dark border" style="font-size:0.72rem;">${c.group}</span></td>
        <td style="font-size:0.82rem;">${clientSales.length}</td>
        <td style="font-size:0.82rem;font-weight:600;">${fmtCurrency(totalSales)}</td>
        <td><span class="${pending > 0 ? 'text-warning fw-bold' : 'text-muted'}" style="font-size:0.82rem;">${fmtCurrency(pending)}</span></td>
        <td><span class="${c.balance < 0 ? 'text-danger' : c.balance > 0 ? 'text-success' : 'text-muted'} fw-bold" style="font-size:0.83rem;">${fmtCurrency(c.balance)}</span></td>
        <td>
          <button class="btn-primary-custom" style="font-size:0.74rem;padding:4px 10px;">
            <i class="bi bi-eye me-1"></i>Ver cuenta
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// =============================================
// PAGE: REGISTRO DE PAGOS
// =============================================

let paymentsDT = null;

const PAYMENTS_REGISTER = [
  { id: 'PAG-001', date: '2026-05-02', client: 'García, Juan Carlos',    sale: '#1001', amount: 280000, method: 'Efectivo',      user: 'Admin' },
  { id: 'PAG-002', date: '2026-05-02', client: 'González, Luis M.',      sale: '#1004', amount: 145000, method: 'Tarjeta',       user: 'Admin' },
  { id: 'PAG-003', date: '2026-05-01', client: 'Rodríguez, Claudia',     sale: '#1006', amount: 75000,  method: 'Efectivo',      user: 'Vendedor 1' },
  { id: 'PAG-004', date: '2026-04-29', client: 'García, Juan Carlos',    sale: '#1007', amount: 445000, method: 'Transferencia', user: 'Admin' },
];

function initPaymentsRegisterPage() {
  const tbody = document.getElementById('paymentsTbody');
  if (!tbody) return;

  tbody.innerHTML = PAYMENTS_REGISTER.map(p => `
    <tr>
      <td><span class="fw-bold" style="color:#28A745;">${p.id}</span></td>
      <td>${fmtDate(p.date)}</td>
      <td>${p.client}</td>
      <td><a href="#" class="text-primary fw-semibold">${p.sale}</a></td>
      <td><strong style="color:#28A745;">${fmtCurrency(p.amount)}</strong></td>
      <td style="font-size:0.82rem;">${p.method}</td>
      <td style="font-size:0.78rem;color:#6c757d;">${p.user}</td>
      <td>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-primary" title="Ver recibo" onclick="viewPaymentReceipt('${p.id}')"><i class="bi bi-receipt"></i></button>
          <button class="btn btn-sm btn-outline-secondary" title="Imprimir" onclick="viewPaymentReceipt('${p.id}')"><i class="bi bi-printer"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  if (paymentsDT) paymentsDT.destroy();
  paymentsDT = new DataTable('#paymentsTable', {
    language: dtLang(), pageLength: 10, order: [[1, 'desc']],
    columnDefs: [{ orderable: false, targets: [7] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

// =============================================
// PAGE: MOVIMIENTOS DE CAJA
// =============================================

let cashMovDT = null;

function initCashMovementsPage() {
  // Summary cards
  const ingresos = CASH_MOVEMENTS.filter(m => m.type === 'ingreso').reduce((s, m) => s + m.amount, 0);
  const egresos  = CASH_MOVEMENTS.filter(m => m.type === 'egreso').reduce((s, m) => s + m.amount, 0);
  const el_i = document.getElementById('cashMovIngresos');
  const el_e = document.getElementById('cashMovEgresos');
  const el_s = document.getElementById('cashMovSaldo');
  if (el_i) el_i.textContent = fmtCurrency(ingresos);
  if (el_e) el_e.textContent = fmtCurrency(egresos);
  if (el_s) el_s.textContent = fmtCurrency(ingresos - egresos);

  const tbody = document.getElementById('cashMovTbody');
  if (!tbody) return;

  let running = 0;
  tbody.innerHTML = CASH_MOVEMENTS.map(m => {
    running += m.type === 'ingreso' ? m.amount : -m.amount;
    return `
      <tr>
        <td style="font-size:0.78rem;color:#6c757d;">${m.date}</td>
        <td><span class="badge rounded-pill ${m.type === 'ingreso' ? 'bg-success' : 'bg-danger'}" style="font-size:0.72rem;">${m.type === 'ingreso' ? '↑ Ingreso' : '↓ Egreso'}</span></td>
        <td style="font-size:0.83rem;">${m.description}</td>
        <td style="font-size:0.82rem;">${m.box}</td>
        <td>
          <span class="${m.type === 'ingreso' ? 'text-success' : 'text-danger'} fw-bold" style="font-size:0.83rem;">
            ${m.type === 'ingreso' ? '+' : '-'}${fmtCurrency(m.amount)}
          </span>
        </td>
        <td style="font-size:0.83rem;font-weight:600;">${fmtCurrency(running)}</td>
        <td style="font-size:0.78rem;color:#6c757d;">${m.user}</td>
      </tr>
    `;
  }).join('');

  if (cashMovDT) cashMovDT.destroy();
  cashMovDT = new DataTable('#cashMovTable', {
    language: dtLang(), pageLength: 10,
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

// =============================================
// PAGE: INFORME DE CAJA
// =============================================

let cashReportChart = null;

function initCashReportPage() {
  setTimeout(() => {
    const ctx = document.getElementById('cashReportChart');
    if (!ctx) return;
    if (cashReportChart) cashReportChart.destroy();
    cashReportChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['25/04','26/04','27/04','28/04','29/04','30/04','01/05','02/05','03/05','04/05'],
        datasets: [
          {
            label: 'Ingresos',
            data: [420000, 380000, 510000, 290000, 660000, 480000, 335000, 590000, 440000, 485000],
            backgroundColor: 'rgba(40,167,69,0.72)', borderRadius: 5,
          },
          {
            label: 'Egresos',
            data: [120000, 95000, 200000, 80000, 180000, 150000, 110000, 140000, 130000, 57000],
            backgroundColor: 'rgba(220,53,69,0.65)', borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { font: { size: 12 }, usePointStyle: true } },
          tooltip: { callbacks: { label: c => ' ' + c.dataset.label + ': $' + c.parsed.y.toLocaleString('es-AR') } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: v => '$' + (v/1000) + 'K' }, grid: { color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } },
        },
      },
    });
  }, 80);
}

// =============================================
// PAGE: ALERTAS DE STOCK
// =============================================

function initStockAlertsPage() {
  const tbody = document.getElementById('stockAlertsTbody');
  if (!tbody) return;

  tbody.innerHTML = LOW_STOCK.map(p => {
    const pct = Math.min(Math.round((p.qty / p.min) * 100), 100);
    const barColor = pct < 30 ? 'bg-danger' : pct < 60 ? 'bg-warning' : 'bg-success';
    return `
      <tr>
        <td style="font-size:0.78rem;color:#6c757d;">${p.code}</td>
        <td style="font-size:0.84rem;font-weight:500;">${p.name}</td>
        <td style="font-size:0.82rem;">${p.category}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <div class="progress flex-grow-1" style="height:8px;min-width:80px;">
              <div class="progress-bar ${barColor}" style="width:${pct}%"></div>
            </div>
            <span class="text-danger fw-bold" style="font-size:0.85rem;min-width:20px;">${p.qty}</span>
          </div>
        </td>
        <td style="font-size:0.82rem;color:#6c757d;">${p.min}</td>
        <td style="font-size:0.78rem;">${p.unit}</td>
        <td>
          <button class="btn-success-custom" style="font-size:0.74rem;padding:4px 10px;"
            onclick="Swal.fire({icon:'info',title:'Crear orden de compra',text:'Redirigiendo al módulo de Compras...',confirmButtonColor:'#00BCD4',timer:1800,showConfirmButton:false})">
            <i class="bi bi-cart-plus me-1"></i>Reponer
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// =============================================
// PAGE: STOCK VALORIZADO
// =============================================

let stockValuedDT = null;

function initStockValuedPage() {
  const totalCost   = PRODUCTS.reduce((s, p) => s + p.cost * p.qty, 0);
  const totalRetail = PRODUCTS.reduce((s, p) => s + p.price * p.qty, 0);

  const el_c = document.getElementById('svTotalCost');
  const el_r = document.getElementById('svTotalRetail');
  const el_g = document.getElementById('svTotalGain');
  if (el_c) el_c.textContent = fmtCurrency(totalCost);
  if (el_r) el_r.textContent = fmtCurrency(totalRetail);
  if (el_g) el_g.textContent = fmtCurrency(totalRetail - totalCost);

  const tbody = document.getElementById('stockValuedTbody');
  if (!tbody) return;

  tbody.innerHTML = PRODUCTS.map(p => {
    const costTotal   = p.cost * p.qty;
    const retailTotal = p.price * p.qty;
    const margin      = p.cost > 0 ? Math.round(((p.price - p.cost) / p.cost) * 100) : 0;
    return `
      <tr>
        <td style="font-size:0.78rem;color:#6c757d;">${p.code}</td>
        <td style="font-size:0.84rem;">${p.name}</td>
        <td style="font-size:0.82rem;">${p.category}</td>
        <td style="font-size:0.82rem;">${p.qty} ${p.unit}</td>
        <td style="font-size:0.82rem;">${fmtCurrency(p.cost)}</td>
        <td style="font-size:0.82rem;">${fmtCurrency(p.price)}</td>
        <td style="font-size:0.82rem;font-weight:600;">${fmtCurrency(costTotal)}</td>
        <td style="font-size:0.82rem;font-weight:600;color:#00BCD4;">${fmtCurrency(retailTotal)}</td>
        <td><span class="${margin >= 30 ? 'text-success' : margin >= 15 ? 'text-warning' : 'text-danger'} fw-bold" style="font-size:0.82rem;">${margin}%</span></td>
      </tr>
    `;
  }).join('');

  if (stockValuedDT) stockValuedDT.destroy();
  stockValuedDT = new DataTable('#stockValuedTable', {
    language: dtLang(), pageLength: 10,
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

// =============================================
// PAGE: BUSINESS INTELLIGENCE — RANKINGS
// =============================================

let biProductChart = null, biClientChart = null, biSupplierChart = null;

function initBIPage() {
  setTimeout(() => {
    _initBIProductChart();
    _initBIClientChart();
    _initBISupplierChart();
  }, 80);
}

function _initBIProductChart() {
  const ctx = document.getElementById('biProductChart');
  if (!ctx) return;
  if (biProductChart) biProductChart.destroy();
  biProductChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mouse Inalámbrico','Auriculares BT','Mochila 25L','Teclado RGB','Monitor 24"','Remera Blanca','Laptop Pro'],
      datasets: [{
        label: 'Ventas (unidades)',
        data: [28, 18, 18, 12, 8, 7, 4],
        backgroundColor: ['#00BCD4','#28A745','#FF6B00','#7c3aed','#FFC107','#DC3545','#0097a7'].map(c => c + 'CC'),
        borderRadius: 6,
      }],
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ' ' + c.parsed.x + ' unidades' } } },
      scales: { x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }, y: { grid: { display: false } } },
    },
  });
}

function _initBIClientChart() {
  const ctx = document.getElementById('biClientChart');
  if (!ctx) return;
  if (biClientChart) biClientChart.destroy();
  biClientChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['García, J.','Martínez, P.','Fernández, A.','González, L.','Rodríguez, C.','López, M.'],
      datasets: [{
        label: 'Total comprado ($)',
        data: [725000, 920000, 380000, 145000, 75000, 55000],
        backgroundColor: 'rgba(0,188,212,0.72)',
        borderRadius: 6,
      }],
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ' $' + c.parsed.x.toLocaleString('es-AR') } } },
      scales: { x: { beginAtZero: true, ticks: { callback: v => '$' + (v/1000) + 'K' }, grid: { color: 'rgba(0,0,0,0.05)' } }, y: { grid: { display: false } } },
    },
  });
}

function _initBISupplierChart() {
  const ctx = document.getElementById('biSupplierChart');
  if (!ctx) return;
  if (biSupplierChart) biSupplierChart.destroy();
  biSupplierChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Electro Global','TechDistribuidor SA','Proveedor Nacional','Moda Import SRL'],
      datasets: [{
        data: [920000, 640000, 230000, 185000],
        backgroundColor: ['#00BCD4','#FF6B00','#28A745','#7c3aed'],
        borderWidth: 3, borderColor: '#fff', hoverOffset: 8,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '58%',
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 11 }, usePointStyle: true, padding: 12 } },
        tooltip: { callbacks: { label: c => ' $' + c.parsed.toLocaleString('es-AR') } },
      },
    },
  });
}

// =============================================
// PAGE: GANANCIAS / PÉRDIDAS
// =============================================

let profitChart = null;

function initProfitLossPage() {
  const rows = [
    { month: 'Enero',   sales: 1200000, cost: 700000,  expenses: 200000 },
    { month: 'Febrero', sales: 1800000, cost: 900000,  expenses: 250000 },
    { month: 'Marzo',   sales: 2300000, cost: 1100000, expenses: 300000 },
    { month: 'Abril',   sales: 2100000, cost: 950000,  expenses: 280000 },
    { month: 'Mayo',    sales: 1900000, cost: 800000,  expenses: 260000 },
  ];

  // Summary totals
  const totSales    = rows.reduce((s, r) => s + r.sales, 0);
  const totCost     = rows.reduce((s, r) => s + r.cost, 0);
  const totExp      = rows.reduce((s, r) => s + r.expenses, 0);
  const totProfit   = totSales - totCost - totExp;
  const totMargin   = Math.round((totProfit / totSales) * 100);

  const el = (id) => document.getElementById(id);
  if (el('plTotSales'))  el('plTotSales').textContent  = fmtCurrency(totSales);
  if (el('plTotCost'))   el('plTotCost').textContent   = fmtCurrency(totCost);
  if (el('plTotExp'))    el('plTotExp').textContent     = fmtCurrency(totExp);
  if (el('plTotProfit')) el('plTotProfit').textContent  = fmtCurrency(totProfit);
  if (el('plTotMargin')) el('plTotMargin').textContent  = totMargin + '%';

  const tbody = document.getElementById('profitLossTbody');
  if (tbody) {
    tbody.innerHTML = rows.map(r => {
      const profit = r.sales - r.cost - r.expenses;
      const margin = Math.round((profit / r.sales) * 100);
      return `
        <tr>
          <td style="font-weight:600;">${r.month}</td>
          <td class="text-success fw-semibold">${fmtCurrency(r.sales)}</td>
          <td class="text-danger">${fmtCurrency(r.cost)}</td>
          <td class="text-warning fw-semibold">${fmtCurrency(r.expenses)}</td>
          <td><span class="${profit > 0 ? 'text-success' : 'text-danger'} fw-bold">${fmtCurrency(profit)}</span></td>
          <td><span class="${margin >= 30 ? 'text-success' : margin >= 15 ? 'text-warning' : 'text-danger'} fw-bold">${margin}%</span></td>
        </tr>
      `;
    }).join('');
  }

  setTimeout(() => {
    const ctx = document.getElementById('profitLossChart');
    if (!ctx) return;
    if (profitChart) profitChart.destroy();
    profitChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: rows.map(r => r.month),
        datasets: [
          { label: 'Ventas',    data: rows.map(r => r.sales),    backgroundColor: 'rgba(40,167,69,0.72)',  borderRadius: 5 },
          { label: 'Costos',   data: rows.map(r => r.cost),     backgroundColor: 'rgba(255,107,0,0.65)', borderRadius: 5 },
          { label: 'Gastos',   data: rows.map(r => r.expenses), backgroundColor: 'rgba(220,53,69,0.6)',  borderRadius: 5 },
          { label: 'Ganancia', data: rows.map(r => r.sales - r.cost - r.expenses), backgroundColor: 'rgba(0,188,212,0.8)', borderRadius: 5 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { font: { size: 11 }, usePointStyle: true } },
          tooltip: { callbacks: { label: c => ' ' + c.dataset.label + ': $' + c.parsed.y.toLocaleString('es-AR') } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: v => '$' + (v/1000) + 'K' }, grid: { color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } },
        },
      },
    });
  }, 80);
}

// =============================================
// PAGE: CREAR COMPRA (formulario con líneas)
// =============================================

let purchaseLines = [];

function initCreatePurchasePage() {
  purchaseLines = [{ product: '', qty: 1, cost: 0 }];
  renderPurchaseLines();
}

function addPurchaseLine() {
  purchaseLines.push({ product: '', qty: 1, cost: 0 });
  renderPurchaseLines();
}

function removePurchaseLine(idx) {
  if (purchaseLines.length === 1) return;
  purchaseLines.splice(idx, 1);
  renderPurchaseLines();
}

function updatePurchaseLine(idx, field, value) {
  purchaseLines[idx][field] = field === 'product' ? value : parseFloat(value) || 0;
  renderPurchaseLines();
}

function renderPurchaseLines() {
  const container = document.getElementById('purchaseLines');
  if (!container) return;

  const total = purchaseLines.reduce((s, l) => s + (l.qty * l.cost), 0);

  container.innerHTML = `
    <div class="table-responsive">
      <table class="table table-sm align-middle" style="font-size:0.83rem;">
        <thead>
          <tr style="background:#f8f9fa;">
            <th>Producto</th>
            <th style="width:110px;">Cantidad</th>
            <th style="width:150px;">Costo unit.</th>
            <th style="width:130px;" class="text-end">Subtotal</th>
            <th style="width:40px;"></th>
          </tr>
        </thead>
        <tbody>
          ${purchaseLines.map((l, i) => `
            <tr>
              <td>
                <select class="form-select form-select-sm" onchange="updatePurchaseLine(${i},'product',this.value)">
                  <option value="">— Seleccionar producto —</option>
                  ${PRODUCTS.map(p => `<option value="${p.id}" ${l.product == p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
                </select>
              </td>
              <td>
                <input type="number" class="form-control form-control-sm" value="${l.qty}" min="1"
                  onchange="updatePurchaseLine(${i},'qty',this.value)" style="width:80px;">
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <span class="input-group-text" style="font-size:0.78rem;">$</span>
                  <input type="number" class="form-control" value="${l.cost}" min="0"
                    onchange="updatePurchaseLine(${i},'cost',this.value)">
                </div>
              </td>
              <td class="text-end fw-semibold">${fmtCurrency(l.qty * l.cost)}</td>
              <td>
                <button class="btn btn-sm btn-outline-danger" onclick="removePurchaseLine(${i})" ${purchaseLines.length === 1 ? 'disabled' : ''}>
                  <i class="bi bi-x-lg"></i>
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr style="background:#f8f9fa;font-weight:700;">
            <td colspan="3" class="text-end">TOTAL:</td>
            <td class="text-end" style="color:#00BCD4;font-size:1rem;">${fmtCurrency(total)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
}

function savePurchase() {
  const supplierEl = document.getElementById('cp-supplier');
  const termEl     = document.getElementById('cp-payment-term');
  if (!supplierEl?.value) {
    Swal.fire({ icon: 'warning', title: 'Seleccione un proveedor', confirmButtonColor: '#00BCD4' }); return;
  }
  if (purchaseLines.every(l => !l.product)) {
    Swal.fire({ icon: 'warning', title: 'Agregue al menos un ítem', confirmButtonColor: '#00BCD4' }); return;
  }
  const total  = purchaseLines.reduce((s, l) => s + l.qty * l.cost, 0);
  const newId  = 'OC-' + String(PURCHASES.length + 1).padStart(3, '0');
  const filled = purchaseLines.filter(l => l.product);

  PURCHASES.unshift({
    id: newId,
    date: new Date().toISOString().split('T')[0],
    supplier: supplierEl.value,
    total,
    payment: termEl?.value || 'Contado',
    status: 'pendiente',
    items: filled.length,
  });

  // Update product costs
  filled.forEach(l => {
    const p = PRODUCTS.find(x => x.id == l.product);
    if (p && l.cost > 0) p.cost = l.cost;
  });

  Swal.fire({
    icon: 'success', title: '¡Compra registrada!',
    html: `Orden <strong>${newId}</strong> por <strong>${fmtCurrency(total)}</strong> guardada.`,
    confirmButtonColor: '#00BCD4', confirmButtonText: '<i class="bi bi-list me-1"></i>Ver compras',
    showCancelButton: true, cancelButtonText: 'Nueva compra',
  }).then(r => {
    if (r.isConfirmed) navigateTo('purchases', 'Lista de Compras');
    else initCreatePurchasePage();
  });
}

// =============================================
// PAGE: LIBROS CONTABLES
// =============================================

let accountingDT = null;

function initAccountingPage() {
  const tbody = document.getElementById('accountingTbody');
  if (!tbody) return;

  let totalDebit = 0, totalCredit = 0;

  tbody.innerHTML = ACCOUNTING_ENTRIES.map(e => {
    totalDebit  += e.debit;
    totalCredit += e.credit;
    return `
      <tr>
        <td style="font-size:0.78rem;color:#6c757d;">${fmtDate(e.date)}</td>
        <td><span class="badge rounded-pill bg-light text-dark border" style="font-size:0.72rem;">${e.account}</span></td>
        <td style="font-size:0.83rem;">${e.description}</td>
        <td class="text-end fw-semibold" style="color:#28A745;">${e.debit  > 0 ? fmtCurrency(e.debit)  : '—'}</td>
        <td class="text-end fw-semibold" style="color:#DC3545;">${e.credit > 0 ? fmtCurrency(e.credit) : '—'}</td>
        <td style="font-size:0.78rem;color:#6c757d;">${e.ref}</td>
      </tr>
    `;
  }).join('');

  // Totals footer row (outside DT, appended after)
  const tfootEl = document.getElementById('accountingTfoot');
  if (tfootEl) {
    tfootEl.innerHTML = `
      <tr style="background:#f8f9fa;font-weight:700;font-size:0.85rem;">
        <td colspan="3" class="text-end">Totales:</td>
        <td class="text-end" style="color:#28A745;">${fmtCurrency(totalDebit)}</td>
        <td class="text-end" style="color:#DC3545;">${fmtCurrency(totalCredit)}</td>
        <td><span class="${totalDebit === totalCredit ? 'text-success' : 'text-danger'}" style="font-size:0.75rem;">${totalDebit === totalCredit ? '✓ Cuadra' : '✗ No cuadra'}</span></td>
      </tr>
    `;
  }

  if (accountingDT) accountingDT.destroy();
  accountingDT = new DataTable('#accountingTable', {
    language: dtLang(), pageLength: 25, order: [[0, 'asc']],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

// =============================================
// PAGE: TÉRMINOS DE PAGO
// =============================================

let payTermsDT = null;

function initPaymentTermsPage() {
  const tbody = document.getElementById('payTermsTbody');
  if (!tbody) return;

  tbody.innerHTML = PAYMENT_TERMS.map(t => `
    <tr>
      <td style="font-size:0.84rem;font-weight:600;">${t.name}</td>
      <td style="font-size:0.82rem;">${t.days === 0 ? 'Inmediato' : t.days + ' días'}</td>
      <td>
        ${t.discount > 0
          ? `<span class="badge bg-success" style="font-size:0.72rem;">${t.discount}% descuento</span>`
          : `<span class="text-muted" style="font-size:0.8rem;">Sin descuento</span>`}
      </td>
      <td>
        <span class="badge rounded-pill ${t.type === 'ambos' ? 'bg-primary' : t.type === 'venta' ? 'bg-success' : 'bg-warning text-dark'}" style="font-size:0.72rem;">
          ${t.type === 'ambos' ? 'Venta/Compra' : t.type}
        </span>
      </td>
      <td>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-warning" title="Editar" onclick="editPaymentTerm(${t.id})"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger"  title="Eliminar" onclick="deletePaymentTerm(${t.id})"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  if (payTermsDT) payTermsDT.destroy();
  payTermsDT = new DataTable('#payTermsTable', {
    language: dtLang(), pageLength: 10,
    columnDefs: [{ orderable: false, targets: [4] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

// =============================================
// PAGE: LISTA DE CAJAS
// =============================================

function initCashRegistersPage() {
  const container = document.getElementById('cashRegistersGrid');
  if (!container) return;

  container.innerHTML = CASH_REGISTERS.map(c => `
    <div class="col-md-6 col-lg-4">
      <div class="vcard" style="border-top:3px solid ${c.status === 'abierta' ? '#28A745' : '#6c757d'};">
        <div class="d-flex align-items-start justify-content-between mb-3">
          <div>
            <h5 class="mb-0 fw-700">${c.name}</h5>
            <small class="text-muted">${c.location}</small>
          </div>
          <span class="badge rounded-pill ${c.status === 'abierta' ? 'bg-success' : 'bg-secondary'}">${c.status}</span>
        </div>
        <div class="mb-3">
          <div class="text-muted" style="font-size:0.78rem;">Saldo actual</div>
          <div style="font-size:1.8rem;font-weight:900;color:#00BCD4;">${fmtCurrency(c.balance)}</div>
        </div>
        <div class="d-flex align-items-center gap-2 mb-3" style="font-size:0.82rem;color:#6c757d;">
          <i class="bi bi-person"></i> ${c.user}
        </div>
        <div class="d-flex gap-2">
          <button class="btn-primary-custom flex-fill" style="font-size:0.78rem;justify-content:center;" onclick="navigateTo('cash-movements','Movimientos de Caja')">
            <i class="bi bi-arrow-left-right me-1"></i>Movimientos
          </button>
          ${c.status === 'abierta'
            ? `<button class="btn-danger-custom" style="font-size:0.78rem;" onclick="Swal.fire({icon:'question',title:'¿Cerrar caja?',showCancelButton:true,confirmButtonColor:'#DC3545',cancelButtonColor:'#6c757d',confirmButtonText:'Cerrar'})"><i class="bi bi-lock"></i></button>`
            : `<button class="btn-success-custom" style="font-size:0.78rem;" onclick="Swal.fire({icon:'question',title:'¿Abrir caja?',showCancelButton:true,confirmButtonColor:'#28A745',cancelButtonColor:'#6c757d',confirmButtonText:'Abrir'})"><i class="bi bi-unlock"></i></button>`}
        </div>
      </div>
    </div>
  `).join('');
}

// =============================================
// PAGE: REMISIONES
// =============================================

let remissionsDT = null;

function initRemissionsPage() {
  const tbody = document.getElementById('remissionsTbody');
  if (!tbody) return;

  const sMap = { entregado: 'bg-success', 'en camino': 'bg-primary', pendiente: 'bg-warning text-dark' };

  tbody.innerHTML = REMISSIONS.map(r => `
    <tr>
      <td><span class="fw-bold" style="color:#00BCD4;">${r.id}</span></td>
      <td>${fmtDate(r.date)}</td>
      <td>${r.client}</td>
      <td style="font-size:0.82rem;">${r.destination}</td>
      <td>${r.items}</td>
      <td><span class="badge rounded-pill ${sMap[r.status] || 'bg-secondary'}" style="font-size:0.72rem;">${r.status}</span></td>
      <td>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-primary" title="Ver" onclick="viewRemission('${r.id}')"><i class="bi bi-eye"></i></button>
          <button class="btn btn-sm btn-outline-secondary" title="Imprimir" onclick="viewRemission('${r.id}')"><i class="bi bi-printer"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  if (remissionsDT) remissionsDT.destroy();
  remissionsDT = new DataTable('#remissionsTable', {
    language: dtLang(), pageLength: 10,
    columnDefs: [{ orderable: false, targets: [6] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

// =============================================
// PAGE: COMISIONES
// =============================================

function initCommissionsPage() {
  const tbody = document.getElementById('commissionsTbody');
  if (!tbody) return;

  tbody.innerHTML = COMMISSIONS.map(c => `
    <tr>
      <td>
        <div class="d-flex align-items-center gap-2">
          <div style="width:32px;height:32px;border-radius:50%;background:#e3f8fb;display:flex;align-items:center;justify-content:center;font-size:0.85rem;color:#00BCD4;font-weight:700;">${c.user.charAt(0)}</div>
          <strong style="font-size:0.84rem;">${c.user}</strong>
        </div>
      </td>
      <td style="font-size:0.83rem;">${c.sales}</td>
      <td style="font-size:0.83rem;font-weight:600;">${fmtCurrency(c.total)}</td>
      <td><span class="badge bg-primary" style="font-size:0.72rem;">${c.commission_pct}%</span></td>
      <td style="font-size:0.85rem;font-weight:700;color:#00BCD4;">${fmtCurrency(c.commission_amt)}</td>
      <td>
        <button class="btn-success-custom" style="font-size:0.74rem;padding:4px 10px;" onclick="registerCommissionPayment('${c.user}')">
          <i class="bi bi-check-lg me-1"></i>Registrar pago
        </button>
      </td>
    </tr>
  `).join('');
}

// =============================================
// PAGE: NOTAS DE DÉBITO
// =============================================

let debitNotesDT = null;

function initDebitNotesPage() {
  const tbody = document.getElementById('debitNotesTbody');
  if (!tbody) return;

  tbody.innerHTML = DEBIT_NOTES.map(n => `
    <tr>
      <td><span class="fw-bold" style="color:#FF6B00;">${n.id}</span></td>
      <td>${fmtDate(n.date)}</td>
      <td>${n.client}</td>
      <td><a href="#" class="text-primary fw-semibold">${n.sale}</a></td>
      <td><strong>${fmtCurrency(n.amount)}</strong></td>
      <td style="font-size:0.82rem;">${n.reason}</td>
      <td><span class="badge rounded-pill ${n.status === 'cobrada' ? 'bg-success' : 'bg-primary'}" style="font-size:0.72rem;">${n.status}</span></td>
      <td>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-primary" title="Ver" onclick="viewDebitNote('${n.id}')"><i class="bi bi-eye"></i></button>
          <button class="btn btn-sm btn-outline-secondary" title="Imprimir" onclick="viewDebitNote('${n.id}')"><i class="bi bi-printer"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  if (debitNotesDT) debitNotesDT.destroy();
  debitNotesDT = new DataTable('#debitNotesTable', {
    language: dtLang(), pageLength: 10,
    columnDefs: [{ orderable: false, targets: [7] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}
