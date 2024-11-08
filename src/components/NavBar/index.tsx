import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { LogButton } from "../../components/styled-components"
import { createAction } from "../../queries/tracking"
import { getUtm } from "../../utils"
import { Container, FeedbackButton, OptionButton, UserImage, Wrapper } from "./styled"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { GAME_ACTIONS } from "../../redux/reducers/game"

interface IProps {
  isHome?: boolean
}

export default function NavBar({ isHome }: IProps) {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0()
  const username = user?.given_name
  const profileImg = user?.picture
  const auth_id = user?.sub
  const { soundOn } = useAppSelector(({ game }) => game)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

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
      navigate("/menu")
    } else {
      createAction({
        ...action,
        action: "sign-in-button",
      })
      loginWithRedirect()
    }
  }

  const handleSound = () => {
    dispatch(GAME_ACTIONS.SET_GAME_SOUND(!soundOn))
  }

  return (
    <Wrapper>
      <Container>
        {isHome && (
          <FeedbackButton>
            <Link to="give-feedback">Give Feedback</Link>
          </FeedbackButton>
        )}

        <OptionButton onClick={handleSound}>
          <img
            alt="sound-button"
            src={`/icons/sound-${soundOn ? "on" : "off"}-icon.png`}
            width={35}
          />
        </OptionButton>
        <Link className="logo-link" to="/">
          <img alt="ac-logo" src="/images/animal-cardom-logo.png" width={60} />
        </Link>
        <LogButton onClick={handleLogin} $overflow="visible">
          {isAuthenticated && username && profileImg ? (
            <>
              <UserImage src={profileImg} alt={username} />
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
