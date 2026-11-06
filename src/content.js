// Conteúdo do site — fonte única. Textos conforme "INCONA - Planejamento Reestruturação Site".
const IMG = 'https://www.incona.com.br/image/catalog';

const site = {
  name: 'Incona Materiais para Construção',
  shortName: 'Incona',
  baseUrl: 'https://www.incona.com.br',
  tagline: 'Do alicerce ao acabamento, sempre ao seu lado.',
  logo: `${IMG}/logoincona.jpg`,
  address: {
    street: 'Rod. Bunjiro Nakao, km 49,970',
    city: 'Cotia',
    state: 'SP',
    full: 'Rod. Bunjiro Nakao, km 49,970 – Cotia – SP',
  },
  geo: { lat: -23.633516, lng: -47.055277 },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=-23.633516,-47.055277',
  mapsEmbed: 'https://maps.google.com/maps?q=-23.633516,-47.055277&hl=pt-br&z=15&output=embed',
  phones: [
    { label: '(11) 4611-2633', tel: '+551146112633' },
    { label: '(11) 4242-5974', tel: '+551142425974' },
  ],
  whatsapp: { label: '(11) 93334-4615', number: '5511933344615' },
  hours: [
    { days: 'Segunda a sexta', time: '07:00 às 17:30' },
    { days: 'Sábado', time: '07:00 às 13:00' },
  ],
  instagram: 'https://www.instagram.com/inconamateriais/',
  facebook: 'https://www.facebook.com/pages/Incona-Materiais-Para-Construcao/1644761845543895',
  gtmId: '', // preencher com o ID do Google Tag Manager (ex.: GTM-XXXXXXX)
};

const photos = {
  fachada: { src: `${IMG}/SLIDER/novo/slider1.jpg`, alt: 'Fachada da loja Incona na Rodovia Bunjiro Nakao, em Cotia' },
  fachada2: { src: `${IMG}/SLIDER/novo/slider2.jpeg`, alt: 'Loja Incona Materiais para Construção em Cotia' },
  blocos: { src: `${IMG}/SLIDER/novo/slider3.jpeg`, alt: 'Paletes de blocos de concreto fabricados pela Concretblocos' },
  entrega: { src: `${IMG}/SLIDER/novo/slider4.jpeg`, alt: 'Caminhões de entrega da Incona em Cotia e região' },
  interior: { src: `${IMG}/SLIDER/novo/slider5.jpeg`, alt: 'Prateleiras com materiais hidráulicos e elétricos dentro da loja Incona' },
  tijolos: { src: `${IMG}/SLIDER/novo/slider6.jpeg`, alt: 'Tijolos cerâmicos em paletes na Incona' },
  artefatos: { src: `${IMG}/SLIDER/novo/slider7.jpeg`, alt: 'Artefatos de cimento expostos no pátio da Incona' },
};

