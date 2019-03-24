import { combineEpics } from 'redux-observable';

import { loadCrypto, fetchCryptoData } from './todo/crypto.epics';

export const rootEpic = combineEpics(loadCrypto, fetchCryptoData);