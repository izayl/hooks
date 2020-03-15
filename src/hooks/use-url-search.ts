import { parse } from 'querystring'

export const useSearch = (): AnyObject => {
  const { search } = location

  return parse(search.split('?')[1])
}
