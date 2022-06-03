import { useContext, useEffect } from "react";
import styled from "styled-components";
import { utilitiesIcons } from "../data/data";
import HandsContext from "../context/HandsContext";
import { SELECT_CARD } from "../context/HandsContext/types";
import { BREAKPOINTS } from "../utils/constants";
import { Poisoned, Skill, Stat } from "../interfaces";
import {
  attackAnimation,
  attackAudio,
  injuryAnimation,
  selectionAnimation,
} from "../animations/card-animations";
import usePlantAnimation from "../hooks/usePlantAnimation";

interface IProps {
  attack: Stat<number>;
  belongsToUser?: boolean;
  bleeding: boolean;
  children?: JSX.Element;
  species: string;
  image: string;
  life: Stat<number | string>;
  onPreviewClick?: (name: string) => void;
  opacityForPreview?: string;
  paralyzed: number;
  poisoned: Poisoned;
  skill: Skill;
  name: string;
  targeteable: boolean;
}

export default function Card({
  attack,
  belongsToUser,
  children,
  life,
  species,
  image,
  skill,
  name,
  onPreviewClick,
  opacityForPreview,
  poisoned,
  paralyzed,
  targeteable,
  bleeding,
}: IProps) {
  const [state, dispatch] = useContext(HandsContext);
  const isCardSelected = state.attacker?.name === name;
  const isCardUnderAttack = state.underAttack === name;
  const soundState = localStorage.getItem("sound");
  const [animationProps] = usePlantAnimation({ name, soundState });
  useEffect(() => {
    isCardUnderAttack && soundState === "on" && attackAudio.play();
  }, [isCardUnderAttack, soundState]);
  const isForPreview = !!opacityForPreview;
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
        transform: belongsToUser ? "translateY(-5px)" : "",
      };
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
      {!targeteable && (
        <CornerIconContainer
          className="animal-status"
          title="This animal is untargeteable"
        >
          <span>{`\u{1F6AB}`}</span>
        </CornerIconContainer> //unicode for emoji
      )}
      {bleeding && (
        <CornerIconContainer
          className="animal-status"
          title="This animal is bleeding"
        >
          <Image className="blood-drop" src={utilitiesIcons.blood} />
        </CornerIconContainer>
      )}

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
            textDeco={`${paralyzed > 0 && "line-through 2px #dd5540"}`}
          >
            {skill.name}
          </Text>
          {paralyzed > 0 ? (
            <span className="paralyzed">({paralyzed})</span>
          ) : null}
        </FlexSection>
        <Text
          className="skill"
          fWeight="regular"
          textDeco={`${paralyzed > 0 && "line-through 2px #dd5540"}`}
        >
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
                ? "#0B8A37"
                : attack.current < attack.initial && "red"
            }`}
          >
            {attack.current}
          </Text>
        </div>
        <div className="stats-container">
          <Image
            className="small-icon"
            src={utilitiesIcons[poisoned.rounds > 0 ? "poison" : "life"]}
          />
          <Text
            className="stats spaced-title"
            color={`${
              life.current > life.initial
                ? "#0B8A37"
                : life.current < life.initial && "red"
            }`}
          >
            {life.current}
          </Text>
          {poisoned.rounds > 0 && (
            <span
              className="poison-stats"
              title={`${poisoned.damage} damage poison - ${poisoned.rounds} rounds left`}
            >
              {poisoned.damage} ({poisoned.rounds})
            </span>
          )}
        </div>
      </StatsWrapper>
    </AnimalCard>
  );
}

interface InjuryProps {
  animation?: any;
}
interface AnimalCardProps {
  attackAnimation?: any;
  selectionAnimation?: any;
  cursor?: string;
  isCardSelected: boolean;
  isParalyzed: boolean;
  opacity: string;
  transform?: string;
}
interface TextProps {
  color?: string;
  fWeight?: string;
  margin?: string;
  textDeco?: string;
}
interface FlexSectionProps {
  mBottom?: string;
}

interface PlantEffectProps {
  animation?: any;
  fullWidth?: boolean;
}
const PlantEffectImage = styled.img`
  ${(p: PlantEffectProps) => p.animation};
  opacity: 0;
  left: 50%;
  position: absolute;
  top: 3%;
  z-index: 20;
  ${(p: PlantEffectProps) =>
    p.fullWidth
      ? `
    margin-left: -50%;
    width: 100%;
    `
      : `
    margin-left: -70px;
    width: 140px;
    `}
`;

const Injury = styled.div`
  ${(p: InjuryProps) => p.animation};
  display: flex;
  justify-content: flex-start;
  position: absolute;
  left: 50%;
  opacity: 0;
  top: 6%;
  transform: translateX(-50%);
  transition: all 0.4s ease;
  -webkit-transform: translateX(-50%);
  z-index: 20;
  > img {
    &.big-wound {
      transform: rotate(60deg);
      width: 59%;
    }
    &.small-wound {
      transform: rotate(240deg);
      width: 27%;
    }
  }
