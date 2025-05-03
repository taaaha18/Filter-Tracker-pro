import React from 'react';
import '../styles/cards-style.css';

const EngineOilCard = ({ oil }) => {
  return (
    <div
      className="card"
      style={{ backgroundImage: `url("/images/d4.jpg")` }}
    >
      <img
        className="card-image"
        src={oil.image}
        alt={`${oil.name} Image`}
      
      />

      <div className="card-content">
        <h2 className="card-title">{oil.name}</h2>
        <p>Year: {oil.year}</p>
        <p>Price: ${oil.price}</p>
        <p>Rating: ⭐ {oil.rating}</p>
      </div>
    </div>
  );
};

export default EngineOilCard;
