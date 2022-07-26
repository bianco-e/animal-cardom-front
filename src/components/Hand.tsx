import styled from "styled-components"
import { IAnimal } from "../interfaces"
import { BREAKPOINTS } from "../utils/constants"
import Card from "./Card"

interface IProps {
  hand: IAnimal[]
  belongsToUser: boolean
}

export default function Hand({ hand, belongsToUser }: IProps) {
  return (
    <CardsGroup>
      {hand.map(animal => (
        <Card {...animal} belongsToUser={belongsToUser} />
      ))}
    </CardsGroup>
  )
}

const CardsGroup = styled.div`
  align-items: center;
  display: flex;
  height: 37%;
  justify-content: space-between;
  width: 100%;
  ${BREAKPOINTS.MOBILE} {
    height: 32%;
  }
`
