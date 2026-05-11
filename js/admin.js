/* =============================================
   VENDLY — Panel de Administración
   ============================================= */

let adminClientsDT = null;

async function initAdminPage() {
  if (!isAdmin()) {
    navigateTo('dashboard', 'Dashboard');
    return;
  }
  await renderAdminClientsTable();
}

async function renderAdminClientsTable() {
  const tbody = document.getElementById('adminClientsTbody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4"><div class="spinner-border spinner-border-sm text-primary me-2"></div>Cargando clientes...</td></tr>';

  const res = await fetch('/api/admin/users', {
    headers: { 'Authorization': 'Bearer ' + (await db.auth.getSession()).data.session.access_token }
  });
  const data = await res.json();

  if (!data.ok) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger py-3">Error: ${data.error}</td></tr>`;
    return;
  }

  const users = data.users;
  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">No hay clientes todavía. Creá el primero.</td></tr>';
    if (adminClientsDT) { adminClientsDT.destroy(); adminClientsDT = null; }
    return;
  }

  tbody.innerHTML = users.map(u => {
    const name     = u.user_metadata?.name || u.email.split('@')[0];
    const created  = u.created_at ? new Date(u.created_at).toLocaleDateString('es-AR') : '-';
    const lastSign = u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString('es-AR') : 'Nunca';
    const isSelf   = u.email === ADMIN_EMAIL;
    return `
      <tr>
        <td><img src="https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00BCD4&color=fff&size=40" class="rounded-circle me-2" width="32" height="32">${name}</td>
        <td>${u.email}</td>
        <td>${created}</td>
        <td>${lastSign}</td>
        <td>
          ${isSelf
            ? '<span class="badge bg-warning text-dark">Admin</span>'
            : `<button class="btn btn-sm btn-outline-danger" onclick="deleteClient('${u.id}', '${u.email}')"><i class="bi bi-trash me-1"></i>Eliminar</button>`
          }
        </td>
      </tr>`;
  }).join('');

  if (adminClientsDT) adminClientsDT.destroy();
  adminClientsDT = new DataTable('#adminClientsTable', {
    language: dtLang(),
    pageLength: 10,
    columnDefs: [{ orderable: false, targets: [4] }],
    dom: "<'row mb-2'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>><'row'<'col-12'tr>><'row mt-2'<'col-sm-5'i><'col-sm-7'p>>",
  });
}

async function openCreateClientModal() {
  const { value: formValues } = await Swal.fire({
    title: 'Nuevo Cliente',
    width: 480,
    html: `
      <div class="text-start">
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Nombre</label>
          <input id="ac-name" class="form-control" placeholder="Nombre del negocio o persona">
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Email *</label>
          <input id="ac-email" class="form-control" placeholder="cliente@email.com" type="email">
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold" style="font-size:0.83rem;">Contraseña temporal *</label>
          <input id="ac-pass" class="form-control" placeholder="Mínimo 6 caracteres" type="password">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#28A745',
    confirmButtonText: '<i class="bi bi-person-plus me-1"></i> Crear acceso',
    cancelButtonText: 'Cancelar',
    preConfirm: async () => {
      const name  = document.getElementById('ac-name').value.trim();
      const email = document.getElementById('ac-email').value.trim();
      const pass  = document.getElementById('ac-pass').value;
      if (!email || !pass) { Swal.showValidationMessage('Email y contraseña son obligatorios'); return false; }
      if (pass.length < 6)  { Swal.showValidationMessage('La contraseña debe tener al menos 6 caracteres'); return false; }

      const session = (await db.auth.getSession()).data.session;
      const res = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + session.access_token },
        body: JSON.stringify({ email, password: pass, name }),
      });
      const data = await res.json();
      if (!data.ok) { Swal.showValidationMessage('Error: ' + data.error); return false; }
      return { email, name };
    },
  });

  if (formValues) {
    await Swal.fire({
      icon: 'success',
      title: 'Cliente creado',
      html: `<p>El acceso para <strong>${formValues.email}</strong> fue creado correctamente.</p><p class="text-muted" style="font-size:0.83rem;">El cliente ya puede ingresar con esas credenciales.</p>`,
      confirmButtonColor: '#00BCD4',
    });
    renderAdminClientsTable();
  }
}

async function deleteClient(userId, email) {
  const r = await Swal.fire({
    title: '¿Eliminar cliente?',
    html: `Se eliminará el acceso de <strong>${email}</strong> y todos sus datos.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC3545',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });
  if (!r.isConfirmed) return;

  const session = (await db.auth.getSession()).data.session;
  const res = await fetch(`/api/admin/delete-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + session.access_token },
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  if (!data.ok) { showToast('Error: ' + data.error, 'error'); return; }
  showToast('Cliente eliminado', 'success');
  renderAdminClientsTable();
}
