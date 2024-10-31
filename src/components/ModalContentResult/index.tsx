import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { HandKey, User, IGameState, Animal, CampaignState } from "../../interfaces"
import { saveGameResult } from "../../queries/games"
import Spinner from "../Spinner"
import { ACButton, ModalTitle, Text } from "../styled-components"
import CampaignRewards from "./CampaignRewards"
import { Wrapper } from "./styled"
import { GAME_ACTIONS } from "../../redux/reducers/game"
import { startGuestGame } from "../../redux/actions/game"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { CAMPAIGN_ACTIONS } from "../../redux/reducers/campaign"

interface IProps {
  closeModal: () => void
  isCampaignGame?: boolean
  modalType: string
}

export default function ModalContentResult({
  closeModal,
  isCampaignGame,
  modalType,
}: IProps) {
  const [earnedAnimal, setEarnedAnimal] = useState<{ id: Animal['id']; name: Animal['name']  }>()
  const [earnedCoins, setEarnedCoins] = useState<number>()
  const { lv } = useParams<{ lv: string }>()
  const user: User = useAppSelector(({ auth }) => auth.user)
  const { auth_id: authId } = user
  const { level }: CampaignState = useAppSelector(({ campaign }) => campaign)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const game = useAppSelector(({ game }) => game)
  const { isLoading } = game

  const getStatsToSaveGame = (authId: string, won: boolean, game: IGameState): void => {
    const mapCardsToSave = (handKey: HandKey) =>
      game.hands[handKey].map(card => ({
        name: card.name,
        survived: card.life.current > 0,
      }))
    const mapPlantsToSave = (handKey: HandKey) =>
      game.plants[handKey].map(plant => ({
        name: plant.name,
        applied: !!game.usedPlants.find(pl => pl.name === plant.name),
      }))

    const gameToSave = {
      habitat: game.habitat.name,
      won,
      used_animals: {
        pc: mapCardsToSave("pc"),
        user: mapCardsToSave("user"),
      },
      used_plants: {
        pc: mapPlantsToSave("pc"),
        user: mapPlantsToSave("user"),
      },
    }
    const parsedLevel = parseInt(lv as string)
    saveGameResult(authId, gameToSave, level, parsedLevel).then(res => {
      if (res && !res.error) {
        dispatch(CAMPAIGN_ACTIONS.SET_LEVEL(res.current_xp))
        dispatch(CAMPAIGN_ACTIONS.SET_COINS(res.current_coins))
        setEarnedCoins(res.earned_coins)
        setEarnedAnimal(res.earned_animal)
      }
    })
  }

  useEffect(() => {
    if (isCampaignGame && authId) {
      getStatsToSaveGame(authId, modalType === "win", game)
    }
  }, []) //eslint-disable-line

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
      {modalType === "win" ? (
        <>
          <ModalTitle>You won!</ModalTitle>
          <Text $margin={isCampaignGame ? "0 0 16px 0" : "0"}>
            Good game! Nature always wins against computers!
          </Text>
        </>
      ) : (
        modalType === "lose" && (
          <>
            <ModalTitle>You lost!</ModalTitle>
            <Text $margin={isCampaignGame ? "0 0 16px 0" : "0"}>
              Nice try! PC defeated you this time, but nature always takes revenge!
            </Text>
          </>
        )
      )}
      {isCampaignGame ? (
        <CampaignRewards earnedAnimal={earnedAnimal} earnedCoins={earnedCoins} />
      ) : (
        <>
          {isLoading ? (
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
