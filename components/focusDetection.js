// components/focusDetection.js

let inactivityTimer;
const idleLimit = 300000; // 5 minutes

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    alert('🛑 You seem to be inactive. Timer is paused.');
    // Pause timer logic here if using a Pomodoro timer
  }, idleLimit);
}

['mousemove', 'keydown', 'scroll'].forEach(event => {
  document.addEventListener(event, resetInactivityTimer);
});

resetInactivityTimer(); // Start on page load
