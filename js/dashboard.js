/* =============================================
   VENDLY — Dashboard Charts & Data
   ============================================= */

'use strict';

let chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
    delete chartInstances[id];
  }
}

function initDashboard() {
  setTimeout(() => {
    initAnnualChart();
    initCashAuditChart();
    initCategoryDonut();
    initCustomerBarChart();
  }, 80);
}

// ---- Annual Statistics Line Chart ----
function initAnnualChart() {
  const ctx = document.getElementById('annualChart');
  if (!ctx) return;
  destroyChart('annual');

  chartInstances['annual'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Ventas',
          data: [1200000, 1800000, 2300000, 2100000, 1900000, 1700000, 1600000, 1500000, 1400000, 1350000, 1300000, 1250000],
          borderColor: '#28A745',
          backgroundColor: 'rgba(40,167,69,0.08)',
          borderWidth: 2.5,
          pointBackgroundColor: '#28A745',
          pointRadius: 4,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Compras',
          data: [700000, 900000, 1100000, 950000, 800000, 750000, 720000, 700000, 680000, 660000, 640000, 620000],
          borderColor: '#FF6B00',
          backgroundColor: 'rgba(255,107,0,0.06)',
          borderWidth: 2.5,
          pointBackgroundColor: '#FF6B00',
          pointRadius: 4,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Gastos',
          data: [200000, 250000, 300000, 280000, 260000, 240000, 230000, 220000, 210000, 200000, 195000, 190000],
          borderColor: '#00BCD4',
          backgroundColor: 'rgba(0,188,212,0.06)',
          borderWidth: 2.5,
          pointBackgroundColor: '#00BCD4',
          pointRadius: 4,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { size: 12, family: 'Roboto' }, usePointStyle: true, padding: 16 },
        },
        tooltip: {
          callbacks: {
            label: ctx => ' ' + ctx.dataset.label + ': $' + ctx.parsed.y.toLocaleString('es-AR'),
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: {
            font: { size: 11 },
            callback: v => '$' + (v / 1000) + 'K',
          },
        },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      },
    },
  });
}

// ---- Cash Audit Line Chart ----
function initCashAuditChart() {
  const ctx = document.getElementById('cashAuditChart');
  if (!ctx) return;
  destroyChart('cashAudit');

  chartInstances['cashAudit'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['18/04', '19/04', '20/04', '21/04', '22/04', '23/04', '24/04'],
      datasets: [{
        label: 'Arqueo de caja',
        data: [850000, 920000, 780000, 1100000, 960000, 1230000, 980000],
        borderColor: '#00BCD4',
        backgroundColor: 'rgba(0,188,212,0.1)',
        borderWidth: 2.5,
        pointBackgroundColor: '#00BCD4',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.4,
        fill: true,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ' $' + ctx.parsed.y.toLocaleString('es-AR'),
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { font: { size: 11 }, callback: v => '$' + (v / 1000) + 'K' },
        },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      },
    },
  });
}

// ---- Category Donut Chart ----
function initCategoryDonut() {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;
  destroyChart('category');

  chartInstances['category'] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Electrónica', 'Ropa', 'Alimentos', 'Herramientas', 'Otros'],
      datasets: [{
        data: [35, 25, 20, 12, 8],
        backgroundColor: ['#00BCD4', '#FF6B00', '#28A745', '#7c3aed', '#FFC107'],
        borderWidth: 3,
        borderColor: '#fff',
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 11, family: 'Roboto' }, usePointStyle: true, padding: 12 },
        },
        tooltip: {
          callbacks: { label: ctx => ' ' + ctx.label + ': ' + ctx.parsed + '%' },
        },
      },
    },
  });
}

// ---- Customer Horizontal Bar Chart ----
function initCustomerBarChart() {
  const ctx = document.getElementById('customerChart');
  if (!ctx) return;
  destroyChart('customer');

  chartInstances['customer'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['García, Juan', 'López, María', 'Martínez, Pedro', 'Fernández, Ana', 'González, Luis'],
      datasets: [
        {
          label: 'Contado',
          data: [450000, 380000, 310000, 280000, 210000],
          backgroundColor: 'rgba(0,188,212,0.75)',
          borderRadius: 4,
        },
        {
          label: 'Crédito',
          data: [120000, 200000, 80000, 150000, 90000],
          backgroundColor: 'rgba(255,107,0,0.75)',
          borderRadius: 4,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { size: 11, family: 'Roboto' }, usePointStyle: true, padding: 14 },
        },
        tooltip: {
          callbacks: { label: ctx => ' $' + ctx.parsed.x.toLocaleString('es-AR') },
        },
      },
      scales: {
        x: {
          stacked: false,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { font: { size: 11 }, callback: v => '$' + (v / 1000) + 'K' },
        },
        y: { grid: { display: false }, ticks: { font: { size: 11 } } },
      },
    },
  });
}
