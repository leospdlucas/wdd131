
// main.js
(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const lastmod = document.getElementById('lastmod');
  if (lastmod) lastmod.textContent = new Date(document.lastModified).toLocaleString();

  // Mobile nav
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Highlight current page
  const links = document.querySelectorAll('nav a');
  links.forEach(a => {
    if (a.getAttribute('href') === location.pathname.split('/').pop()) a.classList.add('active');
    if (location.pathname.endsWith('/') && a.getAttribute('href') === 'index.html') a.classList.add('active');
  });

  // Persisted name greeting (localStorage demo)
  try {
    const params = new URLSearchParams(location.search);
    const who = params.get('who');
    if (who) localStorage.setItem('sg_name', who);
    const name = localStorage.getItem('sg_name');
    if (name && document.title.includes('Home')) {
      const hero = document.querySelector('.hero .p');
      if (hero) {
        const p = document.createElement('p');
        p.className = 'small';
        p.textContent = `Welcome back, ${name}!`;
        hero.appendChild(p);
      }
    }
  } catch (e) {}
})();
