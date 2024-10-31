import { AppDispatch } from ".."
import { AuthUser, CampaignState, User } from "../../interfaces"
import { login, validateToken } from "../../queries/auth"
import { createCampaign } from "../../queries/campaign"
import { createUser, getUserMe } from "../../queries/user"
import { AUTH_ACTIONS } from "../reducers/auth"
import { CAMPAIGN_ACTIONS } from "../reducers/campaign"

export const loginUser = (userData: AuthUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(AUTH_ACTIONS.SET_USER_REQUEST())

      //check if current user
      const tokenRes = await validateToken()
      if (tokenRes?.is_valid) {
        const userRes = await getUserMe(userData.email)
        if (userRes.error) return dispatch(AUTH_ACTIONS.SET_USER_ERROR())
        return dispatch(AUTH_ACTIONS.SET_USER_SUCCESS(userRes))
      } else {
        //login user
        const loginResponse = await login(userData.email)
        if (loginResponse?.token && loginResponse?.user) {
          dispatch(AUTH_ACTIONS.SET_TOKEN(loginResponse.token))
          return dispatch(AUTH_ACTIONS.SET_USER_SUCCESS(loginResponse.user))
        }
        if (loginResponse?.code >= 400 && loginResponse?.code !== 401) return dispatch(AUTH_ACTIONS.SET_USER_ERROR())
    
        //register user
        const registerResponse: { user: User | null; error: any; token: string | null } = await createUser(userData)
        if (!registerResponse || registerResponse?.error) return dispatch(AUTH_ACTIONS.SET_USER_ERROR())
        if (registerResponse.user && registerResponse.token) {
          dispatch(AUTH_ACTIONS.SET_TOKEN(registerResponse.token))
          dispatch(AUTH_ACTIONS.SET_USER_SUCCESS(registerResponse.user))
          const newCampaign: CampaignState | null = await createCampaign(registerResponse.user.id)
          if (newCampaign) {
            dispatch(CAMPAIGN_ACTIONS.SET_CAMPAIGN_SUCCESS(newCampaign))
          }
        }
      }
    } catch (e) {
      console.error('Error', e)
      return dispatch(AUTH_ACTIONS.SET_USER_ERROR())
    }
  }
}
