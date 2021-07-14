import { IHandsState } from "../context/HandsContext";
import { HandKey, IAnimal, Poisoned } from "../interfaces";

const updateCardBleeding = (
  arr: IAnimal[],
  animalToTreat: IAnimal,
  isBleeding: boolean
): IAnimal[] => {
  return arr.map((card) => {
    if (card === animalToTreat) {
      return {
        ...card,
        bleeding: isBleeding,
      };
    } else return card;
  });
};

const poisonCardInAHand = (
  arr: IAnimal[],
  poisoned: Poisoned,
  animalToTreat: IAnimal
): IAnimal[] => {
  return arr.map((card) => {
    if (card === animalToTreat) {
      return {
        ...card,
        poisoned,
      };
    } else return card;
  });
};

const healCardInAHand = (
  arr: IAnimal[],
  amountToHeal: number,
  animalToTreat: IAnimal
): IAnimal[] => {
  return arr.map((card) => {
    if (card === animalToTreat && typeof card.life.current === "number") {
      return {
        ...card,
        life: {
          ...card.life,
          current:
            card.life.current + amountToHeal > card.life.initial
              ? card.life.initial
              : card.life.current + amountToHeal,
        },
      };
    } else return card;
  });
};

const paralyzeCardInAHand = (
  arr: IAnimal[],
  roundsNumber: number,
  animalToTreat: IAnimal
): IAnimal[] => {
  return arr.map((card) => {
    if (card === animalToTreat) {
      return {
        ...card,
        paralyzed: roundsNumber,
      };
    } else return card;
  });
};

const setCardAttackInAHand = (
  arr: IAnimal[],
  attackAmount: number,
  animalToTreat: IAnimal
): IAnimal[] => {
  return arr.map((card) => {
    if (card === animalToTreat) {
      return {
        ...card,
        attack: {
          ...card.attack,
          current: card.attack.current + attackAmount,
        },
      };
    } else return card;
  });
};

const setHandInState = (
  state: IHandsState,
  hand: HandKey,
  newHand: IAnimal[]
): IHandsState => {
  const { hands, usedPlants, selectedPlant, animalToTreat } = state;
  const newUsedPlants = selectedPlant
    ? [...usedPlants, selectedPlant]
    : usedPlants;
  return {
    ...state,
    hands: {
      ...hands,
      [hand]: newHand,
    },
    selectedPlant: undefined,
    animalToTreat: undefined,
    treatedAnimal: animalToTreat,
    usedPlants: newUsedPlants,
  };
};

const ricinumFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { animalToTreat, hands } = state;
  const poison = { damage: 1, rounds: 3 };
  if (hands[hand].includes(animalToTreat!)) {
    const newHand = poisonCardInAHand(hands[hand], poison, animalToTreat!);
    return setHandInState(state, hand, newHand);
  } else return state;
};

const aloeFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { animalToTreat, hands } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (
    hands[otherHand].includes(animalToTreat!) &&
    animalToTreat!.life.current < animalToTreat!.life.initial
  ) {
    const newHand = healCardInAHand(hands[otherHand], 2, animalToTreat!);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const peyoteFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { animalToTreat, hands } = state;
  if (hands[hand].includes(animalToTreat!) && animalToTreat!.paralyzed === 0) {
    const newHand = paralyzeCardInAHand(hands[hand], 2, animalToTreat!);
    return setHandInState(state, hand, newHand);
  } else return state;
};

const jewelweedFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { animalToTreat, hands } = state;
  const poison = { damage: 0, rounds: 0 };
  const otherHand = hand === "pc" ? "user" : "pc";
  if (
    hands[otherHand].includes(animalToTreat!) &&
    animalToTreat!.poisoned.rounds > 0
  ) {
    const newHand = poisonCardInAHand(hands[otherHand], poison, animalToTreat!);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const coffeeFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { animalToTreat, hands } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (
    hands[otherHand].includes(animalToTreat!) &&
    animalToTreat!.paralyzed > 0
  ) {
    const newHand = paralyzeCardInAHand(hands[otherHand], 0, animalToTreat!);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const withaniaFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { animalToTreat, hands } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (hands[otherHand].includes(animalToTreat!)) {
    const newHand = setCardAttackInAHand(hands[otherHand], 1, animalToTreat!);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const cactusFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { animalToTreat, hands } = state;
  if (hands[hand].includes(animalToTreat!)) {
    const newHand = updateCardBleeding(hands[hand], animalToTreat!, true);
    return setHandInState(state, hand, newHand);
  } else return state;
};

const horsetailFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { animalToTreat, hands } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (hands[otherHand].includes(animalToTreat!) && animalToTreat!.bleeding) {
    const newHand = updateCardBleeding(hands[otherHand], animalToTreat!, false);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

export default function getPlantFn(name: string) {
  switch (name) {
    case "Ricinum":
      return ricinumFn;
    case "Aloe":
      return aloeFn;
    case "Peyote":
      return peyoteFn;
    case "Jewelweed":
      return jewelweedFn;
    case "Coffee":
      return coffeeFn;
    case "Withania":
      return withaniaFn;
    case "Cactus":
      return cactusFn;
    case "Horsetail":
      return horsetailFn;
    default:
      return (state: IHandsState, hand: HandKey) => state;
  }
}
