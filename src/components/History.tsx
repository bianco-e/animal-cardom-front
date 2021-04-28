import React from "react";
import styled from "styled-components";
import CardThumbnail from "./CardThumbnail";
import PlantThumbnail from "./PlantThumbnail";
import { cardSpeciesToLowerCase } from "../utils";
import { Game } from "../interfaces";
import { Message } from "./styled-components";

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
          return (
            <HistoryCard key={idx}>
              <Result bgColor={won ? "green" : "red"}>
                {won ? "Won" : "Lost"}
              </Result>
              <PlayerStats>
                <b>You</b>
                <CardsContainer>
                  {usedAnimals.user.map((card) => {
                    const isLittle: boolean = card.name.startsWith("Little");
                    const cardImage = `/images/animals/${
                      isLittle ? "" : "adult-"
                    }${cardSpeciesToLowerCase(card.name)}.webp`;
                    return (
                      <CardThumbnail
                        key={card.name}
                        disabled={!card.survived}
                        image={cardImage}
                        name={card.name}
                      ></CardThumbnail>
                    );
                  })}
                </CardsContainer>
                <CardsContainer>
                  {usedPlants.user.map((plant) => {
                    return (
                      <PlantThumbnail
                        key={plant.name}
                        disabled={!plant.applied}
                        image={`/images/plants/${plant.name.toLowerCase()}.webp`}
                        name={plant.name}
                      ></PlantThumbnail>
                    );
                  })}
                </CardsContainer>
              </PlayerStats>
              <PlayerStats>
                <b>PC</b>
                <CardsContainer>
                  {usedAnimals.pc.map((card) => {
                    return (
                      <CardThumbnail
                        key={card.name}
                        disabled={!card.survived}
                        image={`/images/animals/adult-${cardSpeciesToLowerCase(
                          card.name
                        )}.webp`}
                        name={card.name}
                      ></CardThumbnail>
                    );
                  })}
                </CardsContainer>
                <CardsContainer>
                  {usedPlants.pc.map((plant) => {
                    return (
                      <PlantThumbnail
                        key={plant.name}
                        disabled={!plant.applied}
                        image={`/images/plants/${plant.name.toLowerCase()}.webp`}
                        name={plant.name}
                      ></PlantThumbnail>
                    );
                  })}
                </CardsContainer>
              </PlayerStats>
              <DetailsPanel>
                <span className="terrain">{terrain}</span>
                <span className="date">XP: {xp_earned}</span>
                <span className="date">
                  {new Date(created_at).toLocaleDateString()}
                </span>
              </DetailsPanel>
            </HistoryCard>
          );
        })
      ) : (
        <Message>Mmm... Looks like you still didn't finish any game</Message>
      )}
    </Wrapper>
  );
}

interface ResultProps {
  bgColor?: string;
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
  border-radius: 5px;
  box-shadow: 0 0 10px 10px rgba(95, 57, 0, 0.2);
  display: flex;
  min-height: 80px;
  margin: 15px 0;
  padding: 15px 60px;
  position: relative;
  width: 75%;
`;
const DetailsPanel = styled.div`
  align-items: center;
  background: #d4a257;
  border-radius: 50px 50px 0 0;
  border: 2px solid #b9935a;
  border-bottom: 0;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  content: "";
  display: flex;
  flex-direction: column;
  height: 45px;
  justify-content: space-around;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 180px;
  bottom: 0;
  > .terrain {
    font-size: 11px;
  }
  > .date {
    font-size: 9px;
    font-weight: bold;
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
`;
const CardsContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 10px;
  justify-content: space-around;
  width: 85%;
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
