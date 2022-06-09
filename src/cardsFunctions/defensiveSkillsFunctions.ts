import { HandKey, IAnimal, IHands } from "../interfaces";
import { getRandomChance } from "../utils";

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
};

const applyDmg = (animal: IAnimal, statsDiff: number): IAnimal => ({
  ...animal,
  life: {
    ...animal.life,
    current: statsDiff < 1 ? "DEAD" : statsDiff,
  },
});

const ballBugFn = (
  hands: IHands,
  attacker: IAnimal,
  defender: IAnimal,
  enemyHandKey: HandKey,
  statsDiff: number
): IHands => {
  return {
    ...hands,
    [enemyHandKey]: hands[enemyHandKey].map((animal) => {
      if (animal.name === defender.name) {
        if (animal.paralyzed === 0) {
          return {
            ...animal,
            life: {
              ...animal.life,
              current:
                (getRandomChance(50) ? statsDiff + 1 : statsDiff) < 1
                  ? "DEAD"
                  : statsDiff,
            },
          };
        } else return applyDmg(animal, statsDiff);
      } else return animal;
    }),
  };
};

const basiliskLizardFn = (
  hands: IHands,
  attacker: IAnimal,
  defender: IAnimal,
  enemyHandKey: HandKey,
  statsDiff: number
): IHands => {
  return {
    ...hands,
    [enemyHandKey]: hands[enemyHandKey].map((animal) => {
      if (animal.name === defender.name) {
        if (animal.paralyzed === 0 && getRandomChance(30)) {
          return {
            ...animal,
            life: {
              ...animal.life,
              current: statsDiff < 1 ? "DEAD" : statsDiff,
            },
          };
        } else return applyDmg(animal, statsDiff);
      } else return animal;
    }),
  };
};

const caterpillarFn = (
  hands: IHands,
  attacker: IAnimal,
  defender: IAnimal,
  enemyHandKey: HandKey,
  statsDiff: number
): IHands => {
  return {
    ...hands,
    [enemyHandKey]: hands[enemyHandKey].map((animal) => {
      if (animal.name === defender.name) {
        if (animal.paralyzed === 0 && statsDiff < 1) {
          return BUTTERFLY_ANIMAL;
        } else return applyDmg(animal, statsDiff);
      } else return animal;
    }),
  };
};

const combStarFn = (
  hands: IHands,
  attacker: IAnimal,
  defender: IAnimal,
  enemyHandKey: HandKey,
  statsDiff: number
): IHands => {
  const ownHandKey = enemyHandKey === "pc" ? "user" : "pc";
  return {
    [ownHandKey]: hands[ownHandKey].map((animal) => {
      if (animal.name === attacker.name && defender.paralyzed === 0) {
        return {
          ...animal,
          poisoned: {
            damage: 1,
            rounds: 5,
          },
        };
      } else return animal;
    }),
    [enemyHandKey]: hands[enemyHandKey].map((animal) => {
      if (animal.name === defender.name) {
        return applyDmg(animal, statsDiff);
      } else return animal;
    }),
  };
};

const grasshoperFn = (
  hands: IHands,
  attacker: IAnimal,
  defender: IAnimal,
  enemyHandKey: HandKey,
  statsDiff: number
): IHands => {
  return {
    ...hands,
    [enemyHandKey]: hands[enemyHandKey].map((animal) => {
      if (animal.name === defender.name) {
        if (animal.paralyzed === 0 && getRandomChance(10)) {
          return {
            ...animal,
            life: {
              ...animal.life,
              current: statsDiff < 1 ? "DEAD" : statsDiff,
            },
          };
        } else return applyDmg(animal, statsDiff);
      } else return animal;
    }),
  };
};

const hedgehogFn = (
  hands: IHands,
  attacker: IAnimal,
  defender: IAnimal,
  enemyHandKey: HandKey,
  statsDiff: number
): IHands => {
  const ownHandKey = enemyHandKey === "pc" ? "user" : "pc";
  return {
    [ownHandKey]: hands[ownHandKey].map((animal) => {
      if (animal.name === attacker.name && defender.paralyzed === 0) {
        if (typeof animal.life.current === "number") {
          const diff = animal.life.current - defender.attack.current;
          return {
            ...animal,
            life: {
              ...animal.life,
              current: diff < 1 ? "DEAD" : diff,
            },
          };
        } else return animal;
      } else return animal;
    }),
    [enemyHandKey]: hands[enemyHandKey].map((animal) => {
      if (animal.name === defender.name) {
        return applyDmg(animal, statsDiff);
      } else return animal;
    }),
  };
};

const lizardFn = (
  hands: IHands,
  attacker: IAnimal,
  defender: IAnimal,
  enemyHandKey: HandKey,
  statsDiff: number
): IHands => {
  return {
    ...hands,
    [enemyHandKey]: hands[enemyHandKey].map((animal) => {
      if (animal.name === defender.name) {
        if (animal.paralyzed === 0) {
          return {
            ...animal,
            life: {
              ...animal.life,
              current: statsDiff + 1 < 1 ? "DEAD" : statsDiff + 1,
            },
          };
        } else return applyDmg(animal, statsDiff);
      } else return animal;
    }),
  };
};

const ostrichFn = (
  hands: IHands,
  attacker: IAnimal,
  defender: IAnimal,
  enemyHandKey: HandKey,
  statsDiff: number
): IHands => {
  return {
    ...hands,
    [enemyHandKey]: hands[enemyHandKey].map((animal) => {
      if (animal.name === defender.name) {
        if (animal.paralyzed === 0) {
          return {
            ...animal,
            life: {
              ...animal.life,
              current: statsDiff + 1 < 1 ? "DEAD" : statsDiff + 1,
            },
          };
        } else return applyDmg(animal, statsDiff);
      } else return animal;
    }),
  };
};

const peacockFn = (
  hands: IHands,
  attacker: IAnimal,
  defender: IAnimal,
  enemyHandKey: HandKey,
  statsDiff: number
): IHands => {
  return {
    ...hands,
    [enemyHandKey]: hands[enemyHandKey].map((animal) => {
      if (animal.name === defender.name) {
        if (animal.paralyzed === 0 && getRandomChance(30)) {
          return {
            ...animal,
            life: {
              ...animal.life,
              current: statsDiff + 2 < 1 ? "DEAD" : statsDiff + 2,
            },
          };
        } else return applyDmg(animal, statsDiff);
      } else return animal;
    }),
  };
};

export default function getSkillFn(name: string) {
  switch (name) {
    case "Ball Bug":
      return ballBugFn;
    case "Basilisk Lizard":
      return basiliskLizardFn;
    case "Comb Star":
      return combStarFn;
    case "Grasshoper":
      return grasshoperFn;
    case "Hedgehog":
      return hedgehogFn;
    case "Lizard":
      return lizardFn;
    case "Ostrich":
      return ostrichFn;
    case "Peacock":
      return peacockFn;
    case "Caterpillar":
      return caterpillarFn;
    default:
      return (
        hands: IHands,
        attacker: IAnimal,
        defender: IAnimal,
        enemyHandKey: HandKey,
        statsDiff: number
      ) => {
        return {
          ...hands,
          [enemyHandKey]: hands[enemyHandKey].map((animal) => {
            if (animal.name === defender.name) {
              return applyDmg(animal, statsDiff);
            } else return animal;
          }),
        };
      };
  }
}
