// Dynamically populate current year and last modified date
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('currentyear');
  const lastModEl = document.getElementById('lastModified');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (lastModEl) {
    lastModEl.textContent = document.lastModified;
  }
});
