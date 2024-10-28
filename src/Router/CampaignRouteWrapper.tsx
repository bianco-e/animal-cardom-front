import { Outlet, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks"
import useLogin from "../hooks/useLogin"
import { useEffect } from "react"
import { getCampaignData } from "../queries/campaign"
import { CAMPAIGN_ACTIONS } from "../redux/reducers/campaign"
import { parseAnimalsFromDB } from "../utils"
import { CampaignAnimal } from "../interfaces"

export default function CampaignRouteWrapper() {
  useLogin()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const auth = useAppSelector(({ auth }) => auth)
  const campaign = useAppSelector(({ campaign }) => campaign)

  useEffect(() => {
    if (auth.error) {
      return navigate("/error")
    }
    if (!auth.isLoading && !auth.user.id) {
      return navigate("/")
    }
    if (campaign.hand.length || campaign.isLoading || !auth.user.id) return
    dispatch(CAMPAIGN_ACTIONS.SET_CAMPAIGN_REQUEST())
    getCampaignData(auth.user.id).then(campaigns => {
      if (campaigns?.length) {
        const campaign = campaigns[0]
        dispatch(
          CAMPAIGN_ACTIONS.SET_CAMPAIGN_SUCCESS({
            ...campaign,
            hand: parseAnimalsFromDB(campaign.owned_animals.filter((animal: CampaignAnimal) => animal.is_in_hand)),
          })
        )
      }
    })
  }, [auth]) //eslint-disable-line

  return <Outlet />
}
