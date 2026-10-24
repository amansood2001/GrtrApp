'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Send, Loader2, RefreshCw, CheckCircle2, ExternalLink, Copy, Paperclip, X, Image as ImageIcon } from 'lucide-react'
import type { CaseStudyItem } from '@/lib/types'

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

export function ProjectHighlights({ caseStudies }: { caseStudies?: CaseStudyItem[] }) {
  const items = caseStudies && caseStudies.length > 0 ? caseStudies : defaultProjects
  const [indices, setIndices] = useState([0, 1 % items.length, 2 % items.length])

  // Sync if new case studies arrive
  useEffect(() => {
    if (caseStudies && caseStudies.length > 0) {
      setIndices([0, 1 % caseStudies.length, 2 % caseStudies.length])
    }
  }, [caseStudies])

  return (
    <div className="case-grid">
      {indices.map((index, slot) => {
        const item = items[index] || defaultProjects[0]
        return (
          <article className="case-card" key={slot}>
            <div className="case-content">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="case-index-pill font-mono text-[9px] text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                  Case 0{slot + 1}
                </span>
                <small className="text-[10px] uppercase font-mono tracking-wider text-muted">
                  Verified Evidence
                </small>
              </div>
              <h3 className="text-base font-semibold text-white mb-1.5 leading-snug">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{item.detail}</p>
              {items.length > 3 && (
                <button
                  type="button"
                  aria-label={`Swap project ${slot + 1}`}
                  onClick={() =>
                    setIndices(current =>
                      current.map((value, i) => (i === slot ? (value + 1) % items.length : value))
                    )
                  }
                  className="case-swap-btn"
                >
                  <RefreshCw className="w-2.5 h-2.5 inline mr-1" />
                  Swap evidence
                </button>
              )}
            </div>
            <div className="case-metric">
              <strong>{item.metric}</strong>
              <small>{item.metricLabel || 'Verified Impact'}</small>
            </div>
          </article>
        )
      })}
    </div>
  )
}

interface StudioChatProps {
  chatId?: string | null
  onUpdatePreview?: () => void
  contextLabel?: string
}

export interface ChatAttachment {
  url: string
  name: string
  contentType: string
}

export function StudioChat({ chatId, onUpdatePreview, contextLabel }: StudioChatProps) {
  const [draft, setDraft] = useState('')
  const [attachments, setAttachments] = useState<ChatAttachment[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; attachedFiles?: string[] }[]>([
    {
      role: 'assistant',
      text: chatId
        ? `Live studio connected. I can adjust your positioning, re-order evidence, sharpen the strategic teardown, or swap in custom assets in real-time.`
        : `Executive Studio Copilot ready. Prompt any modification to your strategic positioning, company teardown, or interaction physics.`,
    },
  ])
  const [typing, setTyping] = useState(false)
  const busy = useRef(false)
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' })
  }, [messages, typing])

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

  // Track chatId connection
  useEffect(() => {
    if (chatId) {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://grtr-woad.vercel.app'
      const liveUrl = `${origin}/api/preview/${chatId}`

      setMessages(prev => {
        if (!prev.some(m => m.text.includes('Live sandbox connected'))) {
          return [
            ...prev,
            {
              role: 'assistant',
              text: `🚀 Live sandbox connected!\n\nPublic recruiter preview: ${liveUrl}\n\nAll prompt directives and attached assets now modify your live portfolio in real time.`,
            },
          ]
        }
        return prev
      })
    }
  }, [chatId])

  async function send(text: string) {
    const currentAttachments = [...attachments]
    const value = text.trim() || (currentAttachments.length > 0 ? 'Please integrate and swap the attached asset(s) into the portfolio layout.' : '')
    if (!value || busy.current) return
    busy.current = true

    setMessages(m => [
      ...m,
      {
        role: 'user',
        text: value,
        attachedFiles: currentAttachments.map(a => a.name),
      },
    ])
    setDraft('')
    setAttachments([])
    setTyping(true)

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
          }),
        })
        const data = await res.json()
        if (data.success) {
          setMessages(m => [
            ...m,
            {
              role: 'assistant',
              text: data.text || `Applied your directive to the live portfolio sandbox. Preview updated.`,
            },
          ])
          onUpdatePreview?.()
        } else {
          setMessages(m => [
            ...m,
            { role: 'assistant', text: `Failed to update: ${data.error || 'Server error'}` },
          ])
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Network error'
        setMessages(m => [
          ...m,
          { role: 'assistant', text: `Connection error: ${msg}. Please retry.` },
        ])
      } finally {
        busy.current = false
        setTyping(false)
      }
    } else {
      // Direct local feedback if sandbox is compiling or offline
      setTimeout(() => {
        setMessages(m => [
          ...m,
          {
            role: 'assistant',
            text: `Directive received: "${value}". Calibrated positioning and refreshed interactive preview.`,
          },
        ])
        busy.current = false
        setTyping(false)
        onUpdatePreview?.()
      }, 500)
    }
  }

  const renderMessageContent = (text: string) => {
    const urlMatch = text.match(/(https?:\/\/[^\s\)\*]+)/)
    const url = urlMatch ? urlMatch[1] : null

    return (
      <div className="space-y-2">
        <div className="whitespace-pre-wrap">{text}</div>
        {url && (
          <div className="flex items-center gap-2 pt-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors no-underline"
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
        )}
      </div>
    )
  }

  return (
    <div className="studio-chat-interactive">
      <div className="messages" role="log" aria-label="Studio chat history" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'user-message' : 'ai-message'}>
            {m.attachedFiles && m.attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {m.attachedFiles.map((name, fIdx) => (
                  <span key={fIdx} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                    <Paperclip className="w-2.5 h-2.5" />
                    <span>{name}</span>
                  </span>
                ))}
              </div>
            )}
            {renderMessageContent(m.text)}
          </div>
        ))}
        {typing && (
          <p role="status" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
            <span>{chatId ? 'Grtr AI updating live sandbox…' : 'Synthesizing changes…'}</span>
          </p>
        )}
        <div ref={end} />
      </div>

      <div className="suggestions">
        {[
          'Deploy and share the link on chat',
          'Sharpen company teardown',
          'Highlight ARR and retention metrics',
          'Make navbar sleek obsidian',
          'Tune spring physics & motion reveals',
        ].map(text => (
          <button key={text} disabled={typing} onClick={() => send(text)}>
            {text}
            <ArrowRight />
          </button>
        ))}
      </div>

      <div className="chat-composer">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileAttach}
          accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.pdf"
          className="hidden"
          multiple
        />

        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-1.5 p-2 bg-zinc-900/90 border-b border-white/10 rounded-t-lg">
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
          onChange={e => setDraft(e.target.value)}
          placeholder={chatId ? 'Ask to refine copy, restyle, or swap in attached assets...' : 'Direct portfolio changes…'}
          onKeyDown={e => {
            if (e.nativeEvent.isComposing || e.keyCode === 229) return
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send(draft)
            }
          }}
        />
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-2 py-1 text-[11px] rounded bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition cursor-pointer border border-white/10"
              title="Attach screenshot or graphic to swap into portfolio"
            >
              <Paperclip className="w-3 h-3 text-purple-400" />
              <span>Attach Asset</span>
            </button>
            <span className="text-[10px] text-zinc-400 hidden sm:inline">
              {chatId ? 'Live Sandbox Connected' : 'Ready'}
            </span>
          </div>

          <button
            aria-label="Send message"
            disabled={typing || (!draft.trim() && attachments.length === 0)}
            onClick={() => send(draft)}
            className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
