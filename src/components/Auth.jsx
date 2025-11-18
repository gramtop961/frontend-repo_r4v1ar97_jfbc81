import { useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      if (mode === 'register') {
        const res = await fetch(`${baseUrl}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) })
        if (!res.ok) throw new Error((await res.json()).detail || 'Failed')
        const data = await res.json()
        localStorage.setItem('token', data.access_token)
        setMessage('Registered! Token saved.')
      } else {
        const res = await fetch(`${baseUrl}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
        if (!res.ok) throw new Error((await res.json()).detail || 'Failed')
        const data = await res.json()
        localStorage.setItem('token', data.access_token)
        setMessage('Logged in! Token saved.')
      }
    } catch (e) {
      setMessage(e.message)
    }
  }

  return (
    <section id="auth" className="py-16 bg-gradient-to-b from-slate-950 to-black">
      <div className="max-w-md mx-auto px-6">
        <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-md text-white">
          <div className="flex items-center gap-2 mb-6">
            <button onClick={() => setMode('login')} className={`px-3 py-1.5 rounded-lg text-sm ${mode==='login' ? 'bg-white/20' : 'bg-white/5'}`}>Login</button>
            <button onClick={() => setMode('register')} className={`px-3 py-1.5 rounded-lg text-sm ${mode==='register' ? 'bg-white/20' : 'bg-white/5'}`}>Register</button>
          </div>
          <form onSubmit={submit} className="space-y-3">
            {mode === 'register' && (
              <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10" required />
            )}
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10" required />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10" required />
            <button type="submit" className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-sky-500 font-semibold">{mode==='login' ? 'Login' : 'Create account'}</button>
          </form>
          {message && <div className="mt-3 text-sm text-fuchsia-200">{message}</div>}
        </div>
      </div>
    </section>
  )
}
