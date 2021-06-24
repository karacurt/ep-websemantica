import React, { useContext, useState } from 'react'
import SearchBar from 'material-ui-search-bar'
import { ApiContext } from '../../contexts/ApiContext'
// *snip*

interface Props {
  subject: string
  field: string
}

export const SearchField: React.FC<Props> = ({ subject, field }) => {
  const [query, setQuery] = useState('')
  const { searchByFieldValue, getAllDataFrom } = useContext(ApiContext)

  const search = (term: string) => {
    if (!term) getAllDataFrom(subject)
    searchByFieldValue(subject, field, term)
  }
  return <SearchBar value={query} onChange={(newValue) => setQuery(newValue)} onRequestSearch={() => search(query)} />
}
