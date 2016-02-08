var express = require("express");
var app = express();
var r = require("rethinkdbdash")();
var bodyParser = require("body-parser");

require("rethink-config")({
  "r": r,
  "database": "Twitterjobbot",
  "tables": ["superheroRegistry"]
});

//Parse JSON/Forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('./public'));

//GET Request for all items in superhero list table
app.get("/registry", function(req, res, next){
  r.db("Twitterjobbot").table("superheroRegistry").then(function(result){
    //send array back to client
    res.status(200).send(result);
  })
})

//r.db("Twitterjobbot").table("superheroRegistry").get(id).update({"allegiance": req.body.team})


//PATCH request for Allegiance
app.patch("/registry", function(req,res,next){
  console.log("Lets try checking request " + req.body.team);
  r.db("Twitterjobbot").table("superheroRegistry").filter({
    "id" : req.body.id
  }).update({
    "team": req.body.team
  }).then(function(){
    console.log('Checking on my team: ' + JSON.stringify(req.body));
    res.status(200).send("Line Items uploaded to server")
  })
})

//POST request for name and power
app.post("/registry", function(req,res,next){
  r.db("Twitterjobbot").table("superheroRegistry").insert({
    "id" : req.body.id,
    "name" : req.body.name,
    "power" : req.body.power,
    "team" : 'undeclared'
  //  "date" : new Date()
  }).then(function(){
    res.status(200).send("Line Items uploaded to server")
  })
})



app.get('*', function(request, result){
  result.sendFile(__dirname + "/public/index.html");
})

var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Your app listening port ' + PORT);
