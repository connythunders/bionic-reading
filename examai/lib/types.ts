export type Level = 'E' | 'C' | 'A'

export interface Teacher {
  id: string
  email: string
  name: string
  subject: string | null
  created_at: string
}

export interface Exam {
  id: string
  teacher_id: string
  title: string
  subject: string
  level: Level
  adaptive: boolean
  archived: boolean
  time_limit_minutes: number
  created_at: string
}

export interface Question {
  id: string
  exam_id: string
  text: string
  level: Level
  points: number
  order_index: number
}

export interface StudentCode {
  id: string
  exam_id: string
  code: string
  created_at: string
  used: boolean
}

export interface CheatEvent {
  type: 'paste' | 'copy' | 'blur' | 'context_menu' | 'keyboard_shortcut'
  detail?: string
  timestamp: string
}

export interface ExamSession {
  id: string
  exam_id: string
  student_code: string
  chosen_level: Level
  started_at: string
  submitted_at: string | null
  cheat_log: CheatEvent[]
  locked: boolean
}

export interface Answer {
  id: string
  session_id: string
  question_id: string
  text: string
  word_count: number
  created_at: string
  updated_at: string
}

export interface ExamWithQuestions extends Exam {
  questions: Question[]
}

export interface SessionWithAnswers extends ExamSession {
  answers: Answer[]
}
