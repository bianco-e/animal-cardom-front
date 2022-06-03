import styled from "styled-components";
import { BREAKPOINTS } from "../utils/constants";
import { AnimalCard } from "./Card";

interface IProps {
  disabled: boolean;
  name: string;
  image: string;
}

export default function CardThumbnail({ image, disabled, name }: IProps) {
  return (
    <Card
      isCardSelected={false}
      isParalyzed={false}
      opacity={disabled ? "0.5" : "1"}
    >
      <span className="animal-name spaced-title">{name}</span>
      <img alt={name} className="animal-picture" src={image} />
    </Card>
  );
}

const Card = styled(AnimalCard)`
  cursor: default;
  height: 80px;
  width: calc(20% - 8px);
  > .animal-name {
    font-size: 8px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  > .animal-picture {
    border-radius: 16px;
    height: 32px;
    width: 95%;
  }
  &:hover {
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  }
  ${BREAKPOINTS.MOBILE} {
    > .animal-picture {
      border-radius: 10px;
    }
    height: 60px;
    width: 20%;
  }
`;
