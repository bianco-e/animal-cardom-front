import { Game } from "../interfaces"
import { postMethod } from "./methods"
import { API_BASE_URL } from "../utils/constants"

export const newCampaignGame = (level: number, user_animal_ids: number[]) => {
  return fetch(`${API_BASE_URL}games/campaign`, {
    ...postMethod({ level, user_animal_ids }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const newRandomGame = () => {
  return fetch(`${API_BASE_URL}games`)
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const saveGameResult = (
  auth_id: string,
  game: Game,
  current_xp: number,
  required_xp: number
) => {
  return fetch(`${API_BASE_URL}games/save`, {
    ...postMethod({ auth_id, game, current_xp, required_xp }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}
