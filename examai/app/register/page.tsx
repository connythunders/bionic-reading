'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [subject, setSubject] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, subject: subject || null },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="card w-full max-w-md text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(124,111,205,0.15)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Konto skapat!</h2>
          <p style={{ color: 'var(--text-muted)' }} className="mb-6">
            Kontrollera din e-post för att bekräfta kontot.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Till startsidan
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            Exam<span style={{ color: 'var(--accent)' }}>AI</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Skapa lärarkonto</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Namn</label>
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Anna Andersson"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="label">E-post</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="larare@skola.se"
                autoComplete="email"
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
                minLength={6}
                placeholder="Minst 6 tecken"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="label">
                Ämne{' '}
                <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(valfritt)</span>
              </label>
              <input
                type="text"
                className="input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="t.ex. Historia, Matematik"
              />
            </div>

            {error && (
              <p className="text-sm" style={{ color: '#f87171' }}>
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Skapar konto...' : 'Skapa konto'}
            </button>
          </form>

          <p className="text-xs mt-4 text-center" style={{ color: 'var(--text-muted)' }}>
            Har du redan ett konto?{' '}
            <Link href="/" style={{ color: 'var(--accent)' }}>
              Logga in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
