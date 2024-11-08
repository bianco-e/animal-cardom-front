import styled from "styled-components"

export enum TooltipDirection {
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  BOTTOM_LEFT = "BOTTOM-LEFT",
  BOTTOM_RIGHT = "BOTTOM-RIGHT"
}

interface TooltipProps {
  $direction: TooltipDirection
}

const positions = {
  [TooltipDirection.TOP]: `bottom: 120%; flex-direction: column; left: calc(50% - 49px);`,
  [TooltipDirection.BOTTOM]: `top: 120%; flex-direction: column-reverse; left: calc(50% - 49px);`,
  [TooltipDirection.BOTTOM_LEFT]: `top: 100%; flex-direction: column-reverse; right: 90%;`,
  [TooltipDirection.BOTTOM_RIGHT]: `top: 100%; flex-direction: column-reverse; left: 90%;`,
}

const descriptionContainer = {
  borderRadius: {
    [TooltipDirection.TOP]: `4px 4px 0 0;`,
    [TooltipDirection.BOTTOM]: `0 0 4px 4px;`,
    [TooltipDirection.BOTTOM_LEFT]: `0 0 4px 4px;`,
    [TooltipDirection.BOTTOM_RIGHT]: `0 0 4px 4px;`,
  },
}

const titleContainer = {
  arrowPosition: {
    [TooltipDirection.TOP]: `bottom: -4px; left: calc(50% - 4px); transform: rotate(45deg);`,
    [TooltipDirection.BOTTOM]: `top: -4px; left: calc(50% - 4px); transform: rotate(45deg);`,
    [TooltipDirection.BOTTOM_LEFT]: `display: none;`,
    [TooltipDirection.BOTTOM_RIGHT]: `display: none;`,
  },
  borderRadius: {
    [TooltipDirection.TOP]: `0 0 4px 4px;`,
    [TooltipDirection.BOTTOM]: `4px 4px 0 0;`,
    [TooltipDirection.BOTTOM_LEFT]: `4px 0 0 0;`,
    [TooltipDirection.BOTTOM_RIGHT]: `0 4px 0 0;`,
  },
}

export const TooltipWrapper = styled.div<TooltipProps>`
  align-items: center;
  color: #000;
  display: flex;
  justify-content: center;
  position: absolute;
  width: 96px;
  z-index: 3;
  ${({ $direction }) => positions[$direction]}
  > hr {
    background: ${({ theme }) => theme.secondary_violet};
    border: 1px solid ${({ theme }) => theme.secondary_violet};
    margin: 0;
    width: calc(100% - 2px);
  }
  > div {
    align-items: center;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding: 4px 2px;
    text-align: center;
  }
  .description-container {
    background: ${({ theme }) => theme.light_brown};
    border-radius: ${({ $direction }) => descriptionContainer.borderRadius[$direction]};
    font-size: 9px;
    font-weight: normal;
    width: 100%;
  }
  .title-container {
    background: ${({ theme }) => theme.primary_brown};
    border-radius: ${({ $direction }) => titleContainer.borderRadius[$direction]};
    font-size: 8px;
    font-weight: bold;
    position: relative;
    width: 100%;
  }
  &::after {
    background: ${({ theme }) => theme.primary_brown};
    ${({ $direction }) => titleContainer.arrowPosition[$direction]}
    content: "";
    height: 8px;
    position: absolute;
    width: 8px;
  }
`
