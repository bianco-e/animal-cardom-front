import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { terrains } from "../data/data";
import { BREAKPOINTS } from "../utils/constants";

const ANGLE = 360 / (terrains.length - 1);
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
        return (
          <TerrainContainer
            angle={`${ANGLE * idx - 40}`}
            bgImage={image}
            containerWidth={containerWidth}
            disabled={isDisabled}
            key={name}
            level={idx + 1}
            onClick={() => !isDisabled && handleCampaignGame(requiredXp)}
            title={isDisabled ? "Locked" : name}
          ></TerrainContainer>
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
  level?: number;
}
const Wrapper = styled.div`
  height: 450px;
  margin: 120px 0 0 0;
  position: relative;
  width: 450px;
  ${BREAKPOINTS.MOBILE} {
    margin: 90px 0 0 0;
    height: 270px;
    width: 270px;
  }
`;
const TerrainContainer = styled.div`
  background-image: ${(p: TerrainContainerProps) => `url('${p.bgImage}')`};
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 0 40px 10px rgba(0, 0, 0, 0.5), 0 0 40px 10px rgba(0, 0, 0, 0.5),
    0 0 40px 10px rgba(0, 0, 0, 0.5), 0 0 40px 10px rgba(0, 0, 0, 0.5),
    0 0 40px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  height: 140px;
  left: 50%;
  justify-content: center;
  margin: calc(-100px / 2);
  position: absolute;
  top: 50%;
  transform: ${(p: TerrainContainerProps) =>
    `rotate(${p.angle}deg) translate(${p.containerWidth / 2}px) rotate(-${
      p.angle
    }deg)`};
  width: 140px;
  &:before {
    align-items: center;
    background: ${({ theme }) => theme.primary_brown};
    border-radius: 5px;
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
    content: "${(p: TerrainContainerProps) => p.level}";
    display: flex;
    font-size: 9px;
    font-weight: bold;
    height: 14px;
    justify-content: center;
    padding: 4px 2px;
    width: 14px;
  }
  ${BREAKPOINTS.MOBILE} {
    height: 80px;
    width: 80px;
  }
  ${(p: TerrainContainerProps) =>
    p.disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `}
`;
