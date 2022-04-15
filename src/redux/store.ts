import { createStore, compose, applyMiddleware } from "@reduxjs/toolkit"
import rootReducer from "./reducers"
import thunk from "redux-thunk"

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk))
)

export type AppDispatch = typeof store.dispatch
export default store