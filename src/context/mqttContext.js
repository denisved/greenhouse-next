import React, { createContext, useContext, useState, useEffect } from 'react';
import mqtt from 'mqtt';

const MqttContext = createContext();

export const MqttProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectToBroker = (username, password) => {
    const mqttClient = mqtt.connect('wss://84aeaf02b6dc46a5a9fa9853366fa40e.s2.eu.hivemq.cloud:8884/mqtt', {
      username,
      password,
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
      setClient(null);
    });
  };

  const publish = (topic, message) => {
    if (client && isConnected) {
      client.publish(topic, message);
    } else {
      console.error('MQTT client is not connected');
    }
  };

  const disconnectFromBroker = () => {
    if (client) {
      client.end();
      setClient(null);
      setIsConnected(false);
      console.log('Disconnected from MQTT broker');
    }
  };

  return (
    <MqttContext.Provider value={{ isConnected, connectToBroker, publish, disconnectFromBroker }}>
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => useContext(MqttContext);
