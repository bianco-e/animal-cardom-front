import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Modal from "../Common/Modal"
import { ACButton, ModalTitle, Text } from "../styled-components"
import { IPlants, IHabitat } from "../../interfaces/index"
import Tooltip from "../Tooltip"
import { LeftPanel, OptionsPanel, TerrainName } from "./styled"
import { GAME_ACTIONS } from "../../redux/reducers/game"
import { useAppDispatch } from "../../hooks/redux-hooks"
import PlayerPlants from "./PlayerPlants"

interface IProps {
  plants: IPlants
  habitat: IHabitat
  userName: string
  isCampaign?: boolean
}

export default function SidePanel({ plants, isCampaign, habitat, userName }: IProps) {
  const [showTerrainTooltip, setShowTerrainTooltip] = useState<boolean>(false)
  const [soundState, setSoundState] = useState<"off" | "on">("on")
  const [showExitModal, setShowExitModal] = useState<boolean>(false)
  const history = useHistory()
  const dispatch = useAppDispatch()

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

  const handleExit = () => {
    dispatch(GAME_ACTIONS.EMPTY_STATE())
    history.push(isCampaign ? "/menu" : "/")
  }

  return (
    <LeftPanel bgImage={`/images/terrains/${habitat.name.toLowerCase()}.webp`}>
      <PlayerPlants name="PC" plants={plants.pc} />

      <TerrainName color={habitat.color}>
        <OptionsPanel>
          <button onClick={handleSoundButton}>
            <img alt="sound-button" src={`/icons/sound-${soundState}-icon.png`} />
          </button>
          <button onClick={() => setShowExitModal(true)}>
            <img alt="exit-button" src={`/icons/exit-icon.png`} />
          </button>
        </OptionsPanel>

        <div
          className="name-container"
          onMouseEnter={() => setShowTerrainTooltip(true)}
          onMouseLeave={() => setShowTerrainTooltip(false)}>
          {habitat.name}
          {showTerrainTooltip && (
            <Tooltip
              direction="BOTTOM"
              title="Bonus"
              description={
                habitat.name !== "Neutral"
                  ? habitat.description
                  : "In Neutral habitat there's no benefit"
              }
            />
          )}
        </div>
      </TerrainName>

      <PlayerPlants name={userName} plants={plants.user} />

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
            <ACButton onClick={handleExit}>Exit</ACButton>
          </>
        </Modal>
      )}
    </LeftPanel>
  )
}
