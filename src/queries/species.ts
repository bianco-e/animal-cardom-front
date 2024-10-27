import { API_BASE_URL } from "../utils/constants"

export const getAllSpecies = () =>
  fetch(`${API_BASE_URL}species`)
    .then(res => res.json())
    .catch(err => console.error(err))