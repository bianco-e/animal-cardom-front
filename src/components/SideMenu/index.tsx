import { useEffect, useState } from "react"
import { useLocation, useHistory } from "react-router-dom"
import { ACButton } from "../../components/styled-components"
import { useAuth0 } from "@auth0/auth0-react"
import AnimatedPlaceholder from "../Common/AnimatedPlaceholder"
import { getCurrentSection } from "../../utils"
import HowToPlay from "../HowToPlay"
import { CloseButton, LogoutButton, UserInfoContainer, Wrapper } from "./styled"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { CLEAR_TOKEN } from "../../redux/reducers/auth"

export default function SideMenu() {
  const [currentSection, setCurrentSection] = useState<string>()
  const [menuWidth, setMenuWidth] = useState<string>("210px")
  const dispatch = useAppDispatch()
  const user = useAppSelector(({ auth }) => auth.user)
  const { logout } = useAuth0()
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    setCurrentSection(getCurrentSection(location.pathname))
  }, [location.pathname])
  const buttonsData = [
    {
      title: "Menu",
      fn: () => history.push("/menu"),
    },
    {
      title: "Profile",
      fn: () => history.push("/profile"),
    },
    {
      title: "Collection",
      fn: () => history.push("/collection"),
    },
    {
      title: "Campaign",
      fn: () => history.push("/campaign"),
    },
  ]
  const handleLogout = () => {
    dispatch(CLEAR_TOKEN())
    logout({ returnTo: window.location.origin })
  }
  const hideSideMenu = () => {
    setMenuWidth(menuWidth === "1px" ? "200px" : "1px")
  }

  return (
    <Wrapper width={menuWidth}>
      <CloseButton
        className="close-button"
        onClick={hideSideMenu}
        rotate={menuWidth === "1px" ? "270deg" : "90deg"}>
        <svg x="0px" y="0px" width={30} height={30} viewBox="0 0 960 560">
          <path
            d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937
                c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937
                c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"
          />
        </svg>
      </CloseButton>
      <img
        className="logo"
        alt="animal-cardom"
        src="/images/animal-cardom-logo.png"
        width={56}
        onClick={() => history.push("/")}
      />
      {user.first_name ? (
        <UserInfoContainer>
          <img className="avatar" alt={user.first_name} src={user.picture} />
          <span>
            <b>{user.first_name}</b>
          </span>
        </UserInfoContainer>
      ) : (
        <AnimatedPlaceholder />
      )}
      {buttonsData.map(({ title, fn }, idx) => {
        const isSelected = currentSection === title
        return (
          <ACButton
            className={`menu-button-${idx}`}
            key={title}
            fWeight="bold"
            onClick={fn}
            selected={isSelected}>
            {title}
          </ACButton>
        )
      })}
      <LogoutButton onClick={handleLogout}>Sign out</LogoutButton>

      <HowToPlay />
    </Wrapper>
  )
}
