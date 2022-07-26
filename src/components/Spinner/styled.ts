import styled from "styled-components"

export const Wrapper = styled.div`
  display: inline-block;
  transform: translateZ(1px);
  > div {
    animation: lds-circle 5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    background: ${({ theme }) => theme.primary_brown};
    border-radius: 5px;
    border: 2px solid ${({ theme }) => theme.secondary_brown};
    box-shadow: inset 0 0 10px 10px rgba(0, 0, 0, 0.1);
    height: 80px;
    margin: 8px;
    width: 55px;
  }
  @keyframes lds-circle {
    0%,
    100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(1800deg);
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }
    100% {
      transform: rotateY(3600deg);
    }
  }
`
export const SpinnerWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  width: 100%;
`
