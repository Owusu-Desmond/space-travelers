import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_MISSIONS = 'missions/fetch_missions';
const UPDATE_JOINING = 'missions/update_joining';

export default function missionsReducer(state = [], action) {
  if (action.type === `${FETCH_MISSIONS}/fulfilled`) {
    return action.payload.data;
  }
  if (action.type === UPDATE_JOINING) {
    return state.map((mission) => {
      if (mission.id === action.id) {
        return { ...mission, reserved: true };
      }
      return mission;
    });
  }

  return state;
}

export const addMissions = createAsyncThunk(
  FETCH_MISSIONS,
  async () => {
    const res = await axios.get('https://api.spacexdata.com/v3/missions');
    let { data } = await res;
    data = data.map((el) => ({
      name: el.mission_name,
      id: el.mission_id,
      description: el.description,
    }));
    return { data };
  },
);

export const updateJoining = (id) => ({ type: UPDATE_JOINING, id });
