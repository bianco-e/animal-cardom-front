import { DBAnimal, Animal } from "../interfaces"
import getOffensiveSkillFn from "../cardsFunctions/offensiveSkillsFunctions"
import getDefensiveSkillFn from "../cardsFunctions/defensiveSkillsFunctions"
import getPassiveSkillFn from "../cardsFunctions/passiveSkillsFunctions"

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

export const getUtm = (search?: string) => {
  if (!search) return
  const searchParams = new URLSearchParams(search)
  if (!searchParams.has("utm_source")) return
  return `utm_source=${searchParams.get("utm_source")}&utm_medium=${searchParams.get(
    "utm_medium"
  )}`
}

export const getRandomChance = (percent: number) => Math.random() < percent / 100

export const getLiveCardsInAHand = (hand: Animal[]): Animal[] =>
  hand.filter(card => card.life.current > 0)

export const getRandomFromArr = (arr: any[]) => {
  const randomIdx = Math.floor(Math.random() * arr.length)
  return arr[randomIdx]
}

export const parseAnimalsFromDB = (dbAnimals: DBAnimal[]): Animal[] => {
  return dbAnimals.map(dbAnimal => ({
    id: dbAnimal.id,
    name: dbAnimal.name,
    scientific_name: dbAnimal.scientific_name,
    habitat: dbAnimal.habitat_name,
    is_sleeping: false,
    species: {
      id: dbAnimal.species_id,
      icon: dbAnimal.species_icon,
      name: dbAnimal.species_name,
      description: dbAnimal.species_description,
    },
    skill: {
      name: dbAnimal.skill_name,
      description: dbAnimal.skill_description,
      types: [dbAnimal.skill_type_id.toString()],
      use_type_id: dbAnimal.skill_use_type_id,
      offensiveFn: getOffensiveSkillFn(dbAnimal.name),
      defensiveFn: getDefensiveSkillFn(dbAnimal.name),
      passiveFn: getPassiveSkillFn(dbAnimal.name)
    },
    attack: {
      initial: dbAnimal.attack,
      current: dbAnimal.attack,
    },
    life: {
      initial: dbAnimal.life,
      current: dbAnimal.life,
    },
    bleeding: dbAnimal.bleeding,
    paralyzed: 0,
    targeteable: dbAnimal.targeteable,
    missing: {
      chance: dbAnimal.missing_chance,
      exceptions: [],
    },
    poisoned: {
      damage: 0,
      rounds: 0,
    },
    price: dbAnimal.price,
    sell_price: Math.floor(dbAnimal.price / 2),
  }))
}
