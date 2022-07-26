import styled from "styled-components"
import { BREAKPOINTS } from "../../utils/constants"

interface PlantCardProps {
  selectionAnimation?: any
  opacity?: string
  isPlantSelected?: boolean
  transform?: string
  belongsToUser?: boolean
}

export const PlantContainer = styled.div`
  height: 25%;
  margin: 0 auto 8%;
  position: relative;
  width: 75%;
  ${BREAKPOINTS.TABLET} {
    height: 100%;
    width: 56px;
  }
`

export const PlantCard = styled.button<PlantCardProps>`
  align-items: center;
  background-color: ${({ theme }) => theme.primary_brown};
  border-radius: 4px;
  box-shadow: inset 0px 0px 2px black;
  cursor: ${({ belongsToUser }) => (belongsToUser ? "pointer" : "default")};
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  max-width: 64px;
  min-height: 45px;
  opacity: ${({ opacity }) => opacity};
  overflow: hidden;
  padding: 3px 3px 5px;
  transform: ${({ transform }) => transform};
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
    background: ${({
      opacity,
      belongsToUser,
      theme: { primary_violet, secondary_violet, light_brown },
    }) =>
      opacity === "1" && belongsToUser
        ? `linear-gradient(90deg, ${primary_violet}, ${light_brown}, ${secondary_violet})`
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
    ${({ selectionAnimation }) => selectionAnimation};
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
    width: ${({ opacity }) => (opacity === "1" ? "calc(100% - 6px);" : "auto")};
    z-index: -1;
  }
`
export const PlantThumbnail = styled(PlantCard)`
  cursor: default;
  height: 55px;
  width: 60px;
  > span {
    font-size: 8px;
    margin-bottom: 2px;
  }
  > img {
    height: 32px;
    width: 35px;
  }
  &:hover {
    box-shadow: inset 0px 0px 2px black;
    transform: none;
  }
`
