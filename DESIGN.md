---
name: Kemi Oluwadahunsi Portfolio
description: Senior software engineer portfolio — elegant, authoritative, technically deep
colors:
  deep-current: "#061829"
  midnight-surface: "#0a1f33"
  slate-depth: "#0f2a3d"
  current-blue: "#095a9b"
  steel-accent: "#505064"
  current-accent: "#0c4e80"
  ice-primary: "#bce0fb"
  frost-primary: "#8bc5f0"
  mist-light: "#d4eafc"
  muted-shore: "#6b8fa3"
  signal-success: "#4ade80"
  signal-error: "#f87171"
  signal-warning: "#fbbf24"
typography:
  display:
    fontFamily: "Coolvetica, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Coolvetica, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.15
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
  decorative:
    fontFamily: "La Belle Aurore, cursive"
    fontSize: "1rem"
    fontWeight: 400
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "2rem"
  xl: "4rem"
  section: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.ice-primary}"
    textColor: "{colors.deep-current}"
    rounded: "{rounded.md}"
    padding: "12px 32px"
  button-primary-hover:
    backgroundColor: "{colors.frost-primary}"
    textColor: "{colors.deep-current}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ice-primary}"
    rounded: "{rounded.md}"
    padding: "12px 32px"
  card-surface:
    backgroundColor: "{colors.midnight-surface}"
    textColor: "{colors.ice-primary}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input-field:
    backgroundColor: "rgba(11, 24, 41, 0.7)"
    textColor: "{colors.ice-primary}"
    rounded: "{rounded.md}"
    padding: "16px"
---

# Design System: Kemi Oluwadahunsi Portfolio

## 1. Overview

**Creative North Star: "The Deep Current"**

Deep ocean depth meets technical precision. The system draws from the metaphor of a powerful current beneath a calm surface: what you see first is composed and elegant, but beneath every section runs serious engineering depth. The dark palette evokes deep water; the ice-blue primary cuts through like clarity itself.

This system explicitly rejects generic template portfolios, overly playful aesthetics, and the "AI slop" patterns that plague modern portfolios (gradient text, glassmorphism everywhere, identical card grids, hero-metric dashboards). It also rejects corporate stiffness. The result should feel like an architect's exhibition: curated, intentional, quietly impressive.

**Key Characteristics:**
- Dark-anchored palette with ice-blue as the singular accent voice
- Committed color strategy: the deep-current blues carry 30-40% of the surface, ice-primary punctuates sparingly
- Fluid, dynamic interactions — elements respond with smooth transitions, not bounce or spring
- Typography contrast through Coolvetica display + DM Sans body creates editorial hierarchy
- Depth conveyed through tonal layering, not shadow stacking

## 2. Colors

A tonal blue system that moves from near-black depths to ice-blue highlights. Every neutral is tinted toward the brand hue — no pure black, no pure white.

