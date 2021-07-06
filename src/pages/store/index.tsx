import { IconButton } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchField } from '../../components/searchBar'
import { SelectBox } from '../../components/select'
import { DataTable } from '../../components/table'
import { ApiContext } from '../../contexts/ApiContext'

export const StoreData: React.FC = () => {
  const [field, setField] = useState('')
  const [fields, setFields] = useState([])
  const { data, schemas, getAllDataFrom } = useContext(ApiContext)

  useEffect(() => {
    getAllDataFrom('store')
  }, [])

  useEffect(() => {
    if (schemas['store']) setFields(schemas['store'])
  }, [schemas])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setField(event.target.value as string)
  }

  return (
    <>
      <SelectBox handleChange={handleChange} fields={fields} field={field} />
      <SearchField subject='store' field={field} />
      <DataTable data={data} />
      <IconButton aria-label='add'>
        <Link to='new/product'>
          Adicionar novo <AddCircle />
        </Link>
      </IconButton>
    </>
  )
}
