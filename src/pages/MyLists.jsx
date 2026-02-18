import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { myApi } from '../api/myApi'

export function MyLists() {
  const [lists, setLists] = useState([])
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  async function load() {
    const res = await myApi.get('/api/lists')
    setLists(res.data)
  }

  useEffect(() => {
    load().catch((e) => setError(e.message))
  }, [])

  async function createList(e) {
    e.preventDefault()
    setError('')
    try {
      await myApi.post('/api/lists', { name })
      setName('')
      await load()
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Mis listas</h1>

      <form onSubmit={createList} className="mt-4 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Favoritas"
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2"
        />
        <button className="rounded-lg bg-slate-100 px-4 py-2 font-medium text-slate-900 hover:bg-white">
          Crear
        </button>
      </form>

      {error ? <p className="mt-3 text-red-400">{error}</p> : null}

      <div className="mt-4 grid gap-3">
        {lists.map((l) => (
          <Link key={l._id} to={`/lists/${l._id}`} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 hover:bg-slate-900">
            <div className="font-semibold">{l.name}</div>
            <div className="text-xs text-slate-400">{new Date(l.createdAt).toLocaleString()}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
