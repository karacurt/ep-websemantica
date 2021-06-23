/// <reference path='../types/rdf.d.ts' />
import rdf from 'rdf'
import { Product } from '../types'
import { create } from './api'

const CLASS_PREFIX = 'http://epwebsemantica.com/product'
const rdfjs = rdf.factory
const ep = rdf.ns('http://epwebsemantica.com/')
const IRI = rdf.ns(`${CLASS_PREFIX}/`)

export async function createProduct(product: Product) {
  product.id = product.name
  create('product', product)
}
