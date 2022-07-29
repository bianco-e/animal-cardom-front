import { IAnimal, User } from "../../interfaces"
import Card from "../Card"
import BuyButton from "./Buttons/BuyButton"
import CollectionFilter from "../CollectionFilter"
import { CardsContainer, SingleCardContainer } from "./styled"
import { useAppSelector } from "../../hooks/redux-hooks"
import { Message } from "../styled-components"

interface IProps {
  cardsToShow: IAnimal[]
  setCardsToShow: (cards: IAnimal[]) => void
  handleEditHandModal: (name: string) => void
  handlePurchaseModal: (card: IAnimal) => void
}

const getCardOpacityForPreview = (cards: string[], name: string): string =>
  cards.find(card => card === name) ? "1" : "0.6"

export default function CollectionCards({
  cardsToShow,
  setCardsToShow,
  handleEditHandModal,
  handlePurchaseModal,
}: IProps) {
  const {
    owned_cards: ownedCards,
    hand,
    coins,
  }: User = useAppSelector(({ auth }) => auth.user)

  return (
    <>
      <CollectionFilter setCardsToShow={setCardsToShow} />
      {cardsToShow.length > 0 ? (
        <CardsContainer>
          {cardsToShow.map(card => {
            const onPreviewClick =
              ownedCards.includes(card.name) && !hand.includes(card.name)
                ? handleEditHandModal
                : undefined
            return (
              <SingleCardContainer key={card.name}>
                <Card
                  {...card}
                  belongsToUser={false}
                  displayInHandSign={hand.includes(card.name)}
                  onPreviewClick={onPreviewClick}
                  opacityForPreview={getCardOpacityForPreview(ownedCards, card.name)}
                />
                {!ownedCards.includes(card.name) && (
                  <BuyButton
                    price={card.price}
                    disabled={coins < card.price}
                    onClick={() => handlePurchaseModal(card)}
                  />
                )}
              </SingleCardContainer>
            )
          })}
        </CardsContainer>
      ) : (
        <Message margin="75px 0 0 0">No animals found.</Message>
      )}
    </>
  )
}
