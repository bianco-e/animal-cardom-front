import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { LogButton } from "./styled-components"

interface Option {
  text: string
  fn: () => void
}

interface IProps {
  closedText: string
  options: Option[]
  width: string
}
export default function Dropdown({ closedText, options, width }: IProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string>()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: MouseEvent) => {
    const { clientX, clientY } = e
    if (dropdownRef.current) {
      const isClickingOut =
        clientX > dropdownRef.current.offsetLeft + dropdownRef.current.offsetWidth ||
        clientX < dropdownRef.current.offsetLeft ||
        clientY > dropdownRef.current.offsetTop + dropdownRef.current.offsetHeight ||
        clientY < dropdownRef.current.offsetTop
      if (isClickingOut) {
        setIsOpened(false)
      }
    }
  }

  useEffect(() => {
    isOpened && document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpened])

  const handleDropdown = () => {
    setIsOpened(!isOpened)
  }
  const handleSelection = (callback: Option["fn"], option: Option["text"]) => {
    setSelectedOption(option)
    setIsOpened(false)
    callback()
  }
  return (
    <Wrapper isOpened={isOpened} width={width}>
      <LogButton onClick={handleDropdown}>
        <b>{selectedOption ? selectedOption : closedText}</b>
        <svg
          x="0px"
          y="0px"
          width={30}
          height={30}
          viewBox="0 0 960 560"
          enable-background="new 0 0 960 560">
          <path
            d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937
                c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937
                c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"
          />
        </svg>
      </LogButton>
      <OptionsContainer ref={dropdownRef} display={isOpened ? "flex" : "none"}>
        {options.map((opt, idx) => {
          return (
            <StyledOption
              fWeight={idx === 0 ? "normal" : "bold"}
              onClick={() => handleSelection(opt.fn, opt.text)}>
              {opt.text}
            </StyledOption>
          )
        })}
      </OptionsContainer>
    </Wrapper>
  )
}

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${(p: WrapperProps) => p.width};
  > button {
    align-items: center;
    background: #f9f9f9;
    display: flex;
    justify-content: space-around;
    width: 100%;
    > svg {
      transition: transform 0.2s ease;
      transform: ${(p: WrapperProps) => (p.isOpened ? "rotate(180deg)" : "")};
    }
  }
`
const OptionsContainer = styled.div`
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 3px 3px rgba(95, 57, 0, 0.3);
  display: ${(p: OptionsContainerProps) => p.display};
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
const StyledOption = styled.span`
  align-items: center;
  background: #fff;
  border-bottom: 2px solid ${({ theme }) => theme.secondary_brown};
  cursor: pointer;
  display: flex;
  font-weight: ${(p: OptionProps) => p.fWeight || "bold"};
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
