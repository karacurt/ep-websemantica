import React, { useContext, useEffect } from 'react'
import { DataTable } from '../../components/table'
import { ApiContext } from '../../contexts/ApiContext'

export const ProductsData: React.FC = () => {
  const { data, getAllDataFrom } = useContext(ApiContext)
  useEffect(() => {
    getAllDataFrom('product')
  }, [])
  return <DataTable subject='product' data={data} />
}
