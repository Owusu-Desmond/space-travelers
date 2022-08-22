import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMissions } from '../redux/missions/missions';
import '../styling/Missions.css';

export default function Missions() {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions);
  useEffect(() => {
    if (missions.length === 0) {
      dispatch(addMissions());
    }
  }, []);

  return (
    <div className="missions-container">
      <div className="row first-row">
        <div>Mission</div>
        <div>Description</div>
        <div>Status</div>
        <div />
      </div>
      {missions.map((mission, index) => (
        <div className={index % 2 === 0 ? 'row lavender' : 'row'} key={mission.id}>
          <div className="col-1">
            <p>{mission.name}</p>
          </div>
          <div className="col-2">
            <p>{mission.description}</p>
          </div>
          <div className="col-3">
            <p>NOT A MEMBER</p>
          </div>
          <div className="col-4">
            <button type="button">Join Mission</button>
          </div>
        </div>
      ))}
    </div>
  );
}
