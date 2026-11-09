// Menu mobile, formulário → WhatsApp e eventos de mensuração (dataLayer / GA4 via GTM).
(function () {
  var dl = (window.dataLayer = window.dataLayer || []);
  var track = function (event, params) { dl.push(Object.assign({ event: event }, params || {})); };
  var category = document.body.getAttribute('data-category');

  // Menu mobile
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('menu');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  // category_view / acabamento_view
  if (category) {
    track('category_view', { category: category });
    if (category === 'acabamento') track('acabamento_view');
  }

  // whatsapp_click / phone_click / map_click
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-track]');
    if (!a) return;
    var type = a.getAttribute('data-track');
    var params = { link_url: a.href, page_category: category || 'institucional' };
    if (type === 'whatsapp') track('whatsapp_click', Object.assign(params, { cta_location: a.getAttribute('data-wa-context') || '' }));
    else if (type === 'phone') track('phone_click', params);
    else if (type === 'map') track('map_click', params);
  });

  // ---------- Movimento 3D ----------
  // Muro de categorias: assenta as fiadas quando ele entra na tela
  var wall = document.querySelector('.wall');
  if (wall) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { wall.classList.add('is-visible'); io.disconnect(); } });
      }, { threshold: 0.2 });
      io.observe(wall);
    } else { wall.classList.add('is-visible'); }
  }
  // Foto da fachada inclina levemente acompanhando o mouse (só com mouse, sem movimento reduzido)
  var heroMedia = document.querySelector('.hero__media');
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var calmo = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroMedia && finePointer && !calmo) {
    var img = heroMedia.querySelector('img'), raf = 0;
    heroMedia.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var r = heroMedia.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        img.style.setProperty('--ry', (x * 8).toFixed(2) + 'deg');
        img.style.setProperty('--rx', (-y * 6).toFixed(2) + 'deg');
      });
    });
    heroMedia.addEventListener('pointerleave', function () { img.style.setProperty('--ry', '0deg'); img.style.setProperty('--rx', '0deg'); });
  }

  // ---------- Fade out ao trocar de página ----------
  // Onde o navegador já faz a transição nativa (@view-transition no CSS), não faz nada.
  // Nos demais, esmaece a página por 220ms antes de seguir o link interno.
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('CSSViewTransitionRule' in window) && !reduz) {
    document.documentElement.classList.add('fade-js');
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;                                    // WhatsApp, mapa etc.
      if (url.pathname === location.pathname && url.search === location.search) return; // âncora na mesma página
      e.preventDefault();
      document.body.classList.add('saindo');
      setTimeout(function () { location.href = url.href; }, 220);
    });
    // Voltar pelo histórico (cache do navegador) não pode deixar a página invisível
    window.addEventListener('pageshow', function () { document.body.classList.remove('saindo'); });
  }

  // ---------- Minha lista de materiais ----------
  // Itens guardados no navegador (localStorage), agrupados por categoria, enviados numa única mensagem.
  var KEY = 'incona-lista-v1';
  var dialog = document.getElementById('lista');
  var statusEl = document.querySelector('[data-list-status]');
  var load = function () {
    try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && Array.isArray(s.items)) return s; } catch (e) {}
    return { items: [], extra: '' };
  };
  var state = load();
  var save = function () { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };
  var find = function (cat, name) { for (var i = 0; i < state.items.length; i++) { if (state.items[i].cat === cat && state.items[i].name === name) return i; } return -1; };
  var countText = function (n) { return n === 0 ? 'Sua lista está vazia' : n === 1 ? '1 item na sua lista' : n + ' itens na sua lista'; };
  var announce = function (msg) { if (!statusEl) return; statusEl.textContent = ''; setTimeout(function () { statusEl.textContent = msg; }, 50); };
  var el = function (tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  function syncPicks() {
    document.querySelectorAll('.pick').forEach(function (b) {
      var on = find(b.getAttribute('data-cat'), b.getAttribute('data-item')) > -1;
      b.setAttribute('aria-pressed', String(on));
      b.querySelector('.pick__state').textContent = on ? 'Na lista' : 'Adicionar';
    });
  }
  function syncCount() {
    var n = state.items.length;
    document.querySelectorAll('[data-list-count]').forEach(function (c) { c.textContent = n; c.hidden = n === 0; });
    document.querySelectorAll('[data-open-list]').forEach(function (b) { b.setAttribute('aria-label', 'Minha lista: ' + countText(n).toLowerCase()); });
  }
  function renderList() {
    if (!dialog) return;
    var groupsEl = dialog.querySelector('[data-list-groups]');
    var empty = dialog.querySelector('[data-list-empty]');
    var sendBtn = dialog.querySelector('[data-send-list]');
    var clearBtn = dialog.querySelector('[data-clear-list]');
    groupsEl.innerHTML = '';
    var hasAny = state.items.length > 0;
    empty.hidden = hasAny;
    clearBtn.hidden = !hasAny;
    sendBtn.disabled = !hasAny && !state.extra.trim();
    var cats = [];
    state.items.forEach(function (it) { if (cats.indexOf(it.cat) < 0) cats.push(it.cat); });
    cats.forEach(function (cat) {
      var g = el('section', 'list__group');
      g.appendChild(el('h3', null, cat));
      var ul = el('ul');
      state.items.forEach(function (it, idx) {
        if (it.cat !== cat) return;
        var li = el('li', 'list__item');
        var name = el('span', 'list__name', it.name);
        var qtyId = 'qtd-' + idx;
        var lab = el('label', 'sr-only', 'Quantidade de ' + it.name); lab.htmlFor = qtyId;
        var qty = el('input', 'list__qty'); qty.id = qtyId; qty.value = it.qty || ''; qty.placeholder = 'Qtd.'; qty.autocomplete = 'off';
        qty.addEventListener('input', function () { it.qty = qty.value; save(); });
        var rm = el('button', 'list__remove'); rm.type = 'button'; rm.setAttribute('aria-label', 'Remover ' + it.name);
        rm.innerHTML = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
        rm.addEventListener('click', function () {
          var pos = Array.prototype.indexOf.call(dialog.querySelectorAll('.list__remove'), rm);
          state.items.splice(find(it.cat, it.name), 1); save(); update();
          announce(it.name + ' removido. ' + countText(state.items.length) + '.');
          // Foco vai para o próximo item (ou anterior); com a lista vazia, para o botão de fechar
          var btns = dialog.querySelectorAll('.list__remove');
          (btns[Math.min(pos, btns.length - 1)] || dialog.querySelector('[data-close-list]')).focus();
        });
        li.append(name, lab, qty, rm);
        ul.appendChild(li);
      });
      g.appendChild(ul);
      groupsEl.appendChild(g);
    });
    var extra = dialog.querySelector('[data-list-extra]');
    if (document.activeElement !== extra) extra.value = state.extra || '';
  }
  function update() { syncPicks(); syncCount(); renderList(); }

  document.addEventListener('click', function (e) {
    var pick = e.target.closest('.pick');
    if (pick) {
      var cat = pick.getAttribute('data-cat'), name = pick.getAttribute('data-item');
      var i = find(cat, name);
      if (i > -1) { state.items.splice(i, 1); announce(name + ' removido. ' + countText(state.items.length) + '.'); }
      else { state.items.push({ cat: cat, name: name, qty: '' }); track('list_add', { item_name: name, item_category: cat }); announce(name + ' adicionado. ' + countText(state.items.length) + '.'); }
      save(); update();
      return;
    }
    if (e.target.closest('[data-open-list]') && dialog) {
      renderList();
      dialog.showModal();
      track('list_open', { items: state.items.length });
      return;
    }
    if (e.target.closest('[data-close-list]') && dialog) { dialog.close(); return; }
  });
  if (dialog) {
    // Clique no fundo escuro fecha a lista
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.querySelector('[data-list-extra]').addEventListener('input', function (e) { state.extra = e.target.value; save(); renderList(); });
    dialog.querySelector('[data-clear-list]').addEventListener('click', function () {
      if (!window.confirm('Remover todos os itens da sua lista?')) return;
      state = { items: [], extra: '' }; save(); update();
      announce('Lista limpa.');
      dialog.querySelector('[data-close-list]').focus();
    });
    dialog.querySelector('[data-send-list]').addEventListener('click', function () {
      var lines = ['Olá! Vim pelo site da Incona e gostaria de um orçamento para esta lista:'];
      var cats = [];
      state.items.forEach(function (it) { if (cats.indexOf(it.cat) < 0) cats.push(it.cat); });
      cats.forEach(function (cat) {
        lines.push('', '*' + cat + '*');
        state.items.forEach(function (it) { if (it.cat === cat) lines.push('- ' + it.name + (it.qty && it.qty.trim() ? ': ' + it.qty.trim() : '')); });
      });
      if (state.extra && state.extra.trim()) lines.push('', '*Outros itens / observações*', state.extra.trim());
      track('list_send', { items: state.items.length });
      track('whatsapp_click', { cta_location: 'lista', page_category: category || 'institucional' });
      window.open('https://wa.me/' + document.body.getAttribute('data-wa') + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  }
  // Mantém abas abertas sincronizadas
  window.addEventListener('storage', function (e) { if (e.key === KEY) { state = load(); update(); } });
  update();

  // Formulário de contato → abre WhatsApp com a mensagem e dispara form_submit
  var form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form__status');
      var ok = true;
      ['nome', 'mensagem'].forEach(function (n) {
        var f = form.elements[n];
        var bad = !f.value.trim();
        f.setAttribute('aria-invalid', String(bad));
        if (bad) ok = false;
      });
      if (!ok) { status.textContent = 'Preencha seu nome e a mensagem.'; return; }
      var v = function (n) { return form.elements[n].value.trim(); };
      var text = 'Olá! Vim pelo site da Incona.\n' +
        'Nome: ' + v('nome') + '\n' +
        (v('telefone') ? 'Telefone: ' + v('telefone') + '\n' : '') +
        'Assunto: ' + v('assunto') + '\n\n' + v('mensagem');
      track('form_submit', { form_subject: v('assunto') });
      window.open('https://wa.me/' + document.body.getAttribute('data-wa') + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      status.textContent = 'Mensagem pronta! Conclua o envio no WhatsApp.';
      form.reset();
    });
  }
})();
