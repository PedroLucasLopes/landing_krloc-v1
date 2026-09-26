<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import EquipmentCard from '@/components/EquipmentCard.vue'
  import { useCatalogFilter } from '@/composables/useCatalogFilter'
  import { catalog, type CatalogItem, categories } from '@/content/catalog'

  const props = withDefaults(defineProps<{ source?: CatalogItem[] }>(), {
    source: () => catalog,
  })

  const { t } = useI18n()
  const { selected, select } = useCatalogFilter()

  const items = computed(() =>
    selected.value === 'all'
      ? props.source
      : props.source.filter(item => item.category === selected.value),
  )
</script>

<template>
  <section id="equipamentos" class="site-section">
    <div class="site-container">
      <header class="site-head catalog__head">
        <div>
          <span v-reveal class="site-eyebrow">{{ t('catalog.eyebrow') }}</span>
          <h2 v-reveal="70" class="site-title">{{ t('catalog.title') }}</h2>
          <p v-reveal="130" class="site-lede">{{ t('catalog.text') }}</p>
        </div>

        <p v-reveal="190" class="catalog__count">
          {{ t('catalog.count', { count: items.length }) }}
        </p>
      </header>

      <div v-reveal :aria-label="t('catalog.eyebrow')" class="catalog__filters" role="group">
        <button
          :aria-pressed="selected === 'all'"
          class="catalog__chip"
          :class="{ 'is-active': selected === 'all' }"
          type="button"
          @click="select('all')"
        >
          {{ t('catalog.all') }}
        </button>

        <button
          v-for="category in categories"
          :key="category"
          :aria-pressed="selected === category"
          class="catalog__chip"
          :class="{ 'is-active': selected === category }"
          type="button"
          @click="select(category)"
        >
          {{ t(`categories.${category}`) }}
        </button>
      </div>

      <div :key="selected" class="catalog__grid">
        <EquipmentCard
          v-for="item in items"
          :key="item.slug"
          :item="item"
        />
      </div>

      <p v-if="items.length === 0" class="catalog__empty">
        {{ t('catalog.empty') }}
        <button class="catalog__reset" type="button" @click="select('all')">
          {{ t('catalog.reset') }}
        </button>
      </p>
    </div>
  </section>
</template>

<style scoped>
.catalog__head {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-end;
  justify-content: space-between;
}

.catalog__count {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--site-steel);
  white-space: nowrap;
}

.catalog__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.catalog__chip {
  min-height: 42px;
  padding: 0 16px;
  background: transparent;
  border: 1px solid var(--site-line);
  border-radius: 999px;
  color: var(--site-muted);
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition:
    color 0.25s var(--site-ease),
    border-color 0.25s var(--site-ease),
    background 0.25s var(--site-ease);
}

.catalog__chip:hover {
  color: var(--site-text);
  border-color: var(--site-steel);
}

.catalog__chip.is-active {
  background: var(--site-signal);
  border-color: var(--site-signal);
  color: var(--site-signal-ink);
  font-weight: 700;
}

.catalog__grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fill, minmax(268px, 1fr));
  animation: catalog-in 0.45s var(--site-ease);
}

@keyframes catalog-in {
  from {
    opacity: 0;
    transform: translate3d(0, 14px, 0);
  }
}

.catalog__empty {
  padding: 48px 0;
  text-align: center;
  color: var(--site-muted);
}

.catalog__reset {
  background: none;
  border: 0;
  color: var(--site-signal);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
}

@media (prefers-reduced-motion: reduce) {
  .catalog__grid {
    animation: none;
  }
}
</style>
