import { createServerClient } from '@/lib/supabase'

export async function POST(request: Request) {
  const supabase = createServerClient()
  const body = await request.json() as { code: string }
  const code = (body.code ?? '').toUpperCase()

  if (!code) {
    return Response.json({ valid: false }, { status: 400 })
  }

  const { data: studentCode } = await supabase
    .from('student_codes')
    .select('id, exam_id, used')
    .eq('code', code)
    .eq('used', false)
    .single()

  if (!studentCode) {
    return Response.json({ valid: false })
  }

  // Check there's no locked session for this code
  const { data: lockedSession } = await supabase
    .from('exam_sessions')
    .select('id')
    .eq('student_code', code)
    .eq('locked', true)
    .maybeSingle()

  if (lockedSession) {
    return Response.json({ valid: false })
  }

  return Response.json({ valid: true, examId: studentCode.exam_id })
}
