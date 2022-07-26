import { useRef, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { terrains } from "../../data/data"
import CampaignProgress from "./Progress"
import { TerrainContainer, Wrapper } from "./styled"

const firstLevelGames = {
  "450": 1,
  "900": 2,
  "1350": 3,
}

const ANGLE = 360 / terrains.length
interface IProps {
  xp: number
}
export default function CampaignCircuit({ xp }: IProps) {
  const [containerWidth, setContainerWidth] = useState<number>(200)
  const containerRef = useRef<HTMLDivElement>(null)
  const history = useHistory()

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [containerRef.current]) //eslint-disable-line

  const handleCampaignGame = (xp: number) => history.push(`/game/${xp}`)

  return (
    <>
      <CampaignProgress xp={xp} />
      <Wrapper ref={containerRef}>
        {terrains.map((terrain, idx) => {
          const { image, name, getRequiredXp } = terrain
          const requiredXp = getRequiredXp(xp)
          const isDisabled = requiredXp > xp
          const level = idx + 1
          return (
            <TerrainContainer
              angle={`${ANGLE * idx + 270}`}
              bgImage={image}
              containerWidth={containerWidth}
              disabled={isDisabled}
              games={
                //@ts-ignore
                level === 1 && xp > 0 ? `${firstLevelGames[xp]}/3` : undefined
              }
              key={name}
              level={level}
              onClick={() => !isDisabled && handleCampaignGame(requiredXp)}
              title={isDisabled ? "Locked" : `${name} terrain`}
            />
          )
        })}
      </Wrapper>
    </>
  )
}
