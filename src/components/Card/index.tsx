import { MouseEventHandler, useEffect, useRef } from "react"
import { CARD_ICONS } from "../../data/data"
import { Animal, Stat } from "../../interfaces"
import { attackAudio } from "../../animations/card-animations"
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
  IconImage,
} from "./styled"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { selectCard } from "../../redux/actions/game"
import styles from "../../styles"
import { TooltipDirection } from "../Tooltip/styled"

const NONE_SKILL_TYPE = 1
const OFFENSIVE_SKILL_TYPE = 3
const DEFENSIVE_SKILL_TYPE = 4
const USER_ANIMAL_ROTATION = 12
const PC_ANIMAL_ROTATION = 4

interface IProps extends Animal {
  belongsToUser?: boolean
  onClick?: (id: Animal["id"]) => void
  cardOpacity?: string
  isForGame?: boolean
}

export default function Card({
  id,
  scientific_name,
  attack,
  bleeding,
  life,
  missing,
  habitat,
  name,
  paralyzed,
  poisoned,
  skill,
  species,
  targeteable,
  belongsToUser = false,
  isForGame = false,
  onClick,
  cardOpacity,
}: IProps) {
  const animalRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const game = useAppSelector(({ game }) => game)
  const isDead = life.current <= 0
  const isPoisoned = poisoned.rounds > 0
  const isParalyzed = paralyzed > 0
  const isCardSelected = isForGame && game.attacker?.name === name
  const isCardUnderAttack = game.underAttack === name
  const hasDodgedAttack = game.dodgedAttack === name
  const [animationProps] = usePlantAnimation({ name, soundOn: game.soundOn })

  useEffect(() => {
    if (isCardUnderAttack && game.soundOn) {
      attackAudio.play()
    }
  }, [isCardUnderAttack, game.soundOn])

  const handleMouseOver: MouseEventHandler<HTMLButtonElement> = e => {
    if (!animalRef.current || isDead || !isForGame) return
    const rotation = belongsToUser ? USER_ANIMAL_ROTATION : PC_ANIMAL_ROTATION
    const { width, height, top, left } = animalRef.current.getBoundingClientRect()
    const cardCenterX = left + width / 2
    const cardCenterY = top + height / 2
    const rotateX = e.clientY > cardCenterY ? -rotation : rotation
    const rotateY = e.clientX > cardCenterX ? rotation : -rotation
    animalRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (animalRef.current) {
      animalRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`
    }
  }

  const handleClick = () => {
    if (onClick) return onClick(id) //@ts-ignore
    if (!game.pcTurn) return dispatch(selectCard(name))
  }

  const getStatColor = (stat: Stat): string => {
    if (stat.current > stat.initial) return styles.secondary_violet
    if (stat.current < stat.initial && !isDead) return styles.primary_red
    return ""
  }

  const getSkillIcon = (skill_use_type_id: number): string => {
    if (skill_use_type_id === NONE_SKILL_TYPE) return CARD_ICONS.IDLE
    if (skill_use_type_id === OFFENSIVE_SKILL_TYPE) return CARD_ICONS.FURY
    if (skill_use_type_id === DEFENSIVE_SKILL_TYPE) return CARD_ICONS.DEFENSE
    return ""
  }

  return (
    <AnimalCard
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      $opacity={isDead ? "0.5" : cardOpacity || "1"}
      $isCardUnderAttack={isCardUnderAttack}
      $isCardSelected={isCardSelected}
      $cursor={
        (belongsToUser || game.attacker || game.selectedPlant || onClick) && !isDead
          ? "pointer"
          : "default"
      }
      $habitat={habitat.toLowerCase()}
      ref={animalRef}>
      {isCardUnderAttack ? (
        <Injury alt="under-attack" src="/images/svg/blood-splatter.svg" />
      ) : null}
      {hasDodgedAttack ? <Text className="miss-msg">Miss!</Text> : null}

      {animationProps ? <PlantEffectImage {...animationProps} /> : null}

      {missing.chance ? (
        <IconContainer $placement="LEFT">
          <Tooltip
            direction={TooltipDirection.BOTTOM_RIGHT}
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
            direction={TooltipDirection.BOTTOM_LEFT}
            title="Untargeteable"
            description={`${name} can't be attacked until it attacks first`}
          />
          <span>{`\u{1F6AB}`}</span>
        </IconContainer>
      ) : null}

      <FlexSection $fDirection="column">
        <Text className="animal-name spaced-title">{name}</Text>
        <Text className="animal-scientific-name">({scientific_name})</Text>
      </FlexSection>

      <Image
        className="animal-picture"
        draggable="false"
        src={`/images/animals/adult-${name.toLowerCase().split(" ").join("-")}.webp`}
      />

      <DescriptionContainer>
        <FlexSection>
          {getSkillIcon(skill.use_type_id) ? (
            <IconImage src={getSkillIcon(skill.use_type_id)} />
          ) : null}
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
          <IconImage src={CARD_ICONS.ATTACK} />
          <Text className="stats spaced-title" $color={getStatColor(attack)}>
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
          {isPoisoned && (
            <Tooltip
              title={`${name} is poisoned`}
              description={`${poisoned.damage} poison damage per round - ${poisoned.rounds} round(s) left`}
            />
          )}
          {!isDead ? (
            <IconImage src={isPoisoned ? CARD_ICONS.POISON : CARD_ICONS.LIFE} />
          ) : null}
          <Text className="stats spaced-title" $color={getStatColor(life)}>
            {isDead ? "☠︎" : life.current}
          </Text>
        </div>
      </StatsWrapper>
    </AnimalCard>
  )
}
