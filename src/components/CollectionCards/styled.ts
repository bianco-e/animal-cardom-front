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
    > .in-hand {
      background: ${({ theme }) => theme.primary_green};
      border-radius: 6px;
      border: 1px solid ${({ theme }) => theme.secondary_brown};
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 12px;
      font-weight: bold;
      height: 32px;
      left: calc(50% - 24px);
      position: absolute;
      text-align: center;
      top: calc(50% - 16px);
      width: 56px;
      z-index: 2;
    }
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
      > .in-hand {
        font-size: 8px;
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
