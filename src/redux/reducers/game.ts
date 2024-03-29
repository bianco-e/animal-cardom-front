import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IGameState } from "../../interfaces"

const initialState: IGameState = {
  isLoading: false,
  gameError: false,
  hands: { user: [], pc: [] },
  plants: { user: [], pc: [] },
  animalToTreat: undefined,
  treatedAnimal: undefined,
  selectedPlant: undefined,
  usedPlants: [],
  attacker: undefined,
  defender: undefined,
  underAttack: undefined,
  terrain: {
    name: "",
    color: "#fff",
    image: "",
    campaign_xp: [0],
  },
  pcTurn: false,
  triggerPcAttack: false,
  pcPlays: [],
}

export const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    SET_STATE: (state, action) => {
      return action.payload
    },
    SET_LOADING_GAME: (state, action) => {
      return {
        ...state,
        isLoading: true,
        gameError: false,
      }
    },
    SET_GAME_ERROR: (state, action) => {
      return {
        ...state,
        isLoading: false,
        gameError: true,
      }
    },
    EMPTY_STATE: (state, action: PayloadAction<{ isLoading: boolean } | undefined>) => {
      return { ...initialState, isLoading: action.payload?.isLoading || false }
    },
    COMPUTER_THINK: state => {
      return {
        ...state,
        triggerPcAttack: true,
        pcPlays: state.pcPlays.concat("Thinking..."),
      }
    },
  },
})

export const GAME_ACTIONS = slice.actions
export default slice.reducer
