// Footer dynamic values
const yearEl = document.getElementById('year');
const lastModEl = document.getElementById('lastModified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = document.lastModified;


// Hamburger toggle (mobile)
const hamburgerBtn = document.getElementById('hamburger');
const nav = document.getElementById('primary-nav');


function setHamburgerState(open) {
    nav.classList.toggle('open', open);
    hamburgerBtn.setAttribute('aria-expanded', String(open));
    hamburgerBtn.ariaLabel = open ? 'Close navigation' : 'Open navigation';
    hamburgerBtn.textContent = open ? '✕' : '☰';
}


if (hamburgerBtn && nav) {
    let isOpen = false;
    hamburgerBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        setHamburgerState(isOpen);
    });


    // Close the menu when a link is clicked (mobile UX)
    nav.addEventListener('click', (evt) => {
        const link = evt.target.closest('a');
        if (!link) return;
        if (window.matchMedia('(max-width: 47.99rem)').matches && isOpen) {
            isOpen = false;
            setHamburgerState(false);
        }
    });


    // Ensure correct state on resize transitions
    const mq = window.matchMedia('(min-width: 48rem)');
    mq.addEventListener('change', (e) => {
        if (e.matches) {
            // Large view: keep nav shown, hamburger hidden
            setHamburgerState(true);
        } else {
            // Back to mobile: start closed
            setHamburgerState(false);
        }
    });
}
