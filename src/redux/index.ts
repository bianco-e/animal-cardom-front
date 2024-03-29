import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import reducer from "./reducers"

const store = configureStore({ reducer, middleware: [thunk] })
export const dispatch = store.dispatch
export type AppDispatch = typeof store.dispatch
export default store
