import { FiltersData, IAnimal, User } from "../../interfaces"
import Card from "../Card"
import BuyButton from "./Buttons/BuyButton"
import CollectionFilter from "./CollectionFilter"
import { CardsContainer, SingleCardContainer } from "./styled"
import { useAppSelector } from "../../hooks/redux-hooks"
import { Message } from "../styled-components"
import AddButton from "./Buttons/AddButton"
import InHandButton from "./Buttons/InHandButton"
import SellButton from "./Buttons/SellButton"

interface IProps {
  cardsToShow: IAnimal[]
  setCardsToShow: (cards: IAnimal[]) => void
  handleEditHandModal: (name: string) => void
  handlePurchaseModal: (card: IAnimal) => void
  handleSellModal: (card: IAnimal) => void
  filtersData: FiltersData
}

const getCardOpacityForPreview = (cards: string[], name: string): string =>
  cards.find(card => card === name) ? "1" : "0.6"

export default function CollectionCards({
  cardsToShow,
  setCardsToShow,
  handleEditHandModal,
  handlePurchaseModal,
  handleSellModal,
  filtersData
}: IProps) {
  const {
    owned_cards = [],
    hand,
    coins,
  }: User = useAppSelector(({ auth }) => auth.user)

  return (
    <>
      <CollectionFilter filtersData={filtersData} setCardsToShow={setCardsToShow} />
      {cardsToShow.length > 0 ? (
        <CardsContainer>
          {cardsToShow.map(card => {
            return (
              <SingleCardContainer key={card.name}>
                <Card
                  {...card}
                  belongsToUser={false}
                  opacityForPreview={getCardOpacityForPreview(owned_cards, card.name)}
                />
                {!owned_cards.includes(card.name) ? (
                  <BuyButton
                    price={card.price}
                    disabled={coins < card.price}
                    onClick={() => handlePurchaseModal(card)}
                  />
                ) : !hand.includes(card.name) ? (
                  <>
                    <AddButton onClick={() => handleEditHandModal(card.name)} />
                    <SellButton onClick={() => handleSellModal(card)} />
                  </>
                ) : (
                  <InHandButton />
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
