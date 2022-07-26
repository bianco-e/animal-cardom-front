import styled from "styled-components"

interface WrapperProps {
  dasharray?: string
  dashoffset?: number
}

export const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  > svg {
    position: absolute;
    left: -25px;
    top: -12px;
    .progress-ring__circle {
      stroke: url(#gradient);
      stroke-dasharray: ${({ dasharray }) => dasharray};
      stroke-dashoffset: ${({ dashoffset }) => dashoffset};
      stroke-linecap: round;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      transition: stroke-dashoffset 0.5s;
    }
    .progress-ring__background {
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
  }
  > img {
    border-radius: 50%;
  }
  > span {
    font-size: 11px;
    margin-top: 10px;
  }
`
