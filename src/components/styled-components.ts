import styled from "styled-components";
import { BREAKPOINTS } from "../utils/constants";

interface LogButtonProps {
  overflow?: string;
}
interface ButtonProps {
  fWeight?: string;
  selected?: boolean;
  margin?: string;
}
interface TextProps {
  color?: string;
  fSize?: string;
  fWeight?: string;
  margin?: string;
  padding?: string;
  textAlign?: string;
}
interface ImageProps {
  height?: string;
  width?: string;
}

interface MessageProps {
  margin?: string;
}

export const Text = styled.span`
  color: ${(p: TextProps) => p.color};
  font-size: ${(p: TextProps) => p.fSize};
  font-weight: ${(p: TextProps) => p.fWeight};
  margin: ${(p: TextProps) => p.margin};
  padding: ${(p: TextProps) => p.padding};
  text-align: ${(p: TextProps) => p.textAlign};
`;

export const Image = styled.img`
  height: ${(p: ImageProps) => p.height};
  width: ${(p: ImageProps) => p.width};
`;

export const ACButton = styled.button`
  background-color: ${(p: ButtonProps) => (p.selected ? "#d4a257" : "#b9935a")};
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.5),
    1px 1px 5px rgba(0, 0, 0, 0.5);
  color: black;
  cursor: pointer;
  height: 60px;
  font-size: 20px;
  font-weight: ${(p: ButtonProps) => p.fWeight};
  margin: ${(p: ButtonProps) => p.margin};
  overflow: hidden;
  padding: 6px 10px;
  position: relative;
  width: 100%;
  &:active:enabled {
    box-shadow: inset 0px 0px 3px black;
  }
  &:hover:enabled {
    background-color: #d4a257;
  }
  &:disabled {
    background: rgba(185, 147, 90, 0.3);
    box-shadow: inset 0px 0px 3px black;
    overflow: visible;
    cursor: not-allowed;
  }
`;

export const LogButton = styled.button`
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px black;
  cursor: pointer;
  font-size: 18px;
  margin-right: 20px;
  overflow: ${(p: LogButtonProps) => p.overflow || "hidden"};
  padding: 6px 20px;
  position: relative;
`;

export const ComingSoon = styled.span`
  background: #000;
  border-radius: 5px;
  color: #fff;
  font-size: 11px;
  padding: 3px 10px;
  position: absolute;
  right: -10px;
  top: 10px;
  transform: rotate(20deg);
`;

export const Message = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin: ${(p: MessageProps) => p.margin};
`;

export const Tooltip = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.3);
  font-size: 10px;
  padding: 5px;
  position: absolute;
  text-align: center;
  text-shadow: none;
  top: calc(50% + 17px);
  z-index: 5;
  &:before {
    content: "";
    background: #fff;
    height: 8px;
    width: 8px;
    transform: rotate(45deg);
    position: absolute;
    left: 50%;
    top: -3px;
  }
`;

export const ModalTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;

export const ACInput = styled.input`
  background: ${({ theme }) => theme.light_brown};
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px black;
  font-size: 18px;
  height: 30px;
  margin-bottom: 40px;
  padding: 6px 10px;
  text-align: center;
  width: 96%;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #000;
  }
  ${BREAKPOINTS.MOBILE} {
    margin-bottom: 10px;
  }
`;

export const ACTextArea = styled.textarea`
  background: ${({ theme }) => theme.light_brown};
  border: 2px solid ${({ theme }) => theme.primary_brown};
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px black;
  font-family: inherit;
  font-size: 13px;
  margin-bottom: 40px;
  height: 180px;
  padding: 6px 10px;
  resize: none;
  text-align: center;
  width: 96%;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #404040;
    font-size: 11px;
  }
  ${BREAKPOINTS.MOBILE} {
    margin-bottom: 10px;
  }
`;
