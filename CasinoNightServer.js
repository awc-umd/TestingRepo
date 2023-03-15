const http = require("http");
const express = require("express");   /* Accessing express module */
const app = express();  /* app is a request handler function */
const bodyParser = require("body-parser"); /* To handle post parameters */
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));

portNumber = 5001

app.get("/", (request, response) => {
    response.render("RSVPForm.ejs");
});

app.post("/ConfirmationPage", async (request, response) => {

    url = "https://api.qrserver.com/v1/create-qr-code/?data=" + request.body.email + "&size=100x100";
    const variables = {
        url : url,
        name : request.body.firstName +" "+ request.body.lastName
    };

    response.render("../templates/ConfirmationPage.ejs", variables);
});

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));