'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import {
  ArrowRight, BarChart3, BriefcaseBusiness, Check, ChevronRight, ChevronDown, ChevronLeft,
  CircleUserRound, Clipboard, CloudUpload, Code2, Copy, ExternalLink, FileText, Globe2,
  LayoutDashboard, Link2, Menu, MessageSquare, Monitor, Palette, Plus, Rocket, Search, Send,
  Smartphone, Sparkles, Target, TrendingUp, Upload, WandSparkles, X, Loader2, RefreshCw,
  Trash2, Image as ImageIcon, Zap
} from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { StudioChat, ProjectHighlights, portfolioPlaceholders } from './studio-interactions'
import { Button } from '@/components/ui/button'
import type { StrategicBlueprint, CaseStudyItem } from '@/lib/types'
import { UserNav } from '@/components/auth/user-nav'
import { PaywallModal } from '@/components/auth/paywall-modal'
import { CURATED_SKILLS, type AgentSkill } from '@/lib/skills-registry'

export function formatDesignLabel(design?: string, maxLen = 32): string {
  if (!design) return 'Minimal Monochrome'
  if (design.startsWith('Custom:')) {
    const raw = design.replace(/^Custom:\s*/, '').trim()
    return `Custom: ${raw.slice(0, Math.max(12, maxLen - 8))}${raw.length > maxLen - 8 ? '…' : ''}`
  }
  if (design.length > maxLen) {
    return `${design.slice(0, maxLen - 1)}…`
  }
  return design
}

const views = [
  { id: 1, short: 'Input', label: 'Input Studio', icon: FileText },
  { id: 2, short: 'Blueprint', label: 'Strategic Blueprint', icon: Target },
  { id: 3, short: 'Studio', label: 'Live Studio', icon: Code2 },
  { id: 4, short: 'Analytics', label: 'Portfolio Hub', icon: BarChart3 },
]

