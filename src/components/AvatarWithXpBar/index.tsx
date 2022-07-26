import { useEffect, useState } from "react"
import { Wrapper } from "./styled"
const MAX_XP = 1000
const STROKE_WIDTH = 11
const CIRCLE_RADIUS = 70
const CIRCLE_CIRCUMFERENCE = CIRCLE_RADIUS * 2 * Math.PI

export default function AvatarWithXpBar({ xp }: { xp: number }) {
  const [dashoffset, setDashoffset] = useState<number>(CIRCLE_CIRCUMFERENCE)
  const [level, setLevel] = useState<number>()

  useEffect(() => {
    const currentLvlXp = xp % MAX_XP
    const percent = (currentLvlXp * 100) / MAX_XP
    setLevel(Math.floor(xp / MAX_XP) + 1)
    setDashoffset(CIRCLE_CIRCUMFERENCE - (percent / 100) * CIRCLE_CIRCUMFERENCE)
  }, [xp])

  return (
    <Wrapper
      dasharray={`${CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`}
      dashoffset={dashoffset}>
      <svg height="170" width="170">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#5f0a87" />
            <stop offset="100%" stop-color="#a4508b" />
          </linearGradient>
        </defs>
        <circle
          className="progress-ring__circle"
          stroke-width={STROKE_WIDTH}
          fill="transparent"
          r={CIRCLE_RADIUS}
          cx={CIRCLE_RADIUS + STROKE_WIDTH * 2}
          cy={CIRCLE_RADIUS + STROKE_WIDTH * 2}
        />
      </svg>
      <img alt="avatar" src="/images/welcome-background.png" height={135} width={135} />
      <span>
        Lv. <b>{level}</b>
      </span>
    </Wrapper>
  )
}
