import styled from "styled-components";
import NavBar from "../components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getAllActionStats } from "../queries/tracking";
import { capitalize } from "../utils";
import Spinner from "../components/Spinner";
import { Action } from "../interfaces";

export interface ActionsStats {
  _id: string;
  actions: Action[];
}

const getActionTitle = (actionName: string): string =>
  actionName
    .split("-")
    .map((w, idx) => (idx === 0 ? capitalize(w) : w))
    .join(" ");

export default function Analytics() {
  const { user, isAuthenticated } = useAuth0();
  const [actions, setActions] = useState<ActionsStats[]>([]);

  useEffect(() => {
    getAllActionStats().then((res) => {
      if (res && res.length) {
        setActions(res);
      }
    });
  }, []);

  return (
    <Wrapper>
      <NavBar
        isHome={false}
        isAuthenticated={isAuthenticated}
        username={user && user.given_name && user.given_name}
        auth_id={user && user.sub && user.sub}
        picture={user && user.picture && user.picture}
      />
      <Title>Analytics</Title>
      {actions.length > 0 ? (
        actions.map(({ _id, actions }) => {
          return (
            <Container>
              <ActionName>{getActionTitle(_id)}</ActionName>{" "}
              <span>{actions.length}</span>
              {actions.map((currentAction: Action) => {
                return (
                  <ActionContainer>
                    <ul>
                      {currentAction.guest_name ? (
                        <li>
                          <b>Guest name:</b> {currentAction.guest_name}
                        </li>
                      ) : null}
                      {currentAction.auth_id ? (
                        <li>
                          <b>Google ID:</b> {currentAction.auth_id}
                        </li>
                      ) : null}
                      {currentAction.utm ? (
                        <li>
                          <b>UTM:</b> {currentAction.utm}
                        </li>
                      ) : null}
                      {currentAction.user_agent ? (
                        <li>
                          <b>User agent:</b> {currentAction.user_agent}
                        </li>
                      ) : null}
                      {currentAction.created_at ? (
                        <li>
                          <b>Date:</b>
                          {new Date(currentAction.created_at!).toString()}
                        </li>
                      ) : null}
                    </ul>
                  </ActionContainer>
                );
              })}
            </Container>
          );
        })
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  background: rgba(95, 57, 0, 0.3);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;
const Container = styled.div`
  margin: 30px 0;
  width: 40%;
  text-align: center;
`;
const ActionName = styled.span`
  border: 3px solid ${({ theme }) => theme.secondary_brown};
  border-top: 0;
  border-radius: 0 0 5px 5px;
  font-size: 23px;
  font-weight: bold;
  padding: 0 15px 5px 15px;
`;
const Title = styled.span`
  color: #000;
  font-size: 46px;
  font-weight: bold;
  margin: 100px 0 40px 0;
`;
const ActionContainer = styled.div`
  margin: 20px 0;
`;
