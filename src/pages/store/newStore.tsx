import React, { useContext } from 'react'
import { Form } from '../../components/form'
import { ApiContext } from '../../contexts/ApiContext'
export const StoreForm: React.FC = () => {
  const { schemas } = useContext(ApiContext)

  const fields = ['id', ...schemas['store']]
  console.log('store fields->>')
  console.log(fields)
  return <Form subject='store' fields={fields} />
}
