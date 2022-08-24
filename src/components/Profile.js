import '../styling/Profile.css';
import { useSelector } from 'react-redux';

const Profile = () => {
  // access rocket state in the Redux store and filter out the reserved rockets
  const rocket = useSelector((state) => state.rocket);
  const reservedRocket = rocket.filter((rocket) => rocket.reserved);

  return (
    <div className="profile-container">
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
