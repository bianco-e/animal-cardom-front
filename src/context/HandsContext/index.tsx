import React, { useReducer } from "react";
import getPlantFn from "../../cardsFunctions/plantsFunctions";
import getOffensiveSkillFn, {
  getExtraDamageIfApplies,
} from "../../cardsFunctions/offensiveSkillsFunctions";
import getDefensiveSkillFn from "../../cardsFunctions/defensiveSkillsFunctions";
import {
  HandKey,
  IAnimal,
  IHands,
  IPlant,
  IPlants,
  ITerrain,
} from "../../interfaces";

import {
  COMPUTER_PLAY,
  COMPUTER_THINK,
  EMPTY_STATE,
  SELECT_CARD,
  SELECT_PLANT,
  SET_CARDS,
} from "./types";
import { getLiveCards, getRandomChance, getRandomFromArr } from "../../utils";
export interface IHandsAction {
  hands: IHands;
  plants: IPlants;
  name: string;
  plant: IPlant;
  terrain: ITerrain;
  type: string;
}
export type IHandsContext = (IHandsState | any)[];
export interface IHandsState {
  hands: IHands;
  plants: IPlants;
  animalToTreat?: IAnimal;
  treatedAnimal?: IAnimal;
  selectedPlant?: IPlant;
  usedPlants: IPlant[];
  attacker?: IAnimal;
  defender?: IAnimal;
  terrainName?: string;
  underAttack?: string;
  pcTurn: boolean;
  triggerPcAttack: boolean;
  pcPlay: string;
}

const newGame = (): IHandsState => ({
  hands: { user: [], pc: [] },
  plants: { user: [], pc: [] },
  animalToTreat: undefined,
  treatedAnimal: undefined,
  selectedPlant: undefined,
  usedPlants: [],
  attacker: undefined,
  defender: undefined,
  underAttack: undefined,
  terrainName: undefined,
  pcTurn: false,
  triggerPcAttack: false,
  pcPlay: "",
});

const initialState = newGame();

const Context = React.createContext<IHandsContext>([initialState]);

const getHighestAttackCard = (hand: IAnimal[]) =>
  hand.reduce((acc, value) => {
    return value.attack.current > acc.attack.current ? value : acc;
  });

const attackAndApplySkill = (
  state: IHandsState,
  enemyHandKey: HandKey
): IHandsState => {
  const { defender, attacker, hands } = state;
  if (!defender || !attacker || !hands || defender.life.current === "DEAD")
    return state;

  const stateAfterAttack = applyAttackDamage(state, enemyHandKey);

  const newState = {
    ...stateAfterAttack,
    hands: passRoundAndApplyEffects(
      applyPoisonDamage(stateAfterAttack.hands, enemyHandKey),
      enemyHandKey
    ),
  };
  return attacker.paralyzed > 0
    ? newState
    : getOffensiveSkillFn(attacker.name)(newState, enemyHandKey);
};

const applyPlantToCard = (
  plant: IPlant,
  card: IAnimal,
  state: IHandsState,
  enemyHandKey: HandKey
): IHandsState => {
  const plantMessage =
    enemyHandKey === "user" ? ` and used ${plant.name} on ${card.name}` : "";
  if (card.targeteable) {
    return getPlantFn(plant.name)(
      {
        ...state,
        selectedPlant: plant,
        animalToTreat: card,
        pcPlay: state.pcPlay + plantMessage,
      },
      enemyHandKey
    );
  } else return state;
};

