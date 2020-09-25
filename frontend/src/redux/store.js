import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import sessionReducer from './reducers/session';
import history from '../utils/history';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  session: sessionReducer,
  router: connectRouter(history),
});

const middlewares = [routerMiddleware(history), thunk];

export const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(...middlewares))
);
