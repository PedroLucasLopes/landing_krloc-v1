import { createDotlogLocale, THEME_LIGHT, vuetifyOptions } from '@pedrolucaslopes/dotlog-ui'
import { useI18n } from 'vue-i18n'
import { createVuetify } from 'vuetify'
import { i18n } from './i18n'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@pedrolucaslopes/dotlog-ui/styles'

export default createVuetify({
  ...vuetifyOptions,
  theme: { ...vuetifyOptions.theme, defaultTheme: THEME_LIGHT },
  locale: createDotlogLocale({ i18n, useI18n }),
})
