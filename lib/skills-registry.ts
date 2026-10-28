export interface AgentSkill {
  id: string
  name: string
  slug: string
  category: 'design' | 'metrics' | 'strategy' | 'motion' | 'all'
  author: string
  source: string
  installs: number
  description: string
  tags: string[]
  content: string
  command?: string // e.g. "/kpi-grid"
}

export const CURATED_SKILLS: AgentSkill[] = [
  {
    id: 'ui-ux-pro-max',
    name: 'UI/UX Pro Max (Executive Obsidian)',
    slug: 'ui-ux-pro-max',
    category: 'design',
    author: 'antigravity/design',
    source: 'antigravity/ui-ux-pro-max',
    installs: 52180,
    command: '/dark-mode',
    tags: ['design', 'obsidian', 'dark-mode', 'typography', 'borders'],
    description: 'Executive dark obsidian aesthetic (#08090a, #0e1013), crisp 1px borders with white/[0.08] glow, JetBrains Mono accents, and CSS subgrid alignment.',
    content: `## SKILL: UI/UX Pro Max (Executive Obsidian Design System)
CRITICAL ARCHITECTURAL DIRECTIVES:
1. Palette: Deep obsidian backgrounds (bg-[#08090a], surface bg-[#0e1013], elevated surface bg-[#12151a]). Never use flat grayish washed-out backgrounds.
2. Borders & Glow: Ultra-fine subtle borders (border border-white/10 hover:border-white/20). Accent borders use subtle purple/emerald glass tint (border-purple-500/25).
3. Typography Scale: Headlines use sharp tracking-tight Sans or elegant Serif accents. Numbers and telemetry labels MUST use monospace (font-mono, tracking-wider, uppercase, text-[10px] to text-[12px]).
4. Elevation & Glass: Subtle backdrop blur (backdrop-blur-md bg-white/[0.03]) with micro hover transitions (transition-all duration-200 hover:scale-[1.01]).
5. Mobile Responsiveness: Grid columns collapse cleanly into single-column cards on small viewports with responsive padding.`,
  },
  {
    id: 'executive-kpi-grid',
    name: 'Executive KPI & Telemetry Grid',
    slug: 'executive-kpi-grid',
    category: 'metrics',
    author: 'vercel-labs/analytics',
    source: 'vercel-labs/executive-kpi-grid',
    installs: 39420,
    command: '/kpi-grid',
    tags: ['metrics', 'telemetry', 'kpi', 'impact', 'numbers'],
    description: 'High-density metric proof cards with baseline vs achieved values, delta chips, live status pulse dots, and tabular numbers.',
    content: `## SKILL: Executive KPI & Telemetry Grid Pattern
CRITICAL ARCHITECTURAL DIRECTIVES:
1. Card Structure: 3-column responsive grid using CSS subgrid or flexbox cards.
2. Metrics Header: Include a subtle category eyebrow with a live radar pulse indicator (e.g. emerald pinging dot + "Verified Production Impact").
3. Numerical Presentation: Large, high-impact numbers using font-mono font-bold tracking-tight text-2xl or text-3xl with tabular-nums.
4. Delta & Proof Chips: Alongside each metric, render a high-contrast delta pill (e.g. "+45% Latency Lift", "$12M Volume Run-rate") with bg-emerald-500/10 text-emerald-400 border border-emerald-500/20.
5. Baseline Footnote: Monospace micro-caption explaining the baseline vs post-implementation reality.`,
  },
  {
    id: 'product-teardown',
    name: 'Strategic Product Teardown Architecture',
    slug: 'product-teardown',
    category: 'strategy',
    author: 'operator-collective/strategy',
    source: 'operator-collective/product-teardown',
    installs: 31200,
    command: '/teardown',
    tags: ['strategy', 'teardown', 'architecture', 'case-study'],
    description: 'Side-by-side comparison matrix showing observed company friction points versus candidate proposed architecture and right-to-win proof.',
    content: `## SKILL: Strategic Product Teardown Architecture
CRITICAL ARCHITECTURAL DIRECTIVES:
1. Side-by-Side Diagnostic: Render a 2-column comparative layout: "Observed Architectural Friction" vs "Engineered Right-to-Win Solution".
2. Executive Commentary: Use first-person operator commentary ("My diagnosis:", "Strategic Tradeoff:") highlighting domain depth.
3. Interactive Proof Elements: Include visual workflow pills, trade-off sliders, or step progression markers showing exact execution milestones.
4. Quantitative Outcome Target: Pin an executive target chip summarizing the projected business lift (e.g., CAC reduction, latency optimization, ARR expansion).`,
  },
  {
    id: 'case-study-deep-dive',
    name: 'High-Stakes Case Study Deep Dive',
    slug: 'case-study-deep-dive',
    category: 'strategy',
    author: 'grtr/executive-assets',
    source: 'grtr/case-study-deep-dive',
    installs: 27890,
    command: '/case-study',
    tags: ['case-study', 'storytelling', 'executive', 'proof'],
    description: 'Structured enterprise case study card with business context, high-stakes engineering challenge, decision tradeoff, and verified outcome.',
    content: `## SKILL: High-Stakes Case Study Deep Dive
CRITICAL ARCHITECTURAL DIRECTIVES:
1. Executive Heading: Contextual headline linking role impact to company growth.
2. 3-Part Modular Anatomy:
   - The Constraint: What broke or stalled before intervention.
   - The Operator Pivot: The non-consensus technical or architectural bet made.
   - The Verified Result: Quantified impact backed by telemetry.
3. Visual Tokens: Tag chips indicating tech stack, role ownership, and scale (e.g., "Scale: 10M DAU", "Stack: Go/Rust/Next.js").`,
  },
  {
    id: 'fintech-telemetry-widgets',
    name: 'FinTech & Payments Telemetry Radar',
    slug: 'fintech-telemetry-widgets',
    category: 'metrics',
    author: 'stripe-patterns/fintech',
    source: 'stripe-patterns/fintech-telemetry-widgets',
    installs: 22400,
    command: '/fintech-radar',
    tags: ['fintech', 'payments', 'radar', 'telemetry', 'charts'],
    description: 'Transaction volume curves, P99 gateway latency indicators, fraud mitigation delta gauges, and settlement uptime monitors.',
    content: `## SKILL: FinTech & Payments Telemetry Radar
CRITICAL ARCHITECTURAL DIRECTIVES:
1. Real-time Telemetry Aesthetic: Styled like an executive command center for payments.
2. Latency Tiers: Distinct visual metrics for P50, P90, and P99 latency percentiles with color-coded status pills.
3. Volume & Throughput: Render volume gauges with monetary currency symbols, formatted numbers, and authorization rate percentages (e.g., "99.98% Auth Rate").
4. Security & Compliance Badge: Subtle verification badge for PCI-DSS Level 1 / SOC2 Type II compliance standards.`,
  },
  {
    id: 'fluid-motion-physics',
    name: 'Fluid Micro-Interactions & Physics',
    slug: 'fluid-motion-physics',
    category: 'motion',
    author: 'motion-labs/physics',
    source: 'motion-labs/fluid-motion-physics',
    installs: 19800,
    command: '/motion-polish',
    tags: ['motion', 'animation', 'micro-interactions', 'hover', 'springs'],
    description: 'Subtle spring hover physics, glowing beam borders, smooth drawer transitions, and ambient gradient motion without layout jitter.',
    content: `## SKILL: Fluid Micro-Interactions & Physics
CRITICAL ARCHITECTURAL DIRECTIVES:
1. Zero Layout Shift: All hover transformations must use CSS transforms (scale, translate) and opacity; never modify margins or padding on hover.
2. Spring Timing: Use standard cubic-bezier curves: cubic-bezier(0.16, 1, 0.3, 1) for rapid responsiveness and elegant settlement.
3. Ambient Lighting: Radial gradient highlights that softly pulse or track the card boundary.
4. Accessible Motion: Wrap heavy animations with @media (prefers-reduced-motion: no-preference).`,
  },
  {
    id: 'shadcn-dark-components',
    name: 'Shadcn Executive Dark Components',
    slug: 'shadcn-dark-components',
    category: 'design',
    author: 'shadcn/community',
    source: 'shadcn/dark-components',
    installs: 45600,
    command: '/shadcn-ui',
    tags: ['shadcn', 'radix', 'tabs', 'dialog', 'accordion'],
    description: 'Clean Radix and Shadcn UI components customized for high-contrast dark mode with dark borders, frosted overlays, and keyboard focus rings.',
    content: `## SKILL: Shadcn Executive Dark Components
CRITICAL ARCHITECTURAL DIRECTIVES:
1. Surfaces: Accordions, tabs, and modals use deep charcoal-obsidian backgrounds (bg-[#0d0f12] to bg-[#12151a]).
2. Focus & State: Active tab states feature an accent indicator border and subtle glass background (bg-white/10).
3. Borders: 1px subtle separation (border-white/10).
4. Accessibility: Explicit ARIA roles, tabindex, and visible ring focus outlines (focus-visible:ring-1 focus-visible:ring-purple-500/50).`,
  },
  {
    id: 'mobile-executive-drawer',
    name: 'Mobile Executive Drawer & Polish',
    slug: 'mobile-executive-drawer',
    category: 'design',
    author: 'mobile-first/ux',
    source: 'mobile-first/mobile-executive-drawer',
    installs: 16750,
    command: '/mobile-drawer',
    tags: ['mobile', 'responsive', 'drawer', 'touch'],
    description: 'Seamless mobile slide-out drawer navigation, touch-friendly tap targets (minimum 44px), and responsive column stacking.',
    content: `## SKILL: Mobile Executive Drawer & Polish
CRITICAL ARCHITECTURAL DIRECTIVES:
1. Viewport Adaptation: Ensure responsive navigation collapses on mobile (<768px) into an accessible hamburger button with full-height blurred backdrop drawer.
2. Tap Targets: All buttons and interactive elements must satisfy minimum 44px touch-target heights on mobile.
3. Typography Scaling: Hero titles use clamp() or responsive text sizes (text-3xl sm:text-5xl lg:text-6xl) to prevent awkward word wrapping.
4. Overflow Containment: Strict w-full max-w-full and overflow-x-hidden on container bodies to eliminate horizontal scrolling on phones.`,
  },
]
