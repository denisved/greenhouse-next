import React from 'react';
import { useMqtt } from '../context/mqttContext';

export default function PumpControl() {
  const { isConnected, publish } = useMqtt();

  const handlePumpOn = () => {
    if (isConnected) {
      publish('pumpTopic', 'on');
    } else {
      console.error('MQTT client is not connected');
    }
  };

  const handlePumpOff = () => {
    if (isConnected) {
      publish('pumpTopic', 'off');
    } else {
      console.error('MQTT client is not connected');
    }
  };

  return (
    <div>
      <button class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handlePumpOn} disabled={!isConnected}>
        Pump On
      </button>
      <button class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handlePumpOff} disabled={!isConnected}>
        Pump Off
      </button>
    </div>
  );
}