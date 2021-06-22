/// <reference path='../types/rdf.d.ts' />
import rdf from 'rdf'
import { Prefix, Product } from '../types'
import { create, getSubjectId, getSubjectInfo } from './api'

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

  const prefixes: Prefix[] = [
    { id: 'product-info', iri: `${CLASS_PREFIX}#` },
    { id: 'product', iri: `${CLASS_PREFIX}/` }
  ]

  create(data, dataProperties, prefixes)
}

export async function getProduct(id: string) {
  const query = encodeURIComponent(`
  PREFIX ep: <${CLASS_PREFIX}/>  
  SELECT ?predicate ?object WHERE { ep:${id} ?predicate ?object . }`)

  const userInfo = await getSubjectInfo(query)

  return userInfo
}

export async function getAllProducts() {
  const query = encodeURIComponent(` 
  PREFIX ep: <${CLASS_PREFIX}>
  SELECT ?data WHERE { ?data a ep:product . }`)

  const usersData: any = []

  const ids = await getSubjectId(query)

  ids.forEach(async (id: string) => {
    const userData = await getProduct(id)
    if (!userData) return

    usersData.push(userData)
  })

  return usersData
}
