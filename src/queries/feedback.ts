import { API_BASE_URL } from "../utils/constants"
import { postMethod } from "./methods"

interface Feedback {
  name?: string
  message: string
}

export const giveFeedback = (feedback: Feedback) => {
  return fetch(`${API_BASE_URL}feedback/give`, {
    ...postMethod(feedback),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}
