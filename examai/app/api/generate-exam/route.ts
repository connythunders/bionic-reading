import { NextRequest, NextResponse } from 'next/server'
import { generateQuestionsFromTopic, generateQuestionsFromText } from '@/lib/anthropic'
import type { Level } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, fileText, subject, levels } = body as {
      topic?: string
      fileText?: string
      subject: string
      levels?: Level[]
    }

    if (!subject) {
      return NextResponse.json({ error: 'subject is required' }, { status: 400 })
    }

    let questions
    if (fileText) {
      questions = await generateQuestionsFromText(fileText, subject)
    } else if (topic) {
      questions = await generateQuestionsFromTopic(topic, subject, levels ?? ['E', 'C', 'A'])
    } else {
      return NextResponse.json({ error: 'topic or fileText is required' }, { status: 400 })
    }

    return NextResponse.json({ questions })
  } catch (err) {
    console.error('[generate-exam]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
