import { useEffect } from "react"
import styled from "styled-components"
import SideMenu from "../components/SideMenu"
import Spinner from "../components/Spinner"
import CoinsViewer from "./CoinsViewer"
import { Redirect, useHistory } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { getUserMe, createUser } from "../queries/user"
import { getNewUserTemplate } from "../utils"
import { BREAKPOINTS } from "../utils/constants"
import { AuthUser } from "../interfaces"
import { useDispatch } from "react-redux"
import { setCoins } from "../redux/actions/user"

export default function MenuLayout({ children }: { children: JSX.Element }) {
  const { user, isAuthenticated, isLoading } = useAuth0<AuthUser>()
  const dispatch = useDispatch()
  const { push } = useHistory()

  useEffect(() => {
    if (!isAuthenticated || !user) return
    if (!user.sub) return
    document.cookie = `auth=${user.sub}; max-age=43200; path=/;`
    getUserMe(user.sub).then(res => {
      if (!res) return
      if (res.error && res.error === "user_not_found") {
        const userTemplate = getNewUserTemplate(user)
        createUser(userTemplate).then(userRes => {
          if (!userRes && !userRes.auth_id) {
            push("/error")
          }
        })
      }
      if (res.coins !== undefined) {
        dispatch(setCoins(res.coins))
      }
    })
  }, [isAuthenticated, user]) //eslint-disable-line

  return isLoading ? (
    <Spinner />
  ) : !isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Wrapper>
      <SideMenu username={user!.given_name!} avatar={user!.picture!} />
      <ChildrenContainer>
        <CoinsViewer />
        {children}
      </ChildrenContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-left: 290px;
  ${BREAKPOINTS.MOBILE} {
    margin-left: 0;
  }
`
const ChildrenContainer = styled.div`
  align-items: center;
  background: rgba(95, 57, 0, 0.3);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: auto;
  padding: 60px 0;
  width: 100%;
`
