// Dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require("fs");

// Body Parsing Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets
app.use(express.static('public'));

//Routes

app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/public/notes.html");
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/notes", function (req, res) {
    res.sendFile(__dirname + "/db/db.json");
});



// Server listener
app.listen(PORT, function () {
    console.log("Server is listening on: http://localhost:" + PORT);
});