import styled from "styled-components"

interface WrapperProps {
  isOpened?: boolean
  width?: string
}

interface OptionsContainerProps {
  display?: string
}

interface OptionProps {
  fWeight?: string
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${({ width }) => width};
  > button {
    align-items: center;
    background: #f9f9f9;
    display: flex;
    justify-content: space-around;
    width: 100%;
    > svg {
      transition: transform 0.2s ease;
      transform: ${({ isOpened }) => (isOpened ? "rotate(180deg)" : "")};
    }
  }
`
export const OptionsContainer = styled.div<OptionsContainerProps>`
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 3px 3px rgba(95, 57, 0, 0.3);
  display: ${({ display }) => display};
  max-height: 250px;
  flex-direction: column;
  font-size: 15px;
  overflow-y: auto;
  position: absolute;
  top: 105%;
  width: 100%;
  z-index: 10;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.light_brown};
    border-radius: 0 5px 5px 0;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondary_violet};
    border-radius: 0 5px 5px 0;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary_violet};
  }
`
export const StyledOption = styled.span<OptionProps>`
  align-items: center;
  background: #fff;
  border-bottom: 2px solid ${({ theme }) => theme.secondary_brown};
  cursor: pointer;
  display: flex;
  font-weight: ${({ fWeight = "bold" }) => fWeight};
  justify-content: center;
  padding: 10px 15px;
  width: calc(100% - 30px);
  &:first-child {
    border-radius: 5px 5px 0 0;
  }
  &:last-child {
    border-radius: 0 0 5px 5px;
    border-bottom: 0;
  }
  &:hover {
    background: ${({ theme }) => theme.light_brown};
  }
`
