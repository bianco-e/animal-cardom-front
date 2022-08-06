import { useState } from "react"
import { useAppSelector } from "../../hooks/redux-hooks"
import Modal from "../Common/Modal"
import { CasterText, CasterWrapper, FullScreenButton } from "./styled"

export default function PcPlaysCaster() {
  const game = useAppSelector(({ game }) => game)
  const { pcPlays } = game
  const [showFull, setShowFull] = useState<boolean>(false)

  const filteredPlays = pcPlays.filter(play => play !== "Thinking...")
  return (
    <>
      {pcPlays.length && !showFull ? (
        <CasterText>
          {pcPlays[pcPlays.length - 1]}{" "}
          {filteredPlays.length ? (
            <FullScreenButton onClick={() => setShowFull(!showFull)}>
              SEE PC PLAYS HISTORY
            </FullScreenButton>
          ) : null}
        </CasterText>
      ) : null}

      {showFull ? (
        <Modal closeModal={() => setShowFull(false)}>
          <CasterWrapper>
            {filteredPlays.map((play, i) => (
              <CasterText key={play + i}>
                Turn {i + 1}: {play}
              </CasterText>
            ))}
          </CasterWrapper>
        </Modal>
      ) : null}
    </>
  )
}
