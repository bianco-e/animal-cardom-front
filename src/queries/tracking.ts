import { Action } from "../interfaces"
import { API_BASE_URL, IS_PRODUCTION } from "../utils/constants"
import { postMethod } from "./methods"

export const createAction = (action: Action) => {
  if (!IS_PRODUCTION) return
  return fetch(`${API_BASE_URL}actions/create`, {
    ...postMethod(action),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const getAllActionStats = () => {
  return fetch(`${API_BASE_URL}actions/all?sort_by=actions`)
}
