import {
  combineReducers, configureStore,
} from '@reduxjs/toolkit';
import reducer from './rocket/rocket';

const rootReducer = combineReducers({
  rocket: reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
