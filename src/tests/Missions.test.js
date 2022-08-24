import React from "react";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render} from '@testing-library/react'
import { Provider } from "react-redux";
import Missions from '../components/Missions';
import { configureStore } from "@reduxjs/toolkit";
import missionsReducer from "../redux/missions/missions";

const server = setupServer(
  rest.get('https://api.spacexdata.com/v3/missions', (req, res, ctx) => {
    return res(ctx.json({
      mission_id: '99',
      mission_name: 'mission1',
      description: 'really cool mission',
    }))
  })
)

const store = configureStore({
  reducer: missionsReducer,
});

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

it('renders', () => {
  render(<Provider store={store}><Missions /></Provider>)
})