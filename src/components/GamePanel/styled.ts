import styled from "styled-components"
import { BREAKPOINTS } from "../../utils/constants"

interface LeftPanelProps {
  bgImage?: string
}
export const PlayerNameTab = styled.div`
  background: rgba(240, 240, 240, 0.6);
  box-shadow: 0 35px 40px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 10px 10px;
  bottom: -48px;
  display: none;
  font-weight: bold;
  left: 50%;
  padding: 1px 12px;
  position: absolute;
  transform: translate(-50%, -50%);
  ${BREAKPOINTS.TABLET} {
    display: flex;
  }
  ${BREAKPOINTS.MOBILE} {
    bottom: -42px;
    font-size: 14px;
  }
`
export const LeftPanel = styled.div<LeftPanelProps>`
  background: url(${({ bgImage }) => bgImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 0 10px 10px 0;
  box-shadow: 35px 0 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  width: 110px;
  ${BREAKPOINTS.TABLET} {
    align-items: center;
    background: url(${({ bgImage }) => bgImage});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 35px 40px rgba(0, 0, 0, 0.2);
    flex-direction: row;
    height: 50px;
    justify-content: space-around;
    width: 100%;
  }
`
export const HalfPanel = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 33%;
  > span {
    font-size: 13px;
  }
  ${BREAKPOINTS.TABLET} {
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    width: 30%;
    z-index: 2;
    > span {
      display: none;
    }
  }
  ${BREAKPOINTS.MOBILE} {
    width: 40%;
  }
`
export const TerrainName = styled.h3`
  align-items: center;
  color: ${({ color }) => color};
  display: flex;
  height: 33%;
  justify-content: center;
  position: relative;
  > div.name-container {
    cursor: help;
    position: relative;
    text-shadow: rgba(10, 10, 10, 0.6) 0px 1px 5px;
  }
  ${BREAKPOINTS.TABLET} {
    width: 90px;
    min-height: auto;
    height: 100%;
  }
  ${BREAKPOINTS.MOBILE} {
    > div.name-container {
      font-size: 14px;
    }
  }
`
export const OptionsPanel = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.primary_brown};
  border-radius: 0 50px 50px 0;
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  border-left: 0;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 110px;
  position: absolute;
  right: -27px;
  top: calc(50% - 55);
  width: 25px;
  > button {
    height: 15px;
    margin-bottom: 25px;
    z-index: 1;
    &:last-child {
      margin-bottom: 0;
    }
    > img {
      height: 100%;
      width: 100%;
    }
  }
  ${BREAKPOINTS.TABLET} {
    border: 2px solid ${({ theme }) => theme.secondary_brown};
    border-top: 0;
    border-radius: 0 0 50px 50px;
    flex-direction: row;
    height: 18px;
    right: auto;
    top: 100%;
    width: 90px;
    > button {
      height: 95%;
      margin-bottom: 0;
      width: 30%;
      > img {
        height: 100%;
        width: 100%;
      }
    }
  }
`
