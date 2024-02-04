const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URL
const url = "mongodb+srv://host:mariadb@integrativeprojectdb.o5dpgni.mongodb.net/"

const client = new MongoClient(url);

async function connect() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to MongoDB database');

    return 'done.';
}

// We export the connect method and the collection reference
module.exports = {
    connect,
    client,
}