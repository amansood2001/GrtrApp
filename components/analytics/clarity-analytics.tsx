'use client'

import { useEffect } from 'react'
import clarity from '@microsoft/clarity'

export function ClarityAnalytics() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'z4fymofvab'
    if (typeof window !== 'undefined' && projectId) {
      try {
        clarity.init(projectId)
      } catch (err) {
        console.warn('[Clarity] Init notice:', err)
      }
    }
  }, [])

  return null
}
