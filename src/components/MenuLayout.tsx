import { useContext, useEffect } from "react";
import styled from "styled-components";
import SideMenu from "../components/SideMenu";
import Spinner from "../components/Spinner";
import CoinsViewer from "./CoinsViewer";
import UserContext, { IUserContext } from "../context/UserContext";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserMe, createUser } from "../queries/user";
import { getNewUserTemplate } from "../utils";
import { SMALL_RESPONSIVE_BREAK } from "../utils/constants";
import { SET_COINS } from "../context/UserContext/types";

export default function MenuLayout({ children }: { children: JSX.Element }) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [state, dispatch] = useContext<IUserContext>(UserContext);
  const { push } = useHistory();

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    if (!user.sub) return;
    document.cookie = `auth=${user.sub}; max-age=43200; path=/;`;
    getUserMe(user.sub).then((res) => {
      if (!res) return;
      if (res.error && res.error === "user_not_found") {
        const userTemplate = getNewUserTemplate(user);
        createUser(userTemplate).then((userRes) => {
          if (!userRes && !userRes.auth_id) {
            push("/error");
          }
        });
      }
      if (res.coins !== undefined) {
        dispatch({ type: SET_COINS, payload: res.coins });
      }
    });
  }, [isAuthenticated, user]); //eslint-disable-line

  return isLoading ? (
    <Spinner />
  ) : !isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Wrapper>
      <SideMenu username={user!.given_name!} avatar={user!.picture!} />
      <ChildrenContainer>
        <CoinsViewer coins={state.coins} />
        {children}
      </ChildrenContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-left: 290px;
  @media (${SMALL_RESPONSIVE_BREAK}) {
    margin-left: 0;
  }
`;
const ChildrenContainer = styled.div`
  align-items: center;
  background: rgba(95, 57, 0, 0.3);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: auto;
  padding: 60px 0;
  width: 100%;
`;
