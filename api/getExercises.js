const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
	tls: true,
	tlsAllowInvalidCertificates: true
});

module.exports = async (req, res) => {
	try {
		await client.connect();
		const db = client.db("MuscleApp");
		const exercises = await db.collection("Exercises").find({}).toArray();
		res.status(200).json(exercises);
	} catch (error) {
		res.status(500).json({ error: error.toString() });
	} finally {
		await client.close();
	}
};