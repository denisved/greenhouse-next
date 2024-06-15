'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function DataStorage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [interval, setInterval] = useState('all'); 
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
    <div className="p-5 max-w-screen-xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-left text-green-600">Data Storage</h2>
      <div className="text-lg text-gray-800 dark:text-gray-200 mb-8 text-left">
        <p className="mb-4">
          Use this page to view historical data from the database. Select a date and time interval to fetch and display the data.
        </p>
      </div>
      <div className="flex flex-col items-center p-5 max-w-screen-sm mx-auto">
        <div className="grid gap-6 mb-6 w-full">
          <div>
            <label htmlFor="date" className="block mb-3 text-lg font-medium text-gray-900 dark:text-white">Date</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="interval" className="block mb-3 text-lg font-medium text-gray-900 dark:text-white">Interval</label>
            <select
              id="interval"
              value={interval}
              onChange={handleIntervalChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="all">All data</option>
              <option value={1}>1 minute</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
            </select>
          </div>
        </div>
        <button
          onClick={fetchData}
          className="transition-transform duration-300 ease-in-out transform hover:scale-105 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-lg w-full sm:w-auto px-8 py-4 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Fetch Data
        </button>
      </div>
      <div className="mt-8 overflow-x-auto">
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
          <p className="text-center mt-4">No data found for the selected date and interval.</p>
        )}
      </div>
    </div>
  );
}
