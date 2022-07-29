import styled from "styled-components"
import { useAppSelector } from "../../hooks/redux-hooks"
import { ITerrain, User } from "../../interfaces"

const TOTAL_LEVELS = 7
interface IProps {
  terrains: ITerrain[]
}
export default function CampaignProgress({ terrains }: IProps) {
  const { xp }: User = useAppSelector(({ auth }) => auth.user)
  const terrain = terrains.find(t => t.campaign_xp.includes(xp))
  const terrainNumber = terrain ? terrains.indexOf(terrain) : 0
  const progress = terrainNumber === 0 ? xp / 1350 : terrainNumber
  const barWidth: number =
    xp === 0 ? 0 : xp > 3600 ? 100 : (progress / TOTAL_LEVELS) * 100

  return (
    <Wrapper>
      <Title>Campaign Progress</Title>
      <ProgressBar barWidth={barWidth}>
        <div></div>
      </ProgressBar>
      <SmallText>
        <b>{barWidth.toFixed(0)} %</b>
      </SmallText>
    </Wrapper>
  )
}

interface ProgressBarProps {
  barWidth?: number
}
const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const ProgressBar = styled.div`
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
    width: ${(p: ProgressBarProps) => p.barWidth}%;
  }
`
const Title = styled.span`
  font-weight: bold;
  font-size: 20px;
`
const SmallText = styled.span`
  font-size: 10px;
`
