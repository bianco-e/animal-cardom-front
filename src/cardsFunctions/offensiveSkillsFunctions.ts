import { IGameState } from "../context/HandsContext"
import { HandKey, IAnimal, Poisoned } from "../interfaces"

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

const setHandInState = (state: IGameState, hand: HandKey, newHand: IAnimal[]) => {
  return {
    ...state,
    hands: {
      ...state.hands,
      [hand]: newHand,
    },
  }
}

const batFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender, attacker } = state
  const otherHand = hand === "pc" ? "user" : "pc"
  const newOwnHand = healItself(hands[otherHand], attacker!, 1)
  const newEnemyHand = makeEnemyBleed(hands[hand], defender!)
  return {
    ...state,
    hands: {
      [hand]: newEnemyHand,
      [otherHand]: newOwnHand,
    },
  }
}

const bearFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  const newHand = makeEnemyBleed(hands[hand], defender!)
  return setHandInState(state, hand, newHand)
}

const beeFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, attacker } = state
  const otherHand = hand === "pc" ? "user" : "pc"
  return {
    ...state,
    hands: {
      ...hands,
      [otherHand]: killInstantly(hands[otherHand], attacker!),
    },
  }
}

const blowfishFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, attacker } = state
  const attackAmount = 2
  const otherHand = hand === "pc" ? "user" : "pc"
  const newHand = modifyAnimalAttack(hands[otherHand], attacker!, attackAmount, "+")
  return setHandInState(state, otherHand, newHand)
}

const cassowaryFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 1
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber)
  return setHandInState(state, hand, newHand)
}

const chameleonFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, attacker } = state
  const otherHand = hand === "pc" ? "user" : "pc"
  const newHand = setTargeteableAsTrue(hands[otherHand], attacker!)
  return setHandInState(state, otherHand, newHand)
}

const cheetahFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, attacker } = state
  const otherHand = hand === "pc" ? "user" : "pc"
  const newHand = setTargeteableAsTrue(hands[otherHand], attacker!)
  return setHandInState(state, otherHand, newHand)
}

const eagleFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender, attacker } = state
  if (attacker!.species === "🦂") {
    const newHand = killInstantly(hands[hand], defender!)
    return setHandInState(state, hand, newHand)
  }
  return state
}

const electriceelFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 2
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber)
  return setHandInState(state, hand, newHand)
}

const elephantFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands } = state
  const attackAmount = 1
  const newHand = decreaseEnemiesAttack(hands[hand], attackAmount)
  return setHandInState(state, hand, newHand)
}

const gorillaFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, attacker } = state
  const attackAmount = 1
  const otherHand = hand === "pc" ? "user" : "pc"
  const newHand = modifyAnimalAttack(hands[otherHand], attacker!, attackAmount, "+")
  return setHandInState(state, otherHand, newHand)
}

const hornedLizardFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 3
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber)
  return setHandInState(state, hand, newHand)
}

const komododragonFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  const poison = { damage: 1, rounds: 1 }
  const poisonedHand = poisonEnemy(hands[hand], defender!, poison)
  return setHandInState(state, hand, poisonedHand)
}

const leechFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, attacker, defender } = state
  if (defender!.bleeding) {
    const otherHand = hand === "pc" ? "user" : "pc"
    const newHand = healItself(hands[otherHand], attacker!, 2)
    return setHandInState(state, otherHand, newHand)
  } else return state
}

const lionFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 3
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber)
  return setHandInState(state, hand, newHand)
}

const mosquitoFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, attacker } = state
  const otherHand = hand === "pc" ? "user" : "pc"
  const newHand = healItself(hands[otherHand], attacker!, attacker!.attack.current)
  return setHandInState(state, otherHand, newHand)
}

const octopusFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 1
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber)
  return setHandInState(state, hand, newHand)
}

const orcFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 1
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber)
  return setHandInState(state, hand, newHand)
}

const parrotFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender, attacker } = state
  const otherHand = hand === "pc" ? "user" : "pc"
  const updatedDefender = hands[hand].find(card => card.name === defender!.name)
  if (
    updatedDefender &&
    updatedDefender.life.current === "DEAD" &&
    !updatedDefender.skill.types.includes("none")
  ) {
    const newHand = copyDefenderSkill(hands[otherHand], defender!, attacker!)
    return setHandInState(state, otherHand, newHand)
  } else return state
}

const salamanderFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, attacker } = state
  const healthAmount = 1
  const otherHand = hand === "pc" ? "user" : "pc"
  if (attacker!.life.current < attacker!.life.initial) {
    const newHand = healItself(hands[otherHand], attacker!, healthAmount)
    return setHandInState(state, otherHand, newHand)
  } else return state
}

const scorpionFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  const poison = { damage: 1, rounds: 3 }
  const newHand = poisonEnemy(hands[hand], defender!, poison)
  return setHandInState(state, hand, newHand)
}

const snakeFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  const poison = { damage: 1, rounds: 3 }
  const newHand = poisonEnemy(hands[hand], defender!, poison)
  return setHandInState(state, hand, newHand)
}

const spiderFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  const roundsNumber = 2
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber)
  return setHandInState(state, hand, newHand)
}

const stingrayFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  const poison = { damage: 1, rounds: 1 }
  const newHand = poisonEnemy(hands[hand], defender!, poison)
  return setHandInState(state, hand, newHand)
}

const swordfishFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  const newHand = makeEnemyBleed(hands[hand], defender!)
  return setHandInState(state, hand, newHand)
}

const toadAndFrogFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, defender } = state
  if (defender!.species === "🦂") {
    const newHand = killInstantly(hands[hand], defender!)
    return setHandInState(state, hand, newHand)
  } else return state
}

const tortoiseFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, attacker } = state
  const healthAmount = 2
  const otherHand = hand === "pc" ? "user" : "pc"
  const newHand = healItself(hands[otherHand], attacker!, healthAmount)
  return setHandInState(state, otherHand, newHand)
}

const vultureFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands, attacker } = state
  const attackAmount = 4
  const otherHand = hand === "pc" ? "user" : "pc"
  if (hands[hand].concat(hands[otherHand]).some(card => card.life.current === "DEAD")) {
    const newHand = modifyAnimalAttack(hands[otherHand], attacker!, attackAmount, "+")
    return setHandInState(state, otherHand, newHand)
  } else return state
}

const wolfFn = (state: IGameState, hand: HandKey): IGameState => {
  const { hands } = state
  const attackAmount = 1
  const otherHand = hand === "pc" ? "user" : "pc"
  const newHand = increaseAlliesAttack(hands[otherHand], attackAmount)
  return setHandInState(state, otherHand, newHand)
}

export const getExtraDamageIfApplies = (attacker: IAnimal, defender: IAnimal): number => {
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
): (state: IGameState, hand: HandKey) => IGameState {
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
