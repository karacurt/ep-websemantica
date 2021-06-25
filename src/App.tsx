import React from 'react'
import './App.css'
import { ApiProvider } from './contexts/ApiContext'
import { UsersProvider } from './contexts/UsersContext'
import { Routes } from './routes/index'

export default function App() {
  return (
    <ApiProvider>
      <UsersProvider>
        <Routes />
      </UsersProvider>
    </ApiProvider>
  )
}
