import React, { useContext, useEffect, useState } from 'react'
import { SearchField } from '../../components/searchBar'
import { SelectBox } from '../../components/select'
import { DataTable } from '../../components/table'
import { ApiContext } from '../../contexts/ApiContext'

export const StoreData: React.FC = () => {
  const [field, setField] = useState('')
  const [fields, setFields] = useState([] as any[])
  const { data, getAllDataFrom } = useContext(ApiContext)

  useEffect(() => {
    getAllDataFrom('store')
  }, [])
  useEffect(() => {
    console.log('fields')
    console.log(fields)
    if (data.length) {
      setFields(Object.keys(data[0]))
    }
    console.log(fields)
  }, [data])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setField(event.target.value as string)
  }

  return (
    <>
      <SelectBox handleChange={handleChange} fields={fields} field={field} />
      <SearchField subject='store' field={field} />
      <DataTable data={data} />
    </>
  )
}
