import { GameToSave } from "../interfaces"
import { postMethod } from "./methods"
import { API_BASE_URL } from "../utils/constants"

export const newCampaignGame = (level: number, user_id: string) => {
  return fetch(`${API_BASE_URL}games/campaign`, {
    ...postMethod({ level, user_id }),
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
  user_id: string,
  game: GameToSave,
  level: number,
) => {
  return fetch(`${API_BASE_URL}games/save`, {
    ...postMethod({ user_id, game, level }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}
