## About

This [Next.js](https://nextjs.org/) app is a client part of greenhouse monitoring and control system where [Tailwind CSS](https://tailwindcss.com/) was used to create responsive UI. Hardware part is based 
on [ESP8266](https://en.wikipedia.org/wiki/ESP8266) and communicate with this app via MQTT broker in real time. [MongoDB](https://www.mongodb.com/) is used to store those data. 

This system includes:
- Automatic irrigation where user can choose threshold 
- Manual control of the pump by using web app
- Monitroing data from sensors 

## How to run locally 
First, install dependencies:
```bash
npm i
```


Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 

You can also check this [link](https://greenhouse-monitoring.vercel.app/) as this project is deployed on Vercel.

## System in work

https://github.com/denisved/greenhouse-next/assets/32486072/dd04d3b1-4586-4c3d-9998-536a0efff5fb

