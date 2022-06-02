import { useEffect, useState } from "react";
import styled from "styled-components";
import AccordionSection from "../components/AccordionSection";
import Card from "../components/Card";
import MenuLayout from "../components/MenuLayout";
import Rules from "../components/Rules";
import Spinner from "../components/Spinner";
import { IAnimal } from "../interfaces";
import { getNewestAnimals } from "../queries/animalsCards";
import { BREAKPOINTS } from "../utils/constants";

export default function Menu() {
  const [newestAnimals, setNewestAnimals] = useState<IAnimal[]>([]);
  useEffect(() => {
    getNewestAnimals().then((res) => {
      if (res && res.animals) {
        setNewestAnimals(res.animals);
      }
    });
  }, []);
  return (
    <MenuLayout>
      <>
        <Wrapper>
          <Title>Newest animals</Title>
          {!(newestAnimals.length > 0) ? (
            <Spinner />
          ) : (
            <div>
              {newestAnimals.map((card) => {
                const {
                  attack,
                  bleeding,
                  name,
                  image,
                  life,
                  paralyzed,
                  poisoned,
                  skill,
                  species,
                  targeteable,
                } = card;
                return (
                  <Card
                    attack={attack}
                    belongsToUser={false}
                    bleeding={bleeding}
                    species={species}
                    image={image}
                    key={name}
                    life={life}
                    opacityForPreview="1"
                    paralyzed={paralyzed}
                    poisoned={poisoned}
                    skill={skill}
                    name={name}
                    targeteable={targeteable}
                  ></Card>
                );
              })}
            </div>
          )}
        </Wrapper>
        <AccordionSection title="How to play">
          <TextContainer>
            <Rules />
          </TextContainer>
        </AccordionSection>
        <AccordionSection title="Terrains">
          <TextContainer>
            <span>
              There are 7 different terrains. One is randomly set when game
              begins and benefits a species increasing attack by 1
            </span>
            <ul>
              <li>
                <b>Neutral</b> doesn't buff any animal
              </li>
              <li>
                <b>Swamp</b> buffs 🐸 animals
              </li>
              <li>
                <b>Desert</b> buffs 🦂 animals
              </li>
              <li>
                <b>Mountain</b> buffs 🦅 animals
              </li>
              <li>
                <b>Sea</b> buffs 🦈 animals
              </li>
              <li>
                <b>Forest</b> buffs 🦎 animals
              </li>
              <li>
                <b>Jungle</b> buffs 🐺 animals
              </li>
            </ul>
          </TextContainer>
        </AccordionSection>
      </>
    </MenuLayout>
  );
}

const Wrapper = styled.div`
  align-items: center;
  background-image: url("/images/welcome-background.png");
  background-size: cover;
  background-position: bottom;
  border-radius: 5px;
  box-shadow: 0 0 10px 10px rgba(95, 57, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 80px;
  padding: 30px 60px;
  position: relative;
  width: 75%;
  > div {
    align-items: center;
    display: flex;
    justify-content: space-around;
    padding: 45px 0 15px 0;
    > button {
      cursor: default;
      height: 280px;
      margin-bottom: 16px;
      width: 23%;
      > .animal-name {
        font-size: 18px;
      }
      &:hover {
        box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
        transform: none;
      }
    }
  }
  ${BREAKPOINTS.MOBILE} {
    > div {
      width: 100%;
      > button {
        height: 190px;
        width: 33%;
        > .animal-name {
          font-size: 15px;
        }
      }
    }
  }
`;
const TextContainer = styled.div`
  background: ${({ theme }) => theme.primary_brown};
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  padding: 30px 60px;
  width: 75%;
  > span {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  > ul {
    list-style-position: inside;
    padding: 0;
    > li {
      margin-bottom: 10px;
    }
  }
`;
const Title = styled.span`
  font-weight: bold;
  font-size: 20px;
`;
