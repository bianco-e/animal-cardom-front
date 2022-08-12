import { useState } from "react"
import { Action } from "../../interfaces"
import { createAction } from "../../queries/tracking"
import Modal from "../Common/Modal"
import {
  HowToPlayCTA,
  HowToPlaySubtitle,
  HowToPlayText,
  HowToPlayTitle,
  HowToPlayWrapper,
} from "./styled"

interface IProps {
  action?: Action
}

export default function HowToPlay({ action }: IProps) {
  const [openHowToPlay, setOpenHowToPlay] = useState<boolean>(false)

  const handleToggle = () => {
    setOpenHowToPlay(!openHowToPlay)
    if (action) return createAction(action)
  }

  return (
    <>
      <HowToPlayCTA onClick={handleToggle}>
        <span>?</span>
      </HowToPlayCTA>

      {openHowToPlay ? (
        <Modal closeModal={() => setOpenHowToPlay(false)}>
          <HowToPlayWrapper>
            <HowToPlayTitle>How to play</HowToPlayTitle>
            <HowToPlayText>
              Animal Cardom is a turn-based strategy card game where the objective is to
              kill all opponent's animals
            </HowToPlayText>
            <HowToPlayText>
              A <b>terrain</b> will be set at the very beginning affecting (or not)
              animals.
            </HowToPlayText>
            <HowToPlayText>
              Each player gets <b>five different animals</b> and{" "}
              <b>three different plants</b> which might be applied on animals.
            </HowToPlayText>
            <HowToPlayText>
              There are currently two game modes: playing single matches <b>as a guest</b>{" "}
              with random cards for both players and a random terrain or playing a{" "}
              <b>campaign</b> which requires signing in to save the progress, where you're
              going to be able to buy cards and build your own hand. <b>PvP mode</b> is
              coming soon.
            </HowToPlayText>

            <HowToPlaySubtitle>Animals</HowToPlaySubtitle>
            <HowToPlayText>
              Each animal has an <b>ability</b> which can be offensive (activated when
              attacking) or defensive (activated when the animal is under attack),{" "}
              <b>attack points</b> and <b>life points</b>, also each animal belongs to a{" "}
              <b>species</b> which can give you benefits or not depending on the terrain
              or other cards' abilities. Select an owned animal and click an opponent to
              attack.
            </HowToPlayText>

            <HowToPlaySubtitle>Plants</HowToPlaySubtitle>
            <HowToPlayText>
              Hover on <b>plants</b> to see what they do. Click a plant and then click an
              animal to apply it. <b>Buffing/healing plants</b> can only be applied on
              allies and <b>offensive plants</b> can only be applied on enemies.
            </HowToPlayText>

            <HowToPlaySubtitle>Terrains</HowToPlaySubtitle>
            <HowToPlayText>
              There are 7 different terrains. One of them is set when the game begins and
              it may benefit a species increasing animals attack by 1.
            </HowToPlayText>
            <HowToPlayText>
              <b>- Neutral</b> doesn't buff any animal
            </HowToPlayText>
            <HowToPlayText>
              <b>- Swamp</b> buffs 🐸 animals
            </HowToPlayText>
            <HowToPlayText>
              <b>- Desert</b> buffs 🦂 animals
            </HowToPlayText>
            <HowToPlayText>
              <b>- Mountain</b> buffs 🦅 animals
            </HowToPlayText>
            <HowToPlayText>
              <b>- Sea</b> buffs 🦈 animals
            </HowToPlayText>
            <HowToPlayText>
              <b>- Forest</b> buffs 🦎 animals
            </HowToPlayText>
            <HowToPlayText>
              <b>- Jungle</b> buffs 🐺 animals
            </HowToPlayText>
          </HowToPlayWrapper>
        </Modal>
      ) : null}
    </>
  )
}
