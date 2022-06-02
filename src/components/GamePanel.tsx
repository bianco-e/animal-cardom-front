import { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Plant from "./Plant";
import Modal from "./Common/Modal";
import { BREAKPOINTS } from "../utils/constants";
import { ACButton, ModalTitle, Text, Tooltip } from "./styled-components";
import { IPlants, ITerrain } from "../interfaces/index";

interface IProps {
  plants: IPlants;
  terrain: ITerrain;
  userName: string;
}

export default function SidePanel({ plants, terrain, userName }: IProps) {
  const [showTerrainTooltip, setShowTerrainTooltip] = useState<boolean>(false);
  const [soundState, setSoundState] = useState<"off" | "on">("on");
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    const currentSoundState = localStorage.getItem("sound");
    if (
      currentSoundState &&
      (currentSoundState === "off" || currentSoundState === "on")
    ) {
      setSoundState(currentSoundState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sound", soundState);
  }, [soundState]);

  const handleSoundButton = () => {
    const soundToSet = soundState === "off" ? "on" : "off";
    setSoundState(soundToSet);
  };
  const handleExit = () => setShowExitModal(true);

  return (
    <LeftPanel bgImage={terrain.image}>
      <HalfPanel>
        <Text fSize="18px" fWeight="bold" padding="5px">
          PC
        </Text>
        <PlayerNameTab>PC</PlayerNameTab>
        {plants.pc.map((plant) => {
          return <Plant plant={plant} key={plant.name} />;
        })}
      </HalfPanel>
      <TerrainName
        color={terrain.color}
        onMouseEnter={() => setShowTerrainTooltip(true)}
        onMouseLeave={() => setShowTerrainTooltip(false)}
      >
        <OptionsPanel>
          <button onClick={handleSoundButton}>
            <img
              alt="sound-button"
              src={`/icons/sound-${soundState}-icon.png`}
            />
          </button>
          <button onClick={handleExit}>
            <img alt="exit-button" src={`/icons/exit-icon.png`} />
          </button>
        </OptionsPanel>
        {showTerrainTooltip && (
          <Tooltip>
            {terrain.name !== "Neutral"
              ? `${terrain.speciesToBuff} feel like home in ${terrain.name}.`
              : "In Neutral terrain there's no benefit"}
          </Tooltip>
        )}
        {terrain.name}
      </TerrainName>
      <HalfPanel>
        <Text fSize="18px" fWeight="bold" padding="5px">
          {userName}
        </Text>
        <PlayerNameTab>{userName}</PlayerNameTab>
        {plants.user.map((plant) => {
          return <Plant plant={plant} key={plant.name} />;
        })}
      </HalfPanel>
      {showExitModal && (
        <Modal
          closeModal={() => setShowExitModal(false)}
          withCloseButton={false}
        >
          <>
            <ModalTitle>You are about to exit the app</ModalTitle>
            <Text margin="15px 0">
              All this game progress is going to be lost.
            </Text>
            <Text>Are you sure?</Text>
            <ACButton
              fWeight="bold"
              margin="20px 0"
              onClick={() => setShowExitModal(false)}
            >
              Stay
            </ACButton>
            <ACButton onClick={() => history.push("/menu")}>Leave</ACButton>
          </>
        </Modal>
      )}
    </LeftPanel>
  );
}

interface LeftPanelProps {
  bgImage?: string;
}
const PlayerNameTab = styled.div`
  background: rgba(240, 240, 240, 0.6);
  box-shadow: 0 35px 40px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 10px 10px;
  bottom: -48px;
  display: none;
  font-weight: bold;
  left: 50%;
  padding: 1px 12px;
  position: absolute;
  transform: translate(-50%, -50%);
  ${BREAKPOINTS.TABLET} {
    display: flex;
  }
  ${BREAKPOINTS.MOBILE} {
    bottom: -42px;
    font-size: 14px;
  }
`;
const LeftPanel = styled.div`
  background: url(${(p: LeftPanelProps) => p.bgImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 0 10px 10px 0;
  box-shadow: 35px 0 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  width: 110px;
  ${BREAKPOINTS.TABLET} {
    align-items: center;
    background: url(${({ bgImage }) => bgImage});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 35px 40px rgba(0, 0, 0, 0.2);
    flex-direction: row;
    height: 50px;
    justify-content: space-around;
    width: 100%;
  }
`;
const HalfPanel = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 33%;
  > span {
    font-size: 13px;
  }
  ${BREAKPOINTS.TABLET} {
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    width: 30%;
    z-index: 2;
    > span {
      display: none;
    }
  }
  ${BREAKPOINTS.MOBILE} {
    width: 40%;
  }
`;
const TerrainName = styled.h3`
  align-items: center;
  color: ${({ color }) => color};
  cursor: help;
  display: flex;
  height: 33%;
  justify-content: center;
  position: relative;
  text-shadow: rgba(10, 10, 10, 0.6) 0px 1px 5px;
  ${BREAKPOINTS.TABLET} {
    width: 90px;
    min-height: auto;
    height: 100%;
  }
  ${BREAKPOINTS.MOBILE} {
    font-size: 14px;
  }
`;
const OptionsPanel = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.primary_brown};
  border-radius: 0 50px 50px 0;
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  border-left: 0;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 110px;
  position: absolute;
  right: -27px;
  top: calc(50% - 55);
  width: 25px;
  > button {
    background: none;
    border: 0;
    cursor: pointer;
    height: 15px;
    margin-bottom: 25px;
    z-index: 1;
    &:last-child {
      margin-bottom: 0;
    }
    > img {
      height: 100%;
      width: 100%;
    }
  }
  ${BREAKPOINTS.MOBILE} {
    border: 2px solid ${({ theme }) => theme.secondary_brown};
    border-top: 0;
    border-radius: 0 0 50px 50px;
    flex-direction: row;
    height: 18px;
    right: auto;
    top: 100%;
    width: 90px;
    > button {
      height: 95%;
      margin-bottom: 0;
      width: 30%;
      > img {
        height: 100%;
        width: 100%;
      }
    }
  }
`;
