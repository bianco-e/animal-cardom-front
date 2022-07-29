import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { GameParams, HandKey, User, IGameState } from "../../interfaces"
import { saveGameResult } from "../../queries/games"
import Spinner from "../Spinner"
import { ACButton, ModalTitle, Text } from "../styled-components"
import CampaignRewards from "./CampaignRewards"
import { Wrapper } from "./styled"
import { GAME_ACTIONS } from "../../redux/reducers/game"
import { startGuestGame } from "../../redux/actions/game"
import { AUTH_ACTIONS } from "../../redux/reducers/auth"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"

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
  const [earnedAnimal, setEarnedAnimal] = useState<string>()
  const [earnedCoins, setEarnedCoins] = useState<number>()
  const { requiredXp } = useParams<GameParams>()
  const user: User = useAppSelector(({ auth }) => auth.user)
  const { auth_id: authId, xp } = user
  const history = useHistory()
  const dispatch = useAppDispatch()
  const game = useAppSelector(({ game }) => game)
  const { isLoading } = game

  const getStatsToSaveGame = (authId: string, won: boolean, game: IGameState): void => {
    const mapCardsToSave = (handKey: HandKey) =>
      game.hands[handKey].map(card => ({
        name: card.name,
        survived: card.life.current !== "DEAD",
      }))
    const mapPlantsToSave = (handKey: HandKey) =>
      game.plants[handKey].map(plant => ({
        name: plant.name,
        applied: !!game.usedPlants.find(pl => pl.name === plant.name),
      }))

    const gameToSave = {
      terrain: game.terrain.name,
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
    const parsedReqXp = parseInt(requiredXp)
    saveGameResult(authId, gameToSave, xp, parsedReqXp).then(res => {
      if (res && !res.error) {
        dispatch(AUTH_ACTIONS.SET_XP(res.current_xp))
        dispatch(AUTH_ACTIONS.SET_COINS(res.current_coins))
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
    history.push(path)
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
          <Text margin={isCampaignGame ? "0 0 16px 0" : "0"}>
            Good game! Nature always wins against computers!
          </Text>
        </>
      ) : (
        modalType === "lose" && (
          <>
            <ModalTitle>You lost!</ModalTitle>
            <Text margin={isCampaignGame ? "0 0 16px 0" : "0"}>
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
              <ACButton margin="10px 0 5px 0" onClick={handlePlayAgain}>
                Play again
              </ACButton>
              <ACButton margin="5px 0" onClick={() => handleRoute("/")}>
                Go to menu
              </ACButton>
            </>
          )}
        </>
      )}
    </Wrapper>
  )
}
