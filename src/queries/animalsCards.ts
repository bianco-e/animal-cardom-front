import { API_BASE_URL } from "../utils/constants"

export const getAllAnimalsCards = () =>
  fetch(`${API_BASE_URL}animals/all`)
    .then(res => res.json())
    .catch(err => console.error(err))

export const getAnimalByName = (name: string) =>
  fetch(`${API_BASE_URL}animals/${name}`)
    .then(res => res.json())
    .catch(err => console.error(err))

export const getNewestAnimals = () =>
  fetch(`${API_BASE_URL}animals/newest`)
    .then(res => res.json())
    .catch(err => console.error(err))

export const getFilteredAnimalsCards = (
  species?: string,
  skill_type?: string,
  owned?: string[],
  owned_to_filter?: string[]
) => {
  const ownedString = owned && owned.length ? owned.join(";") : undefined
  const ownedToFilterString =
    owned_to_filter && owned_to_filter.length ? owned_to_filter.join(";") : undefined
  return fetch(
    `${API_BASE_URL}animals/filter?${species ? `species=${species}&` : ""}${
      skill_type ? `skill_type=${skill_type}&` : ""
    }${
      ownedString
        ? `owned=${ownedString}`
        : ownedToFilterString
        ? `owned_to_filter=${ownedToFilterString}`
        : ""
    }`
  )
    .then(res => res.json())
    .catch(err => console.error(err))
}
