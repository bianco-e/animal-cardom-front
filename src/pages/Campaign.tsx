import { useEffect, useState } from "react"
import CampaignCircuit from "../components/CampaignCircuit"
import MenuLayout from "../components/MenuLayout"
import Spinner from "../components/Spinner"
import { useAppSelector } from "../hooks/redux-hooks"
import { User } from "../interfaces"
import { getUserProfile } from "../queries/user"

export default function Campaign() {
  const [currentXp, setCurrentXp] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user: User = useAppSelector(({ auth }) => auth.user)
  const { auth_id: authId } = user

  useEffect(() => {
    if (!authId) return
    setIsLoading(true)
    getUserProfile(authId).then(res => {
      setIsLoading(false)
      if (res && res.xp) {
        setCurrentXp(res.xp)
      }
    })
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MenuLayout>
      <>{isLoading ? <Spinner /> : <CampaignCircuit xp={currentXp} />}</>
    </MenuLayout>
  )
}
