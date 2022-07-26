import { useContext, useEffect } from "react"
import { CARD_ICONS } from "../../data/data"
import HandsContext from "../../context/HandsContext"
import { SELECT_CARD } from "../../context/HandsContext/types"
import { Poisoned, Skill, Stat } from "../../interfaces"
import {
  attackAnimation,
  attackAudio,
  selectionAnimation,
} from "../../animations/card-animations"
import usePlantAnimation from "../../hooks/usePlantAnimation"
import Tooltip from "../Tooltip"
import {
  AnimalCard,
  CornerIconContainer,
  DescriptionContainer,
  FlexSection,
  Image,
  Injury,
  PlantEffectImage,
  StatsWrapper,
  Text,
} from "./styled"

interface IProps {
  attack: Stat<number>
  belongsToUser?: boolean
  bleeding: boolean
  displayInHandSign?: boolean
  species: string
  image: string
  life: Stat<number | string>
  missingChance?: number
  onPreviewClick?: (name: string) => void
  opacityForPreview?: string
  paralyzed: number
  poisoned: Poisoned
  skill: Skill
  name: string
  targeteable: boolean
}

export default function Card({
  attack,
  belongsToUser,
  bleeding,
  displayInHandSign,
  image,
  life,
  missingChance,
  name,
  onPreviewClick,
  opacityForPreview,
  paralyzed,
  poisoned,
  skill,
  species,
  targeteable,
}: IProps) {
  const [state, dispatch] = useContext(HandsContext)
  const isForPreview = !!opacityForPreview
  const isParalyzed = paralyzed > 0
  const isCardSelected = !isForPreview && state.attacker?.name === name
  const isCardUnderAttack = state.underAttack === name
  const hasCondition = !targeteable || missingChance
  const soundState = localStorage.getItem("sound")
  const [animationProps] = usePlantAnimation({ name, soundState })

  useEffect(() => {
    isCardUnderAttack && soundState === "on" && attackAudio.play()
  }, [isCardUnderAttack, soundState])

  const styledProps = isForPreview
    ? {
        attackAnimation: undefined,
        selectionAnimation: undefined,
        className: "card",
        cursor: onPreviewClick ? "pointer" : "default",
        isCardSelected,
        isParalyzed,
        onClick: () => onPreviewClick && onPreviewClick(name),
        opacity: opacityForPreview ? opacityForPreview : "1",
        transform: "",
      }
    : {
        attackAnimation: isCardUnderAttack ? attackAnimation : undefined,
        selectionAnimation: isCardSelected ? selectionAnimation : undefined,
        cursor: "pointer",
        isCardSelected,
        isParalyzed,
        onClick: () => !state.pcTurn && dispatch({ type: SELECT_CARD, name }),
        opacity: `${life.current === "DEAD" ? "0.5" : "1"}`,
        transform: belongsToUser ? "translateY(-8px)" : "",
      }

  const getStatColor = (stat: Stat<number | string>): string =>
    stat.current > stat.initial ? "#a4508b" : stat.current < stat.initial ? "red" : ""

  return (
    <AnimalCard {...styledProps}>
      {displayInHandSign ? <span className="in-hand spaced-title">HAND</span> : null}

      {isCardUnderAttack ? (
        <Injury draggable="false" alt="wound" src="/images/svg/blood-splatter.svg" />
      ) : null}

      {animationProps ? <PlantEffectImage {...animationProps} /> : null}

      <CornerIconContainer>
        <span>{species}</span>
      </CornerIconContainer>

      {hasCondition ? (
        <CornerIconContainer className="animal-condition">
          {!targeteable ? (
            <>
              <Tooltip
                direction="BOTTOM-LEFT"
                title="Untargeteable"
                description={`${name} can't be attacked until it attacks first`}
              />
              <span>{`\u{1F6AB}`}</span>
            </>
          ) : null}
          {missingChance ? (
            <>
              <Tooltip
                direction="BOTTOM-LEFT"
                title="Missing chance"
                description={`${name} has ${missingChance}% chance of missing the attack`}
              />
              <Image className="missing-chance-icon" src={CARD_ICONS.MISSING} />
            </>
          ) : null}
        </CornerIconContainer>
      ) : null}

      <Text className="animal-name spaced-title">{name}</Text>

      <Image className="animal-picture" draggable="false" src={image} />

      <DescriptionContainer>
        <FlexSection mBottom="1px">
          {!skill.types.includes("none") && (
            <Image
              className="small-icon"
              src={
                skill.types.includes("defensive") ? CARD_ICONS.DEFENSE : CARD_ICONS.FURY
              }
            />
          )}
          <Text className="skill-name spaced-title" lineThrough={isParalyzed}>
            {skill.name}
          </Text>
          {isParalyzed ? <span className="paralyzed">({paralyzed})</span> : null}
        </FlexSection>
        <Text className="skill" fWeight="regular" lineThrough={isParalyzed}>
          {skill.description}
        </Text>
      </DescriptionContainer>

      <StatsWrapper>
        <div className="stats-container">
          <Image className="small-icon" src={CARD_ICONS.ATTACK} />
          <Text className="stats spaced-title" color={getStatColor(attack)}>
            {attack.current}
          </Text>
        </div>
        {bleeding ? (
          <div className="statuses">
            <Tooltip
              title={`${name} is bleeding`}
              description={`Every turn ${name} gets 1 damage. It can be stopped with a plant`}
            />
            <Image className="blood-drop" src={CARD_ICONS.BLOOD} />
          </div>
        ) : null}
        <div className="stats-container">
          {poisoned.rounds > 0 && (
            <Tooltip
              title={`${name} is poisoned`}
              description={`${poisoned.damage} poison damage per round - ${poisoned.rounds} round(s) left`}
            />
          )}
          <Image
            className="small-icon"
            src={poisoned.rounds > 0 ? CARD_ICONS.POISON : CARD_ICONS.LIFE}
          />
          <Text className="stats spaced-title" color={getStatColor(life)}>
            {life.current}
          </Text>
        </div>
      </StatsWrapper>
    </AnimalCard>
  )
}
