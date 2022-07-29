import { CardInnerButton } from "../styled"

interface IProps {
  disabled: boolean
  price: number
  onClick: () => void
}

export default function BuyButton({ disabled, price, onClick }: IProps) {
  return (
    <CardInnerButton className="buy" disabled={disabled} onClick={onClick}>
      <img alt="coins" src="/icons/coins.png" width={16} />
      {price}
    </CardInnerButton>
  )
}
