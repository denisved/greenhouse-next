// pages/api/saveData.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db('greenhouse');

  if (req.method === 'POST') {
    const data = req.body;
    const result = await db.collection('data').insertOne(data);
    res.json(result);
  } else {
    res.status(405).end();
  }
};
