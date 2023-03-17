const userName = "exampleuser";
const password = "examplepassword";
const databaseAndCollection = {db: "AWC", collection: "CasinoNight2022"};
const { MongoClient, ServerApiVersion } = require('mongodb');

var client = null;
async function main() {
    const uri = `mongodb+srv://${userName}:${password}@cluster0.pzsxtoz.mongodb.net/?retryWrites=true&w=majority`;
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    await client.connect();
}

async function process() {
    const attendee = {
        firstname : "if this is in it works",
        lastname : "WORKS",
        email : "email@something",
        dietaryrestrictions : "restrictions",
        phonenumber : "443-555",
        numbertickets: "3",
        guests: "3,3,",
        venmo: "venmo"
    };

    id = await insertAttendee(client, databaseAndCollection, attendee);
    console.log("ready");
};

async function insertAttendee(client, databaseAndCollection, attendee) {
    const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(attendee);
    return result.insertedId;
}