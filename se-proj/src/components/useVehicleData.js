import { useState, useEffect, useCallback } from 'react';

const useVehicleData = (username) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create a reusable fetch function with useCallback
  const fetchVehicleData = useCallback(async () => {
    if (!username) {
      setVehicles([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
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
        console.log("Fetched vehicle data:", data);
        setVehicles(data); // array of vehicles
      } else {
        console.error('Error fetching vehicle info:', data.message);
        setVehicles([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  }, [username]);

  // Initial data fetch
  useEffect(() => {
    fetchVehicleData();
  }, [fetchVehicleData]);

  // Return the refetch function so it can be called from component
  return { 
    vehicles, 
    loading,
    refetchVehicles: fetchVehicleData 
  };
};

export default useVehicleData;