import type { App } from 'vue'
import { reveal } from '@/composables/useReveal'
import { i18n } from './i18n'
import vuetify from './vuetify'

export function registerPlugins (app: App) {
  app.use(i18n)
  app.use(vuetify)
  app.directive('reveal', reveal)
}
