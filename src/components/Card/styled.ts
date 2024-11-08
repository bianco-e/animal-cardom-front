import styled, { css } from "styled-components"
import { injuryAnimation, missAnimation } from "../../animations/card-animations"
import { BREAKPOINTS } from "../../utils/constants"

interface InjuryProps {
  $animation?: any
}
interface AnimalCardProps {
  $attackAnimation?: any
  $selectionAnimation?: any
  $cursor?: string
  $isCardSelected?: boolean
  $opacity: string
  $habitat?: string
  $width?: string
}
interface TextProps {
  $color?: string
  $fWeight?: string
  $margin?: string
  $lineThrough?: boolean
}
interface FlexSectionProps {
  $mBottom?: string
  $fDirection?: string
}
interface PlantEffectProps {
  $animation?: any
  $fullWidth?: boolean
}

export const PlantEffectImage = styled.img<PlantEffectProps>`
  ${({ $animation }) => css`${$animation}`}
  opacity: 0;
  left: 50%;
  position: absolute;
  top: 3%;
  z-index: 20;
  ${({ $fullWidth }) =>
    $fullWidth
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
  ${({ $attackAnimation }) => $attackAnimation};
  background: ${({ theme }) => theme.secondary_brown};
  background-image: ${({ $habitat }) =>
    `url("/images/backgrounds/${$habitat ? `${$habitat}-` : ""}card-bg.svg")`};
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  cursor: ${({ $cursor }) => $cursor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 280px;
  opacity: ${({ $opacity }) => $opacity};
  overflow: hidden;
  padding: 12px 12px 0 12px;
  position: relative;
  transition: transform 0.25s ease;
  width: ${({ $width = "calc(20% - 24px)" }) => $width};
  &:hover {
    box-shadow: 4px 4px 4px ${({ theme }) => theme.secondary_brown},
      inset 0px 0px 8px black;
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
      $opacity,
      theme: { primary_violet, secondary_violet, light_brown, primary_brown },
    }) =>
      $opacity === "1"
        ? `linear-gradient(90deg, ${primary_violet}, ${light_brown}, ${secondary_violet})`
        : primary_brown};
    z-index: -1;
    ${({ $selectionAnimation }) => $selectionAnimation};
  }
  &::after {
    -webkit-transform: translateX(-50%);
    background: ${({ theme }) => theme.secondary_brown};
    background-image: ${({ $habitat }) =>
      `url("/images/backgrounds/${$habitat ? `${$habitat}-` : ""}card-bg.svg")`};
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
  ${BREAKPOINTS.LG} {
    height: 240px;
    max-width: 200px;
    padding: 8px 8px 0 8px;
    width: calc(20% - 12px);
  }
  ${BREAKPOINTS.MD} {
    height: 220px;
    width: calc(20% - 4px);
  }
  ${BREAKPOINTS.SM} {
    height: 160px;
    max-width: 124px;
    padding: 4px 4px 0 4px;
    width: calc(20% - 2px);
  }
  ${BREAKPOINTS.XS} {
    height: 144px;
  }
`
export const StatsWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  transition: all 0.4s ease;
  width: calc(100% - 32px);
  > div {
    > div.statuses {
      align-items: center;
      display: flex;
      flex-direction: column-reverse;
      position: relative;
      flex: 1;
      > div.tooltip {
        display: none;
      }
      &:hover {
        > div.tooltip {
          display: flex;
        }
      }
    }
  }
  > div.stats-container {
    align-items: center;
    background: ${({ theme }) => theme.light_brown};
    border-radius: 8px 8px 0 0;
    border: 2px solid ${({ theme }) => theme.primary_brown};
    border-bottom: 0;
    box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.4);
    display: flex;
    height: 24px;
    justify-content: center;
    position: relative;
    width: calc(50% - 24px);
    > div.tooltip {
      display: none;
    }
    &:hover {
      > div.tooltip {
        display: flex;
      }
    }
  }
  ${BREAKPOINTS.LG} {
    width: calc(100% - 16px);
    > div.stats-container {
      width: calc(50% - 12px);
    }
  }
  ${BREAKPOINTS.MD} {
    > div.stats-container {
      height: 20px;
      width: calc(50% - 12px);
    }
  }
  ${BREAKPOINTS.SM} {
    width: 100%;
    > div.stats-container {
      height: 16px;
      width: calc(50% - 4px);
    }
  }
