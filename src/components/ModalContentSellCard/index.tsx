import { useState } from "react"
import Card from "../Card"
import { CampaignState, Animal } from "../../interfaces"
import { ACButton } from "../styled-components"
import Spinner from "../Spinner"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { Container, Text, Wrapper } from "./styled"
import { CAMPAIGN_ACTIONS } from "../../redux/reducers/campaign"
import { sellAnimal } from "../../queries/campaign"

interface IProps {
  animalToSell: Animal
  closeModal: () => void
}

export default function ModalContentSellCard({ animalToSell, closeModal }: IProps) {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { owned_animals, id }: CampaignState = useAppSelector(({ campaign }) => campaign)
  const ableToSell = owned_animals.length > 5

  const handleConfirm = async () => {
    setIsLoading(true)
    const saleRes = await sellAnimal(id, animalToSell.id, animalToSell.sell_price)
    setIsLoading(false)
    if (!saleRes || saleRes.error) return
    dispatch(CAMPAIGN_ACTIONS.SET_COINS(saleRes.coins))
    dispatch(
      CAMPAIGN_ACTIONS.SET_OWNED_CARDS(
        owned_animals.filter((animal) => Number(animal.id) !== Number(animalToSell.id))
      )
    )
    closeModal()
  }

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : ableToSell ? (
        <>
          <Text>
            Are you sure you want to sell <b>{animalToSell.name}</b> for{" "}
            <b>{animalToSell.sell_price} coins</b>?
          </Text>
          <Container>
            <Card {...animalToSell} opacityForPreview="1" />
          </Container>
        </>
      ) : (
        <>
          <Text className="remaining-coins">
            You are not able to sell <b>{animalToSell.name}</b> for{" "}
            <b>{animalToSell.sell_price} coins</b>
          </Text>
          <Text className="remaining-coins">
            Remaining owned animals would be lower than a hand size
          </Text>
        </>
      )}
      <ACButton disabled={!ableToSell} $fWeight="bold" onClick={handleConfirm}>
        {isLoading ? "Buying..." : "Confirm"}
      </ACButton>
    </Wrapper>
  )
}
