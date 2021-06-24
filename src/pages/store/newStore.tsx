import React from 'react'
import { Form } from '../../components/form'
export const StoreForm: React.FC = () => {
  const fields = ['id', 'name', 'activity', 'link', 'address']
  return <Form subject='store' fields={fields} />
}