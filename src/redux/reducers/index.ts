import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./app";
import contactsReducer from "./contacts";


const rootReducer = combineReducers({
   app: appReducer,
   contacts: contactsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer