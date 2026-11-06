# Incona — novo site (reestruturação)

Site da **Incona Materiais para Construção** (Cotia/SP), construído a partir do documento
*INCONA – Planejamento Reestruturação Site* e da identidade do site atual (incona.com.br).

## Estrutura

| Página | URL | SEO title |
|---|---|---|
| Home | `/` | Material de Construção em Cotia \| Incona |
| Ferramentas | `/ferramentas/` | Ferramentas e EPIs em Cotia \| Incona |
| Jardinagem | `/jardinagem/` | Jardinagem e Piscina em Cotia \| Incona |
| Utilidades Domésticas | `/utilidades-domesticas/` | Utilidades Domésticas em Cotia \| Incona |
| Pintura | `/pintura/` | Tintas e Materiais para Pintura em Cotia \| Incona |
| Elétrica | `/eletrica/` | Materiais Elétricos em Cotia \| Incona |
| Acabamento | `/acabamento/` | Pisos, Louças e Acabamento em Cotia \| Incona |
| Hidráulica | `/hidraulica/` | Materiais Hidráulicos em Cotia \| Incona |
| Básico | `/basico/` | Materiais para Construção em Cotia \| Incona |
| Sobre Nós | `/sobre-nos/` | Sobre a Incona \| Materiais para Construção em Cotia |
| Fale Conosco | `/fale-conosco/` | Contato Incona \| Materiais para Construção em Cotia |

Cada categoria segue o padrão do planejamento: **H1 → introdução → subdivisões (H2) → galeria → CTA WhatsApp**,
com mensagem de WhatsApp específica por categoria e por subdivisão.

## O que está implementado

- Textos do planejamento (Home, 8 categorias, Sobre Nós, Fale Conosco).
- SEO local: title/description por página, H1 único, H2/H3, alt text, canonical, Open Graph,
  `sitemap.xml`, `robots.txt`, dados estruturados `HardwareStore` (empresa local) e `BreadcrumbList`.
- Redirecionamentos das URLs antigas: `/pisos-e-revestimentos`, `/esquadrias`, `/decoracao` → `/acabamento`;
  `/madeira`, `/ferragens`, `/artefatos-de-cimento` → `/basico`; `/tintas` → `/pintura`.
  Em servidor Apache use o `.htaccess` gerado (301). No GitHub Pages viram páginas com refresh + canonical.
- Mensuração (dataLayer, pronto para GA4 via Tag Manager): `whatsapp_click`, `phone_click`, `form_submit`,
  `category_view`, `acabamento_view`, `map_click`. Preencha `gtmId` em `src/content.js`.
- Botão de WhatsApp fixo em todas as páginas, links de telefone, mapa e formulário (abre o WhatsApp com a mensagem).
- **Minha lista de materiais**: nas categorias, cada produto pode ser adicionado a uma lista que fica salva no navegador, aparece no botão "Minha lista" do cabeçalho, aceita quantidade por item e observações, e é enviada numa única mensagem de WhatsApp agrupada por subdivisão. Eventos extras: `list_add`, `list_open`, `list_send`.
- Acessibilidade (revisada com a skill ui-ux-pro-max): contraste mínimo de 4,5:1 em textos e botões, áreas de toque de pelo menos 24px (44px nos controles da lista), cabeçalho fixo sem cobrir âncoras ou foco, painel da lista em `<dialog>` nativo e anúncios para leitor de tela.
- Layout responsivo (celular, tablet, desktop).

## Como editar e gerar

Todo o conteúdo fica em [`src/content.js`](src/content.js). Estilos em `assets/style.css`, scripts em `assets/main.js`.

```bash
node build.js        # gera o site em docs/
npx http-server docs # visualizar localmente
```

## Pendências antes de publicar

- **Fotos**: as imagens vêm hoje do site atual (incona.com.br). As categorias sem foto mostram espaços
  reservados — substituir por fotos reais fornecidas pela Incona (campo `gallery` em `src/content.js`).
- **Marcas**: logos oficiais em `assets/marcas/`, obtidos dos sites dos fabricantes (Makita via Wikimedia Commons). Confirmar com a Incona a autorização de uso e se todas seguem sendo comercializadas.
- **GTM/GA4**: inserir o ID do container.
- **Formulário**: no ar, ligar ao destinatário de e-mail definido pela Incona, se desejado.
