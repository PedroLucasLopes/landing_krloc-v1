import type { CatalogItem } from '@/content/catalog'

export const plainItem: CatalogItem = {
  slug: 'betoneira-400l',
  category: 'concrete',
  name: 'Betoneira 400 L',
  summary: 'Producao de concreto e argamassa no canteiro, com carga por caçamba basculante.',
  specs: [
    { label: 'Capacidade', value: '400 L' },
    { label: 'Motor', value: '2 cv monofasico' },
    { label: 'Rendimento', value: '~3 m³/h' },
  ],
  image: '/equipment/concrete.svg',
}

export const featuredItem: CatalogItem = {
  ...plainItem,
  slug: 'gerador-60-kva',
  category: 'power',
  name: 'Gerador 60 kVA',
  summary: 'Energia para canteiro sem rede definitiva e para parada programada de industria.',
  specs: [
    { label: 'Potencia', value: '60 kVA' },
    { label: 'Cabine', value: 'silenciada' },
    { label: 'Autonomia', value: '8 h a 75%' },
  ],
  image: '/equipment/power.svg',
  featured: true,
}

export const longNameItem: CatalogItem = {
  slug: 'manipulador-telescopico-rotativo',
  category: 'lifting',
  name: 'Manipulador telescopico rotativo 4 t com lanca de 18 metros',
  summary:
    'Nome e resumo longos de proposito: e assim que se descobre se o titulo quebra em tres linhas e desalinha a fileira de cartoes.',
  specs: [
    { label: 'Capacidade', value: '4.000 kg' },
    { label: 'Alcance horizontal maximo', value: '13,2 m' },
    { label: 'Acessorios', value: 'garfo, caçamba, jib, cesto' },
    { label: 'Tracao', value: '4x4x4 diesel turbo' },
  ],
  image: '/equipment/lifting.svg',
}

export const sparseItem: CatalogItem = {
  slug: 'placa-vibratoria-90kg',
  category: 'compaction',
  name: 'Placa vibratoria',
  summary: 'Um dado tecnico so, para conferir o cartao mais curto da fileira.',
  specs: [{ label: 'Peso', value: '90 kg' }],
  image: '/equipment/compaction.svg',
}

export const smallCatalog: CatalogItem[] = [featuredItem, plainItem, sparseItem]
