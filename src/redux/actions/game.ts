import getPlantFn from "../../cardsFunctions/plantsFunctions"
import { getExtraDamage } from "../../cardsFunctions/offensiveSkillsFunctions"
import {
  getLiveCardsInAHand,
  getRandomChance,
  getRandomFromArr,
  parseAnimalsFromDB,
} from "../../utils"
import {
  HandKey,
  Animal,
  IGameState,
  IHands,
  IPlant,
  IPlants,
  IRootState,
  Habitat,
} from "../../interfaces"
import { GAME_ACTIONS } from "../reducers/game"
import { AppDispatch } from ".."
import { newCampaignGame, newRandomGame } from "../../queries/games"

export const startGuestGame = () => {
  return async (dispatch: AppDispatch) => {
    const gameRes = await newRandomGame()
    if (gameRes.error) return dispatch(GAME_ACTIONS.SET_GAME_ERROR(true))
    dispatch(
      //@ts-ignore
      setGame(
        {
          pc: parseAnimalsFromDB(gameRes.pc.animals),
          user: parseAnimalsFromDB(gameRes.user.animals),
        },
        { pc: gameRes.pc.plants, user: gameRes.user.plants },
        gameRes.habitat
      )
    )
  }
}

export const startCampaignGame = (setUserName: (str: string) => void, level: number) => {
  return async (dispatch: AppDispatch, getState: () => IRootState) => {
    const { auth } = getState()
    const { first_name, id } = auth.user
    setUserName(first_name)
    //if (campaign.level < level) dispatch(GAME_ACTIONS.SET_GAME_ERROR(true))
    const gameRes = await newCampaignGame(level, id)

    if (!gameRes || gameRes.error) return dispatch(GAME_ACTIONS.SET_GAME_ERROR(true))
    dispatch(
      //@ts-ignore
      setGame(
        {
          pc: parseAnimalsFromDB(gameRes.pc.animals),
          user: parseAnimalsFromDB(gameRes.user.animals),
        },
        { pc: gameRes.pc.plants, user: gameRes.user.plants },
        gameRes.habitat
      )
    )
  }
}

const getHighestAttackCard = (hand: Animal[]) =>
  hand.reduce((acc, value) => (value.attack.current > acc.attack.current ? value : acc))

const attackAndApplySkill = (game: IGameState, enemyHandKey: HandKey): IGameState => {
  const { defender, attacker, hands } = game
  if (!defender || !attacker || !hands || defender.life.current === 0) return game

  const stateAfterAttack = applyAttackDamage(game, enemyHandKey)

  const updatedGame = passRoundApplyEffectsAndPassives(
    {
      ...stateAfterAttack,
      hands: applyPoisonDamage(stateAfterAttack.hands, enemyHandKey),
    },
    enemyHandKey
  )

  return attacker.paralyzed > 0 || !attacker.skill.offensiveFn
    ? updatedGame
    : attacker.skill.offensiveFn(updatedGame, enemyHandKey)
}

const applyPlantToCard = (
  plant: IPlant,
  card: Animal,
  game: IGameState,
  enemyHandKey: HandKey
): IGameState => {
  const plantMessage =
    enemyHandKey === "user"
      ? ` and ${plant.name} was applied on ${card.name.toUpperCase()}`
      : ""
  if (!card.targeteable) return game
  const newTurns = game.pcPlays.map((t, i) => {
    if (i !== game.pcPlays.length - 1) return t
    return t + plantMessage
  })
  return getPlantFn(plant.name)(
    {
      ...game,
      selectedPlant: plant,
      animalToTreat: card,
      pcPlays: newTurns,
    },
    enemyHandKey
  )
}

const checkWhatPlantToUse = (game: IGameState): IGameState => {
  const { plants, usedPlants, hands } = game
  const pcLiveCards = getLiveCardsInAHand(hands.pc)
  const userLiveCards = getLiveCardsInAHand(hands.user)

  const damagedCard = pcLiveCards.find(
    (card: Animal) => card.life.current <= card.life.initial - 2
  )
  const poisonedCard = pcLiveCards.find((card: Animal) => card.poisoned.rounds > 0)
  const paralyzedCard = pcLiveCards.find((card: Animal) => card.paralyzed > 0)
  const blindCard = pcLiveCards.find((card: Animal) => card.missing.chance > 0)
  const bleedingCard = pcLiveCards.find((card: Animal) => card.bleeding)

  const findAPlant = (plantName: string) =>
    plants.pc.find(
      (plant: IPlant) => plant.name === plantName && !usedPlants.includes(plant)
    )

  const aloePlant = findAPlant("Aloe")
  const jewelweedPlant = findAPlant("Jewelweed")
  const coffeePlant = findAPlant("Coffee")
  const withaniaPlant = findAPlant("Withania")
  const horsetailPlant = findAPlant("Horsetail")
  const peyotePlant = findAPlant("Peyote")
  const ricinumPlant = findAPlant("Ricinum")
  const marigoldPlant = findAPlant("Marigold")
  const randomBoolean = getRandomChance(70)
  const randomAlly = getRandomFromArr(pcLiveCards)
  const randomEnemy = getRandomFromArr(userLiveCards)

  if (damagedCard && aloePlant)
    return applyPlantToCard(aloePlant, damagedCard, game, "user")
  if (poisonedCard && jewelweedPlant)
    return applyPlantToCard(jewelweedPlant, poisonedCard, game, "user")
  if (paralyzedCard && coffeePlant)
    return applyPlantToCard(coffeePlant, paralyzedCard, game, "user")
  if (bleedingCard && horsetailPlant)
    return applyPlantToCard(horsetailPlant, bleedingCard, game, "user")
  if (blindCard && marigoldPlant)
    return applyPlantToCard(marigoldPlant, blindCard, game, "user")
  if (randomBoolean && withaniaPlant && randomAlly)
    return applyPlantToCard(withaniaPlant, randomAlly, game, "user")
  if (randomBoolean && peyotePlant && randomEnemy)
    return applyPlantToCard(peyotePlant, randomEnemy, game, "user")
  if (randomBoolean && ricinumPlant && randomEnemy)
    return applyPlantToCard(ricinumPlant, randomEnemy, game, "user")
  return game
}

