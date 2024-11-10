import { API_BASE_URL } from "../utils/constants"

export const getAllHabitats = () =>
  fetch(`${API_BASE_URL}habitats`)
    .then(res => res.json())
    .catch(err => console.error(err))