import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SignUp } from '../pages/signup/signup'
import { Home } from '../pages/home'
import { UsersData } from '../pages/users'
import { ProductForm } from '../pages/products/newProduct'
import { StoreForm } from '../pages/store/newStore'
import { StoreData } from '../pages/store/table'
import { ProductsData } from '../pages/products/table'
import { ProductList } from '../pages/cart'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/new/user' component={SignUp} />
        <Route path='/new/product' component={ProductForm} />
        <Route path='/new/store' component={StoreForm} />
        <Route path='/stores' component={StoreData} />
        <Route path='/users' component={UsersData} />
        <Route path='/cart' component={ProductList} />
        <Route path='/products' component={ProductsData} />
      </Switch>
    </BrowserRouter>
  )
}
