import getPlantFn from "../../cardsFunctions/plantsFunctions"
import getOffensiveSkillFn, {
  getExtraDamage,
} from "../../cardsFunctions/offensiveSkillsFunctions"
import getDefensiveSkillFn from "../../cardsFunctions/defensiveSkillsFunctions"
import { getLiveCards, getRandomChance, getRandomFromArr } from "../../utils"
import {
  HandKey,
  IAnimal,
  IGameState,
  IHands,
  IPlant,
  IPlants,
  IRootState,
  ITerrain,
} from "../../interfaces"
import { GAME_ACTIONS } from "../reducers/game"
import { AppDispatch } from ".."
import { newCampaignGame, newRandomGame, newTerrain } from "../../queries/games"

export const startGuestGame = () => {
  return async (dispatch: AppDispatch) => {
    const terrainRes = await newTerrain()
    const gameRes = await newRandomGame()
    if (terrainRes.error || gameRes.error)
      return dispatch(GAME_ACTIONS.SET_GAME_ERROR(true))
    dispatch(
      //@ts-ignore
      setGame(
        { pc: gameRes.pc.animals, user: gameRes.user.animals },
        { pc: gameRes.pc.plants, user: gameRes.user.plants },
        terrainRes
      )
    )
  }
}

export const startCampaignGame = (setUserName: (str: string) => void, reqXp: number) => {
  return async (dispatch: AppDispatch, getState: () => IRootState) => {
    const { auth } = getState()
    const { first_name, hand, xp } = auth.user
    setUserName(first_name)
    if (xp < reqXp) dispatch(GAME_ACTIONS.SET_GAME_ERROR(true))
    const terrainRes = await newTerrain(reqXp)
    const gameRes = await newCampaignGame(reqXp, hand)
    if (terrainRes.error || gameRes.error)
      return dispatch(GAME_ACTIONS.SET_GAME_ERROR(true))
    dispatch(
      //@ts-ignore
      setGame(
        { pc: gameRes.pc.animals, user: gameRes.user.animals },
        { pc: gameRes.pc.plants, user: gameRes.user.plants },
        terrainRes
      )
    )
  }
}

const getHighestAttackCard = (hand: IAnimal[]) =>
  hand.reduce((acc, value) => (value.attack.current > acc.attack.current ? value : acc))

const attackAndApplySkill = (game: IGameState, enemyHandKey: HandKey): IGameState => {
  const { defender, attacker, hands } = game
  if (!defender || !attacker || !hands || defender.life.current === 0) return game

  const stateAfterAttack = applyAttackDamage(game, enemyHandKey)

  const updatedGame = {
    ...stateAfterAttack,
    hands: passRoundAndApplyEffects(
      applyPoisonDamage(stateAfterAttack.hands, enemyHandKey),
      enemyHandKey
    ),
  }

  return attacker.paralyzed > 0
    ? updatedGame
    : getOffensiveSkillFn(attacker.name)(updatedGame, enemyHandKey)
}

const applyPlantToCard = (
  plant: IPlant,
  card: IAnimal,
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
  const pcLiveCards = getLiveCards(hands.pc)
  const userLiveCards = getLiveCards(hands.user)

  const damagedCard = pcLiveCards.find(
    (card: IAnimal) => card.life.current <= card.life.initial - 2
  )
  const poisonedCard = pcLiveCards.find((card: IAnimal) => card.poisoned.rounds > 0)
  const paralyzedCard = pcLiveCards.find((card: IAnimal) => card.paralyzed > 0)
  const blindCard = pcLiveCards.find((card: IAnimal) => card.missing.chance > 0)
  const bleedingCard = pcLiveCards.find((card: IAnimal) => card.bleeding)

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

  if (!getLiveCards(hands.user).length) return game
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
    const pcLiveCards = getLiveCards(hands.pc)
    const userLiveCards = getLiveCards(hands.user).filter(
      (card: IAnimal) => card.targeteable
    )
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
  return getLiveCards(updatedGame!.hands.pc).length === 0
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
    const pcLiveCards = getLiveCards(hands.pc)
    const userLiveCards = getLiveCards(hands.user)
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

const passRoundAndApplyEffects = (hands: IHands, enemyHandKey: HandKey) => {
  const minusParalyzedRound = hands[enemyHandKey].map(card => {
    if (card.paralyzed > 0) {
      return {
        ...card,
        paralyzed: card.paralyzed - 1,
      }
    } else return card
  })
  const minusPoisonedRound = minusParalyzedRound.map(card => {
    if (card.poisoned.rounds > 0) {
      return {
        ...card,
        poisoned: {
          ...card.poisoned,
          rounds: card.poisoned.rounds - 1,
        },
      }
    } else return card
  })
  return {
    ...hands,
    [enemyHandKey]: minusPoisonedRound.map(card => {
      if (!card.bleeding || card.life.current === 0) return card
      return {
        ...card,
        life: {
          ...card.life,
          current: card.life.current - 1 < 1 ? 0 : card.life.current - 1,
        },
      }
    }),
  }
}

const applyAttackDamage = (game: IGameState, enemyHandKey: HandKey): IGameState => {
  const attacker = game.attacker!
  const defender = game.defender!
  if (defender.life.current === 0)
    return { ...game, underAttack: undefined, dodgedAttack: undefined }

  if (
    attacker.missing.chance > 0 &&
    !attacker.missing.exceptions.includes(defender.species) &&
    getRandomChance(attacker.missing.chance)
  )
    return { ...game, underAttack: undefined, dodgedAttack: defender.name }

  const statsDiff =
    defender.life.current - (attacker.attack.current + getExtraDamage(attacker, defender))
  const updatedGame = getDefensiveSkillFn(defender.name)(game, enemyHandKey, statsDiff)
  return updatedGame
}

const applyPoisonDamage = (hands: IHands, enemyHandKey: HandKey): IHands => {
  const applyPoisonInAHand = (arr: IAnimal[]) =>
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

const setCardsAndTerrain = (game: IGameState, terrain: ITerrain) => {
  const buffCards = (arr: IAnimal[]) => {
    return arr.map(card => {
      if (card.habitat === terrain.name) {
        return {
          ...card,
          attack: { ...card.attack, current: card.attack.current + 1 },
        }
      } else return card
    })
  }
  return {
    ...game,
    terrain: terrain,
    isLoading: false,
    gameError: false,
    hands: {
      pc: buffCards(game.hands.pc),
      user: buffCards(game.hands.user),
    },
  }
}

export const setGame = (hands: IHands, plants: IPlants, terrain: ITerrain) => {
  return (dispatch: AppDispatch, getState: () => IRootState) => {
    const { game } = getState()
    const updatedGame = setCardsAndTerrain({ ...game, hands, plants }, terrain)
    dispatch(GAME_ACTIONS.SET_STATE(updatedGame))
  }
}
