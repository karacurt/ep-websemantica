import { Button } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ApiContext } from '../../contexts/ApiContext'
import { getAllSchemas } from '../../services/api'
import Header from '../../components/header/index'
export const Home: React.FC = () => {
  const paths = ['login', 'cart', 'users', 'products', 'stores', 'new/product', 'new/store', 'new/user']
  const { user } = useContext(ApiContext)
  useEffect(() => {
    getAllSchemas()
  }, [])

  return (
    <>
      {paths.map((path) => {
        return (
          <>
            <Header />
            <Link to={`/${path}`}>
              <Button variant='contained' color='primary' href='#contained-buttons'>
                {path}
              </Button>
            </Link>
            <br />
            <br />
          </>
        )
      })}
    </>
  )
}
