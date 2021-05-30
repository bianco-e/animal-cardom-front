import { useEffect, useState } from "react";
import styled from "styled-components";
import SideMenu from "../components/SideMenu";
import Spinner from "../components/Spinner";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserMe, createUser } from "../queries/user";
import { getNewUserTemplate } from "../utils";
import { SMALL_RESPONSIVE_BREAK } from "../utils/constants";
import CoinsViewer from "./CoinsViewer";

export default function MenuLayout({ children }: { children: JSX.Element }) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [havingCoins, setHavingCoins] = useState<number>();
  const { push } = useHistory();

  useEffect(() => {
    if (isAuthenticated && user) {
      document.cookie = `auth=${user.sub}; max-age=43200; path=/;`;
      getUserMe(user.sub).then((res) => {
        if (res) {
          if (res.error && res.error === "user_not_found") {
            const newUser = getNewUserTemplate(user);
            createUser(newUser).then((userRes) => {
              if (!userRes && !userRes.auth_id) {
                push("/error");
              }
            });
          }
          if (res.coins !== undefined) {
            setHavingCoins(res.coins);
          }
        }
      });
    }
  }, [isAuthenticated, user]); //eslint-disable-line

  return isLoading ? (
    <Spinner />
  ) : !isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Wrapper>
      <SideMenu username={user.given_name} avatar={user.picture} />
      <ChildrenContainer>
        <CoinsViewer coins={havingCoins} />
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
