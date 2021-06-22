/// <reference path='../types/rdf.d.ts' />
import rdf from 'rdf'
import { Prefix, User } from '../types'
import { create, getSubjectId, getSubjectInfo } from './api'

const rdfjs = rdf.factory
const foaf = rdf.ns('http://xmlns.com/foaf/0.1/')
const userIRI = rdf.ns('http://epwebsemantica.com/user/')

export async function createUser(user: User) {
  const data = {
    '@context': {
      '@vocab': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
    },
    '@id': userIRI(user.name),
    type: foaf('person')
  }

  const dataProperties = {
    '@context': {
      '@vocab': 'http://epwebsemantica.com/user#',
      'user-info': 'http://epwebsemantica.com/user#'
    },
    '@id': userIRI(user.name),
    name: rdfjs.literal(user.name, rdf.xsdns('string')),
    email: rdfjs.literal(user.email, rdf.xsdns('string')),
    password: rdfjs.literal(user.password, rdf.xsdns('string'))
  }

  const prefixes: Prefix[] = [
    { id: 'user-info', iri: 'http://epwebsemantica.com/user#' },
    { id: 'user', iri: 'http://epwebsemantica.com/user/' },
    { id: 'foaf', iri: 'http://xmlns.com/foaf/0.1/' }
  ]

  create(data, dataProperties, prefixes)
}

export async function getUser(id: string) {
  const query = encodeURIComponent(`
  PREFIX ep: <http://epwebsemantica.com/user/>  
  SELECT ?predicate ?object WHERE { ep:${id} ?predicate ?object . }`)

  const userInfo = await getSubjectInfo(query)

  return userInfo
}

export async function getAllUsers() {
  const query = encodeURIComponent(` 
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  SELECT ?user  WHERE { ?user a foaf:person . }`)

  const usersData: any = []

  const ids = await getSubjectId(query)

  ids.forEach(async (id: string) => {
    const userData = await getUser(id)
    if (!userData) return

    usersData.push(userData)
  })

  return usersData
}
