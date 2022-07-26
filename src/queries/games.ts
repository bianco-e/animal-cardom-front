import { Game } from "../interfaces"
import { ACPost } from "./user"
import { API_BASE_URL } from "../utils/constants"

export const newCampaignGame = (xp: number, user_cards: string[]) => {
  return fetch(
    `${API_BASE_URL}games/new-campaign?xp=${xp}&user_cards=${user_cards.join(";")}`
  )
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const newRandomGame = () => {
  return fetch(`${API_BASE_URL}games/new-random`)
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const newTerrain = (xp?: number) => {
  return fetch(`${API_BASE_URL}terrains/new${xp ? `?xp=${xp}` : ""}`)
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const saveGameResult = (auth_id: string, game: Game, current_xp: number) => {
  return fetch(`${API_BASE_URL}games/save-game`, {
    ...ACPost({ auth_id, game, current_xp }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}
