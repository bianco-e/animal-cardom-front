import { useRef, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { ITerrain } from "../../interfaces"
import { getAllTerrains } from "../../queries/games"
import CampaignProgress from "./Progress"
import { TerrainContainer, Wrapper } from "./styled"

const firstLevelGames = {
  "450": 1,
  "900": 2,
  "1350": 3,
}

interface IProps {
  xp: number
}
export default function CampaignCircuit({ xp }: IProps) {
  const [containerWidth, setContainerWidth] = useState<number>(200)
  const [terrains, setTerrains] = useState<ITerrain[]>([])

  const ANGLE = terrains.length ? 360 / terrains.length : 0

  const fetchTerrains = async () => {
    const terrainsRes = await getAllTerrains()
    if (terrainsRes && !terrainsRes.error) {
      setTerrains(terrainsRes.terrains)
    }
  }

  useEffect(() => {
    fetchTerrains()
  }, [])

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
      <CampaignProgress terrains={terrains} xp={xp} />
      <Wrapper ref={containerRef}>
        {terrains.map((terrain, idx) => {
          const { image, name, campaign_xp } = terrain
          const terrainXp = !campaign_xp.includes(0)
            ? campaign_xp[0]
            : xp < 1350
            ? xp
            : 900
          const isDisabled = terrainXp > xp
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
              onClick={() => !isDisabled && handleCampaignGame(terrainXp)}
              title={isDisabled ? "Locked" : `${name} terrain`}
            />
          )
        })}
      </Wrapper>
    </>
  )
}
