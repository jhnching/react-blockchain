import { combineReducers } from "redux";

import { cryptoReducer, CryptoState } from "./todo/crypto.reducer";

export type AppState = {
  cryptoData: CryptoState
}

export const rootReducer = combineReducers({ cryptoData: cryptoReducer });