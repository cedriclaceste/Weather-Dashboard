// Digital Clock
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// New Year Countdown
function updateNewYearCountdown() {
  const now = new Date();
  const newYear = new Date(`January 1, ${now.getFullYear() + 1} 00:00:00`);
  updateCountdownDisplay('countdown', newYear);
}
setInterval(updateNewYearCountdown, 1000);
updateNewYearCountdown();

// Reusable Countdown Function
function updateCountdownDisplay(id, targetDate) {
  const now = new Date();
  const diff = targetDate - now;
  const container = document.getElementById(id);

  if (diff <= 0) {
    container.textContent = "🎉 Time's Up!";
    container.classList.add('celebrate');
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  container.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  container.classList.remove('celebrate');
}

// Custom Countdown
let customInterval;
function startCustomCountdown() {
  clearInterval(customInterval);
  const input = document.getElementById('customDate').value;
  const target = new Date(input);
  if (!input || isNaN(target)) {
    alert("Please enter a valid date and time!");
    return;
  }

  customInterval = setInterval(() => {
    updateCountdownDisplay('customCountdown', target);
  }, 1000);

  updateCountdownDisplay('customCountdown', target);
}

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});
