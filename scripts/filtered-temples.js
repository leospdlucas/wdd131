const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },

  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },

  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },

  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },

  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },

  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },

  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },

  {
    templeName: "Rio de Janeiro Brazil",
    location: "Rio de Janeiro, Brazil",
    dedicated: "2022, May, 8",
    area: 29966,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/rio-de-janeiro-brazil-temple/rio-de-janeiro-brazil-temple-8162.jpg",
  },

  {
    templeName: "Campinas Brazil",
    location: "Campinas, Brazil",
    dedicated: "2002, May, 17",
    area: 48100,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/campinas-brazil-temple/campinas-brazil-temple-59765.jpg",
  },
  
  {
    templeName: "Belém Brazil",
    location: "Belém, Brazil",
    dedicated: "2022, November, 20",
    area: 28675,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/belem-brazil-temple/belem-brazil-temple-59689.jpg",
  },
];

// 2) Helpers
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function getYear(dedicatedStr) {
  // Input like "1888, May, 21" -> 1888
  const firstPart = String(dedicatedStr).split(",")[0];
  const yr = parseInt(firstPart, 10);
  return Number.isFinite(yr) ? yr : NaN;
}

function formatNumber(n) {
  return new Intl.NumberFormat("en-US").format(n);
}

// 3) Render
const cardsEl = $("#cards");

function createCard(t) {
  const article = document.createElement("article");
  article.className = "card";

  const img = document.createElement("img");
  img.className = "card__media";
  img.src = t.imageUrl;
  img.alt = `${t.templeName} Temple`;
  img.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card__body";

  const h3 = document.createElement("h3");
  h3.className = "card__title";
  h3.textContent = t.templeName;

  const loc = document.createElement("p");
  loc.className = "card__meta";
  loc.textContent = t.location;

  const meta = document.createElement("div");
  meta.className = "meta-row";

  const d = document.createElement("span");
  d.className = "badge";
  d.title = "Dedicated Date";
  d.textContent = `Dedicated: ${t.dedicated}`;

  const a = document.createElement("span");
  a.className = "badge";
  a.title = "Total Area (sq ft)";
  a.textContent = `Area: ${formatNumber(t.area)} ft²`;

  meta.append(d, a);
  body.append(h3, loc, meta);
  article.append(img, body);
  return article;
}

function renderTemples(list) {
  cardsEl.setAttribute("aria-busy", "true");
  cardsEl.innerHTML = "";
  if (!list.length) {
    const p = document.createElement("p");
    p.className = "card__meta";
    p.textContent = "No temples match this filter.";
    cardsEl.appendChild(p);
  } else {
    const frag = document.createDocumentFragment();
    list.forEach((t) => frag.appendChild(createCard(t)));
    cardsEl.appendChild(frag);
  }
  cardsEl.setAttribute("aria-busy", "false");
}

// 4) Filters
const FILTERS = {
  all: () => temples.slice(),
  old: () => temples.filter((t) => getYear(t.dedicated) < 1900),
  new: () => temples.filter((t) => getYear(t.dedicated) > 2000),
  large: () => temples.filter((t) => t.area > 90000),
  small: () => temples.filter((t) => t.area < 10000),
};

function setActive(btn) {
  $$(".nav__btn").forEach((b) => {
    const active = b === btn;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-pressed", String(active));
  });
}

// 5) Events
document.addEventListener("DOMContentLoaded", () => {
  // Initial render
  renderTemples(FILTERS.all());

  // Footer info
  $("#year").textContent = new Date().getFullYear();
  $("#lastModified").textContent = document.lastModified;

  // Nav filter handling
  $("#site-nav").addEventListener("click", (e) => {
    const btn = e.target.closest(".nav__btn");
    if (!btn) return;
    const key = btn.dataset.filter;
    const fn = FILTERS[key] || FILTERS.all;
    setActive(btn);
    renderTemples(fn());
  });

  // Hamburger
  const toggle = $("#menu-toggle");
  const nav = $("#site-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
});
