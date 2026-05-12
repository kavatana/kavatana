# Component Specs

- **AppHeader**: 
  - Layout: Flex row, space-between, sticky top.
  - States: Active link has `--color-accent` bottom border or underline.
  - Tokens: `--color-bg`, `--color-border`, `--color-text-primary`, `--space-md`.

- **AppFooter**:
  - Layout: Flex row (desktop), column (mobile), space-between.
  - Tokens: `--color-border`, `--color-text-secondary`, `--space-lg`.

- **AppNav** (Mobile Drawer):
  - Layout: Fixed, full height. Off-canvas to right.
  - States: Open (translated 0), Closed (translated 100%).
  - Tokens: `--color-surface-1`, `--color-border`, `--transition-base`.

- **BayonHub Flagship Card**:
  - Layout: Grid/Flex column.
  - States: Default (`--shadow-featured`), Hover (slight elevation/border glow).
  - Tokens: `--color-surface-1`, `--shadow-featured`, `--color-accent`, `--radius`.

- **Capability List**:
  - Layout: Grid (2 columns desktop, 1 column mobile).
  - Tokens: `--color-surface-1`, `--color-text-primary`, `--color-text-secondary`, `--space-md`, `--radius`.

- **Build Directions Block**:
  - Layout: Flex wrap tags.
  - Tokens: `--color-surface-2`, `--color-text-secondary`, `--space-xs`, `--radius-sm`.

- **Timeline**:
  - Layout: Vertical line with dot markers.
  - Tokens: `--color-border`, `--color-text-primary`, `--color-text-muted`, `--space-md`.

- **CTA Block**:
  - Layout: Centered column.
  - States: Button Hover (`--color-accent-hover`).
  - Tokens: `--color-accent`, `--color-bg`, `--text-lg`, `--space-xl`.

- **Contact Form**:
  - Layout: Flex column inputs.
  - States: Focus (`2px solid var(--color-accent)`), Hover (border lighter).
  - Tokens: `--color-surface-1`, `--color-border`, `--color-text-primary`, `--space-sm`, `--radius`.
