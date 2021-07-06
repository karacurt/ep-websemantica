import React, { useContext, useEffect } from 'react'
import { Form } from '../../components/form'
import { ApiContext } from '../../contexts/ApiContext'
export const ProductForm: React.FC = () => {
  const { schemas, getAllDataFrom, data } = useContext(ApiContext)
  useEffect(() => {
    getAllDataFrom('store')
  }, [])
  const fields = ['id', ...schemas['product']]
  const categories = ['roupas', 'eletronicos', 'calçados', 'brinquedos']
  return <Form subject='product' fields={fields} categories={categories} stores={data} />
}
