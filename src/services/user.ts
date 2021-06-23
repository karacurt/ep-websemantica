/// <reference path='../types/rdf.d.ts' />
import rdf from 'rdf'
import { Prefix, User } from '../types'
import { create } from './api'

const rdfjs = rdf.factory
//const ep = rdf.ns('http://epwebsemantica.com/')

export async function createUser(user: any) {
  user.id = user.name
  create('user', user)
}
