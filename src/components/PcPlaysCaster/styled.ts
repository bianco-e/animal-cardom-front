import styled from "styled-components"
import { BREAKPOINTS } from "../../utils/constants"

export const CasterWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  max-height: 85vh;
  overflow-y: auto;
  padding: ${({ theme }) => `${theme.$4} ${theme.$7}`};
`

export const CasterText = styled.span`
  color: #000;
  font-size: ${({ theme }) => theme.$6};
  font-weight: bold;
  margin: ${({ theme }) => theme.$9};
  position: relative;
  text-align: center;
  ${BREAKPOINTS.MOBILE} {
    font-size: ${({ theme }) => theme.$7};
  }
`

export const FullScreenButton = styled.button`
  background: ${({ theme }) => theme.light_brown};
  border: 1px solid ${({ theme }) => theme.secondary_brown};
  border-radius: 4px;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  font-size: ${({ theme }) => theme.$8};
  font-weight: 500;
  left: calc(50% - 60px);
  padding: 4px 8px;
  position: absolute;
  top: calc(100% + 4px);
  width: 120px;
`
