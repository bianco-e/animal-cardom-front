import { CardInnerButton } from "../styled"

interface IProps {
  onClick: () => void
}

export default function AddSellButtons({ onClick }: IProps) {
  return (
    <CardInnerButton className="sell spaced-title" onClick={onClick}>
      <img alt="coins" src="/icons/coins.png" width={16} />
      SELL
    </CardInnerButton>
  )
}
