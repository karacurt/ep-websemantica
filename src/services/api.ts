/// <reference path='../types/rdf.d.ts' />
import rdf from 'rdf'
import axios from 'axios'
import { Prefix } from '../types'
import { graphToTurtle } from './rdf'
const api = axios.create({ baseURL: 'http://localhost:7200' })
const BD_NAME = 'rdfforreal'

export async function create(data: {}, dataProperties: {}, prefixes: Prefix[]) {

  const dataParsed = rdf.parse(data) 

  const dataPropertiesParsed = rdf.parse(dataProperties)
  
 
  const dataGraph = dataParsed.graphify()
  const dataPropertiesGraph = dataPropertiesParsed.graphify()

  const graphs = [dataGraph, dataPropertiesGraph]

  const turtle = graphToTurtle(graphs, prefixes).join('\n')

  const response = await api.post(`/repositories/${BD_NAME}/statements`, turtle, { headers: { 'content-type': 'text/turtle' } })

  console.log(response)

  return response
}

export async function get(query: string) {

  const response = await api.get(`/repositories/${BD_NAME}?query=${query}`)
  console.log(response)
  return response
}