const checkWhatPlantToUse = (state: IHandsState): IHandsState => {
  const { plants, usedPlants, hands } = state;
  const pcLiveCards = getLiveCards(hands.pc);
  const userLiveCards = getLiveCards(hands.user);

  const damagedCard = pcLiveCards.find(
    (card: IAnimal) => card.life.current <= card.life.initial - 2
  );
  const poisonedCard = pcLiveCards.find(
    (card: IAnimal) => card.poisoned.rounds > 0
  );
  const paralyzedCard = pcLiveCards.find((card: IAnimal) => card.paralyzed > 0);
  const blindCard = pcLiveCards.find((card: IAnimal) => card.missing_chance);

  const findAPlant = (plantName: string) =>
    plants.pc.find(
      (plant: IPlant) => plant.name === plantName && !usedPlants.includes(plant)
    );

  const aloePlant = findAPlant("Aloe");
  const jewelweedPlant = findAPlant("Jewelweed");
  const coffeePlant = findAPlant("Coffee");
  const withaniaPlant = findAPlant("Withania");
  const peyotePlant = findAPlant("Peyote");
  const ricinumPlant = findAPlant("Ricinum");
  const marigoldPlant = findAPlant("Marigold");
  const randomBoolean = getRandomChance(70);
  const randomAlly = getRandomFromArr(pcLiveCards);
  const randomEnemy = getRandomFromArr(userLiveCards);

  if (damagedCard && aloePlant) {
    return applyPlantToCard(aloePlant, damagedCard, state, "user");
  } else if (poisonedCard && jewelweedPlant) {
    return applyPlantToCard(jewelweedPlant, poisonedCard, state, "user");
  } else if (paralyzedCard && coffeePlant) {
    return applyPlantToCard(coffeePlant, paralyzedCard, state, "user");
  } else if (blindCard && marigoldPlant) {
    return applyPlantToCard(marigoldPlant, blindCard, state, "user");
  } else if (randomBoolean && withaniaPlant && randomAlly) {
    return applyPlantToCard(withaniaPlant, randomAlly, state, "user");
  } else if (randomBoolean && peyotePlant && randomEnemy) {
    return applyPlantToCard(peyotePlant, randomEnemy, state, "user");
  } else if (randomBoolean && ricinumPlant && randomEnemy) {
    return applyPlantToCard(ricinumPlant, randomEnemy, state, "user");
  } else return state;
};

const computerDamage = (state: IHandsState) => {
  const { defender, attacker, pcTurn, hands } = state;
  const pcAnswer = `${attacker!.name} attacked ${defender!.name}`;
  const newState = attackAndApplySkill(state, "user");
  if (!getLiveCards(hands.user).length) return state;
  return checkWhatPlantToUse({
    ...newState,
    attacker: undefined,
    defender: undefined,
    pcTurn: !pcTurn,
    triggerPcAttack: false,
    pcPlay: pcAnswer,
  });
};

const computerPlay = (state: IHandsState) => {
  const { hands } = state;
  const pcLiveCards = getLiveCards(hands.pc);
  const userLiveCards = getLiveCards(hands.user).filter(
    (card: IAnimal) => card.targeteable
  );
  const pcAttacker = getRandomChance(90)
    ? getHighestAttackCard(pcLiveCards)
    : getRandomFromArr(pcLiveCards);
  const userDefender = getRandomChance(85)
    ? getHighestAttackCard(userLiveCards)
    : getRandomFromArr(userLiveCards);
  return computerDamage({
    ...state,
    attacker: pcAttacker,
    defender: userDefender,
  });
};

const damageEnemy = (state: IHandsState) => {
  const newState = attackAndApplySkill(state, "pc");
  return getLiveCards(newState!.hands.pc).length === 0
    ? {
        ...newState,
        attacker: undefined,
        defender: undefined,
      }
    : {
        ...newState,
        attacker: undefined,
        defender: undefined,
        pcTurn: !state.pcTurn,
      };
};

const selectCard = (state: IHandsState, name: string) => {
  const { hands, attacker, selectedPlant } = state;
  const pcLiveCards = getLiveCards(hands.pc);
  const userLiveCards = getLiveCards(hands.user);
  const animal = hands.pc.concat(hands.user).find((card) => card.name === name);

  if (selectedPlant && !attacker) {
    return applyPlantToCard(selectedPlant, animal!, state, "pc");
  }
  if (attacker) {
    if (pcLiveCards.includes(animal!) && animal!.targeteable) {
      return damageEnemy({ ...state, defender: animal });
    } else if (attacker.name === animal!.name) {
      return {
        ...state,
        attacker: undefined,
      };
    } else if (userLiveCards.includes(animal!)) {
      return {
        ...state,
        attacker: animal,
      };
    } else return state;
  } else if (userLiveCards.includes(animal!)) {
    return {
      ...state,
      attacker: animal,
    };
  } else return state;
};

