import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

export default function Mqtt() {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectToBroker = () => {
    const mqttClient = mqtt.connect('wss://84aeaf02b6dc46a5a9fa9853366fa40e.s2.eu.hivemq.cloud/mqtt', {
      port: 8884,
      username: 'denisved',
      password: 'Dtlthysrjd12!'
    });

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      setIsConnected(true);
      setClient(mqttClient);
    });

    mqttClient.on('error', (err) => {
      console.error('Connection error: ', err);
      setIsConnected(false);
    });

    mqttClient.on('close', () => {
      console.log('Disconnected from MQTT broker');
      setIsConnected(false);
    });
  };

  const publishMessage = (topic, message) => {
    if (client && isConnected) {
      client.publish(topic, message);
    } else {
      console.error('MQTT client is not connected');
    }
  };

  useEffect(() => {
    return () => {
      if (client) {
        client.end();
      }
    };
  }, [client]);

  return (
    <div className='flex gap-10 items-center p-5 max-w-screen-sm mx-auto'>
      <button 
        onClick={connectToBroker} 
        type="button" 
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Connect to Broker
      </button>
      <button 
        onClick={() => publishMessage('pumpTopic', 'on')} 
        type="button" 
        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        disabled={!isConnected}>
        Pump on
      </button>
      <button 
        onClick={() => publishMessage('pumpTopic', 'off')} 
        type="button" 
        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        disabled={!isConnected}>
        Pump off
      </button>
    </div>
  );
}