import React, { useEffect, useState } from "react"
import { getAnimalsStatistics } from "../../queries/animalsCards"
import { NotesWrapper, Title } from "./styled"
import Accordion from "../Common/Accordion"

interface StatisticsData {
  quantity: number
  highestAttack: {
    name: string
    attack: number
  }
  highestLife: {
    name: string
    life: number
  }
}

interface Statistics {
  all: number
  "🐸": StatisticsData
  "🦅": StatisticsData
  "🦈": StatisticsData
  "🦂": StatisticsData
  "🐺": StatisticsData
  "🦎": StatisticsData
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
        <span>
          This version has <b>{statistics.all}</b> different animals:
        </span>
        {Object.entries(statistics)
          .filter(([k]) => k !== "all")
          .map(([key, value]) => {
            const { quantity, highestAttack, highestLife } = value
            return (
              <React.Fragment key={key}>
                <p>{key}</p>
                <span>
                  <b>{quantity}</b> animals belong to this species
                </span>
                <span>
                  <b className="spaced-title">{highestAttack.name}</b> is the one with the
                  greatest attack <b>({highestAttack.attack})</b>
                </span>
                <span>
                  <b className="spaced-title">{highestLife.name}</b> is the one with the
                  greatest life <b>({highestLife.life})</b>
                </span>
              </React.Fragment>
            )
          })}
      </NotesWrapper>
    </Accordion>
  ) : null
}
