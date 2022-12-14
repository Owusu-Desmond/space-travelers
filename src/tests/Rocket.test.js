import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import RocketPage from '../components/rocketPage';
import Profile from '../components/Profile';
import rocketReducer from '../redux/rocket/rocket';
import missionsReducer from '../redux/missions/missions';

const initialState = {
  missions: [],
  rocket: [{
    id: 'falcon1',
    name: 'falcon 1',
    type: 'rocket',
    description: 'Rocket that flies',
    flickr_images: ['rocket1.jpg', 'rocket2.jpg'],
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
  });
  it('Display rocket page state from store to component', () => {
    render(<Provider store={store}><RocketPage /></Provider>);
    expect(screen.getByText('falcon 1')).toBeInTheDocument();
  });
  it('should update my profile page when click on reverse rocket', () => {
    render(
      <Provider store={store}>
        <RocketPage />
        <Profile />
      </Provider>,
    );
    expect(screen.getByText('No rocket reserved')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Reserve Rocket'));
    expect(screen.getAllByText('falcon 1').length).toEqual(2);
  });
});

describe('Rocket reducer logic test', () => {
  it('Reducer should return inital state when there is no action', () => {
    expect(rocketReducer(initialState, { type: undefined })).toBe(initialState);
  });
  it('Reducer should return newState with rocket when there is an action "RESERVE_ROCKET"', () => {
    const initialState = [{
      id: 'falcon1',
      name: 'falcon 1',
      type: 'rocket',
      description: 'Rocket that flies',
      flickr_images: ['rocket1.jpg', 'rocket2.jpg'],
    }];

    const newState = [{
      id: 'falcon1',
      name: 'falcon 1',
      type: 'rocket',
      description: 'Rocket that flies',
      flickr_images: ['rocket1.jpg', 'rocket2.jpg'],
      reserved: true,
    }];
    const action = {
      type: 'RESERVE_ROCKET',
      payload: 'falcon1',
    };
    expect(rocketReducer(initialState, action)).toEqual(newState);
  });
});
