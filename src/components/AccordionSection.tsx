import { useState } from "react";
import styled from "styled-components";

interface IProps {
  children: JSX.Element;
  disclaimer?: string;
  title: string;
}
export default function AccordionSection({
  children,
  disclaimer,
  title,
}: IProps) {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const toggleAccordion = () => setIsOpened(!isOpened);
  return (
    <Wrapper isOpened={isOpened}>
      <button className="accordion-handler" onClick={toggleAccordion}>
        <span>
          {title}
          {disclaimer && <i>{disclaimer}</i>}
        </span>
        <div></div>
        <svg
          x="0px"
          y="0px"
          width={30}
          height={30}
          fill="rgba(95, 57, 0, 0.6)"
          viewBox="0 0 960 560"
          enable-background="new 0 0 960 560"
        >
          <path
            d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937
                c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937
                c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"
          />
        </svg>
      </button>
      {children}
    </Wrapper>
  );
}

interface WrapperProps {
  isOpened: boolean;
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  max-height: ${(p: WrapperProps) => (p.isOpened ? "9000px" : "90px")};
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
  > button.accordion-handler {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
    > span {
      align-self: flex-start;
      font-weight: bold;
      font-size: 20px;
      margin-left: 40px;
      position: relative;
      > i {
        font-size: 10px;
        font-weight: normal;
        margin-left: 10px;
      }
      &::before {
        content: "";
        background: ${({ theme }) => theme.primary_brown};
        border-radius: 2px;
        border: 2px solid ${({ theme }) => theme.secondary_brown};
        box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
        height: 14px;
        width: 10px;
        position: absolute;
        top: 2px;
        left: -20px;
      }
    }
    > div {
      background: rgba(95, 57, 0, 0.6);
      height: 3px;
      width: 350px;
    }
    > svg {
      margin-right: 10px;
      transition: transform 0.3s ease;
      transform: ${(p: WrapperProps) => (p.isOpened ? "rotate(180deg)" : "")};
    }
  }
`;
