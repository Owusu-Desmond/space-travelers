import { configureStore } from '@reduxjs/toolkit';

const preloadedState = [];

const rootReducer = (state) => state;

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default store;
