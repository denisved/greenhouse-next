'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function Data() {
  const [selectedDate, setSelectedDate] = useState('');
  const [interval, setInterval] = useState('all'); // Інтервал за замовчуванням "всі дані"
  const [data, setData] = useState([]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/getData`, {
        params: { date: selectedDate, interval }
      });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const adjustTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    date.setHours(date.getHours() - 3); 
    return date.toLocaleString();
  };

  return (
    <div className="p-5 max-w-screen-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Select Date and Time Interval to Fetch Data</h2>
      <div className="mb-4 flex flex-col md:flex-row items-center">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 border border-gray-300 rounded mb-2 md:mb-0 md:mr-4 w-full md:w-auto"
        />
        <select
          value={interval}
          onChange={handleIntervalChange}
          className="p-2 border border-gray-300 rounded mb-2 md:mb-0 md:mr-4 w-full md:w-auto"
        >
          <option value="all">All data</option>
          <option value={1}>1 minute</option>
          <option value={5}>5 minutes</option>
          <option value={10}>10 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>
        </select>
        <button
          onClick={fetchData}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full md:w-auto"
        >
          Fetch Data
        </button>
      </div>
      <div className="mt-4 overflow-x-auto">
        {data.length > 0 ? (
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead className="bg-gray-800 text-white dark:bg-gray-300 dark:text-gray-800">
              <tr>
                <th className="px-4 py-2">Timestamp</th>
                <th className="px-4 py-2">Humidity</th>
                <th className="px-4 py-2">Temperature</th>
                <th className="px-4 py-2">Soil Moisture</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {data.map((entry, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{adjustTimestamp(entry.timestamp)}</td>
                  <td className="border px-4 py-2">{entry.humidity}</td>
                  <td className="border px-4 py-2">{entry.temperature}</td>
                  <td className="border px-4 py-2">{entry.soil_moisture}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No data found for the selected date and interval.</p>
        )}
      </div>
    </div>
  );
}
