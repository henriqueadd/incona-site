// Gera o site estático a partir de src/content.js.  Uso: node build.js
const fs = require('fs');
const path = require('path');
const { site, photos, categories, brands, home, about, contact, redirects } = require('./src/content');

const OUT = path.join(__dirname, 'docs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const wa = (msg) => `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(msg)}`;
const DEFAULT_MSG = 'Olá! Vim pelo site da Incona e gostaria de pedir um orçamento.';

const ICONS = {
  "obj-ferramentas": '<path d="M14.5 3.5l6 6-2.5 2.5-2-2-2.2 2.2-3.8-3.8 2.2-2.2-2-2z"/><path d="M10.6 8.4L3.4 15.6a1.5 1.5 0 0 0 0 2.1l2.9 2.9a1.5 1.5 0 0 0 2.1 0l7.2-7.2"/>',
  "obj-jardinagem": '<path d="M6.5 14h11l-1.6 7H8.1z"/><path d="M12 14V8.5"/><path d="M12 10.5C12 7 9.8 5 5.5 5c0 3.4 2.3 5.5 6.5 5.5z"/><path d="M12 8.5C12 5 14.2 3 18.5 3c0 3.4-2.3 5.5-6.5 5.5z"/>',
  "obj-utilidades-domesticas": '<circle cx="9.5" cy="14" r="6.5"/><path d="M16 14h6"/><path d="M7 3.5c0 1 1 1.2 1 2.2S7 7 7 8M11 3.5c0 1 1 1.2 1 2.2S11 7 11 8"/>',
  "obj-pintura": '<rect x="3" y="3" width="15" height="6" rx="1.5"/><path d="M18 6h2.5v5.5h-8.5V14"/><rect x="10" y="14" width="4" height="7.5" rx="1"/>',
  "obj-eletrica": '<path d="M9 18h6M10 21.5h4"/><path d="M12 2.5a6.5 6.5 0 0 0-4.3 11.4c.8.7 1.3 1.6 1.3 2.6V17h6v-.5c0-1 .5-1.9 1.3-2.6A6.5 6.5 0 0 0 12 2.5z"/><path d="M12 7l-1.5 3h3L12 13"/>',
  "obj-acabamento": '<path d="M3 13.5h18v1.5a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M12 13.5V7a3 3 0 0 1 3-3h2.5v3"/><path d="M8.5 9.5h3.5"/><path d="M17.5 9v1"/>',
  "obj-hidraulica": '<path d="M3 6.5h8a7 7 0 0 1 7 7v8"/><path d="M3 12h7.5a2 2 0 0 1 2 2v7.5"/><path d="M3 4.5v9.5M10.5 21.5h9.5"/>',
  "obj-basico": '<rect x="2.5" y="4" width="19" height="16"/><path d="M2.5 9.3h19M2.5 14.7h19M9 4v5.3M16 4v5.3M5.5 9.3v5.4M12.5 9.3v5.4M18.5 9.3v5.4M9 14.7V20M16 14.7V20"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  leaf: '<path d="M5 21c0-9 6-15 15-16-1 9-7 15-15 16z"/><path d="M5 21l8-8"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  brush: '<rect x="3" y="3" width="14" height="6" rx="1"/><path d="M17 6h3v5h-8v3"/><rect x="10" y="14" width="4" height="7" rx="1"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  tiles: '<rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/>',
  drop: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
  brick: '<rect x="2" y="5" width="20" height="14"/><path d="M2 12h20M8 5v7M16 5v7M12 12v7"/>',
  whatsapp: '<path d="M20.5 3.5A11 11 0 0 0 3.2 17.3L2 22l4.8-1.2A11 11 0 0 0 20.5 3.5zM12 20.1a9 9 0 0 1-4.6-1.3l-.3-.2-2.9.8.8-2.8-.2-.3A9 9 0 1 1 12 20.1zm5-6.7c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1l-.9 1.1c-.2.2-.3.2-.6.1a7.4 7.4 0 0 1-3.7-3.2c-.3-.5.3-.4.8-1.4.1-.2 0-.3 0-.5l-.9-2c-.2-.5-.5-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z" fill="currentColor" stroke="none"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  factory: '<path d="M3 21V10l6 4V10l6 4V6h6v15z"/>',
  truck: '<path d="M1 6h13v10H1zM14 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  list: '<rect x="5" y="4" width="14" height="17" rx="1"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h4"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"/>',
};
const icon = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

// Links relativos para funcionar em qualquer subcaminho (GitHub Pages).
const rel = (depth) => (depth ? '../'.repeat(depth) : './');
const href = (depth, slug) => (slug ? `${rel(depth)}${slug}/` : rel(depth));

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'HardwareStore',
  '@id': `${site.baseUrl}/#loja`,
  name: site.name,
  url: `${site.baseUrl}/`,
  logo: site.logo,
  image: photos.fachada.src,
  telephone: `+${site.whatsapp.number}`,
  address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.state, addressCountry: 'BR' },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '17:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '07:00', closes: '13:00' },
  ],
  areaServed: 'Cotia e região',
  sameAs: [site.instagram, site.facebook],
};

