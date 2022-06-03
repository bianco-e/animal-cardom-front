import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  button {
    background: none;
    border: 0;
    cursor: pointer;
  }

  .spaced-title {
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0.1em;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: none;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #e3cdac;
    border-radius: 20px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #b9935a;
    border-radius: 20px;
  }
`;

const styles = {
  //colors
  primary_brown: "#d4a257",
  secondary_brown: "#b9935a",
  light_brown: "#e3cdac",
  xp_primary_violet: "#5f0a87",
  xp_secondary_violet: "#a4508b",
  primary_red: "#dd5540",
  primary_green: "#0B8A37",
  primary_yellow: "#ffdf0f",
  poison_green: "#23954B",

  //sizes
  $1: "40px",
  $2: "32px",
  $3: "24px",
  $4: "16px",
  $5: "12px",
  $6: "8px",
  $7: "4px",
};
export default styles;
