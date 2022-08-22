import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMissions } from '../redux/missions/missions';

export default function Missions() {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions);
  
  useEffect(() => {
    if (missions.length === 0) {
      dispatch(addMissions());
    }
  }, []);

  return (
    <div>
      {missions.map((mission) => <p>{mission.description}</p>)}
      Hello
    </div>
  );
}
