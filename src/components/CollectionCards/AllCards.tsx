import { CampaignState, FiltersData, Animal } from "../../interfaces"
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
  cardsToShow: Animal[]
  setCardsToShow: (cards: Animal[]) => void
  handleEditHandModal: (name: string) => void
  handlePurchaseModal: (card: Animal) => void
  handleSellModal: (card: Animal) => void
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
  filtersData,
}: IProps) {
  const { owned_animals, hand, coins }: CampaignState = useAppSelector(
    ({ campaign }) => campaign
  )
  const ownedCardsNames = owned_animals.map(animal => animal.name)
  const handCardsNames = hand.map(animal => animal.name)
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
                  cardOpacity={getCardOpacityForPreview(ownedCardsNames, card.name)}
                />
                {!ownedCardsNames.includes(card.name) ? (
                  <BuyButton
                    price={card.price}
                    disabled={coins < card.price}
                    onClick={() => handlePurchaseModal(card)}
                  />
                ) : !handCardsNames.includes(card.name) ? (
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
        <Message $margin="75px 0 0 0">No animals found.</Message>
      )}
    </>
  )
}
