import { IconButton, Tooltip } from '@material-ui/core'
import { Payment, RemoveShoppingCart } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
import { ApiContext } from '../../contexts/ApiContext'
/* Product */
interface ProductProps {
  name: string
  price: number
  stock: number
  handleTotal: (price: number) => void
}
const Product: React.FC<ProductProps> = ({ name, price, handleTotal, stock }) => {
  const [qty, setQty] = useState(0)
  console.log('price')
  console.log(price)
  console.log(typeof price)
  const add = () => {
    setQty(qty + 1)
    handleTotal(price)
  }

  const subtract = () => {
    setQty(qty - 1)
    handleTotal(-price)
  }

  return (
    <div>
      <div className='row form-group'>
        <div className='col-sm-10'>
          <h4>
            {name}: ${price}
          </h4>
        </div>
        <div className='col-sm-2 text-right'>qty: {qty}</div>
        <div className='col-sm-2 text-right'>stock: {stock}</div>
      </div>
      <div className='row btn-toolbar'>
        <div className='col-6 text-right'>
          <button className='btn btn-outline-primary' onClick={() => add()} disabled={qty === stock}>
            +1
          </button>
          <button className='btn btn-outline-primary' onClick={() => subtract()} disabled={qty < 1}>
            -1
          </button>
        </div>
      </div>
      <hr />
    </div>
  )
}
interface TotalProps {
  totalProp: number
}
export const Total: React.FC<TotalProps> = ({ totalProp }) => {
  let total = totalProp

  let mystyle = {
    borderTop: '1px solid #ddd',
    marginTop: '10px'
  }
  return (
    <div style={{ marginTop: '30px', backgroundColor: '#F6F6F6', padding: '10px' }}>
      <h3 className='row' style={{ fontWeight: 400 }}>
        <span className='col-6'>total price:</span>
        <span className='col-6 text-right'>${total}</span>
      </h3>
    </div>
  )
}

export const ProductList: React.FC = () => {
  const { cart, buyCart, clearCart } = useContext(ApiContext)
  const [total, setTotal] = useState(0)

  const calculateTotal = (price: number) => {
    const newTotal = total + price
    setTotal(newTotal)
  }
  const buy = () => {
    buyCart()
  }
  const clear = () => {
    clearCart()
  }
  return (
    <>
      {cart.map(function (product) {
        return <Product name={product.name} price={Number(product.price)} stock={Number(product.quantity)} handleTotal={calculateTotal} />
      })}
      <Total totalProp={total} />
      <div>
        <Tooltip title='Delete' onClick={() => buy()}>
          <IconButton aria-label='delete'>
            Comprar <Payment />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete' onClick={() => clear()}>
          <IconButton aria-label='delete'>
            Limpar Carrinho <RemoveShoppingCart />
          </IconButton>
        </Tooltip>
      </div>
    </>
  )
}
