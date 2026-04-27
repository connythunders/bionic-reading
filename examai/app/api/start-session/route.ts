import { createServerClient } from '@/lib/supabase'
import type { Level } from '@/lib/types'

export async function POST(request: Request) {
  const supabase = createServerClient()
  const body = await request.json() as { code: string; level: Level }
  const { code, level } = body

  if (!code || !level) {
    return Response.json(
      { error: 'code and level are required' },
      { status: 400 }
    )
  }

  const upperCode = code.toUpperCase()

  // Find unused student code
  const { data: studentCode } = await supabase
    .from('student_codes')
    .select('id, exam_id, used')
    .eq('code', upperCode)
    .eq('used', false)
    .single()

  if (!studentCode) {
    return Response.json(
      { error: 'Invalid or already used code' },
      { status: 400 }
    )
  }

  // Insert exam session
  const { data: session, error: sessionError } = await supabase
    .from('exam_sessions')
    .insert({
      exam_id: studentCode.exam_id,
      student_code: upperCode,
      chosen_level: level,
      cheat_log: [],
      locked: false,
    })
    .select('id')
    .single()

  if (sessionError || !session) {
    return Response.json(
      { error: sessionError?.message ?? 'Failed to create session' },
      { status: 500 }
    )
  }

  // Mark student code as used
  await supabase
    .from('student_codes')
    .update({ used: true })
    .eq('id', studentCode.id)

  return Response.json({ sessionId: session.id })
}
