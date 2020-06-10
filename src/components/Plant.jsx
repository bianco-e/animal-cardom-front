import React from "react";
import styled from "styled-components";

const Plant = ({ plant }) => {
  const { name, description, image } = plant;
  return (
    <PlantCard>
      <PlantName>{name}</PlantName>
      <Picture alt={name} title={description} src={image}></Picture>
    </PlantCard>
  );
};

const PlantCard = styled.button({
  marginBottom: "8px",
  padding: "2px",
  backgroundColor: "#d4a257",
  border: "none",
  minWidth: "70px",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "inset 0px 0px 2px black",
  ["&:hover"]: {
    boxShadow: "4px 4px 4px #b9935a, inset 0px 0px 5px black",
  },
  ["&:active"]: {
    boxShadow: "inset 0px 0px 20px black",
  },
});
const PlantName = styled.h6({
  margin: "0",
  fontSice: "10px",
});
const Picture = styled.img({
  width: "55px",
  height: "55px",
  alt: (props) => props.alt,
  borderRadius: "5px",
});

export default Plant;
