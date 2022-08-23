import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styling/rocketPage.css';
import { fetchRocket } from '../redux/rocket/rocket';

const RocketPage = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rocket);
  useEffect(() => {
    if (rockets.length === 0) { // if rockets array is empty, fetch rockets
      dispatch(fetchRocket());
    }
  }, []);

  const reserveRocket = (id) => {
    dispatch({ type: 'RESERVE_ROCKET', payload: id });
  };

  const cancelReservedRocket = (id) => {
    dispatch({ type: 'CANCEL_RESERVATION', payload: id });
  };

  return (
    <div className="rockets-container">
      {rockets.map((rocket) => (
        <div className="rocket-card" key={rocket.id}>
          <img
            src={rocket.flickr_images[0]}
            alt={rocket.name}
          />
          <div>
            <h2>{rocket.name}</h2>
            <p>
              {rocket.reserved ? <span>Reserved</span> : ''}
              {rocket.description}
            </p>
            {/* if rocket is reserved, display reserved message */}
            {rocket.reserved
              ? (
                <button
                  className="cancel-reservation-button"
                  type="button"
                  onClick={() => cancelReservedRocket(rocket.id)}
                >
                  Cancel Reservation
                </button>
              )
              : (
                <button
                  className="reservation-button"
                  type="button"
                  onClick={() => reserveRocket(rocket.id)}
                >
                  Reserve Rocket
                </button>
              )}

          </div>
        </div>
      ))}
    </div>
  );
};

export default RocketPage;
