// Blocking head script: preference resolution must finish before the first paint.
(function () {
  const themes = Object.freeze([
    { id: 'deep-current', name: 'Deep Current', light: ['#eaf4fc', '#165d91', '#91c7ed'], dark: ['#061829', '#bce0fb', '#8bc5f0'] },
    { id: 'porcelain', name: 'Porcelain', light: ['#f6f4ef', '#2f2a7a', '#f0954f'], dark: ['#0b0a1a', '#3e38a0', '#f8ae76'] },
    { id: 'daylight', name: 'Daylight', light: ['#f6efe6', '#8b3922', '#7e9a7a'], dark: ['#140d0a', '#8b3922', '#9db596'] },
    { id: 'burgundy-cream', name: 'Burgundy & Cream', light: ['#f9f1de', '#5f111f', '#d6a85c'], dark: ['#150709', '#7a1628', '#e0b565'] },
    { id: 'botanical', name: 'Botanical', light: ['#f7f3ea', '#0f4c3a', '#c47a45'], dark: ['#06100d', '#166150', '#db9a66'] },
  ].map(theme => Object.freeze({
    ...theme,
    light: Object.freeze(theme.light),
    dark: Object.freeze(theme.dark),
  })))
  const modes = Object.freeze(['light', 'dark', 'system'])
  const keys = { theme: 'portfolio-theme', mode: 'portfolio-mode' }
  const defaults = { theme: 'deep-current', mode: 'system' }
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const listeners = new Set()
  let listening = false
  let storageErrors = {}
  let snapshot

  function isValid(dimension, value) {
    return dimension === 'theme'
      ? themes.some(theme => theme.id === value)
      : modes.includes(value)
  }

  function reportStorageError(dimension, operation, error) {
    console.warn(`[Appearance] Could not ${operation} ${keys[dimension]}.`, error)
    storageErrors = { ...storageErrors, [dimension]: operation }
  }

  function read(dimension) {
    try {
      const value = window.localStorage.getItem(keys[dimension])
      if (value === null) return defaults[dimension]
      if (isValid(dimension, value)) return value
      console.warn(`[Appearance] Invalid ${keys[dimension]}; using its default.`)
      return defaults[dimension]
    } catch (error) {
      reportStorageError(dimension, 'read', error)
      return defaults[dimension]
    }
  }

  function apply(theme, modePreference) {
    const resolvedMode = modePreference === 'system'
      ? (media.matches ? 'dark' : 'light')
      : modePreference
    const palette = themes.find(item => item.id === theme)
    const background = palette[resolvedMode][0]
    const root = document.documentElement
    root.dataset.theme = theme
    root.dataset.mode = resolvedMode
    root.style.colorScheme = resolvedMode
    root.style.backgroundColor = background
    document.querySelectorAll('meta[name="theme-color"], meta[name="msapplication-TileColor"]')
      .forEach(meta => meta.setAttribute('content', background))
    document.getElementById('theme-favicon')
      .setAttribute('href', `/images/favicon-${theme}-${resolvedMode}.svg?v=2`)
    snapshot = Object.freeze({
      theme,
      modePreference,
      resolvedMode,
      storageErrors: Object.freeze({ ...storageErrors }),
    })
    listeners.forEach(listener => listener())
  }

  function refresh() {
    apply(
      snapshot && storageErrors.theme ? snapshot.theme : read('theme'),
      snapshot && storageErrors.mode ? snapshot.modePreference : read('mode'),
    )
  }

  function setPreference(dimension, value, reset = false) {
    if (!isValid(dimension, value)) {
      throw new TypeError(`[Appearance] Invalid ${dimension} preference.`)
    }
    try {
      if (reset) window.localStorage.removeItem(keys[dimension])
      else window.localStorage.setItem(keys[dimension], value)
      const nextErrors = { ...storageErrors }
      delete nextErrors[dimension]
      storageErrors = nextErrors
    } catch (error) {
      reportStorageError(dimension, reset ? 'reset' : 'save', error)
    }
    apply(
      dimension === 'theme' ? value : snapshot.theme,
      dimension === 'mode' ? value : snapshot.modePreference,
    )
  }

  function onSystemChange() {
    if (snapshot.modePreference === 'system') {
      apply(snapshot.theme, snapshot.modePreference)
    }
  }

  function onStorage(event) {
    if (event.key !== null && !Object.values(keys).includes(event.key)) return
    try {
      if (event.storageArea !== window.localStorage) return
    } catch (error) {
      // Both dimensions may be affected when storage becomes inaccessible.
      reportStorageError('theme', 'read', error)
      reportStorageError('mode', 'read', error)
      apply(snapshot.theme, snapshot.modePreference)
      return
    }
    // Read only the changed dimension; the other may be an unsaved in-memory choice.
    const theme = event.key === null || event.key === keys.theme ? read('theme') : snapshot.theme
    const mode = event.key === null || event.key === keys.mode ? read('mode') : snapshot.modePreference
    apply(theme, mode)
  }

  function subscribe(listener) {
    listeners.add(listener)
    if (!listening) {
      listening = true
      media.addEventListener('change', onSystemChange)
      window.addEventListener('storage', onStorage)
      // Reconcile changes made between the head script and React subscription.
      refresh()
    }
    return () => {
      listeners.delete(listener)
      if (listeners.size === 0) {
        media.removeEventListener('change', onSystemChange)
        window.removeEventListener('storage', onStorage)
        listening = false
      }
    }
  }

  refresh()
  window.portfolioAppearance = Object.freeze({
    themes,
    modes,
    getSnapshot: () => snapshot,
    subscribe,
    setTheme: theme => setPreference('theme', theme),
    setMode: mode => setPreference('mode', mode),
    resetTheme: () => setPreference('theme', defaults.theme, true),
    resetMode: () => setPreference('mode', defaults.mode, true),
  })
})()
