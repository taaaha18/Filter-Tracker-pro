import React, { useState, useEffect } from 'react';
import '../styles/vehicleDetails-style.css'; // Import your CSS file for styling

import { useLocation, useNavigate } from 'react-router-dom';

const VehicleDetails = () => {
    const location = useLocation(); // Hook to get the current location
   
    // Always get the latest username from location state
    const username = location.state?.username || 'User';
    const [vehicleData, setVehicleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     
   
  const navigate = useNavigate();  
  const handleUpdateInfo = () => {
    navigate('/dashboard2', { state: { username } });
  };

  const handleRecommendedOil = () => {
    navigate('/recomDisplay', { state: { username } });
  };

  const handleserviceOil = () => {
    navigate('/card_display', { state: { username } });
  };
  
  const handleUpdateinfoo = () => {
    navigate('/update1', { state: { username } });
  };
  
  const handleHome = () => {
    navigate('/dashboard1', { state: { username }, replace: true });
  };
  const handleBack = () => {
    navigate('/update1', { state: { username } });
  };
  
    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/vehicle-info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }),
                });

                const data = await response.json();

                if (response.ok) {
                    setVehicleData(data);
                } else {
                    setError(data.message || 'Failed to fetch vehicle data');
                }
            } catch (err) {
                setError('Error fetching vehicle data');
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchVehicleData();
        } else {
            setError('Username is required to fetch vehicle details');
            setLoading(false);
        }
    }, [username]);

    return (
        <div>
               <nav className="navbar">
        <div className="navbar-logo">Filter Tracker Pro</div>
        <ul className="navbar-links">
          <li>
            <button className='otherButtons' onClick={handleHome}>
              Home
            </button>
          </li>
          <li>
            <button className='otherButtons' onClick={handleRecommendedOil}>
              Recommended Oil
            </button>
          </li>
          <li>
            <button className='otherButtons' onClick={handleserviceOil}>
             services
            </button>
          </li>
          <li>
            <button className='otherButtons' onClick={handleUpdateinfoo}>
             UpdateProfile
            </button>
          </li>
          <li>
            <button className="update-btn" onClick={handleUpdateInfo}>
              Update Info
            </button>
          </li>
        </ul>
      </nav>
            <h1>Vehicle Details for {username}</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && (
                <div>
                    {vehicleData.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Vehicle Number</th>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Engine CC</th>
                                    <th>Mileage</th>
                                    <th>Last Oil Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicleData.map((vehicle, index) => (
                                  <tr key={index}>
                                  <td>{vehicle.vehicle_number}</td>
                                  <td>{vehicle.make || vehicle.MAKE || 'N/A'}</td>
                                  <td>{vehicle.model || vehicle.MODEL || 'N/A'}</td>
                                  <td>{vehicle.engine_cc || vehicle.ENGINE_CC} CC</td>
                                  <td>{vehicle.mileage || vehicle.MILEAGE} km</td>
                                  <td>{vehicle.last_oil_change_date || vehicle.LAST_OIL_CHANGE_DATE || 'N/A'}</td>
                              </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No vehicles found for this user.</p>
                    )}
                </div>
            )}

            {/* Back Button */}
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
        </div>
    );
};

export default VehicleDetails;
