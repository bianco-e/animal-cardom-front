import { keyframes, css } from "styled-components";

const slideFromTopKeyframes = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

export const slideFromTopAnimation = () => css`
  animation: 0.45s ${slideFromTopKeyframes} forwards;
  -webkit-animation: 0.45s ${slideFromTopKeyframes} forwards;
  -moz-animation: 0.45s ${slideFromTopKeyframes} forwards;
  -o-animation: 0.45s ${slideFromTopKeyframes} forwards;
`;

const slideToTopKeyframes = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-110%);
  }
`;

export const slideToTopAnimation = () => css`
  animation: 0.45s ${slideToTopKeyframes} forwards;
  -webkit-animation: 0.45s ${slideToTopKeyframes} forwards;
  -moz-animation: 0.45s ${slideToTopKeyframes} forwards;
  -o-animation: 0.45s ${slideToTopKeyframes} forwards;
`;

const pulseKeyframes = (initial: string, final: string) => keyframes`
  0% {
    background:${initial};
  }
  50% {
    background:${final};
  }
  100% {
    background:${initial};
  }
`;

export const pulseAnimation = (initial = "#f7f7f7", final = "#f0f0f0") => css`
  animation: 2s ${pulseKeyframes(initial, final)} infinite ease-in-out;
  -webkit-animation: 2s ${pulseKeyframes(initial, final)} infinite ease-in-out;
  -moz-animation: 2s ${pulseKeyframes(initial, final)} infinite ease-in-out;
  -o-animation: 2s ${pulseKeyframes(initial, final)} infinite ease-in-out;
`;

const appearKeyframes = (opacity: string) => keyframes`
  0% {
    opacity: 0.05;
  }
  100% {
    opacity: ${opacity};
  }
`;

export const appearAnimation = (opacity: string = "1") => css`
  animation: 0.5s ${appearKeyframes(opacity)} forwards;
  -webkit-animation: 0.5s ${appearKeyframes(opacity)} forwards;
  -moz-animation: 0.5s ${appearKeyframes(opacity)} forwards;
  -o-animation: 0.5s ${appearKeyframes(opacity)} forwards;
`;

const slideFromBottomRightKeyframes = keyframes`
  0% {
    opacity: 0.25;
    transform: translate(100%, 100%) scale(0.2);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
`;

export const slideFromBottomRightAnimation = () => css`
  animation: 0.35s ${slideFromBottomRightKeyframes} forwards;
  -webkit-animation: 0.35s ${slideFromBottomRightKeyframes} forwards;
  -moz-animation: 0.35s ${slideFromBottomRightKeyframes} forwards;
  -o-animation: 0.35s ${slideFromBottomRightKeyframes} forwards;
`;

const slideToBottomRightKeyframes = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(100%, 100%) scale(0.2);
  }
`;

export const slideToBottomRightAnimation = () => css`
  animation: 0.35s ${slideToBottomRightKeyframes} forwards;
  -webkit-animation: 0.35s ${slideToBottomRightKeyframes} forwards;
  -moz-animation: 0.35s ${slideToBottomRightKeyframes} forwards;
  -o-animation: 0.35s ${slideToBottomRightKeyframes} forwards;
`;

export const buttonKeyframes = keyframes`
  0% {
    opacity: 0.1;
    transform: rotate(0deg);
  }
  5% {
    opacity: 0.75;
    transform: rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: rotate(360deg);
  }
`;

export const buttonAnimation = () => css`
  animation: 5s ${buttonKeyframes} linear forwards;
  -webkit-animation: 5s ${buttonKeyframes} linear forwards;
  -moz-animation: 5s ${buttonKeyframes} linear forwards;
  -o-animation: 5s ${buttonKeyframes} linear forwards;
`;
