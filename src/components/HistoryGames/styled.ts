import styled from "styled-components"
import { BREAKPOINTS } from "../../utils/constants"

interface ResultProps {
  bgColor?: string
}

interface HistoryCardProps {
  terrain?: string
}
export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  width: 100%;
  overflow-y: auto;
`
export const HistoryCard = styled.div<HistoryCardProps>`
  align-items: center;
  background-image: ${({ terrain }) => `url('/images/terrains/${terrain}.webp')`};
  background-position: center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: 0 0 10px 10px rgba(95, 57, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  min-height: 80px;
  margin: 15px 0;
  padding: 8px 24px;
  position: relative;
  width: 85%;
`
export const DetailsPanel = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.primary_brown};
  border-radius: 50px 50px 0 0;
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  border-bottom: 0;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  content: "";
  display: flex;
  flex-direction: column;
  height: 40px;
  justify-content: center;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 180px;
  bottom: 0;
  > span {
    font-size: 10px;
    font-weight: bold;
    margin-bottom: 2px;
    &:last-child {
      font-size: 9px;
      margin-bottom: 0;
    }
  }
  ${BREAKPOINTS.MOBILE} {
    height: 30px;
  }
`
export const PlayerStats = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: calc(50% - 40px);
  > b {
    margin-bottom: 10px;
  }
  ${BREAKPOINTS.MOBILE} {
    margin: 0 auto;
    width: 47%;
    &:first-child {
      margin-right: 2px;
    }
    &:last-child {
      margin-left: 2px;
    }
  }
`
export const CardsContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 8px;
  justify-content: space-around;
  width: 85%;
  ${BREAKPOINTS.MOBILE} {
    justify-content: space-between;
    &:last-child {
      padding-bottom: 20px;
    }
    width: 100%;
  }
`
export const Result = styled.span<ResultProps>`
  background: ${({ bgColor }) => bgColor};
  border-radius: 5px;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  position: absolute;
  transform: rotate(-40deg);
  left: -4px;
  top: 8px;
`
