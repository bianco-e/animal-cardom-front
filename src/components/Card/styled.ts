import styled from "styled-components"
import { injuryAnimation, missAnimation } from "../../animations/card-animations"
import { BREAKPOINTS } from "../../utils/constants"

interface InjuryProps {
  animation?: any
}
interface AnimalCardProps {
  attackAnimation?: any
  selectionAnimation?: any
  cursor?: string
  isCardSelected?: boolean
  isParalyzed?: boolean
  opacity: string
  transform?: string
  width?: string
}
interface TextProps {
  color?: string
  fWeight?: string
  margin?: string
  lineThrough?: boolean
}
interface FlexSectionProps {
  mBottom?: string
}
interface PlantEffectProps {
  animation?: any
  fullWidth?: boolean
}

export const PlantEffectImage = styled.img<PlantEffectProps>`
  ${({ animation }) => animation};
  opacity: 0;
  left: 50%;
  position: absolute;
  top: 3%;
  z-index: 20;
  ${({ fullWidth }) =>
    fullWidth
      ? `
      margin-left: -50%;
      width: 100%;
      `
      : `
      margin-left: -70px;
      width: 140px;
      `}
`

export const Injury = styled.img<InjuryProps>`
  ${injuryAnimation};
  display: flex;
  justify-content: flex-start;
  position: absolute;
  left: 50%;
  opacity: 0;
  top: 4%;
  transition: all 0.4s ease;
  -webkit-transform: translateX(-50%) rotate(60deg);
  z-index: 20;
  transform: translateX(-50%) rotate(60deg);
  width: 35%;
`
export const AnimalCard = styled.button<AnimalCardProps>`
  align-items: center;
  ${({ attackAnimation }) => attackAnimation};
  background: ${({ theme }) => theme.primary_brown};
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  cursor: ${({ cursor }) => cursor};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  opacity: ${({ opacity }) => opacity};
  overflow: hidden;
  padding: 12px;
  position: relative;
  transition: transform 0.15s ease;
  width: ${({ width = "calc(20% - 32px)" }) => width};
  &:hover {
    box-shadow: 4px 4px 4px ${({ theme }) => theme.secondary_brown},
      inset 0px 0px 8px black;
    transform: ${({ transform }) => transform};
  }
  &:active {
    box-shadow: inset 0px 0px 16px black;
  }
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    height: 210%;
    width: 35%;
    background: ${({
      opacity,
      theme: { primary_violet, secondary_violet, light_brown },
    }) =>
      opacity === "1"
        ? `linear-gradient(90deg, ${primary_violet}, ${light_brown}, ${secondary_violet})`
        : "none"};
    z-index: -2;
    background-size: 300% 300%;
    ${({ selectionAnimation }) => selectionAnimation};
  }
  &::after {
    -webkit-transform: translateX(-50%);
    background-size: 300% 300%;
    background: ${({ theme }) => theme.primary_brown};
    border-radius: 4px;
    content: "";
    height: calc(100% - 8px);
    left: 50%;
    position: absolute;
    top: 4px;
    transform: translateX(-50%);
    width: calc(100% - 8px);
    z-index: -1;
  }
  ${({ isCardSelected, transform }) =>
    isCardSelected &&
    `
      transform: ${transform};
    `}
  ${BREAKPOINTS.TABLET} {
    max-width: 170px;
    padding: 9px;
  }
  ${BREAKPOINTS.MOBILE} {
    max-width: 125px;
    padding: 6px;
    width: calc(20% - 4px);
  }
`
export const StatsWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 10%;
  transition: all 0.4s ease;
  width: 80%;
  bottom: 0;
  > div {
    > div.tooltip {
      display: none;
    }
    &:hover {
      > div.tooltip {
        display: flex;
      }
    }
  }
  > div.statuses {
    align-items: center;
    border-radius: 4px 4px 0 0;
    display: flex;
    flex-direction: column-reverse;
    padding: 4px;
    position: relative;
    flex: 1;
  }
  > div.stats-container {
    align-items: center;
    background: ${({ theme }) => theme.primary_brown};
    border-radius: 8px 8px 0 0;
    border: 2px solid ${({ theme }) => theme.secondary_brown};
    border-bottom: 0;
    box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.4);
    display: flex;
    height: 36px;
    justify-content: center;
    position: relative;
    width: calc(50% - 24px);
  }
  ${BREAKPOINTS.MOBILE} {
    left: 5%;
    width: 90%;
    > div.stats-container {
      height: 20px;
      width: calc(50% - 10px);
    }
  }
