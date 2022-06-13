import { useContext, useState } from "react";
import styled from "styled-components";
import HandsContext from "../context/HandsContext";
import { SELECT_PLANT } from "../context/HandsContext/types";
import { IPlant } from "../interfaces";
import { BREAKPOINTS } from "../utils/constants";
import Tooltip from "./Tooltip";
import { selectionAnimation } from "../animations/card-animations";

export default function Plant({ plant }: { plant: IPlant }) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [state, dispatch] = useContext(HandsContext);
  const { selectedPlant, pcTurn, usedPlants, plants } = state;
  const { name, description, image, appliable_on } = plant;
  const isPlantSelected = selectedPlant?.name === name;
  const plantBelongsToUser = !!plants.user.find(
    (pl: IPlant) => pl.name === name
  );
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
        onClick={() => {
          !pcTurn &&
            !usedPlants.includes(plant) &&
            dispatch({ type: SELECT_PLANT, plant });
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        opacity={usedPlants.includes(plant) ? "0.6" : "1"}
        belongsToUser={plantBelongsToUser}
        selectionAnimation={isPlantSelected && selectionAnimation}
        transform={isPlantSelected ? "scale(1.1);" : ""}
      >
        <span className="spaced-title">{name}</span>
        <img alt={name} src={image} />
      </PlantCard>
    </PlantContainer>
  );
}

interface PlantCardProps {
  selectionAnimation?: any;
  opacity?: string;
  isPlantSelected?: boolean;
  transform?: string;
  belongsToUser?: boolean;
}

const PlantContainer = styled.div`
  height: 25%;
  margin: 0 auto 8%;
  position: relative;
  width: 75%;
  ${BREAKPOINTS.TABLET} {
    height: 100%;
    width: 56px;
  }
`;

export const PlantCard = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.primary_brown};
  border-radius: 4px;
  box-shadow: inset 0px 0px 2px black;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  max-width: 64px;
  min-height: 45px;
  opacity: ${(p: PlantCardProps) => p.opacity};
  overflow: hidden;
  padding: 3px 3px 5px;
  transform: ${(p: PlantCardProps) => p.transform};
  transition: transform 0.2s ease;
  width: 100%;
  > img {
    border-radius: 4px;
    height: 80%;
    width: 85%;
  }
  > span {
    font-size: 8px;
    margin: 2px 0;
  }
  &:hover {
    ${({ theme }) => `
    box-shadow: 4px 4px 4px ${theme.secondary_brown}, inset 0px 0px 5px black;
    transform: scale(1.08);
    `};
  }
  &:active {
    box-shadow: inset 0px 0px 20px black;
  }
  &::before {
    background: ${(p: PlantCardProps) =>
      p.opacity === "1" && p.belongsToUser
        ? "linear-gradient(90deg, #5f0a87, #e3cdac, #a4508b)"
        : "none"};
    background-size: 300% 300%;
    content: "";
    height: 165%;
    left: 50%;
    margin-left: -25%;
    margin-top: -85%;
    position: absolute;
    top: 50%;
    width: 50%;
    z-index: -2;
    ${(p: PlantCardProps) => p.selectionAnimation};
  }
  &::after {
    background-size: 300% 300%;
    background: ${({ theme }) => theme.primary_brown};
    border-radius: 4px;
    content: "";
    height: calc(100% - 6px);
    left: 50%;
    position: absolute;
    top: 3px;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    width: ${(p: PlantCardProps) =>
      p.opacity === "1" ? "calc(100% - 6px);" : "auto"};
    z-index: -1;
  }
`;
