import React from 'react'
import { Form } from '../../components/form'
export const ProductForm: React.FC = () => {
  const fields = ['id', 'name', 'price', 'category']
  return <Form subject='product' fields={fields} />
}
