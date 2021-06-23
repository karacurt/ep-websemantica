export interface User {
  id: string
  name: string
  email: string
  password: string
}
export interface Product {
  id: string
  name: string
  price: string
  category: string
  storeId: string
}
export interface Prefix {
  id: string
  iri: string
}
export interface Store {
  id: string
  name: string
  link: string
  address: string
  activity: string
}
