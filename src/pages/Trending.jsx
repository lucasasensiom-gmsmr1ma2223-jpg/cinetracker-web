import React, { useEffect, useState } from 'react'
import { getTrending } from '../api/tmdb'
import { MovieCard } from '../components/MovieCard'

export function Trending() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getTrending()
      .then((data) => setItems(data.results || []))
      .catch((e) => setError(e.message))
  }, [])

  return (
    <div>
      <h1 className="text-xl font-bold">Trending hoy</h1>
      {error ? <p className="mt-3 text-red-400">{error}</p> : null}

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((it) => (
          <MovieCard key={`${it.media_type}-${it.id}`} item={it} />
        ))}
      </div>
    </div>
  )
}
