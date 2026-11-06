/* eslint-env node */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'
import { compile } from 'sass'

const source = readFileSync(new URL('../public/theme-bootstrap.js', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../src/styles/_themes.scss', import.meta.url), 'utf8')
const palettes = [...styles.matchAll(/:root\[data-theme='([^']+)'\]\[data-mode='([^']+)'\]\s*\{([^}]+)\}/g)]
  .map(([, theme, mode, body]) => ({
    theme,
    mode,
    tokens: Object.fromEntries([...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, key, value]) => [key, value])),
  }))

function setup({ saved = {}, dark = false, failRead = [], failWrite = [], blocked = false } = {}) {
  const values = new Map(Object.entries(saved))
  const warnings = []
  const events = new Map()
  const mediaListeners = new Set()
  const root = { dataset: {}, style: {} }
  const meta = { setAttribute: (key, value) => { meta[key] = value } }
  const favicon = { setAttribute: (key, value) => { favicon[key] = value } }
  const media = {
    matches: dark,
    addEventListener: (_, listener) => mediaListeners.add(listener),
    removeEventListener: (_, listener) => mediaListeners.delete(listener),
  }
  const storage = {
    getItem: key => {
      if (failRead.includes(key)) throw new Error('Storage read denied')
      return values.get(key) ?? null
    },
    setItem: (key, value) => {
      if (failWrite.includes(key)) throw new Error('Storage write denied')
      values.set(key, value)
    },
    removeItem: key => {
      if (failWrite.includes(key)) throw new Error('Storage removal denied')
      values.delete(key)
    },
  }
  const window = {
    get localStorage() {
      if (blocked) throw new Error('Storage unavailable')
      return storage
    },
    matchMedia: () => media,
    addEventListener: (type, listener) => {
      if (!events.has(type)) events.set(type, new Set())
      events.get(type).add(listener)
    },
    removeEventListener: (type, listener) => events.get(type).delete(listener),
  }
  runInNewContext(source, {
    window,
    document: { documentElement: root, querySelectorAll: () => [meta], getElementById: () => favicon },
    console: { warn: (...args) => warnings.push(args) },
  })
  return {
    api: window.portfolioAppearance,
    root, meta, favicon, values, warnings, events, mediaListeners,
    changeSystem(nextDark) {
      media.matches = nextDark
      mediaListeners.forEach(listener => listener())
    },
    storageEvent(key, value, storageArea = storage) {
      if (key === null) values.clear()
      else if (value === null) values.delete(key)
      else values.set(key, value)
      events.get('storage')?.forEach(listener => listener({ key, storageArea }))
    },
  }
}

test('default palette + system mode resolve synchronously, before React subscription', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  assert.ok(html.indexOf('<script src="/theme-bootstrap.js">') < html.indexOf('rel="stylesheet"'),
    'appearance resolves before render-blocking external stylesheets')
  for (const dark of [false, true]) {
    const { api, root, meta } = setup({ dark })
    assert.equal(api.getSnapshot().theme, 'deep-current')
    assert.equal(api.getSnapshot().modePreference, 'system')
    assert.equal(root.dataset.mode, dark ? 'dark' : 'light')
    assert.equal(root.dataset.theme, 'deep-current')
    assert.equal(root.style.colorScheme, root.dataset.mode)
    assert.equal(meta.content, dark ? '#061829' : '#eaf4fc')
    assert.equal(root.style.backgroundColor, meta.content)
  }
})

test('SVG favicon follows saved appearance, live selections, system mode and cross-tab changes', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  assert.match(html, /id="theme-favicon" rel="icon" type="image\/svg\+xml" sizes="any"/)
  const { api, favicon, changeSystem, storageEvent } = setup({ dark: true })
  api.subscribe(() => {})
  assert.equal(favicon.href, '/images/favicon-deep-current-dark.svg?v=2')
  for (const { id } of api.themes) {
    for (const mode of ['light', 'dark']) {
      const saved = setup({ saved: { 'portfolio-theme': id, 'portfolio-mode': mode } })
      assert.equal(saved.favicon.href, `/images/favicon-${id}-${mode}.svg?v=2`)
      api.setTheme(id)
      api.setMode(mode)
      assert.equal(favicon.href, `/images/favicon-${id}-${mode}.svg?v=2`)
    }
  }
  api.setMode('system')
  changeSystem(false)
  assert.equal(favicon.href, '/images/favicon-botanical-light.svg?v=2')
  storageEvent('portfolio-theme', 'porcelain')
  assert.equal(favicon.href, '/images/favicon-porcelain-light.svg?v=2')
  changeSystem(true)
  assert.equal(favicon.href, '/images/favicon-porcelain-dark.svg?v=2')
})

