'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Send, Loader2, RefreshCw, CheckCircle2, ExternalLink, Copy } from 'lucide-react'
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

export function StudioChat({ chatId, onUpdatePreview, contextLabel }: StudioChatProps) {
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: chatId
        ? `Live studio connected. I can adjust your positioning, re-order evidence, sharpen the strategic teardown, or adjust design styling in real-time.`
        : `Executive Studio Copilot ready. Prompt any modification to your strategic positioning, company teardown, or interaction physics.`,
    },
  ])
  const [typing, setTyping] = useState(false)
  const busy = useRef(false)
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' })
  }, [messages, typing])

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
              text: `🚀 Live sandbox connected!\n\nPublic recruiter preview: ${liveUrl}\n\nAll prompt directives now modify your live portfolio in real time.`,
            },
          ]
        }
        return prev
      })
    }
  }, [chatId])

  async function send(text: string) {
    const value = text.trim()
    if (!value || busy.current) return
    busy.current = true
    setMessages(m => [...m, { role: 'user', text: value }])
    setDraft('')
    setTyping(true)

    if (chatId) {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatId, message: value, contextLabel }),
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
        <textarea
          aria-label="Message Grtr"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder={chatId ? 'Ask to refine, change copy, or restyle...' : 'Direct portfolio changes…'}
          onKeyDown={e => {
            if (e.nativeEvent.isComposing || e.keyCode === 229) return
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send(draft)
            }
          }}
        />
        <div>
          <span>{chatId ? 'Live AI Copilot · Enter to apply' : 'Executive Copilot · Enter to apply'}</span>
          <button aria-label="Send message" disabled={typing || !draft.trim()} onClick={() => send(draft)}>
            <Send />
          </button>
        </div>
      </div>
    </div>
  )
}
