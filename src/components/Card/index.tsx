import { useEffect } from "react"
import { CARD_ICONS } from "../../data/data"
import { Animal, Stat } from "../../interfaces"
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

interface IProps extends Animal {
  belongsToUser?: boolean
  onPreviewClick?: (id: Animal["id"]) => void
  opacityForPreview?: string
  width?: string
}
const DEFENSIVE_SKILL_TYPE = 4
export default function Card({
  id,
  attack,
  belongsToUser,
  bleeding,
  life,
  missing,
  habitat,
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
        $attackAnimation: undefined,
        $selectionAnimation: undefined,
        className: "card",
        $cursor: onPreviewClick ? "pointer" : "default",
        $isCardSelected: isCardSelected,
        onClick: () => onPreviewClick && onPreviewClick(id),
        $opacity: opacityForPreview ? opacityForPreview : "1",
        $transform: "",
      }
    : {
        $attackAnimation: isCardUnderAttack ? attackAnimation : undefined,
        $selectionAnimation: isCardSelected ? selectionAnimation : undefined,
        $cursor:
          belongsToUser || game.attacker || game.selectedPlant ? "pointer" : "default",
        $isCardSelected: isCardSelected,
        //@ts-ignore
        onClick: () => (!game.pcTurn ? dispatch(selectCard(name)) : null),
        $opacity: `${life.current === 0 ? "0.5" : "1"}`,
        $transform: belongsToUser ? "translateY(-8px)" : "",
      }

  const getStatColor = (stat: Stat): string =>
    stat.current > stat.initial ? "#a4508b" : stat.current < stat.initial ? "red" : ""

  const getImageName = (name: string) => name.toLowerCase().split(" ").join("-")

  return (
    <AnimalCard {...styledProps} $width={width} $habitat={habitat.toLowerCase()}>
      {isCardUnderAttack ? (
        <Injury alt="under-attack" src="/images/svg/blood-splatter.svg" />
      ) : null}
      {hasDodgedAttack ? <Text className="miss-msg">Miss!</Text> : null}

      {animationProps ? <PlantEffectImage {...animationProps} /> : null}

      {missing.chance ? (
        <IconContainer $placement="LEFT">
          <Tooltip
            direction="BOTTOM-RIGHT"
            title="Missing chance"
            description={`${name} has ${missing.chance}% chance of missing the attack`}
          />
          <Image className="missing-chance-icon" src={CARD_ICONS.MISSING} />
        </IconContainer>
      ) : null}

      <IconContainer>
        <span>{species.icon}</span>
      </IconContainer>

      {!targeteable ? (
        <IconContainer $placement="RIGHT">
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
        <FlexSection $mBottom="1px">
          <Image
            className="small-icon"
            src={
              skill.use_type_id === DEFENSIVE_SKILL_TYPE
                ? CARD_ICONS.DEFENSE
                : CARD_ICONS.FURY
            }
          />
          <Text className="card-sm-name spaced-title" $lineThrough={isParalyzed}>
            {skill.name}
          </Text>
          {isParalyzed ? <span className="paralyzed">({paralyzed})</span> : null}
        </FlexSection>
        <Text className="skill" $fWeight="regular" $lineThrough={isParalyzed}>
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

        <FlexSection $fDirection="column">
          {bleeding ? (
            <div className="statuses">
              <Tooltip
                title="Bleeding"
                description="Takes 1 life point every turn. It might be stopped with a plant"
              />
              <Image className="blood-drop" src={CARD_ICONS.BLOOD} />
            </div>
          ) : null}
          <FlexSection $fDirection="column">
            <Image alt="habitat" className="habitat-icon" src={CARD_ICONS.HABITAT} />
            <Text className="card-sm-name">{habitat}</Text>
          </FlexSection>
        </FlexSection>

        <div className="stats-container">
          {poisoned.rounds > 0 && (
            <Tooltip
              title={`${name} is poisoned`}
              description={`${poisoned.damage} poison damage per round - ${poisoned.rounds} round(s) left`}
            />
          )}
          {life.current !== 0 ? (
            <Image
              className="small-icon"
              src={poisoned.rounds > 0 ? CARD_ICONS.POISON : CARD_ICONS.LIFE}
            />
          ) : null}
          <Text className="stats spaced-title" color={getStatColor(life)}>
            {life.current === 0 ? "DEAD" : life.current}
          </Text>
        </div>
      </StatsWrapper>
    </AnimalCard>
  )
}