function layout({ depth, slug, title, description, body, active, bodyAttrs = '', extraLd = [], image }) {
  const canonical = `${site.baseUrl}/${slug ? slug + '/' : ''}`;
  const r = rel(depth);
  const nav = [
    { slug: '', label: 'Home' },
    ...categories.map((c) => ({ slug: c.slug, label: c.menu })),
    { slug: about.slug, label: 'Sobre Nós' },
    { slug: contact.slug, label: 'Fale Conosco' },
  ];
  const gtmHead = site.gtmId
    ? `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');</script>`
    : '<!-- Google Tag Manager: preencher site.gtmId em src/content.js -->';
  const ld = [localBusiness, ...extraLd].map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Incona">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image || photos.fachada.src}">
<meta name="theme-color" content="#00416b">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}assets/style.css">
<script>window.dataLayer=window.dataLayer||[];</script>
${gtmHead}
${ld}
</head>
<body${bodyAttrs} data-wa="${site.whatsapp.number}">
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<div class="topbar">
  <div class="wrap topbar__in">
    <span>${icon('pin')} ${esc(site.address.full)}</span>
    <span class="topbar__right">
      <a href="${wa(DEFAULT_MSG)}" target="_blank" rel="noopener" data-track="whatsapp" data-wa-context="topbar">${icon('whatsapp')} ${site.whatsapp.label}</a>
    </span>
  </div>
