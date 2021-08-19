import { API_BASE_URL, IS_PRODUCTION } from "../utils/constants";
import { ACPost } from "./user";
interface Visit {
  auth_id?: string;
  user_agent?: string;
  utm?: string;
  guest_name?: string;
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
