import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { featuredItem, longNameItem, plainItem, sparseItem } from '@/mocks/catalog'
import EquipmentCard from './EquipmentCard.vue'

const meta: Meta<typeof EquipmentCard> = {
  title: 'Catalogo/Cartao de equipamento',
  component: EquipmentCard,
  parameters: {
    docs: {
      description: {
        component:
          'O cartao e o unico caminho de conversao do catalogo: ele abre o WhatsApp com o nome do equipamento ja escrito na mensagem. O link cobre o cartao inteiro por `::after`, entao o alvo de toque e o cartao, e o leitor de tela continua ouvindo um unico link.',
      },
    },
  },
  render: args => ({
    components: { EquipmentCard },
    setup: () => ({ args }),
    template: '<div style="max-width: 320px"><EquipmentCard v-bind="args" /></div>',
  }),
}

export default meta

type Story = StoryObj<typeof meta>

export const Padrao: Story = {
  args: { item: plainItem },
}

export const Destacado: Story = {
  args: { item: featuredItem },
}

export const NomeLongo: Story = {
  args: { item: longNameItem },
}

export const PoucosDados: Story = {
  args: { item: sparseItem },
}

export const Fileira: Story = {
  args: { item: plainItem },
  parameters: {
    docs: {
      description: {
        story:
          'Tres cartoes lado a lado, com quantidades diferentes de dados tecnicos. E aqui que se ve se o botao de orcamento continua alinhado na base quando o texto acima tem alturas diferentes.',
      },
    },
  },
  render: () => ({
    components: { EquipmentCard },
    setup: () => ({ items: [featuredItem, longNameItem, sparseItem] }),
    template: `
      <div style="display: grid; gap: 18px; grid-template-columns: repeat(auto-fill, minmax(268px, 1fr))">
        <EquipmentCard v-for="item in items" :key="item.slug" :item="item" />
      </div>
    `,
  }),
}
