# Kemi-Oluwadahunsi Portfolio - Modern React Portfolio

A modern, high-performance portfolio website built with React, Vite, and cutting-edge web technologies.

## 🚀 Features

### Core Features
- ⚡ **Lightning Fast**: Built with Vite for optimal performance
- 🎨 **Modern Design**: Glassmorphism, smooth animations, and modern UI
- 🌓 **Five visual identities**: Independent light/dark modes and an Appearance selector
- 📱 **Fully Responsive**: Optimized for all devices
- ♿ **Accessible**: WCAG compliant with ARIA labels
- 🔍 **SEO Optimized**: Comprehensive meta tags, structured data, and sitemap
- 📦 **PWA Ready**: Progressive Web App with offline support
- 🎭 **3D Animations**: Interactive 3D elements with Three.js
- ✨ **Advanced Animations**: Framer Motion and GSAP integration

### Performance
- Code splitting and lazy loading
- Optimized bundle size
- Image optimization
- Resource hints and preloading

### Developer Experience
- TypeScript ready
- ESLint + Prettier
- Husky git hooks
- Bundle analyzer

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Framer Motion** - Animation library
- **Three.js / React Three Fiber** - 3D graphics
- **GSAP** - Advanced animations
- **Sass/SCSS** - Styling
- **React Router** - Routing
- **React Helmet Async** - SEO management

