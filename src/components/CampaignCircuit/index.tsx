import { useRef, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useAppSelector } from "../../hooks/redux-hooks"
import { IHabitat, User } from "../../interfaces"
import { getAllHabitats } from "../../queries/habitats"
import CampaignProgress from "./Progress"
import { HabitatContainer, Wrapper } from "./styled"

const firstLevelGames: { [x: number]: number } = {
  450: 1,
  900: 2,
  1350: 3,
}

export default function CampaignCircuit() {
  const [containerWidth, setContainerWidth] = useState<number>(200)
  const [habitats, setHabitats] = useState<IHabitat[]>([])
  const { xp }: User = useAppSelector(({ auth }) => auth.user)

  const ANGLE = habitats.length ? 360 / habitats.length : 0

  const fetchHabitats = async () => {
    const allHabitats = await getAllHabitats()
    setHabitats(allHabitats)
  }

  useEffect(() => {
    fetchHabitats()
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
      <CampaignProgress habitats={habitats} />
      <Wrapper ref={containerRef}>
        {habitats.map((habitat, idx) => {
          const { name, campaign_xp } = habitat
          const habitatXp = !campaign_xp.includes(0)
            ? campaign_xp[0]
            : xp < 1350
            ? xp
            : 900
          const isDisabled = habitatXp > xp
          const level = idx + 1
          return (
            <HabitatContainer
              angle={`${ANGLE * idx + 270}`}
              bgImage={`/images/terrains/${habitat.name.toLowerCase()}.webp`}
              containerWidth={containerWidth}
              disabled={isDisabled}
              games={level === 1 ? getGames() : undefined}
              key={name}
              level={level}
              onClick={() => !isDisabled && handleCampaignGame(habitatXp)}
              title={isDisabled ? "Locked" : `${name} habitat`}
            />
          )
        })}
      </Wrapper>
    </>
  )
}
