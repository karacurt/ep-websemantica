import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { ApiContext } from '../../contexts/ApiContext'

export const Logout: React.FC = () => {
  const { destroySession } = useContext(ApiContext)
  useEffect(() => {
    destroySession()
  }, [])
  return <Redirect to='login' />
}
