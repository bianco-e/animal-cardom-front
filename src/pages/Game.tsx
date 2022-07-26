import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import Modal from "../components/Common/Modal"
import { useLocation, useHistory, useParams } from "react-router-dom"
import { BREAKPOINTS } from "../utils/constants"
import HandsContext, { IHandsContext } from "../context/HandsContext"
import { COMPUTER_PLAY, COMPUTER_THINK, SET_CARDS } from "../context/HandsContext/types"
import SidePanel from "../components/GamePanel"
import { GameParams, IAnimal, IPlant, ITerrain } from "../interfaces"
import { getUserMe } from "../queries/user"
import { newTerrain, newCampaignGame, newRandomGame } from "../queries/games"
import Spinner from "../components/Spinner"
import ModalContentResult from "../components/ModalContentResult"
import { getCookie, getLiveCards } from "../utils"
import { trackAction } from "../queries/tracking"
import { HandContainer } from "../components/styled-components"
import Card from "../components/Card"

const emptyTerrain = {
  name: "",
  color: "#fff",
  speciesToBuff: "",
  image: "",
  getRequiredXp: (current: number) => 0,
}

export default function App() {
  const [state, dispatch] = useContext<IHandsContext>(HandsContext)
  const [isCampaignGame, setIsCampaignGame] = useState<boolean>(false)
  const [currentXp, setCurrentXp] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>("")
  const [terrain, setTerrain] = useState<ITerrain>(emptyTerrain)
  const [modal, setModal] = useState<string>("")
  const history = useHistory()
  const { requiredXp } = useParams<GameParams>()
  const { pathname } = useLocation()
  const { hands, plants, pcTurn, pcPlay, triggerPcAttack } = state

  interface Response {
    user: { animals: IAnimal[]; plants: IPlant[] }
    pc: { animals: IAnimal[]; plants: IPlant[] }
  }

  const newGameResHandler = (terrain: ITerrain, res?: Response) => {
    setIsLoading(false)
    if (res && res.user && res.pc) {
      dispatch({
        type: SET_CARDS,
        hands: { pc: res.pc.animals, user: res.user.animals },
        plants: { pc: res.pc.plants, user: res.user.plants },
        terrain,
      })
    }
  }

  const checkUserAndStartGame = async () => {
    setIsLoading(true)
    if (!pathname.startsWith("/game")) {
      // is game for guests
      const guest = localStorage.getItem("ac-guest-name")
      guest ? setUserName(guest) : history.push("/")
      const terrainRes = await newTerrain()
      const newGameRes = await newRandomGame()
      if (terrainRes.error || newGameRes.error) return history.push("/error")
      setTerrain(terrainRes)
      newGameResHandler(terrainRes, newGameRes)
    } else {
      // is campaign game
      setIsCampaignGame(true)
      const authId = getCookie("auth=")
      if (!authId) return history.push("/")
      const userRes = await getUserMe(authId)
      if (userRes.error) return history.push("/")
      const { first_name, hand, xp } = userRes
      setUserName(first_name)
      const parsedReqXp = parseInt(requiredXp)
      if (xp < parsedReqXp) return history.push("/campaign")
      setCurrentXp(xp)
      const terrainRes = await newTerrain(parsedReqXp)
      const gameRes = await newCampaignGame(parsedReqXp, hand)
      if (terrainRes.error || gameRes.error) return history.push("/campaign")
      newGameResHandler(terrainRes, gameRes)
      setTerrain(terrainRes)
    }
  }

  useEffect(() => {
    checkUserAndStartGame()
  }, []) //eslint-disable-line

  useEffect(() => {
    if (!hands.pc.length || !hands.user.length) return
    const authId = getCookie("auth=")
    const guestName = localStorage.getItem("ac-guest-name")
    const baseAction = {
      ...(authId ? { auth_id: authId } : {}),
      ...(guestName ? { guest_name: guestName } : {}),
    }
    if (getLiveCards(hands.user).length === 0) {
      setModal("lose")
      trackAction({
        ...baseAction,
        action: "user-lost",
      })
    }
    if (getLiveCards(hands.pc).length === 0) {
      setModal("win")
      trackAction({
        ...baseAction,
        action: "user-won",
      })
    }
  }, [hands.pc, hands.user]) //eslint-disable-line

  useEffect(() => {
    if (pcTurn) {
      if (triggerPcAttack) {
        setTimeout(() => {
          dispatch({ type: COMPUTER_PLAY })
        }, 1800)
      } else {
        dispatch({ type: COMPUTER_THINK })
      }
    }
  }, [pcTurn, triggerPcAttack]) //eslint-disable-line

  return (
    <>
      <Wrapper bgImg={terrain!.image}>
        <SidePanel plants={plants} terrain={terrain!} userName={userName} />
        <Board>
          <HandContainer>
            {hands.pc.map((animal: IAnimal) => (
              <Card {...animal} belongsToUser={false} key={animal.name} />
            ))}
          </HandContainer>
          <BoardText>{pcPlay}</BoardText>
          <HandContainer>
            {hands.user.map((animal: IAnimal) => (
              <Card {...animal} belongsToUser={true} key={animal.name} />
            ))}
          </HandContainer>
        </Board>
      </Wrapper>
      {modal && (
        <Modal closeModal={() => {}} withCloseButton={false}>
          <ModalContentResult
            closeModal={() => setModal("")}
            modalType={modal}
            isCampaignGame={isCampaignGame}
            setTerrain={setTerrain}
            currentXp={currentXp}
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
  bgImg?: string
}
const Wrapper = styled.div`
  background: url(${(p: WrapperProps) => p.bgImg});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-start: left;
  height: 100vh;
  width: 100%;
  ${BREAKPOINTS.TABLET} {
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
  ${BREAKPOINTS.TABLET} {
    padding: 21px 0 0 0;
  }
  ${BREAKPOINTS.MOBILE} {
    min-height: 285px;
  }
`
const BoardText = styled.h4`
  align-items: center;
  border-radius: 5px;
  color: ${({ color }) => color};
  display: flex;
  font-size: 20px;
  height: 45px;
  justify-content: center;
  margin: 0;
  text-shadow: rgba(255, 255, 255, 0.8) 2px 2px 3px;
  ${BREAKPOINTS.TABLET} {
    font-size: 16px;
  }
  ${BREAKPOINTS.MOBILE} {
    font-size: 12px;
  }
`
