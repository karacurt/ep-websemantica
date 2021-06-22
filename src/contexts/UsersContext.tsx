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
  const [users, setUsers] = useState([])
  useEffect(() => {
    console.log(`users alterado useffect context -->`)
    console.log(users)
  }, [users])
  const getUsers = async () => {
    console.log('getting users from context')
    const allUsers = await getAllUsers()
    console.log(allUsers)
    setUsers(allUsers)
  }
  return <UsersContext.Provider value={{ users, getUsers }}>{children}</UsersContext.Provider>
}
