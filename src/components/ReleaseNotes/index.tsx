import React, { useEffect, useState } from "react"
import { getAnimalsStatistics } from "../../queries/animalsCards"
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
}

interface Statistics {
  count: number
  species: {
    "🐸": StatisticsData
    "🦅": StatisticsData
    "🦈": StatisticsData
    "🦂": StatisticsData
    "🐺": StatisticsData
    "🦎": StatisticsData
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
    const statisticsRes = await getAnimalsStatistics()
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
            const { count, highest_attack, highest_life } = value
            return (
              <NotesContainer key={key}>
                <span>
                  <b>{key}</b> is the habitat for <b>{count}</b> animals
                </span>
                <span>
                  <b className="spaced-title">{highest_attack.name}</b> is the one with
                  the greatest attack <b>({highest_attack.attack})</b>
                </span>
                <span>
                  <b className="spaced-title">{highest_life.name}</b> is the one with the
                  greatest life <b>({highest_life.life})</b>
                </span>
              </NotesContainer>
            )
          })}

        <hr />

        {Object.entries(statistics.species)
          .filter(([k]) => k !== "count")
          .map(([key, value]) => {
            const { count, highest_attack, highest_life } = value
            return (
              <NotesContainer key={key}>
                <span>
                  <b>{count}</b> animals belong to {key} species
                </span>
                <span>
                  <b className="spaced-title">{highest_attack.name}</b> is the {key} with
                  the greatest attack <b>({highest_attack.attack})</b>
                </span>
                <span>
                  <b className="spaced-title">{highest_life.name}</b> is the {key} with
                  the greatest life <b>({highest_life.life})</b>
                </span>
              </NotesContainer>
            )
          })}
      </NotesWrapper>
    </Accordion>
  ) : null
}
