import React, { useContext, useEffect, useState } from 'react'
import { SearchField } from '../../components/searchBar'
import { SelectBox } from '../../components/select'
import { DataTable } from '../../components/table'
import { ApiContext } from '../../contexts/ApiContext'

export const StoreData: React.FC = () => {
  const [field, setField] = useState('')
  const { data, schemas, getAllDataFrom } = useContext(ApiContext)

  useEffect(() => {
    getAllDataFrom('store')
  }, [])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setField(event.target.value as string)
  }

  return (
    <>
      <SelectBox handleChange={handleChange} fields={schemas['store']} field={field} />
      <SearchField subject='store' field={field} />
      <DataTable data={data} />
    </>
  )
}
