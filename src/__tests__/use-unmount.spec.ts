import { useUnmount } from './../hooks/use-unmount';
import { renderHook } from '@testing-library/react-hooks';

describe('use-unmount hook', () => {
  it('should not be called on component mount', () => {
    const spy = jest.fn()
    renderHook(() => {
      useUnmount(spy)
    })

    expect(spy).not.toHaveBeenCalled()
  })

  it('should be called before component unmount', () => {
    const spy = jest.fn()
    const { unmount } = renderHook(() => {
      useUnmount(spy)
    })

    unmount()

    expect(spy).toHaveBeenCalled()
  })

  it('should be called only once before component unmount', () => {
    const spy = jest.fn()
    const {
      unmount,
      rerender,
    } = renderHook(() => {
      useUnmount(spy)
    })

    rerender()
    rerender()
    rerender()
    rerender()
    rerender()
    rerender()
    unmount()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should be called the last changed version function', () => {
    const spy1 = jest.fn()
    const spy2 = jest.fn()
    const spy3 = jest.fn()
    const {
      unmount,
      rerender,
    } = renderHook((fn) => {
      useUnmount(fn)
    }, { initialProps: spy1 })

    rerender(spy2)
    rerender(spy3)
    rerender(spy3)

    unmount()

    expect(spy1).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()
    expect(spy3).toHaveBeenCalledTimes(1)
  })
})
