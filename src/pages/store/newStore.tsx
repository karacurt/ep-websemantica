import React, { useContext } from 'react'
import { Form } from '../../components/form'
import { ApiContext } from '../../contexts/ApiContext'
export const StoreForm: React.FC = () => {
  const { schemas } = useContext(ApiContext)

  const fields = ['id', ...schemas['store']]

  return <Form subject='store' fields={fields} />
}
