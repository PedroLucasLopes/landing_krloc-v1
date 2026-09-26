import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { smallCatalog } from '@/mocks/catalog'
import CatalogSection from './CatalogSection.vue'

const meta: Meta<typeof CatalogSection> = {
  title: 'Catalogo/Secao do catalogo',
  component: CatalogSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A secao recebe a lista por `source`, com o catalogo do site como padrao. E o que permite ver o estado vazio sem mexer no conteudo real, e o que deixaria a lista vir de outro lugar um dia sem reescrever a secao.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Completo: Story = {}

export const ListaCurta: Story = {
  args: { source: smallCatalog },
}

export const Vazio: Story = {
  args: { source: [] },
  parameters: {
    docs: {
      description: {
        story:
          'Sem equipamento nenhum, a secao nao mostra grade vazia: ela explica e devolve o caminho de volta para "todos".',
      },
    },
  },
}
