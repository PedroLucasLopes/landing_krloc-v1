<script setup lang="ts">
  import { company } from '@/content/company'

  withDefaults(
    defineProps<{
      size?: number
      compact?: boolean
    }>(),
    { size: 34, compact: false },
  )
</script>

<template>
  <span class="site-logo">
    <svg
      aria-hidden="true"
      class="site-logo__mark"
      focusable="false"
      :height="size"
      role="img"
      viewBox="0 0 48 48"
      :width="size"
    >
      <path d="M24 2 44 13v22L24 46 4 35V13Z" fill="none" stroke="currentColor" stroke-width="3" />

      <path
        d="M17 15v18M17 24l11-9M17 24l11 9"
        fill="none"
        stroke="currentColor"
        stroke-linecap="square"
        stroke-width="4"
      />
    </svg>

    <span v-if="!compact" class="site-logo__text">
      <strong>{{ company.name }}</strong>
      <small>{{ company.tagline }}</small>
    </span>
  </span>
</template>

<style scoped>
.site-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--site-signal);
}

.site-logo__text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.site-logo__text strong {
  font-family: var(--font-heading);
  font-size: 21px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--site-text);
}

.site-logo__text small {
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--site-steel);
}
</style>
