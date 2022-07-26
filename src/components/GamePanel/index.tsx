import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Plant from "../Plant"
import Modal from "../Common/Modal"
import { ACButton, ModalTitle, Text } from "../styled-components"
import { IPlants, ITerrain } from "../../interfaces/index"
import Tooltip from "../Tooltip"
import { HalfPanel, LeftPanel, OptionsPanel, PlayerNameTab, TerrainName } from "./styled"
import { IPlant } from "../../interfaces"

interface IProps {
  plants: IPlants
  terrain: ITerrain
  userName: string
}

export default function SidePanel({ plants, terrain, userName }: IProps) {
  const [showTerrainTooltip, setShowTerrainTooltip] = useState<boolean>(false)
  const [soundState, setSoundState] = useState<"off" | "on">("on")
  const [showExitModal, setShowExitModal] = useState<boolean>(false)
  const history = useHistory()

  useEffect(() => {
    const currentSoundState = localStorage.getItem("sound")
    if (
      currentSoundState &&
      (currentSoundState === "off" || currentSoundState === "on")
    ) {
      setSoundState(currentSoundState)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("sound", soundState)
  }, [soundState])

  const handleSoundButton = () => {
    const soundToSet = soundState === "off" ? "on" : "off"
    setSoundState(soundToSet)
  }
  const handleExit = () => setShowExitModal(true)

  return (
    <LeftPanel bgImage={terrain.image}>
      <HalfPanel>
        <Text fSize="18px" fWeight="bold" padding="5px">
          PC
        </Text>
        <PlayerNameTab>PC</PlayerNameTab>
        {plants.pc.map((plant: IPlant) => (
          <Plant plant={plant} key={plant.name} />
        ))}
      </HalfPanel>
      <TerrainName color={terrain.color}>
        <OptionsPanel>
          <button onClick={handleSoundButton}>
            <img alt="sound-button" src={`/icons/sound-${soundState}-icon.png`} />
          </button>
          <button onClick={handleExit}>
            <img alt="exit-button" src={`/icons/exit-icon.png`} />
          </button>
        </OptionsPanel>
        <div
          className="name-container"
          onMouseEnter={() => setShowTerrainTooltip(true)}
          onMouseLeave={() => setShowTerrainTooltip(false)}>
          {terrain.name}
          {showTerrainTooltip && (
            <Tooltip
              direction="BOTTOM"
              title="Bonus"
              description={
                terrain.name !== "Neutral"
                  ? `${terrain.speciesToBuff} feel like home in ${terrain.name}.`
                  : "In Neutral terrain there's no benefit"
              }
            />
          )}
        </div>
      </TerrainName>
      <HalfPanel>
        <Text fSize="18px" fWeight="bold" padding="5px">
          {userName}
        </Text>
        <PlayerNameTab>{userName}</PlayerNameTab>
        {plants.user.map((plant: IPlant) => (
          <Plant plant={plant} key={plant.name} />
        ))}
      </HalfPanel>
      {showExitModal && (
        <Modal closeModal={() => setShowExitModal(false)} withCloseButton={false}>
          <>
            <ModalTitle>You are about to exit</ModalTitle>
            <Text margin="10px 0 5px">Current game progress will get lost.</Text>
            <Text>Are you sure?</Text>
            <ACButton
              fWeight="bold"
              margin="20px 0"
              onClick={() => setShowExitModal(false)}>
              Stay
            </ACButton>
            <ACButton onClick={() => history.push("/menu")}>Leave</ACButton>
          </>
        </Modal>
      )}
    </LeftPanel>
  )
}
