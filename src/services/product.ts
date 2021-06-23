/// <reference path='../types/rdf.d.ts' />
import rdf from 'rdf'
import { Product } from '../types'
import { create } from './api'

const CLASS_PREFIX = 'http://epwebsemantica.com/product'
const rdfjs = rdf.factory
const ep = rdf.ns('http://epwebsemantica.com/')
const IRI = rdf.ns(`${CLASS_PREFIX}/`)

export async function createProduct(product: Product) {
  const data = {
    '@context': {
      '@vocab': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
    },
    '@id': IRI(product.id),
    type: ep('product')
  }

  const dataProperties = {
    '@context': {
      '@vocab': `${CLASS_PREFIX}#`,
      'user-info': `${CLASS_PREFIX}#`
    },
    '@id': IRI(product.id),
    name: rdfjs.literal(product.name, rdf.xsdns('string')),
    price: rdfjs.literal(product.price, rdf.xsdns('double')),
    category: rdfjs.literal(product.category, rdf.xsdns('string'))
  }

  create(data, dataProperties)
}
