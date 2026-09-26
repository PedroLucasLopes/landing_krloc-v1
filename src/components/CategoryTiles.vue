<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useCatalogFilter } from '@/composables/useCatalogFilter'
  import { catalog, categories, type CategoryId } from '@/content/catalog'

  const { t } = useI18n()
  const { jumpTo } = useCatalogFilter()

  const icons: Record<CategoryId, string> = {
    lifting: 'mdi-crane',
    compaction: 'mdi-road-variant',
    concrete: 'mdi-cube-outline',
    power: 'mdi-lightning-bolt',
    access: 'mdi-view-grid-outline',
    demolition: 'mdi-hammer',
  }

  function count (category: CategoryId): number {
    return catalog.filter(item => item.category === category).length
  }
</script>

<template>
  <section class="tiles">
    <div class="site-container tiles__grid">
      <button
        v-for="(category, position) in categories"
        :key="category"
        v-reveal="position * 70"
        class="tiles__tile"
        type="button"
        @click="jumpTo(category)"
      >
        <span aria-hidden="true" class="tiles__icon">
          <span class="mdi" :class="icons[category]" />
        </span>

        <span class="tiles__name">{{ t(`categories.${category}`) }}</span>
        <span class="tiles__count">{{ t('catalog.count', { count: count(category) }) }}</span>
        <span aria-hidden="true" class="mdi mdi-arrow-right tiles__arrow" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.tiles {
  position: relative;
  z-index: 2;
  margin-top: clamp(-40px, -4vw, -24px);
}

.tiles__grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(178px, 1fr));
}

.tiles__tile {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 18px 22px;
  text-align: left;
  background: var(--site-surface);
  border: 1px solid var(--site-line-soft);
  border-radius: var(--site-radius-lg);
  box-shadow: var(--site-shadow);
  cursor: pointer;
  overflow: hidden;
  transition:
    transform 0.35s var(--site-ease),
    box-shadow 0.35s var(--site-ease),
    border-color 0.35s var(--site-ease);
}

.tiles__tile::before {
  content: '';
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 4px;
  background: var(--site-signal);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--site-ease);
}

.tiles__tile:hover {
  transform: translateY(-6px);
  border-color: var(--site-signal);
  box-shadow: var(--site-shadow-lift);
}

.tiles__tile:hover::before {
  transform: scaleX(1);
}

.tiles__icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: var(--site-signal-soft);
  color: var(--site-signal-strong);
  font-size: 24px;
  margin-bottom: 8px;
}

.tiles__name {
  font-family: var(--font-heading);
  font-size: 16.5px;
  font-weight: 800;
  line-height: 1.15;
}

.tiles__count {
  font-size: 12.5px;
  color: var(--site-steel);
}

.tiles__arrow {
  position: absolute;
  top: 20px;
  right: 18px;
  color: var(--site-line);
  transition: color 0.3s var(--site-ease), transform 0.3s var(--site-ease);
}

.tiles__tile:hover .tiles__arrow {
  color: var(--site-signal);
  transform: translateX(4px);
}
</style>
