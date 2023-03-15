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

app.listen(portNumber);
process.stdout.write(`Webserver started and running at http://localhost:${portNumber}\n`);