import { Action } from "../interfaces";
import { API_BASE_URL, IS_PRODUCTION } from "../utils/constants";
import { ACPost } from "./user";

export const trackAction = (action: Action) => {
  if (!IS_PRODUCTION) return;
  return fetch(`${API_BASE_URL}tracking/track_action`, {
    ...ACPost(action),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getAllActionStats = () => {
  return fetch(`${API_BASE_URL}tracking/all_stats`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
