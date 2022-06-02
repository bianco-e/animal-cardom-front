import styled from "styled-components";
import CardThumbnail from "./CardThumbnail";
import PlantThumbnail from "./PlantThumbnail";
import { cardSpeciesToLowerCase } from "../utils";
import { Game } from "../interfaces";
import { Message } from "./styled-components";
import { BREAKPOINTS } from "../utils/constants";

interface IProps {
  lastGames: Game[];
}

export default function History({ lastGames }: IProps) {
  return (
    <Wrapper>
      {lastGames.length > 0 ? (
        lastGames.map((game, idx) => {
          const {
            won,
            usedAnimals,
            usedPlants,
            terrain,
            created_at,
            xp_earned,
          } = game;
          const gameDate = new Date(created_at!);
          return (
            <HistoryCard terrain={terrain.toLowerCase()} key={idx}>
              <Result bgColor={won ? "#0B8A37" : "#dd5540"}>
                {won ? "Won" : "Lost"}
              </Result>
              <PlayerStats>
                <b>You</b>
                <CardsContainer>
                  {usedAnimals.user.map(({ name, survived }) => {
                    const isLittle: boolean = name.startsWith("Little");
                    const cardImage = `/images/animals/${
                      isLittle ? "" : "adult-"
                    }${cardSpeciesToLowerCase(name)}.webp`;
                    return (
                      <CardThumbnail
                        key={name}
                        disabled={!survived}
                        image={cardImage}
                        name={name}
                      ></CardThumbnail>
                    );
                  })}
                </CardsContainer>
                <CardsContainer>
                  {usedPlants.user.map(({ name, applied }) => {
                    return (
                      <PlantThumbnail
                        key={name}
                        disabled={applied}
                        image={`/images/plants/${name.toLowerCase()}.webp`}
                        name={name}
                      ></PlantThumbnail>
                    );
                  })}
                </CardsContainer>
              </PlayerStats>
              <PlayerStats>
                <b>PC</b>
                <CardsContainer>
                  {usedAnimals.pc.map(({ name, survived }) => {
                    return (
                      <CardThumbnail
                        key={name}
                        disabled={!survived}
                        image={`/images/animals/adult-${cardSpeciesToLowerCase(
                          name
                        )}.webp`}
                        name={name}
                      ></CardThumbnail>
                    );
                  })}
                </CardsContainer>
                <CardsContainer>
                  {usedPlants.pc.map(({ name, applied }) => {
                    return (
                      <PlantThumbnail
                        key={name}
                        disabled={applied}
                        image={`/images/plants/${name.toLowerCase()}.webp`}
                        name={name}
                      ></PlantThumbnail>
                    );
                  })}
                </CardsContainer>
              </PlayerStats>
              <DetailsPanel>
                <span>XP: {xp_earned}</span>
                <span>
                  {gameDate.toLocaleDateString()} - {gameDate.getHours()}:
                  {gameDate.getMinutes() < 10
                    ? `0${gameDate.getMinutes()}`
                    : gameDate.getMinutes()}
                </span>
              </DetailsPanel>
            </HistoryCard>
          );
        })
      ) : (
        <Message>Mmm... Looks like you still haven't finished any game</Message>
      )}
    </Wrapper>
  );
}

interface ResultProps {
  bgColor?: string;
}

interface HistoryCardProps {
  terrain?: string;
}
const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  width: 100%;
  overflow-y: auto;
`;
const HistoryCard = styled.div`
  align-items: center;
  background-image: ${(p: HistoryCardProps) =>
    `url('/images/terrains/${p.terrain}.webp')`};
  background-position: center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: 0 0 10px 10px rgba(95, 57, 0, 0.2);
  display: flex;
  min-height: 80px;
  margin: 15px 0;
  padding: 15px 60px 5px 60px;
  position: relative;
  width: 75%;
`;
const DetailsPanel = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.primary_brown};
  border-radius: 50px 50px 0 0;
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  border-bottom: 0;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  content: "";
  display: flex;
  flex-direction: column;
  height: 40px;
  justify-content: center;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 180px;
  bottom: 0;
  > span {
    font-size: 10px;
    font-weight: bold;
    margin-bottom: 2px;
    &:last-child {
      font-size: 9px;
      margin-bottom: 0;
    }
  }
  ${BREAKPOINTS.MOBILE} {
    height: 30px;
  }
`;
const PlayerStats = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 50%;
  > b {
    margin-bottom: 10px;
  }
  ${BREAKPOINTS.MOBILE} {
    margin: 0 auto;
    width: 47%;
    &:first-child {
      margin-right: 2px;
    }
    &:last-child {
      margin-left: 2px;
    }
  }
`;
const CardsContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 10px;
  justify-content: space-around;
  width: 85%;
  ${BREAKPOINTS.MOBILE} {
    justify-content: space-between;
    &:last-child {
      padding-bottom: 20px;
    }
    width: 100%;
  }
`;
const Result = styled.span`
  background: ${(p: ResultProps) => p.bgColor};
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 2px 10px;
  position: absolute;
  transform: rotate(-30deg);
  left: -2px;
  top: 8px;
`;
