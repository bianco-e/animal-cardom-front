import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import Modal from "../components/Common/Modal"
import { useLocation, useHistory } from "react-router-dom"
import { BREAKPOINTS } from "../utils/constants"
import HandsContext, { IHandsContext } from "../context/HandsContext"
import { COMPUTER_PLAY, COMPUTER_THINK, SET_CARDS } from "../context/HandsContext/types"
import SidePanel from "../components/GamePanel"
import { IAnimal, IPlant, ITerrain } from "../interfaces"
import { getUserMe } from "../queries/user"
import { newTerrain, newCampaignGame, newRandomGame } from "../queries/games"
import Spinner from "../components/Spinner"
import ModalResultContent from "../components/ModalResultContent"
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
  const { pathname, search } = useLocation()
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

  const checkUserAndStartGame = () => {
    setIsLoading(true)
    if (!pathname.startsWith("/game")) {
      // is game for guests
      const guest = localStorage.getItem("ac-guest-name")
      guest ? setUserName(guest) : history.push("/")
      newTerrain().then(terrainRes => {
        if (terrainRes && terrainRes.name) {
          setTerrain(terrainRes)
          newRandomGame().then(res => newGameResHandler(terrainRes, res))
        }
      })
    } else {
      // is campaign game
      setIsCampaignGame(true)
      const authId = getCookie("auth=")
      if (authId) {
        getUserMe(authId).then(userRes => {
          if (userRes && userRes.xp !== undefined && userRes.hand && userRes.first_name) {
            setUserName(userRes.first_name)
            const { hand, xp } = userRes
            const xpParam = new URLSearchParams(search).get("x")
            const parsedXpParam = xpParam && parseInt(xpParam)
            if (
              (parsedXpParam || parsedXpParam === 0) &&
              parsedXpParam <= xp &&
              [0, 450, 900, 1350, 1800, 2250, 2700, 3150, 3600].includes(parsedXpParam)
            ) {
              setCurrentXp(xp)
              newTerrain(parsedXpParam).then(terrainRes => {
                if (terrainRes && terrainRes.name) {
                  newCampaignGame(parsedXpParam, hand).then(gameRes =>
                    newGameResHandler(terrainRes, gameRes)
                  )
                  setTerrain(terrainRes)
                }
              })
            } else history.push("/menu")
          }
        })
      }
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
              <Card {...animal} belongsToUser={false} />
            ))}
          </HandContainer>
          <BoardText>{pcPlay}</BoardText>
          <HandContainer>
            {hands.user.map((animal: IAnimal) => (
              <Card {...animal} belongsToUser={true} />
            ))}
          </HandContainer>
        </Board>
      </Wrapper>
      {modal && (
        <Modal closeModal={() => {}} withCloseButton={false}>
          <ModalResultContent
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
