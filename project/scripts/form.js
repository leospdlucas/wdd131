//  Product data (provided)
const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 },
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
