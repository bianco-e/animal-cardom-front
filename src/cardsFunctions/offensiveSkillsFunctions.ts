import { HandKey, IAnimal, Poisoned, IGameState } from "../interfaces"
import { getRandomFromArr } from "../utils"

const poisonEnemy = (arr: IAnimal[], defender: IAnimal, poisoned: Poisoned) => {
  return arr.map(card => {
    if (card.name === defender.name && card.life.current !== "DEAD") {
      return {
        ...card,
        poisoned,
      }
    } else return card
  })
}

const makeEnemyBleed = (arr: IAnimal[], defender: IAnimal) => {
  return arr.map(card => {
    if (card.name === defender.name && card.life.current !== "DEAD") {
      return {
        ...card,
        bleeding: true,
      }
    } else return card
  })
}

const paralyzeEnemy = (arr: IAnimal[], defender: IAnimal, roundsNumber: number) => {
  return arr.map(card => {
    if (card.name === defender.name && card.life.current !== "DEAD") {
      return {
        ...card,
        paralyzed: roundsNumber,
      }
    } else return card
  })
}

const healItself = (arr: IAnimal[], attacker: IAnimal, healthAmount: number) => {
  return arr.map(card => {
    if (card.name === attacker.name && typeof card.life.current === "number") {
      return {
        ...card,
        life: {
          ...card.life,
          current: card.life.current + healthAmount,
        },
      }
    } else return card
  })
}

const killInstantly = (arr: IAnimal[], animal: IAnimal) => {
  return arr.map(card => {
    if (card.name === animal.name) {
      return {
        ...card,
        life: {
          ...card.life,
          current: "DEAD",
        },
      }
    } else return card
  })
}

const modifyAnimalAttack = (
  arr: IAnimal[],
  animal: IAnimal,
  attackAmount: number,
  operator: "+" | "-"
) => {
  return arr.map(card => {
    if (card.name === animal.name) {
      return {
        ...card,
        attack: {
          ...card.attack,
          current:
            operator === "+"
              ? card.attack.current + attackAmount
              : card.attack.current - attackAmount,
        },
      }
    } else return card
  })
}

const increaseAlliesAttack = (arr: IAnimal[], attackAmount: number) => {
  return arr.map(card => {
    if (card.life.current !== "DEAD") {
      return {
        ...card,
        attack: {
          ...card.attack,
          current: card.attack.current + attackAmount,
        },
      }
    } else return card
  })
}

const decreaseEnemiesAttack = (arr: IAnimal[], attackAmount: number) => {
  return arr.map(card => {
    if (card.life.current !== "DEAD" && card.attack.current > 1) {
      return {
        ...card,
        attack: {
          ...card.attack,
          current: card.attack.current - attackAmount,
        },
      }
    } else return card
  })
}

const copyDefenderSkill = (arr: IAnimal[], defender: IAnimal, attacker: IAnimal) => {
  return arr.map(card => {
    if (card.name === attacker.name) {
      return {
        ...card,
        skill: defender.skill,
      }
    } else return card
  })
}

const setTargeteableAsTrue = (arr: IAnimal[], animal: IAnimal) => {
  return arr.map(card => {
    if (card.name === animal.name) {
      return {
        ...card,
        targeteable: true,
      }
    } else return card
  })
}

const setHandInState = (state: IGameState, enemyHandKey: HandKey, newHand: IAnimal[]) => {
  return {
    ...state,
    hands: {
      ...state.hands,
      [enemyHandKey]: newHand,
    },
  }
}

const batFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender, attacker } = state
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  const newOwnHand = healItself(hands[allyHandKey], attacker!, 1)
  const newEnemyHand = makeEnemyBleed(hands[enemyHandKey], defender!)
  return {
    ...state,
    hands: {
      [enemyHandKey]: newEnemyHand,
      [allyHandKey]: newOwnHand,
    },
  }
}

const bearFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  const newHand = makeEnemyBleed(hands[enemyHandKey], defender!)
  return setHandInState(state, enemyHandKey, newHand)
}

const beeFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, attacker } = state
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  return {
    ...state,
    hands: {
      ...hands,
      [allyHandKey]: killInstantly(hands[allyHandKey], attacker!),
    },
  }
}

const blowfishFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, attacker } = state
  const attackAmount = 2
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  const newHand = modifyAnimalAttack(hands[allyHandKey], attacker!, attackAmount, "+")
  return setHandInState(state, allyHandKey, newHand)
}

const cassowaryFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 1
  const newHand = paralyzeEnemy(hands[enemyHandKey], defender!, roundsNumber)
  return setHandInState(state, enemyHandKey, newHand)
}

const chameleonFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, attacker } = state
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  const newHand = setTargeteableAsTrue(hands[allyHandKey], attacker!)
  return setHandInState(state, allyHandKey, newHand)
}

const cheetahFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, attacker } = state
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  const newHand = setTargeteableAsTrue(hands[allyHandKey], attacker!)
  return setHandInState(state, allyHandKey, newHand)
}

const eagleFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender, attacker } = state
  if (attacker!.species === "🦂") {
    const newHand = killInstantly(hands[enemyHandKey], defender!)
    return setHandInState(state, enemyHandKey, newHand)
  }
  return state
}

const electriceelFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 2
  const newHand = paralyzeEnemy(hands[enemyHandKey], defender!, roundsNumber)
  return setHandInState(state, enemyHandKey, newHand)
}

const elephantFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands } = state
  const attackAmount = 1
  const newHand = decreaseEnemiesAttack(hands[enemyHandKey], attackAmount)
  return setHandInState(state, enemyHandKey, newHand)
}

const gorillaFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, attacker } = state
  const attackAmount = 1
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  const newHand = modifyAnimalAttack(hands[allyHandKey], attacker!, attackAmount, "+")
  return setHandInState(state, allyHandKey, newHand)
}

const hummingbirdFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { usedPlants, plants } = state
  const enemyUnusedPlants = plants[enemyHandKey].filter(
    plant => !usedPlants.includes(plant)
  )
  if (enemyUnusedPlants.length === 0) return state
  const plantToRemove = getRandomFromArr(enemyUnusedPlants)
  return {
    ...state,
    usedPlants: state.usedPlants.concat(plantToRemove),
  }
}

const hornedLizardFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 3
  const newHand = paralyzeEnemy(hands[enemyHandKey], defender!, roundsNumber)
  return setHandInState(state, enemyHandKey, newHand)
}

const komododragonFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  const poison = { damage: 1, rounds: 1 }
  const poisonedHand = poisonEnemy(hands[enemyHandKey], defender!, poison)
  return setHandInState(state, enemyHandKey, poisonedHand)
}

const leechFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, attacker, defender } = state
  if (defender!.bleeding) {
    const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
    const newHand = healItself(hands[allyHandKey], attacker!, 2)
    return setHandInState(state, allyHandKey, newHand)
  } else return state
}

const lionFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 3
  const newHand = paralyzeEnemy(hands[enemyHandKey], defender!, roundsNumber)
  return setHandInState(state, enemyHandKey, newHand)
}

const mosquitoFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, attacker } = state
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  const newHand = healItself(hands[allyHandKey], attacker!, attacker!.attack.current)
  return setHandInState(state, allyHandKey, newHand)
}

const octopusFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 1
  const newHand = paralyzeEnemy(hands[enemyHandKey], defender!, roundsNumber)
  return setHandInState(state, enemyHandKey, newHand)
}

const orcFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 1
  const newHand = paralyzeEnemy(hands[enemyHandKey], defender!, roundsNumber)
  return setHandInState(state, enemyHandKey, newHand)
}

const parrotFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender, attacker } = state
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  const updatedDefender = hands[enemyHandKey].find(card => card.name === defender!.name)
  if (
    updatedDefender &&
    updatedDefender.life.current === "DEAD" &&
    !updatedDefender.skill.types.includes("none")
  ) {
    const newHand = copyDefenderSkill(hands[allyHandKey], defender!, attacker!)
    return setHandInState(state, allyHandKey, newHand)
  } else return state
}

const salamanderFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, attacker } = state
  const healthAmount = 1
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  if (attacker!.life.current < attacker!.life.initial) {
    const newHand = healItself(hands[allyHandKey], attacker!, healthAmount)
    return setHandInState(state, allyHandKey, newHand)
  } else return state
}

const scorpionFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  const poison = { damage: 1, rounds: 3 }
  const newHand = poisonEnemy(hands[enemyHandKey], defender!, poison)
  return setHandInState(state, enemyHandKey, newHand)
}

const snakeFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  const poison = { damage: 1, rounds: 3 }
  const newHand = poisonEnemy(hands[enemyHandKey], defender!, poison)
  return setHandInState(state, enemyHandKey, newHand)
}

const spiderFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 2
  const newHand = paralyzeEnemy(hands[enemyHandKey], defender!, roundsNumber)
  return setHandInState(state, enemyHandKey, newHand)
}

const stingrayFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  const poison = { damage: 1, rounds: 1 }
  const newHand = poisonEnemy(hands[enemyHandKey], defender!, poison)
  return setHandInState(state, enemyHandKey, newHand)
}

const swordfishFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  const newHand = makeEnemyBleed(hands[enemyHandKey], defender!)
  return setHandInState(state, enemyHandKey, newHand)
}

const toadAndFrogFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, defender } = state
  if (defender!.species === "🦂") {
    const newHand = killInstantly(hands[enemyHandKey], defender!)
    return setHandInState(state, enemyHandKey, newHand)
  } else return state
}

const tortoiseFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, attacker } = state
  const healthAmount = 2
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  const newHand = healItself(hands[allyHandKey], attacker!, healthAmount)
  return setHandInState(state, allyHandKey, newHand)
}

const vultureFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands, attacker } = state
  const attackAmount = 4
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  if (
    hands[enemyHandKey]
      .concat(hands[allyHandKey])
      .some(card => card.life.current === "DEAD")
  ) {
    const newHand = modifyAnimalAttack(hands[allyHandKey], attacker!, attackAmount, "+")
    return setHandInState(state, allyHandKey, newHand)
  } else return state
}

const wolfFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { hands } = state
  const attackAmount = 1
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  const newHand = increaseAlliesAttack(hands[allyHandKey], attackAmount)
  return setHandInState(state, allyHandKey, newHand)
}

export const getExtraDamage = (attacker: IAnimal, defender: IAnimal): number => {
  if (attacker.paralyzed > 0) return 0
  switch (attacker.name) {
    case "Alligator":
      return 1
    case "Bee":
      return 3
    case "Crocodile":
      return 2
    case "Eagle":
      return defender.species !== "🦂" ? 2 : 0
    case "Komodo Dragon":
      return 1
    case "Hyena":
      return defender.life.current < defender.life.initial ? 2 : 0
    case "Mole":
      return defender.species === "🦂" ? 1 : 0
    case "Pelican":
      return defender.species === "🦈" ? 2 : 0
    case "Shark":
      return defender.bleeding ? 2 : 0
    default:
      return 0
  }
}

// animals that ONLY make extra damage don't have a skillFn
export default function getSkillFn(
  name: string
): (state: IGameState, enemyHandKey: HandKey) => IGameState {
  switch (name) {
    case "Bat":
      return batFn
    case "Bear":
      return bearFn
    case "Bee":
      return beeFn
    case "Blowfish":
      return blowfishFn
    case "Cassowary":
      return cassowaryFn
    case "Chameleon":
      return chameleonFn
    case "Cheetah":
      return cheetahFn
    case "Eagle":
      return eagleFn
    case "Electric Eel":
      return electriceelFn
    case "Elephant":
      return elephantFn
    case "Frog":
      return toadAndFrogFn
    case "Gorilla":
      return gorillaFn
    case "Hummingbird":
      return hummingbirdFn
    case "Horned Lizard":
      return hornedLizardFn
    case "Komodo Dragon":
      return komododragonFn
    case "Leech":
      return leechFn
    case "Lion":
      return lionFn
    case "Mosquito":
      return mosquitoFn
    case "Octopus":
      return octopusFn
    case "Orc":
      return orcFn
    case "Parrot":
      return parrotFn
    case "Salamander":
      return salamanderFn
    case "Scorpion":
      return scorpionFn
    case "Snake":
      return snakeFn
    case "Spider":
      return spiderFn
    case "Stingray":
      return stingrayFn
    case "Swordfish":
      return swordfishFn
    case "Toad":
      return toadAndFrogFn
    case "Tortoise":
      return tortoiseFn
    case "Vulture":
      return vultureFn
    case "Wolf":
      return wolfFn
    default:
      return (state: IGameState) => state
  }
}
