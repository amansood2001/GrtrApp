'use client'

import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight, BarChart3, BriefcaseBusiness, Check, ChevronRight, CircleUserRound,
  Clipboard, CloudUpload, Code2, Copy, ExternalLink, FileText, Globe2, LayoutDashboard,
  Link2, Menu, MessageSquare, Monitor, Palette, Plus, Rocket, Search, Send,
  Smartphone, Sparkles, Target, TrendingUp, Upload, WandSparkles, X, Loader2, RefreshCw
} from 'lucide-react'
import { useState, useRef } from 'react'
import { CareerSignal } from './career-signal'
import { StudioChat, ProjectHighlights, portfolioPlaceholders } from './studio-interactions'
import { Button } from '@/components/ui/button'
import type { StrategicBlueprint, CaseStudyItem } from '@/lib/types'

const views = [
  { id: 1, short: 'Input', label: 'Input Studio', icon: FileText },
  { id: 2, short: 'Blueprint', label: 'Strategic Blueprint', icon: Target },
  { id: 3, short: 'Studio', label: 'Live Studio', icon: Code2 },
  { id: 4, short: 'Analytics', label: 'Portfolio Hub', icon: BarChart3 },
]

const designSystems = [
  { name: 'Material 3', maker: 'Google', mark: 'G', color: '#4285F4' },
  { name: 'Carbon', maker: 'IBM', mark: 'IB', color: '#8A3FFC' },
  { name: 'Fluent', maker: 'Microsoft', mark: 'M', color: '#2D7DFF' },
  { name: 'Cloudscape', maker: 'AWS', mark: 'A', color: '#FF9900' },
  { name: 'Primer', maker: 'GitHub', mark: 'GH', color: '#F0F6FC' },
]

function Header({
  active,
  setActive,
  applicationsCount = 3,
}: {
  active: number
  setActive: (n: number) => void
  applicationsCount?: number
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <header className="app-header">
      <button className="brand" onClick={() => setActive(1)} aria-label="Go to Input Studio">
        <span className="brand-name">Grtr</span>
        <span className="brand-trademark">TM</span>
      </button>
      <nav className="main-links" aria-label="Main navigation">
        <button onClick={() => setActive(1)}>New Application</button>
        <button onClick={() => setActive(4)}>
          My Applications <span>{applicationsCount}</span>
        </button>
        <button className="upgrade-link">Plus Plan</button>
      </nav>
      <nav className="view-switcher" aria-label="Demo views">
        {views.map(({ id, short, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={active === id ? 'active' : ''}
            aria-current={active === id ? 'page' : undefined}
          >
            <Icon aria-hidden="true" />
            <span className="step-number">{id}.</span>
            <span>{short}</span>
          </button>
        ))}
      </nav>
      <div className="profile">
        <span className="tier-badge">Plus</span>
        <button className="avatar" aria-label="Open profile menu">
          <CircleUserRound aria-label="Your profile" />
        </button>
      </div>
      <button
        className="mobile-menu"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-expanded={mobileOpen}
        aria-label="Toggle navigation"
      >
        <Menu />
      </button>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {views.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  setActive(id)
                  setMobileOpen(false)
                }}
                className={active === id ? 'active' : ''}
              >
                {id}. {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

interface UploadZoneProps {
  title: string
  subtitle: string
  file?: string
  loading?: boolean
  onFileSelect?: (file: File) => void
  onClear?: () => void
}

function UploadZone({ title, subtitle, file, loading, onFileSelect, onClear }: UploadZoneProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0] && onFileSelect) {
      onFileSelect(e.dataTransfer.files[0])
    }
  }

  return (
    <div
      className="upload-zone"
      tabIndex={0}
      role="button"
      aria-label={title}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => !file && fileRef.current?.click()}
    >
      <input
        ref={fileRef}
        type="file"
        hidden
        accept=".pdf,.docx,.doc,.txt"
        onChange={e => {
          if (e.target.files && e.target.files[0] && onFileSelect) {
            onFileSelect(e.target.files[0])
          }
        }}
      />
      <div className="upload-icon">
        {loading ? <Loader2 className="w-4 h-4 animate-spin text-purple-400" /> : <Upload />}
      </div>
      <div>
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
      {file ? (
        <div className="file-chip">
          <FileText />
          <span>{file}</span>
          <button
            aria-label="Remove file"
            onClick={e => {
              e.stopPropagation()
              onClear?.()
            }}
          >
            <X />
          </button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          onClick={e => {
            e.stopPropagation()
            fileRef.current?.click()
          }}
        >
          {loading ? 'Reading...' : 'Browse'}
        </Button>
      )}
    </div>
  )
}

interface InputStudioProps {
  resumeText: string
  resumeFileName: string
  onCvParsed: (text: string, filename: string) => void
  onCvCleared: () => void
  jobDescription: string
  setJobDescription: (val: string) => void
  selectedDesign: string
  setSelectedDesign: (val: string) => void
  onGenerate: () => void
  isGeneratingBlueprint: boolean
  error?: string | null
}

