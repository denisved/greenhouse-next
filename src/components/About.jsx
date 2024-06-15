export default function About() {
    return (
      <div className="p-5 max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-left text-green-600">About</h1>
        <div className="text-lg text-gray-800 dark:text-gray-200 mb-8 text-left">
          <p className="mb-4">
            Welcome to my Home Plant Monitoring and Control System. This project aims 
            to provide a comprehensive solution for monitoring and maintaining 
            optimal conditions for your home plants or small greenhouse.
            With real-time data monitoring, you can keep track of crucial parameters 
            like soil moisture, temperature, and humidity.
          </p>
          <p className="mb-4">
            This system uses an ESP8266 microcontroller connected to various sensors 
            (soil moisture sensor, DHT11 temperature and humidity sensor) to 
            gather data. This data is then transmitted to a Next.js web application 
            through an MQTT broker. The web application allows you to view the 
            data in real time and control the water pump manually or automatically 
            based on the soil moisture level.
          </p>
          <p className="mb-4">
            The hardware part includes an ESP8266, soil moisture sensor, DHT11 sensor, 
            relay, pump, and a battery for pump power. The client and server
             part consists of a Next.js app and MongoDB, with the MQTT broker (HiveMQ) 
             facilitating real-time data transmission. This system is ideal 
             for home greenhouses and houseplants, ensuring they receive the optimal 
             care and monitoring.
          </p>
        </div>
        <div className="flex justify-center mt-9">
          <img className="w-full sm:w-4/6 h-auto" src="arch.svg" alt="Project Architecture" />
        </div>
      </div>
    );
  }