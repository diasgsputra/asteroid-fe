import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [dataDate, setDataDate] = useState([]);
  const [dataDistance, setDataDistance] = useState([]);
  const [startDate, setStartDate] = useState('2024-04-12');
  const [endDate, setEndDate] = useState('2024-04-13');
  const [distance, setDistance] = useState(3000000);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [year, setYear] = useState(2023);

  const fetchAsteroidsByDate = useCallback(async () => {
    try {
      const response = await fetch(`https://asteroid-lq4t.onrender.com/api/asteroids?start_date=${startDate}&end_date=${endDate}`);
      const result = await response.json();
      setDataDate(result.data);
    } catch (error) {
      console.error('Error fetching data by date:', error);
    }
  }, [startDate, endDate]);

  const fetchAsteroidsByDistance = useCallback(async () => {
    try {
      const response = await fetch(`https://asteroid-lq4t.onrender.com/api/asteroids-by-distance?distance=${distance}`);
      const result = await response.json();
      setDataDistance(result.data);
    } catch (error) {
      console.error('Error fetching data by distance:', error);
    }
  }, [distance]);

  const fetchAsteroidsOneYear = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://asteroid-lq4t.onrender.com/api/one-year-asteroids?year=${year}`);
      const result = await response.json();
      setIsLoading(false);
      setResult(result.data);
    } catch (error) {
      console.error('Error fetching data for one year:', error);
      setIsLoading(false);
    }
  }, [year]);

  const fetchDataByDate = useCallback(() => {
    fetchAsteroidsByDate();
  }, [fetchAsteroidsByDate]);

  const fetchDataByDistance = useCallback(() => {
    fetchAsteroidsByDistance();
  }, [fetchAsteroidsByDistance]);

  const fetchDataOneYear = useCallback(() => {
    fetchAsteroidsOneYear();
  }, [fetchAsteroidsOneYear]);

  useEffect(() => {
    fetchDataByDate();
  }, [fetchDataByDate]);

  const handleSubmitByDate = (e) => {
    e.preventDefault();
    fetchDataByDate();
  };

  const handleSubmitByDistance = (e) => {
    e.preventDefault();
    fetchDataByDistance();
  };

  const handleFetchOneYear = (e) => {
    e.preventDefault();
    fetchDataOneYear();
  };

  return (
    <div className="App">
      <h1>Near Earth Asteroids</h1>
      
      <div className="section">
        <h2>Fetch by Date</h2>
        <form onSubmit={handleSubmitByDate}>
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
          <button type="submit">Fetch Data by Date</button>
        </form>
        <div className="table-container">
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
              {dataDate.map((item) => (
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
      </div>

      <div className="section">
        <h2>Fetch by Distance</h2>
        <form onSubmit={handleSubmitByDistance}>
          <label>
            Distance (km):
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </label>
          <button type="submit">Fetch Data by Distance</button>
        </form>
        <div className="table-container">
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
              {dataDistance.map((item) => (
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
      </div>

      <div className="section">
        <h2>Mapping One Year Data to Database</h2>
        <form onSubmit={handleFetchOneYear}>
          <label>
            Year:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <button type="submit">Mapping data by Year</button>
        </form>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <>
            <p className="result">{result}</p>
          </>
        )}
      </div>

    </div>
  );
}

export default App;