const selectPlant = (state: IHandsState, plant: IPlant) => {
  const { plants, selectedPlant, attacker } = state;
  if (selectedPlant && selectedPlant.name === plant.name) {
    return {
      ...state,
      selectedPlant: undefined,
    };
  } else if (plants.user.includes(plant)) {
    return {
      ...state,
      selectedPlant: plant,
      ...(attacker ? { attacker: undefined } : {}),
    };
  } else return state;
};

const passRoundAndApplyEffects = (hands: IHands, enemyHandKey: HandKey) => {
  const minusParalyzedRound = hands[enemyHandKey].map((card) => {
    if (card.paralyzed > 0) {
      return {
        ...card,
        paralyzed: card.paralyzed - 1,
      };
    } else return card;
  });
  const minusPoisonedRound = minusParalyzedRound.map((card) => {
    if (card.poisoned.rounds > 0) {
      return {
        ...card,
        poisoned: {
          ...card.poisoned,
          rounds: card.poisoned.rounds - 1,
        },
      };
    } else return card;
  });
  return {
    ...hands,
    [enemyHandKey]: minusPoisonedRound.map((card) => {
      if (card.bleeding && typeof card.life.current === "number") {
        return {
          ...card,
          life: {
            ...card.life,
            current: card.life.current - 1 < 1 ? "DEAD" : card.life.current - 1,
          },
        };
      } else return card;
    }),
  };
};

const getAttackStatsDiff = (
  attacker: IAnimal,
  defender: IAnimal
): number | undefined => {
  if (typeof defender.life.current !== "number") return undefined;
  if (attacker.missing_chance && getRandomChance(attacker.missing_chance))
    return undefined;
  return (
    defender.life.current -
    (attacker.attack.current + getExtraDamageIfApplies(attacker, defender))
  );
};

const applyAttackDamage = (
  state: IHandsState,
  enemyHandKey: HandKey
): IHandsState => {
  const statsDiff = getAttackStatsDiff(state.attacker!, state.defender!);
  return !statsDiff
    ? state
    : {
        ...state,
        underAttack: state.defender!.name,
        hands: getDefensiveSkillFn(state.defender!.name)(
          state.hands,
          state.attacker!,
          state.defender!,
          enemyHandKey,
          statsDiff
        ),
      };
};

const applyPoisonDamage = (hands: IHands, enemyHandKey: HandKey): IHands => {
  const applyPoisonInAHand = (arr: IAnimal[]) =>
    arr.map((card) => {
      if (card.poisoned.rounds > 0 && typeof card.life.current === "number") {
        return {
          ...card,
          life: {
            ...card.life,
            current:
              card.life.current - card.poisoned.damage < 1
                ? "DEAD"
                : card.life.current - card.poisoned.damage,
          },
        };
      } else return card;
    });
  return { ...hands, [enemyHandKey]: applyPoisonInAHand(hands[enemyHandKey]) };
};

const setTerrain = (state: IHandsState, terrain: ITerrain) => {
  const buffCards = (arr: IAnimal[]) => {
    return arr.map((card) => {
      if (card.species === terrain.speciesToBuff) {
        return {
          ...card,
          attack: { ...card.attack, current: card.attack.current + 1 },
        };
      } else return card;
    });
  };
  return {
    ...state,
    terrainName: terrain.name,
    hands: {
      pc: buffCards(state.hands.pc),
      user: buffCards(state.hands.user),
    },
  };
};

const setCards = (
  state: IHandsState,
  hands: IHands,
  plants: IPlants,
  terrain: ITerrain
) => {
  return setTerrain(
    {
      ...state,
      hands,
      plants,
    },
    terrain
  );
};

const reducer = (state: IHandsState, action: IHandsAction) => {
  switch (action.type) {
    case SET_CARDS:
      return setCards(state, action.hands, action.plants, action.terrain);
    case SELECT_CARD:
      return selectCard(state, action.name);
    case SELECT_PLANT:
      return selectPlant(state, action.plant);
    case COMPUTER_PLAY:
      return computerPlay(state);
    case EMPTY_STATE:
      return newGame();
    case COMPUTER_THINK:
      return {
        ...state,
        triggerPcAttack: true,
        pcPlay: "Thinking...",
      };
    default:
      return state;
  }
};

export interface IProvider {
  children: JSX.Element;
}

export const HandsContext = ({ children }: IProvider) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default Context;
