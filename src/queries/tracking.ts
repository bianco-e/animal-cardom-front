import { Action } from "../interfaces"
import { API_BASE_URL, IS_PRODUCTION } from "../utils/constants"
import { postMethod } from "./methods"

export const trackAction = (action: Action) => {
  if (!IS_PRODUCTION) return
  return fetch(`${API_BASE_URL}tracking/track_action`, {
    ...postMethod(action),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const getAllActionStats = () => {
  return fetch(`${API_BASE_URL}tracking/all_actions_stats?sort_by=actions`)
}
