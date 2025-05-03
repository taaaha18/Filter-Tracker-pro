import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EngineOilCard from './card';
import data from '../API/api.json';
import { useLocation, useNavigate } from 'react-router-dom';
const EngineOilList = () => {
const location = useLocation();
  const username = location.state?.username || 'User';
  const navigate = useNavigate();
             
    const handleUpdateInfo = () => {
      navigate('/dashboard2');
    };
  
    const handleRecommendedOil = () => {
      navigate('/recomDisplay');
    };
    const handleserviceOil = () => {
      navigate('/card_display');
    };
    const handleUpdateinfoo = () => {
      navigate('/update1');
    };
    const handleHome = () => {
      navigate('/dashboard1' ,{state: { username }, replace: true });
    };
  const [oils, setOils] = useState([]);

  useEffect(() => {
    setOils(data);
    console.log("Loaded from import:", data); // Check image URLs
  }, []);

  return (
    <div
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    backgroundImage: `url("../images/d4.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',  // This fixes the background in place
    minHeight: '100vh',
    paddingTop: '80px',
  }}
>


  
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
          <li> <button className='otherButtons' onClick={handleserviceOil}>
             services
            </button></li>
            <li> <button className='otherButtons' onClick={handleUpdateinfoo}>
             UpdateProfile
            </button></li>
          <li>
            <button className="update-btn" onClick={handleUpdateInfo}>
              Update Info
            </button>
          </li>
        </ul>
      </nav>
      {oils.map((oil, index) => (
        <Link to={`/oil/${index}`} key={index} style={{ textDecoration: 'none' }}>
          <EngineOilCard oil={oil} />
        </Link>
      ))}
    </div>
  );
};

export default EngineOilList;
