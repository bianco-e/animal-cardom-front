import styled from "styled-components"
import { BREAKPOINTS } from "../../utils/constants"

export const UserImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: Absolute;
  right: -18px;
  top: calc(50% - 18px);
`
export const OptionButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  margin-left: 20px;
`
export const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
  > .logo-link {
    height: 100%;
    > img {
      position: absolute;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }
  ${BREAKPOINTS.MOBILE} {
    > .logo-link {
      > img {
        display: none;
      }
    }
  }
`
export const Wrapper = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3), inset 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  height: 70px;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`
export const FeedbackButton = styled.button`
  background: ${({ theme }) => theme.primary_brown};
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  border-top: 0;
  border-radius: 0 0 5px 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  padding: 5px 10px;
  position: absolute;
  left: -2px;
  top: calc(100% + 2px);
  > a {
    text-decoration: none;
    color: #000;
  }
`
