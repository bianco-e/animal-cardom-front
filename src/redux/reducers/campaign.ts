import { createSlice } from "@reduxjs/toolkit"
import { CampaignState } from "../../interfaces"

const initialState: CampaignState = {
  id: "",
  isLoading: false,
  error: null,
  coins: 0,
  level: 0,
  hand: [],
  owned_animals: [],
}

export const slice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    SET_COINS: (state, action) => {
      return {
        ...state,
        coins: action.payload,
      }
    },
    SET_LEVEL: (state, action) => {
      return {
        ...state,
        level: action.payload,
      }
    },
    SET_HAND: (state, action) => {
      return {
        ...state,
        hand: action.payload,
      }
    },
    SET_OWNED_CARDS: (state, action) => {
      return {
        ...state,
        owned_animals: action.payload,
      }
    },
    SET_CAMPAIGN_SUCCESS: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    SET_CAMPAIGN_REQUEST: state => {
      return {
        ...state,
        isLoading: true,
      }
    },
    SET_CAMPAIGN_ERROR: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    },
  },
})
export const CAMPAIGN_ACTIONS = slice.actions
export default slice.reducer
