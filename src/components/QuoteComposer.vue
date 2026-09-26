<script setup lang="ts">
  import { DlButton, DlSelect, DlTextField } from '@pedrolucaslopes/dotlog-ui'
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { whatsappLink } from '@/composables/useWhatsapp'
  import { catalog } from '@/content/catalog'

  const { t } = useI18n()

  const periodKeys = ['daily', 'weekly', 'monthly', 'undecided'] as const

  const name = ref('')
  const place = ref('')
  const period = ref<string | null>(null)
  const picked = ref<string[]>([])
  const notes = ref('')
  const copied = ref(false)

  const periodOptions = computed(() =>
    periodKeys.map(key => ({ title: t(`quote.periods.${key}`), value: key })),
  )

  const itemOptions = computed(() => catalog.map(item => ({ title: item.name, value: item.slug })))

  const pickedNames = computed(() =>
    picked.value
      .map(slug => catalog.find(item => item.slug === slug)?.name)
      .filter(Boolean)
      .join(', '),
  )

  const message = computed(() => {
    const lines = [t('quote.message.intro')]

    if (name.value.trim()) {
      lines.push(t('quote.message.name', { value: name.value.trim() }))
    }

    if (place.value.trim()) {
      lines.push(t('quote.message.site', { value: place.value.trim() }))
    }

    if (period.value) {
      lines.push(t('quote.message.period', { value: t(`quote.periods.${period.value}`) }))
    }

    if (pickedNames.value) {
      lines.push(t('quote.message.items', { value: pickedNames.value }))
    }

    if (notes.value.trim()) {
      lines.push(t('quote.message.notes', { value: notes.value.trim() }))
    }

    return lines.join('\n')
  })

  const href = computed(() => whatsappLink(message.value))

  const setText = (value: string | number | null): string => (value === null ? '' : String(value))

  async function copy (): Promise<void> {
    try {
      await navigator.clipboard.writeText(message.value)
      copied.value = true
      globalThis.setTimeout(() => {
        copied.value = false
      }, 2200)
    } catch {
      copied.value = false
    }
  }
</script>

<template>
  <section id="orcamento" class="site-section">
    <div class="site-container quote">
      <header class="quote__head">
        <span v-reveal class="site-eyebrow">{{ t('quote.eyebrow') }}</span>
        <h2 v-reveal="70" class="site-title">{{ t('quote.title') }}</h2>
        <p v-reveal="130" class="site-lede">{{ t('quote.text') }}</p>

        <p v-reveal="190" class="quote__privacy">
          <span aria-hidden="true" class="mdi mdi-lock-outline" />
          {{ t('quote.privacy') }}
        </p>
      </header>

      <div v-reveal="90" class="quote__panel">
        <div class="quote__fields">
          <DlTextField
            icon="mdi-account-hard-hat"
            :label="t('quote.name')"
            :model-value="name"
            :placeholder="t('quote.namePlaceholder')"
            @update:model-value="name = setText($event)"
          />

          <DlTextField
            icon="mdi-map-marker-outline"
            :label="t('quote.site')"
            :model-value="place"
            :placeholder="t('quote.sitePlaceholder')"
            @update:model-value="place = setText($event)"
          />

          <DlSelect
            icon="mdi-calendar-range"
            :label="t('quote.period')"
            :model-value="period"
            :options="periodOptions"
            @update:model-value="period = ($event as string | null)"
          />

          <DlSelect
            class="quote__wide"
            :hint="t('quote.itemsHint')"
            icon="mdi-excavator"
            :label="t('quote.items')"
            :model-value="picked"
            multiple
            :options="itemOptions"
            searchable
            @update:model-value="picked = ($event as string[])"
          />

          <DlTextField
            class="quote__wide"
            :label="t('quote.notes')"
            :model-value="notes"
            :placeholder="t('quote.notesPlaceholder')"
            :rows="3"
            @update:model-value="notes = setText($event)"
          />
        </div>

        <aside class="quote__preview">
          <h3 class="quote__preview-title">{{ t('quote.preview') }}</h3>
          <pre class="quote__message">{{ message }}</pre>

          <div class="quote__actions">
            <a
              class="site-btn site-btn--primary quote__send"
              :href="href"
              rel="noopener"
              target="_blank"
            >
              <span aria-hidden="true" class="mdi mdi-whatsapp" />
              {{ t('quote.submit') }}
            </a>

            <DlButton
              :icon="copied ? 'mdi-check' : 'mdi-content-copy'"
              :label="copied ? t('quote.copied') : t('quote.copy')"
              variant="outlined"
              @click="copy"
            />
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quote__privacy {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  margin-top: 20px;
  max-width: 48ch;
  font-size: 13px;
  color: var(--site-steel);
}

.quote__privacy .mdi {
  color: var(--site-signal);
  font-size: 17px;
}

.quote__panel {
  margin-top: clamp(28px, 4vw, 48px);
  display: grid;
  gap: 1px;
  background: var(--site-line-soft);
  border: 1px solid var(--site-line-soft);
  border-radius: var(--site-radius);
  overflow: hidden;
}

.quote__fields {
  background: var(--site-surface);
  padding: clamp(20px, 3vw, 32px);
  display: grid;
  gap: 4px 18px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  align-content: start;
}

.quote__wide {
  grid-column: 1 / -1;
}

.quote__preview {
  background: var(--site-bg);
  padding: clamp(20px, 3vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.quote__preview-title {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--site-steel);
}

.quote__message {
  flex: 1;
  margin: 0;
  padding: 16px;
  min-height: 190px;
  background: var(--site-surface);
  border: 1px solid var(--site-line-soft);
  border-radius: var(--site-radius);
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.65;
  color: var(--site-text);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.quote__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.quote__send {
  flex: 1;
  min-width: 220px;
}

@media (min-width: 960px) {
  .quote__panel {
    grid-template-columns: 1.05fr 0.95fr;
  }
}
</style>
