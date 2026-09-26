import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { company } from '@/content/company'

export function whatsappLink (message: string): string {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`
}

export function useWhatsapp () {
  const { t } = useI18n()

  const general = computed(() => whatsappLink(t('whatsapp.general')))

  const forItem = (item: string): string => whatsappLink(t('whatsapp.item', { item }))

  return { general, forItem }
}
