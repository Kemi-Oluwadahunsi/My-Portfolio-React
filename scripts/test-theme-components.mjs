/* eslint-env node */
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { runInNewContext } from 'node:vm'
import { compile } from 'sass'
import { logoPalettes } from '../src/constants/logoPalettes.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const read = path => readFileSync(join(root, path), 'utf8')
function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? files(path) : [path]
  })
}
const componentFiles = files(join(root, 'src/components'))

test('subject select keeps its label floated and its decorative arrow inset without blocking input', () => {
  const source = read('src/components/contact/Contact.jsx')
  assert.match(source, /<label htmlFor="contact-subject">Subject<\/label>\s*<svg className="field-select-arrow"[^>]*aria-hidden="true"/)
  const css = compile(join(root, 'src/components/contact/contact.scss'), { silenceDeprecations: ['import'] }).css
  assert.match(css, /\.form-field select \{[^}]*appearance: none;[^}]*padding-right: 2\.5rem;/)
  assert.match(css, /\.form-field select \+ label \{[^}]*top: 0\.35rem;/)
  assert.match(css, /\.form-field \.field-select-arrow \{[^}]*right: 1rem;[^}]*pointer-events: none;/)
  assert.match(css, /@media \(forced-colors: active\) \{\s*\.form-field select \{[^}]*appearance: auto;[^}]*\}\s*\.form-field \.field-select-arrow \{[^}]*display: none;/)
})

test('route and section loading use a non-signature loader independently from the splash', async () => {
  const { IN_APP_LOADER } = await import('../src/components/UI/Loader/loaderConfig.js')
  assert.ok(['buildLog', 'layerStack'].includes(IN_APP_LOADER))
  const placeholder = read('src/components/UI/LoadingSkeleton/LoadingSkeleton.jsx')
  assert.match(placeholder, /<Loader variant=\{IN_APP_LOADER\} \/>/)
  const loader = read('src/components/UI/Loader/Loader.jsx')
  assert.match(loader, /variant = ACTIVE_LOADER/)
  assert.match(loader, /const Active = LOADERS\[variant\]/)
  assert.match(read('src/components/Splash/Splash.jsx'), /<Loader \/>/)
  for (const file of ['src/App.jsx', 'src/components/Layout/index.jsx']) {
    assert.match(read(file), /<LoadingSkeleton/)
  }
})

