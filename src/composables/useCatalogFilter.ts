import type { CategoryId } from '@/content/catalog'
import { ref } from 'vue'

const selected = ref<CategoryId | 'all'>('all')

export function useCatalogFilter () {
  function select (category: CategoryId | 'all'): void {
    selected.value = category
  }

  function jumpTo (category: CategoryId | 'all'): void {
    select(category)

    const target = document.querySelector('#equipamentos')

    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { selected, select, jumpTo }
}
