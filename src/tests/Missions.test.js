import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import Missions from '../components/Missions';
import missionsReducer from '../redux/missions/missions';

const initialState = {
  missions: [{
    id: '99',
    name: 'mission1',
    description: 'really cool mission',
  }],
};

const rootReducer = combineReducers({
  missions: missionsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

describe('component tests', () => {
  it('renders', () => {
    const missions = render(<Provider store={store}><Missions /></Provider>);

    expect(missions).toMatchSnapshot();
  });

  it('displays state from the store to the UI', () => {
    render(<Provider store={store}><Missions /></Provider>);

    expect(screen.getByText('really cool mission')).toBeInTheDocument();
  });
});

describe('reducer logic tests', () => {
  test('the reducer should return inital state', () => {
    expect(missionsReducer(initialState, { type: undefined })).toBe(initialState);
  });

  test('the reducer should return the new reserved value', () => {
    const initialState = [{
      id: '99',
      name: 'mission1',
      description: 'really cool mission',
    }];

    const newState = [{
      id: '99',
      name: 'mission1',
      description: 'really cool mission',
      reserved: true,
    }];

    expect(missionsReducer(initialState, { type: 'missions/add_joining', id: '99' })).toStrictEqual(newState);
  });
});
