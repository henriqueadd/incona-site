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
    var img = heroMedia.querySelector('video, img'), raf = 0;
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
