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
  const platform = document.getElementById('platform-filter');
  const year = document.getElementById('year-filter');
  const reset = document.getElementById('reset-filters');
  const rows = [...document.querySelectorAll('[data-finding]')];
  const empty = document.getElementById('findings-empty');
  const count = document.getElementById('findings-count');

  function applyFilters() {
    if (!rows.length) return;
    const q = (search?.value || '').trim().toLowerCase();
    const platformValue = platform?.value || 'all';
    const yearValue = year?.value || 'all';
    let visible = 0;
    rows.forEach((row) => {
      const matchesSearch = !q || row.dataset.title.includes(q) || row.dataset.program.includes(q);
      const matchesPlatform = platformValue === 'all' || row.dataset.platform === platformValue;
      const matchesYear = yearValue === 'all' || row.dataset.year === yearValue;
      const show = matchesSearch && matchesPlatform && matchesYear;
      row.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
    if (count) count.textContent = `${visible} finding${visible === 1 ? '' : 's'}`;
  }

  [search, platform, year].forEach((control) => control?.addEventListener('input', applyFilters));
  reset?.addEventListener('click', () => {
    if (search) search.value = '';
    if (platform) platform.value = 'all';
    if (year) year.value = 'all';
    applyFilters();
    search?.focus();
  });
})();
