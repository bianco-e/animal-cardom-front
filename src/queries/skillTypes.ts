import { API_BASE_URL } from "../utils/constants"

export const getAllSkillTypes = () =>
  fetch(`${API_BASE_URL}skill_types`)
    .then(res => res.json())
    .catch(err => console.error(err))