/// <reference path='../types/rdf.d.ts' />
import rdf from 'rdf'
import axios from 'axios'
import { graphToTurtle } from './rdf'
const api = axios.create({ baseURL: 'http://localhost:7200' })
const BD_NAME = 'rdfforreal'
const PREFIX = 'http://epwebsemantica.com/'

export async function create(data: {}, dataProperties: {}) {
  const dataParsed = rdf.parse(data)

  const dataPropertiesParsed = rdf.parse(dataProperties)

  const dataGraph = dataParsed.graphify()
  const dataPropertiesGraph = dataPropertiesParsed.graphify()

  const graphs = [dataGraph, dataPropertiesGraph]

  const turtle = graphToTurtle(graphs).join('\n')

  const response = await api.post(`/repositories/${BD_NAME}/statements`, turtle, { headers: { 'content-type': 'text/turtle' } })

  console.log(response)

  return response
}

async function getAllSubjectIds(query: string) {}

export async function getById(subject: string, id: string) {
  const query = encodeURIComponent(`
  PREFIX ep: <${PREFIX}${subject}/>  
  SELECT ?predicate ?object WHERE { ep:${id} ?predicate ?object . }`)

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

export async function getAll(subject: string) {
  const query = encodeURIComponent(` 
  PREFIX ep: <${PREFIX}>
  SELECT ?data WHERE { ?data a ep:${subject} . }`)

  const allData: any = []
  const response = await api.get(`/repositories/${BD_NAME}?query=${query}`)

  const bindings = response.data.results.bindings

  const ids: any = []

  if (!bindings.length) return ids

  bindings.forEach(async (result: any) => {
    const id = result.data.value.split('/').pop()
    ids.push(id)
  })

  console.log(ids)
  ids.forEach(async (id: string) => {
    const data = await getById(subject, id)
    if (!data) return

    allData.push(data)
  })

  return allData
}
