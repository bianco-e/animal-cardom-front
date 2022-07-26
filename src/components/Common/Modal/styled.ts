import styled from "styled-components"
import { BREAKPOINTS } from "../../../utils/constants"

export const ModalOverlay = styled.div`
  background: rgba(50, 50, 50, 0.7);
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1500;
`

interface ContentProps {
  forSpinner?: boolean
}

export const ModalContainer = styled.div<ContentProps>`
  align-items: center;
  background: ${({ forSpinner, theme }) => (!forSpinner ? theme.primary_brown : "")};
  border: ${({ forSpinner, theme }) =>
    !forSpinner && `2px solid ${theme.secondary_brown}`};
  border-radius: 5px;
  box-shadow: ${({ forSpinner }) =>
    !forSpinner && "inset 0px 0px 10px rgba(0, 0, 0, 0.4)"};
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  position: relative;
  z-index: 30;
  ${BREAKPOINTS.MOBILE} {
    width: 87%;
  }
`

export const CloseButton = styled.button`
  font-size: ${({ theme }) => theme.$3};
  position: absolute;
  right: ${({ theme }) => theme.$1};
  top: ${({ theme }) => theme.$1};
`
