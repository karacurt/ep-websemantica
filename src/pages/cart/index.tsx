import { IconButton, Tooltip } from '@material-ui/core'
import { Payment, RemoveShoppingCart } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
import { ApiContext } from '../../contexts/ApiContext'
import { Product } from '../../types'
/* Product */
interface ProductProps {
  product: Product
  handleRemoveItem: (product: Product) => void
}
const ProductCard: React.FC<ProductProps> = ({ product, handleRemoveItem }) => {
  return (
    <div>
      <div className='row form-group'>
        <div className='col-sm-10'>
          <h4>
            {product.name}: ${product.price}
          </h4>
        </div>
        <div className='col-sm-2 text-right'>qty: 1</div>
        <div className='col-sm-2 text-right'>stock: {product.quantity}</div>
      </div>
      <div className='row btn-toolbar'>
        <div className='col-6 text-right'>
          <button className='btn btn-outline-primary' onClick={() => handleRemoveItem(product)}>
            remover
          </button>
        </div>
      </div>
      <hr />
    </div>
  )
}

export const Cart: React.FC = () => {
  const { cart, buyCart, clearCart, removeItemFromCart } = useContext(ApiContext)
  let total = 0
  cart.forEach((product) => {
    total += Number(product.price)
  })
  const buy = () => {
    buyCart()
  }
  const clear = () => {
    clearCart()
  }
  return (
    <>
      {cart.map(function (product) {
        return <ProductCard product={product} handleRemoveItem={removeItemFromCart} />
      })}
      <div style={{ marginTop: '30px', backgroundColor: '#F6F6F6', padding: '10px' }}>
        <h3 className='row' style={{ fontWeight: 400 }}>
          <span className='col-6'>total price:</span>
          <span className='col-6 text-right'>${total}</span>
        </h3>
      </div>
      <div>
        <Tooltip title='Delete' onClick={() => clear()}>
          <IconButton aria-label='delete'>
            Limpar Carrinho <RemoveShoppingCart />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete' onClick={() => buy()}>
          <IconButton aria-label='delete'>
            Comprar <Payment />
          </IconButton>
        </Tooltip>
      </div>
    </>
  )
}
