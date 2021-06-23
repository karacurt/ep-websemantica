import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SignUp } from '../pages/signup/signup'
import { Home } from '../pages/home'
import { UsersData } from '../pages/users'
import { ProductForm } from '../pages/products/newProduct'
import { ProductsData } from '../pages/products/table'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/new/user' component={SignUp} />
        <Route path='/new/product' component={ProductForm} />
        <Route path='/users' component={UsersData} />
        <Route path='/products' component={ProductsData} />
      </Switch>
    </BrowserRouter>
  )
}
