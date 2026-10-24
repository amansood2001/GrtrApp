'use client'

import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight, BarChart3, BriefcaseBusiness, Check, ChevronRight, CircleUserRound,
  Clipboard, CloudUpload, Code2, Copy, ExternalLink, FileText, Globe2, LayoutDashboard,
  Link2, Menu, MessageSquare, Monitor, Palette, Plus, Rocket, Search, Send,
  Smartphone, Sparkles, Target, TrendingUp, Upload, WandSparkles, X, Loader2, RefreshCw
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
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

export interface CommunityTemplate {
  id: string
  name: string
  archetype: string
  category: 'Developer' | 'Executive' | 'Design'
  imageUrl: string
  siteUrl: string
  description: string
  directive: string
  bestFor: string
  author?: string
}

const communityTemplates: CommunityTemplate[] = [
  {
    id: 'RKiDa7imLjw',
    name: 'COMPUTE — AI Platform Template',
    archetype: 'Dark Glass · High-Tech Velocity',
    category: 'Developer',
    imageUrl: 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot-2026-01-01-at-11.11.58%E2%80%AFAM-75MGc9XubNCPsB6ffBLtDmtgq4sHDm.jpg',
    siteUrl: 'https://compute-the-platform-to-build-ship-ai-agents-k2gt4ri9.v0.build',
    description: 'High-velocity AI agent platform template featuring deep obsidian glass, live interactive telemetry controls, and sleek modern typography.',
    directive: 'Seed workspace chat duplicate from RKiDa7imLjw',
    bestFor: 'Founding GTM, Product Leads & Systems Architects',
    author: 'Compute (Workspace Verified)',
  },
  {
    id: 'evBwFXFJcM9',
    name: 'Modern Developer Portfolio',
    archetype: 'Dark Obsidian · Smooth Motion',
    category: 'Developer',
    imageUrl: 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot-2026-01-01-at-11.11.58%E2%80%AFAM-75MGc9XubNCPsB6ffBLtDmtgq4sHDm.jpg',
    siteUrl: 'https://animated-nextjs-portfolio-swart.vercel.app',
    description: 'Sleek dark developer showcase featuring glassmorphic cards, smooth animations, interactive project showcases, and tech stack badges.',
    directive: 'Build directly upon the Modern Developer Portfolio architecture (evBwFXFJcM9): Sleek obsidian theme with frosted glass cards, fluid Framer Motion reveals, interactive project displays, and polished tech badges.',
    bestFor: 'Fullstack Engineers & Tech Leads',
    author: 'Ahsan Javed',
  },
  {
    id: 'E3xFlIXCZi4',
    name: 'Executive Impact Showcase',
    archetype: 'Bold Typography · Metric Highlights',
    category: 'Executive',
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screenshots/dpl_2mBppWzodmwGLdSRkz73xkkt97fs-Z4Y3DAAD5Y75vloWANLHK540Wbac7j.jpg',
    siteUrl: 'https://growthwithritesh.vercel.app',
    description: 'Bold typography-driven layout with dynamic case studies, quantified achievements, and high-impact CTA section.',
    directive: 'Build directly upon the Portfolio Website Design template (E3xFlIXCZi4): Bold typography-driven hero, highlighted executive metrics, strategic teardown case studies, and high-converting recruiter CTAs.',
    bestFor: 'VPs, GTM Directors & C-Suite',
    author: 'Ritesh Verma',
  },
  {
    id: 'mA8N4h1POSv',
    name: 'Bento Grid Portfolio',
    archetype: 'Bento Grid · Interactive Cards',
    category: 'Executive',
    imageUrl: 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/v0-portfolio-template-theta.vercel.app_%28Desktop%20windows%29-7wF0uGsuUYhxtiiaakDJrrDHxaAZT4.png',
    siteUrl: 'https://v0-portfolio-template-theta.vercel.app',
    description: 'Modern bento-grid layout with live metric cards, experience timeline, interactive project popovers, and responsive layout.',
    directive: 'Build directly upon the Bento Portfolio template (mA8N4h1POSv): Dynamic bento-grid structure with metric stat callouts, interactive cards, career timeline, and modular content hierarchy.',
    bestFor: 'Heads of Growth & Product Leaders',
    author: 'theta',
  },
  {
    id: 'JgcWH8Dw9d3',
    name: 'Retro Screen Developer Showcase',
    archetype: 'Retro Hardware · Analog Scanlines',
    category: 'Developer',
    imageUrl: 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/CleanShot%202026-03-20%20at%2008.25.31%402x%20Large-wKfkKOgM07ZRk683Kq4QXRl4pLz6Hw.jpeg',
    siteUrl: 'https://v0-old-tv-screen-website.vercel.app',
    description: 'Tactile CRT retro monitor showcase with analog scanline aesthetics, monospace telemetry, and hardware-inspired interactive components.',
    directive: 'Build directly upon the Retro Hardware Showcase architecture (JgcWH8Dw9d3): Vintage CRT monitor aesthetic, analog scanline filters, stark monospace displays, and tactile interactive modules.',
    bestFor: 'Founding Engineers & Systems Architects',
    author: 'Yadwinder Singh',
  },
  {
    id: 'dmRJapDTzFk',
    name: 'Avant-Garde Creative Portfolio',
    archetype: 'High Fashion · Asymmetric Grid',
    category: 'Design',
    imageUrl: 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot%202025-12-29%20at%2011.01.03%E2%80%AFPM-y21XKqv59SVVgzoEOMDtBOngIvfMLl.png',
    siteUrl: 'https://1ui.dev',
    description: 'High-end creative portfolio featuring asymmetric layouts, oversized editorial headings, and immersive visual project showcases.',
    directive: 'Build directly upon the Avant-Garde Designer Showcase template (dmRJapDTzFk): High-end luxury editorial with asymmetric layouts, large display serif headings, and refined visual storytelling.',
    bestFor: 'Design Directors & Creative Leaders',
    author: '1ui',
  },
]

