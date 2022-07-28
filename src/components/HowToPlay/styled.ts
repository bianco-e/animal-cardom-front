import styled from "styled-components"
import { buttonAnimation } from "../../animations"
import { BREAKPOINTS } from "../../utils/constants"

export const HowToPlayWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 75vh;
  overflow: auto;
  padding: ${({ theme }) => theme.$4};
  width: 60vw;
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.$5};
  }
  ${BREAKPOINTS.TABLET} {
    width: 75vw;
  }
  ${BREAKPOINTS.MOBILE} {
    width: 95vw;
  }
`

export const HowToPlayTitle = styled.h1`
  font-size: ${({ theme }) => theme.$2};
  margin-bottom: ${({ theme }) => theme.$4} !important;
  margin-top: 0;
`

export const HowToPlaySubtitle = styled.h2`
  font-size: ${({ theme }) => theme.$3};
  margin-top: 0;
`

export const HowToPlayText = styled.span`
  font-size: ${({ theme }) => theme.$4};
`

export const HowToPlayCTA = styled.button`
  background: ${({ theme }) => theme.secondary_brown};
  border: 2px solid ${({ theme }) => theme.primary_brown};
  border-radius: 100%;
  bottom: ${({ theme }) => theme.$4};
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.5), 1px 1px 5px rgba(0, 0, 0, 0.5);
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: ${({ theme }) => theme.$1};
  font-weight: bold;
  height: 64px;
  left: ${({ theme }) => theme.$4};
  position: fixed;
  transition: all 0.1s ease;
  width: 64px;
  > span {
    z-index: 10;
  }
  &:after {
    background: linear-gradient(
      90deg,
      rgba(204, 158, 88, 1) 0%,
      rgba(212, 162, 87, 1) 45%,
      rgba(227, 205, 172, 1) 100%
    );
    border-radius: 100%;
    content: "";
    font-size: ${({ theme }) => theme.$1};
    height: 64px;
    left: calc(50% - 32px);
    position: absolute;
    top: calc(50% - 32px);
    width: 64px;
    ${buttonAnimation}
  }
  &:hover {
    &:before {
      background: linear-gradient(
        90deg,
        rgba(204, 158, 88, 1) 0%,
        rgba(212, 162, 87, 1) 45%,
        rgba(227, 205, 172, 1) 100%
      );
      border-radius: 100%;
      content: "";
      font-size: ${({ theme }) => theme.$1};
      height: 64px;
      left: calc(50% - 32px);
      position: absolute;
      top: calc(50% - 32px);
      width: 64px;
      ${buttonAnimation}
    }
  }
`
