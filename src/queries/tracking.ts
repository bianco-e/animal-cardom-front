import { API_BASE_URL, IS_PRODUCTION } from "../utils/constants";
import { ACPost } from "./user";
export interface Visit {
  auth_id?: string;
  user_agent?: string;
  utm?: string;
  guest_name?: string;
  created_at?: string;
  action: string;
}

export const trackAction = (visit: Visit) => {
  if (!IS_PRODUCTION) return;
  return fetch(`${API_BASE_URL}tracking/track_action`, {
    ...ACPost(visit),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getAllActionStats = () => {
  return fetch(`${API_BASE_URL}tracking/all_stats`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
