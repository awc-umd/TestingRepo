const http = require("http");
const express = require("express");   /* Accessing express module */
const app = express();  /* app is a request handler function */
const bodyParser = require("body-parser"); /* To handle post parameters */
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));

portNumber = 5001
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
main().catch(console.error);

app.get("/", (request, response) => {
    response.render("RSVPForm.ejs");
});

app.post("/ConfirmationPage", async (request, response) => {
    const attendee = {
        firstname : request.body.firstName,
        lastname : request.body.lastName,
        email : request.body.email,
        dietaryrestrictions : request.body.dietaryRestrictions,
        phonenumber : request.body.phoneNumber,
        numbertickets: request.body.numberTickets,
        num_guests: request.body.guests, 
        venmo: request.body.venmo,
        paid: false
    };

    id = await insertAttendee(client, databaseAndCollection, attendee);
    url = "https://api.qrserver.com/v1/create-qr-code/?data=" + id + "&size=100x100";
    const variables = {
        url : url,
        name : attendee.firstname +" "+ attendee.lastname
    };

    response.render("ConfirmationPage.ejs", variables);
});

async function insertAttendee(client, databaseAndCollection, attendee) {
    const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(attendee);
    return result.insertedId;
}

app.listen(portNumber);
process.stdout.write(`Webserver started and running at http://localhost:${portNumber}\n`);