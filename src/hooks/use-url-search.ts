import { parse } from 'querystring'

export const useUrlSearch = (searchString?: string): AnyObject => {
  let search = searchString || location.search

  search = search.startsWith('?') ? search.substr(1) : search

  return parse(search)
}