test('release assets remain available offline with versioned favicons and local fonts', () => {
  const config = read('vite.config.js')
  const ignoredParameters = config.match(/ignoreURLParametersMatching:\s*\[([^\]]+)\]/)[1]
  const patterns = [...ignoredParameters.matchAll(/\/([^/]+)\//g)].map(([, pattern]) => new RegExp(pattern))
  for (const parameter of ['v', 'utm_source', 'fbclid']) {
    assert.ok(patterns.some(pattern => pattern.test(parameter)), parameter)
  }
  assert.ok(!patterns.some(pattern => pattern.test('other')), 'unrelated query parameters stay significant')
  const extensions = config.match(/globPatterns:\s*\['\*\*\/\*\.\{([^}]+)\}/)[1].split(',')
  for (const extension of ['ttf', 'woff', 'woff2', 'svg', 'js']) assert.ok(extensions.includes(extension))
})

test('motion respects device preferences and live reduced motion reveals sections without translation', () => {
  assert.match(read('src/App.jsx'), /<MotionConfig reducedMotion="user">/)
  const reveal = read('src/components/UI/ScrollReveal/ScrollReveal.jsx')
  assert.match(reveal, /const \{ reducedMotion \} = useAtmosphere\(\)/)
  assert.match(reveal, /initial=\{reducedMotion \? false : initial\}/)
  assert.match(reveal, /animate=\{reducedMotion \? \{ opacity: 1, y: 0, x: 0, scale: 1 \} : undefined\}/)
  assert.match(reveal, /whileInView=\{reducedMotion \? undefined :/)
  assert.match(reveal, /duration: reducedMotion \? 0 : duration/)
  assert.match(reveal, /delay: reducedMotion \? 0 : delay/)
})

test('mobile navigation exposes real keyboard links and non-modal focus/escape behavior', () => {
  const nav = read('src/components/navbar/Navbar.jsx')
  assert.ok(nav.includes('href={`#${item.to}`}'))
  assert.doesNotMatch(nav, /role="menubar"|aria-modal="true"/)
  assert.match(nav, /menu\?\.querySelector\('a\[href\]'\)\?\.focus/)
  assert.match(nav, /event\.key === 'Escape'/)
  assert.match(nav, /removeEventListener\('keydown', escape\)/)
  assert.match(nav, /menu\?\.contains\(document\.activeElement\)/)
  assert.match(nav, /const toggle = toggleRef\.current/)
  assert.match(nav, /toggle\?\.focus/)
})

test('palette identities share mode-independent typography and use blobs instead of portrait frames', () => {
  const css = compile(join(root, 'src/styles/_identities.scss')).css
  assert.doesNotMatch(css, /#[\da-f]{3,8}\b|rgba?\(\s*\d|hsla?\(\s*\d|\[data-mode/i)
  assert.doesNotMatch(css, /hero-ornament/)
  assert.doesNotMatch(read('src/components/Home/home.jsx'), /hero-ornament/)
  assert.match(css, /--blob-secondary: var\(--color-accent\);/)
  for (const token of ['size-heading', 'weight-heading', 'line-heading', 'size-card-title', 'weight-card-title', 'radius-media']) {
    assert.ok(css.includes(`var(--${token})`), token)
  }
  assert.match(css, /\.page > \.tags,/)
  assert.doesNotMatch(css, /^:root[^\n]*\) \.tags[ ,{]/m)
  assert.match(css, /\.services \.title h1 b \{[^}]*font-weight: inherit;/)
  assert.match(read('src/App.scss'), /@import ['"]\.\/styles\/identities['"]/)
})

test('Daylight dividers use a subtle continuous theme-colored line in both modes', () => {
  const css = compile(join(root, 'src/styles/_identities.scss')).css
  assert.match(css, /:root\[data-theme=daylight\] \.glow-divider::after \{[^}]*height: 1px;[^}]*background: color-mix\(in srgb, var\(--color-link\) 30%, transparent\);/)
  assert.doesNotMatch(css, /transparent 18% 21%/)
})

test('Burgundy inverse band preserves shared content and keeps decorative cuts non-interactive', () => {
  const layout = read('src/components/Layout/index.jsx')
  assert.match(layout, /theme === 'burgundy-cream' \? ' theme-inverse' : ''/)
  assert.doesNotMatch(layout, /key=\{theme\}/)
  const css = compile(join(root, 'src/styles/_identities.scss')).css
  assert.match(css, /--identity-page-bg: var\(--color-bg\)/)
  assert.match(css, /\.skillsSection\.theme-inverse::after \{[^}]*background: var\(--identity-page-bg\);[^}]*pointer-events: none;/)
  assert.match(css, /\.services \.service-glow-wrapper:hover,[^{]*\{[^}]*transform: none !important;/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(read('src/components/Home/home.jsx'), /whileHover=\{atmospheric \? \{ scale: 1\.05 \} : undefined\}/)
  assert.match(read('src/components/services/Services.jsx'), /variants=\{atmospheric \? cardVariants :/)
})

test('service animation variants explicitly reset rotation and scale when appearance changes', () => {
  const source = read('src/components/services/Services.jsx')
  const atmosphericSource = source.match(/const cardVariants = (\{[\s\S]*?\n\})/)[1]
  const restrainedSource = source.match(/variants=\{atmospheric \? cardVariants : (\{[\s\S]*?\n\s*\})\}/)[1]
  const atmospheric = runInNewContext(`(${atmosphericSource})`)
  assert.equal(atmospheric.hidden.rotateX, -90)
  for (const reducedMotion of [false, true]) {
    const restrained = runInNewContext(`(${restrainedSource})`, { reducedMotion })
    for (const state of ['hidden', 'visible']) {
      assert.equal(restrained[state].rotateX, 0)
      assert.equal(restrained[state].scale, 1)
    }
    assert.equal(restrained.visible.y, 0)
    assert.equal(restrained.visible.opacity, 1)
    assert.equal(restrained.visible.transition.duration, reducedMotion ? 0 : 0.25)
  }
  assert.equal(atmospheric.visible.rotateX, 0)
  assert.equal(atmospheric.visible.scale, 1)
  assert.match(source, /: \{ y: -2, scale: 1 \}\) : undefined\}/)
})

test('hero can grow for enlarged text, wrap names by word and keep button labels bounded', () => {
  const source = read('src/components/Home/home.jsx')
  assert.equal((source.match(/className="name-word"/g) || []).length, 2)
  assert.match(source, /nameArray\.slice\(0, 3\)/)
  assert.match(source, /nameArray\.slice\(4\)/)
  const css = compile(join(root, 'src/components/Home/home.scss'), { silenceDeprecations: ['import'] }).css
  assert.match(css, /\.home-page \.name-word \{[^}]*display: inline-block;[^}]*max-width: 100%;/)
  assert.match(css, /\.buttons \.flat-button \{[^}]*max-width: 100%;[^}]*overflow-wrap: anywhere;[^}]*white-space: normal;/)
  assert.match(css, /@media \(min-width: 901px\) \{\s*\.home-page \{[^}]*height: auto;[^}]*min-height: max\(100dvh, 35\.375rem\);/)
})

test('mobile service titles stay compact across identities and the hero K uses a small word gap', () => {
  const services = compile(join(root, 'src/components/services/services.scss'), { silenceDeprecations: ['import'] }).css
  assert.match(services, /@media \(max-width: 480px\) \{\s*\.services \.listContainer \.service-box \.serviceTitle \{[^}]*--size-card-title: 1\.125rem;[^}]*font-size: var\(--size-card-title\);/)
  const home = compile(join(root, 'src/components/Home/home.scss'), { silenceDeprecations: ['import'] }).css
  assert.match(home, /@media \(max-width: 480px\) \{\s*\.home-page \.k-letter \{[^}]*margin-left: 0\.35rem;/)
  assert.match(home, /\.home-page \.k-letter \{[^}]*margin-left: 1\.25rem;/)
})

test('KM loader matches the logo K, M gradient and name using unique gradient references', () => {
  const css = compile(join(root, 'src/components/UI/Loader/loader.scss'), { silenceDeprecations: ['import'] }).css
  assert.match(css, /\.sig-loader \{[^}]*color: var\(--color-link\);/)
  assert.match(css, /\.sig-ghost path \{[^}]*stroke: currentColor;/)
  assert.match(css, /\.sig-pen \{[^}]*fill: var\(--color-accent\);/)
  assert.match(css, /\.sig-name \{[^}]*fill: currentColor;/)
  assert.match(css, /\.sig-ghost \{[^}]*opacity: 0\.15;/)
  const source = read('src/components/UI/Loader/variants/SignatureLoader.jsx')
  assert.match(source, /useId\(\)/)
  assert.match(source, /linearGradient id=\{gradientId\} gradientUnits="userSpaceOnUse"/)
  for (const index of [0, 1, 2]) assert.ok(source.includes(`stopColor={colors.m[${index}]}`))
  assert.ok(source.includes('stroke={i < 5 ? colors.k : `url(#${gradientId})`}'))
  assert.match(source, /style=\{\{ color: colors\.k \}\}/)
  assert.match(source, /style=\{\{ fill: colors\.m\[0\] \}\}/)
  assert.match(source, /logoPalettes\[theme\]\[resolvedMode\]/)
  assert.doesNotMatch(css, /\.sig-ink path \{[^}]*stroke:/)
})

test('ten transparent logo assets retain identical vector shapes and matching palette gradients', () => {
  const original = read('public/images/logo-preview.svg')
  const paths = text => [...text.matchAll(/\bd="([^"]+)"/g)].map(match => match[1])
  assert.equal(Object.keys(logoPalettes).length, 5)
  for (const [theme, modes] of Object.entries(logoPalettes)) {
    for (const [mode, colors] of Object.entries(modes)) {
      const svg = read(`public/images/logo-${theme}-${mode}.svg`)
      assert.deepEqual(paths(svg), paths(original))
      assert.doesNotMatch(svg, /<rect|<image|<filter|<script/)
      assert.ok(svg.includes(`fill="${colors.k}"`))
      assert.ok(svg.includes('fill="url(#m-gradient)"'))
      for (const color of colors.m) assert.ok(svg.includes(`stop-color="${color}"`))
      const favicon = read(`public/images/favicon-${theme}-${mode}.svg`)
      assert.match(favicon, /viewBox="0 0 64 64"/)
      assert.match(favicon, /width="64" height="64"/)
      assert.doesNotMatch(favicon, /<rect|<image|<filter|<script/)
      assert.ok(favicon.includes(`stroke="${colors.k}"`))
      assert.ok(favicon.includes('d="M19 18 5 32 19 46M45 18 59 32 45 46"'))
      assert.ok(favicon.includes('d="M39 10 25 54" stroke="url(#slash-gradient)"'))
      for (const color of colors.m) assert.ok(favicon.includes(`stop-color="${color}"`))
    }
  }
  for (const file of ['navbar/Navbar.jsx', 'Sidebar/sidebar.jsx']) {
    const source = read(`src/components/${file}`)
    assert.ok(source.includes('`/images/logo-${theme}-${resolvedMode}.svg`'))
    assert.doesNotMatch(source, /logo\.webp/)
  }
})

test('services CTA keeps a filled-action color pair on hover and press; resume keeps a visible boundary', () => {
  const css = compile(join(root, 'src/components/services/services.scss'), { silenceDeprecations: ['import'] }).css
  assert.match(css, /\.services-cta button \{[^}]*color: var\(--color-on-primary\);[^}]*background: var\(--color-primary\);[^}]*border: 1px solid var\(--color-primary-border\);/)
  assert.match(css, /\.services-cta button:hover \{[^}]*background: var\(--color-primary-hover\);/)
  assert.match(css, /\.services-cta button:active \{[^}]*background: var\(--color-primary-active\);/)
  const resume = compile(join(root, 'src/components/workExperience/experience.scss'), { silenceDeprecations: ['import'] }).css
  assert.match(resume, /\.resume-cta \{[^}]*border: 1px solid var\(--color-border-strong\);/)
  assert.match(resume, /\.resume-cta:hover \{[^}]*border-color: var\(--color-border-strong\);/)
})

test('all component styles compile and have no fixed UI color literals or legacy tokens', () => {
  for (const file of componentFiles.filter(path => path.endsWith('.scss'))) {
    const css = compile(file, { silenceDeprecations: ['import'] }).css
    assert.doesNotMatch(css, /#[\da-f]{3,8}\b|rgba?\(\s*\d|hsla?\(\s*\d/i, file)
    assert.doesNotMatch(css, /--color-(?:bgPrimary|textPrimary|textSecondary|textTertiary|textMuted|primaryDark|glassBg)/, file)
    assert.doesNotMatch(css, /background-clip:\s*text|text-fill-color:\s*transparent/, file)
    assert.doesNotMatch(css, /outline:\s*none/, file)
  }
})

test('runtime component visuals use tokens rather than literal SVG, motion or canvas colors', () => {
  for (const file of componentFiles.filter(path => path.endsWith('.jsx'))) {
    assert.doesNotMatch(readFileSync(file, 'utf8'), /#[\da-f]{6}\b|rgba?\(\s*\d/i, file)
  }
})

test('all five palette K assets exist, share declared dimensions and retain contain sizing', () => {
  const home = read('src/components/Home/home.jsx')
  const assets = ['deepcurrent-K.webp', 'porcelain-K.webp', 'daylight-K.png', 'burgundy-K.webp', 'botanical-K.webp']
  for (const asset of assets) {
    assert.ok(existsSync(join(root, 'public/images', asset)), asset)
    assert.ok(home.includes(`/images/${asset}`), `${asset} is mapped`)
  }
  assert.match(home, /src=\{letterAssets\[theme\]\}/)
  assert.match(home, /width=\{1254\}/)
  assert.match(home, /height=\{1254\}/)
  const css = compile(join(root, 'src/components/Home/home.scss'), { silenceDeprecations: ['import'] }).css
  assert.match(css, /\.home-page \.k-letter\s*\{[^}]*height: 1em;[^}]*max-width: 1em;[^}]*object-fit: contain;/)
  assert.doesNotMatch(home, /key=\{theme\}|filter:.*invert/)
})

test('filled shared controls and state labels use independent foreground/edge roles', () => {
  for (const file of ['UI/Button/Button', 'UI/RippleButton/RippleButton', 'ChatWidget/chatWidget', 'contact/contact', 'Home/home', 'writing/writing', 'ErrorBoundary/ErrorBoundary']) {
    const css = compile(join(root, 'src/components', file + '.scss'), { silenceDeprecations: ['import'] }).css
    assert.ok(css.includes('var(--color-on-primary)'), file)
    assert.ok(css.includes('var(--color-primary-border)'), file)
    assert.doesNotMatch(css, /color: var\(--color-bg\)/, file)
  }
  const css = read('src/components/UI/Button/Button.scss')
  for (const role of ['primary-hover', 'primary-active']) assert.ok(css.includes(`var(--color-${role})`))
  assert.match(read('src/components/ChatWidget/chatWidget.scss'), /a \{ color: inherit; \}/)
})

test('atmospheric effects share palette/mode/reduced-motion eligibility and use resolved CSS color', () => {
  const hook = read('src/hooks/useAtmosphere.js')
  assert.match(hook, /theme === 'deep-current' && resolvedMode === 'dark' && !reducedMotion/)
  assert.match(hook, /backgroundEnabled: !reducedMotion/)
  assert.match(hook, /getPropertyValue\('--color-cursor'\)/)
  for (const file of ['UI/ParticleBackground/ParticleBackground', '3D/Background3D', '3D/Hero3D']) {
    assert.ok(read('src/components/' + file + '.jsx').includes('useAtmosphere'), file)
  }
  const particles = read('src/components/UI/ParticleBackground/ParticleBackground.jsx')
  assert.match(particles, /backgroundEnabled: enabled/)
  assert.match(particles, /cancelAnimationFrame\(animationFrameId\)/)
  assert.match(particles, /ctx\.globalAlpha = 1/)
  const cursor = read('src/components/cursor/Cursor.jsx')
  assert.match(cursor, /target\.closest\('\.theme-inverse'\)/)
})

test('one page-wide particle field and palette-colored blob remain decorative and reduced-motion safe', () => {
  const home = read('src/components/Home/home.jsx')
  assert.doesNotMatch(home, /ParticleBackground/)
  assert.match(home, /className="rotating-blob" aria-hidden="true"/)
  assert.equal((read('src/components/Layout/index.jsx').match(/<ParticleBackground\b/g) || []).length, 1)
  const css = compile(join(root, 'src/components/Home/home.scss'), { silenceDeprecations: ['import'] }).css
  assert.match(css, /\.imageContainer \.rotating-blob \{[^}]*pointer-events: none;[^}]*opacity: 0\.12;/)
  assert.ok(css.includes('var(--blob-secondary, var(--color-link))'))
  assert.match(css, /:root\[data-mode=light\] \.imageContainer \.rotating-blob \{[^}]*--blob-primary: color-mix\(in srgb, var\(--color-link\) 75%, var\(--color-text\)\);[^}]*opacity: 0\.75;/)
  assert.match(css, /:root\[data-theme=deep-current\]\[data-mode=light\] \.imageContainer \.rotating-blob \{[^}]*--blob-secondary: var\(--blob-primary\);/)
  assert.match(css, /:root\[data-mode=dark\] \.imageContainer \.rotating-blob \{[^}]*--blob-primary: color-mix\(in srgb, var\(--color-link\) 70%, var\(--color-text\)\);[^}]*--blob-secondary: color-mix\(in srgb, var\(--color-accent\) 70%, var\(--color-text\)\);[^}]*opacity: 0\.55;/)
  assert.match(css, /:root\[data-theme=deep-current\]\[data-mode=dark\] \.imageContainer \.rotating-blob \{[^}]*--blob-secondary: var\(--blob-primary\);/)
  assert.match(css, /animation: rotateBlob 12s linear infinite, morphBlob 8s ease-in-out infinite;/)
  const app = compile(join(root, 'src/App.scss'), { silenceDeprecations: ['import'] }).css
  assert.doesNotMatch(app, /\.rotating-blob[^{]*\{[^}]*display: none;/)
  assert.match(app, /@media \(prefers-reduced-motion: reduce\)/)
  const particles = compile(join(root, 'src/components/UI/ParticleBackground/ParticleBackground.scss'), { silenceDeprecations: ['import'] }).css
  assert.match(particles, /\.particle-background \{[^}]*position: fixed;[^}]*pointer-events: none;/)
  assert.match(particles, /:root\[data-mode=light\] \.particle-background \{[^}]*opacity: 0\.55;/)
})