const computerDamage = (game: IGameState) => {
  const { defender, attacker, pcTurn, hands } = game
  const updatedGame = attackAndApplySkill(game, "user")
  const pcAnswer = `${attacker!.name.toUpperCase()} attacked ${defender!.name.toUpperCase()}`

  if (!getLiveCardsInAHand(hands.user).length) return game
  return checkWhatPlantToUse({
    ...updatedGame,
    attacker: undefined,
    defender: undefined,
    pcTurn: !pcTurn,
    triggerPcAttack: false,
    pcPlays: game.pcPlays.concat(pcAnswer),
  })
}

export const computerPlay = () => {
  return (dispatch: AppDispatch, getState: () => IRootState) => {
    const { game } = getState()
    const { hands } = game
    const pcLiveCards = getLiveCardsInAHand(hands.pc)
    const userLiveCards = getLiveCardsInAHand(hands.user).filter(
      (card: Animal) => card.targeteable
    )
    if (!pcLiveCards.length || !userLiveCards.length) return
    const pcAttacker = getRandomChance(90)
      ? getHighestAttackCard(pcLiveCards)
      : getRandomFromArr(pcLiveCards)
    const userDefender = getRandomChance(85)
      ? getHighestAttackCard(userLiveCards)
      : getRandomFromArr(userLiveCards)

    const updatedGame = computerDamage({
      ...game,
      attacker: pcAttacker,
      defender: userDefender,
    })

    dispatch(GAME_ACTIONS.SET_STATE(updatedGame))
  }
}

const damageEnemy = (game: IGameState) => {
  const updatedGame = attackAndApplySkill(game, "pc")
  return getLiveCardsInAHand(updatedGame!.hands.pc).length === 0
    ? {
        ...updatedGame,
        attacker: undefined,
        defender: undefined,
      }
    : {
        ...updatedGame,
        attacker: undefined,
        defender: undefined,
        pcTurn: !game.pcTurn,
      }
}

export const selectCard = (name: string) => {
  return (dispatch: AppDispatch, getState: () => IRootState) => {
    const { game } = getState()
    const { hands, attacker, selectedPlant } = game
    const pcLiveCards = getLiveCardsInAHand(hands.pc)
    const userLiveCards = getLiveCardsInAHand(hands.user)
    const animal = hands.pc.concat(hands.user).find(card => card.name === name)

    if (selectedPlant && !attacker) {
      const updatedGame = applyPlantToCard(selectedPlant, animal!, game, "pc")
      return dispatch(GAME_ACTIONS.SET_STATE(updatedGame))
    }
    if (!attacker) {
      if (!userLiveCards.includes(animal!)) return dispatch(GAME_ACTIONS.SET_STATE(game))
      const updatedGame = { ...game, attacker: animal }
      return dispatch(GAME_ACTIONS.SET_STATE(updatedGame))
    }
    if (pcLiveCards.includes(animal!) && animal!.targeteable) {
      const updatedGame = damageEnemy({ ...game, defender: animal })
      return dispatch(GAME_ACTIONS.SET_STATE(updatedGame))
    }
    if (attacker.name === animal!.name) {
      const updatedGame = { ...game, attacker: undefined }
      return dispatch(GAME_ACTIONS.SET_STATE(updatedGame))
    }
    if (userLiveCards.includes(animal!)) {
      const updatedGame = { ...game, attacker: animal }
      return dispatch(GAME_ACTIONS.SET_STATE(updatedGame))
    }
    return dispatch(GAME_ACTIONS.SET_STATE(game))
  }
}

