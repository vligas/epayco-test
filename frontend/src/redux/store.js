import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import sessionReducer from './reducers/session';
import history from '../utils/history';

const rootReducer = combineReducers({
  session: sessionReducer,
  router: connectRouter(history),
});

const middlewares = [routerMiddleware(history)];

export const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(...middlewares))
);
