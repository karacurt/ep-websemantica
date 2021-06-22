/// <reference path='../types/rdf.d.ts' />
import axios from 'axios'
import rdf from 'rdf'
import { Prefix, User } from '../types'
import { create } from './api'
import { graphToTurtle } from './rdf'

const rdfjs = rdf.factory
const api = axios.create({ baseURL: 'http://localhost:7200' })
const foaf = rdf.ns('http://xmlns.com/foaf/0.1/')
const userIRI = rdf.ns('http://epwebsemantica.com/user/')



export async function createUser(user: User) {
  console.log('we are here baby')
  console.log(user)

  const userRdf = rdf.parse({
    '@context': {
      '@vocab': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
    },
    '@id': userIRI(user.name),
    type: foaf('person')
  })

  console.log('USER RDF TEST--->')
  console.log(userRdf)

  const userInfo = rdf.parse({
    '@context': {
      '@vocab': 'http://epwebsemantica.com/user#',
      'user-info': 'http://epwebsemantica.com/user#'
    },
    '@id': userIRI(user.name),
    name: rdfjs.literal(user.name, rdf.xsdns('string')),
    email: rdfjs.literal(user.email, rdf.xsdns('string')),
    password: rdfjs.literal(user.password, rdf.xsdns('string'))
  })

  console.log(userInfo.n3())
  console.log(userRdf.n3())

  const userRdfGraph = userRdf.graphify()
  const userInfoGraph = userInfo.graphify()

  const prefixes: Prefix[] = [
    { id: 'user-info', iri: 'http://epwebsemantica.com/user#' },
    { id: 'user', iri: 'http://epwebsemantica.com/user/' },
    { id: 'foaf', iri: 'http://xmlns.com/foaf/0.1/' }
  ]
  const graphs = [userRdfGraph, userInfoGraph]

  const turtle = graphToTurtle(graphs, prefixes)

  console.log(turtle)

  create(turtle.join('\n'))
}

export async function getUserData(userName: string) {
  const query = encodeURIComponent(`
  PREFIX ep: <http://epwebsemantica.com/user/>
  
  SELECT ?predicate ?object WHERE {
      ep:${userName} ?predicate ?object .
  }`)

  const response = await api.get(`/repositories/rdfforreal?query=${query}`)
  console.log('users data-->')
  console.log(response.data.results.bindings)
  const bindings = response.data.results.bindings
  if (!bindings.length) return null
  let userData: any = {}

  bindings.forEach((bind: any) => {
    const fieldName: any = bind.predicate.value.split('#').pop()
    const value = bind.object.value
    userData[fieldName] = value
  })

  console.log(userData)
  const finalData: User = {
    name: userData['name'],
    email: userData['email'],
    password: userData['password']
  }
  console.log(finalData)
  return finalData
}

export async function getAllUsers() {
  const query = encodeURIComponent(` 
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  SELECT ?user  WHERE {
    ?user a foaf:person .
   } 
    `)

  const response = await api.get(`/repositories/rdfforreal?query=${query}`)
    console.log(response)

  const bindings = response.data.results.bindings
  console.log(bindings)
  const usersData: any = []

  bindings.forEach(async (result: any) => {
    console.log(result)  
    const userName = result.user.value.split('/').pop()
    const userData = await getUserData(userName)
    if (!userData) return
    usersData.push(userData)
  })

  console.log('ALL USERS DATA-->')
  console.log(usersData)
  return usersData
}
