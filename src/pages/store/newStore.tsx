import React, { useContext } from 'react'
import { Form } from '../../components/form'
import { ApiContext } from '../../contexts/ApiContext'
export const StoreForm: React.FC = () => {
  const { schemas } = useContext(ApiContext)

  const fields = ['id', ...schemas['store']]
  const activities = ['roupas', 'eletronicos', 'calçados', 'brinquedos']
  return <Form subject='store' fields={fields} activities={activities} />
}
