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
