/* =============================================
   VENDLY — App Core (Navigation, Sidebar, Header)
   ============================================= */

'use strict';

// ---- State ----
const App = {
  currentPage: 'dashboard',
  sidebarCollapsed: false,
  isMobile: () => window.innerWidth < 992,
};

// ---- Sidebar Toggle ----
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');
  const overlay = document.getElementById('sidebarOverlay');
  const toggleBtn = document.getElementById('sidebarToggle');

  toggleBtn.addEventListener('click', () => {
    if (App.isMobile()) {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('show');
    } else {
      App.sidebarCollapsed = !App.sidebarCollapsed;
      sidebar.classList.toggle('collapsed', App.sidebarCollapsed);
      mainContent.classList.toggle('expanded', App.sidebarCollapsed);
    }
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('show');
  });

  window.addEventListener('resize', () => {
    if (!App.isMobile()) {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('show');
    }
  });
}

// ---- Navigation ----
function navigateTo(pageId, label) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    App.currentPage = pageId;
  }

  // Update header title
  const headerTitle = document.getElementById('headerTitle');
  if (headerTitle) headerTitle.textContent = label || pageId;

  // Update active nav links
  document.querySelectorAll('.nav-item-link, .sidebar-submenu a').forEach(el => {
    el.classList.remove('active');
  });

  const activeLinks = document.querySelectorAll(`[data-page="${pageId}"]`);
  activeLinks.forEach(el => el.classList.add('active'));

  // Close sidebar on mobile after nav
  if (App.isMobile()) {
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('sidebarOverlay').classList.remove('show');
  }

  // Trigger page-specific init
  const pageInits = {
    'dashboard':         initDashboard,
    'products':          initProductsPage,
    'pos':               initPOS,
    'clients':           initClientsPage,
    'sales':             initSalesPage,
    'purchases':         initPurchasesPage,
    'expenses':          initExpensesPage,
    'suppliers':         initSuppliersPage,
    'reports-sales':     initReportSales,
    // pages2.js
    'create-product':    initCreateProductPage,
    'stock-adjustment':  initStockAdjustmentPage,
    'categories':        initCategoriesPage,
    'brands':            initBrandsPage,
    'units':             initUnitsPage,
    'budgets':           initBudgetsPage,
    'returns':           initReturnsPage,
    'account-status':    initAccountStatusPage,
    'payments-register': initPaymentsRegisterPage,
    'cash-movements':    initCashMovementsPage,
    'cash-report':       initCashReportPage,
    'stock-alerts':      initStockAlertsPage,
    'stock-valued':      initStockValuedPage,
    'bi-rankings':       initBIPage,
    'profit-loss':       initProfitLossPage,
    'create-purchase':   initCreatePurchasePage,
    'accounting':        initAccountingPage,
    'payment-terms':     initPaymentTermsPage,
    'cash-registers':    initCashRegistersPage,
    'remissions':        initRemissionsPage,
    'commissions':       initCommissionsPage,
    'debit-notes':       initDebitNotesPage,
  };
  if (pageInits[pageId]) pageInits[pageId]();

  window.scrollTo(0, 0);
}

// ---- Bind nav links ----
function bindNavLinks() {
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = el.getAttribute('data-page');
      const label = el.getAttribute('data-label') || el.textContent.trim();
      navigateTo(pageId, label);
    });
  });
}

// ---- Sidebar submenu accordion ----
function initAccordion() {
  // Bootstrap collapse handles show/hide; we just sync aria-expanded icons
  document.querySelectorAll('.sidebar-submenu').forEach(el => {
    el.addEventListener('show.bs.collapse', () => {
      const btn = document.querySelector(`[data-bs-target="#${el.id}"]`);
      if (btn) btn.setAttribute('aria-expanded', 'true');
    });
    el.addEventListener('hide.bs.collapse', () => {
      const btn = document.querySelector(`[data-bs-target="#${el.id}"]`);
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });

  // One-at-a-time accordion: close others when one opens
  document.querySelectorAll('.sidebar-submenu').forEach(el => {
    el.addEventListener('show.bs.collapse', () => {
      document.querySelectorAll('.sidebar-submenu.show').forEach(other => {
        if (other !== el) {
          const inst = bootstrap.Collapse.getInstance(other);
          if (inst) inst.hide();
        }
      });
    });
  });
}

// ---- Load time in footer ----
function setFooterLoadTime() {
  const el = document.getElementById('loadTime');
  if (el) el.textContent = (Math.random() * 0.5 + 0.1).toFixed(3) + 's';
}

// ---- Notification bell dropdown ----
function initNotifications() {
  // Just decorative for now
}

// ---- Init App ----
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  bindNavLinks();
  initAccordion();
  setFooterLoadTime();
  initNotifications();
  initDashboard();
});
