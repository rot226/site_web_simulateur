// Simple script to add 'active' class to the current navigation link
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Check if current page ends with the link's href (handles subdirectories)
        if (currentPath.endsWith(href)) {
            link.classList.add('active');
        }
    });
});