`

interface IconContainerProps {
  $placement?: "LEFT" | "CENTER" | "RIGHT"
}

const ICON_CSS = {
  LEFT: css`
    left: -24px;
    right: auto;
  `,
  RIGHT: css`
    left: auto;
    right: -24px;
  `,
  CENTER: css`
    left: calc(50% - 24px);
  `,
}

export const IconContainer = styled.div<IconContainerProps>`
  background: ${({ theme }) => theme.primary_brown};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  font-size: 20px;
  height: 44px;
  position: absolute;
  top: -32px;
  width: 44px;
  > span {
    font-size: 11px;
    line-height: 16px;
    position: absolute;
    left: calc(50% - 6px);
    top: 28px;
  }
  ${({ $placement = "CENTER" }) => ICON_CSS[$placement]};
  ${({ $placement = "CENTER" }) =>
    $placement !== "CENTER"
      ? `
    cursor: help;
    top: -22px;
    > img,
    span {
      top: 22px;
    }
    > img {
      position: absolute;
      right: 6px;
    }
    > span {
      font-size: 12px;
      left: auto;
      right: 26px;
    }
    > div.tooltip {
      display: none;
    }
    &:hover {
      > div.tooltip {
        display: flex;
      }
    }`
      : ""};
  ${BREAKPOINTS.SM} {
    height: 42px;
    width: 42px;
    font-size: 14px;
  }
`
export const Image = styled.img`
  &.blood-drop {
    height: 20px;
    width: 20px;
    ${BREAKPOINTS.SM} {
      height: 17px;
      width: 17px;
    }
  }
  &.animal-picture {
    border-radius: 120px;
    box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.6);
    height: 100px;
    object-fit: cover;
    width: calc(100% - 24px);
    position: relative;
    ${BREAKPOINTS.LG} {
      height: 80px;
    }
    ${BREAKPOINTS.MD} {
      height: 64px;
    }
    ${BREAKPOINTS.SM} {
      height: 36px;
      width: calc(100% - 4px);
    }
  }
  &.small-icon {
    height: 14px;
    margin-right: 4px;
    width: 14px;
    ${BREAKPOINTS.SM} {
      height: 12px;
      margin-right: 0;
      width: 12px;
    }
  }
  &.habitat-icon {
    height: 12px;
    width: 12px;
    ${BREAKPOINTS.MD} {
      height: 10px;
      width: 10px;
    }
    ${BREAKPOINTS.SM} {
      height: 8px;
      width: 8px;
    }
  }
`
export const Text = styled.span<TextProps>`
  &.life-heart {
    font-size: 15px;
    ${BREAKPOINTS.MD} {
      font-size: 12px;
    }
  }
  &.stats {
    margin: 0 4px;
    font-size: 14px;
    ${BREAKPOINTS.MD} {
      font-size: 13px;
    }
    ${BREAKPOINTS.SM} {
      font-size: 12px;
    }
  }
  &.skill {
    font-size: 10px;
    ${BREAKPOINTS.SM} {
      font-size: 8px;
    }
  }
  &.card-sm-name {
    font-size: 8px;
    ${BREAKPOINTS.XS} {
      font-size: 7px;
    }
  }
  &.animal-name {
    font-size: 16px;
    white-space: nowrap;
    ${BREAKPOINTS.LG} {
      margin-top: 8px;
    }
    ${BREAKPOINTS.MD} {
      margin-top: 4px;
    }
    ${BREAKPOINTS.SM} {
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
  color: ${({ $color }) => $color};
  font-weight: ${({ $fWeight = "bold" }) => $fWeight};
  margin: ${({ $margin }) => $margin};
  text-align: center;
  text-decoration: ${({ $lineThrough, theme }) =>
    $lineThrough ? `line-through 2px ${theme.primary_red}` : ""};
`
export const FlexSection = styled.div<FlexSectionProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: ${({ $fDirection }) => $fDirection};
  margin-bottom: ${({ $mBottom }) => $mBottom};
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
  background: ${({ theme }) => theme.light_brown};
  box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.4);
  border: 1px solid ${({ theme }) => theme.primary_brown};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 52px;
  justify-content: flex-start;
  margin-top: 4px;
  overflow: auto;
  padding: 4px;
  width: calc(100% - 24px);

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
  ${BREAKPOINTS.LG} {
    height: 64px;
  }
  ${BREAKPOINTS.MD} {
    height: 60px;
  }
  ${BREAKPOINTS.SM} {
    width: calc(100% - 8px);
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
  ${BREAKPOINTS.SM} {
    > .animal-picture {
      border-radius: 10px;
    }
    height: 60px;
    width: 20%;
  }
`
