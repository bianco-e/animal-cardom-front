import { useEffect } from "react"
import { CARD_ICONS } from "../../data/data"
import { IAnimal, Stat } from "../../interfaces"
import {
  attackAnimation,
  attackAudio,
  selectionAnimation,
} from "../../animations/card-animations"
import usePlantAnimation from "../../hooks/usePlantAnimation"
import Tooltip from "../Tooltip"
import {
  AnimalCard,
  IconContainer,
  DescriptionContainer,
  FlexSection,
  Image,
  Injury,
  PlantEffectImage,
  StatsWrapper,
  Text,
} from "./styled"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { selectCard } from "../../redux/actions/game"

interface IProps extends IAnimal {
  belongsToUser?: boolean
  onPreviewClick?: (name: string) => void
  opacityForPreview?: string
  width?: string
}

export default function Card({
  attack,
  belongsToUser,
  bleeding,
  life,
  missing,
  name,
  onPreviewClick,
  opacityForPreview,
  paralyzed,
  poisoned,
  skill,
  species,
  targeteable,
  width,
}: IProps) {
  const dispatch = useAppDispatch()
  const game = useAppSelector(({ game }) => game)
  const isForPreview = !!opacityForPreview
  const isParalyzed = paralyzed > 0
  const isCardSelected = !isForPreview && game.attacker?.name === name
  const isCardUnderAttack = game.underAttack === name
  const hasDodgedAttack = game.dodgedAttack === name
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
        cursor:
          belongsToUser || game.attacker || game.selectedPlant ? "pointer" : "default",
        isCardSelected,
        isParalyzed,
        //@ts-ignore
        onClick: () => (!game.pcTurn ? dispatch(selectCard(name)) : null),
        opacity: `${life.current === 0 ? "0.5" : "1"}`,
        transform: belongsToUser ? "translateY(-8px)" : "",
      }

  const getStatColor = (stat: Stat): string =>
    stat.current > stat.initial ? "#a4508b" : stat.current < stat.initial ? "red" : ""

  const getImageName = (name: string) => name.toLowerCase().split(" ").join("-")

  return (
    <AnimalCard {...styledProps} width={width} species={species}>
      {isCardUnderAttack ? (
        <Injury alt="under-attack" src="/images/svg/blood-splatter.svg" />
      ) : null}
      {hasDodgedAttack ? <Text className="miss-msg">Miss!</Text> : null}

      {animationProps ? <PlantEffectImage {...animationProps} /> : null}

      {missing.chance ? (
        <IconContainer placement="LEFT">
          <Tooltip
            direction="BOTTOM-RIGHT"
            title="Missing chance"
            description={`${name} has ${missing.chance}% chance of missing the attack`}
          />
          <Image className="missing-chance-icon" src={CARD_ICONS.MISSING} />
        </IconContainer>
      ) : null}

      <IconContainer>
        <span>{species}</span>
      </IconContainer>

      {!targeteable ? (
        <IconContainer placement="RIGHT">
          <Tooltip
            direction="BOTTOM-LEFT"
            title="Untargeteable"
            description={`${name} can't be attacked until it attacks first`}
          />
          <span>{`\u{1F6AB}`}</span>
        </IconContainer>
      ) : null}

      <Text className="animal-name spaced-title">{name}</Text>

      <Image
        className="animal-picture"
        draggable="false"
        src={`/images/animals/adult-${getImageName(name)}.webp`}
      />

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
            {life.current === 0 ? "DEAD" : life.current}
          </Text>
        </div>
      </StatsWrapper>
    </AnimalCard>
  )
}
