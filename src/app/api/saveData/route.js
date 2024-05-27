import clientPromise from '../../../../lib/mongodb';

export async function POST(req, res) {
  const { deviceId, humidity, temperature, soil_moisture } = await req.json();
  
  const timestamp = new Date();
  timestamp.setHours(timestamp.getHours() + 3);

  try {
    const client = await clientPromise;
    const db = client.db('greenhouse'); 
    const collection = db.collection('esp_data'); 

    const result = await collection.insertOne({
      deviceId,
      humidity,
      temperature,
      soil_moisture,
      timestamp
    });

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
