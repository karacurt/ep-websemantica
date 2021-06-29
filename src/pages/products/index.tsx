import React, { useContext, useEffect, useState } from 'react'
import { SearchField } from '../../components/searchBar'
import { SelectBox } from '../../components/select'
import { ApiContext } from '../../contexts/ApiContext'
import { Product } from '../../types'
import { ProductsDataTable } from './ProductsDataTable'

export const ProductsData: React.FC = () => {
  const [field, setField] = useState('')
  const { data, schemas, getAllDataFrom } = useContext(ApiContext)

  useEffect(() => {
    getAllDataFrom('product')
  }, [])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setField(event.target.value as string)
  }
  return (
    <>
      <SelectBox handleChange={handleChange} fields={schemas['product']} field={field} />
      <SearchField subject='product' field={field} />
      <ProductsDataTable products={data} />
    </>
  )
}
