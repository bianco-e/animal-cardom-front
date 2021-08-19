import { useContext, useEffect } from "react";
import styled from "styled-components";
import { utilitiesIcons } from "../data/data";
import HandsContext from "../context/HandsContext";
import { SELECT_CARD } from "../context/HandsContext/types";
import {
  LARGE_RESPONSIVE_BREAK,
  MEDIUM_RESPONSIVE_BREAK,
  SMALL_RESPONSIVE_BREAK,
} from "../utils/constants";
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

      <Text className="animal-name">{name}</Text>

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
            className="skill"
            textDeco={`${paralyzed > 0 && "line-through 2px #dd5540"}`}
          >
            {skill.name}
          </Text>
        </FlexSection>
        <Text
          className="skill"
          fWeight="regular"
          textDeco={`${paralyzed > 0 && "line-through 2px #dd5540"}`}
        >
          {skill.description}
        </Text>
      </DescriptionContainer>
      <StatsContainer>
        <FlexSection>
          <Image className="small-icon" src={utilitiesIcons.attack} />
          <Text
            className="stats"
            color={`${
              attack.current > attack.initial
                ? "#0B8A37"
                : attack.current < attack.initial && "red"
            }`}
          >
            {attack.current}
          </Text>
          <Text className="life-heart" margin="2px">
            {
              poisoned.rounds === 0
                ? `\u{1F5A4}` /* unicode for black heart emoji */
                : `\u{1F49A}` /* unicode for green heart emoji */
            }
          </Text>
          <Text
            className="stats"
            color={`${
              life.current > life.initial
                ? "#0B8A37"
                : life.current < life.initial && "red"
            }`}
          >
            {life.current}
          </Text>
          {paralyzed > 0 && (
            <span className="negative-stats paralyze-stats">{paralyzed}</span>
          )}
          {poisoned.rounds > 0 && (
            <span className="negative-stats poison-stats">
              {poisoned.damage}/{poisoned.rounds}
            </span>
          )}
        </FlexSection>
      </StatsContainer>
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
  border-radius: 5px;
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
  width: 17%;
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
    background: #d4a257;
    z-index: -1;
    background-size: 300% 300%;
  }
  ${(p: AnimalCardProps) =>
    p.isCardSelected &&
    `
    transform: ${p.transform};
  `}
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    max-width: 170px;
    padding: 9px;
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    max-width: 125px;
    padding: 6px;
  }
`;
const StatsContainer = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.primary_brown};
  border-radius: 50px 50px 0 0;
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  border-bottom: 0;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  display: flex;
  height: 30px;
  justify-content: space-around;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  transition: all 0.4s ease;
  width: 130px;
  bottom: 0;
  @media (${SMALL_RESPONSIVE_BREAK}) {
    height: 22px;
    width: 90%;
  }
`;

const CornerIconContainer = styled.div`
  background: ${({ theme }) => theme.primary_brown};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: 60px;
  left: -30px;
  position: absolute;
  top: -30px;
  width: 60px;
  > span {
    font-size: 14px;
    position: absolute;
    left: 32px;
    top: 32px;
  }
  &.animal-status {
    left: auto;
    right: -30px;
    > img {
      position: absolute;
      right: 30px;
      top: 30px;
    }
    > span {
      left: auto;
      right: 32px;
      top: 32px;
    }
  }
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    font-size: 20px;
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    font-size: 16px;
  }
`;
const Image = styled.img`
  &.blood-drop {
    height: 20px;
    width: 20px;
    @media (${SMALL_RESPONSIVE_BREAK}) {
      height: 17px;
      width: 17px;
    }
  }
  &.animal-picture {
    border-radius: 120px;
    box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.6);
    height: 45%;
    width: 80%;
    position: relative;
    @media (${LARGE_RESPONSIVE_BREAK}) {
      min-height: 50px;
      width: 85%;
    }
  }
  &.small-icon {
    height: 20px;
    width: 20px;
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      height: 17px;
      width: 17px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      height: 15px;
      width: 15px;
    }
  }
`;
const Text = styled.span`
  &.life-heart {
    margin-left: 10px;
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      font-size: 13px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      font-size: 12px;
    }
  }
  &.stats {
    margin-left: 3px;
    font-size: 16px;
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      font-size: 13px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      font-size: 12px;
    }
  }
  &.skill {
    font-size: 12px;
    @media (${LARGE_RESPONSIVE_BREAK}) {
      font-size: 9px;
    }
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      font-size: 8px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      font-size: 7px;
    }
  }
  &.animal-name {
    font-size: 22px;
    @media (${LARGE_RESPONSIVE_BREAK}) {
      font-size: 18px;
    }
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      font-size: 15px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      font-size: 13px;
    }
  }
  color: ${(p: TextProps) => p.color};
  font-size: 14px;
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
  > span.negative-stats {
    background: ${({ theme }) => theme.primary_brown};
    border-radius: 5px;
    border: 2px solid ${({ theme }) => theme.secondary_brown};
    box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.5);
    font-size: 11px;
    font-weight: bold;
    position: absolute;
    top: -5px;
    transform: rotate(30deg);
    padding: 1px 2px;
  }
  > span.poison-stats {
    color: ${({ theme }) => theme.primary_green};
    right: -25px;
  }
  > span.paralyze-stats {
    color: ${({ theme }) => theme.primary_red};
    left: -20px;
    transform: rotate(-30deg);
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    > span.negative-stats {
      font-size: 9px;
    }
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
