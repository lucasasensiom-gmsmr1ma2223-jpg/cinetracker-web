import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { myApi } from '../api/myApi'
import { MovieCard } from '../components/MovieCard'

export function ListDetail() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  async function load() {
    const res = await myApi.get(`/api/lists/${id}`)
    setData(res.data)
  }

  useEffect(() => {
    load().catch((e) => setError(e.message))
  }, [id])

  async function remove(itemId) {
    await myApi.delete(`/api/lists/${id}/items/${itemId}`)
    await load()
  }

  if (error) return <p className="text-red-400">{error}</p>
  if (!data) return <p className="text-slate-300">Cargando...</p>

  return (
    <div>
      <h1 className="text-xl font-bold">{data.list.name}</h1>
      <p className="mt-1 text-sm text-slate-400">Elementos: {data.items.length}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {data.items.map((it) => (
          <div key={it._id} className="space-y-2">
            <MovieCard item={it} />
            <button
              onClick={() => remove(it._id)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm hover:bg-slate-800"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
