import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import HandsContext, {
  IHandsContext,
  IHandsState,
} from "../context/HandsContext";
import { EMPTY_STATE, SET_CARDS } from "../context/HandsContext/types";
import { HandKey, ITerrain } from "../interfaces";
import { newRandomGame, newTerrain, saveGameResult } from "../queries/games";
import { getCookie } from "../utils";
import AvatarWithXpBar from "./AvatarWithXpBar";
import Spinner from "./Spinner";
import { ACButton, ModalTitle, Text } from "./styled-components";

const getGameEarning = (
  currentXp: number,
  xpParam: number
): { xpToEarn: number; earnedAnimal?: string } => {
  if (xpParam >= currentXp) {
    switch (currentXp) {
      case 1350:
        return { xpToEarn: 450, earnedAnimal: "Frog" };
      case 1800:
        return { xpToEarn: 450, earnedAnimal: "Bee" };
      case 2250:
        return { xpToEarn: 450, earnedAnimal: "Pelican" };
      case 2700:
        return { xpToEarn: 450, earnedAnimal: "Orc" };
      case 3150:
        return { xpToEarn: 450, earnedAnimal: "Snake" };
      case 3600:
        return { xpToEarn: 450, earnedAnimal: "Lion" };
      default:
        return { xpToEarn: 450, earnedAnimal: undefined };
    }
  }
  return { xpToEarn: 0, earnedAnimal: undefined };
};

interface IProps {
  closeModal: () => void;
  currentXp?: number;
  isCampaignGame: boolean;
  modal: string;
  setTerrain: (terrain: ITerrain) => void;
}
export default function ModalResultContent({
  closeModal,
  currentXp,
  isCampaignGame,
  modal,
  setTerrain,
}: IProps) {
  const [state, dispatch] = useContext<IHandsContext>(HandsContext);
  const [isLoadingNewGame, setisLoadingNewGame] = useState<boolean>(false);
  const [showEarnedAnimal, setShowEarnedAnimal] = useState<string>();
  const [earnedCoins, setEarnedCoins] = useState<number>(1);
  const [havingXp, setHavingXp] = useState<number>(0);
  const history = useHistory();
  const { search } = useLocation();

  const getStatsToSaveGame = (
    authId: string,
    won: boolean,
    state: IHandsState
  ): void => {
    const mapCardsToSave = (handKey: HandKey) =>
      state.hands[handKey].map((card) => ({
        name: card.name,
        survived: card.life.current !== "DEAD",
      }));
    const mapPlantsToSave = (handKey: HandKey) =>
      state.plants[handKey].map((plant) => {
        const wasApplied = state.usedPlants.find((pl) => pl.name === plant.name)
          ? true
          : false;
        return {
          name: plant.name,
          applied: wasApplied,
        };
      });
    const xpParam = parseInt(search.split("?x=")[1]);
    const gameEarning =
      currentXp !== undefined
        ? getGameEarning(currentXp, xpParam)
        : { xpToEarn: 0, earnedAnimal: undefined };
    const { xpToEarn, earnedAnimal } = gameEarning;
    const coinsToEarn = won ? 5 : 1;
    setEarnedCoins(coinsToEarn);

    const gameToSave = {
      terrain: state.terrainName!,
      earned_animal: won ? earnedAnimal : undefined,
      coins_earned: coinsToEarn,
      xp_earned: won ? xpToEarn : 0,
      won,
      usedAnimals: {
        pc: mapCardsToSave("pc"),
        user: mapCardsToSave("user"),
      },
      usedPlants: {
        pc: mapPlantsToSave("pc"),
        user: mapPlantsToSave("user"),
      },
    };

    saveGameResult(authId, gameToSave).then((res) => {
      if (res && res.xp !== undefined) {
        setHavingXp(res.xp);
        if (res.earned_animal) {
          setShowEarnedAnimal(res.earned_animal);
        }
      }
    });
  };

  useEffect(() => {
    const authId = getCookie("auth=");
    if (isCampaignGame && authId) {
      getStatsToSaveGame(authId, modal === "win", state);
    }
  }, []); //eslint-disable-line

  const handleRoute = (path: string) => {
    dispatch({ type: EMPTY_STATE });
    history.push(path);
  };

  const handlePlayAgain = () => {
    dispatch({ type: EMPTY_STATE });
    setisLoadingNewGame(true);
    newTerrain().then((terrainRes) => {
      if (terrainRes && terrainRes.name) {
        setTerrain(terrainRes);
        newRandomGame().then((gameRes) => {
          if (gameRes && gameRes.pc && gameRes.user) {
            setisLoadingNewGame(false);
            closeModal();
            dispatch({
              type: SET_CARDS,
              hands: { pc: gameRes.pc.animals, user: gameRes.user.animals },
              plants: { pc: gameRes.pc.plants, user: gameRes.user.plants },
              terrain: terrainRes,
            });
          }
        });
      }
    });
  };

  return (
    <Wrapper>
      {modal === "win" ? (
        <>
          <ModalTitle>You won!</ModalTitle>
          <Text margin={isCampaignGame ? "0 0 20px 0" : "0"}>
            Good game! Nature always win against computers!
          </Text>
        </>
      ) : (
        modal === "lose" && (
          <>
            <ModalTitle>You lost!</ModalTitle>
            <Text margin={isCampaignGame ? "0 0 20px 0" : "0"}>
              Nice try! PC defeated you this time, but nature always takes
              revenge!
            </Text>
          </>
        )
      )}
      {isCampaignGame ? (
        <>
          <AvatarWithXpBar havingXp={havingXp} />
          {showEarnedAnimal && (
            <>
              <p>You have earned a new animal.</p>
              <span>
                Go to Collection to check your <b>{showEarnedAnimal}</b>
              </span>
            </>
          )}
          <div className="earned-coins">
            <b>{earnedCoins}</b>
            <img alt="coins" src="/images/icons/coins.png" width={15} />
          </div>
          <ACButton margin="20px 0" onClick={() => handleRoute("/campaign")}>
            Go to campaign menu
          </ACButton>
        </>
      ) : (
        <>
          {isLoadingNewGame ? (
            <Spinner />
          ) : (
            <>
              <ACButton margin="10px 0 5px 0" onClick={handlePlayAgain}>
                Play again
              </ACButton>
              <ACButton margin="5px 0" onClick={() => handleRoute("/")}>
                Go to menu
              </ACButton>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  > .earned-coins {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-top: 15px;
    > b {
      margin-right: 5px;
    }
  }
`;
