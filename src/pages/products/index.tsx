import { IconButton } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchField } from '../../components/searchBar'
import { SelectBox } from '../../components/select'
import { ApiContext } from '../../contexts/ApiContext'
import { Product } from '../../types'
import { ProductsDataTable } from './ProductsDataTable'

export const ProductsData: React.FC = () => {
  const [field, setField] = useState('')
  const [fields, setFields] = useState([])
  const { data, schemas, getAllDataFrom } = useContext(ApiContext)

  useEffect(() => {
    if (schemas['product']) setFields(schemas['product'])
  }, [schemas])

  useEffect(() => {
    getAllDataFrom('product')
  }, [])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setField(event.target.value as string)
  }
  return (
    <>
      <SelectBox handleChange={handleChange} fields={fields} field={field} />
      <SearchField subject='product' field={field} />
      <ProductsDataTable products={data} />
      <IconButton aria-label='add'>
        <Link to='new/product'>
          Adicionar novo <AddCircle />
        </Link>
      </IconButton>
    </>
  )
}
