import { Crypto } from "./types/crypto.type";
import { LOAD_CRYPTO_COMPLETE, CryptoActions, ADD_CRYPTO, DELETE_CRYPTO, JOIN_CRYPTO, SORT } from './crypto.actions';

export type CryptoState = {
  crypto: Crypto[],
  active: Crypto[]
}

const initialState: CryptoState = {
  crypto: [],
  active: []
}

const sortCompare = (type: 'cmc_rank' | 'price') => (a: any, b: any) => a[type] - b[type]

export const cryptoReducer = (state = initialState, action: CryptoActions) => {
  var temp: Crypto[];

  switch(action.type) {
    case LOAD_CRYPTO_COMPLETE:
      return {
        ...state,
        crypto: action.payload.slice(5),
        active: action.payload.slice(0, 5)
      };
    case ADD_CRYPTO:
      temp = state.active.slice();
      temp.push(state.crypto.find(current => current.id === parseInt(action.payload)) as Crypto);
      return {
        ...state,
        active: temp,
        crypto: state.crypto.filter(current => current.id !== parseInt(action.payload))
      };
    case DELETE_CRYPTO:
      temp = state.crypto.slice();
      temp.push(state.active.find(current => current.id === parseInt(action.payload)) as Crypto);
      return {
        ...state,
        active: state.active.filter(current => current.id !== parseInt(action.payload)),
        crypto: temp
      };
    case JOIN_CRYPTO:
      temp = state.active.slice();
      Object.values(action.payload).forEach((crypto: any) => {
        const found = temp.find(current => current.id === crypto.id) as Crypto;
        found.cmc_rank = crypto.cmc_rank;
        found.price = crypto.quote.USD.price;
      })
      return {
        ...state,
        active: temp
      };
    case SORT:
      temp = state.active.slice();
      temp.sort(sortCompare(action.payload));
      return {
        ...state,
        active: temp
      }
    default:
      return state;
  }
}