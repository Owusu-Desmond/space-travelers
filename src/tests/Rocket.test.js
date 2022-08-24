import React from 'react';
import {
  fireEvent, getByText, render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import RocketPage from '../components/rocketPage';
import Profile from '../components/Profile';
import rocketReducer from '../redux/rocket/rocket';

const initialState = {
  missions: [],
  rocket: [{
    id: 'falcon1',
    name: 'falcon 1',
    description: 'Rocket that flies',
  }],
};

const rootReducer = combineReducers({
  missions: missionsReducer,
  rocket: rocketReducer,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

describe('Test Rocket components', () => {
  it('render rockect page component', () => {
    const rocket = render(<Provider store={store}><RocketPage /></Provider>);
    expect(rocket).toMatchSnapshot();
  }),
  it('Display rocket page state from store to component', () => {
    render(<Provider store={store}><RocketPage /></Provider>);
    expect(screen.getByText('falcon 1')).toBeInTheDocument();
  }),
  it('should update my profile page when click on reverse rocket', () => {
    render(<Provider store={store}>
      <RocketPage />
      <Profile />
    </Provider>);
    expect(screen.getByText('No rocket reserved')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Reserve Rocket'));
    expect(screen.getAllByText('falcon 1').length).toEqual(1);
  });
});

describe('Rocket reducer logic test', () => {
  it('Reducer should return inital state when there is no action', () => {
    expect(rocketReducer(initialState, { type: undefined })).toBe(initialState);
  }),
  it('Reducer should return newState with rocket when there is an action "RESERVE_ROCKET"', () => {
    const initialState = {
      rocket: [{
        id: 'falcon1',
        name: 'falcon 1',
        description: 'Rocket that flies',
      }],
    };
    const newState = [{
      id: 'falcon1',
      name: 'falcon 1',
      description: 'Rocket that flies',
      reserved: true,
    }];
    const action = {
      type: 'RESERVE_ROCKET',
      payload: 'falcon1',
    };
    expect(rocketReducer(initialState, action)).toEqual(newState);
  });
});
