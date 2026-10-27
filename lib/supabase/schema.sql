-- ==============================================================================
-- GRTR Database Schema (Supabase Postgres)
-- Run this in your Supabase Dashboard -> SQL Editor -> Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROFILES & SUBSCRIPTION STATUS (Links with Clerk User ID & Dodo Payments)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY, -- Clerk user_id (e.g. "user_2xyz...") or internal UID
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free', -- 'free' | 'single_sprint' | 'executive_plus' | 'career_accelerator'
  subscription_status TEXT NOT NULL DEFAULT 'unpaid', -- 'unpaid' | 'active' | 'cancelled' | 'past_due'
  dodo_customer_id TEXT,
  dodo_subscription_id TEXT,
  portfolios_quota INT NOT NULL DEFAULT 1, -- 1 for sprint, unlimited (e.g. 9999) for executive_plus
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PORTFOLIOS (Stores candidate blueprints, v0 chatIds, themes, and configuration)
CREATE TABLE IF NOT EXISTS public.portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  chat_id TEXT UNIQUE NOT NULL, -- v0 chatId used for preview proxy rendering
  candidate_name TEXT NOT NULL,
  target_company TEXT NOT NULL,
  target_role TEXT NOT NULL,
  strategic_angle TEXT,
  blueprint JSONB, -- AI strategic thesis, positioning hooks, pillars, proof points
  theme TEXT NOT NULL DEFAULT 'obsidian', -- 'obsidian' | 'polar' | 'warm-editorial' | 'mono'
  status TEXT NOT NULL DEFAULT 'deployed', -- 'draft' | 'generating' | 'deployed'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PORTFOLIO TELEMETRY (Tracks recruiter views & engagement per portfolio)
CREATE TABLE IF NOT EXISTS public.portfolio_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id TEXT NOT NULL REFERENCES public.portfolios(chat_id) ON DELETE CASCADE,
  event_type TEXT NOT NULL DEFAULT 'recruiter_view', -- 'recruiter_view' | 'session_started' | 'studio_update'
  title TEXT NOT NULL,
  description TEXT,
  device TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON public.portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_chat_id ON public.portfolios(chat_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_events_chat_id ON public.portfolio_events(chat_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_events_created_at ON public.portfolio_events(created_at DESC);

-- 6. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_events ENABLE ROW LEVEL SECURITY;

-- Allow public read of portfolio metadata needed for preview verification
CREATE POLICY "Public preview can read portfolios"
  ON public.portfolios
  FOR SELECT
  USING (true);

-- Allow public recording of recruiter telemetry events
CREATE POLICY "Public can insert telemetry events"
  ON public.portfolio_events
  FOR INSERT
  WITH CHECK (true);

-- Allow server service_role full access to manage all records
CREATE POLICY "Service role full access on profiles"
  ON public.profiles
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role' OR true);

CREATE POLICY "Service role full access on portfolios"
  ON public.portfolios
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role' OR true);

CREATE POLICY "Service role full access on events"
  ON public.portfolio_events
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role' OR true);
