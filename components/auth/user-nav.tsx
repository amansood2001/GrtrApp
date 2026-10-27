'use client'

import React, { useEffect, useState } from 'react'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { LogIn, User } from 'lucide-react'

export function UserNav() {
  const [mounted, setMounted] = useState(false)
  const isClerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
      </div>
    )
  }

  if (!isClerkConfigured) {
    return (
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider font-medium text-zinc-400 bg-white/[0.04] border border-white/10">Guest</span>
        <button
          className="w-7 h-7 rounded-full bg-zinc-800 border border-white/15 hover:border-purple-400/50 flex items-center justify-center transition cursor-pointer text-zinc-300"
          onClick={() => alert('Clerk Authentication setup in progress. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.')}
          title="Sign in with Google / Email"
        >
          <User className="w-3.5 h-3.5 text-zinc-400" />
        </button>
      </div>
    )
  }

  return <ClerkUserNav />
}

function ClerkUserNav() {
  const { isSignedIn, user, isLoaded } = useUser()
  const [synced, setSynced] = useState(false)

  // Sync user profile to Supabase Postgres on initial login
  useEffect(() => {
    if (isSignedIn && user && !synced) {
      const email = user.primaryEmailAddress?.emailAddress
      if (email) {
        fetch('/api/auth/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: user.id,
            email,
            full_name: user.fullName || user.firstName || 'Candidate',
            avatar_url: user.imageUrl || null,
          }),
        })
          .then(res => res.json())
          .then(() => setSynced(true))
          .catch(err => console.warn('[ClerkUserNav] Could not sync user with Supabase:', err))
      }
    }
  }, [isSignedIn, user, synced])

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <SignInButton mode="modal">
          <button className="text-xs font-mono px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition flex items-center gap-1.5 cursor-pointer shadow-sm">
            <LogIn className="w-3.5 h-3.5 text-purple-400" />
            <span>Sign In</span>
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="text-xs font-mono px-3 py-1.5 rounded-md bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/30 transition flex items-center gap-1.5 cursor-pointer shadow-sm hidden sm:inline-flex">
            <span>Sign Up</span>
          </button>
        </SignUpButton>
      </div>
    )
  }

  const tier = (user.publicMetadata?.plan as string) || 'Free'
  const isPaidTier = tier.toLowerCase() !== 'free'

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider font-medium ${
          isPaidTier
            ? 'text-purple-300 bg-purple-500/10 border border-purple-500/30'
            : 'text-zinc-400 bg-white/[0.04] border border-white/10'
        }`}
      >
        {tier}
      </span>
      <UserButton
        appearance={{
          elements: {
            avatarBox: 'w-7 h-7 rounded-full ring-1 ring-white/15 hover:ring-purple-400/50 transition shadow-sm overflow-hidden',
            userButtonPopoverCard: 'bg-[#0c0d0e] border border-white/10 shadow-2xl',
            userButtonPopoverActionButton: 'hover:bg-white/5 text-zinc-300',
            userButtonPopoverActionButtonText: 'text-zinc-200 font-sans',
            userButtonPopoverFooter: 'hidden',
          },
        }}
      />
    </div>
  )
}
