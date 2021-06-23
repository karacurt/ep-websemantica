import React, { createContext, useEffect, useState } from 'react'
import { getAll, getAllByFieldValue } from '../services/api'

interface User {
  name: string
  email: string
  password: string
}
interface UserContextProps {
  loading: boolean
  data: any[]
  getAllDataFrom: (subject: string) => void
  searchByFieldValue: (subject: string, field: string, value: string) => void
}
export const ApiContext = createContext<UserContextProps>({} as UserContextProps)

export const ApiProvider: React.FC = ({ children }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getAllDataFrom = async (subject: string) => {
    setLoading(true)
    const response = await getAll(subject)
    console.log(response)
    setData(response)
    setLoading(false)
  }

  const searchByFieldValue = async (subject: string, field: string, value: string) => {
    const data = await getAllByFieldValue(subject, field, value)
    console.log('resultado do serachbyfield')
    console.log(data)
    setData(data)
  }

  return <ApiContext.Provider value={{ data, getAllDataFrom, searchByFieldValue, loading }}>{children}</ApiContext.Provider>
}