</div>
<header class="header">
  <div class="wrap header__in">
    <a class="logo" href="${href(depth, '')}" aria-label="Incona – página inicial"><img src="${site.logo}" alt="Incona Materiais para Construção" width="150" height="58"></a>
    <a class="btn btn--wa header__cta" href="${wa(DEFAULT_MSG)}" target="_blank" rel="noopener" data-track="whatsapp" data-wa-context="header">${icon('whatsapp')} Pedir orçamento</a>
    <button class="list-btn" type="button" data-open-list aria-haspopup="dialog">${icon('list')}<span>Minha lista</span><span class="list-btn__count" data-list-count hidden>0</span></button>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu">${icon('menu')}<span>Menu</span></button>
  </div>
  <nav class="nav" id="menu" aria-label="Menu principal">
    <ul class="wrap nav__list">
      ${nav.map((n) => `<li><a href="${href(depth, n.slug)}"${active === n.slug ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('\n      ')}
    </ul>
  </nav>
</header>
<main id="conteudo">
${body}
</main>
<footer class="footer">
  <div class="wrap footer__grid">
    <div>
      <img class="footer__logo" src="${site.logo}" alt="Incona" width="130" height="50" loading="lazy">
      <p>${esc(site.tagline)}</p>
      <p class="footer__social">
        <a href="${site.instagram}" target="_blank" rel="noopener" aria-label="Instagram da Incona">${icon('instagram')}</a>
        <a href="${site.facebook}" target="_blank" rel="noopener" aria-label="Facebook da Incona">${icon('facebook')}</a>
      </p>
    </div>
    <div>
      <h2 class="footer__h">Categorias</h2>
      <ul>${categories.map((c) => `<li><a href="${href(depth, c.slug)}">${c.menu}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="footer__h">Atendimento</h2>
      <ul>
        <li><a href="${wa(DEFAULT_MSG)}" target="_blank" rel="noopener" data-track="whatsapp" data-wa-context="footer">${icon('whatsapp')} ${site.whatsapp.label}</a></li>
        ${site.hours.map((h) => `<li>${icon('clock')} ${h.days}: ${h.time}</li>`).join('')}
      </ul>
    </div>
    <div>
      <h2 class="footer__h">Visite a loja</h2>
      <p>${icon('pin')} ${esc(site.address.full)}</p>
      <p><a class="link-arrow" href="${site.mapsUrl}" target="_blank" rel="noopener" data-track="map">Como chegar</a></p>
      <p><a href="${href(depth, about.slug)}">Sobre Nós</a> · <a href="${href(depth, contact.slug)}">Fale Conosco</a></p>
    </div>
  </div>
  <div class="footer__copy wrap">© ${new Date().getFullYear()} ${site.name}. Todos os direitos reservados.</div>
</footer>
<dialog class="list" id="lista" aria-labelledby="lista-titulo">
  <div class="list__head">
    <h2 id="lista-titulo">Minha lista de materiais</h2>
    <button type="button" class="list__close" data-close-list aria-label="Fechar lista">${icon('close')}</button>
  </div>
  <div class="list__body">
    <div class="list__empty" data-list-empty>
      <p>Sua lista está vazia.</p>
      <p>Abra uma categoria e toque nos produtos que você precisa. Eles ficam guardados aqui, mesmo se você trocar de página.</p>
      <ul class="list__cats">${categories.map((c) => `<li><a href="${href(depth, c.slug)}">${c.menu}</a></li>`).join('')}</ul>
    </div>
    <div class="list__groups" data-list-groups></div>
    <label class="list__extra">Outros itens ou observações
      <textarea rows="3" data-list-extra placeholder="Ex.: 3 m³ de areia média, entrega na sexta"></textarea>
    </label>
  </div>
  <div class="list__foot">
    <button type="button" class="btn btn--wa btn--lg" data-send-list>${icon('whatsapp')} Enviar lista pelo WhatsApp</button>
    <button type="button" class="btn btn--ghost" data-clear-list>Limpar lista</button>
    <p class="list__note">A equipe da Incona confirma disponibilidade e valores pelo WhatsApp.</p>
  </div>
</dialog>
<p class="sr-only" role="status" aria-live="polite" data-list-status></p>
<a class="wa-float" href="${wa(DEFAULT_MSG)}" target="_blank" rel="noopener" data-track="whatsapp" data-wa-context="flutuante" aria-label="Falar com a Incona pelo WhatsApp">${icon('whatsapp')}</a>
<script src="${r}assets/main.js" defer></script>
</body>
</html>
`;
}

const ctaBand = (title, text, cta, msg, extra = '') => `
<section class="cta-band">
  <div class="wrap cta-band__in">
    <div>
      <h2>${esc(title)}</h2>
      <p>${esc(text)}</p>
    </div>
    <div class="cta-band__actions">
      <a class="btn btn--wa btn--lg" href="${wa(msg)}" target="_blank" rel="noopener" data-track="whatsapp" data-wa-context="cta">${icon('whatsapp')} ${esc(cta)}</a>
      ${extra}
    </div>
  </div>
</section>`;

// ---------- HOME ----------
function buildHome() {
  const d = 0;
  const diffs = [
    { icon: 'user', t: 'Aqui, cliente tem nome', p: 'Atendimento próximo para quem chega com uma lista pronta e para quem precisa de ajuda para entender o que vem na próxima etapa da obra.' },
    { icon: 'layers', t: 'Do alicerce ao acabamento', p: 'Materiais para diferentes fases da construção e da reforma em um mesmo lugar.' },
    { icon: 'factory', t: 'Qualidade que vem de fábrica', p: 'Os blocos comercializados pela Incona são fabricados pela Concretblocos, empresa do mesmo grupo, seguindo a prova técnica definida pela operação.' },
    { icon: 'truck', t: 'Entrega na região', p: 'Consulte prazo e condições especiais de entrega com nossa equipe.' },
  ];
  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
  // Muro em amarração: de cima (acabamento) para baixo (alicerce). Ordem = etapas da obra.
  const courses = [
    ['utilidades-domesticas', 'jardinagem'],
    ['pintura', 'acabamento'],
    ['eletrica', 'ferramentas'],
    ['hidraulica', 'basico'],
  ];
  const block = (c) => `<a class="block" href="${href(d, c.slug)}" data-category-link="${c.slug}" style="--block-bg:${c.color};--block-ink:${c.ink}">${icon(c.object, 'block__obj')}<span class="block__name">${c.menu}</span><span class="block__desc">${esc(c.summary)}</span></a>`;
  const half = '<span class="block block--half" aria-hidden="true"></span>';
  const body = `
<section class="hero">
  <div class="hero__in">
    <div class="hero__text">
      <h1>Material de construção em Cotia, do alicerce ao acabamento.</h1>
      <p class="hero__lead">Aqui, cliente tem nome.</p>
      <p>Na Incona você encontra materiais para construir, reformar e finalizar sua obra, com variedade, atendimento próximo e uma equipe pronta para ajudar em cada etapa.</p>
      <div class="hero__actions">
        <a class="btn btn--wa btn--lg" href="${wa(DEFAULT_MSG)}" target="_blank" rel="noopener" data-track="whatsapp" data-wa-context="hero">${icon('whatsapp')} Pedir orçamento pelo WhatsApp</a>
        <a class="btn btn--ghost btn--lg" href="#categorias">Conhecer nossos produtos</a>
      </div>
    </div>
    <figure class="hero__media">
      <img src="${photos.fachadaHero.src}" alt="${esc(photos.fachadaHero.alt)}" width="${photos.fachadaHero.w}" height="${photos.fachadaHero.h}" fetchpriority="high">
    </figure>
  </div>
</section>

<section class="section" id="categorias">
  <div class="wrap">
    <h2 class="section__title">Tudo o que sua obra precisa, em um só lugar</h2>
    <div class="wall-wrap">
      <ol class="stages" aria-hidden="true"><li>Acabamento</li><li>Alicerce</li></ol>
      <div class="wall">
        ${courses.map((row, i) => `<div class="course" style="--i:${courses.length - 1 - i}">${i % 2 ? half + row.map((s) => block(bySlug[s])).join('') : row.map((s) => block(bySlug[s])).join('') + half}</div>`).join('\n        ')}
      </div>
    </div>
  </div>
</section>

<section class="section section--concrete">
  <div class="wrap split">
    <div class="split__media">
      <img src="${photos.tijolos.src}" alt="${esc(photos.tijolos.alt)}" width="750" height="516" loading="lazy">
    </div>
    <div>
      <h2 class="section__title">Você pode começar a obra aqui. E terminar aqui também.</h2>
      <p>Muita gente conheceu a Incona pelos blocos, areia e cimento. Mas hoje tem muito mais por aqui.</p>
      <p>Ferramentas, elétrica, hidráulica, pintura, jardinagem, utilidades domésticas, acabamento e todo o material básico que acompanha sua obra desde o começo.</p>
      <p class="signature">Do alicerce ao acabamento, sempre ao seu lado.</p>
      <a class="btn btn--primary" href="${href(d, 'acabamento')}">Conheça a linha de acabamento</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2 class="section__title">Por que comprar na Incona?</h2>
    <div class="diff-grid">
      ${diffs.map((x) => `<div class="diff"><h3>${x.t}</h3><p>${x.p}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section section--concrete">
  <div class="wrap">
    <h2 class="section__title">Marcas que fazem parte da sua obra</h2>
    <p class="section__sub">A Incona trabalha com marcas e linhas para diferentes etapas da construção, reforma e manutenção.</p>
    <ul class="brands">${brands.map((b) => `
      <li class="brand${b.bg ? ' brand--filled' : ''}" style="--brand:${b.color}${b.bg ? `;--brand-bg:${b.bg}` : ''}">
        <span class="brand__logo"><img src="assets/marcas/${b.logo}" alt="Logo ${esc(b.name)}" width="${b.w}" height="${b.h}" loading="lazy"></span>
        <span class="brand__name">${esc(b.name)}</span>
        <span class="brand__line">${esc(b.line)}</span>
      </li>`).join('')}
    </ul>
  </div>
</section>

${ctaBand('Tem uma lista de materiais?', 'Envie pelo WhatsApp e nossa equipe consulta a disponibilidade para você. Do alicerce ao acabamento, sempre ao seu lado.', 'Enviar minha lista pelo WhatsApp', 'Olá! Vim pelo site e gostaria de enviar minha lista de materiais.', `<a class="btn btn--ghost-light btn--lg" href="${site.mapsUrl}" target="_blank" rel="noopener" data-track="map">${icon('pin')} Como chegar</a>`)}
`;
  return layout({ depth: d, slug: '', title: home.title, description: home.description, body, active: '' });
}

// ---------- CATEGORIA ----------
function buildCategory(c) {
  const d = 1;
  const anchors = c.sections.map((s) => ({ id: s.h2.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), ...s }));
  const gallery = c.gallery && c.gallery.length
    ? `<div class="gallery">${c.gallery.map((g) => `<figure><img src="${g.src}" alt="${esc(g.alt)}" loading="lazy" width="400" height="300"></figure>`).join('')}</div>`
    : '';
  const placeholders = (s) => `<div class="ph-row">${s.items.slice(0, 4).map((it) => `<div class="ph" role="img" aria-label="Foto de ${esc(it)} – imagem a ser fornecida pela Incona"><span>${icon(c.icon)}</span><small>${esc(it)}</small></div>`).join('')}</div>`;
  const others = categories.filter((o) => o.slug !== c.slug);
  const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Você está em"><a href="${href(d, '')}">Home</a> <span>/</span> <span aria-current="page">${c.menu}</span></nav>
    <div class="page-hero__in">
      <div>
        <h1>${esc(c.h1)}</h1>
        <p class="page-hero__lead">${esc(c.intro[0])}</p>
        ${c.intro.slice(1).map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
        <div class="hero__actions">
          <a class="btn btn--wa" href="${wa(c.whatsMsg)}" target="_blank" rel="noopener" data-track="whatsapp" data-wa-context="${c.slug}-topo">${icon('whatsapp')} ${esc(c.closing.cta)}</a>
        </div>
        <p class="list-hint">${icon('list')} Toque nos produtos abaixo para montar sua lista e envie tudo de uma vez pelo WhatsApp.</p>
      </div>
    </div>
    <ul class="subnav" aria-label="Subdivisões de ${esc(c.menu)}">${anchors.map((a) => `<li><a href="#${a.id}">${esc(a.h2)}</a></li>`).join('')}</ul>
  </div>
</section>

<div class="wrap">${gallery}</div>

<section class="section">
  <div class="wrap subs">
    ${anchors.map((s) => `
    <article class="sub" id="${s.id}">
      <div class="sub__text">
        <h2>${esc(s.h2)}</h2>
        <p class="sub__lead">${esc(s.lead)}</p>
        <p>${esc(s.text)}</p>
        <p class="pick-label" id="lista-${s.id}">Adicione à sua lista:</p>
        <ul class="chips" aria-labelledby="lista-${s.id}">${s.items.map((i) => `<li><button type="button" class="pick" aria-pressed="false" data-item="${esc(i)}" data-cat="${esc(`${s.h2} (${c.menu})`)}"><span class="pick__box" aria-hidden="true"></span><span class="pick__name">${esc(i)}</span><span class="pick__state">Adicionar</span></button></li>`).join('')}</ul>
        <a class="link-arrow" href="${wa(`${c.whatsMsg} Tenho interesse em: ${s.h2}.`)}" target="_blank" rel="noopener" data-track="whatsapp" data-wa-context="${c.slug}-${s.id}">Consultar ${esc(s.h2.toLowerCase())} pelo WhatsApp</a>
      </div>
      ${c.gallery ? '' : placeholders(s)}
    </article>`).join('')}
  </div>
</section>

${ctaBand(c.closing.title, c.closing.text, c.closing.cta, c.whatsMsg, `<a class="btn btn--ghost-light btn--lg" href="${site.mapsUrl}" target="_blank" rel="noopener" data-track="map">${icon('pin')} Como chegar</a>`)}

<section class="section">
  <div class="wrap">
    <h2 class="section__title">Veja também</h2>
    <ul class="other-cats">${others.map((o) => `<li><a href="${href(d, o.slug)}">${icon(o.icon)} ${o.menu}</a></li>`).join('')}</ul>
  </div>
</section>`;
  const crumbsLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.baseUrl}/` },
      { '@type': 'ListItem', position: 2, name: c.menu, item: `${site.baseUrl}/${c.slug}/` },
    ],
  };
  return layout({
    depth: d, slug: c.slug, title: c.title, description: c.description, body, active: c.slug,
    bodyAttrs: ` data-category="${c.slug}"`, extraLd: [crumbsLd], image: c.gallery ? c.gallery[0].src : undefined,
  });
}

