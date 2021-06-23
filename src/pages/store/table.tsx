import React, { useContext, useEffect } from 'react'
import { DataTable } from '../../components/table'
import { ApiContext } from '../../contexts/ApiContext'

export const StoreData: React.FC = () => {
  const { data, getAllDataFrom } = useContext(ApiContext)
  useEffect(() => {
    getAllDataFrom('store')
  }, [])
  return <DataTable subject='store' data={data} />
}
