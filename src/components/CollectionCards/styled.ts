import styled from "styled-components"
import { BREAKPOINTS } from "../../utils/constants"

export const SingleCardContainer = styled.div`
  position: relative;
  height: 270px;
  margin-bottom: 16px;
  width: calc(20% - 8px);
  > button.card {
    height: 100%;
    width: 100%;
    &:hover {
      box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
      transform: none;
    }
  }
  ${BREAKPOINTS.MOBILE} {
    width: 93%;
    > button.card {
      height: 180px;
      margin-bottom: 8px;
      width: 19%;
      > .animal-name {
        font-size: 13px;
      }
    }
  }
`

export const CardsContainer = styled.div`
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 44px;
  min-height: 100px;
  padding: 16px 0;
  width: 85%;
`

export const CardInnerButton = styled.button`
  align-items: center;
  background: ${({ theme }) => theme.secondary_brown};
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.primary_brown};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  color: ${({ theme }) => theme.primary_yellow};
  display: flex;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  height: 40px;
  left: calc(50% - 36px);
  position: absolute;
  top: calc(50% - 20px);
  transition: all 0.1s linear;
  width: 72px;
  z-index: 1;
  font-size: 10px;
  &.buy {
    font-size: 14px;
  }
  &.add {
    color: ${({ theme }) => theme.primary_green};
    left: calc(50% - 80px);
  }
  &.sell {
    left: calc(50% + 8px);
  }
  > img {
    margin-right: 4px;
  }
  &:hover:enabled {
    background: ${({ theme }) => theme.primary_brown};
  }
  &:active:enabled {
    box-shadow: none;
  }
  &:disabled {
    background: ${({ theme }) => theme.light_brown};
    color: ${({ theme }) => theme.primary_red};
    cursor: not-allowed;
    &.in-hand {
      color: ${({ theme }) => theme.primary_brown};
    }
  }
`
