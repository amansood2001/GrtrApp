'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Send,
  Loader2,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  Copy,
  Paperclip,
  X,
  Brain,
  Terminal,
  FileCode,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Wrench,
  Check,
  Search,
  Lock,
} from 'lucide-react'
import type { CaseStudyItem } from '@/lib/types'
import { CURATED_SKILLS, type AgentSkill } from '@/lib/skills-registry'
import { Zap, Command } from 'lucide-react'

export const portfolioPlaceholders = {
  role: 'Head of Growth',
  company: 'Target Company',
  teardown: 'Strategic Opportunity',
  location: 'San Francisco, CA / Remote',
  result: '+142%',
}

const defaultProjects: CaseStudyItem[] = [
  { title: 'Category Positioning', detail: 'Architected a narrative connecting deep enterprise customer research to market leadership.', metric: '+142%', metricLabel: 'Pipeline Growth' },
  { title: 'Enterprise Go-To-Market', detail: 'Structured a multi-segment motion aligning product velocity, sales engineering, and demand.', metric: '3.4×', metricLabel: 'Revenue Velocity' },
  { title: 'Growth Operating System', detail: 'Built a full-funnel quantitative engine for high-velocity experimentation and retention.', metric: '−31%', metricLabel: 'Customer Acquisition Cost' },
  { title: 'Customer Discovery Loop', detail: 'Synthesized 50+ executive interviews into core roadmap decisions unlocking tier-1 accounts.', metric: '$4.8M', metricLabel: 'Net Expansion' },
  { title: 'Retention & Expansion Architecture', detail: 'Redesigned the post-sales expansion journey to compound net revenue retention.', metric: '+48%', metricLabel: 'Net Retention' },
]

export function ProjectHighlights({
  caseStudies,
  isReordering,
  onReorder,
}: {
  caseStudies?: CaseStudyItem[]
  isReordering?: boolean
  onReorder?: (items: CaseStudyItem[]) => void
}) {
  const items = caseStudies && caseStudies.length > 0 ? caseStudies : defaultProjects

  const moveItem = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= items.length) return
    const next = [...items]
    const [moved] = next.splice(fromIdx, 1)
    next.splice(toIdx, 0, moved)
    onReorder?.(next)
  }

  return (
    <div className="case-grid space-y-2.5">
      {items.map((item, idx) => (
        <article
          className={`case-card transition-all ${
            isReordering ? 'border-purple-500/50 bg-purple-950/20 shadow-md shadow-purple-950/30' : ''
          }`}
          key={item.title + idx}
        >
          <div className="case-content flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="case-index-pill font-mono text-[9px] text-purple-300 bg-purple-500/20 px-1.5 py-0.5 rounded border border-purple-500/30 font-semibold">
                Case 0{idx + 1}
              </span>
              <small className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                Verified Evidence
              </small>

              {isReordering && (
                <div className="ml-auto flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveItem(idx, idx - 1)}
                    className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-800 hover:bg-purple-600 disabled:opacity-30 disabled:hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 transition cursor-pointer"
                    title="Move this case study up"
                  >
                    <ArrowUp className="w-2.5 h-2.5" />
                    <span>Up</span>
                  </button>
                  <button
                    type="button"
                    disabled={idx === items.length - 1}
                    onClick={() => moveItem(idx, idx + 1)}
                    className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-800 hover:bg-purple-600 disabled:opacity-30 disabled:hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 transition cursor-pointer"
                    title="Move this case study down"
                  >
                    <ArrowDown className="w-2.5 h-2.5" />
                    <span>Down</span>
                  </button>
                </div>
              )}
            </div>
            <h3 className="text-base font-semibold text-white mb-1.5 leading-snug">{item.title}</h3>
            <p className="text-xs text-zinc-300 leading-relaxed mb-2">{item.detail}</p>
          </div>
          <div className="case-metric shrink-0">
            <strong>{item.metric}</strong>
            <small>{item.metricLabel || 'Verified Impact'}</small>
          </div>
        </article>
      ))}
    </div>
  )
}

export type MessagePart =
  | {
      type: 'thinking'
      text: string
      startedAt?: string | Date
      finishedAt?: string | Date
    }
  | {
      type: 'file-read'
      paths: string[]
      startedAt?: string | Date
      finishedAt?: string | Date
    }
  | {
      type: 'file-edit'
      operation: 'create' | 'update' | 'delete' | 'rename' | 'patch'
      path: string
      toPath?: string
      startedAt?: string | Date
      finishedAt?: string | Date
    }
  | {
      type: 'bash'
      command: string
      output?: string
      exitCode?: number | null
      startedAt?: string | Date
      finishedAt?: string | Date
    }
  | {
      type: 'search'
      scope: 'repo' | 'web'
      query: string
      startedAt?: string | Date
      finishedAt?: string | Date
    }
  | {
      type: 'tool-call' | 'agent-action'
      [key: string]: any
    }
  | {
      type: 'text'
      text: string
      startedAt?: string | Date
      finishedAt?: string | Date
    }

