import { useNavigate } from "react-router"
import { GAME_ACTIONS } from "../../redux/reducers/game"
import { Animal } from "../../interfaces"
import AvatarWithXpBar from "../AvatarWithLevel"
import Card from "../Card"
import { ACButton, Text } from "../styled-components"
import { useAppDispatch } from "../../hooks/redux-hooks"
interface IProps {
  earnedAnimal?: Animal | null
  earnedCoins?: number | null
  userWon: boolean
}

export default function CampaignRewards({ earnedAnimal, earnedCoins, userWon }: IProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleRoute = (path: string) => {
    dispatch(GAME_ACTIONS.EMPTY_STATE())
    navigate(path)
  }

  const shareResult = () => {
    const urlToSend = `${window.origin}`
    const winText = encodeURIComponent(
      `I just won! Nature always wins against computers.\nTry Animal Cardom here:\n`
    )
    const loseText = encodeURIComponent(
      `I lost this time but Nature always takes revenge!\nTry Animal Cardom here:\n`
    )
    window.open(
      `https://twitter.com/intent/tweet?text=${
        userWon ? winText : loseText
      }&url=${urlToSend}&hashtags=AnimalCardom&lang=en`,
      "_blank"
    )
  }

  return (
    <>
      {userWon ? <AvatarWithXpBar /> : null}
      {earnedCoins ? (
        <div className="earned-coins">
          <span>
            You have earned <b>{earnedCoins}</b>
          </span>
          <img alt="coins" src="/icons/coins.png" width={15} />
        </div>
      ) : null}
      {earnedAnimal && (
        <>
          <Text $margin="0 0 4px 0">
            ...and a <b className="spaced-title">{earnedAnimal.name}!</b>
          </Text>
          <Card {...earnedAnimal} />
        </>
      )}
      <div>
        <ACButton $height="44px" $fWeight="bold" $margin="8px 0" onClick={shareResult}>
          Share game result
        </ACButton>
        <ACButton $height="44px" $margin="8px 0" onClick={() => handleRoute("/campaign")}>
          Go to campaign menu
        </ACButton>
      </div>
    </>
  )
}
