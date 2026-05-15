document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const form = document.getElementById('escalation-form');
  const successMsg = document.getElementById('form-success');
  const integrityCanvas = document.getElementById('integrityChart');

  // Mobile menu
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('open');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
      });
    });
  }

  // Escalation form
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Processing...';

      try {
        const res = await fetch('/api/escalations', {
          method: 'POST',
          body: new FormData(form),
        });

        if (!res.ok) {
          throw new Error('Request failed');
        }

        form.reset();

        if (successMsg) {
          successMsg.classList.remove('hidden');
        }

      } catch (err) {
        console.error(err);
        alert('Submission failed. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // Integrity chart
  if (integrityCanvas && typeof Chart !== 'undefined') {

    const existingChart = Chart.getChart(integrityCanvas);

    if (existingChart) {
      existingChart.destroy();
    }

    const ctx = integrityCanvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',

        data: {
          labels: [
            'Standard AI Baseline',
            'UMEP Enforced AI'
          ],

          datasets: [{
            label: 'Verification Ratio (%)',

            data: [38, 99],

            backgroundColor: [
              '#d6d3d1',
              '#10b981'
            ],

            borderRadius: 6,
            barPercentage: 0.6
          }]
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              display: false
            },

            tooltip: {
              callbacks: {
                label: (ctx) =>
                  `${ctx.parsed.y}% verification ratio`
              }
            }
          },

          scales: {
            y: {
              beginAtZero: true,
              max: 100,

              ticks: {
                callback: (value) => `${value}%`
              },

              grid: {
                color: '#f5f5f4'
              }
            },

            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
  }
});
