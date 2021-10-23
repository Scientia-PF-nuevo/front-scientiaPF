import { createStore, applyMiddleware, compose } from 'redux';
import thunk  from 'redux-thunk';
import combineReducers from '../reducer/combineReducers';

// const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const store = createStore(
//   combineReducers,
//   composeEnhancers(applyMiddleware(thunk))
// );

// export default store


function saveToLocalStorage(state) {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
}

function loadFromLocalStorage() {
const serializedState = localStorage.getItem('state');
if (serializedState === null) return undefined;
 return JSON.parse(serializedState);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const presistedState = loadFromLocalStorage();
const store = createStore(
  combineReducers,
  presistedState,
  composeEnhancers(applyMiddleware(thunk)),
);
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;