// ---------- SOBRE ----------
function buildAbout() {
  const d = 1;
  const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Você está em"><a href="${href(d, '')}">Home</a> <span>/</span> <span aria-current="page">Sobre Nós</span></nav>
    <h1>Aqui, cliente tem nome.</h1>
    <p class="page-hero__lead">Há quase 20 anos, a Incona faz parte de obras e reformas de Cotia e região.</p>
  </div>
</section>
<section class="section">
  <div class="wrap split">
    <div class="prose">
      <p>Nossa história começou muito ligada aos materiais básicos. Com o tempo, a loja cresceu, ampliou sua variedade e passou a acompanhar muito mais etapas da construção e da reforma. Hoje, você encontra ferramentas, jardinagem, utilidades domésticas, pintura, elétrica, acabamento, hidráulica e materiais básicos em um só lugar.</p>
      <p>Mas o crescimento não mudou aquilo que fez o nome Incona ser lembrado: o atendimento próximo. Aqui, você pode chegar com uma lista pronta ou com uma dúvida. Nossa equipe ajuda a encontrar o que precisa e a seguir para a próxima etapa da obra.</p>
      <p>Os blocos vendidos pela Incona são fabricados pela Concretblocos, empresa do mesmo grupo, conectando o atendimento da loja à experiência técnica da fábrica.</p>
      <p class="signature">Incona. Do alicerce ao acabamento, sempre ao seu lado.</p>
      <a class="btn btn--wa btn--lg" href="${wa('Olá! Vim pelo site e gostaria de falar com a equipe da Incona.')}" target="_blank" rel="noopener" data-track="whatsapp" data-wa-context="sobre">${icon('whatsapp')} Fale com a nossa equipe</a>
    </div>
    <div class="stack">
      <img src="${photos.fachada2.src}" alt="${esc(photos.fachada2.alt)}" loading="lazy" width="750" height="516">
      <img src="${photos.entrega.src}" alt="${esc(photos.entrega.alt)}" loading="lazy" width="750" height="516">
      <img src="${photos.blocos.src}" alt="${esc(photos.blocos.alt)}" loading="lazy" width="750" height="516">
    </div>
  </div>
</section>`;
  return layout({ depth: d, slug: about.slug, title: about.title, description: about.description, body, active: about.slug, image: photos.fachada2.src });
}

// ---------- FALE CONOSCO ----------
function buildContact() {
  const d = 1;
  const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Você está em"><a href="${href(d, '')}">Home</a> <span>/</span> <span aria-current="page">Fale Conosco</span></nav>
    <h1>Fale com quem conhece sua obra.</h1>
    <p class="page-hero__lead">Precisa pedir um orçamento, consultar um produto ou enviar sua lista de materiais?</p>
    <p>Fale com a equipe da Incona pelo WhatsApp. Se preferir, venha até nossa loja em Cotia.</p>
    <div class="hero__actions">
      <a class="btn btn--wa btn--lg" href="${wa('Olá! Vim pelo site e gostaria de enviar minha lista de materiais.')}" target="_blank" rel="noopener" data-track="whatsapp" data-wa-context="contato">${icon('whatsapp')} Enviar minha lista pelo WhatsApp</a>
      <a class="btn btn--ghost btn--lg" href="${site.mapsUrl}" target="_blank" rel="noopener" data-track="map">${icon('pin')} Como chegar</a>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap contact-grid">
    <div class="contact-cards">
      <div class="info"><span class="info__icon">${icon('whatsapp')}</span><div><h2>WhatsApp</h2><a href="${wa(DEFAULT_MSG)}" target="_blank" rel="noopener" data-track="whatsapp" data-wa-context="contato-card">${site.whatsapp.label}</a></div></div>
      <div class="info"><span class="info__icon">${icon('pin')}</span><div><h2>Endereço</h2><p>${esc(site.address.full)}</p><a href="${site.mapsUrl}" target="_blank" rel="noopener" data-track="map">Ver no Google Maps</a></div></div>
      <div class="info"><span class="info__icon">${icon('clock')}</span><div><h2>Horário</h2>${site.hours.map((h) => `<p>${h.days}: ${h.time}</p>`).join('')}</div></div>
    </div>
    <form class="form" id="form-contato" novalidate>
      <h2>Envie sua mensagem</h2>
      <p class="form__hint">Preencha os campos e sua mensagem será aberta no WhatsApp da Incona.</p>
      <label>Seu nome<input name="nome" required autocomplete="name"></label>
      <label>Seu telefone<input name="telefone" type="tel" autocomplete="tel"></label>
      <label>Assunto
        <select name="assunto">
          <option>Orçamento</option>
          ${categories.map((c) => `<option>${c.menu}</option>`).join('')}
          <option>Outro assunto</option>
        </select>
      </label>
      <label>Mensagem ou lista de materiais<textarea name="mensagem" rows="5" required></textarea></label>
      <button class="btn btn--primary btn--lg" type="submit">Enviar mensagem</button>
      <p class="form__status" role="status" aria-live="polite"></p>
    </form>
  </div>
  <div class="wrap map">
    <iframe title="Mapa da loja Incona em Cotia" src="${site.mapsEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</section>`;
  return layout({ depth: d, slug: contact.slug, title: contact.title, description: contact.description, body, active: contact.slug });
}

