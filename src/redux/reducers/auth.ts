import { createSlice } from "@reduxjs/toolkit"
const token = sessionStorage.getItem("ac-token")

export const slice = createSlice({
  name: "user",
  initialState: {
    error: false,
    isLoading: true,
    token,
    user: {
      id: undefined,
      auth_id: undefined,
      role: undefined,
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
    SET_USER_SUCCESS: (state, action) => {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: false,
      }
    },
    SET_USER_REQUEST: state => {
      return {
        ...state,
        isLoading: true,
        error: false,
      }
    },
    SET_USER_ERROR: state => {
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    },
  },
})
export const AUTH_ACTIONS = slice.actions
export default slice.reducer
