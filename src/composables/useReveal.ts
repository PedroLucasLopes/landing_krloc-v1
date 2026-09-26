import type { Directive } from 'vue'

function prefersReducedMotion (): boolean {
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

let observer: IntersectionObserver | null = null

function shared (): IntersectionObserver {
  observer ??= new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue
        }

        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  )

  return observer
}

export const reveal: Directive<HTMLElement, number | undefined> = {
  mounted (el, binding) {
    el.classList.add('reveal')

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    if (binding.value) {
      el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    }

    shared().observe(el)
  },
  unmounted (el) {
    observer?.unobserve(el)
  },
}
