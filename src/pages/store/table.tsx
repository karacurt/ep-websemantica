import React, { useContext, useEffect } from 'react'
import { SearchField } from '../../components/searchBar'
import { DataTable } from '../../components/table'
import { ApiContext } from '../../contexts/ApiContext'

export const StoreData: React.FC = () => {
  const { data, getAllDataFrom } = useContext(ApiContext)

  useEffect(() => {
    getAllDataFrom('store')
  }, [])

  return (
    <>
      <SearchField subject='store' field='name' />
      <DataTable data={data} />
    </>
  )
}
