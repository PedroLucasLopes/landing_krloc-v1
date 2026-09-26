import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import Fonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

/**
 * A pagina e publica e nao tem sessao, mas continua nao sendo embutivel: um
 * iframe dela numa pagina de terceiro serve para colar a marca em golpe. O
 * nginx de producao repete os mesmos headers.
 */
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': 'frame-ancestors \'none\'',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}

export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Fonts({
      fontsource: {
        families: [
          {
            name: 'Archivo',
            weights: [500, 600, 700, 800],
          },
          {
            name: 'Roboto',
            weights: [300, 400, 500, 700],
          },
        ],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    // `@pedrolucaslopes/dotlog-ui` declara `vue` e `vuetify` como peer. Duas
    // instancias do Vue quebram `inject`, e e por ele que o tema chega.
    dedupe: ['vue', 'vuetify'],
  },
  build: {
    // A pagina e uma so: o corte por rota nao existe, e o aviso de bundle
    // grande do Vite nao ajuda ninguem aqui.
    chunkSizeWarningLimit: 900,
  },
  server: {
    port: 5176,
    strictPort: true,
    headers: securityHeaders,
  },
  preview: {
    port: 5176,
    strictPort: true,
    headers: securityHeaders,
  },
})
