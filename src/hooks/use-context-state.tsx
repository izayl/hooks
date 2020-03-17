import * as React from "react"
import { useContext, useState, createContext, useCallback } from "react"

export function createContextState<T = any>(initialArg?: (()=>T) | T) {

  const StateContext = createContext<T | undefined>(undefined)
  const UpdateContext = createContext<React.Dispatch<React.SetStateAction<T>> | undefined>(undefined)

  const [state, setState] = useState<T>(  typeof initialArg === 'function' ? Function.prototype.call.bind(initialArg) : initialArg)

  const StateProvider: React.FC = function StateProvider(props) {
    return (
      <StateContext.Provider value={state}>
        <UpdateContext.Provider value={setState}>
          {props.children}
        </UpdateContext.Provider>
      </StateContext.Provider>
    )
  }

  const useStateContext =  () => {
    const state = useContext(StateContext)
    if (typeof state === 'undefined') {
      throw new Error('useCtxState must be used within a StateProvider')
    }

    return state
  }

  const useStateUpdater = () => {
    const setState = useContext(UpdateContext)

    if (typeof setState === 'undefined') {
      throw new Error('setState must be used within a StateProvider')
    }

    const update = useCallback(
      info => setState(state => ({ ...state, ...info })),
      [setState],
    )

    return update
  }

  return {
    StateProvider,
    useStateContext,
    useStateUpdater,
  }
}
