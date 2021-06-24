import React, { useContext, useEffect } from 'react'
import { SearchField } from '../../components/searchBar'
import { DataTable } from '../../components/table'
import { ApiContext } from '../../contexts/ApiContext'

export const StoreData: React.FC = () => {
  const { data, getAllDataFrom, searchByFieldValue } = useContext(ApiContext)
  useEffect(() => {
    getAllDataFrom('store')
  }, [])
  return (
    <>
      <SearchField subject='store' field='name' />
      <DataTable subject='store' data={data} />
    </>
  )
}
