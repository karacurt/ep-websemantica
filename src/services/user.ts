/// <reference path='../types/rdf.d.ts' />
import rdf from 'rdf'
import { Prefix, User } from '../types'
import { create } from './api'

const rdfjs = rdf.factory
const foaf = rdf.ns('http://xmlns.com/foaf/0.1/')
const ep = rdf.ns('http://epwebsemantica.com/')

export async function createUser(user: User) {
  const data = {
    '@context': {
      '@vocab': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
    },
    '@id': ep(`user/${user.name}`),
    type: ep('user')
  }

  const dataProperties = {
    '@context': {
      '@vocab': 'http://epwebsemantica.com/user#',
      'user-info': 'http://epwebsemantica.com/user#'
    },
    '@id': ep(`user/${user.name}`),
    name: rdfjs.literal(user.name, rdf.xsdns('string')),
    email: rdfjs.literal(user.email, rdf.xsdns('string')),
    password: rdfjs.literal(user.password, rdf.xsdns('string'))
  }

  create(data, dataProperties)
}
