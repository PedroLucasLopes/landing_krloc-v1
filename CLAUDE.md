# 🏗️ site_krloc-v1 — a página de boas-vindas do KRLoc

Uma página só, pública, sem login, cujo único objetivo é o visitante entender o que a KRLoc aluga e
abrir uma conversa no WhatsApp com o orçamento já escrito.

**Ela não é o front da locação.** O [`plataforma_krloc-v1`](https://github.com/PedroLucasLopes/plataforma_krloc-v1)
é a tela de quem já é cliente e entra pelo SSO. Aqui não existe sessão, não existe permissão e não
existe rota autenticada.

```bash
npm run dev              # localhost:5176
npm run storybook        # localhost:6008
npm run lint
npm run build            # type-check + traduções + vite build
npm run build-storybook
```

> Projeto **independente**: repositório, `node_modules`, pipeline e deploy próprios. Não importa nada
> do `krloc-api-v1`, não lê o banco dele e não entra no `docker-compose.yml` de ninguém. A única
> dependência do ecossistema é o pacote `@pedrolucaslopes/dotlog-ui`, instalado por versão.

---

## 🔒 A decisão que manda em todo o resto: a página não tem backend

O pedido era claro — *"não quero que os dados do banco de KRLoc sejam consumidos na Landing Page"* — e
a resposta mais segura não foi criar um banco espelho. Foi **não ter banco nenhum**.

O catálogo é um arquivo versionado, `src/content/catalog.ts`, que vira JavaScript estático no build. O
que o nginx serve é HTML, CSS, JS e imagem. Não há API, não há conexão de banco, não há endpoint de
formulário e não há cookie.

**O que isso elimina, de uma vez:** injeção de SQL, vazamento por endpoint público, enumeração de
registro, abuso de rate limit, credencial de banco em produção, LGPD sobre formulário guardado, e o
trabalho de manter mais um serviço de pé.

### Por que o catálogo não deve espelhar o banco, nem se pudesse

O que a locação guarda por equipamento é **operacional**: número de série, valor de diária, situação
(`AVAILABLE`, `LEASED`, `MAINTENANCE`), histórico de contrato. Nada disso ajuda a vender, e quase tudo
atrapalha:

- **Disponibilidade em tempo real mata a conversa.** "0 disponíveis" faz o visitante fechar a aba em
  vez de perguntar se dá para agendar para a semana que vem.
- **Preço na vitrine tira a negociação** e vira tabela que o concorrente lê todo dia.
- **Série, patrimônio e histórico** são dados internos que não têm razão para sair.

Então o catálogo daqui é **curadoria de vitrine**: tipo de equipamento, foto, resumo e três dados
técnicos. O tipo `CatalogItem` não tem campo de preço nem de disponibilidade — não é disciplina, é
impossibilidade.

### As três camadas, se um dia o catálogo precisar acompanhar o KRLoc

| Camada | O que é | Superfície de ataque | Quando adotar |
|---|---|---|---|
| **0 — hoje** | `src/content/catalog.ts` versionado | nenhuma | sempre que o catálogo mudar pouco |
| **1 — export** | um script em `runbooks/`, rodado por um operador, lê o KRLoc e regrava o arquivo **só com campos públicos** | nenhuma: o site continua estático | quando editar à mão começar a cansar |
| **2 — API própria** | serviço read-only com banco espelho, alimentado por publicação do KRLoc | um endpoint público, com cache e limite | só se o catálogo mudar toda semana |

A camada 1 é a "cópia do KRLoc" que o pedido levantou, sem o custo dela: a cópia acontece **na hora da
publicação**, não a cada visita, e mora fora dos dois repositórios, como o SQL de primeira subida. A
camada 2 só se justifica quando o custo de um deploy por alteração superar o de manter um serviço
exposto — e aí ela nasce com rate limit, cache e CDN na frente.

### O formulário de orçamento não envia nada

`QuoteComposer.vue` parece um formulário e não é: ele **monta o texto** da mensagem e o botão é um
link `https://wa.me/...` com ela pronta. Nenhum dado digitado sai do aparelho de quem preenche, e a
prévia ao lado é exatamente a string que vai no link.

Por isso a política de conteúdo do nginx traz `form-action 'none'`: nenhum formulário desta página tem
para onde submeter, e se um dia alguém injetar um `<form>`, ele não sai do lugar.

---

## ✍️ Onde trocar o conteúdo de demonstração

Tudo o que está escrito hoje é mock, e foi separado em quatro lugares justamente para a troca ser
mecânica:

| Arquivo | O que tem | Como trocar |
|---|---|---|
| `src/content/catalog.ts` | os 15 equipamentos: nome, resumo, 3 dados técnicos, categoria | editar, acrescentar ou apagar itens da lista |
| `src/content/company.ts` | WhatsApp, telefone, e-mail, endereço, CNPJ, horário, redes | trocar os valores; o número do WhatsApp é `5511900000000`, **falso** |
| `src/locales/pt-BR.json` e `en.json` | todo o texto de tela, seção por seção | trocar o texto; as chaves ficam |
| `public/equipment/` e `public/banners/` | placeholders em SVG | soltar `foto.jpg` na pasta e apontar `image` para ela |

**Texto de tela mora na tradução; registro mora no conteúdo.** Título de seção, botão e rótulo são
chrome e vão no JSON, nas duas línguas. Nome e ficha de equipamento são registro e vão no
`catalog.ts`, porque catálogo é dado, não interface — e porque quem for trocar quer um arquivo só.

> ⚠️ **`check:locales` exige `en.json`.** Ele é a referência: chave que existe num JSON e falta no
> outro quebra o build, e parâmetro `{value}` diferente entre as línguas também. Língua nova é um JSON
> com as mesmas chaves.

As imagens são geradas por `node scripts/make-placeholders.mjs`, que escreve SVG leve com a marca
"IMAGEM ILUSTRATIVA". Foto de verdade entra no lugar, e o script pode ser apagado quando não sobrar
nenhum placeholder.

---

## 🎨 A identidade: claro, com laranja de sinalização

A página é **tema único, claro**. Não acompanha a preferência do sistema, e isso é escolha: um site de
locação industrial tem uma cara só, e ela é a de canteiro à luz do dia.

| Token | Papel |
|---|---|
| `--site-bg` `#f3f5f6` · `--site-bg-alt` `#ffffff` | o concreto claro e o branco que se alternam por seção |
| `--site-deep` `#101a20` | as faixas escuras de contraste: números, banner de chamada e rodapé |
| `--site-signal` `#ff7a1a` | laranja de sinalização: todo botão principal e todo destaque |
| `--site-signal-strong` `#c24d00` | o mesmo laranja escurecido para **texto pequeno**, que a 4,9:1 passa na WCAG |
| `--site-hazard` `#ffc400` | amarelo de faixa zebrada e de número sobre fundo escuro |

**Laranja de preenchimento e laranja de texto são tokens diferentes** porque `#ff7a1a` sobre branco dá
3,0:1: serve para fundo de botão e para título grande, e reprova em texto corrido. Trocar um pelo
outro é o erro fácil aqui.

O ritmo da página alterna claro, branco e escuro de propósito: a faixa escura dos números e o banner
de chamada existem para cortar a rolagem e devolver a atenção, que é o que um site de conversão
precisa fazer a cada duas seções.

### O que puxa o olho, e por quê

- **Banner com imagem no topo**, com véu branco em gradiente por cima. O texto é tinta escura sobre
  claro, então o contraste não depende da foto que entrar no lugar do placeholder.
- **Ladrilhos de categoria** logo abaixo do banner, sobrepondo-o em 40px. São o atalho de navegação —
  clicar já filtra o catálogo e rola até ele — e o primeiro bloco branco com sombra da página.
- **Faixa escura de números**, com o amarelo em cima do escuro.
- **Banner de chamada no meio**, escuro, com a ação repetida.
- **Selo "mais procurado"** no cartão em destaque, e a seta que anda no hover.

### Movimento

`v-reveal` é uma diretiva, não um componente: `v-reveal="120"` marca o elemento e atrasa a entrada em
120ms, para a fileira de cartões entrar escalonada. Um único `IntersectionObserver` atende a página
toda e para de observar o elemento assim que ele aparece.

> ⚠️ **Toda animação tem contrapartida em `prefers-reduced-motion`**, como no resto do ecossistema. Com
> ela ligada, `.reveal` nasce visível, a rolagem suave vira instantânea e as transições caem para
> 0,01ms. O estado fica; o movimento sai.

---

## 🧩 Componentes e estados

Os componentes de página vivem aqui; os de interface vêm do `@pedrolucaslopes/dotlog-ui`. A divisão é
a mesma do resto do ecossistema: **seção de landing é deste repositório, campo de formulário é da
biblioteca.**

Do pacote entram `DlTextField`, `DlSelect` e `DlButton` no orçamento, e `DlExpansion` nas dúvidas.
Link continua sendo `<a>`: o botão do WhatsApp navega, e navegação não é `<button>`.

**O Storybook mostra os estados que a página não mostra**, que é para o que ele serve aqui:

| Story | O estado que ela revela |
|---|---|
| `Catalogo/Cartao de equipamento` → `NomeLongo` | título de três linhas desalinhando a fileira |
| `Catalogo/Cartao de equipamento` → `PoucosDados` | cartão curto, com o botão ainda alinhado na base |
| `Catalogo/Secao do catalogo` → `Vazio` | categoria sem item: explica e devolve o caminho |
| `Navegacao/Topo` → `SecaoAtiva` | o item da seção corrente, sem depender de rolagem |
| `Contato/Montar orcamento` | a prévia da mensagem montando a cada tecla |

A barra do Storybook troca **língua**, e não tema, porque a página tem um tema só. Trocar para inglês
é o que pega rótulo que cabe em português e estoura na outra língua.

`CatalogSection` recebe a lista por `source`, com o catálogo real como padrão — é o que permite a
story do estado vazio sem tocar no conteúdo.

> ⚠️ **Duas armadilhas do Storybook com Vite 8**, herdadas do `components_storybook-v1` e já pagas lá:
> o `@storybook/vue3-vite` 10.6 não injeta o plugin do Vue (todo `.vue` cairia no parser de
> JavaScript), e o `vite-plugin-vuetify` 2.1.3 quebra no `configResolved`. O `.storybook/main.ts`
> injeta o plugin do Vue à mão e não usa o do Vuetify; o `preview.ts` registra os componentes do
> Vuetify de uma vez.

---

## 🛡️ Segurança

As mesmas camadas dos outros repositórios, no que faz sentido para uma página pública sem sessão.

| Camada | O que é |
|---|---|
| **Sem backend** | não há API, banco, formulário submetido nem cookie. É a maior delas, e é arquitetural |
| **CSP fechada** | `default-src 'self'`, `script-src 'self'`, `connect-src 'self'`, `form-action 'none'`, `frame-ancestors 'none'`, `object-src 'none'` |
| **Cabeçalhos** | `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` negando câmera, microfone, localização, pagamento e USB |
| **nginx não-root** | `nginxinc/nginx-unprivileged`, porta 8080, `server_tokens off` |
| **Pipeline** | action fixada por commit, `permissions: {}` no topo, checkout sem credencial persistida, `npm audit` recusando aviso em dependência de produção |
| **Imagem** | publicada no GHCR só fora de pull request, com proveniência e SBOM |
| **Token de pacote** | secret do BuildKit durante o `npm ci`, nunca `ARG` nem `ENV` |
| **Dependabot** | actions e imagem base toda semana |

**A página é embutível? Não.** `frame-ancestors 'none'` e `X-Frame-Options: DENY` continuam valendo
mesmo sem sessão: um iframe dela numa página de terceiro serve para colar a marca da KRLoc em golpe.

**Risco aceito, escrito:** o número do WhatsApp e o e-mail ficam no HTML, e robô de spam colhe os dois.
É o preço de ser um canal de contato público, e o ganho — um toque até a conversa — paga.

---

## 🐳 Container e deploy

```bash
docker compose up -d --build --wait     # localhost:5176
```

Um estágio de build com Node 22 e um de runtime com nginx. O `NODE_AUTH_TOKEN` (clássico, com
`read:packages`) precisa estar no ambiente de quem roda o build, por causa do `dotlog-ui`.

No plano de deploy do ecossistema — VPS em São Paulo, fechado por WireGuard — **esta é a única
aplicação que fica fora da VPN**, porque ela existe para ser encontrada. O Caddy a serve no domínio
público; o SSO, o console e o front da locação continuam só na rede fechada. É a razão de ela não ter
backend: o que está exposto não tem o que vazar.

---

## 📁 Estrutura

```bash
.github/workflows/ci.yml   # auditoria, lint, build, Storybook e imagem
nginx.conf                 # CSP e cabeçalhos; sem proxy, porque não há API
scripts/
├─ check-locales.mjs       # as duas línguas conferidas contra o en.json
└─ make-placeholders.mjs   # gera os SVG de demonstração
src/
├─ content/                # catalog.ts e company.ts: o que será trocado pelo real
├─ locales/                # pt-BR.json e en.json: todo o texto de tela
├─ composables/            # reveal, scroll spy, filtro do catálogo, link do WhatsApp
├─ components/             # as seções da página + as stories
├─ mocks/                  # dados das stories, nunca da página
└─ styles/main.scss        # os tokens da identidade
```

---

## ✅ Invariantes ao alterar

- **Nada de backend.** Endpoint, banco, cookie ou formulário que submeta é regressão desta página.
  Precisou de dado dinâmico, a decisão é a tabela das três camadas, não um `fetch` improvisado.
- **Nenhum import do `krloc-api-v1`, do `sso-api-v1` ou de pasta vizinha.** A única porta é o npm.
- Código e nomes em **inglês**, e o código **sem comentário**. O que explica decisão mora aqui.
- Texto de tela vai para as duas línguas. Mexeu, rode `npm run check:locales`.
- Laranja de texto pequeno é `--site-signal-strong`. `--site-signal` é para preenchimento.
- Componente novo nasce com story, e com pelo menos um estado que a página não mostra.
- Animação nova tem contrapartida em `prefers-reduced-motion`.
- Alvo de toque com no mínimo 44px, e o cartão inteiro clicável por um `<a>` só.
- `CatalogItem` não ganha preço nem disponibilidade. Se ganhar, a vitrine virou o sistema.
