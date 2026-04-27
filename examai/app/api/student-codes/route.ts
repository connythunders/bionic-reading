import { createServerClient } from '@/lib/supabase'
import { generateStudentCode } from '@/lib/exam-codes'

export async function POST(request: Request) {
  const supabase = createServerClient()
  const body = await request.json() as { examId: string }
  const { examId } = body

  if (!examId) {
    return Response.json({ error: 'examId is required' }, { status: 400 })
  }

  const code = generateStudentCode()

  const { error } = await supabase.from('student_codes').insert({
    exam_id: examId,
    code,
    used: false,
  })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ code })
}
