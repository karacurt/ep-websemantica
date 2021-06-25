import React, { useContext, useEffect, useState } from 'react'
import { SearchField } from '../../components/searchBar'
import { SelectBox } from '../../components/select'
import { ApiContext } from '../../contexts/ApiContext'
import { ProductsDataTable } from './ProductsDataTable'

export const ProductsData: React.FC = () => {
  const [field, setField] = useState('')
  const [fields, setFields] = useState([] as any[])
  const { data } = useContext(ApiContext)

  useEffect(() => {
    console.log('fields')
    console.log(fields)
    if (data.length) {
      setFields(Object.keys(data[0]))
    }
    console.log(fields)
  }, [data])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setField(event.target.value as string)
  }
  return (
    <>
      <SelectBox handleChange={handleChange} fields={fields} />
      <SearchField subject='product' field={field} />
      <ProductsDataTable />
    </>
  )
}
