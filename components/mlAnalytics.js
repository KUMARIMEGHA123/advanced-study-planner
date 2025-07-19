// components/mlAnalytics.js

import Chart from 'https://cdn.jsdelivr.net/npm/chart.js'; // CDN import

function getStudyData() {
  const usage = JSON.parse(localStorage.getItem('studyUsageLog')) || {};
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const data = hours.map(h => usage[h] || 0);
  return { labels: hours.map(h => `${h}:00`), data };
}

function showStudyChart() {
  const container = document.createElement('div');
  container.innerHTML = `<canvas id="studyChart" width="400" height="200"></canvas>`;
  container.style.cssText = 'padding:20px;background:#fff;margin:20px;border-radius:10px;';
  document.body.appendChild(container);

  const ctx = document.getElementById('studyChart').getContext('2d');
  const { labels, data } = getStudyData();

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Study Frequency by Hour',
        data,
        backgroundColor: '#4caf50',
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Run on load
window.addEventListener('load', showStudyChart);
