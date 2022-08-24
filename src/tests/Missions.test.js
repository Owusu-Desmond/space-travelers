import React from 'react';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import Missions from '../components/Missions';
import Profile from '../components/Profile';
import missionsReducer from '../redux/missions/missions';
import rocketReducer from '../redux/rocket/rocket';

const initialState = {
  missions: [{
    id: '99',
    name: 'mission1',
    description: 'really cool mission',
  }],
  rocket: []
};

const rootReducer = combineReducers({
  missions: missionsReducer,
  rocket: rocketReducer,
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

  it('should update the my profile page when clickin on reserving a mission', () => {
    render(<Provider store={store}><Missions /><Profile /></Provider>);
    expect(screen.getByText('No mission joined')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Join Mission'));
    expect(screen.getAllByText('mission1').length).toEqual(2);
  }) 
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
