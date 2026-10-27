export interface PlanConfig {
  id: 'single_sprint' | 'executive_plus' | 'career_accelerator'
  name: string
  price: number
  interval?: 'month' | '6 months' | 'one-time'
  description: string
  features: string[]
  popular?: boolean
  dodoProductId?: string
}

export const PRICING_PLANS: PlanConfig[] = [
  {
    id: 'single_sprint',
    name: 'Single Sprint',
    price: 29,
    interval: 'one-time',
    description: 'For active candidates targeting one high-stakes role right now.',
    features: [
      '1 Bespoke Executive Portfolio',
      'AI Strategic Thesis & Positioning Hook',
      'Live Candidate-Recruiter Sandbox (v0 engine)',
      '7-day live visitor & recruiter telemetry',
      'Exportable Executive PDF Teardown',
    ],
    dodoProductId: process.env.DODO_PRODUCT_SINGLE_SPRINT,
  },
  {
    id: 'executive_plus',
    name: 'Executive Plus',
    price: 59,
    interval: 'month',
    popular: true,
    description: 'For leaders actively interviewing across multiple target companies.',
    features: [
      'Unlimited Strategic Portfolios',
      'Deep Company Angle & Intelligence Engine',
      'Interactive Case Studies with Live Proof Points',
      'Continuous AI Studio chat copilot refinements',
      'Real-time Recruiter View & Device Telemetry',
      'Priority sandbox compile queue',
    ],
    dodoProductId: process.env.DODO_PRODUCT_EXECUTIVE_PLUS,
  },
  {
    id: 'career_accelerator',
    name: 'Career Accelerator',
    price: 179,
    interval: '6 months',
    description: 'For executives managing full transition cycles and board placements.',
    features: [
      'Everything in Executive Plus',
      'Multi-track positioning (CEO, CPO, VP, Board)',
      'Custom visual foundation & typography pairing',
      '6 months of persistent telemetry retention',
      'Dedicated recruiter engagement analytics export',
    ],
    dodoProductId: process.env.DODO_PRODUCT_CAREER_ACCELERATOR,
  },
]

export async function createDodoCheckoutSession({
  planId,
  userEmail,
  userName,
  userId,
  returnUrl,
}: {
  planId: 'single_sprint' | 'executive_plus' | 'career_accelerator'
  userEmail: string
  userName?: string
  userId?: string
  returnUrl: string
}): Promise<{ checkoutUrl: string; isMock?: boolean }> {
  const plan = PRICING_PLANS.find(p => p.id === planId)
  if (!plan) throw new Error(`Unknown plan: ${planId}`)

  const apiKey = process.env.DODO_PAYMENTS_API_KEY
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT || 'test'
  const baseUrl = environment === 'live' ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com'

  // If no Dodo API key is configured yet, provide a mock checkout test path
  if (!apiKey || apiKey.startsWith('dodo_placeholder')) {
    const mockUrl = `${returnUrl}${returnUrl.includes('?') ? '&' : '?'}checkout=success&plan=${planId}&mock=true`
    return { checkoutUrl: mockUrl, isMock: true }
  }

  const productId = plan.dodoProductId || process.env[`DODO_PRODUCT_${planId.toUpperCase()}`]

  try {
    const res = await fetch(`${baseUrl}/checkouts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_cart: [
          {
            product_id: productId || planId,
            quantity: 1,
          },
        ],
        customer: {
          email: userEmail,
          name: userName || 'Executive Candidate',
        },
        metadata: {
          user_id: userId || 'anonymous',
          plan_id: planId,
        },
        return_url: returnUrl,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('[DodoPayments] Checkout session creation failed:', errText)
      throw new Error(`Dodo Payments error: ${res.statusText}`)
    }

    const data = await res.json()
    return { checkoutUrl: data.checkout_url || data.url }
  } catch (err: any) {
    console.error('[DodoPayments] Error calling Dodo API:', err)
    // Graceful fallback to test path if network or test keys fail
    const mockUrl = `${returnUrl}${returnUrl.includes('?') ? '&' : '?'}checkout=success&plan=${planId}&mock=true`
    return { checkoutUrl: mockUrl, isMock: true }
  }
}