export interface StudioMessage {
  id?: string
  role: 'user' | 'assistant'
  text?: string
  content?: string
  parts?: MessagePart[]
  attachedFiles?: string[]
  attachedSkills?: string[]
  status?: 'streaming' | 'done' | 'error'
  error?: string
  publicUrl?: string
}

export interface ChatAttachment {
  url: string
  name: string
  contentType: string
}

interface StudioChatProps {
  chatId?: string | null
  onUpdatePreview?: () => void
  onAgentStatusChange?: (status: { active: boolean; currentStep?: string }) => void
  contextLabel?: string
  onReady?: () => void
  refreshKey?: number
}

function friendlyFileName(path: string): string {
  if (path.includes('globals.css')) return 'portfolio theme'
  if (path.includes('page.tsx')) return 'page shell'
  if (path.includes('layout.tsx')) return 'layout & fonts'
  if (path.includes('executive-portfolio.tsx')) return 'portfolio UI'
  if (path.includes('next.config')) return 'next build config'
  if (path.includes('package.json')) return 'project dependencies'
  return path.split('/').pop() || path
}

function calculateSeconds(startedAt?: string | Date, finishedAt?: string | Date): number | null {
  if (!startedAt || !finishedAt) return null
  const s = new Date(startedAt).getTime()
  const f = new Date(finishedAt).getTime()
  if (isNaN(s) || isNaN(f)) return null
  return Math.max(1, Math.round((f - s) / 1000))
}

function ThinkingBlock({ part, isStreaming }: { part: { text: string; startedAt?: string | Date; finishedAt?: string | Date }; isStreaming?: boolean }) {
  const [open, setOpen] = useState(false)
  const duration = calculateSeconds(part.startedAt, part.finishedAt)

  return (
    <div className="my-1.5 rounded-lg border border-white/10 bg-zinc-900/60 overflow-hidden text-xs">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Brain className={`w-3.5 h-3.5 ${isStreaming && !part.finishedAt ? 'text-purple-400 animate-pulse' : 'text-zinc-400'}`} />
          <span className="font-medium text-[11px]">
            {duration ? `Thought for ${duration}s` : isStreaming && !part.finishedAt ? 'Thinking through layout...' : 'Thought process'}
          </span>
        </div>
        {open ? <ChevronDown className="w-3 h-3 text-zinc-500" /> : <ChevronRight className="w-3 h-3 text-zinc-500" />}
      </button>
      {open && (
        <div className="px-3 pb-2.5 pt-1 text-zinc-400 font-mono text-[11px] leading-relaxed whitespace-pre-wrap border-t border-white/5 max-h-56 overflow-y-auto">
          {part.text || 'Analyzing layout structure and directives...'}
        </div>
      )}
    </div>
  )
}

