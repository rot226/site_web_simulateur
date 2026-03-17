// Navigation behaviour: active link, mobile toggle and keyboard accessibility
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const normalizePath = path => {
        if (!path) {
            return '/';
        }

        let normalizedPath = path;

        normalizedPath = normalizedPath.replace(/\.html$/i, '');
        normalizedPath = normalizedPath.replace(/\/index$/i, '');

        if (normalizedPath.length > 1) {
            normalizedPath = normalizedPath.replace(/\/+$/, '');
        }

        return normalizedPath || '/';
    };

    const currentPath = normalizePath(window.location.pathname);

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (!href || href.startsWith('#')) {
            return;
        }

        const normalizedHref = normalizePath(new URL(href, window.location.href).pathname);

        if (currentPath === normalizedHref) {
            link.classList.add('active');
        }
    });

    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');

    if (!navToggle || !nav) {
        return;
    }

    const setMenuState = isOpen => {
        nav.classList.toggle('is-open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation');
    };

    setMenuState(false);

    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        setMenuState(!isOpen);
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.matchMedia('(max-width: 768px)').matches) {
                setMenuState(false);
            }
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            setMenuState(false);
            navToggle.focus();
        }
    });
});
