import { API_BASE_URL } from "../utils/constants"
import { postMethod } from "./methods"

export const validateToken = () => {
  return fetch(`${API_BASE_URL}auth/token`, {
    ...postMethod(undefined),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const login = (auth_id: string, email: string) => {
  return fetch(`${API_BASE_URL}auth/login`, {
    ...postMethod({ auth_id, email }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}
