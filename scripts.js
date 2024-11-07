document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    function toggleMenu() {
        navLinks.classList.toggle('menu-open');
        menuToggle.classList.toggle('menu-open');
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('menu-open')) {
            toggleMenu();
        }
    });
});
