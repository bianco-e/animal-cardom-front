import { useState } from "react"
import { IPlant } from "../../interfaces"
import Tooltip from "../Tooltip"
import { selectionAnimation } from "../../animations/card-animations"
import { PlantCard, PlantContainer } from "./styled"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { selectPlant } from "../../redux/actions/game"

export default function Plant({ plant }: { plant: IPlant }) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const game = useAppSelector(({ game }) => game)
  const { selectedPlant, pcTurn, usedPlants, plants } = game
  const { name, description, image, appliable_on } = plant
  const isPlantSelected = selectedPlant?.name === name
  const plantBelongsToUser = !!plants.user.find((pl: IPlant) => pl.name === name)
  const onPlantClick = () => {
    //@ts-ignore
    if (!pcTurn && !usedPlants.includes(plant)) return dispatch(selectPlant(plant))
  }

  return (
    <PlantContainer>
      {showTooltip && (
        <Tooltip
          title={`Appliable on ${appliable_on}`}
          description={description}
          direction={plantBelongsToUser ? "TOP" : "BOTTOM"}
        />
      )}
      <PlantCard
        onClick={onPlantClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        opacity={usedPlants.includes(plant) ? "0.6" : "1"}
        belongsToUser={plantBelongsToUser}
        selectionAnimation={isPlantSelected && selectionAnimation}
        transform={isPlantSelected ? "scale(1.1);" : ""}>
        <span className="spaced-title">{name}</span>
        <img alt={name} src={image} />
      </PlantCard>
    </PlantContainer>
  )
}
