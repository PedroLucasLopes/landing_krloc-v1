import type { StorybookConfig } from '@storybook/vue3-vite'
import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'

/**
 * Duas coisas aqui nao sao obvias, e as duas ja custaram tempo no
 * components_storybook-v1:
 *
 * **O plugin do Vue entra a mao.** O `@storybook/vue3-vite` 10.6 nao injeta
 * `@vitejs/plugin-vue` na config resolvida com Vite 8. Sem ele, todo arquivo
 * `.vue` cai no parser de JavaScript e o erro aponta para a linha 1 do
 * `<script setup>`, longe da causa.
 *
 * **Sem `vite-plugin-vuetify`.** A versao 2.1.3 quebra com Vite 8 dentro do
 * Storybook. Ele so serve para auto-import e tree-shaking; aqui o `preview.ts`
 * registra os componentes do Vuetify de uma vez. A aplicacao continua usando o
 * plugin no `vite.config.mts`, onde ele funciona.
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async config => {
    config.plugins = config.plugins ?? []

    const names = new Set(
      config.plugins
        .flat()
        .map(plugin => (plugin && typeof plugin === 'object' && 'name' in plugin ? String(plugin.name) : '')),
    )

    if (!names.has('vite:vue')) {
      config.plugins.push(Vue())
    }

    config.resolve = config.resolve ?? {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': fileURLToPath(new URL('../src', import.meta.url)),
    }

    return config
  },
}

export default config
