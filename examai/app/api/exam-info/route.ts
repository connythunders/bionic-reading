import { type NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const supabase = createServerClient()
  const code = request.nextUrl.searchParams.get('code')

  if (!code) {
    return Response.json({ error: 'code is required' }, { status: 400 })
  }

  const { data: studentCode } = await supabase
    .from('student_codes')
    .select('exam_id')
    .eq('code', code.toUpperCase())
    .single()

  if (!studentCode) {
    return Response.json({ error: 'Code not found' }, { status: 404 })
  }

  const { data: exam } = await supabase
    .from('exams')
    .select('id, title, subject, time_limit_minutes, adaptive')
    .eq('id', studentCode.exam_id)
    .single()

  if (!exam) {
    return Response.json({ error: 'Exam not found' }, { status: 404 })
  }

  return Response.json({ exam })
}
