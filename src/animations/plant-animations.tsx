import { keyframes, css } from "styled-components";
const poison = keyframes`
  0% {
    transform: translateY(100px);
    opacity: 0.1; 
  }
  10% {
    transform: translateY(50px);
    opacity: 0.2; 
  }
  20% {
    transform: translateY(40px);
    opacity: 0.3;
  }
  80% {
    transform: translateY(0);
    opacity: 0.9;
  }
  95% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
  }
`;

const paralyze = keyframes`
  0% {
    margin-top: 20%;
    transform: rotate(0deg);
    opacity: 0.1; 
  }
  20% {
    opacity: 0.3;
  }
  80% {
    opacity: 0.9;
  }
  95% {
    opacity: 0.3;
  }
  100% {
    transform: rotate(1440deg);
    opacity: 0;
  }
`;

const cleaning = keyframes`
  0% {
    transform: translateY(135px);
    opacity: 0.1; 
  }
  10% {
    transform: translateY(80px);
    opacity: 0.3; 
  }
  20% {
    transform: translateY(30px);
    opacity: 0.5;
  }
  80% {
    transform: translateY(0);
    opacity: 1;
  }
  95% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(-20px);
    opacity: 0;
  }
`;

const buff = keyframes`
  0%{
    transform: translateY(-15px);
    opacity: 0.25;
  }
  10%{
    transform: translateY(-25px);
    opacity: 0.45;
  }
  40%{
    transform: translateY(-35px);
    opacity: 0.95;
  }
  100%{
    transform: translateY(-70px);
    opacity: 0.45;
  }
`;

const healing = keyframes`
  0% {
    margin-top: 60px;
    transform: scale(0.2);
    opacity: 0.1;
  }
  85% {
    transform: scale(2);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.2;
  }
`;

export const poisonAnimation = css`
  animation: 0.85s ${poison} linear;
`;
export const paralyzeAnimation = css`
  animation: 0.85s ${paralyze} linear;
`;
export const buffAnimation = css`
  animation: 0.85s ${buff} linear;
`;
export const cleaningAnimation = css`
  animation: 1s ${cleaning} linear;
`;
export const healingAnimation = css`
  animation: 1s ${healing} linear;
`;

export const audioFiles = {
  bite: new Audio("/audio/fruit-bite-sound-effect.mp3"),
  cleaning: new Audio("/audio/fruit-bite-sound-effect.mp3"),
  healing: new Audio("/audio/healing-sound-effect.mp3"),
  paralyze: new Audio("/audio/paralyze-sound-effect.mp3"),
  poison: new Audio("/audio/poison-sound-effect.mp3"),
  puncture: new Audio("/audio/claw-sound-effect.mp3"),
};
