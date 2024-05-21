import React, { useEffect, useState } from 'react';
import { useMqtt } from '../context/mqttContext';

export default function EspControl() {
  const { subscribe, publish } = useMqtt();
  const [data, setData] = useState({ humidity: 0, temperature: 0, soil_moisture: 0 });

  useEffect(() => {
    const handleNewMessage = (message) => {
      const parsedMessage = JSON.parse(message);
      setData({
        humidity: parsedMessage.humidity,
        temperature: parsedMessage.temperature,
        soil_moisture: parsedMessage.soil_moisture,
      });
    };

    if (subscribe) {
      subscribe('esp8266_data', handleNewMessage);
    }
  }, [subscribe]);

  const handlePumpOn = () => {
    publish('pumpTopic', 'on');
  };

  const handlePumpOff = () => {
    publish('pumpTopic', 'off');
  };

  return (
    <div className="p-5 max-w-screen-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Pump Control</h2>
      <div className="mb-4">
        <p><strong>Humidity:</strong> {data.humidity}%</p>
      </div>
      <div className="mb-4">
        <p><strong>Temperature:</strong> {data.temperature}°C</p>
      </div>
      <div className="mb-4">
        <p><strong>Soil Moisture:</strong> {data.soil_moisture}%</p>
      </div>
      <div className="flex gap-10 items-center">
        <button
          onClick={handlePumpOn}
          type="button"
          className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Pump On
        </button>
        <button
          onClick={handlePumpOff}
          type="button"
          className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Pump Off
        </button>
      </div>
    </div>
  );
};