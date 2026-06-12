---
name: Cyber-Academic Lab
colors:
  surface: '#041329'
  surface-dim: '#041329'
  surface-bright: '#2c3951'
  surface-container-lowest: '#010e24'
  surface-container-low: '#0d1c32'
  surface-container: '#112036'
  surface-container-high: '#1c2a41'
  surface-container-highest: '#27354c'
  on-surface: '#d6e3ff'
  on-surface-variant: '#bac9cc'
  inverse-surface: '#d6e3ff'
  inverse-on-surface: '#233148'
  outline: '#849396'
  outline-variant: '#3b494c'
  surface-tint: '#00daf3'
  primary: '#c3f5ff'
  on-primary: '#00363d'
  primary-container: '#00e5ff'
  on-primary-container: '#00626e'
  inverse-primary: '#006875'
  secondary: '#b0c6ff'
  on-secondary: '#002d6e'
  secondary-container: '#0068ed'
  on-secondary-container: '#f2f3ff'
  tertiary: '#f1e9ff'
  on-tertiary: '#370096'
  tertiary-container: '#d6c9ff'
  on-tertiary-container: '#622be5'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9cf0ff'
  primary-fixed-dim: '#00daf3'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f58'
  secondary-fixed: '#d9e2ff'
  secondary-fixed-dim: '#b0c6ff'
  on-secondary-fixed: '#001945'
  on-secondary-fixed-variant: '#00429b'
  tertiary-fixed: '#e8deff'
  tertiary-fixed-dim: '#cdbdff'
  on-tertiary-fixed: '#20005f'
  on-tertiary-fixed-variant: '#4f00d0'
  background: '#041329'
  on-background: '#d6e3ff'
  surface-variant: '#27354c'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '450'
    lineHeight: 20px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  gutter: 16px
  card-gap: 20px
  section-margin: 48px
---

## Brand & Style

This design system is built for a next-generation educational environment that bridges the gap between theoretical computer science and industrial engineering. The aesthetic, termed "Cyber-Academic," balances the rigorous structure of a university laboratory with the high-tech energy of a modern IDE or control center.

The style leverages **Corporate Modern** foundations infused with **Glassmorphism** and **Futuristic** accents. It utilizes deep, immersive backgrounds to reduce eye strain during long coding sessions, while using high-vibrancy "energy" accents to denote active processes and logic flows. The visual narrative is one of "Intelligence in Motion"—where data is not just static text but a living circuit.

## Colors

The palette is rooted in a **Deep Navy** spectrum to create a high-contrast environment for code and data visualization. 

*   **Primary (Cyan):** Used for interactive elements, primary call-to-actions, and "active" circuit paths. It represents clarity and current flow.
*   **Secondary (Electric Blue):** Used for structural accents, secondary buttons, and steady-state indicators.
*   **Tertiary (Cyber Purple):** Reserved for advanced logic, AI-assisted features, or complex data nodes.
*   **Functional Glows:** Active states use a 0 0 12px neon glow (Cyan for active, Green for success, Red for syntax errors). 
*   **Neutrals:** A range of desaturated blues provide depth without losing the "technical" feel of the interface.

## Typography

The typographic hierarchy prioritizes technical precision. 
- **Headlines** use **Hanken Grotesk** for a sharp, contemporary "engineer" feel. 
- **Body Text** utilizes **Inter** to ensure maximum readability during dense instructional content. 
- **Data & Code** utilize **JetBrains Mono**, a monospaced font specifically designed for developers, ensuring that characters like '1', 'l', and 'I' are easily distinguishable.

All uppercase labels should have a subtle 0.05em letter spacing to evoke the feeling of a diagnostic read-out.

## Layout & Spacing

This design system uses a **Fluid Grid** model with a "Module-First" approach. The interface is divided into functional "Control Panels" (Modular Cards) that adapt to the viewport.

*   **Desktop:** 12-column grid with 24px margins. Content is organized into functional zones (Sidebar Navigation, Central Stage/IDE, Right-side Diagnostics).
*   **Tablet:** 8-column grid. Sidebars collapse into drawers to maximize the "Stage" area for visualization.
*   **Mobile:** 4-column grid. All panels stack vertically, with execution controls pinned to a bottom persistent bar.

Spacing follows an 8px base unit. Visual breathing room is essential to prevent the "Control Panel" aesthetic from becoming cluttered.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** and **Glassmorphism**, rather than traditional heavy shadows.

1.  **Level 0 (Floor):** Deepest Navy (#0A192F). The workspace foundation.
2.  **Level 1 (Panels):** Surface Navy (#112240). These are the modular cards. They feature a 1px border (#233554) to define their edges.
3.  **Level 2 (Active Overlays):** Semi-transparent Cyan tints (10% opacity) with a 10px Backdrop Blur. Used for tooltips or modal windows.
4.  **The Glow:** Active elements (like the current line of code being executed) emit a soft Cyan outer glow. This "Execution Path" animation uses a thin stroke that travels along the borders of active panels.

## Shapes

The shape language uses **Medium Roundedness** (0.5rem) to soften the technical edge, making the platform feel approachable for students. 

- **Cards/Panels:** 0.5rem (8px) corner radius.
- **Buttons/Inputs:** 0.5rem (8px) corner radius for a unified feel.
- **Circuit Terminals:** Small decorative circles (4px) at the ends of border lines to reinforce the "Engineering Control Panel" metaphor.
- **Execution Nodes:** Perfectly circular (pill) shapes are reserved for status badges and execution "play" buttons.

## Components

### Buttons
Primary buttons are solid Cyan with dark text. Secondary buttons are outlined with Cyan and have a "Glowing" hover state. All buttons use a 200ms transition for scale and shadow intensity.

### Modular Cards (Panels)
Inspired by control consoles, cards have a header area with a "Terminal Label" (e.g., `01_COMPILER_OUTPUT`) in monospaced font. Top-right corners of cards may feature a decorative "mounting screw" or "circuit terminal" icon.

### Input Fields
Inputs are dark-filled with a subtle bottom border. Upon focus, the border animates from the center outward in Cyan, and the field gains a very faint Cyan inner glow.

### Chips & Badges
Small, monospaced text inside a pill-shaped container with a low-opacity background tint matching the status color (e.g., soft red for "Syntax Error").

### Execution Paths
A unique component: thin lines (1px) that connect different UI panels. When code "runs," a pulse of light travels along these lines to show data moving from the IDE to the Visualization stage.

### Code Editor
Dark-themed with custom syntax highlighting using the brand palette: Cyan for keywords, Purple for functions, and White for variables. The active line is highlighted with a 15% Cyan tint background.