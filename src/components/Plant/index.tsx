import { useState } from "react"
import { IPlant } from "../../interfaces"
import Tooltip from "../Tooltip"
import { selectionAnimation } from "../../animations/card-animations"
import { PlantCard, PlantContainer } from "./styled"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { selectPlant } from "../../redux/actions/game"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import { MD_BREAKPOINT } from "../../utils/constants"
import { TooltipDirection } from "../Tooltip/styled"

const OFFENSIVE_USE_TYPE = 3

export default function Plant({ plant }: { plant: IPlant }) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const game = useAppSelector(({ game }) => game)
  const { selectedPlant, pcTurn, usedPlants, plants } = game
  const { name, description, use_type_id } = plant
  const isPlantSelected = selectedPlant?.name === name
  const plantBelongsToUser = !!plants.user.find((pl: IPlant) => pl.name === name)
  const onPlantClick = () => {
    //@ts-ignore
    if (!pcTurn && !usedPlants.includes(plant)) return dispatch(selectPlant(plant))
  }

  const dimensions = useWindowDimensions()
  const isPlantsPanelOnLeft = dimensions && dimensions.width > MD_BREAKPOINT
  const getTooltipDirection = (): TooltipDirection => {
    if (isPlantsPanelOnLeft) {
      return plantBelongsToUser ? TooltipDirection.TOP : TooltipDirection.BOTTOM
    } else return TooltipDirection.BOTTOM
  }

  return (
    <PlantContainer>
      {showTooltip && (
        <Tooltip
          title={`Appliable on ${
            use_type_id === OFFENSIVE_USE_TYPE ? "enemies" : "allies"
          }`}
          description={description}
          direction={getTooltipDirection()}
        />
      )}
      <PlantCard
        onClick={onPlantClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        $opacity={usedPlants.includes(plant) ? "0.6" : "1"}
        $belongsToUser={plantBelongsToUser}
        $selectionAnimation={isPlantSelected && selectionAnimation}
        $transform={isPlantSelected ? "scale(1.1);" : ""}>
        <span className="spaced-title">{name}</span>
        <img alt={name} src={`/images/plants/${name.toLowerCase()}.webp`} />
      </PlantCard>
    </PlantContainer>
  )
}
