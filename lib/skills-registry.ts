export interface AgentSkill {
  id: string
  name: string
  slug: string
  category: 'design' | 'metrics' | 'strategy' | 'motion' | 'all'
  author: string
  source: string
  installs: number
  description: string
  headline?: string
  bullets?: string[]
  tags: string[]
  content: string
  command?: string
}

export const CURATED_SKILLS: AgentSkill[] = [
  {
    "id": "ui-ux-pro-max",
    "name": "UI/UX Pro Max (Executive Obsidian)",
    "slug": "ui-ux-pro-max",
    "category": "design",
    "author": "antigravity/design",
    "source": "antigravity/ui-ux-pro-max",
    "installs": 84200,
    "command": "/dark-mode",
    "tags": [
      "design",
      "obsidian",
      "dark-mode",
      "typography",
      "borders",
      "luxury"
    ],
    "description": "Executive dark obsidian aesthetic (#08090a, #0e1013), crisp 1px borders with white/[0.08] glow, JetBrains Mono accents, and CSS subgrid alignment.",
    "content": "## SKILL: UI/UX Pro Max (Executive Obsidian Design System)\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Palette: Deep obsidian backgrounds (bg-[#08090a], surface bg-[#0e1013], elevated surface bg-[#12151a]).\n2. Borders & Glow: Ultra-fine subtle borders (border border-white/10 hover:border-white/20) with subtle purple/emerald glass accents.\n3. Typography Scale: Headlines use sharp tracking-tight Sans or elegant Serif accents. Numbers and telemetry labels MUST use monospace (font-mono, tracking-wider, uppercase, text-[10px] to text-[12px]).\n4. Elevation & Glass: Subtle backdrop blur (backdrop-blur-md bg-white/[0.03]) with micro hover transitions.\n5. Mobile Responsiveness: Grid columns collapse cleanly into single-column cards on small viewports with responsive padding."
  },
  {
    "id": "bento-grid-layout",
    "name": "Bento Grid Layout System",
    "slug": "bento-grid-layout",
    "category": "design",
    "author": "apple-design/bento",
    "source": "apple-design/bento-grid-layout",
    "installs": 79150,
    "command": "/bento",
    "tags": [
      "design",
      "bento",
      "grid",
      "cards",
      "layout",
      "modular"
    ],
    "description": "Modern modular asymmetric bento grid with 1x1, 2x1, and 2x2 multi-span feature containers, rounded corners (16-24px), and internal padding.",
    "content": "## SKILL: Bento Grid Layout System\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Grid Architecture: CSS Grid with 12 columns (md:grid-cols-3 lg:grid-cols-4), utilizing col-span-2 and row-span-2 to create visual pacing and hierarchy.\n2. Card Enclosures: Rounded container cards (rounded-2xl) with consistent internal padding (p-6), overflow-hidden, and relative positioning.\n3. Visual Content Placement: Place micro-visuals, live sparklines, or interaction pills in the corners or background of each bento tile.\n4. Contrast: Neutral surface card backgrounds (bg-zinc-900/60 or bg-white/[0.04]) with 1px border separation (border-white/10)."
  },
  {
    "id": "swiss-minimalism",
    "name": "Swiss Style & International Typography",
    "slug": "swiss-minimalism",
    "category": "design",
    "author": "zurich-school/typography",
    "source": "zurich-school/swiss-minimalism",
    "installs": 61300,
    "command": "/swiss",
    "tags": [
      "design",
      "swiss",
      "minimalism",
      "grid",
      "typography",
      "clean"
    ],
    "description": "Rigorous Swiss grid architecture, asymmetric layouts, bold sans-serif type scales, generous negative space, and mathematical alignment.",
    "content": "## SKILL: Swiss Style & International Typography\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Grid Rigor: Strict 12-column baseline grid with visible structural tension and uncompromised alignment.\n2. Typography Hierarchy: Large grotesque sans-serif headlines (Inter, Helvetica, Geist) with tight letter-spacing (-0.04em) paired with high-contrast body copy.\n3. Monochromatic Discipline: Heavy black and stark white contrast (#000 and #fff) with at most ONE vivid primary accent (e.g., Swiss Red #ef4444 or Electric Blue).\n4. Zero Clutter: Strictly avoid unnecessary decorative shadows, fuzzy glows, or rounded pills. Keep sharp, architectural rectangular boundaries."
  },
  {
    "id": "glassmorphism-frosted",
    "name": "Frosted Glassmorphism & Depth",
    "slug": "glassmorphism-frosted",
    "category": "design",
    "author": "ui-labs/glass",
    "source": "ui-labs/glassmorphism-frosted",
    "installs": 58900,
    "command": "/glass",
    "tags": [
      "design",
      "glass",
      "glassmorphism",
      "blur",
      "frosted",
      "translucent"
    ],
    "description": "Layered translucent glass surfaces with backdrop-blur (12-24px), multi-layer specular borders, and chromatic light reflections.",
    "content": "## SKILL: Frosted Glassmorphism & Depth\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Glass Materials: Use translucent backgrounds (bg-white/[0.04] to bg-white/[0.08]) with backdrop-blur-xl (16-24px).\n2. Specular Highlights: Top-to-bottom subtle gradient border (border-white/20 on top, border-white/5 on bottom) simulating light reflection.\n3. Ambient Depth: Multi-stop radial gradients beneath the glass cards (radial-gradient at 80% 20%, rgba(139,92,246,0.15), transparent 70%).\n4. Text Readability: Text must retain high contrast (text-white and text-zinc-300) without becoming washed out by the background blur."
  },
  {
    "id": "neo-brutalism",
    "name": "Neo-Brutalism & Hard Shadows",
    "slug": "neo-brutalism",
    "category": "design",
    "author": "gumroad-style/brutal",
    "source": "gumroad-style/neo-brutalism",
    "installs": 47800,
    "command": "/brutalist",
    "tags": [
      "design",
      "brutalism",
      "neo-brutalist",
      "shadows",
      "bold",
      "borders"
    ],
    "description": "Thick solid borders (2-3px black), hard offset drop shadows (4px 4px 0px #000), vibrant color blocks, and unapologetic personality.",
    "content": "## SKILL: Neo-Brutalism & Hard Shadows\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Solid Outlines: High-contrast 2px or 3px solid black borders (border-2 border-black dark:border-white).\n2. Hard Box Shadows: Offset solid shadows with ZERO blur radius (shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]).\n3. Interactive Press Effect: On active/hover, translate element by 2px (translate-x-[2px] translate-y-[2px]) and reduce shadow size to simulate a physical mechanical button.\n4. Bold Geometry: Sharp corners or minimal rounding (rounded-none to rounded-md)."
  },
  {
    "id": "editorial-luxury-serif",
    "name": "Editorial Luxury & Serif Magazine",
    "slug": "editorial-luxury-serif",
    "category": "design",
    "author": "conde-nast/editorial",
    "source": "conde-nast/editorial-luxury-serif",
    "installs": 54100,
    "command": "/editorial",
    "tags": [
      "design",
      "editorial",
      "serif",
      "luxury",
      "magazine",
      "pacing"
    ],
    "description": "High-end editorial layout with bespoke serif headlines, italicized emphasis, wide reading gutters, and warm cream-walnut luxury tones.",
    "content": "## SKILL: Editorial Luxury & Serif Magazine\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Typography Pairing: Display headlines in elegant high-contrast Serif (Instrument Serif, Playfair, Garamond) paired with clean geometric Sans body text.\n2. Editorial Accents: Use italicized serif sub-phrases for emotional emphasis (e.g., \"The *right-to-win* thesis\").\n3. Color Palette: Warm deep tones (charcoal #111110, warm cream #fafaf8, walnut accents #2b2622, brass #c5a059).\n4. Generous Margins: Max-width 720px for text columns with generous vertical rhythm and bespoke decorative quote rules."
  },
  {
    "id": "linear-dark-precision",
    "name": "Linear Precision & Dark Engineering",
    "slug": "linear-dark-precision",
    "category": "design",
    "author": "karri-saarinen/linear-style",
    "source": "karri-saarinen/linear-dark-precision",
    "installs": 76400,
    "command": "/linear",
    "tags": [
      "design",
      "linear",
      "precision",
      "developer",
      "dark",
      "monochrome"
    ],
    "description": "Ultra-refined dark developer aesthetic inspired by Linear, featuring subtle hair-line borders, micro-badges, keyboard shortcuts, and slate tones.",
    "content": "## SKILL: Linear Precision & Dark Engineering\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Base Tone: Slate-charcoal palette (#08090a, #0d0f12, #14161b, #1e2029) avoiding pure jet black.\n2. Precision Details: 1px hairline borders with white/[0.07] opacity, glowing beam on selection, and 8px border radiuses.\n3. Micro-Badges & Tags: Keyboard shortcut chips (kbd className=\"px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.06] border border-white/10 rounded\") and status pills.\n4. Density: Compact, high-information density with meticulous vertical rhythm (gap-3, py-2.5)."
  },
  {
    "id": "monochrome-high-contrast",
    "name": "Stark Monochrome & Pure Contrast",
    "slug": "monochrome-high-contrast",
    "category": "design",
    "author": "le-corbusier/minimal",
    "source": "le-corbusier/monochrome-high-contrast",
    "installs": 41200,
    "command": "/monochrome",
    "tags": [
      "design",
      "monochrome",
      "black-and-white",
      "high-contrast",
      "minimal"
    ],
    "description": "Pure black-and-white visual architecture with zero color distraction, relying solely on typography weight, negative space, and scale.",
    "content": "## SKILL: Stark Monochrome & Pure Contrast\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Color Elimination: 100% monochromatic (#000000, #111111, #ffffff). Absolutely zero colored accents or pastel hues.\n2. Scale-Based Hierarchy: Contrast is achieved through scale (text-5xl vs text-xs) and font weights (font-bold vs font-light).\n3. Structural Dividers: Razor-thin 1px solid dividers (border-zinc-800 dark:border-zinc-200).\n4. Imagery: All avatars or portfolio thumbnails rendered in grayscale (filter grayscale contrast-125)."
  },
  {
    "id": "aurora-mesh-gradient",
    "name": "Aurora & Dynamic Mesh Gradients",
    "slug": "aurora-mesh-gradient",
    "category": "design",
    "author": "stripe-design/aurora",
    "source": "stripe-design/aurora-mesh-gradient",
    "installs": 51200,
    "command": "/aurora",
    "tags": [
      "design",
      "aurora",
      "mesh",
      "gradient",
      "vibrant",
      "glow"
    ],
    "description": "Soft animated multi-color aurora mesh backgrounds using blending modes, deep indigo, violet, and cyan glows beneath translucent cards.",
    "content": "## SKILL: Aurora & Dynamic Mesh Gradients\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Ambient Layering: Multi-point radial gradients with mix-blend-mode (overlay / screen) and opacity: 0.15 to 0.35.\n2. Color Harmony: Violet (#7c3aed), Indigo (#4f46e5), and Emerald/Cyan (#06b6d4) creating soft ambient twilight.\n3. Contrast Safety: Foreground card text MUST maintain 4.5:1 contrast against ambient glow using dark frosted card containers.\n4. Motion: Slow continuous ambient pulse or rotation (duration-10000 animate-pulse)."
  },
  {
    "id": "shadcn-dark-components",
    "name": "Shadcn Executive Dark Components",
    "slug": "shadcn-dark-components",
    "category": "design",
    "author": "shadcn/community",
    "source": "shadcn/dark-components",
    "installs": 68400,
    "command": "/shadcn-ui",
    "tags": [
      "design",
      "shadcn",
      "radix",
      "tabs",
      "dialog",
      "accordion",
      "components"
    ],
    "description": "Clean Radix and Shadcn UI components customized for high-contrast dark mode with dark borders, frosted overlays, and keyboard focus rings.",
    "content": "## SKILL: Shadcn Executive Dark Components\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Surfaces: Accordions, tabs, and modals use deep charcoal-obsidian backgrounds (bg-[#0d0f12] to bg-[#12151a]).\n2. Focus & State: Active tab states feature an accent indicator border and subtle glass background (bg-white/10).\n3. Borders: 1px subtle separation (border-white/10).\n4. Accessibility: Explicit ARIA roles, tabindex, and visible ring focus outlines."
  },
  {
    "id": "cyberpunk-high-tech",
    "name": "Cyberpunk & Terminal HUD",
    "slug": "cyberpunk-high-tech",
    "category": "design",
    "author": "deckers/hud",
    "source": "deckers/cyberpunk-high-tech",
    "installs": 38900,
    "command": "/cyberpunk",
    "tags": [
      "design",
      "cyberpunk",
      "terminal",
      "hud",
      "neon",
      "high-tech"
    ],
    "description": "Sci-fi command interface with neon cyan and amber accents, scanline overlays, monospace coordinates, and tactical telemetry badges.",
    "content": "## SKILL: Cyberpunk & Terminal HUD\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Accent Colors: Electric Neon Cyan (#06b6d4) and Tactical Amber (#f59e0b) set against dark void background (#05070a).\n2. Grid Accents: Corner bracket cutouts and crosshair telemetry markings on container borders.\n3. Monospace Dominance: JetBrains Mono or Fira Code throughout metadata, timestamps, and section indexes.\n4. Scanline Atmosphere: Subtle CSS gradient scanline effect with 2% opacity."
  },
  {
    "id": "retro-mac-vintage",
    "name": "System 7 & Vintage Desktop",
    "slug": "retro-mac-vintage",
    "category": "design",
    "author": "cupertino-1984/vintage",
    "source": "cupertino-1984/retro-mac-vintage",
    "installs": 26500,
    "command": "/retro-mac",
    "tags": [
      "design",
      "retro",
      "mac",
      "vintage",
      "nostalgia",
      "window"
    ],
    "description": "Nostalgic desktop operating system aesthetic with window title bars, close/minimize buttons, Chicago-style bitmap type, and beveled panels.",
    "content": "## SKILL: System 7 & Vintage Desktop\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Window Architecture: Every major section encapsulated as an interactive desktop window with title bar, close box, and drag lines.\n2. Palette: Classic beige (#d8d5cb, #ece8df) or retro dark terminal phosphor green.\n3. Typography: Pixelated bitmap style or monospaced system font with crisp pixel-grid borders.\n4. Tactile Controls: Inset and outset 1px bevel borders simulating early GUI affordances."
  },
  {
    "id": "minimal-dossier-blueprint",
    "name": "Technical Dossier & Operator Dossier",
    "slug": "minimal-dossier-blueprint",
    "category": "design",
    "author": "operator-collective/dossier",
    "source": "operator-collective/minimal-dossier-blueprint",
    "installs": 44200,
    "command": "/dossier",
    "tags": [
      "design",
      "dossier",
      "technical",
      "blueprint",
      "operator",
      "executive"
    ],
    "description": "High-density confidential operator dossier format with classification badges, index coordinates, security stamps, and audit typography.",
    "content": "## SKILL: Technical Dossier & Operator Dossier\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Classification Badges: Monospace header bar: \"CLASSIFICATION: EXECUTIVE CANDIDATE DOSSIER // EYES ONLY\".\n2. Metadata Strip: Candidate UID, revision hash, verification status, and clearance tier displayed in a crisp header grid.\n3. Architectural Grid Lines: Fine 1px blueprint grid background (opacity: 0.08) with coordinates (e.g. SEC-01 // THESIS).\n4. Tone: Rigorous, analytical, zero-nonsense executive posture."
  },
  {
    "id": "claymorphism-soft-3d",
    "name": "Claymorphism & Soft 3D Surfaces",
    "slug": "claymorphism-soft-3d",
    "category": "design",
    "author": "soft-ui/clay",
    "source": "soft-ui/claymorphism-soft-3d",
    "installs": 32100,
    "command": "/clay",
    "tags": [
      "design",
      "clay",
      "3d",
      "soft",
      "playful",
      "rounded"
    ],
    "description": "Friendly tactile clay surfaces with dual inner shadows, deep rounded corners (20-32px), and pillowy inflated container depth.",
    "content": "## SKILL: Claymorphism & Soft 3D Surfaces\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Dual Inner Shadows: Inner white highlight on top-left (inset 2px 2px 4px rgba(255,255,255,0.2)) and inner dark shadow on bottom-right (inset -2px -2px 6px rgba(0,0,0,0.4)).\n2. Generous Radii: High border-radius (rounded-3xl) with smooth curvature.\n3. Tactile Feedback: Soft bounce transform on hover (hover:-translate-y-1 hover:shadow-2xl).\n4. Accessibility: Ensure text within clay cards maintains strict WCAG AA contrast against card background."
  },
  {
    "id": "spatial-vision-ui",
    "name": "Spatial Vision & Floating Glass",
    "slug": "spatial-vision-ui",
    "category": "design",
    "author": "vision-design/spatial",
    "source": "vision-design/spatial-vision-ui",
    "installs": 41800,
    "command": "/spatial",
    "tags": [
      "design",
      "spatial",
      "vision",
      "3d",
      "floating",
      "glass"
    ],
    "description": "Spatial computing aesthetic inspired by visionOS, featuring thick specular glass slabs, floating depth planes, and eye-level ergonomics.",
    "content": "## SKILL: Spatial Vision & Floating Glass\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Material Thickness: Heavy background blur (backdrop-blur-2xl) with high-specular 1.5px gradient borders.\n2. Elevation Hierarchy: Tier-1 cards float above Tier-2 layers using z-index and deep ambient shadow plumes.\n3. Ergonomic Curves: Generous 28px continuous curvature corners.\n4. Glint Hover: Specular highlight that shifts dynamically across the border on pointer hover."
  },
  {
    "id": "product-teardown",
    "name": "Strategic Product Teardown Matrix",
    "slug": "product-teardown",
    "category": "strategy",
    "author": "operator-collective/strategy",
    "source": "operator-collective/product-teardown",
    "installs": 73400,
    "command": "/teardown",
    "tags": [
      "strategy",
      "teardown",
      "architecture",
      "case-study",
      "comparison"
    ],
    "description": "Side-by-side comparison matrix showing observed company friction points versus candidate proposed architecture and right-to-win proof.",
    "content": "## SKILL: Strategic Product Teardown Architecture\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Side-by-Side Diagnostic: Render a 2-column comparative layout: \"Observed Architectural Friction\" vs \"Engineered Right-to-Win Solution\".\n2. Executive Commentary: Use first-person operator commentary (\"My diagnosis:\", \"Strategic Tradeoff:\") highlighting domain depth.\n3. Interactive Proof Elements: Include visual workflow pills, trade-off sliders, or step progression markers showing exact execution milestones.\n4. Quantitative Outcome Target: Pin an executive target chip summarizing the projected business lift."
  },
  {
    "id": "case-study-deep-dive",
    "name": "High-Stakes Case Study Deep Dive",
    "slug": "case-study-deep-dive",
    "category": "strategy",
    "author": "grtr/executive-assets",
    "source": "grtr/case-study-deep-dive",
    "installs": 62900,
    "command": "/case-study",
    "tags": [
      "strategy",
      "case-study",
      "storytelling",
      "executive",
      "proof"
    ],
    "description": "Structured enterprise case study card with business context, high-stakes engineering challenge, decision tradeoff, and verified outcome.",
    "content": "## SKILL: High-Stakes Case Study Deep Dive\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Executive Heading: Contextual headline linking role impact to company growth.\n2. 3-Part Modular Anatomy:\n   - The Constraint: What broke or stalled before intervention.\n   - The Operator Pivot: The non-consensus technical or architectural bet made.\n   - The Verified Result: Quantified impact backed by telemetry.\n3. Visual Tokens: Tag chips indicating tech stack, role ownership, and scale (e.g., \"Scale: 10M DAU\", \"Stack: Go/Rust/Next.js\")."
  },
  {
    "id": "first-90-days-roadmap",
    "name": "First 90 Days Executive Roadmap",
    "slug": "first-90-days-roadmap",
    "category": "strategy",
    "author": "operator-collective/playbooks",
    "source": "operator-collective/first-90-days-roadmap",
    "installs": 51800,
    "command": "/roadmap",
    "tags": [
      "strategy",
      "roadmap",
      "90-days",
      "plan",
      "milestones",
      "execution"
    ],
    "description": "Tactical 30-60-90 day milestone progression layout with sprint phases, risk mitigation checkpoints, and quick-win deliverables.",
    "content": "## SKILL: First 90 Days Executive Roadmap\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Phase Columns: 3 distinct columns: \"Days 1-30: Diagnostic & Alignment\", \"Days 31-60: High-Leverage Sprints\", \"Days 61-90: Scale & Flywheel\".\n2. Milestone Anatomy: Each phase contains: Target Objective, Key Deliverable, Risk Factor, and Measurable Metric.\n3. Visual Progression: Connecting horizontal pipeline lines with phase completion indicators.\n4. Executive Realism: Emphasize ruthless prioritization over unrealistic kitchen-sink promises."
  },
  {
    "id": "right-to-win-matrix",
    "name": "Right-to-Win Competitive Moat Matrix",
    "slug": "right-to-win-matrix",
    "category": "strategy",
    "author": "venture-talent/moat",
    "source": "venture-talent/right-to-win-matrix",
    "installs": 39500,
    "command": "/right-to-win",
    "tags": [
      "strategy",
      "moat",
      "competitive",
      "advantages",
      "differentiation"
    ],
    "description": "Defensible skill matrix mapping candidate proprietary advantages directly against the company’s most urgent existential challenges.",
    "content": "## SKILL: Right-to-Win Competitive Moat Matrix\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Challenge vs Capability Mapping: Direct table mapping: \"Target Company Vulnerability\" -> \"Candidate Proven Capability\" -> \"Historical Evidence\".\n2. Unfair Advantage Badges: Monospace chips highlighting unique domain secrets, patent work, or scale benchmarks.\n3. Competitor Benchmarking: Show how this operator perspective outpaces legacy industry approaches.\n4. Clean Grid Tokens: Subtle 1px grid with hover highlights on matching capability rows."
  },
  {
    "id": "executive-quote-carousel",
    "name": "Executive Endorsement & Social Proof Wall",
    "slug": "executive-quote-carousel",
    "category": "strategy",
    "author": "proof-patterns/testimonials",
    "source": "proof-patterns/executive-quote-carousel",
    "installs": 43200,
    "command": "/endorsements",
    "tags": [
      "strategy",
      "testimonials",
      "quotes",
      "social-proof",
      "reputation"
    ],
    "description": "Curated recommendation quotes from former C-suite peers, engineering directors, and board members with verified company badges.",
    "content": "## SKILL: Executive Endorsement & Social Proof Wall\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Verified Source Attribution: High-contrast author row with full name, executive title, company logo or monogram chip, and LinkedIn verification link.\n2. Pull-Quote Emphasis: Pull quotes set in serif italics or high-contrast font with oversized quotation marks (opacity 0.2).\n3. Context Chips: Monospace chips denoting project scope (e.g., \"Led $40M Series B GTM\", \"Managed 45-engineer org\").\n4. Responsive Masonry or Carousel: Mobile-friendly card snapping with clean keyboard navigation."
  },
  {
    "id": "executive-kpi-grid",
    "name": "Executive KPI & Telemetry Grid",
    "slug": "executive-kpi-grid",
    "category": "metrics",
    "author": "vercel-labs/analytics",
    "source": "vercel-labs/executive-kpi-grid",
    "installs": 78900,
    "command": "/kpi-grid",
    "tags": [
      "metrics",
      "telemetry",
      "kpi",
      "impact",
      "numbers",
      "proof"
    ],
    "description": "High-density metric proof cards with baseline vs achieved values, delta chips, live status pulse dots, and tabular numbers.",
    "content": "## SKILL: Executive KPI & Telemetry Grid Pattern\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Card Structure: 3-column responsive grid using CSS subgrid or flexbox cards.\n2. Metrics Header: Include a subtle category eyebrow with a live radar pulse indicator (e.g. emerald pinging dot + \"Verified Production Impact\").\n3. Numerical Presentation: Large, high-impact numbers using font-mono font-bold tracking-tight text-2xl or text-3xl with tabular-nums.\n4. Delta & Proof Chips: Alongside each metric, render a high-contrast delta pill (e.g. \"+45% Latency Lift\", \"$12M Volume Run-rate\") with bg-emerald-500/10 text-emerald-400 border border-emerald-500/20.\n5. Baseline Footnote: Monospace micro-caption explaining the baseline vs post-implementation reality."
  },
  {
    "id": "fintech-telemetry-widgets",
    "name": "FinTech & Payments Telemetry Radar",
    "slug": "fintech-telemetry-widgets",
    "category": "metrics",
    "author": "stripe-patterns/fintech",
    "source": "stripe-patterns/fintech-telemetry-widgets",
    "installs": 51200,
    "command": "/fintech-radar",
    "tags": [
      "metrics",
      "fintech",
      "payments",
      "radar",
      "telemetry",
      "charts"
    ],
    "description": "Transaction volume curves, P99 gateway latency indicators, fraud mitigation delta gauges, and settlement uptime monitors.",
    "content": "## SKILL: FinTech & Payments Telemetry Radar\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Real-time Telemetry Aesthetic: Styled like an executive command center for payments.\n2. Latency Tiers: Distinct visual metrics for P50, P90, and P99 latency percentiles with color-coded status pills.\n3. Volume & Throughput: Render volume gauges with monetary currency symbols, formatted numbers, and authorization rate percentages.\n4. Security & Compliance Badge: Subtle verification badge for PCI-DSS Level 1 / SOC2 Type II compliance standards."
  },
  {
    "id": "recharts-growth-curves",
    "name": "Interactive Growth & ARR Curves",
    "slug": "recharts-growth-curves",
    "category": "metrics",
    "author": "data-viz/growth-charts",
    "source": "data-viz/recharts-growth-curves",
    "installs": 48900,
    "command": "/growth-chart",
    "tags": [
      "metrics",
      "charts",
      "recharts",
      "arr",
      "growth",
      "graph"
    ],
    "description": "Interactive SVG area chart showing MoM pipeline acceleration, cohort retention curves, and revenue inflection milestones.",
    "content": "## SKILL: Interactive Growth & ARR Curves\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Chart Container: Clean responsive container using Recharts or native SVG path with smooth cubic Bezier curves.\n2. Gradient Fill: Soft gradient fill below the curve fading to transparent at the base.\n3. Milestone Pins: Interactive pins marking key interventions (e.g. \"Q2: GTM Pivot\", \"Q4: Enterprise Tier Launch\").\n4. Monospace Tooltips: Frosted glass tooltip displaying exact date, volume, and percentage lift on hover."
  },
  {
    "id": "ai-latency-eval-meter",
    "name": "AI Model Inference & Eval Benchmark",
    "slug": "ai-latency-eval-meter",
    "category": "metrics",
    "author": "inference-labs/evals",
    "source": "inference-labs/ai-latency-eval-meter",
    "installs": 42600,
    "command": "/ai-evals",
    "tags": [
      "metrics",
      "ai",
      "evals",
      "tokens",
      "benchmarks",
      "latency"
    ],
    "description": "Model eval comparison bars showing Tokens/Sec, Time-To-First-Token (TTFT), hallucination reduction rate, and cost-per-million tokens.",
    "content": "## SKILL: AI Model Inference & Eval Benchmark\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Multi-Bar Comparisons: Horizontal comparison bars showing Baseline Model vs Optimized Fine-Tuned Agent.\n2. Telemetry Tokens: Metrics for TTFT (ms), Tokens/Sec throughput, and VRAM efficiency.\n3. Accuracy Badges: MMLU or domain benchmark score chips with verified green badges.\n4. Cost Optimization: Dollar savings delta pill (e.g. \"-78% Inference Cost Reduction\")."
  },
  {
    "id": "fluid-motion-physics",
    "name": "Fluid Micro-Interactions & Physics",
    "slug": "fluid-motion-physics",
    "category": "motion",
    "author": "motion-labs/physics",
    "source": "motion-labs/fluid-motion-physics",
    "installs": 67100,
    "command": "/motion-polish",
    "tags": [
      "motion",
      "animation",
      "micro-interactions",
      "hover",
      "springs"
    ],
    "description": "Subtle spring hover physics, glowing beam borders, smooth drawer transitions, and ambient gradient motion without layout jitter.",
    "content": "## SKILL: Fluid Micro-Interactions & Physics\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Zero Layout Shift: All hover transformations must use CSS transforms (scale, translate) and opacity; never modify margins or padding on hover.\n2. Spring Timing: Use standard cubic-bezier curves: cubic-bezier(0.16, 1, 0.3, 1) for rapid responsiveness and elegant settlement.\n3. Ambient Lighting: Radial gradient highlights that softly pulse or track the card boundary.\n4. Accessible Motion: Wrap heavy animations with @media (prefers-reduced-motion: no-preference)."
  },
  {
    "id": "magnetic-cursor-follow",
    "name": "Magnetic Cursor & Spotlight Glow",
    "slug": "magnetic-cursor-follow",
    "category": "motion",
    "author": "framer-motion/spotlight",
    "source": "framer-motion/magnetic-cursor-follow",
    "installs": 44300,
    "command": "/spotlight",
    "tags": [
      "motion",
      "spotlight",
      "magnetic",
      "cursor",
      "glow",
      "interactive"
    ],
    "description": "Card border spotlight that dynamically illuminates borders as the mouse moves across the container, creating tactile luxury depth.",
    "content": "## SKILL: Magnetic Cursor & Spotlight Glow\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Mouse Coordinate Tracking: On pointer move, calculate relative card X and Y coordinates.\n2. Spotlight Mask: Render an overlay using radial-gradient(350px circle at Xpx Ypx, rgba(168,85,247,0.15), transparent 80%).\n3. Border Illumination: Spotlight reveals an elevated 1px white border beneath the mask.\n4. Mobile Fallback: Disable pointer tracking on touch devices, falling back to static subtle gradient."
  },
  {
    "id": "mobile-executive-drawer",
    "name": "Mobile Executive Drawer & Polish",
    "slug": "mobile-executive-drawer",
    "category": "design",
    "author": "mobile-first/ux",
    "source": "mobile-first/mobile-executive-drawer",
    "installs": 53400,
    "command": "/mobile-drawer",
    "tags": [
      "design",
      "mobile",
      "responsive",
      "drawer",
      "touch"
    ],
    "description": "Seamless mobile slide-out drawer navigation, touch-friendly tap targets (minimum 44px), and responsive column stacking.",
    "content": "## SKILL: Mobile Executive Drawer & Polish\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Viewport Adaptation: Ensure responsive navigation collapses on mobile (<768px) into an accessible hamburger button with full-height blurred backdrop drawer.\n2. Tap Targets: All buttons and interactive elements must satisfy minimum 44px touch-target heights on mobile.\n3. Typography Scaling: Hero titles use clamp() or responsive text sizes to prevent awkward word wrapping.\n4. Overflow Containment: Strict w-full max-w-full and overflow-x-hidden on container bodies to eliminate horizontal scrolling on phones."
  },
  {
    "id": "minimal-scandinavian",
    "name": "Scandinavian Light & Wood",
    "slug": "minimal-scandinavian",
    "category": "design",
    "author": "design-systems/minimal",
    "source": "skills.sh/packs/minimal-scandinavian",
    "installs": 43803,
    "command": "/minimal-scandinavian",
    "tags": [
      "design",
      "minimal",
      "scandinavian"
    ],
    "description": "Clean warm wood and stone tones, high natural illumination, and calm Nordic simplicity.",
    "content": "## SKILL: Scandinavian Light & Wood\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Scandinavian Light & Wood patterns across this section of the portfolio.\n2. Styling Guidelines: Clean warm wood and stone tones, high natural illumination, and calm Nordic simplicity.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "japanese-zen",
    "name": "Japanese Ma (Negative Space)",
    "slug": "japanese-zen",
    "category": "design",
    "author": "design-systems/japanese",
    "source": "skills.sh/packs/japanese-zen",
    "installs": 37422,
    "command": "/japanese-zen",
    "tags": [
      "design",
      "japanese",
      "zen"
    ],
    "description": "Deliberate asymmetric emptiness, subtle ink-wash boundaries, and tranquil horizontal pacing.",
    "content": "## SKILL: Japanese Ma (Negative Space)\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Japanese Ma (Negative Space) patterns across this section of the portfolio.\n2. Styling Guidelines: Deliberate asymmetric emptiness, subtle ink-wash boundaries, and tranquil horizontal pacing.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "bauhaus-functional",
    "name": "Bauhaus Primary Geometry",
    "slug": "bauhaus-functional",
    "category": "design",
    "author": "design-systems/bauhaus",
    "source": "skills.sh/packs/bauhaus-functional",
    "installs": 38284,
    "command": "/bauhaus-functional",
    "tags": [
      "design",
      "bauhaus",
      "functional"
    ],
    "description": "Strict primary geometric forms (circle, square, triangle), industrial functionalism, and bold sans-serifs.",
    "content": "## SKILL: Bauhaus Primary Geometry\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Bauhaus Primary Geometry patterns across this section of the portfolio.\n2. Styling Guidelines: Strict primary geometric forms (circle, square, triangle), industrial functionalism, and bold sans-serifs.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "dark-velvet-grain",
    "name": "Dark Velvet & Film Grain",
    "slug": "dark-velvet-grain",
    "category": "design",
    "author": "design-systems/dark",
    "source": "skills.sh/packs/dark-velvet-grain",
    "installs": 51376,
    "command": "/dark-velvet",
    "tags": [
      "design",
      "dark",
      "velvet",
      "grain"
    ],
    "description": "Textured film grain noise overlay, warm charcoal velvet surfaces, and analog warmth.",
    "content": "## SKILL: Dark Velvet & Film Grain\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Dark Velvet & Film Grain patterns across this section of the portfolio.\n2. Styling Guidelines: Textured film grain noise overlay, warm charcoal velvet surfaces, and analog warmth.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "technical-grid-wire",
    "name": "Wireframe Architectural Grid",
    "slug": "technical-grid-wire",
    "category": "design",
    "author": "design-systems/technical",
    "source": "skills.sh/packs/technical-grid-wire",
    "installs": 60125,
    "command": "/technical-grid",
    "tags": [
      "design",
      "technical",
      "grid",
      "wire"
    ],
    "description": "Exposed structural coordinate markers, dashed alignment lines, and CAD blueprint precision.",
    "content": "## SKILL: Wireframe Architectural Grid\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Wireframe Architectural Grid patterns across this section of the portfolio.\n2. Styling Guidelines: Exposed structural coordinate markers, dashed alignment lines, and CAD blueprint precision.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "monochrome-editorial",
    "name": "High-Fashion Monochromatic",
    "slug": "monochrome-editorial",
    "category": "design",
    "author": "design-systems/monochrome",
    "source": "skills.sh/packs/monochrome-editorial",
    "installs": 69663,
    "command": "/monochrome-editorial",
    "tags": [
      "design",
      "monochrome",
      "editorial"
    ],
    "description": "Editorial luxury inspired by fashion monographs with stark serif titles and editorial margins.",
    "content": "## SKILL: High-Fashion Monochromatic\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply High-Fashion Monochromatic patterns across this section of the portfolio.\n2. Styling Guidelines: Editorial luxury inspired by fashion monographs with stark serif titles and editorial margins.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "brutalist-poster",
    "name": "Swiss Poster Graphic Impact",
    "slug": "brutalist-poster",
    "category": "design",
    "author": "design-systems/brutalist",
    "source": "skills.sh/packs/brutalist-poster",
    "installs": 62964,
    "command": "/brutalist-poster",
    "tags": [
      "design",
      "brutalist",
      "poster"
    ],
    "description": "Oversized display typography spanning viewport widths with stark black-and-white contrast.",
    "content": "## SKILL: Swiss Poster Graphic Impact\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Swiss Poster Graphic Impact patterns across this section of the portfolio.\n2. Styling Guidelines: Oversized display typography spanning viewport widths with stark black-and-white contrast.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "gradient-glass-mesh",
    "name": "Prismatic Glass & Rainbow Glow",
    "slug": "gradient-glass-mesh",
    "category": "design",
    "author": "design-systems/gradient",
    "source": "skills.sh/packs/gradient-glass-mesh",
    "installs": 72853,
    "command": "/gradient-glass",
    "tags": [
      "design",
      "gradient",
      "glass",
      "mesh"
    ],
    "description": "Subtle chromatic dispersion along glass edges with pastel refraction highlights.",
    "content": "## SKILL: Prismatic Glass & Rainbow Glow\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Prismatic Glass & Rainbow Glow patterns across this section of the portfolio.\n2. Styling Guidelines: Subtle chromatic dispersion along glass edges with pastel refraction highlights.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "terminal-mono-matrix",
    "name": "UNIX Terminal Monospace",
    "slug": "terminal-mono-matrix",
    "category": "design",
    "author": "design-systems/terminal",
    "source": "skills.sh/packs/terminal-mono-matrix",
    "installs": 69188,
    "command": "/terminal-mono",
    "tags": [
      "design",
      "terminal",
      "mono",
      "matrix"
    ],
    "description": "Clean green/amber phosphor terminal output with blinking block cursor and ASCII tables.",
    "content": "## SKILL: UNIX Terminal Monospace\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply UNIX Terminal Monospace patterns across this section of the portfolio.\n2. Styling Guidelines: Clean green/amber phosphor terminal output with blinking block cursor and ASCII tables.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "saas-clean-white",
    "name": "Stripe Clean Architectural White",
    "slug": "saas-clean-white",
    "category": "design",
    "author": "design-systems/saas",
    "source": "skills.sh/packs/saas-clean-white",
    "installs": 50536,
    "command": "/saas-clean",
    "tags": [
      "design",
      "saas",
      "clean",
      "white"
    ],
    "description": "Refined off-white (#fcfcfc) enterprise layout with soft slate shadows and purple glass accents.",
    "content": "## SKILL: Stripe Clean Architectural White\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Stripe Clean Architectural White patterns across this section of the portfolio.\n2. Styling Guidelines: Refined off-white (#fcfcfc) enterprise layout with soft slate shadows and purple glass accents.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "dark-mode-high-contrast",
    "name": "OLED True-Black Luxury",
    "slug": "dark-mode-high-contrast",
    "category": "design",
    "author": "design-systems/dark",
    "source": "skills.sh/packs/dark-mode-high-contrast",
    "installs": 62711,
    "command": "/dark-mode",
    "tags": [
      "design",
      "dark",
      "mode",
      "high",
      "contrast"
    ],
    "description": "Pure #000000 canvas with razor-sharp 1px white borders and zero backlight bleed.",
    "content": "## SKILL: OLED True-Black Luxury\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply OLED True-Black Luxury patterns across this section of the portfolio.\n2. Styling Guidelines: Pure #000000 canvas with razor-sharp 1px white borders and zero backlight bleed.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "neumorphic-dark",
    "name": "Dark Neumorphic Extrusion",
    "slug": "neumorphic-dark",
    "category": "design",
    "author": "design-systems/neumorphic",
    "source": "skills.sh/packs/neumorphic-dark",
    "installs": 17515,
    "command": "/neumorphic-dark",
    "tags": [
      "design",
      "neumorphic",
      "dark"
    ],
    "description": "Dual soft-edge shadow extrusions rendered in dark slate for tactile physical buttons.",
    "content": "## SKILL: Dark Neumorphic Extrusion\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Dark Neumorphic Extrusion patterns across this section of the portfolio.\n2. Styling Guidelines: Dual soft-edge shadow extrusions rendered in dark slate for tactile physical buttons.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "kinetic-scroll-typography",
    "name": "Kinetic Scroll-Linked Type",
    "slug": "kinetic-scroll-typography",
    "category": "motion",
    "author": "motion-physics/kinetic",
    "source": "skills.sh/packs/kinetic-scroll-typography",
    "installs": 60155,
    "command": "/kinetic-scroll",
    "tags": [
      "motion",
      "kinetic",
      "scroll",
      "typography"
    ],
    "description": "Subtle scroll-linked scale and opacity reveals on section headers as they enter viewport.",
    "content": "## SKILL: Kinetic Scroll-Linked Type\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Kinetic Scroll-Linked Type patterns across this section of the portfolio.\n2. Styling Guidelines: Subtle scroll-linked scale and opacity reveals on section headers as they enter viewport.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "spring-physics-drawer",
    "name": "Inertial Spring Modal Physics",
    "slug": "spring-physics-drawer",
    "category": "motion",
    "author": "motion-physics/spring",
    "source": "skills.sh/packs/spring-physics-drawer",
    "installs": 32205,
    "command": "/spring-physics",
    "tags": [
      "motion",
      "spring",
      "physics",
      "drawer"
    ],
    "description": "Fluid modal dialogs that open with authentic damped harmonic spring physics.",
    "content": "## SKILL: Inertial Spring Modal Physics\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Inertial Spring Modal Physics patterns across this section of the portfolio.\n2. Styling Guidelines: Fluid modal dialogs that open with authentic damped harmonic spring physics.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "particle-ambient-field",
    "name": "Subtle Particle Starfield",
    "slug": "particle-ambient-field",
    "category": "motion",
    "author": "motion-physics/particle",
    "source": "skills.sh/packs/particle-ambient-field",
    "installs": 38664,
    "command": "/particle-ambient",
    "tags": [
      "motion",
      "particle",
      "ambient",
      "field"
    ],
    "description": "Ambient dust or micro-stars drifting lazily in background without CPU overhead.",
    "content": "## SKILL: Subtle Particle Starfield\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Subtle Particle Starfield patterns across this section of the portfolio.\n2. Styling Guidelines: Ambient dust or micro-stars drifting lazily in background without CPU overhead.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "magnetic-button-hover",
    "name": "Magnetic Button Cursor Attraction",
    "slug": "magnetic-button-hover",
    "category": "motion",
    "author": "motion-physics/magnetic",
    "source": "skills.sh/packs/magnetic-button-hover",
    "installs": 55906,
    "command": "/magnetic-button",
    "tags": [
      "motion",
      "magnetic",
      "button",
      "hover"
    ],
    "description": "Buttons that softly pull towards the cursor when hovered within 30px proximity.",
    "content": "## SKILL: Magnetic Button Cursor Attraction\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Magnetic Button Cursor Attraction patterns across this section of the portfolio.\n2. Styling Guidelines: Buttons that softly pull towards the cursor when hovered within 30px proximity.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "telemetry-dwell-radar",
    "name": "Recruiter Dwell-Time Telemetry",
    "slug": "telemetry-dwell-radar",
    "category": "metrics",
    "author": "analytics-labs/telemetry",
    "source": "skills.sh/packs/telemetry-dwell-radar",
    "installs": 27850,
    "command": "/telemetry-dwell",
    "tags": [
      "metrics",
      "telemetry",
      "dwell",
      "radar"
    ],
    "description": "Live session dwell-time tracker and heat-zone indicator showing recruiter engagement.",
    "content": "## SKILL: Recruiter Dwell-Time Telemetry\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Recruiter Dwell-Time Telemetry patterns across this section of the portfolio.\n2. Styling Guidelines: Live session dwell-time tracker and heat-zone indicator showing recruiter engagement.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "retention-cohort-matrix",
    "name": "User Retention Cohort Heatmap",
    "slug": "retention-cohort-matrix",
    "category": "metrics",
    "author": "analytics-labs/retention",
    "source": "skills.sh/packs/retention-cohort-matrix",
    "installs": 54535,
    "command": "/retention-cohort",
    "tags": [
      "metrics",
      "retention",
      "cohort",
      "matrix"
    ],
    "description": "Color-coded cohort retention grid showing Day 1 to Day 90 retention stability.",
    "content": "## SKILL: User Retention Cohort Heatmap\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply User Retention Cohort Heatmap patterns across this section of the portfolio.\n2. Styling Guidelines: Color-coded cohort retention grid showing Day 1 to Day 90 retention stability.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "conversion-funnel-meter",
    "name": "Full-Funnel Conversion Lift",
    "slug": "conversion-funnel-meter",
    "category": "metrics",
    "author": "analytics-labs/conversion",
    "source": "skills.sh/packs/conversion-funnel-meter",
    "installs": 15365,
    "command": "/conversion-funnel",
    "tags": [
      "metrics",
      "conversion",
      "funnel",
      "meter"
    ],
    "description": "Sankey or stepped funnel visualization showing signup-to-activation conversion deltas.",
    "content": "## SKILL: Full-Funnel Conversion Lift\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Full-Funnel Conversion Lift patterns across this section of the portfolio.\n2. Styling Guidelines: Sankey or stepped funnel visualization showing signup-to-activation conversion deltas.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "sla-uptime-clock",
    "name": "99.999% High-Availability Radar",
    "slug": "sla-uptime-clock",
    "category": "metrics",
    "author": "analytics-labs/sla",
    "source": "skills.sh/packs/sla-uptime-clock",
    "installs": 76263,
    "command": "/sla-uptime",
    "tags": [
      "metrics",
      "sla",
      "uptime",
      "clock"
    ],
    "description": "Real-time multi-region uptime status pills and incident response latency benchmarks.",
    "content": "## SKILL: 99.999% High-Availability Radar\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply 99.999% High-Availability Radar patterns across this section of the portfolio.\n2. Styling Guidelines: Real-time multi-region uptime status pills and incident response latency benchmarks.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "cac-ltv-ratio-gauge",
    "name": "CAC vs LTV Efficiency Dial",
    "slug": "cac-ltv-ratio-gauge",
    "category": "metrics",
    "author": "analytics-labs/cac",
    "source": "skills.sh/packs/cac-ltv-ratio-gauge",
    "installs": 45075,
    "command": "/cac-ltv",
    "tags": [
      "metrics",
      "cac",
      "ltv",
      "ratio",
      "gauge"
    ],
    "description": "Unit economics dashboard showing Payback Period and LTV/CAC ratio curves.",
    "content": "## SKILL: CAC vs LTV Efficiency Dial\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply CAC vs LTV Efficiency Dial patterns across this section of the portfolio.\n2. Styling Guidelines: Unit economics dashboard showing Payback Period and LTV/CAC ratio curves.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "system-architecture-nodes",
    "name": "Interactive System Node Map",
    "slug": "system-architecture-nodes",
    "category": "strategy",
    "author": "operator-collective/system",
    "source": "skills.sh/packs/system-architecture-nodes",
    "installs": 74111,
    "command": "/system-architecture",
    "tags": [
      "strategy",
      "system",
      "architecture",
      "nodes"
    ],
    "description": "SVG node diagram mapping microservices, event queues, and database replicas.",
    "content": "## SKILL: Interactive System Node Map\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Interactive System Node Map patterns across this section of the portfolio.\n2. Styling Guidelines: SVG node diagram mapping microservices, event queues, and database replicas.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "executive-onboarding-plan",
    "name": "Executive First-Run Framework",
    "slug": "executive-onboarding-plan",
    "category": "strategy",
    "author": "operator-collective/executive",
    "source": "skills.sh/packs/executive-onboarding-plan",
    "installs": 49407,
    "command": "/executive-onboarding",
    "tags": [
      "strategy",
      "executive",
      "onboarding",
      "plan"
    ],
    "description": "Diagnostic framework for diagnosing legacy team bottlenecks and unlocking velocity.",
    "content": "## SKILL: Executive First-Run Framework\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Executive First-Run Framework patterns across this section of the portfolio.\n2. Styling Guidelines: Diagnostic framework for diagnosing legacy team bottlenecks and unlocking velocity.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "talent-density-matrix",
    "name": "Engineering Talent Density Model",
    "slug": "talent-density-matrix",
    "category": "strategy",
    "author": "operator-collective/talent",
    "source": "skills.sh/packs/talent-density-matrix",
    "installs": 76342,
    "command": "/talent-density",
    "tags": [
      "strategy",
      "talent",
      "density",
      "matrix"
    ],
    "description": "Organizational design matrix outlining hiring bars, skill rubrics, and team topology.",
    "content": "## SKILL: Engineering Talent Density Model\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Engineering Talent Density Model patterns across this section of the portfolio.\n2. Styling Guidelines: Organizational design matrix outlining hiring bars, skill rubrics, and team topology.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "deal-memo-structure",
    "name": "Executive Deal Memo Teardown",
    "slug": "deal-memo-structure",
    "category": "strategy",
    "author": "operator-collective/deal",
    "source": "skills.sh/packs/deal-memo-structure",
    "installs": 34774,
    "command": "/deal-memo",
    "tags": [
      "strategy",
      "deal",
      "memo",
      "structure"
    ],
    "description": "Venture-style investment memo detailing market size, timing tailwinds, and right-to-win.",
    "content": "## SKILL: Executive Deal Memo Teardown\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Executive Deal Memo Teardown patterns across this section of the portfolio.\n2. Styling Guidelines: Venture-style investment memo detailing market size, timing tailwinds, and right-to-win.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "board-slide-executive",
    "name": "Quarterly Board Deck Architecture",
    "slug": "board-slide-executive",
    "category": "strategy",
    "author": "operator-collective/board",
    "source": "skills.sh/packs/board-slide-executive",
    "installs": 63297,
    "command": "/board-slide",
    "tags": [
      "strategy",
      "board",
      "slide",
      "executive"
    ],
    "description": "High-density board slide format with executive summary bullets and audit metrics.",
    "content": "## SKILL: Quarterly Board Deck Architecture\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Quarterly Board Deck Architecture patterns across this section of the portfolio.\n2. Styling Guidelines: High-density board slide format with executive summary bullets and audit metrics.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "mcp-agent-integration",
    "name": "Model Context Protocol (MCP) Blueprint",
    "slug": "mcp-agent-integration",
    "category": "strategy",
    "author": "operator-collective/mcp",
    "source": "skills.sh/packs/mcp-agent-integration",
    "installs": 34850,
    "command": "/mcp-agent",
    "tags": [
      "strategy",
      "mcp",
      "agent",
      "integration"
    ],
    "description": "System design blueprint for connecting LLM agents to production database tools.",
    "content": "## SKILL: Model Context Protocol (MCP) Blueprint\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Model Context Protocol (MCP) Blueprint patterns across this section of the portfolio.\n2. Styling Guidelines: System design blueprint for connecting LLM agents to production database tools.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "enterprise-security-soc2",
    "name": "SOC2 & HIPAA Enterprise Readiness",
    "slug": "enterprise-security-soc2",
    "category": "strategy",
    "author": "operator-collective/enterprise",
    "source": "skills.sh/packs/enterprise-security-soc2",
    "installs": 43603,
    "command": "/enterprise-security",
    "tags": [
      "strategy",
      "enterprise",
      "security",
      "soc2"
    ],
    "description": "Security architecture checklist showing zero-trust authentication and audit logs.",
    "content": "## SKILL: SOC2 & HIPAA Enterprise Readiness\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply SOC2 & HIPAA Enterprise Readiness patterns across this section of the portfolio.\n2. Styling Guidelines: Security architecture checklist showing zero-trust authentication and audit logs.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "plg-viral-loop-engine",
    "name": "Product-Led Growth Viral Engine",
    "slug": "plg-viral-loop-engine",
    "category": "strategy",
    "author": "operator-collective/plg",
    "source": "skills.sh/packs/plg-viral-loop-engine",
    "installs": 53723,
    "command": "/plg-viral",
    "tags": [
      "strategy",
      "plg",
      "viral",
      "loop",
      "engine"
    ],
    "description": "K-factor viral loop diagram illustrating product onboarding referral hooks.",
    "content": "## SKILL: Product-Led Growth Viral Engine\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Product-Led Growth Viral Engine patterns across this section of the portfolio.\n2. Styling Guidelines: K-factor viral loop diagram illustrating product onboarding referral hooks.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "design-system-tokens-spec",
    "name": "Tokens & Variables Design Contract",
    "slug": "design-system-tokens-spec",
    "category": "design",
    "author": "design-systems/design",
    "source": "skills.sh/packs/design-system-tokens-spec",
    "installs": 29058,
    "command": "/design-system",
    "tags": [
      "design",
      "design",
      "system",
      "tokens",
      "spec"
    ],
    "description": "Strict CSS custom properties dictionary defining spacing, colors, and elevations.",
    "content": "## SKILL: Tokens & Variables Design Contract\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Tokens & Variables Design Contract patterns across this section of the portfolio.\n2. Styling Guidelines: Strict CSS custom properties dictionary defining spacing, colors, and elevations.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "tabular-numeric-proof",
    "name": "Financial Tabular Data Precision",
    "slug": "tabular-numeric-proof",
    "category": "metrics",
    "author": "analytics-labs/tabular",
    "source": "skills.sh/packs/tabular-numeric-proof",
    "installs": 58698,
    "command": "/tabular-numeric",
    "tags": [
      "metrics",
      "tabular",
      "numeric",
      "proof"
    ],
    "description": "Monospace numeric columns aligned on decimal points with accounting negative formatting.",
    "content": "## SKILL: Financial Tabular Data Precision\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Financial Tabular Data Precision patterns across this section of the portfolio.\n2. Styling Guidelines: Monospace numeric columns aligned on decimal points with accounting negative formatting.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "executive-audio-brief",
    "name": "Embedded Executive Voice Note",
    "slug": "executive-audio-brief",
    "category": "strategy",
    "author": "operator-collective/executive",
    "source": "skills.sh/packs/executive-audio-brief",
    "installs": 26970,
    "command": "/executive-audio",
    "tags": [
      "strategy",
      "executive",
      "audio",
      "brief"
    ],
    "description": "Polished minimal waveform audio player for candidate executive voice commentary.",
    "content": "## SKILL: Embedded Executive Voice Note\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Embedded Executive Voice Note patterns across this section of the portfolio.\n2. Styling Guidelines: Polished minimal waveform audio player for candidate executive voice commentary.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "interactive-roi-calc",
    "name": "Interactive Enterprise ROI Calculator",
    "slug": "interactive-roi-calc",
    "category": "metrics",
    "author": "analytics-labs/interactive",
    "source": "skills.sh/packs/interactive-roi-calc",
    "installs": 37574,
    "command": "/interactive-roi",
    "tags": [
      "metrics",
      "interactive",
      "roi",
      "calc"
    ],
    "description": "Real-time slider calculating cost savings based on team size and transaction volume.",
    "content": "## SKILL: Interactive Enterprise ROI Calculator\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Interactive Enterprise ROI Calculator patterns across this section of the portfolio.\n2. Styling Guidelines: Real-time slider calculating cost savings based on team size and transaction volume.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "verified-credentials-bar",
    "name": "Verified Credentials & Patents Bar",
    "slug": "verified-credentials-bar",
    "category": "strategy",
    "author": "operator-collective/verified",
    "source": "skills.sh/packs/verified-credentials-bar",
    "installs": 52906,
    "command": "/verified-credentials",
    "tags": [
      "strategy",
      "verified",
      "credentials",
      "bar"
    ],
    "description": "Logo bar showcasing verified certifications, patents, and top-tier alumni badges.",
    "content": "## SKILL: Verified Credentials & Patents Bar\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Verified Credentials & Patents Bar patterns across this section of the portfolio.\n2. Styling Guidelines: Logo bar showcasing verified certifications, patents, and top-tier alumni badges.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "friction-slider-matrix",
    "name": "Before vs After Interactive Slider",
    "slug": "friction-slider-matrix",
    "category": "strategy",
    "author": "operator-collective/friction",
    "source": "skills.sh/packs/friction-slider-matrix",
    "installs": 61008,
    "command": "/friction-slider",
    "tags": [
      "strategy",
      "friction",
      "slider",
      "matrix"
    ],
    "description": "Visual comparison slider demonstrating UI or architectural optimization before/after.",
    "content": "## SKILL: Before vs After Interactive Slider\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Before vs After Interactive Slider patterns across this section of the portfolio.\n2. Styling Guidelines: Visual comparison slider demonstrating UI or architectural optimization before/after.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "code-terminal-console",
    "name": "Syntax-Highlighted Code Sandbox",
    "slug": "code-terminal-console",
    "category": "design",
    "author": "design-systems/code",
    "source": "skills.sh/packs/code-terminal-console",
    "installs": 36689,
    "command": "/code-terminal",
    "tags": [
      "design",
      "code",
      "terminal",
      "console"
    ],
    "description": "Terminal box with copy-code action, line numbers, and dark syntax theme.",
    "content": "## SKILL: Syntax-Highlighted Code Sandbox\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Syntax-Highlighted Code Sandbox patterns across this section of the portfolio.\n2. Styling Guidelines: Terminal box with copy-code action, line numbers, and dark syntax theme.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "timeline-career-arc",
    "name": "Interactive Career Velocity Timeline",
    "slug": "timeline-career-arc",
    "category": "strategy",
    "author": "operator-collective/timeline",
    "source": "skills.sh/packs/timeline-career-arc",
    "installs": 39885,
    "command": "/timeline-career",
    "tags": [
      "strategy",
      "timeline",
      "career",
      "arc"
    ],
    "description": "Chronological milestone rail with expandable achievements and promotion velocity.",
    "content": "## SKILL: Interactive Career Velocity Timeline\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Interactive Career Velocity Timeline patterns across this section of the portfolio.\n2. Styling Guidelines: Chronological milestone rail with expandable achievements and promotion velocity.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "skills-radar-chart",
    "name": "Multi-Axis Operator Competency Radar",
    "slug": "skills-radar-chart",
    "category": "metrics",
    "author": "analytics-labs/skills",
    "source": "skills.sh/packs/skills-radar-chart",
    "installs": 44054,
    "command": "/skills-radar",
    "tags": [
      "metrics",
      "skills",
      "radar",
      "chart"
    ],
    "description": "Polygon radar chart comparing technical leadership, product velocity, and GTM execution.",
    "content": "## SKILL: Multi-Axis Operator Competency Radar\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Multi-Axis Operator Competency Radar patterns across this section of the portfolio.\n2. Styling Guidelines: Polygon radar chart comparing technical leadership, product velocity, and GTM execution.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "executive-summary-card",
    "name": "C-Suite Executive Summary Card",
    "slug": "executive-summary-card",
    "category": "strategy",
    "author": "operator-collective/executive",
    "source": "skills.sh/packs/executive-summary-card",
    "installs": 34984,
    "command": "/executive-summary",
    "tags": [
      "strategy",
      "executive",
      "summary",
      "card"
    ],
    "description": "High-impact 1-page executive brief format with key accomplishments and contact CTA.",
    "content": "## SKILL: C-Suite Executive Summary Card\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply C-Suite Executive Summary Card patterns across this section of the portfolio.\n2. Styling Guidelines: High-impact 1-page executive brief format with key accomplishments and contact CTA.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "feature-comparison-grid",
    "name": "Feature & Architectural Matrix",
    "slug": "feature-comparison-grid",
    "category": "strategy",
    "author": "operator-collective/feature",
    "source": "skills.sh/packs/feature-comparison-grid",
    "installs": 60705,
    "command": "/feature-comparison",
    "tags": [
      "strategy",
      "feature",
      "comparison",
      "grid"
    ],
    "description": "Checkmark vs cross comparison table benchmarking internal tools against competitors.",
    "content": "## SKILL: Feature & Architectural Matrix\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Feature & Architectural Matrix patterns across this section of the portfolio.\n2. Styling Guidelines: Checkmark vs cross comparison table benchmarking internal tools against competitors.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "micro-pulse-indicators",
    "name": "Pulsing Live Signal Badges",
    "slug": "micro-pulse-indicators",
    "category": "motion",
    "author": "motion-physics/micro",
    "source": "skills.sh/packs/micro-pulse-indicators",
    "installs": 78906,
    "command": "/micro-pulse",
    "tags": [
      "motion",
      "micro",
      "pulse",
      "indicators"
    ],
    "description": "Softly pulsing emerald/amber status dots indicating live production environments.",
    "content": "## SKILL: Pulsing Live Signal Badges\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Pulsing Live Signal Badges patterns across this section of the portfolio.\n2. Styling Guidelines: Softly pulsing emerald/amber status dots indicating live production environments.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "gradient-border-glow",
    "name": "Conic Gradient Border Glow",
    "slug": "gradient-border-glow",
    "category": "motion",
    "author": "motion-physics/gradient",
    "source": "skills.sh/packs/gradient-border-glow",
    "installs": 62046,
    "command": "/gradient-border",
    "tags": [
      "motion",
      "gradient",
      "border",
      "glow"
    ],
    "description": "Subtle rotating conic gradient border beam highlighting primary CTA buttons.",
    "content": "## SKILL: Conic Gradient Border Glow\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Conic Gradient Border Glow patterns across this section of the portfolio.\n2. Styling Guidelines: Subtle rotating conic gradient border beam highlighting primary CTA buttons.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "tilt-card-3d",
    "name": "3D Perspective Tilt on Hover",
    "slug": "tilt-card-3d",
    "category": "motion",
    "author": "motion-physics/tilt",
    "source": "skills.sh/packs/tilt-card-3d",
    "installs": 68337,
    "command": "/tilt-card",
    "tags": [
      "motion",
      "tilt",
      "card",
      "3d"
    ],
    "description": "Subtle CSS 3D perspective rotation (max 6deg) following pointer cursor.",
    "content": "## SKILL: 3D Perspective Tilt on Hover\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply 3D Perspective Tilt on Hover patterns across this section of the portfolio.\n2. Styling Guidelines: Subtle CSS 3D perspective rotation (max 6deg) following pointer cursor.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "dark-graph-canvas",
    "name": "Interactive Knowledge Graph Canvas",
    "slug": "dark-graph-canvas",
    "category": "metrics",
    "author": "analytics-labs/dark",
    "source": "skills.sh/packs/dark-graph-canvas",
    "installs": 72072,
    "command": "/dark-graph",
    "tags": [
      "metrics",
      "dark",
      "graph",
      "canvas"
    ],
    "description": "Force-directed node graph visualization for complex domain relationships.",
    "content": "## SKILL: Interactive Knowledge Graph Canvas\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Interactive Knowledge Graph Canvas patterns across this section of the portfolio.\n2. Styling Guidelines: Force-directed node graph visualization for complex domain relationships.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "fluid-typography-clamp",
    "name": "Fluid Viewport Typography Scale",
    "slug": "fluid-typography-clamp",
    "category": "design",
    "author": "design-systems/fluid",
    "source": "skills.sh/packs/fluid-typography-clamp",
    "installs": 68406,
    "command": "/fluid-typography",
    "tags": [
      "design",
      "fluid",
      "typography",
      "clamp"
    ],
    "description": "Mathematical clamp() typography scaling smoothly across mobile to 4K displays.",
    "content": "## SKILL: Fluid Viewport Typography Scale\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Fluid Viewport Typography Scale patterns across this section of the portfolio.\n2. Styling Guidelines: Mathematical clamp() typography scaling smoothly across mobile to 4K displays.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "monochrome-wireframe",
    "name": "Technical Wireframe & Grid Marks",
    "slug": "monochrome-wireframe",
    "category": "design",
    "author": "design-systems/monochrome",
    "source": "skills.sh/packs/monochrome-wireframe",
    "installs": 50450,
    "command": "/monochrome-wireframe",
    "tags": [
      "design",
      "monochrome",
      "wireframe"
    ],
    "description": "Raw structural wireframe aesthetic with crosshairs and component slot coordinates.",
    "content": "## SKILL: Technical Wireframe & Grid Marks\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Technical Wireframe & Grid Marks patterns across this section of the portfolio.\n2. Styling Guidelines: Raw structural wireframe aesthetic with crosshairs and component slot coordinates.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "dark-glass-accordion",
    "name": "Dark Glass Multi-Level Accordion",
    "slug": "dark-glass-accordion",
    "category": "design",
    "author": "design-systems/dark",
    "source": "skills.sh/packs/dark-glass-accordion",
    "installs": 33399,
    "command": "/dark-glass",
    "tags": [
      "design",
      "dark",
      "glass",
      "accordion"
    ],
    "description": "Smoothly expanding disclosure panels with frosted glass surfaces and subtle dividers.",
    "content": "## SKILL: Dark Glass Multi-Level Accordion\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Dark Glass Multi-Level Accordion patterns across this section of the portfolio.\n2. Styling Guidelines: Smoothly expanding disclosure panels with frosted glass surfaces and subtle dividers.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "stat-counter-animation",
    "name": "Animated Monospace Number Counter",
    "slug": "stat-counter-animation",
    "category": "motion",
    "author": "motion-physics/stat",
    "source": "skills.sh/packs/stat-counter-animation",
    "installs": 57909,
    "command": "/stat-counter",
    "tags": [
      "motion",
      "stat",
      "counter",
      "animation"
    ],
    "description": "Numbers that rapidly animate up from 0 to final value on viewport entry.",
    "content": "## SKILL: Animated Monospace Number Counter\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Animated Monospace Number Counter patterns across this section of the portfolio.\n2. Styling Guidelines: Numbers that rapidly animate up from 0 to final value on viewport entry.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "executive-lead-magnet",
    "name": "Whitepaper & Teardown PDF Gateway",
    "slug": "executive-lead-magnet",
    "category": "strategy",
    "author": "operator-collective/executive",
    "source": "skills.sh/packs/executive-lead-magnet",
    "installs": 42288,
    "command": "/executive-lead",
    "tags": [
      "strategy",
      "executive",
      "lead",
      "magnet"
    ],
    "description": "Download card with document preview thumbnail, page count, and download trigger.",
    "content": "## SKILL: Whitepaper & Teardown PDF Gateway\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Whitepaper & Teardown PDF Gateway patterns across this section of the portfolio.\n2. Styling Guidelines: Download card with document preview thumbnail, page count, and download trigger.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "confidential-watermark",
    "name": "Confidential Operator Watermark",
    "slug": "confidential-watermark",
    "category": "design",
    "author": "design-systems/confidential",
    "source": "skills.sh/packs/confidential-watermark",
    "installs": 48082,
    "command": "/confidential-watermark",
    "tags": [
      "design",
      "confidential",
      "watermark"
    ],
    "description": "Subtle diagonal watermark stamp across confidential strategic slides.",
    "content": "## SKILL: Confidential Operator Watermark\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Confidential Operator Watermark patterns across this section of the portfolio.\n2. Styling Guidelines: Subtle diagonal watermark stamp across confidential strategic slides.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "latency-gauge-meter",
    "name": "Real-Time P99 Latency Gauge",
    "slug": "latency-gauge-meter",
    "category": "metrics",
    "author": "analytics-labs/latency",
    "source": "skills.sh/packs/latency-gauge-meter",
    "installs": 24315,
    "command": "/latency-gauge",
    "tags": [
      "metrics",
      "latency",
      "gauge",
      "meter"
    ],
    "description": "Radial speedometer gauge tracking millisecond API response latencies.",
    "content": "## SKILL: Real-Time P99 Latency Gauge\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Real-Time P99 Latency Gauge patterns across this section of the portfolio.\n2. Styling Guidelines: Radial speedometer gauge tracking millisecond API response latencies.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "cloud-cost-optimizer",
    "name": "Cloud Infrastructure Cost Delta",
    "slug": "cloud-cost-optimizer",
    "category": "metrics",
    "author": "analytics-labs/cloud",
    "source": "skills.sh/packs/cloud-cost-optimizer",
    "installs": 42314,
    "command": "/cloud-cost",
    "tags": [
      "metrics",
      "cloud",
      "cost",
      "optimizer"
    ],
    "description": "AWS/GCP bill optimization breakdown card showing compute and egress savings.",
    "content": "## SKILL: Cloud Infrastructure Cost Delta\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Cloud Infrastructure Cost Delta patterns across this section of the portfolio.\n2. Styling Guidelines: AWS/GCP bill optimization breakdown card showing compute and egress savings.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "incident-postmortem-card",
    "name": "Production Incident Postmortem",
    "slug": "incident-postmortem-card",
    "category": "strategy",
    "author": "operator-collective/incident",
    "source": "skills.sh/packs/incident-postmortem-card",
    "installs": 20267,
    "command": "/incident-postmortem",
    "tags": [
      "strategy",
      "incident",
      "postmortem",
      "card"
    ],
    "description": "Blameless postmortem breakdown showing root cause, MTTR, and permanent fix.",
    "content": "## SKILL: Production Incident Postmortem\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Production Incident Postmortem patterns across this section of the portfolio.\n2. Styling Guidelines: Blameless postmortem breakdown showing root cause, MTTR, and permanent fix.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "hiring-velocity-metric",
    "name": "Engineering Hiring Velocity Index",
    "slug": "hiring-velocity-metric",
    "category": "metrics",
    "author": "analytics-labs/hiring",
    "source": "skills.sh/packs/hiring-velocity-metric",
    "installs": 46462,
    "command": "/hiring-velocity",
    "tags": [
      "metrics",
      "hiring",
      "velocity",
      "metric"
    ],
    "description": "Bar chart showing time-to-hire reduction and offer acceptance percentage.",
    "content": "## SKILL: Engineering Hiring Velocity Index\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Engineering Hiring Velocity Index patterns across this section of the portfolio.\n2. Styling Guidelines: Bar chart showing time-to-hire reduction and offer acceptance percentage.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "dark-mode-monaco",
    "name": "VS Code & Monaco Editor Theme",
    "slug": "dark-mode-monaco",
    "category": "design",
    "author": "design-systems/dark",
    "source": "skills.sh/packs/dark-mode-monaco",
    "installs": 68103,
    "command": "/dark-mode",
    "tags": [
      "design",
      "dark",
      "mode",
      "monaco"
    ],
    "description": "Editor window styled after VS Code Dark+ with file tabs and mini-map gutter.",
    "content": "## SKILL: VS Code & Monaco Editor Theme\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply VS Code & Monaco Editor Theme patterns across this section of the portfolio.\n2. Styling Guidelines: Editor window styled after VS Code Dark+ with file tabs and mini-map gutter.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "editorial-pullquote",
    "name": "Large-Type Magazine Pullquote",
    "slug": "editorial-pullquote",
    "category": "design",
    "author": "design-systems/editorial",
    "source": "skills.sh/packs/editorial-pullquote",
    "installs": 24282,
    "command": "/editorial-pullquote",
    "tags": [
      "design",
      "editorial",
      "pullquote"
    ],
    "description": "Oversized quotation styling with left accent bar and editorial attribution.",
    "content": "## SKILL: Large-Type Magazine Pullquote\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Large-Type Magazine Pullquote patterns across this section of the portfolio.\n2. Styling Guidelines: Oversized quotation styling with left accent bar and editorial attribution.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "mobile-touch-carousel",
    "name": "Touch-Optimized Horizontal Carousel",
    "slug": "mobile-touch-carousel",
    "category": "design",
    "author": "design-systems/mobile",
    "source": "skills.sh/packs/mobile-touch-carousel",
    "installs": 18607,
    "command": "/mobile-touch",
    "tags": [
      "design",
      "mobile",
      "touch",
      "carousel"
    ],
    "description": "Smooth swipe carousel with snap points and mobile thumb indicator dots.",
    "content": "## SKILL: Touch-Optimized Horizontal Carousel\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Touch-Optimized Horizontal Carousel patterns across this section of the portfolio.\n2. Styling Guidelines: Smooth swipe carousel with snap points and mobile thumb indicator dots.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "executive-bio-split",
    "name": "Executive Monogram & Bio Split",
    "slug": "executive-bio-split",
    "category": "design",
    "author": "design-systems/executive",
    "source": "skills.sh/packs/executive-bio-split",
    "installs": 51731,
    "command": "/executive-bio",
    "tags": [
      "design",
      "executive",
      "bio",
      "split"
    ],
    "description": "Refined split hero with typographic monogram lockup and executive positioning thesis.",
    "content": "## SKILL: Executive Monogram & Bio Split\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Executive Monogram & Bio Split patterns across this section of the portfolio.\n2. Styling Guidelines: Refined split hero with typographic monogram lockup and executive positioning thesis.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "dark-glass-tabs",
    "name": "Subtle Glass Segmented Control",
    "slug": "dark-glass-tabs",
    "category": "design",
    "author": "design-systems/dark",
    "source": "skills.sh/packs/dark-glass-tabs",
    "installs": 57955,
    "command": "/dark-glass",
    "tags": [
      "design",
      "dark",
      "glass",
      "tabs"
    ],
    "description": "Pill-style segmented control tabs with sliding active background indicator.",
    "content": "## SKILL: Subtle Glass Segmented Control\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Subtle Glass Segmented Control patterns across this section of the portfolio.\n2. Styling Guidelines: Pill-style segmented control tabs with sliding active background indicator.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "subgrid-kpi-align",
    "name": "CSS Subgrid Multi-Card Alignment",
    "slug": "subgrid-kpi-align",
    "category": "design",
    "author": "design-systems/subgrid",
    "source": "skills.sh/packs/subgrid-kpi-align",
    "installs": 46518,
    "command": "/subgrid-kpi",
    "tags": [
      "design",
      "subgrid",
      "kpi",
      "align"
    ],
    "description": "Ensures card titles, metrics, and descriptions align horizontally across cards.",
    "content": "## SKILL: CSS Subgrid Multi-Card Alignment\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply CSS Subgrid Multi-Card Alignment patterns across this section of the portfolio.\n2. Styling Guidelines: Ensures card titles, metrics, and descriptions align horizontally across cards.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "audit-trail-timeline",
    "name": "Compliance & Security Audit Trail",
    "slug": "audit-trail-timeline",
    "category": "metrics",
    "author": "analytics-labs/audit",
    "source": "skills.sh/packs/audit-trail-timeline",
    "installs": 23613,
    "command": "/audit-trail",
    "tags": [
      "metrics",
      "audit",
      "trail",
      "timeline"
    ],
    "description": "Timestamped security event log with verified cryptographic signature badges.",
    "content": "## SKILL: Compliance & Security Audit Trail\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Compliance & Security Audit Trail patterns across this section of the portfolio.\n2. Styling Guidelines: Timestamped security event log with verified cryptographic signature badges.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "dark-glass-modal",
    "name": "Floating Glass Decision Modal",
    "slug": "dark-glass-modal",
    "category": "design",
    "author": "design-systems/dark",
    "source": "skills.sh/packs/dark-glass-modal",
    "installs": 45692,
    "command": "/dark-glass",
    "tags": [
      "design",
      "dark",
      "glass",
      "modal"
    ],
    "description": "Centrally elevated dialogue window with dimmed backdrop and focus lock.",
    "content": "## SKILL: Floating Glass Decision Modal\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Floating Glass Decision Modal patterns across this section of the portfolio.\n2. Styling Guidelines: Centrally elevated dialogue window with dimmed backdrop and focus lock.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "gradient-text-shimmer",
    "name": "Shimmering Metallic Text Header",
    "slug": "gradient-text-shimmer",
    "category": "motion",
    "author": "motion-physics/gradient",
    "source": "skills.sh/packs/gradient-text-shimmer",
    "installs": 19106,
    "command": "/gradient-text",
    "tags": [
      "motion",
      "gradient",
      "text",
      "shimmer"
    ],
    "description": "Continuous subtle light sweep across gradient headline typography.",
    "content": "## SKILL: Shimmering Metallic Text Header\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Shimmering Metallic Text Header patterns across this section of the portfolio.\n2. Styling Guidelines: Continuous subtle light sweep across gradient headline typography.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "operator-thesis-block",
    "name": "Verbatim Strategic Thesis Block",
    "slug": "operator-thesis-block",
    "category": "strategy",
    "author": "operator-collective/operator",
    "source": "skills.sh/packs/operator-thesis-block",
    "installs": 65837,
    "command": "/operator-thesis",
    "tags": [
      "strategy",
      "operator",
      "thesis",
      "block"
    ],
    "description": "High-contrast quote card rendering the candidate core strategic challenge and fix.",
    "content": "## SKILL: Verbatim Strategic Thesis Block\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Verbatim Strategic Thesis Block patterns across this section of the portfolio.\n2. Styling Guidelines: High-contrast quote card rendering the candidate core strategic challenge and fix.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "recruiter-action-dock",
    "name": "Floating Recruiter Action Dock",
    "slug": "recruiter-action-dock",
    "category": "design",
    "author": "design-systems/recruiter",
    "source": "skills.sh/packs/recruiter-action-dock",
    "installs": 73158,
    "command": "/recruiter-action",
    "tags": [
      "design",
      "recruiter",
      "action",
      "dock"
    ],
    "description": "Sticky bottom dock on mobile with quick actions: View Teardown, Copy Link, Schedule.",
    "content": "## SKILL: Floating Recruiter Action Dock\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Floating Recruiter Action Dock patterns across this section of the portfolio.\n2. Styling Guidelines: Sticky bottom dock on mobile with quick actions: View Teardown, Copy Link, Schedule.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "data-density-compact",
    "name": "Bloomberg & Financial Terminal Density",
    "slug": "data-density-compact",
    "category": "metrics",
    "author": "analytics-labs/data",
    "source": "skills.sh/packs/data-density-compact",
    "installs": 70147,
    "command": "/data-density",
    "tags": [
      "metrics",
      "data",
      "density",
      "compact"
    ],
    "description": "High-density tabular data format for complex enterprise quantitative proof.",
    "content": "## SKILL: Bloomberg & Financial Terminal Density\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Bloomberg & Financial Terminal Density patterns across this section of the portfolio.\n2. Styling Guidelines: High-density tabular data format for complex enterprise quantitative proof.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "luxury-gold-accents",
    "name": "Warm Charcoal & Brass Accents",
    "slug": "luxury-gold-accents",
    "category": "design",
    "author": "design-systems/luxury",
    "source": "skills.sh/packs/luxury-gold-accents",
    "installs": 41476,
    "command": "/luxury-gold",
    "tags": [
      "design",
      "luxury",
      "gold",
      "accents"
    ],
    "description": "Deep charcoal #121214 with subtle brushed brass (#c5a059) 1px border lines.",
    "content": "## SKILL: Warm Charcoal & Brass Accents\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Warm Charcoal & Brass Accents patterns across this section of the portfolio.\n2. Styling Guidelines: Deep charcoal #121214 with subtle brushed brass (#c5a059) 1px border lines.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "editorial-author-row",
    "name": "Verified Candidate Author Signature",
    "slug": "editorial-author-row",
    "category": "design",
    "author": "design-systems/editorial",
    "source": "skills.sh/packs/editorial-author-row",
    "installs": 19145,
    "command": "/editorial-author",
    "tags": [
      "design",
      "editorial",
      "author",
      "row"
    ],
    "description": "Handcrafted cursive SVG signature lockup and executive metadata footer.",
    "content": "## SKILL: Verified Candidate Author Signature\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Verified Candidate Author Signature patterns across this section of the portfolio.\n2. Styling Guidelines: Handcrafted cursive SVG signature lockup and executive metadata footer.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "spring-hover-pill",
    "name": "Spring Physics Action Pills",
    "slug": "spring-hover-pill",
    "category": "motion",
    "author": "motion-physics/spring",
    "source": "skills.sh/packs/spring-hover-pill",
    "installs": 75270,
    "command": "/spring-hover",
    "tags": [
      "motion",
      "spring",
      "hover",
      "pill"
    ],
    "description": "Interactive tag pills with playful spring scale and subtle color invert on hover.",
    "content": "## SKILL: Spring Physics Action Pills\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Spring Physics Action Pills patterns across this section of the portfolio.\n2. Styling Guidelines: Interactive tag pills with playful spring scale and subtle color invert on hover.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "dark-canvas-particles",
    "name": "Ambient Starfield & Grid Mesh",
    "slug": "dark-canvas-particles",
    "category": "motion",
    "author": "motion-physics/dark",
    "source": "skills.sh/packs/dark-canvas-particles",
    "installs": 38057,
    "command": "/dark-canvas",
    "tags": [
      "motion",
      "dark",
      "canvas",
      "particles"
    ],
    "description": "Dual ambient layer combining perspective grid lines with drifting light nodes.",
    "content": "## SKILL: Ambient Starfield & Grid Mesh\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Ambient Starfield & Grid Mesh patterns across this section of the portfolio.\n2. Styling Guidelines: Dual ambient layer combining perspective grid lines with drifting light nodes.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "executive-summary-metrics",
    "name": "3-Number Executive Proof Banner",
    "slug": "executive-summary-metrics",
    "category": "metrics",
    "author": "analytics-labs/executive",
    "source": "skills.sh/packs/executive-summary-metrics",
    "installs": 25302,
    "command": "/executive-summary",
    "tags": [
      "metrics",
      "executive",
      "summary",
      "metrics"
    ],
    "description": "Horizontal banner featuring 3 high-stakes verified numbers with sub-captions.",
    "content": "## SKILL: 3-Number Executive Proof Banner\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply 3-Number Executive Proof Banner patterns across this section of the portfolio.\n2. Styling Guidelines: Horizontal banner featuring 3 high-stakes verified numbers with sub-captions.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "interactive-workflow-stepper",
    "name": "Multi-Stage Product Delivery Flow",
    "slug": "interactive-workflow-stepper",
    "category": "strategy",
    "author": "operator-collective/interactive",
    "source": "skills.sh/packs/interactive-workflow-stepper",
    "installs": 54701,
    "command": "/interactive-workflow",
    "tags": [
      "strategy",
      "interactive",
      "workflow",
      "stepper"
    ],
    "description": "Step progression bar with completed, active, and upcoming execution phases.",
    "content": "## SKILL: Multi-Stage Product Delivery Flow\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Multi-Stage Product Delivery Flow patterns across this section of the portfolio.\n2. Styling Guidelines: Step progression bar with completed, active, and upcoming execution phases.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "enterprise-readiness-checklist",
    "name": "SOC2 & HIPAA Enterprise Gates",
    "slug": "enterprise-readiness-checklist",
    "category": "strategy",
    "author": "operator-collective/enterprise",
    "source": "skills.sh/packs/enterprise-readiness-checklist",
    "installs": 76434,
    "command": "/enterprise-readiness",
    "tags": [
      "strategy",
      "enterprise",
      "readiness",
      "checklist"
    ],
    "description": "Interactive checklist showing regulatory compliance and enterprise security.",
    "content": "## SKILL: SOC2 & HIPAA Enterprise Gates\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply SOC2 & HIPAA Enterprise Gates patterns across this section of the portfolio.\n2. Styling Guidelines: Interactive checklist showing regulatory compliance and enterprise security.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "api-latency-sla-badge",
    "name": "99.99% Uptime Verified SLA Badge",
    "slug": "api-latency-sla-badge",
    "category": "metrics",
    "author": "analytics-labs/api",
    "source": "skills.sh/packs/api-latency-sla-badge",
    "installs": 33935,
    "command": "/api-latency",
    "tags": [
      "metrics",
      "api",
      "latency",
      "sla",
      "badge"
    ],
    "description": "Live status badge with green pulse indicator and average response time in ms.",
    "content": "## SKILL: 99.99% Uptime Verified SLA Badge\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply 99.99% Uptime Verified SLA Badge patterns across this section of the portfolio.\n2. Styling Guidelines: Live status badge with green pulse indicator and average response time in ms.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "dark-mode-shadcn-table",
    "name": "Shadcn Executive Data Table",
    "slug": "dark-mode-shadcn-table",
    "category": "design",
    "author": "design-systems/dark",
    "source": "skills.sh/packs/dark-mode-shadcn-table",
    "installs": 21889,
    "command": "/dark-mode",
    "tags": [
      "design",
      "dark",
      "mode",
      "shadcn",
      "table"
    ],
    "description": "Sortable table with sticky headers, pagination, and monospace column alignment.",
    "content": "## SKILL: Shadcn Executive Data Table\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Shadcn Executive Data Table patterns across this section of the portfolio.\n2. Styling Guidelines: Sortable table with sticky headers, pagination, and monospace column alignment.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "high-stakes-pivot-card",
    "name": "Strategic Pivot & Retrospective",
    "slug": "high-stakes-pivot-card",
    "category": "strategy",
    "author": "operator-collective/high",
    "source": "skills.sh/packs/high-stakes-pivot-card",
    "installs": 54241,
    "command": "/high-stakes",
    "tags": [
      "strategy",
      "high",
      "stakes",
      "pivot",
      "card"
    ],
    "description": "Case study highlighting a major architectural pivot and its revenue outcome.",
    "content": "## SKILL: Strategic Pivot & Retrospective\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Strategic Pivot & Retrospective patterns across this section of the portfolio.\n2. Styling Guidelines: Case study highlighting a major architectural pivot and its revenue outcome.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "executive-contact-bar",
    "name": "Direct Executive Communication Dock",
    "slug": "executive-contact-bar",
    "category": "design",
    "author": "design-systems/executive",
    "source": "skills.sh/packs/executive-contact-bar",
    "installs": 32625,
    "command": "/executive-contact",
    "tags": [
      "design",
      "executive",
      "contact",
      "bar"
    ],
    "description": "Clean communication bar featuring direct email, calendar booking, and LinkedIn.",
    "content": "## SKILL: Direct Executive Communication Dock\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Direct Executive Communication Dock patterns across this section of the portfolio.\n2. Styling Guidelines: Clean communication bar featuring direct email, calendar booking, and LinkedIn.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "minimalist-swiss-cards",
    "name": "Zurich Clean Enterprise Cards",
    "slug": "minimalist-swiss-cards",
    "category": "design",
    "author": "design-systems/minimalist",
    "source": "skills.sh/packs/minimalist-swiss-cards",
    "installs": 39244,
    "command": "/minimalist-swiss",
    "tags": [
      "design",
      "minimalist",
      "swiss",
      "cards"
    ],
    "description": "Square-cornered card containers with hairline borders and Swiss sans typography.",
    "content": "## SKILL: Zurich Clean Enterprise Cards\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Zurich Clean Enterprise Cards patterns across this section of the portfolio.\n2. Styling Guidelines: Square-cornered card containers with hairline borders and Swiss sans typography.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "tactile-switch-toggle",
    "name": "Physical Toggle Switch Affordance",
    "slug": "tactile-switch-toggle",
    "category": "motion",
    "author": "motion-physics/tactile",
    "source": "skills.sh/packs/tactile-switch-toggle",
    "installs": 38148,
    "command": "/tactile-switch",
    "tags": [
      "motion",
      "tactile",
      "switch",
      "toggle"
    ],
    "description": "Smooth mechanical toggle switch with subtle 3D lighting and click sound feel.",
    "content": "## SKILL: Physical Toggle Switch Affordance\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Physical Toggle Switch Affordance patterns across this section of the portfolio.\n2. Styling Guidelines: Smooth mechanical toggle switch with subtle 3D lighting and click sound feel.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "fluid-card-expansion",
    "name": "Expandable Case Study Drawer",
    "slug": "fluid-card-expansion",
    "category": "motion",
    "author": "motion-physics/fluid",
    "source": "skills.sh/packs/fluid-card-expansion",
    "installs": 64280,
    "command": "/fluid-card",
    "tags": [
      "motion",
      "fluid",
      "card",
      "expansion"
    ],
    "description": "Card that smoothly expands vertically to reveal full architectural deep-dive.",
    "content": "## SKILL: Expandable Case Study Drawer\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Expandable Case Study Drawer patterns across this section of the portfolio.\n2. Styling Guidelines: Card that smoothly expands vertically to reveal full architectural deep-dive.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "monochrome-bar-chart",
    "name": "High-Contrast Monochrome Bar Chart",
    "slug": "monochrome-bar-chart",
    "category": "metrics",
    "author": "analytics-labs/monochrome",
    "source": "skills.sh/packs/monochrome-bar-chart",
    "installs": 62218,
    "command": "/monochrome-bar",
    "tags": [
      "metrics",
      "monochrome",
      "bar",
      "chart"
    ],
    "description": "Solid white bars on deep black background with monospace percentage tags.",
    "content": "## SKILL: High-Contrast Monochrome Bar Chart\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply High-Contrast Monochrome Bar Chart patterns across this section of the portfolio.\n2. Styling Guidelines: Solid white bars on deep black background with monospace percentage tags.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "executive-quote-grid",
    "name": "Board Member Quote Grid",
    "slug": "executive-quote-grid",
    "category": "strategy",
    "author": "operator-collective/executive",
    "source": "skills.sh/packs/executive-quote-grid",
    "installs": 62981,
    "command": "/executive-quote",
    "tags": [
      "strategy",
      "executive",
      "quote",
      "grid"
    ],
    "description": "2-column quote grid with oversized typography and executive title attribution.",
    "content": "## SKILL: Board Member Quote Grid\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Board Member Quote Grid patterns across this section of the portfolio.\n2. Styling Guidelines: 2-column quote grid with oversized typography and executive title attribution.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "system-topology-diagram",
    "name": "Microservices Topology Overview",
    "slug": "system-topology-diagram",
    "category": "strategy",
    "author": "operator-collective/system",
    "source": "skills.sh/packs/system-topology-diagram",
    "installs": 51726,
    "command": "/system-topology",
    "tags": [
      "strategy",
      "system",
      "topology",
      "diagram"
    ],
    "description": "Architectural diagram illustrating API gateway, queues, and database replicas.",
    "content": "## SKILL: Microservices Topology Overview\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Microservices Topology Overview patterns across this section of the portfolio.\n2. Styling Guidelines: Architectural diagram illustrating API gateway, queues, and database replicas.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "executive-teardown-slider",
    "name": "Interactive Product Teardown Compare",
    "slug": "executive-teardown-slider",
    "category": "strategy",
    "author": "operator-collective/executive",
    "source": "skills.sh/packs/executive-teardown-slider",
    "installs": 48432,
    "command": "/executive-teardown",
    "tags": [
      "strategy",
      "executive",
      "teardown",
      "slider"
    ],
    "description": "Before vs after slider comparing existing UX flaws against engineered solution.",
    "content": "## SKILL: Interactive Product Teardown Compare\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Interactive Product Teardown Compare patterns across this section of the portfolio.\n2. Styling Guidelines: Before vs after slider comparing existing UX flaws against engineered solution.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "conversion-lift-badge",
    "name": "Verified +45% Conversion Lift Pill",
    "slug": "conversion-lift-badge",
    "category": "metrics",
    "author": "analytics-labs/conversion",
    "source": "skills.sh/packs/conversion-lift-badge",
    "installs": 54242,
    "command": "/conversion-lift",
    "tags": [
      "metrics",
      "conversion",
      "lift",
      "badge"
    ],
    "description": "Emerald pill badge with upward trend arrow and baseline comparison footnote.",
    "content": "## SKILL: Verified +45% Conversion Lift Pill\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Verified +45% Conversion Lift Pill patterns across this section of the portfolio.\n2. Styling Guidelines: Emerald pill badge with upward trend arrow and baseline comparison footnote.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "mobile-drawer-bottom-sheet",
    "name": "iOS Style Bottom Sheet Drawer",
    "slug": "mobile-drawer-bottom-sheet",
    "category": "design",
    "author": "design-systems/mobile",
    "source": "skills.sh/packs/mobile-drawer-bottom-sheet",
    "installs": 54827,
    "command": "/mobile-drawer",
    "tags": [
      "design",
      "mobile",
      "drawer",
      "bottom",
      "sheet"
    ],
    "description": "Bottom sheet drawer with grab handle, backdrop blur, and velocity dismissal.",
    "content": "## SKILL: iOS Style Bottom Sheet Drawer\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply iOS Style Bottom Sheet Drawer patterns across this section of the portfolio.\n2. Styling Guidelines: Bottom sheet drawer with grab handle, backdrop blur, and velocity dismissal.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "dark-mode-command-palette",
    "name": "Executive Command Palette (Cmd+K)",
    "slug": "dark-mode-command-palette",
    "category": "design",
    "author": "design-systems/dark",
    "source": "skills.sh/packs/dark-mode-command-palette",
    "installs": 24519,
    "command": "/dark-mode",
    "tags": [
      "design",
      "dark",
      "mode",
      "command",
      "palette"
    ],
    "description": "Keyboard-activated command palette styled with obsidian glass and fuzzy search.",
    "content": "## SKILL: Executive Command Palette (Cmd+K)\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Executive Command Palette (Cmd+K) patterns across this section of the portfolio.\n2. Styling Guidelines: Keyboard-activated command palette styled with obsidian glass and fuzzy search.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "aurora-header-banner",
    "name": "Vibrant Aurora Hero Glow",
    "slug": "aurora-header-banner",
    "category": "design",
    "author": "design-systems/aurora",
    "source": "skills.sh/packs/aurora-header-banner",
    "installs": 73669,
    "command": "/aurora-header",
    "tags": [
      "design",
      "aurora",
      "header",
      "banner"
    ],
    "description": "Glowing ambient light spill concentrated behind the main hero headline.",
    "content": "## SKILL: Vibrant Aurora Hero Glow\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Vibrant Aurora Hero Glow patterns across this section of the portfolio.\n2. Styling Guidelines: Glowing ambient light spill concentrated behind the main hero headline.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "fintech-payment-flow",
    "name": "End-to-End Payment Sequence",
    "slug": "fintech-payment-flow",
    "category": "strategy",
    "author": "operator-collective/fintech",
    "source": "skills.sh/packs/fintech-payment-flow",
    "installs": 40020,
    "command": "/fintech-payment",
    "tags": [
      "strategy",
      "fintech",
      "payment",
      "flow"
    ],
    "description": "Sequence diagram showing payment intent, webhook verification, and settlement.",
    "content": "## SKILL: End-to-End Payment Sequence\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply End-to-End Payment Sequence patterns across this section of the portfolio.\n2. Styling Guidelines: Sequence diagram showing payment intent, webhook verification, and settlement.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "saas-pricing-matrix",
    "name": "Enterprise Plan Packaging Matrix",
    "slug": "saas-pricing-matrix",
    "category": "strategy",
    "author": "operator-collective/saas",
    "source": "skills.sh/packs/saas-pricing-matrix",
    "installs": 69908,
    "command": "/saas-pricing",
    "tags": [
      "strategy",
      "saas",
      "pricing",
      "matrix"
    ],
    "description": "3-tier packaging table with highlight on recommended executive tier.",
    "content": "## SKILL: Enterprise Plan Packaging Matrix\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Enterprise Plan Packaging Matrix patterns across this section of the portfolio.\n2. Styling Guidelines: 3-tier packaging table with highlight on recommended executive tier.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "executive-portfolio-footer",
    "name": "Executive Colophon & Tech Stack",
    "slug": "executive-portfolio-footer",
    "category": "design",
    "author": "design-systems/executive",
    "source": "skills.sh/packs/executive-portfolio-footer",
    "installs": 74493,
    "command": "/executive-portfolio",
    "tags": [
      "design",
      "executive",
      "portfolio",
      "footer"
    ],
    "description": "Clean footer detailing site architecture, hosting on Vercel, and source credit.",
    "content": "## SKILL: Executive Colophon & Tech Stack\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Executive Colophon & Tech Stack patterns across this section of the portfolio.\n2. Styling Guidelines: Clean footer detailing site architecture, hosting on Vercel, and source credit.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "font-mono-tabular-kpi",
    "name": "Tabular-Nums Metric Counter",
    "slug": "font-mono-tabular-kpi",
    "category": "metrics",
    "author": "analytics-labs/font",
    "source": "skills.sh/packs/font-mono-tabular-kpi",
    "installs": 29868,
    "command": "/font-mono",
    "tags": [
      "metrics",
      "font",
      "mono",
      "tabular",
      "kpi"
    ],
    "description": "Monospaced numbers formatted with commas and fixed-width alignment.",
    "content": "## SKILL: Tabular-Nums Metric Counter\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Tabular-Nums Metric Counter patterns across this section of the portfolio.\n2. Styling Guidelines: Monospaced numbers formatted with commas and fixed-width alignment.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "animated-radial-progress",
    "name": "Circular Metric Progress Gauge",
    "slug": "animated-radial-progress",
    "category": "motion",
    "author": "motion-physics/animated",
    "source": "skills.sh/packs/animated-radial-progress",
    "installs": 49674,
    "command": "/animated-radial",
    "tags": [
      "motion",
      "animated",
      "radial",
      "progress"
    ],
    "description": "SVG circle drawing animation displaying percentage completion or test coverage.",
    "content": "## SKILL: Circular Metric Progress Gauge\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Circular Metric Progress Gauge patterns across this section of the portfolio.\n2. Styling Guidelines: SVG circle drawing animation displaying percentage completion or test coverage.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "strategic-moat-pillars",
    "name": "3 Pillars of Strategic Advantage",
    "slug": "strategic-moat-pillars",
    "category": "strategy",
    "author": "operator-collective/strategic",
    "source": "skills.sh/packs/strategic-moat-pillars",
    "installs": 25844,
    "command": "/strategic-moat",
    "tags": [
      "strategy",
      "strategic",
      "moat",
      "pillars"
    ],
    "description": "Triptych card container outlining proprietary moat, speed, and distribution.",
    "content": "## SKILL: 3 Pillars of Strategic Advantage\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply 3 Pillars of Strategic Advantage patterns across this section of the portfolio.\n2. Styling Guidelines: Triptych card container outlining proprietary moat, speed, and distribution.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "dark-mode-code-diff",
    "name": "Side-by-Side Code Refactor Diff",
    "slug": "dark-mode-code-diff",
    "category": "design",
    "author": "design-systems/dark",
    "source": "skills.sh/packs/dark-mode-code-diff",
    "installs": 22236,
    "command": "/dark-mode",
    "tags": [
      "design",
      "dark",
      "mode",
      "code",
      "diff"
    ],
    "description": "Terminal diff display showing red removed lines and green optimized code.",
    "content": "## SKILL: Side-by-Side Code Refactor Diff\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Side-by-Side Code Refactor Diff patterns across this section of the portfolio.\n2. Styling Guidelines: Terminal diff display showing red removed lines and green optimized code.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  },
  {
    "id": "recruiter-quick-schedule",
    "name": "Instant 1-Click Meeting Scheduler",
    "slug": "recruiter-quick-schedule",
    "category": "strategy",
    "author": "operator-collective/recruiter",
    "source": "skills.sh/packs/recruiter-quick-schedule",
    "installs": 62556,
    "command": "/recruiter-quick",
    "tags": [
      "strategy",
      "recruiter",
      "quick",
      "schedule"
    ],
    "description": "Embedded calendar slot picker allowing recruiters to book executive dialogue.",
    "content": "## SKILL: Instant 1-Click Meeting Scheduler\nCRITICAL ARCHITECTURAL DIRECTIVES:\n1. Core Objective: Apply Instant 1-Click Meeting Scheduler patterns across this section of the portfolio.\n2. Styling Guidelines: Embedded calendar slot picker allowing recruiters to book executive dialogue.\n3. Structural Integration: Strictly inherit existing design variables (--bg, --surface, --line) and maintain mobile responsiveness.\n4. Professional Polish: No placeholder broken images, zero cliché corporate filler, and clear quantitative evidence."
  }
]
