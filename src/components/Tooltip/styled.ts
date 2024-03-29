import styled from "styled-components"
import { Direction } from "."

interface TooltipProps {
  direction: Direction
}

const positions = {
  TOP: `bottom: 120%; flex-direction: column; left: calc(50% - 49px);`,
  BOTTOM: `top: 120%; flex-direction: column-reverse; left: calc(50% - 49px);`,
  "BOTTOM-LEFT": `top: 100%; flex-direction: column-reverse; right: 90%;`,
  "BOTTOM-RIGHT": `top: 100%; flex-direction: column-reverse; left: 90%;`,
}

const descriptionContainer = {
  borderRadius: {
    TOP: `4px 4px 0 0;`,
    BOTTOM: `0 0 4px 4px;`,
    "BOTTOM-LEFT": `0 0 4px 4px;`,
    "BOTTOM-RIGHT": `0 0 4px 4px;`,
  },
}

const titleContainer = {
  arrowPosition: {
    TOP: `bottom: -4px; left: calc(50% - 4px); transform: rotate(45deg);`,
    BOTTOM: `top: -4px; left: calc(50% - 4px); transform: rotate(45deg);`,
    "BOTTOM-LEFT": `display: none;`,
    "BOTTOM-RIGHT": `display: none;`,
  },
  borderRadius: {
    TOP: `0 0 4px 4px;`,
    BOTTOM: `4px 4px 0 0;`,
    "BOTTOM-LEFT": `4px 0 0 0;`,
    "BOTTOM-RIGHT": `0 4px 0 0;`,
  },
}

export const TooltipWrapper = styled.div<TooltipProps>`
  align-items: center;
  color: #000;
  display: flex;
  justify-content: center;
  position: absolute;
  width: 98px;
  z-index: 3;
  ${({ direction }) => positions[direction]}
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
    border-radius: ${({ direction }) => descriptionContainer.borderRadius[direction]};
    font-size: 9px;
    font-weight: normal;
    width: 100%;
  }
  .title-container {
    background: ${({ theme }) => theme.primary_brown};
    border-radius: ${({ direction }) => titleContainer.borderRadius[direction]};
    font-size: 8px;
    font-weight: bold;
    position: relative;
    width: 100%;
  }
  &::after {
    background: ${({ theme }) => theme.primary_brown};
    ${({ direction }) => titleContainer.arrowPosition[direction]}
    content: "";
    height: 8px;
    position: absolute;
    width: 8px;
  }
`
