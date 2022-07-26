import CardThumbnail from "../Card/Thumbnail"
import PlantThumbnail from "../Plant/Thumbnail"
import { cardSpeciesToLowerCase } from "../../utils"
import { Game } from "../../interfaces"
import { Message } from "../styled-components"
import {
  CardsContainer,
  DetailsPanel,
  HistoryCard,
  PlayerStats,
  Result,
  Wrapper,
} from "./styled"

interface IProps {
  lastGames: Game[]
}

export default function History({ lastGames }: IProps) {
  return (
    <Wrapper>
      {lastGames.length > 0 ? (
        lastGames.map((game, idx) => {
          const { won, used_animals, used_plants, terrain, created_at, earned_xp } = game
          const gameDate = new Date(created_at!)
          return (
            <HistoryCard terrain={terrain.toLowerCase()} key={idx}>
              <Result bgColor={won ? "#0B8A37" : "#dd5540"} className="spaced-title">
                {won ? "Won" : "Lost"}
              </Result>
              <PlayerStats>
                <b>You</b>
                <CardsContainer>
                  {used_animals.user.map(({ name, survived }) => {
                    const isLittle: boolean = name.startsWith("Little")
                    const cardImage = `/images/animals/${
                      isLittle ? "" : "adult-"
                    }${cardSpeciesToLowerCase(name)}.webp`
                    return (
                      <CardThumbnail
                        key={name}
                        disabled={!survived}
                        image={cardImage}
                        name={name}></CardThumbnail>
                    )
                  })}
                </CardsContainer>
                <CardsContainer>
                  {used_plants.user.map(({ name, applied }) => {
                    return (
                      <PlantThumbnail
                        key={name}
                        disabled={applied}
                        image={`/images/plants/${name.toLowerCase()}.webp`}
                        name={name}></PlantThumbnail>
                    )
                  })}
                </CardsContainer>
              </PlayerStats>
              <PlayerStats>
                <b>PC</b>
                <CardsContainer>
                  {used_animals.pc.map(({ name, survived }) => {
                    return (
                      <CardThumbnail
                        key={name}
                        disabled={!survived}
                        image={`/images/animals/adult-${cardSpeciesToLowerCase(
                          name
                        )}.webp`}
                        name={name}></CardThumbnail>
                    )
                  })}
                </CardsContainer>
                <CardsContainer>
                  {used_plants.pc.map(({ name, applied }) => {
                    return (
                      <PlantThumbnail
                        key={name}
                        disabled={applied}
                        image={`/images/plants/${name.toLowerCase()}.webp`}
                        name={name}></PlantThumbnail>
                    )
                  })}
                </CardsContainer>
              </PlayerStats>
              <DetailsPanel>
                <span>XP: {earned_xp}</span>
                <span>
                  {gameDate.toLocaleDateString()} - {gameDate.getHours()}:
                  {gameDate.getMinutes() < 10
                    ? `0${gameDate.getMinutes()}`
                    : gameDate.getMinutes()}
                </span>
              </DetailsPanel>
            </HistoryCard>
          )
        })
      ) : (
        <Message>Mmm... Looks like you still haven't finished any game</Message>
      )}
    </Wrapper>
  )
}
