import { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { IAnimal } from "../interfaces";
import { ACButton } from "./styled-components";
import { updateHand } from "../queries/user";
import { getCookie } from "../utils";
import Spinner from "./Spinner";
import { SMALL_RESPONSIVE_BREAK } from "../utils/constants";

interface IProps {
  hand: IAnimal[];
  animalToAdd: IAnimal;
  closeModal: () => void;
  handSetter: (newHand: string[]) => void;
}
export default function ModalHandEditContent({
  animalToAdd,
  closeModal,
  hand,
  handSetter,
}: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentHand, setCurrentHand] = useState<IAnimal[]>(hand);
  const [enteringAnimal, setEnteringAnimal] = useState<IAnimal>(animalToAdd);

  const handleSelection = (name: string) => {
    if (!currentHand.find((card) => card.name === enteringAnimal.name)) {
      const newHand = currentHand.map((card) => {
        if (card.name === name) {
          return enteringAnimal;
        } else return card;
      });
      setEnteringAnimal(currentHand.find((card) => card.name === name)!);
      setCurrentHand(newHand);
    }
  };

  const handleConfirm = () => {
    const authId = getCookie("auth=");
    const handNames = currentHand.map((card) => card.name);
    if (authId) {
      setIsLoading(true);
      updateHand(authId, handNames).then((res) => {
        if (res && res.length) {
          setIsLoading(false);
          handSetter(res);
          closeModal();
        }
      });
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Container>
            <Card
              attack={enteringAnimal.attack}
              belongsToUser={false}
              bleeding={enteringAnimal.bleeding}
              species={enteringAnimal.species}
              image={enteringAnimal.image}
              key={enteringAnimal.name}
              life={enteringAnimal.life}
              opacityForPreview="1"
              paralyzed={enteringAnimal.paralyzed}
              poisoned={enteringAnimal.poisoned}
              skill={enteringAnimal.skill}
              name={enteringAnimal.name}
              targeteable={enteringAnimal.targeteable}
            />
          </Container>
          <Text>
            Select an animal to switch for <b>{enteringAnimal.name}</b>
          </Text>
          <Container className="current-hand">
            {currentHand.map((card) => {
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
                  onPreviewClick={handleSelection}
                  opacityForPreview="1"
                  paralyzed={paralyzed}
                  poisoned={poisoned}
                  skill={skill}
                  name={name}
                  targeteable={targeteable}
                />
              );
            })}
          </Container>
        </>
      )}
      <ACButton fWeight="bold" onClick={handleConfirm}>
        {isLoading ? "Saving..." : "Confirm"}
      </ACButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 5px 30px;
  width: 100%;
  > button {
    margin-top: 30px;
    width: 50%;
  }
`;
const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  width: 100%;
  > button {
    cursor: default;
    height: 230px;
    width: 19%;
    > .animal-name {
      font-size: 16px;
    }
    > div > div {
      > span.skill {
        font-size: 10px;
      }
      > img.small-icon {
        height: 12px;
        width: 12px;
      }
    }
    > div > span.skill {
      font-size: 10px;
    }
    &:hover {
      box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
      transform: none;
    }
  }
  &.current-hand {
    > button {
      cursor: pointer;
    }
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    > button {
      height: 200px;
      width: 20%;
    }
  }
`;
const Text = styled.span`
  margin: 20px 0;
  font-size: 18px;
`;
