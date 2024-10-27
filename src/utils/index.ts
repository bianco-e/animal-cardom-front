import { AuthUser, DBAnimal, IAnimal } from "../interfaces"

export const cardSpeciesToLowerCase = (species: string): string => {
  const splittedSpecies = species.split(" ")
  if (splittedSpecies.length > 1) {
    return splittedSpecies.join("-").toLowerCase()
  }
  return species.toLowerCase()
}

export const capitalize = (string: string): string =>
  `${string[0].toUpperCase()}${string.substring(1).toLowerCase()}`

export const getCurrentSection = (path: string): string =>
  ["/profile", "/campaign", "/collection", "/menu"].includes(path)
    ? capitalize(path.substring(1))
    : ""

export const getNewUserTemplate = (user: AuthUser) => {
  const { sub, picture, email, given_name, family_name, locale } = user
  return {
    ...(sub ? { auth_id: sub } : {}),
    ...(picture ? { picture } : {}),
    ...(email ? { email } : {}),
    ...(locale ? { locale } : {}),
    ...(given_name ? { first_name: given_name } : {}),
    ...(family_name ? { last_name: family_name } : {}),
  }
}

export const getUtm = (search?: string) => {
  if (!search) return
  const searchParams = new URLSearchParams(search)
  if (!searchParams.has("utm_source")) return
  return `utm_source=${searchParams.get("utm_source")}&utm_medium=${searchParams.get(
    "utm_medium"
  )}`
}

export const getRandomChance = (percent: number) => Math.random() < percent / 100

export const getLiveCards = (hand: IAnimal[]): IAnimal[] =>
  hand.filter(card => card.life.current > 0)

export const getRandomFromArr = (arr: any[]) => {
  const randomIdx = Math.floor(Math.random() * arr.length)
  return arr[randomIdx]
}

export const parseAnimalsFromDB = (dbAnimals: DBAnimal[]): IAnimal[] => {
  return dbAnimals.map(dbAnimal => ({
    id: dbAnimal.id,
    attack: {
      initial: dbAnimal.attack,
      current: dbAnimal.attack,
    },
    bleeding: dbAnimal.bleeding,
    life: {
      initial: dbAnimal.life,
      current: dbAnimal.life,
    },
    missing: {
      chance: dbAnimal.missing_chance,
      exceptions: [],
    },
    name: dbAnimal.name,
    paralyzed: 0,
    poisoned: {
      damage: 0,
      rounds: 0
    },
    price: dbAnimal.price,
    sell_price: Math.floor(dbAnimal.price / 2),
    skill: {
      name: dbAnimal.skill_name,
      description: dbAnimal.skill_description,
      types: [dbAnimal.skill_type_id.toString()],
      use_type_id: dbAnimal.skill_use_type_id
    },
    species: {
      id: dbAnimal.species_id,
      icon: dbAnimal.species_icon,
      name: dbAnimal.species_name,
      description: dbAnimal.species_description,
    },
    targeteable: dbAnimal.targeteable,
    habitat: dbAnimal.habitat_name
  }))
}