test('Appearance keeps palette and mode controls independent and available without custom cursors', () => {
  const source = read('src/components/cursor/Cursor.jsx')
  assert.doesNotMatch(source, /if \(!isSupported\) return null/)
  assert.match(source, /type="radio" name="appearance-palette"/)
  assert.match(source, /type="radio" name="appearance-mode"/)
  assert.match(source, /item\[resolvedMode\]\.map/)
  assert.match(source, /setTheme\(item\.id\)/)
  assert.match(source, /setMode\(value\)/)
  assert.match(source, /resetTheme\(\)/)
  assert.match(source, /resetMode\(\)/)
  assert.match(source, /isSupported && templates\.map/)
  assert.match(source, /role="status" aria-atomic="true"/)
  assert.match(source, /document\.removeEventListener\('keydown', escape, true\)/)
  assert.match(source, /document\.removeEventListener\('pointerdown', dismiss\)/)
  assert.match(source, /document\.removeEventListener\('focusin', leavePanel\)/)
  assert.match(read('src/components/ChatWidget/ChatWidget.jsx'), /removeEventListener\('appearance:open', hideForAppearance\)/)
})

test('Appearance styling retains large targets, short-screen scrolling and no unsupported-device hiding', () => {
  const css = compile(join(root, 'src/components/cursor/cursor.scss'), { silenceDeprecations: ['import'] }).css
  assert.match(css, /\.cursor-switcher-trigger \{[^}]*height: 46px;/)
  assert.match(css, /\.cursor-switcher-close \{[^}]*width: 44px;[^}]*height: 44px;/)
  assert.match(css, /\.cursor-switcher-panel \{[^}]*max-height:[^;]*100dvh[^;]*;[^}]*overflow-y: auto;/)
  assert.doesNotMatch(css, /\.cursor-switcher\s*\{[^}]*display:\s*none/)
})

test('Appearance discovery points visitors to themes without blocking controls or reduced-motion access', () => {
  const source = read('src/components/cursor/Cursor.jsx')
  assert.match(source, /!isOpen && \(\s*<div className="appearance-discovery" aria-hidden="true">/)
  assert.match(source, /<span>View themes<\/span>/)
  const css = compile(join(root, 'src/components/cursor/cursor.scss'), { silenceDeprecations: ['import'] }).css
  assert.match(css, /\.appearance-discovery \{[^}]*color: var\(--color-link\);[^}]*pointer-events: none;[^}]*animation: appearance-nudge 1\.8s ease-in-out infinite;/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{\s*\.appearance-discovery \{[^}]*animation: none;/)
  assert.match(source, /className="appearance-mobile-label" aria-hidden="true">View themes/)
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*\.appearance-discovery,\s*\.cursor-switcher-details \{\s*display: none;/)
  assert.match(css, /\.appearance-mobile-label \{\s*display: inline;[^}]*white-space: nowrap;/)
})
