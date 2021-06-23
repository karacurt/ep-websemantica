import React from 'react'
import './App.css'
import { ApiProvider } from './contexts/ApiContext'
import { UsersProvider } from './contexts/UsersContext'
import { Routes } from './routes/index'

export const App: React.FC = () => {
  return (
    <ApiProvider>
      <UsersProvider>
        <Routes />
      </UsersProvider>
    </ApiProvider>
  )
}
