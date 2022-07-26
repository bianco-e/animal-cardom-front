import styled from "styled-components"
import { BREAKPOINTS } from "../../utils/constants"

interface TerrainContainerProps {
  angle?: string
  bgImage?: string
  containerWidth: number
  disabled?: boolean
  games?: string
  level?: number
}

export const Wrapper = styled.div`
  height: 420px;
  margin: 100px auto 0;
  position: relative;
  width: 420px;
  ${BREAKPOINTS.MOBILE} {
    margin: 90px auto 0;
    height: 270px;
    width: 270px;
  }
`
export const TerrainContainer = styled.div<TerrainContainerProps>`
  align-items: center;
  background-image: ${({ bgImage }) => `url('${bgImage}')`};
  background-position: center;
  background-size: cover;
  border-radius: 100%;
  box-shadow: 0 0 40px 10px rgba(0, 0, 0, 0.5), 0 0 40px 10px rgba(0, 0, 0, 0.5),
    0 0 40px 10px rgba(0, 0, 0, 0.5), 0 0 40px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 130px;
  justify-content: space-between;
  left: calc(50% - 65px);
  position: absolute;
  top: calc(50% - 65px);
  transform: ${({ angle, containerWidth }) =>
    `rotate(${angle}deg) translate(${containerWidth / 2}px) rotate(-${angle}deg)`};
  width: 130px;
  ${({ games, theme }) =>
    games
      ? `
    &:after {
      align-items: center;
      background: ${theme.primary_brown};
      border-radius: 5px;
      box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
      content: "${games}";
      display: flex;
      font-size: 9px;
      font-weight: bold;
      height: 8px;
      justify-content: center;
      padding: 4px;
      width: 24px;
    }
    `
      : ""};
  &:before {
    align-items: center;
    background: ${({ theme }) => theme.primary_brown};
    border-radius: 5px;
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
    content: "${({ level }) => level}";
    display: flex;
    font-size: 9px;
    font-weight: bold;
    height: 8px;
    justify-content: center;
    padding: 4px;
    width: 20px;
  }
  ${BREAKPOINTS.MOBILE} {
    height: 80px;
    left: calc(50% - 40px);
    width: 80px;
    top: calc(50% - 40px);
  }
  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.5;
      cursor: default;
    `}
`
