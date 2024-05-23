import clientPromise from '../../../../lib/mongodb';

export async function GET(req, res) {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const date = searchParams.get('date');

  if (!date) {
    return new Response(JSON.stringify({ success: false, error: 'Date query parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db('greenhouse'); // Заміни на назву твоєї бази даних
    const collection = db.collection('esp_data'); // Заміни на назву твоєї колекції

    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const query = {
      timestamp: {
        $gte: startDate,
        $lt: endDate
      }
    };

    const data = await collection.find(query).toArray();

    return new Response(JSON.stringify({ success: true, data }), {
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
