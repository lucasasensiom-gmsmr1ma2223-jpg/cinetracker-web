import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetail } from '../api/tmdb'
import { myApi } from '../api/myApi'
import { useAuth } from '../contexts/AuthContext'

const IMG = 'https://image.tmdb.org/t/p/w500'

export function Detail() {
  const { type, id } = useParams()
  const { isLogged } = useAuth()
  const [data, setData] = useState(null)
  const [lists, setLists] = useState([])
  const [selected, setSelected] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    getDetail(type, id).then(setData)
  }, [type, id])

  useEffect(() => {
    if (!isLogged) return
    myApi.get('/api/lists').then((r) => {
      setLists(r.data)
      setSelected(r.data?.[0]?._id || '')
    })
  }, [isLogged])

  async function addToList() {
    if (!selected || !data) return
    setMsg('')
    await myApi.post(`/api/lists/${selected}/items`, {
      tmdbId: Number(id),
      title: data.title || data.name,
      posterPath: data.poster_path || '',
      mediaType: type
    })
    setMsg('✅ Añadido a la lista')
  }

  if (!data) return <div className="text-slate-300">Cargando...</div>

  return (
    <div className="grid gap-6 md:grid-cols-[200px_1fr]">
      <div className="overflow-hidden rounded-xl bg-slate-900">
        {data.poster_path ? (
          <img src={`${IMG}${data.poster_path}`} alt={data.title || data.name} className="w-full" />
        ) : (
          <div className="p-6 text-slate-400">Sin póster</div>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold">{data.title || data.name}</h1>
        <p className="mt-2 text-slate-300">{data.overview || 'Sin descripción.'}</p>

        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="text-sm text-slate-300">Tipo: <span className="font-semibold">{type}</span></div>
          {isLogged ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2"
              >
                {lists.map((l) => (
                  <option key={l._id} value={l._id}>{l.name}</option>
                ))}
              </select>
              <button
                onClick={addToList}
                className="rounded-lg bg-slate-100 px-4 py-2 font-medium text-slate-900 hover:bg-white"
              >
                Añadir a lista
              </button>
              {msg ? <span className="text-sm text-emerald-400">{msg}</span> : null}
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-400">Haz login para guardar en tus listas.</p>
          )}
        </div>
      </div>
    </div>
  )
}