function Header({
  active,
  setActive,
  isCreatingNew = false,
  onStartNew,
  onCancelNew,
  activeCandidateName,
  activeCompanyName,
  applicationsCount = 3,
}: {
  active: number
  setActive: (n: number) => void
  isCreatingNew?: boolean
  onStartNew?: () => void
  onCancelNew?: () => void
  activeCandidateName?: string
  activeCompanyName?: string
  applicationsCount?: number
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <header className="app-header">
      <div className="flex items-center gap-2.5">
        <button
          className="brand"
          onClick={() => {
            if (isCreatingNew) onCancelNew?.()
            setActive(4)
          }}
          aria-label="Go to Portfolios Hub"
        >
          <span className="brand-name">Grtr</span>
          <span className="brand-trademark">TM</span>
        </button>
        <Link
          href="/"
          className="text-[11px] text-zinc-500 hover:text-zinc-300 font-mono no-underline hidden lg:inline px-1.5 py-0.5 rounded hover:bg-white/5 transition"
          title="Back to Landing Page"
        >
          Overview
        </Link>
      </div>

      {/* Contextual Navigation Switcher */}
      <nav className="view-switcher" aria-label="Main navigation">
        {isCreatingNew ? (
          <div className="flex items-center gap-1 px-1">
            <span className="text-[10px] font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 mr-1 hidden sm:inline-block">
              Genesis Wizard
            </span>
            <button
              onClick={() => setActive(1)}
              className={active === 1 ? 'active' : ''}
              aria-current={active === 1 ? 'page' : undefined}
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="step-number">1.</span>
              <span>Input Studio</span>
            </button>
            <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
            <button
              onClick={() => setActive(2)}
              className={active === 2 ? 'active' : ''}
              aria-current={active === 2 ? 'page' : undefined}
            >
              <Target className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="step-number">2.</span>
              <span>Strategic Blueprint</span>
            </button>
            <button
              type="button"
              onClick={onCancelNew}
              className="ml-2 text-[11px] text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-white/5 transition flex items-center gap-1 cursor-pointer"
              title="Exit creation and return to Portfolios"
            >
              <X className="w-3 h-3" />
              <span>Exit</span>
            </button>
          </div>
        ) : active === 3 ? (
          <div className="flex items-center gap-2 px-1">
            <button
              onClick={() => setActive(4)}
              className="text-xs text-zinc-400 hover:text-white px-2.5 py-1 rounded-md hover:bg-white/5 transition flex items-center gap-1.5 cursor-pointer font-sans"
              title="Return to Portfolios Hub"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Portfolios</span>
            </button>
            <span className="text-zinc-600">/</span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-zinc-900 border border-white/10 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <strong className="text-white font-medium">
                {activeCandidateName ? `${activeCandidateName} @ ` : ''}{activeCompanyName || 'Portfolio'}
              </strong>
              <span className="text-purple-300 font-mono text-[10px] hidden sm:inline">(Live Studio)</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActive(4)}
              className="active"
              aria-current="page"
            >
              <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Portfolios</span>
              <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] bg-zinc-800 text-zinc-300 font-mono border border-white/10">
                {applicationsCount}
              </span>
            </button>
          </div>
        )}
      </nav>

      <div className="flex items-center gap-3 ml-auto">
        {!isCreatingNew && (
          <button
            type="button"
            onClick={onStartNew}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-zinc-200 text-zinc-950 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all border border-white/20 active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Portfolio</span>
          </button>
        )}
        <UserNav />
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
            <button
              onClick={() => {
                onCancelNew?.()
                setActive(4)
                setMobileOpen(false)
              }}
              className={active === 4 ? 'active' : ''}
            >
              Portfolios ({applicationsCount})
            </button>
            <button
              onClick={() => {
                onStartNew?.()
                setMobileOpen(false)
              }}
              className="text-purple-300 font-medium"
            >
              + New Portfolio
            </button>
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
      <div className="flex flex-col gap-0.5">
        <strong className="text-xs font-medium text-white">{title}</strong>
        <span className="text-[11px] text-zinc-400 font-mono">{subtitle}</span>
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
  selectedSkills?: AgentSkill[]
  setSelectedSkills?: (skills: AgentSkill[]) => void
  onGenerate: () => void
  isGeneratingBlueprint: boolean
  error?: string | null
  onCancel?: () => void
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
    imageUrl: '/compute-preview.jpg',
    siteUrl: 'https://v0-compute-11.vercel.app',
    description: 'High-velocity AI agent platform template featuring deep obsidian glass, live interactive telemetry controls, and sleek modern typography.',
    directive: 'Seed workspace chat duplicate from RKiDa7imLjw',
    bestFor: 'Founding GTM, Product Leads & Systems Architects',
    author: 'Compute (Workspace Verified)',
  },
  {
    id: 'TirCdHf4EQ8',
    name: 'EinCode Digital Lab',
    archetype: 'Creative Engineering · Interactive Labs',
    category: 'Design',
    imageUrl: '/eincode-preview.png',
    siteUrl: 'https://v0.app/templates/eincode-digital-lab-NjOUgG6VT7X',
    description: 'Bespoke digital laboratory showcase featuring interactive project cards, dynamic portfolio grids, and sleek high-contrast typography.',
    directive: 'Seed workspace chat duplicate from TirCdHf4EQ8',
    bestFor: 'Creative Technologists, Product Designers & Frontend Architects',
    author: 'EinCode (Workspace Verified)',
  },
  {
    id: 'jMO0lvF8j85',
    name: 'Exact Landing Page Clone',
    archetype: 'High-Converting SaaS · Bold Layout',
    category: 'Executive',
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screenshots/dpl_2mBppWzodmwGLdSRkz73xkkt97fs-Z4Y3DAAD5Y75vloWANLHK540Wbac7j.jpg',
    siteUrl: 'https://v0.app/templates/exact-landing-page-clone-TRBFYs8lKCv',
    description: 'Precision high-conversion SaaS portfolio architecture with high-impact headline metrics, strategic case studies, and compelling recruiter conversion flows.',
    directive: 'Seed workspace chat duplicate from jMO0lvF8j85',
    bestFor: 'Growth Executives, VPs & Product Marketing Leaders',
    author: 'Landing Clone (Workspace Verified)',
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
  selectedSkills = [],
  setSelectedSkills,
  onGenerate,
  isGeneratingBlueprint,
  error,
  onCancel,
}: InputStudioProps) {
  const [jdMode, setJdMode] = useState<'text' | 'file'>('text')
  const [designTab, setDesignTab] = useState('moods')
  const [templateFilter, setTemplateFilter] = useState('All')
  const [templateSearch, setTemplateSearch] = useState('')
  const [skillSearch, setSkillSearch] = useState('')
  const [skillCategory, setSkillCategory] = useState<'all' | 'design' | 'metrics' | 'strategy' | 'motion'>('all')
  const [skillsList, setSkillsList] = useState<AgentSkill[]>(CURATED_SKILLS)
  const [isSearchingSkills, setIsSearchingSkills] = useState(false)
  const [parsingCv, setParsingCv] = useState(false)
  const [parsingJd, setParsingJd] = useState(false)

  // Debounced search for skills.sh API
  useEffect(() => {
    let cancelled = false
    const timer = setTimeout(async () => {
      try {
        setIsSearchingSkills(true)
        const params = new URLSearchParams()
        if (skillSearch.trim()) params.set('q', skillSearch.trim())
        if (skillCategory !== 'all') params.set('category', skillCategory)
        const res = await fetch(`/api/skills?${params.toString()}`)
        if (!res.ok) return
        const data = await res.json()
        if (data.success && Array.isArray(data.skills) && !cancelled) {
          setSkillsList(data.skills)
        }
      } catch (err) {
        console.warn('Skills search error:', err)
      } finally {
        if (!cancelled) setIsSearchingSkills(false)
      }
    }, 250)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [skillSearch, skillCategory])

  const toggleSkill = (skill: AgentSkill) => {
    if (!setSelectedSkills) return
    const current = selectedSkills || []
    const exists = current.some(s => s.id === skill.id || s.slug === skill.slug)
    if (exists) {
      setSelectedSkills(current.filter(s => s.id !== skill.id && s.slug !== skill.slug))
    } else {
      if (current.length >= 3) {
        alert('Maximum of 3 skills can be attached simultaneously to maintain optimal reasoning quality and avoid design collisions.')
        return
      }
      setSelectedSkills([...current, skill])
    }
  }

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
      <div id="input-workspace" className="workspace-heading flex items-center justify-between">
        <div>
          <h1>Input studio</h1>
          <p>Your experience, shaped for your next role.</p>
        </div>
        {onCancel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Cancel &amp; Back to Portfolios</span>
          </Button>
        )}
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

          {jdMode === 'text' ? (
            <div>
              <textarea
                className="jd-textarea"
                aria-label="Job description"
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                placeholder="Paste the target job description, requirements, or role brief..."
              />
              <div className="input-meta flex items-center justify-between text-xs text-zinc-400 pt-1.5">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{jobDescription.trim().length > 15 ? 'Target role signals active' : 'Enter target role & company requirements'}</span>
                </span>
                <span className="font-mono text-[10px] text-zinc-500">{jobDescription.length.toLocaleString()} characters</span>
              </div>
            </div>
          ) : (
            <div>
              <UploadZone
                title="Upload job description"
                subtitle="PDF, DOCX or TXT · Max 10MB"
                loading={parsingJd}
                onFileSelect={handleJdUpload}
              />
            </div>
          )}
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
              ['moods', 'Moods'],
              ['templates', 'Templates'],
              ['custom', 'Custom'],
              ['skills', `Skills.sh (${(selectedSkills || []).length}/3)`],
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
          <div className="design-content">

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

                    {/* More Coming Soon Placeholder Card */}
                    <div className="curated-template-card border-dashed border-white/10 bg-zinc-950/40 flex flex-col items-center justify-center p-6 text-center select-none min-h-[260px] rounded-xl hover:border-purple-500/30 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3 shadow-[0_0_12px_rgba(168,85,247,0.15)]">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                      </div>
                      <strong className="text-xs text-white block font-medium">More Templates Coming Soon</strong>
                      <p className="text-[10px] text-zinc-500 mt-1 max-w-[210px] leading-relaxed">
                        Curating new executive bento grids, editorial showcases, and engineering consoles into your verified workspace.
                      </p>
                      <span className="mt-3.5 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[9px] font-mono text-purple-300">
                        In Laboratory
                      </span>
                    </div>
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
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-semibold text-white leading-tight">{m.name}</span>
                              <span className="text-[10px] text-zinc-400 font-mono tracking-normal leading-tight">{m.tag}</span>
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

              {designTab === 'skills' && (
                <div className="space-y-4 text-left">
                  {/* Attached Skills Ribbon */}
                  {(selectedSkills || []).length > 0 && (
                    <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/30 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                          Skills Attached ({(selectedSkills || []).length}/3)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {(selectedSkills || []).map(skill => (
                          <span
                            key={skill.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-purple-500/10 text-purple-200 border border-purple-500/30"
                          >
                            <span>{skill.name}</span>
                            <button
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className="text-purple-400 hover:text-white ml-0.5 cursor-pointer"
                              title="Detach skill"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search & Category Filter Toolbar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        aria-label="Search skills from skills.sh"
                        placeholder="Search skills.sh or local registry (telemetry, teardown, obsidian, charts)..."
                        value={skillSearch}
                        onChange={e => setSkillSearch(e.target.value)}
                        className="w-full h-9 pl-9 pr-8 rounded-lg bg-[#0e1116] border border-white/10 hover:border-white/20 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 text-xs text-zinc-200 placeholder:text-zinc-500"
                      />
                      {skillSearch && (
                        <button
                          type="button"
                          onClick={() => setSkillSearch('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                      {[
                        ['all', 'All'],
                        ['design', 'Design'],
                        ['metrics', 'Metrics'],
                        ['strategy', 'Strategy'],
                        ['motion', 'Motion'],
                      ].map(([catKey, catLabel]) => (
                        <button
                          key={catKey}
                          type="button"
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono cursor-pointer transition-all border ${
                            skillCategory === catKey
                              ? 'bg-purple-600 text-white border-purple-500 font-medium'
                              : 'bg-white/[0.03] text-zinc-400 hover:text-zinc-200 border-white/10 hover:border-white/20'
                          }`}
                          onClick={() => setSkillCategory(catKey as any)}
                        >
                          {catLabel}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skills Cards Grid */}
                  {isSearchingSkills ? (
                    <div className="py-8 text-center text-xs text-zinc-400 font-mono flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                      <span>Searching skills.sh registry...</span>
                    </div>
                  ) : skillsList.length === 0 ? (
                    <div className="p-6 rounded-lg bg-white/[0.02] border border-white/10 text-center text-xs text-zinc-400 font-mono">
                      No skills found matching &quot;{skillSearch}&quot;. Try &quot;telemetry&quot;, &quot;teardown&quot;, or &quot;obsidian&quot;.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                      {skillsList.map(skill => {
                        const isAttached = (selectedSkills || []).some(s => s.id === skill.id || s.slug === skill.slug)
                        const isMaxReached = (selectedSkills || []).length >= 3 && !isAttached

                        return (
                          <div
                            key={skill.id}
                            className={`p-3 rounded-lg border transition-all text-left flex flex-col justify-between ${
                              isAttached
                                ? 'bg-gradient-to-b from-[#141226] to-[#0d0f14] border-purple-500/50 shadow-sm shadow-purple-950/30'
                                : 'bg-[#0c0e12]/80 hover:bg-[#11141a] border-white/10 hover:border-white/20'
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="text-xs font-semibold text-zinc-100 flex items-center gap-1.5">
                                  <span>{skill.name}</span>
                                </h4>
                                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-zinc-400 shrink-0">
                                  {skill.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-400 leading-relaxed mb-2 line-clamp-2">
                                {skill.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] mt-auto">
                              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                                <span className="text-purple-400">⚡</span>
                                <span>{skill.installs.toLocaleString()} installs</span>
                              </span>

                              <button
                                type="button"
                                onClick={() => toggleSkill(skill)}
                                disabled={isMaxReached}
                                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                                  isAttached
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                                    : isMaxReached
                                    ? 'bg-white/[0.02] text-zinc-600 border border-white/5 cursor-not-allowed'
                                    : 'bg-white/[0.05] text-zinc-200 hover:bg-purple-600 hover:text-white border border-white/10 hover:border-purple-500'
                                }`}
                              >
                                {isAttached ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span>Attached</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3 h-3" />
                                    <span>Attach</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
          </div>
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
  onUpdateCaseStudies?: (caseStudies: CaseStudyItem[]) => void
}

function AutoExpandingHookTextarea({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.max(90, el.scrollHeight)}px`
  }, [])

  useEffect(() => {
    adjustHeight()
  }, [value, adjustHeight])

  return (
    <textarea
      ref={textareaRef}
      aria-label="Positioning hook"
      value={value}
      onChange={e => {
        onChange(e.target.value)
        adjustHeight()
      }}
      rows={2}
      className="positioning-hook-textarea"
      placeholder="Executive positioning hook..."
    />
  )
}

function Blueprint({
  blueprint,
  onBack,
  onBuild,
  isBuildingPortfolio,
  onUpdateHook,
  onUpdateCaseStudies,
}: BlueprintProps) {
  const [direction, setDirection] = useState(0)
  const [isReordering, setIsReordering] = useState(false)
  const directions = blueprint.directions || []
  const activeDirection = directions[direction] || directions[0]

  return (
    <div className="view-shell blueprint-view">
      <div className="blueprint-top">
        <div>
          <span className="eyebrow">Pre-flight strategy</span>
          <h1>Your strongest route to the role.</h1>
        </div>
      </div>
      <div className="blueprint-layout">
        <div className="blueprint-main">
          <section className="strategy-card hero-strategy beam">
            <div className="strategy-label flex items-center justify-between">
              <span>AI positioning hook</span>
              <span className="text-[10px] text-zinc-500 font-mono">Editable</span>
            </div>
            <AutoExpandingHookTextarea
              value={blueprint.positioningHook}
              onChange={onUpdateHook}
            />
            <div className="confidence">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Distinctive, specific, and supported by verified proof points in your CV</span>
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
            <div className="strategy-label flex items-center justify-between">
              <span>Prioritized case studies</span>
              <button
                type="button"
                onClick={() => setIsReordering(prev => !prev)}
                className={`reorder-btn ${isReordering ? 'active' : ''}`}
                title={isReordering ? 'Save new case study priority' : 'Reorder prioritized case studies'}
              >
                {isReordering ? '✓ Done Reordering' : '↕ Reorder'}
              </button>
            </div>
            <ProjectHighlights
              caseStudies={blueprint.caseStudies}
              isReordering={isReordering}
              onReorder={onUpdateCaseStudies}
            />
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

function SynthesisHUD() {
  const [stepIndex, setStepIndex] = useState(0)
  const steps = [
    { title: 'Deconstructing Target Company Requirements', desc: 'Analyzing strategic JD friction points, core competency gaps & category landscape' },
    { title: 'Parsing Candidate Dossier & Trajectory', desc: 'Isolating verified metrics, leadership inflection points & right-to-win proof' },
    { title: 'Synthesizing 3 Differentiated Strategic Angles', desc: 'Formulating executive angles, proposed solutions & quantifiable hypotheses' },
    { title: 'Calibrating Strategic Evidence & Narrative Pacing', desc: 'Curating verified proof points, case studies & executive bento layout' },
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
          <span className="text-xs text-zinc-500 font-mono truncate max-w-[280px]" title={selectedDesign}>
            {formatDesignLabel(selectedDesign, 32)} · Verified Blueprint
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
  onMarkReady?: (chatId: string) => void
  onBackToPortfolios?: () => void
}

function LiveStudio({
  blueprint,
  chatId,
  previewUrl,
  selectedDesign,
  onMarkReady,
  onBackToPortfolios,
}: LiveStudioProps) {
  const [publish, setPublish] = useState(false)
  const [thesisOpen, setThesisOpen] = useState(false)
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop')
  const [mobileTab, setMobileTab] = useState<'chat' | 'preview'>('preview')
  const [iframeKey, setIframeKey] = useState(0)
  const [copiedLink, setCopiedLink] = useState(false)
  const [agentStatus, setAgentStatus] = useState<{ active: boolean; currentStep?: string }>({ active: false })

  const reloadPreview = () => {
    setIframeKey(k => k + 1)
  }

  const liveShareUrl = chatId
    ? typeof window !== 'undefined'
      ? `${window.location.origin}/api/preview/${chatId}`
      : `https://grtr.app/api/preview/${chatId}`
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
          <small title={selectedDesign} className="truncate block max-w-full">
            {formatDesignLabel(selectedDesign, 28)} · Executive
          </small>
        </div>
        <StudioChat
          chatId={chatId}
          onUpdatePreview={reloadPreview}
          onAgentStatusChange={setAgentStatus}
          contextLabel={`${roleText} @ ${companyText}`}
          refreshKey={iframeKey}
          onReady={() => {
            if (chatId) onMarkReady?.(chatId)
          }}
        />
      </aside>

      <main className={`preview-pane ${mobileTab === 'preview' ? 'mobile-show' : ''}`}>
        <div className="studio-toolbar">
          <div className="flex items-center gap-2">
            {onBackToPortfolios && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackToPortfolios}
                className="h-7 text-xs text-zinc-400 hover:text-white px-2 flex items-center gap-1 cursor-pointer mr-1"
                title="Back to all portfolios"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Portfolios</span>
              </Button>
            )}
            <div className="flex items-center gap-2">
              <span className={`status-dot ${agentStatus.active ? 'bg-purple-400 animate-pulse' : ''}`} />
              <span className={agentStatus.active ? 'text-purple-300 font-medium' : ''}>
                {agentStatus.active
                  ? `v0 Agent: ${agentStatus.currentStep || 'Working on updates...'}`
                  : chatId
                  ? 'Live Sandbox Active'
                  : 'All changes saved'}
              </span>
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
            {blueprint && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setThesisOpen(true)}
                className="h-8 text-xs border-purple-500/30 bg-purple-950/20 hover:bg-purple-900/40 text-purple-200 hover:text-white flex items-center gap-1.5 cursor-pointer"
                title="View approved strategic thesis, right to win angles, and case studies"
              >
                <Target className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Strategic Thesis</span>
              </Button>
            )}
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
            <span className="system-badge" title={selectedDesign}>
              <b className="truncate max-w-[130px] inline-block align-middle">{formatDesignLabel(selectedDesign, 20)}</b>
            </span>
            <Button onClick={() => setPublish(true)} className="publish-button">
              <Rocket data-icon="inline-start" />
              Publish
            </Button>
          </div>
        </div>

        <div className="preview-canvas relative">
          {agentStatus.active && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-950/95 border border-purple-500/50 shadow-2xl backdrop-blur-md text-xs text-white pointer-events-none">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
              </span>
              <span className="font-semibold text-purple-300">v0 Agent:</span>
              <span className="text-zinc-200 font-medium">{agentStatus.currentStep || 'Modifying portfolio...'}</span>
              <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">• Live compile in progress</span>
            </div>
          )}
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
                onLoad={() => {
                  if (chatId) {
                    onMarkReady?.(chatId)
                  }
                }}
              />
            ) : (
              <div className="portfolio-preview p-12 text-center text-muted flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-zinc-300 font-medium text-sm">Generating live portfolio sandbox...</p>
                <p className="text-zinc-500 text-xs mt-1">Assembling responsive layout, interactive widgets &amp; typography</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Strategic Thesis Reference Drawer */}
      <AnimatePresence>
        {thesisOpen && blueprint && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setThesisOpen(false)}
          >
            <motion.div
              className="w-full max-w-xl h-full bg-[#111316] border-l border-[#232530] p-6 overflow-y-auto flex flex-col justify-between shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#232530] mb-6">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <h2 className="text-base font-semibold text-white tracking-tight">Approved Strategic Thesis</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setThesisOpen(false)}
                    className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Target Context */}
                <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-[#232530] mb-5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-zinc-400 font-mono text-[11px]">TARGET ROLE & COMPANY</span>
                    <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active In Sandbox</span>
                  </div>
                  <h3 className="text-base font-semibold text-white font-serif">{blueprint.targetRole} @ {blueprint.targetCompany}</h3>
                  <p className="text-xs text-zinc-400 mt-1">Candidate: {blueprint.candidateName}</p>
                </div>

                {/* Positioning Hook */}
                <div className="mb-6">
                  <span className="text-[10px] uppercase font-mono text-purple-400 font-semibold tracking-wider block mb-2">
                    AI Positioning Hook
                  </span>
                  <blockquote className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-white font-serif text-lg leading-snug italic">
                    "{blueprint.positioningHook}"
                  </blockquote>
                </div>

                {/* Strategic Angles */}
                <div className="mb-6">
                  <span className="text-[10px] uppercase font-mono text-purple-400 font-semibold tracking-wider block mb-2">
                    Company Research &amp; Right to Win Angles
                  </span>
                  <div className="space-y-3">
                    {blueprint.directions?.map((d, i) => (
                      <div key={i} className="p-3.5 rounded-lg bg-zinc-900/40 border border-[#232530] text-xs space-y-1.5">
                        <strong className="text-purple-300 font-medium block">Angle 0{i + 1}: {d.angle}</strong>
                        <p className="text-zinc-300 text-[11px]"><strong className="text-zinc-400">Challenge:</strong> {d.observedChallenge}</p>
                        <p className="text-zinc-300 text-[11px]"><strong className="text-zinc-400">Strategy:</strong> {d.proposedStrategy}</p>
                        <p className="text-emerald-300 text-[11px]"><strong className="text-emerald-400">Right to Win:</strong> {d.rightToWinProof}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prioritized Case Studies */}
                {blueprint.caseStudies && blueprint.caseStudies.length > 0 && (
                  <div className="mb-6">
                    <span className="text-[10px] uppercase font-mono text-purple-400 font-semibold tracking-wider block mb-2">
                      Prioritized Case Studies
                    </span>
                    <div className="space-y-2">
                      {blueprint.caseStudies.map((cs, i) => (
                        <div key={i} className="p-3 rounded-lg bg-zinc-900/40 border border-[#232530] flex items-center justify-between text-xs">
                          <div>
                            <strong className="text-white block">{cs.title}</strong>
                            <span className="text-[11px] text-zinc-400">{cs.detail}</span>
                          </div>
                          <span className="font-mono text-emerald-400 font-bold ml-4 shrink-0">{cs.metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#232530] flex justify-between items-center text-xs text-zinc-400">
                <span>Strategy locked for live interview dialogue</span>
                <Button variant="outline" size="sm" onClick={() => setThesisOpen(false)} className="border-[#232530] text-white">
                  Close Drawer
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {publish && <PublishModal close={() => setPublish(false)} blueprint={blueprint} />}
      </AnimatePresence>
    </div>
  )
}

interface ApplicationItem {
  id: string
  role: string
  company: string
  candidateName: string
  chatId: string
  previewUrl: string
  selectedDesign: string
  blueprint?: StrategicBlueprint
  status?: 'generating' | 'ready' | 'error'
  createdAt: string
  url?: string
  plan?: string
  views?: number
  time?: string
  last?: string
  color?: string
}

const initialApplications: ApplicationItem[] = [
  {
    id: 'qQgc64emjUV',
    chatId: 'qQgc64emjUV',
    previewUrl: '/api/preview/qQgc64emjUV',
    role: 'Product Manager',
    company: 'Pine Labs',
    candidateName: 'Ananya Sharma',
    selectedDesign: 'Minimal Monochrome',
    status: 'ready',
    createdAt: new Date().toISOString(),
    url: 'grtr.app/p/ananyasharma/pinelabs',
    plan: 'Plus',
    views: 8,
    time: '2m 14s',
    last: 'Active',
    color: '#10b981',
  },
  {
    id: 'YDS32ES5K3h',
    chatId: 'YDS32ES5K3h',
    previewUrl: '/api/preview/YDS32ES5K3h',
    role: 'Growth Marketing Manager',
    company: 'PhonePe',
    candidateName: 'Aarav Mehta',
    selectedDesign: 'COMPUTE — AI Platform Template',
    status: 'ready',
    createdAt: new Date().toISOString(),
    url: 'grtr.app/p/aaravmehta/phonepe',
    plan: 'Plus',
    views: 18,
    time: '3m 45s',
    last: 'Just now',
    color: '#8b5cf6',
  },
  {
    id: 'wZoN0S4sp3n',
    chatId: 'wZoN0S4sp3n',
    previewUrl: '/api/preview/wZoN0S4sp3n',
    role: 'Growth Marketing Manager (Media Iteration)',
    company: 'PhonePe',
    candidateName: 'Aarav Mehta',
    selectedDesign: 'COMPUTE — AI Platform Template',
    status: 'ready',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    url: 'grtr.app/p/aaravmehta/phonepe-v1',
    plan: 'Plus',
    views: 12,
    time: '2m 30s',
    last: '1 hr ago',
    color: '#6366f1',
  },
]

function formatRelativeTime(timestamp: number): string {
  const diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1000))
  if (diffSec < 60) return 'Just now'
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) return `${diffHour}h ago`
  const diffDay = Math.floor(diffHour / 24)
  return `${diffDay}d ago`
}

function AnalyticsView({
  openStudio,
  onSelectApplication,
  onDeleteApplication,
  applications,
  onMarkReady,
}: {
  openStudio: () => void
  onSelectApplication: (app: ApplicationItem) => void
  onDeleteApplication: (id: string) => void
  applications: ApplicationItem[]
  onMarkReady?: (chatId: string) => void
}) {
  const [selected, setSelected] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Auto-reconcile on mount for any portfolio stuck in generating
  useEffect(() => {
    const generatingApps = applications.filter(a => a.status === 'generating' && a.chatId)
    if (generatingApps.length === 0) return

    let cancelled = false
    async function reconcile() {
      try {
        await Promise.all(
          generatingApps.map(async appItem => {
            try {
              const res = await fetch(`/api/chat?chatId=${encodeURIComponent(appItem.chatId)}`)
              if (!res.ok) return
              const data = await res.json()
              if (data.isReady || (Array.isArray(data.messages) && data.messages.length > 0)) {
                onMarkReady?.(appItem.chatId)
              }
            } catch (err) {
              console.warn('Status reconcile error:', err)
            }
          })
        )
      } catch (err) {
        console.warn('Reconcile error:', err)
      }
    }

    reconcile()
    return () => {
      cancelled = true
    }
  }, [applications, onMarkReady])

  const filtered = applications.filter(a => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      a.company.toLowerCase().includes(term) ||
      a.role.toLowerCase().includes(term) ||
      (a.candidateName && a.candidateName.toLowerCase().includes(term))
    )
  })

  const app = filtered[selected] || filtered[0] || applications[0]

  const [activityEvents, setActivityEvents] = useState<any[]>([])
  const [loadingActivity, setLoadingActivity] = useState(false)

  useEffect(() => {
    const idToFetch = app?.chatId || app?.id
    if (!idToFetch) {
      setActivityEvents([])
      return
    }

    let cancelled = false
    setLoadingActivity(true)

    fetch(`/api/analytics?chatId=${encodeURIComponent(idToFetch)}&_t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled && data.success && Array.isArray(data.events)) {
          setActivityEvents(data.events)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoadingActivity(false)
      })

    return () => {
      cancelled = true
    }
  }, [app?.chatId, app?.id])

  const totalRecruiterViews = activityEvents.filter(e => e.type === 'recruiter_view').length
  const readyCount = applications.filter(a => a.status === 'ready').length

  const handleCopyLink = (e: React.MouseEvent, appItem: ApplicationItem) => {
    e.stopPropagation()
    const fullUrl = window.location.origin + appItem.previewUrl
    navigator.clipboard.writeText(fullUrl)
    setCopiedId(appItem.id || appItem.chatId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="view-shell analytics-view">
      <div className="dashboard-head">
        <div>
          <span className="eyebrow">Portfolio intelligence &amp; Dashboard</span>
          <h1>My Portfolios</h1>
          <p>Manage, resume live sandbox builds, and review your executive portfolios across target roles.</p>
        </div>
        <Button onClick={openStudio} className="primary-cta">
          <Plus data-icon="inline-start" />
          New application
        </Button>
      </div>

      <div className="metric-grid">
        {[
          [BriefcaseBusiness, String(applications.length), 'Portfolios generated', 'Active & in sync'],
          [CircleUserRound, String(totalRecruiterViews), 'Recruiter views', totalRecruiterViews > 0 ? `For ${app?.company || 'Selected'}` : 'Tracking ready'],
          [TrendingUp, totalRecruiterViews > 0 ? '2m 45s' : '—', 'Avg. dwell time', totalRecruiterViews > 0 ? 'Verified session' : 'Awaiting visits'],
          [Rocket, String(readyCount), 'Active Sandboxes', `${readyCount} live on Vercel`],
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
              <h2 className="text-sm font-semibold text-white tracking-tight">Tailored portfolios</h2>
              <p className="text-[11px] text-zinc-400">Click any portfolio to open its live editor &amp; sandbox.</p>
            </div>
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search portfolios..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="h-8 pl-8 pr-3 rounded-lg bg-[#0e1116] border border-white/10 hover:border-white/20 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 text-xs text-zinc-200 placeholder:text-zinc-500 transition-all outline-none w-52 sm:w-64"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="p-8 text-center text-zinc-400 text-xs">
              <p>No portfolios match your search.</p>
              <Button size="sm" variant="outline" className="mt-3 text-xs" onClick={openStudio}>
                Create new portfolio
              </Button>
            </div>
          ) : (
            <div className="app-list">
              {filtered.map((a, i) => (
                <div
                  key={a.id || a.chatId || a.company + i}
                  className={`app-row ${selected === i ? 'selected' : ''} group relative cursor-pointer transition-colors`}
                  onClick={() => setSelected(i)}
                  onDoubleClick={() => onSelectApplication(a)}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-white/[0.04] border border-white/10 text-zinc-200 shrink-0 font-mono shadow-inner">
                    {a.company.slice(0, 1)}
                  </span>
                  <div className="app-primary flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <strong className="text-white text-xs truncate font-medium">{a.role}</strong>
                      <span className="text-[11px] text-purple-300/80 font-mono font-medium">@{a.company}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-zinc-400">{a.candidateName}</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-[11px] text-zinc-500 font-mono truncate max-w-[140px]" title={a.selectedDesign}>
                        {formatDesignLabel(a.selectedDesign, 20)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {a.status === 'generating' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1.5 font-mono font-medium">
                        <Loader2 className="w-2.5 h-2.5 animate-spin" /> Compiling
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live
                      </span>
                    )}

                    <button
                      type="button"
                      title={`Open Live Studio for ${a.company}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectApplication(a)
                      }}
                      className="px-2.5 py-1 rounded-md text-xs font-medium text-zinc-200 bg-white/[0.05] hover:bg-purple-600 hover:text-white border border-white/10 hover:border-purple-500 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <Code2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                      <span>Studio</span>
                    </button>

                    <button
                      type="button"
                      title="Preview live site in new tab"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(a.previewUrl, '_blank')
                      }}
                      className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer border border-transparent hover:border-white/10"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      title="Copy preview link"
                      onClick={(e) => handleCopyLink(e, a)}
                      className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer border border-transparent hover:border-white/10"
                    >
                      {copiedId === (a.id || a.chatId) ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      title="Delete portfolio"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (confirm(`Remove portfolio for ${a.company}?`)) {
                          onDeleteApplication(a.id || a.chatId)
                        }
                      }}
                      className="p-1.5 rounded hover:bg-red-500/20 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {app && (
          <aside className="intel-panel">
            <div className="intel-head">
              <div>
                <span className="company-mark" style={{ '--company-color': app.color || '#8b5cf6' } as React.CSSProperties}>
                  {app.company.slice(0, 1)}
                </span>
                <div>
                  <small className="text-zinc-400 block text-[10px]">Active Portfolio Selection</small>
                  <h2 className="text-sm font-semibold text-white">{app.company}</h2>
                </div>
              </div>
              <button
                aria-label="Open portfolio preview in new tab"
                title="Open fullscreen preview"
                onClick={() => window.open(app.previewUrl, '_blank')}
                className="cursor-pointer"
              >
                <ExternalLink />
              </button>
            </div>

            <div className="p-4 border-b border-white/5 space-y-3 bg-zinc-950/40">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono block">Target Role</span>
                <span className="text-xs font-medium text-white">{app.role}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono block">Candidate</span>
                <span className="text-xs text-zinc-300">{app.candidateName}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono block">Design Foundation</span>
                <span
                  className="text-xs text-purple-300 font-mono block max-h-24 overflow-y-auto leading-relaxed bg-zinc-900/60 p-2 rounded border border-white/5 break-words"
                  title={app.selectedDesign}
                >
                  {app.selectedDesign}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2.5">
              <button
                type="button"
                className="w-full rounded-lg bg-gradient-to-r from-purple-950/80 via-indigo-950/70 to-purple-900/70 hover:from-purple-900 hover:to-indigo-900 text-white font-medium text-xs py-2.5 px-3.5 border border-purple-500/30 hover:border-purple-400/50 shadow-md shadow-purple-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer group active:scale-[0.99]"
                onClick={() => onSelectApplication(app)}
              >
                <Code2 className="w-4 h-4 text-purple-300" />
                <span>Open in Live Studio &amp; Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto text-purple-300/80 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                className="w-full rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs py-2 px-3.5 font-medium transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                onClick={() => window.open(app.previewUrl, '_blank')}
              >
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                <span>Open Fullsite Preview</span>
              </button>
            </div>

            <div className="intel-feed">
              <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-white/[0.06]">
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5 mb-0">
                  <span>Telemetry</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-200 normal-case font-sans font-medium">{app.company}</span>
                </h3>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Radar
                </span>
              </div>

              {loadingActivity ? (
                <div className="py-6 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                  <span>Loading telemetry...</span>
                </div>
              ) : activityEvents.length === 0 ? (
                <div className="p-4 rounded-xl bg-gradient-to-b from-[#111419]/90 to-[#0c0e12]/90 border border-white/[0.08] space-y-2.5 text-left shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Signal Telemetry Active</span>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-200 font-medium tracking-tight">
                    No external recruiter visits recorded yet.
                  </p>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">
                    Impressions, session dwell time, and device telemetry will update here automatically as recruiters open your link.
                  </p>
                  <button
                    type="button"
                    onClick={(e) => handleCopyLink(e, app)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 rounded-lg border border-purple-500/25 hover:border-purple-500/40 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    <Copy className="w-3.5 h-3.5 text-purple-400" />
                    <span>Copy Candidate Link</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {activityEvents.map((evt: any) => {
                    const isView = evt.type === 'recruiter_view'
                    return (
                      <article key={evt.id} className="flex gap-2.5 py-1.5 border-b border-white/5 last:border-0">
                        <span
                          className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                            isView ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-purple-400'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-zinc-200 leading-snug">
                            {evt.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-zinc-400 font-mono">
                              {formatRelativeTime(evt.timestamp)}
                            </span>
                            {evt.description && (
                              <>
                                <span className="text-zinc-600">·</span>
                                <span className="text-[10px] text-zinc-400 font-mono truncate" title={evt.description}>
                                  {evt.description}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

export function GrtrApp() {
  const [active, setActive] = useState(4)
  const [isCreatingNew, setIsCreatingNew] = useState(false)

  // Application State
  const [resumeText, setResumeText] = useState('')
  const [resumeFileName, setResumeFileName] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [selectedDesign, setSelectedDesign] = useState('Minimal Monochrome')
  const [selectedSkills, setSelectedSkills] = useState<AgentSkill[]>([])

  // Pipeline State
  const [isGeneratingBlueprint, setIsGeneratingBlueprint] = useState(false)
  const [isBuildingPortfolio, setIsBuildingPortfolio] = useState(false)
  const [blueprint, setBlueprint] = useState<StrategicBlueprint | null>(null)
  const [chatId, setChatId] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Tracked Applications
  const [applications, setApplications] = useState<ApplicationItem[]>(initialApplications)
  const [isUnlocked, setIsUnlocked] = useState(false)

  // Verify paid subscription status or checkout success
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('checkout') === 'success') {
        localStorage.setItem('grtr_user_paid_status', 'active')
        setIsUnlocked(true)
      } else {
        const stored =
          localStorage.getItem('grtr_user_paid_status') === 'active' ||
          localStorage.getItem('grtr_dev_subscription_unlocked') === 'true'
        if (stored) {
          setIsUnlocked(true)
        }
      }
    }
  }, [])

  // Handler: Start a fresh new portfolio creation
  const handleStartNewApplication = () => {
    setResumeText('')
    setResumeFileName('')
    setJobDescription('')
    setSelectedDesign('Minimal Monochrome')
    setBlueprint(null)
    setErrorMessage(null)
    setIsCreatingNew(true)
    setActive(1)
  }

  // Handler: Cancel creation and return to Portfolios
  const handleCancelNewApplication = () => {
    setIsCreatingNew(false)
    setActive(4)
  }

  // Helper: Background sync portfolio to Supabase cloud
  const syncAppToCloud = useCallback((app: ApplicationItem) => {
    if (!app.chatId) return
    fetch('/api/portfolios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: app.chatId,
        candidate_name: app.candidateName || 'Candidate',
        target_company: app.company || 'Target Company',
        target_role: app.role || 'Executive Role',
        strategic_angle: app.plan || null,
        blueprint: app.blueprint || null,
        theme: app.selectedDesign || 'obsidian',
        status: app.status || 'deployed',
      }),
    }).catch(() => {})
  }, [])

  // Helper: Delete portfolio from Supabase cloud
  const deleteAppFromCloud = useCallback((chatId: string) => {
    if (!chatId) return
    fetch(`/api/portfolios?chatId=${encodeURIComponent(chatId)}`, {
      method: 'DELETE',
    }).catch(() => {})
  }, [])

  // Mark an application ready once v0 sandbox finishes compiling
  const markApplicationReady = useCallback((targetChatId: string) => {
    if (!targetChatId) return
    setApplications(prev => {
      let changed = false
      const updated = prev.map(a => {
        if (a.chatId === targetChatId && a.status !== 'ready') {
          changed = true
          const readyApp = { ...a, status: 'ready' as const }
          syncAppToCloud(readyApp)
          return readyApp
        }
        return a
      })
      if (changed) {
        try {
          localStorage.setItem('grtr_saved_portfolios_v1', JSON.stringify(updated))
        } catch (e) {
          console.warn(e)
        }
        return updated
      }
      return prev
    })
  }, [syncAppToCloud])

  // Restore saved portfolios and active session from localStorage & Supabase
  useEffect(() => {
    let localSaved: ApplicationItem[] = []
    try {
      const savedApps = localStorage.getItem('grtr_saved_portfolios_v1')
      if (savedApps) {
        const parsed = JSON.parse(savedApps)
        if (Array.isArray(parsed) && parsed.length > 0) {
          localSaved = parsed
          setApplications(parsed)
        }
      }
      const savedSession = localStorage.getItem('grtr_active_portfolio_session_v1')
      if (savedSession) {
        const parsed = JSON.parse(savedSession)
        if (parsed.chatId) setChatId(parsed.chatId)
        if (parsed.previewUrl) setPreviewUrl(parsed.previewUrl)
        if (parsed.selectedDesign) setSelectedDesign(parsed.selectedDesign)
        if (parsed.blueprint) setBlueprint(parsed.blueprint)
      }
    } catch (err) {
      console.warn('Failed to load saved portfolios from localStorage:', err)
    }

    // Reconcile with Supabase cloud store in background
    fetch('/api/portfolios')
      .then(res => res.json())
      .then(data => {
        const cloudList = data?.portfolios || []
        const cloudChatIds = new Set(cloudList.map((p: any) => p.chat_id))

        // Migrate any pre-existing local portfolios up to Supabase cloud
        if (localSaved.length > 0) {
          localSaved.forEach(localApp => {
            if (localApp.chatId && !cloudChatIds.has(localApp.chatId)) {
              syncAppToCloud(localApp)
            }
          })
        }

        if (cloudList.length > 0) {
          setApplications(prev => {
            const cloudApps: ApplicationItem[] = cloudList.map((p: any) => ({
              id: p.chat_id,
              chatId: p.chat_id,
              candidateName: p.candidate_name,
              company: p.target_company,
              role: p.target_role,
              selectedDesign: p.theme || 'obsidian',
              status: 'ready' as const,
              createdAt: p.created_at ? new Date(p.created_at).toLocaleDateString() : 'Recently',
              previewUrl: `/api/preview/${p.chat_id}`,
              blueprint: p.blueprint,
              url: `grtr.app/p/${(p.candidate_name || 'candidate').toLowerCase().replace(/\s+/g, '')}/${(p.target_company || 'company').toLowerCase().replace(/\s+/g, '')}`,
              plan: 'Plus',
              views: 1,
              time: 'Active',
              last: 'Live',
              color: '#8b5cf6',
            }))

            const map = new Map<string, ApplicationItem>()
            prev.forEach(item => {
              if (item.chatId) map.set(item.chatId, item)
            })
            cloudApps.forEach(item => {
              if (item.chatId && !map.has(item.chatId)) {
                map.set(item.chatId, item)
              }
            })
            const merged = Array.from(map.values())
            try {
              localStorage.setItem('grtr_saved_portfolios_v1', JSON.stringify(merged))
            } catch (e) {}
            return merged
          })
        }
      })
      .catch(() => {})
  }, [syncAppToCloud])

  // Handler: Select an application to open in Live Studio
  const handleSelectApplication = (appItem: ApplicationItem) => {
    if (appItem.chatId) {
      setChatId(appItem.chatId)
      setPreviewUrl(appItem.previewUrl || `/api/preview/${appItem.chatId}`)
      if (appItem.blueprint) setBlueprint(appItem.blueprint)
      if (appItem.selectedDesign) setSelectedDesign(appItem.selectedDesign)
      setIsCreatingNew(false)
      setActive(3) // Advance to Stage 3: Live Studio
    } else {
      handleStartNewApplication()
    }
  }

  // Handler: Delete an application
  const handleDeleteApplication = (id: string) => {
    deleteAppFromCloud(id)
    setApplications(prev => {
      const updated = prev.filter(a => a.id !== id && a.chatId !== id)
      try {
        localStorage.setItem('grtr_saved_portfolios_v1', JSON.stringify(updated))
      } catch (e) {
        console.warn(e)
      }
      return updated
    })
  }

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
          attachedSkills: selectedSkills,
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
        const fullPreviewUrl = data.previewUrl || `/api/preview/${data.chatId}`
        setChatId(data.chatId)
        setPreviewUrl(fullPreviewUrl)

        // Add to applications list & persist in localStorage
        const newApp: ApplicationItem = {
          id: data.chatId,
          chatId: data.chatId,
          previewUrl: fullPreviewUrl,
          role: blueprint.targetRole || 'Growth Executive',
          company: blueprint.targetCompany || 'Target Enterprise',
          candidateName: blueprint.candidateName,
          selectedDesign,
          blueprint,
          status: 'generating',
          createdAt: new Date().toISOString(),
          url: `grtr.app/p/${blueprint.candidateName.toLowerCase().replace(/\s+/g, '')}/${blueprint.targetCompany.toLowerCase().replace(/\s+/g, '')}`,
          plan: 'Plus',
          views: 1,
          time: 'Just now',
          last: 'Live now',
          color: '#8b5cf6',
        }

        setApplications(prev => {
          const filtered = prev.filter(a => a.chatId !== newApp.chatId && a.id !== newApp.id)
          const updated = [newApp, ...filtered]
          try {
            localStorage.setItem('grtr_saved_portfolios_v1', JSON.stringify(updated))
          } catch (e) {
            console.warn(e)
          }
          return updated
        })

        // Sync new portfolio to Supabase in background
        syncAppToCloud(newApp)

        // Persist active session so reload / back doesn't lose it
        try {
          localStorage.setItem('grtr_active_portfolio_session_v1', JSON.stringify({
            chatId: data.chatId,
            previewUrl: fullPreviewUrl,
            selectedDesign,
            blueprint,
            active: 3,
          }))
        } catch (e) {
          console.warn(e)
        }

        setIsCreatingNew(false)
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

  const handleUpdateCaseStudies = (newCaseStudies: CaseStudyItem[]) => {
    if (blueprint) {
      setBlueprint({ ...blueprint, caseStudies: newCaseStudies })
    }
  }

  return (
    <div className="grtr-app">
      <div className="ambient-bg" aria-hidden="true" />
      <Header
        active={active}
        setActive={setActive}
        isCreatingNew={isCreatingNew}
        onStartNew={handleStartNewApplication}
        onCancelNew={handleCancelNewApplication}
        activeCandidateName={blueprint?.candidateName}
        activeCompanyName={blueprint?.targetCompany}
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
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
              onGenerate={handleGenerateBlueprint}
              isGeneratingBlueprint={isGeneratingBlueprint}
              error={errorMessage}
              onCancel={handleCancelNewApplication}
            />
          )}
          {active === 2 && blueprint && (
            <Blueprint
              blueprint={blueprint}
              onBack={() => setActive(1)}
              onBuild={handleBuildPortfolio}
              isBuildingPortfolio={isBuildingPortfolio}
              onUpdateHook={handleUpdateHook}
              onUpdateCaseStudies={handleUpdateCaseStudies}
            />
          )}
          {active === 3 && (
            <LiveStudio
              blueprint={blueprint}
              chatId={chatId}
              previewUrl={previewUrl}
              selectedDesign={selectedDesign}
              onMarkReady={markApplicationReady}
              onBackToPortfolios={() => setActive(4)}
            />
          )}
          {active === 4 && (
            <AnalyticsView
              openStudio={handleStartNewApplication}
              onSelectApplication={handleSelectApplication}
              onDeleteApplication={handleDeleteApplication}
              applications={applications}
              onMarkReady={markApplicationReady}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isGeneratingBlueprint && <SynthesisHUD />}
      </AnimatePresence>

      {!isUnlocked && (
        <PaywallModal
          onUnlocked={() => setIsUnlocked(true)}
        />
      )}
    </div>
  )
}
