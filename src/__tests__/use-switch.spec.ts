import { renderHook, act } from '@testing-library/react-hooks'
import { useSwitch } from "../hooks/use-switch"

describe('use-switch hook', () => {
  it('should accpet default value', () => {
    const { result } = renderHook(() => useSwitch(false))

    expect(result.current.sw).toBe(false)
  })

  it('should switch to `true` when turn on', () => {
    const { result: result1 } = renderHook(() => useSwitch(false))
    const { result: result2 } = renderHook(() => useSwitch(true))
    act(() => {
      result1.current.on()
      result2.current.on()
    })
    expect(result1.current.sw).toBe(true)
    expect(result2.current.sw).toBe(true)
  })

  it('should switch to `false` when turn off', () => {
    const { result: result1 } = renderHook(() => useSwitch(false))
    const { result: result2 } = renderHook(() => useSwitch(true))
    act(() => {
      result1.current.off()
      result2.current.off()
    })
    expect(result1.current.sw).toBe(false)
    expect(result2.current.sw).toBe(false)
  })

  it('should switch to `reverse status` when use toggle', () => {
    const { result: result1 } = renderHook(() => useSwitch(false))
    const { result: result2 } = renderHook(() => useSwitch(true))
    act(() => {
      result1.current.on()
      result2.current.off()
    })
    expect(result1.current.sw).toBe(true)
    expect(result2.current.sw).toBe(false)
  })
})
