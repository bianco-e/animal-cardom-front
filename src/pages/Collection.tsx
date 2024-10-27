import { useEffect, useState } from "react"
import { FiltersData, IAnimal, User } from "../interfaces"
import { parseAnimalsFromDB } from "../utils"
import { getAllAnimals } from "../queries/animalsCards"
import MenuLayout from "../components/MenuLayout"
import Spinner from "../components/Spinner"
import Modal from "../components/Common/Modal"
import ModalHandEditContent from "../components/ModalHandEditContent"
import ModalCardPurchaseContent from "../components/ModalCardPurchaseContent"
import ModalContentSellCard from "../components/ModalContentSellCard"
import Accordion from "../components/Common/Accordion"
import { useAppSelector } from "../hooks/redux-hooks"
import AllCards from "../components/CollectionCards/AllCards"
import CurrentHand from "../components/CollectionCards/CurrentHand"
import { getAllSpecies } from "../queries/species"
import { getAllHabitats } from "../queries/habitats"
import { getAllSkillTypes } from "../queries/skillTypes"

export default function Collection() {
  const { hand }: User = useAppSelector(({ auth }) => auth.user)
  const [modal, setModal] = useState<string>("")
  const [cardsToShow, setCardsToShow] = useState<IAnimal[]>([])
  const [allCards, setAllCards] = useState<IAnimal[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [animalToAdd, setAnimalToAdd] = useState<IAnimal>()
  const [animalToBuy, setAnimalToBuy] = useState<IAnimal>()
  const [animalToSell, setAnimalToSell] = useState<IAnimal>()
  const [currentHand, setCurrentHand] = useState<IAnimal[]>([])
  const [filtersData, setFiltersData] = useState<FiltersData>({ loading: false, species: [], habitats: [], skillTypes: [] })

  const fetchAllAnimals = async () => {
    setIsLoading(true)
    const animalsFromDB = await getAllAnimals()
    setIsLoading(false)
    if (animalsFromDB) {
      const animals = parseAnimalsFromDB(animalsFromDB)
      setAllCards(animals)
      setCurrentHand(animals.filter((card: IAnimal) => hand?.includes(card.name)))
      setCardsToShow(animals)
    }
  }

  const fetchFiltersData = async () => {
    setFiltersData({ ...filtersData, loading: true })
    const [species, habitats, skillTypes] = await Promise.all([
      getAllSpecies(),
      getAllHabitats(),
      getAllSkillTypes(),
    ])
    setFiltersData({
      loading: false,
      species,
      habitats,
      skillTypes,
    })
  }

  useEffect(() => {
    fetchAllAnimals()
    fetchFiltersData()
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

  const handleSellModal = (card: IAnimal) => {
    setModal("cardSell")
    setAnimalToSell(card)
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
              handleSellModal={handleSellModal}
              setCardsToShow={setCardsToShow}
              filtersData={filtersData}
            />
          )}
        </Accordion>
        {modal === "editHand" && animalToAdd ? (
          <Modal closeModal={() => setModal("")}>
            <ModalHandEditContent
              closeModal={() => setModal("")}
              animalToAdd={animalToAdd}
              currentHand={currentHand}
              setCurrentHand={setCurrentHand}
            />
          </Modal>
        ) : null}
        {modal === "cardPurchase" && animalToBuy ? (
          <Modal closeModal={() => setModal("")}>
            <ModalCardPurchaseContent
              closeModal={() => setModal("")}
              animalToBuy={animalToBuy}
            />
          </Modal>
        ) : null}
        {modal === "cardSell" && animalToSell ? (
          <Modal closeModal={() => setModal("")}>
            <ModalContentSellCard
              closeModal={() => setModal("")}
              animalToSell={animalToSell}
            />
          </Modal>
        ) : null}
      </>
    </MenuLayout>
  )
}