const communityTemplates = [
  {
    id: 'swiss-dossier',
    name: 'Minimalist Swiss Dossier',
    archetype: 'Grid Precision · High Density',
    styleClass: 'swiss',
    accentColor: '#e11d48',
    description: 'International Typographic Style with strict modular grids, monochrome hierarchy, and razor-thin borders.',
    directive: 'Swiss International style with strict grid alignment, bold sans-serif headlines (Instrument Sans), muted graphite rules, high information density, and restrained monochromatic accents.',
    bestFor: 'Founding Engineers, Research Principals, Systems Architects',
  },
  {
    id: 'kinetic-operator',
    name: 'Kinetic High-Growth Operator',
    archetype: 'Dark Obsidian · Dynamic Reveal Loops',
    styleClass: 'kinetic',
    accentColor: '#8b5cf6',
    description: 'Deep obsidian theme with ambient violet aura glow, metric callout counters, and interactive Framer Motion reveals.',
    directive: 'Executive high-growth operator portfolio with dark obsidian (#0C0D0E) theme, subtle violet-indigo radiant aura, staggered Framer Motion reveals, and prominent monospace metrics.',
    bestFor: 'VP Growth, Heads of Product, GTM Directors',
  },
  {
    id: 'luxury-monolith',
    name: 'Editorial Luxury Monolith',
    archetype: 'Dark Walnut · Instrument Serif Narrative',
    styleClass: 'editorial',
    accentColor: '#d4af37',
    description: 'Warm dark editorial tone with bespoke serif pull-quotes, generous magazine whitespace, and long-form narrative pacing.',
    directive: 'Luxury editorial dossier with dark walnut and warm muted tones, bespoke Instrument Serif pull-quotes, generous magazine margins, and narrative case study presentation.',
    bestFor: 'Managing Directors, Executive Partners, Strategic Counsel',
  },
  {
    id: 'systems-terminal',
    name: 'Quantitative Systems Terminal',
    archetype: 'Financial Telemetry · Tabular Precision',
    styleClass: 'terminal',
    accentColor: '#10b981',
    description: 'Bloomberg-inspired density, tabular data streams, JetBrains Mono font, and sharp high-contrast ROI proof matrices.',
    directive: 'High-precision financial systems terminal aesthetic with dense tabular alignment, JetBrains Mono font, muted cyan/emerald telemetry accents, and structured ROI proof tables.',
    bestFor: 'Quantitative Analysts, Macro Researchers, Finance Executives',
  },
]

const visualMoods = [
  {
    id: 'minimal-monochrome',
    name: 'Minimal Monochrome',
    tag: 'Pure Grayscale & Restraint',
    palette: ['#09090b', '#27272a', '#71717a', '#f4f4f5'],
    directive: 'Restrained monochromatic minimalism with pure grayscale hierarchy, zero extraneous decoration, razor-thin 1px borders, and pure typographic clarity.',
  },
  {
    id: 'high-tech-cyber',
    name: 'High-Tech Obsidian & Aura',
    tag: 'Space Obsidian & Violet Aurora',
    palette: ['#08090a', '#1e1b4b', '#8b5cf6', '#38bdf8'],
    directive: 'Deep obsidian glassmorphism with subtle 1px border glows, radial violet aurora backdrops, monospace metrics, and smooth Framer Motion spring physics.',
  },
  {
    id: 'luxury-editorial',
    name: 'Luxury Editorial & Serif',
    tag: 'Warm Walnut & Sandstone Serif',
    palette: ['#141312', '#292524', '#d4af37', '#fafaf9'],
    directive: 'Editorial luxury aesthetic with dark walnut and warm cream tones, bespoke Instrument Serif typography, generous magazine margins, and editorial essay card structures.',
  },
  {
    id: 'architectural-grid',
    name: 'Architectural Grid & Structure',
    tag: 'Strict Structural Wireframe',
    palette: ['#0c0d0e', '#27272a', '#f43f5e', '#fafafa'],
    directive: 'Architectural grid system with visible structural rules, bold high-contrast section anchors, angular containers, and strict modular discipline.',
  },
]

