'use client';
import React,  { useState, useEffect } from 'react'
import mqtt from 'mqtt';


export default function About() {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectToBroker = (event) => {
    event.preventDefault(); // запобігає перезавантаженню сторінки при натисканні кнопки Submit

    const mqttClient = mqtt.connect('wss://84aeaf02b6dc46a5a9fa9853366fa40e.s2.eu.hivemq.cloud:8884/mqtt', {
      username: login,
      password: pass,
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


  useEffect(() => {
    return () => {
      if (client) {
        client.end();
      }
    };
  }, [client]);

  return (
    <form onSubmit={connectToBroker} className='flex-col items-center p-5 max-w-screen-sm mx-auto'>
      <div className="grid gap-6 mb-6 md:grid-row-2">
        <div>
          <label htmlFor="login" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login</label>
          <input
            type="text"
            id="login"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="pass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            type="password"
            id="pass"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
    </form>
  );
}
