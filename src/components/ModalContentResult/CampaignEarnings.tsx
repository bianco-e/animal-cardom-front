import { useEffect, useState } from "react"
import { IAnimal } from "../../interfaces"
import { getAnimalByName } from "../../queries/animalsCards"
import AvatarWithXpBar from "../AvatarWithXpBar"
import Card from "../Card"
import { ACButton, Text } from "../styled-components"
interface IProps {
  earnedAnimal?: string
  earnedCoins: number
  havingXp: number
  handleRoute: (str: string) => void
}

export default function CampaignEarnings({
  earnedAnimal,
  earnedCoins,
  handleRoute,
  havingXp,
}: IProps) {
  const [earnedCard, setEarnedCard] = useState<IAnimal>()

  const getEarnedCard = async (earnedAnimal: string) => {
    const res = await getAnimalByName(earnedAnimal)
    if (res.error) return
    setEarnedCard(res)
  }

  useEffect(() => {
    if (!earnedAnimal) return
    getEarnedCard(earnedAnimal)
  }, [earnedAnimal])

  return (
    <>
      <AvatarWithXpBar havingXp={havingXp} />
      <div className="earned-coins">
        <span>
          You have earned <b>{earnedCoins}</b>
        </span>
        <img alt="coins" src="/images/icons/coins.png" width={15} />
      </div>
      {earnedCard && (
        <>
          <Text margin="0 0 4px 0">
            ...and a <b>{earnedAnimal}!</b>
          </Text>
          <Card {...earnedCard} opacityForPreview="1" width="36%" />
        </>
      )}
      <ACButton margin="20px 0" onClick={() => handleRoute("/campaign")}>
        Go to campaign menu
      </ACButton>
    </>
  )
}
