// Navigation behaviour: active link, mobile toggle and keyboard accessibility
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');

    const normalizePath = path => {
        if (!path) {
            return '/';
        }

        let normalizedPath = path.trim();

        if (!normalizedPath.startsWith('/')) {
            normalizedPath = `/${normalizedPath}`;
        }

        normalizedPath = normalizedPath.replace(/\/+$/, '');

        if (normalizedPath === '') {
            normalizedPath = '/';
        }

        normalizedPath = normalizedPath.replace(/\/index\.html$/i, '/');
        normalizedPath = normalizedPath.replace(/\.html$/i, '');

        if (normalizedPath.length > 1) {
            normalizedPath = normalizedPath.replace(/\/+$/, '');
        }

        return normalizedPath || '/';
    };

    const isHomePath = path => path === '/';
    const isHowToPath = path => path === '/howto' || path.startsWith('/howto/');

    const currentPath = normalizePath(window.location.pathname);

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (!href || href.startsWith('#')) {
            return;
        }

        const normalizedHref = normalizePath(new URL(href, window.location.href).pathname);

        const shouldActivate =
            currentPath === normalizedHref ||
            (isHomePath(currentPath) && isHomePath(normalizedHref)) ||
            (isHowToPath(currentPath) && normalizedHref === '/howto');

        if (shouldActivate) {
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
        navToggle.setAttribute('aria-label', isOpen ? 'Masquer le menu principal' : 'Afficher le menu principal');
    };

    setMenuState(false);

    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        setMenuState(!isOpen);
    });


    const viewportQuery = window.matchMedia('(max-width: 768px)');

    const closeMenuOnDesktop = event => {
        if (!event.matches) {
            setMenuState(false);
        }
    };

    if (typeof viewportQuery.addEventListener === 'function') {
        viewportQuery.addEventListener('change', closeMenuOnDesktop);
    } else if (typeof viewportQuery.addListener === 'function') {
        viewportQuery.addListener(closeMenuOnDesktop);
    }

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (viewportQuery.matches) {
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
