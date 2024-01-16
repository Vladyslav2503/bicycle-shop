import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserSlice"

const rootReducer = combineReducers({
    UserReducer
})

export const setupStore = () => {
    return configureStore( {
        reducer: rootReducer
    })
}