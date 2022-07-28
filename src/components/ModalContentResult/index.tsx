import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { GAME_ACTIONS } from "../../redux/reducers/game"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { GameParams, HandKey, User, IGameState } from "../../interfaces"
import { newRandomGame, newTerrain, saveGameResult } from "../../queries/games"
import Spinner from "../Spinner"
import { ACButton, ModalTitle, Text } from "../styled-components"
import CampaignRewards from "./CampaignRewards"
import { Wrapper } from "./styled"
import { setCards } from "../../redux/actions/game"

interface IProps {
  closeModal: () => void
  currentXp: number
  isCampaignGame?: boolean
  modalType: string
}

export default function ModalContentResult({
  closeModal,
  currentXp,
  isCampaignGame,
  modalType,
}: IProps) {
  const [isLoadingNewGame, setisLoadingNewGame] = useState<boolean>(false)
  const [earnedAnimal, setEarnedAnimal] = useState<string>()
  const [earnedCoins, setEarnedCoins] = useState<number>()
  const [havingXp, setHavingXp] = useState<number>(0)
  const { requiredXp } = useParams<GameParams>()
  const user: User = useAppSelector(({ auth }) => auth.user)
  const { auth_id: authId } = user
  const history = useHistory()
  const dispatch = useAppDispatch()
  const game = useAppSelector(({ game }) => game)

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
    saveGameResult(authId, gameToSave, currentXp, parsedReqXp).then(res => {
      if (res && !res.error) {
        setHavingXp(res.current_xp)
        setEarnedAnimal(res.earned_animal)
        setEarnedCoins(res.earned_coins)
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
    dispatch(GAME_ACTIONS.EMPTY_STATE())
    setisLoadingNewGame(true)
    newTerrain().then(terrainRes => {
      if (terrainRes && terrainRes.name) {
        newRandomGame().then(gameRes => {
          if (gameRes && gameRes.pc && gameRes.user) {
            setisLoadingNewGame(false)
            closeModal()
            dispatch(
              //@ts-ignore
              setCards(
                { pc: gameRes.pc.animals, user: gameRes.user.animals },
                { pc: gameRes.pc.plants, user: gameRes.user.plants },
                terrainRes
              )
            )
          }
        })
      }
    })
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
        <CampaignRewards
          earnedAnimal={earnedAnimal}
          earnedCoins={earnedCoins}
          currentXp={havingXp}
        />
      ) : (
        <>
          {isLoadingNewGame ? (
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
