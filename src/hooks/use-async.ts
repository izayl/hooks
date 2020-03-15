import { useState } from "react"

type AsyncFuntion = (...args: any[]) => Promise<any>

export const useAsync = (asyncFunction: AsyncFuntion) => {
  const [asyncState, setAsyncState] = useState({
    loading: false,
    error: null,
    result: null,
    fetch: typeof asyncFunction === 'function' ? asyncFunction : () => null,
  })

  return {
    asyncState,
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
