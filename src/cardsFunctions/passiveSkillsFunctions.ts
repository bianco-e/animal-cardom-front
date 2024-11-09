import { HandKey, IGameState } from "../interfaces"
import { getRandomChance } from "../utils"

const slothFn = (state: IGameState, enemyHandKey: HandKey) => {
  const { hands } = state
  return {
    ...state,
    hands: {
      ...hands,
      [enemyHandKey]: hands[enemyHandKey].map(animal => {
        return {
          ...animal,
          is_sleeping:
            animal.name === "Sloth" && animal.life.current > 0
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
