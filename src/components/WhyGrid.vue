<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const items = [
    { index: 0, icon: 'mdi-shield-check' },
    { index: 1, icon: 'mdi-tag-check' },
    { index: 2, icon: 'mdi-truck-fast' },
    { index: 3, icon: 'mdi-file-document-check' },
  ] as const
</script>

<template>
  <section class="site-section site-section--alt">
    <div class="site-container why">
      <header class="why__head">
        <span v-reveal class="site-eyebrow">{{ t('why.eyebrow') }}</span>
        <h2 v-reveal="70" class="site-title">{{ t('why.title') }}</h2>
      </header>

      <ul class="why__list">
        <li
          v-for="(item, position) in items"
          :key="item.index"
          v-reveal="position * 80"
          class="why__item"
        >
          <span aria-hidden="true" class="why__icon">
            <span class="mdi" :class="item.icon" />
          </span>

          <div>
            <h3 class="why__title">{{ t(`why.items.${item.index}.title`) }}</h3>
            <p class="why__text">{{ t(`why.items.${item.index}.text`) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.why {
  display: grid;
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

.why__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 18px;
}

.why__item {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 16px;
  align-items: start;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--site-line-soft);
}

.why__item:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.why__icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--site-signal-soft);
  color: var(--site-signal);
  font-size: 21px;
}

.why__title {
  font-size: 17px;
  font-weight: 700;
}

.why__text {
  margin-top: 4px;
  color: var(--site-muted);
  font-size: 14.5px;
}

@media (min-width: 960px) {
  .why {
    grid-template-columns: 0.9fr 1.1fr;
  }
}
</style>