test('all ten appearances resolve and metadata/swatches match CSS tokens', () => {
  assert.equal(palettes.length, 10)
  const { api } = setup()
  assert.equal(api.themes.length, 5)
  for (const palette of palettes) {
    const { api: store, root, meta } = setup({
      saved: { 'portfolio-theme': palette.theme, 'portfolio-mode': palette.mode },
    })
    assert.equal(root.dataset.theme, palette.theme)
    assert.equal(root.dataset.mode, palette.mode)
    assert.equal(store.getSnapshot().modePreference, palette.mode)
    assert.equal(meta.content, palette.tokens['color-bg'])
    const swatches = api.themes.find(theme => theme.id === palette.theme)[palette.mode]
    assert.deepEqual([...swatches], [
      palette.tokens['color-bg'], palette.tokens['color-primary'], palette.tokens['color-accent'],
    ])
    for (const systemDark of [false, true]) {
      const { api: system } = setup({ saved: { 'portfolio-theme': palette.theme }, dark: systemDark })
      assert.equal(system.getSnapshot().resolvedMode, systemDark ? 'dark' : 'light')
      assert.equal(system.getSnapshot().theme, palette.theme)
    }
  }
})

test('unknown stored preferences fall back independently with diagnostics', () => {
  const { api, warnings } = setup({
    saved: { 'portfolio-theme': 'system', 'portfolio-mode': 'unknown' },
  })
  assert.equal(api.getSnapshot().theme, 'deep-current')
  assert.equal(api.getSnapshot().modePreference, 'system')
  assert.equal(warnings.length, 2)
  const valid = setup({ saved: { 'portfolio-theme': 'botanical', 'portfolio-mode': 'invalid' } })
  assert.equal(valid.api.getSnapshot().theme, 'botanical')
  assert.equal(valid.api.getSnapshot().modePreference, 'system')
  const invalidTheme = setup({ saved: { 'portfolio-theme': '__proto__', 'portfolio-mode': 'dark' } })
  assert.equal(invalidTheme.api.getSnapshot().theme, 'deep-current')
  assert.equal(invalidTheme.api.getSnapshot().resolvedMode, 'dark')
})

test('setters preserve the other dimension, persist, and reject invalid inputs', () => {
  const { api, values } = setup()
  const unsubscribe = api.subscribe(() => {})
  api.setMode('dark')
  api.setTheme('porcelain')
  assert.equal(api.getSnapshot().modePreference, 'dark')
  api.setMode('light')
  assert.equal(api.getSnapshot().theme, 'porcelain')
  assert.equal(values.get('portfolio-theme'), 'porcelain')
  assert.equal(values.get('portfolio-mode'), 'light')
  assert.throws(() => api.setTheme('petrol'), /Invalid theme/)
  assert.throws(() => api.setTheme(null), /Invalid theme/)
  assert.throws(() => api.setMode('auto'), /Invalid mode/)
  assert.equal(api.getSnapshot().theme, 'porcelain')
  unsubscribe()
})

test('OS changes affect only system mode and never change the palette', () => {
  const env = setup({ saved: { 'portfolio-theme': 'daylight' } })
  const unsubscribe = env.api.subscribe(() => {})
  env.changeSystem(true)
  assert.equal(env.api.getSnapshot().resolvedMode, 'dark')
  assert.equal(env.api.getSnapshot().theme, 'daylight')
  env.api.setMode('light')
  env.changeSystem(false)
  env.changeSystem(true)
  assert.equal(env.api.getSnapshot().resolvedMode, 'light')
  env.api.setMode('system')
  assert.equal(env.api.getSnapshot().resolvedMode, 'dark')
  unsubscribe()
})

