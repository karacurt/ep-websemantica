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
import { RouteWrapper } from './Route'
import { ApiContext } from '../contexts/ApiContext'
import Header from '../components/header/index'
import { Logout } from '../pages/logout'
import { RecommendationsPage } from '../pages/recommendations'
export const Routes: React.FC = () => {
  const { isLogged } = useContext(ApiContext)
  console.log(isLogged)
  return (
    <BrowserRouter>
      <Switch>
        {!isLogged ? (
          <>
            <RouteWrapper path='/login' component={LoginPage} isPublic />
            <RouteWrapper path='/new/user' component={SignUp} isPublic />
          </>
        ) : (
          <>
            <Header />
            <RouteWrapper path='/' component={Home} />
            <RouteWrapper path='/logout' component={Logout} />
            <RouteWrapper path='/new/product' component={ProductForm} />
            <RouteWrapper path='/new/store' component={StoreForm} />
            <RouteWrapper path='/stores' component={StoreData} />
            <RouteWrapper path='/users' component={UsersData} />
            <RouteWrapper path='/cart' component={Cart} />
            <RouteWrapper path='/products' component={ProductsData} />
            <RouteWrapper path='/recommendations' component={RecommendationsPage} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  )
}
