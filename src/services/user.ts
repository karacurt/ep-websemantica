/// <reference path='../types/rdf.d.ts' />
import rdf from 'rdf'
import { Prefix, User } from '../types'
import { create, get } from './api'
import { graphToTurtle } from './rdf'

const rdfjs = rdf.factory
const foaf = rdf.ns('http://xmlns.com/foaf/0.1/')
const userIRI = rdf.ns('http://epwebsemantica.com/user/')



export async function createUser(user: User) {

  const data = rdf.parse({
    '@context': {
      '@vocab': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
    },
    '@id': userIRI(user.name),
    type: foaf('person')
  }) 

  const dataProperties = rdf.parse({
    '@context': {
      '@vocab': 'http://epwebsemantica.com/user#',
      'user-info': 'http://epwebsemantica.com/user#'
    },
    '@id': userIRI(user.name),
    name: rdfjs.literal(user.name, rdf.xsdns('string')),
    email: rdfjs.literal(user.email, rdf.xsdns('string')),
    password: rdfjs.literal(user.password, rdf.xsdns('string'))
  })

  const dataGraph = data.graphify()
  const dataPropertiesGraph = dataProperties.graphify()

  const prefixes: Prefix[] = [
    { id: 'user-info', iri: 'http://epwebsemantica.com/user#' },
    { id: 'user', iri: 'http://epwebsemantica.com/user/' },
    { id: 'foaf', iri: 'http://xmlns.com/foaf/0.1/' }
  ]
  const graphs = [dataGraph, dataPropertiesGraph]

  const turtle = graphToTurtle(graphs, prefixes)

  create(turtle.join('\n'))
}

export async function getUser(id: string) {
  const query = encodeURIComponent(`
  PREFIX ep: <http://epwebsemantica.com/user/>
  
  SELECT ?predicate ?object WHERE {
      ep:${id} ?predicate ?object .
  }`)

 const response = await get(query)
 
  const bindings = response.data.results.bindings
  if (!bindings.length) return null

  let userData: any = {}

  bindings.forEach((bind: any) => {
    const fieldName: any = bind.predicate.value.split('#').pop()
    const value = bind.object.value
    userData[fieldName] = value
  })

  const finalData: User = {
    name: userData['name'],
    email: userData['email'],
    password: userData['password']
  }

  return finalData
}

export async function getAllUsers() {
  const query = encodeURIComponent(` 
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  SELECT ?user  WHERE {
    ?user a foaf:person .
   }`)
 
  const response = await get(query)  
  const bindings = response.data.results.bindings
  const usersData: any = []

  bindings.forEach(async (result: any) => {   
    const id = result.user.value.split('/').pop()
    const userData = await getUser(id)
    if (!userData) return
    usersData.push(userData)
  })
 
  return usersData
}
