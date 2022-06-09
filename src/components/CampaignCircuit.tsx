import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { terrains } from "../data/data";
import { BREAKPOINTS } from "../utils/constants";

const firstLevelGames = {
  "450": 1,
  "900": 2,
  "1350": 3,
};

const ANGLE = 360 / terrains.length;
interface IProps {
  xp: number;
}
export default function CampaignCircuit({ xp }: IProps) {
  const [containerWidth, setContainerWidth] = useState<number>(200);
  const containerRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef.current]); //eslint-disable-line

  const handleCampaignGame = (xp: number) => history.push(`/game?x=${xp}`);

  return (
    <Wrapper ref={containerRef}>
      {terrains.map((terrain, idx) => {
        const { image, name, getRequiredXp } = terrain;
        const requiredXp = getRequiredXp(xp);
        const isDisabled = requiredXp > xp;
        const level = idx + 1;
        return (
          <TerrainContainer
            angle={`${ANGLE * idx + 270}`}
            bgImage={image}
            containerWidth={containerWidth}
            disabled={isDisabled}
            games={
              //@ts-ignore
              level === 1 && xp > 0 ? `${firstLevelGames[xp]}/3` : undefined
            }
            key={name}
            level={level}
            onClick={() => !isDisabled && handleCampaignGame(requiredXp)}
            title={isDisabled ? "Locked" : `${name} terrain`}
          />
        );
      })}
    </Wrapper>
  );
}

interface TerrainContainerProps {
  angle?: string;
  bgImage?: string;
  containerWidth: number;
  disabled?: boolean;
  games?: string;
  level?: number;
}
const Wrapper = styled.div`
  height: 420px;
  margin: 100px auto 0;
  position: relative;
  width: 420px;
  ${BREAKPOINTS.MOBILE} {
    margin: 90px auto 0;
    height: 270px;
    width: 270px;
  }
`;
const TerrainContainer = styled.div<TerrainContainerProps>`
  align-items: center;
  background-image: ${({ bgImage }) => `url('${bgImage}')`};
  background-position: center;
  background-size: cover;
  border-radius: 100%;
  box-shadow: 0 0 40px 10px rgba(0, 0, 0, 0.5), 0 0 40px 10px rgba(0, 0, 0, 0.5),
    0 0 40px 10px rgba(0, 0, 0, 0.5), 0 0 40px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 130px;
  justify-content: space-between;
  left: calc(50% - 65px);
  position: absolute;
  top: calc(50% - 65px);
  transform: ${({ angle, containerWidth }) =>
    `rotate(${angle}deg) translate(${
      containerWidth / 2
    }px) rotate(-${angle}deg)`};
  width: 130px;
  ${({ games, theme }) =>
    games
      ? `
  &:after {
    align-items: center;
    background: ${theme.primary_brown};
    border-radius: 5px;
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
    content: "${games}";
    display: flex;
    font-size: 9px;
    font-weight: bold;
    height: 8px;
    justify-content: center;
    padding: 4px;
    width: 24px;
  }
  `
      : ""};
  &:before {
    align-items: center;
    background: ${({ theme }) => theme.primary_brown};
    border-radius: 5px;
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
    content: "${({ level }) => level}";
    display: flex;
    font-size: 9px;
    font-weight: bold;
    height: 8px;
    justify-content: center;
    padding: 4px;
    width: 20px;
  }
  ${BREAKPOINTS.MOBILE} {
    height: 80px;
    left: calc(50% - 40px);
    width: 80px;
    top: calc(50% - 40px);
  }
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `}
`;
