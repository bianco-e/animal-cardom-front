import { useEffect, useState } from "react"
import { FlattenSimpleInterpolation } from "styled-components"
import {
  buffAnimation,
  cleaningAnimation,
  poisonAnimation,
  paralyzeAnimation,
  healingAnimation,
  audioFiles,
} from "../animations/plant-animations"
import { injuryAnimation } from "../animations/card-animations"
import { useAppSelector } from "./redux-hooks"

interface IProps {
  name: string
  soundState: string | null
}

export interface AnimationProps {
  animation: FlattenSimpleInterpolation
  src: string
  fullWidth?: boolean
}

interface PlantData {
  audio: HTMLAudioElement
  animation: FlattenSimpleInterpolation
  img: string
  fullWidth?: boolean
}

interface PlantsData {
  [plant: string]: PlantData
}

const plantsAnimationsData: PlantsData = {
  Peyote: {
    audio: audioFiles.paralyze,
    animation: paralyzeAnimation,
    img: "/images/plants/spiral.png",
  },
  Ricinum: {
    audio: audioFiles.poison,
    animation: poisonAnimation,
    img: "/images/plants/green-smoke.png",
  },
  Withania: {
    audio: audioFiles.bite,
    animation: buffAnimation,
    img: "/images/plants/violet-buff.png",
    fullWidth: true,
  },
  Jewelweed: {
    audio: audioFiles.healing,
    animation: cleaningAnimation,
    img: "/images/plants/yellow-stars.png",
    fullWidth: true,
  },
  Coffee: {
    audio: audioFiles.bite,
    animation: cleaningAnimation,
    img: "/images/plants/yellow-stars.png",
    fullWidth: true,
  },
  Aloe: {
    audio: audioFiles.healing,
    animation: healingAnimation,
    img: "/images/plants/yellow-flash.png",
  },
  Cactus: {
    audio: audioFiles.puncture,
    animation: injuryAnimation,
    img: "/images/svg/blood-splatter.svg",
  },
  Horsetail: {
    audio: audioFiles.healing,
    animation: cleaningAnimation,
    img: "/images/plants/yellow-stars.png",
  },
  Marigold: {
    audio: audioFiles.healing,
    animation: cleaningAnimation,
    img: "/images/plants/yellow-stars.png",
  },
}

export default function usePlantAnimation({ name, soundState }: IProps) {
  const [animationProps, setAnimationProps] = useState<AnimationProps | undefined>()
  const game = useAppSelector(({ game }) => game)

  useEffect(() => {
    if (animationProps) {
      setTimeout(() => {
        setAnimationProps(undefined)
      }, 910)
    }
  }, [animationProps])

  useEffect(() => {
    if (game.treatedAnimal?.name === name && game.usedPlants.length > 0) {
      const plantName = game.usedPlants[game.usedPlants.length - 1].name
      const plantData = plantsAnimationsData[plantName]
      if (soundState === "on") {
        plantData.audio.play()
      }
      setAnimationProps({
        fullWidth: plantData.fullWidth,
        animation: plantData.animation,
        src: plantData.img,
      })
    }
  }, [game.treatedAnimal, game.usedPlants]) //eslint-disable-line

  return [animationProps]
}
