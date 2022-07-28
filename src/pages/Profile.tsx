import { useEffect, useState } from "react"
import MenuLayout from "../components/MenuLayout"
import AvatarWithXpBar from "../components/AvatarWithXpBar"
import HistoryGames from "../components/HistoryGames"
import { getLastGames, getUserProfile } from "../queries/user"
import { Game, User } from "../interfaces"
import Spinner from "../components/Spinner"
import Accordion from "../components/Common/Accordion"
import { useAppSelector } from "../hooks/redux-hooks"

export default function Profile() {
  const [lastGames, setLastGames] = useState<Game[]>([])
  const [isLoadingLastGames, setIsLoadingLastGames] = useState<boolean>(false)
  const [currentXp, setCurrentXp] = useState<number>(0)
  const { auth_id: authId }: User = useAppSelector(({ auth }) => auth.user)

  useEffect(() => {
    if (!authId) return
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
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

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
