import React from "react";
import styled from "styled-components";
import { SMALL_RESPONSIVE_BREAK } from "../lib/constants";

const modalsText = {
  rules: {
    className: "rules-container",
    title: "Animal Cardom rules",
    paragraphs: [
      "You have five different animals cards, and three different plants to apply on them if wanted. A terrain will be randomly set at the very start.",
      "Each card has an ability, an attack and life points, and also belongs to a family which can give you benefits or not depending on the terrain or other cards' abilities.",
      "The objective is to kill all opponent's cards.",
      "Have fun!",
    ],
  },
  win: {
    title: "You win!",
    paragraphs: ["Good game!", "Your animals defeated PC, nature always win!"],
  },
  lose: {
    title: "Computer wins",
    paragraphs: [
      "Nice try!",
      "PC defeated you this time, but nature always takes revenge!",
    ],
  },
  device: {
    title: "Mobile device detected",
    paragraphs: [
      "You could be using Animal Cardom from a mobile device. In that case, we recommend to rotate the screen for a better experience",
    ],
  },
};

export default function SimpleModal({ setShowModal, sign, width }) {
  return (
    <Wrapper
      className={modalsText[sign].className && modalsText[sign].className}
      width={width}
      top={(sign === "win" || sign === "lose") && "35%"}
      left={(sign === "win" || sign === "lose") && "18%"}
    >
      <Text weight="bold">{modalsText[sign].title}</Text>
      {modalsText[sign].paragraphs.map((p) => (
        <Text>{p}</Text>
      ))}
      <Button
        onClick={() => {
          setShowModal(false);
        }}
      >
        Close
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  &.rules-container {
    @media (${SMALL_RESPONSIVE_BREAK}) {
      width: 70%;
    }
  }
  background: #d4a257;
  border: 2px solid #b9935a;
  border-radius: 5px;
  box-shadow: inset 0px 0px 10px black;
  display: flex;
  flex-direction: column;
  left: ${({ left }) => left};
  padding: 0 1.3em 0 1.3em;
  position: absolute;
  top: ${({ top }) => top};
  width: ${({ width }) => width || "25%"};
  z-index: 2;
`;
const Text = styled.p`
  font-family: ${({ fFamily }) => fFamily};
  font-size: 16px;
  text-align: center;
`;
const Button = styled.button`
  border: none;
  background: none;
  color: black;
  cursor: pointer;
  font-size: 10px;
  margin: 0 0 2% 0;
`;
