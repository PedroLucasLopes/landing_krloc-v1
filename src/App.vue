<script setup lang="ts">
  import { cssVariables, lightColors } from '@pedrolucaslopes/dotlog-ui'
  import { useI18n } from 'vue-i18n'
  import CatalogSection from '@/components/CatalogSection.vue'
  import CategoryTiles from '@/components/CategoryTiles.vue'
  import CtaBanner from '@/components/CtaBanner.vue'
  import HowItWorks from '@/components/HowItWorks.vue'
  import QuoteComposer from '@/components/QuoteComposer.vue'
  import ServiceGrid from '@/components/ServiceGrid.vue'
  import SiteFaq from '@/components/SiteFaq.vue'
  import SiteFooter from '@/components/SiteFooter.vue'
  import SiteHeader from '@/components/SiteHeader.vue'
  import SiteHero from '@/components/SiteHero.vue'
  import StatStrip from '@/components/StatStrip.vue'
  import WhatsAppFab from '@/components/WhatsAppFab.vue'
  import WhyGrid from '@/components/WhyGrid.vue'
  import { useScrollSpy } from '@/composables/useScrollSpy'

  const { t } = useI18n()

  const active = useScrollSpy(['equipamentos', 'servicos', 'como-funciona', 'duvidas'])

  for (const [token, value] of Object.entries(cssVariables(lightColors))) {
    document.documentElement.style.setProperty(token, value)
  }
</script>

<template>
  <a class="site-skip" href="#conteudo">{{ t('nav.skip') }}</a>

  <SiteHeader :active="active" />

  <main id="conteudo">
    <SiteHero />
    <CategoryTiles />
    <CatalogSection />
    <StatStrip />
    <HowItWorks />
    <ServiceGrid />
    <CtaBanner />
    <WhyGrid />
    <QuoteComposer />
    <SiteFaq />
  </main>

  <SiteFooter />
  <WhatsAppFab />
</template>