// Ordem do menu definida no planejamento.
const categories = [
  {
    slug: 'ferramentas',
    menu: 'Ferramentas',
    icon: 'tool',
    title: 'Ferramentas e EPIs em Cotia | Incona',
    description: 'Ferramentas manuais e elétricas, EPIs e acessórios para obra em Cotia. Tramontina, Vonder, Makita, Cortag e mais. Consulte a Incona pelo WhatsApp.',
    summary: 'Ferramentas manuais e elétricas, EPIs e acessórios para construção, instalação e manutenção.',
    h1: 'Ferramentas e EPIs em Cotia',
    intro: [
      'Da manutenção do dia a dia às etapas mais pesadas da obra, a ferramenta certa faz diferença no trabalho.',
      'Na Incona você encontra ferramentas manuais e elétricas, equipamentos de proteção e acessórios para diferentes serviços de construção, instalação e reforma.',
      'Precisa de ajuda para encontrar um item? Fale com nossa equipe e consulte as opções disponíveis.',
    ],
    sections: [
      { h2: 'Ferramentas Manuais', lead: 'Para preparar, cortar, quebrar, assentar ou fazer ajustes na obra, encontre ferramentas manuais para diferentes tipos de serviço.', text: 'Entre os itens da linha estão:', items: ['Pá Tramontina', 'Enxada Famastil', 'Machado Tramontina', 'Martelo', 'Colher Paceta'] },
      { h2: 'Ferramentas Elétricas', lead: 'Mais agilidade para trabalhos que exigem força, precisão ou produtividade.', text: 'Na linha de ferramentas elétricas, a Incona trabalha com opções como:', items: ['Compressor Vonder', 'Lixadeira girafa', 'Martelete Makita', 'Parafusadeira Vonder'] },
      { h2: 'EPIs', lead: 'Proteção também faz parte de um trabalho bem-feito.', text: 'Encontre itens para auxiliar na segurança durante a obra e diferentes atividades:', items: ['Óculos de proteção', 'Luva multitato', 'Cinta lombar', 'Capa de chuva', 'Botinas'] },
      { h2: 'Acessórios', lead: 'A ferramenta precisa do acessório certo para entregar o resultado esperado.', text: 'Consulte opções como:', items: ['Disco para porcelanato Cortag', 'Broca SDS Makita', 'Serra copo', 'Disco para ferro', 'Disco de serra'] },
    ],
    closing: { title: 'Procurando uma ferramenta ou acessório específico?', text: 'Envie o nome, sua lista ou uma foto pelo WhatsApp. Nossa equipe verifica as opções disponíveis para você.', cta: 'Consultar pelo WhatsApp' },
    whatsMsg: 'Olá! Vim pelo site e gostaria de consultar ferramentas/EPIs.',
  },
  {
    slug: 'jardinagem',
    menu: 'Jardinagem',
    icon: 'leaf',
    title: 'Jardinagem e Piscina em Cotia | Incona',
    description: 'Ferramentas para jardinagem, produtos para piscina e acessórios para áreas externas em Cotia. Consulte as opções com a equipe da Incona.',
    summary: 'Ferramentas, produtos para piscina e acessórios para cuidar das áreas externas.',
    h1: 'Produtos para jardinagem e piscina em Cotia',
    intro: [
      'Cuidar das áreas externas fica mais fácil com os produtos certos.',
      'Na Incona você encontra ferramentas para jardinagem, produtos para manutenção da piscina e acessórios para diferentes cuidados com quintais, jardins e áreas externas.',
    ],
    sections: [
      { h2: 'Ferramentas para Jardinagem', lead: 'Da manutenção do gramado à poda das plantas, encontre ferramentas para os cuidados do dia a dia com o jardim.', text: 'A linha inclui:', items: ['Vassoura para grama Tramontina', 'Aparador Vulcan', 'Tesoura de poda'] },
      { h2: 'Piscina', lead: 'Água limpa e piscina bem cuidada exigem manutenção frequente.', text: 'Consulte produtos e acessórios para ajudar nos diferentes cuidados com a piscina:', items: ['Cloro', 'Clarificante', 'Algicida', 'Aspirador', 'Escova'] },
      { h2: 'Acessórios', lead: 'Complete os cuidados com jardim e áreas externas com acessórios que ajudam na limpeza, irrigação e manutenção.', text: 'Entre os itens estão:', items: ['Mangueira', 'Esguicho jet', 'Lâmina para roçadeira', 'Pulverizador', 'Vasos'] },
    ],
    closing: { title: 'Está procurando um produto para o jardim ou para a piscina?', text: 'Fale com a equipe da Incona pelo WhatsApp e consulte as opções disponíveis.', cta: 'Falar com a Incona' },
    whatsMsg: 'Olá! Vim pelo site e gostaria de consultar produtos de jardinagem/piscina.',
  },
  {
    slug: 'utilidades-domesticas',
    menu: 'Utilidades Domésticas',
    icon: 'home',
    title: 'Utilidades Domésticas em Cotia | Incona',
    description: 'Churrasco, cozinha, limpeza, pets e telas em Cotia. Utilidades domésticas para o dia a dia na Incona. Consulte nossa equipe pelo WhatsApp.',
    summary: 'Produtos para churrasco, cozinha, limpeza, pets e diferentes necessidades da casa.',
    h1: 'Utilidades domésticas em Cotia',
    intro: [
      'A Incona não está presente só durante a obra.',
      'Aqui você também encontra produtos para a casa, churrasco, limpeza, pets e outras necessidades do dia a dia.',
      'Conheça algumas das linhas disponíveis e consulte nossa equipe para encontrar o que precisa.',
    ],
    sections: [
      { h2: 'Churrasco', lead: 'Para preparar o espaço e aproveitar os momentos ao redor da churrasqueira.', text: 'Encontre:', items: ['Churrasqueiras externas', 'Churrasqueiras portáteis', 'Jogos de facas', 'Grelhas'] },
      { h2: 'Lar', lead: 'Produtos úteis para completar a cozinha e facilitar a rotina dentro de casa.', text: 'A linha inclui itens como:', items: ['Jogo de copos', 'Conjunto de panelas', 'Chaleira elétrica', 'Torradeira'] },
      { h2: 'Produtos de Limpeza', lead: 'Da limpeza pesada à manutenção da casa, encontre produtos e acessórios para diferentes superfícies e tarefas.', text: 'Entre as opções estão:', items: ['Limpa-pedras', 'Alvejantes', 'Água sanitária', 'Mop'] },
      { h2: 'Pet', lead: 'Também tem espaço para quem faz parte da casa.', text: 'Consulte itens para os pets como:', items: ['Casinha', 'Areia', 'Coleiras'] },
      { h2: 'Telas', lead: 'Para cercamento, proteção e diferentes aplicações em casa, jardim ou área externa.', text: 'A Incona trabalha com opções como:', items: ['Tela viveiro', 'Tela de alambrado', 'Tela de proteção'] },
    ],
    closing: { title: 'Não encontrou o item que procura?', text: 'Envie uma mensagem para nossa equipe. Nem todos os produtos disponíveis na loja aparecem no site.', cta: 'Consultar pelo WhatsApp' },
    whatsMsg: 'Olá! Vim pelo site e gostaria de consultar utilidades domésticas.',
  },
  {
    slug: 'pintura',
    menu: 'Pintura',
    icon: 'brush',
    title: 'Tintas e Materiais para Pintura em Cotia | Incona',
    description: 'Tintas, massas, seladores, impermeabilizantes, colas e acessórios para pintura em Cotia. Envie sua lista para a Incona pelo WhatsApp.',
    summary: 'Tintas, complementos, impermeabilizantes, colas e ferramentas para pintura.',
    h1: 'Tintas e materiais para pintura em Cotia',
    intro: [
      'Uma boa pintura começa antes da primeira demão.',
      'Na Incona você encontra tintas, massas, seladores, impermeabilizantes, colas e acessórios para preparar, proteger, pintar e finalizar diferentes superfícies.',
      'Da preparação ao acabamento, nossa equipe pode ajudar você a encontrar os produtos para cada etapa.',
    ],
    sections: [
      { h2: 'Tintas', lead: 'Para renovar ambientes, proteger superfícies e dar acabamento à obra.', text: 'Entre as linhas informadas pela Incona estão:', items: ['Peg Pinte', 'RendeMuito', 'Emborrachada', 'Tinta Piso', 'Esmalte'] },
      { h2: 'Complementos', lead: 'Preparar bem a superfície é parte essencial do resultado da pintura.', text: 'Encontre opções para diferentes etapas de preparação e acabamento:', items: ['Massa acrílica', 'Massa corrida', 'Resina', 'Selador', 'Massa para madeira'] },
      { h2: 'Colas e Diversos', lead: 'Para fixação, vedação e diferentes necessidades da obra ou manutenção.', text: 'A linha reúne itens como:', items: ['PU 40', 'Cola para madeira', 'Fitas de embalagem', 'Silicone', 'Espuma'] },
      { h2: 'Impermeabilizantes', lead: 'A proteção contra umidade começa pela escolha do produto adequado para cada aplicação.', text: 'Consulte produtos das linhas:', items: ['Viaplus', 'Vedalage', 'Vedacit', 'Bianco', 'Neutrol', 'Viafix', 'Contra Umidade'] },
      { h2: 'Acessórios e Ferramentas para Pintura', lead: 'Além da tinta, os acessórios ajudam a preparar, misturar, transportar e aplicar o produto.', text: 'Encontre itens como:', items: ['Kit de pintura', 'Misturador de tinta', 'Rolo extra', 'Caçamba'] },
    ],
    closing: { title: 'Vai pintar, renovar ou impermeabilizar?', text: 'Envie sua lista pelo WhatsApp e consulte nossa equipe sobre os produtos disponíveis.', cta: 'Enviar minha lista' },
    whatsMsg: 'Olá! Vim pelo site e gostaria de enviar minha lista de pintura.',
  },
  {
    slug: 'eletrica',
    menu: 'Elétrica',
    icon: 'bolt',
    title: 'Materiais Elétricos em Cotia | Incona',
    description: 'Cabos, conduítes, disjuntores, interruptores, conduletes, refletores e luminárias em Cotia. Monte sua lista de materiais elétricos com a Incona.',
    summary: 'Cabos, disjuntores, interruptores, conduletes, luminárias e outros materiais elétricos.',
    h1: 'Materiais elétricos e iluminação em Cotia',
    intro: [
      'Da infraestrutura elétrica aos detalhes de iluminação, encontre materiais para diferentes etapas da instalação.',
      'Na Incona você encontra cabos, conduítes, disjuntores, interruptores, conduletes, refletores, painéis e luminárias para obras, reformas e manutenção.',
    ],
    sections: [
      { h2: 'Materiais Elétricos em Geral', lead: 'Para montar ou dar manutenção à infraestrutura elétrica da obra.', text: 'A linha informada pela Incona inclui:', items: ['Padrão Enel', 'Conduíte', 'Cabos', 'Disjuntores'] },
      { h2: 'Interruptores', lead: 'Os detalhes da instalação elétrica também fazem parte do acabamento do ambiente.', text: 'Consulte opções, conforme a linha comercializada pela Incona:', items: ['Linha Aria', 'Linha Liz', 'Conduletes'] },
      { h2: 'Luminárias', lead: 'Iluminação funcional ou de acabamento para diferentes espaços da casa e da obra.', text: 'Entre as opções estão:', items: ['Sciaza', 'Refletores', 'Painéis', 'Slim'] },
    ],
    closing: { title: 'Precisa montar sua lista de materiais elétricos?', text: 'Envie os itens pelo WhatsApp e fale diretamente com a equipe da Incona.', cta: 'Consultar materiais elétricos' },
    whatsMsg: 'Olá! Vim pelo site e gostaria de consultar materiais elétricos.',
  },
  {
    slug: 'acabamento',
    menu: 'Acabamento',
    icon: 'tiles',
    title: 'Pisos, Louças e Acabamento em Cotia | Incona',
    description: 'Pisos, porcelanatos, esquadrias, gabinetes, pias, louças, cubas, tanques e decorativos em Cotia. Roca, Celite, Logasa e mais na Incona.',
    summary: 'Pisos, esquadrias, gabinetes, pias, louças, cubas, tanques e elementos decorativos.',
    h1: 'Pisos, louças e acabamento em Cotia',
    intro: [
      'Chegou a hora de transformar a obra em casa?',
      'Na Incona você também encontra produtos para as etapas de acabamento: pisos, esquadrias, gabinetes, pias, louças, cubas, tanques e elementos decorativos.',
      'Se você começou a obra com a gente, pode continuar até os últimos detalhes.',
    ],
    sections: [
      { h2: 'Pisos', lead: 'Para áreas internas, externas e diferentes estilos de projeto.', text: 'A Incona trabalha com opções de modelos internos, externos, porcelanatos e grês. Consulte nossa equipe para conhecer os produtos disponíveis e encontrar alternativas para o seu ambiente.', items: ['Pisos internos', 'Pisos externos', 'Porcelanatos', 'Grês'] },
      { h2: 'Esquadrias', lead: 'Esquadrias fazem parte da funcionalidade e também do acabamento da construção.', text: 'A linha informada pela Incona inclui:', items: ['Proex branca', 'Proex alumínio', 'Jap preta', 'Jap branca', 'Madeira'] },
      { h2: 'Gabinetes e Pias', lead: 'Praticidade e acabamento para banheiro e cozinha.', text: 'Consulte opções das linhas e marcas informadas pela Incona, além de soluções para banheiro:', items: ['Rorato', 'Crismetal', 'MGM', 'MGM Cozinha', 'Cozimax'] },
      { h2: 'Louças', lead: 'Escolha louças para completar os ambientes com funcionalidade e acabamento.', text: 'A Incona trabalha com produtos das marcas:', items: ['Roca', 'Logasa', 'Celite'] },
      { h2: 'Cubas e Diversos', lead: 'Peças que ajudam a completar o projeto e fazem diferença no resultado final do ambiente.', text: 'Entre os itens informados estão:', items: ['Cuba de apoio Incepa', 'Nicho injetado'] },
      { h2: 'Tanques', lead: 'Soluções para lavanderias, áreas de serviço e outras necessidades da casa.', text: 'Consulte opções de tanques:', items: ['Tanques de cimento', 'Astra', 'Rorato'] },
      { h2: 'Decorativos', lead: 'Os últimos detalhes ajudam a dar personalidade e acabamento aos espaços.', text: 'A linha inclui:', items: ['Elementos vazados cerâmicos', 'Rodateto Epex', 'Meu Rodapé'] },
    ],
    closing: { title: 'Sua obra chegou no acabamento? Continue com a Incona.', text: 'Envie sua lista, foto do ambiente ou os produtos que está procurando e fale com nossa equipe pelo WhatsApp.', cta: 'Falar sobre acabamento' },
    whatsMsg: 'Olá! Vim pelo site e gostaria de falar sobre acabamento.',
  },
  {
    slug: 'hidraulica',
    menu: 'Hidráulica',
    icon: 'drop',
    title: 'Materiais Hidráulicos em Cotia | Incona',
    description: 'Tubos e conexões Tigre e Krona, grelhas, sifões, ralos, válvulas, calhas e caixas de passagem em Cotia. Envie sua lista para a Incona.',
    summary: 'Tubos, conexões, grelhas, sifões, ralos, válvulas, calhas e caixas de passagem.',
    h1: 'Materiais hidráulicos em Cotia',
    intro: [
      'Instalação, reforma ou manutenção: encontre materiais hidráulicos para diferentes necessidades da obra.',
      'Na Incona você encontra grelhas, sifões, ralos, válvulas, calhas, tubos, conexões e caixas de passagem.',
    ],
    sections: [
      { h2: 'Grelhas', lead: 'Para captação e escoamento em diferentes áreas da construção.', text: 'Consulte opções de grelhas:', items: ['Grelhas coletoras', 'Grelhas de alumínio', 'Grelhas de ferro'] },
      { h2: 'Acessórios Hidráulicos', lead: 'Peças pequenas podem fazer uma grande diferença no funcionamento da instalação.', text: 'Encontre itens como:', items: ['Sifão', 'Ralos lineares', 'Válvulas de retenção'] },
      { h2: 'Calhas', lead: 'Soluções para condução de água e proteção da construção.', text: 'A linha inclui:', items: ['Calhas galvanizadas', 'Calhas em PVC'] },
      { h2: 'Tubos e Conexões', lead: 'Produtos para diferentes pontos da instalação hidráulica.', text: 'A Incona trabalha com tubos e conexões:', items: ['Tigre', 'Krona'] },
      { h2: 'Caixas de Passagem', lead: 'Para organização e acesso aos sistemas da construção.', text: 'Consulte opções de:', items: ['Cimento', 'Estrela', 'Tigre', 'Krona'] },
    ],
    closing: { title: 'Está montando ou reformando a instalação hidráulica?', text: 'Envie sua lista para a Incona e consulte nossa equipe sobre os produtos disponíveis.', cta: 'Enviar lista pelo WhatsApp' },
    whatsMsg: 'Olá! Vim pelo site e gostaria de enviar minha lista de materiais hidráulicos.',
    gallery: [photos.interior],
  },
  {
    slug: 'basico',
    menu: 'Básico',
    icon: 'brick',
    title: 'Materiais para Construção em Cotia | Incona',
    description: 'Blocos, tijolos, cimento, argamassa, areia, pedra, madeira, telhas, ferragens e artefatos de cimento em Cotia. Peça seu orçamento na Incona.',
    summary: 'Artefatos de cimento, blocos, tijolos, sacaria, material a granel, madeira, telhas e ferragem.',
    h1: 'Materiais básicos para construção em Cotia',
    intro: [
      'Toda obra precisa de uma boa base.',
      'Na Incona você encontra materiais para começar, estruturar e dar continuidade à construção: artefatos de cimento, blocos, tijolos, sacaria, materiais a granel, madeira, telhas e ferragens.',
      'É a linha que acompanha a obra desde as primeiras etapas, com a praticidade de continuar comprando na Incona quando chegar a hora do acabamento.',
    ],
    sections: [
      { h2: 'Artefatos de Cimento', lead: 'Produtos para infraestrutura, áreas externas e diferentes etapas da construção.', text: 'A linha informada pela Incona inclui:', items: ['Tubos para poço', 'Tubos pluviais', 'Piso intertravado', 'Paviés', 'Guias', 'Pedra para jardim'] },
      { h2: 'Blocos e Tijolos', lead: 'Materiais para levantar, dividir e estruturar diferentes tipos de construção.', text: 'Consulte opções de blocos e tijolos. Os blocos comercializados pela Incona são fabricados pela Concretblocos, empresa do mesmo grupo.', items: ['Cerâmicos', 'Cimento', 'Estruturais', 'Tijolo aparente'] },
      { h2: 'Sacaria', lead: 'Materiais presentes em diferentes etapas, da preparação ao assentamento e acabamento da obra.', text: 'A linha inclui:', items: ['Argamassa', 'Cimento', 'Graute', 'Massa pronta'] },
      { h2: 'Material a Granel', lead: 'Para preparar bases, concretos, assentamentos e outras etapas da construção.', text: 'Consulte:', items: ['Areia', 'Pedra', 'Pedrisco', 'Pó de pedra'] },
      { h2: 'Madeira Pinus', lead: 'Madeira para diferentes aplicações provisórias e permanentes durante a obra.', text: 'A linha informada inclui:', items: ['Tábuas', 'Sarrafos', 'Pontaletes'] },
      { h2: 'Madeira para Telhado', lead: 'Produtos para compor diferentes partes da estrutura do telhado.', text: 'Consulte:', items: ['Caibros', 'Vigas', 'Pranchas'] },
      { h2: 'Telhas', lead: 'Opções para cobertura e diferentes necessidades da construção.', text: 'A linha inclui:', items: ['Infibra', 'Translúcidas', 'Cerâmicas'] },
      { h2: 'Ferragem', lead: 'Elementos utilizados em diferentes etapas estruturais da obra.', text: 'Consulte opções de:', items: ['Colunas', 'Sapatas'] },
    ],
    closing: { title: 'Começando uma obra ou precisa repor material?', text: 'Envie sua lista pelo WhatsApp. A equipe da Incona ajuda você a consultar os itens necessários para a próxima etapa.', cta: 'Pedir orçamento' },
    whatsMsg: 'Olá! Vim pelo site e gostaria de pedir um orçamento de materiais básicos.',
    gallery: [
      photos.blocos, photos.tijolos,
      ...['basico1.jpg', 'basico2.jpg', 'basico3.jpg', 'basico4.jpg', 'basico5.jpg', 'basico6.jpg'].map((f, i) => ({
        src: `${IMG}/PRODUTOS/basico/${f}`, alt: `Material básico para construção disponível na Incona – foto ${i + 1}`,
      })),
    ],
  },
];

