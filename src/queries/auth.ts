import { API_BASE_URL } from "../utils/constants"
import { ACPost } from "./user"

export const login = (auth_id: string, email: string) => {
  return fetch(`${API_BASE_URL}users/create`, {
    ...ACPost({ auth_id, email }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}
