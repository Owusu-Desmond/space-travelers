import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMissions } from '../redux/missions/missions';

export default function Missions() {
  const dispatch = useDispatch();
  dispatch(addMissions);
  const missions = useSelector((state) => state.mission);

  return (
    <div>
      Hello
    </div>
  );
}
