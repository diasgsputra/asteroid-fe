import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('2024-04-12');
  const [endDate, setEndDate] = useState('2024-04-13');

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`https://asteroid-lq4t.onrender.com/api/asteroids?start_date=${startDate}&end_date=${endDate}`);
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="App">
      <h1>Near Earth Asteroids</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button type="submit">Fetch Data</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Distance (km)</th>
            <th>Velocity (km/h)</th>
            <th>Potentially Hazardous</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.distance.toFixed(2)}</td>
              <td>{item.velocity.toFixed(2)}</td>
              <td>{item.is_potentially_hazardous ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