function InputStudio({
  resumeText,
  resumeFileName,
  onCvParsed,
  onCvCleared,
  jobDescription,
  setJobDescription,
  selectedDesign,
  setSelectedDesign,
  onGenerate,
  isGeneratingBlueprint,
  error,
}: InputStudioProps) {
  const [jdMode, setJdMode] = useState<'text' | 'file'>('text')
  const [designTab, setDesignTab] = useState('systems')
  const [templateFilter, setTemplateFilter] = useState('All')
  const [templateSearch, setTemplateSearch] = useState('')
  const [parsingCv, setParsingCv] = useState(false)
  const [parsingJd, setParsingJd] = useState(false)

  const handleResumeUpload = async (file: File) => {
    try {
      setParsingCv(true)
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/parse-cv', {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()
      if (data.success && data.text) {
        onCvParsed(data.text, data.filename || file.name)
      } else {
        alert(data.error || 'Failed to parse resume document')
      }
    } catch (err: unknown) {
      alert('Upload failed: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setParsingCv(false)
    }
  }

  const handleJdUpload = async (file: File) => {
    try {
      setParsingJd(true)
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/parse-cv', {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()
      if (data.success && data.text) {
        setJobDescription(data.text)
        setJdMode('text')
      } else {
        alert(data.error || 'Failed to parse job description')
      }
    } catch (err: unknown) {
      alert('Upload failed: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setParsingJd(false)
    }
  }

  const hasInputs = resumeText.trim().length > 0 && jobDescription.trim().length > 0

  const filteredTemplates = communityTemplates.filter(t => {
    const matchesFilter =
      templateFilter === 'All' ||
      (templateFilter === 'Landing' && (t.id === 'kinetic-operator' || t.id === 'systems-terminal')) ||
      (templateFilter === 'Editorial' && (t.id === 'swiss-dossier' || t.id === 'luxury-monolith'))
    const matchesSearch =
      t.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
      t.archetype.toLowerCase().includes(templateSearch.toLowerCase()) ||
      t.description.toLowerCase().includes(templateSearch.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Determine active directive text to show the user
  const activeTemplate = communityTemplates.find(t => t.name === selectedDesign)
  const activeMood = visualMoods.find(m => m.name === selectedDesign)
  const activePromptDirective = activeTemplate?.directive || activeMood?.directive

  return (
    <div className="view-shell input-view">
      <div id="input-workspace" className="workspace-heading">
        <div>
          <h1>Input studio</h1>
          <p>Your experience, shaped for your next role.</p>
        </div>
        <CareerSignal />
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex items-center justify-between">
          <span>{error}</span>
        </div>
      )}

      <div className="input-grid">
        <section className="panel input-panel">
          <div className="panel-title">
            <div>
              <h2>Target application data</h2>
              <p>Your documents stay private and are only used for this application.</p>
            </div>
          </div>
          <label className="field-label">Resume or CV</label>
          <UploadZone
            title={resumeFileName ? 'Resume loaded' : 'Drop your resume here'}
            subtitle={resumeText ? `${resumeText.length.toLocaleString()} characters extracted` : 'PDF or DOCX · Max 10MB'}
            file={resumeFileName}
            loading={parsingCv}
            onFileSelect={handleResumeUpload}
            onClear={onCvCleared}
          />

          <div className="field-row">
            <label className="field-label">Target job description</label>
            <div className="mini-toggle">
              <button
                type="button"
                onClick={() => setJdMode('text')}
                className={jdMode === 'text' ? 'active' : ''}
              >
                <Link2 />
                Paste / Link
              </button>
              <button
                type="button"
                onClick={() => setJdMode('file')}
                className={jdMode === 'file' ? 'active' : ''}
              >
                <FileText />
                Upload
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {jdMode === 'text' ? (
              <motion.div
                key="text"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <textarea
                  className="jd-textarea"
                  aria-label="Job description"
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description, requirements, or role brief..."
                />
                <div className="input-meta">
                  <span>
                    <Check />
                    {jobDescription.trim().length > 15 ? 'Target role signals active' : 'Enter target role & company requirements'}
                  </span>
                  <span>{jobDescription.length.toLocaleString()} characters</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="file"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <UploadZone
                  title="Upload job description"
                  subtitle="PDF, DOCX or TXT · Max 10MB"
                  loading={parsingJd}
                  onFileSelect={handleJdUpload}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="panel design-panel">
          <div className="panel-title">
            <div>
              <h2>Choose a design foundation</h2>
              <p>Pick the visual language for your role-winning portfolio.</p>
            </div>
          </div>
          <div className="design-tabs" role="tablist">
            {[
              ['systems', 'Systems'],
              ['templates', 'Templates'],
              ['moods', 'Moods'],
              ['custom', 'Custom'],
            ].map(([id, label]) => (
              <button
                role="tab"
                aria-selected={designTab === id}
                key={id}
                onClick={() => setDesignTab(id)}
                className={designTab === id ? 'active' : ''}
              >
                {label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={designTab}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="design-content"
            >
              {designTab === 'systems' && (
                <div className="system-grid">
                  {designSystems.map(d => (
                    <button
                      key={d.name}
                      onClick={() => setSelectedDesign(d.name)}
                      className={`design-card ${selectedDesign === d.name ? 'selected beam' : ''}`}
                    >
                      <span className="system-logo" style={{ '--logo-color': d.color } as React.CSSProperties}>
                        {d.mark}
                      </span>
                      <span>
                        <strong>{d.name}</strong>
                        <small>{d.maker} design system</small>
                      </span>
                      {selectedDesign === d.name && <Check className="selected-check" />}
                    </button>
                  ))}
                </div>
              )}

              {designTab === 'templates' && (
                <>
                  <div className="template-tools">
                    <div>
                      <Search className="w-3 h-3 text-muted" />
                      <input
                        aria-label="Search templates"
                        placeholder="Search curated templates..."
                        value={templateSearch}
                        onChange={e => setTemplateSearch(e.target.value)}
                      />
                    </div>
                    {['All', 'Landing', 'Editorial'].map(cat => (
                      <button
                        key={cat}
                        className={templateFilter === cat ? 'active' : ''}
                        onClick={() => setTemplateFilter(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="template-grid">
                    {filteredTemplates.map(t => {
                      const isSelected = selectedDesign === t.name
                      return (
                        <div
                          key={t.id}
                          onClick={() => setSelectedDesign(t.name)}
                          className={`curated-template-card ${isSelected ? 'selected' : ''}`}
                        >
                          <div className={`template-visual ${t.styleClass}`}>
                            <div className="flex items-center justify-between text-[8px] font-mono opacity-60">
                              <span>{t.archetype}</span>
                              <span style={{ color: t.accentColor }}>●</span>
                            </div>
                            <div className="my-auto">
                              <span className="text-[11px] font-serif tracking-tight block text-white/90">
                                {t.id === 'swiss-dossier' && '01 // EXECUTIVE DOSSIER'}
                                {t.id === 'kinetic-operator' && '+142% PIPELINE ACCELERATION'}
                                {t.id === 'luxury-monolith' && '“Turning product into market dominance.”'}
                                {t.id === 'systems-terminal' && 'SYS_STATUS: VERIFIED [99.4%]'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-[7px] text-muted">
                              <span>Curated Community</span>
                              {isSelected && <Check className="w-3 h-3 text-purple-400" />}
                            </div>
                          </div>
                          <strong className="text-xs text-white block mb-0.5">{t.name}</strong>
                          <p className="text-[10px] text-muted leading-tight mb-1.5">{t.description}</p>
                          <div className="mt-auto pt-1 border-t border-white/5 flex items-center justify-between text-[8px] text-muted font-mono">
                            <span>Best for: {t.bestFor.split(',')[0]}</span>
                            <span className="text-purple-400">Select →</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {activeTemplate && (
                    <div className="prompt-directive-preview">
                      <span className="text-muted block text-[9px] uppercase tracking-wider mb-1 font-mono">
                        Prompt Directive to v0 Builder:
                      </span>
                      &quot;{activeTemplate.directive}&quot;
                    </div>
                  )}
                </>
              )}

              {designTab === 'moods' && (
                <>
                  <div className="mood-grid">
                    {visualMoods.map(m => {
                      const isSelected = selectedDesign === m.name
                      return (
                        <div
                          key={m.id}
                          onClick={() => setSelectedDesign(m.name)}
                          className={`curated-mood-card ${isSelected ? 'selected' : ''}`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <strong className="text-xs text-white block">{m.name}</strong>
                              <small className="text-[9px] text-muted block font-mono mt-0.5">{m.tag}</small>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-purple-400" />}
                          </div>

                          <div className="mood-palette-dots">
                            {m.palette.map((color, i) => (
                              <span key={i} style={{ backgroundColor: color }} title={color} />
                            ))}
                          </div>

                          <div className="mt-2 pt-1 border-t border-white/5 flex items-center justify-between text-[8px] text-purple-400 font-mono">
                            <span>Inspect direction</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {activeMood && (
                    <div className="prompt-directive-preview">
                      <span className="text-muted block text-[9px] uppercase tracking-wider mb-1 font-mono">
                        Active Mood Directive to v0:
                      </span>
                      &quot;{activeMood.directive}&quot;
                    </div>
                  )}
                </>
              )}

              {designTab === 'custom' && (
                <div className="custom-prompt">
                  <textarea
                    aria-label="Custom design direction"
                    value={selectedDesign.startsWith('Custom: ') ? selectedDesign.replace('Custom: ', '') : ''}
                    placeholder="Describe your custom visual direction — e.g. An understated, high-density engineering dossier with Swiss grid layout, muted slate palette, monospace code snippets for technical metrics, and subtle scroll-linked typography reveals..."
                    onChange={e => setSelectedDesign(`Custom: ${e.target.value}`)}
                    className="min-h-[160px]"
                  />
                  <div className="mt-2 text-[10px] text-muted font-mono flex items-center justify-between">
                    <span>Direct prompt injection into v0 builder</span>
                    <span>Fully editable anytime</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      <div className="executive-generate-bar">
        <div className="flex items-center gap-2 text-xs text-muted font-mono">
          <span className={`w-2 h-2 rounded-full transition-all duration-300 ${hasInputs ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-zinc-600'}`} />
          <span>
            {hasInputs ? 'Inputs verified · AI Strategist ready' : 'Upload resume & enter job description to unlock blueprint'}
          </span>
        </div>

        <button
          onClick={onGenerate}
          disabled={!hasInputs || isGeneratingBlueprint}
          className="executive-cta-button group"
        >
          {isGeneratingBlueprint ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
              <span>Synthesizing Strategic Blueprint…</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-purple-400 transition-transform group-hover:scale-110" />
              <span>Generate Strategic Blueprint</span>
              <ArrowRight className="w-4 h-4 text-white/70 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>

        <span className="text-[10px] text-muted font-mono">
          ⚡ Ready in ~2 seconds · No credits wasted · Pre-flight verified
        </span>
      </div>
    </div>
  )
}

interface BlueprintProps {
  blueprint: StrategicBlueprint
  onBack: () => void
  onBuild: () => void
  isBuildingPortfolio: boolean
  onUpdateHook: (newHook: string) => void
}

function Blueprint({
  blueprint,
  onBack,
  onBuild,
  isBuildingPortfolio,
  onUpdateHook,
}: BlueprintProps) {
  const [direction, setDirection] = useState(0)
  const directions = blueprint.directions || []
  const activeDirection = directions[direction] || directions[0]

  return (
    <div className="view-shell blueprint-view">
      <div className="blueprint-top">
        <div>
          <span className="eyebrow">Pre-flight strategy</span>
          <h1>Your strongest route to the role.</h1>
        </div>
        <div className="match-score">
          <span>{blueprint.matchScore || 94}</span>
          <div>
            <strong>%</strong>
            <small>Strategic match</small>
          </div>
        </div>
      </div>
      <div className="blueprint-layout">
        <div className="blueprint-main">
          <section className="strategy-card hero-strategy beam">
            <div className="strategy-label">
              AI positioning hook <button>Edit</button>
            </div>
            <textarea
              aria-label="Positioning hook"
              value={blueprint.positioningHook}
              onChange={e => onUpdateHook(e.target.value)}
            />
            <div className="confidence">
              <Sparkles />
              Distinctive, specific, and supported by verified proof points in your CV
            </div>
          </section>

          <section className="strategy-card">
            <div className="strategy-label">Company research &amp; right-to-win angle</div>
            <div className="direction-pills">
              {directions.map((d, i) => (
                <button
                  key={d.angle || i}
                  onClick={() => setDirection(i)}
                  className={direction === i ? 'active' : ''}
                >
                  {d.angle}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={direction}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="deep-dive"
              >
                <div>
                  <small>Observed challenge</small>
                  <p>{activeDirection?.observedChallenge}</p>
                </div>
                <ChevronRight />
                <div>
                  <small>Proposed strategy</small>
                  <p>{activeDirection?.proposedStrategy}</p>
                </div>
                <ChevronRight />
                <div className="win-proof">
                  <small>Your right to win</small>
                  <p>{activeDirection?.rightToWinProof}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <input className="custom-direction" placeholder="Or specify a custom strategic direction..." />
          </section>

          <section className="strategy-card">
            <div className="strategy-label">
              Prioritized case studies <button>Reorder</button>
            </div>
            <ProjectHighlights caseStudies={blueprint.caseStudies} />
          </section>
        </div>

        <aside className="blueprint-aside">
          <div className="target-card">
            <small>Target brief</small>
            <h3>{blueprint.targetRole}</h3>
            <p>{blueprint.targetCompany}</p>
            <div>
              <span>Role fit</span>
              <strong>{blueprint.fitStats?.roleFit || 'Exceptional'}</strong>
            </div>
            <div>
              <span>Evidence coverage</span>
              <strong>{blueprint.fitStats?.evidenceCoverage || '8 / 9'}</strong>
            </div>
            <div>
              <span>Design foundation</span>
              <strong>{blueprint.fitStats?.designFoundation || 'IBM Carbon'}</strong>
            </div>
          </div>
          <div className="motion-card">
            <div className="orb-preview">
              <span />
              <span />
              <span />
            </div>
            <small>Motion narrative</small>
            <h3>{blueprint.motionNarrative?.headline || 'Signal → System → Scale'}</h3>
            <p>{blueprint.motionNarrative?.detail || 'Subtle reveals guide recruiters from thesis to evidence without distraction.'}</p>
          </div>
        </aside>
      </div>

      <div className="sticky-footer">
        <Button variant="outline" onClick={onBack} disabled={isBuildingPortfolio}>
          Refine inputs
        </Button>
        <div>
          <span>Strategy is fully editable in Live Studio</span>
          <Button
            className="primary-cta"
            onClick={onBuild}
            disabled={isBuildingPortfolio}
          >
            {isBuildingPortfolio ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" data-icon="inline-start" />
                Building Portfolio Sandbox...
              </>
            ) : (
              <>
                <Rocket data-icon="inline-start" />
                Approve &amp; build portfolio <ArrowRight data-icon="inline-end" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

function DynamicPortfolioFallback({ blueprint }: { blueprint: StrategicBlueprint }) {
  const primaryMetric = blueprint.caseStudies?.[0]?.metric || '+142%'
  const secondMetric = blueprint.caseStudies?.[1]?.metric || '3.4×'
  const thirdMetric = blueprint.caseStudies?.[2]?.metric || '−31%'

  return (
    <div className="portfolio-preview">
      <nav>
        <strong>
          <CircleUserRound aria-label="Your profile" />
          <span>{blueprint.candidateName || 'Grtr'}</span>
        </strong>
        <div>
          <span>Approach</span>
          <span>Work</span>
          <span>About</span>
        </div>
        <button>
          Let&apos;s talk <ArrowRight />
        </button>
      </nav>
      <section className="preview-hero">
        <div className="availability">
          <span />
          {blueprint.targetRole} · {blueprint.targetCompany}
        </div>
        <h2>
          {blueprint.positioningHook}
        </h2>
        <p>
          Executive operator for {blueprint.targetCompany}. Proven systems, category positioning, and compounding execution.
        </p>
        <div>
          <button>
            Explore my approach <ArrowRight />
          </button>
          <span>Available Worldwide</span>
        </div>
      </section>
      <section className="teardown">
        <small>{blueprint.targetCompany} Strategic Teardown</small>
        <div>
          <h3>
            Execution doesn&apos;t need more noise.
            <br />
            It needs a sharper signal.
          </h3>
          <p>
            {blueprint.directions?.[0]?.observedChallenge}
          </p>
        </div>
        <div className="teardown-cards">
          {blueprint.directions?.map((d, i) => (
            <article key={i}>
              <strong>{d.angle}</strong>
              <p>{d.proposedStrategy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="preview-metrics">
        <div>
          <strong>{primaryMetric}</strong>
          <span>{blueprint.caseStudies?.[0]?.metricLabel || 'Pipeline growth'}</span>
        </div>
        <div>
          <strong>{secondMetric}</strong>
          <span>{blueprint.caseStudies?.[1]?.metricLabel || 'Revenue Velocity'}</span>
        </div>
        <div>
          <strong>{thirdMetric}</strong>
          <span>{blueprint.caseStudies?.[2]?.metricLabel || 'Efficiency'}</span>
        </div>
      </section>
    </div>
  )
}

function PublishModal({
  close,
  blueprint,
}: {
  close: () => void
  blueprint?: StrategicBlueprint | null
}) {
  const [copied, setCopied] = useState(false)
  const candidateSlug = blueprint?.candidateName
    ? blueprint.candidateName.toLowerCase().replace(/[^a-z0-9]/g, '')
    : 'leader'
  const companySlug = blueprint?.targetCompany
    ? blueprint.targetCompany.toLowerCase().replace(/[^a-z0-9]/g, '')
    : 'target'
  const shareUrl = `grtr.app/p/${candidateSlug}/${companySlug}`

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={close}
    >
      <motion.div
        className="publish-modal beam"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        onMouseDown={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="publish-title"
      >
        <button className="modal-close" onClick={close} aria-label="Close">
          <X />
        </button>
        <span className="eyebrow">Ready to go live</span>
        <h2 id="publish-title">Publish your portfolio</h2>
        <p>Choose how recruiters and hiring committees will experience your new portfolio.</p>
        <div className="plan-grid">
          <section className="plan-card">
            <div className="plan-name">
              <span>Plus</span>
              <small>Included in your plan</small>
            </div>
            <h3>Your Grtr URL</h3>
            <div className="url-box">
              <Globe2 />
              <span>{shareUrl}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://${shareUrl}`)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
                aria-label="Copy URL"
              >
                {copied ? <Check /> : <Copy />}
              </button>
            </div>
            <ul>
              <li>
                <Check />
                Instantly live &amp; indexable
              </li>
              <li>
                <Check />
                Unlimited portfolio updates
              </li>
              <li>
                <Check />
                Dedicated QR code sharing
              </li>
            </ul>
            <Button
              variant="outline"
              className="full-button"
              onClick={() => {
                alert(`Published to https://${shareUrl}!`)
                close()
              }}
            >
              <Rocket data-icon="inline-start" />
              Publish with Plus
            </Button>
          </section>
          <section className="plan-card pro">
            <div className="recommended">RECOMMENDED</div>
            <div className="plan-name">
              <span>Pro</span>
              <small>Upgrade for full control</small>
            </div>
            <h3>Own your presence</h3>
            <div className="domain-box">
              <Globe2 />
              <div>
                <small>Custom domain</small>
                <strong>{candidateSlug}.com/{companySlug}</strong>
              </div>
            </div>
            <ul>
              <li>
                <Check />
                Custom domain &amp; automated SSL
              </li>
              <li>
                <Check />
                Live recruiter tracking &amp; alerts
              </li>
              <li>
                <Check />
                Per-section content heatmaps
              </li>
            </ul>
            <Button className="full-button primary-cta">
              Upgrade to Pro <ArrowRight data-icon="inline-end" />
            </Button>
          </section>
        </div>
        <div className="dns-helper">
          <span>
            <Check />
            DNS verification handled for you
          </span>
          <small>Add one CNAME record — typically live in under 10 minutes.</small>
        </div>
      </motion.div>
    </motion.div>
  )
}

interface LiveStudioProps {
  blueprint: StrategicBlueprint | null
  chatId: string | null
  previewUrl: string | null
  selectedDesign: string
}

function LiveStudio({
  blueprint,
  chatId,
  previewUrl,
  selectedDesign,
}: LiveStudioProps) {
  const [publish, setPublish] = useState(false)
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop')
  const [mobileTab, setMobileTab] = useState<'chat' | 'preview'>('preview')
  const [iframeKey, setIframeKey] = useState(0)

  const reloadPreview = () => {
    setIframeKey(k => k + 1)
  }

  const roleText = blueprint?.targetRole || 'Executive Candidate'
  const companyText = blueprint?.targetCompany || 'Target Company'

  return (
    <div className="studio-view">
      <div className="mobile-studio-toggle">
        <button
          onClick={() => setMobileTab('chat')}
          className={mobileTab === 'chat' ? 'active' : ''}
        >
          <MessageSquare />
          Chat
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={mobileTab === 'preview' ? 'active' : ''}
        >
          <Monitor />
          Preview
        </button>
      </div>

      <aside className={`chat-pane ${mobileTab === 'chat' ? 'mobile-show' : ''}`}>
        <div className="chat-head">
          <div className="ai-avatar">
            <Sparkles />
          </div>
          <div>
            <strong>Grtr Strategist</strong>
            <span>
              <i />
              Online · {chatId ? 'Live Sandbox Connected' : 'Ready'}
            </span>
          </div>
          <button aria-label="Refresh preview" onClick={reloadPreview} title="Reload live preview">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="chat-context">
          <span>Context</span>
          <strong>
            {roleText} · {companyText}
          </strong>
          <small>{selectedDesign} · Executive / Strategic</small>
        </div>
        <StudioChat
          chatId={chatId}
          onUpdatePreview={reloadPreview}
          contextLabel={`${roleText} @ ${companyText}`}
        />
      </aside>

      <main className={`preview-pane ${mobileTab === 'preview' ? 'mobile-show' : ''}`}>
        <div className="studio-toolbar">
          <div>
            <span className="status-dot" />
            {chatId ? 'Live Sandbox Active' : 'All changes saved'}
          </div>
          <div className="toolbar-actions">
            <div className="viewport-toggle">
              <button
                onClick={() => setViewport('mobile')}
                className={viewport === 'mobile' ? 'active' : ''}
                aria-label="Mobile preview"
              >
                <Smartphone />
              </button>
              <button
                onClick={() => setViewport('desktop')}
                className={viewport === 'desktop' ? 'active' : ''}
                aria-label="Desktop preview"
              >
                <Monitor />
              </button>
            </div>
            <span className="system-badge">
              <b>{selectedDesign}</b>
            </span>
            <Button onClick={() => setPublish(true)} className="publish-button">
              <Rocket data-icon="inline-start" />
              Publish
            </Button>
          </div>
        </div>

        <div className="preview-canvas">
          <div
            className={`preview-frame ${viewport}`}
            style={{ width: viewport === 'mobile' ? 375 : '100%', minHeight: '680px' }}
          >
            <div className="browser-bar">
              <span />
              <span />
              <span />
              <div>
                grtr.app/p/{blueprint?.candidateName?.toLowerCase().replace(/\s+/g, '') || 'candidate'}/
                {blueprint?.targetCompany?.toLowerCase().replace(/\s+/g, '') || 'role'}
              </div>
            </div>

            {previewUrl ? (
              <iframe
                key={iframeKey}
                src={previewUrl}
                title="Live Portfolio Sandbox"
                className="w-full h-[calc(100vh-230px)] min-h-[640px] border-0 bg-[#08090a]"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              />
            ) : blueprint ? (
              <DynamicPortfolioFallback blueprint={blueprint} />
            ) : (
              <div className="portfolio-preview p-12 text-center text-muted">
                <p>Generating live portfolio sandbox...</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {publish && <PublishModal close={() => setPublish(false)} blueprint={blueprint} />}
      </AnimatePresence>
    </div>
  )
}

interface ApplicationItem {
  role: string
  company: string
  url: string
  plan: string
  views: number
  time: string
  last: string
  color: string
}

const initialApplications: ApplicationItem[] = [
  { role: 'VP, Growth', company: 'Northstar Labs', url: 'grtr.app/p/you/northstar', plan: 'Plus', views: 32, time: '4m 15s', last: '14 min ago', color: '#8b5cf6' },
  { role: 'Product Strategy Lead', company: 'Vertex AI', url: 'yourname.com/vertex', plan: 'Pro', views: 28, time: '3m 40s', last: '2 hours ago', color: '#4285f4' },
  { role: 'GTM Director', company: 'Atlas Commerce', url: 'grtr.app/p/you/atlas', plan: 'Plus', views: 14, time: '2m 50s', last: 'Yesterday', color: '#f97316' },
]

function AnalyticsView({
  openStudio,
  applications,
}: {
  openStudio: () => void
  applications: ApplicationItem[]
}) {
  const [selected, setSelected] = useState(0)
  const app = applications[selected] || applications[0]

  return (
    <div className="view-shell analytics-view">
      <div className="dashboard-head">
        <div>
          <span className="eyebrow">Portfolio intelligence</span>
          <h1>Applications</h1>
          <p>Build deliberately. See what resonates. Improve every application.</p>
        </div>
        <Button onClick={openStudio} className="primary-cta">
          <Plus data-icon="inline-start" />
          New portfolio
        </Button>
      </div>

      <div className="metric-grid">
        {[
          [BriefcaseBusiness, String(applications.length), 'Applications built', '+1 this month'],
          [CircleUserRound, '74', 'Recruiter views', '+18% this week'],
          [TrendingUp, '3m 38s', 'Avg. dwell time', 'Top 12%'],
          [Globe2, '1', 'Custom domain', 'Active'],
        ].map(([Icon, val, label, trend]) => (
          <article className="metric-card" key={String(label)}>
            <div>
              <span>
                <Icon />
              </span>
              <small>{label as string}</small>
            </div>
            <strong>{val as string}</strong>
            <p>{trend as string}</p>
          </article>
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="applications-panel">
          <div className="list-head">
            <div>
              <h2>Tailored applications</h2>
              <p>Every role, one purpose-built story.</p>
            </div>
            <button>
              <Search />
              Search
            </button>
          </div>
          <div className="app-list">
            {applications.map((a, i) => (
              <button
                key={a.company + i}
                className={`app-row ${selected === i ? 'selected' : ''}`}
                onClick={() => setSelected(i)}
              >
                <span className="company-mark" style={{ '--company-color': a.color } as React.CSSProperties}>
                  {a.company.slice(0, 1)}
                </span>
                <div className="app-primary">
                  <strong>{a.role}</strong>
                  <span>{a.company}</span>
                  <small>
                    <Link2 />
                    {a.url}
                  </small>
                </div>
                <span className={`plan-pill ${a.plan.toLowerCase()}`}>
                  {a.plan}
                  {a.plan === 'Pro' && <i />}
                </span>
                <div className="app-stat">
                  <strong>{a.views}</strong>
                  <small>views</small>
                </div>
                <div className="app-stat">
                  <strong>{a.time}</strong>
                  <small>avg. time</small>
                </div>
                <div className="last-view">
                  <span>{a.last}</span>
                  <small>last viewed</small>
                </div>
                <ChevronRight />
              </button>
            ))}
          </div>
        </section>

        <aside className="intel-panel">
          <div className="intel-head">
            <div>
              <span className="company-mark" style={{ '--company-color': app.color } as React.CSSProperties}>
                {app.company.slice(0, 1)}
              </span>
              <div>
                <small>Recruiter intelligence</small>
                <h2>{app.company}</h2>
              </div>
            </div>
            <button aria-label="Open portfolio">
              <ExternalLink />
            </button>
          </div>
          <div className="heatmap">
            <div>
              <span>Content heatmap</span>
              <strong>84% engaged</strong>
            </div>
            <div className="heat-bars">
              <span style={{ width: '92%' }} />
              <span style={{ width: '84%' }} />
              <span style={{ width: '62%' }} />
              <span style={{ width: '38%' }} />
            </div>
            <div className="heat-labels">
              <span>Hero</span>
              <span>Strategy</span>
              <span>Case studies</span>
              <span>About</span>
            </div>
          </div>
          <div className="intel-feed">
            <h3>Recent activity</h3>
            <article>
              <span />
              <div>
                <p>
                  A recruiter in <strong>New York, US</strong> viewed your strategic teardown.
                </p>
                <small>14 minutes ago · 3m 42s session</small>
              </div>
            </article>
            <article>
              <span />
              <div>
                <p>
                  Return visit to your <strong>Category Creation</strong> case study.
                </p>
                <small>2 hours ago · Direct link</small>
              </div>
            </article>
            <article>
              <span className="muted" />
              <div>
                <p>Your portfolio was shared through a private link.</p>
                <small>Yesterday · 2 new visitors</small>
              </div>
            </article>
          </div>
          <Button variant="outline" className="full-button" onClick={openStudio}>
            Open Live Studio <ArrowRight data-icon="inline-end" />
          </Button>
        </aside>
      </div>
    </div>
  )
}

export function GrtrApp() {
  const [active, setActive] = useState(1)

  // Application State
  const [resumeText, setResumeText] = useState('')
  const [resumeFileName, setResumeFileName] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [selectedDesign, setSelectedDesign] = useState('Carbon')

  // Pipeline State
  const [isGeneratingBlueprint, setIsGeneratingBlueprint] = useState(false)
  const [isBuildingPortfolio, setIsBuildingPortfolio] = useState(false)
  const [blueprint, setBlueprint] = useState<StrategicBlueprint | null>(null)
  const [chatId, setChatId] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Tracked Applications
  const [applications, setApplications] = useState<ApplicationItem[]>(initialApplications)

  // Handler: Parse CV
  const handleCvParsed = (text: string, filename: string) => {
    setResumeText(text)
    setResumeFileName(filename)
    setErrorMessage(null)
  }

  const handleCvCleared = () => {
    setResumeText('')
    setResumeFileName('')
  }

  // Handler: Generate Blueprint (Stage 1)
  const handleGenerateBlueprint = async () => {
    try {
      setIsGeneratingBlueprint(true)
      setErrorMessage(null)

      const res = await fetch('/api/blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          designSystem: selectedDesign,
        }),
      })

      const data = await res.json()
      if (data.success && data.blueprint) {
        setBlueprint(data.blueprint)
        setActive(2) // Advance to Stage 2: Blueprint
      } else {
        setErrorMessage(data.error || 'Failed to generate blueprint')
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Network error')
    } finally {
      setIsGeneratingBlueprint(false)
    }
  }

  // Handler: Build Portfolio on v0 (Stage 2)
  const handleBuildPortfolio = async () => {
    if (!blueprint) return

    try {
      setIsBuildingPortfolio(true)
      setErrorMessage(null)

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blueprint,
          designSystem: selectedDesign,
        }),
      })

      const data = await res.json()
      if (data.success && data.chatId) {
        setChatId(data.chatId)
        setPreviewUrl(data.previewUrl || `/api/preview/${data.chatId}`)

        // Add to applications list
        const newApp: ApplicationItem = {
          role: blueprint.targetRole || 'Growth Executive',
          company: blueprint.targetCompany || 'Target Enterprise',
          url: `grtr.app/p/${blueprint.candidateName.toLowerCase().replace(/\s+/g, '')}/${blueprint.targetCompany.toLowerCase().replace(/\s+/g, '')}`,
          plan: 'Plus',
          views: 1,
          time: 'Just now',
          last: 'Live now',
          color: '#8b5cf6',
        }
        setApplications(prev => [newApp, ...prev])

        setActive(3) // Advance to Stage 3: Live Studio
      } else {
        alert(data.error || 'Generation failed on v0')
      }
    } catch (err: unknown) {
      alert('Build failed: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setIsBuildingPortfolio(false)
    }
  }

  const handleUpdateHook = (newHook: string) => {
    if (blueprint) {
      setBlueprint({ ...blueprint, positioningHook: newHook })
    }
  }

  return (
    <div className="grtr-app">
      <div className="ambient-bg" aria-hidden="true" />
      <Header
        active={active}
        setActive={setActive}
        applicationsCount={applications.length}
      />
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {active === 1 && (
            <InputStudio
              resumeText={resumeText}
              resumeFileName={resumeFileName}
              onCvParsed={handleCvParsed}
              onCvCleared={handleCvCleared}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              selectedDesign={selectedDesign}
              setSelectedDesign={setSelectedDesign}
              onGenerate={handleGenerateBlueprint}
              isGeneratingBlueprint={isGeneratingBlueprint}
              error={errorMessage}
            />
          )}
          {active === 2 && blueprint && (
            <Blueprint
              blueprint={blueprint}
              onBack={() => setActive(1)}
              onBuild={handleBuildPortfolio}
              isBuildingPortfolio={isBuildingPortfolio}
              onUpdateHook={handleUpdateHook}
            />
          )}
          {active === 3 && (
            <LiveStudio
              blueprint={blueprint}
              chatId={chatId}
              previewUrl={previewUrl}
              selectedDesign={selectedDesign}
            />
          )}
          {active === 4 && (
            <AnalyticsView
              openStudio={() => setActive(1)}
              applications={applications}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
