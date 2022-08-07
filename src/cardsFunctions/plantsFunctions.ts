import { HandKey, IAnimal, Poisoned, IGameState } from "../interfaces"

const updateCardBleeding = (
  arr: IAnimal[],
  animalToTreat: IAnimal,
  isBleeding: boolean
): IAnimal[] => {
  return arr.map(card => {
    if (card === animalToTreat) {
      return {
        ...card,
        bleeding: isBleeding,
      }
    } else return card
  })
}

const reduceMissingChanceCard = (
  arr: IAnimal[],
  chanceToReduce: number,
  animalToTreat: IAnimal
): IAnimal[] => {
  return arr.map(card => {
    if (card.name !== animalToTreat.name || !card.missing.chance) return card
    const newMissingChance =
      card.missing.chance - chanceToReduce < 0 ? 0 : card.missing.chance - chanceToReduce
    return {
      ...card,
      missing: {
        ...card.missing,
        chance: newMissingChance,
      },
    }
  })
}

const poisonCardInAHand = (
  arr: IAnimal[],
  poisoned: Poisoned,
  animalToTreat: IAnimal
): IAnimal[] => {
  return arr.map(card => {
    if (card === animalToTreat) {
      return {
        ...card,
        poisoned,
      }
    } else return card
  })
}

const healCardInAHand = (
  arr: IAnimal[],
  amountToHeal: number,
  animalToTreat: IAnimal
): IAnimal[] => {
  return arr.map(card => {
    if (card === animalToTreat && card.life.current > 0) {
      return {
        ...card,
        life: {
          ...card.life,
          current:
            card.life.current + amountToHeal > card.life.initial
              ? card.life.initial
              : card.life.current + amountToHeal,
        },
      }
    } else return card
  })
}

const paralyzeCardInAHand = (
  arr: IAnimal[],
  roundsNumber: number,
  animalToTreat: IAnimal
): IAnimal[] => {
  return arr.map(card => {
    if (card === animalToTreat) {
      return {
        ...card,
        paralyzed: roundsNumber,
      }
    } else return card
  })
}

const setCardAttackInAHand = (
  arr: IAnimal[],
  attackAmount: number,
  animalToTreat: IAnimal
): IAnimal[] => {
  return arr.map(card => {
    if (card === animalToTreat) {
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

const setHandInState = (
  state: IGameState,
  enemyHandKey: HandKey,
  newHand: IAnimal[]
): IGameState => {
  const { hands, usedPlants, selectedPlant, animalToTreat } = state
  const newUsedPlants = selectedPlant ? [...usedPlants, selectedPlant] : usedPlants
  return {
    ...state,
    hands: {
      ...hands,
      [enemyHandKey]: newHand,
    },
    selectedPlant: undefined,
    animalToTreat: undefined,
    treatedAnimal: animalToTreat,
    usedPlants: newUsedPlants,
  }
}

const ricinumFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { animalToTreat, hands } = state
  const poison = { damage: 1, rounds: 3 }
  if (hands[enemyHandKey].includes(animalToTreat!)) {
    const newHand = poisonCardInAHand(hands[enemyHandKey], poison, animalToTreat!)
    return setHandInState(state, enemyHandKey, newHand)
  } else return state
}

const aloeFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { animalToTreat, hands } = state
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  if (
    hands[allyHandKey].includes(animalToTreat!) &&
    animalToTreat!.life.current < animalToTreat!.life.initial
  ) {
    const newHand = healCardInAHand(hands[allyHandKey], 2, animalToTreat!)
    return setHandInState(state, allyHandKey, newHand)
  } else return state
}

const cactusFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { animalToTreat, hands } = state
  if (hands[enemyHandKey].includes(animalToTreat!)) {
    const newHand = updateCardBleeding(hands[enemyHandKey], animalToTreat!, true)
    return setHandInState(state, enemyHandKey, newHand)
  } else return state
}

const coffeeFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { animalToTreat, hands } = state
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  if (hands[allyHandKey].includes(animalToTreat!) && animalToTreat!.paralyzed > 0) {
    const newHand = paralyzeCardInAHand(hands[allyHandKey], 0, animalToTreat!)
    return setHandInState(state, allyHandKey, newHand)
  } else return state
}

const horsetailFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { animalToTreat, hands } = state
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  if (hands[allyHandKey].includes(animalToTreat!) && animalToTreat!.bleeding) {
    const newHand = updateCardBleeding(hands[allyHandKey], animalToTreat!, false)
    return setHandInState(state, allyHandKey, newHand)
  } else return state
}

const jewelweedFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { animalToTreat, hands } = state
  const poison = { damage: 0, rounds: 0 }
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  if (hands[allyHandKey].includes(animalToTreat!) && animalToTreat!.poisoned.rounds > 0) {
    const newHand = poisonCardInAHand(hands[allyHandKey], poison, animalToTreat!)
    return setHandInState(state, allyHandKey, newHand)
  } else return state
}

const marigoldFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { animalToTreat, hands } = state
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  if (hands[allyHandKey].includes(animalToTreat!) && animalToTreat!.missing.chance) {
    const newHand = reduceMissingChanceCard(hands[allyHandKey], 20, animalToTreat!)
    return setHandInState(state, allyHandKey, newHand)
  } else return state
}

const peyoteFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { animalToTreat, hands } = state
  if (hands[enemyHandKey].includes(animalToTreat!) && animalToTreat!.paralyzed === 0) {
    const newHand = paralyzeCardInAHand(hands[enemyHandKey], 2, animalToTreat!)
    return setHandInState(state, enemyHandKey, newHand)
  } else return state
}

const withaniaFn = (state: IGameState, enemyHandKey: HandKey): IGameState => {
  const { animalToTreat, hands } = state
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  if (hands[allyHandKey].includes(animalToTreat!)) {
    const newHand = setCardAttackInAHand(hands[allyHandKey], 1, animalToTreat!)
    return setHandInState(state, allyHandKey, newHand)
  } else return state
}
export default function getPlantFn(name: string) {
  switch (name) {
    case "Aloe":
      return aloeFn
    case "Cactus":
      return cactusFn
    case "Coffee":
      return coffeeFn
    case "Horsetail":
      return horsetailFn
    case "Jewelweed":
      return jewelweedFn
    case "Marigold":
      return marigoldFn
    case "Peyote":
      return peyoteFn
    case "Ricinum":
      return ricinumFn
    case "Withania":
      return withaniaFn
    default:
      return (state: IGameState, enemyHandKey: HandKey) => state
  }
}
