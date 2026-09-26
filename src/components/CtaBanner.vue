<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useWhatsapp } from '@/composables/useWhatsapp'

  const { t } = useI18n()
  const { general } = useWhatsapp()
</script>

<template>
  <section v-reveal class="cta">
    <img
      alt=""
      class="cta__banner"
      height="620"
      loading="lazy"
      src="/banners/cta.svg"
      width="1600"
    >

    <div aria-hidden="true" class="cta__veil" />

    <div class="site-container cta__inner">
      <span class="site-tag site-tag--hazard">{{ t('hero.badge') }}</span>

      <h2 class="cta__title">{{ t('quote.title') }}</h2>
      <p class="cta__text">{{ t('catalog.text') }}</p>

      <div class="cta__actions">
        <a
          class="site-btn site-btn--primary"
          :href="general"
          rel="noopener"
          target="_blank"
        >
          <span aria-hidden="true" class="mdi mdi-whatsapp" />
          {{ t('fab.label') }}
        </a>

        <a class="site-btn site-btn--onDeep" href="#orcamento">
          {{ t('nav.quote') }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-block: clamp(56px, 8vw, 96px);
}

.cta__banner {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(
      90deg,
      rgba(16, 26, 32, 0.95) 0%,
      rgba(16, 26, 32, 0.86) 48%,
      rgba(16, 26, 32, 0.45) 100%
    );
}

.cta__inner {
  position: relative;
  color: var(--site-on-deep);
}

.cta__title {
  font-size: clamp(28px, 4.2vw, 46px);
  margin-top: 16px;
  max-width: 18ch;
}

.cta__text {
  margin-top: 14px;
  max-width: 52ch;
  color: var(--site-on-deep-muted);
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}
</style>
