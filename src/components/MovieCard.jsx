import React from 'react'
import { Link } from 'react-router-dom'

const IMG = 'https://image.tmdb.org/t/p/w500'

export function MovieCard({ item }) {
  const type = item.media_type || item.mediaType
  const id = item.id || item.tmdbId
  const title = item.title || item.name
  const poster = item.poster_path || item.posterPath

  return (
    <Link
      to={`/detail/${type}/${id}`}
      className="group rounded-xl border border-slate-800 bg-slate-900/40 p-3 hover:bg-slate-900"
    >
      <div className="aspect-[2/3] overflow-hidden rounded-lg bg-slate-800">
        {poster ? (
          <img src={`${IMG}${poster}`} alt={title} className="h-full w-full object-cover group-hover:scale-[1.02] transition" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">Sin póster</div>
        )}
      </div>
      <div className="mt-3">
        <div className="text-sm font-semibold line-clamp-2">{title}</div>
        <div className="mt-1 text-xs text-slate-400">{type}</div>
      </div>
    </Link>
  )
}
