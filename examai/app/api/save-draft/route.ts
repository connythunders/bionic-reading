import { createServerClient } from '@/lib/supabase'

export async function POST(request: Request) {
  const supabase = createServerClient()
  const body = await request.json() as {
    sessionId: string
    questionId: string
    text: string
    wordCount: number
  }
  const { sessionId, questionId, text, wordCount } = body

  if (!sessionId || !questionId) {
    return Response.json(
      { error: 'sessionId and questionId are required' },
      { status: 400 }
    )
  }

  const { error } = await supabase.from('answers').upsert(
    {
      session_id: sessionId,
      question_id: questionId,
      text: text ?? '',
      word_count: wordCount ?? 0,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'session_id,question_id' }
  )

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true })
}
