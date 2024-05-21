'use client';
import React,  { useState, useEffect } from 'react'
import { useMqtt } from '../../context/mqttContext';


export default function About() {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const { connectToBroker, disconnectFromBroker, isConnected } = useMqtt();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      connectToBroker(login, pass);
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex-col items-center p-5 max-w-screen-sm mx-auto">
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
        <button type="submit" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isConnected ? 'Connected' : 'Submit'}
        </button>
        {isConnected && (
          <button type="button" onClick={disconnectFromBroker} className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Disconnect from Broker
          </button>
        )}
      </form>
    );
  }
