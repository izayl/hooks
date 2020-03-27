import { useRef } from "react"

type AsyncFuntion = (...args: any[]) => Promise<any>

interface AsyncState<T> {
  loading: boolean
  error: null | any
  result: null | any
  fetch: T | Function
}
export const useAsync = (asyncFunction: AsyncFuntion) => {
  const asyncRef = useRef<AsyncState<AsyncFuntion>>({
    loading: false,
    error: null,
    result: null,
    fetch: typeof asyncFunction === 'function' ? asyncFunction : () => null,
  })

  const setAsyncState = (state: AsyncState<AsyncFuntion>) => {
    asyncRef.current = state
  }

  return {
    get asyncState() {
      return asyncRef.current
    },
    setAsyncState,
  }
}

export const useAsyncCallback = (fetchFn: AsyncFuntion) => {
  const { asyncState, setAsyncState } = useAsync(fetchFn)

  const resume = (...args: any[]) => {
    setAsyncState({ ...asyncState, loading: true })
    return fetchFn(...args)
      .then((response: any) => {
        setAsyncState({
          ...asyncState,
          loading: false,
          result: response,
        })
      })
      .catch((error: any) => {
        setAsyncState({
          ...asyncState,
          error,
        })
      })
  }

  return {
    resume,
    loading: asyncState.loading,
    error: asyncState.error,
    result: asyncState.result,
  }
}
