(function() {
  'use strict';

  // --- State ---
  let state = {
    documents: [],
    page: 1,
    totalPages: 1,
    total: 0,
    type: '',
    year: '',
    sort: 'desc',
    search: '',
    loading: false
  };

  // --- DOM refs ---
  const els = {
    documents: document.getElementById('documents'),
    loading: document.getElementById('loading'),
    noResults: document.getElementById('no-results'),
    pagination: document.getElementById('pagination'),
    statsText: document.getElementById('stats-text'),
    filters: document.getElementById('filters'),
    searchInput: document.getElementById('search-input'),
    sortSelect: document.getElementById('sort-select'),
    yearSelect: document.getElementById('year-select'),
    subscribeForm: document.getElementById('subscribe-form'),
    subscribeEmail: document.getElementById('subscribe-email'),
    subscribeFrequency: document.getElementById('subscribe-frequency'),
    subscribeMessage: document.getElementById('subscribe-message'),
    themeToggle: document.getElementById('theme-toggle'),
    toast: document.getElementById('toast')
  };

  // --- Theme ---
  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      els.themeToggle.textContent = '\u2600'; // sun
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      els.themeToggle.textContent = '\u263E'; // moon
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      els.themeToggle.textContent = '\u2600'; // sun
    }
  }

  // --- API ---
  async function fetchDocuments() {
    state.loading = true;
    render();

    const params = new URLSearchParams({
      page: state.page,
      limit: 20
    });
    if (state.type) params.set('type', state.type);
    if (state.year) params.set('year', state.year);

    try {
      const res = await fetch('/api/documents?' + params.toString());
      const data = await res.json();

      state.documents = data.documents || [];
      state.total = data.total || 0;
      state.totalPages = data.totalPages || 1;
    } catch (err) {
      console.error('Fel vid hämtning:', err);
      state.documents = [];
    }

    state.loading = false;
    render();
  }

  async function fetchStats() {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();

      let text = `${data.totalDocuments} dokument hämtade`;
      if (data.lastUpdate) {
        const d = new Date(data.lastUpdate);
        text += ` \u2022 Senast uppdaterad: ${d.toLocaleDateString('sv-SE')} ${d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}`;
      }
      els.statsText.textContent = text;
    } catch (err) {
      els.statsText.textContent = 'Kunde inte hämta statistik';
    }
  }

  async function subscribe(email, frequency) {
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, frequency })
      });
      const data = await res.json();

      if (res.ok) {
        showSubscribeMessage(data.message, 'success');
        els.subscribeEmail.value = '';
      } else {
        showSubscribeMessage(data.error || 'Något gick fel.', 'error');
      }
    } catch (err) {
      showSubscribeMessage('Kunde inte ansluta till servern.', 'error');
    }
  }

  // --- Rendering ---
  function render() {
    if (state.loading) {
      els.loading.style.display = '';
      els.documents.style.display = 'none';
      els.noResults.style.display = 'none';
      els.pagination.style.display = 'none';
      return;
    }

    els.loading.style.display = 'none';

    // Client-side search filter
    let docs = state.documents;
    if (state.search) {
      const q = state.search.toLowerCase();
      docs = docs.filter(d =>
        (d.title || '').toLowerCase().includes(q) ||
        (d.summary || '').toLowerCase().includes(q) ||
        (d.subtitle || '').toLowerCase().includes(q)
      );
    }

    // Client-side sort
    if (state.sort === 'asc') {
      docs = [...docs].sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    }
    // 'desc' is default from API

    if (docs.length === 0) {
      els.documents.style.display = 'none';
      els.noResults.style.display = '';
      els.pagination.style.display = 'none';
      return;
    }

    els.documents.style.display = '';
    els.noResults.style.display = 'none';
    els.pagination.style.display = '';

    els.documents.innerHTML = docs.map(renderCard).join('');
    renderPagination();
  }

  function renderCard(doc) {
    const typeClass = badgeClass(doc.type);
    const summary = doc.summary
      ? truncate(stripHtml(doc.summary), 140)
      : (doc.subtitle ? truncate(doc.subtitle, 140) : '');
    const party = doc.party ? `<span class="badge badge-party">${escapeHtml(doc.party)}</span>` : '';

    return `
      <article class="doc-card">
        <div class="doc-card-top">
          <span class="badge ${typeClass}">${escapeHtml(doc.type || 'Dokument')}</span>
          ${party}
          <span class="doc-date">${escapeHtml(doc.date || '')}</span>
        </div>
        <h3 class="doc-title">${escapeHtml(doc.title)}</h3>
        ${summary ? `<p class="doc-summary">${escapeHtml(summary)}</p>` : ''}
        <a class="doc-link" href="${escapeHtml(doc.url)}" target="_blank" rel="noopener">Läs mer på riksdagen.se &#x2197;</a>
      </article>`;
  }

  function renderPagination() {
    if (state.totalPages <= 1) {
      els.pagination.innerHTML = '';
      return;
    }

    let html = '';

    // Previous button
    html += `<button class="page-btn" ${state.page <= 1 ? 'disabled' : ''} data-page="${state.page - 1}">&laquo; Föregående</button>`;

    // Page numbers (show max 7)
    const maxVisible = 7;
    let start = Math.max(1, state.page - Math.floor(maxVisible / 2));
    let end = Math.min(state.totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      html += `<button class="page-btn" data-page="1">1</button>`;
      if (start > 2) html += `<span class="page-info">...</span>`;
    }

    for (let i = start; i <= end; i++) {
      html += `<button class="page-btn ${i === state.page ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }

    if (end < state.totalPages) {
      if (end < state.totalPages - 1) html += `<span class="page-info">...</span>`;
      html += `<button class="page-btn" data-page="${state.totalPages}">${state.totalPages}</button>`;
    }

    // Next button
    html += `<button class="page-btn" ${state.page >= state.totalPages ? 'disabled' : ''} data-page="${state.page + 1}">Nästa &raquo;</button>`;

    els.pagination.innerHTML = html;
  }

  // --- Helpers ---
  function badgeClass(type) {
    if (!type) return 'badge-dokument';
    const t = type.toLowerCase()
      .replace('ä', 'a')
      .replace('å', 'a');
    return 'badge-' + t;
  }

  function truncate(str, max) {
    if (!str || str.length <= max) return str || '';
    return str.substring(0, max).trim() + '...';
  }

  function stripHtml(str) {
    return str.replace(/<[^>]*>/g, '');
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showSubscribeMessage(msg, type) {
    els.subscribeMessage.textContent = msg;
    els.subscribeMessage.className = 'subscribe-message ' + type;
  }

  function showToast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add('show');
    setTimeout(() => els.toast.classList.remove('show'), 3000);
  }

  function populateYearSelect() {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= currentYear - 10; y--) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = `${y}/${String(y + 1).slice(-2)}`;
      els.yearSelect.appendChild(opt);
    }
  }

  // --- Event Listeners ---
  function initEvents() {
    // Filter buttons
    els.filters.addEventListener('click', (e) => {
      if (!e.target.classList.contains('filter-btn')) return;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      state.type = e.target.dataset.type || '';
      state.page = 1;
      fetchDocuments();
    });

    // Search
    let searchTimeout;
    els.searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        state.search = els.searchInput.value.trim();
        render();
      }, 250);
    });

    // Sort
    els.sortSelect.addEventListener('change', () => {
      state.sort = els.sortSelect.value;
      render();
    });

    // Year filter
    els.yearSelect.addEventListener('change', () => {
      state.year = els.yearSelect.value;
      state.page = 1;
      fetchDocuments();
    });

    // Pagination
    els.pagination.addEventListener('click', (e) => {
      const btn = e.target.closest('.page-btn');
      if (!btn || btn.disabled) return;
      state.page = parseInt(btn.dataset.page, 10);
      fetchDocuments();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Subscribe form
    els.subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = els.subscribeEmail.value.trim();
      const frequency = els.subscribeFrequency.value;
      if (!email) return;
      subscribe(email, frequency);
    });

    // Theme toggle
    els.themeToggle.addEventListener('click', toggleTheme);
  }

  // --- URL params handling ---
  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('confirmed') === '1') {
      showToast('Din prenumeration har bekräftats!');
      window.history.replaceState({}, '', '/');
    } else if (params.get('confirmed') === '0') {
      showToast('Ogiltig bekräftelselänk.');
      window.history.replaceState({}, '', '/');
    } else if (params.get('unsubscribed') === '1') {
      showToast('Du har avprenumererats.');
      window.history.replaceState({}, '', '/');
    }
  }

  // --- Init ---
  function init() {
    initTheme();
    populateYearSelect();
    initEvents();
    checkUrlParams();
    fetchStats();
    fetchDocuments();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
