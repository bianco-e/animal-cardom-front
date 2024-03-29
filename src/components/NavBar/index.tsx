import { useEffect, useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { LogButton } from "../../components/styled-components"
import { createAction } from "../../queries/tracking"
import { getUtm } from "../../utils"
import { Container, FeedbackButton, OptionButton, UserImage, Wrapper } from "./styled"

interface IProps {
  isHome?: boolean
}

export default function NavBar({ isHome }: IProps) {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0()
  const username = user?.given_name
  const picture = user?.picture
  const auth_id = user?.sub
  const history = useHistory()
  const location = useLocation()

  const [soundState, setSoundState] = useState<"off" | "on">("on")

  useEffect(() => {
    const currentSoundState = localStorage.getItem("sound")
    if (
      currentSoundState &&
      (currentSoundState === "off" || currentSoundState === "on")
    ) {
      setSoundState(currentSoundState)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("sound", soundState)
  }, [soundState])

  const handleSoundButton = () => {
    const soundToSet = soundState === "off" ? "on" : "off"
    setSoundState(soundToSet)
  }

  const handleLogin = () => {
    const guest = localStorage.getItem("ac-guest-name")
    const currentUtm = getUtm(location.search)
    const action = {
      ...(auth_id ? { auth_id } : {}),
      ...(currentUtm ? { utm: currentUtm } : {}),
      ...(guest ? { guest_name: guest } : {}),
    }
    if (isAuthenticated && username) {
      createAction({
        ...action,
        action: "you-are-allowed-button",
      })
      history.push("/menu")
    } else {
      createAction({
        ...action,
        action: "sign-in-button",
      })
      loginWithRedirect()
    }
  }

  return (
    <Wrapper>
      <Container>
        {isHome && (
          <FeedbackButton>
            <Link to="give-feedback">Give Feedback</Link>
          </FeedbackButton>
        )}

        <OptionButton onClick={handleSoundButton}>
          <img
            alt="sound-button"
            src={`/icons/sound-${soundState}-icon.png`}
            width={35}
          />
        </OptionButton>
        <Link className="logo-link" to="/">
          <img alt="ac-logo" src="/images/animal-cardom-logo.png" width={60} />
        </Link>
        <LogButton onClick={handleLogin} overflow="visible">
          {isAuthenticated && username && picture ? (
            <>
              <UserImage src={picture} alt={username} />
              <span>
                You're allowed, <b>{username}!</b>
              </span>
            </>
          ) : (
            <span>
              Sign in with <b>Google</b>
            </span>
          )}
        </LogButton>
      </Container>
    </Wrapper>
  )
}
