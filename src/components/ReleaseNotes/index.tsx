import { useEffect, useState } from "react"
import { getAnimalsStats } from "../../queries/animalsCards"
import { NotesContainer, NotesWrapper, Subtitle, Title } from "./styled"
import Accordion from "../Common/Accordion"

interface StatisticsData {
  count: number
  highest_attack: {
    name: string
    attack: number
  }
  highest_life: {
    name: string
    life: number
  }
  lowest_attack: {
    name: string
    attack: number
  }
  lowest_life: {
    name: string
    life: number
  }
}

interface Statistics {
  count: number
  species: {
    Amphibian: StatisticsData
    Bird: StatisticsData
    Fish: StatisticsData
    Insect: StatisticsData
    Mammal: StatisticsData
    Reptile: StatisticsData
  }
  habitat: {
    Swamp: StatisticsData
    Mountain: StatisticsData
    Sea: StatisticsData
    Desert: StatisticsData
    Jungle: StatisticsData
    Forest: StatisticsData
  }
}

export default function ReleaseNotes() {
  const [statistics, setStatistics] = useState<Statistics>()

  const fetchStatistics = async () => {
    const statisticsRes = await getAnimalsStats()
    if (!statisticsRes || statisticsRes.error) return
    setStatistics(statisticsRes)
  }

  useEffect(() => {
    fetchStatistics()
  }, [])

  return statistics ? (
    <Accordion startClosed title="Release Notes" width="85%">
      <NotesWrapper>
        <Title>Version 0.7.0</Title>
        <Subtitle>Current animals</Subtitle>
        <span>
          This version has <b>{statistics.count}</b> different animals:
        </span>
        {Object.entries(statistics.habitat)
          .filter(([k]) => k !== "count")
          .map(([key, value]) => {
            const { count, highest_attack, highest_life, lowest_attack, lowest_life } =
              value
            return (
              <NotesContainer key={key}>
                <span>
                  <b>{key}</b> is the habitat for <b>{count}</b> animals
                </span>
                <span>
                  <b className="spaced-title">{highest_attack.name}</b> is the one with
                  the greatest attack <b>{highest_attack.attack}</b>
                </span>
                <span>
                  <b className="spaced-title">{highest_life.name}</b> is the one with the
                  greatest life <b>{highest_life.life}</b>
                </span>
                <span>
                  <b className="spaced-title">{lowest_attack.name}</b> is the one with the
                  lowest attack <b>{lowest_attack.attack}</b>
                </span>
                <span>
                  <b className="spaced-title">{lowest_life.name}</b> is the one with the
                  lowest life <b>{lowest_life.life}</b>
                </span>
              </NotesContainer>
            )
          })}

        <hr />

        {Object.entries(statistics.species)
          .filter(([k]) => k !== "count")
          .map(([key, value]) => {
            const { count, highest_attack, highest_life, lowest_attack, lowest_life } =
              value
            return (
              <NotesContainer key={key}>
                <span>
                  <b>{count}</b> animals belong to <b>{key}</b> species
                </span>
                <span>
                  <b className="spaced-title">{highest_attack.name}</b> is the {key} with
                  the greatest attack <b>({highest_attack.attack})</b>
                </span>
                <span>
                  <b className="spaced-title">{highest_life.name}</b> is the {key} with
                  the greatest life <b>({highest_life.life})</b>
                </span>
                <span>
                  <b className="spaced-title">{lowest_attack.name}</b> is the {key} with
                  the lowest attack <b>({lowest_attack.attack})</b>
                </span>
                <span>
                  <b className="spaced-title">{lowest_life.name}</b> is the {key} with the
                  lowest life <b>({lowest_life.life})</b>
                </span>
              </NotesContainer>
            )
          })}
      </NotesWrapper>
    </Accordion>
  ) : null
}
