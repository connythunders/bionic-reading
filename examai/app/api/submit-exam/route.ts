import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, answers } = body as {
      sessionId: string
      answers: Array<{ questionId: string; text: string; wordCount: number }>
    }

    if (!sessionId || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'sessionId and answers are required' }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data: session, error: sessionError } = await supabase
      .from('exam_sessions')
      .select('id, locked')
      .eq('id', sessionId)
      .single()

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    if (session.locked) {
      return NextResponse.json({ error: 'Session already submitted' }, { status: 409 })
    }

    for (const answer of answers) {
      await supabase.from('answers').upsert(
        {
          session_id: sessionId,
          question_id: answer.questionId,
          text: answer.text,
          word_count: answer.wordCount,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'session_id,question_id' }
      )
    }

    const { error: lockError } = await supabase
      .from('exam_sessions')
      .update({ submitted_at: new Date().toISOString(), locked: true })
      .eq('id', sessionId)

    if (lockError) {
      return NextResponse.json({ error: 'Failed to submit exam' }, { status: 500 })
    }

    return NextResponse.json({ success: true, sessionId })
  } catch (err) {
    console.error('[submit-exam]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
