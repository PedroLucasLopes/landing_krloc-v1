import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SiteHeader from './SiteHeader.vue'

const meta: Meta<typeof SiteHeader> = {
  title: 'Navegacao/Topo',
  component: SiteHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'O topo e fixo e muda de fundo depois de 24 pixels de rolagem. O item ativo vem de `active`, que na pagina e calculado por IntersectionObserver: o visitante sempre sabe em que secao esta. Abaixo de 900px a navegacao vira menu, que fecha no Escape, no clique e ao trocar de secao.',
      },
    },
  },
  render: args => ({
    components: { SiteHeader },
    setup: () => ({ args }),
    template: '<div style="min-height: 220px"><SiteHeader v-bind="args" /></div>',
  }),
}

export default meta

type Story = StoryObj<typeof meta>

export const NoTopo: Story = {
  args: { active: '' },
}

export const SecaoAtiva: Story = {
  args: { active: 'equipamentos' },
}