export const selectPlant = (plant: IPlant) => {
  return (dispatch: AppDispatch, getState: () => IRootState) => {
    const { game } = getState()
    const { plants, selectedPlant, attacker } = game
    if (selectedPlant && selectedPlant.name === plant.name) {
      const updatedGame = { ...game, selectedPlant: undefined }
      return dispatch(GAME_ACTIONS.SET_STATE(updatedGame))
    }
    if (plants.user.includes(plant)) {
      const updatedGame = {
        ...game,
        selectedPlant: plant,
        attacker: attacker ? undefined : attacker,
      }
      return dispatch(GAME_ACTIONS.SET_STATE(updatedGame))
    }
    return dispatch(GAME_ACTIONS.SET_STATE(game))
  }
}

const applyPassiveSkills = (
  animalsWithPassiveSkill: Animal[],
  state: IGameState,
  enemyHandKey: HandKey
): IGameState => {
  if (!animalsWithPassiveSkill.length) return state
  const [animalWithpassiveSkill] = animalsWithPassiveSkill
  if (!animalWithpassiveSkill.skill.passiveFn) return state
  const updatedState = animalWithpassiveSkill.skill.passiveFn(state, enemyHandKey)
  return applyPassiveSkills(
    animalsWithPassiveSkill.filter(animal => animal.id !== animalWithpassiveSkill.id),
    updatedState,
    enemyHandKey
  )
}

const passRoundApplyEffectsAndPassives = (state: IGameState, enemyHandKey: HandKey) => {
  const { hands } = state
  const allyHandKey = enemyHandKey === "pc" ? "user" : "pc"
  const updatedHands = {
    [allyHandKey]: hands[allyHandKey].map(animal => {
      return {
        ...animal,
        is_sleeping: false, // wakes all allies before passing turn
      }
    }),
    [enemyHandKey]: hands[enemyHandKey].map(animal => {
      const updatedCurrentLife =
        !animal.bleeding || animal.life.current === 0
          ? animal.life.current
          : animal.life.current - 1 < 1
          ? 0
          : animal.life.current - 1
      return {
        ...animal,
        life: {
          ...animal.life,
          current: updatedCurrentLife,
        },
        paralyzed: animal.paralyzed > 0 ? animal.paralyzed - 1 : animal.paralyzed,
        poisoned: {
          ...animal.poisoned,
          rounds:
            animal.poisoned.rounds > 0
              ? animal.poisoned.rounds - 1
              : animal.poisoned.rounds,
        },
      }
    }),
  }
  const updatedState = {
    ...state,
    hands: updatedHands,
  }
  const animalsWithPassiveSkill = getLiveCardsInAHand(
    updatedState.hands[enemyHandKey]
  ).filter(animal => Boolean(animal.skill.passiveFn) && animal.paralyzed === 0)

  if (!animalsWithPassiveSkill.length) return updatedState
  return applyPassiveSkills(animalsWithPassiveSkill, updatedState, enemyHandKey)
}

const applyAttackDamage = (game: IGameState, enemyHandKey: HandKey): IGameState => {
  const attacker = game.attacker!
  const defender = game.defender!
  if (defender.life.current === 0)
    return { ...game, underAttack: undefined, dodgedAttack: undefined }

  if (
    attacker.missing.chance > 0 &&
    !attacker.missing.exceptions.includes(defender.species.icon) &&
    getRandomChance(attacker.missing.chance)
  )
    return { ...game, underAttack: undefined, dodgedAttack: defender.name }

  const statsDiff =
    defender.life.current - (attacker.attack.current + getExtraDamage(attacker, defender))
  return defender.skill.defensiveFn
    ? defender.skill.defensiveFn(game, enemyHandKey, statsDiff)
    : game
}

const applyPoisonDamage = (hands: IHands, enemyHandKey: HandKey): IHands => {
  const applyPoisonInAHand = (arr: Animal[]) =>
    arr.map(card => {
      if (card.poisoned.rounds > 0 && card.life.current > 0) {
        return {
          ...card,
          life: {
            ...card.life,
            current:
              card.life.current - card.poisoned.damage < 1
                ? 0
                : card.life.current - card.poisoned.damage,
          },
        }
      } else return card
    })
  return { ...hands, [enemyHandKey]: applyPoisonInAHand(hands[enemyHandKey]) }
}

const setHabitatAndBuffAnimals = (game: IGameState, habitat: Habitat): IGameState => {
  const buffCards = (arr: Animal[]) => {
    return arr.map(card => {
      if (card.habitat === habitat.name) {
        return {
          ...card,
          attack: { ...card.attack, current: card.attack.current + 1 },
        }
      } else return card
    })
  }
  return {
    ...game,
    habitat: habitat,
    isLoading: false,
    gameError: false,
    hands: {
      pc: buffCards(game.hands.pc),
      user: buffCards(game.hands.user),
    },
  }
}

export const setGame = (hands: IHands, plants: IPlants, habitat: Habitat) => {
  return (dispatch: AppDispatch, getState: () => IRootState) => {
    const { game } = getState()
    const updatedGame = setHabitatAndBuffAnimals({ ...game, hands, plants }, habitat)
    dispatch(GAME_ACTIONS.SET_STATE(updatedGame))
  }
}
