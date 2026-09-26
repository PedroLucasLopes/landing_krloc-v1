<script setup lang="ts">
  import { onBeforeUnmount, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import SiteLogo from '@/components/SiteLogo.vue'
  import { useStuck } from '@/composables/useScrollSpy'
  import { useWhatsapp } from '@/composables/useWhatsapp'
  import { company } from '@/content/company'

  const props = withDefaults(defineProps<{ active?: string }>(), { active: '' })

  const { t } = useI18n()
  const { general } = useWhatsapp()
  const stuck = useStuck(24)
  const open = ref(false)

  const links = [
    { id: 'equipamentos', label: 'nav.catalog' },
    { id: 'servicos', label: 'nav.services' },
    { id: 'como-funciona', label: 'nav.how' },
    { id: 'duvidas', label: 'nav.faq' },
  ] as const

  function close (): void {
    open.value = false
  }

  function onKeydown (event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      close()
    }
  }

  watch(open, value => {
    document.body.style.overflow = value ? 'hidden' : ''

    if (value) {
      globalThis.addEventListener('keydown', onKeydown)
    } else {
      globalThis.removeEventListener('keydown', onKeydown)
    }
  })

  onBeforeUnmount(() => {
    document.body.style.overflow = ''
    globalThis.removeEventListener('keydown', onKeydown)
  })
</script>

<template>
  <header class="site-header" :class="{ 'is-stuck': stuck || open }">
    <div class="site-container site-header__bar">
      <a :aria-label="company.name" class="site-header__brand" href="#topo">
        <SiteLogo />
      </a>

      <nav :aria-label="t('nav.catalog')" class="site-header__nav">
        <a
          v-for="link in links"
          :key="link.id"
          :aria-current="props.active === link.id ? 'true' : undefined"
          class="site-header__link"
          :class="{ 'is-active': props.active === link.id }"
          :href="`#${link.id}`"
        >
          {{ t(link.label) }}
        </a>
      </nav>

      <div class="site-header__actions">
        <a
          class="site-btn site-btn--primary site-header__cta"
          :href="general"
          rel="noopener"
          target="_blank"
        >
          <span aria-hidden="true" class="mdi mdi-whatsapp" />
          {{ t('nav.quote') }}
        </a>

        <button
          aria-controls="menu-mobile"
          :aria-expanded="open"
          :aria-label="open ? t('nav.close') : t('nav.menu')"
          class="site-header__toggle"
          type="button"
          @click="open = !open"
        >
          <span class="site-header__burger" :class="{ 'is-open': open }" />
        </button>
      </div>
    </div>

    <div id="menu-mobile" class="site-header__panel" :hidden="!open">
      <a
        v-for="link in links"
        :key="link.id"
        class="site-header__panel-link"
        :href="`#${link.id}`"
        @click="close"
      >
        {{ t(link.label) }}
      </a>

      <a
        class="site-btn site-btn--primary site-header__panel-cta"
        :href="general"
        rel="noopener"
        target="_blank"
        @click="close"
      >
        <span aria-hidden="true" class="mdi mdi-whatsapp" />
        {{ t('nav.quote') }}
      </a>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 40;
  transition: background 0.35s var(--site-ease), box-shadow 0.35s var(--site-ease);
}

.site-header.is-stuck {
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px -22px rgba(17, 24, 29, 0.6);
}

.site-header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-block: 16px;
  transition: padding 0.35s var(--site-ease);
}

.site-header.is-stuck .site-header__bar {
  padding-block: 10px;
}

.site-header__brand {
  text-decoration: none;
}

.site-header__nav {
  display: none;
  gap: 4px;
}

.site-header__link {
  position: relative;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--site-muted);
  text-decoration: none;
  transition: color 0.25s var(--site-ease);
}

.site-header__link::after {
  content: '';
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 4px;
  height: 2px;
  background: var(--site-signal);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s var(--site-ease);
}

.site-header__link:hover,
.site-header__link.is-active {
  color: var(--site-text);
}

.site-header__link.is-active::after,
.site-header__link:hover::after {
  transform: scaleX(1);
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.site-header__cta {
  display: none;
}

.site-header__toggle {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  background: transparent;
  border: 1px solid var(--site-line);
  border-radius: var(--site-radius);
  cursor: pointer;
}

.site-header__burger,
.site-header__burger::before,
.site-header__burger::after {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--site-text);
  transition: transform 0.3s var(--site-ease), opacity 0.2s linear;
}

.site-header__burger::before,
.site-header__burger::after {
  content: '';
  position: relative;
}

.site-header__burger::before {
  top: -6px;
}

.site-header__burger::after {
  top: 4px;
}

.site-header__burger.is-open {
  background: transparent;
}

.site-header__burger.is-open::before {
  transform: translateY(6px) rotate(45deg);
}

.site-header__burger.is-open::after {
  transform: translateY(-6px) rotate(-45deg);
}

/* `display: flex` vence `[hidden]`, que so define `display: none` no agente do
   usuario. Sem esta linha o menu nasce aberto. */
.site-header__panel[hidden] {
  display: none;
}

.site-header__panel {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px var(--site-gutter) 24px;
  background: var(--site-surface);
  border-top: 1px solid var(--site-line-soft);
}

.site-header__panel-link {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
  padding: 14px 4px;
  text-decoration: none;
  border-bottom: 1px solid var(--site-line-soft);
}

.site-header__panel-cta {
  margin-top: 18px;
  justify-content: center;
}

@media (min-width: 900px) {
  .site-header__nav,
  .site-header__cta {
    display: flex;
  }

  .site-header__toggle,
  .site-header__panel {
    display: none;
  }
}
</style>
