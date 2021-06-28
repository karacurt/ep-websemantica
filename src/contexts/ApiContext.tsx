import React, { createContext, useState } from 'react'
import { authenticate, create, getAll, getAllByFieldValue, PREFIX } from '../services/api'
import { v4 as uuidv4 } from 'uuid'
import { Product, User } from '../types'

interface UserContextProps {
  user: User
  loading: boolean
  data: any[]
  cart: any[]
  buyCart: () => void
  clearCart: () => void
  getData: () => void
  removeItemFromCart: (product: Product) => void
  addProductToCart: (id: string) => void
  getAllDataFrom: (subject: string) => void
  searchByFieldValue: (subject: string, field: string, value: string) => void
  createSession: (username: string, password: string) => void
}
export const ApiContext = createContext<UserContextProps>({} as UserContextProps)

export const ApiProvider: React.FC = ({ children }) => {
  const [data, setData] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([] as any[])
  const [user, setUser] = useState({} as User)

  const createSession = async (email: string, password: string) => {
    const userData: User = await authenticate(email, password)
    console.log('userData--->')
    console.log(userData)

    if (!userData) return false

    setUser(userData)
    return true
  }
  const clearCart = () => {
    setCart([])
  }
  const removeItemFromCart = (productProp: any) => {
    console.log('removing item')
    console.log(cart)
    setCart(cart.filter((product) => product !== productProp))
    console.log(cart)
  }
  const buyCart = () => {
    console.log('olha o cart buying')
    console.log(cart)

    if (!user.id) return alert('é preciso logar para poder comprar o produto')
    const cartId = uuidv4()

    cart.map((product) => {
      create('cart', {
        id: cartId,
        itemBought: `${PREFIX}product/${product.id}`,
        buyer: `${PREFIX}product/${user.id}`
      })
    })
  }
  const addProductToCart = (id: string) => {
    if (cart.includes(id)) return
    cart.push(id)
    console.log('carrinho -->')
    console.log(cart)
  }
  const getData = () => {
    return data
  }
  const getAllDataFrom = async (subject: string) => {
    setLoading(true)
    const response = await getAll(subject)
    console.log(response)
    setData(response)
    setLoading(false)
    return data
  }
  const searchByFieldValue = async (subject: string, field: string, value: string) => {
    console.log('query de pesquisa -->')
    console.log(value)
    if (!value.length) getAllDataFrom(subject)
    const response = await getAllByFieldValue(subject, field, value)
    console.log('resultado do serachbyfield')
    console.log(response)
    setData(response)
    return response
  }

  return <ApiContext.Provider value={{ data, user, getAllDataFrom, createSession, getData, removeItemFromCart, searchByFieldValue, addProductToCart, buyCart, clearCart, cart, loading }}>{children}</ApiContext.Provider>
}
