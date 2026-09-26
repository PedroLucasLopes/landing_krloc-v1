<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStuck } from '@/composables/useScrollSpy'
  import { useWhatsapp } from '@/composables/useWhatsapp'

  const { t } = useI18n()
  const { general } = useWhatsapp()
  const visible = useStuck(620)
</script>

<template>
  <a
    :aria-hidden="!visible"
    :aria-label="t('fab.label')"
    class="fab"
    :class="{ 'is-visible': visible }"
    :href="general"
    rel="noopener"
    :tabindex="visible ? 0 : -1"
    target="_blank"
  >
    <span aria-hidden="true" class="mdi mdi-whatsapp fab__icon" />
    <span class="fab__label">{{ t('fab.short') }}</span>
  </a>
</template>

<style scoped>
.fab {
  position: fixed;
  right: clamp(16px, 3vw, 28px);
  bottom: clamp(16px, 3vw, 28px);
  z-index: 35;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 56px;
  padding: 0 20px;
  border-radius: 999px;
  background: #25d366;
  color: #08130b;
  font-family: var(--font-heading);
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 14px 30px -14px rgba(0, 0, 0, 0.85);
  opacity: 0;
  transform: translate3d(0, 20px, 0) scale(0.94);
  pointer-events: none;
  transition:
    opacity 0.4s var(--site-ease),
    transform 0.4s var(--site-ease);
}

.fab.is-visible {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

.fab:hover {
  background: #2ee574;
}

.fab__icon {
  font-size: 25px;
}

@media (max-width: 599px) {
  .fab {
    height: 54px;
    width: 54px;
    padding: 0;
    justify-content: center;
  }

  .fab__label {
    display: none;
  }
}
</style>
