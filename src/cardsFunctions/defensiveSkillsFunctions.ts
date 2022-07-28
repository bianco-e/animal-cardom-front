import { IGameState } from "../context/HandsContext"
import { HandKey, IAnimal } from "../interfaces"
import { getRandomChance } from "../utils"

const BUTTERFLY_ANIMAL: IAnimal = {
  skill: {
    types: ["none"],
    name: "",
    description: "",
    toDo: (state: any, hand: HandKey) => state,
  },
  attack: {
    initial: 1,
    current: 1,
  },
  life: {
    initial: 1,
    current: 1,
  },
  poisoned: {
    damage: 0,
    rounds: 0,
  },
  species: "🦂",
  name: "Butterfly",
  image: "/images/animals/adult-butterfly.webp",
  paralyzed: 0,
  targeteable: true,
  bleeding: false,
  price: 45,
}

const applyDmg = (animal: IAnimal, statsDiff: number): IAnimal => ({
  ...animal,
  life: {
    ...animal.life,
    current: statsDiff < 1 ? "DEAD" : statsDiff,
  },
})

const ballBugFn = (
  state: IGameState,
  enemyHandKey: HandKey,
  statsDiff: number
): IGameState => {
  const defender = state.defender!
  return {
    ...state,
    underAttack: defender.name,
    dodgedAttack: undefined,
    hands: {
      ...state.hands,
      [enemyHandKey]: state.hands[enemyHandKey].map(animal => {
        if (animal.name !== defender.name) return animal
        if (animal.paralyzed > 0) return applyDmg(animal, statsDiff)
        const takesLessDmg = getRandomChance(50)
        return applyDmg(animal, takesLessDmg ? statsDiff + 1 : statsDiff)
      }),
    },
  }
}

const basiliskLizardFn = (
  state: IGameState,
  enemyHandKey: HandKey,
  statsDiff: number
): IGameState => {
  const defender = state.defender!
  const dodgesAttack = defender.paralyzed === 0 && getRandomChance(30)
  return {
    ...state,
    underAttack: dodgesAttack ? undefined : defender.name,
    dodgedAttack: dodgesAttack ? defender.name : undefined,
    hands: {
      ...state.hands,
      [enemyHandKey]: state.hands[enemyHandKey].map(animal => {
        if (animal.name !== defender.name) return animal
        if (dodgesAttack) return animal
        return applyDmg(animal, statsDiff)
      }),
    },
  }
}

const caterpillarFn = (
  state: IGameState,
  enemyHandKey: HandKey,
  statsDiff: number
): IGameState => {
  const defender = state.defender!
  return {
    ...state,
    underAttack: defender.name,
    dodgedAttack: undefined,
    hands: {
      ...state.hands,
      [enemyHandKey]: state.hands[enemyHandKey].map(animal => {
        if (animal.name !== defender.name) return animal
        if (animal.paralyzed === 0 && statsDiff < 1) return BUTTERFLY_ANIMAL
        return applyDmg(animal, statsDiff)
      }),
    },
  }
}

const combStarFn = (
  state: IGameState,
  enemyHandKey: HandKey,
  statsDiff: number
): IGameState => {
  const ownHandKey = enemyHandKey === "pc" ? "user" : "pc"
  const defender = state.defender!
  const attacker = state.attacker!
  return {
    ...state,
    underAttack: defender.name,
    dodgedAttack: undefined,
    hands: {
      [ownHandKey]: state.hands[ownHandKey].map(animal => {
        if (animal.name === attacker.name && defender.paralyzed === 0) {
          return {
            ...animal,
            poisoned: {
              damage: 1,
              rounds: 5,
            },
          }
        } else return animal
      }),
      [enemyHandKey]: state.hands[enemyHandKey].map(animal => {
        if (animal.name !== defender.name) return animal
        return applyDmg(animal, statsDiff)
      }),
    },
  }
}

