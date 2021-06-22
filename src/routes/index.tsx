import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SignUp } from '../pages/signup/signup'
import { Home } from '../pages/home'
import { UsersData } from '../pages/users'
export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={SignUp} />
        <Route path='/users' component={UsersData} />
      </Switch>
    </BrowserRouter>
  )
}
