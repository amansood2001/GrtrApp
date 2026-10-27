import { createClient, SupabaseClient } from '@supabase/supabase-js'

let serverClient: SupabaseClient | null = null

export function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !serviceKey) {
    return null
  }

  if (!serverClient) {
    serverClient = createClient(url, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }

  return serverClient
}

export interface DbPortfolio {
  id?: string
  user_id?: string | null
  chat_id: string
  candidate_name: string
  target_company: string
  target_role: string
  strategic_angle?: string | null
  blueprint?: any
  theme?: string
  status?: string
  created_at?: string
  updated_at?: string
}

export async function dbGetPortfolios(userId?: string): Promise<DbPortfolio[]> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return []

  let query = supabase.from('portfolios').select('*').order('created_at', { ascending: false })
  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data, error } = await query
  if (error) {
    console.error('[Supabase dbGetPortfolios] Error:', error)
    return []
  }
  return data || []
}

export async function dbUpsertPortfolio(portfolio: DbPortfolio): Promise<DbPortfolio | null> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('portfolios')
    .upsert(
      {
        chat_id: portfolio.chat_id,
        candidate_name: portfolio.candidate_name,
        target_company: portfolio.target_company,
        target_role: portfolio.target_role,
        strategic_angle: portfolio.strategic_angle || null,
        blueprint: portfolio.blueprint || null,
        theme: portfolio.theme || 'obsidian',
        status: portfolio.status || 'deployed',
        user_id: portfolio.user_id || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'chat_id' }
    )
    .select()
    .single()

  if (error) {
    console.error('[Supabase dbUpsertPortfolio] Error:', error)
    return null
  }
  return data
}

export async function dbDeletePortfolio(chatId: string): Promise<boolean> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return false

  const { error } = await supabase.from('portfolios').delete().eq('chat_id', chatId)
  if (error) {
    console.error('[Supabase dbDeletePortfolio] Error:', error)
    return false
  }
  return true
}

export async function dbRecordEvent(chatId: string, event: {
  eventType?: string
  title: string
  description?: string
  device?: string
  referrer?: string
}): Promise<boolean> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return false

  const { error } = await supabase.from('portfolio_events').insert({
    chat_id: chatId,
    event_type: event.eventType || 'recruiter_view',
    title: event.title,
    description: event.description || '',
    device: event.device || null,
    referrer: event.referrer || null,
  })

  if (error) {
    console.error('[Supabase dbRecordEvent] Error:', error)
    return false
  }
  return true
}
