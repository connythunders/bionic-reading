import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { selectNextAdaptiveQuestion } from '@/lib/anthropic'
import type { Question, Answer } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, remainingQuestionIds } = body as {
      sessionId: string
      remainingQuestionIds: string[]
    }

    if (!sessionId || !Array.isArray(remainingQuestionIds)) {
      return NextResponse.json({ error: 'sessionId and remainingQuestionIds are required' }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data: session } = await supabase
      .from('exam_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    const { data: allAnswers } = await supabase
      .from('answers')
      .select('*, questions(*)')
      .eq('session_id', sessionId)

    const { data: remaining } = await supabase
      .from('questions')
      .select('*')
      .in('id', remainingQuestionIds)

    const previousAnswers = (allAnswers ?? []).map((a) => ({
      question: a.questions as Question,
      answer: a as Answer,
    }))

    const nextQuestion = await selectNextAdaptiveQuestion(previousAnswers, remaining ?? [])

    return NextResponse.json({ question: nextQuestion })
  } catch (err) {
    console.error('[next-question]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
