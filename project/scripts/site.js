// Show the document's last updated date in the footer
const el = document.getElementById('lm');
if (el) el.textContent = `Last updated: ${document.lastModified}`;
