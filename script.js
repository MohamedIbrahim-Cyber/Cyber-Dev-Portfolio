document.addEventListener("DOMContentLoaded", () => {
    initThemeEngine();
    initMobileNav();
});
function initThemeEngine(){
    const toggleBtn = document.getElementById("theme-btn");
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

    root.setAttribute('data-theme', savedTheme);

    if(toggleBtn){
        toggleBtn.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        })
    }

}

function initMobileNav() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const drawer = document.getElementById("mobile-drawer");
    const iconMenu = menuBtn ? menuBtn.querySelector(".icon-menu") : null;
    const iconClose = menuBtn ? menuBtn.querySelector(".icon-close") : null;
    const mobileLinks = document.querySelectorAll(".mobile-nav-link, .mobile-drawer .btn-full");

    if (!menuBtn || !drawer) return;

    menuBtn.setAttribute("aria-expanded", "false");

    const closeDrawer = () => {
        drawer.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        if (iconMenu && iconClose) {
            iconMenu.style.display = "block";
            iconClose.style.display = "none";
        }
    };

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = drawer.classList.toggle("is-open");
        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        
        // Swap hamburger and close (X) icons
        if (iconMenu && iconClose) {
            iconMenu.style.display = isOpen ? "none" : "block";
            iconClose.style.display = isOpen ? "block" : "none";
        }
    });

    // Close the drawer automatically when any link is tapped
    mobileLinks.forEach(link => {
        link.addEventListener("click", closeDrawer);
    });

    // Close when clicking outside drawer
    document.addEventListener("click", (e) => {
        if (drawer.classList.contains("is-open") && !drawer.contains(e.target) && !menuBtn.contains(e.target)) {
            closeDrawer();
        }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && drawer.classList.contains("is-open")) {
            closeDrawer();
            menuBtn.focus();
        }
    });
}