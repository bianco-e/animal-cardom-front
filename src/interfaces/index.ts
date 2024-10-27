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
  habitat: IHabitat
  underAttack?: string
  dodgedAttack?: string
  pcTurn: boolean
  triggerPcAttack: boolean
  pcPlays: string[]
}

export type HandKey = "pc" | "user"

export interface Stat {
  current: number
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
  use_type_id: number
}

export interface Species {
  id: number
  name: string
  description: string
  icon: string
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
  use_type_id: number
}

export interface IAnimal {
  id: number
  attack: Stat
  bleeding: boolean
  life: Stat
  missing: Missing
  name: string
  paralyzed: number
  poisoned: Poisoned
  price: number
  sell_price: number
  skill: Skill
  species: Species
  targeteable: boolean
  habitat: string
}

export interface IHabitat {
  id: number
  name: string
  description: string
  color: string
  campaign_xp: number[]
}

export interface Game {
  created_at?: Date
  earned_animal?: string
  earned_xp?: number
  habitat: string
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

export interface DBAnimal {
  id: number
  name: string
  scientific_name: string
  description: string
  species_id: number
  habitat_id: number
  attack: number
  life: number
  price: number
  created_at: string
  updated_at: string
  skill_name: string
  skill_description: string
  skill_type_id: number
  skill_use_type_id: number
  targeteable: boolean
  bleeding: boolean
  missing_chance: number
  species_description: string
  species_name: string
  species_icon: string
  habitat_name: string
}

export interface SkillType {
  id: number
  name: string
  description: number
}

export interface FiltersData {
  loading: boolean
  species: Species[]
  habitats: IHabitat[]
  skillTypes: SkillType[]
}
