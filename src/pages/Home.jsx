import React from 'react'

export function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Bienvenido a CineTracker</h1>
      <p className="text-slate-300">
        App MERN de ejemplo: consume <span className="font-semibold">TMDB</span> (API externa) y tu propia API (listas).
      </p>
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <ul className="list-disc space-y-1 pl-5 text-slate-300">
          <li>Trending y búsqueda con TMDB</li>
          <li>Login con JWT</li>
          <li>Listas guardadas en MongoDB Atlas</li>
        </ul>
      </div>
    </div>
  )
}
