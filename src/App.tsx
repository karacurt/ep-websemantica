import React from 'react'
import './App.css'
import { UsersProvider } from './contexts/UsersContext'
import { Routes } from './routes/index'

export const App: React.FC = () => {
  return (
    <UsersProvider>
      <Routes />
    </UsersProvider>
  )
}
