# Design Tokens

## Colors (HSL)
- `--color-bg`: `hsl(240, 13%, 5%)` — near-black, not pure black
- `--color-surface-1`: `hsl(240, 10%, 9%)` — default card surface
- `--color-surface-2`: `hsl(240, 9%, 12%)` — elevated/featured surface
- `--color-border`: `hsl(240, 8%, 18%)` — subtle but visible
- `--color-text-primary`: `hsl(0, 0%, 94%)` — near-white
- `--color-text-secondary`: `hsl(240, 5%, 55%)` — muted gray
- `--color-text-muted`: `hsl(240, 5%, 38%)` — very muted
- `--color-accent`: `hsl(217, 91%, 64%)` — `#4f8ef7` electric blue
- `--color-accent-hover`: `hsl(217, 91%, 72%)` — lighter on hover
- `--color-error`: `hsl(0, 72%, 51%)`
- `--color-success`: `hsl(142, 71%, 45%)`

## Typography
- `--font-sans`: `'Inter', system-ui, sans-serif`
- `--font-mono`: `'JetBrains Mono', 'Fira Code', monospace`
- `--text-xs`: `0.75rem`
- `--text-sm`: `0.875rem`
- `--text-base`: `1rem`
- `--text-lg`: `1.125rem`
- `--text-xl`: `1.25rem`
- `--text-2xl`: `1.5rem`
- `--text-3xl`: `1.875rem`
- `--text-4xl`: `2.25rem`
- `--text-display`: `3.5rem`

## Spacing (base-8)
- `--space-xs`: `0.5rem`
- `--space-sm`: `1rem`
- `--space-md`: `1.5rem`
- `--space-lg`: `2rem`
- `--space-xl`: `3rem`
- `--space-2xl`: `4rem`
- `--space-3xl`: `6rem`

## Borders
- `--radius`: `4px` (near-sharp, minimal rounding only)
- `--radius-sm`: `2px`
- `--radius-none`: `0px`

## Shadows / Elevation
- `--shadow-card`: `inset 0 0 0 1px var(--color-border)`
- `--shadow-featured`: `inset 0 0 0 1px var(--color-border), -2px 0 0 0 var(--color-accent)` (left accent stripe on flagship)

## Transitions
- `--transition-fast`: `150ms ease`
- `--transition-base`: `200ms ease`

Max animation duration: 200ms. No decorative animations. Only functional micro-interactions.
