/// <reference path='../types/rdf.d.ts' />
import rdf from 'rdf'

export function graphToTurtle(graphs: any[]) {
  const profile = rdf.environment.createProfile()

  let turtle: any[] = []

  graphs.map((graph) => {
    const turtleParsed = graph
      .toArray()
      .sort(function (a: { compare: (arg0: any) => any }, b: any) {
        return a.compare(b)
      })
      .map(function (stmt: { toTurtle: (arg0: any) => any }) {
        return stmt.toTurtle(profile)
      })
    console.log('turtlepassed')
    console.log(turtleParsed)
    turtle = turtle.concat(turtleParsed)
  })

  return turtle
}
export function parseRdfToJson(response: any) {
  const bindings = response.data.results.bindings

  if (!bindings.length) return null

  const allData: any = []

  bindings.forEach((bind: any, index: number) => {
    let data: any = {}
    const fieldName: any = bind.predicate.value.split('#').pop()
    const value = bind.object.value
    data[fieldName] = value
    if (index === bind.length) {
      allData.push(data)
    }
  })

  return allData
}
