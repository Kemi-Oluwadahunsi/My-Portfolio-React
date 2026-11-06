import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { logoPalettes } from '../src/constants/logoPalettes.js'

const directory = new URL('../public/images/', import.meta.url)
const source = readFileSync(new URL('logo-preview.svg', directory), 'utf8')

for (const [theme, modes] of Object.entries(logoPalettes)) {
  for (const [mode, colors] of Object.entries(modes)) {
    const gradient = `<defs>
    <linearGradient id="m-gradient" gradientUnits="userSpaceOnUse" x1="330" y1="66" x2="1446" y2="973">
      <stop offset="0" stop-color="${colors.m[0]}"/>
      <stop offset="0.55" stop-color="${colors.m[1]}"/>
      <stop offset="1" stop-color="${colors.m[2]}"/>
    </linearGradient>
  </defs>`
    const svg = source
      .replace('<path id="letter-m"', `${gradient}\n  <path id="letter-m"`)
      .replace('var(--logo-m, #806040)', 'url(#m-gradient)')
      .replace('var(--logo-k, #292725)', colors.k)
    const destination = new URL(`logo-${theme}-${mode}.svg`, directory)
    writeFileSync(destination, svg)
    console.log(fileURLToPath(destination))
    const favicon = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <title>Closing code tag</title>
  <defs>
    <linearGradient id="slash-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${colors.m[0]}"/>
      <stop offset="0.55" stop-color="${colors.m[1]}"/>
      <stop offset="1" stop-color="${colors.m[2]}"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 18 5 32 19 46M45 18 59 32 45 46" stroke="${colors.k}"/>
    <path d="M39 10 25 54" stroke="url(#slash-gradient)"/>
  </g>
</svg>
`
    const faviconDestination = new URL(`favicon-${theme}-${mode}.svg`, directory)
    writeFileSync(faviconDestination, favicon)
    console.log(fileURLToPath(faviconDestination))
  }
}
