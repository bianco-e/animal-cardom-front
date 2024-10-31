import { useRef, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../hooks/redux-hooks"
import { CampaignLevel, CampaignState } from "../../interfaces"
import CampaignProgress from "./Progress"
import { CampaignLevelContainer, Wrapper } from "./styled"
import { getAllCampaignLevels } from "../../queries/campaign"

export default function CampaignCircuit() {
  const [containerWidth, setContainerWidth] = useState<number>(200)
  const [campaignLevels, setCampaignLevels] = useState<CampaignLevel[]>([])
  const { level }: CampaignState = useAppSelector(({ campaign }) => campaign)

  const ANGLE = campaignLevels.length ? 360 / campaignLevels.length : 0

  const fetchCampaignLevels = async () => {
    const allCampaignLevels = await getAllCampaignLevels()
    setCampaignLevels(allCampaignLevels)
  }

  useEffect(() => {
    fetchCampaignLevels()
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [containerRef.current]) //eslint-disable-line

  const handleCampaignGame = (level: number) => navigate(`/campaign/level/${level}`)

  return (
    <>
      <CampaignProgress campaignLevels={campaignLevels} />
      <Wrapper ref={containerRef}>
        {campaignLevels.map((campaignLevel, idx) => {
          const { level_required, id, habitat_name } = campaignLevel
          const isDisabled = level_required > level
          return (
            <CampaignLevelContainer
              $angle={`${ANGLE * idx + 270}`}
              $bgImage={`/images/habitats/${habitat_name.toLowerCase()}.webp`}
              $containerWidth={containerWidth}
              $disabled={isDisabled}
              key={id}
              $level={id}
              onClick={() => !isDisabled && handleCampaignGame(id)}
              title={isDisabled ? "Locked" : `${habitat_name} habitat`}
            />
          )
        })}
      </Wrapper>
    </>
  )
}
