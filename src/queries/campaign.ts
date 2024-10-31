import { Animal } from "../interfaces"
import { API_BASE_URL } from "../utils/constants"
import { deleteMethod, postMethod, putMethod } from "./methods"

export const getCampaignData = (user_id: string) =>
  fetch(`${API_BASE_URL}campaigns?user_id=${user_id}`)
    .then(res => res.json())
    .catch(err => console.error(err))

export const createCampaign = (user_id: string) =>
  fetch(`${API_BASE_URL}campaigns`, {
    ...postMethod({ user_id })
  })
    .then(res => res.json())
    .catch(err => console.error(err))

export const getAllCampaignLevels = () =>
  fetch(`${API_BASE_URL}campaign_levels`)
    .then(res => res.json())
    .catch(err => console.error(err))

export const getLastGames = (user_id: string) => {
  return fetch(`${API_BASE_URL}games/last-games?quantity=10`, {
    ...postMethod({ user_id }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

// CAMPAIGN ANIMALS
export const updateHand = (
  campaign_id: string,
  old_hand: Animal["id"][],
  new_hand: Animal["id"][]
) => {
  return fetch(`${API_BASE_URL}campaign_animals`, {
    ...putMethod({ campaign_id, old_hand, new_hand }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const buyAnimal = (animal_id: number, campaign_id: string) => {
  return fetch(`${API_BASE_URL}campaign_animals`, {
    ...postMethod({ animal_id, campaign_id }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const sellAnimal = (campaign_id: string, animal_id: number, sell_price: number) => {
  return fetch(`${API_BASE_URL}campaign_animals`, {
    ...deleteMethod({ campaign_id, animal_id, sell_price }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}