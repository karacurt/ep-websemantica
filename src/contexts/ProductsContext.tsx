import React, { createContext, useEffect, useState } from 'react'

interface User {
  name: string
  email: string
  password: string
}
interface UserContextProps {
  Products: User[]
  getProducts: () => void
}
export const ProductsContext = createContext<UserContextProps>({} as UserContextProps)

export const ProductsProvider: React.FC = ({ children }) => {
  const [Products, setProducts] = useState([])
  useEffect(() => {
    console.log(`Products alterado useffect context -->`)
    console.log(Products)
  }, [Products])
  const getProducts = async () => {
    console.log('getting Products from context')

  }
  return <ProductsContext.Provider value={{ Products, getProducts }}>{children}</ProductsContext.Provider>
}
