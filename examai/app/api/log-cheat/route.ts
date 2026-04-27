import { createServerClient } from '@/lib/supabase'
import type { CheatEvent } from '@/lib/types'

export async function POST(request: Request) {
  const supabase = createServerClient()
  const body = await request.json() as {
    sessionId: string
    type: CheatEvent['type']
    detail?: string
    timestamp: string
  }
  const { sessionId, type, detail, timestamp } = body

  if (!sessionId || !type || !timestamp) {
    return Response.json(
      { error: 'sessionId, type and timestamp are required' },
      { status: 400 }
    )
  }

  // Fetch current cheat_log
  const { data: session } = await supabase
    .from('exam_sessions')
    .select('cheat_log')
    .eq('id', sessionId)
    .single()

  if (!session) {
    return Response.json({ error: 'Session not found' }, { status: 404 })
  }

  const currentLog: CheatEvent[] = Array.isArray(session.cheat_log)
    ? (session.cheat_log as CheatEvent[])
    : []

  const newEvent: CheatEvent = {
    type,
    detail,
    timestamp,
  }

  const updatedLog = [...currentLog, newEvent]

  const { error } = await supabase
    .from('exam_sessions')
    .update({ cheat_log: updatedLog })
    .eq('id', sessionId)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true })
}
