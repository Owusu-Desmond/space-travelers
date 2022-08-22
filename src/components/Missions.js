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

  console.log(missions);
  return (
    <div className="missions-container">
      {missions.map((mission) => (
        <div className="row" key={mission.id}>
          <div>
            <p>{mission.name}</p>
          </div>
          <div>
            <p>{mission.description}</p>
          </div>
          <div>
            <p>NOT A MEMBER</p>
          </div>
          <div>
            <button type="button">Join Mission</button>
          </div>
        </div>
      ))}
    </div>
  );
}
