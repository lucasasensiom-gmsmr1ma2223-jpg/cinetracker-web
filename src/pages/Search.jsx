import React, { useState } from 'react'
import { searchMulti } from '../api/tmdb'
import { MovieCard } from '../components/MovieCard'

export function Search() {
  const [q, setQ] = useState('')
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const data = await searchMulti(q)
      setItems((data.results || []).filter((x) => x.media_type === 'movie' || x.media_type === 'tv'))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Buscar en TMDB</h1>

      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ej: Interstellar"
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100"
        />
        <button className="rounded-lg bg-slate-100 px-4 py-2 font-medium text-slate-900 hover:bg-white">
          Buscar
        </button>
      </form>

      {error ? <p className="mt-3 text-red-400">{error}</p> : null}

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((it) => (
          <MovieCard key={`${it.media_type}-${it.id}`} item={it} />
        ))}
      </div>
    </div>
  )
}
