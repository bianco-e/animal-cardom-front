import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { ACButton } from "../components/styled-components"

export default function ErrorPage() {
  const { push } = useHistory()
  return (
    <Wrapper>
      <CardLetter>
        <Title>Oops... The Cardom is empty</Title>
        <Title>Looks like animals are having lunch right now</Title>
        <Title>Come back later when we feed them</Title>
        <img alt="cardom" src="/images/welcome-background.png" width={500} />
        <ACButton onClick={() => push("/")}>Go to menu</ACButton>
      </CardLetter>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  align-items: center;
  background: rgba(95, 57, 0, 0.3);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`
const Title = styled.span`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`
const CardLetter = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.primary_brown};
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  box-shadow: inset 0 0 10px 10px rgba(0, 0, 0, 0.1), 0 0 5px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  height: 85vh;
  justify-content: space-between;
  margin: auto;
  padding: 32px 24px;
  width: 64%;
  > img {
    border-radius: 5px;
  }
`
