import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function Navbar() {
  const { isLogged, user, logout } = useAuth()

  const item = ({ isActive }) =>
    `rounded px-3 py-2 text-sm ${isActive ? 'bg-slate-800' : 'hover:bg-slate-900'}`

  return (
    <header className="border-b border-slate-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold">CineTracker</Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/trending" className={item}>Trending</NavLink>
          <NavLink to="/search" className={item}>Buscar</NavLink>
          <NavLink to="/lists" className={item}>Mis listas</NavLink>

          {!isLogged ? (
            <NavLink to="/login" className={item}>Login</NavLink>
          ) : (
            <button
              onClick={logout}
              className="rounded bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-white"
            >
              Salir ({user?.name || 'user'})
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
