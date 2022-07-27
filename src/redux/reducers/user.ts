import { ReduxAction } from "../../interfaces"
import { SET_COINS, SET_TOKEN } from "../types/user"

const token = sessionStorage.getItem("ac-token")

const initialState = {
  auth_id: undefined,
  role: undefined,
  token,
  data: {
    coins: 0,
  },
}

export default function userReducer(state = initialState, action: ReduxAction) {
  switch (action.type) {
    case SET_TOKEN:
      sessionStorage.setItem("ac-token", action.payload)
      return {
        ...state,
        token: action.payload,
      }
    case SET_COINS:
      return {
        ...state,
        data: {
          ...state.data,
          coins: action.payload,
        },
      }
    default:
      return state
  }
}
