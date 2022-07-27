import { SET_COINS, SET_TOKEN } from "../types/user"

export const setCoins = (coins: number) => ({ type: SET_COINS, payload: coins })
export const setToken = (token: string) => ({ type: SET_TOKEN, payload: token })
