import type { Meta, StoryObj } from '@storybook/vue3-vite'
import QuoteComposer from './QuoteComposer.vue'

const meta: Meta<typeof QuoteComposer> = {
  title: 'Contato/Montar orcamento',
  component: QuoteComposer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'O formulario nao submete para lugar nenhum: ele monta o texto da mensagem e o botao abre o WhatsApp com ela pronta. Nao existe endpoint, nao existe banco e nenhum dado digitado sai do aparelho de quem preenche. A previa a direita e a mesma string que vai no link, e ela se atualiza a cada tecla.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Vazio: Story = {}
