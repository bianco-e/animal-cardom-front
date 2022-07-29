import styled from "styled-components"
import NavBar from "../components/NavBar"
import { useEffect, useState } from "react"
import { getAllActionStats } from "../queries/tracking"
import { capitalize } from "../utils"
import Spinner from "../components/Spinner"
import { Action } from "../interfaces"
import { BREAKPOINTS } from "../utils/constants"

export interface ActionsStats {
  _id: string
  actions: Action[]
}

const getActionTitle = (actionName: string): string =>
  actionName
    .split("-")
    .map((w, idx) => (idx === 0 ? capitalize(w) : w))
    .join(" ")

export default function Analytics() {
  const [allActions, setAllActions] = useState<ActionsStats[]>([])

  useEffect(() => {
    ;(async () => {
      const actionsRes = await getAllActionStats()
      if (actionsRes.ok) {
        const data = await actionsRes.json()
        if (!data) return
        setAllActions(data)
      }
    })()
  }, [])

  return (
    <Wrapper>
      <NavBar />
      <Title>Analytics</Title>
      {Array.isArray(allActions) && allActions.length > 0 ? (
        allActions.map(({ _id, actions }) => {
          return (
            <Container key={_id}>
              <ActionName>
                {getActionTitle(_id)} <span>({actions.length})</span>
              </ActionName>
              {actions.map((currentAction: Action) => {
                return (
                  <ActionContainer key={currentAction.created_at}>
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
                          <b>UA:</b> {currentAction.user_agent.slice(11)}
                        </li>
                      ) : null}
                      {currentAction.created_at ? (
                        <li>
                          <b>Date:</b>{" "}
                          {new Date(currentAction.created_at).toLocaleString()}
                        </li>
                      ) : null}
                    </ul>
                  </ActionContainer>
                )
              })}
            </Container>
          )
        })
      ) : (
        <Spinner />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  align-items: center;
  background: rgba(95, 57, 0, 0.3);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`
const Container = styled.div`
  margin: 0 0 32px;
  width: 50%;
  text-align: center;
  ${BREAKPOINTS.MOBILE} {
    width: 100%;
  }
`
const ActionName = styled.span`
  border: 3px solid ${({ theme }) => theme.secondary_brown};
  border-top: 0;
  border-radius: 0 0 8px 8px;
  font-size: 16px;
  font-weight: bold;
  padding: 0 16px 4px;
`
const Title = styled.h1`
  color: #000;
  font-size: ${({ theme }) => theme.$1};
  font-weight: bold;
  margin: 96px 0 44px;
  ${BREAKPOINTS.MOBILE} {
    margin: 96px 0 32px;
    font-size: ${({ theme }) => theme.$2};
  }
`
const ActionContainer = styled.div`
  margin: 16px 0;
  ${BREAKPOINTS.MOBILE} {
    margin: 8px 0;
  }
  li {
    font-size: 12px;
  }
`
