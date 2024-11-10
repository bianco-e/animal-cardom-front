import styled from "styled-components"
import { useAppSelector } from "../../hooks/redux-hooks"
import { CampaignLevel, CampaignState } from "../../interfaces"
interface IProps {
  campaignLevels: CampaignLevel[]
}

const INITIAL_LEVEL = 1

export default function CampaignProgress({ campaignLevels }: IProps) {
  const { level }: CampaignState = useAppSelector(({ campaign }) => campaign)
  const levelsPassed = campaignLevels.filter(
    campaignLevel => campaignLevel.level_required <= level
  )

  const getBarWidth = (): number => {
    if (level === INITIAL_LEVEL) return 0
    if (level >= campaignLevels.length) return 100
    return (levelsPassed.length / campaignLevels.length) * 100
  }

  return (
    <Wrapper>
      <Title>Campaign Progress</Title>
      <ProgressBar $barWidth={getBarWidth()}>
        <div></div>
      </ProgressBar>
      <SmallText>
        <b>{getBarWidth().toFixed(0)} %</b>
      </SmallText>
    </Wrapper>
  )
}

interface ProgressBarProps {
  $barWidth?: number
}
const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const ProgressBar = styled.div<ProgressBarProps>`
  background: color: none;
  border: 1px solid ${({ theme }) => theme.primary_violet};
  border-radius: 5px;
  height: 15px;
  margin: 10px 0;
  width: 200px;
  > div {
    background-color: ${({ theme }) => theme.primary_violet};
    background-image: ${({ theme }) =>
      `linear-gradient(${theme.primary_violet}, ${theme.secondary_violet})`};
    border-radius: 5px;
    height: 15px;
    transition: all 0.4s ease;
    width: ${props => props.$barWidth}%;
  }
`
const Title = styled.span`
  font-weight: bold;
  font-size: 20px;
`
const SmallText = styled.span`
  font-size: 10px;
`
