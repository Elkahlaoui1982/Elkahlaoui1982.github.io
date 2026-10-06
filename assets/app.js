(() => {
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-mobile-nav]');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      nav.toggleAttribute('data-open', !open);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      nav.removeAttribute('data-open');
    }));
  }

  const search = document.getElementById('finding-search');
  if (search) {
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) {
      search.value = q;
      search.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
})();
