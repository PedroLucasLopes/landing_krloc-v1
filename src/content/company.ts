export interface Company {
  name: string
  tagline: string
  whatsapp: string
  phoneLabel: string
  email: string
  street: string
  city: string
  cnpj: string
  weekdays: string
  saturday: string
  instagram: string
  linkedin: string
}

export const company: Company = {
  name: 'KRLoc',
  tagline: 'Locacao de equipamentos',
  whatsapp: '5511900000000',
  phoneLabel: '(11) 90000-0000',
  email: 'contato@exemplo.com.br',
  street: 'Rua Exemplo, 000 - Distrito Industrial',
  city: 'Sao Paulo - SP, 00000-000',
  cnpj: '00.000.000/0001-00',
  weekdays: '07h00 as 18h00',
  saturday: '08h00 as 12h00',
  instagram: 'https://instagram.com/exemplo',
  linkedin: 'https://linkedin.com/company/exemplo',
}
