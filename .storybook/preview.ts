import { createDotlogLocale, cssVariables, lightColors, THEME_LIGHT, vuetifyOptions } from '@pedrolucaslopes/dotlog-ui'
import { type Preview, setup } from '@storybook/vue3-vite'
import { useI18n } from 'vue-i18n'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { reveal } from '../src/composables/useReveal'
import { i18n } from '../src/plugins/i18n'
import '@mdi/font/css/materialdesignicons.css'
import '@fontsource/archivo/600.css'
import '@fontsource/archivo/700.css'
import '@fontsource/archivo/800.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import 'vuetify/styles'
import '@pedrolucaslopes/dotlog-ui/styles'
import '../src/styles/main.scss'

/**
 * A pagina tem um tema so, claro, por escolha de identidade: e um site
 * industrial, nao um painel que acompanha a preferencia do sistema. Por isso a
 * barra do Storybook traz lingua, e nao tema. A troca de lingua continua sendo
 * o que pega rotulo que cabe em portugues e estoura em ingles.
 */
const vuetify = createVuetify({
  ...vuetifyOptions,
  theme: { ...vuetifyOptions.theme, defaultTheme: THEME_LIGHT },
  locale: createDotlogLocale({ i18n, useI18n }),
  components,
  directives,
})

setup(app => {
  app.use(i18n)
  app.use(vuetify)
  app.directive('reveal', reveal)

  for (const [token, value] of Object.entries(cssVariables(lightColors))) {
    document.documentElement.style.setProperty(token, value)
  }
})

let appliedLocale: string | null = null

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'Lingua da pagina',
      toolbar: {
        title: 'Lingua',
        icon: 'globe',
        items: [
          { value: 'pt-BR', title: 'Portugues' },
          { value: 'en', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { locale: 'pt-BR' },
  parameters: {
    backgrounds: { disable: true },
    controls: { matchers: { color: /(background|color)$/i } },
    options: {
      storySort: {
        order: ['Pagina', 'Catalogo', 'Contato', 'Navegacao'],
      },
    },
  },
  decorators: [
    (story, context) => ({
      components: { story },
      setup () {
        const requested = context.globals.locale as 'pt-BR' | 'en' | undefined

        if (requested && requested !== appliedLocale) {
          appliedLocale = requested
          i18n.global.locale.value = requested
        }

        document.body.style.background = 'var(--site-bg)'
        document.body.style.color = 'var(--site-text)'

        return {}
      },
      template: '<div style="padding: 24px"><story /></div>',
    }),
  ],
}

export default preview
