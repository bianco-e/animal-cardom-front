import { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import styled from "styled-components"
import NavBar from "../components/NavBar"
import { BREAKPOINTS } from "../utils/constants"
import { ACButton, ACInput } from "../components/styled-components"
import { useAuth0 } from "@auth0/auth0-react"
import { trackAction } from "../queries/tracking"
import { getUtm } from "../utils"
import HowToPlay from "../components/HowToPlay"

export default function WelcomePage() {
  const userAgent = navigator.userAgent
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0()
  const location = useLocation()
  const history = useHistory()
  const [inputValue, setInputValue] = useState<string>("")
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)

  const guestName = localStorage.getItem("ac-guest-name")
  const currentUtm = getUtm(location.search)
  const baseAction = {
    guest_name: inputValue,
    ...(user?.sub ? { auth_id: user.sub } : {}),
    ...(userAgent ? { user_agent: userAgent } : {}),
    ...(currentUtm ? { utm: currentUtm } : {}),
    ...(guestName ? { guest_name: guestName } : {}),
  }

  useEffect(() => {
    if (guestName) return setInputValue(guestName)
  }, [guestName])

  useEffect(() => {
    if (!isLoading) {
      const visit = {
        ...baseAction,
        action: "visit-landing",
      }
      trackAction(visit)
    }
  }, [isLoading]) //eslint-disable-line

  const goToPlay = () => {
    if (inputValue.trim() === "") return setShowErrorMessage(true)
    localStorage.setItem("ac-guest-name", inputValue)
    trackAction({
      ...baseAction,
      action: "play-as-guest-button",
    })
    history.push(`/play`)
  }

  const onKeyDownFn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      trackAction({
        ...baseAction,
        action: "play-as-guest-enter",
      })
      goToPlay()
    }
  }

  const playCampaign = () => {
    if (isAuthenticated && user?.given_name) {
      trackAction({
        ...baseAction,
        action: "continue-campaign-button",
      })
      history.push("/campaign")
    } else {
      trackAction({
        ...baseAction,
        action: "start-campaign-button",
      })
      loginWithRedirect()
    }
  }

  return (
    <Wrapper>
      <NavBar isHome />
      <Title>Welcome to Animal Cardom!</Title>

      <Container>
        <ACButton fWeight="bold" margin="0 0 48px !important" onClick={playCampaign}>
          {isAuthenticated && user?.given_name ? "Continue" : "Start"} campaign
        </ACButton>
        <ACInput
          onChange={e => e.target.value.length < 8 && setInputValue(e.target.value)}
          onKeyDown={onKeyDownFn}
          placeholder="Enter your name to play as a guest"
          type="text"
          value={inputValue}
        />
        <ACButton fWeight="bold" onClick={goToPlay}>
          Play as a guest
        </ACButton>
        {showErrorMessage && (
          <ErrorMessage>Nameless people are not allowed in Animal Cardom!</ErrorMessage>
        )}
      </Container>
      <HowToPlay
        action={{
          ...baseAction,
          action: "how-to-play-button",
        }}
      />
    </Wrapper>
  )
}

const ErrorMessage = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary_red};
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  text-align: center;
  transform: translateX(-50%);
  top: 240px;
  width: 100%;
`
const Wrapper = styled.div`
  align-items: center;
  background-image: url(/images/welcome-background.png);
  background-repeat: round;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-around;
`
const Title = styled.h4`
  font-size: ${({ theme }) => theme.$2};
  text-align: center;
  padding-top: 64px;
  ${BREAKPOINTS.MOBILE} {
    margin-bottom: 5px;
    font-size: ${({ theme }) => theme.$3};
  }
`
const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 50vh;
  margin: auto;
  position: relative;
  width: 40%;
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.$5};
  }
  ${BREAKPOINTS.MOBILE} {
    height: 65vh;
    width: 60%;
  }
`
