import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const FETCH_ROCKET = 'FETCH_ROCKET';
const ROCKET_API_URL = 'https://api.spacexdata.com/v3/rockets';

const fetchRocket = createAsyncThunk(FETCH_ROCKET, async () => {
  const { data } = await axios.get(ROCKET_API_URL);
  const rocketData = data.map((rocket) => ({
    id: rocket.rocket_id,
    name: rocket.rocket_name,
    type: rocket.rocket_type,
    description: rocket.description,
    flickr_images: rocket.flickr_images.sort(() => 0.5 - Math.random()),
  }));
  return rocketData;
});

const reducer = (state = [], action) => {
  switch (action.type) {
    case `${FETCH_ROCKET}/fulfilled`:
      return action.payload;
    case 'RESERVE_ROCKET':
      return state.map((rocket) => {
        if (rocket.id === action.payload) {
          return {
            ...rocket,
            reserved: true,
          };
        }
        return rocket;
      });
    case 'CANCEL_RESERVATION':
      return state.map((rocket) => {
        if (rocket.id === action.payload) {
          return {
            ...rocket,
            reserved: false,
          };
        }
        return rocket;
      });
    default:
      return state;
  }
};

export { fetchRocket };
export default reducer;
