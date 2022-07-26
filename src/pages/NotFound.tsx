import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { ACButton } from "../components/styled-components"

export default function ErrorPage() {
  const { push } = useHistory()
  return (
    <Wrapper>
      <Title>Page not found</Title>
      <Title>Looks like you're trying to get too deep into the Cardom...</Title>
      <Title>Take care! It may be dangerous</Title>

      <ACButton fWeight="bold" onClick={() => push("/")} width="55%">
        Go back to the safe area
      </ACButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  align-items: center;
  background: rgba(95, 57, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
`
const Title = styled.span`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 16px;
  text-align: center;
  &:last-of-type {
    margin-bottom: 64px;
  }
`
