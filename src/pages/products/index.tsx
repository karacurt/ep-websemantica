import React, { useContext, useEffect, useState } from 'react'
import { SearchField } from '../../components/searchBar'
import { SelectBox } from '../../components/select'
import { ApiContext } from '../../contexts/ApiContext'
import { Product } from '../../types'
import { ProductsDataTable } from './ProductsDataTable'

export const ProductsData: React.FC = () => {
  const [field, setField] = useState('')
  const [fields, setFields] = useState([] as any[])
  const [products, setProducts] = useState([] as any[])
  const { data, getAllDataFrom } = useContext(ApiContext)

  useEffect(() => {
    getAllDataFrom('product')
  }, [])

  useEffect(() => {
    if (data.length) {
      setFields(Object.keys(data[0]))
    }

    setProducts(data)
    console.log('fields')
    console.log(fields)

    console.log('data')
    console.log(data)
  }, [data])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setField(event.target.value as string)
  }
  return (
    <>
      <SelectBox handleChange={handleChange} fields={fields} field={field} />
      <SearchField subject='product' field={field} />
      <ProductsDataTable products={data} />
    </>
  )
}