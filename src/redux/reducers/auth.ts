import { createSlice } from "@reduxjs/toolkit"
const token = sessionStorage.getItem("ac-token")

export const slice = createSlice({
  name: "user",
  initialState: {
    error: false,
    isLogged: false,
    isLoading: true,
    token,
    user: {
      auth_id: undefined,
      role: undefined,
      coins: 0,
      xp: 0,
    },
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      sessionStorage.setItem("ac-token", action.payload)
      return {
        ...state,
        token: action.payload,
      }
    },
    CLEAR_TOKEN: state => {
      sessionStorage.removeItem("ac-token")
      return {
        ...state,
        token: null,
      }
    },
    SET_COINS: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          coins: action.payload,
        },
      }
    },
    SET_XP: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          xp: action.payload,
        },
      }
    },
    SET_USER_SUCCESS: (state, action) => {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isLogged: true,
        error: false,
      }
    },
    SET_USER_REQUEST: state => {
      return {
        ...state,
        isLogged: false,
        isLoading: true,
        error: false,
      }
    },
    SET_USER_ERROR: state => {
      return {
        ...state,
        isLogged: false,
        isLoading: false,
        error: true,
      }
    },
  },
})
export const AUTH_ACTIONS = slice.actions
export default slice.reducer
