import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const payload = JSON.parse(rawBody)

    const eventType = payload.type || payload.event
    const data = payload.data || payload

    console.log('[Dodo Webhook] Received event:', eventType)

    // Handle payment / subscription success
    if (
      eventType === 'payment.succeeded' ||
      eventType === 'subscription.active' ||
      eventType === 'order.completed'
    ) {
      const customerId = data.customer?.customer_id || data.customer_id
      const customerEmail = data.customer?.email || data.email
      const planId = data.metadata?.plan_id || 'executive_plus'
      const userId = data.metadata?.user_id

      const supabase = getSupabaseServerClient()
      if (supabase && (userId || customerEmail)) {
        let query = supabase.from('profiles').update({
          subscription_status: 'active',
          subscription_tier: planId,
          dodo_customer_id: customerId,
          updated_at: new Date().toISOString(),
        })

        if (userId && userId !== 'anonymous') {
          query = query.eq('id', userId)
        } else if (customerEmail) {
          query = query.eq('email', customerEmail)
        }

        const { error } = await query
        if (error) {
          console.error('[Dodo Webhook] Failed to update profile:', error)
        } else {
          console.log('[Dodo Webhook] Successfully activated subscription for:', userId || customerEmail)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('[Dodo Webhook] Webhook error:', err)
    return NextResponse.json({ error: err?.message || 'Webhook failed' }, { status: 400 })
  }
}
