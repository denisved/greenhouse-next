import React, { createContext, useContext, useState, useEffect } from 'react';
import mqtt from 'mqtt';

const MqttContext = createContext();

export const MqttProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    const storedLogin = localStorage.getItem('mqttLogin');
    const storedPassword = localStorage.getItem('mqttPassword');
    
    if (storedLogin && storedPassword) {
      connectToBroker(storedLogin, storedPassword);
    }
  }, []);

  const connectToBroker = (username, password) => {
    localStorage.setItem('mqttLogin', username);
    localStorage.setItem('mqttPassword', password);

    const mqttClient = mqtt.connect('wss://84aeaf02b6dc46a5a9fa9853366fa40e.s2.eu.hivemq.cloud:8884/mqtt', {
      username,
      password,
    });

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      setIsConnected(true);
      setClient(mqttClient);
      setConnectionError(null);
    });

    mqttClient.on('error', (err) => {
      console.error('Connection error: ', err);
      setConnectionError(err.message);
      setIsConnected(false);
      mqttClient.end(); 
      localStorage.removeItem('mqttLogin');
      localStorage.removeItem('mqttPassword');
    });

    mqttClient.on('close', () => {
      console.log('Disconnected from MQTT broker');
      setIsConnected(false);
      setClient(null);
      localStorage.removeItem('mqttLogin');
      localStorage.removeItem('mqttPassword');
    });
  };

  const publish = (topic, message) => {
    if (client && isConnected) {
      client.publish(topic, message);
    } else {
      console.error('MQTT client is not connected');
    }
  };

  const subscribe = (topic, callback) => {
    if (client && isConnected) {
      client.subscribe(topic, (err) => {
        if (!err) {
          client.on('message', (receivedTopic, message) => {
            if (receivedTopic === topic) {
              callback(message.toString());
            }
          });
        }
      });
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
      localStorage.removeItem('mqttLogin');
      localStorage.removeItem('mqttPassword');
    }
  };

  return (
    <MqttContext.Provider value={{ isConnected, connectToBroker, publish, subscribe, disconnectFromBroker, connectionError }}>
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => useContext(MqttContext);
