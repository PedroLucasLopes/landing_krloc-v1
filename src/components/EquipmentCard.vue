<script setup lang="ts">
  import type { CatalogItem } from '@/content/catalog'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useWhatsapp } from '@/composables/useWhatsapp'

  const props = defineProps<{ item: CatalogItem }>()

  const { t } = useI18n()
  const { forItem } = useWhatsapp()

  const href = computed(() => forItem(props.item.name))
  const label = computed(() => `${t('catalog.cta')}: ${props.item.name}`)
</script>

<template>
  <article class="card" :class="{ 'is-featured': item.featured }">
    <div class="card__media">
      <img
        alt=""
        class="card__image"
        decoding="async"
        height="480"
        loading="lazy"
        :src="item.image"
        width="640"
      >

      <span v-if="item.featured" class="card__flag">{{ t('catalog.featured') }}</span>
      <span class="card__category">{{ t(`categories.${item.category}`) }}</span>
    </div>

    <div class="card__body">
      <h3 class="card__title">{{ item.name }}</h3>
      <p class="card__summary">{{ item.summary }}</p>

      <dl class="card__specs">
        <div v-for="spec in item.specs" :key="spec.label" class="card__spec">
          <dt>{{ spec.label }}</dt>
          <dd>{{ spec.value }}</dd>
        </div>
      </dl>

      <a
        :aria-label="label"
        class="card__cta"
        :href="href"
        rel="noopener"
        target="_blank"
      >
        <span aria-hidden="true" class="mdi mdi-whatsapp" />
        {{ t('catalog.cta') }}
        <span aria-hidden="true" class="mdi mdi-arrow-right card__arrow" />
      </a>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--site-surface);
  border: 1px solid var(--site-line-soft);
  border-radius: var(--site-radius);
  overflow: hidden;
  transition:
    transform 0.4s var(--site-ease),
    border-color 0.4s var(--site-ease),
    box-shadow 0.4s var(--site-ease);
}

.card:hover,
.card:focus-within {
  transform: translateY(-6px);
  border-color: var(--site-signal);
  box-shadow: 0 18px 40px -28px rgba(0, 0, 0, 0.9);
}

.card.is-featured {
  border-color: var(--site-line);
}

.card__media {
  position: relative;
  background: var(--site-surface-high);
  overflow: hidden;
}

.card__image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 0.6s var(--site-ease);
}

.card:hover .card__image {
  transform: scale(1.06);
}

.card__flag,
.card__category {
  position: absolute;
  top: 12px;
  font-family: var(--font-heading);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 5px 9px;
  border-radius: 2px;
}

.card__flag {
  left: 12px;
  background: var(--site-signal);
  color: var(--site-signal-ink);
}

.card__category {
  right: 12px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--site-line);
  color: var(--site-steel);
}

.card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
}

.card__title {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}

.card__summary {
  margin-top: 8px;
  color: var(--site-muted);
  font-size: 14px;
}

.card__specs {
  margin: 18px 0 0;
  display: grid;
  gap: 1px;
  background: var(--site-line-soft);
  border: 1px solid var(--site-line-soft);
}

.card__spec {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  background: var(--site-surface);
  padding: 7px 11px;
  font-size: 12.5px;
}

.card__spec dt {
  color: var(--site-steel);
}

.card__spec dd {
  margin: 0;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.card__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 18px;
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  color: var(--site-signal);
  text-decoration: none;
}

/* O cartao inteiro vira alvo de toque, sem duplicar o link para o leitor de
   tela: um unico <a>, esticado por ::after. */
.card__cta::after {
  content: '';
  position: absolute;
  inset: 0;
}

.card__arrow {
  transition: transform 0.35s var(--site-ease);
}

.card:hover .card__arrow {
  transform: translateX(5px);
}
</style>
