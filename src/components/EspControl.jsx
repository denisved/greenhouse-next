import React, { useEffect, useState, useRef } from 'react';
import { useMqtt } from '../context/mqttContext';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function EspControl() {
  const { subscribe, publish } = useMqtt();
  const [data, setData] = useState({ humidity: 0, temperature: 0, soil_moisture: 0 });
  const [moistureLevel, setMoistureLevel] = useState(50);
  const isSubscribed = useRef(false);

  useEffect(() => {
    const handleNewMessage = (message) => {
      const parsedMessage = JSON.parse(message);
      setData(prevData => ({
        humidity: parsedMessage.humidity !== null ? parseFloat(parsedMessage.humidity).toFixed(1) : prevData.humidity,
        temperature: parsedMessage.temperature !== null ? parseFloat(parsedMessage.temperature).toFixed(1) : prevData.temperature,
        soil_moisture: parsedMessage.soil_moisture,
      }));
      axios.post('/api/saveData', message).catch((err) => console.error('Error saving data:', err));
    };

    if (subscribe && !isSubscribed.current) {
      subscribe('esp8266_data', handleNewMessage);
      isSubscribed.current = true;
    }
  }, [subscribe]);

  const handlePumpOn = () => {
    publish('pumpTopic', 'on');
  };

  const handlePumpOff = () => {
    publish('pumpTopic', 'off');
  };

  const handleSubmit = () => {
    publish('autoWater', String(moistureLevel));
  };

  const circularStyles = buildStyles({
    pathColor: `rgba(40, 167, 69, 1)`,
    textColor: '#28a745',
    trailColor: '#d6d6d6',
    backgroundColor: '#ffffff',
  });

  return (
    <div className="p-5 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-left text-green-600">Plant Monitoring and Control</h1>
      <div className="text-lg text-gray-800 dark:text-gray-200 mb-8 text-left">
        <p className="mb-4">
          This page allows you to monitor and control your home plants in real time. View the current humidity, temperature, and soil moisture levels. You can also control the water pump manually or set an automatic watering level.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Humidity</p>
          <div style={{ width: '80%' }}>
            <CircularProgressbar
              value={data.humidity}
              text={`${data.humidity}%`}
              styles={circularStyles}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Temperature</p>
          <div style={{ width: '80%' }}>
            <CircularProgressbar
              value={data.temperature}
              text={`${data.temperature}°C`}
              styles={circularStyles}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Soil Moisture</p>
          <div style={{ width: '80%' }}>
            <CircularProgressbar
              value={data.soil_moisture}
              text={`${data.soil_moisture}%`}
              styles={circularStyles}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">Auto Watering</h3>
          <Slider
            min={0}
            max={100}
            defaultValue={50}
            value={moistureLevel}
            onChange={setMoistureLevel}
            trackStyle={{ backgroundColor: '#28a745' }}
            handleStyle={{ borderColor: '#28a745', backgroundColor: '#28a745' }}
            railStyle={{ backgroundColor: '#d6d6d6' }}
            className="w-3/4"
          />
          <div className="text-center mt-2 text-gray-900 dark:text-gray-100">{moistureLevel}</div>
          <button
            onClick={handleSubmit}
            type="button"
            className="mt-4 transition duration-300 ease-in-out transform hover:scale-105 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-lg px-8 py-4 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">Pump control</h3>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handlePumpOn}
              type="button"
              className="transition duration-300 ease-in-out transform hover:scale-105 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-lg px-8 py-4 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Pump On
            </button>
            <button
              onClick={handlePumpOff}
              type="button"
              className="transition duration-300 ease-in-out transform hover:scale-105 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-lg px-8 py-4 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Pump Off
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
