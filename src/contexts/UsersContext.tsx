import React, { createContext, useEffect, useState } from 'react'
import { getAll } from '../services/api'
interface User {
  name: string
  email: string
  password: string
}
interface UserContextProps {
  users: User[]
  getUsers: () => void
}
export const UsersContext = createContext<UserContextProps>({} as UserContextProps)

export const UsersProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState([] as User[])

  const getUsers = async () => {
    const allUsers = await getAll('user')
    setUsers(allUsers)
  }

  return <UsersContext.Provider value={{ users, getUsers }}>{children}</UsersContext.Provider>
}
