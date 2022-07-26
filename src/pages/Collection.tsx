import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Message } from "../components/styled-components"
import { IAnimal } from "../interfaces"
import { getCookie, sortCardsAlphabetically } from "../utils"
import { getUserProfile } from "../queries/user"
import { getAllAnimalsCards, getFilteredAnimalsCards } from "../queries/animalsCards"
import MenuLayout from "../components/MenuLayout"
import CollectionFilter from "../components/CollectionFilter"
import Spinner from "../components/Spinner"
import Card from "../components/Card"
import Modal from "../components/Common/Modal"
import ModalHandEditContent from "../components/ModalHandEditContent"
import ModalCardPurchaseContent from "../components/ModalCardPurchaseContent"
import AccordionSection from "../components/AccordionSection"
import { BREAKPOINTS } from "../utils/constants"
import UserContext, { IUserContext } from "../context/UserContext"

const getCardOpacityForPreview = (cards: string[], name: string): string => {
  if (cards.find(card => card === name)) {
    return "1"
  }
  return "0.6"
}

export default function Collection() {
  const [state] = useContext<IUserContext>(UserContext)
  const [speciesFilter, setSpeciesFilter] = useState<string>()
  const [modal, setModal] = useState<string>("")
  const [skillTypeFilter, setSkillTypeFilter] = useState<string>()
  const [owningFilter, setOwningFilter] = useState<boolean | undefined>()
  const [cardsToShow, setCardsToShow] = useState<IAnimal[]>([])
  const [allCards, setAllCards] = useState<IAnimal[]>([])
  const [currentHand, setCurrentHand] = useState<string[]>([])
  const [ownedCards, setOwnedCards] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [animalToAdd, setAnimalToAdd] = useState<IAnimal>()
  const [animalToBuy, setAnimalToBuy] = useState<IAnimal>()

  useEffect(() => {
    setIsLoading(true)
    getAllAnimalsCards().then(res => {
      setIsLoading(false)
      if (res && res.animals) {
        setAllCards(res.animals)
        setCardsToShow(sortCardsAlphabetically(res.animals))
      }
    })
    const authId = getCookie("auth=")
    if (authId) {
      getUserProfile(authId).then(res => {
        if (res && res.owned_cards && res.hand && res.coins !== undefined) {
          setOwnedCards(res.owned_cards)
          setCurrentHand(res.hand)
        }
      })
    }
  }, [])

  useEffect(() => {
    const sendingOwnedCards = owningFilter ? ownedCards.map(card => card) : undefined
    const sendingOwnedCardsToFilter =
      owningFilter === false ? ownedCards.map(card => card) : undefined
    getFilteredAnimalsCards(
      speciesFilter,
      skillTypeFilter,
      sendingOwnedCards,
      sendingOwnedCardsToFilter
    ).then(res => {
      if (res && res.animals) {
        setCardsToShow(sortCardsAlphabetically(res.animals))
      }
    })
  }, [speciesFilter, skillTypeFilter, owningFilter]) //eslint-disable-line

  const handleEditHandClick = (name: string) => {
    setModal("editHand")
    const cardToAdd = allCards.find(card => card.name === name)
    if (cardToAdd) {
      setAnimalToAdd(cardToAdd)
    }
  }

  const handlePurchaseClick = (card: IAnimal) => {
    setModal("cardPurchase")
    setAnimalToBuy(card)
  }

  const hand = allCards.filter(card => currentHand.includes(card.name))

  return (
    <MenuLayout>
      <>
        <CollectionFilter
          setSpeciesFilter={setSpeciesFilter}
          setSkillTypeFilter={setSkillTypeFilter}
          setOwningFilter={setOwningFilter}
        />
        <AccordionSection title="Hand">
          {!(currentHand.length > 0) ? (
            <Spinner />
          ) : (
            <CardsContainer>
              {hand.map(card => {
                const {
                  attack,
                  bleeding,
                  name,
                  image,
                  life,
                  paralyzed,
                  poisoned,
                  skill,
                  species,
                  targeteable,
                } = card
                return (
                  <SingleCardContainer>
                    <Card
                      attack={attack}
                      belongsToUser={false}
                      bleeding={bleeding}
                      species={species}
                      image={image}
                      key={name}
                      life={life}
                      opacityForPreview="1"
                      paralyzed={paralyzed}
                      poisoned={poisoned}
                      skill={skill}
                      name={name}
                      targeteable={targeteable}
                    />
                  </SingleCardContainer>
                )
              })}
            </CardsContainer>
          )}
        </AccordionSection>
        <AccordionSection title="Collection">
          {isLoading ? (
            <Spinner />
          ) : cardsToShow.length > 0 ? (
            <CardsContainer>
              {cardsToShow.map(card => {
                const {
                  attack,
                  bleeding,
                  name,
                  image,
                  life,
                  paralyzed,
                  poisoned,
                  skill,
                  species,
                  targeteable,
                  price,
                } = card
                const onPreviewClick =
                  ownedCards.includes(name) && !currentHand.includes(name)
                    ? handleEditHandClick
                    : undefined
                return (
                  <SingleCardContainer>
                    <Card
                      attack={attack}
                      belongsToUser={false}
                      bleeding={bleeding}
                      displayInHandSign={currentHand.includes(name)}
                      species={species}
                      image={image}
                      key={name}
                      life={life}
                      onPreviewClick={onPreviewClick}
                      opacityForPreview={getCardOpacityForPreview(ownedCards, name)}
                      paralyzed={paralyzed}
                      poisoned={poisoned}
                      skill={skill}
                      name={name}
                      targeteable={targeteable}
                    />
                    {!ownedCards.includes(name) && (
                      <BuyButton
                        disabled={state.coins < price}
                        onClick={() => handlePurchaseClick(card)}>
                        <img alt="coins" src="/images/icons/coins.png" width={16} />
                        {price}
                      </BuyButton>
                    )}
                  </SingleCardContainer>
                )
              })}
            </CardsContainer>
          ) : (
            <Message margin="75px 0 0 0">No animals found.</Message>
          )}
        </AccordionSection>
        {modal === "editHand" ? (
          <Modal closeModal={() => setModal("")} withCloseButton={false}>
            <ModalHandEditContent
              closeModal={() => setModal("")}
              hand={hand}
              animalToAdd={animalToAdd!}
              handSetter={setCurrentHand}
            />
          </Modal>
        ) : (
          modal === "cardPurchase" && (
            <Modal closeModal={() => setModal("")} withCloseButton={false}>
              <ModalCardPurchaseContent
                closeModal={() => setModal("")}
                setOwnedCards={setOwnedCards}
                ownedCards={ownedCards}
                animalToBuy={animalToBuy!}
              />
            </Modal>
          )
        )}
      </>
    </MenuLayout>
  )
}

