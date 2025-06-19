const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

module.exports = async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Only POST requests allowed' });
	}

	try {
		await client.connect();
		const db = client.db("MuscleApp");
		const result = await db.collection("Exercises").insertOne(req.body);
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ error: error.toString() });
	} finally {
		await client.close();
	}
};