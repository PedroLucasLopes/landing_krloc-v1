<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const steps = [0, 1, 2, 3] as const
</script>

<template>
  <section id="como-funciona" class="site-section site-section--alt">
    <div class="site-container">
      <header class="site-head">
        <span v-reveal class="site-eyebrow">{{ t('how.eyebrow') }}</span>
        <h2 v-reveal="70" class="site-title">{{ t('how.title') }}</h2>
        <p v-reveal="130" class="site-lede">{{ t('how.text') }}</p>
      </header>

      <ol class="steps">
        <li
          v-for="(step, position) in steps"
          :key="step"
          v-reveal="position * 110"
          class="steps__item"
        >
          <span class="steps__number">{{ String(position + 1).padStart(2, '0') }}</span>
          <h3 class="steps__title">{{ t(`how.items.${step}.title`) }}</h3>
          <p class="steps__text">{{ t(`how.items.${step}.text`) }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  counter-reset: step;
}

.steps__item {
  position: relative;
  padding-top: 26px;
  border-top: 1px solid var(--site-line);
}

/* A linha do tempo so aparece quando os passos estao na mesma fileira: empilhados,
   uma linha horizontal entre eles nao significaria nada. */
.steps__item::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 0;
  width: 9px;
  height: 9px;
  background: var(--site-signal);
  transform: rotate(45deg);
}

.steps__number {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: var(--site-signal);
}

.steps__title {
  font-size: 19px;
  font-weight: 700;
  margin-top: 10px;
}

.steps__text {
  margin-top: 8px;
  color: var(--site-muted);
  font-size: 14.5px;
}
</style>
