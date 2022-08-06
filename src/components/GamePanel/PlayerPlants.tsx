import { IPlant } from "../../interfaces"
import Plant from "../Plant"
import { Text } from "../styled-components"
import { HalfPanel, PlayerNameTab } from "./styled"

interface IProps {
  name: string
  plants: IPlant[]
}

export default function PlayerPlants({ name, plants }: IProps) {
  return (
    <HalfPanel>
      <Text fSize="18px" fWeight="bold" padding="5px">
        {name}
      </Text>
      <PlayerNameTab>{name}</PlayerNameTab>
      {plants.map((plant: IPlant) => (
        <Plant plant={plant} key={plant.name} />
      ))}
    </HalfPanel>
  )
}
