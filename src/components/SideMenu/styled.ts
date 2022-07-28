import styled from "styled-components"
import { BREAKPOINTS } from "../../utils/constants"

interface WrapperProps {
  width?: string
}

interface CloseButtonProps {
  rotate?: string
}

export const UserInfoContainer = styled.div`
  align-items: center;
  display: flex;
  > .avatar {
    border-radius: 50%;
    height: 32px;
    margin-right: 8px;
    width: 32px;
  }
  > span {
    font-size: 16px;
    ${BREAKPOINTS.MOBILE} {
      display: none;
    }
  }
`

export const CloseButton = styled.div<CloseButtonProps>`
  display: none;
  ${BREAKPOINTS.MOBILE} {
    background: #f4e4bc;
    border-radius: 0 5px 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    position: absolute;
    right: -14px;
    top: 15px;
    width: 18px;
    > svg {
      transition: all 0.4s ease;
      transform: rotate(${({ rotate }) => rotate});
    }
  }
`

export const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  background: #f4e4bc;
  box-shadow: 0 0 5px 5px rgba(95, 57, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  padding: 0 20px;
  position: fixed;
  top: 0;
  width: 200px;
  z-index: 5;
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.$2};
  }
  > .logo {
    cursor: pointer;
    margin-top: 60px;
  }
  ${BREAKPOINTS.MOBILE} {
    transition: all 0.4s ease;
    width: ${({ width }) => width};
    ${({ width }) =>
      width === "1px"
        ? `
            padding: 0 3px;
            button, img {
              display: none;
            }
            > .close-button {
              display: flex;
            }
            `
        : `> img {
            display: none;
            }
            > .menu-button-0 {
              margin-top: 15px;
            }
            > button {
              &:last-child {
                margin-bottom: 15px;
              }
            }`}
  }
`

export const LogoutButton = styled.button`
  background: ${({ theme }) => theme.light_brown};
  border-radius: 0 0 4px 4px;
  border: 1px solid ${({ theme }) => theme.secondary_brown};
  border-top: 0;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.primary_red};
  font-size: ${({ theme }) => theme.$4};
  padding: ${({ theme }) => `${theme.$7} ${theme.$5}`};
  position: absolute;
  right: calc(50% - 44px);
  top: 0;
  width: 88x;
`
