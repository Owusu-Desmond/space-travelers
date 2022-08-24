import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_MISSIONS = 'missions/fetch_missions';
const ADD_JOINING = 'missions/add_joining';
const REMOVE_JOINING = 'missions/remove_joining';

export default function missionsReducer(state = {missions: []}, action) {
  if (action.type === `${FETCH_MISSIONS}/fulfilled`) {
    return action.payload.data;
  }

  if (action.type === ADD_JOINING) {
    return state.map((mission) => {
      if (mission.id === action.id) {
        return { ...mission, reserved: true };
      }
      return mission;
    });
  }

  if (action.type === REMOVE_JOINING) {
    return state.map((mission) => {
      if (mission.id === action.id) {
        return { ...mission, reserved: false };
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
      reserved: false,
    }));
    return { data };
  },
);

export const addJoining = (id) => ({ type: ADD_JOINING, id });
export const removeJoining = (id) => ({ type: REMOVE_JOINING, id });
