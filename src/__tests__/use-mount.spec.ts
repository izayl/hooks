import { useMount } from './../hooks'
import { renderHook } from '@testing-library/react-hooks'

describe('use-mount hook', () => {
  it('should called when component mountd', () => {
    let num = 0
    renderHook(() => {
      useMount(() => {
        num += 1
      })
    })

    expect(num).toEqual(1)
  })

  it('should called only once when component mountd', () => {
    let num = 0
    const { rerender } = renderHook(() => {
      useMount(() => {
        num += 1
      })
    })

    rerender()

    expect(num).toEqual(1)
  })
})
