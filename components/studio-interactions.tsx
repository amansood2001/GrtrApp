'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Send, Loader2 } from 'lucide-react'
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
            <div>
              <small>Verified evidence</small>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              {items.length > 3 && (
                <button
                  aria-label={`Swap project ${slot + 1}`}
                  onClick={() =>
                    setIndices(current =>
                      current.map((value, i) => (i === slot ? (value + 1) % items.length : value))
                    )
                  }
                >
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
        : `Explore a sample editing conversation. Connect a live portfolio generation to apply real-time modifications.`,
    },
  ])
  const [typing, setTyping] = useState(false)
  const busy = useRef(false)
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' })
  }, [messages, typing])

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
          body: JSON.stringify({ chatId, message: value }),
        })
        const data = await res.json()
        if (data.success) {
          setMessages(m => [
            ...m,
            {
              role: 'assistant',
              text: data.text || `Applied your changes to the live portfolio. The preview has been updated.`,
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
      // Simulated fallback mode if no chat is active yet
      setTimeout(() => {
        setMessages(m => [
          ...m,
          {
            role: 'assistant',
            text: `Simulated guidance for "${value}": In the live portfolio, this will refine the narrative structure and highlight your verified metrics.`,
          },
        ])
        busy.current = false
        setTyping(false)
      }, 700)
    }
  }

  return (
    <div className="studio-chat-interactive">
      <div className="messages" role="log" aria-label="Studio chat history" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'user-message' : 'ai-message'}>
            <p>{m.text}</p>
          </div>
        ))}
        {typing && (
          <p role="status" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{chatId ? 'Grtr AI updating live sandbox…' : 'Grtr is thinking…'}</span>
          </p>
        )}
        <div ref={end} />
      </div>

      <div className="suggestions">
        {['Sharpen company teardown', 'Emphasize pipeline growth', 'Shift to warmer dark palette', 'Add custom advisory section'].map(text => (
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
          placeholder={chatId ? 'Ask to refine, change copy, or restyle...' : 'Try an editing request…'}
          onKeyDown={e => {
            if (e.nativeEvent.isComposing || e.keyCode === 229) return
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send(draft)
            }
          }}
        />
        <div>
          <span>{chatId ? 'Live AI Copilot · Enter to apply' : 'Simulated chat · Enter to test'}</span>
          <button aria-label="Send message" disabled={typing || !draft.trim()} onClick={() => send(draft)}>
            <Send />
          </button>
        </div>
      </div>
    </div>
  )
}
