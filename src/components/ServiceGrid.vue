<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const items = [
    { index: 0, icon: 'mdi-domain' },
    { index: 1, icon: 'mdi-factory' },
    { index: 2, icon: 'mdi-calendar-range' },
    { index: 3, icon: 'mdi-hammer-wrench' },
  ] as const
</script>

<template>
  <section id="servicos" class="site-section">
    <div class="site-container">
      <header class="site-head">
        <span v-reveal class="site-eyebrow">{{ t('services.eyebrow') }}</span>
        <h2 v-reveal="70" class="site-title">{{ t('services.title') }}</h2>
        <p v-reveal="130" class="site-lede">{{ t('services.text') }}</p>
      </header>

      <div class="services">
        <article
          v-for="(item, position) in items"
          :key="item.index"
          v-reveal="position * 90"
          class="services__card"
        >
          <span aria-hidden="true" class="services__icon">
            <span class="mdi" :class="item.icon" />
          </span>

          <h3 class="services__title">{{ t(`services.items.${item.index}.title`) }}</h3>
          <p class="services__text">{{ t(`services.items.${item.index}.text`) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.services__card {
  position: relative;
  padding: 28px 24px 30px;
  background: var(--site-surface);
  border: 1px solid var(--site-line-soft);
  border-radius: var(--site-radius);
  overflow: hidden;
  transition:
    transform 0.4s var(--site-ease),
    border-color 0.4s var(--site-ease);
}

.services__card::before {
  content: '';
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 3px;
  background: var(--site-signal);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s var(--site-ease);
}

.services__card:hover {
  transform: translateY(-6px);
  border-color: var(--site-line);
}

.services__card:hover::before {
  transform: scaleX(1);
}

.services__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--site-line);
  border-radius: var(--site-radius);
  background: var(--site-signal-soft);
  color: var(--site-signal);
  font-size: 24px;
}

.services__title {
  font-size: 19px;
  font-weight: 700;
  margin-top: 20px;
}

.services__text {
  margin-top: 10px;
  color: var(--site-muted);
  font-size: 14.5px;
}
</style>
