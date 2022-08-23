import { configureStore, combineReducers } from '@reduxjs/toolkit';
import rocketReducer from './rocket/rocket';
import missionsReducer from './missions/missions';

const rootReducer = combineReducers({
  missions: missionsReducer,
   rocket: rocketReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
