import { NextRequest, NextResponse } from 'next/server'
import { dbUpsertUserProfile, dbGetUserProfile } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, email, full_name, avatar_url } = body

    if (!id || !email) {
      return NextResponse.json({ error: 'id and email are required' }, { status: 400 })
    }

    const profile = await dbUpsertUserProfile({
      id,
      email,
      full_name,
      avatar_url,
    })

    return NextResponse.json({ success: true, profile })
  } catch (err: any) {
    console.error('Error in auth sync:', err)
    return NextResponse.json({ error: err?.message || 'Auth sync failed' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const profile = await dbGetUserProfile(id)
    return NextResponse.json({ success: true, profile })
  } catch (err: any) {
    console.error('Error fetching profile:', err)
    return NextResponse.json({ error: err?.message || 'Profile fetch failed' }, { status: 500 })
  }
}
