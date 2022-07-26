import styled from "styled-components"

interface WrapperProps {
  isOpened: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  max-height: ${({ isOpened }) => (isOpened ? "9000px" : "90px")};
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
  > button.accordion-handler {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
    > span {
      align-self: flex-start;
      font-weight: bold;
      font-size: 20px;
      margin-left: 40px;
      position: relative;
      > i {
        font-size: 10px;
        font-weight: normal;
        margin-left: 10px;
      }
      &::before {
        content: "";
        background: ${({ theme }) => theme.primary_brown};
        border-radius: 2px;
        border: 2px solid ${({ theme }) => theme.secondary_brown};
        box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
        height: 14px;
        width: 10px;
        position: absolute;
        top: 2px;
        left: -20px;
      }
    }
    > div {
      background: rgba(95, 57, 0, 0.6);
      height: 3px;
      width: 350px;
    }
    > svg {
      margin-right: 10px;
      transition: transform 0.3s ease;
      transform: ${({ isOpened }) => (isOpened ? "rotate(180deg)" : "")};
    }
  }
`
