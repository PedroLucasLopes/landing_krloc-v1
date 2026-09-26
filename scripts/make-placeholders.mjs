import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const equipment = join(here, '..', 'public', 'equipment')
const banners = join(here, '..', 'public', 'banners')

const shapes = {
  lifting: `
    <path d="M150 400V190" />
    <path d="M118 400h64" />
    <path d="M150 210l120-70" />
    <path d="M270 140h130" />
    <path d="M214 176l18 46" />`,
  compaction: `
    <path d="M200 330l38-96h120l38 96" />
    <path d="M344 206h96l34-70" />
    <path d="M150 400h290" />`,
  concrete: `
    <path d="M196 150h170l40 82-40 82H196l-40-82z" />
    <path d="M296 314v56" />
    <path d="M236 370h120l30 30H206z" />
    <path d="M406 232h84" />`,
  power: `
    <path d="M186 214h60M186 248h60M186 282h60" />
    <path d="M356 204l-46 78h48l-34 74 76-96h-50l40-56z" />
    <path d="M186 370v30M444 370v30" />`,
  access: `
    <path d="M166 130v280M316 130v280M466 130v280" />
    <path d="M150 200h332M150 280h332M150 360h332" />
    <path d="M166 200l150 80M316 280l150-80" />`,
  demolition: `
    <path d="M300 240v80" />
    <path d="M276 320h48l-24 92z" />
    <path d="M180 400h240" />
    <path d="M352 168h84" />`,
}

const boxes = {
  lifting: '<rect x="400" y="104" width="96" height="60" rx="6" />',
  compaction: '<rect x="150" y="330" width="290" height="46" rx="8" /><rect x="252" y="176" width="92" height="60" rx="8" />',
  concrete: '',
  power: '<rect x="150" y="170" width="330" height="200" rx="14" />',
  access: '',
  demolition: '<rect x="248" y="120" width="104" height="120" rx="12" />',
}

function plate (name) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="p" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#ffffff" />
      <stop offset="1" stop-color="#e4e9ec" />
    </linearGradient>
    <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0v40" fill="none" stroke="#ced6da" stroke-width="1" />
    </pattern>
  </defs>

  <rect width="640" height="480" fill="url(#p)" />
  <rect width="640" height="480" fill="url(#g)" opacity="0.7" />
  <circle cx="512" cy="112" r="132" fill="#ff7a1a" opacity="0.12" />

  <g fill="#ff7a1a" opacity="0.22">${boxes[name]}</g>
  <g fill="none" stroke="#33454f" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">
    ${shapes[name].trim()}
  </g>

  <rect x="0" y="466" width="640" height="14" fill="#ffc400" />
  <text x="24" y="54" fill="#7a8992" font-family="Archivo, Roboto, sans-serif" font-size="16" letter-spacing="3">IMAGEM ILUSTRATIVA</text>
</svg>
`
}

const skyline = `
  <g fill="#0f2430" opacity="0.14">
    <rect x="40" y="470" width="150" height="330" />
    <rect x="210" y="380" width="120" height="420" />
    <rect x="350" y="510" width="180" height="290" />
    <rect x="1120" y="430" width="140" height="370" />
    <rect x="1280" y="520" width="190" height="280" />
  </g>`

const crane = `
  <g fill="none" stroke="#11202a" stroke-width="9" opacity="0.5">
    <path d="M700 800V210" />
    <path d="M660 800h80" />
    <path d="M470 210h560" />
    <path d="M700 150l-70 60h140z" />
    <path d="M700 150l280 60M700 150l-190 60" />
    <path d="M900 210v120" />
    <path d="M868 330h64" />
  </g>`

function banner (name, height, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 ${height}" width="1600" height="${height}" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="#ffd9b0" />
      <stop offset="0.45" stop-color="#f4dfd0" />
      <stop offset="1" stop-color="#dfe6ea" />
    </linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#cfd8dd" />
      <stop offset="1" stop-color="#aab7bf" />
    </linearGradient>
  </defs>

  <rect width="1600" height="${height}" fill="url(#sky)" />
  <circle cx="1210" cy="190" r="150" fill="#ff7a1a" opacity="0.28" />
  ${body}
  <rect y="${height - 96}" width="1600" height="96" fill="url(#ground)" />
  <rect y="${height - 14}" width="1600" height="14" fill="#ffc400" />
  <text x="40" y="52" fill="#4c5b63" font-family="Archivo, Roboto, sans-serif" font-size="20" letter-spacing="4">IMAGEM ILUSTRATIVA</text>
</svg>
`
}

const excavator = `
  <g fill="none" stroke="#11202a" stroke-width="12" opacity="0.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M520 470h250v90H500z" />
    <path d="M560 470V390h150l40 80" />
    <path d="M770 430l190-130 120 40" />
    <path d="M1080 340l-60 110 90 30 40-90z" />
    <circle cx="600" cy="580" r="34" />
    <circle cx="720" cy="580" r="34" />
  </g>`

mkdirSync(equipment, { recursive: true })
mkdirSync(banners, { recursive: true })

for (const name of Object.keys(shapes)) {
  writeFileSync(join(equipment, `${name}.svg`), plate(name))
}

writeFileSync(join(banners, 'hero.svg'), banner('hero', 900, `${skyline}${crane}`))
writeFileSync(join(banners, 'cta.svg'), banner('cta', 620, excavator))

console.log(`equipamentos: ${Object.keys(shapes).length} · banners: 2`)
