import { useState } from "react"
import styled from "styled-components"
import Card from "./Card"
import { Animal, CampaignState } from "../interfaces"
import { ACButton } from "./styled-components"
import { updateHand } from "../queries/campaign"
import Spinner from "./Spinner"
import { BREAKPOINTS } from "../utils/constants"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks"
import { CAMPAIGN_ACTIONS } from "../redux/reducers/campaign"
import { parseAnimalsFromDB } from "../utils"

interface IProps {
  animalToAdd: Animal
  closeModal: () => void
  currentHand: Animal[]
  setCurrentHand: (animals: Animal[]) => void
}
export default function ModalHandEditContent({
  animalToAdd,
  closeModal,
  currentHand,
  setCurrentHand,
}: IProps) {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [enteringAnimal, setEnteringAnimal] = useState<Animal>(animalToAdd)
  const [initialHand] = useState(currentHand)
  const { id }: CampaignState = useAppSelector(({ campaign }) => campaign)

  const handleSelection = (id: Animal['id']) => {
    if (!currentHand.find(card => card.id === enteringAnimal.id)) {
      const newHand = currentHand.map(animal => {
        if (animal.id !== id) return animal
        return enteringAnimal
      })
      setEnteringAnimal(currentHand.find(animal => animal.id === id) as Animal)
      setCurrentHand(newHand)
    }
  }

  const handleConfirm = () => {
    const oldHandIds = initialHand.map(animal => Number(animal.id))
    const newHandIds = currentHand.map(animal => Number(animal.id))
    if (!id) return
    setIsLoading(true)
    updateHand(id, oldHandIds, newHandIds).then(res => {
      setIsLoading(false)
      if (res) {
        dispatch(CAMPAIGN_ACTIONS.SET_HAND(parseAnimalsFromDB(res.new_hand)))
        closeModal()
      }
    })
  }

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Container>
            <Card {...enteringAnimal} belongsToUser={false} opacityForPreview="1" />
          </Container>
          <Text>
            Select an animal to switch for <b>{enteringAnimal.name}</b>
          </Text>
          <Container className="current-hand">
            {currentHand.map(card => {
              return (
                <Card
                  {...card}
                  belongsToUser={false}
                  key={card.name}
                  onPreviewClick={handleSelection}
                  opacityForPreview="1"
                />
              )
            })}
          </Container>
        </>
      )}
      <ACButton $fWeight="bold" onClick={handleConfirm}>
        {isLoading ? "Saving..." : "Confirm"}
      </ACButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 5px 30px;
  width: 950px;
  > button {
    margin-top: 30px;
    width: 50%;
  }
`
const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  width: 100%;
  > button {
    cursor: default;
    height: 230px;
    width: 19%;
    > .animal-name {
      font-size: 16px;
    }
    > div > div {
      > span.skill {
        font-size: 10px;
      }
      > img.small-icon {
        height: 12px;
        width: 12px;
      }
    }
    > div > span.skill {
      font-size: 10px;
    }
    &:hover {
      box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
      transform: none;
    }
  }
  ${BREAKPOINTS.MOBILE} {
    > button {
      height: 200px;
      width: 20%;
    }
  }
`
const Text = styled.span`
  margin: 20px 0;
  font-size: 18px;
`
