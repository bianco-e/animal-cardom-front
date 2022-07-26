import { useEffect, useState } from "react"
import CampaignCircuit from "../components/CampaignCircuit"
import MenuLayout from "../components/MenuLayout"
import Spinner from "../components/Spinner"
import { getUserProfile } from "../queries/user"
import { getCookie } from "../utils"

export default function Campaign() {
  const [currentXp, setCurrentXp] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const authId = getCookie("auth=")
    if (authId) {
      setIsLoading(true)
      getUserProfile(authId).then(res => {
        setIsLoading(false)
        if (res && res.xp) {
          setCurrentXp(res.xp)
        }
      })
    }
  }, [])

  return (
    <MenuLayout>
      <>{isLoading ? <Spinner /> : <CampaignCircuit xp={currentXp} />}</>
    </MenuLayout>
  )
}
