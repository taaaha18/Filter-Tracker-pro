import React, { useState } from 'react';
import '../styles/dashboard2-style.css';
import Input from './input';
import logo from '../images/l4.jpg';

import { useLocation, useNavigate } from 'react-router-dom';
function Dashboard2() {
  const location = useLocation();
  const username = location.state?.username || 'Lovebird';

  const [formData, setFormData] = useState({
    vehicleNumber: '',
    region: '',
    vehicleType: '',
    make: '',
    model: '',
    engineCC: '',
    mileage: ['', '', '', '', '', ''],
    lastOilChange: ''
  });
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
    navigate('/dashboard1', { state: { username },replace: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMileageChange = (index, value) => {
    const newMileage = [...formData.mileage];
    newMileage[index] = value;
    setFormData((prev) => ({
      ...prev,
      mileage: newMileage
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      mileage: formData.mileage.join(''),
      username
    };

    try {
      const res = await fetch('http://localhost:3000/api/vehicle-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });

      const result = await res.json();
      if (res.ok) {
        alert('Data submitted successfully!');
        console.log(result);
      } else {
        alert('Failed to submit: ' + result.message);
      }
    } catch (err) {
      console.error('Submission Error:', err);
      alert('Error submitting data');
    }
  };

  return (
    <div className="romantic-dashboard">
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
      <div className="romantic-image">
      
<img src={logo} alt="Romantic Logo" />

      </div>

      <div className="romantic-card">
        <h1>Enter Vehicle Details</h1>
        <p className="subtitle">
          Details will be used to recommend optimum engine oils & keep track of oil change.
        </p>

        <form className="romantic-form" onSubmit={handleSubmit}>

        <label>Vehicle Number</label>
<input
  type="text"
  name="vehicleNumber"
  placeholder="Enter Vehicle Number"
  value={formData.vehicleNumber}
  onChange={handleChange}
/>

          <label>Region</label>
          <select name="region" value={formData.region} onChange={handleChange}>
            <option value="">Select Region</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
            <option value="South America">South America</option>
          </select>

          <label>Vehicle Type</label>
          <select name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="Bike">Bike</option>
            <option value="Car">Car</option>
            <option value="Truck">Bus/Truck</option>
          </select>

          <label>Make</label>
          <input type="text" name="make" placeholder="Enter Make" value={formData.make} onChange={handleChange} />

          <label>Model</label>
          <input type="text" name="model" placeholder="Enter Model" value={formData.model} onChange={handleChange} />

          

          <label>Engine CC</label>
          <input type="text" name="engineCC" placeholder="Enter Engine CC" value={formData.engineCC} onChange={handleChange} />


          <label>Mileage</label>
          <div className="mileage-blocks">
            {formData.mileage.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="mileage-input"
                value={digit}
                onChange={(e) => handleMileageChange(index, e.target.value)}
              />
            ))}
          </div>

          <label htmlFor="oil-change-date">Last Oil Change</label>
          <input
            type="date"
            id="oil-change-date"
            name="lastOilChange"
            className="custom-date"
            value={formData.lastOilChange}
            onChange={handleChange}
          />

          <button type="submit" onClick={handleHome}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard2;
