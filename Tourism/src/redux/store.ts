import { configureStore } from "@reduxjs/toolkit";
import appState from "./reducer";



export const store = configureStore({
    reducer:appState  
})