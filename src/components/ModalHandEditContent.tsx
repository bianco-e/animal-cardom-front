import { useState } from "react"
import styled from "styled-components"
import Card from "./Card"
import { IAnimal, User } from "../interfaces"
import { ACButton } from "./styled-components"
import { updateHand } from "../queries/user"
import Spinner from "./Spinner"
import { BREAKPOINTS } from "../utils/constants"
import { useAppSelector } from "../hooks/redux-hooks"

interface IProps {
  hand: IAnimal[]
  animalToAdd: IAnimal
  closeModal: () => void
  handSetter: (newHand: string[]) => void
}
export default function ModalHandEditContent({
  animalToAdd,
  closeModal,
  hand,
  handSetter,
}: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentHand, setCurrentHand] = useState<IAnimal[]>(hand)
  const [enteringAnimal, setEnteringAnimal] = useState<IAnimal>(animalToAdd)
  const user: User = useAppSelector(({ auth }) => auth.user)
  const { auth_id: authId } = user

  const handleSelection = (name: string) => {
    if (!currentHand.find(card => card.name === enteringAnimal.name)) {
      const newHand = currentHand.map(card => {
        if (card.name === name) {
          return enteringAnimal
        } else return card
      })
      setEnteringAnimal(currentHand.find(card => card.name === name)!)
      setCurrentHand(newHand)
    }
  }

  const handleConfirm = () => {
    const handNames = currentHand.map(card => card.name)
    if (!authId) return
    setIsLoading(true)
    updateHand(authId, handNames).then(res => {
      if (res && res.length) {
        setIsLoading(false)
        handSetter(res)
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
      <ACButton fWeight="bold" onClick={handleConfirm}>
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