`;
export const AnimalCard = styled.button`
  align-items: center;
  ${(p: AnimalCardProps) => p.attackAnimation};
  background: ${({ theme }) => theme.primary_brown};
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  cursor: ${(p: AnimalCardProps) => p.cursor};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  opacity: ${(p: AnimalCardProps) => p.opacity};
  overflow: hidden;
  padding: 12px;
  position: relative;
  transition: transform 0.15s ease;
  width: calc(20% - 32px);
  &:hover {
    box-shadow: 4px 4px 4px ${({ theme }) => theme.secondary_brown},
      inset 0px 0px 10px black;
    transform: ${(p: AnimalCardProps) => p.transform};
  }
  &:active {
    box-shadow: inset 0px 0px 40px black;
  }
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    height: 210%;
    width: 35%;
    background: ${(p: AnimalCardProps) =>
      p.opacity === "1"
        ? "linear-gradient(90deg, #5f0a87, #e3cdac, #a4508b)"
        : "none"};
    z-index: -2;
    background-size: 300% 300%;
    ${(p: AnimalCardProps) => p.selectionAnimation};
  }
  &::after {
    content: "";
    border-radius: 5px;
    position: absolute;
    top: 8px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    height: calc(100% - 16px);
    width: calc(100% - 16px);
    background: ${({ theme }) => theme.primary_brown};
    z-index: -1;
    background-size: 300% 300%;
  }
  ${(p: AnimalCardProps) =>
    p.isCardSelected &&
    `
    transform: ${p.transform};
  `}
  ${BREAKPOINTS.TABLET} {
    max-width: 170px;
    padding: 9px;
  }
  ${BREAKPOINTS.MOBILE} {
    max-width: 125px;
    padding: 6px;
  }
`;
const StatsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 10%;
  transition: all 0.4s ease;
  width: 80%;
  bottom: 0;
  > div.stats-container {
    align-items: center;
    background: ${({ theme }) => theme.primary_brown};
    border-radius: 8px 8px 0 0;
    border: 2px solid ${({ theme }) => theme.secondary_brown};
    border-bottom: 0;
    box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.4);
    display: flex;
    height: 32px;
    justify-content: center;
    width: calc(50% - 16px);
    > span.poison-stats {
      background: ${({ theme }) => theme.primary_brown};
      border-radius: 4px;
      border: 2px solid ${({ theme }) => theme.secondary_brown};
      box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.2);
      font-size: 12px;
      font-weight: bold;
      position: absolute;
      right: -12px;
      top: -8px;
      transform: rotate(36deg);
      padding: 2px 4px;
      color: ${({ theme }) => theme.poison_green};
    }
  }
  ${BREAKPOINTS.MOBILE} {
    left: 5%;
    width: 90%;
    > div.container {
      height: 20px;
      > span.poison-stats {
        font-size: 8px;
      }
    }
  }
`;

const CornerIconContainer = styled.div`
  background: ${({ theme }) => theme.primary_brown};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  font-size: 20px;
  height: 48px;
  left: -24px;
  position: absolute;
  top: -24px;
  width: 48px;
  > span {
    font-size: 12px;
    line-height: 16px;
    position: absolute;
    left: 24px;
    top: 24px;
  }
  &.animal-status {
    left: auto;
    right: -24px;
    > img {
      position: absolute;
      right: 24px;
      top: 24px;
    }
    > span {
      left: auto;
      right: 24px;
      top: 24px;
    }
  }
  ${BREAKPOINTS.MOBILE} {
    font-size: 16px;
  }
`;
const Image = styled.img`
  &.blood-drop {
    height: 20px;
    width: 20px;
    ${BREAKPOINTS.MOBILE} {
      height: 17px;
      width: 17px;
    }
  }
  &.animal-picture {
    border-radius: 120px;
    box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.6);
    height: 45%;
    margin: 4px 0;
    object-fit: cover;
    width: 80%;
    position: relative;
  }
  &.small-icon {
    height: 16px;
    margin-right: 4px;
    width: 16px;
    ${BREAKPOINTS.MOBILE} {
      height: 12px;
      width: 12px;
    }
  }
`;
const Text = styled.span`
  &.life-heart {
    font-size: 15px;
    ${BREAKPOINTS.TABLET} {
      font-size: 12px;
    }
  }
  &.stats {
    margin: 0 4px;
    font-size: 14px;
    ${BREAKPOINTS.TABLET} {
      font-size: 13px;
    }
    ${BREAKPOINTS.MOBILE} {
      font-size: 12px;
    }
  }
  &.skill {
    font-size: 10px;
    ${BREAKPOINTS.MOBILE} {
      font-size: 8px;
    }
  }
  &.skill-name {
    font-size: 8px;
  }
  &.animal-name {
    font-size: 16px;
    white-space: nowrap;
    ${BREAKPOINTS.MOBILE} {
      font-size: 12px;
    }
  }
  color: ${(p: TextProps) => p.color};
  font-weight: ${(p: TextProps) => p.fWeight || "bold"};
  margin: ${(p: TextProps) => p.margin};
  text-align: center;
  text-decoration: ${(p: TextProps) => p.textDeco};
`;
const FlexSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: ${(p: FlexSectionProps) => p.mBottom};
  position: relative;
  > span.paralyzed {
    color: ${({ theme }) => theme.primary_red};
    font-size: 12px;
    font-weight: bold;
    margin-left: 4px;
  }
`;
const DescriptionContainer = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.secondary_brown};
  border-radius: 5px;
  box-shadow: inset 0px 0px 10px ${({ theme }) => theme.light_brown};
  display: flex;
  flex-direction: column;
  height: 28%;
  justify-content: flex-start;
  margin: 4px 0 30px 0;
  overflow: auto;
  padding: 5px;
  width: 85%;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 0 5px 5px 0;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.light_brown};
    border-radius: 0 5px 5px 0;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.secondary_brown};
  }
`;