test('cross-tab updates, deletion and clear affect only their intended preferences', () => {
  const env = setup({ saved: { 'portfolio-cursor': 'brackets' } })
  const unsubscribe = env.api.subscribe(() => {})
  env.api.setMode('dark')
  env.storageEvent('portfolio-theme', 'botanical')
  assert.equal(env.api.getSnapshot().theme, 'botanical')
  assert.equal(env.api.getSnapshot().modePreference, 'dark')
  env.storageEvent('portfolio-mode', 'light')
  assert.equal(env.api.getSnapshot().theme, 'botanical')
  env.storageEvent('portfolio-theme', null)
  assert.equal(env.api.getSnapshot().theme, 'deep-current')
  assert.equal(env.api.getSnapshot().modePreference, 'light')
  env.api.setTheme('porcelain')
  env.storageEvent('portfolio-mode', null)
  assert.equal(env.api.getSnapshot().modePreference, 'system')
  assert.equal(env.api.getSnapshot().theme, 'porcelain')
  env.storageEvent('portfolio-theme', 'daylight', {})
  assert.equal(env.api.getSnapshot().theme, 'porcelain', 'ignore sessionStorage')
  env.storageEvent('unrelated-key', 'value')
  assert.equal(env.api.getSnapshot().theme, 'porcelain')
  env.storageEvent(null)
  assert.equal(env.api.getSnapshot().theme, 'deep-current')
  assert.equal(env.api.getSnapshot().modePreference, 'system')
  unsubscribe()
})

test('individual resets preserve the other dimension and cursor choice', () => {
  const env = setup({ saved: { 'portfolio-cursor': 'brackets' } })
  env.api.setTheme('burgundy-cream')
  env.api.setMode('dark')
  env.api.resetTheme()
  assert.equal(env.api.getSnapshot().theme, 'deep-current')
  assert.equal(env.api.getSnapshot().modePreference, 'dark')
  assert.equal(env.values.has('portfolio-theme'), false)
  env.api.setTheme('botanical')
  env.api.resetMode()
  assert.equal(env.api.getSnapshot().theme, 'botanical')
  assert.equal(env.api.getSnapshot().modePreference, 'system')
  assert.equal(env.values.has('portfolio-mode'), false)
  assert.equal(env.values.get('portfolio-cursor'), 'brackets')
})

test('blocked storage never prevents rendering or in-memory palette/mode changes', () => {
  const env = setup({ blocked: true })
  assert.deepEqual(Object.keys(env.api.getSnapshot().storageErrors), ['theme', 'mode'])
  const unsubscribe = env.api.subscribe(() => {})
  env.api.setTheme('botanical')
  env.api.setMode('dark')
  env.changeSystem(false)
  assert.equal(env.root.dataset.theme, 'botanical')
  assert.equal(env.root.dataset.mode, 'dark')
  assert.equal(env.warnings.length, 4)
  unsubscribe()
  const cleanup = env.api.subscribe(() => {})
  assert.equal(env.api.getSnapshot().theme, 'botanical', 'resubscribe preserves unsaved choices')
  cleanup()
})

test('storage failures/recovery are independent and other-tab changes retain unsaved choices', () => {
  const failed = ['portfolio-theme']
  const env = setup({ failWrite: failed })
  const unsubscribe = env.api.subscribe(() => {})
  env.api.setTheme('porcelain')
  env.api.setMode('dark')
  assert.deepEqual(Object.keys(env.api.getSnapshot().storageErrors), ['theme'])
  env.storageEvent('portfolio-mode', 'light')
  assert.equal(env.api.getSnapshot().theme, 'porcelain')
  env.api.resetTheme()
  assert.equal(env.api.getSnapshot().theme, 'deep-current')
  assert.equal(env.api.getSnapshot().modePreference, 'light')
  assert.equal(env.api.getSnapshot().storageErrors.theme, 'reset')
  failed.pop()
  env.api.setTheme('botanical')
  assert.equal(Object.keys(env.api.getSnapshot().storageErrors).length, 0)
  const readFailure = setup({ failRead: ['portfolio-mode'], saved: { 'portfolio-theme': 'daylight' } })
  assert.equal(readFailure.api.getSnapshot().theme, 'daylight')
  assert.deepEqual(Object.keys(readFailure.api.getSnapshot().storageErrors), ['mode'])
  unsubscribe()
})

