import React, { useContext, useEffect } from 'react'
import { DataTable } from '../../components/table'
import { ApiContext } from '../../contexts/ApiContext'

export const ProductsData: React.FC = () => {
  const { data, getAllDataFrom, searchByFieldValue } = useContext(ApiContext)
  useEffect(() => {
    getAllDataFrom('product')
  }, [])
  return !data || <DataTable subject='product' data={data} />
}
