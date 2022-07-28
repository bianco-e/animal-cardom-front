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

    //register user
    if (error === "no_user") {
      const userTemplate = getNewUserTemplate(userData)
      const { token, error, user } = await createUser(userTemplate)
      if (error) return dispatch(SET_USER_ERROR())
      dispatch(SET_TOKEN(token))
      return dispatch(SET_USER_SUCCESS(user))
    }
  }
}
