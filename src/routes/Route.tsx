import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { ApiContext } from '../contexts/ApiContext'
import { LoginPage } from '../login'

interface Props {
  path: string
  component: React.ComponentType<any>
  isPublic?: boolean
}
export const RouteWrapper: React.FC<Props> = ({ path, component, isPublic = false }) => {
  const { isLogged } = useContext(ApiContext)

  if (!isPublic && !isLogged) {
    return <LoginPage />
  }

  return <Route exact path={path} component={component} />
}
