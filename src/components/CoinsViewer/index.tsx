import { useAppSelector } from "../../hooks/redux-hooks"
import { Wrapper } from "./styled"

export default function CoinsViewer() {
  const coins: number = useAppSelector(({ auth }) => auth.user.coins)

  return (
    <Wrapper>
      <img alt="coins" src="/images/icons/coins.png" width={24} />
      <span>{coins}</span>
    </Wrapper>
  )
}
