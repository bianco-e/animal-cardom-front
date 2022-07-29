import { CardBuyButton } from "../../Card/styled"

interface IProps {
  disabled: boolean
  price: number
  onClick: () => void
}

export default function BuyButton({ disabled, price, onClick }: IProps) {
  return (
    <CardBuyButton disabled={disabled} onClick={onClick}>
      <img alt="coins" src="/images/icons/coins.png" width={16} />
      {price}
    </CardBuyButton>
  )
}
