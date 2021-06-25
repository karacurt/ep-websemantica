import React, { useContext, useEffect } from 'react'
import { SearchField } from '../../components/searchBar'
import { DataTable } from '../../components/table'
import { ApiContext } from '../../contexts/ApiContext'

export const UsersData: React.FC = () => {
  const { data, getAllDataFrom } = useContext(ApiContext)

  useEffect(() => {
    getAllDataFrom('users')
  }, [])

  return (
    <>
      <SearchField subject='users' field='name' />
      <DataTable data={data} />
    </>
  )
}
