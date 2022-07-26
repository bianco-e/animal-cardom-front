import React, { useReducer } from "react"
import { SET_COINS } from "./types"

export type IUserContext = (IUserState | any)[]

export interface IUserState {
  coins: number
}

export interface IUserAction {
  payload: any
  type: string
}

const initialState = {
  coins: 0,
}

const Context = React.createContext<IUserContext>([initialState])

const setCoins = (state: IUserState, coins: number) => {
  return { ...state, coins }
}

const reducer = (state: IUserState, action: IUserAction) => {
  switch (action.type) {
    case SET_COINS:
      return setCoins(state, action.payload)
    default:
      return state
  }
}

export interface IProvider {
  children: JSX.Element
}

export const UserContext = ({ children }: IProvider) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
}

export default Context
