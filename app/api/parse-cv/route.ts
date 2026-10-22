import { NextRequest, NextResponse } from 'next/server'
import { extractText } from 'unpdf'
import type { ParseCvResponse } from '@/lib/types'

export const runtime = 'nodejs'

export async function POST(req: NextRequest): Promise<NextResponse<ParseCvResponse>> {
  try {
    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const file = formData.get('file') as File | null

      if (!file) {
        return NextResponse.json({ success: false, error: 'No file provided in form data' }, { status: 400 })
      }

      const filename = file.name
      const arrayBuffer = await file.arrayBuffer()
      let extractedText = ''

      if (filename.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
        try {
          const result = await extractText(new Uint8Array(arrayBuffer))
          if (Array.isArray(result.text)) {
            extractedText = result.text.join('\n\n')
          } else if (typeof result.text === 'string') {
            extractedText = result.text
          }
        } catch (pdfErr) {
          console.warn('PDF extraction error:', pdfErr)
          const buffer = Buffer.from(arrayBuffer)
          extractedText = buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ')
        }
      } else {
        const buffer = Buffer.from(arrayBuffer)
        extractedText = buffer.toString('utf-8')
      }

      const cleanedText = extractedText.replace(/\u0000/g, '').trim()

      if (!cleanedText || cleanedText.length < 20) {
        return NextResponse.json(
          { success: false, error: 'Could not extract readable text from the uploaded document.' },
          { status: 422 }
        )
      }

      return NextResponse.json({
        success: true,
        text: cleanedText,
        charCount: cleanedText.length,
        filename,
      })
    }

    if (contentType.includes('application/json')) {
      const body = await req.json()
      const resumeText = (body.resumeText || '').trim()

      if (!resumeText) {
        return NextResponse.json({ success: false, error: 'No resume text provided' }, { status: 400 })
      }

      return NextResponse.json({
        success: true,
        text: resumeText,
        charCount: resumeText.length,
      })
    }

    return NextResponse.json({ success: false, error: 'Unsupported Content-Type' }, { status: 415 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown parsing error'
    console.error('Error parsing CV:', error)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
