import styled from "styled-components";
import { BREAKPOINTS } from "../../../utils/constants";

export const ModalOverlay = styled.div`
  background: rgba(50, 50, 50, 0.7);
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1500;
`;

interface ContentProps {
  forSpinner?: boolean;
}

export const ModalContainer = styled.div<ContentProps>`
  align-items: center;
  background: ${({ forSpinner }) => !forSpinner && "#d4a257"};
  border: ${({ forSpinner }) => !forSpinner && "2px solid #b9935a"};
  border-radius: 5px;
  box-shadow: ${({ forSpinner }) => !forSpinner && "inset 0px 0px 10px black"};
  display: flex;
  flex-direction: column;
  padding: 30px;
  z-index: 30;
  ${BREAKPOINTS.MOBILE} {
    width: 87%;
  }
`;

export const CloseButton = styled.button`
  border: none;
  background: none;
  color: black;
  cursor: pointer;
  font-size: 10px;
  margin: 10px 0;
`;
