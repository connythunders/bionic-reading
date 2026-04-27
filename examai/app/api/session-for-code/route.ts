import { type NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import type { ExamSession, Question } from '@/lib/types'

export async function GET(request: NextRequest) {
  const supabase = createServerClient()
  const code = request.nextUrl.searchParams.get('code')

  if (!code) {
    return Response.json({ error: 'code is required' }, { status: 400 })
  }

  const { data: session } = await supabase
    .from('exam_sessions')
    .select('*')
    .eq('student_code', code.toUpperCase())
    .eq('locked', false)
    .order('started_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!session) {
    return Response.json({ error: 'Session not found' }, { status: 404 })
  }

  const typedSession = session as ExamSession

  // Fetch questions filtered by the session's chosen level
  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .eq('exam_id', typedSession.exam_id)
    .eq('level', typedSession.chosen_level)
    .order('order_index', { ascending: true })

  return Response.json({
    session: typedSession,
    questions: (questions ?? []) as Question[],
  })
}
