import { useEffect, useState } from "react"
import { IAnimal, User } from "../interfaces"
import { sortCardsAlphabetically } from "../utils"
import { getAllAnimalsCards } from "../queries/animalsCards"
import MenuLayout from "../components/MenuLayout"
import Spinner from "../components/Spinner"
import Modal from "../components/Common/Modal"
import ModalHandEditContent from "../components/ModalHandEditContent"
import ModalCardPurchaseContent from "../components/ModalCardPurchaseContent"
import Accordion from "../components/Common/Accordion"
import { useAppSelector } from "../hooks/redux-hooks"
import AllCards from "../components/CollectionCards/AllCards"
import CurrentHand from "../components/CollectionCards/CurrentHand"

export default function Collection() {
  const { hand }: User = useAppSelector(({ auth }) => auth.user)
  const [modal, setModal] = useState<string>("")
  const [cardsToShow, setCardsToShow] = useState<IAnimal[]>([])
  const [allCards, setAllCards] = useState<IAnimal[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [animalToAdd, setAnimalToAdd] = useState<IAnimal>()
  const [animalToBuy, setAnimalToBuy] = useState<IAnimal>()
  const [currentHand, setCurrentHand] = useState<IAnimal[]>([])

  const fetchAllAnimals = async () => {
    setIsLoading(true)
    const allAnimalsRes = await getAllAnimalsCards()
    setIsLoading(false)
    if (allAnimalsRes && !allAnimalsRes.error) {
      const { animals } = allAnimalsRes
      setAllCards(animals)
      setCurrentHand(animals.filter((card: IAnimal) => hand.includes(card.name)))
      setCardsToShow(sortCardsAlphabetically(animals))
    }
  }

  useEffect(() => {
    fetchAllAnimals()
  }, []) //eslint-disable-line

  const handleEditHandModal = (name: string) => {
    setModal("editHand")
    const cardToAdd = allCards.find(card => card.name === name)
    if (!cardToAdd) return
    setAnimalToAdd(cardToAdd)
  }

  const handlePurchaseModal = (card: IAnimal) => {
    setModal("cardPurchase")
    setAnimalToBuy(card)
  }

  return (
    <MenuLayout>
      <>
        <Accordion title="Hand">
          {isLoading ? <Spinner /> : <CurrentHand currentHand={currentHand} />}
        </Accordion>
        <Accordion title="Collection">
          {isLoading ? (
            <Spinner />
          ) : (
            <AllCards
              cardsToShow={cardsToShow}
              handleEditHandModal={handleEditHandModal}
              handlePurchaseModal={handlePurchaseModal}
              setCardsToShow={setCardsToShow}
            />
          )}
        </Accordion>
        {modal === "editHand" ? (
          <Modal closeModal={() => setModal("")} withCloseButton={false}>
            <ModalHandEditContent
              closeModal={() => setModal("")}
              animalToAdd={animalToAdd!}
              currentHand={currentHand}
              setCurrentHand={setCurrentHand}
            />
          </Modal>
        ) : (
          modal === "cardPurchase" && (
            <Modal closeModal={() => setModal("")} withCloseButton={false}>
              <ModalCardPurchaseContent
                closeModal={() => setModal("")}
                animalToBuy={animalToBuy!}
              />
            </Modal>
          )
        )}
      </>
    </MenuLayout>
  )
}
