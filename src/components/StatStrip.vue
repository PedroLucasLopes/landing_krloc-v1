<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const items = [
    { index: 0, icon: 'mdi-calendar-star' },
    { index: 1, icon: 'mdi-hard-hat' },
    { index: 2, icon: 'mdi-excavator' },
    { index: 3, icon: 'mdi-truck-fast' },
  ] as const
</script>

<template>
  <section :aria-label="t('why.title')" class="stats">
    <div class="site-container stats__grid">
      <div
        v-for="(item, position) in items"
        :key="item.index"
        v-reveal="position * 90"
        class="stats__item"
      >
        <span aria-hidden="true" class="stats__icon">
          <span class="mdi" :class="item.icon" />
        </span>

        <strong class="stats__value">{{ t(`stats.items.${item.index}.value`) }}</strong>
        <span class="stats__label">{{ t(`stats.items.${item.index}.label`) }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats {
  background: var(--site-deep);
  padding-block: clamp(36px, 5vw, 56px);
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(20px, 3vw, 32px);
}

.stats__item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stats__icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 196, 0, 0.16);
  color: var(--site-hazard);
  font-size: 23px;
  margin-bottom: 12px;
}

.stats__value {
  font-family: var(--font-heading);
  font-size: clamp(34px, 5vw, 52px);
  font-weight: 800;
  line-height: 1;
  color: var(--site-hazard);
  font-variant-numeric: tabular-nums;
}

.stats__label {
  font-size: 14px;
  color: var(--site-on-deep-muted);
  line-height: 1.4;
  max-width: 22ch;
}

@media (min-width: 840px) {
  .stats__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
