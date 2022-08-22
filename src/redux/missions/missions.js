import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_MISSIONS = 'missions/fetch_missions';

export default function missionsReducer(state = [], action) {
  if (action.type === `${FETCH_MISSIONS}/fulfilled`) {
    return action.payload;
  }

  return state;
}

export const addMissions = createAsyncThunk(
  FETCH_MISSIONS,
  async () => {
    const res = await axios.get('https://api.spacexdata.com/v3/missions');
    const { data } = res;
    return { data };
  },
);
