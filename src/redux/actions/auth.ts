import { AppDispatch } from ".."
import { AuthUser } from "../../interfaces"
import { login, validateToken } from "../../queries/auth"
import { createUser, getUserMe } from "../../queries/user"
import { getNewUserTemplate } from "../../utils"
import {
  SET_USER_SUCCESS,
  SET_USER_REQUEST,
  SET_TOKEN,
  SET_USER_ERROR,
} from "../reducers/auth"

export const loginUser = (userData: AuthUser) => {
  return async (dispatch: AppDispatch) => {
    dispatch(SET_USER_REQUEST())

    //check if current user
    const tokenRes = await validateToken()
    if (tokenRes.is_valid) {
      const userRes = await getUserMe(userData.sub)
      if (userRes.error) return dispatch(SET_USER_ERROR())
      return dispatch(SET_USER_SUCCESS(userRes))
    }

    //login user
    const { token, error, user } = await login(userData.sub, userData.email)
    if (token) {
      dispatch(SET_TOKEN(token))
      return dispatch(SET_USER_SUCCESS(user))
    }
    if (error && error === "no_user") return dispatch(SET_USER_ERROR())

    //register user
    const userTemplate = getNewUserTemplate(userData)
    const {
      token: regToken,
      error: regError,
      user: regUser,
    } = await createUser(userTemplate)
    if (regError) return dispatch(SET_USER_ERROR())
    dispatch(SET_TOKEN(regToken))
    return dispatch(SET_USER_SUCCESS(regUser))
  }
}
