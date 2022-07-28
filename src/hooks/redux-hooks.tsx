import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { IRootState } from "../interfaces"
import type { AppDispatch } from "../redux"

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
