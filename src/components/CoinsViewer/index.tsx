import { Wrapper } from "./styled"

interface IProps {
  coins?: number
}

export default function CoinsViewer({ coins }: IProps) {
  return (
    <Wrapper>
      <img alt="coins" src="/images/icons/coins.png" width={24} />
      <span>{coins && coins}</span>
    </Wrapper>
  )
}
