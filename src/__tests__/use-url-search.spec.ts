import { useUrlSearch } from './../hooks';
import { renderHook } from '@testing-library/react-hooks';
import { encode } from 'querystring'

const search = {
  a: "1",
  b: "2",
  c: "3",
}


describe('use-url-search hook', () => {
  beforeEach(() => {
    delete window.location;
    (window.location as any) = {
      search: '?' + encode(search)
    }
  })

  it('should return current url search object if no params provide', () => {
    const { result } = renderHook(useUrlSearch)


    expect(result.current).toEqual(search)
  })

  it('should return search object if params given', () => {
    const { result } = renderHook(() => useUrlSearch("a=1&b=2&c=3"))

    expect(result.current).toEqual(search)
  })

  it('should return search object if params given with `?`', () => {
    const { result } = renderHook(() => useUrlSearch("?a=1&b=2&c=3"))

    expect(result.current).toEqual(search)
  })

  it('should accpet search object with array', () => {
    const { result } = renderHook(() => useUrlSearch("?a=1&b=2&c=3&a=2"))

    expect(result.current).toEqual({
      a: ["1", "2"],
      b: "2",
      c: "3"
    })
  })

  it('should return current location search object if location changed', () => {
    const { result, rerender } = renderHook(useUrlSearch)

    location.search = "?a=1&b=2&c=3&a=2"
    rerender()

    expect(result.current).toEqual({
      a: ["1", "2"],
      b: "2",
      c: "3"
    })
  })
})
