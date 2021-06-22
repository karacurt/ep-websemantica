import React, { createContext, useEffect, useState } from 'react'
import { getAllUsers } from '../services/user'
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
    const allUsers = await getAllUsers()
    setUsers(allUsers)
  }

  return <UsersContext.Provider value={{ users, getUsers }}>{children}</UsersContext.Provider>
}
