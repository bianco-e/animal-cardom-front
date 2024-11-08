import { useAppSelector } from "../../hooks/redux-hooks"
import { CampaignState } from "../../interfaces"
import styles from "../../styles"
import { Wrapper } from "./styled"
const STROKE_WIDTH = 11
const CIRCLE_RADIUS = 70

export default function AvatarWithXpBar() {
  const { level }: CampaignState = useAppSelector(({ campaign }) => campaign)

  return (
    <Wrapper>
      <svg height="170" width="170">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={styles.primary_violet} />
            <stop offset="100%" stopColor={styles.secondary_violet} />
          </linearGradient>
        </defs>
        <circle
          className="progress-ring__circle"
          strokeWidth={STROKE_WIDTH}
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
