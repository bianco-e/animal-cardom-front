import { useEffect, useState } from "react"
import styled from "styled-components"
import Modal from "../components/Common/Modal"
import { useHistory, useParams } from "react-router-dom"
import { BREAKPOINTS } from "../utils/constants"
import { GAME_ACTIONS } from "../redux/reducers/game"
import SidePanel from "../components/GamePanel"
import { GameParams, IAnimal, User } from "../interfaces"
import Spinner from "../components/Spinner"
import ModalContentResult from "../components/ModalContentResult"
import { getLiveCards } from "../utils"
import { trackAction } from "../queries/tracking"
import { HandContainer } from "../components/styled-components"
import Card from "../components/Card"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks"
import { computerPlay, startCampaignGame, startGuestGame } from "../redux/actions/game"

interface IProps {
  isCampaign?: boolean
}

export default function Game({ isCampaign }: IProps) {
  const game = useAppSelector(({ game }) => game)
  const dispatch = useAppDispatch()
  const [userName, setUserName] = useState<string>("")
  const [modal, setModal] = useState<string>("")
  const { push } = useHistory()
  const { requiredXp } = useParams<GameParams>()
  const {
    hands,
    plants,
    pcTurn,
    pcPlay,
    triggerPcAttack,
    terrain,
    gameError,
    isLoading,
  } = game
  const { auth_id: authId }: User = useAppSelector(({ auth }) => auth.user)

  useEffect(() => {
    if (gameError) return push(isCampaign ? "/campaign" : "/")
  }, [gameError]) //eslint-disable-line

  useEffect(() => {
    dispatch(GAME_ACTIONS.SET_LOADING_GAME(true))
    if (!isCampaign) {
      // is game for guests
      const guest = localStorage.getItem("ac-guest-name")
      guest ? setUserName(guest) : push("/")
      //@ts-ignore
      dispatch(startGuestGame())
    } else {
      // is campaign game
      const parsedReqXp = parseInt(requiredXp)
      //@ts-ignore
      dispatch(startCampaignGame(setUserName, parsedReqXp))
    }
  }, [isCampaign]) //eslint-disable-line

  useEffect(() => {
    if (!hands.pc.length || !hands.user.length) return
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
          //@ts-ignore
          dispatch(computerPlay())
        }, 1800)
      } else {
        dispatch(GAME_ACTIONS.COMPUTER_THINK())
      }
    }
  }, [pcTurn, triggerPcAttack]) //eslint-disable-line

  return (
    <>
      <Wrapper bgImg={terrain!.image}>
        <SidePanel
          isCampaign={isCampaign}
          plants={plants}
          terrain={terrain!}
          userName={userName}
        />
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
