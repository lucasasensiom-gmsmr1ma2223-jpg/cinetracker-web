const BASE = 'https://api.themoviedb.org/3'

function key() {
  const k = import.meta.env.VITE_TMDB_KEY
  if (!k) throw new Error('Falta VITE_TMDB_KEY en el .env')
  return k
}

export async function getTrending() {
  const url = `${BASE}/trending/all/day?api_key=${key()}&language=es-ES`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Error TMDB trending')
  return res.json()
}

export async function searchMulti(query) {
  const url = `${BASE}/search/multi?api_key=${key()}&language=es-ES&query=${encodeURIComponent(query)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Error TMDB search')
  return res.json()
}

export async function getDetail(type, id) {
  const url = `${BASE}/${type}/${id}?api_key=${key()}&language=es-ES`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Error TMDB detail')
  return res.json()
}
