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
      setData({
        humidity: parsedMessage.humidity,
        temperature: parseFloat(parsedMessage.temperature).toFixed(1),
        soil_moisture: parsedMessage.soil_moisture,
      });
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
    <div className="p-5 max-w-screen-lg mx-auto ">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Data monitoring in real time</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
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
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">Select low level of soil moisture for automatic watering</h3>
        <div className="flex flex-col items-center">
          <Slider
            min={0}
            max={100}
            defaultValue={50}
            value={moistureLevel}
            onChange={setMoistureLevel}
            trackStyle={{ backgroundColor: '#28a745' }}
            handleStyle={{ borderColor: '#28a745', backgroundColor: '#28a745' }}
            railStyle={{ backgroundColor: '#d6d6d6' }}
          />
          <div className="text-center mt-2 text-gray-900 dark:text-gray-100">{moistureLevel}</div>
          <button
            onClick={handleSubmit}
            type="button"
            className="mt-4 transition duration-300 ease-in-out transform hover:scale-105 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-lg px-8 py-4 text-center"
          >
            Submit
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Pump control in real time</h2>
      <div className="flex gap-4 justify-center">
        <button
          onClick={handlePumpOn}
          type="button"
          className="transition duration-300 ease-in-out transform hover:scale-105 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-lg px-8 py-4 text-center"
        >
          Pump On
        </button>
        <button
          onClick={handlePumpOff}
          type="button"
          className="transition duration-300 ease-in-out transform hover:scale-105 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-lg px-8 py-4 text-center"
        >
          Pump Off
        </button>
      </div>
    </div>
  );
}