const visualMoods = [
  {
    id: 'minimal-monochrome',
    name: 'Minimal Monochrome',
    tag: 'Pure Grayscale & Restraint',
    description: 'Razor-thin 1px borders, pure typographic clarity, and zero extraneous ornament. Engineered for deep technical credibility.',
    palette: ['#09090b', '#27272a', '#71717a', '#f4f4f5'],
    directive: 'Restrained monochromatic minimalism with pure grayscale hierarchy, zero extraneous decoration, razor-thin 1px borders, and pure typographic clarity.',
  },
  {
    id: 'high-tech-cyber',
    name: 'High-Tech Obsidian & Aura',
    tag: 'Space Obsidian & Violet Aurora',
    description: 'Deep obsidian glassmorphism with subtle violet aurora backdrops, monospace metrics, and smooth spring physics.',
    palette: ['#08090a', '#1e1b4b', '#8b5cf6', '#38bdf8'],
    directive: 'Deep obsidian glassmorphism with subtle 1px border glows, radial violet aurora backdrops, monospace metrics, and smooth Framer Motion spring physics.',
  },
  {
    id: 'luxury-editorial',
    name: 'Luxury Editorial & Serif',
    tag: 'Warm Walnut & Sandstone Serif',
    description: 'Warm cream and dark walnut tones, bespoke serif pull-quotes, generous magazine margins, and essay case study pacing.',
    palette: ['#141312', '#292524', '#d4af37', '#fafaf9'],
    directive: 'Editorial luxury aesthetic with dark walnut and warm cream tones, bespoke Instrument Serif typography, generous magazine margins, and editorial essay card structures.',
  },
  {
    id: 'architectural-grid',
    name: 'Architectural Grid & Structure',
    tag: 'Strict Structural Wireframe',
    description: 'Architectural grid system with visible structural rules, bold high-contrast section anchors, and strict modular discipline.',
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
      templateFilter === 'All' || t.category === templateFilter
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
                        placeholder="Search featured community templates..."
                        value={templateSearch}
                        onChange={e => setTemplateSearch(e.target.value)}
                      />
                    </div>
                    {['All', 'Developer', 'Executive', 'Design'].map(cat => (
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
                          className={`curated-template-card group cursor-pointer ${isSelected ? 'selected' : ''}`}
                        >
                          {/* Real Preview Screenshot */}
                          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-zinc-950 border border-white/10 mb-2.5">
                            <img
                              src={t.imageUrl}
                              alt={t.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                            {/* Category Pill */}
                            <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[9px] font-mono text-white/90">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                              <span>{t.archetype}</span>
                            </div>

                            {/* Selected Badge */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-purple-600 text-white border border-purple-400/50 text-[9px] font-medium flex items-center gap-1 shadow-lg shadow-purple-600/40">
                                <Check className="w-2.5 h-2.5" />
                                <span>Selected</span>
                              </div>
                            )}

                            {/* Inspect Link */}
                            <a
                              href={t.siteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 hover:bg-zinc-800 backdrop-blur-md border border-white/20 hover:border-white/40 text-[9px] text-white/90 font-mono flex items-center gap-1 transition-all duration-150 shadow-md group/link"
                              title="Open live website in new tab"
                            >
                              <span>Preview Live Site</span>
                              <ExternalLink className="w-2.5 h-2.5 text-zinc-400 group-hover/link:text-white transition-colors" />
                            </a>
                          </div>

                          <div className="flex flex-col flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <strong className="text-xs text-white font-medium group-hover:text-purple-300 transition-colors">
                                {t.name}
                              </strong>
                              {t.author && <span className="text-[9px] font-mono text-zinc-400">by {t.author}</span>}
                            </div>
                            <p className="text-[10px] text-zinc-400 leading-snug mb-2 line-clamp-2">{t.description}</p>
                            <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-zinc-400 font-mono">
                              <span>Best for: {t.bestFor.split(',')[0]}</span>
                              <span className={isSelected ? 'text-purple-400 font-semibold' : 'text-zinc-400 group-hover:text-purple-300'}>
                                {isSelected ? '✓ Selected to build' : 'Select to build →'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {activeTemplate && (
                    <div className="mt-3.5 p-3 rounded-lg bg-zinc-950/80 border border-purple-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-medium">
                            Active Template Foundation: {activeTemplate.name}
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-0.5">
                            Your portfolio will be built directly on top of this canonical template architecture, styling, and section hierarchy.
                          </p>
                        </div>
                      </div>
                      <a
                        href={activeTemplate.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 flex items-center gap-1.5 transition-colors"
                      >
                        <span>Visit Live Website</span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </a>
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

                          <p className="text-[10px] text-zinc-400 mt-1.5 leading-snug">{m.description}</p>

                          <div className="mood-palette-dots">
                            {m.palette.map((color, i) => (
                              <span key={i} style={{ backgroundColor: color }} title={color} />
                            ))}
                          </div>

                          <div className="mt-2 pt-1 border-t border-white/5 flex items-center justify-between text-[8px] text-purple-400 font-mono">
                            <span>Select tone</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {activeMood && (
                    <div className="mt-3.5 p-3 rounded-lg bg-zinc-950/80 border border-purple-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-purple-400" />
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-medium">
                            Aesthetic Direction: {activeMood.name}
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-0.5">
                            {activeMood.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {activeMood.palette.map((color, i) => (
                          <span key={i} className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: color }} title={color} />
                        ))}
                      </div>
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
                    <span>Custom architectural prompt injection</span>
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
  onBuild: (selectedDirectionIndex?: number) => void
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
          <MotionNarrativeCard motionNarrative={blueprint.motionNarrative} />
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
            onClick={() => onBuild(direction)}
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

function MotionNarrativeCard({
  motionNarrative,
}: {
  motionNarrative?: { headline?: string; detail?: string }
}) {
  const [testingPhysics, setTestingPhysics] = useState(false)
  const [physicsMode, setPhysicsMode] = useState<'spring' | 'inertia'>('spring')

  const triggerTest = () => {
    setTestingPhysics(true)
    setTimeout(() => setTestingPhysics(false), 900)
  }

  return (
    <div className="motion-card enhanced-motion-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="orb-preview" style={{ width: 22, height: 22 }}>
            <span />
            <span />
            <span />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-semibold">
            Motion Architecture
          </span>
        </div>
        <span className="text-[9px] font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/50">
          60fps Verified
        </span>
      </div>

      <h3 className="text-sm font-semibold text-white mb-1">
        {motionNarrative?.headline || 'Signal → System → Scale'}
      </h3>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
        {motionNarrative?.detail || 'Engineered inertia reveals and magnetic spring physics guide executive recruiters through your strategic narrative without friction.'}
      </p>

      {/* Interactive Physics Sandbox Widget */}
      <div className="physics-tester-box">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-zinc-400">Physics Simulation</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPhysicsMode('spring')}
              className={`text-[9px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors ${physicsMode === 'spring' ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Spring
            </button>
            <button
              type="button"
              onClick={() => setPhysicsMode('inertia')}
              className={`text-[9px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors ${physicsMode === 'inertia' ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Inertia
            </button>
          </div>
        </div>

        <div className="physics-stage" onClick={triggerTest} title="Click to test physics rebound">
          <motion.div
            className="physics-puck"
            animate={
              testingPhysics
                ? physicsMode === 'spring'
                  ? { x: [0, 110, 75, 95, 88, 90], scale: [1, 1.15, 0.92, 1.05, 1] }
                  : { x: [0, 90], transition: { ease: [0.16, 1, 0.3, 1], duration: 0.8 } }
                : { x: 0, scale: 1 }
            }
            transition={
              physicsMode === 'spring'
                ? { type: 'spring', stiffness: 180, damping: 24, mass: 0.8 }
                : undefined
            }
          >
            <span>{testingPhysics ? 'Rebounding…' : 'Click to Test'}</span>
          </motion.div>
          <div className="physics-track-line" />
        </div>
      </div>

      {/* Tangible Physics Parameters Specs */}
      <div className="physics-specs-grid">
        <div className="spec-item">
          <span className="spec-label">Scroll Engine</span>
          <strong className="spec-val">Lenis (damp: 0.12)</strong>
        </div>
        <div className="spec-item">
          <span className="spec-label">Spring Dynamics</span>
          <strong className="spec-val">Stiff 180 / Damp 24</strong>
        </div>
        <div className="spec-item">
          <span className="spec-label">Teardown Reveal</span>
          <strong className="spec-val">Stagger 80ms Blur</strong>
        </div>
        <div className="spec-item">
          <span className="spec-label">Metric Velocity</span>
          <strong className="spec-val">Odometer 1.2s</strong>
        </div>
      </div>
    </div>
  )
}

function SynthesisHUD() {
  const [stepIndex, setStepIndex] = useState(0)
  const steps = [
    { title: 'Deconstructing Target Company Requirements', desc: 'Analyzing strategic JD friction points, core competency gaps & category landscape' },
    { title: 'Parsing Candidate Dossier & Trajectory', desc: 'Isolating verified metrics, leadership inflection points & right-to-win proof' },
    { title: 'Synthesizing 3 Differentiated Strategic Angles', desc: 'Formulating executive angles, proposed solutions & quantifiable hypotheses' },
    { title: 'Calibrating Interaction Physics & Motion Narrative', desc: 'Configuring Lenis inertia scroll, Framer spring parameters & bento layout' },
    { title: 'Assembling Strategic Blueprint Pre-Flight', desc: 'Finalizing positioning hook, evidence cards & executive dossier' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex(s => (s < steps.length - 1 ? s + 1 : s))
    }, 600)
    return () => clearInterval(timer)
  }, [steps.length])

  const progress = Math.min(100, Math.round(((stepIndex + 1) / steps.length) * 100))

  return (
    <motion.div
      className="synthesis-hud-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="synthesis-hud-card"
        initial={{ scale: 0.95, y: 10, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <div className="synthesis-hud-header">
          <div className="synthesis-hud-badge">
            <span className="pulse-dot" />
            <span>AI Executive Strategist Active</span>
          </div>
          <span className="font-mono text-xs text-purple-300 font-semibold">{progress}%</span>
        </div>

        <div className="synthesis-hud-progress-track">
          <motion.div
            className="synthesis-hud-progress-fill"
            initial={{ width: '15%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="synthesis-hud-current">
          <div className="flex items-center gap-2 mb-1">
            <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
            <h3 className="text-sm font-semibold text-white">{steps[stepIndex].title}</h3>
          </div>
          <p className="text-xs text-muted-foreground">{steps[stepIndex].desc}</p>
        </div>

        <div className="synthesis-hud-steps">
          {steps.map((st, i) => (
            <div
              key={i}
              className={`synthesis-step-row ${
                i === stepIndex ? 'active' : i < stepIndex ? 'completed' : 'pending'
              }`}
            >
              <div className="synthesis-step-indicator">
                {i < stepIndex ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <span className="text-xs font-medium">{st.title}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function DynamicPortfolioFallback({
  blueprint,
  selectedDesign = 'Modern Developer Portfolio',
}: {
  blueprint: StrategicBlueprint
  selectedDesign?: string
}) {
  const [activeTab, setActiveTab] = useState<'teardown' | 'evidence' | 'philosophy'>('teardown')
  const [activeAngleIndex, setActiveAngleIndex] = useState(0)
  const [dialogueOpen, setDialogueOpen] = useState(false)
  const [dialogueSubmitted, setDialogueSubmitted] = useState(false)

  const directions = blueprint.directions || []
  const activeDirection = directions[activeAngleIndex] || directions[0]
  const caseStudies = blueprint.caseStudies || []

  return (
    <div className="interactive-portfolio">
      {/* Interactive Top Navbar */}
      <nav className="interactive-preview-nav">
        <strong className="flex items-center gap-2 font-mono text-sm text-white">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span>{blueprint.candidateName || 'Executive Candidate'}</span>
        </strong>
        <div className="nav-tabs">
          <button
            type="button"
            className={`nav-tab ${activeTab === 'teardown' ? 'active' : ''}`}
            onClick={() => setActiveTab('teardown')}
          >
            Strategic Teardown
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === 'evidence' ? 'active' : ''}`}
            onClick={() => setActiveTab('evidence')}
          >
            Proven Impact
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === 'philosophy' ? 'active' : ''}`}
            onClick={() => setActiveTab('philosophy')}
          >
            Operating Philosophy
          </button>
        </div>
        <button
          type="button"
          onClick={() => setDialogueOpen(true)}
          className="text-xs font-medium text-white bg-purple-600/80 hover:bg-purple-600 px-3.5 py-1.5 rounded-lg border border-purple-400/30 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>Schedule Dialogue</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="interactive-preview-hero">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-[11px] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>Targeting {blueprint.targetRole} · {blueprint.targetCompany}</span>
        </div>
        <h2>{blueprint.positioningHook}</h2>
        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed mb-6">
          Architecting category leadership and compounding execution for {blueprint.targetCompany}. Proven systems from 0→1 to enterprise scale.
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('teardown')}
            className="text-xs font-semibold text-zinc-900 bg-white hover:bg-zinc-200 px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>Explore Teardown Angles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs text-zinc-500 font-mono">
            {selectedDesign} · Verified Blueprint
          </span>
        </div>
      </section>

      {/* Main Tab Content */}
      {activeTab === 'teardown' && (
        <section className="interactive-teardown-section">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400 font-semibold">
                Target Teardown Point-of-View
              </span>
              <h3 className="text-lg font-semibold text-white mt-1">
                Strategic Levers for {blueprint.targetCompany}
              </h3>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono bg-zinc-800/60 px-2.5 py-1 rounded border border-zinc-700/40">
              Interactive · Click Angle to inspect
            </span>
          </div>

          {/* Interactive 3-direction Angle Pills */}
          <div className="teardown-angle-pills">
            {directions.map((d, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveAngleIndex(i)}
                className={`teardown-angle-pill ${activeAngleIndex === i ? 'active' : ''}`}
              >
                Angle 0{i + 1}: {d.angle}
              </button>
            ))}
          </div>

          {/* Angle Detail Cards */}
          <div className="teardown-angle-card">
            <div className="teardown-col">
              <small>Observed Challenge</small>
              <p>{activeDirection?.observedChallenge || 'Identifying key execution bottleneck.'}</p>
            </div>
            <div className="teardown-col">
              <small>Proposed Strategy</small>
              <p>{activeDirection?.proposedStrategy || 'Multi-pronged acceleration framework.'}</p>
            </div>
            <div className="teardown-col border-l border-purple-500/20 pl-4">
              <small className="text-emerald-400">Right to Win Proof</small>
              <p className="text-zinc-200 font-medium">{activeDirection?.rightToWinProof || 'Verified track record.'}</p>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'evidence' && (
        <section className="p-8">
          <div className="mb-6">
            <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400 font-semibold">
              Verified Evidence & Systems
            </span>
            <h3 className="text-lg font-semibold text-white mt-1">
              Quantified Track Record
            </h3>
          </div>
          <div className="interactive-case-grid">
            {caseStudies.map((cs, i) => (
              <div key={i} className="interactive-case-card highlighted">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-purple-400">Case 0{i + 1}</span>
                    <span className="text-[10px] uppercase font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Verified
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2">{cs.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">{cs.detail}</p>
                </div>
                <div className="pt-3 border-t border-zinc-800 flex items-baseline justify-between">
                  <span className="text-[10px] uppercase font-mono text-zinc-500">{cs.metricLabel || 'Outcome'}</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">{cs.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'philosophy' && (
        <section className="p-8 max-w-3xl">
          <div className="mb-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400 font-semibold">
              Operating Philosophy & Leadership
            </span>
            <h3 className="text-xl font-semibold text-white mt-1">
              {blueprint.motionNarrative?.headline || 'Signal → System → Scale'}
            </h3>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed mb-6">
            {blueprint.motionNarrative?.detail || 'Architecting compounding advantages through rapid customer discovery, structural alignment, and disciplined execution.'}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <strong className="text-xs text-white block mb-1">High-Leverage Execution</strong>
              <p className="text-xs text-zinc-400 leading-relaxed">Focusing resources on friction points that unlock exponential returns rather than incremental gains.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <strong className="text-xs text-white block mb-1">Data-Informed Conviction</strong>
              <p className="text-xs text-zinc-400 leading-relaxed">Pairing rigorous quantitative tracking with decisive strategic bets.</p>
            </div>
          </div>
        </section>
      )}

      {/* Recruiter Dialogue Modal */}
      {dialogueOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12141a] border border-purple-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-semibold text-white">Schedule Strategic Dialogue</h4>
              <button
                type="button"
                onClick={() => { setDialogueOpen(false); setDialogueSubmitted(false); }}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {dialogueSubmitted ? (
              <div className="text-center py-6">
                <Check className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h5 className="text-sm font-semibold text-white mb-1">Inquiry Dispatched</h5>
                <p className="text-xs text-zinc-400">
                  Invitation delivered for strategic conversation targeting {blueprint.targetCompany}.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                  Request a 30-minute executive briefing with {blueprint.candidateName} regarding the strategic opportunities outlined for {blueprint.targetCompany}.
                </p>
                <input
                  type="email"
                  placeholder="recruiter@company.com"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white mb-3 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setDialogueSubmitted(true)}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Confirm Dialogue Request
                </button>
              </div>
            )}
          </div>
        </div>
      )}
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
  const [copiedLink, setCopiedLink] = useState(false)

  const reloadPreview = () => {
    setIframeKey(k => k + 1)
  }

  const liveShareUrl = chatId
    ? typeof window !== 'undefined'
      ? `${window.location.origin}/api/preview/${chatId}`
      : `https://grtr-woad.vercel.app/api/preview/${chatId}`
    : ''

  const handleCopyLiveLink = () => {
    if (!liveShareUrl) return
    navigator.clipboard.writeText(liveShareUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
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
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="status-dot" />
              <span>{chatId ? 'Live Sandbox Active' : 'All changes saved'}</span>
            </div>
            {chatId && (
              <div className="hidden sm:flex items-center gap-1.5 ml-2">
                <button
                  type="button"
                  onClick={handleCopyLiveLink}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition cursor-pointer"
                  title="Copy shareable Vercel link"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
                </button>
                <a
                  href={liveShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition no-underline"
                  title="Open live preview in full tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Tab ↗</span>
                </a>
              </div>
            )}
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
            <div className="browser-bar flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span />
                <span />
                <span />
              </div>
              <a
                href={liveShareUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/5 hover:bg-white/10 text-[11px] text-zinc-400 hover:text-zinc-200 transition font-mono max-w-[70%] truncate no-underline"
                title="Click to open full live site"
              >
                <span>{liveShareUrl ? liveShareUrl.replace(/^https?:\/\//, '') : `grtr.app/p/${blueprint?.candidateName?.toLowerCase().replace(/\s+/g, '') || 'candidate'}/${blueprint?.targetCompany?.toLowerCase().replace(/\s+/g, '') || 'role'}`}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
              <button
                type="button"
                onClick={handleCopyLiveLink}
                className="text-zinc-400 hover:text-white p-1 rounded hover:bg-white/5 transition cursor-pointer"
                title="Copy live link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {previewUrl ? (
              <iframe
                key={iframeKey}
                src={previewUrl}
                title="Live Portfolio Sandbox"
                className="w-full h-[calc(100vh-230px)] min-h-[640px] border-0 bg-transparent"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              />
            ) : (
              <div className="portfolio-preview p-12 text-center text-muted flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-zinc-300 font-medium text-sm">Generating live portfolio sandbox...</p>
                <p className="text-zinc-500 text-xs mt-1">Assembling responsive layout, interactive widgets & typography</p>
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
  const [selectedDesign, setSelectedDesign] = useState('Modern Developer Portfolio')

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

      const text = await res.text()
      let data: any
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error(`Server returned unexpected response (${res.status}): ${text.slice(0, 100)}`)
      }

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

  // Handler: Build Portfolio Engine (Stage 2)
  const handleBuildPortfolio = async (selectedDirectionIndex: number = 0) => {
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
          selectedDirectionIndex,
          resumeText,
          jobDescription,
        }),
      })

      const text = await res.text()
      let data: any
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error(`Server returned unexpected response (${res.status}): ${text.slice(0, 100)}`)
      }

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
        const errorDetail = data.error || 'Portfolio generation failed.'
        setErrorMessage(errorDetail)
        alert(errorDetail)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setErrorMessage(msg)
      alert('Build failed: ' + msg)
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

      <AnimatePresence>
        {isGeneratingBlueprint && <SynthesisHUD />}
      </AnimatePresence>
    </div>
  )
}
