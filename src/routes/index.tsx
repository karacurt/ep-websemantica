import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom'
import { SignUp } from '../pages/signup/signup'
import { Home } from '../pages/home'
import { UsersData } from '../pages/users'
import { ProductForm } from '../pages/products/newProduct'
import { StoreForm } from '../pages/store/newStore'
import { StoreData } from '../pages/store/table'
import { ProductsData } from '../pages/products'
import { Cart } from '../pages/cart'
import { ApiContext } from '../contexts/ApiContext'

export const Routes: React.FC = () => {
  const { data } = useContext(ApiContext)
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/new/user'>
          <SignUp />
        </Route>
        <Route exact path='/new/product'>
          <ProductForm />
        </Route>
        <Route exact path='/new/store'>
          <StoreForm />
        </Route>
        <Route exact path='/stores'>
          <StoreData />
        </Route>
        <Route exact path='/users'>
          <UsersData />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/products'>
          <ProductsData data={data} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
