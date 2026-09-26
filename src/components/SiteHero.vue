<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useWhatsapp } from '@/composables/useWhatsapp'

  const { t } = useI18n()
  const { general } = useWhatsapp()

  const marks = [0, 1, 2] as const
</script>

<template>
  <section id="topo" class="hero">
    <img
      alt=""
      class="hero__banner"
      fetchpriority="high"
      height="900"
      src="/banners/hero.svg"
      width="1600"
    >

    <div aria-hidden="true" class="hero__veil" />

    <div class="site-container hero__inner">
      <span v-reveal class="site-tag site-tag--signal hero__flag">
        <span aria-hidden="true" class="hero__dot" />
        {{ t('hero.badge') }}
      </span>

      <h1 v-reveal="80" class="hero__title">
        {{ t('hero.title') }}
        <span class="hero__title-accent">{{ t('hero.highlight') }}</span>
      </h1>

      <p v-reveal="160" class="hero__text">{{ t('hero.text') }}</p>

      <div v-reveal="240" class="hero__actions">
        <a class="site-btn site-btn--primary" href="#equipamentos">
          {{ t('hero.primary') }}
          <span aria-hidden="true" class="mdi mdi-arrow-right" />
        </a>

        <a
          class="site-btn site-btn--ghost"
          :href="general"
          rel="noopener"
          target="_blank"
        >
          <span aria-hidden="true" class="mdi mdi-whatsapp" />
          {{ t('hero.secondary') }}
        </a>
      </div>

      <ul v-reveal="320" class="hero__marks">
        <li v-for="mark in marks" :key="mark">
          <span aria-hidden="true" class="mdi mdi-check-decagram" />
          {{ t(`why.items.${mark}.title`) }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  min-height: clamp(560px, 78vh, 760px);
  display: flex;
  align-items: center;
  padding-top: clamp(112px, 14vw, 150px);
  padding-bottom: clamp(72px, 10vw, 120px);
  overflow: hidden;
}

.hero__banner {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.82) 46%,
      rgba(255, 255, 255, 0.55) 100%
    );
}

.hero__inner {
  position: relative;
}

.hero__flag {
  box-shadow: 0 12px 26px -16px rgba(255, 122, 26, 0.9);
}

.hero__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #14301a;
  box-shadow: 0 0 0 0 rgba(20, 48, 26, 0.5);
  animation: hero-pulse 2.4s infinite;
}

@keyframes hero-pulse {
  70% {
    box-shadow: 0 0 0 10px rgba(20, 48, 26, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(20, 48, 26, 0);
  }
}

.hero__title {
  font-size: clamp(40px, 7.4vw, 82px);
  margin-top: 20px;
  max-width: 15ch;
}

.hero__title-accent {
  display: block;
  color: var(--site-signal-strong);
}

.hero__text {
  margin-top: 22px;
  max-width: 50ch;
  color: var(--site-muted);
  font-size: clamp(16px, 1.7vw, 19px);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

.hero__marks {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 26px;
  margin: 30px 0 0;
  padding: 0;
  font-family: var(--font-heading);
  font-size: 13.5px;
  font-weight: 700;
  color: var(--site-text);
}

.hero__marks li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.hero__marks .mdi {
  color: var(--site-signal);
  font-size: 19px;
}

@media (min-width: 860px) {
  .hero__veil {
    background:
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.97) 0%,
        rgba(255, 255, 255, 0.9) 42%,
        rgba(255, 255, 255, 0.45) 70%,
        rgba(255, 255, 255, 0.1) 100%
      );
  }
}
</style>
