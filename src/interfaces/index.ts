export type HandKey = "pc" | "user";

export interface Stat<T> {
  current: T;
  initial: number;
}

export interface Poisoned {
  damage: number;
  rounds: number;
}

export interface Skill {
  name: string;
  description: string;
  types: string[];
  toDo: (state: any, hand: HandKey) => any;
}

export interface IHands {
  [x: string]: IAnimal[];
}

export interface IPlants {
  pc: IPlant[];
  user: IPlant[];
}

export interface IPlant {
  name: string;
  description: string;
  image: string;
  appliable_on: string;
  toDo: (state: any, hand: HandKey) => any;
}

export interface IAnimal {
  name: string;
  species: string;
  image: string;
  attack: Stat<number>;
  life: Stat<number | string>;
  skill: Skill;
  poisoned: Poisoned;
  paralyzed: number;
  targeteable: boolean;
  bleeding: boolean;
  price: number;
}

export interface ITerrain {
  speciesToBuff: string;
  image: string;
  name: string;
  color: string;
  getRequiredXp: (current: number) => number;
}

export interface Game {
  created_at?: Date;
  earned_animal?: string;
  terrain: string;
  xp_earned: number;
  won: boolean;
  usedAnimals: {
    user: { name: string; survived: boolean }[];
    pc: { name: string; survived: boolean }[];
  };
  usedPlants: {
    user: { name: string; applied: boolean }[];
    pc: { name: string; applied: boolean }[];
  };
}

export interface UserTemplate {
  sub?: string;
  auth_id?: string;
  picture?: string;
  email?: string;
  given_name?: string;
  first_name?: string;
  family_name?: string;
  last_name?: string;
  locale?: string;
}

export interface User {
  auth_id: string;
  picture: string;
  email: string;
  first_name: string;
  last_name: string;
  locale: string;
  preferences: {
    language: string;
  };
  xp: number;
  owned_cards: string[];
  hand: string[];
}

export interface Action {
  auth_id?: string;
  user_agent?: string;
  utm?: string;
  guest_name?: string;
  created_at?: string;
  action: string;
}
