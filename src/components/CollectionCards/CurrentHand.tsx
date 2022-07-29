import { IAnimal } from "../../interfaces"
import Card from "../Card"
import { CardsContainer, SingleCardContainer } from "./styled"

interface IProps {
  currentHand: IAnimal[]
}

export default function CurrentHand({ currentHand }: IProps) {
  return (
    <CardsContainer>
      {currentHand.map(card => (
        <SingleCardContainer key={card.name}>
          <Card {...card} opacityForPreview="1" />
        </SingleCardContainer>
      ))}
    </CardsContainer>
  )
}
