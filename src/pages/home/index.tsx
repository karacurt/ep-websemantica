import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export const Home: React.FC = () => {
  const paths = ['login', 'cart', 'users', 'products', 'stores', 'new/product', 'new/store', 'new/user']

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