### Primary
- **Ice Primary** (#bce0fb): The singular accent voice. Used for interactive elements, active states, key labels, and the sidebar active indicator. Its rarity on dark surfaces is the point.
- **Frost Primary** (#8bc5f0): Hover and emphasis variant of Ice Primary. Secondary text, active nav links.
- **Mist Light** (#d4eafc): Lightest tint. Used sparingly for high-contrast moments and decorative highlights.

### Secondary
- **Current Blue** (#095a9b): Mid-depth accent for borders, interactive backgrounds, and section emphasis. The "working" blue.
- **Current Accent** (#0c4e80): Deeper variant for tertiary interactive states and subtle differentiation.

### Neutral
- **Deep Current** (#061829): Primary background. The ocean floor. Never pure black.
- **Midnight Surface** (#0a1f33): Elevated surface cards, secondary containers.
- **Slate Depth** (#0f2a3d): Tertiary backgrounds, hover states on dark surfaces.
- **Steel Accent** (#505064): Desaturated neutral for non-blue accents, muted borders.
- **Muted Shore** (#6b8fa3): Muted text, disabled states, placeholder content.

### Named Rules
**The Ice Rule.** Ice Primary (#bce0fb) appears on ≤15% of any given screen. Its scarcity against the deep background is what makes it arresting. Overuse dilutes its authority.

## 3. Typography

**Display Font:** Coolvetica (with sans-serif fallback)
**Body Font:** DM Sans (with sans-serif fallback)
**Decorative Font:** La Belle Aurore (cursive, for code-tag annotations only)

**Character:** Coolvetica's rounded geometry signals modern confidence without trying too hard. DM Sans provides clean, highly legible body text. The pairing is technical but not cold — editorial but not pretentious.

### Hierarchy
- **Display** (400, clamp(2.5rem, 6vw, 4rem), 1.05): Section titles — "Architecture in Action", "Let's Work Together". One per viewport.
- **Headline** (400, clamp(1.75rem, 4vw, 2.5rem), 1.15): Sub-section headers, case study titles. Up to two per viewport.
- **Title** (600, 1.25rem, 1.3): Card titles, feature names, skill group headers. DM Sans for clarity at medium scale.
- **Body** (400, 1rem, 1.6): Paragraphs, descriptions. Max line length 65-75ch.
- **Label** (500, 0.75rem, 1.4, tracking +0.08em): Tags, metadata, section labels, small caps treatments.
- **Decorative** (La Belle Aurore, 1rem): The `<body>` / `</body>` code annotations. Nowhere else.

### Named Rules
**The One Display Rule.** Only one Display-scale heading per viewport at rest. If two are visible simultaneously, one should be Headline scale instead.

## 4. Elevation

This system is flat by default. Depth is conveyed through **tonal layering** — moving from Deep Current (#061829) to Midnight Surface (#0a1f33) to Slate Depth (#0f2a3d) — rather than stacking box-shadows.

Shadows appear only as a response to state: hover elevation on interactive cards, the sidebar's edge shadow, lightbox overlays. They are never decorative at rest.

### Shadow Vocabulary
- **Hover lift** (`box-shadow: 0 8px 32px rgba(6, 24, 41, 0.5)`): Cards and interactive elements on hover. Subtle depth increase.
- **Overlay** (`box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4)`): Lightbox, modal overlays. Heavy enough to establish foreground.
- **Sidebar edge** (`box-shadow: -5px 0 30px rgba(0, 0, 0, 0.3)`): Mobile nav panel shadow.

### Named Rules
**The Flat-at-Rest Rule.** Surfaces are flat at rest. Shadows appear only as a response to user interaction (hover, focus, open state). Never decorative.

## 5. Components

### Buttons
Fluid and dynamic. Transitions are smooth ease-out curves (300ms), never bounce or spring.
- **Shape:** Rounded (10px)
- **Primary:** Ice Primary bg, Deep Current text, 12px 32px padding. On hover: Frost Primary bg, subtle translateY(-2px).
- **Ghost:** Transparent bg, Ice Primary text + 1px Ice Primary border. On hover: Ice Primary bg at 10% opacity.
- **Disabled:** Muted Shore text, no interaction feedback.

### Cards
Tonal elevation, not bordered boxes. Content-first.
- **Shape:** Rounded (16px)
- **Surface:** Midnight Surface bg, no border at rest. On hover: Slate Depth bg shift + hover-lift shadow.
- **Bordered variant:** 1px border at rgba(188, 224, 251, 0.1) for subtle containment where tonal shift alone is insufficient.
- **Never:** Nested cards. If content needs sub-grouping, use spacing and typography hierarchy.

### Inputs
Floating-label pattern with smooth transitions.
- **Shape:** Rounded (10px)
- **Rest:** Glass bg (rgba(11, 24, 41, 0.7)), 1px Ice Primary border at 20% opacity.
- **Focus:** Border brightens to Ice Primary at 60%, label floats up and scales down.
- **Error:** Signal-error border, error message below.

### Navigation (Sidebar)
Vertical icon rail, fixed left. Active state: icon scales 1.25x with drop-shadow glow + 3px Ice Primary bar on left edge. Social links at bottom.

### Navigation (Mobile)
Slide-in panel from right. Active link: Ice Primary text + left bar indicator + subtle bg tint.

## 6. Do's and Don'ts

### Do
- Use tonal layering (Deep Current → Midnight → Slate) for visual hierarchy
- Let whitespace and typography create structure before reaching for decorative elements
- Use Ice Primary as a deliberate accent — every instance should draw the eye intentionally
- Animate with ease-out-quart/expo curves at 300-500ms
- Use the decorative font (La Belle Aurore) only for the body-tag annotations

### Don't
- Use glassmorphism as a default surface treatment — rare and purposeful, or nothing
- Create identical card grids (same size, same structure, repeated endlessly)
- Apply gradient text (background-clip: text with gradients)
- Use side-stripe borders (thick colored border-left/right as accent)
- Animate layout properties (width, height, top, left) — use transform and opacity
- Add bounce or elastic easing to any animation
- Use pure black (#000) or pure white (#fff) anywhere
