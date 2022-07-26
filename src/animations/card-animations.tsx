import { css, keyframes } from "styled-components"

const cardSelection = keyframes`
    0% {
        transform:rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const attack = keyframes`
    0%{
      transform: scale(1);
    }
    30% {
      transform: scale(1.01);
    }
    60% {
      transform: scale(0.95);
    }
    90% {
      transform: scale(1.01);
    }
    100% {
      transform: scale(1);
    }
`

const injury = keyframes`
  20%, 90% {
    opacity: 1;
  }
  95% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
`

const miss = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-32px);
    opacity: 0;
  }
`

export const selectionAnimation = css`
  animation: 3.5s ${cardSelection} linear infinite;
`
export const injuryAnimation = css`
  animation: 0.3s ${injury} forwards;
`
export const missAnimation = css`
  animation: 0.7s ${miss} forwards;
`
export const attackAnimation = css`
  animation: 0.3s ${attack} linear;
`
export const attackAudio = new Audio("/audio/claw-sound-effect.mp3")
