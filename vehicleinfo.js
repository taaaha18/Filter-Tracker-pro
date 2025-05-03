import React from 'react';
import '../styles/vehicleInfo-style.css';

const VehicleInfo = ({ vehicleNumber, mileage, lastUpdate }) => {
  return (
    <div className="vehicle-info-box">
      <h3>Vehicle #{vehicleNumber}</h3>
      <p style={{ color: "#ffffff" }}>
        <strong style={{ color: "#ffffff" }}>Mileage:</strong>{" "}
        <span style={{ color: "#ffffff", fontWeight: 600 }}>{mileage} km</span>
      </p>
      <p style={{ color: "#ffffff" }}>
        <strong style={{ color: "#ffffff" }}>Last Oil Change:</strong>{" "}
        <span style={{ color: "#ffffff", fontWeight: 600 }}>
          {new Date(lastUpdate).toLocaleDateString()}
        </span>
      </p>
    </div>
  );
};

export default VehicleInfo;
