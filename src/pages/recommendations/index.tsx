import React, { useContext, useEffect, useState } from 'react'
import { DataTable } from '../../components/table'
import { ApiContext } from '../../contexts/ApiContext'

export const RecommendationsPage: React.FC = () => {
  const { data, getRecommendations } = useContext(ApiContext)

  useEffect(() => {
    getRecommendations()
  }, [])

  return <DataTable data={data} />
}