function FileReadBlock({ paths }: { paths: string[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="my-1 rounded-lg border border-white/10 bg-zinc-900/40 text-xs overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[11px] font-medium">Explore • {paths.length} {paths.length === 1 ? 'File' : 'Files'}</span>
        </div>
        {open ? <ChevronDown className="w-3 h-3 text-zinc-500" /> : <ChevronRight className="w-3 h-3 text-zinc-500" />}
      </button>
      {open && (
        <div className="px-3 py-1.5 border-t border-white/5 space-y-1">
          {paths.map((p, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
              <span className="text-zinc-500">↳</span>
              <span>Reviewed {friendlyFileName(p)}</span>
              <span className="text-zinc-600 text-[10px]">({p})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FileEditBlock({ part }: { part: { operation: string; path: string } }) {
  const isCreate = part.operation === 'create'
  return (
    <div className="my-1 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-zinc-900/40 text-xs">
      <FileCode className={`w-3.5 h-3.5 ${isCreate ? 'text-emerald-400' : 'text-purple-400'}`} />
      <span className="font-medium text-[11px] text-zinc-300">
        {isCreate ? 'Created' : 'Updated'} {friendlyFileName(part.path)}
      </span>
      <span className="text-zinc-600 font-mono text-[10px] ml-auto truncate max-w-[140px]">{part.path}</span>
    </div>
  )
}

function BashBlock({ part }: { part: { command: string; output?: string } }) {
  const [open, setOpen] = useState(false)
  const isBuild = part.command.includes('build')
  const isBrowser = part.command.includes('agent-browser')

  let title = 'Executed task'
  if (isBuild) title = 'Checked redesigned build'
  else if (isBrowser) title = 'Verified interactive browser preview'
  else if (part.command.includes('shadcn')) title = 'Configured UI primitives'

  return (
    <div className="my-1 rounded-lg border border-white/10 bg-zinc-900/40 text-xs overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium text-[11px]">{title}</span>
        </div>
        {open ? <ChevronDown className="w-3 h-3 text-zinc-500" /> : <ChevronRight className="w-3 h-3 text-zinc-500" />}
      </button>
      {open && (
        <div className="p-2.5 bg-black/60 border-t border-white/5 font-mono text-[10.5px] text-zinc-300 overflow-x-auto max-h-48 overflow-y-auto space-y-1">
          <div className="text-zinc-500">$ {part.command}</div>
          {part.output && <div className="text-zinc-400 whitespace-pre-wrap">{part.output}</div>}
        </div>
      )}
    </div>
  )
}

function MarkdownRenderer({ content }: { content: string }) {
  const urlMatch = content.match(/(https?:\/\/[^\s\)\*]+)/)
  const url = urlMatch ? urlMatch[1] : null

  // Simple, clean markdown line-by-line renderer
  const lines = content.split('\n')

  return (
    <div className="w-full space-y-2 text-xs text-zinc-200 leading-relaxed font-sans">
      {lines.map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) return <div key={idx} className="h-1" />

        // Skip raw markdown duplicate button text like [Open Live Site](...)Copy Link
        if (trimmed.startsWith('[Open Live Site]') || trimmed.startsWith('[Open Live Portfolio]')) {
          return null
        }

        // Bullet point
        if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
          const itemText = trimmed.replace(/^[-•*]\s*/, '')
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-purple-400 mt-1 shrink-0">•</span>
              <span className="flex-1">{renderFormattedInline(itemText)}</span>
            </div>
          )
        }

        // Header ###
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="font-semibold text-white text-xs pt-1">
              {trimmed.slice(4)}
            </h4>
          )
        }

        // Header ##
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="font-bold text-white text-sm pt-1">
              {trimmed.slice(3)}
            </h3>
          )
        }

        return <p key={idx} className="m-0 leading-relaxed">{renderFormattedInline(line)}</p>
      })}

      {url && (
        <div className="mt-3 p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active & Interactive
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">Public Preview</span>
          </div>
          <div className="text-xs text-zinc-300 font-mono bg-black/40 px-2.5 py-1.5 rounded border border-white/5 truncate">
            {url}
          </div>
          <div className="flex items-center gap-2 pt-1">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors no-underline shadow-sm cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Live Site</span>
            </a>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(url)
                alert('Live link copied to clipboard!')
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer border border-zinc-700"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function renderFormattedInline(text: string) {
  // Replace **bold** with <strong>
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      )
    }
    // Replace `code` with <code>
    const subparts = part.split(/(`[^`]+`)/g)
    return subparts.map((sub, j) => {
      if (sub.startsWith('`') && sub.endsWith('`')) {
        return (
          <code key={j} className="px-1 py-0.5 rounded bg-zinc-800 font-mono text-[11px] text-purple-300">
            {sub.slice(1, -1)}
          </code>
        )
      }
      return sub
    })
  })
}

function UserMessageBubble({ message }: { message: StudioMessage }) {
  const [expanded, setExpanded] = useState(false)
  let textContent = message.text || ''
  if (!textContent && Array.isArray(message.parts)) {
    const textParts = (message.parts as any[])
      .filter((p: any) => p && (p.type === 'text' || typeof p.text === 'string'))
      .map((p: any) => p.text || '')
      .filter(Boolean)
    if (textParts.length > 0) {
      textContent = textParts.join('\n\n')
    }
  }
  const isGiantPrompt =
    textContent.length > 800 ||
    textContent.includes('Build an extraordinary, bespoke executive career portfolio')

  if (!isGiantPrompt) {
    return (
      <div className="user-message">
        {((message.attachedSkills && message.attachedSkills.length > 0) || (message.attachedFiles && message.attachedFiles.length > 0)) && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {message.attachedSkills?.map((skillName, sIdx) => (
              <span
                key={`s-${sIdx}`}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30"
              >
                <Zap className="w-2.5 h-2.5 text-purple-400" />
                <span>{skillName}</span>
              </span>
            ))}
            {message.attachedFiles?.map((name, fIdx) => (
              <span
                key={`f-${fIdx}`}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 text-[10px] font-mono border border-white/10"
              >
                <Paperclip className="w-2.5 h-2.5 text-zinc-400" />
                <span>{name}</span>
              </span>
            ))}
          </div>
        )}
        <div className="whitespace-pre-wrap">{message.text}</div>
      </div>
    )
  }

  return (
    <div className="user-message border border-purple-500/30 bg-purple-950/20 p-3 rounded-lg">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-purple-300 font-semibold">
          <Sparkles className="w-3 h-3 text-purple-400" />
          Initial Portfolio Architecture Directive
        </span>
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          className="text-[10px] font-mono text-purple-400 hover:text-purple-300 underline cursor-pointer"
        >
          {expanded ? 'Collapse' : 'View Full Prompt'}
        </button>
      </div>
      <p className="text-xs text-zinc-300 mb-0 leading-relaxed">
        Executive architecture directive synthesized from candidate CV, verified company research, and custom design foundation.
      </p>
      {expanded && (
        <div className="mt-2.5 pt-2.5 border-t border-purple-500/20 text-[11px] font-mono text-zinc-400 max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed">
          {message.text}
        </div>
      )}
    </div>
  )
}

export function StudioChat({ chatId, onUpdatePreview, onAgentStatusChange, contextLabel, onReady, refreshKey }: StudioChatProps) {
  const [draft, setDraft] = useState('')
  const [attachments, setAttachments] = useState<ChatAttachment[]>([])
  const [attachedSkills, setAttachedSkills] = useState<any[]>([])
  const [showSkillPicker, setShowSkillPicker] = useState(false)
  const [skillSearchInput, setSkillSearchInput] = useState('')
  const [remoteSkills, setRemoteSkills] = useState<any[]>([])
  const [isSearchingSkills, setIsSearchingSkills] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const skillPickerRef = useRef<HTMLDivElement>(null)

  // Close skill picker when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (skillPickerRef.current && !skillPickerRef.current.contains(e.target as Node)) {
        setShowSkillPicker(false)
      }
    }
    if (showSkillPicker) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSkillPicker])

  // Live skills.sh search with debounce
  useEffect(() => {
    const trimmed = skillSearchInput.trim()
    if (!trimmed) {
      setRemoteSkills([])
      setIsSearchingSkills(false)
      return
    }

    let cancelled = false
    setIsSearchingSkills(true)

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/skills?q=${encodeURIComponent(trimmed)}`)
        if (!res.ok) return
        const data = await res.json()
        if (data.success && Array.isArray(data.skills) && !cancelled) {
          setRemoteSkills(data.skills)
        }
      } catch (err) {
        console.warn('Skills search error:', err)
      } finally {
        if (!cancelled) setIsSearchingSkills(false)
      }
    }, 200)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [skillSearchInput])

  const toggleAttachSkill = (skill: any) => {
    const skillKey = skill.id || skill.slug || skill.name
    const isAlreadyAttached = attachedSkills.some(s => (s.id || s.slug || s.name) === skillKey)

    if (isAlreadyAttached) {
      setAttachedSkills(prev => prev.filter(s => (s.id || s.slug || s.name) !== skillKey))
    } else {
      if (attachedSkills.length >= 3) return
      setAttachedSkills(prev => [...prev, skill])
      if (draft.startsWith('/')) {
        setDraft('')
      }
    }
  }

  const removeAttachedSkill = (skillKey: string) => {
    setAttachedSkills(prev => prev.filter(s => (s.id || s.slug || s.name) !== skillKey))
  }

  const handleDraftChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setDraft(val)
    if (val.startsWith('/')) {
      const slashQuery = val.slice(1).trim()
      setSkillSearchInput(slashQuery)
      setShowSkillPicker(true)
    }
  }

  const displaySkills = skillSearchInput.trim()
    ? remoteSkills
    : CURATED_SKILLS.slice(0, 10)
  const [messages, setMessages] = useState<StudioMessage[]>([
    {
      role: 'assistant',
      text: chatId
        ? `Live studio connected. I can adjust your positioning, re-order evidence, sharpen the strategic teardown, or swap in custom assets in real-time.`
        : `Executive Studio Copilot ready. Prompt any modification to your strategic positioning, company teardown, or interaction physics.`,
      status: 'done',
    },
  ])
  const [streaming, setStreaming] = useState(false)
  const busy = useRef(false)
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [messages, streaming])

  // Load message history from v0 when chatId is available or on manual refresh
  useEffect(() => {
    if (!chatId) return

    let cancelled = false
    async function loadHistory() {
      try {
        const res = await fetch(`/api/chat?chatId=${encodeURIComponent(chatId!)}&_t=${Date.now()}`, {
          cache: 'no-store',
        })
        if (!res.ok) return
        const data = await res.json()
        if (data.success && Array.isArray(data.messages) && data.messages.length > 0 && !cancelled) {
          const loaded: StudioMessage[] = data.messages.map((m: any) => {
            let text = m.text || m.content || ''
            if (!text && Array.isArray(m.parts)) {
              const textParts = m.parts
                .filter((p: any) => p && (p.type === 'text' || typeof p.text === 'string'))
                .map((p: any) => p.text || '')
                .filter(Boolean)
              if (textParts.length > 0) {
                text = textParts.join('\n\n')
              }
            }
            return {
              id: m.id,
              role: m.role,
              text,
              parts: m.parts || [],
              status: 'done',
            }
          })
          setMessages(loaded)
          if (data.isReady && onReady) {
            onReady()
          }
        }
      } catch (e) {
        console.warn('Could not load chat history:', e)
      }
    }

    loadHistory()
    return () => {
      cancelled = true
    }
  }, [chatId, refreshKey])

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach(file => {
      if (file.size > 8 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 8MB limit.`)
        return
      }

      const reader = new FileReader()
      reader.onload = ev => {
        const result = ev.target?.result as string
        if (result) {
          setAttachments(prev => [
            ...prev,
            {
              url: result,
              name: file.name,
              contentType: file.type || 'image/png',
            },
          ])
        }
      }
      reader.readAsDataURL(file)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  function determineCurrentStep(parts: MessagePart[]): string {
    if (!parts || parts.length === 0) return 'Analyzing directive...'
    const last = parts[parts.length - 1]
    if (last.type === 'thinking') return 'Reasoning through layout...'
    if (last.type === 'file-read') return `Reading ${last.paths.length} project file${last.paths.length > 1 ? 's' : ''}...`
    if (last.type === 'file-edit') return `${last.operation === 'create' ? 'Creating' : 'Updating'} ${friendlyFileName(last.path)}...`
    if (last.type === 'bash') {
      if (last.command.includes('build')) return 'Checking redesigned build...'
      if (last.command.includes('agent-browser')) return 'Verifying interactive preview...'
      return 'Running compilation check...'
    }
    if (last.type === 'text') return 'Finalizing updates...'
    return 'Refining portfolio...'
  }

  async function send(text: string) {
    const currentAttachments = [...attachments]
    const currentSkills = [...attachedSkills]
    const value = text.trim() || (currentAttachments.length > 0 || currentSkills.length > 0 ? 'Please apply the attached assets and skills to the portfolio layout.' : '')
    if (!value || busy.current) return
    busy.current = true

    // Append user message
    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        text: value,
        attachedFiles: currentAttachments.map(a => a.name),
        attachedSkills: currentSkills.map(s => s.name || s.skillId || s.id),
        status: 'done',
      },
      // Append assistant placeholder for streaming
      {
        role: 'assistant',
        parts: [],
        text: '',
        status: 'streaming',
      },
    ])

    setDraft('')
    setAttachments([])
    setAttachedSkills([])
    setShowSkillPicker(false)
    setSkillSearchInput('')
    setStreaming(true)
    onAgentStatusChange?.({ active: true, currentStep: 'Analyzing directive...' })

    if (chatId) {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chatId,
            message: value,
            contextLabel,
            attachments: currentAttachments,
            attachedSkills: currentSkills,
          }),
        })

        if (!res.ok) {
          const errData = await res.json().catch(() => ({ error: `Server returned HTTP ${res.status}` }))
          const errMsg = errData.error || `Server returned HTTP ${res.status}`
          const isQuota = errMsg.toLowerCase().includes('daily message limit') || errMsg.toLowerCase().includes('quota')

          setMessages(prev => {
            const next = [...prev]
            const lastIdx = next.length - 1
            if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
              next[lastIdx] = {
                ...next[lastIdx],
                status: 'error',
                error: errMsg,
                text: isQuota
                  ? `⚠️ **Daily Message Limit Reached**\n\nYour v0 account has hit its daily message quota limit.\n\nTo continue chatting and refining your portfolio, please upgrade your v0 plan to [v0 Plus](https://v0.app/settings) or wait for your daily quota to reset.`
                  : `⚠️ **Request Error**\n\n${errMsg}`,
              }
            }
            return next
          })
          onAgentStatusChange?.({ active: false, currentStep: isQuota ? 'Quota Exceeded' : 'Error' })
          return
        }

        const reader = res.body?.getReader()
        if (!reader) {
          throw new Error('No streaming body available')
        }

        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value: chunk } = await reader.read()
          if (done) break

          buffer += decoder.decode(chunk, { stream: true })
          const blocks = buffer.split('\n\n')
          buffer = blocks.pop() || ''

          for (const block of blocks) {
            const trimmed = block.trim()
            if (!trimmed.startsWith('data: ')) continue
            const jsonText = trimmed.slice(6).trim()
            if (!jsonText) continue

            try {
              const payload = JSON.parse(jsonText)
              const parts: MessagePart[] = payload.parts || []
              const status: 'streaming' | 'done' | 'error' = payload.status || 'streaming'

              // Extract assistant text prose from parts
              const textParts = parts.filter(p => p.type === 'text') as Array<{ type: 'text'; text: string }>
              const combinedText = textParts.map(p => p.text).join('\n\n')

              // Update the assistant message in real time
              setMessages(prev => {
                const next = [...prev]
                const lastIdx = next.length - 1
                if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
                  next[lastIdx] = {
                    ...next[lastIdx],
                    parts,
                    text: combinedText,
                    status,
                    error: payload.error,
                    publicUrl: payload.publicUrl,
                  }
                }
                return next
              })

              const stepText = determineCurrentStep(parts)
              onAgentStatusChange?.({
                active: status === 'streaming',
                currentStep: status === 'done' ? 'Completed' : stepText,
              })

              if (status === 'done') {
                // Auto-refresh the live preview iframe!
                onUpdatePreview?.()
              }
            } catch (parseErr) {
              console.warn('SSE block parse error:', parseErr)
            }
          }
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Network error'
        console.warn('Streaming error, attempting auto-recovery from v0 chat history:', msg)

        if (msg.toLowerCase().includes('daily message limit') || msg.toLowerCase().includes('quota')) {
          setMessages(prev => {
            const next = [...prev]
            const lastIdx = next.length - 1
            if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
              next[lastIdx] = {
                ...next[lastIdx],
                status: 'error',
                error: msg,
                text: `⚠️ **Daily Message Limit Reached**\n\nYour v0 account has hit its daily message quota limit.\n\nPlease upgrade your v0 plan to [v0 Plus](https://v0.app/settings) or wait for your daily quota to reset.`,
              }
            }
            return next
          })
          return
        }

        // If the server timed out (e.g. 504) or network dropped, v0 is often still completing the run in the background.
        // Poll /api/chat up to 8 times to retrieve the completed assistant reply!
        let recovered = false
        if (chatId) {
          setMessages(prev => {
            const next = [...prev]
            const lastIdx = next.length - 1
            if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
              next[lastIdx] = {
                ...next[lastIdx],
                status: 'streaming',
                text: 'v0 is compiling your response. Syncing completed reply...',
                error: undefined,
              }
            }
            return next
          })

          for (let attempt = 0; attempt < 8; attempt++) {
            await new Promise(r => setTimeout(r, 3000))
            try {
              const checkRes = await fetch(`/api/chat?chatId=${encodeURIComponent(chatId)}&_t=${Date.now()}`, { cache: 'no-store' })
              if (checkRes.ok) {
                const checkData = await checkRes.json()
                if (checkData.success && Array.isArray(checkData.messages)) {
                  const lastMsg = checkData.messages[checkData.messages.length - 1]
                  if (lastMsg && lastMsg.role === 'assistant' && (lastMsg.content || lastMsg.finishReason)) {
                    const loaded: StudioMessage[] = checkData.messages.map((m: any) => {
                      let text = m.text || m.content || ''
                      if (!text && Array.isArray(m.parts)) {
                        const textParts = (m.parts as any[])
                          .filter((p: any) => p && (p.type === 'text' || typeof p.text === 'string'))
                          .map((p: any) => p.text || '')
                          .filter(Boolean)
                        if (textParts.length > 0) text = textParts.join('\n\n')
                      }
                      return {
                        id: m.id,
                        role: m.role,
                        text,
                        parts: m.parts || [],
                        status: 'done' as const,
                      }
                    })
                    setMessages(loaded)
                    onUpdatePreview?.()
                    recovered = true
                    break
                  }
                }
              }
            } catch (pollErr) {
              console.warn('Recovery poll error:', pollErr)
            }
          }
        }

        if (!recovered) {
          setMessages(prev => {
            const next = [...prev]
            const lastIdx = next.length - 1
            if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
              next[lastIdx] = {
                ...next[lastIdx],
                status: 'error',
                error: msg,
                text: `Request timed out while v0 was reasoning (HTTP 504). Please refresh to sync v0's reply.`,
              }
            }
            return next
          })
        }
      } finally {
        busy.current = false
        setStreaming(false)
        onAgentStatusChange?.({ active: false, currentStep: 'Done' })
      }
    } else {
      // Local fallback if no live sandbox chatId is connected
      setTimeout(() => {
        setMessages(prev => {
          const next = [...prev]
          const lastIdx = next.length - 1
          if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
            next[lastIdx] = {
              ...next[lastIdx],
              status: 'done',
              text: `Directive received: "${value}". Calibrated positioning and refreshed interactive preview.`,
            }
          }
          return next
        })
        busy.current = false
        setStreaming(false)
        onAgentStatusChange?.({ active: false, currentStep: 'Done' })
        onUpdatePreview?.()
      }, 500)
    }
  }

  return (
    <div className="studio-chat-interactive">
      <div className="messages" role="log" aria-label="Studio chat history" aria-live="polite">
        {messages.map((m, i) => {
          if (m.role === 'user') {
            return <UserMessageBubble key={i} message={m} />
          }

          // Assistant message
          const parts = m.parts || []
          const hasParts = parts.length > 0
          let textContent = m.text || ''
          if (!textContent && hasParts) {
            const textParts = (parts as any[])
              .filter((p: any) => p && (p.type === 'text' || typeof p.text === 'string'))
              .map((p: any) => p.text || '')
              .filter(Boolean)
            if (textParts.length > 0) {
              textContent = textParts.join('\n\n')
            }
          }

          return (
            <div key={i} className="ai-message w-full flex flex-col space-y-3">
              {hasParts && (
                <div className="w-full space-y-1.5 mb-1">
                  {parts.map((p, pIdx) => {
                    if (p.type === 'thinking') {
                      return <ThinkingBlock key={pIdx} part={p} isStreaming={m.status === 'streaming'} />
                    }
                    if (p.type === 'file-read') {
                      return <FileReadBlock key={pIdx} paths={p.paths} />
                    }
                    if (p.type === 'file-edit') {
                      return <FileEditBlock key={pIdx} part={p} />
                    }
                    if (p.type === 'bash') {
                      return <BashBlock key={pIdx} part={p} />
                    }
                    return null
                  })}
                </div>
              )}

              {textContent ? (
                <div className="w-full">
                  <MarkdownRenderer content={textContent} />
                </div>
              ) : m.status === 'streaming' ? (
                <div className="flex items-center gap-2 text-xs text-purple-300 py-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                  <span>Agent is assembling your portfolio sandbox...</span>
                </div>
              ) : null}

              {m.error && (
                <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                  {m.error}
                </div>
              )}
            </div>
          )
        })}

        {streaming && (
          <p role="status" className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
            <span>v0 Agent live in progress…</span>
          </p>
        )}
        <div ref={end} />
      </div>

      {/* Suggestions: Only display when skill picker is closed and no skills are attached to preserve chat viewport */}
      {!showSkillPicker && attachedSkills.length === 0 && (
        <div className="suggestions">
          {[
            'Deploy and share the link on chat',
            'Sharpen company teardown & strategic thesis',
          ].map(text => (
            <button key={text} disabled={streaming} onClick={() => send(text)}>
              <span>{text}</span>
              <ArrowRight className="w-3 h-3 text-purple-400 shrink-0 ml-2" />
            </button>
          ))}
        </div>
      )}

      <div className="chat-composer relative">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileAttach}
          accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.pdf"
          className="hidden"
          multiple
        />

        {/* Clean V0-Style Skill Attachment Popover (UI/UX Pro Max Architecture) */}
        {showSkillPicker && (
          <div
            ref={skillPickerRef}
            className="skill-picker-popover absolute bottom-full left-0 right-0 mb-2 z-50 flex flex-col"
          >
            {/* Popover Header */}
            <div className="popover-header">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-white tracking-tight">Attach Skills to Prompt</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  {attachedSkills.length}/3 attached
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowSkillPicker(false)}
                className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="popover-search-container">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-white/10 focus-within:border-purple-500/60 transition">
                <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  value={skillSearchInput}
                  onChange={e => setSkillSearchInput(e.target.value)}
                  placeholder="Search skills.sh (e.g. ui-ux, chart, tailwind)..."
                  className="bg-transparent border-0 text-xs text-white placeholder-zinc-500 outline-none w-full font-sans"
                  autoFocus
                />
                {skillSearchInput && (
                  <button
                    type="button"
                    onClick={() => setSkillSearchInput('')}
                    className="text-zinc-500 hover:text-white text-xs cursor-pointer p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Skills List Container */}
            <div className="popover-list-container custom-scrollbar text-left">
              {isSearchingSkills ? (
                <div className="py-8 text-center text-xs text-zinc-400 font-mono flex items-center justify-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                  <span>Searching skills.sh...</span>
                </div>
              ) : displaySkills.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-400 font-mono">
                  No skills found matching "{skillSearchInput}"
                </div>
              ) : (
                displaySkills.map((skill: any) => {
                  const skillKey = skill.id || skill.slug || skill.name
                  const isAttached = attachedSkills.some(s => (s.id || s.slug || s.name) === skillKey)
                  const isMax = attachedSkills.length >= 3 && !isAttached

                  return (
                    <div
                      key={skillKey}
                      onClick={() => toggleAttachSkill(skill)}
                      className={`skill-item-card group ${isAttached ? 'is-attached' : ''} ${isMax ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      {/* Top Row: Name + Command Badge + Action Button */}
                      <div className="skill-card-top">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span className="text-xs font-semibold text-white group-hover:text-purple-200 transition truncate">
                            {skill.name || skill.skillId || skill.id}
                          </span>
                          <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 shrink-0">
                            /{skill.command?.replace('/', '') || skill.skillId || skill.slug || skill.name}
                          </span>
                        </div>

                        <div className="shrink-0 ml-2">
                          {isAttached ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              <Check className="w-3 h-3 text-emerald-400" /> Attached
                            </span>
                          ) : isMax ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-500 border border-white/5 bg-white/5">
                              <Lock className="w-3 h-3" /> 3/3 Limit
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-purple-600/30 group-hover:bg-purple-600 text-purple-200 group-hover:text-white border border-purple-500/40 transition">
                              + Attach
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Middle: Clear Description / Headline */}
                      <p className="text-[11px] text-zinc-400 leading-snug line-clamp-2 mt-1.5">
                        {skill.headline || skill.description || 'Native remote skill from skills.sh'}
                      </p>

                      {/* Bottom Row: Author + Uses */}
                      <div className="skill-card-bottom">
                        {skill.author && (
                          <span className="text-[10px] font-mono text-zinc-400">
                            by <span className="text-zinc-300">{skill.author}</span>
                          </span>
                        )}
                        {skill.installs ? (
                          <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                            <span className="text-zinc-600">•</span>
                            <span>{Number(skill.installs).toLocaleString()} uses</span>
                          </span>
                        ) : null}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* Sleek Attached Skills Tray (Low-profile single row) */}
        {attachedSkills.length > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#090b10] border-b border-white/10 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[10px] font-mono text-purple-400 shrink-0 font-medium flex items-center gap-1 mr-0.5">
              <Zap className="w-3 h-3 text-purple-400" />
              Skills ({attachedSkills.length}/3):
            </span>
            {attachedSkills.map(skill => {
              const skillKey = skill.id || skill.slug || skill.name
              return (
                <span
                  key={skillKey}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-200 text-[10px] font-mono whitespace-nowrap shrink-0 group"
                >
                  <span className="truncate max-w-[120px] font-medium">{skill.name || skill.skillId || skillKey}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachedSkill(skillKey)}
                    className="text-zinc-400 hover:text-white cursor-pointer ml-0.5"
                    title="Remove skill"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              )
            })}
          </div>
        )}

        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-1.5 p-2 bg-zinc-900/90 border-b border-white/10">
            {attachments.map((att, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] px-2 py-1 rounded-md">
                {att.contentType.startsWith('image/') ? (
                  <img src={att.url} alt={att.name} className="w-4 h-4 object-cover rounded" />
                ) : (
                  <Paperclip className="w-3 h-3 text-purple-400" />
                )}
                <span className="max-w-[120px] truncate">{att.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(idx)}
                  className="hover:text-white ml-0.5 cursor-pointer"
                  title="Remove attachment"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <textarea
          aria-label="Message Grtr"
          value={draft}
          onChange={handleDraftChange}
          placeholder={chatId ? 'Ask to refine copy, restyle, or swap in attached assets...' : 'Direct portfolio changes…'}
          onKeyDown={e => {
            if (e.nativeEvent.isComposing || e.keyCode === 229) return
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send(draft)
            }
          }}
        />
        <div className="flex items-center justify-between p-2 pt-1 border-t border-white/5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSkillPicker(prev => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer border ${
                attachedSkills.length > 0 || showSkillPicker
                  ? 'bg-purple-950/70 text-purple-200 border-purple-500/50 shadow-sm shadow-purple-950/40 ring-1 ring-purple-500/30'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border-white/10'
              }`}
              title="Attach skills from skills.sh (max 3)"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>Skills</span>
              {attachedSkills.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-purple-500/25 text-purple-300 border border-purple-500/30">
                  {attachedSkills.length}/3
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer border border-white/10"
              title="Attach screenshot or graphic to swap into portfolio"
            >
              <Paperclip className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
              <span>Attach</span>
            </button>
            <span
              className="text-[10px] font-mono text-zinc-400 hidden sm:inline-flex items-center gap-1.5 ml-1 shrink-0 whitespace-nowrap"
              title={chatId ? 'Live sandbox container connected' : 'Ready for input'}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              {chatId ? 'Live' : 'Ready'}
            </span>
          </div>

          <button
            type="button"
            aria-label="Send message"
            disabled={streaming || (!draft.trim() && attachments.length === 0 && attachedSkills.length === 0)}
            onClick={() => send(draft)}
            className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all cursor-pointer flex items-center justify-center shadow-md shadow-purple-950/50"
          >
            {streaming ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
