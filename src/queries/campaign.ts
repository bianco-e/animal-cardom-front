import { API_BASE_URL } from "../utils/constants"

export const getCampaignData = (user_id: string) =>
  fetch(`${API_BASE_URL}campaigns?user_id=${user_id}`)
    .then(res => res.json())
    .catch(err => console.error(err))