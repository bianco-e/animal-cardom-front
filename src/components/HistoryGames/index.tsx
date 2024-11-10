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
import styles from "../../styles"

interface IProps {
  lastGames: Game[]
}

export default function History({ lastGames }: IProps) {
  return (
    <Wrapper>
      {lastGames.length ? (
        lastGames.map((game, idx) => {
          const {
            user_won,
            user_used_animals,
            pc_used_animals,
            pc_used_plants,
            user_used_plants,
            habitat_name,
            created_at,
          } = game
          const gameDate = new Date(created_at)
          return (
            <HistoryCard $habitat={habitat_name.toLowerCase()} key={idx}>
              <Result
                $bgColor={user_won ? styles.primary_green : styles.primary_red}
                className="spaced-title">
                {user_won ? "Won" : "Lost"}
              </Result>
              <PlayerStats>
                <b>You</b>
                <CardsContainer>
                  {user_used_animals.map(({ name, finished_game }) => {
                    if (!name) return null
                    const cardImage = `/images/animals/adult-${cardSpeciesToLowerCase(
                      name
                    )}.webp`
                    return (
                      <CardThumbnail
                        key={name}
                        disabled={!finished_game}
                        image={cardImage}
                        name={name}
                      />
                    )
                  })}
                </CardsContainer>
                <CardsContainer>
                  {user_used_plants.map(({ name, finished_game }) => {
                    if (!name) return null
                    return (
                      <PlantThumbnail
                        key={name}
                        disabled={finished_game}
                        image={`/images/plants/${name.toLowerCase()}.webp`}
                        name={name}
                      />
                    )
                  })}
                </CardsContainer>
              </PlayerStats>
              <PlayerStats>
                <b>PC</b>
                <CardsContainer>
                  {pc_used_animals.map(({ name, finished_game }) => {
                    if (!name) return null
                    return (
                      <CardThumbnail
                        key={name}
                        disabled={!finished_game}
                        image={`/images/animals/adult-${cardSpeciesToLowerCase(
                          name
                        )}.webp`}
                        name={name}
                      />
                    )
                  })}
                </CardsContainer>
                <CardsContainer>
                  {pc_used_plants.map(({ name, finished_game }) => {
                    if (!name) return null
                    return (
                      <PlantThumbnail
                        key={name}
                        disabled={finished_game}
                        image={`/images/plants/${name.toLowerCase()}.webp`}
                        name={name}
                      />
                    )
                  })}
                </CardsContainer>
              </PlayerStats>
              <DetailsPanel>
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
