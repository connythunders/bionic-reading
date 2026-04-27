import { createServerClient } from './supabase'
import type { ExamSession } from './types'

// Exclude ambiguous characters: 0, O, I, 1, l
const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generateStudentCode(): string {
  const segment = (len: number) =>
    Array.from({ length: len }, () => CHARSET[Math.floor(Math.random() * CHARSET.length)]).join('')
  return `${segment(4)}-${segment(4)}`
}

export async function validateCode(code: string): Promise<ExamSession | null> {
  const supabase = createServerClient()

  const { data: studentCode } = await supabase
    .from('student_codes')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('used', false)
    .single()

  if (!studentCode) return null

  const { data: session } = await supabase
    .from('exam_sessions')
    .select('*')
    .eq('exam_id', studentCode.exam_id)
    .eq('student_code', code.toUpperCase())
    .eq('locked', false)
    .single()

  return session as ExamSession | null
}
