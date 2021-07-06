import React, { createContext, useEffect, useState } from 'react'
import { authenticate, create, getAll, getAllByFieldValue, getAllSchemas, getSchemaFrom, PREFIX } from '../services/api'
import { v4 as uuidv4 } from 'uuid'
import { Product, User } from '../types'

interface UserContextProps {
  schemas: any
  user: User
  loading: boolean
  data: any[]
  cart: any[]
  isLogged: boolean
  buyCart: () => void
  clearCart: () => void
  getData: () => void
  removeItemFromCart: (product: Product) => void
  addProductToCart: (product: Product) => void
  getAllDataFrom: (subject: string) => void
  searchByFieldValue: (subject: string, field: string, value: string) => void
  createSession: (email: string, password: string) => void
  destroySession: () => void
}
export const ApiContext = createContext<UserContextProps>({} as UserContextProps)

export const ApiProvider: React.FC = ({ children }) => {
  const [data, setData] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([] as any[])
  const [user, setUser] = useState({} as User)
  const [isLogged, setIsLogged] = useState(false)
  const [schemas, setSchemas] = useState({} as any)

  const createSession = async (email: string, password: string) => {
    const userData: User = await authenticate(email, password)

    if (!userData) {
      setIsLogged(false)
      alert('usuario ou senha inválidos')
      return
    }
    localStorage.setItem('userId', userData.id)
    localStorage.setItem('userEmail', userData.email)
    localStorage.setItem('userName', userData.name)
    localStorage.setItem('expiresAt', String(Date.now() + 100))

    setUser(userData as User)

    setIsLogged(true)
    alert('logado!')
  }
  const destroySession = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    localStorage.removeItem('expiresAt')
    setIsLogged(false)
  }
  const clearCart = () => {
    setCart([])
  }
  const removeItemFromCart = (productProp: any) => {
    setCart(cart.filter((product) => product !== productProp))
    console.log('removing item--->')
    console.log(cart)
  }
  const buyCart = () => {
    if (!user.id) return alert('é preciso estar logado para poder comprar o produto')

    const cartId = uuidv4()

    console.log('buying cart-->')
    console.log(cart)

    cart.map((product) => {
      create('cart', {
        id: cartId,
        itemBought: `${PREFIX}product/${product.id}`,
        buyer: `${PREFIX}product/${user.id}`
      })
    })
  }
  const addProductToCart = (product: Product) => {
    for (const productAdded of cart) {
      if (productAdded.id === product.id) return
    }
    cart.push(product)
  }
  const getData = () => {
    return data
  }
  const getAllDataFrom = async (subject: string) => {
    setLoading(true)
    const response = await getAll(subject)

    console.log(`get all data from ${subject}`)
    console.log(response)

    setData(response)
    setLoading(false)
  }
  const searchByFieldValue = async (subject: string, field: string, value: string) => {
    if (!value.length || !field.length) {
      getAllDataFrom(subject)
      return
    }
    const response = await getAllByFieldValue(subject, field, value)

    console.log('query result serachbyfield--->')
    console.log(response)

    setData(response)
    return response
  }
  const generateSchemas = async () => {
    const generatedSchemas = await getAllSchemas()
    setSchemas(generatedSchemas)
  }

  useEffect(() => {
    generateSchemas()

    const expiresAt = localStorage.getItem('expiresAt')
    console.log(expiresAt)
    console.log('destroySession')
    if (!expiresAt || Number(expiresAt) > Date.now()) {
      console.log('destroySession')
      destroySession()
    } else {
      const userData = {
        id: localStorage.getItem('userId'),
        name: localStorage.getItem('userName'),
        email: localStorage.getItem('userEmail')
      } as User

      setUser(userData)
      setIsLogged(true)
    }
  }, [])

  return <ApiContext.Provider value={{ data, user, schemas, isLogged, getAllDataFrom, createSession, destroySession, getData, removeItemFromCart, searchByFieldValue, addProductToCart, buyCart, clearCart, cart, loading }}>{children}</ApiContext.Provider>
}
