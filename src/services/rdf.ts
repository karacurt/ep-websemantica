/// <reference path='../types/rdf.d.ts' />
import rdf from 'rdf'
import { Prefix } from "../types"

export function graphToTurtle(graphs: any[], prefixes: Prefix[]) {
    const profile = rdf.environment.createProfile()
  
    prefixes.forEach((prefix: Prefix) => {
      profile.setPrefix(`${prefix.id}:`, `${prefix.iri}`)
    })
    let turtle = prefixes.map((prefix) => {
        return `@prefix ${prefix.id}: <${prefix.iri}> .`
      })
    
  
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