const grasshoperFn = (
  state: IGameState,
  enemyHandKey: HandKey,
  statsDiff: number
): IGameState => {
  const defender = state.defender!
  const dodgesAttack = defender.paralyzed === 0 && getRandomChance(10)
  return {
    ...state,
    underAttack: dodgesAttack ? undefined : defender.name,
    dodgedAttack: dodgesAttack ? defender.name : undefined,
    hands: {
      ...state.hands,
      [enemyHandKey]: state.hands[enemyHandKey].map(animal => {
        if (animal.name !== defender.name) return animal
        if (dodgesAttack) return animal
        return applyDmg(animal, statsDiff)
      }),
    },
  }
}

const hedgehogFn = (
  state: IGameState,
  enemyHandKey: HandKey,
  statsDiff: number
): IGameState => {
  const ownHandKey = enemyHandKey === "pc" ? "user" : "pc"
  const defender = state.defender!
  const attacker = state.attacker!
  return {
    ...state,
    underAttack: defender.name,
    dodgedAttack: undefined,
    hands: {
      [ownHandKey]: state.hands[ownHandKey].map(animal => {
        if (animal.name === attacker.name && defender.paralyzed === 0) {
          if (typeof animal.life.current !== "number") return animal
          const diff = animal.life.current - defender.attack.current
          return applyDmg(animal, diff)
        } else return animal
      }),
      [enemyHandKey]: state.hands[enemyHandKey].map(animal => {
        if (animal.name !== defender.name) return animal
        return applyDmg(animal, statsDiff)
      }),
    },
  }
}

const lizardFn = (
  state: IGameState,
  enemyHandKey: HandKey,
  statsDiff: number
): IGameState => {
  const defender = state.defender!
  return {
    ...state,
    underAttack: defender.name,
    dodgedAttack: undefined,
    hands: {
      ...state.hands,
      [enemyHandKey]: state.hands[enemyHandKey].map(animal => {
        if (animal.name !== defender.name) return animal
        if (animal.paralyzed > 0) return applyDmg(animal, statsDiff)
        return applyDmg(animal, statsDiff + 1)
      }),
    },
  }
}

const ostrichFn = (
  state: IGameState,
  enemyHandKey: HandKey,
  statsDiff: number
): IGameState => {
  const defender = state.defender!
  return {
    ...state,
    underAttack: defender.name,
    dodgedAttack: undefined,
    hands: {
      ...state.hands,
      [enemyHandKey]: state.hands[enemyHandKey].map(animal => {
        if (animal.name !== defender.name) return animal
        if (animal.paralyzed > 0) return applyDmg(animal, statsDiff)
        return applyDmg(animal, statsDiff + 1)
      }),
    },
  }
}

const peacockFn = (
  state: IGameState,
  enemyHandKey: HandKey,
  statsDiff: number
): IGameState => {
  return {
    ...state,
    underAttack: state.defender!.name,
    dodgedAttack: undefined,
    hands: {
      ...state.hands,
      [enemyHandKey]: state.hands[enemyHandKey].map(animal => {
        if (animal.name !== state.defender!.name) return animal
        if (animal.paralyzed > 0) return applyDmg(animal, statsDiff)
        const takesLessDmg = getRandomChance(30)
        return applyDmg(animal, takesLessDmg ? statsDiff + 2 : statsDiff)
      }),
    },
  }
}

export default function getSkillFn(name: string) {
  switch (name) {
    case "Ball Bug":
      return ballBugFn
    case "Basilisk Lizard":
      return basiliskLizardFn
    case "Comb Star":
      return combStarFn
    case "Grasshoper":
      return grasshoperFn
    case "Hedgehog":
      return hedgehogFn
    case "Lizard":
      return lizardFn
    case "Ostrich":
      return ostrichFn
    case "Peacock":
      return peacockFn
    case "Caterpillar":
      return caterpillarFn
    default:
      return (state: IGameState, enemyHandKey: HandKey, statsDiff: number) => {
        return {
          ...state,
          underAttack: state.defender!.name,
          dodgedAttack: undefined,
          hands: {
            ...state.hands,
            [enemyHandKey]: state.hands[enemyHandKey].map(animal => {
              if (animal.name !== state.defender!.name) return animal
              return applyDmg(animal, statsDiff)
            }),
          },
        }
      }
  }
}
