import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import HandsContext, { IHandsContext, IGameState } from "../../context/HandsContext"
import { EMPTY_STATE, SET_CARDS } from "../../context/HandsContext/types"
import { HandKey, ITerrain } from "../../interfaces"
import { newRandomGame, newTerrain, saveGameResult } from "../../queries/games"
import { getCookie } from "../../utils"
import Spinner from "../Spinner"
import { ACButton, ModalTitle, Text } from "../styled-components"
import CampaignEarnings from "./CampaignEarnings"
import { Wrapper } from "./styled"

interface IProps {
  closeModal: () => void
  currentXp: number
  isCampaignGame: boolean
  modalType: string
  setTerrain: (terrain: ITerrain) => void
}

export default function ModalContentResult({
  closeModal,
  currentXp,
  isCampaignGame,
  modalType,
  setTerrain,
}: IProps) {
  const [state, dispatch] = useContext<IHandsContext>(HandsContext)
  const [isLoadingNewGame, setisLoadingNewGame] = useState<boolean>(false)
  const [earnedAnimal, setEarnedAnimal] = useState<string>()
  const [earnedCoins, setEarnedCoins] = useState<number>(1)
  const [havingXp, setHavingXp] = useState<number>(0)
  const history = useHistory()

  const getStatsToSaveGame = (authId: string, won: boolean, state: IGameState): void => {
    const mapCardsToSave = (handKey: HandKey) =>
      state.hands[handKey].map(card => ({
        name: card.name,
        survived: card.life.current !== "DEAD",
      }))
    const mapPlantsToSave = (handKey: HandKey) =>
      state.plants[handKey].map(plant => ({
        name: plant.name,
        applied: !!state.usedPlants.find(pl => pl.name === plant.name),
      }))

    const gameToSave = {
      terrain: state.terrainName!,
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

    saveGameResult(authId, gameToSave, currentXp).then(res => {
      if (res && !res.error) {
        setHavingXp(res.current_xp)
        setEarnedAnimal(res.earned_animal)
        setEarnedCoins(res.earned_coins)
      }
    })
  }

  useEffect(() => {
    const authId = getCookie("auth=")
    if (isCampaignGame && authId) {
      getStatsToSaveGame(authId, modalType === "win", state)
    }
  }, []) //eslint-disable-line

  const handleRoute = (path: string) => {
    dispatch({ type: EMPTY_STATE })
    history.push(path)
  }

  const handlePlayAgain = () => {
    dispatch({ type: EMPTY_STATE })
    setisLoadingNewGame(true)
    newTerrain().then(terrainRes => {
      if (terrainRes && terrainRes.name) {
        setTerrain(terrainRes)
        newRandomGame().then(gameRes => {
          if (gameRes && gameRes.pc && gameRes.user) {
            setisLoadingNewGame(false)
            closeModal()
            dispatch({
              type: SET_CARDS,
              hands: { pc: gameRes.pc.animals, user: gameRes.user.animals },
              plants: { pc: gameRes.pc.plants, user: gameRes.user.plants },
              terrain: terrainRes,
            })
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
          <Text margin={isCampaignGame ? "0 0 20px 0" : "0"}>
            Good game! Nature always win against computers!
          </Text>
        </>
      ) : (
        modalType === "lose" && (
          <>
            <ModalTitle>You lost!</ModalTitle>
            <Text margin={isCampaignGame ? "0 0 20px 0" : "0"}>
              Nice try! PC defeated you this time, but nature always takes revenge!
            </Text>
          </>
        )
      )}
      {isCampaignGame ? (
        <CampaignEarnings
          earnedAnimal={earnedAnimal}
          earnedCoins={earnedCoins}
          havingXp={havingXp}
          handleRoute={handleRoute}
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
