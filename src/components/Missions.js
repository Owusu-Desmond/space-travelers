import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addJoining,
  addMissions,
  removeJoining,
} from '../redux/missions/missions';
import '../styling/Missions.css';

export default function Missions() {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions);

  useEffect(() => {
    if (missions.length === 0) {
      dispatch(addMissions());
    }
  }, []);

  function updateMissionStatus(mission) {
    if (mission.reserved) {
      dispatch(removeJoining(mission.id));
    } else {
      dispatch(addJoining(mission.id));
    }
  }

  return (
    <div className="missions-container">
      <div className="row first-row">
        <div>Mission</div>
        <div>Description</div>
        <div>Status</div>
        <div />
      </div>
      {missions.map((mission, index) => (
        <div
          className={index % 2 === 0 ? 'row lavender' : 'row'}
          key={mission.id}
        >
          <div className="col-1">
            <p>{mission.name}</p>
          </div>
          <div className="col-2">
            <p>{mission.description}</p>
          </div>
          <div className="col-3">
            {mission.reserved ? (
              <p className="active-member">ACTIVE MEMBER</p>
            ) : (
              <p className="nota-member">NOT A MEMBER</p>
            )}
          </div>
          <div className="col-4">
            {mission.reserved ? (
              <button
                onClick={() => {
                  updateMissionStatus(mission);
                }}
                type="button"
                className="leave-btn"
              >
                Leave Mission
              </button>
            ) : (
              <button
                onClick={() => {
                  updateMissionStatus(mission);
                }}
                type="button"
                className="join-btn"
              >
                Join Mission
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
