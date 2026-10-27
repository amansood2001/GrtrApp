import { NextRequest, NextResponse } from 'next/server'
import { createDodoCheckoutSession } from '@/lib/dodo'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { planId, userEmail, userName, userId, returnUrl } = body

    if (!planId) {
      return NextResponse.json({ error: 'planId is required' }, { status: 400 })
    }

    const host = req.headers.get('host') || 'grtr-woad.vercel.app'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const defaultReturn = `${protocol}://${host}/app?checkout=success&plan=${planId}`

    const session = await createDodoCheckoutSession({
      planId,
      userEmail: userEmail || 'candidate@grtr.app',
      userName: userName || 'Executive Candidate',
      userId: userId || 'anonymous',
      returnUrl: returnUrl || defaultReturn,
    })

    return NextResponse.json({ success: true, ...session })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: err?.message || 'Checkout failed' }, { status: 500 })
  }
}
