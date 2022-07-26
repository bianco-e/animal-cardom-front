import { useEffect, useState } from "react"
import MenuLayout from "../components/MenuLayout"
import AvatarWithXpBar from "../components/AvatarWithXpBar"
import HistoryGames from "../components/HistoryGames"
import { getLastGames, getUserProfile } from "../queries/user"
import { Game } from "../interfaces"
import Spinner from "../components/Spinner"
import { getCookie } from "../utils"
import Accordion from "../components/Common/Accordion"

export default function Profile() {
  const [lastGames, setLastGames] = useState<Game[]>([])
  const [isLoadingLastGames, setIsLoadingLastGames] = useState<boolean>(false)
  const [currentXp, setCurrentXp] = useState<number>(0)

  useEffect(() => {
    const authId = getCookie("auth=")
    if (authId) {
      setIsLoadingLastGames(true)
      getUserProfile(authId).then(res => {
        if (res && res.xp) {
          setCurrentXp(res.xp)
        }
      })
      getLastGames(authId).then(res => {
        setIsLoadingLastGames(false)
        if (res) {
          setLastGames(res)
        }
      })
    }
  }, [])

  return (
    <MenuLayout>
      <>
        <AvatarWithXpBar xp={currentXp} />
        <Accordion title="History">
          {isLoadingLastGames ? <Spinner /> : <HistoryGames lastGames={lastGames} />}
        </Accordion>
      </>
    </MenuLayout>
  )
}
