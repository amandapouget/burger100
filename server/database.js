import { MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

export const connectToDB = async () => {
    const connection = await client.connect();
    return connection.db('yelpApp');
}