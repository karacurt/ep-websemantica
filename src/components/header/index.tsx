import React, { Component, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
import { ApiContext } from '../../contexts/ApiContext'

const styleLink = document.createElement('link')
styleLink.rel = 'stylesheet'
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css'
document.head.appendChild(styleLink)
interface Props {
  paths: string[]
}
export const MenuExampleInvertedSecondary: React.FC = () => {
  const { isLogged } = useContext(ApiContext)
  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <Menu name='menu' />
        <Link to='/stores'>
          <Menu.Item name='stores' />
        </Link>
        <Link to='/products'>
          <Menu.Item name='products' />
        </Link>
        <Link to='/cart'>
          <Menu.Item name='cart' />
        </Link>
        <Link to='/recommendations'>
          <Menu.Item name='recomendações' />
        </Link>
        {isLogged ? (
          <Link to='/logout'>
            <Menu.Item name='logout' />
          </Link>
        ) : (
          <Link to='/login'>
            <Menu.Item name='login' />
          </Link>
        )}
      </Menu>
    </Segment>
  )
}

export default MenuExampleInvertedSecondary
