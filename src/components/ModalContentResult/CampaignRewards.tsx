import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import HandsContext, { IHandsContext } from "../../context/HandsContext"
import { EMPTY_STATE } from "../../context/HandsContext/types"
import { IAnimal } from "../../interfaces"
import { getAnimalByName } from "../../queries/animalsCards"
import AvatarWithXpBar from "../AvatarWithXpBar"
import Card from "../Card"
import { ACButton, Text } from "../styled-components"
interface IProps {
  earnedAnimal?: string
  earnedCoins?: number
  currentXp: number
}

export default function CampaignRewards({
  earnedAnimal,
  earnedCoins,
  currentXp,
}: IProps) {
  const [, dispatch] = useContext<IHandsContext>(HandsContext)
  const { push } = useHistory()
  const [earnedCard, setEarnedCard] = useState<IAnimal>()

  const getEarnedCard = async (earnedAnimal: string) => {
    const res = await getAnimalByName(earnedAnimal)
    if (res.error) return
    setEarnedCard(res)
  }

  const handleRoute = (path: string) => {
    dispatch({ type: EMPTY_STATE })
    push(path)
  }

  useEffect(() => {
    if (!earnedAnimal) return
    getEarnedCard(earnedAnimal)
  }, [earnedAnimal])

  const tweetVictory = () => {
    const urlToSend = `${window.origin}`
    const prePopulatedText = encodeURIComponent(
      `I just won! Nature always wins against computers.\nTry Animal Cardom here:\n`
    )
    window.open(
      `https://twitter.com/intent/tweet?text=${prePopulatedText}&url=${urlToSend}&hashtags=AnimalCardom&lang=en`
    )
  }

  return (
    <>
      <AvatarWithXpBar xp={currentXp} />
      {earnedCoins ? (
        <div className="earned-coins">
          <span>
            You have earned <b>{earnedCoins}</b>
          </span>
          <img alt="coins" src="/images/icons/coins.png" width={15} />
        </div>
      ) : null}
      {earnedCard && (
        <>
          <Text margin="0 0 4px 0">
            ...and a <b className="spaced-title">{earnedAnimal}!</b>
          </Text>
          <Card {...earnedCard} opacityForPreview="1" width="200px" />
        </>
      )}
      <div>
        <ACButton height="44px" fWeight="bold" margin="8px 0" onClick={tweetVictory}>
          Tweet victory
        </ACButton>
        <ACButton height="44px" margin="8px 0" onClick={() => handleRoute("/campaign")}>
          Go to campaign menu
        </ACButton>
      </div>
    </>
  )
}
