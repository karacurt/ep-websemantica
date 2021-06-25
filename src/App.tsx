import React from 'react'
import './App.css'
import { ApiProvider } from './contexts/ApiContext'
import { Routes } from './routes/index'

export const App: React.FC = () => {
  return (
    <ApiProvider>
      <Routes />
    </ApiProvider>
  )
}
