import clientPromise from '../../../../lib/mongodb';

export async function GET(req, res) {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const date = searchParams.get('date');
  const interval = searchParams.get('interval');

  if (!date) {
    return new Response(JSON.stringify({ success: false, error: 'Date query parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db('greenhouse'); 
    const collection = db.collection('esp_data'); 

    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const query = {
      timestamp: {
        $gte: startDate,
        $lt: endDate
      }
    };

    const data = await collection.find(query).sort({ timestamp: 1 }).toArray();

    let filteredData = data;

    if (interval !== 'all') {
      const parsedInterval = parseInt(interval, 10);
      filteredData = [];
      let lastTimestamp = null;

      data.forEach((entry) => {
        const entryDate = new Date(entry.timestamp);
        if (!lastTimestamp || entryDate - lastTimestamp >= parsedInterval * 60 * 1000) {
          filteredData.push(entry);
          lastTimestamp = entryDate;
        }
      });
    }

    return new Response(JSON.stringify({ success: true, data: filteredData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
