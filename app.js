if (integrityCanvas && typeof Chart !== 'undefined') {
  const existingChart = Chart.getChart(integrityCanvas);
  if (existingChart) existingChart.destroy();

  const ctx = integrityCanvas.getContext('2d');

  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Standard AI Baseline', 'UMEP Enforced AI'],
        datasets: [{
          label: 'Verification Ratio (%)',
          data: [38, 99],
          backgroundColor: ['#d6d3d1', '#10b981'],
          borderRadius: 6,
          barPercentage: 0.6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.parsed.y}% verification ratio`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { callback: value => `${value}%` },
            grid: { color: '#f5f5f4' }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }
}
