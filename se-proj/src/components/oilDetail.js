import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../API/api.json'; // Import the data
import '../styles/oildetail-style.css'; // Import the CSS for styling

const OilDetailPage = () => {
  const { id } = useParams(); // Get the 'id' from the URL
  const oil = data[id]; // Access the oil data based on the index (id)

  if (!oil) {
    return <p>Oil not found!</p>; // If no oil is found at that index
  }

  return (
    <div className="oil-detail">
      <h1>{oil.name}</h1>
      <img src={oil.image} alt={oil.name} />
      <p>Year: {oil.year}</p>
      <p>Price: ${oil.price}</p>
      <p>Rating: ⭐ {oil.rating}</p>
      <p>Details: {oil.description}</p> {/* You can add a more detailed description if available */}
    </div>
  );
};

export default OilDetailPage;
