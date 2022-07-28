import styled from "styled-components"
import SideMenu from "../components/SideMenu"
import Spinner from "../components/Spinner"
import CoinsViewer from "./CoinsViewer"
import { useAuth0 } from "@auth0/auth0-react"
import { BREAKPOINTS } from "../utils/constants"
import { AuthUser } from "../interfaces"

export default function MenuLayout({ children }: { children: JSX.Element }) {
  const { isLoading } = useAuth0<AuthUser>()

  return isLoading ? (
    <Spinner />
  ) : (
    <Wrapper>
      <SideMenu />
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
