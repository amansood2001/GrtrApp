'use client'

import React, { useState } from 'react'
import { Check, ShieldCheck, Zap, Sparkles, ArrowRight, Loader2, Lock } from 'lucide-react'
import { PRICING_PLANS, PlanConfig } from '@/lib/dodo'

interface PaywallModalProps {
  userEmail?: string
  userName?: string
  userId?: string
  onUnlocked?: () => void
}

export function PaywallModal({
  userEmail,
  userName,
  userId,
  onUnlocked,
}: PaywallModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<'single_sprint' | 'executive_plus' | 'career_accelerator'>('executive_plus')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedPlan = PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[1]

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout/dodo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlanId,
          userEmail: userEmail || 'candidate@grtr.app',
          userName: userName || 'Executive Candidate',
          userId: userId || 'anonymous',
          returnUrl: typeof window !== 'undefined' ? `${window.location.origin}/app?checkout=success&plan=${selectedPlanId}` : undefined,
        }),
      })

      const data = await res.json()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        throw new Error(data.error || 'Failed to initialize checkout')
      }
    } catch (err: any) {
      console.error('Checkout error:', err)
      setError(err?.message || 'Checkout failed. Please try again.')
      setLoading(false)
    }
  }

  // Developer / QA bypass for instant testing
  const handleDevUnlock = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('grtr_dev_subscription_unlocked', 'true')
    }
    onUnlocked?.()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#0C0D0E] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto relative z-10 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs mb-3.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Executive Access Gate</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight mb-2.5">
            Unlock Your Strategic Portfolios
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
            Stop competing on standard resumes. Select an executive sprint or membership to activate the Genesis Wizard, AI Positioning Strategist, and Live Sandbox.
          </p>
        </div>

        {/* 3-Tier Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 mb-8">
          {PRICING_PLANS.map(plan => {
            const isSelected = plan.id === selectedPlanId
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative rounded-xl p-5 cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-purple-950/20 border-purple-500/60 shadow-[0_0_25px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/50'
                    : 'bg-[#121417]/80 hover:bg-[#15181C] border-white/5 hover:border-white/15'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-purple-500 text-white tracking-wider font-semibold shadow">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-sans font-semibold text-white text-base">{plan.name}</h3>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${
                        isSelected ? 'border-purple-400 bg-purple-500' : 'border-zinc-600'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-400 mb-4 min-h-[32px] leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="text-3xl font-serif font-bold text-white">${plan.price}</span>
                    <span className="text-xs text-zinc-500 font-mono">
                      {plan.interval === 'one-time' ? '/single' : `/${plan.interval}`}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/5 text-[11px] text-zinc-300">
                    {plan.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Plan Details Banner */}
        <div className="rounded-xl p-4 bg-white/[0.02] border border-white/5 mb-6 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400">
              Selected Configuration
            </span>
            <div className="text-sm font-medium text-white flex items-center gap-2">
              <span>{selectedPlan.name}</span>
              <span className="text-zinc-500 font-mono">·</span>
              <span className="font-mono text-purple-300">${selectedPlan.price} {selectedPlan.interval === 'one-time' ? 'one-time' : `/${selectedPlan.interval}`}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Encrypted Checkout via Dodo Payments</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300">
            {error}
          </div>
        )}

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
          <button
            onClick={handleDevUnlock}
            className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition underline underline-offset-4 cursor-pointer order-2 sm:order-1"
            title="Instant unlock for development / QA testing"
          >
            [Dev / Demo Bypass: Unlock Instant Access]
          </button>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full sm:w-auto px-7 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 order-1 sm:order-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Initializing Checkout...</span>
              </>
            ) : (
              <>
                <span>Proceed to Checkout (${selectedPlan.price})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
