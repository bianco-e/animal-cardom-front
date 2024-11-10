import { API_BASE_URL } from "../utils/constants"

export const getAllAnimals = () =>
  fetch(`${API_BASE_URL}animals`)
    .then(res => res.json())
    .catch(err => console.error(err))

export const getAnimalById = (id: number) =>
  fetch(`${API_BASE_URL}animals/${id}`)
    .then(res => res.json())
    .catch(err => console.error(err))

export const getNewestAnimals = () =>
  fetch(`${API_BASE_URL}animals/?sort_by=created_at&limit=3&sort=desc`)
    .then(res => res.json())
    .catch(err => console.error(err))

export const getFilteredAnimals = (
  habitat_id: number | null,
  species_id: number | null,
  skill_type_id: number | null
) => {
  return fetch(
    `${API_BASE_URL}animals/?${species_id ? `species_id=${species_id}&` : ""}${
      skill_type_id ? `skill_type_id=${skill_type_id}&` : ""
    }${habitat_id ? `habitat_id=${habitat_id}` : ""}`
  )
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const getAnimalsStats = () =>
  fetch(`${API_BASE_URL}animals/stats`)
    .then(res => res.json())
    .catch(err => console.error(err))
