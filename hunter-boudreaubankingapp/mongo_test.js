const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected!');

    const dbName = 'Project 0';
    const db = client.db(dbName);

    const name = 'user' + Math.floor(Math.random() * 10000);
    const email = name + '@mit.edu';

    const collection = db.collection('customers');
    const doc = { name, email };
    collection.insertOne(doc, { w: 1 }, function (err, result) {
        if (err) {
            console.error('Error inserting document:', err);
        } else {
            console.log('Document inserted successfully');
        }
    });

    collection.find().toArray(function (err, docs) {
        if (err) {
            console.error('Error retrieving documents:', err);
        } else {
            console.log('Collection:', docs);
        }

        client.close();
    });
});
