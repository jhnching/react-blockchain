import { AppState } from "../root.reducer";

export const cryptoState = (state: AppState) => state.cryptoData;
export const crypto = (state: AppState) => cryptoState(state).crypto;
export const active = (state: AppState) => cryptoState(state).active;