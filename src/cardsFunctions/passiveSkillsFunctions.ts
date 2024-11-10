import { HandKey, IGameState } from "../interfaces"
import { getLiveCardsInAHand, getRandomChance } from "../utils"

const slothFn = (state: IGameState, enemyHandKey: HandKey) => {
  const { hands } = state
  const aliveAnimals = getLiveCardsInAHand(hands[enemyHandKey])
  return {
    ...state,
    hands: {
      ...hands,
      [enemyHandKey]: hands[enemyHandKey].map(animal => {
        const isSloth = animal.name === "Sloth"
        return {
          ...animal,
          is_sleeping:
          isSloth && animal.life.current > 0 && aliveAnimals.length > 1
              ? getRandomChance(60)
              : false,
        }
      }),
    },
  }
}

export default function getPassiveSkillFn(
  name: string
): ((state: IGameState, enemyHandKey: HandKey) => IGameState) | null {
  switch (name) {
    case "Sloth":
      return slothFn
    default:
      return null
  }
}
