import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { PDFParse } from 'pdf-parse'
import type { ParseCvResponse } from '@/lib/types'

export const runtime = 'nodejs'

// Ensure worker path is explicitly set in server environments
try {
  const workerPath = path.resolve(process.cwd(), 'node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs')
  PDFParse.setWorker(workerPath)
} catch (e) {
  console.warn('Could not set custom pdf worker path:', e)
}

function extractAsciiFromBuffer(buffer: Buffer): string {
  // Simple fallback string extractor from binary streams
  const str = buffer.toString('latin1')
  const matches = str.match(/\(([^\(\)]{3,})\)/g)
  if (matches && matches.length > 0) {
    return matches.map(m => m.slice(1, -1)).join(' ')
  }
  return buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ')
}

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
      const buffer = Buffer.from(arrayBuffer)

      let extractedText = ''

      if (filename.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
        try {
          const parser = new PDFParse({ data: buffer })
          const parsed = await parser.getText()
          extractedText = parsed?.text || ''
          await parser.destroy()
        } catch (pdfErr) {
          console.warn('PDFParse primary extraction failed, trying stream fallback:', pdfErr)
          extractedText = extractAsciiFromBuffer(buffer)
        }
      } else {
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