// Logos oficiais (assets/marcas) e cor de cada marca. `bg` = fundo do card quando o logo pede (ex.: logo branco).
const brands = [
  { name: 'Tramontina', logo: 'tramontina.svg', w: 500, h: 75, color: '#0000b7', line: 'Ferramentas e utilidades' },
  { name: 'Vonder', logo: 'vonder.png', w: 180, h: 57, color: '#ffba1c', bg: '#ffba1c', line: 'Ferramentas elétricas' },
  { name: 'Makita', logo: 'makita.svg', w: 815, h: 287, color: '#ec1b24', line: 'Ferramentas elétricas' },
  { name: 'Cortag', logo: 'cortag.svg', w: 247, h: 77, color: '#c40c2e', line: 'Acessórios e corte' },
  { name: 'Tigre', logo: 'tigre.png', w: 129, h: 38, color: '#2e3192', line: 'Tubos e conexões' },
  { name: 'Krona', logo: 'krona.png', w: 674, h: 190, color: '#e01a22', line: 'Tubos e conexões' },
  { name: 'Roca', logo: 'roca.svg', w: 141, h: 72, color: '#211e1e', line: 'Louças e metais' },
  { name: 'Celite', logo: 'celite.svg', w: 128, h: 45, color: '#00675a', line: 'Louças sanitárias' },
  { name: 'Logasa', logo: 'logasa.png', w: 145, h: 45, color: '#f2971c', bg: '#f2971c', line: 'Louças e tanques' },
  { name: 'Famastil', logo: 'famastil.svg', w: 170, h: 30, color: '#ea5a26', line: 'Ferramentas manuais' },
  { name: 'Vedacit', logo: 'vedacit.svg', w: 129, h: 30, color: '#ffb919', bg: '#ffb919', line: 'Impermeabilizantes' },
  { name: 'Incepa', logo: 'incepa.jpg', w: 500, h: 500, color: '#0072bc', bg: '#0072bc', line: 'Cubas e louças' },
];

