// Canonical product catalog (arrays, objects, template literals)
const PRODUCTS = [
  { id: "pic-kg", name: "Picanha", cut: "beef", price: 89.90, unit: "kg", img: "images/products/picanha.webp", promo: true, rating: 4.9 },
  { id: "fral-kg", name: "Fraldinha", cut: "beef", price: 59.90, unit: "kg", img: "images/products/fraldinha.webp", promo: false, rating: 4.6 },
  { id: "ass-kg", name: "Assado de Tira", cut: "beef", price: 79.90, unit: "kg", img: "images/products/assado.webp", promo: true, rating: 4.7 },
  { id: "ling-kg", name: "Linguiça Artesanal", cut: "pork", price: 34.90, unit: "kg", img: "images/products/linguica.webp", promo: false, rating: 4.5 },
  { id: "cost-kg", name: "Costelinha Suína", cut: "pork", price: 39.90, unit: "kg", img: "images/products/costelinha.webp", promo: true, rating: 4.8 },
  { id: "cxt-kg", name: "Coxinha da Asa", cut: "poultry", price: 22.90, unit: "kg", img: "images/products/coxinha.webp", promo: false, rating: 4.4 },
  { id: "fil-kg", name: "Filé de Peito", cut: "poultry", price: 28.90, unit: "kg", img: "images/products/file-peito.webp", promo: true, rating: 4.6 }
];

// localStorage favorites
const FAV_KEY = "sg-favorites";
function getFavs(){ try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); } catch { return []; } }
function setFavs(arr){ localStorage.setItem(FAV_KEY, JSON.stringify(arr)); }
function toggleFav(id){
  const favs = new Set(getFavs());
  favs.has(id) ? favs.delete(id) : favs.add(id);
  setFavs([...favs]);
  document.dispatchEvent(new CustomEvent('favs-changed'));
}

function productCard(p){
  const favs = new Set(getFavs());
  const favOn = favs.has(p.id);
  return `
  <article class="card" data-id="${p.id}">
    <div class="media">
      <img src="${p.img}" alt="${p.name}" width="480" height="320" loading="lazy" onerror="this.replaceWith(fallbackImg('${p.name}'))">
      <button class="fav ${favOn ? 'on':''}" aria-label="Toggle favorite" title="Favorite" data-fav="${p.id}">♥</button>
      ${p.promo ? `<span class="badge">Deal</span>` : ``}
    </div>
    <div class="card-body">
      <h3>${p.name}</h3>
      <p class="muted">${label(p.cut)}</p>
      <p class="price">R$ ${p.price.toFixed(2)} <span>/${p.unit}</span></p>
      <button class="btn add" data-add="${p.id}">Add to list</button>
    </div>
  </article>`;
}

function label(cut){
  return cut === 'beef' ? 'Beef' : cut === 'pork' ? 'Pork' : 'Poultry';
}

// fallback image generator
function fallbackImg(name){
  const span = document.createElement('span');
  span.className = 'fallback';
  span.textContent = name;
  return span;
}
