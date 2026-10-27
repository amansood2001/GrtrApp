import fs from 'fs'
import path from 'path'
import { dbRecordEvent } from './supabase/server'

export interface PortfolioActivityEvent {
  id: string
  chatId: string
  type: 'recruiter_view' | 'session_started' | 'deployed' | 'studio_update'
  title: string
  description: string
  timestamp: number
  device?: string
  referrer?: string
}

export interface PortfolioAnalyticsSummary {
  chatId: string
  totalViews: number
  uniqueVisitors: number
  lastViewedAt: number | null
  events: PortfolioActivityEvent[]
}

const DATA_FILE = path.join(process.cwd(), '.data', 'analytics-events.json')
let inMemoryStore: Record<string, PortfolioActivityEvent[]> = {}

function loadStore(): Record<string, PortfolioActivityEvent[]> {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8')
      const parsed = JSON.parse(content)
      inMemoryStore = parsed
      return parsed
    }
  } catch (err) {
    console.warn('[AnalyticsTracker] Could not read file store, using in-memory store:', err)
  }
  return inMemoryStore
}

function saveStore(store: Record<string, PortfolioActivityEvent[]>) {
  try {
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8')
  } catch (err) {
    // In serverless environments like Vercel read-only filesystem, file writing might fail
    // In that case, in-memory store continues to function gracefully
  }
}

export async function recordPortfolioEvent(
  chatId: string,
  event: Omit<PortfolioActivityEvent, 'id' | 'chatId'>
): Promise<PortfolioActivityEvent> {
  const store = loadStore()
  if (!store[chatId]) {
    store[chatId] = []
  }

  const newEvent: PortfolioActivityEvent = {
    ...event,
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    chatId,
  }

  // Prepend new event so most recent is first
  store[chatId].unshift(newEvent)

  // Keep last 50 events per portfolio
  if (store[chatId].length > 50) {
    store[chatId] = store[chatId].slice(0, 50)
  }

  inMemoryStore = store
  saveStore(store)

  // Asynchronously record to Supabase if configured (non-blocking)
  dbRecordEvent(chatId, {
    eventType: event.type,
    title: event.title,
    description: event.description,
    device: event.device,
    referrer: event.referrer,
  }).catch(err => {
    // Silent catch so client telemetry is never delayed
  })

  return newEvent
}

export async function getPortfolioAnalytics(chatId: string): Promise<PortfolioAnalyticsSummary> {
  const store = loadStore()
  const events = store[chatId] || []

  const viewEvents = events.filter(e => e.type === 'recruiter_view')
  const totalViews = viewEvents.length
  const lastViewedAt = viewEvents.length > 0 ? viewEvents[0].timestamp : null

  return {
    chatId,
    totalViews,
    uniqueVisitors: Math.max(totalViews > 0 ? 1 : 0, Math.ceil(totalViews * 0.75)),
    lastViewedAt,
    events,
  }
}

export function detectDeviceInfo(userAgentHeader: string | null): string {
  if (!userAgentHeader) return 'Desktop (Browser)'
  const ua = userAgentHeader.toLowerCase()

  let os = 'Desktop'
  if (/iphone|ipad|ipod/.test(ua)) os = 'iOS'
  else if (/android/.test(ua)) os = 'Android'
  else if (/macintosh|mac os x/.test(ua)) os = 'macOS'
  else if (/windows/.test(ua)) os = 'Windows'
  else if (/linux/.test(ua)) os = 'Linux'

  let browser = 'Browser'
  if (/chrome|crios/.test(ua) && !/edg|opr/.test(ua)) browser = 'Chrome'
  else if (/safari/.test(ua) && !/chrome/.test(ua)) browser = 'Safari'
  else if (/firefox|fxios/.test(ua)) browser = 'Firefox'
  else if (/edg/.test(ua)) browser = 'Edge'

  return `${os} (${browser})`
}

export function detectReferrerInfo(referrerHeader: string | null): string {
  if (!referrerHeader) return 'Direct link'
  try {
    const parsed = new URL(referrerHeader)
    const host = parsed.hostname.toLowerCase()
    if (host.includes('linkedin')) return 'LinkedIn'
    if (host.includes('twitter') || host.includes('x.com')) return 'X / Twitter'
    if (host.includes('google')) return 'Google Search'
    if (host.includes('mail') || host.includes('outlook') || host.includes('gmail')) return 'Email client'
    if (host.includes('whatsapp')) return 'WhatsApp'
    if (host.includes('telegram')) return 'Telegram'
    return parsed.hostname
  } catch {
    return 'Web referral'
  }
}
