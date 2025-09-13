import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./combineReducers";

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware();
    },
    devTools: true,
});