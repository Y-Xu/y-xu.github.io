document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('nav-overlay');

    var emailUser = "xuyangcs";
    var emailDomain = "ustc.edu.cn";
    var emailParts = [emailUser, emailDomain];
    var emailAddress = emailParts.join('@');
    function displayEmail() {
        document.getElementById('em1').innerHTML = 'Email: ' + emailAddress;
        document.getElementById('em2').innerHTML = '© 2024 Yang Xu - All Rights Reserved |<a href="mailto:' + emailAddress + '">Contact Me</a>';
    }
    
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        
        if (!navLinks.classList.contains('active')) {
            // Opening menu
            overlay.style.display = 'block';
            // Force browser reflow
            overlay.offsetHeight;
            overlay.classList.add('active');
            navLinks.classList.add('active');
        } else {
            // Closing menu
            overlay.classList.remove('active');
            navLinks.classList.remove('active');
            // Wait for transition to finish before hiding
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300); // Match transition duration
        }
        
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Toggle menu when hamburger is clicked
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when overlay is clicked
    overlay.addEventListener('click', () => {
        toggleMenu();
    });

    // Close menu when clicking nav links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });
});