const BuyButton = styled.button`
  align-items: center;
  background: ${({ theme }) => theme.secondary_brown};
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.primary_brown};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  color: ${({ theme }) => theme.primary_yellow};
  display: flex;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  height: 40px;
  left: calc(50% - 40px);
  position: absolute;
  top: calc(50% - 20px);
  transition: all 0.1s linear;
  width: 80px;
  z-index: 1;
  > img {
    margin-right: 4px;
  }
  &:hover:enabled {
    background: ${({ theme }) => theme.primary_brown};
  }
  &:active:enabled {
    box-shadow: none;
  }
  &:disabled {
    background: ${({ theme }) => theme.light_brown};
    color: ${({ theme }) => theme.primary_red};
    cursor: not-allowed;
  }
`

const SingleCardContainer = styled.div`
  position: relative;
  height: 270px;
  margin-bottom: 16px;
  width: calc(20% - 8px);
  > button.card {
    height: 100%;
    width: 100%;
    > .in-hand {
      background: ${({ theme }) => theme.primary_green};
      border-radius: 6px;
      border: 1px solid ${({ theme }) => theme.secondary_brown};
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 12px;
      font-weight: bold;
      height: 32px;
      left: calc(50% - 24px);
      position: absolute;
      text-align: center;
      top: calc(50% - 16px);
      width: 56px;
      z-index: 2;
    }
    &:hover {
      box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
      transform: none;
    }
  }
  ${BREAKPOINTS.MOBILE} {
    width: 93%;
    > button.card {
      height: 180px;
      margin-bottom: 8px;
      width: 19%;
      > .animal-name {
        font-size: 13px;
      }
      > .in-hand {
        font-size: 8px;
      }
    }
  }
`

const CardsContainer = styled.div`
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 60px;
  min-height: 100px;
  padding: 16px 0;
  width: 85%;
`
