# site_krloc-v1

Página de boas-vindas da KRLoc: locação de equipamentos para obras civis e industriais. Pública, sem
login, sem backend. O contato acontece pelo WhatsApp, com a mensagem montada na própria página.

Vue 3 · Vite 8 · Vuetify 4 · `@pedrolucaslopes/dotlog-ui` · Storybook 10

## Rodar

O pacote `@pedrolucaslopes/dotlog-ui` mora no GitHub Packages e exige um token clássico com
`read:packages` em `NODE_AUTH_TOKEN`. Ele vem do ambiente e nunca de arquivo.

```bash
npm ci
```

```bash
npm run dev
```

A página sobe em `http://localhost:5176`. O Storybook, com os estados de cada componente:

```bash
npm run storybook
```

## Conferir antes de subir

```bash
npm run lint
```

```bash
npm run build
```

`build` roda type-check, confere as traduções contra o `en.json` e gera `dist/`.

## Container

```bash
docker compose up -d --build --wait
```

## Trocar o conteúdo de demonstração

Textos, imagens e dados de contato são mock. Ficam em `src/content/catalog.ts`,
`src/content/company.ts`, `src/locales/*.json` e `public/`. O detalhe de cada um está no
[`CLAUDE.md`](CLAUDE.md), junto da razão de esta página não ter banco nem API.
