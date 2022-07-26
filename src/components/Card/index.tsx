import { useContext, useEffect } from "react"
import { utilitiesIcons } from "../../data/data"
import HandsContext from "../../context/HandsContext"
import { SELECT_CARD } from "../../context/HandsContext/types"
import { Poisoned, Skill, Stat } from "../../interfaces"
import {
  attackAnimation,
  attackAudio,
  injuryAnimation,
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
  children?: JSX.Element
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
  children,
  life,
  species,
  image,
  skill,
  missingChance,
  name,
  onPreviewClick,
  opacityForPreview,
  poisoned,
  paralyzed,
  targeteable,
  bleeding,
}: IProps) {
  const [state, dispatch] = useContext(HandsContext)
  const isCardSelected = state.attacker?.name === name
  const isCardUnderAttack = state.underAttack === name
  const hasCondition = !targeteable || missingChance
  const soundState = localStorage.getItem("sound")
  const [animationProps] = usePlantAnimation({ name, soundState })
  useEffect(() => {
    isCardUnderAttack && soundState === "on" && attackAudio.play()
  }, [isCardUnderAttack, soundState])

  const isForPreview = !!opacityForPreview
  const cardProps = isForPreview
    ? {
        attackAnimation: undefined,
        selectionAnimation: undefined,
        className: "card",
        cursor: onPreviewClick ? "pointer" : "default",
        isCardSelected: false,
        isParalyzed: false,
        onClick: () => onPreviewClick && onPreviewClick(name),
        opacity: opacityForPreview ? opacityForPreview : "1",
        transform: "",
      }
    : {
        attackAnimation: isCardUnderAttack ? attackAnimation : undefined,
        selectionAnimation: isCardSelected ? selectionAnimation : undefined,
        cursor: "pointer",
        isCardSelected,
        isParalyzed: paralyzed > 0,
        onClick: () => !state.pcTurn && dispatch({ type: SELECT_CARD, name }),
        opacity: `${life.current === "DEAD" ? "0.5" : "1"}`,
        transform: belongsToUser ? "translateY(-8px)" : "",
      }
  return (
    <AnimalCard {...cardProps}>
      {children}
      <Injury animation={isCardUnderAttack && injuryAnimation}>
        <img
          draggable="false"
          alt="wound"
          className="small-wound"
          src="/images/svg/blood-splatter.svg"
        />
        <img
          draggable="false"
          alt="wound"
          className="big-wound"
          src="/images/svg/blood-splatter.svg"
        />
        <img
          draggable="false"
          alt="wound"
          className="small-wound"
          src="/images/svg/blood-splatter.svg"
        />
      </Injury>
      {animationProps && <PlantEffectImage {...animationProps} />}
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
              <Image className="missing-chance-icon" src={utilitiesIcons.missing} />
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
                skill.types.includes("defensive")
                  ? utilitiesIcons.defense
                  : utilitiesIcons.fury
              }
            />
          )}
          <Text
            className="skill-name spaced-title"
            textDeco={`${paralyzed > 0 && "line-through 2px #dd5540"}`}>
            {skill.name}
          </Text>
          {paralyzed > 0 ? <span className="paralyzed">({paralyzed})</span> : null}
        </FlexSection>
        <Text
          className="skill"
          fWeight="regular"
          textDeco={`${paralyzed > 0 && "line-through 2px #dd5540"}`}>
          {skill.description}
        </Text>
      </DescriptionContainer>
      <StatsWrapper>
        <div className="stats-container">
          <Image className="small-icon" src={utilitiesIcons.attack} />
          <Text
            className="stats spaced-title"
            color={`${
              attack.current > attack.initial
                ? "#a4508b"
                : attack.current < attack.initial && "red"
            }`}>
            {attack.current}
          </Text>
        </div>
        {bleeding ? (
          <div className="statuses">
            <Tooltip
              title={`${name} is bleeding`}
              description={`Every turn ${name} gets 1 damage. It can be stopped with a plant`}
            />
            <Image className="blood-drop" src={utilitiesIcons.blood} />
          </div>
        ) : null}
        <div className="stats-container">
          {poisoned.rounds > 0 && (
            <>
              <Tooltip
                title={`${name} is poisoned`}
                description={`${poisoned.damage} poison damage per round - ${poisoned.rounds} round(s) left`}
              />
              <span className="poison-stats">
                {poisoned.damage} ({poisoned.rounds})
              </span>
            </>
          )}
          <Image
            className="small-icon"
            src={utilitiesIcons[poisoned.rounds > 0 ? "poisonLife" : "life"]}
          />
          <Text
            className="stats spaced-title"
            color={`${
              life.current > life.initial
                ? "#a4508b"
                : life.current < life.initial && "red"
            }`}>
            {life.current}
          </Text>
        </div>
      </StatsWrapper>
    </AnimalCard>
  )
}
