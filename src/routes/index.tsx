import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SignUp } from '../pages/signup/signup'
import { Home } from '../pages/home'
import { UsersData } from '../pages/users'
import { ProductForm } from '../pages/products/newProduct'
import { StoreForm } from '../pages/store/newStore'
import { StoreData } from '../pages/store'
import { ProductsData } from '../pages/products'
import { Cart } from '../pages/cart'
import { LoginPage } from '../login'
import { ApiContext } from '../contexts/ApiContext'
export const Routes: React.FC = () => {
  const { isLogged } = useContext(ApiContext)

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <>
          <Route exact path='/' component={Home} />
          <Route exact path='/new/user' component={SignUp} />
          <Route exact path='/new/product' component={ProductForm} />
          <Route exact path='/new/store' component={StoreForm} />
          <Route exact path='/stores' component={StoreData} />
          <Route exact path='/users' component={UsersData} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/products' component={ProductsData} />
        </>
      </Switch>
    </BrowserRouter>
  )
}
