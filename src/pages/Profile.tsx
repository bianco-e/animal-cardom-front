import { useEffect, useState } from "react"
import MenuLayout from "../components/MenuLayout"
import AvatarWithXpBar from "../components/AvatarWithLevel"
import HistoryGames from "../components/HistoryGames"
import { getLastGames } from "../queries/campaign"
import { Game, User } from "../interfaces"
import Spinner from "../components/Spinner"
import Accordion from "../components/Common/Accordion"
import { useAppSelector } from "../hooks/redux-hooks"

export default function Profile() {
  const [lastGames, setLastGames] = useState<Game[]>([])
  const [isLoadingLastGames, setIsLoadingLastGames] = useState<boolean>(false)
  const { id }: User = useAppSelector(({ auth }) => auth.user)

  useEffect(() => {
    if (!id) return
    setIsLoadingLastGames(true)
    getLastGames(id).then(res => {
      setIsLoadingLastGames(false)
      if (res) {
        setLastGames(res)
      }
    })
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MenuLayout>
      <>
        <AvatarWithXpBar />
        <Accordion title="History">
          {isLoadingLastGames ? <Spinner /> : <HistoryGames lastGames={lastGames} />}
        </Accordion>
      </>
    </MenuLayout>
  )
}
