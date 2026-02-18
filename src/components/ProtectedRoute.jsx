import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function ProtectedRoute({ children }) {
  const { isLogged } = useAuth()
  if (!isLogged) return <Navigate to="/login" replace />
  return children
}
