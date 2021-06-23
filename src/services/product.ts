import { Product } from '../types'
import { create } from './api'

export async function createProduct(product: Product) {
  //product.id = product.name
  create('product', product)
}
