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

export async function getSubjectInfo(query: string) {
  const response = await api.get(`/repositories/${BD_NAME}?query=${query}`)

  const bindings = response.data.results.bindings

  if (!bindings.length) return null

  let data: any = {}

  bindings.forEach((bind: any) => {
    const fieldName: any = bind.predicate.value.split('#').pop()
    const value = bind.object.value
    data[fieldName] = value
  })

  return data
}
export async function getSubjectId(query: string) {
  const response = await api.get(`/repositories/${BD_NAME}?query=${query}`)

  const bindings = response.data.results.bindings
  if (!bindings.length) return null

  const ids: any = []

  bindings.forEach(async (result: any) => {
    const id = result.data.value.split('/').pop()
    ids.push(id)
  })

  return ids
}
