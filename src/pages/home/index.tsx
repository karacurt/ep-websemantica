import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ApiContext } from '../../contexts/ApiContext'

export const Home: React.FC = () => {
  const paths = ['login', 'cart', 'users', 'products', 'stores', 'new/product', 'new/store', 'new/user']
  const { user } = useContext(ApiContext)

  console.log('user->>')
  console.log(user)
  return (
    <>
      {paths.map((path) => {
        return (
          <>
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
