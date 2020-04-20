import { useAsync, useAsyncCallback } from './../hooks/use-async';
import { renderHook, act } from '@testing-library/react-hooks';

describe('use-async', () => {
  it('should at initial state before asyncFn called', () => {
    const spy = jest.fn()
    const asyncFn = async () => await spy()
    const hook = renderHook(() => useAsyncCallback(asyncFn))

    const { loading, error, result } = hook.result.current
    expect(loading).toBe(false)
    expect(error).toBe(null)
    expect(result).toBe(null)
  })

  // it('should trigger rerender if fetch state changed', async (done) => {
  //   const asyncFn = async () => await Promise.resolve(1)
  //   const hook = renderHook(() => useAsyncCallback(asyncFn))

  //   act(() => {
  //     hook.result.current.resume()
  //   })

  //   await hook.waitForNextUpdate()
  //   expect(hook.result.current.loading).toBe(true)

  //   await hook.waitForNextUpdate()
  //   expect(hook.result.current.loading).toBe(false)

  //   done()
  // })
})