## 📦 Installation

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test:themes` - Test theme resolution, persistence, contrast and component migration
- `npm run type-check` - TypeScript type checking (when migrated)

## 📁 Project Structure

```
src/
├── components/        # React components
│   ├── 3D/          # 3D components (Three.js)
│   ├── UI/          # Reusable UI components
│   ├── SEO/         # SEO components
│   └── ...
├── constants/        # Data and configuration
├── context/          # React context providers
├── hooks/            # Custom React hooks
└── ...
```

## 🎨 Design System

The five-theme portfolio is documented in the
[theme systems index](docs/theme-systems/README.md): Deep Current, Porcelain, Daylight,
Burgundy & Cream, and Botanical. Each palette has light and dark modes, selected
independently from the palette (ten appearances). Porcelain uses indigo/apricot,
Daylight terracotta/sand, Botanical emerald/ivory, and Deep Current powder blue
in light mode with its existing navy identity in dark. Follow the
[implementation checklist](docs/THEME-IMPLEMENTATION-PLAN.md) for delivery status.
The foundation, shared components, Appearance selector and visual identities
(Phases 2-5) are implemented. Phase 6 automated production checks and fixes are
implemented; standalone-browser, real-device and assistive-technology sign-off
remain open in the release checklist.

[`_identities.scss`](src/styles/_identities.scss) connects shared heading, card and
media geometry tokens and palette-specific dividers. Daylight uses a subtle,
continuous 1px theme-colored line rather than a split accent/bar treatment.
The portrait uses the same
animated, blurred blob across all themes, not frames, grids, rings or arches.
Deep Current retains its blue blob; the other palettes blend their readable
brand color with their accent. Burgundy retains its inverse Skills band.
Light-mode blobs use deeper palette shades at 75% opacity; dark modes blend
palette shades toward their light text color at 55% opacity for clear separation
from dark backgrounds. Animation timings remain unchanged.
Non-Deep Current cards omit glass/shine and large
tilt/scale effects. Palette changes preserve content and layout; mode changes
preserve each identity's fonts and geometry.

The blocking [`theme-bootstrap.js`](public/theme-bootstrap.js) script owns the
allowlisted registry and shared preference store. It sets root `data-theme`,
`data-mode`, `color-scheme`, page background and browser theme-color before the
app starts. Keep this classic script in the head, before the Vite module.
`portfolio-theme` stores the palette; `portfolio-mode` stores `light`, `dark` or
`system`. Defaults are Deep Current and system mode. Cursor storage is untouched.
Key removal resets only that dimension; cross-tab clear resets both.

React components use [`useTheme`](src/hooks/useTheme.js), inside the application
[`ThemeProvider`](src/context/ThemeProvider.jsx):

```jsx
const {
  theme, modePreference, resolvedMode, themes, modes,
  setTheme, setMode, resetTheme, resetMode, storageErrors,
} = useTheme()
```

`setTheme('porcelain')` preserves mode; `setMode('dark')` preserves palette.
Reset methods restore only their own defaults. Invalid setter arguments throw.
`themes` lists stable IDs/names and `light`/`dark` swatch triples (page, action,
accent); `modes` lists supported preferences. Storage failures are logged and
exposed per dimension in `storageErrors`, with a visible status message; in-memory
switching continues. Do not mount routes with a theme-dependent React key.

[`_themes.scss`](src/styles/_themes.scss) defines all ten token sets, shared
typography/geometry/motion tokens and a complete `.theme-inverse` context.
Components must import only the non-emitting
[`_mixins.scss`](src/styles/_mixins.scss), never the global application stylesheet.
`App.scss` is loaded once by the app. Legacy color aliases have been removed.
`--color-primary` is an action fill, paired with `--color-on-primary` and
`--color-primary-border`; use `--color-link` for colored text and
`--color-accent-text` for readable accent copy. Form fields use strong boundaries.
The old static `src/constants/theme.js` object is unused, not reactive theme state.

Routes, navigation, shared controls, contact states, chat, loaders and portaled
dialogs now follow both modes. The five approved decorative K assets are mapped
in the hero, keep the same image between modes, and use proportional contained
bounds. Project screenshots and the portrait remain original.
The KM monogram now uses transparent vector assets for every palette/mode,
preserving the approved letter paths with a solid K and a three-stop M gradient.
Desktop/mobile navigation selects `public/images/logo-<theme>-<mode>.svg`.
[`logoPalettes.js`](src/constants/logoPalettes.js) is the shared logo/loader color
source; regenerate the ten assets with `node scripts/generate-theme-logos.mjs`
after editing it. The generator uses the paths in
[`logo-preview.svg`](public/images/logo-preview.svg), not raster tracing at runtime.
Dark versions lighten the K and M stops for dark surfaces. Signature loaders use
the same K color, M gradient, matching pen and readable K-colored name text.
The browser favicon uses a transparent square `</>` SVG, with palette-colored
brackets and a gradient slash, generated alongside the KM assets as
`public/images/favicon-<theme>-<mode>.svg`. The blocking appearance
bootstrap selects it on reload and updates it with palette, mode, system and
cross-tab changes. Apple touch/PWA installation icons remain PNG for platform
compatibility; they are separate from the live browser-tab favicon.
Favicons declare explicit 64px dimensions and use a versioned URL to invalidate
cached artwork. Some embedded browser tabs may not display SVG favicons; check
the site in a standalone browser when its tab still shows a generic icon.
One fixed particle/node field covers the main portfolio's sections in all ten
appearances, using each palette/mode's cursor foreground; light mode increases
field opacity so the nodes remain visible on pale surfaces. Reduced motion removes
the canvas and stops the blob animation; live changes tear down canvas animation/
listeners. Other 3D/floating effects remain restricted to Deep Current dark.
Cursor designs use the current local
foreground, including inverse bands; their existing native/input fallbacks remain.

Verification includes 38 automated theme/component checks, lint and a production
build, plus browser checks of ten appearances, route/overlay text, dialog keyboard
behavior, responsive hero bounds, cursor choices and effect eligibility.
Opaque-text scans are regression checks, not a claim of full WCAG certification.
Phase 5 also checked all ten appearances at 320-1440px, equal service-card heights,
mobile expansion, all six case studies and ebooks, and enlarged text (200% root
font size). Browser zoom/reflow, physical devices and assistive-technology testing
remain in the Phase 6 release matrix. Phase 6 also verifies production route and
dialog bounds, settled rendered text contrast, keyboard interactions, form/chat
draft preservation, forced-colors controls and offline appearance assets.
These checks do not replace a full accessibility audit.

Appearance resolution runs before the external font stylesheet, so a slow font
response cannot block the initial palette/mode/background selection.
The PWA precaches local TTF/WOFF fonts, theme bootstrap, logos and SVG favicons;
its precache ignores the favicon's `v` query parameter while still revisioning
the actual file contents. Offline verification covers all twenty themed
logo/favicon assets and case-study/ebook navigation after installation.
Install-manifest colors and PNG icons remain the static Deep Current defaults;
live browser metadata/favicons follow the selected appearance. Remote font
families require an initial online visit; offline first visits use font fallbacks.
The app's Framer Motion policy follows the device preference, and section
reveals react to live reduced-motion changes without translated hidden content.
The hero K rotation waits until the splash finishes, then runs for 2.4 seconds;
reduced-motion users see the static letter immediately.
The services project CTA retains its on-primary label with primary hover/pressed
fills, and the experience resume link uses a strong boundary in both modes.
Service-card reveal variants explicitly reset rotation and scale when leaving
Deep Current dark, including live reduced-motion changes, so an interrupted
3D reveal cannot leave cards edge-on in another appearance.
The contact Subject label stays floated above its placeholder/selection. Its
decorative dropdown arrow is inset from the edge; forced-colors mode restores
the native select arrow.
The KM signature loader shares the logo palette's K color, three-stop M gradient,
pen and name colors. Gradients have unique IDs so simultaneous loaders cannot share the wrong
palette context; a faint theme-colored guide sits behind the trace.
Route transitions and lazy-section placeholders use the existing Layer Stack
loader, selected separately through `IN_APP_LOADER` in
[`loaderConfig.js`](src/components/UI/Loader/loaderConfig.js). It can also use
`buildLog`; changing the splash's `ACTIVE_LOADER` does not change in-app loading.

### Appearance selector

The compact bottom-left Appearance button replaces the standalone cursor button.
It expands on hover/focus or while open. Its panel provides five named palette
radios with current-mode swatches, separate Light/Dark/Follow system radios,
independent palette/mode resets, and the five existing cursor choices plus native
reset. Changes apply immediately and preserve the other preferences.

Palette/mode selection remains available with reduced motion or without a mouse;
the panel explains why custom cursor previews are unavailable in those cases and
keeps the saved cursor choice. Storage errors are visible without blocking changes.
Native radio arrow keys work; Escape/close returns focus to the launcher. Tabbing
out or clicking outside dismisses the non-modal panel without trapping navigation.
Opening Appearance closes chat without clearing its conversation or draft.
Mobile navigation uses real anchor links for keyboard activation, focuses its
first link when opened and restores the toggle on Escape. It is a non-modal
dialog rather than a menu widget or a focus-trapping modal.
A palette-colored “View themes” label and bouncing arrow highlight the compact
Appearance launcher. The hint disappears while the panel is open or the launcher
is hovered/focused; reduced motion keeps the hint static.
On mobile/tablet, the floating hint is replaced by “View themes” inside the
launcher button, so the arrow and label cannot cover nearby content.
At mobile widths (480px and below), service accordion titles use a compact
1.125rem size in every palette, and the hero K image uses a 0.35rem word gap.
The panel scrolls within short viewports, and stays below welcome/ebook overlays.
Implementation remains in the existing [`Cursor`](src/components/cursor/Cursor.jsx)
component so pointer effects and their saved preferences are not remounted.

Newly provisioned Google Fonts use `display=swap`: DM Sans 400/500/600/700,
Cormorant Garamond 600 normal/italic and JetBrains Mono 400/500, with system
fallbacks. Their upstream licenses are SIL OFL 1.1:
[DM Sans](https://github.com/google/fonts/blob/main/ofl/dmsans/OFL.txt),
[Cormorant](https://github.com/google/fonts/blob/main/ofl/cormorantgaramond/OFL.txt),
[JetBrains Mono](https://github.com/google/fonts/blob/main/ofl/jetbrainsmono/OFL.txt).
Existing bundled Coolvetica, La Belle Aurore and Helvetica files are retained with
correct asset URLs and swap; this change does not establish licensing provenance
for those legacy files. Fonts do not vary between modes of a palette.
The install manifest retains its static navy launch color; runtime browser
theme-color follows the selected appearance. Installed/offline update behavior
remains part of Phase 6 verification.

The project uses a comprehensive design system with:
- CSS Custom Properties for theming
- Consistent color palette
- Typography scale
- Spacing system
- Component variants

### Cursor templates

The floating **Cursor** button collapses to an icon when idle and expands on hover
or keyboard focus (staying expanded while its options are open).
It opens five live styles: **Halo**, **Precision**,
**Orbit**, **Spotlight**, and **Code Brackets**. Select a style to preview it across
the portfolio, including case studies. The selection is saved in this browser;
**Use native cursor** restores the system pointer.

Custom cursors are available only with a fine, hover-capable pointer and no
reduced-motion preference. Text fields, editable content, and disabled controls
retain their native cursors. Press **Escape** or click outside to close the
switcher. Template definitions and visuals live in
[`Cursor.jsx`](src/components/cursor/Cursor.jsx) and
[`cursor.scss`](src/components/cursor/cursor.scss).

## 🔧 Configuration

- **Vite**: `vite.config.js` - Build configuration
- **ESLint**: `.eslintrc.cjs` - Linting rules
- **Prettier**: `.prettierrc` - Code formatting
- **TypeScript**: `tsconfig.json` - TypeScript config (ready for migration)

## 📈 Performance

- Lighthouse Score: 90+ (all categories)
- Core Web Vitals: Optimized
- SEO Score: 95+
- Accessibility Score: 100

## 🌐 SEO Features

- Meta tags (Open Graph, Twitter Cards)
- JSON-LD structured data
- Sitemap.xml
- Robots.txt
- Semantic HTML5

## 📱 PWA Features

- Service worker
- Web app manifest
- Offline support
- Install prompt ready

## 🎯 Best Practices

- Component-based architecture
- Code splitting and lazy loading
- Error boundaries
- Loading states
- Accessibility first
- Performance optimized

## 📄 License

Private project - All rights reserved

Built with ❤️ by Kemi Oluwadahunsi