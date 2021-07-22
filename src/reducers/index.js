import { combineReducers } from 'redux';
import homeReducer from './home.reducer';
import dataVisualizationReducer from './datavisualisation.reducer'

const rootReducer = combineReducers({
  homeReducer,
  dataVisualizationReducer
});

export default rootReducer;
