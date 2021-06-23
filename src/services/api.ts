/// <reference path='../types/rdf.d.ts' />
import rdf from 'rdf'
import axios from 'axios'
import { graphToTurtle, parseRdfToJson } from './rdf'
export const api = axios.create({ baseURL: 'http://localhost:7200' })
export const BD_NAME = 'rdfforreal'
export const PREFIX = 'http://epwebsemantica.com/'
const ep = rdf.ns(`${PREFIX}`)
const rdfjs = rdf.factory
export async function create(subject: string, properties: any) {
  console.log('properties')
  console.log(properties)

  const data = rdf.parse({
    '@context': {
      '@vocab': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
    },
    '@id': ep(`${subject}/${properties.id}`),
    type: ep(`${subject}`)
  })

  console.log(data)
  let dataProperties: any = {
    '@context': {
      '@vocab': `http://epwebsemantica.com/${subject}#`,
      'user-info': `http://epwebsemantica.com/${subject}#`
    },
    '@id': ep(`${subject}/${properties.id}`)
  }

  Object.keys(properties).map((key) => {
    console.log(key)
    dataProperties[key] = rdfjs.literal(properties[key], rdf.xsdns('string'))
  })

  dataProperties = rdf.parse(dataProperties)

  const dataGraph = data.graphify()
  const dataPropertiesGraph = dataProperties.graphify()

  const graphs = [dataGraph, dataPropertiesGraph]

  const turtle = graphToTurtle(graphs).join('\n')

  const response = await api.post(`/repositories/${BD_NAME}/statements`, turtle, { headers: { 'content-type': 'text/turtle' } })

  console.log(response)

  return response
}

export async function getById(subject: string, id: string) {
  const query = encodeURIComponent(`
  PREFIX ep: <${PREFIX}${subject}/>  
  SELECT ?predicate ?object WHERE { ep:${id} ?predicate ?object . }`)

  const response = await api.get(`/repositories/${BD_NAME}?query=${query}`)

  const bindings = response.data.results.bindings

  if (!bindings.length) return null

  let data: any = {}
  bindings.forEach((bind: any, index: number) => {
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

  const response = await api.get(`/repositories/${BD_NAME}?query=${query}`)

  const bindings = response.data.results.bindings

  const ids: any = []

  if (!bindings.length) return ids

  bindings.forEach(async (result: any) => {
    const id = result.data.value.split('/').pop()
    ids.push(id)
  })

  console.log(ids)
  const allData: any = []
  ids.forEach(async (id: string) => {
    const data = await getById(subject, id)
    if (!data) return

    allData.push(data)
  })

  return allData
}
export async function getAllByFieldValue(subject: string, field: string, value: string) {
  const query = encodeURIComponent(` 
    PREFIX ep: <${PREFIX}>
	  PREFIX info: <${PREFIX}${subject}#>

  SELECT  ?subject WHERE { 
    ?subject a ep:${subject} .
    ?subject info:${field} ?x . 
    filter(str(?x)="${value}")
} `)

  const response = await api.get(`/repositories/${BD_NAME}?query=${query}`)

  const bindings = response.data.results.bindings

  const ids: any = []

  if (!bindings.length) return ids

  bindings.forEach(async (result: any) => {
    const id = result.subject.value.split('/').pop()
    ids.push(id)
  })

  console.log(ids)
  const allData: any = []
  ids.forEach(async (id: string) => {
    const data = await getById(subject, id)
    if (!data) return

    allData.push(data)
  })

  return allData
}
