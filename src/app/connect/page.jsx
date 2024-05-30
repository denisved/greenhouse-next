'use client';
import React, { useState } from 'react';
import { useMqtt } from '../../context/mqttContext';

export default function Connect() {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const { connectToBroker, disconnectFromBroker, isConnected, connectionError } = useMqtt();

  const handleSubmit = (event) => {
    event.preventDefault();
    connectToBroker(login, pass);
  };

  return (
    <div className="p-5 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-left text-green-600">Connect to MQTT Broker</h1>
      <div className="text-lg text-gray-800 dark:text-gray-200 mb-8 text-left">
        <p className="mb-4">
          This page allows you to connect to the MQTT broker. Enter your login credentials below to establish a connection. Once connected, you will be able to publish and subscribe to topics for real-time data monitoring and control.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-5 max-w-screen-sm mx-auto">
        <div className="grid gap-6 mb-6 w-full">
          <div>
            <label htmlFor="login" className="block mb-3 text-base font-medium text-gray-900 dark:text-white">Login</label>
            <input
              type="text"
              id="login"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="pass" className="block mb-3 text-base font-medium text-gray-900 dark:text-white">Password</label>
            <input
              type="password"
              id="pass"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex gap-4 w-full justify-center">
          <button type="submit" className="transition-transform duration-300 ease-in-out transform hover:scale-105 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-lg w-full sm:w-auto px-8 py-4 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {isConnected ? 'Connected' : 'Submit'}
          </button>
          {isConnected && (
            <button
              type="button"
              onClick={disconnectFromBroker}
              className="transition-transform duration-300 ease-in-out transform hover:scale-105 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-lg w-full sm:w-auto px-8 py-4 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Disconnect
            </button>
          )}
        </div>
        {connectionError && <p className="text-red-500 mt-4">{connectionError}</p>}
      </form>
    </div>
  );
}
