import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './components/AppLayout'
import { ProtectedRoute } from './components/ProtectedRoute'

import { Home } from './pages/Home'
import { Trending } from './pages/Trending'
import { Search } from './pages/Search'
import { Detail } from './pages/Detail'
import { Login } from './pages/Login'
import { MyLists } from './pages/MyLists'
import { ListDetail } from './pages/ListDetail'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/trending', element: <Trending /> },
      { path: '/search', element: <Search /> },
      { path: '/detail/:type/:id', element: <Detail /> },
      { path: '/login', element: <Login /> },
      {
        path: '/lists',
        element: (
          <ProtectedRoute>
            <MyLists />
          </ProtectedRoute>
        )
      },
      {
        path: '/lists/:id',
        element: (
          <ProtectedRoute>
            <ListDetail />
          </ProtectedRoute>
        )
      }
    ]
  }
])
