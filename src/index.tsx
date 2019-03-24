import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { rootReducer } from './store/root.reducer';
import { rootEpic } from './store/root.epics';

declare const window: any;
const epicMiddleWare = createEpicMiddleware();
const store = createStore(
  rootReducer, 
  compose(
    applyMiddleware(epicMiddleWare), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
epicMiddleWare.run(rootEpic);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
