import { createSlice } from "@reduxjs/toolkit"
import { IGameState } from "../../interfaces"

const initialState: IGameState = {
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
    speciesToBuff: "",
    image: "",
    campaign_xp: [0],
  },
  pcTurn: false,
  triggerPcAttack: false,
  pcPlay: "",
}

export const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    SET_STATE: (state, action) => {
      return action.payload
    },
    EMPTY_STATE: () => {
      return initialState
    },
    COMPUTER_THINK: state => {
      return {
        ...state,
        triggerPcAttack: true,
        pcPlay: "Thinking...",
      }
    },
  },
})

export const GAME_ACTIONS = slice.actions
export default slice.reducer
