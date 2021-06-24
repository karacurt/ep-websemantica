import React, { createContext, useEffect, useState } from 'react'
import { create, getAll, getAllByFieldValue, PREFIX } from '../services/api'
import { v4 as uuidv4 } from 'uuid'
interface User {
  name: string
  email: string
  password: string
}
interface UserContextProps {
  loading: boolean
  data: any[]
  cart: any[]
  buyCart: () => void
  addProductToCart: (id: string) => void
  getAllDataFrom: (subject: string) => void
  searchByFieldValue: (subject: string, field: string, value: string) => void
}
export const ApiContext = createContext<UserContextProps>({} as UserContextProps)

export const ApiProvider: React.FC = ({ children }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const cart: any[] = []

  const buyCart = () => {
    const cartId = uuidv4()
    cart.map((productId) => {
      create('cart', {
        id: cartId,
        itemBought: `${PREFIX}product/${productId}`
      })
    })
  }
  const addProductToCart = (id: string) => {
    if (cart.includes(id)) return
    cart.push(id)
    console.log('carrinho -->')
    console.log(cart)
  }

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

  return <ApiContext.Provider value={{ data, getAllDataFrom, searchByFieldValue, addProductToCart, buyCart, cart, loading }}>{children}</ApiContext.Provider>
}
