import '../styling/Profile.css';
import { useSelector } from 'react-redux';

const Profile = () => {
  // access rocket state in the Redux store and filter out the reserved rockets
  const rocket = useSelector((state) => state.rocket);
  const reservedRocket = rocket.filter((rocket) => rocket.reserved);

  // access mission state in the Redux store and filter out the joined missions
  const missions = useSelector((state) => state.missions);
  const joinedMissions = missions.filter((mission) => mission.reserved);

  return (
    <div className="profile-container">
      <div className="missions">
        <h3>My Missions</h3>
        {joinedMissions.length !== 0 ? (
          <table>
            <tbody>
              {joinedMissions.map((mission) => (
                <tr key={mission.id}>
                  <td>{mission.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p><i>No mission joined</i></p>
        )}
      </div>

      <div className="rockets">
        <h3>Rockets</h3>
        {reservedRocket.length !== 0 ? (
          <table>
            <tbody>
              {reservedRocket.map((rocket) => (
                <tr key={rocket.id}>
                  <td>{rocket.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p><i>No rocket reserved</i></p>
        )}
      </div>
    </div>
  );
};

export default Profile;
