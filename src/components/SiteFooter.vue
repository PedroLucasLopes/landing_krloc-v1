<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import SiteLogo from '@/components/SiteLogo.vue'
  import { company } from '@/content/company'

  const { t, locale, availableLocales } = useI18n()

  const links = [
    { id: 'equipamentos', label: 'nav.catalog' },
    { id: 'servicos', label: 'nav.services' },
    { id: 'como-funciona', label: 'nav.how' },
    { id: 'orcamento', label: 'nav.quote' },
    { id: 'duvidas', label: 'nav.faq' },
  ] as const

  const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div aria-hidden="true" class="site-stripe" />

    <div class="site-container footer__grid">
      <div class="footer__brand">
        <SiteLogo />
        <p class="footer__about">{{ t('footer.about') }}</p>

        <div class="footer__social">
          <a aria-label="Instagram" :href="company.instagram" rel="noopener" target="_blank">
            <span aria-hidden="true" class="mdi mdi-instagram" />
          </a>

          <a aria-label="LinkedIn" :href="company.linkedin" rel="noopener" target="_blank">
            <span aria-hidden="true" class="mdi mdi-linkedin" />
          </a>
        </div>
      </div>

      <nav :aria-label="t('footer.navigate')" class="footer__column">
        <h2 class="footer__title">{{ t('footer.navigate') }}</h2>
        <a v-for="link in links" :key="link.id" :href="`#${link.id}`">{{ t(link.label) }}</a>
      </nav>

      <div class="footer__column">
        <h2 class="footer__title">{{ t('footer.contact') }}</h2>
        <a :href="`tel:+${company.whatsapp}`">{{ company.phoneLabel }}</a>
        <a :href="`mailto:${company.email}`">{{ company.email }}</a>
        <p class="footer__label">{{ t('footer.address') }}</p>
        <p class="footer__address">{{ company.street }}</p>
        <p class="footer__address">{{ company.city }}</p>
      </div>

      <div class="footer__column">
        <h2 class="footer__title">{{ t('footer.hours') }}</h2>
        <p>{{ t('footer.weekdays') }}: {{ company.weekdays }}</p>
        <p>{{ t('footer.saturday') }}: {{ company.saturday }}</p>

        <div class="footer__languages">
          <button
            v-for="code in availableLocales"
            :key="code"
            :aria-pressed="locale === code"
            class="footer__language"
            :class="{ 'is-active': locale === code }"
            type="button"
            @click="locale = code"
          >
            {{ code }}
          </button>
        </div>
      </div>
    </div>

    <div class="site-container footer__bottom">
      <p>CNPJ {{ company.cnpj }} Â· &copy; {{ year }} {{ company.name }}. {{ t('footer.rights') }}</p>
      <p class="footer__mock">{{ t('footer.mock') }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--site-deep);
  border-top: 1px solid rgba(238, 243, 245, 0.14);
}

.footer__grid {
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  padding-block: clamp(40px, 6vw, 72px) 32px;
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer__about {
  color: var(--site-on-deep-muted);
  font-size: 14px;
  max-width: 34ch;
}

.footer__social {
  display: flex;
  gap: 10px;
}

.footer__social a {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(238, 243, 245, 0.22);
  border-radius: var(--site-radius);
  color: var(--site-on-deep-muted);
  font-size: 19px;
  text-decoration: none;
  transition: color 0.25s var(--site-ease), border-color 0.25s var(--site-ease);
}

.footer__social a:hover {
  color: var(--site-hazard);
  border-color: var(--site-hazard);
}

.footer__column {
  display: flex;
  flex-direction: column;
  gap: 9px;
  font-size: 14px;
  color: var(--site-on-deep-muted);
}

.footer__column a {
  color: var(--site-on-deep-muted);
  text-decoration: none;
  transition: color 0.2s var(--site-ease);
}

.footer__column a:hover {
  color: var(--site-hazard);
}

.footer__title {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--site-on-deep);
  margin-bottom: 4px;
}

.footer__address {
  max-width: 28ch;
}

.footer__label {
  margin-top: 6px;
  font-size: 11.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--site-on-deep-muted);
}

.footer__languages {
  display: flex;
  gap: 6px;
  margin-top: 10px;
}

.footer__language {
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid rgba(238, 243, 245, 0.22);
  border-radius: var(--site-radius);
  background: transparent;
  color: var(--site-on-deep-muted);
  font: inherit;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
}

.footer__language.is-active {
  border-color: var(--site-hazard);
  color: var(--site-hazard);
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  justify-content: space-between;
  padding-block: 20px 28px;
  border-top: 1px solid rgba(238, 243, 245, 0.14);
  font-size: 12.5px;
  color: var(--site-on-deep-muted);
}

.footer__mock {
  color: var(--site-hazard);
  opacity: 0.85;
}
</style>
