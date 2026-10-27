'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Check, ChevronRight, Code2, ExternalLink, Globe2,
  Lock, Monitor, Play, Rocket, ShieldCheck, Sparkles, Target,
  TrendingUp, Users, Zap, Eye, ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LandingPage() {
  const [activePreviewTab, setActivePreviewTab] = useState<'teardown' | 'metrics' | 'philosophy'>('teardown')
  const [activeAngle, setActiveAngle] = useState(0)
  const [faqOpen, setFaqOpen] = useState<number | null>(0)

  const teardownAngles = [
    {
      title: 'Enterprise Settlement Latency',
      challenge: 'Pine Labs merchants experience settlement batch bottlenecks during peak multi-rail transaction volumes.',
      strategy: 'Deploy distributed asynchronous ledger reconciliation with event-driven optimistic settlement queues.',
      proof: 'Architected similar high-throughput ledger at scale, maintaining 99.99% settlement consistency.',
    },
    {
      title: 'Merchant Omnichannel Unified API',
      challenge: 'Offline POS terminals operate on siloed messaging schemas disconnected from digital payment gateway endpoints.',
      strategy: 'Standardize unified merchant telemetry gateway abstracting hardware-specific interfaces behind idempotent APIs.',
      proof: 'Led unified terminal integration across 12,000+ retail merchants with zero breaking protocol migrations.',
    },
    {
      title: 'High-Volume Fraud Detection Guardrails',
      challenge: 'Rule-based transaction fraud heuristics introduce false positives during sudden flash-sale bursts.',
      strategy: 'Implement streaming feature store with sub-15ms ML inferencing at the terminal authorization boundary.',
      proof: 'Reduced dispute chargebacks by 34% while increasing merchant authorization approval velocity.',
    },
  ]

  const faqs = [
    {
      q: 'Do recruiters or hiring managers need an account to view my portfolio?',
      a: 'Never. Your portfolio is published to a high-speed, responsive public link (e.g. grtr.app/p/yourname/company). Anyone with the link can view your strategic teardown, explore your verified metrics, and schedule dialogue directly from their phone or laptop without logging in.',
    },
    {
      q: 'How long does it take to create a tailored portfolio?',
      a: 'The Genesis Wizard synthesizes your strategic blueprint in under 3 seconds. The full responsive live sandbox with bespoke typography and interactive components is compiled and deployed in about 30 seconds.',
    },
    {
      q: 'Can I customize the portfolio copy, design, and proof points?',
      a: 'Yes, completely. Inside the Live Studio, you have an AI Strategist Copilot. You can give natural language directives like "Sharpen the company teardown", "Highlight ARR retention", or "Make the design more understated" and watch the live sandbox update instantly.',
    },
    {
      q: 'How does live recruiter telemetry work?',
      a: 'Whenever someone opens your portfolio link, Grtr automatically tracks external recruiter impressions, device type (iOS, macOS, Windows), referrer source, and active session dwell time. You can monitor live interest directly from your dashboard.',
    },
    {
      q: 'Can I create different portfolios for different target companies?',
      a: 'Yes. Grtr is built for targeted multi-application strategy. You can maintain tailored portfolios for Pine Labs, Stripe, PhonePe, or Coinbase simultaneously, each with custom company research, role-specific right-to-win proofs, and separate telemetry.',
    },
  ]

  return (
    <div className="landing-shell min-h-screen bg-[#08090A] text-[#ECEEF1] font-sans antialiased selection:bg-purple-500/30 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[400px] rounded-full bg-purple-900/15 blur-[130px]" />
        <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[150px]" />
      </div>

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#08090A]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white no-underline group">
            <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Grtr
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300">
              TM
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-xs text-zinc-400">
            <a href="#how-it-works" className="hover:text-white transition-colors no-underline">How It Works</a>
            <a href="#interactive-preview" className="hover:text-white transition-colors no-underline">Live Preview</a>
            <a href="#capabilities" className="hover:text-white transition-colors no-underline">Capabilities</a>
            <a href="#pricing" className="hover:text-white transition-colors no-underline">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors no-underline">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/app"
              className="text-xs text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all no-underline"
            >
              Sign In
            </Link>
            <Link
              href="/app"
              className="text-xs font-medium text-black bg-white hover:bg-zinc-200 px-3.5 py-1.5 rounded-lg transition-all shadow-sm flex items-center gap-1.5 no-underline font-sans cursor-pointer"
            >
              <span>Build Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-6 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mono mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>The Executive Career Platform</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white max-w-4xl mx-auto leading-[1.08] mb-6">
          Stop sending 2-page PDFs to executive roles.
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
          Turn your career trajectory and target role requirements into an interactive strategic portfolio — complete with target company teardowns, verified metrics, and real-time recruiter telemetry.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/app"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-semibold text-sm transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 no-underline cursor-pointer"
          >
            <span>Build Your Portfolio Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://grtr.app/api/preview/qQgc64emjUV"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-zinc-200 text-sm font-medium transition-all flex items-center justify-center gap-2 no-underline"
          >
            <span>Open Live Pine Labs Teardown</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>

        {/* Proof Ribbon */}
        <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs font-mono text-zinc-400">
          <div>
            <strong className="text-white text-sm block font-sans">94%</strong>
            <span>Hiring team engagement</span>
          </div>
          <div className="hidden sm:block text-zinc-700">|</div>
          <div>
            <strong className="text-white text-sm block font-sans">2m 45s</strong>
            <span>Avg. recruiter dwell time</span>
          </div>
          <div className="hidden sm:block text-zinc-700">|</div>
          <div>
            <strong className="text-white text-sm block font-sans">100% Bespoke</strong>
            <span>Tailored to target company</span>
          </div>
          <div className="hidden sm:block text-zinc-700">|</div>
          <div>
            <strong className="text-white text-sm block font-sans">Zero Login</strong>
            <span>Instant recruiter access</span>
          </div>
        </div>
      </section>

      {/* Interactive Teaser Section */}
      <section id="interactive-preview" className="relative z-10 py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest font-semibold block mb-2">
            Interactive Product Preview
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            What your target hiring team actually sees.
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mt-3">
            Click the tabs and strategic angles below to test how recruiters experience a candidate's portfolio.
          </p>
        </div>

        {/* Mockup Browser Window */}
        <div className="rounded-2xl border border-white/10 bg-[#0E1013] shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Top Browser Bar */}
          <div className="px-4 py-3 border-b border-white/5 bg-[#12151A] flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-3 font-mono text-[11px] text-zinc-400 hidden sm:inline">
                grtr.app/p/ananyasharma/pinelabs
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Recruiter Sandbox
              </span>
            </div>
          </div>

          {/* Interactive Navigation */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between flex-wrap gap-3 bg-[#0E1013]">
            <div>
              <strong className="text-white text-sm block">Ananya Sharma</strong>
              <span className="text-[11px] text-purple-300 font-mono">Product Manager @ Pine Labs</span>
            </div>
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900 border border-white/10 text-xs font-sans">
              <button
                type="button"
                onClick={() => setActivePreviewTab('teardown')}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${
                  activePreviewTab === 'teardown' ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Strategic Teardown
              </button>
              <button
                type="button"
                onClick={() => setActivePreviewTab('metrics')}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${
                  activePreviewTab === 'metrics' ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Proven Impact
              </button>
              <button
                type="button"
                onClick={() => setActivePreviewTab('philosophy')}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${
                  activePreviewTab === 'philosophy' ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Operating Philosophy
              </button>
            </div>
          </div>

          {/* Tab 1: Strategic Teardown */}
          {activePreviewTab === 'teardown' && (
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase text-purple-400 tracking-wider font-semibold">
                  Executive Point of View
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                  Architecting category leadership for Pine Labs
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                  Strategic levers formulated from verified JD requirements, merchant friction points, and multi-rail settlement systems.
                </p>
              </div>

              {/* 3 Angles Pills */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {teardownAngles.map((angle, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveAngle(idx)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition cursor-pointer whitespace-nowrap ${
                      activeAngle === idx
                        ? 'bg-purple-600 text-white border-purple-500'
                        : 'bg-zinc-900/60 text-zinc-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    Angle 0{idx + 1}: {angle.title}
                  </button>
                ))}
              </div>

              {/* Angle Detail Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-xl bg-zinc-900/40 border border-white/5">
                <div className="space-y-1">
                  <small className="text-[10px] font-mono uppercase text-zinc-500 block">Observed Challenge</small>
                  <p className="text-xs text-zinc-300 leading-relaxed">{teardownAngles[activeAngle].challenge}</p>
                </div>
                <div className="space-y-1">
                  <small className="text-[10px] font-mono uppercase text-zinc-500 block">Proposed Strategy</small>
                  <p className="text-xs text-zinc-300 leading-relaxed">{teardownAngles[activeAngle].strategy}</p>
                </div>
                <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0 md:pl-4">
                  <small className="text-[10px] font-mono uppercase text-emerald-400 block font-semibold">Right to Win Proof</small>
                  <p className="text-xs text-zinc-200 font-medium leading-relaxed">{teardownAngles[activeAngle].proof}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Proven Impact */}
          {activePreviewTab === 'metrics' && (
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase text-purple-400 tracking-wider font-semibold">
                  Quantified Track Record
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                  Verified metrics and systems built
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                  <span className="text-3xl font-mono font-bold text-emerald-400 block mb-1">99.98%</span>
                  <strong className="text-xs text-white block">Settlement SLA</strong>
                  <p className="text-[11px] text-zinc-400 mt-1">Maintained across 14.2M daily transactions during peak Diwali retail surges.</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                  <span className="text-3xl font-mono font-bold text-purple-400 block mb-1">$1.2B</span>
                  <strong className="text-xs text-white block">Annual Gross Processing Volume</strong>
                  <p className="text-[11px] text-zinc-400 mt-1">Orchestrated multi-rail routing engine across POS, UPI, and credit rails.</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                  <span className="text-3xl font-mono font-bold text-emerald-400 block mb-1">-42%</span>
                  <strong className="text-xs text-white block">Reconciliation Latency</strong>
                  <p className="text-[11px] text-zinc-400 mt-1">Automated batch ledger exceptions, eliminating 18 hours of manual weekly triage.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Operating Philosophy */}
          {activePreviewTab === 'philosophy' && (
            <div className="p-6 sm:p-8 max-w-2xl">
              <span className="text-[10px] font-mono uppercase text-purple-400 tracking-wider font-semibold">
                Operating Philosophy &amp; Leadership
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1 mb-4">
                "Signal → System → Scale"
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                Category leadership is won at the friction points competitors ignore. In multi-rail fintech, execution velocity compounds when data contracts are rigid, interfaces are unified, and telemetry is real-time.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-zinc-900/50 border border-white/5">
                  <strong className="text-white block mb-0.5">High-Leverage Execution</strong>
                  <span className="text-zinc-400 text-[11px]">Prioritizing bottlenecks that produce exponential compounding.</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/50 border border-white/5">
                  <strong className="text-white block mb-0.5">Defensible Architecture</strong>
                  <span className="text-zinc-400 text-[11px]">Building systems that withstand scale without technical debt.</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Interactive Bar */}
          <div className="px-6 py-3 border-t border-white/5 bg-[#12151A] flex items-center justify-between text-xs text-zinc-400">
            <span>Notice: Candidate portfolio is live and accepting dialogue.</span>
            <Link href="/app" className="text-purple-300 hover:text-white flex items-center gap-1 font-mono text-[11px] no-underline">
              <span>Build yours in Genesis Wizard</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem: PDF vs Grtr */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="text-center mb-14">
          <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest font-semibold block mb-2">
            Why Resumes Fail
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            The traditional executive application is broken.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Legacy PDF */}
          <div className="p-8 rounded-2xl bg-zinc-950/60 border border-red-500/20 relative">
            <span className="text-[11px] font-mono text-red-400 uppercase tracking-wider font-semibold block mb-2">
              The 2-Page PDF (Legacy)
            </span>
            <h3 className="text-xl font-semibold text-white mb-4">Static, Ignored &amp; Skimmed</h3>
            <ul className="space-y-3.5 text-xs text-zinc-400">
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold">✕</span>
                <span>Skimmed for an average of 6.2 seconds before being archived.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold">✕</span>
                <span>Generic bullet points that look identical to 500 other applicants.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold">✕</span>
                <span>No proof that you understand the target company's current challenges.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold">✕</span>
                <span>Zero visibility into whether the recruiter opened, read, or shared it.</span>
              </li>
            </ul>
          </div>

          {/* Grtr Portfolio */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-950/30 to-zinc-950 border border-purple-500/30 relative shadow-2xl">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold block mb-2">
              The Grtr Strategic Portfolio
            </span>
            <h3 className="text-xl font-semibold text-white mb-4">Interactive, Tailored &amp; Verified</h3>
            <ul className="space-y-3.5 text-xs text-zinc-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Commands 2m 45s of active dwell time from hiring decision-makers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3 customized strategic teardown angles proving you've already analyzed their role.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Curated visual architecture tailored to the target company culture.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Live telemetry alerts you the moment the hiring committee opens your link.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-20 px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest font-semibold block mb-2">
            The Workflow
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            From raw CV to bespoke live portfolio in 3 steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5">
            <span className="text-2xl font-mono font-bold text-purple-400 block mb-3">01</span>
            <h3 className="text-base font-semibold text-white mb-2">Upload Resume &amp; Target JD</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Drop your CV and paste the target job description. Grtr extracts your verified trajectory, key metrics, and strategic inflection points.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5">
            <span className="text-2xl font-mono font-bold text-purple-400 block mb-3">02</span>
            <h3 className="text-base font-semibold text-white mb-2">Synthesize Strategic Blueprint</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Our strategist engine formulates 3 differentiated strategic teardown angles, right-to-win proofs, and an editorial AI positioning hook.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5">
            <span className="text-2xl font-mono font-bold text-emerald-400 block mb-3">03</span>
            <h3 className="text-base font-semibold text-white mb-2">Live Studio &amp; Telemetry</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Refine your portfolio in the Live Studio with our AI Copilot, publish to a shareable Vercel URL, and track live recruiter visits on your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Bento Grid */}
      <section id="capabilities" className="relative z-10 py-20 px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest font-semibold block mb-2">
            Platform Capabilities
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            Architected for executive credibility.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 md:col-span-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <Eye className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Live Recruiter Telemetry Feed</h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
              Track exactly when executive recruiters and hiring managers open your portfolio link. See device types (macOS, iOS, Windows), session dwell duration, and location in real time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Strategic Thesis Drawer</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Instant in-studio access to your right-to-win proofs, observed challenges, and talking points during live interview dialogue.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Live Studio AI Copilot</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Prompt the editor in natural language to sharpen copy, adjust metric cards, or reorganize case studies with live instant compile.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 md:col-span-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <Globe2 className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Visual Architecture Foundations</h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
              Select from curated aesthetic modes (Minimal Monochrome, High-Tech Compute, Technical Terminal, Swiss Grid) or specify custom design instructions to match your target company’s culture.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Tier Pricing Preview */}
      <section id="pricing" className="relative z-10 py-20 px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest font-semibold block mb-2">
            Investment
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            Choose your career acceleration plan.
          </h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto mt-2">
            Transparent pricing powered by Dodo Payments. Unlock full access to the Genesis Wizard and Live Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Plan 1 */}
          <div className="p-7 rounded-2xl bg-zinc-900/40 border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Single Sprint</span>
              <h3 className="text-xl font-semibold text-white mb-2">Role Targeted</h3>
              <div className="flex items-baseline gap-1 my-4">
                <span className="text-3xl font-bold font-mono text-white">$29</span>
                <span className="text-xs text-zinc-400 font-mono">/ one-time</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Perfect for tailoring one high-conviction executive application to a dream company.
              </p>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>1 Tailored Bespoke Portfolio</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>Genesis Blueprint Synthesis</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>Public Hosted Share Link</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>30-Day Recruiter Telemetry</span>
                </li>
              </ul>
            </div>
            <Link
              href="/app"
              className="mt-8 w-full py-2.5 rounded-lg border border-white/10 hover:border-white/20 text-xs text-white font-medium text-center no-underline transition hover:bg-white/5 block"
            >
              Get Started
            </Link>
          </div>

          {/* Plan 2: Featured */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-purple-950/40 via-zinc-900 to-zinc-900 border-2 border-purple-500/60 shadow-2xl relative flex flex-col justify-between">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-purple-600 text-white font-mono text-[10px] uppercase font-semibold tracking-wider">
              Most Popular
            </span>
            <div>
              <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block mb-1">Executive Plus</span>
              <h3 className="text-xl font-semibold text-white mb-2">Continuous Pipeline</h3>
              <div className="flex items-baseline gap-1 my-4">
                <span className="text-3xl font-bold font-mono text-white">$59</span>
                <span className="text-xs text-zinc-400 font-mono">/ month</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                For active candidates interviewing across multiple high-stakes leadership roles.
              </p>
              <ul className="space-y-3 text-xs text-zinc-200">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <strong className="text-white">Unlimited Tailored Portfolios</strong>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Studio with AI Copilot</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Real-time Recruiter Impression Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Strategic Thesis Interview Drawer</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>All Curated Visual Foundations</span>
                </li>
              </ul>
            </div>
            <Link
              href="/app"
              className="mt-8 w-full py-2.5 rounded-lg bg-white hover:bg-zinc-100 text-black font-semibold text-xs text-center no-underline transition block shadow-lg cursor-pointer"
            >
              Unlock Executive Plus
            </Link>
          </div>

          {/* Plan 3 */}
          <div className="p-7 rounded-2xl bg-zinc-900/40 border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Career Accelerator</span>
              <h3 className="text-xl font-semibold text-white mb-2">High-Touch Advisory</h3>
              <div className="flex items-baseline gap-1 my-4">
                <span className="text-3xl font-bold font-mono text-white">$179</span>
                <span className="text-xs text-zinc-400 font-mono">/ 6 months</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Full career management with custom apex domains and white-glove teardown calibration.
              </p>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>Everything in Executive Plus</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>Custom Apex Domain Connection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>Priority v0 Agent Compilation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>Continuous 6-Month Telemetry Retention</span>
                </li>
              </ul>
            </div>
            <Link
              href="/app"
              className="mt-8 w-full py-2.5 rounded-lg border border-white/10 hover:border-white/20 text-xs text-white font-medium text-center no-underline transition hover:bg-white/5 block"
            >
              Select Accelerator
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-20 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-14">
          <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest font-semibold block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            Everything you need to know.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = faqOpen === idx
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 cursor-pointer transition hover:border-white/15"
                onClick={() => setFaqOpen(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180 text-purple-400' : ''}`} />
                </div>
                {isOpen && (
                  <p className="text-xs text-zinc-400 leading-relaxed mt-3 pt-3 border-t border-white/5">
                    {faq.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative z-10 py-24 px-6 text-center border-t border-white/5 bg-gradient-to-b from-transparent to-purple-950/20">
        <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal max-w-3xl mx-auto mb-6">
          Your next leadership role won't be decided by a resume skim.
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-10">
          Join high-conviction product leaders, engineering executives, and founders who send interactive strategic portfolios that convert.
        </p>
        <Link
          href="/app"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-zinc-100 text-black font-semibold text-sm transition-all shadow-2xl no-underline cursor-pointer"
        >
          <span>Start Building Your Portfolio Free</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg font-bold text-white">Grtr</span>
          <span className="text-[10px] font-mono text-zinc-500">© {new Date().getFullYear()} Grtr Inc. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/app" className="hover:text-zinc-300 no-underline transition">Workspace</Link>
          <a href="https://grtr.app/api/preview/qQgc64emjUV" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 no-underline transition">Sample Teardown</a>
          <a href="#pricing" className="hover:text-zinc-300 no-underline transition">Pricing</a>
          <a href="#faq" className="hover:text-zinc-300 no-underline transition">FAQ</a>
        </div>
      </footer>
    </div>
  )
}
