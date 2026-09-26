<script setup lang="ts">
  import { DlExpansion } from '@pedrolucaslopes/dotlog-ui'
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useWhatsapp } from '@/composables/useWhatsapp'

  const { t } = useI18n()
  const { general } = useWhatsapp()

  const indexes = [0, 1, 2, 3, 4] as const

  const open = ref<string[]>(['faq-0'])

  const panels = computed(() =>
    indexes.map(index => ({ key: `faq-${index}`, title: t(`faq.items.${index}.q`) })),
  )
</script>

<template>
  <section id="duvidas" class="site-section site-section--alt">
    <div class="site-container faq">
      <header class="faq__head">
        <span v-reveal class="site-eyebrow">{{ t('faq.eyebrow') }}</span>
        <h2 v-reveal="70" class="site-title">{{ t('faq.title') }}</h2>

        <a
          v-reveal="130"
          class="site-btn site-btn--ghost faq__cta"
          :href="general"
          rel="noopener"
          target="_blank"
        >
          <span aria-hidden="true" class="mdi mdi-whatsapp" />
          {{ t('fab.label') }}
        </a>
      </header>

      <div v-reveal="90" class="faq__panels">
        <DlExpansion multiple :open="open" :panels="panels" @update:open="open = $event">
          <template #faq-0>
            <p class="faq__answer">{{ t('faq.items.0.a') }}</p>
          </template>

          <template #faq-1>
            <p class="faq__answer">{{ t('faq.items.1.a') }}</p>
          </template>

          <template #faq-2>
            <p class="faq__answer">{{ t('faq.items.2.a') }}</p>
          </template>

          <template #faq-3>
            <p class="faq__answer">{{ t('faq.items.3.a') }}</p>
          </template>

          <template #faq-4>
            <p class="faq__answer">{{ t('faq.items.4.a') }}</p>
          </template>
        </DlExpansion>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  display: grid;
  gap: clamp(28px, 4vw, 56px);
  align-items: start;
}

.faq__cta {
  margin-top: 26px;
}

.faq__answer {
  color: var(--site-muted);
  font-size: 14.5px;
  max-width: 62ch;
}

@media (min-width: 960px) {
  .faq {
    grid-template-columns: 0.8fr 1.2fr;
  }

  .faq__head {
    position: sticky;
    top: 120px;
  }
}
</style>
