import { useState } from "react"
import Card from "../Card"
import { IAnimal, User } from "../../interfaces"
import { ACButton } from "../styled-components"
import { animalSell } from "../../queries/user"
import Spinner from "../Spinner"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { AUTH_ACTIONS } from "../../redux/reducers/auth"
import { Container, Text, Wrapper } from "./styled"

interface IProps {
  animalToSell: IAnimal
  closeModal: () => void
}

export default function ModalContentSellCard({ animalToSell, closeModal }: IProps) {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user: User = useAppSelector(({ auth }) => auth.user)
  const { owned_cards: ownedCards, coins, auth_id: authId } = user
  const ableToSell = ownedCards.length > 5

  const handleConfirm = async () => {
    setIsLoading(true)
    const saleRes = await animalSell(authId, animalToSell.name)
    setIsLoading(false)
    if (!saleRes || saleRes.error) return
    dispatch(AUTH_ACTIONS.SET_COINS(saleRes.current_coins))
    dispatch(
      AUTH_ACTIONS.SET_OWNED_CARDS(
        ownedCards.filter((name: string) => name !== animalToSell.name)
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
          <Text className="remaining-coins">
            After selling it you will have <b>{coins + animalToSell.sell_price} coins</b>
          </Text>
          <Container>
            <Card {...animalToSell} opacityForPreview="1" />
          </Container>
          <Text className="remaining-coins">
            You can get it back whenever you want for <b>{animalToSell.price} coins</b>
          </Text>
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
      <ACButton disabled={!ableToSell} fWeight="bold" onClick={handleConfirm}>
        {isLoading ? "Buying..." : "Confirm"}
      </ACButton>
    </Wrapper>
  )
}
