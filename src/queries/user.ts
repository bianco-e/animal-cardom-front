import { UserTemplate } from "../interfaces"
import { API_BASE_URL } from "../utils/constants"
import { postMethod } from "./methods"

export const createUser = (user: UserTemplate) => {
  return fetch(`${API_BASE_URL}users/create`, {
    ...postMethod(user),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const getUserMe = (auth_id: string) => {
  return fetch(`${API_BASE_URL}users/me`, {
    ...postMethod({ auth_id }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const getUserProfile = (auth_id: string) => {
  return fetch(`${API_BASE_URL}users/profile`, {
    ...postMethod({ auth_id }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const getLastGames = (auth_id: string) => {
  return fetch(`${API_BASE_URL}games/last-games?quantity=10`, {
    ...postMethod({ auth_id }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const updateHand = (auth_id: string, hand: string[]) => {
  return fetch(`${API_BASE_URL}users/hand/update`, {
    ...postMethod({ auth_id, hand }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const animalPurchase = (auth_id: string, new_card: string, price: number) => {
  return fetch(`${API_BASE_URL}users/animal_purchase`, {
    ...postMethod({ auth_id, new_card, price }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const animalSell = (auth_id: string, card_to_sell: string) => {
  return fetch(`${API_BASE_URL}users/animal_sell`, {
    ...postMethod({ auth_id, card_to_sell }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}
