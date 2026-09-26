export type CategoryId
  = | 'lifting'
    | 'compaction'
    | 'concrete'
    | 'power'
    | 'access'
    | 'demolition'

export interface CatalogSpec {
  label: string
  value: string
}

export interface CatalogItem {
  slug: string
  category: CategoryId
  name: string
  summary: string
  specs: CatalogSpec[]
  image: string
  featured?: boolean
}

export const categories: CategoryId[] = [
  'lifting',
  'compaction',
  'concrete',
  'power',
  'access',
  'demolition',
]

export const catalog: CatalogItem[] = [
  {
    slug: 'plataforma-articulada-16m',
    category: 'lifting',
    name: 'Plataforma articulada 16 m',
    summary: 'Alcance vertical para fachada, estrutura metalica e manutencao industrial em altura.',
    specs: [
      { label: 'Altura de trabalho', value: '16 m' },
      { label: 'Capacidade', value: '230 kg' },
      { label: 'Tracao', value: '4x4 diesel' },
    ],
    image: '/equipment/lifting.svg',
    featured: true,
  },
  {
    slug: 'manipulador-telescopico-4t',
    category: 'lifting',
    name: 'Manipulador telescopico 4 t',
    summary: 'Carga paletizada e abastecimento de pavimento em canteiro com terreno irregular.',
    specs: [
      { label: 'Capacidade', value: '4.000 kg' },
      { label: 'Alcance', value: '13 m' },
      { label: 'Acessorios', value: 'garfo, caçamba, jib' },
    ],
    image: '/equipment/lifting.svg',
  },
  {
    slug: 'guincho-de-coluna-400kg',
    category: 'lifting',
    name: 'Guincho de coluna 400 kg',
    summary: 'Elevacao de material entre pavimentos em obra vertical de pequeno e medio porte.',
    specs: [
      { label: 'Capacidade', value: '400 kg' },
      { label: 'Altura', value: 'ate 40 m' },
      { label: 'Alimentacao', value: '220 V monofasico' },
    ],
    image: '/equipment/lifting.svg',
  },
  {
    slug: 'placa-vibratoria-90kg',
    category: 'compaction',
    name: 'Placa vibratoria 90 kg',
    summary: 'Compactacao de base e sub-base em valas, calcadas e pequenas areas.',
    specs: [
      { label: 'Forca centrifuga', value: '15 kN' },
      { label: 'Largura util', value: '50 cm' },
      { label: 'Motor', value: 'gasolina 5,5 cv' },
    ],
    image: '/equipment/compaction.svg',
    featured: true,
  },
  {
    slug: 'compactador-de-solo-tipo-sapo',
    category: 'compaction',
    name: 'Compactador de solo tipo sapo',
    summary: 'Compactacao em vala estreita e reaterro de tubulacao, onde o rolo nao entra.',
    specs: [
      { label: 'Peso', value: '70 kg' },
      { label: 'Impacto', value: '600 a 700 golpes/min' },
      { label: 'Sapata', value: '28 cm' },
    ],
    image: '/equipment/compaction.svg',
  },
  {
    slug: 'rolo-compactador-1t',
    category: 'compaction',
    name: 'Rolo compactador 1 t',
    summary: 'Acabamento de base asfaltica e compactacao de aterro em area aberta.',
    specs: [
      { label: 'Peso operacional', value: '1.000 kg' },
      { label: 'Largura', value: '80 cm' },
      { label: 'Vibracao', value: 'duplo tambor' },
    ],
    image: '/equipment/compaction.svg',
  },
  {
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
  },
  {
    slug: 'alisadora-de-piso-36',
    category: 'concrete',
    name: 'Alisadora de piso 36"',
    summary: 'Acabamento de laje e piso industrial, com pas de alisamento e disco.',
    specs: [
      { label: 'Diametro', value: '90 cm' },
      { label: 'Rotacao', value: '60 a 125 rpm' },
      { label: 'Motor', value: 'gasolina 6,5 cv' },
    ],
    image: '/equipment/concrete.svg',
    featured: true,
  },
  {
    slug: 'vibrador-de-imersao',
    category: 'concrete',
    name: 'Vibrador de imersao',
    summary: 'Adensamento de concreto em pilar, viga e laje, com mangote de 35 ou 45 mm.',
    specs: [
      { label: 'Mangote', value: '35 e 45 mm' },
      { label: 'Comprimento', value: '5 m' },
      { label: 'Motor', value: 'eletrico 2 cv' },
    ],
    image: '/equipment/concrete.svg',
  },
  {
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
  },
  {
    slug: 'compressor-de-ar-10-pcm',
    category: 'power',
    name: 'Compressor de ar 10 pcm',
    summary: 'Alimentacao de ferramenta pneumatica, pintura e limpeza de forma.',
    specs: [
      { label: 'Vazao', value: '10 pcm' },
      { label: 'Pressao', value: '120 lb/pol²' },
      { label: 'Reservatorio', value: '100 L' },
    ],
    image: '/equipment/power.svg',
  },
  {
    slug: 'torre-de-iluminacao',
    category: 'power',
    name: 'Torre de iluminacao',
    summary: 'Frente de servico noturna e turno estendido, com mastro de 9 m.',
    specs: [
      { label: 'Mastro', value: '9 m' },
      { label: 'Farois', value: '4 x LED 320 W' },
      { label: 'Autonomia', value: '50 h' },
    ],
    image: '/equipment/power.svg',
  },
  {
    slug: 'andaime-tubular',
    category: 'access',
    name: 'Andaime tubular',
    summary: 'Modulos de 1 m e 1,5 m com piso metalico, rodape e guarda-corpo.',
    specs: [
      { label: 'Modulo', value: '1,00 e 1,50 m' },
      { label: 'Carga', value: '150 kg/m²' },
      { label: 'Acessorios', value: 'sapata, diagonal, piso' },
    ],
    image: '/equipment/access.svg',
  },
  {
    slug: 'escoramento-metalico',
    category: 'access',
    name: 'Escoramento metalico',
    summary: 'Escora regulavel para laje e viga, com forcado e trave de apoio.',
    specs: [
      { label: 'Regulagem', value: '1,80 a 3,20 m' },
      { label: 'Carga', value: '2.000 kgf' },
      { label: 'Acabamento', value: 'pintura eletrostatica' },
    ],
    image: '/equipment/access.svg',
  },
  {
    slug: 'martelete-rompedor-30kg',
    category: 'demolition',
    name: 'Martelete rompedor 30 kg',
    summary: 'Demolicao de piso, base de maquina e concreto armado em reforma industrial.',
    specs: [
      { label: 'Peso', value: '30 kg' },
      { label: 'Impacto', value: '63 J' },
      { label: 'Encaixe', value: 'hexagonal 30 mm' },
    ],
    image: '/equipment/demolition.svg',
  },
]
