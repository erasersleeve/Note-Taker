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
    // nNew.id = nArray[nArray.length-1].id+1 || 1;
    if (nArray.length == 0) {
        nNew.id = 1
    }
    else {
        nNew.id = nArray[nArray.length-1].id+1
    };
    nArray.push(nNew);
    //instead of using a blank array, fetch the JSON object.
    nCount++;
    await writeFile("db/db.json", JSON.stringify(nArray));
    return res.json(nNew);
})



app.delete("/api/notes/:id", async function (req, res){
    var selector = req.params.id;
    console.log("This is the id we want to delete:", selector)
    var lucky = nArray.filter(function(number) {
        return parseInt(number["id"]) !== parseInt(selector);
        });
    writeFile("db/db.json", JSON.stringify(lucky));
    return res.json(lucky); 
    
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});




// Server listener
app.listen(PORT, function () {
    console.log("Server is listening on: http://localhost:" + PORT);
});