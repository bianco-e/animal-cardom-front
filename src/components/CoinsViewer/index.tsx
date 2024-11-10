import { useAppSelector } from "../../hooks/redux-hooks"
import { CampaignState } from "../../interfaces"
import { Wrapper } from "./styled"

export default function CoinsViewer() {
  const { coins }: CampaignState = useAppSelector(({ campaign }) => campaign)

  return (
    <Wrapper>
      <img alt="coins" src="/icons/coins.png" width={24} />
      <span>{coins}</span>
    </Wrapper>
  )
}
