import React from "react";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {fireEvent, render, screen} from '@testing-library/react'
import { Provider } from "react-redux";
import Missions from '../components/Missions';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import missionsReducer, { addMissions } from "../redux/missions/missions";
import axios from "axios";


// const server = setupServer(
//   rest.get('https://api.spacexdata.com/v3/missions', (req, res, ctx) => {
//     return res(ctx.json({
//       mission_id: '99',
//       mission_name: 'mission1',
//       description: 'really cool mission',
//     }))
//   })
// )

const rootReducer = combineReducers({
  missions: missionsReducer
})

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    missions: [{
      id: '99',
      name: 'mission1',
      description: 'really cool mission',
    }],
  }
});

// // establish API mocking before all tests
// beforeAll(() => server.listen())
// // reset any request handlers that are declared as a part of our tests
// // (i.e. for testing one-time error scenarios)
// afterEach(() => server.resetHandlers())
// // clean up once the tests are done
// afterAll(() => server.close())

it('renders', () => {
  const missions = render(<Provider store={store}><Missions /></Provider>);

  expect(missions).toMatchSnapshot();
})

it('displays state from the store to the UI', () => {
  (<Provider store={store}><Missions /></Provider>);
  screen.debug()

  expect(screen.findByText('really cool mission').toBeInTheDocument)
})
