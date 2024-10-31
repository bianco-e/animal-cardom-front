import { AuthUser } from "../interfaces"
import { API_BASE_URL } from "../utils/constants"
import { postMethod } from "./methods"

export const createUser = (user: AuthUser) => {
  return fetch(`${API_BASE_URL}users`, {
    ...postMethod({ user }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const getUserMe = (email: string) => {
  return fetch(`${API_BASE_URL}users/me`, {
    ...postMethod({ email }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}