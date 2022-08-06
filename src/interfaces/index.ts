export interface IGameState {
  isLoading: boolean
  gameError: boolean
  hands: IHands
  plants: IPlants
  animalToTreat?: IAnimal
  treatedAnimal?: IAnimal
  selectedPlant?: IPlant
  usedPlants: IPlant[]
  attacker?: IAnimal
  defender?: IAnimal
  terrain: ITerrain
  underAttack?: string
  dodgedAttack?: string
  pcTurn: boolean
  triggerPcAttack: boolean
  pcPlay: string
}

export type HandKey = "pc" | "user"

export interface Stat<T> {
  current: T
  initial: number
}

export interface Missing {
  chance: number
  exceptions: string[]
}

export interface Poisoned {
  damage: number
  rounds: number
}

export interface Skill {
  name: string
  description: string
  types: string[]
  toDo: (state: any, hand: HandKey) => any
}

export interface IHands {
  [x: string]: IAnimal[]
}

export interface IPlants {
  pc: IPlant[]
  user: IPlant[]
}

export interface IPlant {
  name: string
  description: string
  image: string
  appliable_on: string
  toDo: (state: any, hand: HandKey) => any
}

export interface IAnimal {
  attack: Stat<number>
  bleeding: boolean
  life: Stat<number | string>
  missing: Missing
  name: string
  paralyzed: number
  poisoned: Poisoned
  price: number
  sell_price: number
  skill: Skill
  species: string
  targeteable: boolean
}

export interface ITerrain {
  speciesToBuff: string
  image: string
  name: string
  color: string
  campaign_xp: number[]
}

export interface Game {
  created_at?: Date
  earned_animal?: string
  earned_xp?: number
  terrain: string
  won: boolean
  used_animals: {
    user: { name: string; survived: boolean }[]
    pc: { name: string; survived: boolean }[]
  }
  used_plants: {
    user: { name: string; applied: boolean }[]
    pc: { name: string; applied: boolean }[]
  }
}

export interface UserTemplate {
  sub?: string
  auth_id?: string
  picture?: string
  email?: string
  given_name?: string
  first_name?: string
  family_name?: string
  last_name?: string
  locale?: string
}

export interface AuthUser {
  email: string
  sub: string
  given_name: string
  picture: string
  family_name: string
  locale?: string
}

export interface User {
  auth_id: string
  coins: number
  picture: string
  email: string
  first_name: string
  last_name: string
  locale: string
  preferences: {
    language: string
  }
  xp: number
  owned_cards: string[]
  hand: string[]
}

export interface Action {
  auth_id?: string
  user_agent?: string
  utm?: string
  guest_name?: string
  created_at?: string
  action: string
}

export interface GameParams {
  requiredXp: string
}

export interface IRootState {
  auth: {
    isLogged: boolean
    error: boolean
    isLoading: boolean
    token: string | null
    user: User
  }
  game: IGameState
}
