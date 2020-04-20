import { useEffect } from "react"

/**
 * Life-Cycle Hook
 * the hook will called when component did mount.
 *
 * @param fn the `Function` that run only at component mount
 */
export const useMount = (fn: Function) => {
  useEffect(() => {
    fn()
  }, [])
}
