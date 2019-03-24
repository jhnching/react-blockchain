import { action, ActionType } from 'typesafe-actions';

import { Crypto } from './types/crypto.type';

export const LOAD_CRYPTO = 'LOAD_CRYPTO';
export const LOAD_CRYPTO_COMPLETE = 'LOAD_CRYPTO_COMPLETE';
export const ADD_CRYPTO = 'ADD_CRYPTO';
export const DELETE_CRYPTO = 'DELETE_CRYPTO';
export const JOIN_CRYPTO = 'JOIN_CRYPTO';
export const SORT = 'SORT'

export const loadCrypto = () => action(LOAD_CRYPTO);
export const loadCryptoComplete = (data: Crypto[]) => action(LOAD_CRYPTO_COMPLETE, data);

export const addCrypto = (id: string) => action(ADD_CRYPTO, id);
export const deleteCrypto = (id: string) => action(DELETE_CRYPTO, id);
export const joinCrypto = (data: any) => action(JOIN_CRYPTO, data);
export const sort = (type: 'cmc_rank' | 'price') => action(SORT, type);

export type CryptoActions = ActionType<typeof loadCrypto | typeof loadCryptoComplete | typeof deleteCrypto | typeof addCrypto 
| typeof joinCrypto | typeof sort>