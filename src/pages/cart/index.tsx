import React, { useContext, useState } from 'react'
import { ApiContext } from '../../contexts/ApiContext'
/* Product */
interface ProductProps {
  name: string
  info: string
  price: number
  handleTotal: (price: number) => void
  handleShow: (info: string) => void
}
const Product: React.FC<ProductProps> = ({ name, info, price, handleTotal, handleShow }) => {
  const [qty, setQty] = useState(0)

  const add = () => {
    setQty(qty + 1)
    handleTotal(price)
  }

  const subtract = () => {
    setQty(qty - 1)
    handleTotal(-price)
  }

  const showInfo = () => {
    handleShow(info)
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
      </div>
      <div className='row btn-toolbar'>
        <div className='col-6'>
          <button className='btn btn-outline-primary' onClick={() => showInfo()}>
            show info
          </button>
        </div>
        <div className='col-6 text-right'>
          <button className='btn btn-outline-primary' onClick={() => add()}>
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
  let total = totalProp.toFixed(2)
  let tax = (totalProp * 0.15).toFixed(2)
  let totalIncTax = (+total + +tax).toFixed(2)
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
      <h3 className='row' style={{ fontWeight: 400 }}>
        <span className='col-6'>tax (15%):</span>
        <span className='col-6 text-right'>${tax}</span>
      </h3>
      <h3 className='row' style={mystyle}>
        <span className='col-6'>tota inc tax:</span>
        <span className='col-6 text-right'>${totalIncTax}</span>
      </h3>
    </div>
  )
}

export const ProductList: React.FC = () => {
  const [total, setTotal] = useState(0)
  const calculateTotal = (price: any) => {
    setTotal(total + price)
  }

  const showProduct = (info: any) => {
    console.log(info)
    alert(info)
  }
  const { cart } = useContext(ApiContext)

  let productList = [
    { name: 'android', price: 231, info: 'product of google' },
    { name: 'iphone', price: 784, info: 'product of apple' },
    { name: 'windows', price: 156, info: 'product of microsoft' }
  ]

  return (
    <>
      {productList.map(function (product) {
        return <Product name={product.name} price={product.price} info={product.info} handleShow={showProduct} handleTotal={calculateTotal} />
      })}
      <Total totalProp={total} />
    </>
  )
}