const home = {
  title: 'Material de Construção em Cotia | Incona',
  description: 'Materiais para construção e reforma em Cotia, do alicerce ao acabamento. Encontre variedade e atendimento próximo na Incona. Fale com nossa equipe.',
};

const about = {
  slug: 'sobre-nos',
  title: 'Sobre a Incona | Materiais para Construção em Cotia',
  description: 'Há quase 20 anos a Incona faz parte de obras e reformas de Cotia e região. Conheça nossa história e o atendimento que faz cliente ter nome.',
};

const contact = {
  slug: 'fale-conosco',
  title: 'Contato Incona | Materiais para Construção em Cotia',
  description: 'Peça um orçamento, consulte produtos ou envie sua lista de materiais para a Incona por WhatsApp ou telefone. Loja na Rod. Bunjiro Nakao, em Cotia.',
};

// Redirecionamentos 301 das URLs antigas (no servidor). No GitHub Pages viram páginas com refresh + canonical.
const redirects = {
  'artefatos-de-cimento': 'basico',
  esquadrias: 'acabamento',
  decoracao: 'acabamento',
  madeira: 'basico',
  ferragens: 'basico',
  'pisos-e-revestimentos': 'acabamento',
  tintas: 'pintura',
};

module.exports = { site, photos, categories, brands, home, about, contact, redirects };
