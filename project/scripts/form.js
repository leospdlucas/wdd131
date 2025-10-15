//  Product data (provided)
const products = [
  { id: "pic-kg", name: "Picanha", averagerating: 4.9 },
  { id: "fral-kg", name: "Fraldinha", averagerating: 4.6 },
  { id: "ass-kg", name: "Assado de Tira", averagerating: 4.7 },
  { id: "ling-kg", name: "Linguiça Artesanal", averagerating: 4.5 },
  { id: "cost-kg", name: "Costelinha Suína", averagerating: 4.8 },
  { id: "fil-kg", name: "Filé de Peito", averagerating: 4.6 }
];

//  Populate the select with options 
const selectEl = document.querySelector("#product");
products.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;          // value uses ID (per spec)
    opt.textContent = p.name;  // visible label uses product name
    selectEl.appendChild(opt);
});

// Limit install date to today or earlier
const installDate = document.querySelector("#installDate");
if (installDate) {
    const today = new Date().toISOString().split("T")[0];
    installDate.max = today;
}

// Footer "last modified"
document.querySelector("#lastmod").textContent = new Date(document.lastModified).toLocaleString();

// Basic client hint if user submits with missing fields
document.querySelector("#reviewForm").addEventListener("submit", (e) => {
    // Let the browser’s built-in validation run; if invalid, prevent
    if (!e.target.checkValidity()) {
        e.preventDefault();
    }
});
