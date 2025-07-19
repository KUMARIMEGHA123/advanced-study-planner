// components/smartSuggestions.js

const usageLogKey = 'studyUsageLog';

function logStudyTime() {
  const now = new Date();
  const hour = now.getHours();
  const usage = JSON.parse(localStorage.getItem(usageLogKey)) || {};
  usage[hour] = (usage[hour] || 0) + 1;
  localStorage.setItem(usageLogKey, JSON.stringify(usage));
}

function suggestStudyTime() {
  const usage = JSON.parse(localStorage.getItem(usageLogKey)) || {};
  const bestHour = Object.entries(usage).reduce((a, b) => (a[1] > b[1] ? a : b), [null, 0])[0];

  if (bestHour !== null) {
    const container = document.createElement('div');
    container.id = 'suggestion-box';
    container.innerHTML = `<p>📌 Your most productive hour: <strong>${bestHour}:00</strong></p>`;
    container.style.cssText = 'position:fixed;bottom:20px;right:20px;padding:10px;background:#fff;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,0.1);z-index:999;';
    document.body.appendChild(container);
  }
}

// Track when planner is open
window.addEventListener('load', () => {
  logStudyTime();
  suggestStudyTime();
});
