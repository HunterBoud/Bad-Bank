const { MongoClient } = require('mongodb');

const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const host = 'atlas-cppx99-shard-00-00.imovtwf.mongodb.net:27017'; 
const port = '27017'; 
const database = 'bad-bank'; 

const uri = `mongodb://${username}:${password}@${host}:${port}/${database}`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(database);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
}

module.exports = { connectToDatabase };
