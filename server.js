// Dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3845;
const fs = require("fs");
const util = require("util");
const path = require("path");
//other variables
let nArray = [];
let nCount = 1;
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
// Body Parsing Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets
app.use(express.static('public'));

//Routes

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

app.get("/api/notes", async function (req, res){
    const nStr = await readFile("db/db.json", "utf8");
    nArray = JSON.parse(nStr);
    return res.json(nArray);
})


app.post("/api/notes", async function (req, res){
      
    var nNew = req.body;
    console.log(nNew);
    nNew.id = nCount;
    nArray.push(nNew);
    nCount++;
    await writeFile("db/db.json", JSON.stringify(nArray));
    return res.json(nNew);
})



app.delete("/api/notes/:id", async function (req, res){
    var selector = req.params.id;
    console.log(selector);
    console.log(req.body);

})


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});


// why do i need to use path.join for the sendfiles?  


// Server listener
app.listen(PORT, function () {
    console.log("Server is listening on: http://localhost:" + PORT);
});