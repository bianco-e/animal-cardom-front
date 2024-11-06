import { useState } from "react"
import styled from "styled-components"
import Card from "./Card"
import { CampaignState, Animal } from "../interfaces"
import { ACButton } from "./styled-components"
import { buyAnimal } from "../queries/campaign"
import Spinner from "./Spinner"
import { BREAKPOINTS } from "../utils/constants"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks"
import { CAMPAIGN_ACTIONS } from "../redux/reducers/campaign"

interface IProps {
  animalToBuy: Animal
  closeModal: () => void
}
export default function ModalCardPurchaseContent({ animalToBuy, closeModal }: IProps) {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { owned_animals, id }: CampaignState = useAppSelector(({ campaign }) => campaign)

  const handleConfirm = () => {
    setIsLoading(true)
    buyAnimal(animalToBuy.id, id).then(res => {
      if (res) {
        dispatch(CAMPAIGN_ACTIONS.SET_COINS(res.coins))
        dispatch(CAMPAIGN_ACTIONS.SET_OWNED_CARDS(owned_animals.concat(res.animal)))
        closeModal()
      }
      setIsLoading(false)
    })
  }

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Text>
            You are about to spend <b>{animalToBuy.price} coins</b> to buy{" "}
            <b>{animalToBuy.name}</b>
          </Text>
          <Container>
            <Card {...animalToBuy} opacityForPreview="1" />
          </Container>
        </>
      )}
      <ACButton $fWeight="bold" onClick={handleConfirm}>
        {isLoading ? "Buying..." : "Confirm"}
      </ACButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 5px 30px;
  width: 600px;
  > button {
    margin-top: 30px;
    width: 50%;
  }
`
const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  width: 100%;
  > button {
    cursor: default;
    height: 270px;
    width: 220px;
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

  ${BREAKPOINTS.SM} {
    > button {
      height: 200px;
      width: 20%;
    }
  }
`
const Text = styled.span`
  font-size: 18px;
`
