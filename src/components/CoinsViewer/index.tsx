import { useSelector } from "react-redux"
import { IUserState } from "../../interfaces"
import { Wrapper } from "./styled"

export default function CoinsViewer() {
  const coins: number = useSelector(({ user }: { user: IUserState }) => user.data.coins)

  return (
    <Wrapper>
      <img alt="coins" src="/images/icons/coins.png" width={24} />
      <span>{coins}</span>
    </Wrapper>
  )
}
