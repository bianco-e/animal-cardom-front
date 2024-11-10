import { useNavigate } from "react-router-dom"
import { Animal } from "../../interfaces"
import Spinner from "../Spinner"
import { ACButton, ModalTitle, Text } from "../styled-components"
import CampaignRewards from "./CampaignRewards"
import { Wrapper } from "./styled"
import { GAME_ACTIONS } from "../../redux/reducers/game"
import { startGuestGame } from "../../redux/actions/game"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"

interface IProps {
  closeModal: () => void
  isCampaignGame?: boolean
  modalVariant: string
  earnedCoins?: number | null
  earnedAnimal?: Animal | null
}

export default function ModalContentResult({
  closeModal,
  isCampaignGame,
  modalVariant,
  earnedAnimal,
  earnedCoins
}: IProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const game = useAppSelector(({ game }) => game)

  const handleRoute = (path: string) => {
    dispatch(GAME_ACTIONS.EMPTY_STATE())
    navigate(path)
  }

  const handlePlayAgain = () => {
    dispatch(GAME_ACTIONS.EMPTY_STATE({ isLoading: true }))
    //@ts-ignore
    dispatch(startGuestGame())
    closeModal()
  }

  return (
    <Wrapper>
      {modalVariant === "win" ? (
        <>
          <ModalTitle>You won!</ModalTitle>
          <Text $margin={isCampaignGame ? "0 0 16px 0" : "0"}>
            Good game! Nature always wins against computers!
          </Text>
        </>
      ) : (
        modalVariant === "lose" && (
          <>
            <ModalTitle>You lost!</ModalTitle>
            <Text $margin={isCampaignGame ? "0 0 16px 0" : "0"}>
              Nice try! PC defeated you this time, but nature always takes revenge!
            </Text>
          </>
        )
      )}
      {isCampaignGame ? (
        <CampaignRewards earnedAnimal={earnedAnimal} earnedCoins={earnedCoins} userWon={modalVariant === "win"} />
      ) : (
        <>
          {game.isLoading ? (
            <Spinner />
          ) : (
            <>
              <ACButton $margin="10px 0 5px 0" onClick={handlePlayAgain}>
                Play again
              </ACButton>
              <ACButton $margin="5px 0" onClick={() => handleRoute("/")}>
                Go to menu
              </ACButton>
            </>
          )}
        </>
      )}
    </Wrapper>
  )
}