function redirectPage(to) {
  const url = `${site.baseUrl}/${to}/`;
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>Página movida</title><link rel="canonical" href="${url}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=../${to}/"></head><body><p>Esta página mudou para <a href="../${to}/">${url}</a>.</p></body></html>\n`;
}

// ---------- ESCRITA ----------
function write(rel, html) {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
}

// Limpa o conteúdo de docs/ (mantém a pasta, que pode estar aberta por um servidor local).
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) {
  try { fs.rmSync(path.join(OUT, f), { recursive: true, force: true }); } catch (e) { console.warn(`Não foi possível remover docs/${f}: ${e.code}`); }
}
write('index.html', buildHome());
categories.forEach((c) => write(`${c.slug}/index.html`, buildCategory(c)));
write(`${about.slug}/index.html`, buildAbout());
write(`${contact.slug}/index.html`, buildContact());
Object.entries(redirects).forEach(([from, to]) => write(`${from}/index.html`, redirectPage(to)));
fs.cpSync(path.join(__dirname, 'assets'), path.join(OUT, 'assets'), { recursive: true });

const pages = ['', ...categories.map((c) => c.slug), about.slug, contact.slug];
const today = new Date().toISOString().slice(0, 10);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${site.baseUrl}/${p ? p + '/' : ''}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.baseUrl}/sitemap.xml\n`);
write('.htaccess', `# Redirecionamentos 301 das URLs antigas (para uso em servidor Apache)\n${Object.entries(redirects).map(([f, t]) => `Redirect 301 /${f} /${t}/`).join('\n')}\n`);
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
console.log(`Site gerado em ${OUT}: ${pages.length} páginas + ${Object.keys(redirects).length} redirecionamentos.`);
