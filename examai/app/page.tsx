'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [studentCode, setStudentCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [teacherError, setTeacherError] = useState('')
  const [studentError, setStudentError] = useState('')

  async function handleTeacherLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTeacherError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setTeacherError('Fel e-post eller lösenord.')
    } else {
      router.push('/teacher/dashboard')
    }
    setLoading(false)
  }

  async function handleStudentLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStudentError('')
    const code = studentCode.toUpperCase().replace(/[^A-Z0-9-]/g, '')
    const res = await fetch('/api/validate-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
    const data = await res.json()
    if (!res.ok || !data.valid) {
      setStudentError('Ogiltig eller redan använd elevkod.')
      setLoading(false)
      return
    }
    router.push(`/exam/${code}`)
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Exam<span style={{ color: 'var(--accent)' }}>AI</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Provplattform för svenska gymnasielärare</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-1">Lärare</h2>
            <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
              Logga in med ditt lärarkonto
            </p>
            <form onSubmit={handleTeacherLogin} className="space-y-4">
              <div>
                <label className="label">E-post</label>
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="larare@skola.se"
                />
              </div>
              <div>
                <label className="label">Lösenord</label>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
              </div>
              {teacherError && (
                <p className="text-sm" style={{ color: '#f87171' }}>{teacherError}</p>
              )}
              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? 'Loggar in...' : 'Logga in'}
              </button>
            </form>
            <p className="text-xs mt-4 text-center" style={{ color: 'var(--text-muted)' }}>
              Inget konto?{' '}
              <a href="/register" style={{ color: 'var(--accent)' }}>
                Registrera dig
              </a>
            </p>
          </div>

          <div className="card flex flex-col">
            <h2 className="text-xl font-semibold mb-1">Elev</h2>
            <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
              Ange din engångskod för att starta provet
            </p>
            <form onSubmit={handleStudentLogin} className="space-y-4 flex-1 flex flex-col">
              <div className="flex-1 flex flex-col justify-center">
                <label className="label text-center text-base mb-3">Elevkod</label>
                <input
                  type="text"
                  className="input text-center text-3xl font-mono tracking-widest uppercase"
                  style={{ letterSpacing: '0.2em' }}
                  value={studentCode}
                  onChange={(e) =>
                    setStudentCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ''))
                  }
                  placeholder="XXXX-XXXX"
                  maxLength={9}
                  required
                />
                <p className="text-xs text-center mt-2" style={{ color: 'var(--text-muted)' }}>
                  Koden finns på din lapp från läraren
                </p>
              </div>
              {studentError && (
                <p className="text-sm" style={{ color: '#f87171' }}>{studentError}</p>
              )}
              <button
                type="submit"
                className="btn-primary w-full text-lg py-3"
                disabled={loading || studentCode.length < 9}
              >
                {loading ? 'Kontrollerar...' : 'Starta provet'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