`

export const CornerIconContainer = styled.div`
  background: ${({ theme }) => theme.primary_brown};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  font-size: 20px;
  height: 48px;
  left: -24px;
  position: absolute;
  top: -24px;
  width: 48px;
  > span {
    font-size: 12px;
    line-height: 16px;
    position: absolute;
    left: 28px;
    top: 24px;
  }
  &.animal-condition {
    > img,
    span {
      cursor: help;
    }
    left: auto;
    right: -24px;
    > img {
      position: absolute;
      right: 24px;
      top: 24px;
    }
    > span {
      left: auto;
      right: 24px;
      top: 24px;
    }
    > div.tooltip {
      display: none;
    }
    &:hover {
      > div.tooltip {
        display: flex;
      }
    }
  }
  ${BREAKPOINTS.MOBILE} {
    font-size: 16px;
  }
`
export const Image = styled.img`
  &.blood-drop {
    height: 20px;
    width: 20px;
    ${BREAKPOINTS.MOBILE} {
      height: 17px;
      width: 17px;
    }
  }
  &.animal-picture {
    border-radius: 120px;
    box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.6);
    height: 45%;
    margin: 4px 0;
    object-fit: cover;
    width: 80%;
    position: relative;
    ${BREAKPOINTS.MOBILE} {
      height: 36%;
    }
  }
  &.small-icon {
    height: 16px;
    margin-right: 4px;
    width: 16px;
    ${BREAKPOINTS.MOBILE} {
      height: 12px;
      width: 12px;
    }
  }
`
export const Text = styled.span<TextProps>`
  &.life-heart {
    font-size: 15px;
    ${BREAKPOINTS.TABLET} {
      font-size: 12px;
    }
  }
  &.stats {
    margin: 0 4px;
    font-size: 14px;
    ${BREAKPOINTS.TABLET} {
      font-size: 13px;
    }
    ${BREAKPOINTS.MOBILE} {
      font-size: 12px;
    }
  }
  &.skill {
    font-size: 10px;
    ${BREAKPOINTS.MOBILE} {
      font-size: 8px;
    }
  }
  &.skill-name {
    font-size: 8px;
  }
  &.animal-name {
    font-size: 16px;
    white-space: nowrap;
    ${BREAKPOINTS.MOBILE} {
      font-size: 12px;
    }
  }
  &.miss-msg {
    ${missAnimation}
    color: ${({ theme }) => theme.primary_red};
    font-size: 32px;
    position: absolute;
    z-index: 2;
  }
  color: ${({ color }) => color};
  font-weight: ${({ fWeight = "bold" }) => fWeight};
  margin: ${({ margin }) => margin};
  text-align: center;
  text-decoration: ${({ lineThrough, theme }) =>
    lineThrough ? `line-through 2px ${theme.primary_red}` : ""};
`
export const FlexSection = styled.div<FlexSectionProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: ${({ mBottom }) => mBottom};
  position: relative;
  > span.paralyzed {
    color: ${({ theme }) => theme.primary_red};
    font-size: 12px;
    font-weight: bold;
    margin-left: 4px;
  }
`
export const DescriptionContainer = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.secondary_brown};
  border-radius: 5px;
  box-shadow: inset 0px 0px 10px ${({ theme }) => theme.light_brown};
  display: flex;
  flex-direction: column;
  height: 28%;
  justify-content: flex-start;
  margin: 4px 0 30px 0;
  overflow: auto;
  padding: 5px;
  width: 85%;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 0 5px 5px 0;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.light_brown};
    border-radius: 0 5px 5px 0;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.secondary_brown};
  }
`
export const CardThumbnail = styled(AnimalCard)`
  cursor: default;
  height: 80px;
  width: calc(20% - 8px);
  > .animal-name {
    font-size: 8px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  > .animal-picture {
    border-radius: 16px;
    height: 32px;
    width: 95%;
  }
  &:hover {
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  }
  ${BREAKPOINTS.MOBILE} {
    > .animal-picture {
      border-radius: 10px;
    }
    height: 60px;
    width: 20%;
  }
`
