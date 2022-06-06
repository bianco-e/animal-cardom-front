import styled from "styled-components";
import { IAnimal } from "../interfaces";
import { BREAKPOINTS } from "../utils/constants";
import Card from "./Card";

interface IProps {
  hand: IAnimal[];
  belongsToUser: boolean;
}

export default function Hand({ hand, belongsToUser }: IProps) {
  return (
    <CardsGroup>
      {hand.map((animal) => {
        const {
          attack,
          bleeding,
          image,
          life,
          missing_chance,
          name,
          paralyzed,
          poisoned,
          skill,
          species,
          targeteable,
        } = animal;
        return (
          <Card
            attack={attack}
            belongsToUser={belongsToUser}
            bleeding={bleeding}
            image={image}
            key={name}
            life={life}
            missingChance={missing_chance}
            name={name}
            paralyzed={paralyzed}
            poisoned={poisoned}
            skill={skill}
            species={species}
            targeteable={targeteable}
          />
        );
      })}
    </CardsGroup>
  );
}

const CardsGroup = styled.div`
  align-items: center;
  display: flex;
  height: 37%;
  justify-content: space-between;
  width: 100%;

  ${BREAKPOINTS.MOBILE} {
    height: 45%;
  }
`;
