import { useRef, useEffect } from "react"

/**
 * Life-Cycle Hook
 * this hook will be call before component unmount
 *
 * @param fn the Function that call before component unmount
 */
export const useUnmount = (fn: Function) => {
  const ref = useRef(fn)

  ref.current = fn

  useEffect(() => () => ref.current(), [])
}
