import { useContext, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { IAnimal } from "../interfaces";
import { ACButton } from "./styled-components";
import { animalPurchase } from "../queries/user";
import { getCookie } from "../utils";
import Spinner from "./Spinner";
import { BREAKPOINTS } from "../utils/constants";
import UserContext, { IUserContext } from "../context/UserContext";
import { SET_COINS } from "../context/UserContext/types";

interface IProps {
  animalToBuy: IAnimal;
  closeModal: () => void;
  ownedCards: string[];
  setOwnedCards: (cards: string[]) => void;
}
export default function ModalHandEditContent({
  animalToBuy,
  closeModal,
  ownedCards,
  setOwnedCards,
}: IProps) {
  const [state, dispatch] = useContext<IUserContext>(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    price,
  } = animalToBuy;

  const handleConfirm = () => {
    const authId = getCookie("auth=");
    if (authId) {
      setIsLoading(true);
      animalPurchase(authId, animalToBuy.name, animalToBuy.price).then(
        (res) => {
          if (res && res.new_card) {
            setIsLoading(false);
            dispatch({ type: SET_COINS, payload: state.coins - price });
            setOwnedCards(ownedCards.concat(res.new_card));
            closeModal();
          }
        }
      );
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Text>
            You are about to spend <b>{price} coins</b> to buy <b>{name}</b>
          </Text>
          <Container>
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
            />
          </Container>
          <Text className="remaining-coins">
            After this purchase you will remain{" "}
            <b>{state.coins - price} coins</b>
          </Text>
        </>
      )}
      <ACButton fWeight="bold" onClick={handleConfirm}>
        {isLoading ? "Buying..." : "Confirm"}
      </ACButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 5px 30px;
  width: 600px;
  > button {
    margin-top: 30px;
    width: 50%;
  }
`;
const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  width: 100%;
  > button {
    cursor: default;
    height: 270px;
    width: 220px;
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

  ${BREAKPOINTS.MOBILE} {
    > button {
      height: 200px;
      width: 20%;
    }
  }
`;
const Text = styled.span`
  &.remaining-coins {
    margin-top: 20px;
  }
  font-size: 18px;
`;
