import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useScrollSpy (ids: readonly string[]) {
  const active = ref('')

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .toSorted((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          active.value = visible.target.id
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    )

    for (const id of ids) {
      const element = document.querySelector(`#${id}`)

      if (element) {
        observer.observe(element)
      }
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return active
}

export function useStuck (offset = 24) {
  const stuck = ref(false)

  const update = (): void => {
    stuck.value = globalThis.scrollY > offset
  }

  onMounted(() => {
    update()
    globalThis.addEventListener('scroll', update, { passive: true })
  })

  onBeforeUnmount(() => globalThis.removeEventListener('scroll', update))

  return stuck
}
