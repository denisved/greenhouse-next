'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function Data() {
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState([]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/getData`, {
        params: { date: selectedDate }
      });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="p-5 max-w-screen-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select Date to Fetch Data</h2>
      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={fetchData}
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Fetch Data
        </button>
      </div>
      <div className="mt-4">
        {data.length > 0 ? (
          <div>
            <h3 className="text-xl font-semibold">Data for {selectedDate}</h3>
            <pre className="bg-gray-100 p-4 rounded mt-2">{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <p>No data found for the selected date.</p>
        )}
      </div>
    </div>
  );
}
