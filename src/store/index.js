import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

// const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  // const { logger } = require('redux-logger');

  // middlewares.push(logger);
}

const initialState = {};
/* eslint-disable import/prefer-default-export */
export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, loggerMiddleware),
);
