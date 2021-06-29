import React, { useContext } from 'react'
import { Form } from '../../components/form'
import { ApiContext } from '../../contexts/ApiContext'
export const ProductForm: React.FC = () => {
  const { schemas } = useContext(ApiContext)
  const fields = ['id', ...schemas['product']]
  return <Form subject='product' fields={fields} />
}
