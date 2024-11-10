import { useEffect, useState } from "react"
import styled from "styled-components"
import Modal from "../components/Common/Modal"
import { useNavigate, useParams } from "react-router-dom"
import { BREAKPOINTS } from "../utils/constants"
import { GAME_ACTIONS } from "../redux/reducers/game"
import GamePanel from "../components/GamePanel"
import { Animal, CampaignState, HandKey, IGameState, User } from "../interfaces"
import Spinner from "../components/Spinner"
import ModalContentResult from "../components/ModalContentResult"
import { getLiveCardsInAHand } from "../utils"
import { HandContainer } from "../components/styled-components"
import Card from "../components/Card"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks"
import { computerPlay, startCampaignGame, startGuestGame } from "../redux/actions/game"
import PcPlaysCaster from "../components/PcPlaysCaster"
import { saveGameResult } from "../queries/games"
import { CAMPAIGN_ACTIONS } from "../redux/reducers/campaign"

interface IProps {
  isCampaign?: boolean
}

export default function Game({ isCampaign }: IProps) {
  const game = useAppSelector(({ game }) => game)
  const dispatch = useAppDispatch()
  const [userName, setUserName] = useState<string>("")
  const [modalVariant, setModalVariant] = useState<string>("")
  const [earnedAnimal, setEarnedAnimal] = useState<Animal | null>(null)
  const [earnedCoins, setEarnedCoins] = useState<number | null>(null)
  const navigate = useNavigate()
  const { levelId } = useParams<{ levelId: string }>()
  const { hands, plants, pcTurn, triggerPcAttack, habitat, gameError, isLoading } = game
  const { id }: User = useAppSelector(({ auth }) => auth.user)
  const campaign: CampaignState = useAppSelector(({ campaign }) => campaign)

  useEffect(() => {
    if (gameError) return navigate(isCampaign ? "/campaign" : "/")
  }, [gameError]) //eslint-disable-line

  useEffect(() => {
    if (!isCampaign) {
      //Guest game
      const guestName = localStorage.getItem("ac-guest-name")
      if (!guestName) return navigate("/")
      setUserName(guestName) //@ts-ignore
      dispatch(startGuestGame())
    } else {
      //Campaign game
      if (!levelId || !id || !campaign.level) return //@ts-ignore
      dispatch(startCampaignGame(setUserName, parseInt(levelId)))
    }
  }, [isCampaign, id, campaign.level]) //eslint-disable-line

  const getStatsAndSaveGame = (user_id: string, user_won: boolean, game: IGameState): void => {
    const mapCardsToSave = (handKey: HandKey) =>
      game.hands[handKey].map(animal => ({
        id: animal.id,
        name: animal.name,
        finished_game: animal.life.current > 0,
      }))
    const mapPlantsToSave = (handKey: HandKey) =>
      game.plants[handKey].map(plant => ({
        id: plant.id,
        name: plant.name,
        finished_game: !!game.usedPlants.find(pl => pl.name === plant.name),
      }))

    const gameToSave = {
      habitat_id: game.habitat.id,
      habitat_name: game.habitat.name,
      user_won,
      pc_used_animals: mapCardsToSave("pc"),
      user_used_animals: mapCardsToSave("user"),
      pc_used_plants: mapPlantsToSave("pc"),
      user_used_plants: mapPlantsToSave("user"),
    }
    saveGameResult(user_id, gameToSave, campaign.level).then(res => {
      if (res && !res.error) {
        dispatch(CAMPAIGN_ACTIONS.SET_LEVEL(res.new_level))
        dispatch(CAMPAIGN_ACTIONS.SET_COINS(res.current_coins))
        setEarnedCoins(res.earned_coins)
        setEarnedAnimal(res.earned_animal)
      }
    })
  }

  useEffect(() => {
    if (!hands.pc.length || !hands.user.length) return
    if (!getLiveCardsInAHand(hands.user).length) {
      setModalVariant("lose")
      getStatsAndSaveGame(id, false, game)
    }
    if (!getLiveCardsInAHand(hands.pc).length) {
      setModalVariant("win")
      getStatsAndSaveGame(id, true, game)
    }
  }, [hands.pc, hands.user]) //eslint-disable-line

  useEffect(() => {
    if (!pcTurn) return
    if (triggerPcAttack) {
      setTimeout(() => {
        //@ts-ignore
        dispatch(computerPlay())
      }, 1600)
    } else dispatch(GAME_ACTIONS.COMPUTER_THINK())
  }, [pcTurn, triggerPcAttack]) //eslint-disable-line

  return (
    <>
      <Wrapper $bgImg={`/images/habitats/${habitat.name.toLowerCase()}.webp`}>
        <GamePanel
          isCampaign={isCampaign}
          plants={plants}
          habitat={habitat}
          userName={userName}
        />
        <Board>
          <HandContainer>
            {hands.pc.map((animal: Animal) => (
              <Card {...animal} isForGame key={animal.name} />
            ))}
          </HandContainer>

          <PcPlaysCaster />

          <HandContainer>
            {hands.user.map((animal: Animal) => (
              <Card {...animal} belongsToUser isForGame key={animal.name} />
            ))}
          </HandContainer>
        </Board>
      </Wrapper>
      {modalVariant && (
        <Modal closeModal={() => {}} withCloseButton={false}>
          <ModalContentResult
            closeModal={() => setModalVariant("")}
            modalVariant={modalVariant}
            earnedAnimal={earnedAnimal}
            earnedCoins={earnedCoins}
            isCampaignGame={isCampaign}
          />
        </Modal>
      )}
      {isLoading && (
        <Modal closeModal={() => {}} forSpinner={true}>
          <Spinner />
        </Modal>
      )}
    </>
  )
}

interface WrapperProps {
  $bgImg?: string
}
const Wrapper = styled.div<WrapperProps>`
  background: url(${p => p.$bgImg});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-start: left;
  height: 100vh;
  width: 100%;
  ${BREAKPOINTS.MD} {
    flex-direction: column;
  }
`
const Board = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 0px 10px;
  position: relative;
  width: 100%;
  ${BREAKPOINTS.MD} {
    padding: 21px 0 0 0;
  }
  ${BREAKPOINTS.SM} {
    min-height: 285px;
  }
`