test('a failed mode write does not affect a saved palette or cursor', () => {
  const env = setup({ failWrite: ['portfolio-mode'], saved: { 'portfolio-cursor': 'precision' } })
  env.api.setTheme('daylight')
  env.api.setMode('dark')
  assert.equal(env.api.getSnapshot().theme, 'daylight')
  assert.equal(env.api.getSnapshot().resolvedMode, 'dark')
  assert.deepEqual(Object.keys(env.api.getSnapshot().storageErrors), ['mode'])
  assert.equal(env.values.get('portfolio-theme'), 'daylight')
  assert.equal(env.values.get('portfolio-cursor'), 'precision')
})

test('subscriptions share listeners, clean up, and reconcile intervening storage changes', () => {
  const env = setup()
  let notifications = 0
  const listener = () => { notifications++ }
  const a = env.api.subscribe(listener)
  const b = env.api.subscribe(() => {})
  assert.equal(env.mediaListeners.size, 1)
  assert.equal(env.events.get('storage').size, 1)
  const snapshot = env.api.getSnapshot()
  assert.equal(env.api.getSnapshot(), snapshot, 'stable snapshot between changes')
  env.api.setTheme('porcelain')
  assert.ok(notifications >= 2)
  a()
  assert.equal(env.mediaListeners.size, 1)
  b()
  assert.equal(env.mediaListeners.size, 0)
  assert.equal(env.events.get('storage').size, 0)
  env.values.set('portfolio-mode', 'dark')
  const cleanup = env.api.subscribe(listener)
  assert.equal(env.api.getSnapshot().resolvedMode, 'dark')
  cleanup()
})

const roles = [
  'bg', 'bg-alt', 'surface', 'surface-raised', 'surface-sunken', 'text', 'text-muted',
  'primary', 'primary-hover', 'primary-active', 'on-primary', 'primary-subtle', 'primary-border',
  'link', 'link-hover', 'accent', 'accent-text', 'border', 'border-strong', 'focus',
  'bg-inverse', 'text-inverse', 'success', 'warning', 'error', 'info',
].map(role => 'color-' + role)

function contrast(a, b) {
  const luminance = hex => hex.slice(1).match(/../g).map(channel => parseInt(channel, 16) / 255)
    .map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
    .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0)
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

test('ten complete token sets meet opaque text/button/boundary contrast thresholds', () => {
  for (const { theme, mode, tokens } of palettes) {
    assert.deepEqual(Object.keys(tokens).filter(role => role.startsWith('color-')).sort(), [...roles].sort())
    for (const role of roles) {
      assert.match(tokens[role], /^(#[0-9a-f]{6}|rgb\([\d. ]+ \/ [\d.]+\))$/)
    }
    const check = (a, b, min) => assert.ok(
      contrast(tokens['color-' + a], tokens['color-' + b]) >= min,
      `${theme}/${mode}: ${a} on ${b} >= ${min}`,
    )
    for (const bg of ['bg', 'bg-alt', 'surface', 'surface-raised', 'surface-sunken']) {
      for (const fg of ['text', 'text-muted', 'link', 'link-hover', 'accent-text', 'success', 'warning', 'error', 'info']) check(fg, bg, 4.5)
      check('border-strong', bg, 3)
      check('focus', bg, 3)
    }
    for (const state of ['primary', 'primary-hover', 'primary-active']) check('on-primary', state, 4.5)
    check('text-inverse', 'bg-inverse', 4.5)
    for (const token of ['shadow-sm', 'shadow-hover', 'shadow-overlay', 'overlay-scrim']) {
      assert.ok(tokens[token], `${theme}/${mode}: ${token}`)
    }
  }
})

test('component Sass emits no globals and breakpoints remain unchanged', () => {
  const mixins = compile(new URL('../src/styles/_mixins.scss', import.meta.url).pathname).css
  assert.equal(mixins.trim(), '')
  function checkImports(path) {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const name = join(path, entry.name)
      if (entry.isDirectory()) checkImports(name)
      else if (name.endsWith('.scss')) assert.doesNotMatch(readFileSync(name, 'utf8'), /@import.*App\.scss/)
    }
  }
  checkImports(new URL('../src/components', import.meta.url).pathname)
  const text = readFileSync(new URL('../src/styles/_mixins.scss', import.meta.url), 'utf8')
  for (const query of ['(max-width: 480px)', '(min-width: 481px) and (max-width: 900px)', '(min-width: 769px)']) {
    assert.ok(text.includes(query))
  }
})
