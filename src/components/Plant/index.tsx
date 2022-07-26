import { useContext, useState } from "react"
import HandsContext from "../../context/HandsContext"
import { SELECT_PLANT } from "../../context/HandsContext/types"
import { IPlant } from "../../interfaces"
import Tooltip from "../Tooltip"
import { selectionAnimation } from "../../animations/card-animations"
import { PlantCard, PlantContainer } from "./styled"

export default function Plant({ plant }: { plant: IPlant }) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const [state, dispatch] = useContext(HandsContext)
  const { selectedPlant, pcTurn, usedPlants, plants } = state
  const { name, description, image, appliable_on } = plant
  const isPlantSelected = selectedPlant?.name === name
  const plantBelongsToUser = !!plants.user.find((pl: IPlant) => pl.name === name)
  const onPlantClick = () =>
    !pcTurn && !usedPlants.includes(plant) && dispatch({ type: SELECT_PLANT, plant })

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
