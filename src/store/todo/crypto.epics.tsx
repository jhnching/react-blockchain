import { Action } from 'redux';
import { ofType, ActionsObservable } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { LOAD_CRYPTO, loadCryptoComplete, LOAD_CRYPTO_COMPLETE, joinCrypto, ADD_CRYPTO } from './crypto.actions';

export const loadCrypto = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(LOAD_CRYPTO),
  switchMap(() => ajax({
    url: 'https://www.stackadapt.com/coinmarketcap/map',
    method: 'GET',
    crossDomain: true,
    createXHR: function () {
      return new XMLHttpRequest();
    }
  })),
  map(ajaxResponse => ajaxResponse.response),
  map(response => loadCryptoComplete(response.data))
)

export const fetchCryptoData = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(LOAD_CRYPTO_COMPLETE, ADD_CRYPTO),
  map((action: any) => Array.isArray(action.payload) ? action.payload.slice(0, 5).map((data: any) => data.id).join(',') : action.payload),
  switchMap((data) => ajax({
    url: `https://www.stackadapt.com/coinmarketcap/quotes?id=${data}`,
    method: 'GET',
    crossDomain: true,
    createXHR: function () {
      return new XMLHttpRequest();
    }
  })),
  map(ajaxResponse => ajaxResponse.response),
  map(response => joinCrypto(response.data))
)