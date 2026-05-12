/* =============================================
   VENDLY — Auth (Supabase)
   ============================================= */

const ADMIN_EMAIL = 'corporativogestion2025@gmail.com';
let currentUser = null;

async function initAuth() {
  const { data: { session } } = await db.auth.getSession();
  if (session) {
    currentUser = session.user;
    onAuthReady();
  } else {
    showLoginPage();
  }

  db.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      currentUser = session.user;
      onAuthReady();
    } else if (event === 'SIGNED_OUT') {
      currentUser = null;
      location.reload();
    }
  });
}

function onAuthReady() {
  if (currentUser.email === ADMIN_EMAIL) {
    window.location.href = '/admin.html';
    return;
  }

  document.getElementById('loginOverlay').style.display = 'none';
  document.getElementById('appWrapper').style.display = 'flex';

  const name  = currentUser.user_metadata?.name || currentUser.email.split('@')[0];
  const email = currentUser.email;
  const initials = name.substring(0, 2).toUpperCase();
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00BCD4&color=fff&size=80`;

  // Sidebar user
  document.querySelectorAll('.sidebar-user-name').forEach(el => el.textContent = name);
  document.querySelectorAll('.sidebar-user-email').forEach(el => el.textContent = email);
  document.querySelectorAll('.sidebar-avatar').forEach(el => el.src = avatarUrl);

  // Header user
  document.querySelectorAll('.header-user-name').forEach(el => el.textContent = name);
  document.querySelectorAll('.header-user-email').forEach(el => el.textContent = email);

  // Admin-only elements
  const isAdmin = email === ADMIN_EMAIL;
  document.querySelectorAll('.admin-only').forEach(el => {
    el.style.display = isAdmin ? '' : 'none';
  });

  initSidebar();
  bindNavLinks();
  initAccordion();
  setFooterLoadTime();
  initDashboard();
}

function showLoginPage() {
  document.getElementById('loginOverlay').style.display = 'flex';
  document.getElementById('appWrapper').style.display = 'none';
}

async function vendlyLogin() {
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const btn      = document.getElementById('loginBtn');
  const errEl    = document.getElementById('loginError');

  if (!email || !password) { errEl.textContent = 'Completá email y contraseña.'; return; }

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Ingresando...';
  errEl.textContent = '';

  const { error } = await db.auth.signInWithPassword({ email, password });
  if (error) {
    errEl.textContent = 'Email o contraseña incorrectos.';
    btn.disabled = false;
    btn.innerHTML = 'Ingresar';
  }
}

async function vendlyLogout() {
  const r = await Swal.fire({
    title: '¿Cerrar sesión?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, salir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#DC3545',
  });
  if (r.isConfirmed) await db.auth.signOut();
}

function confirmLogout() { vendlyLogout(); }

function isAdmin() { return currentUser?.email === ADMIN_EMAIL; }
