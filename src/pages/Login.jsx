import React, { useState } from 'react'
import { myApi } from '../api/myApi'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const { login } = useAuth()
  const nav = useNavigate()

  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      if (mode === 'register') {
        await myApi.post('/api/auth/register', { name, email, password })
      }

      const res = await myApi.post('/api/auth/login', { email, password })
      login({ token: res.data.token, user: res.data.user })
      nav('/lists')
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-xl font-bold">{mode === 'login' ? 'Login' : 'Registro'}</h1>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setMode('login')}
          className={`rounded-lg px-3 py-2 text-sm ${mode === 'login' ? 'bg-slate-100 text-slate-900' : 'bg-slate-900 hover:bg-slate-800'}`}
        >
          Login
        </button>
        <button
          onClick={() => setMode('register')}
          className={`rounded-lg px-3 py-2 text-sm ${mode === 'register' ? 'bg-slate-100 text-slate-900' : 'bg-slate-900 hover:bg-slate-800'}`}
        >
          Registro
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-4 space-y-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        {mode === 'register' ? (
          <div>
            <label className="text-sm text-slate-300">Nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2" />
          </div>
        ) : null}

        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2" />
        </div>

        <div>
          <label className="text-sm text-slate-300">Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2" />
        </div>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <button className="w-full rounded-lg bg-slate-100 px-4 py-2 font-medium text-slate-900 hover:bg-white">
          {mode === 'login' ? 'Entrar' : 'Crear cuenta y entrar'}
        </button>
      </form>

      <p className="mt-3 text-xs text-slate-400">
        Tip: usa un email tipo <span className="font-semibold">lucas@test.com</span> y contraseña <span className="font-semibold">123456</span>.
      </p>
    </div>
  )
}
