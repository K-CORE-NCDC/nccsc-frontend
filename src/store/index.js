import { applyMiddleware, createStore } from 'redux';
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
export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, loggerMiddleware)
);
