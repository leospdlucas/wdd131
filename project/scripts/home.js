// Render popular and deals on the home page
document.addEventListener('DOMContentLoaded', () => {
  const popular = document.getElementById('popular');
  const deals = document.getElementById('deals');
  if (popular) {
    const top = PRODUCTS.slice(0, 4);
    popular.innerHTML = top.map(productCard).join('');
  }
  if (deals) {
    const list = PRODUCTS.filter(p => p.promo);
    deals.innerHTML = list.map(productCard).join('');
  }
  wireActions();
});

function wireActions(){
  document.addEventListener('click', (e) => {
    const fav = e.target.closest('[data-fav]');
    if (fav) {
      toggleFav(fav.getAttribute('data-fav'));
      // re-render hearts
      document.querySelectorAll('[data-fav]').forEach(btn => {
        const id = btn.getAttribute('data-fav');
        const on = new Set(getFavs()).has(id);
        btn.classList.toggle('on', on);
      });
    }
  });
}
