/* =============================================
   VENDLY — Actions: modales, export, print, CRUD
   ============================================= */

'use strict';

// =============================================
// EXPORT — CSV real (descarga de archivo)
// =============================================

function exportTableCSV(tableId, filename) {
  const table = document.getElementById(tableId);
  if (!table) { showToast('No se encontró la tabla para exportar.', 'warning'); return; }

  const rows = table.querySelectorAll('thead tr, tbody tr');
  const csv  = [];

  rows.forEach(row => {
    const cols = row.querySelectorAll('th, td');
    const rowData = Array.from(cols).map(cell => {
      // Limpiar: quitar botones, badges y espacios extra
      const text = cell.cloneNode(true);
      text.querySelectorAll('button, .dropdown, input[type=checkbox]').forEach(el => el.remove());
      return '"' + text.innerText.trim().replace(/"/g, '""').replace(/\n/g, ' ') + '"';
    });
    csv.push(rowData.join(','));
  });

  const blob = new Blob(['﻿' + csv.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = (filename || 'exportacion') + '_' + new Date().toISOString().slice(0,10) + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Archivo CSV descargado correctamente.', 'success');
}

function exportGenericCSV(headers, rows, filename) {
  const csvRows = [headers.map(h => '"' + h + '"').join(',')];
  rows.forEach(r => csvRows.push(r.map(c => '"' + String(c ?? '').replace(/"/g, '""') + '"').join(',')));
  const blob = new Blob(['﻿' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename + '_' + new Date().toISOString().slice(0,10) + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Archivo CSV descargado.', 'success');
}

// Export atajos por módulo
function exportProducts() {
  exportGenericCSV(
    ['Código','Nombre','Categoría','P.Costo','P.Venta','Stock','Unidad','Tipo'],
    PRODUCTS.map(p => [p.code, p.name, p.category, p.cost, p.price, p.qty, p.unit, p.type]),
    'productos'
  );
}

function exportSales() {
  exportGenericCSV(
    ['N°','Fecha','Cliente','Ítems','Total','Pago','Estado'],
    SALES.map(s => [s.id, fmtDate(s.date), s.client, s.items, s.total, s.payment, s.status]),
    'ventas'
  );
}

function exportClients() {
  exportGenericCSV(
    ['Código','Nombre','Teléfono','Email','Grupo','Saldo','Estado'],
    CLIENTS.map(c => [c.code, c.name, c.phone, c.email, c.group, c.balance, c.status]),
    'clientes'
  );
}

function exportPurchases() {
  exportGenericCSV(
    ['N°','Fecha','Proveedor','Ítems','Total','Pago','Estado'],
    PURCHASES.map(p => [p.id, fmtDate(p.date), p.supplier, p.items, p.total, p.payment, p.status]),
    'compras'
  );
}

function exportExpenses() {
  exportGenericCSV(
    ['N°','Fecha','Categoría','Descripción','Importe','Forma de pago'],
    EXPENSES.map(e => [e.id, fmtDate(e.date), e.category, e.description, e.amount, e.payment]),
    'gastos'
  );
}

function exportSuppliers() {
  exportGenericCSV(
    ['Código','Nombre','Teléfono','Email','CUIT','Saldo','Estado'],
    SUPPLIERS.map(s => [s.code, s.name, s.phone, s.email, s.cuit, s.balance, s.status]),
    'proveedores'
  );
}

// PDF — aviso (requiere librería externa como jsPDF)
function exportPDF() {
  Swal.fire({
    icon: 'info',
    title: 'Exportar PDF',
    html: 'Para exportar en PDF, use la opción de impresión del navegador:<br><br><strong>Ctrl + P</strong> → Guardar como PDF',
    confirmButtonColor: '#00BCD4',
    confirmButtonText: 'Abrir impresión',
  }).then(r => { if (r.isConfirmed) window.print(); });
}

// Importar CSV — simulado
function importCSV() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv';
  input.onchange = () => {
    Swal.fire({ icon: 'info', title: 'Importación en proceso', text: 'El archivo fue recibido. Procesando...', timer: 2000, showConfirmButton: false })
      .then(() => Swal.fire({ icon: 'success', title: 'Importación completa', text: 'Los datos fueron importados correctamente.', confirmButtonColor: '#00BCD4' }));
  };
  input.click();
}

// =============================================
// PRINT
// =============================================

function printCurrentPage() {
  window.print();
}

function printRecord(title, html) {
  const win = window.open('', '_blank', 'width=800,height=600');
  win.document.write(`
    <!DOCTYPE html><html lang="es"><head>
      <meta charset="UTF-8"><title>${title}</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
      <style>body{font-family:'Arial',sans-serif;padding:20px;}.header{text-align:center;border-bottom:2px solid #00BCD4;padding-bottom:12px;margin-bottom:20px;}.logo{font-size:1.5rem;font-weight:900;color:#1E2A38;}.accent{color:#FF6B00;}@media print{.no-print{display:none;}}</style>
    </head><body>
      <div class="header">
        <div class="logo"><span class="accent">⚡</span> VENDLY</div>
        <div style="font-size:0.85rem;color:#6c757d;">${title} — ${new Date().toLocaleDateString('es-AR')}</div>
      </div>
      ${html}
      <div class="mt-4 text-center no-print">
        <button class="btn btn-primary" onclick="window.print()">🖨️ Imprimir</button>
        <button class="btn btn-secondary ms-2" onclick="window.close()">Cerrar</button>
      </div>
    </body></html>
  `);
  win.document.close();
  setTimeout(() => win.print(), 600);
}

// =============================================
// TOAST / NOTIFICACIÓN
// =============================================

function showToast(message, type = 'success') {
  const colors = { success: '#28A745', error: '#DC3545', warning: '#FFC107', info: '#00BCD4' };
  Swal.fire({
    toast: true, position: 'top-end', showConfirmButton: false,
    timer: 3000, timerProgressBar: true,
    icon: type,
    title: message,
    customClass: { popup: 'colored-toast' },
  });
}

// =============================================
// CREAR PROVEEDOR
// =============================================

function openCreateSupplierModal() {
  Swal.fire({
    title: 'Crear Proveedor',
    width: 560,
    html: `
      <div class="text-start">
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Nombre / Razón social *</label>
          <input id="cs-name" class="form-control" placeholder="Empresa S.A.">
        </div>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">CUIT</label>
            <input id="cs-cuit" class="form-control" placeholder="30-00000000-0">
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Teléfono</label>
            <input id="cs-phone" class="form-control" placeholder="011-0000-0000">
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Email</label>
          <input id="cs-email" class="form-control" placeholder="ventas@empresa.com" type="email">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: '<i class="bi bi-plus-lg me-1"></i> Crear', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const name = document.getElementById('cs-name').value.trim();
      if (!name) { Swal.showValidationMessage('El nombre es obligatorio'); return false; }
      const newId = SUPPLIERS.length + 1;
      SUPPLIERS.push({
        id: newId,
        code: 'PRV-' + String(newId).padStart(3, '0'),
        name,
        phone: document.getElementById('cs-phone').value.trim(),
        email: document.getElementById('cs-email').value.trim(),
        cuit: document.getElementById('cs-cuit').value.trim() || '—',
        balance: 0,
        status: 'activo',
      });
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      showToast('Proveedor creado correctamente.');
      if (App.currentPage === 'suppliers') renderSuppliersTable();
    }
  });
}

// =============================================
// CREAR GASTO
// =============================================

function openCreateExpenseModal() {
  Swal.fire({
    title: 'Registrar Gasto',
    width: 520,
    html: `
      <div class="text-start">
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Fecha</label>
            <input id="ce-date" class="form-control" type="date" value="${new Date().toISOString().split('T')[0]}">
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Categoría *</label>
            <select id="ce-cat" class="form-select">
              <option>Alquiler</option><option>Servicios</option><option>Sueldos</option>
              <option>Marketing</option><option>Limpieza</option><option>Transporte</option><option>Otro</option>
            </select>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Descripción *</label>
          <input id="ce-desc" class="form-control" placeholder="Descripción del gasto">
        </div>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Importe *</label>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input id="ce-amount" class="form-control" type="number" min="0" placeholder="0">
            </div>
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Forma de pago</label>
            <select id="ce-payment" class="form-select">
              <option>Efectivo</option><option>Transferencia</option>
              <option>Tarjeta</option><option>Débito</option>
            </select>
          </div>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: '<i class="bi bi-check-lg me-1"></i> Registrar', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const desc   = document.getElementById('ce-desc').value.trim();
      const amount = parseFloat(document.getElementById('ce-amount').value) || 0;
      if (!desc)   { Swal.showValidationMessage('La descripción es obligatoria'); return false; }
      if (!amount) { Swal.showValidationMessage('Ingrese un importe válido'); return false; }
      const newId = 'GAS-' + String(EXPENSES.length + 1).padStart(3, '0');
      EXPENSES.unshift({
        id: newId,
        date: document.getElementById('ce-date').value,
        category: document.getElementById('ce-cat').value,
        description: desc,
        amount,
        payment: document.getElementById('ce-payment').value,
      });
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      showToast('Gasto registrado correctamente.');
      if (App.currentPage === 'expenses') renderExpensesTable();
    }
  });
}

// =============================================
// CREAR PRESUPUESTO
// =============================================

function openCreateBudgetModal() {
  Swal.fire({
    title: 'Nuevo Presupuesto',
    width: 560,
    html: `
      <div class="text-start">
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Cliente *</label>
          <select id="cb-client" class="form-select">
            <option value="">— Seleccionar cliente —</option>
            ${CLIENTS.map(c => `<option>${c.name}</option>`).join('')}
            <option>Consumidor Final</option>
          </select>
        </div>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Fecha</label>
            <input id="cb-date" class="form-control" type="date" value="${new Date().toISOString().split('T')[0]}">
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Válido hasta</label>
            <input id="cb-expiry" class="form-control" type="date" value="${new Date(Date.now()+14*86400000).toISOString().split('T')[0]}">
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Total estimado</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input id="cb-total" class="form-control" type="number" min="0" placeholder="0">
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Observaciones</label>
          <textarea id="cb-notes" class="form-control" rows="2" placeholder="Notas para el cliente..."></textarea>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: '<i class="bi bi-plus-lg me-1"></i> Crear', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const client = document.getElementById('cb-client').value;
      if (!client) { Swal.showValidationMessage('Seleccione un cliente'); return false; }
      const newId = 'PRE-' + String(BUDGETS.length + 1).padStart(3, '0');
      BUDGETS.unshift({
        id: newId,
        date: document.getElementById('cb-date').value,
        client,
        total: parseFloat(document.getElementById('cb-total').value) || 0,
        items: 0,
        status: 'pendiente',
        expiry: document.getElementById('cb-expiry').value,
      });
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      showToast('Presupuesto creado.');
      if (App.currentPage === 'budgets') initBudgetsPage();
    }
  });
}

// =============================================
// CREAR TÉRMINO DE PAGO
// =============================================

function openCreatePaymentTermModal() {
  Swal.fire({
    title: 'Nuevo Término de Pago',
    html: `
      <div class="text-start">
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Nombre *</label>
          <input id="pt-name" class="swal2-input" placeholder="Ej: Crédito 90 días">
        </div>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Días de plazo</label>
            <input id="pt-days" class="swal2-input" type="number" min="0" placeholder="0">
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">% Descuento</label>
            <input id="pt-discount" class="swal2-input" type="number" min="0" max="100" placeholder="0">
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Aplica a</label>
          <select id="pt-type" class="swal2-select">
            <option value="venta">Solo ventas</option>
            <option value="compra">Solo compras</option>
            <option value="ambos">Ventas y compras</option>
          </select>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Crear', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const name = document.getElementById('pt-name').value.trim();
      if (!name) { Swal.showValidationMessage('El nombre es obligatorio'); return false; }
      PAYMENT_TERMS.push({
        id: PAYMENT_TERMS.length + 1,
        name,
        days: parseInt(document.getElementById('pt-days').value) || 0,
        discount: parseInt(document.getElementById('pt-discount').value) || 0,
        type: document.getElementById('pt-type').value,
      });
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      showToast('Término de pago creado.');
      if (App.currentPage === 'payment-terms') initPaymentTermsPage();
    }
  });
}

// =============================================
// NUEVA CAJA
// =============================================

function openCreateCashRegisterModal() {
  Swal.fire({
    title: 'Nueva Caja',
    html: `
      <input id="cr-name"     class="swal2-input" placeholder="Nombre (ej: Caja 3)">
      <input id="cr-location" class="swal2-input" placeholder="Ubicación (ej: Sucursal Sur)">
      <input id="cr-balance"  class="swal2-input" type="number" min="0" placeholder="Saldo inicial: $0">
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Crear', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const name = document.getElementById('cr-name').value.trim();
      if (!name) { Swal.showValidationMessage('El nombre es obligatorio'); return false; }
      CASH_REGISTERS.push({
        id: CASH_REGISTERS.length + 1,
        name,
        location: document.getElementById('cr-location').value.trim() || '—',
        balance: parseFloat(document.getElementById('cr-balance').value) || 0,
        status: 'cerrada',
        user: 'Admin',
      });
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      showToast('Caja creada.');
      if (App.currentPage === 'cash-registers') initCashRegistersPage();
    }
  });
}

// =============================================
// NUEVA REMISIÓN
// =============================================

function openCreateRemissionModal() {
  Swal.fire({
    title: 'Nueva Remisión',
    width: 520,
    html: `
      <div class="text-start">
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Cliente *</label>
          <select id="rem-client" class="form-select">
            <option value="">— Seleccionar —</option>
            ${CLIENTS.map(c => `<option>${c.name}</option>`).join('')}
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Dirección de entrega *</label>
          <input id="rem-dest" class="form-control" placeholder="Av. Corrientes 1234, CABA">
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Fecha</label>
          <input id="rem-date" class="form-control" type="date" value="${new Date().toISOString().split('T')[0]}">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Crear remisión', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const client = document.getElementById('rem-client').value;
      const dest   = document.getElementById('rem-dest').value.trim();
      if (!client) { Swal.showValidationMessage('Seleccione un cliente'); return false; }
      if (!dest)   { Swal.showValidationMessage('Ingrese la dirección'); return false; }
      const newId = 'REM-' + String(REMISSIONS.length + 1).padStart(3, '0');
      REMISSIONS.unshift({ id: newId, date: document.getElementById('rem-date').value, client, destination: dest, items: 0, status: 'pendiente' });
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      showToast('Remisión creada.');
      if (App.currentPage === 'remissions') initRemissionsPage();
    }
  });
}

// =============================================
// GENERAR NOTA DE DÉBITO
// =============================================

function openCreateDebitNoteModal() {
  Swal.fire({
    title: 'Generar Nota de Débito',
    width: 520,
    html: `
      <div class="text-start">
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Venta original *</label>
          <select id="dn-sale" class="form-select">
            <option value="">— Seleccionar venta —</option>
            ${SALES.map(s => `<option value="#${s.id}">#${s.id} — ${s.client} — ${fmtCurrency(s.total)}</option>`).join('')}
          </select>
        </div>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Importe *</label>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input id="dn-amount" class="form-control" type="number" min="0" placeholder="0">
            </div>
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Motivo</label>
            <select id="dn-reason" class="form-select">
              <option>Interés mora</option>
              <option>Diferencia de precio</option>
              <option>Gasto adicional</option>
              <option>Otro</option>
            </select>
          </div>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Generar', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const sale   = document.getElementById('dn-sale').value;
      const amount = parseFloat(document.getElementById('dn-amount').value) || 0;
      if (!sale)   { Swal.showValidationMessage('Seleccione una venta'); return false; }
      if (!amount) { Swal.showValidationMessage('Ingrese un importe'); return false; }
      const saleObj = SALES.find(s => '#' + s.id === sale);
      const newId   = 'ND-' + String(DEBIT_NOTES.length + 1).padStart(3, '0');
      DEBIT_NOTES.unshift({
        id: newId,
        date: new Date().toISOString().split('T')[0],
        client: saleObj?.client || '—',
        sale,
        amount,
        reason: document.getElementById('dn-reason').value,
        status: 'emitida',
      });
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      showToast('Nota de débito generada.');
      if (App.currentPage === 'debit-notes') initDebitNotesPage();
    }
  });
}

// =============================================
// CRUD — UNIDADES
// =============================================

function editUnit(id) {
  const u = UNITS.find(x => x.id === id);
  if (!u) return;
  Swal.fire({
    title: 'Editar Unidad',
    html: `
      <input id="unit-name" class="swal2-input" placeholder="Nombre" value="${u.name}">
      <input id="unit-abbr" class="swal2-input" placeholder="Abreviación" value="${u.abbreviation}">
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Guardar', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      u.name         = document.getElementById('unit-name').value.trim() || u.name;
      u.abbreviation = document.getElementById('unit-abbr').value.trim() || u.abbreviation;
      return true;
    },
  }).then(r => { if (r.isConfirmed) { showToast('Unidad actualizada.'); initUnitsPage(); } });
}

function deleteUnit(id) {
  Swal.fire({
    title: '¿Eliminar unidad?', icon: 'warning',
    showCancelButton: true, confirmButtonColor: '#DC3545', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar',
  }).then(r => {
    if (r.isConfirmed) {
      const idx = UNITS.findIndex(x => x.id === id);
      if (idx > -1) UNITS.splice(idx, 1);
      initUnitsPage();
      showToast('Unidad eliminada.');
    }
  });
}

// =============================================
// CRUD — TÉRMINOS DE PAGO
// =============================================

function editPaymentTerm(id) {
  const t = PAYMENT_TERMS.find(x => x.id === id);
  if (!t) return;
  Swal.fire({
    title: 'Editar Término de Pago',
    html: `
      <input id="pt-name"     class="swal2-input" placeholder="Nombre" value="${t.name}">
      <input id="pt-days"     class="swal2-input" type="number" placeholder="Días" value="${t.days}">
      <input id="pt-discount" class="swal2-input" type="number" placeholder="% Descuento" value="${t.discount}">
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Guardar', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      t.name     = document.getElementById('pt-name').value.trim() || t.name;
      t.days     = parseInt(document.getElementById('pt-days').value) || 0;
      t.discount = parseInt(document.getElementById('pt-discount').value) || 0;
      return true;
    },
  }).then(r => { if (r.isConfirmed) { showToast('Término actualizado.'); initPaymentTermsPage(); } });
}

function deletePaymentTerm(id) {
  Swal.fire({
    title: '¿Eliminar término?', icon: 'warning',
    showCancelButton: true, confirmButtonColor: '#DC3545', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar',
  }).then(r => {
    if (r.isConfirmed) {
      const idx = PAYMENT_TERMS.findIndex(x => x.id === id);
      if (idx > -1) PAYMENT_TERMS.splice(idx, 1);
      initPaymentTermsPage();
      showToast('Término eliminado.');
    }
  });
}

// =============================================
// VER REGISTROS — fichas emergentes
// =============================================

function viewReturn(id) {
  const r = RETURNS.find(x => x.id === id);
  if (!r) return;
  Swal.fire({
    title: 'Devolución ' + r.id,
    html: `
      <table class="table table-sm text-start">
        <tr><td class="text-muted">Fecha</td><td><strong>${fmtDate(r.date)}</strong></td></tr>
        <tr><td class="text-muted">Cliente</td><td><strong>${r.client}</strong></td></tr>
        <tr><td class="text-muted">Venta orig.</td><td><strong>${r.sale}</strong></td></tr>
        <tr><td class="text-muted">Importe</td><td><strong class="text-danger">${fmtCurrency(r.total)}</strong></td></tr>
        <tr><td class="text-muted">Motivo</td><td>${r.reason}</td></tr>
        <tr><td class="text-muted">Estado</td><td><span class="badge ${r.status==='aprobada'?'bg-success':r.status==='rechazada'?'bg-danger':'bg-warning text-dark'}">${r.status}</span></td></tr>
      </table>
    `,
    confirmButtonColor: '#00BCD4', confirmButtonText: 'Cerrar',
    showDenyButton: true, denyButtonText: '🖨️ Imprimir',
  }).then(r2 => { if (r2.isDenied) printRecord('Devolución ' + r.id, `<p><strong>Cliente:</strong> ${r.client}</p><p><strong>Importe:</strong> ${fmtCurrency(r.total)}</p><p><strong>Motivo:</strong> ${r.reason}</p>`); });
}

function viewPaymentReceipt(id) {
  const p = PAYMENTS_REGISTER.find(x => x.id === id);
  if (!p) return;
  Swal.fire({
    title: 'Recibo ' + p.id,
    html: `
      <table class="table table-sm text-start">
        <tr><td class="text-muted">Fecha</td><td><strong>${fmtDate(p.date)}</strong></td></tr>
        <tr><td class="text-muted">Cliente</td><td><strong>${p.client}</strong></td></tr>
        <tr><td class="text-muted">Venta</td><td><strong>${p.sale}</strong></td></tr>
        <tr><td class="text-muted">Importe</td><td><strong class="text-success" style="font-size:1.1rem;">${fmtCurrency(p.amount)}</strong></td></tr>
        <tr><td class="text-muted">Método</td><td>${p.method}</td></tr>
        <tr><td class="text-muted">Usuario</td><td>${p.user}</td></tr>
      </table>
    `,
    confirmButtonColor: '#00BCD4', confirmButtonText: 'Cerrar',
    showDenyButton: true, denyButtonText: '🖨️ Imprimir recibo',
  }).then(r => {
    if (r.isDenied) printRecord('Recibo ' + p.id, `<h4 class="text-center text-success">${fmtCurrency(p.amount)}</h4><p><strong>Cliente:</strong> ${p.client}</p><p><strong>Venta:</strong> ${p.sale} | <strong>Método:</strong> ${p.method}</p><p class="text-muted text-center">Gracias por su pago</p>`);
  });
}

function viewRemission(id) {
  const r = REMISSIONS.find(x => x.id === id);
  if (!r) return;
  Swal.fire({
    title: 'Remisión ' + r.id,
    html: `
      <table class="table table-sm text-start">
        <tr><td class="text-muted">Fecha</td><td><strong>${fmtDate(r.date)}</strong></td></tr>
        <tr><td class="text-muted">Cliente</td><td><strong>${r.client}</strong></td></tr>
        <tr><td class="text-muted">Destino</td><td>${r.destination}</td></tr>
        <tr><td class="text-muted">Ítems</td><td>${r.items}</td></tr>
        <tr><td class="text-muted">Estado</td><td><span class="badge ${r.status==='entregado'?'bg-success':r.status==='en camino'?'bg-primary':'bg-warning text-dark'}">${r.status}</span></td></tr>
      </table>
    `,
    confirmButtonColor: '#00BCD4', confirmButtonText: 'Cerrar',
    showDenyButton: true, denyButtonText: '🖨️ Imprimir',
  }).then(res => {
    if (res.isDenied) printRecord('Remisión ' + r.id, `<p><strong>Cliente:</strong> ${r.client}</p><p><strong>Destino:</strong> ${r.destination}</p><p><strong>Estado:</strong> ${r.status}</p>`);
  });
}

function viewDebitNote(id) {
  const n = DEBIT_NOTES.find(x => x.id === id);
  if (!n) return;
  Swal.fire({
    title: 'Nota de Débito ' + n.id,
    html: `
      <table class="table table-sm text-start">
        <tr><td class="text-muted">Fecha</td><td><strong>${fmtDate(n.date)}</strong></td></tr>
        <tr><td class="text-muted">Cliente</td><td><strong>${n.client}</strong></td></tr>
        <tr><td class="text-muted">Venta original</td><td>${n.sale}</td></tr>
        <tr><td class="text-muted">Importe</td><td><strong>${fmtCurrency(n.amount)}</strong></td></tr>
        <tr><td class="text-muted">Motivo</td><td>${n.reason}</td></tr>
        <tr><td class="text-muted">Estado</td><td><span class="badge ${n.status==='cobrada'?'bg-success':'bg-primary'}">${n.status}</span></td></tr>
      </table>
    `,
    confirmButtonColor: '#00BCD4', confirmButtonText: 'Cerrar',
    showDenyButton: true, denyButtonText: '🖨️ Imprimir',
  }).then(r => {
    if (r.isDenied) printRecord('Nota de Débito ' + n.id, `<p><strong>Cliente:</strong> ${n.client}</p><p><strong>Importe:</strong> ${fmtCurrency(n.amount)}</p><p><strong>Motivo:</strong> ${n.reason}</p>`);
  });
}

function registerCommissionPayment(user) {
  const c = COMMISSIONS.find(x => x.user === user);
  if (!c) return;
  Swal.fire({
    title: 'Pagar comisión',
    html: `<p>¿Registrar pago de comisión a <strong>${user}</strong>?</p><p style="font-size:1.5rem;font-weight:900;color:#00BCD4;">${fmtCurrency(c.commission_amt)}</p>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Registrar pago', cancelButtonText: 'Cancelar',
  }).then(r => { if (r.isConfirmed) showToast('Pago de comisión registrado para ' + user + '.'); });
}

// =============================================
// PERFIL / CONFIGURACIÓN / DEPÓSITOS
// =============================================

function openProfileModal() {
  Swal.fire({
    title: 'Mi Perfil',
    html: `
      <div class="text-center mb-3">
        <img src="https://ui-avatars.com/api/?name=Admin+User&background=00BCD4&color=fff&size=100" style="width:80px;height:80px;border-radius:50%;border:3px solid #00BCD4;">
      </div>
      <div class="text-start">
        <div class="mb-2"><label class="form-label fw-semibold" style="font-size:0.83rem;">Nombre</label>
          <input class="form-control" value="Admin User"></div>
        <div class="mb-2"><label class="form-label fw-semibold" style="font-size:0.83rem;">Email</label>
          <input class="form-control" type="email" value="admin@vendly.com"></div>
        <div class="mb-2"><label class="form-label fw-semibold" style="font-size:0.83rem;">Contraseña actual</label>
          <input class="form-control" type="password" placeholder="••••••••"></div>
        <div><label class="form-label fw-semibold" style="font-size:0.83rem;">Nueva contraseña</label>
          <input class="form-control" type="password" placeholder="Dejar en blanco para no cambiar"></div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Guardar cambios', cancelButtonText: 'Cancelar',
  }).then(r => { if (r.isConfirmed) showToast('Perfil actualizado correctamente.'); });
}

function openSettingsModal() {
  Swal.fire({
    title: 'Configuración',
    html: `
      <div class="text-start">
        <div class="mb-3"><label class="form-label fw-semibold" style="font-size:0.83rem;">Nombre de la tienda</label>
          <input class="form-control" value="Mi Tienda"></div>
        <div class="mb-3"><label class="form-label fw-semibold" style="font-size:0.83rem;">Moneda</label>
          <select class="form-select"><option>ARS — Peso Argentino</option><option>USD — Dólar</option><option>UYU — Peso Uruguayo</option></select></div>
        <div class="mb-3"><label class="form-label fw-semibold" style="font-size:0.83rem;">Zona horaria</label>
          <select class="form-select"><option>America/Argentina/Buenos_Aires (GMT-3)</option></select></div>
        <div class="form-check form-switch mb-2">
          <input class="form-check-input" type="checkbox" checked>
          <label class="form-check-label" style="font-size:0.83rem;">Enviar alertas de stock por email</label>
        </div>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox">
          <label class="form-check-label" style="font-size:0.83rem;">Modo oscuro (próximamente)</label>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Guardar', cancelButtonText: 'Cancelar',
  }).then(r => { if (r.isConfirmed) showToast('Configuración guardada.'); });
}

function openDepositsModal() {
  Swal.fire({
    title: 'Depósitos / Almacenes',
    html: `
      <table class="table table-sm text-start">
        <thead><tr><th>Depósito</th><th>Dirección</th><th>Productos</th></tr></thead>
        <tbody>
          <tr><td><strong>Depósito Principal</strong></td><td>Calle Principal 123</td><td>320</td></tr>
          <tr><td>Sucursal Norte</td><td>Av. Norte 456</td><td>48</td></tr>
          <tr><td>Exhibición</td><td>Local centro</td><td>25</td></tr>
        </tbody>
      </table>
    `,
    confirmButtonColor: '#00BCD4', confirmButtonText: 'Cerrar',
  });
}

// =============================================
// LIVE PREVIEW — Crear Producto
// =============================================

function initCreateProductPreview() {
  const fields = ['cpf-name','cpf-price','cpf-stock','cpf-category'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateCreateProductPreview);
  });
}

function updateCreateProductPreview() {
  const name  = document.getElementById('cpf-name')?.value  || 'Nuevo producto';
  const price = parseFloat(document.getElementById('cpf-price')?.value) || 0;
  const stock = parseInt(document.getElementById('cpf-stock')?.value)   || 0;
  const cat   = document.getElementById('cpf-category')?.value         || 'Sin categoría';

  const previewName  = document.getElementById('preview-name');
  const previewCat   = document.getElementById('preview-cat');
  const previewPrice = document.querySelector('#page-create-product .pos-total-card .total-value');

  if (previewName)  previewName.textContent  = name  || 'Nuevo producto';
  if (previewCat)   previewCat.textContent   = cat;

  // Update preview price and stock inside the gradient card
  const cards = document.querySelectorAll('#page-create-product .vcard[style*="gradient"] .fw-800, #page-create-product [style*="1E2A38"] .fw-800');
  // Simpler: update the specific spans
  const allPreviewVals = document.querySelectorAll('[id^="preview-"]');
  allPreviewVals.forEach(el => {
    if (el.id === 'preview-name') el.textContent = name || 'Nuevo producto';
    if (el.id === 'preview-cat')  el.textContent = cat;
  });

  // Update price and stock in the gradient card directly
  const gradCard = document.querySelector('#page-create-product .vcard[style*="1E2A38"]');
  if (gradCard) {
    const priceEl = gradCard.querySelectorAll('.fw-800');
    if (priceEl[0]) priceEl[0].textContent = price > 0 ? fmtCurrency(price) : '$0';
    if (priceEl[1]) priceEl[1].textContent = stock > 0 ? stock : '0';
  }
}

// =============================================
// FIX: CHARTS EN TABS (BI + Create Product)
// =============================================

function initTabChartFix() {
  // BI rankings — re-init charts when tab switches
  document.addEventListener('shown.bs.tab', (e) => {
    const target = e.target.getAttribute('data-bs-target');
    if (target === '#bi-clients')   _initBIClientChart();
    if (target === '#bi-suppliers') _initBISupplierChart();
    if (target === '#bi-products')  _initBIProductChart();
  });

  // Create Product — init preview on tab shown
  document.addEventListener('shown.bs.tab', (e) => {
    if (e.target.closest('#createProductTabs')) initCreateProductPreview();
  });
}

// =============================================
// MASA: ajuste masivo de precios (modal)
// =============================================

function openMassPriceModal() {
  Swal.fire({
    title: 'Ajuste masivo de precios',
    html: `
      <div class="text-start">
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Tipo de ajuste</label>
          <select id="mp-type" class="form-select">
            <option value="pct-up">Aumentar por porcentaje</option>
            <option value="pct-down">Reducir por porcentaje</option>
            <option value="fixed">Establecer precio fijo</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Valor</label>
          <div class="input-group">
            <input id="mp-value" class="form-control" type="number" min="0" placeholder="Ej: 15">
            <span class="input-group-text">% / $</span>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Aplicar a</label>
          <select id="mp-scope" class="form-select">
            <option>Todos los productos</option>
            <option>Electrónica</option>
            <option>Ropa</option>
            <option>Calzado</option>
          </select>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Aplicar ajuste', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const type  = document.getElementById('mp-type').value;
      const value = parseFloat(document.getElementById('mp-value').value) || 0;
      if (!value) { Swal.showValidationMessage('Ingrese un valor'); return false; }
      // Apply to products
      PRODUCTS.forEach(p => {
        if (type === 'pct-up')   p.price = Math.round(p.price * (1 + value / 100));
        if (type === 'pct-down') p.price = Math.round(p.price * (1 - value / 100));
        if (type === 'fixed')    p.price = value;
      });
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      showToast('Precios actualizados en todos los productos.');
      if (App.currentPage === 'products') renderProductsTable();
    }
  });
}

// =============================================
// CRUD — VENTAS (ver/imprimir)
// =============================================

function viewSale(id) {
  const s = SALES.find(x => x.id === id);
  if (!s) return;
  const sMap = { completada: 'bg-success', pendiente: 'bg-warning text-dark', anulada: 'bg-danger' };
  Swal.fire({
    title: 'Venta #' + s.id,
    html: `
      <table class="table table-sm text-start">
        <tr><td class="text-muted">Fecha</td><td><strong>${fmtDate(s.date)}</strong></td></tr>
        <tr><td class="text-muted">Cliente</td><td><strong>${s.client}</strong></td></tr>
        <tr><td class="text-muted">Ítems</td><td>${s.items}</td></tr>
        <tr><td class="text-muted">Total</td><td><strong style="font-size:1.1rem;color:#28A745;">${fmtCurrency(s.total)}</strong></td></tr>
        <tr><td class="text-muted">Pago</td><td>${s.payment}</td></tr>
        <tr><td class="text-muted">Estado</td><td><span class="badge ${sMap[s.status]||'bg-secondary'}">${s.status}</span></td></tr>
      </table>
    `,
    confirmButtonColor: '#00BCD4', confirmButtonText: 'Cerrar',
    showDenyButton: true, denyButtonText: '🖨️ Imprimir',
  }).then(r => {
    if (r.isDenied) printRecord('Venta #' + s.id, `<p><strong>Cliente:</strong> ${s.client}</p><p><strong>Total:</strong> ${fmtCurrency(s.total)}</p><p><strong>Pago:</strong> ${s.payment} | <strong>Estado:</strong> ${s.status}</p>`);
  });
}

// =============================================
// CRUD — CLIENTES
// =============================================

function viewClient(id) {
  const c = CLIENTS.find(x => x.id === id);
  if (!c) return;
  Swal.fire({
    title: c.name,
    html: `
      <table class="table table-sm text-start">
        <tr><td class="text-muted">Código</td><td>${c.code}</td></tr>
        <tr><td class="text-muted">Teléfono</td><td>${c.phone}</td></tr>
        <tr><td class="text-muted">Email</td><td>${c.email}</td></tr>
        <tr><td class="text-muted">Grupo</td><td>${c.group}</td></tr>
        <tr><td class="text-muted">Saldo</td><td><strong class="${c.balance < 0 ? 'text-danger' : c.balance > 0 ? 'text-success' : 'text-muted'}">${fmtCurrency(c.balance)}</strong></td></tr>
        <tr><td class="text-muted">Estado</td><td><span class="badge ${c.status === 'activo' ? 'bg-success' : 'bg-secondary'}">${c.status}</span></td></tr>
      </table>
    `,
    confirmButtonColor: '#00BCD4', confirmButtonText: 'Cerrar',
  });
}

function editClient(id) {
  const c = CLIENTS.find(x => x.id === id);
  if (!c) return;
  Swal.fire({
    title: 'Editar Cliente',
    width: 500,
    html: `
      <div class="text-start">
        <div class="mb-2"><label class="form-label fw-semibold" style="font-size:0.83rem;">Nombre *</label>
          <input id="ec-name" class="form-control" value="${c.name}"></div>
        <div class="row g-2 mb-2">
          <div class="col-6"><label class="form-label fw-semibold" style="font-size:0.83rem;">Teléfono</label>
            <input id="ec-phone" class="form-control" value="${c.phone}"></div>
          <div class="col-6"><label class="form-label fw-semibold" style="font-size:0.83rem;">Email</label>
            <input id="ec-email" class="form-control" type="email" value="${c.email}"></div>
        </div>
        <div class="mb-2"><label class="form-label fw-semibold" style="font-size:0.83rem;">Grupo</label>
          <select id="ec-group" class="form-select">
            ${['Mayorista','Minorista','VIP','Regular'].map(g => `<option ${c.group===g?'selected':''}>${g}</option>`).join('')}
          </select>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Guardar', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const name = document.getElementById('ec-name').value.trim();
      if (!name) { Swal.showValidationMessage('El nombre es obligatorio'); return false; }
      c.name  = name;
      c.phone = document.getElementById('ec-phone').value.trim();
      c.email = document.getElementById('ec-email').value.trim();
      c.group = document.getElementById('ec-group').value;
      return true;
    },
  }).then(r => { if (r.isConfirmed) { showToast('Cliente actualizado.'); renderClientsTable(); } });
}

function deleteClient(id) {
  const c = CLIENTS.find(x => x.id === id);
  Swal.fire({
    title: '¿Eliminar cliente?',
    html: c ? `<p>Se eliminará <strong>${c.name}</strong>.</p>` : '',
    icon: 'warning',
    showCancelButton: true, confirmButtonColor: '#DC3545', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar',
  }).then(r => {
    if (r.isConfirmed) {
      const idx = CLIENTS.findIndex(x => x.id === id);
      if (idx > -1) CLIENTS.splice(idx, 1);
      renderClientsTable();
      showToast('Cliente eliminado.');
    }
  });
}

// =============================================
// CRUD — COMPRAS
// =============================================

function viewPurchase(id) {
  const p = PURCHASES.find(x => x.id === id);
  if (!p) return;
  const sMap = { completada: 'bg-success', pendiente: 'bg-warning text-dark', anulada: 'bg-danger' };
  Swal.fire({
    title: 'Compra #' + p.id,
    html: `
      <table class="table table-sm text-start">
        <tr><td class="text-muted">Fecha</td><td><strong>${fmtDate(p.date)}</strong></td></tr>
        <tr><td class="text-muted">Proveedor</td><td><strong>${p.supplier}</strong></td></tr>
        <tr><td class="text-muted">Ítems</td><td>${p.items}</td></tr>
        <tr><td class="text-muted">Total</td><td><strong style="font-size:1.1rem;color:#FF6B00;">${fmtCurrency(p.total)}</strong></td></tr>
        <tr><td class="text-muted">Pago</td><td>${p.payment}</td></tr>
        <tr><td class="text-muted">Estado</td><td><span class="badge ${sMap[p.status]||'bg-secondary'}">${p.status}</span></td></tr>
      </table>
    `,
    confirmButtonColor: '#00BCD4', confirmButtonText: 'Cerrar',
    showDenyButton: true, denyButtonText: '🖨️ Imprimir',
  }).then(r => {
    if (r.isDenied) printRecord('Compra #' + p.id, `<p><strong>Proveedor:</strong> ${p.supplier}</p><p><strong>Total:</strong> ${fmtCurrency(p.total)}</p><p><strong>Estado:</strong> ${p.status}</p>`);
  });
}

function deletePurchase(id) {
  Swal.fire({
    title: '¿Anular compra?', icon: 'warning',
    showCancelButton: true, confirmButtonColor: '#DC3545', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Anular', cancelButtonText: 'Cancelar',
  }).then(r => {
    if (r.isConfirmed) {
      const p = PURCHASES.find(x => x.id === id);
      if (p) p.status = 'anulada';
      renderPurchasesTable();
      showToast('Compra anulada.');
    }
  });
}

// =============================================
// CRUD — GASTOS
// =============================================

function editExpense(id) {
  const e = EXPENSES.find(x => x.id === id);
  if (!e) return;
  Swal.fire({
    title: 'Editar Gasto',
    width: 480,
    html: `
      <div class="text-start">
        <div class="mb-2"><label class="form-label fw-semibold" style="font-size:0.83rem;">Descripción</label>
          <input id="ee-desc" class="form-control" value="${e.description}"></div>
        <div class="row g-2 mb-2">
          <div class="col-6"><label class="form-label fw-semibold" style="font-size:0.83rem;">Importe</label>
            <div class="input-group"><span class="input-group-text">$</span>
              <input id="ee-amount" class="form-control" type="number" value="${e.amount}"></div>
          </div>
          <div class="col-6"><label class="form-label fw-semibold" style="font-size:0.83rem;">Categoría</label>
            <select id="ee-cat" class="form-select">
              ${['Alquiler','Servicios','Sueldos','Marketing','Limpieza','Transporte','Otro'].map(c => `<option ${e.category===c?'selected':''}>${c}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Guardar', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      e.description = document.getElementById('ee-desc').value.trim() || e.description;
      e.amount      = parseFloat(document.getElementById('ee-amount').value) || e.amount;
      e.category    = document.getElementById('ee-cat').value;
      return true;
    },
  }).then(r => { if (r.isConfirmed) { showToast('Gasto actualizado.'); renderExpensesTable(); } });
}

function deleteExpense(id) {
  Swal.fire({
    title: '¿Eliminar gasto?', icon: 'warning',
    showCancelButton: true, confirmButtonColor: '#DC3545', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar',
  }).then(r => {
    if (r.isConfirmed) {
      const idx = EXPENSES.findIndex(x => x.id === id);
      if (idx > -1) EXPENSES.splice(idx, 1);
      renderExpensesTable();
      showToast('Gasto eliminado.');
    }
  });
}

// =============================================
// CRUD — PROVEEDORES
// =============================================

function viewSupplier(id) {
  const s = SUPPLIERS.find(x => x.id === id);
  if (!s) return;
  Swal.fire({
    title: s.name,
    html: `
      <table class="table table-sm text-start">
        <tr><td class="text-muted">Código</td><td>${s.code}</td></tr>
        <tr><td class="text-muted">CUIT</td><td>${s.cuit}</td></tr>
        <tr><td class="text-muted">Teléfono</td><td>${s.phone}</td></tr>
        <tr><td class="text-muted">Email</td><td>${s.email}</td></tr>
        <tr><td class="text-muted">Saldo</td><td><strong class="${s.balance < 0 ? 'text-danger' : 'text-success'}">${fmtCurrency(s.balance)}</strong></td></tr>
        <tr><td class="text-muted">Estado</td><td><span class="badge ${s.status === 'activo' ? 'bg-success' : 'bg-secondary'}">${s.status}</span></td></tr>
      </table>
    `,
    confirmButtonColor: '#00BCD4', confirmButtonText: 'Cerrar',
  });
}

function editSupplier(id) {
  const s = SUPPLIERS.find(x => x.id === id);
  if (!s) return;
  Swal.fire({
    title: 'Editar Proveedor',
    width: 500,
    html: `
      <div class="text-start">
        <div class="mb-2"><label class="form-label fw-semibold" style="font-size:0.83rem;">Nombre</label>
          <input id="es-name" class="form-control" value="${s.name}"></div>
        <div class="row g-2 mb-2">
          <div class="col-6"><label class="form-label fw-semibold" style="font-size:0.83rem;">CUIT</label>
            <input id="es-cuit" class="form-control" value="${s.cuit}"></div>
          <div class="col-6"><label class="form-label fw-semibold" style="font-size:0.83rem;">Teléfono</label>
            <input id="es-phone" class="form-control" value="${s.phone}"></div>
        </div>
        <div class="mb-2"><label class="form-label fw-semibold" style="font-size:0.83rem;">Email</label>
          <input id="es-email" class="form-control" type="email" value="${s.email}"></div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Guardar', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      s.name  = document.getElementById('es-name').value.trim() || s.name;
      s.cuit  = document.getElementById('es-cuit').value.trim();
      s.phone = document.getElementById('es-phone').value.trim();
      s.email = document.getElementById('es-email').value.trim();
      return true;
    },
  }).then(r => { if (r.isConfirmed) { showToast('Proveedor actualizado.'); renderSuppliersTable(); } });
}

function deleteSupplier(id) {
  const s = SUPPLIERS.find(x => x.id === id);
  Swal.fire({
    title: '¿Eliminar proveedor?',
    html: s ? `<p>Se eliminará <strong>${s.name}</strong>.</p>` : '',
    icon: 'warning',
    showCancelButton: true, confirmButtonColor: '#DC3545', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar',
  }).then(r => {
    if (r.isConfirmed) {
      const idx = SUPPLIERS.findIndex(x => x.id === id);
      if (idx > -1) SUPPLIERS.splice(idx, 1);
      renderSuppliersTable();
      showToast('Proveedor eliminado.');
    }
  });
}

// =============================================
// CRUD — PRESUPUESTOS
// =============================================

function viewBudget(id) {
  const b = BUDGETS.find(x => x.id === id);
  if (!b) return;
  const sMap = { pendiente: 'bg-warning text-dark', aprobado: 'bg-success', rechazado: 'bg-danger' };
  Swal.fire({
    title: 'Presupuesto ' + b.id,
    html: `
      <table class="table table-sm text-start">
        <tr><td class="text-muted">Cliente</td><td><strong>${b.client}</strong></td></tr>
        <tr><td class="text-muted">Fecha</td><td>${fmtDate(b.date)}</td></tr>
        <tr><td class="text-muted">Vence</td><td>${fmtDate(b.expiry)}</td></tr>
        <tr><td class="text-muted">Ítems</td><td>${b.items}</td></tr>
        <tr><td class="text-muted">Total</td><td><strong style="font-size:1.1rem;color:#00BCD4;">${fmtCurrency(b.total)}</strong></td></tr>
        <tr><td class="text-muted">Estado</td><td><span class="badge ${sMap[b.status]||'bg-secondary'}">${b.status}</span></td></tr>
      </table>
    `,
    confirmButtonColor: '#00BCD4', confirmButtonText: 'Cerrar',
    showDenyButton: true, denyButtonText: '🖨️ Imprimir',
  }).then(r => {
    if (r.isDenied) printRecord('Presupuesto ' + b.id, `<p><strong>Cliente:</strong> ${b.client}</p><p><strong>Total:</strong> ${fmtCurrency(b.total)}</p><p><strong>Vence:</strong> ${fmtDate(b.expiry)}</p><p><strong>Estado:</strong> ${b.status}</p>`);
  });
}

function deleteBudget(id) {
  Swal.fire({
    title: '¿Eliminar presupuesto?', icon: 'warning',
    showCancelButton: true, confirmButtonColor: '#DC3545', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar',
  }).then(r => {
    if (r.isConfirmed) {
      const idx = BUDGETS.findIndex(x => x.id === id);
      if (idx > -1) BUDGETS.splice(idx, 1);
      if (App.currentPage === 'budgets') initBudgetsPage();
      showToast('Presupuesto eliminado.');
    }
  });
}

// =============================================
// REGISTRAR PAGO (desde Registro de Pagos)
// =============================================

function openCreatePaymentModal() {
  Swal.fire({
    title: 'Registrar Pago',
    width: 520,
    html: `
      <div class="text-start">
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Cliente *</label>
          <select id="rp-client" class="form-select">
            <option value="">— Seleccionar —</option>
            ${CLIENTS.map(c => `<option>${c.name}</option>`).join('')}
          </select>
        </div>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Venta referencia</label>
            <select id="rp-sale" class="form-select">
              <option value="">— Opcional —</option>
              ${SALES.map(s => `<option value="#${s.id}">#${s.id} — ${fmtCurrency(s.total)}</option>`).join('')}
            </select>
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Fecha</label>
            <input id="rp-date" class="form-control" type="date" value="${new Date().toISOString().split('T')[0]}">
          </div>
        </div>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Importe *</label>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input id="rp-amount" class="form-control" type="number" min="0" placeholder="0">
            </div>
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Método</label>
            <select id="rp-method" class="form-select">
              <option>Efectivo</option><option>Transferencia</option><option>Tarjeta</option><option>Débito</option>
            </select>
          </div>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: '<i class="bi bi-check-lg me-1"></i> Registrar', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const client = document.getElementById('rp-client').value;
      const amount = parseFloat(document.getElementById('rp-amount').value) || 0;
      if (!client) { Swal.showValidationMessage('Seleccione un cliente'); return false; }
      if (!amount) { Swal.showValidationMessage('Ingrese un importe válido'); return false; }
      const newId = 'PAG-' + String(PAYMENTS_REGISTER.length + 1).padStart(3, '0');
      PAYMENTS_REGISTER.unshift({
        id: newId,
        date: document.getElementById('rp-date').value,
        client,
        sale: document.getElementById('rp-sale').value || '—',
        amount,
        method: document.getElementById('rp-method').value,
        user: 'Admin',
      });
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      showToast('Pago registrado correctamente.');
      if (App.currentPage === 'payments-register') initPaymentsRegisterPage();
    }
  });
}

// =============================================
// NUEVO MOVIMIENTO DE CAJA
// =============================================

function openNewCashMovementModal() {
  Swal.fire({
    title: 'Nuevo Movimiento de Caja',
    width: 480,
    html: `
      <div class="text-start">
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Tipo *</label>
            <select id="cm-type" class="form-select">
              <option value="ingreso">Ingreso</option>
              <option value="egreso">Egreso</option>
            </select>
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Importe *</label>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input id="cm-amount" class="form-control" type="number" min="0" placeholder="0">
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Descripción *</label>
          <input id="cm-desc" class="form-control" placeholder="Motivo del movimiento">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Registrar', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const desc   = document.getElementById('cm-desc').value.trim();
      const amount = parseFloat(document.getElementById('cm-amount').value) || 0;
      if (!desc)   { Swal.showValidationMessage('La descripción es obligatoria'); return false; }
      if (!amount) { Swal.showValidationMessage('Ingrese un importe válido'); return false; }
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0] + ' ' + now.toTimeString().slice(0, 5);
      CASH_MOVEMENTS.unshift({
        id: CASH_MOVEMENTS.length + 1,
        date: dateStr,
        type: document.getElementById('cm-type').value,
        description: desc,
        amount,
        box: 'Caja Principal',
        user: 'Admin',
      });
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      showToast('Movimiento registrado.');
      if (App.currentPage === 'cash-movements') initCashMovementsPage();
    }
  });
}

function exportCashMovements() {
  exportGenericCSV(
    ['Fecha','Tipo','Descripción','Importe','Caja','Usuario'],
    CASH_MOVEMENTS.map(m => [m.date, m.type, m.description, m.amount, m.box, m.user]),
    'movimientos_caja'
  );
}

function exportAccounting() {
  exportGenericCSV(
    ['Fecha','Cuenta','Descripción','Débito','Crédito','Referencia'],
    ACCOUNTING_ENTRIES.map(e => [fmtDate(e.date), e.account, e.description, e.debit, e.credit, e.ref]),
    'contabilidad'
  );
}

function openNewAccountingEntryModal() {
  Swal.fire({
    title: 'Nuevo Asiento Contable',
    width: 520,
    html: `
      <div class="text-start">
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Fecha</label>
            <input id="ae-date" class="form-control" type="date" value="${new Date().toISOString().split('T')[0]}">
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Cuenta *</label>
            <select id="ae-account" class="form-select">
              <option>Ventas</option><option>Caja</option><option>Banco</option>
              <option>Compras</option><option>Proveedores</option><option>Gastos</option>
            </select>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Descripción *</label>
          <input id="ae-desc" class="form-control" placeholder="Descripción del asiento">
        </div>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Débito</label>
            <div class="input-group"><span class="input-group-text">$</span>
              <input id="ae-debit" class="form-control" type="number" min="0" placeholder="0"></div>
          </div>
          <div class="col-6">
            <label class="form-label fw-semibold" style="font-size:0.83rem;">Crédito</label>
            <div class="input-group"><span class="input-group-text">$</span>
              <input id="ae-credit" class="form-control" type="number" min="0" placeholder="0"></div>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Referencia</label>
          <input id="ae-ref" class="form-control" placeholder="FAC-001, OC-002...">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745', cancelButtonColor: '#6c757d',
    confirmButtonText: 'Registrar asiento', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const desc  = document.getElementById('ae-desc').value.trim();
      const debit = parseFloat(document.getElementById('ae-debit').value) || 0;
      const credit = parseFloat(document.getElementById('ae-credit').value) || 0;
      if (!desc) { Swal.showValidationMessage('La descripción es obligatoria'); return false; }
      ACCOUNTING_ENTRIES.unshift({
        id: ACCOUNTING_ENTRIES.length + 1,
        date: document.getElementById('ae-date').value,
        account: document.getElementById('ae-account').value,
        description: desc,
        debit, credit,
        ref: document.getElementById('ae-ref').value.trim() || '—',
      });
      return true;
    },
  }).then(r => {
    if (r.isConfirmed) {
      showToast('Asiento registrado.');
      if (App.currentPage === 'accounting') initAccountingPage();
    }
  });
}

// =============================================
// INIT GLOBAL
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  initTabChartFix();
});
