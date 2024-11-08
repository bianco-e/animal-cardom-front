import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from "../Common/Modal"
import { ACButton, ModalTitle, Text } from "../styled-components"
import { IPlants, Habitat } from "../../interfaces/index"
import Tooltip from "../Tooltip"
import { GamePanel, OptionsPanel, HabitatName } from "./styled"
import { GAME_ACTIONS } from "../../redux/reducers/game"
import { useAppDispatch } from "../../hooks/redux-hooks"
import PlayerPlants from "./PlayerPlants"

interface IProps {
  plants: IPlants
  habitat: Habitat
  userName: string
  isCampaign?: boolean
}

export default function SidePanel({ plants, isCampaign, habitat, userName }: IProps) {
  const [showHabitatTooltip, setShowHabitatTooltip] = useState<boolean>(false)
  const [soundState, setSoundState] = useState<"off" | "on">("on")
  const [showExitModal, setShowExitModal] = useState<boolean>(false)
  const navigate = useNavigate()
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
    navigate(isCampaign ? "/menu" : "/")
  }

  return (
    <GamePanel $bgImage={`/images/habitats/${habitat.name.toLowerCase()}.webp`}>
      <PlayerPlants name="PC" plants={plants.pc} />

      <HabitatName color={habitat.color}>
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
          onMouseEnter={() => setShowHabitatTooltip(true)}
          onMouseLeave={() => setShowHabitatTooltip(false)}>
          {habitat.name}
          {showHabitatTooltip && (
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
      </HabitatName>

      <PlayerPlants name={userName} plants={plants.user} />

      {showExitModal && (
        <Modal closeModal={() => setShowExitModal(false)} withCloseButton={false}>
          <>
            <ModalTitle>You are about to exit</ModalTitle>
            <Text $margin="10px 0 5px">Current game progress will get lost.</Text>
            <Text>Are you sure?</Text>
            <ACButton
              $fWeight="bold"
              $margin="20px 0"
              onClick={() => setShowExitModal(false)}>
              Stay
            </ACButton>
            <ACButton onClick={handleExit}>Exit</ACButton>
          </>
        </Modal>
      )}
    </GamePanel>
  )
}
