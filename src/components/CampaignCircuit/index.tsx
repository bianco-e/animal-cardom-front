import { useRef, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useAppSelector } from "../../hooks/redux-hooks"
import { ITerrain, User } from "../../interfaces"
import { getAllTerrains } from "../../queries/games"
import CampaignProgress from "./Progress"
import { TerrainContainer, Wrapper } from "./styled"

const firstLevelGames: { [x: number]: number } = {
  450: 1,
  900: 2,
  1350: 3,
}

export default function CampaignCircuit() {
  const [containerWidth, setContainerWidth] = useState<number>(200)
  const [terrains, setTerrains] = useState<ITerrain[]>([])
  const { xp }: User = useAppSelector(({ auth }) => auth.user)

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

  const getGames = () => {
    if (firstLevelGames[xp]) return `${firstLevelGames[xp]}/3`
    return xp > 1350 ? "3/3" : undefined
  }

  return (
    <>
      <CampaignProgress terrains={terrains} />
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
              games={level === 1 ? getGames() : undefined}
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
