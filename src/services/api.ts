/// <reference path='../types/rdf.d.ts' />
import axios from 'axios'
const api = axios.create({ baseURL: 'http://localhost:7200' })
const BD_NAME = 'rdfforreal'

export async function create(turtle: string) {
  const response = await api.post(`/repositories/${BD_NAME}/statements`, turtle, { headers: { 'content-type': 'text/turtle' } })
  console.log(response)
  return response
}

export async function get(query: string) {

  const response = await api.get(`/repositories/${BD_NAME}?query=${query}`)
  console.log(response)
  return response
}
